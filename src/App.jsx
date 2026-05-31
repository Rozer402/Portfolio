import { useState, useCallback } from 'react';
import { StoryProvider } from './context/StoryContext';
import { SceneManager } from './components/layout/SceneManager';
import { OpeningCurtain } from './components/visual/OpeningCurtain';
import { useScrollStory } from './hooks/useScrollStory';
import { useSceneTransition } from './hooks/useSceneTransition';

function StoryExperience() {
  useScrollStory();
  useSceneTransition();

  return <SceneManager />;
}

function getInitialCurtainState() {
  if (typeof window === 'undefined') return false;
  return !window.matchMedia('(prefers-reduced-motion: reduce)').matches;
}

export default function App() {
  const [showCurtain, setShowCurtain] = useState(getInitialCurtainState);

  const handleCurtainComplete = useCallback(() => {
    setShowCurtain(false);
  }, []);

  return (
    <StoryProvider>
      <div className="relative min-h-screen bg-void text-foreground antialiased">
        {showCurtain && <OpeningCurtain onComplete={handleCurtainComplete} />}
        <StoryExperience />
      </div>
    </StoryProvider>
  );
}
