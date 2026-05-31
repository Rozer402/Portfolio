export function SceneDivider() {
  return (
    <div className="relative py-2" aria-hidden>
      <div className="section-divider mx-auto max-w-4xl" />
      <div className="pointer-events-none absolute inset-x-0 top-1/2 h-24 -translate-y-1/2 bg-gradient-to-b from-transparent via-[rgba(16,185,129,0.02)] to-transparent" />
    </div>
  );
}
