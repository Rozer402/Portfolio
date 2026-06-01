import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { SCENE_IDS } from '../constants/scenes';
import { SceneShell, SceneHeader } from '../components/ui/SceneShell';
import { EASE, DURATION } from '../constants/motion';
import skillsData from '../data/skillsData.json';

const { categories } = skillsData;

function SkillRow({ name, level }) {
  return (
    <div className="border-t border-white/[0.06] py-3 first:border-t-0 first:pt-0">
      <div className="mb-1.5 flex justify-between text-sm">
        <span className="text-foreground">{name}</span>
        <span className="font-mono text-[10px] text-muted">{level}</span>
      </div>
      <div className="h-px bg-white/[0.08]">
        <motion.div
          className="h-px bg-[#10b981]"
          initial={{ width: 0 }}
          whileInView={{ width: `${level}%` }}
          viewport={{ once: true }}
          transition={{ duration: 0.45, ease: EASE }}
        />
      </div>
    </div>
  );
}

export default function SkillsScene() {
  const [activeId, setActiveId] = useState(categories[0].id);
  const active = categories.find((c) => c.id === activeId) ?? categories[0];

  return (
    <SceneShell id={`scene-${SCENE_IDS.SKILLS}`} sceneId={SCENE_IDS.SKILLS} wide>
      <SceneHeader
        label="Stack"
        title="Tools"
        subtitle="What I use to build and ship."
      />

      <div className="ui-app">
        <div className="flex flex-col border-b border-white/[0.06] md:flex-row">
          <nav
            className="flex shrink-0 gap-0 overflow-x-auto border-b border-white/[0.06] md:w-52 md:flex-col md:border-b-0 md:border-r"
            aria-label="Skill categories"
          >
            {categories.map((cat) => {
              const isActive = activeId === cat.id;
              return (
                <button
                  key={cat.id}
                  type="button"
                  onClick={() => setActiveId(cat.id)}
                  className={`border-b border-white/[0.06] px-4 py-3 text-left text-sm transition-colors md:border-b-0 md:border-l-2 md:border-l-transparent ${
                    isActive
                      ? 'bg-panel text-foreground md:border-l-[#10b981]'
                      : 'text-secondary hover:text-foreground'
                  }`}
                >
                  {cat.label}
                </button>
              );
            })}
          </nav>

          <div className="min-h-[280px] flex-1 p-5 md:p-6">
            <AnimatePresence mode="wait">
              <motion.div
                key={active.id}
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                transition={{ duration: DURATION.fast }}
              >
                <p className="mb-4 font-mono text-[11px] uppercase tracking-wider text-muted">
                  {active.label}
                </p>
                {active.skills.map((skill) => (
                  <SkillRow key={skill.name} name={skill.name} level={skill.level} />
                ))}
              </motion.div>
            </AnimatePresence>
          </div>
        </div>
      </div>
    </SceneShell>
  );
}
