import { motion } from 'framer-motion';
import { getLinkTargetProps, isExternalHref } from '../../utils/links';
import { TAP } from '../../constants/microFeedback';

/**
 * Text-style link with animated underline + optional external icon shift.
 */
export function ExternalLink({
  href,
  children,
  className = '',
  showIcon = true,
  ...props
}) {
  if (!href) return null;

  const external = isExternalHref(href);

  return (
    <motion.a
      href={href}
      className={`group link-underline inline-flex items-center gap-1.5 text-secondary transition-opacity duration-150 hover:text-foreground hover:opacity-100 ${className}`}
      whileTap={TAP}
      {...getLinkTargetProps(href)}
      {...props}
    >
      {children}
      {showIcon && external && (
        <span
          className="link-external-icon text-[0.85em] opacity-60 transition-transform duration-200 ease-[cubic-bezier(0.22,1,0.36,1)] group-hover:translate-x-1 group-hover:opacity-100"
          aria-hidden
        >
          ↗
        </span>
      )}
    </motion.a>
  );
}
