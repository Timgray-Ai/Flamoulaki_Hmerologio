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

// Language-specific plant data
export const CROP_PLANTS_EL: CropPlant[] = [
  { id: 'vine', name: 'Αμπέλι', color: '#8B4513', icon: '🍇' },
  { id: 'tomato', name: 'Ντομάτα', color: '#DC2626', icon: '🍅' },
  { id: 'cucumber', name: 'Αγγούρι', color: '#16A34A', icon: '🥒' },
  { id: 'eggplant', name: 'Μελιτζάνα', color: '#7C3AED', icon: '🍆' },
  { id: 'pepper', name: 'Πιπεριά', color: '#EA580C', icon: '🌶️' },
];

export const CROP_PLANTS_EN: CropPlant[] = [
  { id: 'vine', name: 'Vine', color: '#8B4513', icon: '🍇' },
  { id: 'tomato', name: 'Tomato', color: '#DC2626', icon: '🍅' },
  { id: 'cucumber', name: 'Cucumber', color: '#16A34A', icon: '🥒' },
  { id: 'eggplant', name: 'Eggplant', color: '#7C3AED', icon: '🍆' },
  { id: 'pepper', name: 'Pepper', color: '#EA580C', icon: '🌶️' },
];

// Language-specific task options
export const TASK_OPTIONS_EL = [
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

export const TASK_OPTIONS_EN = [
  'Watering',
  'Fertilization',
  'Pruning',
  'Seeding',
  'Planting',
  'Harvesting',
  'Spraying',
  'Soil cultivation',
  'Other'
];

// Default values (for backward compatibility)
export const CROP_PLANTS = CROP_PLANTS_EL;
export const TASK_OPTIONS = TASK_OPTIONS_EL;

// Custom storage keys for user-defined crops and tasks
export const CUSTOM_PLANTS_KEY = 'custom_plants';
export const CUSTOM_TASKS_KEY = 'custom_tasks';
