import { motion } from 'framer-motion';
import { SCENE_IDS } from '../constants/scenes';
import { SceneShell } from '../components/ui/SceneShell';
import { Button } from '../components/ui/Button';
import { ExternalLink } from '../components/ui/ExternalLink';
import { staggerContainer, staggerItem } from '../components/animations/motionPrimitives';
import { getProfileLinks, getContactNavLinks } from '../utils/links';
import storyData from '../data/storyData.json';

const { developer, finale } = storyData;
const profileLinks = getProfileLinks();
const contactLinks = getContactNavLinks();

export default function FinaleScene() {
  return (
    <SceneShell id={`scene-${SCENE_IDS.FINALE}`} sceneId={SCENE_IDS.FINALE}>
      <motion.div variants={staggerContainer} initial="hidden" whileInView="visible" viewport={{ once: false, amount: 0.3 }}>
        <motion.p variants={staggerItem} className="mb-3 font-mono text-[11px] uppercase tracking-[0.12em] text-muted">
          Contact
        </motion.p>
        <motion.h2
          variants={staggerItem}
          className="max-w-lg text-3xl font-semibold tracking-[-0.02em] text-foreground md:text-4xl"
        >
          {finale.headline}
        </motion.h2>
        <motion.p variants={staggerItem} className="mt-4 max-w-md text-base leading-relaxed text-secondary">
          {finale.subtext}
        </motion.p>

        <motion.div variants={staggerItem} className="mt-8 flex flex-wrap gap-3">
          <Button size="lg" href={profileLinks.email} external={false}>
            {finale.cta}
          </Button>
          <Button size="lg" variant="secondary" href={profileLinks.github}>
            {finale.secondaryCta}
          </Button>
        </motion.div>

        <motion.ul variants={staggerItem} className="mt-14 space-y-0 border-t border-white/[0.06]">
          {contactLinks.map((link) => (
            <li key={link.label} className="border-b border-white/[0.06]">
              <ExternalLink
                href={link.href}
                className="flex w-full items-center justify-between py-4 text-sm text-secondary hover:text-foreground"
                showIcon={link.label !== 'Email'}
              >
                <span className="font-mono text-[11px] uppercase tracking-wider text-muted">
                  {link.label}
                </span>
                <span>Open</span>
              </ExternalLink>
            </li>
          ))}
        </motion.ul>

        <motion.footer variants={staggerItem} className="mt-16 font-mono text-[11px] text-muted">
          © {new Date().getFullYear()} {developer.name}
        </motion.footer>
      </motion.div>
    </SceneShell>
  );
}
