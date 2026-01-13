export type Language = 'en' | 'es' | 'sv' | 'other';

export interface Poem {
  id: string;
  title: string;
  poet: string;
  text: string;
  language: Language;
  tags: string[];
  notes?: string;
  translation?: string; // For non-English poems
  createdAt: string; // ISO date string
}

export type MemorizationMode =
  | 'read'
  | 'first-letters'
  | 'reveal-lines'
  | 'fill-gap'
  | 'recite';

// SM-2 Spaced Repetition Types
export type Rating = 0 | 1 | 2 | 3 | 4 | 5;

export interface ReviewData {
  poemId: string;
  easeFactor: number; // Default 2.5, min 1.3
  interval: number; // Days until next review
  repetitions: number; // Number of successful reviews
  nextReview: string; // ISO date string
  lastReview: string | null; // ISO date string
}

export interface PoemWithReview extends Poem {
  review: ReviewData;
}

// For the review session rating
export interface ReviewRating {
  label: string;
  value: Rating;
  description: string;
}

// App state
export interface AppState {
  poems: Poem[];
  reviews: Record<string, ReviewData>;
  currentView: 'library' | 'review' | 'add' | 'poem';
  selectedPoemId: string | null;
}
