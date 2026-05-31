import { motion } from 'framer-motion';
import { STAGGER, TRANSITION, SCENE_SCROLL_VARIANTS } from '../../constants/motion';

export const staggerContainer = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: {
      staggerChildren: STAGGER.normal,
      delayChildren: STAGGER.tight,
    },
  },
};

export const staggerItem = {
  hidden: { opacity: 0, y: 12, filter: 'blur(6px)' },
  visible: {
    opacity: 1,
    y: 0,
    filter: 'blur(0px)',
    transition: TRANSITION,
  },
};

export const sceneEnter = SCENE_SCROLL_VARIANTS;

export function GlowOrb() {
  return null;
}

/** Optional line-by-line reveal for headings */
export function StaggerLines({ lines, className = '' }) {
  return (
    <motion.div
      className={className}
      variants={staggerContainer}
      initial="hidden"
      whileInView="visible"
      viewport={{ once: true, margin: '-40px' }}
    >
      {lines.map((line) => (
        <motion.p key={line} variants={staggerItem} className="overflow-hidden">
          {line}
        </motion.p>
      ))}
    </motion.div>
  );
}
