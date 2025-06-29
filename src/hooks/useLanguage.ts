import { useTranslation } from 'react-i18next';

// Απλό fallback για το useLanguage
export const useLanguage = () => {
  const { t, i18n } = useTranslation();

  const changeLanguage = async (language: string) => {
    localStorage.setItem('language', language);
    await i18n.changeLanguage(language);
  };

  const getCurrentLanguage = () => {
    return i18n.language;
  };

  return {
    t,
    changeLanguage,
    getCurrentLanguage,
    currentLanguage: i18n.language,
    isReady: i18n.isInitialized
  };
}; 