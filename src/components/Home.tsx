import React, { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Calendar, List, Users, Plus, Info, Globe } from 'lucide-react';
import { useLanguage } from '../contexts/LanguageContext';
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { toast } from 'sonner';
import flamoulakiIcon from '../../images/Flamoulaki-icon.png';

interface HomeProps {
  onViewChange: (view: 'list' | 'calendar' | 'add' | 'grouped' | 'auth') => void;
}

const Home: React.FC<HomeProps> = ({ onViewChange }) => {
  const { t, currentLanguage, changeLanguage } = useLanguage();
  const [infoModalOpen, setInfoModalOpen] = useState(false);

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

  const handleLanguageChange = async (language: 'el' | 'en') => {
    console.log('Home: Changing language to:', language);
    try {
      await changeLanguage(language);
      console.log('Home: Language changed successfully to:', language);
      toast.success(t('languageChanged'), { duration: 1500 });
    } catch (error) {
      console.error('Home: Error changing language:', error);
      toast.error('Σφάλμα αλλαγής γλώσσας', { duration: 1500 });
    }
  };

  const infoContent = getInfoContent();

  return (
    <>
      <div className="min-h-screen bg-gradient-to-br from-gray-900 via-gray-800 to-black overflow-x-hidden">
        {/* Mobile-optimized header */}
        <header className="bg-gray-800 border-b border-gray-700 shadow-lg w-full max-w-full overflow-hidden">
          <div className="w-full px-3 sm:px-4 py-3 sm:py-4">
            <div className="flex items-center justify-between w-full">
              <div className="flex items-center space-x-2 sm:space-x-3 flex-shrink-0">
                <img
                  src={flamoulakiIcon}
                  alt={t('appTitle') + ' Logo'}
                  className="w-8 h-8 sm:w-10 sm:h-10 md:w-12 md:h-12 object-contain cursor-pointer transition-transform hover:scale-105 flex-shrink-0"
                  onClick={() => onViewChange('list')}
                  onKeyDown={(e) => {
                    if (e.key === 'Enter' || e.key === ' ') {
                      e.preventDefault();
                      onViewChange('list');
                    }
                  }}
                  tabIndex={0}
                  role="button"
                  aria-label={t('goToCropList')}
                />
              </div>
              
              <div className="flex items-center space-x-1 sm:space-x-2 flex-shrink-0">
                {/* Info Button */}
                <Button
                  variant="ghost"
                  size="sm"
                  onClick={() => setInfoModalOpen(true)}
                  className="text-gray-300 hover:text-white hover:bg-gray-700 p-2 sm:p-2"
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
                      className="text-gray-300 hover:text-white hover:bg-gray-700 p-2 sm:p-2"
                      aria-label={t('changeLanguage')}
                    >
                      <Globe className="h-4 w-4 mr-1" />
                      <span className="hidden sm:inline">{currentLanguage === 'el' ? 'EL' : 'EN'}</span>
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
              </div>
            </div>
          </div>
        </header>

        {/* Main content */}
        <main className="w-full px-3 sm:px-4 py-6 sm:py-8 max-w-full overflow-hidden">
          {/* Mobile-optimized title section */}
          <div className="text-center mb-8 sm:mb-12 w-full">
            <h1 className="text-3xl sm:text-4xl md:text-6xl font-bold mb-3 sm:mb-4 px-2">
              <div style={{ color: '#a44ef4' }}>{t('appTitle')}</div>
            </h1>
            <h2 className="text-xl sm:text-2xl md:text-4xl font-bold mb-6 sm:mb-8 px-2">
              <div style={{ color: '#f66e14' }}>{t('cropDiary')}</div>
            </h2>
          </div>

          {/* Mobile-optimized navigation buttons grid */}
          <div className="w-full max-w-2xl mx-auto px-2">
            <div 
              className="grid grid-cols-2 gap-2 sm:gap-3 md:gap-6 w-full"
              role="grid"
              aria-label={t('appNavigationOptions')}
            >
              <Button
                onClick={() => onViewChange('calendar')}
                className="h-20 sm:h-24 md:h-32 bg-gradient-to-br from-green-500 to-green-600 hover:from-green-600 hover:to-green-700 text-white rounded-lg shadow-lg hover:shadow-xl transition-all duration-300 transform hover:scale-105 active:scale-95 w-full"
                data-nav-index="0"
                aria-label={t('openCalendarView')}
                role="gridcell"
              >
                <div className="flex flex-col items-center space-y-1 sm:space-y-2 md:space-y-3">
                  <Calendar className="w-5 h-5 sm:w-6 sm:h-6 md:w-8 md:h-8" aria-hidden="true" />
                  <span className="text-xs sm:text-sm md:text-lg font-semibold">{t('calendar')}</span>
                </div>
              </Button>

              <Button
                onClick={() => onViewChange('list')}
                className="h-20 sm:h-24 md:h-32 bg-gradient-to-br from-blue-500 to-blue-600 hover:from-blue-600 hover:to-blue-700 text-white rounded-lg shadow-lg hover:shadow-xl transition-all duration-300 transform hover:scale-105 active:scale-95 w-full"
                data-nav-index="1"
                aria-label={t('openCropList')}
                role="gridcell"
              >
                <div className="flex flex-col items-center space-y-1 sm:space-y-2 md:space-y-3">
                  <List className="w-5 h-5 sm:w-6 sm:h-6 md:w-8 md:h-8" aria-hidden="true" />
                  <span className="text-xs sm:text-sm md:text-lg font-semibold">{t('list')}</span>
                </div>
              </Button>

              <Button
                onClick={() => onViewChange('grouped')}
                className="h-20 sm:h-24 md:h-32 bg-gradient-to-br from-purple-500 to-purple-600 hover:from-purple-600 hover:to-purple-700 text-white rounded-lg shadow-lg hover:shadow-xl transition-all duration-300 transform hover:scale-105 active:scale-95 w-full"
                data-nav-index="2"
                aria-label={t('openGroupedView')}
                role="gridcell"
              >
                <div className="flex flex-col items-center space-y-1 sm:space-y-2 md:space-y-3">
                  <Users className="w-5 h-5 sm:w-6 sm:h-6 md:w-8 md:h-8" aria-hidden="true" />
                  <span className="text-xs sm:text-sm md:text-lg font-semibold">{t('grouped')}</span>
                </div>
              </Button>

              <Button
                onClick={() => onViewChange('add')}
                className="h-20 sm:h-24 md:h-32 bg-gradient-to-br from-orange-500 to-orange-600 hover:from-orange-600 hover:to-orange-700 text-white rounded-lg shadow-lg hover:shadow-xl transition-all duration-300 transform hover:scale-105 active:scale-95 w-full"
                data-nav-index="3"
                aria-label={t('addNewCrop')}
                role="gridcell"
              >
                <div className="flex flex-col items-center space-y-1 sm:space-y-2 md:space-y-3">
                  <Plus className="w-5 h-5 sm:w-6 sm:h-6 md:w-8 md:h-8" aria-hidden="true" />
                  <span className="text-xs sm:text-sm md:text-lg font-semibold">{t('add')}</span>
                </div>
              </Button>
            </div>
          </div>

          {/* Mobile-optimized welcome message */}
          <div className="text-center mt-8 sm:mt-12 w-full">
            <p className="text-gray-300 text-sm sm:text-base md:text-lg px-2 sm:px-4" role="banner">
              {t('welcomeToCropSystem')}
            </p>
          </div>
        </main>
      </div>

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
          <div className="flex justify-between items-center pt-4">
            <span className="text-xs text-gray-500">Ver 1.1</span>
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

export default Home;
