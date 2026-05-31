import { motion } from 'framer-motion';
import { useStory } from '../context/StoryContext';
import { SCENE_IDS } from '../constants/scenes';
import { SceneShell } from '../components/ui/SceneShell';
import { Button } from '../components/ui/Button';
import { KeywordHighlight } from '../components/ui/KeywordHighlight';
import { staggerContainer, staggerItem } from '../components/animations/motionPrimitives';
import { getProfileLinks } from '../utils/links';
import storyData from '../data/storyData.json';

const { developer, intro } = storyData;
const profileLinks = getProfileLinks();

export function IntroScene() {
  const { goToScene } = useStory();

  return (
    <SceneShell
      id={`scene-${SCENE_IDS.INTRO}`}
      sceneId={SCENE_IDS.INTRO}
      className="flex min-h-[90vh] items-end md:items-center"
    >
      <motion.div variants={staggerContainer} initial="hidden" animate="visible">
        <motion.p variants={staggerItem} className="mb-6 font-mono text-[11px] text-muted">
          {intro.greeting}
        </motion.p>

        <motion.h1
          variants={staggerItem}
          className="text-4xl font-semibold tracking-[-0.03em] text-foreground sm:text-5xl md:text-[3.25rem] md:leading-[1.1]"
        >
          {developer.name}
        </motion.h1>
        <motion.p variants={staggerItem} className="mt-3 text-base text-secondary">
          {developer.title}
        </motion.p>

        <motion.p
          variants={staggerItem}
          className="mt-10 max-w-xl text-xl font-medium leading-snug tracking-[-0.02em] text-foreground md:text-2xl"
        >
          <KeywordHighlight text={intro.valueStatement} keywords={intro.keywords} />
        </motion.p>

        <motion.p
          variants={staggerItem}
          className="mt-6 max-w-lg text-base leading-relaxed text-secondary"
        >
          Built <span className="text-gold font-medium">Hire_OS</span>
          {' — '}
          {intro.proofLine.replace(/^Built Hire_OS —?\s*/i, '')}
        </motion.p>

        <motion.div variants={staggerItem} className="mt-10 flex flex-wrap gap-3">
          <Button size="lg" onClick={() => goToScene(SCENE_IDS.PROJECTS)}>
            {intro.ctas.projects}
          </Button>
          <Button size="lg" variant="secondary" href={profileLinks.github}>
            {intro.ctas.github}
          </Button>
        </motion.div>

        <motion.p variants={staggerItem} className="mt-10 font-mono text-[11px] text-muted">
          {developer.availability}
        </motion.p>
      </motion.div>
    </SceneShell>
  );
}
