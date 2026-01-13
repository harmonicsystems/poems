import type { Rating, ReviewData, ReviewRating } from '../types';

/**
 * SM-2 Spaced Repetition Algorithm
 *
 * Based on the SuperMemo 2 algorithm by Piotr Wozniak.
 * Simplified for a 0-5 rating scale where:
 * - 0-2: Failed recall, reset repetitions
 * - 3-5: Successful recall, increase interval
 */

const MIN_EASE_FACTOR = 1.3;
const DEFAULT_EASE_FACTOR = 2.5;

export const reviewRatings: ReviewRating[] = [
  { label: 'Forgot', value: 0, description: 'Complete blackout' },
  { label: 'Hard', value: 2, description: 'Significant difficulty, many mistakes' },
  { label: 'Good', value: 3, description: 'Correct with some hesitation' },
  { label: 'Easy', value: 5, description: 'Perfect response, felt effortless' },
];

export function createInitialReview(poemId: string): ReviewData {
  return {
    poemId,
    easeFactor: DEFAULT_EASE_FACTOR,
    interval: 0,
    repetitions: 0,
    nextReview: new Date().toISOString(),
    lastReview: null,
  };
}

export function calculateNextReview(
  review: ReviewData,
  rating: Rating
): ReviewData {
  const now = new Date();
  let { easeFactor, interval, repetitions } = review;

  // Update ease factor based on rating
  // EF' = EF + (0.1 - (5 - rating) * (0.08 + (5 - rating) * 0.02))
  easeFactor =
    easeFactor + (0.1 - (5 - rating) * (0.08 + (5 - rating) * 0.02));
  easeFactor = Math.max(MIN_EASE_FACTOR, easeFactor);

  if (rating < 3) {
    // Failed recall - reset to beginning
    repetitions = 0;
    interval = 1;
  } else {
    // Successful recall
    repetitions += 1;

    if (repetitions === 1) {
      interval = 1;
    } else if (repetitions === 2) {
      interval = 6;
    } else {
      interval = Math.round(interval * easeFactor);
    }
  }

  // Calculate next review date
  const nextReview = new Date(now);
  nextReview.setDate(nextReview.getDate() + interval);

  return {
    poemId: review.poemId,
    easeFactor,
    interval,
    repetitions,
    nextReview: nextReview.toISOString(),
    lastReview: now.toISOString(),
  };
}

export function isReviewDue(review: ReviewData): boolean {
  const now = new Date();
  const nextReview = new Date(review.nextReview);
  // Due if next review date is today or earlier
  return nextReview <= now;
}

export function getDaysUntilReview(review: ReviewData): number {
  const now = new Date();
  now.setHours(0, 0, 0, 0);
  const nextReview = new Date(review.nextReview);
  nextReview.setHours(0, 0, 0, 0);
  const diffTime = nextReview.getTime() - now.getTime();
  return Math.ceil(diffTime / (1000 * 60 * 60 * 24));
}

export function getMasteryLevel(review: ReviewData): 'new' | 'learning' | 'reviewing' | 'mastered' {
  if (review.repetitions === 0) return 'new';
  if (review.repetitions < 3) return 'learning';
  if (review.interval < 21) return 'reviewing';
  return 'mastered';
}

export function getMasteryColor(level: ReturnType<typeof getMasteryLevel>): string {
  switch (level) {
    case 'new':
      return 'text-stone-400';
    case 'learning':
      return 'text-amber-400';
    case 'reviewing':
      return 'text-blue-400';
    case 'mastered':
      return 'text-green-400';
  }
}
