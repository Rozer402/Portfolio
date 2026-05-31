import storyData from '../data/storyData.json';

/** Safe external link attributes */
export const EXTERNAL_REL = 'noopener noreferrer';

/**
 * Profile links from storyData — single source of truth.
 * Email is stored as an address; use `email` (mailto) for hrefs.
 */
export function getProfileLinks() {
  const { links } = storyData;
  return {
    github: links.github,
    linkedin: links.linkedin,
    email: toMailto(links.email),
    emailAddress: links.email,
  };
}

/** @param {string} email */
export function toMailto(email) {
  if (!email) return '#';
  if (email.startsWith('mailto:')) return email;
  return `mailto:${email}`;
}

/** @param {string | null | undefined} href */
export function isExternalHref(href) {
  if (!href || href.startsWith('#')) return false;
  return !href.startsWith('mailto:');
}

/**
 * target/_blank only for http(s); mailto and in-page stay same-tab.
 * @param {string | null | undefined} href
 */
export function getLinkTargetProps(href) {
  if (isExternalHref(href)) {
    return { target: '_blank', rel: EXTERNAL_REL };
  }
  return {};
}

/** @param {{ links?: { github?: string | null, demo?: string | null } }} project */
export function getProjectGithub(project) {
  return project?.links?.github ?? null;
}

/** @param {{ links?: { demo?: string | null } }} project */
export function getProjectDemo(project) {
  return project?.links?.demo ?? null;
}

export function getContactNavLinks() {
  const { github, linkedin, email } = getProfileLinks();
  return [
    { label: 'Email', href: email },
    { label: 'GitHub', href: github },
    { label: 'LinkedIn', href: linkedin },
  ];
}
