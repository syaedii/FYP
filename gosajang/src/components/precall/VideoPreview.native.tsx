import {useRender, useRtc} from 'customization-api';
import React from 'react';
import {View} from 'react-native';
import {MaxVideoView} from '../../../agora-rn-uikit';

const VideoPreview: React.FC = () => {
  const rtc = useRtc();
  rtc?.RtcEngine?.startPreview();

  const {renderList, activeUids} = useRender();
  const [maxUid] = activeUids;

  if (!maxUid) {
    return null;
  }

  return (
    <View style={{borderRadius: 10, flex: 1}}>
      <MaxVideoView user={renderList[maxUid]} key={maxUid} />
    </View>
  );
};
export default VideoPreview;
