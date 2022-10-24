import React, {useContext} from 'react';
import {TouchableOpacity, Text, StyleSheet} from 'react-native';
import StorageContext, {initStoreValue} from '../components/StorageContext';
import {useHistory} from '../components/Router';
import {gql, useMutation} from '@apollo/client';
import {useString} from '../utils/useString';

const LOGOUT = gql`
  mutation logoutSession($token: String!) {
    logoutSession(token: $token)
  }
`;
/**
 * Sends a logout request to the backend and logs out the user from the frontend.
 */
const LogoutButton = () => {
  const {store, setStore} = useContext(StorageContext);
  const {token} = store;
  const history = useHistory();
  const [logoutQuery] = useMutation(LOGOUT);
  //commented for v1 release
  // const oauthLoginLabel = useString('oauthLoginLabel')();
  // const logoutButton = useString('logoutButton')();
  const oauthLoginLabel = 'Login using OAuth';
  const logoutButton = 'Logout';
  const logout = () => {
    if (setStore) {
      /**
       * In case of usage from FPE
       * User stored some data in localstorage we don't want to remove their on logout.
       * so setting prevstate with store default value
       */
      setStore((prevState) => {
        return {
          ...prevState,
          ...initStoreValue,
        };
      });
    }
    logoutQuery({variables: {token}}).catch((e) => {
      console.log(e);
    });
  };

  const login = () => {
    history.push('/authenticate');
  };

  return (
    <>
      {token === null ? (
        <TouchableOpacity style={style.btn} onPress={() => login()}>
          <Text style={style.btnText}>{oauthLoginLabel}</Text>
        </TouchableOpacity>
      ) : (
        <TouchableOpacity style={style.btn} onPress={() => logout()}>
          <Text style={style.btnText}>{logoutButton}</Text>
        </TouchableOpacity>
      )}
    </>
  );
};

const style = StyleSheet.create({
  btn: {
    width: '60%',
    maxWidth: 400,
    minHeight: 45,
    marginBottom: 15,
  },
  btnText: {
    width: '100%',
    height: 45,
    lineHeight: 45,
    fontSize: 16,
    fontWeight: '500',
    textAlign: 'center',
    textAlignVertical: 'center',
    color: $config.PRIMARY_FONT_COLOR,
    textDecorationLine: 'underline',
  },
});

export default LogoutButton;
