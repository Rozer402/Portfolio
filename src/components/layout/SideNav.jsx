import { motion } from 'framer-motion';
import { useStory } from '../../context/StoryContext';
import { SCENE_LABELS } from '../../constants/scenes';
import { TAP } from '../../constants/microFeedback';

export function SideNav() {
  const { sceneOrder, currentScene, goToScene } = useStory();

  return (
    <nav
      className="fixed left-0 top-0 z-50 hidden h-full w-12 flex-col border-r border-white/[0.06] bg-void md:flex"
      aria-label="Section navigation"
    >
      <div className="flex flex-1 flex-col justify-center gap-1 px-2">
        {sceneOrder.map((sceneId) => {
          const isActive = currentScene === sceneId;
          return (
            <motion.button
              key={sceneId}
              type="button"
              onClick={() => goToScene(sceneId)}
              whileTap={TAP}
              className={`group relative py-2 text-center font-mono text-[9px] uppercase tracking-wider transition-colors duration-150 ${
                isActive ? 'text-[#10b981]' : 'text-muted hover:text-secondary'
              }`}
              aria-label={`Go to ${SCENE_LABELS[sceneId]}`}
              aria-current={isActive ? 'true' : undefined}
              title={SCENE_LABELS[sceneId]}
            >
              <span
                className={`mx-auto mb-1 block h-px w-3 transition-all duration-200 ${
                  isActive ? 'bg-[#10b981] w-4' : 'bg-white/15 group-hover:bg-white/25 group-hover:w-4'
                }`}
              />
              {SCENE_LABELS[sceneId].slice(0, 3)}
            </motion.button>
          );
        })}
      </div>
    </nav>
  );
}
