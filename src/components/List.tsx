import React from 'react';
import { useLanguage } from '../hooks/useLanguage';
import { useEntries } from '../hooks/useEntries';
import { Button } from '@/components/ui/button';
import { Plus, Edit, Trash2 } from 'lucide-react';
import { format } from 'date-fns';

const List: React.FC = () => {
  const { t } = useLanguage();
  const { entries, deleteEntry } = useEntries();

  return (
    <div className="max-w-4xl mx-auto">
      <div className="bg-white/5 rounded-lg p-6">
        <div className="flex justify-between items-center mb-6">
          <h2 className="text-2xl font-bold text-white">{t('list')}</h2>
          <Button
            variant="outline"
            className="bg-green-500 hover:bg-green-600 text-white border-none"
          >
            <Plus className="w-4 h-4 mr-2" />
            {t('newEntry')}
          </Button>
        </div>

        <div className="space-y-4">
          {entries.map((entry) => (
            <div
              key={entry.id}
              className="bg-white/10 rounded-lg p-4 flex items-center justify-between"
            >
              <div>
                <h3 className="text-lg font-semibold text-white">{entry.plant}</h3>
                <p className="text-gray-300">{entry.task}</p>
                <p className="text-sm text-gray-400">
                  {format(new Date(entry.date), 'PPP')}
                </p>
              </div>
              <div className="flex space-x-2">
                <Button
                  variant="ghost"
                  size="icon"
                  className="text-blue-400 hover:text-blue-300"
                >
                  <Edit className="w-4 h-4" />
                </Button>
                <Button
                  variant="ghost"
                  size="icon"
                  className="text-red-400 hover:text-red-300"
                  onClick={() => deleteEntry(entry.id)}
                >
                  <Trash2 className="w-4 h-4" />
                </Button>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default List; 