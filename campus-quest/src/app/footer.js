import Link from 'next/link';

const links = [
  { href: '/', label: 'About' },
  { href: '/discover', label: 'Discover' },
  { href: '/compare', label: 'Compare' },
  { href: '/map', label: 'Map' },
  { href: 'https://github.com/dzlotn/CampusQuest', label: 'GitHub', external: true },
];

export default function Footer() {
  return (
    <footer className="mt-auto border-t border-border bg-background">
      <div className="max-w-6xl mx-auto flex flex-col sm:flex-row items-center justify-between gap-4 h-16 px-4 sm:px-6">
        <span className="text-muted text-sm order-2 sm:order-1">
          © {new Date().getFullYear()} CampusQuest
        </span>
        <nav className="order-1 sm:order-2">
          <ul className="flex flex-wrap items-center justify-center sm:justify-end gap-6 text-sm">
            {links.map(({ href, label, external }) => (
              <li key={href}>
                {external ? (
                  <a href={href} target="_blank" rel="noopener noreferrer" className="text-muted hover:text-white transition-colors">
                    {label}
                  </a>
                ) : (
                  <Link href={href} className="text-muted hover:text-white transition-colors">
                    {label}
                  </Link>
                )}
              </li>
            ))}
          </ul>
        </nav>
      </div>
    </footer>
  );
}
