import { useEffect, useRef, useCallback } from 'react';
import { useStory } from '../context/StoryContext';
import { SCENE_ORDER } from '../constants/scenes';

const clamp = (n, min, max) => Math.min(Math.max(n, min), max);

/**
 * Maps scroll position to global progress and per-scene progress.
 * Uses rAF-throttled scroll listener for 60fps-friendly tracking.
 */
export function useScrollStory() {
  const { setScrollProgress, setSceneProgress, registerSceneRef } = useStory();
  const rafId = useRef(null);
  const lastProgress = useRef(-1);

  const measure = useCallback(() => {
    const docHeight = document.documentElement.scrollHeight - window.innerHeight;
    if (docHeight <= 0) return;

    const scrollY = window.scrollY;
    const globalProgress = clamp(scrollY / docHeight, 0, 1);

    if (Math.abs(globalProgress - lastProgress.current) > 0.001) {
      lastProgress.current = globalProgress;
      setScrollProgress(globalProgress);
    }

    SCENE_ORDER.forEach((sceneId) => {
      const el = document.getElementById(`scene-${sceneId}`);
      if (!el) return;

      const rect = el.getBoundingClientRect();
      const viewportH = window.innerHeight;
      const sceneTop = scrollY + rect.top;
      const sceneHeight = el.offsetHeight;
      const visibleStart = scrollY;
      const visibleEnd = scrollY + viewportH;

      const progress = clamp(
        (visibleEnd - sceneTop) / (sceneHeight + viewportH * 0.5),
        0,
        1,
      );

      setSceneProgress(sceneId, progress);
    });
  }, [setScrollProgress, setSceneProgress]);

  const onScroll = useCallback(() => {
    if (rafId.current !== null) return;
    rafId.current = requestAnimationFrame(() => {
      measure();
      rafId.current = null;
    });
  }, [measure]);

  useEffect(() => {
    measure();
    window.addEventListener('scroll', onScroll, { passive: true });
    window.addEventListener('resize', onScroll, { passive: true });

    return () => {
      window.removeEventListener('scroll', onScroll);
      window.removeEventListener('resize', onScroll);
      if (rafId.current) cancelAnimationFrame(rafId.current);
    };
  }, [onScroll, measure]);

  return { registerSceneRef };
}
