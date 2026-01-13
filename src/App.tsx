import { useState, useCallback } from 'react';
import { usePoems } from './hooks/usePoems';
import { Library } from './components/Library';
import { PoemViewer } from './components/PoemViewer';
import { ReviewSession } from './components/ReviewSession';
import { AddPoem } from './components/AddPoem';
import { calculateNextReview } from './utils/sm2';
import type { Rating, Poem } from './types';

type View = 'library' | 'poem' | 'review' | 'add' | 'review-queue';

function App() {
  const {
    poems,
    dueForReview,
    allTags,
    addPoem,
    deletePoem,
    updateReview,
    getPoem,
  } = usePoems();

  const [view, setView] = useState<View>('library');
  const [selectedPoemId, setSelectedPoemId] = useState<string | null>(null);
  const [reviewQueue, setReviewQueue] = useState<string[]>([]);
  const [reviewIndex, setReviewIndex] = useState(0);

  const selectedPoem = selectedPoemId ? getPoem(selectedPoemId) : undefined;
  const currentReviewPoem =
    reviewQueue.length > 0 ? getPoem(reviewQueue[reviewIndex]) : undefined;

  // Navigation handlers
  const goToLibrary = useCallback(() => {
    setView('library');
    setSelectedPoemId(null);
    setReviewQueue([]);
    setReviewIndex(0);
  }, []);

  const goToPoem = useCallback((id: string) => {
    setSelectedPoemId(id);
    setView('poem');
  }, []);

  const goToAddPoem = useCallback(() => {
    setView('add');
  }, []);

  const startSingleReview = useCallback((id: string) => {
    setReviewQueue([id]);
    setReviewIndex(0);
    setView('review');
  }, []);

  const startReviewQueue = useCallback(() => {
    if (dueForReview.length > 0) {
      setReviewQueue(dueForReview.map((p) => p.id));
      setReviewIndex(0);
      setView('review-queue');
    }
  }, [dueForReview]);

  // Action handlers
  const handleAddPoem = useCallback(
    (poem: Omit<Poem, 'id' | 'createdAt'>) => {
      const newPoem = addPoem(poem);
      goToPoem(newPoem.id);
    },
    [addPoem, goToPoem]
  );

  const handleDeletePoem = useCallback(
    (id: string) => {
      deletePoem(id);
      goToLibrary();
    },
    [deletePoem, goToLibrary]
  );

  const handleReviewComplete = useCallback(
    (poemId: string, rating: Rating) => {
      const poem = getPoem(poemId);
      if (!poem) return;

      const newReview = calculateNextReview(poem.review, rating);
      updateReview(poemId, newReview);

      // If in queue mode, advance to next poem or finish
      if (view === 'review-queue') {
        if (reviewIndex < reviewQueue.length - 1) {
          setReviewIndex((prev) => prev + 1);
        } else {
          // Done with queue
          goToLibrary();
        }
      } else {
        // Single review mode - go back to poem
        setView('poem');
      }
    },
    [getPoem, updateReview, view, reviewIndex, reviewQueue.length, goToLibrary]
  );

  return (
    <div className="min-h-screen bg-stone-900 text-stone-200">
      {/* Header */}
      <header className="sticky top-0 z-10 bg-stone-900/95 backdrop-blur border-b border-stone-800">
        <div className="max-w-2xl mx-auto px-4 py-3 flex items-center justify-between">
          <button
            onClick={goToLibrary}
            className="text-lg font-medium text-stone-100 hover:text-amber-400 transition-colors"
          >
            Poems
          </button>

          {view === 'library' && dueForReview.length > 0 && (
            <button
              onClick={startReviewQueue}
              className="px-3 py-1 bg-amber-600 text-stone-100 rounded text-sm hover:bg-amber-500 transition-colors"
            >
              Review ({dueForReview.length})
            </button>
          )}
        </div>
      </header>

      {/* Main content */}
      <main className="max-w-2xl mx-auto px-4 py-6">
        {/* Library view */}
        {view === 'library' && (
          <Library
            poems={poems}
            allTags={allTags}
            onSelectPoem={goToPoem}
            onAddPoem={goToAddPoem}
          />
        )}

        {/* Poem detail view */}
        {view === 'poem' && selectedPoem && (
          <PoemViewer
            poem={selectedPoem}
            onBack={goToLibrary}
            onStartReview={() => startSingleReview(selectedPoem.id)}
            onDelete={() => handleDeletePoem(selectedPoem.id)}
          />
        )}

        {/* Single review */}
        {view === 'review' && currentReviewPoem && (
          <ReviewSession
            poem={currentReviewPoem}
            onComplete={handleReviewComplete}
            onCancel={() => setView('poem')}
          />
        )}

        {/* Review queue */}
        {view === 'review-queue' && currentReviewPoem && (
          <div>
            <div className="mb-4 text-sm text-stone-500 text-center">
              {reviewIndex + 1} of {reviewQueue.length}
            </div>
            <ReviewSession
              poem={currentReviewPoem}
              onComplete={handleReviewComplete}
              onCancel={goToLibrary}
            />
          </div>
        )}

        {/* Add poem */}
        {view === 'add' && (
          <AddPoem
            onAdd={handleAddPoem}
            onCancel={goToLibrary}
            existingTags={allTags}
          />
        )}
      </main>

      {/* Footer */}
      <footer className="max-w-2xl mx-auto px-4 py-8 text-center text-xs text-stone-600">
        <p>Your poems are stored locally on this device.</p>
      </footer>
    </div>
  );
}

export default App;
