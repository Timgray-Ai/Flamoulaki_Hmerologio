// Απλό fallback για το useLanguage
export const useLanguage = () => {
  const t = (key: string) => {
    // Απλές μεταφράσεις στα ελληνικά
    const translations: Record<string, string> = {
      'list': 'Λίστα',
      'newEntry': 'Νέα καταχώριση',
      'add': 'Προσθήκη',
      'calendar': 'Ημερολόγιο',
      'grouped': 'Ομαδοποιημένο',
      'home': 'Αρχική',
      'settings': 'Ρυθμίσεις',
      'logout': 'Αποσύνδεση',
      'login': 'Σύνδεση',
      'email': 'Email',
      'password': 'Κωδικός',
      'submit': 'Υποβολή',
      'cancel': 'Ακύρωση',
      'save': 'Αποθήκευση',
      'delete': 'Διαγραφή',
      'edit': 'Επεξεργασία',
      'date': 'Ημερομηνία',
      'plant': 'Φυτό',
      'task': 'Εργασία',
      'notes': 'Σημειώσεις',
      'loading': 'Φόρτωση...',
      'error': 'Σφάλμα',
      'success': 'Επιτυχία',
      'confirm': 'Επιβεβαίωση',
      'yes': 'Ναι',
      'no': 'Όχι',
      'close': 'Κλείσιμο',
      'search': 'Αναζήτηση',
      'filter': 'Φίλτρο',
      'sort': 'Ταξινόμηση',
      'refresh': 'Ανανέωση',
      'back': 'Πίσω',
      'next': 'Επόμενο',
      'previous': 'Προηγούμενο',
      'first': 'Πρώτο',
      'last': 'Τελευταίο',
      'page': 'Σελίδα',
      'of': 'από',
      'entries': 'καταχωρήσεις',
      'showing': 'Εμφάνιση',
      'showingAll': 'Εμφάνιση όλων',
      'noEntries': 'Δεν υπάρχουν καταχωρήσεις',
      'noResults': 'Δεν βρέθηκαν αποτελέσματα',
      'clearFilters': 'Καθαρισμός φίλτρων',
      'taskType': 'Είδος εργασίας',
      'crop': 'Καλλιέργεια',
      'selectTaskType': 'Επιλέξτε τύπο εργασίας',
      'selectCrop': 'Επιλέξτε καλλιέργεια',
      'allTasks': 'Όλες οι εργασίες',
      'allCrops': 'Όλες οι καλλιέργειες',
      'filters': 'Φίλτρα',
      'noResultsForFilters': 'Δεν βρέθηκαν αποτελέσματα για τα επιλεγμένα φίλτρα',
    };
    
    return translations[key] || key;
  };

  return { t };
}; 