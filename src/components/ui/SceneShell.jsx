import { forwardRef, useRef, useState, useEffect } from 'react';
import { motion, useScroll, useTransform } from 'framer-motion';
import { SCENE_SCROLL_VARIANTS, VIEWPORT_SCENE } from '../../constants/motion';
import { staggerContainer, staggerItem } from '../animations/motionPrimitives';
import { usePrefersReducedMotion } from '../../hooks/usePrefersReducedMotion';

export const SceneShell = forwardRef(function SceneShell(
  { id, sceneId, children, className = '', wide = false },
  ref,
) {
  const sectionRef = useRef(null);
  const reducedMotion = usePrefersReducedMotion();
  const [phase, setPhase] = useState(reducedMotion ? 'visible' : 'hidden');
  const hasEnteredRef = useRef(false);

  useEffect(() => {
    if (reducedMotion) setPhase('visible');
  }, [reducedMotion]);

  const { scrollYProgress } = useScroll({
    target: sectionRef,
    offset: ['start end', 'end start'],
  });

  const bgY = useTransform(scrollYProgress, [0, 1], [24, -50]);
  const contentY = useTransform(scrollYProgress, [0, 1], [12, -20]);

  const setRefs = (node) => {
    sectionRef.current = node;
    if (typeof ref === 'function') ref(node);
    else if (ref) ref.current = node;
  };

  return (
    <motion.section
      ref={setRefs}
      id={id}
      data-scene={sceneId}
      className={`relative min-h-screen w-full border-b border-white/[0.04] ${className}`}
      variants={SCENE_SCROLL_VARIANTS}
      initial={reducedMotion ? 'visible' : 'hidden'}
      animate={phase}
      onViewportEnter={() => {
        hasEnteredRef.current = true;
        setPhase('visible');
      }}
      viewport={VIEWPORT_SCENE}
    >
      {!reducedMotion && (
        <motion.div
          className="pointer-events-none absolute inset-0 z-0 opacity-40"
          style={{ y: bgY }}
          aria-hidden
        >
          <div className="absolute inset-x-0 top-1/4 h-px bg-white/[0.03]" />
        </motion.div>
      )}

      <motion.div
        className={`relative z-10 py-24 md:py-32 ${
          wide ? 'px-4 md:px-8 lg:px-12' : 'px-6 md:pl-14 md:pr-10 lg:pl-20'
        }`}
        style={reducedMotion ? undefined : { y: contentY }}
      >
        <div className={wide ? 'mx-auto max-w-[1200px]' : 'max-w-[720px]'}>{children}</div>
      </motion.div>
    </motion.section>
  );
});

export function SceneHeader({ label, title, subtitle, meta }) {
  return (
    <motion.header
      className="mb-14 md:mb-20"
      variants={staggerContainer}
      initial="hidden"
      whileInView="visible"
      viewport={{ once: true, amount: 0.3 }}
    >
      {label && (
        <motion.p
          variants={staggerItem}
          className="mb-3 font-mono text-[11px] uppercase tracking-[0.14em] text-muted"
        >
          {label}
        </motion.p>
      )}
      <motion.h2
        variants={staggerItem}
        className="text-3xl font-semibold tracking-[-0.02em] text-foreground md:text-4xl"
      >
        {title}
      </motion.h2>
      {subtitle && (
        <motion.p
          variants={staggerItem}
          className="mt-4 max-w-lg text-base leading-relaxed text-secondary"
        >
          {subtitle}
        </motion.p>
      )}
      {meta && (
        <motion.p variants={staggerItem} className="mt-2 font-mono text-xs text-muted">
          {meta}
        </motion.p>
      )}
    </motion.header>
  );
}
