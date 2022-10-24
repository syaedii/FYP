import React from 'react';
import {BtnTemplate, BtnTemplateInterface} from '../../agora-rn-uikit';
import {useRecording} from './recording/useRecording';
import {useString} from '../utils/useString';
import {
  ButtonTemplateName,
  useButtonTemplate,
} from '../utils/useButtonTemplate';
import Styles from '../components/styles';

export interface RecordingButtonProps {
  buttonTemplateName?: ButtonTemplateName;
  render?: (
    onPress: () => void,
    isRecordingActive: boolean,
    buttonTemplateName?: ButtonTemplateName,
  ) => JSX.Element;
}

const Recording = (props: RecordingButtonProps) => {
  const {startRecording, stopRecording, isRecordingActive} = useRecording();
  //commented for v1 release
  //const recordingButton = useString<boolean>('recordingButton');
  const recordingButton = (recording: boolean) =>
    recording ? 'Recording' : 'Record';
  const defaultTemplateValue = useButtonTemplate().buttonTemplateName;
  const {buttonTemplateName = defaultTemplateValue} = props;
  const onPress = () => {
    if (!isRecordingActive) {
      startRecording && startRecording();
    } else {
      stopRecording && stopRecording();
    }
  };
  let btnTemplateProps: BtnTemplateInterface = {
    name: isRecordingActive ? 'recordingActiveIcon' : 'recordingIcon',
    onPress,
    color: isRecordingActive ? '#FD0845' : $config.PRIMARY_COLOR,
  };

  if (buttonTemplateName === ButtonTemplateName.topBar) {
    btnTemplateProps.style = Styles.fullWidthButton as Object;
  } else {
    btnTemplateProps.btnText = recordingButton(isRecordingActive);
    btnTemplateProps.style = Styles.localButton as Object;
  }

  return props?.render ? (
    props.render(onPress, isRecordingActive, buttonTemplateName)
  ) : (
    <BtnTemplate {...btnTemplateProps} />
  );
};

export default Recording;
