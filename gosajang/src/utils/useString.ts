import {useCustomization} from 'customization-implementation';
import {useLanguage} from '../language/useLanguage';
import {DEFAULT_I18_DATA} from '../language';
import {TextDataInterface} from '../language/default-labels/index';

export function usei18nData(
  selectedLanguageCode: string = DEFAULT_I18_DATA.locale,
) {
  const languageData = useCustomization((data) => data?.i18n);
  if (
    !selectedLanguageCode ||
    !languageData ||
    (languageData && !Array.isArray(languageData)) ||
    (languageData && Array.isArray(languageData) && !languageData.length)
  ) {
    return DEFAULT_I18_DATA.data;
  } else {
    let selectedLanguageData = languageData.find(
      (item) => item.locale === selectedLanguageCode,
    );
    if (selectedLanguageData && selectedLanguageData.data) {
      return {
        ...DEFAULT_I18_DATA.data,
        ...selectedLanguageData.data,
      };
    } else {
      return DEFAULT_I18_DATA.data;
    }
  }
}

export function useString<T = string>(
  keyName: keyof TextDataInterface,
): (input?: T) => string {
  const lanCode = useLanguage((data) => data.languageCode);
  const textData = usei18nData(lanCode);
  const getString = (input?: T) => {
    let keyValue = textData ? textData[keyName] : undefined;
    if (!keyValue) {
      return '';
    } else if (typeof keyValue === 'function') {
      return keyValue(input);
    } else if (typeof keyValue === 'string') {
      return keyValue;
    } else {
      return '';
    }
  };
  return getString;
}
