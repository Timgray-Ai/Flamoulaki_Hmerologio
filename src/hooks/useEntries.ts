import { useState, useEffect } from 'react';
import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import { CropEntry } from '../types/cropEntry';
import { getEntries, addEntry, deleteEntry, updateEntry } from '../services/entriesService';
import { toast } from 'sonner';

/**
 * Custom hook για τη διαχείριση των καταχωρήσεων καλλιεργειών
 * Παρέχει CRUD λειτουργίες με αυτόματη ενημέρωση του UI
 */
export const useEntries = () => {
  const queryClient = useQueryClient();

  // Query για την ανάκτηση των entries
  const {
    data: entries = [],
    isLoading,
    error,
    refetch
  } = useQuery({
    queryKey: ['entries'],
    queryFn: getEntries,
    staleTime: 1000 * 60 * 5, // 5 λεπτά cache
  });

  // Mutation για την προσθήκη νέας καταχώρισης
  const addEntryMutation = useMutation({
    mutationFn: addEntry,
    onSuccess: (newEntry) => {
      // Ενημέρωση του cache
      queryClient.setQueryData(['entries'], (oldEntries: CropEntry[] = []) => 
        [newEntry, ...oldEntries]
      );
      
      toast.success('Η καταχώριση αποθηκεύτηκε επιτυχώς!', {
        description: `${newEntry.plant} - ${newEntry.task}`,
        duration: 1500,
      });
    },
    onError: (error: Error) => {
      console.error('Error adding entry:', error);
      toast.error('Σφάλμα κατά την αποθήκευση', {
        description: error.message,
        duration: 1500,
      });
    },
  });

  // Mutation για τη διαγραφή καταχώρισης
  const deleteEntryMutation = useMutation({
    mutationFn: deleteEntry,
    onSuccess: (_, deletedId) => {
      // Ενημέρωση του cache
      queryClient.setQueryData(['entries'], (oldEntries: CropEntry[] = []) =>
        oldEntries.filter(entry => entry.id !== deletedId)
      );
      
      toast.success('Η καταχώριση διαγράφηκε επιτυχώς!', { duration: 1500 });
    },
    onError: (error: Error) => {
      console.error('Error deleting entry:', error);
      toast.error('Σφάλμα κατά τη διαγραφή', {
        description: error.message,
        duration: 1500,
      });
    },
  });

  // Mutation για την ενημέρωση καταχώρισης
  const updateEntryMutation = useMutation({
    mutationFn: ({ id, updateData }: { id: string; updateData: Partial<Omit<CropEntry, 'id' | 'createdAt'>> }) =>
      updateEntry(id, updateData),
    onSuccess: (updatedEntry) => {
      // Ενημέρωση του cache
      queryClient.setQueryData(['entries'], (oldEntries: CropEntry[] = []) =>
        oldEntries.map(entry => 
          entry.id === updatedEntry.id ? updatedEntry : entry
        )
      );
      
      toast.success('Η καταχώριση ενημερώθηκε επιτυχώς!', { duration: 1500 });
    },
    onError: (error: Error) => {
      console.error('Error updating entry:', error);
      toast.error('Σφάλμα κατά την ενημέρωση', {
        description: error.message,
        duration: 1500,
      });
    },
  });

  // Συναρτήσεις για εύκολη χρήση
  const handleAddEntry = (entryData: Omit<CropEntry, 'id' | 'createdAt'>) => {
    const createData: Omit<CropEntry, 'id' | 'createdAt'> = {
      date: entryData.date,
      plant: entryData.plant,
      task: entryData.task,
      notes: entryData.notes,
    };
    
    addEntryMutation.mutate(createData);
  };

  const handleDeleteEntry = (id: string) => {
    deleteEntryMutation.mutate(id);
  };

  const handleUpdateEntry = (id: string, updateData: Partial<Omit<CropEntry, 'id' | 'createdAt'>>) => {
    updateEntryMutation.mutate({ id, updateData });
  };

  return {
    // Data
    entries,
    isLoading,
    error,
    
    // Actions
    addEntry: handleAddEntry,
    deleteEntry: handleDeleteEntry,
    updateEntry: handleUpdateEntry,
    refetch,
    
    // Loading states
    isAddingEntry: addEntryMutation.isPending,
    isDeletingEntry: deleteEntryMutation.isPending,
    isUpdatingEntry: updateEntryMutation.isPending,
  };
};
