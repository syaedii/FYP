import React, {SetStateAction} from 'react';
import {SidePanelType} from '../subComponents/SidePanelEnum';
import {createHook} from 'customization-implementation';

export interface SidePanelContextInterface {
  sidePanel: SidePanelType;
  setSidePanel: React.Dispatch<SetStateAction<SidePanelType>>;
}

const SidePanelContext = React.createContext<SidePanelContextInterface>({
  sidePanel: SidePanelType.None,
  setSidePanel: () => {},
});

interface SidePanelProviderProps {
  value: SidePanelContextInterface;
  children: React.ReactNode;
}
const SidePanelProvider = (props: SidePanelProviderProps) => {
  return (
    <SidePanelContext.Provider value={{...props.value}}>
      {props.children}
    </SidePanelContext.Provider>
  );
};

/**
 * The Side panel app state governs the side panel.
 */
const useSidePanel = createHook(SidePanelContext);

export {SidePanelProvider, useSidePanel};
