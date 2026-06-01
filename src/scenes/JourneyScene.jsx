import { motion } from 'framer-motion';
import { SCENE_IDS } from '../constants/scenes';
import { SceneShell, SceneHeader } from '../components/ui/SceneShell';
import { EASE, DURATION } from '../constants/motion';
import storyData from '../data/storyData.json';

const { journey } = storyData;

function TimelineRow({ milestone, index }) {
  return (
    <motion.article
      className="grid gap-3 border-t border-white/[0.06] py-7 first:border-t-0 first:pt-0 md:grid-cols-[100px_1fr]"
      initial={{ opacity: 0, y: 8 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: '-40px' }}
      transition={{ delay: index * 0.05, duration: DURATION.normal, ease: EASE }}
    >
      <div>
        <p className="font-mono text-sm text-foreground">{milestone.year}</p>
        <p className="mt-1 font-mono text-[10px] uppercase tracking-wider text-muted">
          {milestone.phase}
        </p>
      </div>
      <div>
        <h3 className="font-semibold text-foreground">{milestone.title}</h3>
        <p className="mt-2 max-w-lg text-sm leading-relaxed text-secondary">
          {milestone.description}
        </p>
      </div>
    </motion.article>
  );
}

export default function JourneyScene() {
  return (
    <SceneShell id={`scene-${SCENE_IDS.JOURNEY}`} sceneId={SCENE_IDS.JOURNEY}>
      <SceneHeader label="Background" title={journey.title} subtitle={journey.subtitle} />
      <div>
        {journey.milestones.map((milestone, i) => (
          <TimelineRow key={milestone.year} milestone={milestone} index={i} />
        ))}
      </div>
    </SceneShell>
  );
}
