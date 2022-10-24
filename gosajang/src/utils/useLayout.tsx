import React, {SetStateAction} from 'react';
import {createHook} from 'customization-implementation';

export interface LayoutContextInterface {
  currentLayout: string;
  setLayout: React.Dispatch<SetStateAction<string>>;
}

const LayoutContext = React.createContext<LayoutContextInterface>({
  currentLayout: '',
  setLayout: () => {},
});

interface LayoutProviderProps {
  value: LayoutContextInterface;
  children: React.ReactNode;
}
const LayoutProvider = (props: LayoutProviderProps) => {
  return (
    <LayoutContext.Provider value={{...props.value}}>
      {props.children}
    </LayoutContext.Provider>
  );
};
/**
 * The Layout app state governs the video call screen content display layout.
 */
const useLayout = createHook(LayoutContext);

export {LayoutProvider, useLayout};
