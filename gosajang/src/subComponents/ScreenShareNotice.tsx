import {PropsContext, UidType} from '../../agora-rn-uikit';
import React, {useContext} from 'react';
import {StyleSheet, View, Text} from 'react-native';
import {useString} from '../utils/useString';
/**
 *
 * @param uid - uid of the user
 * @returns This component display overlay message "Screen sharing is active now" if user started sharing the screen.
 * why its needed : To prevent screensharing tunneling effect
 *
 */
function ScreenShareNotice({uid}: {uid: UidType}) {
  //commented for v1 release
  // const screensharingActiveOverlayLabel = useString(
  //   'screensharingActiveOverlayLabel',
  // )();
  const screensharingActiveOverlayLabel = 'Your screen share is active.';
  const {rtcProps} = useContext(PropsContext);
  return uid === rtcProps?.screenShareUid ? (
    <View style={styles.screenSharingMessageContainer}>
      <Text style={styles.screensharingMessage}>
        {screensharingActiveOverlayLabel}
      </Text>
    </View>
  ) : null;
}

const styles = StyleSheet.create({
  screenSharingMessageContainer: {
    position: 'absolute',
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
    width: '100%',
    height: '100%',
    justifyContent: 'center',
    zIndex: 2,
    backgroundColor: 'rgba(0,0,0,0.9)',
    borderRadius: 15,
  },
  screensharingMessage: {
    alignSelf: 'center',
    fontSize: 20,
    color: $config.SECONDARY_FONT_COLOR,
  },
});

export default ScreenShareNotice;
