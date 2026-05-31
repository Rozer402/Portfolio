/**
 * Simulated Hire_OS candidate analysis — keyword-based, no API.
 * Returns consistent structure for UI rendering.
 */

const KEYWORD_RULES = [
  {
    pattern: /\breact\b|react\.js|reactjs/i,
    strength: 'Strong frontend skills (React)',
    suggestion: null,
    scoreBoost: 6,
  },
  {
    pattern: /\bvue\b|angular|svelte/i,
    strength: 'Modern frontend framework experience',
    scoreBoost: 5,
  },
  {
    pattern: /\bnode\.?js\b|\bnode\b|express|nestjs/i,
    strength: 'Backend experience (Node.js ecosystem)',
    scoreBoost: 6,
  },
  {
    pattern: /\bpython\b|django|fastapi|flask/i,
    strength: 'Python backend / data tooling',
    scoreBoost: 5,
  },
  {
    pattern: /\btypescript\b|\bts\b/i,
    strength: 'Type-safe development (TypeScript)',
    scoreBoost: 4,
  },
  {
    pattern: /\bpostgres\b|postgresql|mongodb|mysql|sql/i,
    strength: 'Database & data modeling experience',
    scoreBoost: 4,
  },
  {
    pattern: /\bopenai\b|gpt|llm|machine learning|ml\b|ai\b/i,
    strength: 'AI / ML integration experience',
    scoreBoost: 5,
  },
  {
    pattern: /\baws\b|azure|gcp|cloud|docker|kubernetes|k8s/i,
    strength: 'Cloud & infrastructure awareness',
    scoreBoost: 4,
  },
  {
    pattern: /\bvercel\b|netlify|deploy|ci\/cd|github actions/i,
    strength: 'Deployment & CI/CD experience',
    scoreBoost: 4,
    negatesWeakness: 'deployment',
  },
  {
    pattern: /\bportfolio\b|github\.com|open source|open-source/i,
    strength: 'Visible project work & portfolio presence',
    scoreBoost: 3,
    negatesWeakness: 'portfolio',
  },
  {
    pattern: /\b(full.?stack|fullstack)\b/i,
    strength: 'Full-stack engineering profile',
    scoreBoost: 5,
  },
  {
    pattern: /\b(lead|senior|architect|mentor)\b/i,
    strength: 'Leadership or senior-level signals',
    scoreBoost: 4,
  },
  {
    pattern: /\b(ship|shipped|production|scale|users)\b/i,
    strength: 'Production delivery experience',
    scoreBoost: 4,
  },
];

const WEAKNESS_RULES = [
  {
    id: 'backend',
    test: (text) => !/\bnode|python|java|go\b|backend|api/i.test(text),
    weakness: 'Limited backend depth mentioned',
    suggestion: 'Highlight backend projects and API work',
  },
  {
    id: 'deployment',
    test: (text) => !/\bdeploy|vercel|docker|aws|ci\/cd|production\b/i.test(text),
    weakness: 'No clear deployment / production ops signals',
    suggestion: 'Add deployed portfolio links and hosting details',
  },
  {
    id: 'portfolio',
    test: (text) => !/\bgithub|portfolio|demo|live\b/i.test(text),
    weakness: 'Missing links to live work or repositories',
    suggestion: 'Include GitHub and live demo URLs',
  },
  {
    id: 'typescript',
    test: (text) =>
      /\breact\b|javascript\b/i.test(text) && !/\btypescript\b/i.test(text),
    weakness: 'Frontend listed without TypeScript',
    suggestion: 'Consider TypeScript for larger codebases',
  },
  {
    id: 'ai',
    test: (text) =>
      /\bengineer|developer|software\b/i.test(text) &&
      !/\bai\b|ml|machine learning|llm|data/i.test(text),
    weakness: 'No AI / modern tooling signals (optional for role)',
    suggestion: 'Mention relevant AI or automation experience if applicable',
  },
];

const GENERIC_STRENGTHS = [
  'Clear communication in resume structure',
  'Relevant professional experience outlined',
];

const GENERIC_WEAKNESSES = [
  'Add more specific technologies and metrics',
  'Include quantifiable impact (%, users, time saved)',
];

const GENERIC_SUGGESTIONS = [
  'Improve backend projects visibility',
  'Add deployed portfolio links',
  'Use bullet points with measurable outcomes',
];

function randomInRange(min, max) {
  return Math.floor(Math.random() * (max - min + 1)) + min;
}

export function analyzeCandidate(rawText) {
  const text = (rawText || '').trim();
  const lowered = text.toLowerCase();

  const frontendKeywords = ['react', 'html', 'css', 'javascript'];
  const backendKeywords = ['node', 'express', 'api', 'server'];
  const databaseKeywords = ['mongodb', 'mysql', 'postgres'];
  const toolsKeywords = ['git', 'docker', 'aws'];

  const foundFrontend = frontendKeywords.filter(k => lowered.includes(k));
  const foundBackend = backendKeywords.filter(k => lowered.includes(k));
  const foundDatabase = databaseKeywords.filter(k => lowered.includes(k));
  const foundTools = toolsKeywords.filter(k => lowered.includes(k));

  const totalKeywordsFound =
    foundFrontend.length +
    foundBackend.length +
    foundDatabase.length +
    foundTools.length;

  // 1. INPUT VALIDATION
  if (text.length < 20 || totalKeywordsFound === 0) {
    return {
      score: Math.floor(Math.random() * 16), // 0-15
      label: 'WEAK',
      strengths: ['No meaningful data detected'],
      weaknesses: ['Input lacks technical content'],
      suggestions: ['Provide skills, technologies, and experience'],
    };
  }

  // 3. SCORING ENGINE
  let score = 0;

  // +20 → if text length is valid
  score += 20;

  // +10–15 → per keyword category found
  let categoriesFound = 0;
  if (foundFrontend.length > 0) categoriesFound++;
  if (foundBackend.length > 0) categoriesFound++;
  if (foundDatabase.length > 0) categoriesFound++;
  if (foundTools.length > 0) categoriesFound++;

  score += categoriesFound * 12; // Using 12 as average between 10-15

  // +10 → if multiple technologies mentioned
  if (totalKeywordsFound > 1) {
    score += 10;
  }

  // +5–10 → if structured sentences detected
  if (/[.,;]\s/.test(text) || /\n/.test(text)) {
    score += 8;
  }

  // Cap: max score = 90
  score = Math.min(score, 90);

  // 4. SCORE LABELS
  let label = 'WEAK';
  if (score >= 80) label = 'STRONG';
  else if (score >= 60) label = 'GOOD';
  else if (score >= 30) label = 'AVERAGE';

  const strengths = [];
  if (foundFrontend.length > 0) strengths.push(`Frontend: ${foundFrontend.join(', ')}`);
  if (foundBackend.length > 0) strengths.push(`Backend: ${foundBackend.join(', ')}`);
  if (foundDatabase.length > 0) strengths.push(`Database: ${foundDatabase.join(', ')}`);
  if (foundTools.length > 0) strengths.push(`Tools: ${foundTools.join(', ')}`);
  if (strengths.length === 0) strengths.push('Basic technical keywords detected');

  const weaknesses = [];
  if (foundFrontend.length === 0) weaknesses.push('No frontend technologies mentioned');
  if (foundBackend.length === 0) weaknesses.push('Missing backend architecture details');
  if (foundDatabase.length === 0) weaknesses.push('No database experience highlighted');
  if (foundTools.length === 0) weaknesses.push('Deployment and tooling skills absent');

  const suggestions = [];
  if (totalKeywordsFound < 3) suggestions.push('Include more specific technologies');
  if (categoriesFound < 2) suggestions.push('Diversify skill profile across stack');
  if (!/[.,;]\s/.test(text)) suggestions.push('Use structured sentences to describe experience');
  if (suggestions.length === 0) suggestions.push('Profile looks solid, consider adding measurable outcomes');

  return {
    score,
    label,
    strengths: strengths.slice(0, 4),
    weaknesses: weaknesses.slice(0, 4),
    suggestions: suggestions.slice(0, 4),
  };
}

export function getAnalysisDelay() {
  return 800;
}

export const SAMPLE_RESUME = `Full-stack engineer with 3+ years building production web apps.
Skills: React, JavaScript, Node, Express, MongoDB, MySQL.
Shipped Hire_OS — AI-assisted hiring platform with pipeline dashboards.
Deployed on AWS with CI/CD via Git and Docker.
Open source contributions at github.com/example.`;
