import Image from 'next/image';
import Link from 'next/link';

const features = [
  {
    href: '/discover',
    title: 'Discover',
    description: 'Search any school. Real acceptance rates, tuition, and location from the College Scorecard API.',
    icon: '/searchicon.png',
    accent: 'from-primary/20 to-primary/5',
  },
  {
    href: '/compare',
    title: 'Compare',
    description: 'Add up to 4 colleges and see them side-by-side. No more switching tabs.',
    icon: '/data.png',
    accent: 'from-primary/15 to-transparent',
  },
  {
    href: '/map',
    title: 'Map',
    description: "Pin colleges and list who's going where. Draw lines from your high school to each destination.",
    icon: '/mapicon.png',
    accent: 'from-primary/10 to-transparent',
  },
];

const steps = [
  { num: '01', title: 'Search or browse', detail: 'Type a college name or pick from popular schools.' },
  { num: '02', title: 'Compare & map', detail: 'Stack schools in a table or drop them on the map.' },
  { num: '03', title: 'Decide', detail: 'Use real data to choose where to apply.' },
];

const container = 'max-w-6xl mx-auto px-4 sm:px-6';

export default function HomePage() {
  return (
    <div className="bg-background min-h-screen">
      {/* Subtle gradient orbs for depth */}
      <div className="fixed inset-0 pointer-events-none overflow-hidden">
        <div className="absolute -top-40 -right-40 w-80 h-80 rounded-full bg-primary/10 blur-[100px]" />
        <div className="absolute top-1/2 -left-40 w-72 h-72 rounded-full bg-primary/5 blur-[80px]" />
      </div>

      {/* Hero */}
      <section className="relative pt-12 sm:pt-16 pb-16 sm:pb-24">
        <div className={container}>
          <div className="max-w-3xl">
            <p className="text-primary font-medium text-sm tracking-wide uppercase mb-4">
              College discovery, simplified
            </p>
            <h1 className="text-4xl sm:text-5xl md:text-6xl font-bold tracking-tight text-white leading-[1.1]">
              Track the{' '}
              <span className="bg-gradient-to-r from-primary via-primary to-primary/80 bg-clip-text text-transparent">
                journey
              </span>
            </h1>
            <p className="mt-6 text-lg text-muted-foreground max-w-xl leading-relaxed">
              Real data. One place. Discover schools, compare them side-by-side, and see who's going where on a map.
            </p>
            <div className="mt-10 flex flex-wrap gap-4">
              <Link
                href="/discover"
                className="inline-flex items-center justify-center h-12 px-8 rounded-xl bg-primary text-black font-semibold text-sm hover:bg-primary-hover transition-colors shadow-lg shadow-primary/20"
              >
                Discover colleges
              </Link>
              <Link
                href="/map"
                className="inline-flex items-center justify-center h-12 px-8 rounded-xl border border-border bg-surface/80 text-white font-medium text-sm hover:bg-surface-hover hover:border-muted-foreground/40 transition-colors"
              >
                View map
              </Link>
            </div>
          </div>
        </div>
      </section>

      {/* Feature strip */}
      <section className="relative py-12 sm:py-16 border-t border-border">
        <div className={container}>
          <p className="text-muted-foreground text-sm font-medium mb-6">What you can do</p>
          <div className="grid gap-4 sm:grid-cols-3">
            {features.map((f) => (
              <Link
                key={f.href}
                href={f.href}
                className="group relative block rounded-2xl border border-border bg-surface/60 p-6 sm:p-7 backdrop-blur-sm transition-all hover:border-primary/30 hover:bg-surface-hover/80 hover:shadow-xl hover:shadow-primary/5"
              >
                <div className={`absolute inset-0 rounded-2xl bg-gradient-to-br ${f.accent} opacity-0 group-hover:opacity-100 transition-opacity`} />
                <div className="relative">
                  <div className="flex items-center gap-3 mb-3">
                    <span className="flex h-10 w-10 items-center justify-center rounded-xl bg-primary/15 shrink-0">
                      <Image src={f.icon} width={22} height={22} alt="" className="opacity-90" />
                    </span>
                    <h2 className="text-lg font-semibold text-white">{f.title}</h2>
                  </div>
                  <p className="text-muted-foreground text-sm leading-relaxed">{f.description}</p>
                  <span className="mt-4 inline-flex items-center gap-1.5 text-primary text-sm font-medium group-hover:gap-2.5 transition-all">
                    Open {f.title}
                    <span className="text-primary">→</span>
                  </span>
                </div>
              </Link>
            ))}
          </div>
          <p className="mt-8 text-center text-muted text-xs">
            Powered by the U.S. College Scorecard API
          </p>
        </div>
      </section>

      {/* How it works */}
      <section className="relative py-12 sm:py-16 border-t border-border">
        <div className={container}>
          <h2 className="text-2xl font-semibold text-white">How it works</h2>
          <p className="mt-1 text-muted-foreground text-sm">Three steps to go from curious to decided.</p>
          <div className="mt-10 grid gap-8 sm:grid-cols-3">
            {steps.map((s) => (
              <div key={s.num}>
                <span className="text-3xl font-bold text-primary/30 tracking-tight">{s.num}</span>
                <h3 className="mt-2 text-base font-semibold text-white">{s.title}</h3>
                <p className="mt-1.5 text-muted-foreground text-sm">{s.detail}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Bottom CTA */}
      <section className="relative py-16 sm:py-20 border-t border-border">
        <div className={container}>
          <div className="max-w-2xl mx-auto text-center">
            <h2 className="text-2xl sm:text-3xl font-semibold text-white">
              Ready to explore?
            </h2>
            <p className="mt-3 text-muted-foreground text-sm">
              Start with Discover or jump straight to the Map.
            </p>
            <div className="mt-8 flex flex-wrap justify-center gap-4">
              <Link
                href="/discover"
                className="inline-flex items-center justify-center h-11 px-6 rounded-xl bg-primary text-black font-semibold text-sm hover:bg-primary-hover transition-colors"
              >
                Discover colleges
              </Link>
              <Link
                href="/statistics"
                className="inline-flex items-center justify-center h-11 px-6 rounded-xl border border-border text-muted-foreground font-medium text-sm hover:text-white hover:bg-surface transition-colors"
              >
                View statistics
              </Link>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}
