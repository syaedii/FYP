import {useRender} from 'customization-api';
import {UidType, ToggleState} from '../../agora-rn-uikit';

/**
 * Returns a function that checks the video state for a given uid and returns true/false
 * @returns function
 */
function useIsVideoEnabled() {
  const {renderList} = useRender();

  /**
   *
   * @param uid UidType
   * @returns boolean
   */
  const isVideoEnabled = (uid: UidType): boolean =>
    renderList[uid]?.video === ToggleState.enabled;

  return isVideoEnabled;
}
export default useIsVideoEnabled;
