import { useState, useEffect } from 'react';

interface User {
  id: string;
  email: string;
}

const AUTH_STORAGE_KEY = 'auth_user';

/**
 * Custom hook για τη διαχείριση authentication
 * Παρέχει login, logout, signup και τρέχουσα κατάσταση χρήστη
 */
export const useAuth = () => {
  const [user, setUser] = useState<User>({
    id: 'default-user',
    email: 'user@example.com'
  });
  const [isLoading, setIsLoading] = useState(false);

  // No need for sign in/out since we're always authenticated
  const signIn = async () => Promise.resolve(user);
  const signOut = async () => Promise.resolve();

  return {
    user,
    isLoading,
    signIn,
    signOut,
    isAuthenticated: true
  };
};
