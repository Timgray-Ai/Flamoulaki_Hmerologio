import React, { useState, useEffect } from 'react';
import { useAuth } from '../hooks/useAuth';
import { useEntries } from '../hooks/useEntries';
import { useOfflineSync } from '../hooks/useOfflineSync';
import { useLanguage } from '../contexts/LanguageContext';
import AuthForm from '../components/AuthForm';
import CropEntryList from '../components/CropEntryList';
import CropCalendar from '../components/CropCalendar';
import CropGroupedView from '../components/CropGroupedView';
import CropEntryForm from '../components/CropEntryForm';
import Header from '../components/Header';
import Home from '../components/Home';
import { CropEntry } from '../types/cropEntry';
import { toast } from 'sonner';
import { Loader2 } from 'lucide-react';

type ViewType = 'home' | 'list' | 'calendar' | 'add' | 'grouped' | 'auth';

interface PendingOperation {
  type: 'add' | 'update' | 'delete';
  entryId?: string;
  data?: Omit<CropEntry, 'id' | 'createdAt'>;
}

const Index = () => {
  const { t } = useLanguage();
  const { user, isLoading: authLoading, signIn, signOut, isAuthenticated } = useAuth();
  const { entries, addEntry, deleteEntry, updateEntry, isAddingEntry } = useEntries();
  const [currentView, setCurrentView] = useState<ViewType>('home');
  const [editingEntry, setEditingEntry] = useState<CropEntry | null>(null);
  const [isOnline, setIsOnline] = useState(navigator.onLine);
  const [pendingOperations, setPendingOperations] = useState<PendingOperation[]>([]);

  // Handle online/offline status
  useEffect(() => {
    const handleOnline = () => setIsOnline(true);
    const handleOffline = () => setIsOnline(false);

    window.addEventListener('online', handleOnline);
    window.addEventListener('offline', handleOffline);

    return () => {
      window.removeEventListener('online', handleOnline);
      window.removeEventListener('offline', handleOffline);
    };
  }, []);

  // Queue operation for offline sync
  const queueOperation = (operation: PendingOperation) => {
    setPendingOperations(prev => [...prev, operation]);
  };

  // Clear pending operations after successful sync
  const clearPendingOperations = () => {
    setPendingOperations([]);
  };

  // Handle view changes
  const handleViewChange = (view: ViewType) => {
    setCurrentView(view);
  };

  // Handle entry editing
  const handleEditEntry = (entry: CropEntry) => {
    setEditingEntry(entry);
    setCurrentView('add');
  };

  const handleSaveEntry = (entryData: Omit<CropEntry, 'id' | 'createdAt'>) => {
    if (!user) {
      return;
    }
    
    if (editingEntry) {
      // Update existing entry
      if (isOnline) {
        updateEntry(editingEntry.id, entryData);
      } else {
        queueOperation({
          type: 'update',
          entryId: editingEntry.id,
          data: entryData
        });
        toast.info(t('changeSavedOffline'), { duration: 1500 });
      }
      setEditingEntry(null);
    } else {
      // Add new entry
      if (isOnline) {
        addEntry(entryData);
      } else {
        queueOperation({
          type: 'add',
          data: entryData
        });
        toast.info(t('entrySavedOffline'), { duration: 1500 });
      }
    }
    
    // Return to list view after successful save
    if (!isAddingEntry) {
      setCurrentView('list');
    }
  };

  const handleDeleteEntry = (id: string) => {
    if (!user) {
      return;
    }
    
    if (isOnline) {
      deleteEntry(id);
    } else {
      queueOperation({
        type: 'delete',
        entryId: id
      });
      toast.info(t('deletionSavedOffline'), { duration: 1500 });
    }
  };

  // Show auth form if user is not logged in
  if (authLoading) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-gray-900 via-gray-800 to-black dark flex items-center justify-center">
        <div className="text-center">
          <Loader2 className="w-8 h-8 animate-spin text-green-400 mx-auto mb-4" />
          <p className="text-gray-300">{t('loading')}</p>
        </div>
      </div>
    );
  }

  const renderContent = () => {
    switch (currentView) {
      case 'auth':
        return <AuthForm />;
      case 'home':
        return <Home onViewChange={handleViewChange} />;
      case 'add':
        if (!user) {
          setCurrentView('auth');
          return <AuthForm />;
        }
        return (
          <CropEntryForm
            onSubmit={handleSaveEntry}
            initialData={editingEntry}
            isSubmitting={isAddingEntry}
          />
        );
      case 'calendar':
        return <CropCalendar entries={entries} onDelete={handleDeleteEntry} onEdit={handleEditEntry} />;
      case 'grouped':
        return <CropGroupedView entries={entries} />;
      default:
        return <CropEntryList entries={entries} onDelete={handleDeleteEntry} onEdit={handleEditEntry} />;
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-900 via-gray-800 to-black">
      {currentView !== 'home' && (
        <Header
          currentView={currentView}
          onViewChange={handleViewChange}
          isAuthenticated={isAuthenticated}
        />
      )}
      <main className="container mx-auto px-4 py-8">
        {renderContent()}
      </main>
    </div>
  );
};

export default Index;
