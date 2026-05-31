import {
  createContext,
  useCallback,
  useContext,
  useMemo,
  useReducer,
  useRef,
} from 'react';
import { SCENE_IDS, SCENE_ORDER } from '../constants/scenes';

const initialState = {
  currentScene: SCENE_IDS.INTRO,
  scrollProgress: 0,
  sceneProgress: {},
  isTransitioning: false,
  hasStarted: false,
  interaction: {
    hoveredProject: null,
    activeSkillCategory: null,
  },
};

function storyReducer(state, action) {
  switch (action.type) {
    case 'SET_SCENE':
      return {
        ...state,
        currentScene: action.payload,
        isTransitioning: false,
      };
    case 'SET_SCROLL_PROGRESS':
      return { ...state, scrollProgress: action.payload };
    case 'SET_SCENE_PROGRESS':
      return {
        ...state,
        sceneProgress: { ...state.sceneProgress, ...action.payload },
      };
    case 'SET_TRANSITIONING':
      return { ...state, isTransitioning: action.payload };
    case 'START_JOURNEY':
      return { ...state, hasStarted: true };
    case 'SET_INTERACTION':
      return {
        ...state,
        interaction: { ...state.interaction, ...action.payload },
      };
    default:
      return state;
  }
}

const StoryContext = createContext(null);

export function StoryProvider({ children }) {
  const [state, dispatch] = useReducer(storyReducer, initialState);
  const sceneRefs = useRef({});

  const registerSceneRef = useCallback((sceneId, ref) => {
    if (ref) sceneRefs.current[sceneId] = ref;
    else delete sceneRefs.current[sceneId];
  }, []);

  const setActiveScene = useCallback((sceneId) => {
    if (SCENE_ORDER.indexOf(sceneId) === -1) return;
    dispatch({ type: 'SET_SCENE', payload: sceneId });
  }, []);

  const goToScene = useCallback(
    (sceneId, { scroll = true } = {}) => {
      if (SCENE_ORDER.indexOf(sceneId) === -1) return;

      dispatch({ type: 'SET_TRANSITIONING', payload: true });
      setActiveScene(sceneId);

      if (scroll) {
        const el =
          document.getElementById(`scene-${sceneId}`) ??
          sceneRefs.current[sceneId];
        if (el) el.scrollIntoView({ behavior: 'smooth', block: 'start' });
      }
    },
    [setActiveScene],
  );

  const startJourney = useCallback(() => {
    dispatch({ type: 'START_JOURNEY' });
    goToScene(SCENE_IDS.PROJECTS);
  }, [goToScene]);

  const setScrollProgress = useCallback((progress) => {
    dispatch({ type: 'SET_SCROLL_PROGRESS', payload: progress });
  }, []);

  const setSceneProgress = useCallback((sceneId, progress) => {
    dispatch({
      type: 'SET_SCENE_PROGRESS',
      payload: { [sceneId]: progress },
    });
  }, []);

  const setInteraction = useCallback((payload) => {
    dispatch({ type: 'SET_INTERACTION', payload });
  }, []);

  const value = useMemo(
    () => ({
      ...state,
      sceneOrder: SCENE_ORDER,
      sceneIndex: SCENE_ORDER.indexOf(state.currentScene),
      totalScenes: SCENE_ORDER.length,
      registerSceneRef,
      setActiveScene,
      goToScene,
      startJourney,
      setScrollProgress,
      setSceneProgress,
      setInteraction,
    }),
    [
      state,
      registerSceneRef,
      setActiveScene,
      goToScene,
      startJourney,
      setScrollProgress,
      setSceneProgress,
      setInteraction,
    ],
  );

  return (
    <StoryContext.Provider value={value}>{children}</StoryContext.Provider>
  );
}

export function useStory() {
  const ctx = useContext(StoryContext);
  if (!ctx) {
    throw new Error('useStory must be used within StoryProvider');
  }
  return ctx;
}

/** Selective subscription to avoid re-renders */
export function useStorySelector(selector) {
  const ctx = useStory();
  return useMemo(() => selector(ctx), [ctx, selector]);
}
