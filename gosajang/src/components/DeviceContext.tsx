import {createContext} from 'react';

interface DeviceContext {
  selectedCam: string;
  setSelectedCam: (cam: string) => void;
  selectedMic: string;
  setSelectedMic: (mic: string) => void;
  deviceList: MediaDeviceInfo[];
  setDeviceList: (devices: MediaDeviceInfo[]) => void;
}

const DeviceContext = createContext<DeviceContext>({
  selectedCam: '',
  selectedMic: '',
  deviceList: [],
  setSelectedCam: () => {},
  setSelectedMic: () => {},
  setDeviceList: () => {},
});
export default DeviceContext;
