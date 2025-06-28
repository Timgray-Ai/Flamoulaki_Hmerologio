import React, { useState } from 'react';
import { CropEntry } from '../types/cropEntry';
import { format } from 'date-fns';
import { el } from 'date-fns/locale';
import { Calendar, ChevronDown, ChevronRight } from 'lucide-react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { useCustomOptions } from '../hooks/useCustomOptions';

interface CropGroupedViewProps {
  entries: CropEntry[];
}

const CropGroupedView: React.FC<CropGroupedViewProps> = ({ entries }) => {
  const [expandedPlants, setExpandedPlants] = useState<Set<string>>(new Set());
  const { getAllPlants, isLoaded } = useCustomOptions();

  // Don't render until custom options are loaded
  if (!isLoaded) {
    return (
      <div className="text-center py-12 px-4">
        <div className="w-20 h-20 sm:w-24 sm:h-24 mx-auto mb-4 bg-gray-700 rounded-full flex items-center justify-center">
          <Calendar className="w-10 h-10 sm:w-12 sm:h-12 text-gray-500 animate-pulse" />
        </div>
        <h3 className="text-lg sm:text-xl font-medium text-gray-300 mb-2">Φόρτωση...</h3>
      </div>
    );
  }

  const allPlants = getAllPlants();

  // Group entries by plant
  const groupedEntries = entries.reduce((acc, entry) => {
    if (!acc[entry.plant]) {
      acc[entry.plant] = [];
    }
    acc[entry.plant].push(entry);
    return acc;
  }, {} as Record<string, CropEntry[]>);

  // Sort entries within each group by date (newest first)
  Object.keys(groupedEntries).forEach(plant => {
    groupedEntries[plant].sort((a, b) => new Date(b.date).getTime() - new Date(a.date).getTime());
  });

  const togglePlantExpansion = (plantId: string) => {
    const newExpanded = new Set(expandedPlants);
    if (newExpanded.has(plantId)) {
      newExpanded.delete(plantId);
    } else {
      newExpanded.add(plantId);
    }
    setExpandedPlants(newExpanded);
  };

  if (entries.length === 0) {
    return (
      <div className="text-center py-12 px-4">
        <div className="w-20 h-20 sm:w-24 sm:h-24 mx-auto mb-4 bg-gray-700 rounded-full flex items-center justify-center">
          <Calendar className="w-10 h-10 sm:w-12 sm:h-12 text-gray-500" />
        </div>
        <h3 className="text-lg sm:text-xl font-medium text-gray-300 mb-2">Δεν υπάρχουν καταχωρίσεις</h3>
        <p className="text-gray-400 text-sm sm:text-base">Προσθέστε την πρώτη καταχώριση για τις καλλιέργειές σας!</p>
      </div>
    );
  }

  // Get plants that have entries and ensure we have their proper data
  const plantsToShow = Object.keys(groupedEntries)
    .map(plantId => {
      // Find the plant in our complete list (includes both default and custom plants)
      const plant = allPlants.find(p => p.id === plantId);
      
      if (plant) {
        console.log(`Found plant data for "${plantId}":`, plant);
        return plant;
      }
      
      // Fallback for plants not found (this should rarely happen with proper data)
      console.warn(`Plant with id "${plantId}" not found in plant list`);
      return {
        id: plantId,
        name: plantId.charAt(0).toUpperCase() + plantId.slice(1),
        color: '#6B7280',
        icon: '🌱'
      };
    })
    .filter(Boolean); // Remove any null/undefined values

  return (
    <div className="space-y-3 sm:space-y-4 px-2 sm:px-0">
      <div className="flex items-center justify-between mb-4 sm:mb-6 px-1">
        <h2 className="text-xl sm:text-2xl font-bold text-gray-100">Εργασίες ανά Καλλιέργεια</h2>
        <span className="text-xs sm:text-sm text-gray-400 bg-gray-700 px-2 sm:px-3 py-1 rounded-full border border-gray-600">
          {plantsToShow.length} καλλιέργειες
        </span>
      </div>

      {plantsToShow.map((plant) => {
        const plantEntries = groupedEntries[plant.id];
        const isExpanded = expandedPlants.has(plant.id);
        
        return (
          <Card key={plant.id} className="shadow-sm border-l-4 bg-gray-800 border-gray-700 hover:bg-gray-750 mx-1 sm:mx-0" 
                style={{ borderLeftColor: plant.color }}>
            <CardHeader className="pb-3 p-3 sm:p-6">
              <div className="flex items-center justify-between">
                <div className="flex items-center space-x-3">
                  <div 
                    className="w-10 h-10 sm:w-12 sm:h-12 rounded-full flex items-center justify-center text-white text-lg sm:text-xl font-bold flex-shrink-0"
                    style={{ backgroundColor: plant.color }}
                  >
                    {plant.icon}
                  </div>
                  <div className="min-w-0 flex-1">
                    <CardTitle className="text-lg sm:text-xl text-gray-100 truncate" style={{ color: plant.color }}>
                      {plant.name}
                    </CardTitle>
                    <p className="text-xs sm:text-sm text-gray-400 mt-1">
                      {plantEntries.length} εργασί{plantEntries.length === 1 ? 'α' : 'ες'}
                    </p>
                  </div>
                </div>
                
                <Button
                  variant="ghost"
                  size="sm"
                  onClick={() => togglePlantExpansion(plant.id)}
                  className="text-gray-400 hover:text-gray-200 flex-shrink-0 h-8 w-8 p-0"
                >
                  {isExpanded ? (
                    <ChevronDown className="w-4 h-4 sm:w-5 sm:h-5" />
                  ) : (
                    <ChevronRight className="w-4 h-4 sm:w-5 sm:h-5" />
                  )}
                </Button>
              </div>
            </CardHeader>
            
            {isExpanded && (
              <CardContent className="pt-0 p-3 sm:p-6 sm:pt-0">
                <div className="space-y-2 sm:space-y-3">
                  {plantEntries.map((entry) => (
                    <div 
                      key={entry.id}
                      className="border-l-2 pl-3 sm:pl-4 py-2 bg-gray-750 rounded-r-lg"
                      style={{ borderLeftColor: plant.color }}
                    >
                      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between mb-1">
                        <h4 className="font-medium text-gray-100 text-sm sm:text-base">{entry.task}</h4>
                        <span className="text-xs sm:text-sm text-gray-400 mt-1 sm:mt-0">
                          {format(new Date(entry.date), 'dd/MM/yyyy', { locale: el })}
                        </span>
                      </div>
                      
                      {entry.notes && (
                        <p className="text-xs sm:text-sm text-gray-300 mt-1 line-clamp-2">{entry.notes}</p>
                      )}
                      
                      <p className="text-xs text-gray-500 mt-1">
                        Καταχωρίστηκε: {format(new Date(entry.createdAt), 'dd/MM/yyyy HH:mm', { locale: el })}
                      </p>
                    </div>
                  ))}
                </div>
              </CardContent>
            )}
          </Card>
        );
      })}
    </div>
  );
};

export default CropGroupedView;
