import React, {useContext, useState} from 'react';
import {
  View,
  Text,
  ImageBackground,
  StyleSheet,
  LayoutChangeEvent,
} from 'react-native';
import Logo from '../subComponents/Logo';
import OAuth from '../components/OAuth';
import Illustration from '../subComponents/Illustration';
import {useHasBrandLogo} from '../utils/common';
import DimensionContext from '../components/dimension/DimensionContext';
import {useString} from '../utils/useString';

const Authenticate = () => {
  const hasBrandLogo = useHasBrandLogo();
  const {getDimensionData} = useContext(DimensionContext);
  const [isDesktop, setIsDesktop] = useState(false);
  let onLayout = (e: LayoutChangeEvent) => {
    const {isDesktop} = getDimensionData(
      e.nativeEvent.layout.width,
      e.nativeEvent.layout.height,
    );
    setIsDesktop(isDesktop);
  };
  //commented for v1 release
  // const oauthLoginLabel = useString('oauthLoginLabel')();
  // const oauthProviderLabel = useString('oauthProviderLabel')();
  const oauthLoginLabel = 'Login using OAuth';
  const oauthProviderLabel = 'Please select an OAuth provider to login.';
  return (
    <ImageBackground
      onLayout={onLayout}
      source={{uri: $config.BG}}
      style={style.full}
      resizeMode={'cover'}>
      <View style={style.main}>
        <View style={style.nav}>{hasBrandLogo() && <Logo />}</View>
        <View style={style.content}>
          <View style={style.leftContent}>
            <Text style={style.heading}>{oauthLoginLabel}</Text>
            <Text style={style.headline}>{oauthProviderLabel}</Text>
            <OAuth />
          </View>
          {isDesktop ? (
            <View style={style.full}>
              <Illustration />
            </View>
          ) : (
            <></>
          )}
        </View>
      </View>
    </ImageBackground>
  );
};

const style = StyleSheet.create({
  full: {flex: 1},
  illustration: {flex: 1, alignSelf: 'flex-end'},
  main: {
    flex: 2,
    justifyContent: 'space-evenly',
    marginHorizontal: '10%',
  },
  nav: {
    flex: 1,
    width: '100%',
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    alignSelf: 'center',
  },
  content: {flex: 6, flexDirection: 'row'},
  leftContent: {
    width: '100%',
    flex: 1,
    justifyContent: 'space-evenly',
    marginRight: '5%',
  },
  heading: {
    fontSize: 40,
    fontWeight: '700',
    color: $config.PRIMARY_FONT_COLOR,
    marginBottom: 20,
  },
  headline: {
    fontSize: 20,
    letterSpacing: 2,
    fontWeight: '400',
    color: $config.PRIMARY_FONT_COLOR,
    marginTop: -50,
    marginBottom: 20,
  },
});

export default Authenticate;
