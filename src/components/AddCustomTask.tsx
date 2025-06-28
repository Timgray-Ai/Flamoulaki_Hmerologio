
import React, { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from '@/components/ui/dialog';
import { Plus } from 'lucide-react';
import { toast } from 'sonner';

interface AddCustomTaskProps {
  onAddTask: (taskName: string) => void;
}

const AddCustomTask: React.FC<AddCustomTaskProps> = ({ onAddTask }) => {
  const [open, setOpen] = useState(false);
  const [taskName, setTaskName] = useState('');

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!taskName.trim()) {
      toast.error('Παρακαλώ εισάγετε όνομα εργασίας');
      return;
    }

    try {
      onAddTask(taskName.trim());
      
      toast.success('Η εργασία προστέθηκε επιτυχώς!');
      setTaskName('');
      setOpen(false);
    } catch (error) {
      toast.error(error instanceof Error ? error.message : 'Σφάλμα κατά την προσθήκη');
    }
  };

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogTrigger asChild>
        <Button variant="outline" size="sm" className="text-xs">
          <Plus className="w-3 h-3 mr-1" />
          Νέα εργασία
        </Button>
      </DialogTrigger>
      <DialogContent className="sm:max-w-md">
        <DialogHeader>
          <DialogTitle>Προσθήκη νέας εργασίας</DialogTitle>
        </DialogHeader>
        <form onSubmit={handleSubmit} className="space-y-4">
          <div>
            <Label htmlFor="task-name">Όνομα εργασίας</Label>
            <Input
              id="task-name"
              value={taskName}
              onChange={(e) => setTaskName(e.target.value)}
              placeholder="π.χ. Αφαίρεση ζιζανίων"
              className="mt-1"
            />
          </div>

          <div className="flex space-x-2 pt-4">
            <Button type="submit" className="flex-1">
              Προσθήκη
            </Button>
            <Button type="button" variant="outline" onClick={() => setOpen(false)} className="flex-1">
              Ακύρωση
            </Button>
          </div>
        </form>
      </DialogContent>
    </Dialog>
  );
};

export default AddCustomTask;
