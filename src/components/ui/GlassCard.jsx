import { motion } from 'framer-motion';
import { HOVER_CARD, TAP_SOFT } from '../../constants/microFeedback';

/** Structured panel with subtle hover depth */
export function GlassCard({ children, className = '', hover = false, onClick, ...props }) {
  const interactive = hover || onClick;

  return (
    <motion.div
      role={onClick ? 'button' : undefined}
      tabIndex={onClick ? 0 : undefined}
      onClick={onClick}
      onKeyDown={
        onClick
          ? (e) => {
              if (e.key === 'Enter' || e.key === ' ') {
                e.preventDefault();
                onClick(e);
              }
            }
          : undefined
      }
      className={`ui-surface p-5 md:p-6 ${interactive ? 'card-hover-depth cursor-pointer' : ''} ${className}`}
      whileHover={interactive ? HOVER_CARD : undefined}
      whileTap={interactive ? TAP_SOFT : undefined}
      {...props}
    >
      {children}
    </motion.div>
  );
}
