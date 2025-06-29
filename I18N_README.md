# Πολυγλωσσική Υποστήριξη - Multilingual Support

## Επισκόπηση - Overview

Η εφαρμογή τώρα υποστηρίζει πολυγλωσσικότητα με Ελληνικά και Αγγλικά. Το σύστημα χρησιμοποιεί το `i18next` και `react-i18next` για τη διαχείριση των μεταφράσεων.

The application now supports multilingual functionality with Greek and English. The system uses `i18next` and `react-i18next` for translation management.

## Αρχεία - Files

### Μεταφράσεις - Translations
- `src/locales/el.json` - Ελληνικές μεταφράσεις
- `src/locales/en.json` - English translations

### Ρύθμιση - Configuration
- `src/i18n.js` - i18next configuration
- `src/hooks/useLanguage.ts` - Custom hook for language management

### Components
- `src/components/LanguageSelector.tsx` - Modal for first-time language selection
- `src/components/LanguageSwitcher.tsx` - Component for changing language in settings

## Χρήση - Usage

### Στο Components - In Components

```tsx
import { useLanguage } from '../hooks/useLanguage';

const MyComponent = () => {
  const { t, changeLanguage, currentLanguage } = useLanguage();
  
  return (
    <div>
      <h1>{t('welcome')}</h1>
      <p>{t('currentLanguage')}: {currentLanguage}</p>
      <button onClick={() => changeLanguage('en')}>
        Switch to English
      </button>
    </div>
  );
};
```

### Προσθήκη νέων μεταφράσεων - Adding New Translations

1. Προσθέστε το κλειδί στο `src/locales/el.json`:
```json
{
  "newKey": "Νέα τιμή"
}
```

2. Προσθέστε το κλειδί στο `src/locales/en.json`:
```json
{
  "newKey": "New value"
}
```

3. Χρησιμοποιήστε το στο component:
```tsx
const { t } = useLanguage();
<p>{t('newKey')}</p>
```

## Λειτουργία - Functionality

### Πρώτη φορά - First Time
- Όταν ο χρήστης ανοίγει την εφαρμογή για πρώτη φορά, εμφανίζεται ένα modal για επιλογή γλώσσας
- Η επιλογή αποθηκεύεται στο `localStorage`

### Επόμενες φορές - Subsequent Times
- Η εφαρμογή φορτώνει αυτόματα την αποθηκευμένη γλώσσα
- Ο χρήστης μπορεί να αλλάξει γλώσσα από τις ρυθμίσεις χρησιμοποιώντας το `LanguageSwitcher` component

## Προσθήκη νέας γλώσσας - Adding New Language

1. Δημιουργήστε νέο αρχείο `src/locales/[language-code].json`
2. Προσθέστε τη γλώσσα στο `src/i18n.js`:
```javascript
resources: {
  el: { translation: elTranslations },
  en: { translation: enTranslations },
  [language-code]: { translation: newTranslations }
}
```
3. Προσθέστε την επιλογή στο `LanguageSelector` και `LanguageSwitcher`

## Σημειώσεις - Notes

- Η προεπιλεγμένη γλώσσα είναι τα Ελληνικά (`el`)
- Όλες οι μεταφράσεις υποστηρίζουν interpolation με `{{variable}}`
- Το σύστημα είναι συμβατό με το υπάρχον κώδικα χωρίς αλλαγές 