import React, {useState, useContext, useEffect} from 'react';
import {RenderInterface, useLocalUid} from '../../agora-rn-uikit';
import {useString} from '../utils/useString';
import StorageContext from './StorageContext';
import events, {EventPersistLevel} from '../rtm-events-api';
import {EventNames} from '../rtm-events';
import useLocalScreenShareUid from '../utils/useLocalShareScreenUid';
import {createHook} from 'customization-implementation';
import ChatContext from './ChatContext';
import {useRtc} from 'customization-api';

interface UserPreferenceContextInterface {
  displayName: string;
  setDisplayName: React.Dispatch<React.SetStateAction<string>>;
}

const UserPreferenceContext =
  React.createContext<UserPreferenceContextInterface>({
    displayName: '',
    setDisplayName: () => {},
  });

const UserPreferenceProvider = (props: {children: React.ReactNode}) => {
  const localUid = useLocalUid();
  const screenShareUid = useLocalScreenShareUid();
  const {dispatch} = useRtc();

  const {store, setStore} = useContext(StorageContext);
  const {hasUserJoinedRTM} = useContext(ChatContext);
  const getInitialUsername = () =>
    store?.displayName ? store.displayName : '';
  const [displayName, setDisplayName] = useState(getInitialUsername());

  //commented for v1 release
  // const userText = useString('remoteUserDefaultLabel')();
  const userText = 'User';
  const pstnUserLabel = useString('pstnUserLabel')();
  //commented for v1 release
  //const getScreenShareName = useString('screenshareUserName');
  const getScreenShareName = (name: string) => `${name}'s screenshare`;

  useEffect(() => {
    events.on(EventNames.NAME_ATTRIBUTE, (data) => {
      const value = JSON.parse(data?.payload);
      if (value) {
        if (value?.uid) {
          updateRenderListState(value?.uid, {
            name:
              String(value?.uid)[0] === '1'
                ? pstnUserLabel
                : value?.name || userText,
          });
        }
        if (value?.screenShareUid) {
          updateRenderListState(value?.screenShareUid, {
            name: getScreenShareName(value?.name || userText),
          });
        }
      }
    });
    return () => {
      events.off(EventNames.NAME_ATTRIBUTE);
    };
  }, []);

  useEffect(() => {
    //Update the store displayName value if the state is changed
    setStore((prevState) => {
      return {
        ...prevState,
        displayName,
      };
    });

    //update local state for user and screenshare
    updateRenderListState(localUid, {name: displayName || userText});
    updateRenderListState(screenShareUid, {
      name: getScreenShareName(displayName || userText),
    });

    if (hasUserJoinedRTM) {
      //update remote state for user and screenshare
      events.send(
        EventNames.NAME_ATTRIBUTE,
        JSON.stringify({
          uid: localUid,
          screenShareUid: screenShareUid,
          name: displayName || userText,
        }),
        EventPersistLevel.LEVEL2,
      );
    }
  }, [displayName, hasUserJoinedRTM]);

  const updateRenderListState = (
    uid: number,
    data: Partial<RenderInterface>,
  ) => {
    dispatch({type: 'UpdateRenderList', value: [uid, data]});
  };

  return (
    <UserPreferenceContext.Provider
      value={{
        setDisplayName,
        displayName,
      }}>
      {props.children}
    </UserPreferenceContext.Provider>
  );
};

const useUserPreference = createHook(UserPreferenceContext);

export {useUserPreference, UserPreferenceProvider};
