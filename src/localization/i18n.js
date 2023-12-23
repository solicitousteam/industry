// import ReactNative from 'react-native';
import {I18nManager} from 'react-native';
import I18n from 'react-native-i18n';

// Import all locales
import en from '../../locale/en.json';
import gu from '../../locale/gu.json';
import hi from '../../locale/hi.json';
import bn from '../../locale/bn.json';
import kn from '../../locale/kn.json';
import kok from '../../locale/kok.json';
import ml from '../../locale/ml.json';
import mr from '../../locale/mr.json';
import or from '../../locale/or.json';
import ta from '../../locale/ta.json';
import te from '../../locale/te.json';

// import he from './he.json';

// Should the app fallback to English if user locale doesn't exists
// I18n.locale = "gu"
I18n.fallbacks = true;
// Define the supported translations
I18n.translations = {
  gu,
  en,
  hi,
  bn,
  kn,
  kok,
  ml,
  mr,
  or,
  ta,
  te,
  //   he
};

const currentLocale = I18n.currentLocale();

// Is it a RTL language?
export const isRTL =
  currentLocale.indexOf('he') === 0 || currentLocale.indexOf('ar') === 0;

// Allow RTL alignment in RTL languages
// ReactNative.I18nManager.allowRTL(isRTL);
I18nManager.allowRTL(isRTL);

// The method we'll use instead of a regular string
export function strings(name, params = {}) {
  return I18n.t(name, params);
}

//export default I18n;
