import { getLocales } from 'expo-localization';
import { I18n } from 'i18n-js';
import EN from './en.json';

const translations = {
  en: EN,
};

// Set the key-value pairs for the different languages you want to support.
const i18n = new I18n(translations);

// Set the locale once at the beginning of your app.
i18n.locale = getLocales()[0].languageCode ?? 'en';

i18n.enableFallback = true;

export default i18n;
