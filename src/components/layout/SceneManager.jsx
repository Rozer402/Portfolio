import { Suspense, lazy, useRef, useEffect } from 'react';
import { SCENE_IDS } from '../../constants/scenes';
import { useStory } from '../../context/StoryContext';
import { AmbientBackground } from '../visual/AmbientBackground';
import { CursorGlow } from '../visual/CursorGlow';
import { ProgressIndicator } from './ProgressIndicator';
import { SideNav } from './SideNav';
import { MobileSceneBar } from './MobileSceneBar';

const IntroScene = lazy(() =>
  import('../../scenes/IntroScene').then((m) => ({ default: m.IntroScene })),
);
const ProjectsScene = lazy(() =>
  import('../../scenes/ProjectsScene').then((m) => ({ default: m.ProjectsScene })),
);
const JourneyScene = lazy(() =>
  import('../../scenes/JourneyScene').then((m) => ({ default: m.JourneyScene })),
);
const SkillsScene = lazy(() =>
  import('../../scenes/SkillsScene').then((m) => ({ default: m.SkillsScene })),
);
const FinaleScene = lazy(() =>
  import('../../scenes/FinaleScene').then((m) => ({ default: m.FinaleScene })),
);

function SceneLoader() {
  return (
    <div className="flex min-h-[40vh] items-center pl-14">
      <div className="h-5 w-5 animate-pulse rounded-sm bg-white/10" />
    </div>
  );
}

function SceneWrapper({ sceneId, children }) {
  const ref = useRef(null);
  const { registerSceneRef } = useStory();

  useEffect(() => {
    registerSceneRef(sceneId, ref.current);
    return () => registerSceneRef(sceneId, null);
  }, [sceneId, registerSceneRef]);

  return <div ref={ref}>{children}</div>;
}

const SCENE_SEQUENCE = [
  { id: SCENE_IDS.INTRO, Component: IntroScene },
  { id: SCENE_IDS.PROJECTS, Component: ProjectsScene },
  { id: SCENE_IDS.JOURNEY, Component: JourneyScene },
  { id: SCENE_IDS.SKILLS, Component: SkillsScene },
  { id: SCENE_IDS.FINALE, Component: FinaleScene },
];

export function SceneManager() {
  return (
    <>
      <AmbientBackground />
      <CursorGlow />
      <ProgressIndicator />
      <SideNav />
      <MobileSceneBar />

      <main className="relative z-[1] pb-20 md:pb-0 md:pl-12">
        <Suspense fallback={<SceneLoader />}>
          {SCENE_SEQUENCE.map(({ id, Component }) => (
            <SceneWrapper key={id} sceneId={id}>
              <Component />
            </SceneWrapper>
          ))}
        </Suspense>
      </main>
    </>
  );
}
