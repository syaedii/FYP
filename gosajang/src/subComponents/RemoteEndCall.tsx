import React from 'react';
import {StyleSheet} from 'react-native';
import {BtnTemplate, UidType} from '../../agora-rn-uikit';
import useRemoteEndCall from '../utils/useRemoteEndCall';

export interface RemoteEndCallProps {
  uid: UidType;
  isHost: boolean;
}
const RemoteEndCall = (props: RemoteEndCallProps) => {
  const endRemoteCall = useRemoteEndCall();
  return props.isHost && String(props.uid)[0] !== '1' ? (
    <BtnTemplate
      style={style.remoteButton}
      onPress={() => {
        endRemoteCall(props.uid);
      }}
      color="#FD0845"
      name={'remoteEndCall'} // earlier was endCall, added remoteEndCall
    />
  ) : (
    <></>
  );
};

const style = StyleSheet.create({
  remoteButton: {
    width: 30,
    height: 25,
    borderTopRightRadius: 0,
    borderTopLeftRadius: 0,
    borderBottomLeftRadius: 0,
    borderBottomRightRadius: 0,
    borderWidth: 0,
    borderRightWidth: 0,
    borderLeftWidth: 0,
    marginHorizontal: 0,
    backgroundColor: $config.SECONDARY_FONT_COLOR,
  },
});

export default RemoteEndCall;
