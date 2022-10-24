import React from 'react';
import {CustomizationApiInterface} from 'customization-api';
import customizationConfig from 'customization';
import createHook from './createHook';

const CustomizationContext: React.Context<CustomizationApiInterface> =
  React.createContext(customizationConfig);

export interface CustomizationProviderProps {
  children: React.ReactNode;
  value: CustomizationApiInterface;
}

const CustomizationProvider = (props: CustomizationProviderProps) => {
  return (
    <CustomizationContext.Provider value={props.value}>
      {props.children}
    </CustomizationContext.Provider>
  );
};

const useCustomization = createHook(CustomizationContext);

export {useCustomization, CustomizationProvider};
