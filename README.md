[![GitHub Marketplace](https://img.shields.io/badge/Marketplace-Argus%20AI%20PR%20Review-blue?logo=github)](https://github.com/marketplace/actions/argus-ai-pr-review)
# Interactive Developer Story

A scroll-driven, scene-based portfolio built as an immersive narrative experience. Powered by React, Vite, Tailwind CSS, and Framer Motion.

## Architecture

```
src/
├── components/
│   ├── animations/     # Motion primitives & variants
│   ├── layout/         # SceneManager, nav, progress
│   └── ui/             # Button, GlassCard, SceneShell
├── context/            # Story Engine (React Context)
├── hooks/              # useScrollStory, useSceneTransition
├── scenes/             # Intro, Journey, Projects, Skills, Finale
├── data/               # JSON content layer
└── constants/          # Scene IDs & order
```

## Story Engine

Centralized state via `StoryContext`:

- `currentScene` — active narrative chapter
- `scrollProgress` — global scroll mapping (0–1)
- `sceneProgress` — per-scene visibility progress
- `interaction` — hover/selection state

## Scripts

```bash
npm install
npm run dev      # http://localhost:5173
npm run build
npm run preview
```

## Customization

Edit JSON files in `src/data/`:

- `storyData.json` — hero, journey, finale copy
- `projectsData.json` — project showcase (Hire_OS featured)
- `skillsData.json` — tech stack categories

Update contact links in `FinaleScene.jsx` and `projectsData.json`.

## Tech Stack

- React 19 + Vite 6
- Tailwind CSS 4
- Framer Motion 12

## Deployment

Deploy to Vercel:

```bash
npm run build
```

Output: `dist/`
