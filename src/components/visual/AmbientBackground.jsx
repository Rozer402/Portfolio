/** Flat background only — no mesh, cursor glow, or animation */
export function AmbientBackground() {
  return (
    <div className="pointer-events-none fixed inset-0 z-0 bg-void" aria-hidden>
      <div
        className="absolute inset-0 opacity-[0.4]"
        style={{
          backgroundImage:
            'linear-gradient(var(--color-border-subtle) 1px, transparent 1px), linear-gradient(90deg, var(--color-border-subtle) 1px, transparent 1px)',
          backgroundSize: '64px 64px',
          maskImage: 'linear-gradient(to bottom, black 0%, transparent 70%)',
        }}
      />
    </div>
  );
}
