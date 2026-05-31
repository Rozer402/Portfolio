/** Micro-interaction timing — fast, invisible, premium */
export const MICRO_DURATION = {
  instant: 0.1,
  fast: 0.15,
  normal: 0.2,
  max: 0.25,
};

export const MICRO_EASE = [0.22, 1, 0.36, 1];

export const TAP = {
  scale: 0.98,
  transition: { duration: MICRO_DURATION.fast, ease: MICRO_EASE },
};

export const TAP_SOFT = {
  scale: 0.99,
  transition: { duration: MICRO_DURATION.fast, ease: MICRO_EASE },
};

export const HOVER_BUTTON = {
  scale: 1.02,
  transition: { duration: MICRO_DURATION.normal, ease: MICRO_EASE },
};

export const HOVER_CARD = {
  y: -2,
  transition: { duration: MICRO_DURATION.normal, ease: MICRO_EASE },
};

export const HOVER_LINK_ICON = {
  x: 4,
  transition: { duration: MICRO_DURATION.normal, ease: MICRO_EASE },
};

export const PROGRESS_FILL = {
  duration: 0.85,
  ease: MICRO_EASE,
  delay: 0.12,
};

export const LOADING_PULSE = {
  opacity: [1, 0.72, 1],
  transition: {
    duration: 1.1,
    repeat: Infinity,
    ease: 'easeInOut',
  },
};
