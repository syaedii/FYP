import React from 'react';
import {View, StyleSheet} from 'react-native';
import Logo from '../../subComponents/Logo';
import {useHasBrandLogo} from '../../utils/common';

const CommonLogo: React.FC = () => {
  const hasBrandLogo = useHasBrandLogo();
  return (
    <View style={style.nav}>
      {hasBrandLogo() && <Logo />}
      {/* <OpenInNativeButton /> */}
    </View>
  );
};
export default CommonLogo;
const style = StyleSheet.create({
  nav: {
    flex: 1,
    width: '100%',
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
  },
});
