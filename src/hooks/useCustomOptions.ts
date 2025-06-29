import { useState, useEffect } from 'react';
import { 
  CropPlant, 
  CROP_PLANTS_EL, 
  CROP_PLANTS_EN,
  TASK_OPTIONS_EL, 
  TASK_OPTIONS_EN,
  CUSTOM_PLANTS_KEY, 
  CUSTOM_TASKS_KEY 
} from '../types/cropEntry';
import { useLanguage } from '../contexts/LanguageContext';

export const useCustomOptions = () => {
  const { currentLanguage, t } = useLanguage();
  const [customPlants, setCustomPlants] = useState<CropPlant[]>([]);
  const [customTasks, setCustomTasks] = useState<string[]>([]);
  const [isLoaded, setIsLoaded] = useState(false);

  // Get the appropriate plant and task data based on language
  const getDefaultPlants = (): CropPlant[] => {
    return currentLanguage === 'el' ? CROP_PLANTS_EL : CROP_PLANTS_EN;
  };

  const getDefaultTasks = (): string[] => {
    return currentLanguage === 'el' ? TASK_OPTIONS_EL : TASK_OPTIONS_EN;
  };

  // Load custom options from localStorage on mount
  useEffect(() => {
    console.log('Loading custom options from localStorage...');
    const savedPlants = localStorage.getItem(CUSTOM_PLANTS_KEY);
    const savedTasks = localStorage.getItem(CUSTOM_TASKS_KEY);

    if (savedPlants) {
      try {
        const parsed = JSON.parse(savedPlants);
        console.log('Loaded custom plants:', parsed);
        setCustomPlants(parsed);
      } catch (error) {
        console.error('Error loading custom plants:', error);
      }
    }

    if (savedTasks) {
      try {
        const parsed = JSON.parse(savedTasks);
        console.log('Loaded custom tasks:', parsed);
        setCustomTasks(parsed);
      } catch (error) {
        console.error('Error loading custom tasks:', error);
      }
    }

    setIsLoaded(true);
  }, []);

  // Save custom plants to localStorage
  const saveCustomPlants = (plants: CropPlant[]) => {
    console.log('Saving custom plants to localStorage:', plants);
    localStorage.setItem(CUSTOM_PLANTS_KEY, JSON.stringify(plants));
    setCustomPlants(plants);
  };

  // Save custom tasks to localStorage
  const saveCustomTasks = (tasks: string[]) => {
    console.log('Saving custom tasks to localStorage:', tasks);
    localStorage.setItem(CUSTOM_TASKS_KEY, JSON.stringify(tasks));
    setCustomTasks(tasks);
  };

  // Add a new custom plant
  const addCustomPlant = (plant: Omit<CropPlant, 'id'>) => {
    const id = plant.name.toLowerCase().replace(/\s+/g, '_');
    const newPlant: CropPlant = { ...plant, id };
    
    // Check if plant already exists
    const defaultPlants = getDefaultPlants();
    const allPlants = [...defaultPlants, ...customPlants];
    if (allPlants.some(p => p.id === id || p.name === plant.name)) {
      throw new Error(t('plantAlreadyExists'));
    }

    const updatedPlants = [...customPlants, newPlant];
    saveCustomPlants(updatedPlants);
    return newPlant;
  };

  // Add a new custom task
  const addCustomTask = (taskName: string) => {
    const trimmedTask = taskName.trim();
    
    // Check if task already exists
    const defaultTasks = getDefaultTasks();
    const allTasks = [...defaultTasks, ...customTasks];
    if (allTasks.includes(trimmedTask)) {
      throw new Error(t('taskAlreadyExists'));
    }

    const updatedTasks = [...customTasks, trimmedTask];
    saveCustomTasks(updatedTasks);
    return trimmedTask;
  };

  // Get all plants (default + custom)
  const getAllPlants = (): CropPlant[] => {
    const defaultPlants = getDefaultPlants();
    const allPlants = [...defaultPlants, ...customPlants];
    console.log('getAllPlants called, returning:', allPlants);
    return allPlants;
  };

  // Get all tasks (default + custom)
  const getAllTasks = (): string[] => {
    const defaultTasks = getDefaultTasks();
    return [...defaultTasks, ...customTasks];
  };

  return {
    customPlants,
    customTasks,
    isLoaded,
    addCustomPlant,
    addCustomTask,
    getAllPlants,
    getAllTasks
  };
};
