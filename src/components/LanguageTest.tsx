import React from 'react';
import { useTranslation } from 'react-i18next';
import { Button } from '@/components/ui/button';

const LanguageTest: React.FC = () => {
  const { t, i18n } = useTranslation();

  const changeLanguage = (language: string) => {
    console.log('Current language before change:', i18n.language);
    console.log('Changing to:', language);
    
    localStorage.setItem('language', language);
    i18n.changeLanguage(language).then(() => {
      console.log('Language changed to:', i18n.language);
      console.log('Translation test:', t('welcome'));
      window.location.reload();
    });
  };

  return (
    <div className="fixed top-4 right-4 bg-white/10 p-4 rounded-lg z-50">
      <div className="text-white mb-2">
        <strong>Current Language:</strong> {i18n.language}
      </div>
      <div className="text-white mb-2">
        <strong>Test Translation:</strong> {t('welcome')}
      </div>
      <div className="flex space-x-2">
        <Button
          onClick={() => changeLanguage('el')}
          className="bg-blue-600 hover:bg-blue-700 text-white"
          size="sm"
        >
          Ελληνικά
        </Button>
        <Button
          onClick={() => changeLanguage('en')}
          className="bg-green-600 hover:bg-green-700 text-white"
          size="sm"
        >
          English
        </Button>
      </div>
    </div>
  );
};

export default LanguageTest; 