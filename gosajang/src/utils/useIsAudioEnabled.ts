import {useRender} from 'customization-api';
import {UidType} from '../../agora-rn-uikit';
import {ToggleState} from '../../agora-rn-uikit/src/Contexts/PropsContext';

/**
 * Returns a function that checks the audio state for a given uid and returns true/false
 * @returns function
 */
function useIsAudioEnabled() {
  const {renderList} = useRender();
  /**
   *
   * @param uid UidType
   * @returns boolean
   */
  const isAudioEnabled = (uid: UidType): boolean =>
    renderList[uid]?.audio === ToggleState.enabled;

  return isAudioEnabled;
}

export default useIsAudioEnabled;
