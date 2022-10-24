import React from 'react';
import {StyleSheet} from 'react-native';
import {BtnTemplate, UidType} from '../../agora-rn-uikit';
import useIsPSTN from '../utils/useIsPSTN';
import useMutePSTN from '../utils/useMutePSTN';
import useRemoteMute, {MUTE_REMOTE_TYPE} from '../utils/useRemoteMute';

export interface RemoteAudioMuteProps {
  uid: UidType;
  audio: boolean;
  isHost: boolean;
}
/**
 * Component to mute / unmute remote audio.
 * Sends a control message to another user over RTM if the local user is a host.
 * If the local user is not a host, it simply renders an image
 */
const RemoteAudioMute = (props: RemoteAudioMuteProps) => {
  const {isHost = false} = props;
  const muteRemoteAudio = useRemoteMute();

  const isPSTN = useIsPSTN();
  const mutePSTN = useMutePSTN();
  return (
    <BtnTemplate
      disabled={!isHost}
      onPress={() => {
        if (isPSTN(props.uid)) {
          try {
            mutePSTN(props.uid);
          } catch (error) {
            console.error('An error occurred while muting the PSTN user.');
          }
        } else {
          muteRemoteAudio(MUTE_REMOTE_TYPE.audio, props.uid);
        }
      }}
      style={style.buttonIconMic}
      name={props.audio ? 'mic' : 'micOff'}
    />
  );
};

const style = StyleSheet.create({
  buttonIconMic: {
    width: 25,
    height: 24,
  },
});

export default RemoteAudioMute;
