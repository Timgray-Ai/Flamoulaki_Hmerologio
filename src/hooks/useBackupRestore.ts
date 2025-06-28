import { useState } from 'react';
import { CropEntry } from '../types/cropEntry';
import { toast } from 'sonner';
import { addEntry } from '../services/entriesService';

export const useBackupRestore = () => {
  const [isBackingUp, setIsBackingUp] = useState(false);
  const [isRestoring, setIsRestoring] = useState(false);

  const exportToJson = async (entries: CropEntry[]) => {
    setIsBackingUp(true);
    try {
      // Create the backup data
      const dataStr = JSON.stringify(entries, null, 2);
      const timestamp = new Date().toISOString().split('T')[0];
      const fileName = `crop_backup_${timestamp}.json`;
      
      // Create a blob and download link
      const blob = new Blob([dataStr], { type: 'application/json' });
      const url = window.URL.createObjectURL(blob);
      const link = document.createElement('a');
      
      // Set up the download
      link.href = url;
      link.download = fileName;
      document.body.appendChild(link);
      link.click();
      
      // Clean up
      document.body.removeChild(link);
      window.URL.revokeObjectURL(url);
      
      toast.success('Backup επιτυχής!', {
        description: 'Το αρχείο backup θα κατέβει αυτόματα',
      });
    } catch (error) {
      console.error('Backup error:', error);
      toast.error('Σφάλμα backup', {
        description: 'Δεν ήταν δυνατή η δημιουργία αντιγράφου ασφαλείας',
      });
    } finally {
      setIsBackingUp(false);
    }
  };

  const importFromJson = async (file: File): Promise<CropEntry[]> => {
    return new Promise((resolve, reject) => {
      setIsRestoring(true);
      const reader = new FileReader();
      
      reader.onload = async (e) => {
        try {
          const content = e.target?.result as string;
          const data = JSON.parse(content) as CropEntry[];
          
          // Validate data structure
          if (!Array.isArray(data)) {
            throw new Error('Μη έγκυρη μορφή αρχείου');
          }
          
          // Basic validation of entries
          const isValid = data.every(entry => 
            entry.id && entry.plant && entry.task && entry.date
          );
          
          if (!isValid) {
            throw new Error('Τα δεδομένα δεν είναι έγκυρα');
          }

          // Restore entries to the database
          const restoredEntries: CropEntry[] = [];
          for (const entry of data) {
            try {
              const { id, ...entryData } = entry;
              const newEntry = await addEntry(entryData);
              restoredEntries.push(newEntry);
            } catch (error) {
              console.error('Error restoring entry:', error);
              // Continue with other entries even if one fails
            }
          }
          
          toast.success('Restore επιτυχής!', {
            description: `Ανακτήθηκαν ${restoredEntries.length} καταχωρίσεις`,
          });
          
          resolve(restoredEntries);
        } catch (error) {
          toast.error('Σφάλμα restore', {
            description: 'Δεν ήταν δυνατή η ανάκτηση των δεδομένων',
          });
          reject(error);
        } finally {
          setIsRestoring(false);
        }
      };
      
      reader.onerror = () => {
        setIsRestoring(false);
        toast.error('Σφάλμα ανάγνωσης αρχείου');
        reject(new Error('File read error'));
      };
      
      reader.readAsText(file);
    });
  };

  return {
    exportToJson,
    importFromJson,
    isBackingUp,
    isRestoring,
  };
}; 