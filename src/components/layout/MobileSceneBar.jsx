import { motion } from 'framer-motion';
import { useStory } from '../../context/StoryContext';
import { SCENE_LABELS } from '../../constants/scenes';
import { TAP } from '../../constants/microFeedback';

export function MobileSceneBar() {
  const { sceneOrder, currentScene, goToScene, sceneIndex, totalScenes } = useStory();

  return (
    <div className="fixed bottom-0 left-0 right-0 z-50 border-t border-white/[0.06] bg-void px-4 py-3 md:hidden">
      <div className="mb-2 flex justify-between font-mono text-[10px] uppercase tracking-wider text-muted">
        <span>{SCENE_LABELS[currentScene]}</span>
        <span>
          {sceneIndex + 1}/{totalScenes}
        </span>
      </div>
      <div className="flex gap-1">
        {sceneOrder.map((sceneId) => (
          <motion.button
            key={sceneId}
            type="button"
            onClick={() => goToScene(sceneId)}
            whileTap={TAP}
            className={`h-6 flex-1 rounded-sm transition-colors duration-150 ${
              currentScene === sceneId ? 'bg-[#10b981]/90' : 'bg-white/10 hover:bg-white/15'
            }`}
            aria-label={SCENE_LABELS[sceneId]}
          />
        ))}
      </div>
    </div>
  );
}
