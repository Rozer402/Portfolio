import { useEffect, useRef, useCallback } from 'react';
import { useStory } from '../context/StoryContext';
import { SCENE_ORDER } from '../constants/scenes';

const VISIBILITY_THRESHOLD = 0.35;

/**
 * Observes scene visibility and syncs active scene with scroll position.
 */
export function useSceneTransition() {
  const { currentScene, setActiveScene } = useStory();
  const observerRef = useRef(null);
  const isScrollingRef = useRef(false);
  const scrollTimeoutRef = useRef(null);

  const handleIntersect = useCallback(
    (entries) => {
      if (isScrollingRef.current) return;

      let bestEntry = null;
      let bestRatio = 0;

      entries.forEach((entry) => {
        if (entry.intersectionRatio > bestRatio) {
          bestRatio = entry.intersectionRatio;
          bestEntry = entry;
        }
      });

      if (bestEntry && bestRatio >= VISIBILITY_THRESHOLD) {
        const sceneId = bestEntry.target.dataset.scene;
        if (sceneId && sceneId !== currentScene) {
          setActiveScene(sceneId);
        }
      }
    },
    [currentScene, setActiveScene],
  );

  useEffect(() => {
    const options = {
      root: null,
      rootMargin: '-20% 0px -20% 0px',
      threshold: [0, 0.25, 0.5, 0.75, 1],
    };

    observerRef.current = new IntersectionObserver(handleIntersect, options);

    SCENE_ORDER.forEach((sceneId) => {
      const el = document.getElementById(`scene-${sceneId}`);
      if (el) observerRef.current.observe(el);
    });

    return () => observerRef.current?.disconnect();
  }, [handleIntersect]);

  useEffect(() => {
    const onScroll = () => {
      isScrollingRef.current = true;
      clearTimeout(scrollTimeoutRef.current);
      scrollTimeoutRef.current = setTimeout(() => {
        isScrollingRef.current = false;
      }, 150);
    };

    window.addEventListener('scroll', onScroll, { passive: true });
    return () => {
      window.removeEventListener('scroll', onScroll);
      clearTimeout(scrollTimeoutRef.current);
    };
  }, []);

  return { currentScene };
}
