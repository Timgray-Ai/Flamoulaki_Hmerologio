import React, { useRef } from 'react';
import { Button } from '@/components/ui/button';
import { Calendar, List, Users, Plus, Home, Download, Upload } from 'lucide-react';
import { useEntries } from '../hooks/useEntries';
import { toast } from 'sonner';
import { useBackupRestore } from '../hooks/useBackupRestore';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";

const Header = ({ currentView, onViewChange, isAuthenticated }) => {
  const { entries } = useEntries();
  const { exportToJson, importFromJson } = useBackupRestore();
  const fileInputRef = useRef(null);

  const handleBackup = async () => {
    try {
      await exportToJson(entries);
      toast.success(
        <div>
          <p>Αντίγραφο ασφαλείας δημιουργήθηκε</p>
          <p className="text-sm text-gray-400">Αποθηκεύτηκε στο φάκελο Downloads/crop_backups</p>
        </div>
      );
    } catch (error) {
      toast.error('Σφάλμα κατά τη δημιουργία αντιγράφου ασφαλείας');
    }
  };

  const handleRestore = async () => {
    try {
      if (fileInputRef.current) {
        fileInputRef.current.click();
      }
    } catch (error) {
      toast.error('Σφάλμα κατά την επαναφορά');
    }
  };

  return (
    <header className="bg-gray-800 border-b border-gray-700 shadow-lg">
      <div className="container mx-auto px-4 py-3">
        <div className="flex items-center justify-between">
          <div className="flex items-center space-x-2">
            <Button
              variant="ghost"
              onClick={() => onViewChange('home')}
              className="text-gray-300 hover:text-white hover:bg-gray-700"
              aria-label="Επιστροφή στην αρχική"
            >
              <Home className="h-5 w-5 mr-2" />
              Αρχική
            </Button>
            <Button
              variant="ghost"
              onClick={() => onViewChange('calendar')}
              className={`text-gray-300 hover:text-white hover:bg-gray-700 ${
                currentView === 'calendar' ? 'bg-gray-700' : ''
              }`}
              aria-label="Προβολή ημερολογίου"
            >
              <Calendar className="h-5 w-5 mr-2" />
              Ημερολόγιο
            </Button>
            <Button
              variant="ghost"
              onClick={() => onViewChange('list')}
              className={`text-gray-300 hover:text-white hover:bg-gray-700 ${
                currentView === 'list' ? 'bg-gray-700' : ''
              }`}
              aria-label="Προβολή λίστας"
            >
              <List className="h-5 w-5 mr-2" />
              Λίστα
            </Button>
            <Button
              variant="ghost"
              onClick={() => onViewChange('grouped')}
              className={`text-gray-300 hover:text-white hover:bg-gray-700 ${
                currentView === 'grouped' ? 'bg-gray-700' : ''
              }`}
              aria-label="Προβολή ομαδοποιημένης λίστας"
            >
              <Users className="h-5 w-5 mr-2" />
              Ομαδοποίηση
            </Button>
            <Button
              variant="ghost"
              onClick={() => onViewChange('add')}
              className={`text-gray-300 hover:text-white hover:bg-gray-700 ${
                currentView === 'add' ? 'bg-gray-700' : ''
              }`}
              aria-label="Προσθήκη νέας καταχώρησης"
            >
              <Plus className="h-5 w-5 mr-2" />
              Προσθήκη
            </Button>
          </div>
          <div className="flex items-center space-x-2">
            {isAuthenticated && (
              <DropdownMenu>
                <DropdownMenuTrigger asChild>
                  <Button
                    variant="ghost"
                    className="text-gray-300 hover:text-white hover:bg-gray-700"
                  >
                    <Download className="h-5 w-5 mr-2" />
                    Αντιγραφή/Επαναφορά
                  </Button>
                </DropdownMenuTrigger>
                <DropdownMenuContent>
                  <DropdownMenuItem onClick={handleBackup}>
                    <Download className="h-4 w-4 mr-2" />
                    Δημιουργία αντιγράφου
                  </DropdownMenuItem>
                  <DropdownMenuItem onClick={handleRestore}>
                    <Upload className="h-4 w-4 mr-2" />
                    Επαναφορά από αντίγραφο
                  </DropdownMenuItem>
                </DropdownMenuContent>
              </DropdownMenu>
            )}
          </div>
        </div>
      </div>
      <input
        type="file"
        ref={fileInputRef}
        onChange={(e) => {
          const file = e.target.files?.[0];
          if (file) {
            importFromJson(file);
          }
        }}
        accept=".json"
        className="hidden"
      />
    </header>
  );
};

export default Header;
