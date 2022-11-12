import React, {useState} from 'react';
import {Platform} from 'react-native';

import Join from './pages/Join';
import VideoCall from './pages/VideoCall';
import Create from './pages/Create';
import Login from './pages/Login';

import {Route, Switch, Redirect} from './components/Router';
import PrivateRoute from './components/PrivateRoute';
import OAuth from './components/OAuth';
import StoreToken from './components/StoreToken';

import {shouldAuthenticate} from './utils/common';
import KeyboardManager from 'react-native-keyboard-manager';

// commented for v1 release
//import {CustomRoutesInterface, CUSTOM_ROUTES_PREFIX} from 'customization-api';
//import {useCustomization} from 'customization-implementation';

import AppWrapper from './AppWrapper';
import {
  MeetingInfoContextInterface,
  MeetingInfoDefaultValue,
  MeetingInfoProvider,
} from './components/meeting-info/useMeetingInfo';
import {SetMeetingInfoProvider} from './components/meeting-info/useSetMeetingInfo';
import {ShareLinkProvider} from './components/useShareLink';

//hook can't be used in the outside react function calls. so directly checking the platform.
if (Platform.OS === 'ios') {
  KeyboardManager.setEnable(true);
  KeyboardManager.setEnableAutoToolbar(false);
  KeyboardManager.setShouldShowToolbarPlaceholder(false);
  KeyboardManager.setShouldResignOnTouchOutside(true);
}

//Extending the UI Kit Type defintion to add custom attribute to render interface
declare module 'agora-rn-uikit' {
  interface DefaultRenderInterface {
    name: string;
    screenUid: number;
    offline: boolean;
  }
  interface RtcPropsInterface {
    screenShareUid: number;
    screenShareToken?: string;
  }
}

const App: React.FC = () => {
  const [meetingInfo, setMeetingInfo] = useState<MeetingInfoContextInterface>(
    MeetingInfoDefaultValue,
  );

  return (
    <AppWrapper>
      <SetMeetingInfoProvider value={{setMeetingInfo}}>
        <MeetingInfoProvider value={{...meetingInfo}}>
          <ShareLinkProvider>
            <Switch>
              {/* commented for v1 release */}
              {/* {RenderCustomRoutes()} */}

              {/* Root Redirection */}
              <Route exact path={'/'}>
                <Redirect to={'/create'} />
              </Route>

              {/* Login Page */}
              {/* <Route path={'/login'}>
                <Login />
              </Route> */}

              {/* Authentication Process */}
              <Route exact path={'/authenticate'}>
                {shouldAuthenticate ? <OAuth /> : <Redirect to={'/'} />}
              </Route>
              <Route path={'/auth-token/:token'}>
                <StoreToken />
              </Route>

              {/* Exam Room Join */}
              <Route exact path={'/join'}>
                <Join />
              </Route>

              {/* Exam Room Creation */}
              {shouldAuthenticate ? (
                <PrivateRoute
                  path={'/create'}
                  failureRedirectTo={'/authenticate'}>
                  <Create />
                </PrivateRoute>
              ) : (
                <Route path={'/create'}>
                  <Create />
                </Route>
              )}

              {/* Exam Room */}
              <Route path={'/:phrase'}>
                <VideoCall />
              </Route>
            </Switch>
          </ShareLinkProvider>
        </MeetingInfoProvider>
      </SetMeetingInfoProvider>
    </AppWrapper>
  );
};

export default App;
