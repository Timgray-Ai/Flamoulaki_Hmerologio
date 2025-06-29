import React, { useRef } from 'react';
import { Button } from '@/components/ui/button';
import { Calendar, List, Users, Plus, Home, Download, Upload, Globe } from 'lucide-react';
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

const Header = ({ currentView, onViewChange, isAuthenticated }) => {
  const { entries } = useEntries();
  const { exportToJson, importFromJson } = useBackupRestore();
  const { t, currentLanguage, changeLanguage } = useLanguage();
  const fileInputRef = useRef(null);

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

  return (
    <header className="bg-gray-800 border-b border-gray-700 shadow-lg">
      <div className="container mx-auto px-4 py-3">
        <div className="flex items-center justify-between">
          <div className="flex items-center space-x-2">
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
  );
};

export default Header;
