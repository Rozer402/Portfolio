import { memo, useState, useCallback } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { EASE, DURATION } from '../../constants/motion';

const PR = {
  title: 'feat: migrate auth to async/await + parameterized queries',
  branch: 'feature/auth-refactor',
  base: 'main',
  author: 'Rozer402',
  filesChanged: 1,
  additions: 9,
  deletions: 8,
};

const DIFF_LINES = [
  { id: 1,  type: 'ctx',     n: '1',  code: "import express from 'express';" },
  { id: 2,  type: 'ctx',     n: '2',  code: "import jwt from 'jsonwebtoken';" },
  { id: 3,  type: 'ctx',     n: '3',  code: "import bcrypt from 'bcrypt';" },
  { id: 4,  type: 'add',     n: '4',  code: "import User from '../models/User.js';" },
  { id: 5,  type: 'remove',  n: '',   code: "import db from '../db/connection.js';" },
  { id: 6,  type: 'ctx',     n: '5',  code: '' },
  { id: 7,  type: 'ctx',     n: '6',  code: 'const router = express.Router();' },
  { id: 8,  type: 'ctx',     n: '7',  code: '' },
  { id: 9,  type: 'add',     n: '8',  code: "router.post('/login', async (req, res) => {", commentId: 'rate-limit' },
  { id: 10, type: 'remove',  n: '',   code: "router.post('/login', (req, res) => {" },
  { id: 11, type: 'ctx',     n: '9',  code: '  const { email, password } = req.body;' },
  { id: 12, type: 'add',     n: '10', code: "  const user = await User.findOne({ email }).select('+passwordHash');" },
  { id: 13, type: 'add',     n: '11', code: '  if (!user || !bcrypt.compare(password, user.passwordHash)) {', commentId: 'bcrypt-await' },
  { id: 14, type: 'remove',  n: '',   code: "  const sql = `SELECT * FROM users WHERE email='${email}'`;" },
  { id: 15, type: 'remove',  n: '',   code: "  db.query(sql, (err, rows) => {" },
  { id: 16, type: 'remove',  n: '',   code: "    if (rows[0] && rows[0].password === password) {" },
  { id: 17, type: 'add',     n: '12', code: "    return res.status(401).json({ error: 'Invalid credentials' });" },
  { id: 18, type: 'add',     n: '13', code: '  }' },
  { id: 19, type: 'add',     n: '14', code: "  const token = jwt.sign({ sub: user._id }, process.env.JWT_SECRET, { expiresIn: '7d' });", commentId: 'jwt-secret' },
  { id: 20, type: 'remove',  n: '',   code: "      const token = jwt.sign({ id: rows[0].id }, process.env.JWT_SECRET);" },
  { id: 21, type: 'remove',  n: '',   code: '      res.json({ token });' },
  { id: 22, type: 'remove',  n: '',   code: '    }' },
  { id: 23, type: 'remove',  n: '',   code: '  });' },
  { id: 24, type: 'add',     n: '15', code: '  res.json({ token });' },
  { id: 25, type: 'ctx',     n: '16', code: '});' },
];

const COMMENTS = {
  'bcrypt-await': {
    severity: 'HIGH',
    text: '`bcrypt.compare` is async but not awaited here. The condition always evaluates truthy — this is an authentication bypass vulnerability.',
    delay: 300,
  },
  'jwt-secret': {
    severity: 'HIGH',
    text: '`process.env.JWT_SECRET` is used without a startup validation check. If undefined, all tokens are signed with the string `"undefined"` as the secret key.',
    delay: 600,
  },
  'rate-limit': {
    severity: 'MEDIUM',
    text: 'No rate limiting on this endpoint. Auth routes are a prime brute-force target — consider `express-rate-limit` or a gateway rule.',
    delay: 900,
  },
};

const RISK_SUMMARY = [
  { label: 'HIGH',   count: 2, color: '#ef4444' },
  { label: 'MEDIUM', count: 1, color: '#f59e0b' },
  { label: 'LOW',    count: 0, color: '#6b7280' },
];

const SEVERITY_STYLES = {
  HIGH:   { bg: 'bg-red-500/10',    border: 'border-red-500/30',    text: 'text-red-400',    dot: 'bg-red-400' },
  MEDIUM: { bg: 'bg-amber-500/10',  border: 'border-amber-500/30',  text: 'text-amber-400',  dot: 'bg-amber-400' },
  LOW:    { bg: 'bg-zinc-500/10',   border: 'border-zinc-500/30',   text: 'text-zinc-400',   dot: 'bg-zinc-400' },
};

function DiffLine({ line, comment, revealed }) {
  const bg =
    line.type === 'add'    ? 'bg-emerald-500/[0.07]' :
    line.type === 'remove' ? 'bg-red-500/[0.07]'     : '';
  const prefix =
    line.type === 'add'    ? '+' :
    line.type === 'remove' ? '-' : ' ';
  const prefixColor =
    line.type === 'add'    ? 'text-emerald-400' :
    line.type === 'remove' ? 'text-red-400'     : 'text-muted';

  return (
    <>
      <div className={`group flex min-h-[26px] items-start gap-0 ${bg} font-mono text-[12px] leading-[26px]`}>
        <span className="w-10 shrink-0 select-none text-right text-[11px] text-muted/50 pr-3">
          {line.n}
        </span>
        <span className={`w-4 shrink-0 select-none ${prefixColor}`}>{prefix}</span>
        <span className={`flex-1 overflow-x-auto whitespace-pre pr-4 ${
          line.type === 'add' ? 'text-emerald-100/80' :
          line.type === 'remove' ? 'text-red-200/50 line-through decoration-red-400/40' :
          'text-secondary'
        }`}>
          {line.code || '\u00A0'}
        </span>
        {comment && revealed && (
          <span className={`shrink-0 self-center mr-2 h-1.5 w-1.5 rounded-full animate-pulse ${SEVERITY_STYLES[comment.severity].dot}`} />
        )}
      </div>

      <AnimatePresence>
        {comment && revealed && (
          <motion.div
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: 'auto' }}
            exit={{ opacity: 0, height: 0 }}
            transition={{ duration: 0.3, ease: EASE }}
            className="overflow-hidden"
          >
            <div className={`mx-3 my-1.5 rounded border ${SEVERITY_STYLES[comment.severity].bg} ${SEVERITY_STYLES[comment.severity].border} px-3 py-2.5`}>
              <div className="flex items-center gap-2 mb-1.5">
                <span className={`font-mono text-[9px] font-semibold uppercase tracking-widest ${SEVERITY_STYLES[comment.severity].text}`}>
                  {comment.severity}
                </span>
                <span className="font-mono text-[9px] text-muted">· Argus</span>
              </div>
              <p className="text-[12px] leading-relaxed text-secondary">{comment.text}</p>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}

const RiskSummary = memo(function RiskSummary() {
  return (
    <motion.div
      initial={{ opacity: 0, y: 6 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: DURATION.normal, ease: EASE, delay: 1.1 }}
      className="border-t border-white/[0.06] px-5 py-4"
    >
      <p className="mb-3 font-mono text-[10px] uppercase tracking-[0.14em] text-muted">Risk Summary</p>
      <div className="flex items-center gap-4 flex-wrap">
        {RISK_SUMMARY.map(({ label, count, color }) => (
          <div key={label} className="flex items-center gap-2">
            <span className="h-2 w-2 rounded-full" style={{ background: color }} />
            <span className="font-mono text-[11px] text-secondary">
              {label} <span className="text-foreground font-semibold">{count}</span>
            </span>
          </div>
        ))}
        <span className="ml-auto font-mono text-[11px]">
          <span className="text-muted">Overall risk · </span>
          <span className="text-red-400 font-semibold">HIGH</span>
        </span>
      </div>
    </motion.div>
  );
});

export function ArgusDemo({ embedded = false }) {
  const [state, setState] = useState('idle');
  const [revealedComments, setRevealedComments] = useState(new Set());

  const runReview = useCallback(() => {
    if (state !== 'idle') return;
    setState('running');
    setRevealedComments(new Set());

    const commentIds = Object.keys(COMMENTS);
    commentIds.forEach((id) => {
      setTimeout(() => {
        setRevealedComments((prev) => new Set([...prev, id]));
      }, COMMENTS[id].delay);
    });

    const maxDelay = Math.max(...Object.values(COMMENTS).map((c) => c.delay));
    setTimeout(() => setState('done'), maxDelay + 400);
  }, [state]);

  const reset = useCallback(() => {
    setState('idle');
    setRevealedComments(new Set());
  }, []);

  return (
    <div className="hire-os-panel w-full">
      <header className="hire-os-bar flex items-center justify-between gap-4 px-5 py-3.5">
        <div className="flex items-center gap-3">
          <div className="flex gap-1.5" aria-hidden>
            <span className="h-2 w-2 rounded-full bg-white/12" />
            <span className="h-2 w-2 rounded-full bg-white/12" />
            <span className="h-2 w-2 rounded-full bg-white/12" />
          </div>
          <h3 className="text-sm font-medium text-foreground">
            <span className="text-emerald">Argus</span>
            <span className="mx-2 text-muted">·</span>
            <span className="text-secondary">PR Review</span>
          </h3>
        </div>
        <div className="flex items-center gap-2">
          {state === 'running' && (
            <span className="flex items-center gap-1.5 font-mono text-[10px] text-secondary">
              <span className="h-1.5 w-1.5 animate-pulse rounded-full bg-emerald" />
              Reviewing…
            </span>
          )}
          {state === 'done' && (
            <span className="flex items-center gap-1.5 font-mono text-[10px] text-secondary">
              <span className="h-1.5 w-1.5 rounded-full bg-red-400" />
              Review complete
            </span>
          )}
          <span className="rounded border border-white/[0.08] bg-[#0b0f0c] px-2 py-0.5 font-mono text-[10px] uppercase tracking-wider text-muted">
            Simulation
          </span>
        </div>
      </header>

      <section className="hire-os-surface border-t border-white/[0.06] px-5 py-4">
        <div className="flex flex-wrap items-start justify-between gap-4">
          <div>
            <p className="text-sm font-medium text-foreground">{PR.title}</p>
            <p className="mt-1 font-mono text-[11px] text-muted">
              <span className="text-emerald">{PR.branch}</span>
              <span className="mx-1.5">→</span>
              <span>{PR.base}</span>
              <span className="mx-3 text-muted/40">·</span>
              <span className="text-emerald">+{PR.additions}</span>
              <span className="mx-1 text-muted/60">/</span>
              <span className="text-red-400">−{PR.deletions}</span>
              <span className="ml-3 text-muted">{PR.filesChanged} file changed</span>
            </p>
          </div>
          {state === 'idle' ? (
            <motion.button
              type="button"
              onClick={runReview}
              className="btn-primary btn-pressable shrink-0 px-4 py-2 text-sm font-medium"
              whileHover={{ scale: 1.02 }}
              whileTap={{ scale: 0.97 }}
            >
              Run Review
            </motion.button>
          ) : state === 'done' ? (
            <button type="button" onClick={reset} className="btn-secondary shrink-0 px-4 py-2 text-sm font-medium">
              Reset
            </button>
          ) : null}
        </div>
      </section>

      <section className="hire-os-inset border-t border-white/[0.06] overflow-x-auto">
        <div className="flex items-center justify-between px-5 py-2.5 border-b border-white/[0.06]">
          <span className="font-mono text-[11px] text-muted">src/api/routes/auth.js</span>
          <span className="font-mono text-[10px] text-muted">
            <span className="text-emerald">+{PR.additions}</span>
            <span className="mx-1 opacity-40">/</span>
            <span className="text-red-400">−{PR.deletions}</span>
          </span>
        </div>
        <div className="py-1">
          {DIFF_LINES.map((line) => {
            const comment = line.commentId ? COMMENTS[line.commentId] : null;
            const revealed = line.commentId ? revealedComments.has(line.commentId) : false;
            return <DiffLine key={line.id} line={line} comment={comment} revealed={revealed} />;
          })}
        </div>
      </section>

      <AnimatePresence>
        {state === 'done' && <RiskSummary />}
      </AnimatePresence>

      <div className="border-t border-white/[0.06] px-5 py-2.5">
        <p className="font-mono text-[10px] text-muted">
          Powered by Groq · Llama 3.3 70B · Simulated output
        </p>
      </div>
    </div>
  );
}
