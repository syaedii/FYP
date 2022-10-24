import React, {createContext} from 'react';
import {createHook} from 'customization-implementation';
import {ApolloError} from '@apollo/client';

export interface PreCallContextInterface {
  callActive: boolean;
  setCallActive: React.Dispatch<React.SetStateAction<boolean>>;
  error?: ApolloError;
}

const PreCallContext = createContext<PreCallContextInterface>({
  callActive: false,
  setCallActive: () => {},
});

interface PreCallProviderProps {
  value: PreCallContextInterface;
  children: React.ReactNode;
}

const PreCallProvider = (props: PreCallProviderProps) => {
  return (
    <PreCallContext.Provider value={{...props.value}}>
      {props.children}
    </PreCallContext.Provider>
  );
};
const usePreCall = createHook(PreCallContext);

export {PreCallProvider, usePreCall};
