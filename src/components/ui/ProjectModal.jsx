import { useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Button } from './Button';
import { HireOsDemo } from '../hire-os/HireOsDemo';
import { EASE, DURATION } from '../../constants/motion';
import { TAP } from '../../constants/microFeedback';
import { getProjectGithub, getProjectDemo } from '../../utils/links';

export function ProjectModal({ project, isOpen, onClose }) {
  useEffect(() => {
    if (!isOpen) return;
    const onKey = (e) => e.key === 'Escape' && onClose();
    document.body.style.overflow = 'hidden';
    window.addEventListener('keydown', onKey);
    return () => {
      document.body.style.overflow = '';
      window.removeEventListener('keydown', onKey);
    };
  }, [isOpen, onClose]);

  if (!project) return null;

  const githubUrl = getProjectGithub(project);
  const demoUrl = getProjectDemo(project);

  const sections = [
    { key: 'problem', label: 'Problem' },
    { key: 'solution', label: 'Solution' },
    { key: 'impact', label: 'Impact', gold: true },
  ];

  const title =
    project.id === 'hire-os' ? (
      <>
        <span className="text-gold">Hire</span>_OS
      </>
    ) : (
      project.name
    );

  return (
    <AnimatePresence>
      {isOpen && (
        <>
          <motion.div
            className="fixed inset-0 z-[100] bg-black/70"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: DURATION.fast }}
            onClick={onClose}
          />
          <motion.div
            role="dialog"
            aria-modal="true"
            aria-labelledby="project-modal-title"
            className="fixed inset-x-4 top-[6%] z-[101] mx-auto max-h-[90vh] max-w-2xl overflow-y-auto ui-surface md:inset-x-auto md:w-full"
            initial={{ opacity: 0, y: 12 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: 8 }}
            transition={{ duration: DURATION.normal, ease: EASE }}
          >
            <div className="border-b border-white/[0.06] px-6 py-4">
              <div className="flex items-start justify-between gap-4">
                <div>
                  <p className="font-mono text-[10px] uppercase tracking-wider text-muted">
                    Case study
                  </p>
                  <h2
                    id="project-modal-title"
                    className="mt-1 text-2xl font-semibold text-foreground"
                  >
                    {title}
                  </h2>
                  <p className="mt-1 text-sm text-secondary">{project.tagline}</p>
                </div>
                <motion.button
                  type="button"
                  onClick={onClose}
                  whileTap={TAP}
                  className="rounded px-1 text-muted transition-colors duration-150 hover:text-foreground"
                  aria-label="Close"
                >
                  ✕
                </motion.button>
              </div>
            </div>

            <div className="px-6 py-6">
              <div className="mb-6 flex flex-wrap gap-2">
                {project.stack.map((tech) => (
                  <span key={tech} className="font-mono text-[11px] text-muted">
                    {tech}
                  </span>
                ))}
              </div>

              <dl className="space-y-0">
                {sections.map(({ key, label, gold }) => (
                  <div
                    key={key}
                    className="grid gap-2 border-t border-white/[0.06] py-4 first:border-t-0 first:pt-0 md:grid-cols-[100px_1fr]"
                  >
                    <dt
                      className={`font-mono text-[10px] uppercase tracking-wider ${
                        gold ? 'text-gold' : 'text-muted'
                      }`}
                    >
                      {label}
                    </dt>
                    <dd className="text-sm leading-relaxed text-secondary">{project[key]}</dd>
                  </div>
                ))}
              </dl>

              {project.id === 'hire-os' && (
                <div className="mt-8">
                  <HireOsDemo embedded />
                </div>
              )}

              <div className="mt-8 flex flex-wrap gap-3 border-t border-white/[0.06] pt-6">
                {githubUrl && <Button href={githubUrl}>GitHub</Button>}
                {demoUrl && (
                  <Button variant="secondary" href={demoUrl}>
                    Live demo
                  </Button>
                )}
                <Button variant="ghost" onClick={onClose}>
                  Close
                </Button>
              </div>
            </div>
          </motion.div>
        </>
      )}
    </AnimatePresence>
  );
}
