import { useEffect, useState } from 'react';
import { motion, useMotionValue, useSpring } from 'framer-motion';
import { usePrefersReducedMotion } from '../../hooks/usePrefersReducedMotion';

/** Subtle desktop cursor follow — very low opacity */
export function CursorGlow() {
  const reduced = usePrefersReducedMotion();
  const [enabled, setEnabled] = useState(false);
  const x = useMotionValue(0);
  const y = useMotionValue(0);
  const smoothX = useSpring(x, { stiffness: 120, damping: 28 });
  const smoothY = useSpring(y, { stiffness: 120, damping: 28 });

  useEffect(() => {
    const fine = window.matchMedia('(pointer: fine)').matches;
    setEnabled(fine && !reduced);

    if (!fine || reduced) return;

    const onMove = (e) => {
      x.set(e.clientX);
      y.set(e.clientY);
    };

    window.addEventListener('mousemove', onMove, { passive: true });
    return () => window.removeEventListener('mousemove', onMove);
  }, [reduced, x, y]);

  if (!enabled) return null;

  return (
    <motion.div
      className="pointer-events-none fixed z-[1] h-64 w-64 -translate-x-1/2 -translate-y-1/2 rounded-full"
      style={{
        left: smoothX,
        top: smoothY,
        background: 'radial-gradient(circle, rgba(16, 185, 129, 0.035) 0%, transparent 70%)',
      }}
      aria-hidden
    />
  );
}
