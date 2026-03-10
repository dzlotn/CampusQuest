'use client';

import React, { useState } from 'react';
import Link from 'next/link';
import { Button } from '../components/Button';
import { Card } from '../components/Card';
import { Input } from '../components/Input';

const COMMON = [
  { name: 'Harvard University', icon: '/harvard.jpg' },
  { name: 'Stanford University', icon: '/stanford.jpg' },
  { name: 'MIT', icon: '/mit.jpg' },
  { name: 'Yale University', icon: '/yale.jpg' },
  { name: 'Princeton University', icon: '/princeton.jpg' },
  { name: 'Columbia University', icon: '/columbia.jpeg' },
];

const FIELDS = [
  { key: 'acceptanceRate', label: 'Acceptance rate', format: (v) => (v != null ? `${(Number(v) * 100).toFixed(1)}%` : '—') },
  { key: 'tuitionCost', label: 'Tuition (in-state)', format: (v) => (v ? `$${v}` : '—') },
  { key: 'roomBoardCost', label: 'Room & board', format: (v) => (v ? `$${v}` : '—') },
  { key: 'city', label: 'City', format: (v) => v || '—' },
  { key: 'state', label: 'State', format: (v) => v || '—' },
];

export default function ComparePage() {
  const [search, setSearch] = useState('');
  const [compareList, setCompareList] = useState([]);
  const [data, setData] = useState({});
  const [loading, setLoading] = useState(null);
  const [error, setError] = useState('');

  const fetchCollege = async (name) => {
    const res = await fetch(`/api/colleges/admissions?name=${encodeURIComponent(name)}`);
    if (!res.ok) {
      const err = await res.json().catch(() => ({}));
      throw new Error(err.error || 'Failed to fetch');
    }
    return res.json();
  };

  const addToCompare = async (name) => {
    const n = (name || search?.trim()).replace(/\s+/g, ' ').trim();
    if (!n || compareList.includes(n)) return;
    setLoading(n);
    setError('');
    try {
      const info = await fetchCollege(n);
      setCompareList((prev) => [...prev, n].slice(-4));
      setData((prev) => ({ ...prev, [n]: { name: info.name || n, ...info } }));
      setSearch('');
    } catch (e) {
      setError(e.message || 'Could not load college.');
    } finally {
      setLoading(null);
    }
  };

  const remove = (name) => {
    setCompareList((prev) => prev.filter((c) => c !== name));
    setData((prev) => {
      const next = { ...prev };
      delete next[name];
      return next;
    });
  };

  const container = 'max-w-6xl mx-auto px-4 sm:px-6';

  return (
    <div className="min-h-screen bg-background">
      <div className={`${container} py-8 sm:py-10`}>
        <header className="mb-8">
          <h1 className="text-page-title text-white">Compare colleges</h1>
          <p className="mt-1.5 text-muted-foreground text-sm">Add up to 4 schools to see side-by-side stats.</p>
        </header>

        <div className="flex flex-wrap gap-3">
          <div className="flex-1 min-w-[200px]">
            <Input
              placeholder="Search by college name"
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              onKeyDown={(e) => e.key === 'Enter' && addToCompare()}
            />
          </div>
          <Button onClick={() => addToCompare()} disabled={loading || !search?.trim()}>
            {loading ? 'Loading...' : 'Add'}
          </Button>
        </div>

        {error && (
          <div className="mt-4 rounded-input border border-red-500/30 bg-red-500/10 px-4 py-3 text-sm text-red-400">
            {error}
          </div>
        )}

        <div className="mt-6">
          <p className="text-muted-foreground text-sm mb-2">Quick add</p>
          <div className="flex flex-wrap gap-2">
            {COMMON.map((c) => (
              <Button
                key={c.name}
                variant="secondary"
                size="sm"
                onClick={() => addToCompare(c.name)}
                disabled={loading || compareList.includes(c.name) || compareList.length >= 4}
              >
                <span className="flex items-center gap-2">
                  <img src={c.icon} alt="" className="w-4 h-4 rounded object-cover" />
                  {c.name}
                </span>
              </Button>
            ))}
          </div>
        </div>

        <div className="mt-8">
          {compareList.length === 0 ? (
            <Card className="p-12 text-center">
              <p className="text-muted-foreground text-sm">Add colleges above to compare acceptance rate, tuition, location, and more.</p>
              <div className="mt-4 flex justify-center gap-4">
                <Link href="/discover"><Button variant="ghost" size="sm">Discover colleges</Button></Link>
                <Link href="/map"><Button variant="ghost" size="sm">View map</Button></Link>
              </div>
            </Card>
          ) : (
            <Card className="overflow-hidden p-0">
              <div className="overflow-x-auto">
                <table className="w-full min-w-[500px]">
                  <thead>
                    <tr className="border-b border-border">
                      <th className="text-left p-4 text-muted-foreground font-medium text-sm w-36">Metric</th>
                      {compareList.map((name) => (
                        <th key={name} className="text-left p-4 font-medium text-white text-sm">
                          <div className="flex items-center justify-between gap-2">
                            <span className="truncate">{data[name]?.name || name}</span>
                            <button type="button" onClick={() => remove(name)} className="shrink-0 text-muted hover:text-red-400 text-sm" aria-label="Remove">×</button>
                          </div>
                        </th>
                      ))}
                    </tr>
                  </thead>
                  <tbody>
                    {FIELDS.map(({ key, label, format }) => (
                      <tr key={key} className="border-b border-border last:border-0">
                        <td className="p-4 text-muted-foreground text-sm">{label}</td>
                        {compareList.map((name) => (
                          <td key={name} className="p-4 text-white text-sm">{format(data[name]?.[key])}</td>
                        ))}
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </Card>
          )}
        </div>

        <div className="mt-8 flex gap-4 text-sm">
          <Link href="/discover" className="text-primary hover:underline">Discover more →</Link>
          <Link href="/map" className="text-primary hover:underline">View on map →</Link>
        </div>
      </div>
    </div>
  );
}
