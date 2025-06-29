import React, { useState, useEffect } from 'react';
import { useLanguage } from '../contexts/LanguageContext';
import { Button } from '@/components/ui/button';
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogDescription } from '@/components/ui/dialog';

const LanguageSelector: React.FC = () => {
  const { changeLanguage } = useLanguage();
  const [showSelector, setShowSelector] = useState(false);

  useEffect(() => {
    // Check if language is already set in localStorage
    const savedLanguage = localStorage.getItem('language');
    if (!savedLanguage) {
      setShowSelector(true);
    }
  }, []);

  const handleLanguageSelect = async (language: string) => {
    console.log('Changing language to:', language);
    
    try {
      await changeLanguage(language);
      console.log('Language changed successfully to:', language);
      // Close the selector
      setShowSelector(false);
      // Force re-render
      window.location.reload();
    } catch (error) {
      console.error('Error changing language:', error);
    }
  };

  return (
    <Dialog open={showSelector} onOpenChange={setShowSelector}>
      <DialogContent className="sm:max-w-md">
        <DialogHeader>
          <DialogTitle className="text-center text-xl font-bold">
            Επιλέξτε γλώσσα / Select Language
          </DialogTitle>
          <DialogDescription className="text-center">
            Επιλέξτε τη γλώσσα που θέλετε να χρησιμοποιήσετε / Choose the language you want to use
          </DialogDescription>
        </DialogHeader>
        <div className="flex flex-col space-y-4 p-6">
          <Button
            onClick={() => handleLanguageSelect('el')}
            className="w-full h-16 text-lg font-semibold bg-blue-600 hover:bg-blue-700 text-white"
          >
            Ελληνικά
          </Button>
          <Button
            onClick={() => handleLanguageSelect('en')}
            className="w-full h-16 text-lg font-semibold bg-green-600 hover:bg-green-700 text-white"
          >
            English
          </Button>
        </div>
      </DialogContent>
    </Dialog>
  );
};

export default LanguageSelector; 