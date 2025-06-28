import { CropEntry } from '../types/cropEntry';
import { CropPlant } from '../types/cropEntry';
import { CUSTOM_PLANTS_KEY, CUSTOM_TASKS_KEY } from '../types/cropEntry';
import { getEntries } from './entriesService';

interface BackupData {
  entries: CropEntry[];
  customPlants: CropPlant[];
  customTasks: string[];
  timestamp: string;
  version: string;
}

const BACKUP_VERSION = '1.0.0';

export const createBackup = async (): Promise<Blob> => {
  try {
    // Get all entries from Supabase
    const entries = await getEntries();
    
    // Get custom plants and tasks from localStorage
    const customPlants = JSON.parse(localStorage.getItem(CUSTOM_PLANTS_KEY) || '[]');
    const customTasks = JSON.parse(localStorage.getItem(CUSTOM_TASKS_KEY) || '[]');
    
    // Create backup data object
    const backupData: BackupData = {
      entries,
      customPlants,
      customTasks,
      timestamp: new Date().toISOString(),
      version: BACKUP_VERSION
    };
    
    // Convert to JSON and create blob
    const jsonString = JSON.stringify(backupData, null, 2);
    const blob = new Blob([jsonString], { type: 'application/json' });
    
    return blob;
  } catch (error) {
    console.error('Error creating backup:', error);
    throw new Error('Failed to create backup');
  }
};

export const restoreFromBackup = async (file: File): Promise<void> => {
  try {
    // Read the file
    const text = await file.text();
    const backupData: BackupData = JSON.parse(text);
    
    // Validate backup data
    if (!backupData.version || !backupData.entries || !backupData.customPlants || !backupData.customTasks) {
      throw new Error('Invalid backup file format');
    }
    
    // Restore custom plants and tasks to localStorage
    localStorage.setItem(CUSTOM_PLANTS_KEY, JSON.stringify(backupData.customPlants));
    localStorage.setItem(CUSTOM_TASKS_KEY, JSON.stringify(backupData.customTasks));
    
    // Note: Restoring entries would require additional implementation
    // as it needs to handle the Supabase database
    // This would need to be implemented based on your requirements
    
    return;
  } catch (error) {
    console.error('Error restoring backup:', error);
    throw new Error('Failed to restore backup');
  }
}; 