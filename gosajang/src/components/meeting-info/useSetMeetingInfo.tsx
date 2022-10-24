import React, {createContext, SetStateAction} from 'react';
import {createHook} from 'customization-implementation';
import {MeetingInfoContextInterface} from './useMeetingInfo';

export interface SetMeetingInfoContextInterface {
  setMeetingInfo: React.Dispatch<SetStateAction<MeetingInfoContextInterface>>;
}

const SetMeetingInfoContext = createContext<SetMeetingInfoContextInterface>({
  setMeetingInfo: () => {},
});

interface SetMeetingInfoProviderProps {
  children: React.ReactNode;
  value: SetMeetingInfoContextInterface;
}

const SetMeetingInfoProvider = (props: SetMeetingInfoProviderProps) => {
  return (
    <SetMeetingInfoContext.Provider value={{...props.value}}>
      {props.children}
    </SetMeetingInfoContext.Provider>
  );
};
const useSetMeetingInfo = createHook(SetMeetingInfoContext);

export {SetMeetingInfoProvider, useSetMeetingInfo};
