import React from 'react';
import {View} from 'react-native';
import {ButtonTemplateName} from '../../utils/useButtonTemplate';
import LocalAudioMute from '../../subComponents/LocalAudioMute';
import LocalVideoMute from '../../subComponents/LocalVideoMute';
import ParticipantName from './ParticipantName';

const MeParticipant = (props: any) => {
  const {p_style, name} = props;

  return (
    <View style={p_style.participantRow}>
      <ParticipantName value={name} />
      <View style={p_style.participantActionContainer}>
        <View style={[p_style.actionBtnIcon, {marginRight: 10}]}>
          <LocalAudioMute buttonTemplateName={ButtonTemplateName.topBar} />
        </View>
        {!$config.AUDIO_ROOM && (
          <View style={p_style.actionBtnIcon}>
            <LocalVideoMute buttonTemplateName={ButtonTemplateName.topBar} />
          </View>
        )}
      </View>
    </View>
  );
};
export default MeParticipant;
