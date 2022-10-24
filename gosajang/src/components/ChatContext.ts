import RtmEngine from 'agora-react-native-rtm';
import {UidType} from '../../agora-rn-uikit';
import {createContext, SetStateAction} from 'react';

export interface ChatBubbleProps {
  isLocal: boolean;
  message: string;
  createdTimestamp: string;
  updatedTimestamp?: string;
  uid: UidType;
  msgId: string;
  isDeleted: boolean;
  render?: (
    isLocal: boolean,
    message: string,
    createdTimestamp: string,
    uid: UidType,
    msgId: string,
    isDeleted: boolean,
    updatedTimestamp?: string,
  ) => JSX.Element;
}

export interface messageStoreInterface {
  createdTimestamp: string;
  updatedTimestamp?: string;
  uid: UidType;
  msg: string;
}

export enum messageActionType {
  Control = '0',
  Normal = '1',
}

export interface chatContext {
  hasUserJoinedRTM: boolean;
  engine: RtmEngine;
  localUid: UidType;
  onlineUsersCount: number;
}

export enum controlMessageEnum {
  muteVideo = '1',
  muteAudio = '2',
  muteSingleVideo = '3',
  muteSingleAudio = '4',
  kickUser = '5',
}

const ChatContext = createContext(null as unknown as chatContext);

export default ChatContext;
