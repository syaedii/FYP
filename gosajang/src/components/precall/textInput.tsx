import React from 'react';
import TextInput from '../../atoms/TextInput';
import {useString} from '../../utils/useString';
import {useMeetingInfo} from '../meeting-info/useMeetingInfo';
import useSetName from '../../utils/useSetName';
import useGetName from '../../utils/useGetName';

const PreCallTextInput: React.FC = () => {
  //commented for v1 release
  // const userNamePlaceholder = useString('userNamePlaceholder')();
  // const fetchingNamePlaceholder = useString('fetchingNamePlaceholder')();
  const userNamePlaceholder = 'Display name*';
  const fetchingNamePlaceholder = 'Getting name...';
  const username = useGetName();
  const setUsername = useSetName();
  const {isJoinDataFetched} = useMeetingInfo();

  return (
    <TextInput
      value={username}
      onChangeText={(text) => setUsername(text ? text : '')}
      onSubmitEditing={() => {}}
      placeholder={
        isJoinDataFetched ? userNamePlaceholder : fetchingNamePlaceholder
      }
      editable={isJoinDataFetched}
    />
  );
};

export default PreCallTextInput;
