export function Card({ className = '', children, ...props }) {
  return (
    <div
      className={`rounded-card border border-border bg-surface shadow-card transition-shadow hover:shadow-card-hover ${className}`.trim()}
      {...props}
    >
      {children}
    </div>
  );
}

export function CardHeader({ className = '', children }) {
  return <div className={`p-5 pb-0 ${className}`.trim()}>{children}</div>;
}

export function CardContent({ className = '', children }) {
  return <div className={`p-5 ${className}`.trim()}>{children}</div>;
}
