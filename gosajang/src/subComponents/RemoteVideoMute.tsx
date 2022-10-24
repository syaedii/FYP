import React from 'react';
import {StyleSheet} from 'react-native';
import {BtnTemplate, UidType} from '../../agora-rn-uikit';
import useRemoteMute, {MUTE_REMOTE_TYPE} from '../utils/useRemoteMute';

/**
 * Component to mute / unmute remote video.
 * Sends a control message to another user over RTM if the local user is a host.
 * If the local user is not a host, it simply renders an image
 */
export interface RemoteVideoMuteProps {
  uid: UidType;
  video: boolean;
  isHost: boolean;
}
const RemoteVideoMute = (props: RemoteVideoMuteProps) => {
  const {isHost = false} = props;
  const muteRemoteVideo = useRemoteMute();

  return String(props.uid)[0] !== '1' ? (
    <BtnTemplate
      disabled={!isHost}
      onPress={() => {
        muteRemoteVideo(MUTE_REMOTE_TYPE.video, props.uid);
      }}
      style={style.buttonIconCam}
      name={props.video ? 'videocam' : 'videocamOff'}
    />
  ) : (
    <></>
  );
};

const style = StyleSheet.create({
  buttonIconCam: {
    width: 25,
    height: 25,
  },
});

export default RemoteVideoMute;
