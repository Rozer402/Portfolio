export const SCENE_IDS = {
  INTRO: 'intro',
  PROJECTS: 'projects',
  JOURNEY: 'journey',
  SKILLS: 'skills',
  FINALE: 'finale',
};

/** Projects immediately after intro — recruiter sees flagship work on first scroll */
export const SCENE_ORDER = [
  SCENE_IDS.INTRO,
  SCENE_IDS.PROJECTS,
  SCENE_IDS.JOURNEY,
  SCENE_IDS.SKILLS,
  SCENE_IDS.FINALE,
];

export const SCENE_LABELS = {
  [SCENE_IDS.INTRO]: 'Intro',
  [SCENE_IDS.PROJECTS]: 'Projects',
  [SCENE_IDS.JOURNEY]: 'Background',
  [SCENE_IDS.SKILLS]: 'Skills',
  [SCENE_IDS.FINALE]: 'Contact',
};
