/**
 * Text manipulation utilities for memorization modes
 */

/**
 * Extract first letter of each word, preserving line structure
 * "Glory be to God" -> "G b t G"
 */
export function toFirstLetters(text: string): string {
  return text
    .split('\n')
    .map((line) => {
      // Preserve leading whitespace for indentation
      const leadingSpace = line.match(/^(\s*)/)?.[0] || '';
      const words = line.trim().split(/\s+/);

      if (words.length === 0 || (words.length === 1 && words[0] === '')) {
        return '';
      }

      const firstLetters = words.map((word) => {
        // Get first non-punctuation character
        const match = word.match(/[a-zA-ZáéíóúàèìòùäëïöüâêîôûñçÁÉÍÓÚÀÈÌÒÙÄËÏÖÜÂÊÎÔÛÑÇ]/);
        if (match) {
          return match[0];
        }
        // If word is all punctuation, return it as-is
        return word;
      });

      return leadingSpace + firstLetters.join(' ');
    })
    .join('\n');
}

/**
 * Split text into lines for progressive reveal
 */
export function splitIntoLines(text: string): string[] {
  return text.split('\n');
}

/**
 * Create a fill-the-gap version with random words hidden
 * Returns an array of { text, hidden } objects
 */
export interface GapWord {
  text: string;
  hidden: boolean;
  index: number;
}

export function createGapText(
  text: string,
  gapRatio: number = 0.3
): GapWord[][] {
  const lines = text.split('\n');

  return lines.map((line) => {
    const words = line.split(/(\s+)/); // Keep whitespace as separate tokens
    const contentWords = words.filter((w) => w.trim().length > 0);
    const numToHide = Math.max(1, Math.floor(contentWords.length * gapRatio));

    // Randomly select indices to hide
    const contentIndices = words
      .map((w, i) => (w.trim().length > 0 ? i : -1))
      .filter((i) => i !== -1);

    const shuffled = [...contentIndices].sort(() => Math.random() - 0.5);
    const hiddenIndices = new Set(shuffled.slice(0, numToHide));

    return words.map((text, index) => ({
      text,
      hidden: hiddenIndices.has(index),
      index,
    }));
  });
}

/**
 * Check if user input matches the hidden word (fuzzy matching)
 */
export function checkWordMatch(input: string, target: string): boolean {
  // Normalize both strings
  const normalizedInput = input.toLowerCase().trim();
  const normalizedTarget = target
    .toLowerCase()
    .trim()
    // Remove leading/trailing punctuation for comparison
    .replace(/^[^\w\s]+|[^\w\s]+$/g, '');

  return normalizedInput === normalizedTarget;
}

/**
 * Get word count of poem text
 */
export function getWordCount(text: string): number {
  return text
    .split(/\s+/)
    .filter((word) => word.length > 0).length;
}

/**
 * Get line count of poem text
 */
export function getLineCount(text: string): number {
  return text.split('\n').filter((line) => line.trim().length > 0).length;
}

/**
 * Truncate text to a certain number of lines
 */
export function truncateToLines(text: string, maxLines: number): string {
  const lines = text.split('\n');
  if (lines.length <= maxLines) return text;
  return lines.slice(0, maxLines).join('\n') + '...';
}
