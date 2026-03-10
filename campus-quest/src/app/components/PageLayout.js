export function PageLayout({ title, description, children, className = '' }) {
  return (
    <div className={`min-h-screen bg-background ${className}`.trim()}>
      <div className="max-w-5xl mx-auto px-page py-section">
        {(title || description) && (
          <header className="mb-section">
            {title && <h1 className="text-page-title text-white font-semibold tracking-tight">{title}</h1>}
            {description && <p className="mt-1.5 text-muted-foreground text-sm max-w-2xl">{description}</p>}
          </header>
        )}
        {children}
      </div>
    </div>
  );
}
