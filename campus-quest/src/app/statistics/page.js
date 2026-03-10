'use client';

import React, { useEffect, useState } from 'react';
import Link from 'next/link';
import { Button } from '../components/Button';
import { Card } from '../components/Card';

export default function StatisticsPage() {
  const [stats, setStats] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');

  useEffect(() => {
    fetch('/api/colleges/stats')
      .then((res) => {
        if (!res.ok) throw new Error('Failed to load statistics');
        return res.json();
      })
      .then(setStats)
      .catch((e) => setError(e.message))
      .finally(() => setLoading(false));
  }, []);

  if (loading) {
    return (
      <div className="min-h-screen bg-background flex items-center justify-center">
        <p className="text-muted-foreground text-sm">Loading statistics...</p>
      </div>
    );
  }

  if (error) {
    return (
      <div className="min-h-screen bg-background">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 py-8 sm:py-10 text-center">
          <h1 className="text-page-title text-white">Statistics</h1>
          <p className="mt-4 text-red-400 text-sm">{error}</p>
          <p className="mt-2 text-muted-foreground text-sm">Make sure COLLEGESCORECARD_API_KEY is set for live data.</p>
          <Button href="/discover" variant="ghost" size="md" className="mt-6">Discover colleges →</Button>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-background">
      <div className="max-w-6xl mx-auto px-4 sm:px-6 py-8 sm:py-10">
        <header className="mb-8">
          <h1 className="text-page-title text-white">Statistics</h1>
          <p className="mt-1.5 text-muted-foreground text-sm">Insights from the College Scorecard dataset (sample of large institutions).</p>
        </header>

        <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
          <Card className="p-5">
            <p className="text-muted-foreground text-xs font-medium uppercase tracking-wider">Schools in sample</p>
            <p className="mt-2 text-2xl font-semibold text-white">{stats?.totalSchools ?? '—'}</p>
          </Card>
          <Card className="p-5">
            <p className="text-muted-foreground text-xs font-medium uppercase tracking-wider">Avg. in-state tuition</p>
            <p className="mt-2 text-2xl font-semibold text-white">
              {stats?.averageTuition != null ? `$${stats.averageTuition.toLocaleString()}` : '—'}
            </p>
          </Card>
          <Card className="p-5">
            <p className="text-muted-foreground text-xs font-medium uppercase tracking-wider">Avg. acceptance rate</p>
            <p className="mt-2 text-2xl font-semibold text-white">
              {stats?.averageAdmissionRate != null ? `${(stats.averageAdmissionRate * 100).toFixed(1)}%` : '—'}
            </p>
          </Card>
        </div>

        {stats?.topStates?.length > 0 && (
          <Card className="mt-6 p-5">
            <h2 className="text-section-title text-white">Top states by number of schools</h2>
            <ul className="mt-4 space-y-2">
              {stats.topStates.map(({ state, count }) => (
                <li key={state} className="flex justify-between items-center text-sm">
                  <span className="text-muted-foreground">{state}</span>
                  <span className="font-medium text-white">{count}</span>
                </li>
              ))}
            </ul>
          </Card>
        )}

        <div className="mt-8 flex gap-4">
          <Button href="/discover" variant="ghost" size="sm">Discover colleges</Button>
          <Button href="/compare" variant="ghost" size="sm">Compare schools</Button>
        </div>
      </div>
    </div>
  );
}
