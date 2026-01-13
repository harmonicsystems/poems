import { useState } from 'react';
import type { PoemWithReview, Rating } from '../types';
import { reviewRatings, calculateNextReview } from '../utils/sm2';

interface ReviewSessionProps {
  poem: PoemWithReview;
  onComplete: (poemId: string, rating: Rating) => void;
  onCancel: () => void;
}

type ReviewPhase = 'prompt' | 'recall' | 'reveal' | 'rate';

export function ReviewSession({ poem, onComplete, onCancel }: ReviewSessionProps) {
  const [phase, setPhase] = useState<ReviewPhase>('prompt');

  const handleRate = (rating: Rating) => {
    onComplete(poem.id, rating);
  };

  // Preview what the next interval would be for each rating
  const getIntervalPreview = (rating: Rating): string => {
    const nextReview = calculateNextReview(poem.review, rating);
    if (nextReview.interval === 1) return '1 day';
    return `${nextReview.interval} days`;
  };

  return (
    <div className="min-h-[60vh] flex flex-col">
      {/* Header */}
      <div className="flex justify-between items-center mb-6">
        <button
          onClick={onCancel}
          className="text-stone-400 hover:text-stone-200"
        >
          &larr; Exit review
        </button>
        <span className="text-sm text-stone-500">
          {phase === 'prompt' && 'Ready?'}
          {phase === 'recall' && 'Recall'}
          {phase === 'reveal' && 'Check'}
          {phase === 'rate' && 'Rate'}
        </span>
      </div>

      {/* Content */}
      <div className="flex-1 flex flex-col items-center justify-center">
        {/* Prompt phase - just title */}
        {phase === 'prompt' && (
          <div className="text-center">
            <h2 className="text-2xl poem-text text-stone-100 mb-2">
              {poem.title}
            </h2>
            <p className="text-stone-400 mb-8">by {poem.poet}</p>
            <button
              onClick={() => setPhase('recall')}
              className="px-6 py-3 bg-amber-600 text-stone-100 rounded-lg hover:bg-amber-500 transition-colors"
            >
              Begin
            </button>
          </div>
        )}

        {/* Recall phase - blank screen for recitation */}
        {phase === 'recall' && (
          <div className="text-center w-full">
            <h2 className="text-2xl poem-text text-stone-100 mb-2">
              {poem.title}
            </h2>
            <p className="text-stone-400 mb-8">by {poem.poet}</p>
            <div className="h-40 flex items-center justify-center">
              <p className="text-stone-500 text-sm">
                Recite from memory when ready...
              </p>
            </div>
            <button
              onClick={() => setPhase('reveal')}
              className="px-6 py-3 bg-stone-700 text-stone-200 rounded-lg hover:bg-stone-600 transition-colors"
            >
              Show poem
            </button>
          </div>
        )}

        {/* Reveal phase - show full poem */}
        {phase === 'reveal' && (
          <div className="w-full">
            <div className="mb-4">
              <h2 className="text-xl poem-text text-stone-100 mb-1">
                {poem.title}
              </h2>
              <p className="text-stone-400 text-sm">by {poem.poet}</p>
            </div>
            <div className="p-4 bg-stone-800 rounded-lg mb-6">
              <pre className="poem-text whitespace-pre-wrap text-stone-100">
                {poem.text}
              </pre>
            </div>
            <div className="text-center">
              <button
                onClick={() => setPhase('rate')}
                className="px-6 py-3 bg-amber-600 text-stone-100 rounded-lg hover:bg-amber-500 transition-colors"
              >
                Rate my recall
              </button>
            </div>
          </div>
        )}

        {/* Rate phase - self-assessment */}
        {phase === 'rate' && (
          <div className="w-full">
            <h3 className="text-lg text-stone-200 text-center mb-6">
              How did that go?
            </h3>
            <div className="grid grid-cols-2 gap-3">
              {reviewRatings.map((rating) => (
                <button
                  key={rating.value}
                  onClick={() => handleRate(rating.value)}
                  className="p-4 bg-stone-800 rounded-lg text-left hover:bg-stone-700 transition-colors group"
                >
                  <div className="font-medium text-stone-100 group-hover:text-amber-400">
                    {rating.label}
                  </div>
                  <div className="text-xs text-stone-500 mt-1">
                    {rating.description}
                  </div>
                  <div className="text-xs text-stone-600 mt-2">
                    Next review: {getIntervalPreview(rating.value)}
                  </div>
                </button>
              ))}
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
