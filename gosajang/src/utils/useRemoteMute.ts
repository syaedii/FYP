import {useMeetingInfo} from '../components/meeting-info/useMeetingInfo';
import {controlMessageEnum} from '../components/ChatContext';
import useIsPSTN from './useIsPSTN';
import useMutePSTN from './useMutePSTN';
import {UidType} from '../../agora-rn-uikit';
import events, {EventPersistLevel} from '../rtm-events-api';

export enum MUTE_REMOTE_TYPE {
  audio,
  video,
}
/**
 * Returns an asynchronous function to toggle muted state of the given track type for a remote user with the given uid or if no uid provided, mutes everyone else in the meeting.
 */
function useRemoteMute() {
  const {
    data: {isHost},
  } = useMeetingInfo();
  const isPSTN = useIsPSTN();
  const mutePSTN = useMutePSTN();

  return async (type: MUTE_REMOTE_TYPE, uid?: UidType) => {
    if (isHost) {
      switch (type) {
        case MUTE_REMOTE_TYPE.audio:
          // To individual
          if (uid) {
            if (isPSTN(uid)) {
              try {
                mutePSTN(uid);
              } catch (error) {
                console.error('An error occurred while muting the PSTN user.');
              }
            } else {
              events.send(
                controlMessageEnum.muteAudio,
                '',
                EventPersistLevel.LEVEL1,
                uid,
              );
            }
          } else {
            // To everyone
            events.send(
              controlMessageEnum.muteAudio,
              '',
              EventPersistLevel.LEVEL1,
            );
          }
          break;
        case MUTE_REMOTE_TYPE.video:
          if (uid) {
            // To individual
            if (!isPSTN(uid)) {
              events.send(
                controlMessageEnum.muteVideo,
                '',
                EventPersistLevel.LEVEL1,
                uid,
              );
            }
          } else {
            // To everyone
            events.send(
              controlMessageEnum.muteVideo,
              '',
              EventPersistLevel.LEVEL1,
            );
          }
          break;
      }
    } else {
      console.error('A host can only mute audience audio or video.');
    }
  };
}

export default useRemoteMute;
