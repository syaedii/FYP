import {useLocalUserInfo, useRtc} from 'customization-api';
import {ToggleState} from '../../agora-rn-uikit/src/Contexts/PropsContext';

export enum MUTE_LOCAL_TYPE {
  audio,
  video,
}
/**
 * Returns an asynchronous function to toggle muted state of the given track type for the local user.
 */
function useMuteToggleLocal() {
  const {RtcEngine, dispatch} = useRtc();
  const local = useLocalUserInfo();

  return async (type: MUTE_LOCAL_TYPE) => {
    switch (type) {
      case MUTE_LOCAL_TYPE.audio:
        let localAudioState = local.audio;
        // Don't do anything if it is in a transitional state
        if (
          localAudioState === ToggleState.enabled ||
          localAudioState === ToggleState.disabled
        ) {
          // Disable UI
          dispatch({
            type: 'LocalMuteAudio',
            value: [
              localAudioState === ToggleState.enabled
                ? ToggleState.disabling
                : ToggleState.enabling,
            ],
          });

          try {
            await RtcEngine.muteLocalAudioStream(
              localAudioState === ToggleState.enabled,
            );
            // Enable UI
            dispatch({
              type: 'LocalMuteAudio',
              value: [
                localAudioState === ToggleState.enabled
                  ? ToggleState.disabled
                  : ToggleState.enabled,
              ],
            });
          } catch (e) {
            console.error(e);
            dispatch({
              type: 'LocalMuteAudio',
              value: [localAudioState],
            });
          }
        }
        break;
      case MUTE_LOCAL_TYPE.video:
        const localVideoState = local.video;
        // Don't do anything if it is in a transitional state
        if (
          localVideoState === ToggleState.enabled ||
          localVideoState === ToggleState.disabled
        ) {
          // Disable UI
          dispatch({
            type: 'LocalMuteVideo',
            value: [
              localVideoState === ToggleState.enabled
                ? ToggleState.disabling
                : ToggleState.enabling,
            ],
          });

          try {
            await RtcEngine.muteLocalVideoStream(
              localVideoState === ToggleState.enabled ? true : false,
            );

            // Enable UI
            dispatch({
              type: 'LocalMuteVideo',
              value: [
                localVideoState === ToggleState.enabled
                  ? ToggleState.disabled
                  : ToggleState.enabled,
              ],
            });
          } catch (e) {
            console.log('error while dispatching');
            dispatch({
              type: 'LocalMuteVideo',
              value: [localVideoState],
            });
          }
        }
        break;
    }
  };
}

export default useMuteToggleLocal;
