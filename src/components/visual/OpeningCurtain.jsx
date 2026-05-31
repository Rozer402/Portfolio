import { motion } from 'framer-motion';
import { EASE, DURATION } from '../../constants/motion';

/**
 * Full-screen horizontal reveal on first load.
 * Panel slides off to the right; unmounts when complete.
 */
export function OpeningCurtain({ onComplete }) {
  return (
    <div
      className="fixed inset-0 z-[200] overflow-hidden"
      aria-hidden
      role="presentation"
    >
      <motion.div
        className="absolute inset-0 will-change-transform"
        initial={{ x: 0 }}
        animate={{ x: '100%' }}
        transition={{ duration: DURATION.curtain, ease: EASE }}
        onAnimationComplete={onComplete}
      >
        {/* Main panel */}
        <div
          className="absolute inset-0 bg-void"
          style={{
            boxShadow:
              '24px 0 48px -12px rgba(0, 0, 0, 0.55), inset -1px 0 0 rgba(255, 255, 255, 0.04)',
          }}
        />

        {/* Blur trail (leading edge) */}
        <div
          className="pointer-events-none absolute left-0 top-0 h-full w-16"
          style={{
            background:
              'linear-gradient(90deg, transparent, rgba(11, 15, 12, 0.85))',
            filter: 'blur(12px)',
            transform: 'translateX(-40%)',
          }}
        />

        {/* Thin vertical light edge */}
        <div
          className="pointer-events-none absolute right-0 top-0 h-full w-px"
          style={{
            background:
              'linear-gradient(180deg, transparent 0%, rgba(255,255,255,0.22) 50%, transparent 100%)',
            boxShadow: '0 0 12px rgba(255, 255, 255, 0.08)',
          }}
        />
      </motion.div>
    </div>
  );
}
