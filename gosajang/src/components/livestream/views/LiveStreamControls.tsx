import React from 'react';
import {View} from 'react-native';
import {LocalRaiseHand} from '../../../subComponents/livestream';

export interface LiveStreamControlsProps {
  showControls: boolean;
}

const LiveStreamControls = (props: LiveStreamControlsProps) => {
  const {showControls} = props;
  if (!$config.RAISE_HAND) return <></>;
  if (!showControls) return <></>;
  return (
    <View style={{alignSelf: 'center'}}>
      <LocalRaiseHand />
    </View>
  );
};

export default LiveStreamControls;
