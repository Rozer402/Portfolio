import { memo, useCallback, useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import {
  analyzeCandidate,
  getAnalysisDelay,
  SAMPLE_RESUME,
} from '../../utils/hireOsAnalyzer';
import { EASE, DURATION, STAGGER, GLIDE_IN } from '../../constants/motion';
import { PROGRESS_FILL, HOVER_BUTTON, TAP, LOADING_PULSE } from '../../constants/microFeedback';

const resultStagger = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: { staggerChildren: STAGGER.normal, delayChildren: STAGGER.tight },
  },
};

function AnalyzeButton({ onClick, disabled, loading }) {
  return (
    <motion.button
      type="button"
      onClick={onClick}
      disabled={disabled || loading}
      className="btn-primary btn-pressable shrink-0 px-5 py-2.5 text-sm font-medium"
      whileHover={disabled || loading ? undefined : HOVER_BUTTON}
      whileTap={disabled || loading ? undefined : { ...TAP, y: 1 }}
      animate={loading ? LOADING_PULSE : { opacity: 1 }}
    >
      {loading ? (
        <span className="flex items-center gap-2">
          <Spinner />
          Analyzing…
        </span>
      ) : (
        'Run screening'
      )}
    </motion.button>
  );
}

function Spinner() {
  return (
    <span
      className="inline-block h-3.5 w-3.5 animate-spin rounded-full border-2 border-white/20 border-t-white/80"
      aria-hidden
    />
  );
}

function ActionStatus({ loading, loadingStep, hasInput, hasResult }) {
  let text = 'Awaiting candidate profile';
  let tone = 'text-muted';

  if (loading) {
    if (loadingStep === 0) text = 'Parsing input…';
    else if (loadingStep === 1) text = 'Extracting skills…';
    else if (loadingStep === 2) text = 'Matching patterns…';
    tone = 'text-secondary';
  } else if (hasResult) {
    text = 'Screening complete';
    tone = 'text-secondary';
  } else if (hasInput) {
    text = 'Ready to analyze';
    tone = 'text-secondary';
  }

  return (
    <p className={`font-mono text-[11px] tracking-wide ${tone}`}>
      {loading && (
        <span className="mr-2 inline-block h-1.5 w-1.5 animate-pulse rounded-full bg-[#10b981]" />
      )}
      {text}
    </p>
  );
}

const ScoreCard = memo(function ScoreCard({ score, label }) {
  return (
    <motion.div
      variants={GLIDE_IN}
      className="hire-os-inset rounded-lg p-5"
    >
      <div className="flex items-start justify-between gap-4">
        <div>
          <p className="font-mono text-[10px] uppercase tracking-[0.14em] text-muted">
            Hire score
          </p>
          <p className="mt-2 text-4xl font-semibold tabular-nums tracking-tight text-foreground">
            {score}
            <span className="text-2xl text-secondary">%</span>
          </p>
        </div>
        <div
          className={`rounded-md border border-white/[0.06] px-2.5 py-1 font-mono text-[10px] uppercase tracking-wider ${
            label === 'STRONG'
              ? 'text-foreground'
              : label === 'GOOD'
                ? 'text-secondary'
                : 'text-muted'
          }`}
        >
          {label}
        </div>
      </div>
      <div className="mt-5 h-1.5 overflow-hidden rounded-full bg-[#0b0f0c]">
        <motion.div
          className="h-full rounded-full bg-[#10b981]"
          initial={{ width: 0 }}
          animate={{ width: `${score}%` }}
          transition={PROGRESS_FILL}
        />
      </div>
    </motion.div>
  );
});

function InsightBlock({ title, items, accent }) {
  const borderAccent =
    accent === 'strength'
      ? 'border-l-[#10b981]'
      : accent === 'weakness'
        ? 'border-l-[#f59e0b]'
        : 'border-l-white/20';

  return (
    <motion.div variants={GLIDE_IN} className={`hire-os-inset rounded-lg border-l-2 ${borderAccent} p-4`}>
      <h4 className="mb-3 font-mono text-[10px] uppercase tracking-[0.14em] text-muted">
        {title}
      </h4>
      <ul className="space-y-2">
        {items.map((item) => (
          <li key={item} className="text-sm leading-relaxed text-secondary">
            {item}
          </li>
        ))}
      </ul>
    </motion.div>
  );
}

function SuggestionsBlock({ items }) {
  return (
    <motion.div variants={GLIDE_IN} className="hire-os-inset rounded-lg p-4">
      <h4 className="mb-3 font-mono text-[10px] uppercase tracking-[0.14em] text-muted">
        System suggestions
      </h4>
      <ul className="space-y-2 font-mono text-[13px] leading-relaxed">
        {items.map((item) => (
          <li key={item} className="flex gap-2 text-secondary">
            <span className="shrink-0 text-muted" aria-hidden>
              →
            </span>
            <span>{item}</span>
          </li>
        ))}
      </ul>
    </motion.div>
  );
}

const AnalysisResults = memo(function AnalysisResults({ result }) {
  if (!result) return null;

  return (
    <motion.div
      className="space-y-4"
      variants={resultStagger}
      initial="hidden"
      animate="visible"
    >
      <ScoreCard score={result.score} label={result.label} />
      <div className="grid gap-4 md:grid-cols-2">
        <InsightBlock title="Strengths" items={result.strengths} accent="strength" />
        <InsightBlock title="Weaknesses" items={result.weaknesses} accent="weakness" />
      </div>
      <SuggestionsBlock items={result.suggestions} />
      <p className="pt-1 font-mono text-[10px] text-muted">Simulated output · Hire_OS preview</p>
    </motion.div>
  );
});

export function HireOsDemo({ embedded = false }) {
  const [input, setInput] = useState('');
  const [loading, setLoading] = useState(false);
  const [loadingStep, setLoadingStep] = useState(0);
  const [result, setResult] = useState(null);

  const hasInput = input.trim().length > 0;

  const runAnalysis = useCallback(() => {
    if (loading || !hasInput) return;
    setLoading(true);
    setResult(null);
    setLoadingStep(0);
    
    setTimeout(() => setLoadingStep(1), 250);
    setTimeout(() => setLoadingStep(2), 500);

    window.setTimeout(() => {
      setResult(analyzeCandidate(input.trim()));
      setLoading(false);
    }, getAnalysisDelay());
  }, [input, loading, hasInput]);

  const loadSample = useCallback(() => {
    setInput(SAMPLE_RESUME);
    setResult(null);
  }, []);

  const panelClass = embedded
    ? 'hire-os-panel w-full'
    : 'hire-os-panel w-full max-w-3xl';

  return (
    <div className={panelClass}>
      {/* 1. Header */}
      <header className="hire-os-bar flex items-center justify-between gap-4 px-5 py-3.5">
        <div className="flex items-center gap-3">
          <div className="flex gap-1.5" aria-hidden>
            <span className="h-2 w-2 rounded-full bg-white/12" />
            <span className="h-2 w-2 rounded-full bg-white/12" />
            <span className="h-2 w-2 rounded-full bg-white/12" />
          </div>
          <h3 className="text-sm font-medium text-foreground">
            <span className="text-gold">Hire</span>_OS
            <span className="mx-2 text-muted">•</span>
            <span className="text-secondary">Screening</span>
          </h3>
        </div>
        <span className="rounded border border-white/[0.08] bg-[#0b0f0c] px-2 py-0.5 font-mono text-[10px] uppercase tracking-wider text-muted">
          Preview
        </span>
      </header>

      {/* 2. Input block */}
      <section className="hire-os-surface border-t border-white/[0.06] px-5 py-5">
        <div className="mb-3 flex flex-wrap items-end justify-between gap-3">
          <div>
            <label
              htmlFor="hire-os-candidate-input"
              className="text-xs font-medium text-foreground"
            >
              Candidate profile
            </label>
            <p className="mt-1 text-[11px] text-muted">
              Paste resume or role-fit description
            </p>
          </div>
          <motion.button
            type="button"
            onClick={loadSample}
            whileTap={TAP}
            className="link-underline tap-text font-mono text-[10px] text-muted hover:text-foreground"
          >
            Load sample
          </motion.button>
        </div>
        <textarea
          id="hire-os-candidate-input"
          value={input}
          onChange={(e) => setInput(e.target.value)}
          placeholder="Resume text, skills summary, or job-relevant experience…"
          rows={embedded ? 6 : 5}
          disabled={loading}
          className="hire-os-input w-full resize-y px-4 py-3.5 text-sm leading-relaxed text-foreground placeholder:text-muted disabled:opacity-50"
        />
      </section>

      {/* 3. Action bar */}
      <section className="hire-os-inset flex flex-wrap items-center justify-between gap-4 border-t border-white/[0.06] px-5 py-4">
        <AnalyzeButton onClick={runAnalysis} disabled={!hasInput} loading={loading} />
        <ActionStatus loading={loading} loadingStep={loadingStep} hasInput={hasInput} hasResult={!!result} />
      </section>

      {/* 4. Result panel */}
      <AnimatePresence>
        {result && !loading && (
          <motion.section
            key="results"
            initial={{ opacity: 0, y: 8 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: 4 }}
            transition={{ duration: DURATION.normal, ease: EASE }}
            className="hire-os-surface border-t border-white/[0.06] px-5 py-5"
            aria-live="polite"
          >
            <p className="mb-4 font-mono text-[10px] uppercase tracking-[0.14em] text-muted">
              Screening results
            </p>
            <AnalysisResults result={result} />
          </motion.section>
        )}
      </AnimatePresence>
    </div>
  );
}
