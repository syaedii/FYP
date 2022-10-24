import React, {useContext, useEffect} from 'react';
import PrimaryButton from '../../atoms/PrimaryButton';
import {usePreCall} from '../../components/precall/usePreCall';
import {useString} from '../../utils/useString';
import {ChannelProfile, PropsContext} from '../../../agora-rn-uikit';
import {JoinRoomButtonTextInterface} from '../../language/default-labels/precallScreenLabels';
import {useMeetingInfo} from '../meeting-info/useMeetingInfo';
import useGetName from '../../utils/useGetName';

export interface PreCallJoinCallBtnProps {
  render?: (
    onPress: () => void,
    title: string,
    disabled: boolean,
  ) => JSX.Element;
}

const JoinCallBtn = (props: PreCallJoinCallBtnProps) => {
  const {rtcProps} = useContext(PropsContext);
  const {setCallActive} = usePreCall();
  const username = useGetName();
  const {isJoinDataFetched} = useMeetingInfo();
  const joinRoomButton =
    useString<JoinRoomButtonTextInterface>('joinRoomButton');

  const [buttonText, setButtonText] = React.useState(
    joinRoomButton({
      ready: isJoinDataFetched,
      role: $config.EVENT_MODE ? rtcProps.role : undefined,
    }),
  );
  useEffect(() => {
    if (rtcProps?.role) {
      setButtonText(
        joinRoomButton({
          ready: isJoinDataFetched,
          role: $config.EVENT_MODE ? rtcProps.role : undefined,
        }),
      );
    }
  }, [rtcProps?.role]);

  const onSubmit = () => {
    setCallActive(true);
  };

  const title = buttonText;
  const onPress = () => onSubmit();
  const disabled = !isJoinDataFetched || username === '';
  return props?.render ? (
    props.render(onPress, title, disabled)
  ) : (
    <PrimaryButton onPress={onPress} disabled={disabled} text={title} />
  );
};

export default JoinCallBtn;
