import { useState } from 'react';
import type { Language, Poem } from '../types';

interface AddPoemProps {
  onAdd: (poem: Omit<Poem, 'id' | 'createdAt'>) => void;
  onCancel: () => void;
  existingTags: string[];
}

export function AddPoem({ onAdd, onCancel, existingTags }: AddPoemProps) {
  const [title, setTitle] = useState('');
  const [poet, setPoet] = useState('');
  const [text, setText] = useState('');
  const [language, setLanguage] = useState<Language>('en');
  const [tagsInput, setTagsInput] = useState('');
  const [notes, setNotes] = useState('');
  const [translation, setTranslation] = useState('');

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();

    if (!title.trim() || !poet.trim() || !text.trim()) {
      return;
    }

    const tags = tagsInput
      .split(',')
      .map((t) => t.trim().toLowerCase())
      .filter((t) => t.length > 0);

    onAdd({
      title: title.trim(),
      poet: poet.trim(),
      text: text.trim(),
      language,
      tags,
      notes: notes.trim() || undefined,
      translation: translation.trim() || undefined,
    });
  };

  const isValid = title.trim() && poet.trim() && text.trim();

  return (
    <form onSubmit={handleSubmit} className="space-y-4">
      <div className="flex justify-between items-center">
        <h2 className="text-xl font-medium text-stone-100">Add a Poem</h2>
        <button
          type="button"
          onClick={onCancel}
          className="text-stone-400 hover:text-stone-200"
        >
          Cancel
        </button>
      </div>

      <div>
        <label className="block text-sm text-stone-400 mb-1">
          Title <span className="text-red-400">*</span>
        </label>
        <input
          type="text"
          value={title}
          onChange={(e) => setTitle(e.target.value)}
          className="w-full px-3 py-2 bg-stone-800 border border-stone-700 rounded-lg text-stone-100 focus:outline-none focus:border-amber-500"
          placeholder="Poem title"
          required
        />
      </div>

      <div>
        <label className="block text-sm text-stone-400 mb-1">
          Poet <span className="text-red-400">*</span>
        </label>
        <input
          type="text"
          value={poet}
          onChange={(e) => setPoet(e.target.value)}
          className="w-full px-3 py-2 bg-stone-800 border border-stone-700 rounded-lg text-stone-100 focus:outline-none focus:border-amber-500"
          placeholder="Poet name"
          required
        />
      </div>

      <div>
        <label className="block text-sm text-stone-400 mb-1">
          Poem text <span className="text-red-400">*</span>
        </label>
        <textarea
          value={text}
          onChange={(e) => setText(e.target.value)}
          rows={10}
          className="w-full px-3 py-2 bg-stone-800 border border-stone-700 rounded-lg text-stone-100 font-serif focus:outline-none focus:border-amber-500"
          placeholder="Paste the poem here..."
          required
        />
      </div>

      <div className="grid grid-cols-2 gap-4">
        <div>
          <label className="block text-sm text-stone-400 mb-1">Language</label>
          <select
            value={language}
            onChange={(e) => setLanguage(e.target.value as Language)}
            className="w-full px-3 py-2 bg-stone-800 border border-stone-700 rounded-lg text-stone-100 focus:outline-none focus:border-amber-500"
          >
            <option value="en">English</option>
            <option value="es">Spanish</option>
            <option value="sv">Swedish</option>
            <option value="other">Other</option>
          </select>
        </div>

        <div>
          <label className="block text-sm text-stone-400 mb-1">
            Tags
            <span className="text-stone-500 text-xs ml-1">(comma-separated)</span>
          </label>
          <input
            type="text"
            value={tagsInput}
            onChange={(e) => setTagsInput(e.target.value)}
            className="w-full px-3 py-2 bg-stone-800 border border-stone-700 rounded-lg text-stone-100 focus:outline-none focus:border-amber-500"
            placeholder="love, nature, short"
          />
        </div>
      </div>

      {existingTags.length > 0 && (
        <div className="flex flex-wrap gap-1">
          <span className="text-xs text-stone-500">Existing tags:</span>
          {existingTags.slice(0, 10).map((tag) => (
            <button
              key={tag}
              type="button"
              onClick={() => {
                const current = tagsInput
                  .split(',')
                  .map((t) => t.trim())
                  .filter((t) => t);
                if (!current.includes(tag)) {
                  setTagsInput([...current, tag].join(', '));
                }
              }}
              className="text-xs px-1.5 py-0.5 bg-stone-700 rounded text-stone-400 hover:text-stone-200"
            >
              {tag}
            </button>
          ))}
        </div>
      )}

      {language !== 'en' && (
        <div>
          <label className="block text-sm text-stone-400 mb-1">
            Translation
            <span className="text-stone-500 text-xs ml-1">(optional)</span>
          </label>
          <textarea
            value={translation}
            onChange={(e) => setTranslation(e.target.value)}
            rows={6}
            className="w-full px-3 py-2 bg-stone-800 border border-stone-700 rounded-lg text-stone-100 font-serif focus:outline-none focus:border-amber-500"
            placeholder="English translation..."
          />
        </div>
      )}

      <div>
        <label className="block text-sm text-stone-400 mb-1">
          Notes
          <span className="text-stone-500 text-xs ml-1">(optional)</span>
        </label>
        <textarea
          value={notes}
          onChange={(e) => setNotes(e.target.value)}
          rows={2}
          className="w-full px-3 py-2 bg-stone-800 border border-stone-700 rounded-lg text-stone-100 focus:outline-none focus:border-amber-500"
          placeholder="Personal notes about this poem..."
        />
      </div>

      <div className="pt-4">
        <button
          type="submit"
          disabled={!isValid}
          className="w-full px-4 py-3 bg-amber-600 text-stone-100 rounded-lg hover:bg-amber-500 transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
        >
          Add Poem
        </button>
      </div>
    </form>
  );
}
