import React, {useContext, useEffect} from 'react';
import {RtcContext} from '../../agora-rn-uikit';
import events from '../rtm-events-api';
import {controlMessageEnum} from '../components/ChatContext';

interface Props {
  children: React.ReactNode;
}

const EventsConfigure: React.FC<Props> = (props) => {
  const {RtcEngine, dispatch} = useContext(RtcContext);
  useEffect(() => {
    events.on(controlMessageEnum.muteVideo, () => {
      RtcEngine.muteLocalVideoStream(true);
      dispatch({
        type: 'LocalMuteVideo',
        value: [0],
      });
    });
    events.on(controlMessageEnum.muteAudio, () => {
      RtcEngine.muteLocalAudioStream(true);
      dispatch({
        type: 'LocalMuteAudio',
        value: [0],
      });
    });
    events.on(controlMessageEnum.kickUser, () => {
      dispatch({
        type: 'EndCall',
        value: [],
      });
    });
    return () => {
      events.off(controlMessageEnum.muteVideo);
      events.off(controlMessageEnum.muteAudio);
      events.off(controlMessageEnum.kickUser);
    };
  }, []);

  return <>{props.children}</>;
};

export default EventsConfigure;
