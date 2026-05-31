/** Application chrome — reads as software, not a marketing card */
export function ProductFrame({ title, subtitle, badge, children }) {
  return (
    <div className="ui-app w-full">
      <div className="ui-app-bar">
        <div className="flex items-center gap-3">
          <div className="flex gap-1.5" aria-hidden>
            <span className="h-2.5 w-2.5 rounded-full bg-white/10" />
            <span className="h-2.5 w-2.5 rounded-full bg-white/10" />
            <span className="h-2.5 w-2.5 rounded-full bg-white/10" />
          </div>
          <span className="font-mono text-xs text-muted">
            {title}
            {subtitle && (
              <>
                <span className="mx-2 text-white/15">/</span>
                {subtitle}
              </>
            )}
          </span>
        </div>
        {badge && (
          <span className="rounded border border-white/[0.08] px-2 py-0.5 font-mono text-[10px] uppercase tracking-wider text-muted">
            {badge}
          </span>
        )}
      </div>
      <div className="p-5 md:p-6">{children}</div>
    </div>
  );
}
