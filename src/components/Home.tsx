import React from 'react';
import { Button } from '@/components/ui/button';
import { Calendar, List, Users, Plus } from 'lucide-react';

interface HomeProps {
  onViewChange: (view: 'list' | 'calendar' | 'add' | 'grouped' | 'auth') => void;
}

const Home: React.FC<HomeProps> = ({ onViewChange }) => {
  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-900 via-gray-800 to-black">
      {/* Mobile-optimized header */}
      <header className="bg-gray-800 border-b border-gray-700 shadow-lg">
        <div className="container mx-auto px-4 py-3 sm:py-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center space-x-3">
              <img
                src="/lovable-uploads/1f08f82e-12c7-462f-ab64-a889203b9de5.png"
                alt="Φλαμουλάκι Logo"
                className="w-10 h-10 sm:w-12 sm:h-12 object-contain cursor-pointer"
                onClick={() => onViewChange('list')}
                onKeyDown={(e) => {
                  if (e.key === 'Enter' || e.key === ' ') {
                    e.preventDefault();
                    onViewChange('list');
                  }
                }}
                tabIndex={0}
                role="button"
                aria-label="Μετάβαση στη λίστα καλλιεργειών"
              />
            </div>
          </div>
        </div>
      </header>

      {/* Main content */}
      <main className="container mx-auto px-4 py-6 sm:py-8">
        {/* Mobile-optimized title section */}
        <div className="text-center mb-8 sm:mb-12">
          <h1 className="text-4xl sm:text-6xl font-bold mb-3 sm:mb-4">
            <div style={{ color: '#a44ef4' }}>Φλαμουλάκι</div>
          </h1>
          <h2 className="text-2xl sm:text-4xl font-bold mb-6 sm:mb-8">
            <div style={{ color: '#f66e14' }}>ημερολόγιο καλλιεργειών</div>
          </h2>
        </div>

        {/* Mobile-optimized navigation buttons grid */}
        <div className="max-w-2xl mx-auto">
          <div 
            className="grid grid-cols-2 gap-3 sm:gap-6"
            role="grid"
            aria-label="Επιλογές πλοήγησης εφαρμογής"
          >
            <Button
              onClick={() => onViewChange('calendar')}
              className="h-24 sm:h-32 bg-gradient-to-br from-green-500 to-green-600 hover:from-green-600 hover:to-green-700 text-white rounded-lg shadow-lg hover:shadow-xl transition-all duration-300 transform hover:scale-105 active:scale-95"
              data-nav-index="0"
              aria-label="Ανοίξει την προβολή ημερολογίου για να δείτε τις καλλιέργειες κατά ημερομηνία"
              role="gridcell"
            >
              <div className="flex flex-col items-center space-y-2 sm:space-y-3">
                <Calendar className="w-6 h-6 sm:w-8 sm:h-8" aria-hidden="true" />
                <span className="text-sm sm:text-lg font-semibold">Ημερολόγιο</span>
              </div>
            </Button>

            <Button
              onClick={() => onViewChange('list')}
              className="h-24 sm:h-32 bg-gradient-to-br from-blue-500 to-blue-600 hover:from-blue-600 hover:to-blue-700 text-white rounded-lg shadow-lg hover:shadow-xl transition-all duration-300 transform hover:scale-105 active:scale-95"
              data-nav-index="1"
              aria-label="Ανοίξει τη λίστα όλων των καταχωρημένων καλλιεργειών"
              role="gridcell"
            >
              <div className="flex flex-col items-center space-y-2 sm:space-y-3">
                <List className="w-6 h-6 sm:w-8 sm:h-8" aria-hidden="true" />
                <span className="text-sm sm:text-lg font-semibold">Λίστα</span>
              </div>
            </Button>

            <Button
              onClick={() => onViewChange('grouped')}
              className="h-24 sm:h-32 bg-gradient-to-br from-purple-500 to-purple-600 hover:from-purple-600 hover:to-purple-700 text-white rounded-lg shadow-lg hover:shadow-xl transition-all duration-300 transform hover:scale-105 active:scale-95"
              data-nav-index="2"
              aria-label="Ανοίξει την ομαδοποιημένη προβολή καλλιεργειών κατά τύπο φυτού"
              role="gridcell"
            >
              <div className="flex flex-col items-center space-y-2 sm:space-y-3">
                <Users className="w-6 h-6 sm:w-8 sm:h-8" aria-hidden="true" />
                <span className="text-sm sm:text-lg font-semibold">Ομαδοποίηση</span>
              </div>
            </Button>

            <Button
              onClick={() => onViewChange('add')}
              className="h-24 sm:h-32 bg-gradient-to-br from-orange-500 to-orange-600 hover:from-orange-600 hover:to-orange-700 text-white rounded-lg shadow-lg hover:shadow-xl transition-all duration-300 transform hover:scale-105 active:scale-95"
              data-nav-index="3"
              aria-label="Προσθήκη νέας καλλιέργειας"
              role="gridcell"
            >
              <div className="flex flex-col items-center space-y-2 sm:space-y-3">
                <Plus className="w-6 h-6 sm:w-8 sm:h-8" aria-hidden="true" />
                <span className="text-sm sm:text-lg font-semibold">Προσθήκη</span>
              </div>
            </Button>
          </div>
        </div>

        {/* Mobile-optimized welcome message */}
        <div className="text-center mt-8 sm:mt-12">
          <p className="text-gray-300 text-base sm:text-lg px-4" role="banner">
            Καλώς ήρθατε στο σύστημα διαχείρισης καλλιεργιών
          </p>
        </div>
      </main>
    </div>
  );
};

export default Home;
