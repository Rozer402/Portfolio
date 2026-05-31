import { motion } from 'framer-motion';
import { getLinkTargetProps, isExternalHref } from '../../utils/links';
import { HOVER_BUTTON, TAP } from '../../constants/microFeedback';

const variants = {
  primary: 'btn-primary btn-pressable',
  secondary: 'btn-secondary btn-pressable',
  ghost: 'btn-ghost btn-pressable',
};

const sizes = {
  default: 'px-4 py-2.5 text-sm',
  lg: 'px-5 py-3 text-sm',
  sm: 'px-3 py-1.5 text-xs',
};

const base =
  'inline-flex items-center justify-center gap-1.5 font-medium focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[rgba(16,185,129,0.35)]';

const motionProps = {
  whileHover: HOVER_BUTTON,
  whileTap: { ...TAP, y: 1 },
};

export function Button({
  children,
  variant = 'primary',
  className = '',
  onClick,
  href,
  size = 'default',
  disabled,
  loading = false,
  external: externalProp,
  ...props
}) {
  const classes = `${base} ${sizes[size]} ${variants[variant]} ${className}`;

  if (href) {
    const external = externalProp ?? isExternalHref(href);
    return (
      <motion.a
        href={href}
        className={`${classes} ${external ? 'link-external' : ''}`}
        {...motionProps}
        {...getLinkTargetProps(href)}
        {...props}
      >
        {children}
        {external && (
          <motion.span
            className="text-[0.8em] opacity-70"
            aria-hidden
            initial={false}
            whileHover={{ x: 4 }}
            transition={HOVER_BUTTON.transition}
          >
            ↗
          </motion.span>
        )}
      </motion.a>
    );
  }

  return (
    <motion.button
      type="button"
      onClick={onClick}
      disabled={disabled || loading}
      className={classes}
      whileHover={disabled || loading ? undefined : HOVER_BUTTON}
      whileTap={disabled || loading ? undefined : { ...TAP, y: 1 }}
      animate={loading ? { opacity: [1, 0.75, 1] } : { opacity: 1 }}
      transition={
        loading
          ? { opacity: { duration: 1.1, repeat: Infinity, ease: 'easeInOut' } }
          : TAP.transition
      }
      {...props}
    >
      {children}
    </motion.button>
  );
}
