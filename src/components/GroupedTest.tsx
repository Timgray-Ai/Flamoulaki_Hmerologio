import React from 'react';
import { useLanguage } from '../contexts/LanguageContext';
import { useTranslation } from 'react-i18next';
import { Button } from '@/components/ui/button';
import { Plus, Edit, Trash2 } from 'lucide-react';

const GroupedTest: React.FC = () => {
  const { t: useLanguageT, isReady } = useLanguage();
  const { t: directT } = useTranslation();

  return (
    <div className="max-w-4xl mx-auto mt-8">
      <div className="bg-white/5 rounded-lg p-6">
        <div className="flex justify-between items-center mb-6">
          <div>
            <h2 className="text-2xl font-bold text-white">
              useLanguage Hook: {String(useLanguageT('grouped'))} (Ready: {isReady ? 'Yes' : 'No'})
            </h2>
            <h3 className="text-lg text-gray-300">
              Direct useTranslation: {String(directT('grouped'))}
            </h3>
            <h4 className="text-md text-gray-400">
              New Entry (useLanguage): {String(useLanguageT('newEntry'))}
            </h4>
            <h4 className="text-md text-gray-400">
              New Entry (direct): {String(directT('newEntry'))}
            </h4>
          </div>
          <Button
            variant="outline"
            className="bg-green-500 hover:bg-green-600 text-white border-none"
          >
            <Plus className="w-4 h-4 mr-2" />
            {String(useLanguageT('newEntry'))}
          </Button>
        </div>
      </div>
    </div>
  );
};

export default GroupedTest; 