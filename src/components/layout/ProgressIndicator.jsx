import { useEffect } from 'react';
import { motion, useMotionValue, useSpring, useTransform } from 'framer-motion';
import { useStory } from '../../context/StoryContext';

export function ProgressIndicator() {
  const { scrollProgress } = useStory();
  const progress = useMotionValue(0);
  const smooth = useSpring(progress, { stiffness: 100, damping: 30 });
  const width = useTransform(smooth, (v) => `${v * 100}%`);

  useEffect(() => {
    progress.set(scrollProgress);
  }, [scrollProgress, progress]);

  return (
    <div className="fixed top-0 left-0 right-0 z-50 h-px bg-white/[0.06] md:left-12">
      <motion.div className="h-full bg-[#10b981]" style={{ width }} />
    </div>
  );
}
