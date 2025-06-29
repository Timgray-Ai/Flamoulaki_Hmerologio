import React, { useState } from 'react';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import * as z from 'zod';
import { format } from 'date-fns';
import { el, enUS } from 'date-fns/locale';
import { CalendarIcon } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from '@/components/ui/form';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { Calendar } from '@/components/ui/calendar';
import { Popover, PopoverContent, PopoverTrigger } from '@/components/ui/popover';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { cn } from '@/lib/utils';
import { useCustomOptions } from '../hooks/useCustomOptions';
import { useLanguage } from '../contexts/LanguageContext';
import { CropEntry } from '../types/cropEntry';
import AddCustomPlant from './AddCustomPlant';
import AddCustomTask from './AddCustomTask';

interface CropEntryFormProps {
  onSubmit: (data: Omit<CropEntry, 'id' | 'createdAt'>) => void;
  initialData?: Partial<CropEntry>;
  isSubmitting?: boolean;
}

const CropEntryForm: React.FC<CropEntryFormProps> = ({ onSubmit, initialData, isSubmitting }) => {
  const { t, currentLanguage } = useLanguage();
  const { getAllPlants, getAllTasks, addCustomPlant, addCustomTask, isLoaded } = useCustomOptions();
  const [selectedPlant, setSelectedPlant] = useState<string>(initialData?.plant || '');

  // Get the appropriate locale for date formatting
  const getLocale = () => {
    return currentLanguage === 'el' ? el : enUS;
  };

  // Create form schema with translations
  const formSchema = z.object({
    plant: z.string().min(1, t('selectPlant')),
    task: z.string().min(1, t('selectTask')),
    date: z.date({
      required_error: t('selectDate'),
    }),
    notes: z.string().optional(),
  });

  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      plant: initialData?.plant || '',
      task: initialData?.task || '',
      date: initialData?.date ? new Date(initialData.date) : new Date(),
      notes: initialData?.notes || '',
    },
  });

  const handleSubmit = (values: z.infer<typeof formSchema>) => {
    onSubmit({
      plant: values.plant,
      task: values.task,
      date: values.date.toISOString(),
      notes: values.notes || '',
    });
  };

  if (!isLoaded) {
    return (
      <div className="max-w-2xl mx-auto px-2 sm:px-4">
        <Card className="shadow-lg bg-gray-800 border-gray-700">
          <CardContent className="p-4 sm:p-6 bg-gray-800">
            <div className="text-center py-12">
              <div className="w-16 h-16 sm:w-24 sm:h-24 mx-auto mb-4 bg-gray-700 rounded-full flex items-center justify-center">
                <CalendarIcon className="w-8 h-8 sm:w-12 sm:h-12 text-gray-500 animate-pulse" />
              </div>
              <h3 className="text-lg sm:text-xl font-medium text-gray-300 mb-2">{t('loading')}</h3>
            </div>
          </CardContent>
        </Card>
      </div>
    );
  }

  const allPlants = getAllPlants();
  const allTasks = getAllTasks();

  return (
    <div className="max-w-2xl mx-auto px-2 sm:px-4">
      <Card className="shadow-lg bg-gray-800 border-gray-700">
        <CardHeader className="border-b border-gray-700">
          <CardTitle className="text-xl sm:text-2xl font-bold text-gray-100">
            {initialData ? t('editEntry') : t('newEntry')}
          </CardTitle>
        </CardHeader>
        <CardContent className="p-4 sm:p-6 bg-gray-800">
          <Form {...form}>
            <form onSubmit={form.handleSubmit(handleSubmit)} className="space-y-4 sm:space-y-6">
              <FormField
                control={form.control}
                name="plant"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel className="text-sm sm:text-base text-gray-300">{t('plant')}</FormLabel>
                    <div className="flex gap-2">
                      <Select
                        value={field.value}
                        onValueChange={(value) => {
                          field.onChange(value);
                          setSelectedPlant(value);
                        }}
                      >
                        <FormControl>
                          <SelectTrigger className="flex-1">
                            <SelectValue placeholder={t('selectPlant')} />
                          </SelectTrigger>
                        </FormControl>
                        <SelectContent>
                          {allPlants.map((plant) => (
                            <SelectItem key={plant.id} value={plant.id}>
                              <div className="flex items-center space-x-2">
                                <span className="text-lg">{plant.icon}</span>
                                <span>{plant.name}</span>
                              </div>
                            </SelectItem>
                          ))}
                        </SelectContent>
                      </Select>
                      <AddCustomPlant onAddPlant={addCustomPlant} />
                    </div>
                    <FormMessage />
                  </FormItem>
                )}
              />

              <FormField
                control={form.control}
                name="task"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel className="text-sm sm:text-base text-gray-300">{t('task')}</FormLabel>
                    <div className="flex gap-2">
                      <Select
                        value={field.value}
                        onValueChange={field.onChange}
                      >
                        <FormControl>
                          <SelectTrigger className="flex-1">
                            <SelectValue placeholder={t('selectTask')} />
                          </SelectTrigger>
                        </FormControl>
                        <SelectContent>
                          {allTasks.map((task) => (
                            <SelectItem key={task} value={task}>
                              {task}
                            </SelectItem>
                          ))}
                        </SelectContent>
                      </Select>
                      <AddCustomTask onAddTask={addCustomTask} />
                    </div>
                    <FormMessage />
                  </FormItem>
                )}
              />

              <FormField
                control={form.control}
                name="date"
                render={({ field }) => (
                  <FormItem className="flex flex-col">
                    <FormLabel className="text-sm sm:text-base text-gray-300">{t('date')}</FormLabel>
                    <Popover>
                      <PopoverTrigger asChild>
                        <FormControl>
                          <Button
                            variant="outline"
                            className={cn(
                              "w-full pl-3 text-left font-normal",
                              !field.value && "text-muted-foreground"
                            )}
                          >
                            {field.value ? (
                              format(field.value, "PPP", { locale: getLocale() })
                            ) : (
                              <span>{t('selectDate')}</span>
                            )}
                            <CalendarIcon className="ml-auto h-4 w-4 opacity-50" />
                          </Button>
                        </FormControl>
                      </PopoverTrigger>
                      <PopoverContent className="w-auto p-0" align="start">
                        <Calendar
                          mode="single"
                          selected={field.value}
                          onSelect={field.onChange}
                          disabled={(date) =>
                            date > new Date() || date < new Date("1900-01-01")
                          }
                          initialFocus
                        />
                      </PopoverContent>
                    </Popover>
                    <FormMessage />
                  </FormItem>
                )}
              />

              <FormField
                control={form.control}
                name="notes"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel className="text-sm sm:text-base text-gray-300">{t('notes')}</FormLabel>
                    <FormControl>
                      <Textarea
                        placeholder={t('optionalNotes')}
                        className="resize-none"
                        {...field}
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />

              <div className="flex justify-end space-x-2 pt-4">
                <Button
                  type="submit"
                  disabled={isSubmitting}
                  className="bg-green-500 hover:bg-green-600 text-white"
                >
                  {isSubmitting ? t('saving') : t('save')}
                </Button>
              </div>
            </form>
          </Form>
        </CardContent>
      </Card>
    </div>
  );
};

export default CropEntryForm;
