import { useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Button } from './Button';
import { HireOsDemo } from '../hire-os/HireOsDemo';
import { ArgusDemo } from '../argus/ArgusDemo';
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
      <><span className="text-gold">Hire</span>_OS</>
    ) : project.id === 'argus' ? (
      <span className="text-emerald">Argus</span>
    ) : (
      project.name
    );

  return (
    <AnimatePresence>
      {isOpen && (
        <>
          {/* Backdrop */}
          <motion.div
            className="fixed inset-0 z-[100] bg-black/75 backdrop-blur-sm"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: DURATION.fast }}
            onClick={onClose}
          />

          {/* Modal — centered, never goes above viewport top */}
          <div className="fixed inset-0 z-[101] flex items-center justify-center p-4 sm:p-6">
            <motion.div
              role="dialog"
              aria-modal="true"
              aria-labelledby="project-modal-title"
              className="relative w-full max-w-2xl max-h-[85dvh] overflow-y-auto ui-surface rounded-xl"
              initial={{ opacity: 0, y: 16, scale: 0.98 }}
              animate={{ opacity: 1, y: 0, scale: 1 }}
              exit={{ opacity: 0, y: 10, scale: 0.98 }}
              transition={{ duration: DURATION.normal, ease: EASE }}
              onClick={(e) => e.stopPropagation()}
            >
              {/* Header */}
              <div className="sticky top-0 z-10 border-b border-white/[0.06] bg-[#111714] px-5 py-4 sm:px-6">
                <div className="flex items-start justify-between gap-4">
                  <div>
                    <p className="font-mono text-[10px] uppercase tracking-wider text-muted">
                      Case study
                    </p>
                    <h2
                      id="project-modal-title"
                      className="mt-1 text-xl font-semibold text-foreground sm:text-2xl"
                    >
                      {title}
                    </h2>
                    <p className="mt-1 text-sm text-secondary">{project.tagline}</p>
                  </div>
                  <motion.button
                    type="button"
                    onClick={onClose}
                    whileTap={TAP}
                    className="shrink-0 rounded p-1.5 text-muted transition-colors hover:bg-white/[0.06] hover:text-foreground"
                    aria-label="Close"
                  >
                    ✕
                  </motion.button>
                </div>
              </div>

              {/* Body */}
              <div className="px-5 py-5 sm:px-6 sm:py-6">
                {/* Stack tags */}
                <div className="mb-6 flex flex-wrap gap-x-4 gap-y-1">
                  {project.stack.map((tech) => (
                    <span key={tech} className="font-mono text-[11px] text-muted">
                      {tech}
                    </span>
                  ))}
                </div>

                {/* Problem / Solution / Impact */}
                <dl className="space-y-0">
                  {sections.map(({ key, label, gold }) => (
                    <div
                      key={key}
                      className="grid gap-2 border-t border-white/[0.06] py-4 first:border-t-0 first:pt-0 sm:grid-cols-[100px_1fr]"
                    >
                      <dt className={`font-mono text-[10px] uppercase tracking-wider ${gold ? 'text-gold' : 'text-muted'}`}>
                        {label}
                      </dt>
                      <dd className="text-sm leading-relaxed text-secondary">{project[key]}</dd>
                    </div>
                  ))}
                </dl>

                {/* Highlights list */}
                {project.highlights && (
                  <ul className="mt-6 space-y-2 border-t border-white/[0.06] pt-6">
                    {project.highlights.map((h) => (
                      <li key={h} className="flex gap-3 text-sm text-secondary">
                        <span className="mt-0.5 shrink-0 text-emerald">→</span>
                        {h}
                      </li>
                    ))}
                  </ul>
                )}

                {/* Inline demos */}
                {project.id === 'hire-os' && (
                  <div className="mt-8">
                    <HireOsDemo embedded />
                  </div>
                )}
                {project.id === 'argus' && (
                  <div className="mt-8">
                    <ArgusDemo embedded />
                  </div>
                )}

                {/* Footer actions */}
                <div className="mt-8 flex flex-wrap gap-3 border-t border-white/[0.06] pt-6">
                  {githubUrl && <Button href={githubUrl}>GitHub</Button>}
                  {project.id === 'argus' && project.links?.marketplace && (
                    <Button variant="secondary" href={project.links.marketplace}>
                      Marketplace ↗
                    </Button>
                  )}
                  {demoUrl && <Button variant="secondary" href={demoUrl}>Live demo</Button>}
                  <Button variant="ghost" onClick={onClose}>Close</Button>
                </div>
              </div>
            </motion.div>
          </div>
        </>
      )}
    </AnimatePresence>
  );
}
