import { useMemo, useCallback } from 'react';
import { useLocalStorage } from './useLocalStorage';
import { seedPoems } from '../data/seedPoems';
import type { Poem, ReviewData, PoemWithReview } from '../types';
import { createInitialReview, isReviewDue } from '../utils/sm2';

const POEMS_KEY = 'poems-app-poems';
const REVIEWS_KEY = 'poems-app-reviews';

export function usePoems() {
  const [poems, setPoems] = useLocalStorage<Poem[]>(POEMS_KEY, seedPoems);
  const [reviews, setReviews] = useLocalStorage<Record<string, ReviewData>>(
    REVIEWS_KEY,
    {}
  );

  // Get poems with their review data
  const poemsWithReview = useMemo((): PoemWithReview[] => {
    return poems.map((poem) => ({
      ...poem,
      review: reviews[poem.id] || createInitialReview(poem.id),
    }));
  }, [poems, reviews]);

  // Get poems due for review today
  const dueForReview = useMemo((): PoemWithReview[] => {
    return poemsWithReview.filter((p) => isReviewDue(p.review));
  }, [poemsWithReview]);

  // Add a new poem
  const addPoem = useCallback(
    (poem: Omit<Poem, 'id' | 'createdAt'>) => {
      const newPoem: Poem = {
        ...poem,
        id: `poem-${Date.now()}-${Math.random().toString(36).slice(2, 9)}`,
        createdAt: new Date().toISOString(),
      };
      setPoems((prev) => [...prev, newPoem]);
      return newPoem;
    },
    [setPoems]
  );

  // Update a poem
  const updatePoem = useCallback(
    (id: string, updates: Partial<Omit<Poem, 'id' | 'createdAt'>>) => {
      setPoems((prev) =>
        prev.map((p) => (p.id === id ? { ...p, ...updates } : p))
      );
    },
    [setPoems]
  );

  // Delete a poem
  const deletePoem = useCallback(
    (id: string) => {
      setPoems((prev) => prev.filter((p) => p.id !== id));
      setReviews((prev) => {
        const next = { ...prev };
        delete next[id];
        return next;
      });
    },
    [setPoems, setReviews]
  );

  // Update review data for a poem
  const updateReview = useCallback(
    (poemId: string, reviewData: ReviewData) => {
      setReviews((prev) => ({
        ...prev,
        [poemId]: reviewData,
      }));
    },
    [setReviews]
  );

  // Get a single poem by ID
  const getPoem = useCallback(
    (id: string): PoemWithReview | undefined => {
      return poemsWithReview.find((p) => p.id === id);
    },
    [poemsWithReview]
  );

  // Search/filter poems
  const searchPoems = useCallback(
    (query: string, filters?: { language?: string; tag?: string }) => {
      const lowerQuery = query.toLowerCase();
      return poemsWithReview.filter((poem) => {
        const matchesQuery =
          !query ||
          poem.title.toLowerCase().includes(lowerQuery) ||
          poem.poet.toLowerCase().includes(lowerQuery) ||
          poem.text.toLowerCase().includes(lowerQuery) ||
          poem.tags.some((t) => t.toLowerCase().includes(lowerQuery));

        const matchesLanguage =
          !filters?.language || poem.language === filters.language;

        const matchesTag =
          !filters?.tag || poem.tags.includes(filters.tag);

        return matchesQuery && matchesLanguage && matchesTag;
      });
    },
    [poemsWithReview]
  );

  // Get unique tags across all poems
  const allTags = useMemo(() => {
    const tags = new Set<string>();
    poems.forEach((p) => p.tags.forEach((t) => tags.add(t)));
    return Array.from(tags).sort();
  }, [poems]);

  // Reset to seed poems (for testing/reset)
  const resetToSeed = useCallback(() => {
    setPoems(seedPoems);
    setReviews({});
  }, [setPoems, setReviews]);

  return {
    poems: poemsWithReview,
    dueForReview,
    allTags,
    addPoem,
    updatePoem,
    deletePoem,
    updateReview,
    getPoem,
    searchPoems,
    resetToSeed,
  };
}
