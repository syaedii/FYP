import {createContext} from 'react';
import {createHook} from 'customization-implementation';

export interface ScreenshareContextInterface {
  isScreenshareActive: boolean;
  startUserScreenshare: () => void;
  stopUserScreenShare: () => void;
}

export const ScreenshareContext = createContext<ScreenshareContextInterface>({
  isScreenshareActive: false,
  startUserScreenshare: () => {},
  stopUserScreenShare: () => {},
});

const useScreenshare = createHook(ScreenshareContext);

export {useScreenshare};
