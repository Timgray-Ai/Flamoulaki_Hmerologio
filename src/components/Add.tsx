import React, { useState } from 'react';
import { useLanguage } from '../hooks/useLanguage';
import { useEntries } from '../hooks/useEntries';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { Calendar } from '@/components/ui/calendar';
import { format } from 'date-fns';

const Add: React.FC = () => {
  const { t } = useLanguage();
  const { addEntry } = useEntries();
  const [date, setDate] = useState<Date>(new Date());
  const [plant, setPlant] = useState('');
  const [task, setTask] = useState('');
  const [notes, setNotes] = useState('');

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    addEntry({
      date: date.toISOString(),
      plant,
      task,
      notes,
    });
    // Reset form
    setDate(new Date());
    setPlant('');
    setTask('');
    setNotes('');
  };

  return (
    <div className="max-w-4xl mx-auto">
      <div className="bg-white/5 rounded-lg p-6">
        <h2 className="text-2xl font-bold text-white mb-6">{t('newEntry')}</h2>

        <form onSubmit={handleSubmit} className="space-y-6">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div>
              <label className="block text-sm font-medium text-gray-300 mb-2">
                {t('date')}
              </label>
              <Calendar
                mode="single"
                selected={date}
                onSelect={(date) => date && setDate(date)}
                className="bg-white/10 rounded-lg"
              />
            </div>

            <div className="space-y-4">
              <div>
                <label className="block text-sm font-medium text-gray-300 mb-2">
                  {t('plant')}
                </label>
                <Input
                  value={plant}
                  onChange={(e) => setPlant(e.target.value)}
                  className="bg-white/10 border-gray-700 text-white"
                  placeholder={t('selectPlant')}
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-300 mb-2">
                  {t('task')}
                </label>
                <Input
                  value={task}
                  onChange={(e) => setTask(e.target.value)}
                  className="bg-white/10 border-gray-700 text-white"
                  placeholder={t('selectTask')}
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-300 mb-2">
                  {t('notes')}
                </label>
                <Textarea
                  value={notes}
                  onChange={(e) => setNotes(e.target.value)}
                  className="bg-white/10 border-gray-700 text-white"
                  placeholder={t('enterNotes')}
                />
              </div>
            </div>
          </div>

          <div className="flex justify-end">
            <Button
              type="submit"
              className="bg-green-500 hover:bg-green-600 text-white"
            >
              {t('save')}
            </Button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default Add; 