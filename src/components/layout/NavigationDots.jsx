import { motion } from 'framer-motion';
import { useStory } from '../../context/StoryContext';
import { SCENE_LABELS } from '../../constants/scenes';
import { EASE } from '../../constants/motion';

export function NavigationDots() {
  const { sceneOrder, currentScene, goToScene } = useStory();

  return (
    <nav
      className="fixed right-5 top-1/2 z-50 hidden -translate-y-1/2 md:block"
      aria-label="Scene navigation"
    >
      <div className="glass rounded-full px-2 py-3">
        {sceneOrder.map((sceneId) => {
          const isActive = currentScene === sceneId;
          return (
            <button
              key={sceneId}
              type="button"
              onClick={() => goToScene(sceneId)}
              className="group relative flex items-center justify-end py-1.5 pl-3 pr-2"
              aria-label={`Go to ${SCENE_LABELS[sceneId]}`}
              aria-current={isActive ? 'true' : undefined}
            >
              <span
                className={`pointer-events-none absolute right-full mr-3 whitespace-nowrap font-mono text-[10px] uppercase tracking-wider opacity-0 transition-opacity duration-500 group-hover:opacity-100 ${
                  isActive ? 'text-[#34d399]' : 'text-muted'
                }`}
              >
                {SCENE_LABELS[sceneId]}
              </span>
              <motion.span
                className={`block rounded-full ${isActive ? 'h-2 w-2 bg-[#10b981]' : 'h-1.5 w-1.5 bg-white/20 group-hover:bg-white/35'}`}
                layout
                transition={{ duration: 0.5, ease: EASE }}
              />
            </button>
          );
        })}
      </div>
    </nav>
  );
}
