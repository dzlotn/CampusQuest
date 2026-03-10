import Link from 'next/link';

const base =
  'inline-flex items-center justify-center font-medium transition-colors rounded-button focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary focus-visible:ring-offset-2 focus-visible:ring-offset-background disabled:pointer-events-none disabled:opacity-50';

const variants = {
  primary: 'bg-primary text-black hover:bg-primary-hover',
  secondary: 'bg-surface border border-border text-white hover:bg-surface-hover hover:border-muted-foreground/30',
  ghost: 'text-muted-foreground hover:text-white hover:bg-surface-hover',
};

const sizes = {
  sm: 'h-8 px-3 text-sm',
  md: 'h-10 px-4 text-sm',
  lg: 'h-11 px-6 text-sm',
};

export function Button({ variant = 'primary', size = 'md', className = '', href, children, ...props }) {
  const classes = `${base} ${variants[variant]} ${sizes[size]} ${className}`.trim();
  if (href) {
    return (
      <Link href={href} className={classes} {...props}>
        {children}
      </Link>
    );
  }
  return (
    <button type={props.type ?? 'button'} className={classes} {...props}>
      {children}
    </button>
  );
}
