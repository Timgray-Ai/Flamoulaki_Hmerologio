import React, { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from '@/components/ui/dialog';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Plus } from 'lucide-react';
import { toast } from 'sonner';
import { useLanguage } from '../contexts/LanguageContext';

interface AddCustomPlantProps {
  onAddPlant: (plant: { name: string; color: string; icon: string }) => void;
}

const AddCustomPlant: React.FC<AddCustomPlantProps> = ({ onAddPlant }) => {
  const { t, currentLanguage } = useLanguage();
  const [open, setOpen] = useState(false);
  const [name, setName] = useState('');
  const [color, setColor] = useState('');
  const [icon, setIcon] = useState('');

  // Get plant colors based on language
  const getPlantColors = () => {
    if (currentLanguage === 'el') {
      return [
        { name: 'Πράσινο', value: '#16A34A' },
        { name: 'Κόκκινο', value: '#DC2626' },
        { name: 'Μπλε', value: '#2563EB' },
        { name: 'Πορτοκαλί', value: '#EA580C' },
        { name: 'Μωβ', value: '#7C3AED' },
        { name: 'Καφέ', value: '#8B4513' },
        { name: 'Ροζ', value: '#EC4899' },
        { name: 'Κίτρινο', value: '#EAB308' },
      ];
    } else {
      return [
        { name: 'Green', value: '#16A34A' },
        { name: 'Red', value: '#DC2626' },
        { name: 'Blue', value: '#2563EB' },
        { name: 'Orange', value: '#EA580C' },
        { name: 'Purple', value: '#7C3AED' },
        { name: 'Brown', value: '#8B4513' },
        { name: 'Pink', value: '#EC4899' },
        { name: 'Yellow', value: '#EAB308' },
      ];
    }
  };

  const PLANT_COLORS = getPlantColors();
  const PLANT_ICONS = ['🌱', '🌿', '🌾', '🌻', '🌹', '🌷', '🌺', '🌸', '🥕', '🥬', '🥒', '🍅', '🍆', '🌶️', '🥔', '🧄', '🧅'];

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!name.trim() || !color || !icon) {
      toast.error(t('fillAllFields'), { duration: 1500 });
      return;
    }

    try {
      onAddPlant({ 
        name: name.trim(), 
        color, 
        icon 
      });
      
      toast.success(t('plantAddedSuccessfully'), { duration: 1500 });
      setName('');
      setColor('');
      setIcon('');
      setOpen(false);
    } catch (error) {
      toast.error(error instanceof Error ? error.message : t('errorAddingPlant'), { duration: 1500 });
    }
  };

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogTrigger asChild>
        <Button variant="outline" size="sm" className="text-xs">
          <Plus className="w-3 h-3 mr-1" />
          {t('newPlant')}
        </Button>
      </DialogTrigger>
      <DialogContent className="sm:max-w-md">
        <DialogHeader>
          <DialogTitle>{t('addNewPlant')}</DialogTitle>
        </DialogHeader>
        <form onSubmit={handleSubmit} className="space-y-4">
          <div>
            <Label htmlFor="plant-name">{t('plantName')}</Label>
            <Input
              id="plant-name"
              value={name}
              onChange={(e) => setName(e.target.value)}
              placeholder={t('plantNameExample')}
              className="mt-1"
            />
          </div>

          <div>
            <Label htmlFor="plant-color">{t('color')}</Label>
            <Select value={color} onValueChange={setColor}>
              <SelectTrigger className="mt-1">
                <SelectValue placeholder={t('selectColor')} />
              </SelectTrigger>
              <SelectContent>
                {PLANT_COLORS.map((colorOption) => (
                  <SelectItem key={colorOption.value} value={colorOption.value}>
                    <div className="flex items-center space-x-2">
                      <div 
                        className="w-4 h-4 rounded-full border border-gray-300"
                        style={{ backgroundColor: colorOption.value }}
                      />
                      <span>{colorOption.name}</span>
                    </div>
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>

          <div>
            <Label htmlFor="plant-icon">{t('icon')}</Label>
            <Select value={icon} onValueChange={setIcon}>
              <SelectTrigger className="mt-1">
                <SelectValue placeholder={t('selectIcon')} />
              </SelectTrigger>
              <SelectContent>
                {PLANT_ICONS.map((iconOption) => (
                  <SelectItem key={iconOption} value={iconOption}>
                    <div className="flex items-center space-x-2">
                      <span className="text-lg">{iconOption}</span>
                    </div>
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
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

export default AddCustomPlant;
