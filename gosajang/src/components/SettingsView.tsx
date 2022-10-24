import React from 'react';
import {View, Text, StyleSheet} from 'react-native';
import SelectDevice from '../subComponents/SelectDevice';
import HostControlView from './HostControlView';
import {useString} from '../utils/useString';
import LanguageSelector from '../subComponents/LanguageSelector';
import {isWebInternal} from '../utils/common';
import {useMeetingInfo} from './meeting-info/useMeetingInfo';

const SettingsView = () => {
  const {
    data: {isHost},
  } = useMeetingInfo();
  //commented for v1 release
  //const selectInputDeviceLabel = useString('selectInputDeviceLabel')();
  const selectInputDeviceLabel = 'Select Input Device';

  return (
    <View
      style={isWebInternal() ? style.settingsView : style.settingsViewNative}>
      <View style={style.main}>
        <View>
          <Text style={style.heading}>{selectInputDeviceLabel}</Text>
          <View style={style.popupPickerHolder}>
            <SelectDevice />
          </View>
        </View>
        {isHost ? <HostControlView /> : <></>}
        <LanguageSelector />
      </View>
    </View>
  );
};

const style = StyleSheet.create({
  main: {
    backgroundColor: $config.SECONDARY_FONT_COLOR,
    justifyContent: 'space-evenly',
    alignContent: 'center',
    paddingVertical: 5,
    flexGrow: 1,
    shadowColor: $config.PRIMARY_FONT_COLOR + '80',
    shadowOpacity: 0.5,
    shadowOffset: {width: -2, height: 0},
    shadowRadius: 3,
    paddingHorizontal: 20,
  },
  popupPickerHolder: {
    justifyContent: 'space-around',
  },
  heading: {
    fontSize: 20,
    fontWeight: '700',
    color: $config.PRIMARY_FONT_COLOR,
    alignSelf: 'center',
  },
  settingsView: {
    width: '20%',
    minWidth: 200,
    maxWidth: 300,
    backgroundColor: $config.SECONDARY_FONT_COLOR,
    flex: 1,
  },
  settingsViewNative: {
    position: 'absolute',
    zIndex: 5,
    width: '100%',
    height: '100%',
    right: 0,
    top: 0,
    backgroundColor: $config.SECONDARY_FONT_COLOR,
  },
});

export default SettingsView;
