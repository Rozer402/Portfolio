import { useRef } from 'react';
import { motion, useScroll, useTransform } from 'framer-motion';

export function Parallax({
  children,
  className = '',
  offset = 22,
  direction = 'up',
}) {
  const ref = useRef(null);
  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ['start end', 'end start'],
  });

  const y = useTransform(
    scrollYProgress,
    [0, 1],
    direction === 'up' ? [offset * 0.5, -offset * 0.5] : [-offset * 0.5, offset * 0.5],
  );

  return (
    <motion.div ref={ref} style={{ y }} className={className}>
      {children}
    </motion.div>
  );
}
