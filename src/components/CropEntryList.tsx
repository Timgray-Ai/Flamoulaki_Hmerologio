import React, { useState } from 'react';
import { CropEntry } from '../types/cropEntry';
import { format } from 'date-fns';
import { el, enUS } from 'date-fns/locale';
import { Card, CardContent } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Edit, Trash2, Calendar, Filter, X, FileText } from 'lucide-react';
import { useCustomOptions } from '../hooks/useCustomOptions';
import { useLanguage } from '../contexts/LanguageContext';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";

interface CropEntryListProps {
  entries: CropEntry[];
  onDelete?: (id: string) => void;
  onEdit?: (entry: CropEntry) => void;
}

const CropEntryList: React.FC<CropEntryListProps> = ({ entries, onDelete, onEdit }) => {
  const { t, currentLanguage } = useLanguage();
  const { getAllPlants } = useCustomOptions();
  const allPlants = getAllPlants();
  const [selectedCrop, setSelectedCrop] = useState<string>('all');
  const [selectedJob, setSelectedJob] = useState<string>('all');

  // Get the appropriate locale for date formatting
  const getLocale = () => {
    return currentLanguage === 'el' ? el : enUS;
  };

  const getPlantData = (plantId: string) => {
    const plant = allPlants.find(p => p.id === plantId);
    return plant || {
      id: plantId,
      name: plantId.charAt(0).toUpperCase() + plantId.slice(1),
      color: '#6B7280',
      icon: '🌱'
    };
  };

  // Get unique tasks
  const uniqueTasks = Array.from(new Set(entries.map(entry => entry.task)));

  // Filter entries based on selections
  const filteredEntries = entries.filter(entry => {
    const matchesCrop = selectedCrop === 'all' || entry.plant === selectedCrop;
    const matchesJob = selectedJob === 'all' || entry.task === selectedJob;
    return matchesCrop && matchesJob;
  });

  if (entries.length === 0) {
    return (
      <div className="text-center py-8 sm:py-12">
        <div className="w-16 h-16 sm:w-24 sm:h-24 mx-auto mb-4 bg-gray-700 rounded-full flex items-center justify-center">
          <Calendar className="w-8 h-8 sm:w-12 sm:h-12 text-gray-500" />
        </div>
        <h3 className="text-lg sm:text-xl font-medium text-gray-300 mb-2">{t('noEntries')}</h3>
        <p className="text-sm sm:text-base text-gray-400">{t('noEntriesToView')}</p>
      </div>
    );
  }

  const renderEntry = (entry: CropEntry) => {
    const plant = getPlantData(entry.plant);
    return (
      <Card key={entry.id} className="bg-gray-800 border-gray-700">
        <CardContent className="p-3 sm:p-4">
          <div className="flex flex-col sm:flex-row sm:items-start justify-between gap-2 sm:gap-4">
            <div className="flex-1 min-w-0">
              <div className="flex items-center gap-2 mb-1">
                <div
                  className="w-3 h-3 rounded-full"
                  style={{ backgroundColor: plant.color }}
                />
                <h3 className="text-sm sm:text-base font-medium text-gray-200 truncate">
                  {plant.name}
                </h3>
              </div>
              <p className="text-xs sm:text-sm text-gray-400 mb-1">
                {entry.task}
              </p>
              <div className="flex items-center text-xs text-gray-500 mb-2">
                <Calendar className="w-3 h-3 mr-1" />
                {format(new Date(entry.date), 'dd/MM/yyyy', { locale: getLocale() })}
              </div>
              {entry.notes && (
                <div className="mt-2 p-2 bg-gray-700/50 rounded-md">
                  <div className="flex items-start gap-2">
                    <FileText className="w-4 h-4 text-gray-400 mt-0.5" />
                    <p className="text-xs sm:text-sm text-gray-300 whitespace-pre-wrap">
                      {entry.notes}
                    </p>
                  </div>
                </div>
              )}
            </div>
            <div className="flex items-center gap-2">
              {onEdit && (
                <Button
                  variant="ghost"
                  size="icon"
                  onClick={() => onEdit(entry)}
                  className="text-gray-400 hover:text-gray-200"
                >
                  <Edit className="w-4 h-4" />
                </Button>
              )}
              {onDelete && (
                <Button
                  variant="ghost"
                  size="icon"
                  onClick={() => onDelete(entry.id)}
                  className="text-gray-400 hover:text-red-400"
                >
                  <Trash2 className="w-4 h-4" />
                </Button>
              )}
            </div>
          </div>
        </CardContent>
      </Card>
    );
  };

  return (
    <div className="space-y-4">
      <div className="flex flex-col sm:flex-row gap-4 p-4 bg-gray-800 rounded-lg">
        <div className="flex-1">
          <label className="text-sm text-gray-400 mb-2 block">{t('plant')}</label>
          <Select value={selectedCrop} onValueChange={setSelectedCrop}>
            <SelectTrigger className="w-full">
              <SelectValue placeholder={t('selectPlant')} />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="all">{t('allPlants')}</SelectItem>
              {allPlants.map(plant => (
                <SelectItem key={plant.id} value={plant.id}>
                  <div className="flex items-center gap-2">
                    <div
                      className="w-3 h-3 rounded-full"
                      style={{ backgroundColor: plant.color }}
                    />
                    {plant.name}
                  </div>
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
        </div>
        
        <div className="flex-1">
          <label className="text-sm text-gray-400 mb-2 block">{t('task')}</label>
          <Select value={selectedJob} onValueChange={setSelectedJob}>
            <SelectTrigger className="w-full">
              <SelectValue placeholder={t('selectTask')} />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="all">{t('allTasks')}</SelectItem>
              {uniqueTasks.map(task => (
                <SelectItem key={task} value={task}>
                  {task}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
        </div>

        {(selectedCrop !== 'all' || selectedJob !== 'all') && (
          <Button
            variant="ghost"
            size="icon"
            onClick={() => {
              setSelectedCrop('all');
              setSelectedJob('all');
            }}
            className="self-end"
          >
            <X className="w-4 h-4" />
          </Button>
        )}
      </div>

      <div className="space-y-2 sm:space-y-4">
        {filteredEntries.length === 0 ? (
          <div className="text-center py-8">
            <p className="text-gray-400">{t('noEntriesWithFilters')}</p>
          </div>
        ) : (
          filteredEntries.map(renderEntry)
        )}
      </div>
    </div>
  );
};

export default CropEntryList;
