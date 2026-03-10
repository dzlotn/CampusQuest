'use client';

import React, { useState } from 'react';
import Image from 'next/image';
import { checkIcon } from './search';
import { Button } from '../components/Button';
import { Card } from '../components/Card';

const commonColleges = [
  { name: 'Harvard University', icon: '/harvard.jpg' },
  { name: 'Stanford University', icon: '/stanford.jpg' },
  { name: 'MIT', icon: '/mit.jpg' },
  { name: 'Yale University', icon: '/yale.jpg' },
  { name: 'Princeton University', icon: '/princeton.jpg' },
  { name: 'Columbia University', icon: '/columbia.jpeg' },
];

const hardcodedColleges = {
  Cornell: { name: 'Cornell University', icon: '/cornell.jpg', acceptanceRate: 0.105, tuitionCost: '60,000', roomBoardCost: '15,000', state: 'New York', city: 'Ithaca' },
  'Cornell University': { name: 'Cornell University', icon: '/cornell.jpg', acceptanceRate: 0.105, tuitionCost: '60,000', roomBoardCost: '15,000', state: 'New York', city: 'Ithaca' },
  MIT: { name: 'MIT', icon: '/mit.jpg', acceptanceRate: 0.04, tuitionCost: '79,850', roomBoardCost: '14,720', state: 'Massachusetts', city: 'Boston' },
};

function formatInfo(data, icon) {
  const name = data?.name ?? '';
  return {
    name,
    icon: icon || '/college.jpg',
    acceptanceRate: data?.acceptanceRate != null ? (data.acceptanceRate * 100).toFixed(2) : 'N/A',
    tuitionCost: data?.tuitionCost ?? 'N/A',
    roomBoardCost: data?.roomBoardCost ?? 'N/A',
    state: data?.state ?? 'N/A',
    city: data?.city ?? 'N/A',
  };
}

export default function Discover() {
  const [collegeInfo, setCollegeInfo] = useState(null);
  const [error, setError] = useState(false);
  const [searchInput, setSearchInput] = useState('');
  const [loading, setLoading] = useState(false);

  const fetchAdmissions = async (schoolName) => {
    const res = await fetch(`/api/colleges/admissions?name=${encodeURIComponent(schoolName)}`);
    if (!res.ok) {
      const data = await res.json().catch(() => ({}));
      throw new Error(data.error || 'Could not load that school.');
    }
    return res.json();
  };

  const handleSearch = async () => {
    const query = searchInput?.trim() || '';
    if (!query) return;
    setLoading(true);
    setError(false);
    setCollegeInfo(null);

    try {
      if (hardcodedColleges[query]) {
        const a = hardcodedColleges[query];
        const icon = await checkIcon(a.name);
        setCollegeInfo(formatInfo({ name: a.name, acceptanceRate: a.acceptanceRate, tuitionCost: a.tuitionCost, roomBoardCost: a.roomBoardCost, state: a.state, city: a.city }, icon));
        setLoading(false);
        return;
      }

      const data = await fetchAdmissions(query);
      const canonicalName = data.name || query;
      setCollegeInfo(formatInfo(data, '/college.jpg'));
      setSearchInput(canonicalName);
      setLoading(false);
      checkIcon(canonicalName).then((icon) => {
        setCollegeInfo((prev) => (prev ? { ...prev, icon } : prev));
      }).catch(() => {});
    } catch (err) {
      const icon = await checkIcon(query).catch(() => '/college.jpg');
      setCollegeInfo({ name: query, icon, acceptanceRate: 'N/A', tuitionCost: 'N/A', roomBoardCost: 'N/A', state: 'N/A', city: 'N/A' });
      setError(true);
      setLoading(false);
    }
  };

  const handleCardClick = async (college) => {
    setLoading(true);
    setError(false);
    setCollegeInfo(null);
    try {
      if (hardcodedColleges[college.name]) {
        const a = hardcodedColleges[college.name];
        setCollegeInfo(formatInfo({ name: college.name, acceptanceRate: a.acceptanceRate, tuitionCost: a.tuitionCost, roomBoardCost: a.roomBoardCost, state: a.state, city: a.city }, college.icon));
        setLoading(false);
        return;
      }
      const data = await fetchAdmissions(college.name);
      const displayName = data.name || college.name;
      const icon = await checkIcon(displayName).catch(() => college.icon);
      setCollegeInfo(formatInfo(data, icon));
      setError(false);
    } catch (err) {
      setCollegeInfo({ name: college.name, icon: college.icon, acceptanceRate: 'N/A', tuitionCost: 'N/A', roomBoardCost: 'N/A', state: 'N/A', city: 'N/A' });
      setError(true);
    }
    setLoading(false);
  };

  const handleBack = () => { setCollegeInfo(null); setError(false); };

  const container = 'max-w-6xl mx-auto px-4 sm:px-6';

  return (
    <div className="min-h-screen bg-background">
      <div className={`${container} py-8 sm:py-10`}>
        <header className="mb-8">
          <h1 className="text-page-title text-white">Discover</h1>
          <p className="mt-1.5 text-muted-foreground text-sm">Search by name—typos are fine. Pick a school below or type any name.</p>
        </header>

        <Card className="overflow-hidden">
          <div className="relative h-48 sm:h-56">
            <Image src="/college.jpg" alt="" fill className="object-cover" sizes="896px" />
            <div className="absolute inset-0 bg-background/70 flex flex-col justify-center px-5">
              <div className="flex flex-col sm:flex-row gap-3 w-full max-w-md">
                <input
                  type="text"
                  value={searchInput}
                  onChange={(e) => setSearchInput(e.target.value)}
                  onKeyDown={(e) => e.key === 'Enter' && handleSearch()}
                  placeholder="e.g. Stanford, MIT, UCLA"
                  className="flex-1 min-w-0 h-10 px-3 rounded-input border border-border bg-surface text-white placeholder-muted focus:outline-none focus:ring-2 focus:ring-primary/50 focus:border-primary"
                />
                <Button onClick={handleSearch} size="md" className="sm:shrink-0" disabled={loading}>
                  {loading ? 'Searching…' : 'Search'}
                </Button>
              </div>
            </div>
          </div>
        </Card>

        <h2 className="text-section-title text-white mt-10 mb-4">Popular schools</h2>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
          {commonColleges.map((college) => (
            <button
              type="button"
              key={college.name}
              onClick={() => handleCardClick(college)}
              disabled={loading}
              className="group relative rounded-card border border-border bg-surface overflow-hidden text-left transition-colors hover:border-muted-foreground/40 hover:bg-surface-hover disabled:opacity-70"
            >
              <img src={college.icon} alt="" className="w-full h-36 object-cover" />
              <div className="absolute inset-0 flex items-center justify-center bg-background/50 p-4">
                <span className="font-medium text-white text-sm text-center">{college.name}</span>
              </div>
              {collegeInfo?.name === college.name && (
                <div className="absolute inset-0 bg-surface p-4 flex flex-col justify-center">
                  <span className="text-card-title text-white">{college.name}</span>
                  {error ? (
                    <p className="text-red-400 text-sm mt-2">Data not available</p>
                  ) : (
                    <ul className="text-muted-foreground text-sm mt-2 space-y-0.5">
                      <li>Admissions: {collegeInfo.acceptanceRate}%</li>
                      <li>Tuition: ${collegeInfo.tuitionCost}</li>
                      <li>{collegeInfo.city}, {collegeInfo.state}</li>
                    </ul>
                  )}
                </div>
              )}
            </button>
          ))}
        </div>
      </div>

      {collegeInfo && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-background/80 backdrop-blur-sm" onClick={handleBack}>
          <Card className="w-full max-w-md p-6 shadow-card-hover" onClick={(e) => e.stopPropagation()}>
            <div className="flex items-center gap-4">
              <img src={collegeInfo.icon} alt="" className="h-14 w-14 rounded-card object-cover border border-border shrink-0" />
              <h2 className="text-section-title text-white flex-1 truncate">{collegeInfo.name}</h2>
            </div>
            <dl className="mt-6 space-y-3">
              {[
                ['Admissions rate', `${collegeInfo.acceptanceRate}%`],
                ['Tuition (in-state)', `$${collegeInfo.tuitionCost}`],
                ['Room & board', `$${collegeInfo.roomBoardCost}`],
                ['Location', `${collegeInfo.city}, ${collegeInfo.state}`],
              ].map(([label, value]) => (
                <div key={label} className="flex justify-between text-sm">
                  <dt className="text-muted-foreground">{label}</dt>
                  <dd className="font-medium text-white">{value}</dd>
                </div>
              ))}
            </dl>
            <div className="mt-6 flex gap-3">
              <Button variant="secondary" className="flex-1" onClick={handleBack}>Back</Button>
              <a href={`https://www.google.com/search?q=${encodeURIComponent(collegeInfo.name)}`} target="_blank" rel="noopener noreferrer" className="flex-1">
                <Button variant="primary" className="w-full">More info</Button>
              </a>
            </div>
          </Card>
        </div>
      )}
    </div>
  );
}
