import { useState } from 'react';
import { motion } from 'framer-motion';
import { SCENE_IDS } from '../constants/scenes';
import { SceneShell, SceneHeader } from '../components/ui/SceneShell';
import { Button } from '../components/ui/Button';
import { BulletList } from '../components/ui/KeywordHighlight';
import { ProjectModal } from '../components/ui/ProjectModal';
import { staggerContainer, staggerItem } from '../components/animations/motionPrimitives';
import { getProjectGithub } from '../utils/links';
import projectsData from '../data/projectsData.json';

const { projects } = projectsData;
const buildingProjects = projects.filter((p) => p.status === 'building');

const BULLET_LABELS = {
  problem: 'Problem',
  solution: 'Solution',
  impact: 'Impact',
};

function BuildingProjectSection({ project, onOpenModal }) {
  const githubUrl = getProjectGithub(project);

  return (
    <div className="mb-20 last:mb-0">
      <header className="max-w-2xl pb-6">
        <div className="mb-3 flex items-center gap-3">
          <div className="flex items-center gap-2 rounded-full border border-white/[0.08] bg-white/[0.02] px-2.5 py-1">
            <span className="relative flex h-2 w-2">
              <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-blue-400 opacity-75"></span>
              <span className="relative inline-flex h-2 w-2 rounded-full bg-blue-500"></span>
            </span>
            <span className="font-mono text-[10px] uppercase tracking-wider text-muted">
              {project.statusLabel || 'In Progress'}
            </span>
          </div>
        </div>

        <h3 className="text-3xl font-semibold tracking-[-0.02em] text-foreground md:text-4xl" style={{ color: project.accent || '#fff' }}>
          {project.name}
        </h3>
        
        <p className="mt-3 text-base text-secondary">{project.tagline}</p>

        {project.problem && project.solution && (
          <BulletList
            items={[
              { label: BULLET_LABELS.problem, text: project.problem },
              { label: BULLET_LABELS.solution, text: project.solution },
              ...(project.impact ? [{ label: BULLET_LABELS.impact, text: project.impact }] : []),
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
            Details
          </Button>
        </div>
      </header>

      <hr className="section-rule" />
    </div>
  );
}

export default function CurrentlyBuildingScene() {
  const [modalProject, setModalProject] = useState(null);

  if (buildingProjects.length === 0) return null;

  return (
    <SceneShell id={`scene-${SCENE_IDS.CURRENTLY_BUILDING}`} sceneId={SCENE_IDS.CURRENTLY_BUILDING} wide>
      <SceneHeader
        label="Lab"
        title="Currently Building"
        subtitle="What I'm working on right now."
      />

      <motion.div
        variants={staggerContainer}
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true, amount: 0.1, margin: '-60px' }}
      >
        {buildingProjects.map((project) => (
          <motion.div key={project.id} variants={staggerItem}>
            <BuildingProjectSection project={project} onOpenModal={setModalProject} />
          </motion.div>
        ))}
      </motion.div>

      <ProjectModal
        project={modalProject}
        isOpen={!!modalProject}
        onClose={() => setModalProject(null)}
      />
    </SceneShell>
  );
}
