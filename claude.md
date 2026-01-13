# Poetry Memorization App

## Project Vision

A minimalist, offline-first React PWA for memorizing poetry. Built for someone with a musical ear, voice science background, and appreciation for how rhythm and sound aid memory. Privacy-first, no accounts, no tracking — just you and the poems.

## Creator Context

- Speech-Language Pathologist with deep background in voice, music (28+ years), and audio processing
- Appreciates: sprung rhythm, sound patterns, multilingual poetry (English, Spanish, Swedish)
- Learns best through specific examples, not abstract concepts
- Values: accessibility, neurodiversity-affirming design, tools that empower rather than extract

## Tech Stack

- **React 18** with hooks
- **TypeScript** for type safety
- **Vite** for fast builds
- **Tailwind CSS** for styling (utility-first, minimal custom CSS)
- **localStorage** for persistence (no backend)
- **PWA** via vite-plugin-pwa for offline access
- Deploy to **GitHub Pages** (dnslp.github.io/poetry or similar)

## Core Features (MVP)

### 1. Poem Library
- Poems stored as JSON with metadata (title, poet, language, tags, personal notes)
- Ability to add custom poems
- Filter/search by poet, language, tags

### 2. Memorization Modes
- **Read**: Full poem display
- **First Letters**: Show only first letter of each word as scaffolding
- **Reveal Line-by-Line**: Progressive disclosure, tap to reveal next line
- **Fill the Gap**: Hide random words/lines, test recall
- **Full Recite**: Blank screen, just the title — go for it

### 3. Spaced Repetition
- Simple SM-2 algorithm implementation
- Track: last reviewed, ease factor, interval
- Daily review queue
- "How'd that go?" self-rating (1-4 scale)

### 4. Progress Tracking
- Per-poem mastery indicators
- Streak tracking (optional, non-gamified)
- Total poems in rotation

## Future Features (Post-MVP)

- **Audio recording**: Record yourself reciting, play back
- **Rhythm visualization**: Show stressed/unstressed syllables
- **Pitch contour display**: For poems where musicality matters
- **Stanza chunking mode**: Master piece by piece
- **Export/import**: Backup your library and progress as JSON

## Design Principles

1. **Calm UI**: No bright colors, no badges, no dopamine manipulation
2. **Readable typography**: Serif font for poems (Georgia, Libre Baskerville), generous line height
3. **Dark mode default**: Easier on eyes for evening memorization sessions
4. **Accessible**: Keyboard navigable, screen reader friendly, respects reduced motion
5. **Offline-first**: Works without network after initial load
6. **No accounts**: Everything stays on-device

## Initial Poem Seeds

Include a starter set reflecting the creator's interests:

- Gerard Manley Hopkins — "Pied Beauty"
- Dylan Thomas — "Do Not Go Gentle into That Good Night"
- Emily Dickinson — "I'm Nobody! Who are you?"
- Tomas Tranströmer — "Romanska bågar" (with English translation)
- Federico García Lorca — "Romance Sonámbulo"
- Galway Kinnell — "After Making Love We Hear Footsteps"
- ee cummings — "somewhere i have never travelled"

## File Structure

```
src/
├── components/
│   ├── PoemCard.tsx
│   ├── PoemViewer.tsx
│   ├── ReviewSession.tsx
│   ├── Library.tsx
│   └── AddPoem.tsx
├── hooks/
│   ├── useLocalStorage.ts
│   ├── useSpacedRepetition.ts
│   └── usePoems.ts
├── data/
│   └── seedPoems.json
├── utils/
│   ├── sm2.ts (spaced repetition algorithm)
│   └── textHelpers.ts (first-letter extraction, etc.)
├── types/
│   └── index.ts
├── App.tsx
└── main.tsx
```

## Commands

```bash
npm run dev      # Local development
npm run build    # Production build
npm run preview  # Preview production build
npm run deploy   # Deploy to GitHub Pages
```

## Notes for Claude

- Prefer function components with hooks over class components
- Use TypeScript strictly — no `any` types
- Keep components small and composable
- Write code that's readable over clever
- When in doubt, simpler is better
- Test memorization UX ideas with real poems, not lorem ipsum