'use client';

import dynamic from 'next/dynamic';

const MapClient = dynamic(() => import('./MapClient'), {
  ssr: false,
  loading: () => (
    <div className="flex items-center justify-center min-h-[400px] rounded-card border border-border bg-surface text-muted-foreground text-sm">
      Loading map...
    </div>
  ),
});

export default function MapPage() {
  const container = 'max-w-6xl mx-auto px-4 sm:px-6';

  return (
    <div className="min-h-screen bg-background">
      <div className={`${container} py-8 sm:py-10`}>
        <header className="mb-8">
          <h1 className="text-page-title text-white">College map</h1>
          <p className="mt-1.5 text-muted-foreground text-sm">Add colleges and list students going there. Set an origin to draw lines from that place to each college.</p>
        </header>
        <MapClient />
      </div>
    </div>
  );
}
