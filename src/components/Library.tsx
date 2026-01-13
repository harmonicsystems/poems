import { useState, useMemo } from 'react';
import type { PoemWithReview, Language } from '../types';
import { PoemCard } from './PoemCard';

interface LibraryProps {
  poems: PoemWithReview[];
  allTags: string[];
  onSelectPoem: (id: string) => void;
  onAddPoem: () => void;
}

type SortOption = 'title' | 'poet' | 'due' | 'mastery';

export function Library({ poems, allTags, onSelectPoem, onAddPoem }: LibraryProps) {
  const [search, setSearch] = useState('');
  const [languageFilter, setLanguageFilter] = useState<Language | ''>('');
  const [tagFilter, setTagFilter] = useState('');
  const [sortBy, setSortBy] = useState<SortOption>('due');

  const filteredPoems = useMemo(() => {
    const lowerSearch = search.toLowerCase();

    let result = poems.filter((poem) => {
      const matchesSearch =
        !search ||
        poem.title.toLowerCase().includes(lowerSearch) ||
        poem.poet.toLowerCase().includes(lowerSearch) ||
        poem.text.toLowerCase().includes(lowerSearch);

      const matchesLanguage = !languageFilter || poem.language === languageFilter;
      const matchesTag = !tagFilter || poem.tags.includes(tagFilter);

      return matchesSearch && matchesLanguage && matchesTag;
    });

    // Sort
    result = [...result].sort((a, b) => {
      switch (sortBy) {
        case 'title':
          return a.title.localeCompare(b.title);
        case 'poet':
          return a.poet.localeCompare(b.poet);
        case 'due':
          return (
            new Date(a.review.nextReview).getTime() -
            new Date(b.review.nextReview).getTime()
          );
        case 'mastery':
          return b.review.repetitions - a.review.repetitions;
        default:
          return 0;
      }
    });

    return result;
  }, [poems, search, languageFilter, tagFilter, sortBy]);

  return (
    <div className="space-y-4">
      {/* Search and filters */}
      <div className="space-y-3">
        <input
          type="search"
          placeholder="Search poems..."
          value={search}
          onChange={(e) => setSearch(e.target.value)}
          className="w-full px-3 py-2 bg-stone-800 border border-stone-700 rounded-lg text-stone-100 placeholder-stone-500 focus:outline-none focus:border-amber-500"
        />

        <div className="flex flex-wrap gap-2">
          <select
            value={languageFilter}
            onChange={(e) => setLanguageFilter(e.target.value as Language | '')}
            className="px-2 py-1 bg-stone-800 border border-stone-700 rounded text-sm text-stone-200 focus:outline-none focus:border-amber-500"
          >
            <option value="">All languages</option>
            <option value="en">English</option>
            <option value="es">Spanish</option>
            <option value="sv">Swedish</option>
            <option value="other">Other</option>
          </select>

          <select
            value={tagFilter}
            onChange={(e) => setTagFilter(e.target.value)}
            className="px-2 py-1 bg-stone-800 border border-stone-700 rounded text-sm text-stone-200 focus:outline-none focus:border-amber-500"
          >
            <option value="">All tags</option>
            {allTags.map((tag) => (
              <option key={tag} value={tag}>
                {tag}
              </option>
            ))}
          </select>

          <select
            value={sortBy}
            onChange={(e) => setSortBy(e.target.value as SortOption)}
            className="px-2 py-1 bg-stone-800 border border-stone-700 rounded text-sm text-stone-200 focus:outline-none focus:border-amber-500"
          >
            <option value="due">Sort by due date</option>
            <option value="title">Sort by title</option>
            <option value="poet">Sort by poet</option>
            <option value="mastery">Sort by mastery</option>
          </select>
        </div>
      </div>

      {/* Results count */}
      <p className="text-sm text-stone-400">
        {filteredPoems.length} poem{filteredPoems.length !== 1 ? 's' : ''}
        {search || languageFilter || tagFilter ? ' found' : ''}
      </p>

      {/* Poem list */}
      <div className="space-y-3">
        {filteredPoems.map((poem) => (
          <PoemCard
            key={poem.id}
            poem={poem}
            onClick={() => onSelectPoem(poem.id)}
          />
        ))}
      </div>

      {/* Empty state */}
      {filteredPoems.length === 0 && (
        <div className="text-center py-12">
          <p className="text-stone-400">No poems found</p>
          {(search || languageFilter || tagFilter) && (
            <button
              onClick={() => {
                setSearch('');
                setLanguageFilter('');
                setTagFilter('');
              }}
              className="mt-2 text-sm text-amber-500 hover:text-amber-400"
            >
              Clear filters
            </button>
          )}
        </div>
      )}

      {/* Add poem button */}
      <button
        onClick={onAddPoem}
        className="w-full p-4 border-2 border-dashed border-stone-700 rounded-lg text-stone-400 hover:border-stone-600 hover:text-stone-300 transition-colors"
      >
        + Add a poem
      </button>
    </div>
  );
}
