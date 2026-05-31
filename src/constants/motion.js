/** Product motion — cinematic but restrained */
export const EASE = [0.22, 1, 0.36, 1];

export const DURATION = {
  fast: 0.2,
  normal: 0.35,
  slow: 0.45,
  scene: 0.75,
  sceneExit: 0.65,
  curtain: 1,
};

export const STAGGER = {
  tight: 0.05,
  normal: 0.08,
  relaxed: 0.1,
};

export const TRANSITION = {
  duration: DURATION.normal,
  ease: EASE,
};

export const TRANSITION_SCENE = {
  duration: DURATION.scene,
  ease: EASE,
};

export const TRANSITION_SCENE_EXIT = {
  duration: DURATION.sceneExit,
  ease: EASE,
};

export const SPRING_PROGRESS = {
  type: 'spring',
  stiffness: 120,
  damping: 24,
};

export const GLIDE_IN = {
  hidden: { opacity: 0, y: 10, filter: 'blur(6px)' },
  visible: {
    opacity: 1,
    y: 0,
    filter: 'blur(0px)',
    transition: TRANSITION,
  },
};

/** Scroll-driven scene: enter from below, exit upward */
export const SCENE_SCROLL_VARIANTS = {
  hidden: {
    opacity: 0,
    y: 40,
    filter: 'blur(8px)',
  },
  visible: {
    opacity: 1,
    y: 0,
    filter: 'blur(0px)',
    transition: {
      duration: 0.7,
      ease: EASE,
      opacity: { duration: 0.55, delay: 0.04 },
      when: 'beforeChildren',
      staggerChildren: STAGGER.normal,
      delayChildren: STAGGER.tight,
    },
  },
  exit: {
    opacity: 0,
    y: -28,
    filter: 'blur(4px)',
    transition: {
      duration: 0.55,
      ease: EASE,
      opacity: { duration: 0.45 },
    },
  },
};

export const SCENE_CONTENT_VARIANTS = {
  hidden: { opacity: 0, y: 16, filter: 'blur(6px)' },
  visible: {
    opacity: 1,
    y: 0,
    filter: 'blur(0px)',
    transition: { duration: DURATION.scene, ease: EASE },
  },
};

export const SCENE_ENTER = SCENE_SCROLL_VARIANTS;

export const PANEL_ENTER = {
  hidden: { opacity: 0, y: 12, filter: 'blur(6px)' },
  visible: {
    opacity: 1,
    y: 0,
    filter: 'blur(0px)',
    transition: { ...TRANSITION_SCENE, delay: 0.06 },
  },
};

export const FADE_IN = {
  hidden: { opacity: 0 },
  visible: { opacity: 1, transition: TRANSITION },
};

export const VIEWPORT_SCENE = {
  amount: 0.28,
  margin: '-12% 0px -12% 0px',
  once: false,
};
