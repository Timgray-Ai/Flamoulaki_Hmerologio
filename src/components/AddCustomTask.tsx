import React, { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from '@/components/ui/dialog';
import { Plus } from 'lucide-react';
import { toast } from 'sonner';
import { useLanguage } from '../contexts/LanguageContext';

interface AddCustomTaskProps {
  onAddTask: (taskName: string) => void;
}

const AddCustomTask: React.FC<AddCustomTaskProps> = ({ onAddTask }) => {
  const { t } = useLanguage();
  const [open, setOpen] = useState(false);
  const [taskName, setTaskName] = useState('');

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!taskName.trim()) {
      toast.error(t('enterTaskName'), { duration: 1500 });
      return;
    }

    try {
      onAddTask(taskName.trim());
      toast.success(t('taskAddedSuccessfully'), { duration: 1500 });
      setTaskName('');
      setOpen(false);
    } catch (error) {
      toast.error(error instanceof Error ? error.message : t('errorAddingTask'), { duration: 1500 });
    }
  };

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogTrigger asChild>
        <Button variant="outline" size="sm" className="text-xs">
          <Plus className="w-3 h-3 mr-1" />
          {t('newTask')}
        </Button>
      </DialogTrigger>
      <DialogContent className="sm:max-w-md">
        <DialogHeader>
          <DialogTitle>{t('addNewTask')}</DialogTitle>
        </DialogHeader>
        <form onSubmit={handleSubmit} className="space-y-4">
          <div>
            <Label htmlFor="task-name">{t('taskName')}</Label>
            <Input
              id="task-name"
              value={taskName}
              onChange={(e) => setTaskName(e.target.value)}
              placeholder={t('taskNameExample')}
              className="mt-1"
            />
          </div>

          <div className="flex space-x-2 pt-4">
            <Button type="submit" className="flex-1">
              {t('add')}
            </Button>
            <Button type="button" variant="outline" onClick={() => setOpen(false)} className="flex-1">
              {t('cancel')}
            </Button>
          </div>
        </form>
      </DialogContent>
    </Dialog>
  );
};

export default AddCustomTask;
