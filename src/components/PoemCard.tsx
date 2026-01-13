import type { PoemWithReview } from '../types';
import { getMasteryLevel, getMasteryColor, getDaysUntilReview } from '../utils/sm2';
import { truncateToLines, getLineCount } from '../utils/textHelpers';

interface PoemCardProps {
  poem: PoemWithReview;
  onClick: () => void;
}

export function PoemCard({ poem, onClick }: PoemCardProps) {
  const masteryLevel = getMasteryLevel(poem.review);
  const masteryColor = getMasteryColor(masteryLevel);
  const daysUntil = getDaysUntilReview(poem.review);
  const lineCount = getLineCount(poem.text);

  const dueText =
    daysUntil <= 0
      ? 'Due now'
      : daysUntil === 1
        ? 'Due tomorrow'
        : `Due in ${daysUntil} days`;

  return (
    <button
      onClick={onClick}
      className="w-full text-left p-4 bg-stone-800 rounded-lg hover:bg-stone-750 transition-colors focus:outline-none focus-visible:ring-2 focus-visible:ring-amber-500"
    >
      <div className="flex justify-between items-start gap-4">
        <div className="flex-1 min-w-0">
          <h3 className="font-medium text-stone-100 truncate">{poem.title}</h3>
          <p className="text-sm text-stone-400">{poem.poet}</p>
        </div>
        <div className="flex flex-col items-end text-xs">
          <span className={masteryColor}>{masteryLevel}</span>
          <span className="text-stone-500">{dueText}</span>
        </div>
      </div>

      <p className="mt-3 text-sm text-stone-400 poem-text whitespace-pre-line">
        {truncateToLines(poem.text, 3)}
      </p>

      <div className="mt-3 flex items-center gap-2 flex-wrap">
        <span className="text-xs text-stone-500">{lineCount} lines</span>
        {poem.language !== 'en' && (
          <span className="text-xs px-1.5 py-0.5 bg-stone-700 rounded">
            {poem.language.toUpperCase()}
          </span>
        )}
        {poem.tags.slice(0, 3).map((tag) => (
          <span
            key={tag}
            className="text-xs px-1.5 py-0.5 bg-stone-700 rounded text-stone-300"
          >
            {tag}
          </span>
        ))}
      </div>
    </button>
  );
}
