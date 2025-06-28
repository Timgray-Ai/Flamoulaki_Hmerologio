
import React, { useRef } from 'react';
import { Button } from '@/components/ui/button';
import { Download, Upload, Loader2 } from 'lucide-react';
import { CropEntry } from '../types/cropEntry';
import { useBackupRestore } from '../hooks/useBackupRestore';

interface BackupRestoreProps {
  entries: CropEntry[];
  onRestore?: (entries: CropEntry[]) => void;
}

const BackupRestore: React.FC<BackupRestoreProps> = ({ entries, onRestore }) => {
  const fileInputRef = useRef<HTMLInputElement>(null);
  const { exportToJson, importFromJson, isBackingUp, isRestoring } = useBackupRestore();

  const handleBackup = () => {
    exportToJson(entries);
  };

  const handleRestoreClick = () => {
    fileInputRef.current?.click();
  };

  const handleFileChange = async (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (file) {
      try {
        const restoredEntries = await importFromJson(file);
        onRestore?.(restoredEntries);
      } catch (error) {
        console.error('Restore failed:', error);
      }
    }
    // Reset file input
    if (fileInputRef.current) {
      fileInputRef.current.value = '';
    }
  };

  return (
    <div className="flex items-center space-x-2">
      <Button
        variant="outline"
        size="sm"
        onClick={handleBackup}
        disabled={isBackingUp || entries.length === 0}
        className="border-gray-600 text-gray-300 hover:bg-gray-700 hover:text-white"
      >
        {isBackingUp ? (
          <Loader2 className="w-4 h-4 mr-2 animate-spin" />
        ) : (
          <Download className="w-4 h-4 mr-2" />
        )}
        Backup
      </Button>

      <Button
        variant="outline"
        size="sm"
        onClick={handleRestoreClick}
        disabled={isRestoring}
        className="border-gray-600 text-gray-300 hover:bg-gray-700 hover:text-white"
      >
        {isRestoring ? (
          <Loader2 className="w-4 h-4 mr-2 animate-spin" />
        ) : (
          <Upload className="w-4 h-4 mr-2" />
        )}
        Restore
      </Button>

      <input
        ref={fileInputRef}
        type="file"
        accept=".json"
        onChange={handleFileChange}
        className="hidden"
      />
    </div>
  );
};

export default BackupRestore;
