import React, { createContext, useContext, useEffect, useState } from 'react';
import { useTranslation } from 'react-i18next';

interface LanguageContextType {
  currentLanguage: string;
  changeLanguage: (language: string) => Promise<void>;
  t: (key: string, options?: any) => string;
  isReady: boolean;
}

const LanguageContext = createContext<LanguageContextType | undefined>(undefined);

export const LanguageProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const { t, i18n } = useTranslation();
  const [currentLanguage, setCurrentLanguage] = useState(i18n.language);
  const [isReady, setIsReady] = useState(i18n.isInitialized);

  useEffect(() => {
    const handleLanguageChange = () => {
      setCurrentLanguage(i18n.language);
      setIsReady(i18n.isInitialized);
    };

    i18n.on('languageChanged', handleLanguageChange);
    i18n.on('initialized', handleLanguageChange);

    return () => {
      i18n.off('languageChanged', handleLanguageChange);
      i18n.off('initialized', handleLanguageChange);
    };
  }, [i18n]);

  const changeLanguage = async (language: string) => {
    localStorage.setItem('language', language);
    await i18n.changeLanguage(language);
  };

  return (
    <LanguageContext.Provider value={{
      currentLanguage,
      changeLanguage,
      t,
      isReady
    }}>
      {children}
    </LanguageContext.Provider>
  );
};

export const useLanguage = () => {
  const context = useContext(LanguageContext);
  if (context === undefined) {
    throw new Error('useLanguage must be used within a LanguageProvider');
  }
  return context;
}; 