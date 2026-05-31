const DEFAULT_GOLD = ['AI', 'AI-powered', 'Impact', 'Hire_OS', 'Hire OS'];

export function KeywordHighlight({
  text,
  keywords = [],
  goldKeywords = DEFAULT_GOLD,
  className = '',
}) {
  const allKeys = [...new Set([...keywords, ...goldKeywords])];

  if (!allKeys.length) {
    return <span className={className}>{text}</span>;
  }

  const pattern = new RegExp(
    `(${allKeys.map((k) => k.replace(/[.*+?^${}()|[\]\\]/g, '\\$&')).join('|')})`,
    'gi',
  );
  const parts = text.split(pattern);

  return (
    <span className={className}>
      {parts.map((part, i) => {
        const isGold = goldKeywords.some((k) => k.toLowerCase() === part.toLowerCase());
        if (isGold) {
          return (
            <span key={`${part}-${i}`} className="text-gold">
              {part}
            </span>
          );
        }
        return <span key={`${part}-${i}`}>{part}</span>;
      })}
    </span>
  );
}

export function BulletList({ items, className = '' }) {
  return (
    <dl className={`space-y-0 ${className}`}>
      {items.map((item) => {
        const isImpact = item.label.toLowerCase().includes('impact');
        return (
          <div
            key={item.label}
            className="grid gap-2 border-t border-white/[0.06] py-4 first:border-t-0 first:pt-0 md:grid-cols-[140px_1fr] md:gap-8"
          >
            <dt
              className={`font-mono text-[11px] uppercase tracking-[0.12em] ${
                isImpact ? 'text-gold' : 'text-muted'
              }`}
            >
              {item.label}
            </dt>
            <dd className="text-sm leading-relaxed text-secondary md:text-[15px]">{item.text}</dd>
          </div>
        );
      })}
    </dl>
  );
}
