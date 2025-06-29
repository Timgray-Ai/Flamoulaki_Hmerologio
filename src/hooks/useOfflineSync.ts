import { useState, useEffect } from 'react';
import { CropEntry } from '../types/cropEntry';
import { generateUUID } from '../lib/utils';
import { toast } from 'sonner';

interface PendingOperation {
  id: string;
  type: 'add' | 'update' | 'delete';
  data?: Partial<CropEntry>;
  entryId?: string;
  timestamp: number;
}

export const useOfflineSync = () => {
  const [isOnline, setIsOnline] = useState(navigator.onLine);
  const [pendingOperations, setPendingOperations] = useState<PendingOperation[]>([]);

  useEffect(() => {
    // Load pending operations from localStorage
    const stored = localStorage.getItem('pendingOperations');
    if (stored) {
      setPendingOperations(JSON.parse(stored));
    }

    // Listen for online/offline events
    const handleOnline = () => {
      setIsOnline(true);
      toast.success('Επανασύνδεση στο διαδίκτυο', {
        description: 'Συγχρονισμός δεδομένων...',
        duration: 1500,
      });
    };

    const handleOffline = () => {
      setIsOnline(false);
      toast.info('Λειτουργία offline', {
        description: 'Οι αλλαγές θα συγχρονιστούν όταν επανέλθει η σύνδεση',
        duration: 1500,
      });
    };

    window.addEventListener('online', handleOnline);
    window.addEventListener('offline', handleOffline);

    return () => {
      window.removeEventListener('online', handleOnline);
      window.removeEventListener('offline', handleOffline);
    };
  }, []);

  useEffect(() => {
    // Save pending operations to localStorage
    localStorage.setItem('pendingOperations', JSON.stringify(pendingOperations));
  }, [pendingOperations]);

  const queueOperation = (operation: Omit<PendingOperation, 'id' | 'timestamp'>) => {
    const newOperation: PendingOperation = {
      ...operation,
      id: generateUUID(),
      timestamp: Date.now()
    };

    setPendingOperations(prev => [...prev, newOperation]);
  };

  const clearPendingOperations = () => {
    setPendingOperations([]);
    localStorage.removeItem('pendingOperations');
  };

  const removePendingOperation = (operationId: string) => {
    setPendingOperations(prev => prev.filter(op => op.id !== operationId));
  };

  return {
    isOnline,
    pendingOperations,
    queueOperation,
    clearPendingOperations,
    removePendingOperation
  };
};
