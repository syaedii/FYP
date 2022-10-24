import React from 'react';
import {View, Text, StyleSheet} from 'react-native';
import SecondaryButton from '../atoms/SecondaryButton';
import {useString} from '../utils/useString';
import useRemoteMute, {MUTE_REMOTE_TYPE} from '../utils/useRemoteMute';

export interface MuteAllAudioButtonProps {
  render?: (onPress: () => void) => JSX.Element;
}

export const MuteAllAudioButton = (props: MuteAllAudioButtonProps) => {
  const muteRemoteAudio = useRemoteMute();
  //commented for v1 release
  //const muteAllAudioButton = useString('muteAllAudioButton')();
  const muteAllAudioButton = 'Mute all audios';
  const onPress = () => muteRemoteAudio(MUTE_REMOTE_TYPE.audio);

  return props?.render ? (
    props.render(onPress)
  ) : (
    <SecondaryButton onPress={onPress} text={muteAllAudioButton} />
  );
};

export interface MuteAllVideoButtonProps {
  render?: (onPress: () => void) => JSX.Element;
}
export const MuteAllVideoButton = (props: MuteAllVideoButtonProps) => {
  const muteRemoteVideo = useRemoteMute();

  //commented for v1 release
  //const muteAllVideoButton = useString('muteAllVideoButton')();
  const muteAllVideoButton = 'Mute all videos';
  const onPress = () => muteRemoteVideo(MUTE_REMOTE_TYPE.video);

  return props?.render ? (
    props.render(onPress)
  ) : (
    <SecondaryButton onPress={onPress} text={muteAllVideoButton} />
  );
};

const HostControlView = () => {
  //commented for v1 release
  //const hostControlsLabel = useString('hostControlsLabel')();
  const hostControlsLabel = 'Host Controls';
  return (
    <>
      <Text style={style.heading}>{hostControlsLabel}</Text>
      <View>
        <View style={style.btnContainer}>
          <MuteAllAudioButton />
        </View>
        {!$config.AUDIO_ROOM && (
          <View style={style.btnContainer}>
            <MuteAllVideoButton />
          </View>
        )}
      </View>
    </>
  );
};

const style = StyleSheet.create({
  heading: {
    fontSize: 20,
    fontWeight: '700',
    color: $config.PRIMARY_FONT_COLOR,
    // marginBottom: 20,
    alignSelf: 'center',
  },
  btnContainer: {
    alignItems: 'center',
    marginVertical: 15,
  },
});

export default HostControlView;
