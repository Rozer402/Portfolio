import { ExternalLink } from './ExternalLink';

export function PremiumLink({ href, children, className = '' }) {
  return (
    <ExternalLink href={href} className={`text-sm text-[#10b981] ${className}`}>
      {children}
    </ExternalLink>
  );
}
