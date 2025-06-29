import React from 'react';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import { Toaster } from 'sonner';
import Index from "./pages/Index";
import NotFound from "./pages/NotFound";
import LanguageSelector from "./components/LanguageSelector";
import { LanguageProvider } from "./contexts/LanguageContext";

const queryClient = new QueryClient();

const App = () => {
  return (
    <LanguageProvider>
      <QueryClientProvider client={queryClient}>
        <div className="min-h-screen bg-gradient-to-br from-gray-900 via-gray-800 to-black overflow-x-hidden">
          <Index />
          <LanguageSelector />
          <Toaster position="top-center" />
        </div>
      </QueryClientProvider>
    </LanguageProvider>
  );
};

export default App;
