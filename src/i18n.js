import i18n from 'i18next';
import { initReactI18next } from 'react-i18next';

// Import translation files
import elTranslations from './locales/el.json';
import enTranslations from './locales/en.json';

// Get saved language from localStorage or default to Greek
const getSavedLanguage = () => {
  const savedLanguage = localStorage.getItem('language');
  return savedLanguage || 'el';
};

// Initialize i18n synchronously
i18n
  .use(initReactI18next)
  .init({
    resources: {
      el: {
        translation: elTranslations
      },
      en: {
        translation: enTranslations
      }
    },
    lng: getSavedLanguage(), // default language
    fallbackLng: 'el',
    interpolation: {
      escapeValue: false // React already escapes values
    },
    react: {
      useSuspense: false
    },
    debug: true // Enable debug mode to see what's happening
  });

console.log('i18n initialized with language:', i18n.language);
console.log('Available languages:', Object.keys(i18n.store.data));

export default i18n; 