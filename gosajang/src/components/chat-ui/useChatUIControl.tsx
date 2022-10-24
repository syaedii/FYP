import {createHook} from 'customization-implementation';
import React, {SetStateAction, useState} from 'react';
import {UidType} from '../../../agora-rn-uikit';

export interface ChatUIControlInterface {
  groupActive: boolean;
  privateActive: boolean;
  selectedChatUserId: UidType;
  setGroupActive: React.Dispatch<SetStateAction<boolean>>;
  setPrivateActive: React.Dispatch<SetStateAction<boolean>>;
  setSelectedChatUserId: React.Dispatch<SetStateAction<UidType>>;
  message: string;
  setMessage: React.Dispatch<SetStateAction<string>>;
}

const ChatUIControlContext = React.createContext<ChatUIControlInterface>({
  groupActive: false,
  privateActive: false,
  selectedChatUserId: 0,
  message: '',
  setGroupActive: () => {},
  setPrivateActive: () => {},
  setSelectedChatUserId: () => {},
  setMessage: () => {},
});

interface ChatUIControlProviderProps {
  children: React.ReactNode;
}

const ChatUIControlProvider = (props: ChatUIControlProviderProps) => {
  const [groupActive, setGroupActive] = useState(false);
  const [privateActive, setPrivateActive] = useState(false);
  const [selectedChatUserId, setSelectedChatUserId] = useState<UidType>(0);
  const [message, setMessage] = useState('');
  return (
    <ChatUIControlContext.Provider
      value={{
        groupActive,
        privateActive,
        selectedChatUserId,
        setGroupActive,
        setPrivateActive,
        setSelectedChatUserId,
        message,
        setMessage,
      }}>
      {props.children}
    </ChatUIControlContext.Provider>
  );
};

/**
 * The ChatUIControl app state governs the chat ui.
 */
const useChatUIControl = createHook(ChatUIControlContext);

export {ChatUIControlProvider, useChatUIControl};
