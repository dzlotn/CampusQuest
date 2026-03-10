'use client';

import Link from 'next/link';
import Image from 'next/image';
import { useSession, signOut } from 'next-auth/react';
import { Button } from './components/Button';

const navLinks = [
  { href: '/', label: 'Home' },
  { href: '/discover', label: 'Discover' },
  { href: '/compare', label: 'Compare' },
  { href: '/map', label: 'Map' },
  { href: '/statistics', label: 'Statistics' },
];

export default function Navbar() {
  const { data: session, status } = useSession();

  return (
    <header className="sticky top-0 z-50 border-b border-border bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/80">
      <div className="max-w-6xl mx-auto flex h-16 items-center justify-between gap-6 px-4 sm:px-6">
        <Link href="/" className="flex items-center gap-2.5 shrink-0 min-w-0">
          <Image src="/mapicon.png" alt="" width={28} height={28} className="invert opacity-90 shrink-0" />
          <span className="font-semibold text-white text-sm tracking-tight truncate hidden sm:inline">
            CampusQuest
          </span>
        </Link>

        <nav className="flex items-center flex-wrap gap-1 sm:gap-2 min-w-0">
          {navLinks.map(({ href, label }) => (
            <Link
              key={href}
              href={href}
              className="px-3 py-2 rounded-md text-sm font-medium text-muted-foreground hover:text-white hover:bg-surface transition-colors"
            >
              {label}
            </Link>
          ))}
        </nav>

        <div className="flex items-center gap-2 shrink-0">
          <a
            href="https://github.com/dzlotn/CampusQuest"
            target="_blank"
            rel="noopener noreferrer"
            className="p-2 rounded-md text-muted-foreground hover:text-white hover:bg-surface transition-colors"
            aria-label="GitHub"
          >
            <Image src="/githublogo.png" width={20} height={20} className="invert opacity-80" alt="" />
          </a>
          {status === 'loading' ? (
            <div className="h-9 w-24 rounded-md bg-surface animate-pulse" />
          ) : session ? (
            <>
              <span className="hidden sm:block text-muted-foreground text-sm truncate max-w-[120px]">
                {session.user?.email}
              </span>
              <Button variant="secondary" size="sm" onClick={() => signOut({ callbackUrl: '/' })}>
                Sign out
              </Button>
            </>
          ) : (
            <Button href="/signin" variant="primary" size="sm">
              Sign in
            </Button>
          )}
        </div>
      </div>
    </header>
  );
}
