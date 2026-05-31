/**
 * Hire_OS flagship shell — layered depth, slow border, inner light.
 */
export function HireOsProductShell({ children, className = '' }) {
  return (
    <div className={`product-panel ${className}`}>
      <div className="product-panel-backdrop" aria-hidden />
      <div className="product-panel-inner-glow" aria-hidden />
      <div className="product-panel-vignette" aria-hidden />
      <div className="product-panel-foreground">{children}</div>
    </div>
  );
}
