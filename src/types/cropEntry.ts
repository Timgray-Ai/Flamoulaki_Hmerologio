
export interface CropEntry {
  id: string;
  date: string; // ISO date string
  plant: string;
  task: string;
  notes?: string;
  createdAt: string; // ISO timestamp από το Supabase
}

export interface CropPlant {
  id: string;
  name: string;
  color: string;
  icon: string;
}

export const CROP_PLANTS: CropPlant[] = [
  { id: 'vine', name: 'Αμπέλι', color: '#8B4513', icon: '🍇' },
  { id: 'tomato', name: 'Ντομάτα', color: '#DC2626', icon: '🍅' },
  { id: 'cucumber', name: 'Αγγούρι', color: '#16A34A', icon: '🥒' },
  { id: 'eggplant', name: 'Μελιτζάνα', color: '#7C3AED', icon: '🍆' },
  { id: 'pepper', name: 'Πιπεριά', color: '#EA580C', icon: '🌶️' },
];

export const TASK_OPTIONS = [
  'Πότισμα',
  'Λίπανση',
  'Κλάδεμα',
  'Σπορά',
  'Φύτευση',
  'Συγκομιδή',
  'Ψεκασμός',
  'Καλλιέργεια εδάφους',
  'Άλλο'
];

// Custom storage keys for user-defined crops and tasks
export const CUSTOM_PLANTS_KEY = 'custom_plants';
export const CUSTOM_TASKS_KEY = 'custom_tasks';
