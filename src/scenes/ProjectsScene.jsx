import { useState } from 'react';
import { motion } from 'framer-motion';
import { SCENE_IDS } from '../constants/scenes';
import { SceneShell, SceneHeader } from '../components/ui/SceneShell';
import { Button } from '../components/ui/Button';
import { BulletList } from '../components/ui/KeywordHighlight';
import { ProjectModal } from '../components/ui/ProjectModal';
import { HireOsDemo } from '../components/hire-os/HireOsDemo';
import { staggerContainer, staggerItem } from '../components/animations/motionPrimitives';
import { getProjectGithub } from '../utils/links';
import projectsData from '../data/projectsData.json';

const { projects } = projectsData;

const BULLET_LABELS = {
  problem: 'Problem',
  feature: 'Feature',
  impact: 'Impact',
};

function HireOsProductSection({ project, onOpenModal }) {
  const bullets = project.recruiterBullets;
  const githubUrl = getProjectGithub(project);

  return (
    <div>
      <header className="max-w-2xl pb-10">
        <p className="mb-2 font-mono text-[11px] uppercase tracking-[0.12em] text-muted">
          Flagship product
        </p>
        <h3 className="text-3xl font-semibold tracking-[-0.02em] text-foreground md:text-4xl">
          <span className="text-gold">Hire</span>_OS
        </h3>
        <p className="mt-3 text-base text-secondary">{project.tagline}</p>

        {bullets && (
          <BulletList
            items={[
              { label: BULLET_LABELS.problem, text: bullets.problem },
              { label: BULLET_LABELS.feature, text: bullets.feature },
              { label: BULLET_LABELS.impact, text: bullets.impact },
            ]}
            className="mt-8"
          />
        )}

        <div className="mt-8 flex flex-wrap gap-x-4 gap-y-1">
          {project.stack.map((tech) => (
            <span key={tech} className="font-mono text-[11px] text-muted">
              {tech}
            </span>
          ))}
        </div>

        <div className="mt-8 flex flex-wrap gap-3">
          {githubUrl && <Button href={githubUrl}>GitHub</Button>}
          <Button variant="ghost" onClick={() => onOpenModal(project)}>
            Case study
          </Button>
        </div>
      </header>

      <hr className="section-rule" />

      <div className="pt-10">
        <HireOsDemo embedded />
      </div>
    </div>
  );
}

function ProjectRow({ project }) {
  const bullets = project.recruiterBullets;
  const githubUrl = getProjectGithub(project);

  return (
    <motion.div
      variants={staggerItem}
      className="border-t border-white/[0.06] py-8 first:border-t-0 first:pt-0"
    >
      <div className="grid gap-4 md:grid-cols-[200px_1fr_auto] md:items-start md:gap-8">
        <div>
          <h3 className="font-semibold text-foreground">{project.name}</h3>
          <p className="mt-1 text-sm text-secondary">{project.tagline}</p>
        </div>
        {bullets && (
          <p className="text-sm text-secondary">
            <span className="font-medium text-gold">Impact · </span>
            {bullets.impact}
          </p>
        )}
        <div className="md:text-right">
          {githubUrl && (
            <Button variant="secondary" size="sm" href={githubUrl}>
              GitHub
            </Button>
          )}
        </div>
      </div>
    </motion.div>
  );
}

export default function ProjectsScene() {
  const [modalProject, setModalProject] = useState(null);
  const featured = projects.find((p) => p.featured);
  const others = projects.filter((p) => !p.featured);

  return (
    <SceneShell id={`scene-${SCENE_IDS.PROJECTS}`} sceneId={SCENE_IDS.PROJECTS} wide>
      <SceneHeader
        label="Work"
        title="Products"
        subtitle="Shipped software with measurable outcomes."
      />

      <motion.div
        variants={staggerContainer}
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true, amount: 0.15, margin: '-60px' }}
      >
        {featured && (
          <motion.div variants={staggerItem}>
            <HireOsProductSection project={featured} onOpenModal={setModalProject} />
          </motion.div>
        )}

        {others.length > 0 && (
          <div className="mt-20">
            <p className="mb-6 font-mono text-[11px] uppercase tracking-[0.12em] text-muted">
              Other projects
            </p>
            {others.map((project) => (
              <ProjectRow key={project.id} project={project} />
            ))}
          </div>
        )}
      </motion.div>

      <ProjectModal
        project={modalProject}
        isOpen={!!modalProject}
        onClose={() => setModalProject(null)}
      />
    </SceneShell>
  );
}
