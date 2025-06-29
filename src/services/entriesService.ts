import { CropEntry } from '../types/cropEntry';
import { generateUUID } from '../lib/utils';

const ENTRIES_STORAGE_KEY = 'crop_entries';

/**
 * Service για τη διαχείριση των καταχωρήσεων καλλιεργειών με χρήση localStorage
 */

/**
 * Παίρνει όλες τις καταχωρήσεις από το localStorage
 * @returns Promise<CropEntry[]> - Λίστα με όλες τις καταχωρήσεις
 */
export const getEntries = async (): Promise<CropEntry[]> => {
  console.log('📊 Fetching entries from localStorage...');
  
  try {
    const entriesJson = localStorage.getItem(ENTRIES_STORAGE_KEY);
    const entries = entriesJson ? JSON.parse(entriesJson) : [];
    
    // Sort entries by date (newest first)
    entries.sort((a: CropEntry, b: CropEntry) => 
      new Date(b.date).getTime() - new Date(a.date).getTime()
    );
    
    console.log(`✅ Successfully fetched ${entries.length} entries`);
    return entries;
  } catch (error) {
    console.error('❌ Error fetching entries:', error);
    throw new Error(`Σφάλμα κατά την ανάκτηση των καταχωρήσεων: ${error instanceof Error ? error.message : 'Unknown error'}`);
  }
};

/**
 * Προσθέτει μια νέα καταχώριση στο localStorage
 * @param entryData - Τα δεδομένα της νέας καταχώρισης
 * @returns Promise<CropEntry> - Η νέα καταχώριση που δημιουργήθηκε
 */
export const addEntry = async (entryData: Omit<CropEntry, 'id' | 'createdAt'>): Promise<CropEntry> => {
  console.log('📝 Adding new entry to localStorage:', entryData);
  
  try {
    const entries = await getEntries();
    const newEntry: CropEntry = {
      ...entryData,
      id: generateUUID(),
      createdAt: new Date().toISOString()
    };
    
    entries.unshift(newEntry);
    localStorage.setItem(ENTRIES_STORAGE_KEY, JSON.stringify(entries));
    
    console.log('✅ Successfully added entry:', newEntry);
    return newEntry;
  } catch (error) {
    console.error('❌ Error adding entry:', error);
    throw new Error(`Σφάλμα κατά την προσθήκη της καταχώρισης: ${error instanceof Error ? error.message : 'Unknown error'}`);
  }
};

/**
 * Διαγράφει μια καταχώριση από το localStorage
 * @param id - Το ID της καταχώρισης προς διαγραφή
 * @returns Promise<void>
 */
export const deleteEntry = async (id: string): Promise<void> => {
  console.log('🗑️ Deleting entry from localStorage:', id);
  
  try {
    const entries = await getEntries();
    const updatedEntries = entries.filter(entry => entry.id !== id);
    localStorage.setItem(ENTRIES_STORAGE_KEY, JSON.stringify(updatedEntries));
    
    console.log('✅ Successfully deleted entry');
  } catch (error) {
    console.error('❌ Error deleting entry:', error);
    throw new Error(`Σφάλμα κατά τη διαγραφή της καταχώρισης: ${error instanceof Error ? error.message : 'Unknown error'}`);
  }
};

/**
 * Ενημερώνει μια υπάρχουσα καταχώριση στο localStorage
 * @param id - Το ID της καταχώρισης προς ενημέρωση
 * @param updateData - Τα πεδία που θα ενημερωθούν
 * @returns Promise<CropEntry> - Η ενημερωμένη καταχώριση
 */
export const updateEntry = async (
  id: string, 
  updateData: Partial<Omit<CropEntry, 'id' | 'createdAt'>>
): Promise<CropEntry> => {
  console.log('✏️ Updating entry in localStorage:', id, updateData);
  
  try {
    const entries = await getEntries();
    const entryIndex = entries.findIndex(entry => entry.id === id);
    
    if (entryIndex === -1) {
      throw new Error('Η καταχώριση δεν βρέθηκε');
    }
    
    const updatedEntry = {
      ...entries[entryIndex],
      ...updateData
    };
    
    entries[entryIndex] = updatedEntry;
    localStorage.setItem(ENTRIES_STORAGE_KEY, JSON.stringify(entries));
    
    console.log('✅ Successfully updated entry:', updatedEntry);
    return updatedEntry;
  } catch (error) {
    console.error('❌ Error updating entry:', error);
    throw new Error(`Σφάλμα κατά την ενημέρωση της καταχώρισης: ${error instanceof Error ? error.message : 'Unknown error'}`);
  }
};
