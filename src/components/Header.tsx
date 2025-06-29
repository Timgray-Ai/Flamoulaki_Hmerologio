import React, { useRef, useState } from 'react';
import { Button } from '@/components/ui/button';
import { Calendar, List, Users, Plus, Home, Download, Upload, Globe, Info } from 'lucide-react';
import { useEntries } from '../hooks/useEntries';
import { toast } from 'sonner';
import { useBackupRestore } from '../hooks/useBackupRestore';
import { useLanguage } from '../contexts/LanguageContext';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import flamoulakiIcon from '../../images/Flamoulaki-icon.png';

const Header = ({ currentView, onViewChange, isAuthenticated }) => {
  const { entries } = useEntries();
  const { exportToJson, importFromJson } = useBackupRestore();
  const { t, currentLanguage, changeLanguage } = useLanguage();
  const fileInputRef = useRef(null);
  const [infoModalOpen, setInfoModalOpen] = useState(false);

  const handleBackup = async () => {
    try {
      await exportToJson(entries);
      toast.success(
        <div>
          <p>{t('backupCreated')}</p>
          <p className="text-sm text-gray-400">{t('backupSaved')}</p>
        </div>,
        { duration: 1500 }
      );
    } catch (error) {
      toast.error(t('backupError'), { duration: 1500 });
    }
  };

  const handleRestore = async () => {
    try {
      if (fileInputRef.current) {
        fileInputRef.current.click();
      }
    } catch (error) {
      toast.error(t('restoreError'), { duration: 1500 });
    }
  };

  const handleLanguageChange = async (language: 'el' | 'en') => {
    await changeLanguage(language);
    toast.success(t('languageChanged'), { duration: 1500 });
  };

  const getInfoContent = () => {
    if (currentLanguage === 'el') {
      return {
        title: 'Καλώς ήρθατε στο Flamoulaki-Hmerologio!',
        content: [
          'Αυτή είναι η πρώτη μου εφαρμογή, φτιαγμένη με αγάπη και μεράκι για όλους όσους αγαπούν τις καλλιέργειες.',
          'Το Flamoulaki είναι εντελώς δωρεάν, και θα χαρώ πολύ να ακούσω τα σχόλια ή τις προτάσεις σας.',
          '📩 Επικοινωνία: flamoulaki.calendar@gmail.com'
        ]
      };
    } else {
      return {
        title: 'Welcome to Flamoulaki-Hmerologio!',
        content: [
          'This is my first application, made with love and passion for everyone who loves crops.',
          'Flamoulaki is completely free, and I would be very happy to hear your comments or suggestions.',
          '📩 Contact: flamoulaki.calendar@gmail.com'
        ]
      };
    }
  };

  const infoContent = getInfoContent();

  return (
    <>
      <header className="bg-gray-800 border-b border-gray-700 shadow-lg">
        <div className="container mx-auto px-4 py-3">
          <div className="flex items-center justify-between">
            <div className="flex items-center space-x-2">
              <img
                src={flamoulakiIcon}
                alt={t('appTitle') + ' Logo'}
                className="w-8 h-8 sm:w-10 sm:h-10 object-contain cursor-pointer transition-transform hover:scale-105 mr-2"
                onClick={() => onViewChange('home')}
                onKeyDown={(e) => {
                  if (e.key === 'Enter' || e.key === ' ') {
                    e.preventDefault();
                    onViewChange('home');
                  }
                }}
                tabIndex={0}
                role="button"
                aria-label={t('backToHome')}
              />
              <Button
                variant="ghost"
                onClick={() => onViewChange('home')}
                className="text-gray-300 hover:text-white hover:bg-gray-700"
                aria-label={t('backToHome')}
              >
                <Home className="h-5 w-5 mr-2" />
                {t('home')}
              </Button>
              <Button
                variant="ghost"
                onClick={() => onViewChange('calendar')}
                className={`text-gray-300 hover:text-white hover:bg-gray-700 ${
                  currentView === 'calendar' ? 'bg-gray-700' : ''
                }`}
                aria-label={t('viewCalendar')}
              >
                <Calendar className="h-5 w-5 mr-2" />
                {t('calendar')}
              </Button>
              <Button
                variant="ghost"
                onClick={() => onViewChange('list')}
                className={`text-gray-300 hover:text-white hover:bg-gray-700 ${
                  currentView === 'list' ? 'bg-gray-700' : ''
                }`}
                aria-label={t('viewList')}
              >
                <List className="h-5 w-5 mr-2" />
                {t('list')}
              </Button>
              <Button
                variant="ghost"
                onClick={() => onViewChange('grouped')}
                className={`text-gray-300 hover:text-white hover:bg-gray-700 ${
                  currentView === 'grouped' ? 'bg-gray-700' : ''
                }`}
                aria-label={t('viewGrouped')}
              >
                <Users className="h-5 w-5 mr-2" />
                {t('grouped')}
              </Button>
              <Button
                variant="ghost"
                onClick={() => onViewChange('add')}
                className={`text-gray-300 hover:text-white hover:bg-gray-700 ${
                  currentView === 'add' ? 'bg-gray-700' : ''
                }`}
                aria-label={t('addNewEntry')}
              >
                <Plus className="h-5 w-5 mr-2" />
                {t('add')}
              </Button>
            </div>
            <div className="flex items-center space-x-2">
              {/* Info Button */}
              <Button
                variant="ghost"
                size="sm"
                onClick={() => setInfoModalOpen(true)}
                className="text-gray-300 hover:text-white hover:bg-gray-700"
                aria-label="Info"
              >
                <Info className="h-4 w-4" />
              </Button>

              {/* Language Switcher */}
              <DropdownMenu>
                <DropdownMenuTrigger asChild>
                  <Button
                    variant="ghost"
                    size="sm"
                    className="text-gray-300 hover:text-white hover:bg-gray-700"
                    aria-label={t('changeLanguage')}
                  >
                    <Globe className="h-4 w-4 mr-1" />
                    {currentLanguage === 'el' ? 'EL' : 'EN'}
                  </Button>
                </DropdownMenuTrigger>
                <DropdownMenuContent>
                  <DropdownMenuItem 
                    onClick={() => handleLanguageChange('el')}
                    className={currentLanguage === 'el' ? 'bg-gray-700' : ''}
                  >
                    🇬🇷 Ελληνικά
                  </DropdownMenuItem>
                  <DropdownMenuItem 
                    onClick={() => handleLanguageChange('en')}
                    className={currentLanguage === 'en' ? 'bg-gray-700' : ''}
                  >
                    🇺🇸 English
                  </DropdownMenuItem>
                </DropdownMenuContent>
              </DropdownMenu>

              {isAuthenticated && (
                <DropdownMenu>
                  <DropdownMenuTrigger asChild>
                    <Button
                      variant="ghost"
                      className="text-gray-300 hover:text-white hover:bg-gray-700"
                    >
                      <Download className="h-5 w-5 mr-2" />
                      {t('backupRestore')}
                    </Button>
                  </DropdownMenuTrigger>
                  <DropdownMenuContent>
                    <DropdownMenuItem onClick={handleBackup}>
                      <Download className="h-4 w-4 mr-2" />
                      {t('createBackup')}
                    </DropdownMenuItem>
                    <DropdownMenuItem onClick={handleRestore}>
                      <Upload className="h-4 w-4 mr-2" />
                      {t('restoreFromBackup')}
                    </DropdownMenuItem>
                  </DropdownMenuContent>
                </DropdownMenu>
              )}
            </div>
          </div>
        </div>
        <input
          type="file"
          ref={fileInputRef}
          onChange={(e) => {
            const file = e.target.files?.[0];
            if (file) {
              importFromJson(file);
            }
          }}
          accept=".json"
          className="hidden"
        />
      </header>

      {/* Info Modal */}
      <Dialog open={infoModalOpen} onOpenChange={setInfoModalOpen}>
        <DialogContent className="sm:max-w-md bg-gray-800 border-gray-700">
          <DialogHeader>
            <DialogTitle className="text-green-400 text-lg">
              {infoContent.title}
            </DialogTitle>
          </DialogHeader>
          <div className="space-y-4 text-gray-300">
            {infoContent.content.map((paragraph, index) => (
              <p key={index} className="text-sm leading-relaxed">
                {paragraph}
              </p>
            ))}
          </div>
          <div className="flex justify-end pt-4">
            <Button
              onClick={() => setInfoModalOpen(false)}
              className="bg-green-600 hover:bg-green-700 text-white"
            >
              OK
            </Button>
          </div>
        </DialogContent>
      </Dialog>
    </>
  );
};

export default Header;
