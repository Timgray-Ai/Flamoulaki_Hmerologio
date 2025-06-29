import React from 'react';
import { Button } from '@/components/ui/button';
import { LogOut, User } from 'lucide-react';
import { useAuth } from '../hooks/useAuth';
import { useLanguage } from '../contexts/LanguageContext';

const AuthButton: React.FC = () => {
  const { user, signOut, isAuthenticated } = useAuth();
  const { t } = useLanguage();

  if (!isAuthenticated) {
    return null;
  }

  return (
    <div className="flex items-center space-x-3">
      <div className="flex items-center space-x-2 text-gray-300">
        <User className="w-4 h-4" />
        <span className="text-sm">{user?.email}</span>
      </div>
      
      <Button
        variant="outline"
        size="sm"
        onClick={signOut}
        className="border-gray-600 text-gray-300 hover:bg-gray-700 hover:text-white"
      >
        <LogOut className="w-4 h-4 mr-2" />
        {t('signOut')}
      </Button>
    </div>
  );
};

export default AuthButton;
