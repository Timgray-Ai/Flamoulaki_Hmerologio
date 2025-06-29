import React, { useState } from 'react';
import { CropEntry } from '../types/cropEntry';
import { format, startOfMonth, endOfMonth, eachDayOfInterval, isSameDay, isToday, startOfWeek, endOfWeek, addDays } from 'date-fns';
import { el, enUS } from 'date-fns/locale';
import { ChevronLeft, ChevronRight, Calendar, ArrowLeft } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { useCustomOptions } from '../hooks/useCustomOptions';
import { useLanguage } from '../contexts/LanguageContext';
import CropEntryList from './CropEntryList';

interface CropCalendarProps {
  entries: CropEntry[];
  onDelete?: (id: string) => void;
  onEdit?: (entry: CropEntry) => void;
}

const CropCalendar: React.FC<CropCalendarProps> = ({ entries, onDelete, onEdit }) => {
  const [currentDate, setCurrentDate] = useState(new Date());
  const [selectedDate, setSelectedDate] = useState<Date | null>(null);
  const { getAllPlants, isLoaded } = useCustomOptions();
  const { t, currentLanguage } = useLanguage();

  // Get the appropriate locale for date formatting
  const getLocale = () => {
    return currentLanguage === 'el' ? el : enUS;
  };

  // Get day names based on language
  const getDayNames = () => {
    if (currentLanguage === 'el') {
      return {
        short: ['Δευ', 'Τρι', 'Τετ', 'Πεμ', 'Παρ', 'Σαβ', 'Κυρ'],
        full: ['Δευτέρα', 'Τρίτη', 'Τετάρτη', 'Πέμπτη', 'Παρασκευή', 'Σάββατο', 'Κυριακή']
      };
    } else {
      return {
        short: ['Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat', 'Sun'],
        full: ['Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday', 'Sunday']
      };
    }
  };

  // Don't render until custom options are loaded
  if (!isLoaded) {
    return (
      <div className="max-w-6xl mx-auto px-2 sm:px-4">
        <Card className="shadow-lg bg-gray-800 border-gray-700">
          <CardContent className="p-4 sm:p-6 bg-gray-800">
            <div className="text-center py-12">
              <div className="w-16 h-16 sm:w-24 sm:h-24 mx-auto mb-4 bg-gray-700 rounded-full flex items-center justify-center">
                <Calendar className="w-8 h-8 sm:w-12 sm:h-12 text-gray-500 animate-pulse" />
              </div>
              <h3 className="text-lg sm:text-xl font-medium text-gray-300 mb-2">{t('loading')}</h3>
            </div>
          </CardContent>
        </Card>
      </div>
    );
  }

  const allPlants = getAllPlants();

  const monthStart = startOfMonth(currentDate);
  const monthEnd = endOfMonth(currentDate);
  const calendarStart = startOfWeek(monthStart, { weekStartsOn: 1 }); // Start on Monday
  const calendarEnd = endOfWeek(monthEnd, { weekStartsOn: 1 }); // End on Sunday
  const monthDays = eachDayOfInterval({ start: calendarStart, end: calendarEnd });

  const getEntriesForDate = (date: Date) => {
    return entries.filter(entry => isSameDay(new Date(entry.date), date));
  };

  const goToPreviousMonth = () => {
    setCurrentDate(new Date(currentDate.getFullYear(), currentDate.getMonth() - 1, 1));
  };

  const goToNextMonth = () => {
    setCurrentDate(new Date(currentDate.getFullYear(), currentDate.getMonth() + 1, 1));
  };

  const handleDateClick = (date: Date) => {
    setSelectedDate(date);
  };

  const handleBackToCalendar = () => {
    setSelectedDate(null);
  };

  // Helper function to get plant data with proper fallback
  const getPlantData = (plantId: string) => {
    const plant = allPlants.find(p => p.id === plantId);
    
    if (plant) {
      console.log(`Found plant data for "${plantId}":`, plant);
      return plant;
    }
    
    // Fallback for plants not found
    console.warn(`Plant with id "${plantId}" not found in plant list`);
    return {
      id: plantId,
      name: plantId.charAt(0).toUpperCase() + plantId.slice(1),
      color: '#6B7280',
      icon: '🌱'
    };
  };

  // If a date is selected, show the entries for that date
  if (selectedDate) {
    const selectedDateEntries = getEntriesForDate(selectedDate);
    
    return (
      <div className="max-w-6xl mx-auto px-2 sm:px-4">
        <Card className="shadow-lg bg-gray-800 border-gray-700">
          <CardHeader className="bg-gradient-to-r from-gray-800 to-gray-700 border-b border-gray-600 p-4 sm:p-6">
            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
              <CardTitle className="flex items-center space-x-2 text-green-400 text-lg sm:text-xl">
                <Calendar className="w-5 h-5 sm:w-6 sm:h-6" />
                <span className="break-words">{t('entriesForDate')} {format(selectedDate, 'dd/MM/yyyy', { locale: getLocale() })}</span>
              </CardTitle>
              
              <Button 
                variant="outline" 
                onClick={handleBackToCalendar} 
                className="border-gray-600 text-gray-300 hover:bg-gray-700 hover:text-white w-full sm:w-auto"
                size="sm"
              >
                <ArrowLeft className="w-4 h-4 mr-2" />
                {t('back')}
              </Button>
            </div>
          </CardHeader>
          
          <CardContent className="p-4 sm:p-6 bg-gray-800">
            {selectedDateEntries.length > 0 ? (
              <CropEntryList entries={selectedDateEntries} onDelete={onDelete} onEdit={onEdit} />
            ) : (
              <div className="text-center py-8 sm:py-12">
                <div className="w-16 h-16 sm:w-24 sm:h-24 mx-auto mb-4 bg-gray-700 rounded-full flex items-center justify-center">
                  <Calendar className="w-8 h-8 sm:w-12 sm:h-12 text-gray-500" />
                </div>
                <h3 className="text-lg sm:text-xl font-medium text-gray-300 mb-2">{t('noEntries')}</h3>
                <p className="text-sm sm:text-base text-gray-400">{t('noEntriesForDate')}</p>
              </div>
            )}
          </CardContent>
        </Card>
      </div>
    );
  }

  const dayNames = getDayNames();

  return (
    <div className="max-w-6xl mx-auto px-2 sm:px-4">
      <Card className="shadow-lg bg-gray-800 border-gray-700">
        <CardHeader className="bg-gradient-to-r from-gray-800 to-gray-700 border-b border-gray-600 p-4 sm:p-6">
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
            <CardTitle className="flex items-center space-x-2 text-green-400 text-lg sm:text-xl">
              <Calendar className="w-5 h-5 sm:w-6 sm:h-6" />
              <span>{t('calendarView')}</span>
            </CardTitle>
            
            <div className="flex items-center justify-center space-x-2 sm:space-x-4">
              <Button 
                variant="outline" 
                size="sm" 
                onClick={goToPreviousMonth} 
                className="border-gray-600 text-gray-300 hover:bg-gray-700 hover:text-white p-2"
              >
                <ChevronLeft className="w-4 h-4" />
              </Button>
              
              <h2 className="text-lg sm:text-xl font-semibold text-gray-100 min-w-32 sm:min-w-48 text-center">
                {format(currentDate, 'MMMM yyyy', { locale: getLocale() })}
              </h2>
              
              <Button 
                variant="outline" 
                size="sm" 
                onClick={goToNextMonth} 
                className="border-gray-600 text-gray-300 hover:bg-gray-700 hover:text-white p-2"
              >
                <ChevronRight className="w-4 h-4" />
              </Button>
            </div>
          </div>
        </CardHeader>
        
        <CardContent className="p-4 sm:p-6 bg-gray-800">
          <div className="mb-4 text-center text-xs sm:text-sm text-gray-400">
            {t('clickDateToViewEntries')}
          </div>
          
          {/* Days of week header */}
          <div className="grid grid-cols-7 gap-0.5 sm:gap-2 mb-1 sm:mb-4">
            {dayNames.short.map((day, index) => (
              <div key={day} className="text-center font-semibold text-gray-300 py-0.5 sm:py-2 text-[10px] sm:text-sm">
                <span className="sm:hidden">{day}</span>
                <span className="hidden sm:inline">{dayNames.full[index]}</span>
              </div>
            ))}
          </div>
          
          {/* Calendar grid */}
          <div className="grid grid-cols-7 gap-1 sm:gap-2">
            {monthDays.map((day) => {
              const dayEntries = getEntriesForDate(day);
              const isCurrentDay = isToday(day);
              const hasEntries = dayEntries.length > 0;
              const isCurrentMonth = day.getMonth() === currentDate.getMonth();
              
              return (
                <div
                  key={day.toISOString()}
                  onClick={() => handleDateClick(day)}
                  className={`min-h-12 sm:min-h-24 p-1 sm:p-2 border rounded-lg transition-colors cursor-pointer ${
                    !isCurrentMonth
                      ? 'bg-gray-800 border-gray-700 text-gray-500'
                      : isCurrentDay
                      ? 'bg-blue-600 border-blue-500 text-white'
                      : hasEntries
                      ? 'bg-green-600 border-green-500 text-white hover:bg-green-700'
                      : 'bg-gray-700 border-gray-600 text-gray-300 hover:bg-gray-600'
                  }`}
                >
                  <div className="text-xs sm:text-sm font-medium mb-1">
                    {format(day, 'd')}
                  </div>
                  
                  {hasEntries && (
                    <div className="space-y-1">
                      {dayEntries.slice(0, 2).map((entry) => {
                        const plant = getPlantData(entry.plant);
                        return (
                          <div
                            key={entry.id}
                            className="text-[8px] sm:text-xs p-1 rounded truncate"
                            style={{ backgroundColor: plant.color + '20', color: plant.color }}
                          >
                            {plant.icon} {entry.task}
                          </div>
                        );
                      })}
                      
                      {dayEntries.length > 2 && (
                        <div className="text-[8px] sm:text-xs text-gray-400 text-center">
                          +{dayEntries.length - 2} {t('more')}
                        </div>
                      )}
                    </div>
                  )}
                </div>
              );
            })}
          </div>
          
          {/* Legend */}
          <div className="mt-4 sm:mt-6 pt-3 sm:pt-4 border-t border-gray-600">
            <h3 className="text-xs sm:text-sm font-semibold text-gray-300 mb-2 sm:mb-3">{t('crops')}:</h3>
            <div className="grid grid-cols-2 sm:flex sm:flex-wrap gap-2 sm:gap-3">
              {allPlants.map((plant) => (
                <div key={plant.id} className="flex items-center space-x-1 sm:space-x-2">
                  <div
                    className="w-3 h-3 sm:w-4 sm:h-4 rounded flex-shrink-0"
                    style={{ backgroundColor: plant.color }}
                  />
                  <span className="text-xs sm:text-sm text-gray-400 truncate">
                    {plant.icon} {plant.name}
                  </span>
                </div>
              ))}
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

export default CropCalendar;
