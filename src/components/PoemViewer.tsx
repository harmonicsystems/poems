import { useState, useMemo } from 'react';
import type { PoemWithReview, MemorizationMode } from '../types';
import { toFirstLetters, splitIntoLines, createGapText, checkWordMatch } from '../utils/textHelpers';
import { getMasteryLevel, getMasteryColor, getDaysUntilReview } from '../utils/sm2';

interface PoemViewerProps {
  poem: PoemWithReview;
  onBack: () => void;
  onStartReview: () => void;
  onDelete: () => void;
}

const modeLabels: Record<MemorizationMode, string> = {
  read: 'Read',
  'first-letters': 'First Letters',
  'reveal-lines': 'Line by Line',
  'fill-gap': 'Fill the Gap',
  recite: 'Recite',
};

export function PoemViewer({ poem, onBack, onStartReview, onDelete }: PoemViewerProps) {
  const [mode, setMode] = useState<MemorizationMode>('read');
  const [revealedLines, setRevealedLines] = useState(0);
  const [gapAnswers, setGapAnswers] = useState<Record<string, string>>({});
  const [showDeleteConfirm, setShowDeleteConfirm] = useState(false);

  const masteryLevel = getMasteryLevel(poem.review);
  const masteryColor = getMasteryColor(masteryLevel);
  const daysUntil = getDaysUntilReview(poem.review);

  const lines = useMemo(() => splitIntoLines(poem.text), [poem.text]);
  const firstLetters = useMemo(() => toFirstLetters(poem.text), [poem.text]);
  const gapText = useMemo(() => createGapText(poem.text, 0.3), [poem.text]);

  const handleRevealNext = () => {
    setRevealedLines((prev) => Math.min(prev + 1, lines.length));
  };

  const handleResetReveal = () => {
    setRevealedLines(0);
  };

  const handleGapInput = (lineIndex: number, wordIndex: number, value: string) => {
    setGapAnswers((prev) => ({
      ...prev,
      [`${lineIndex}-${wordIndex}`]: value,
    }));
  };

  const renderContent = () => {
    switch (mode) {
      case 'read':
        return (
          <pre className="poem-text whitespace-pre-wrap text-stone-100">
            {poem.text}
          </pre>
        );

      case 'first-letters':
        return (
          <pre className="poem-text whitespace-pre-wrap text-stone-100 font-mono tracking-widest">
            {firstLetters}
          </pre>
        );

      case 'reveal-lines':
        return (
          <div className="space-y-1">
            {lines.map((line, index) => (
              <div
                key={index}
                className={`poem-text transition-opacity duration-300 ${
                  index < revealedLines ? 'opacity-100' : 'opacity-0'
                }`}
              >
                {line || '\u00A0'}
              </div>
            ))}
            <div className="mt-4 flex gap-2">
              <button
                onClick={handleRevealNext}
                disabled={revealedLines >= lines.length}
                className="px-3 py-1 bg-stone-700 rounded text-sm hover:bg-stone-600 disabled:opacity-50 disabled:cursor-not-allowed"
              >
                Reveal next line
              </button>
              <button
                onClick={handleResetReveal}
                className="px-3 py-1 bg-stone-700 rounded text-sm hover:bg-stone-600"
              >
                Reset
              </button>
            </div>
            <p className="text-xs text-stone-500 mt-2">
              {revealedLines} / {lines.length} lines revealed
            </p>
          </div>
        );

      case 'fill-gap':
        return (
          <div className="space-y-1">
            {gapText.map((line, lineIndex) => (
              <div key={lineIndex} className="poem-text flex flex-wrap">
                {line.map((word, wordIndex) => {
                  if (!word.hidden) {
                    return (
                      <span key={wordIndex} className="text-stone-100">
                        {word.text}
                      </span>
                    );
                  }

                  const inputKey = `${lineIndex}-${word.index}`;
                  const userAnswer = gapAnswers[inputKey] || '';
                  const isCorrect = userAnswer && checkWordMatch(userAnswer, word.text);
                  const isWrong = userAnswer && !isCorrect;

                  return (
                    <input
                      key={wordIndex}
                      type="text"
                      value={userAnswer}
                      onChange={(e) => handleGapInput(lineIndex, word.index, e.target.value)}
                      className={`mx-0.5 px-1 w-20 bg-stone-800 border rounded text-center ${
                        isCorrect
                          ? 'border-green-500 text-green-400'
                          : isWrong
                            ? 'border-red-500 text-red-400'
                            : 'border-stone-600'
                      }`}
                      placeholder="___"
                    />
                  );
                })}
              </div>
            ))}
            <button
              onClick={() => setGapAnswers({})}
              className="mt-4 px-3 py-1 bg-stone-700 rounded text-sm hover:bg-stone-600"
            >
              Reset answers
            </button>
          </div>
        );

      case 'recite':
        return (
          <div className="text-center py-12">
            <h3 className="text-2xl text-stone-300 poem-text mb-4">
              {poem.title}
            </h3>
            <p className="text-stone-500 mb-8">by {poem.poet}</p>
            <p className="text-stone-400 text-sm">
              Take a breath. When you're ready, recite from memory.
            </p>
            <button
              onClick={() => setMode('read')}
              className="mt-8 px-4 py-2 bg-stone-700 rounded hover:bg-stone-600"
            >
              Show poem
            </button>
          </div>
        );
    }
  };

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex items-start justify-between gap-4">
        <button
          onClick={onBack}
          className="text-stone-400 hover:text-stone-200"
        >
          &larr; Back
        </button>
        <div className="flex items-center gap-2">
          <span className={`text-sm ${masteryColor}`}>{masteryLevel}</span>
          <span className="text-sm text-stone-500">
            {daysUntil <= 0 ? 'Due now' : `Due in ${daysUntil}d`}
          </span>
        </div>
      </div>

      {/* Title and poet */}
      <div>
        <h2 className="text-xl font-medium text-stone-100">{poem.title}</h2>
        <p className="text-stone-400">{poem.poet}</p>
        {poem.language !== 'en' && (
          <span className="text-xs px-1.5 py-0.5 bg-stone-700 rounded mt-1 inline-block">
            {poem.language.toUpperCase()}
          </span>
        )}
      </div>

      {/* Mode selector */}
      <div className="flex flex-wrap gap-1">
        {(Object.keys(modeLabels) as MemorizationMode[]).map((m) => (
          <button
            key={m}
            onClick={() => setMode(m)}
            className={`px-3 py-1 rounded text-sm transition-colors ${
              mode === m
                ? 'bg-amber-600 text-stone-100'
                : 'bg-stone-700 text-stone-300 hover:bg-stone-600'
            }`}
          >
            {modeLabels[m]}
          </button>
        ))}
      </div>

      {/* Poem content */}
      <div className="p-4 bg-stone-800 rounded-lg min-h-[200px]">
        {renderContent()}
      </div>

      {/* Translation (if available) */}
      {poem.translation && mode === 'read' && (
        <details className="group">
          <summary className="cursor-pointer text-sm text-stone-400 hover:text-stone-300">
            Show translation
          </summary>
          <div className="mt-2 p-4 bg-stone-800/50 rounded-lg">
            <pre className="poem-text whitespace-pre-wrap text-stone-300 text-sm">
              {poem.translation}
            </pre>
          </div>
        </details>
      )}

      {/* Notes */}
      {poem.notes && (
        <div className="p-3 bg-stone-800/50 rounded-lg">
          <p className="text-sm text-stone-400">{poem.notes}</p>
        </div>
      )}

      {/* Actions */}
      <div className="flex gap-2 pt-4 border-t border-stone-800">
        <button
          onClick={onStartReview}
          className="flex-1 px-4 py-2 bg-amber-600 text-stone-100 rounded hover:bg-amber-500 transition-colors"
        >
          Start Review
        </button>
        <button
          onClick={() => setShowDeleteConfirm(true)}
          className="px-4 py-2 text-stone-400 hover:text-red-400 transition-colors"
        >
          Delete
        </button>
      </div>

      {/* Delete confirmation */}
      {showDeleteConfirm && (
        <div className="fixed inset-0 bg-black/50 flex items-center justify-center p-4 z-50">
          <div className="bg-stone-800 rounded-lg p-6 max-w-sm w-full">
            <h3 className="text-lg font-medium text-stone-100 mb-2">
              Delete "{poem.title}"?
            </h3>
            <p className="text-stone-400 text-sm mb-4">
              This will remove the poem and all review progress. This cannot be undone.
            </p>
            <div className="flex gap-2">
              <button
                onClick={() => setShowDeleteConfirm(false)}
                className="flex-1 px-4 py-2 bg-stone-700 rounded hover:bg-stone-600"
              >
                Cancel
              </button>
              <button
                onClick={() => {
                  onDelete();
                  setShowDeleteConfirm(false);
                }}
                className="flex-1 px-4 py-2 bg-red-600 text-white rounded hover:bg-red-500"
              >
                Delete
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
