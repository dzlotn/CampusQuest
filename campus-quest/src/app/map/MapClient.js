'use client';

import React, { useState, useEffect, useRef } from 'react';
import L from 'leaflet';
import 'leaflet/dist/leaflet.css';

delete L.Icon.Default.prototype._getIconUrl;
L.Icon.Default.mergeOptions({
  iconRetinaUrl: 'https://unpkg.com/leaflet@1.7.1/dist/images/marker-icon-2x.png',
  iconUrl: 'https://unpkg.com/leaflet@1.7.1/dist/images/marker-icon.png',
  shadowUrl: 'https://unpkg.com/leaflet@1.7.1/dist/images/marker-shadow.png',
});

const FALLBACK_COORDS = {
  'Cornell University': [42.4534, -76.4735],
  'Harvard University': [42.3744, -71.1162],
  'Stanford University': [37.4275, -122.1697],
  MIT: [42.3601, -71.0942],
  'Yale University': [41.3163, -72.9223],
  'Princeton University': [40.3431, -74.6551],
  'Columbia University': [40.8075, -73.9626],
  'University of California Berkeley': [37.8719, -122.2585],
  'University of California Los Angeles': [34.0689, -118.4452],
  UCLA: [34.0689, -118.4452],
  'University of Michigan': [42.278, -83.7382],
  'Duke University': [36.0014, -78.9382],
  'Northwestern University': [42.0505, -87.6814],
  'University of Pennsylvania': [39.9522, -75.1932],
  'New York University': [40.7295, -73.7932],
  NYU: [40.7295, -73.7932],
  'Boston University': [42.3505, -71.1054],
  'Georgetown University': [38.9076, -77.0723],
  'University of Texas at Austin': [30.2849, -97.7341],
  'University of Virginia': [38.0317, -78.5106],
  'University of North Carolina at Chapel Hill': [35.9042, -79.0469],
  'Ohio State University': [40.0062, -83.0731],
  'University of Southern California': [34.0195, -118.2852],
  'University of Washington': [47.6553, -122.3035],
  'University of Florida': [29.6436, -82.3549],
  'Georgia Institute of Technology': [33.7756, -84.3963],
  'Penn State University': [40.7982, -77.8599],
  'University of Wisconsin-Madison': [43.0766, -89.4125],
  'University of Illinois Urbana-Champaign': [40.102, -88.2272],
  'Texas A&M University': [30.6189, -96.3364],
  'Purdue University': [40.4237, -86.9212],
  'University of Minnesota': [44.9737, -93.2277],
  'Boston College': [42.3364, -71.1662],
  'Syracuse University': [43.0383, -76.1361],
  'Carnegie Mellon University': [40.4433, -79.9436],
  'California Institute of Technology': [34.1377, -118.1253],
  'Vanderbilt University': [36.1454, -86.8027],
  'Rice University': [29.7174, -95.4018],
  'Emory University': [33.7915, -84.3232],
  'University of Notre Dame': [41.7052, -86.2353],
};

const STORAGE_KEY = 'campusquest-map-state';

function loadMapState() {
  if (typeof window === 'undefined') return null;
  try {
    const raw = localStorage.getItem(STORAGE_KEY);
    if (!raw) return null;
    const data = JSON.parse(raw);
    const colleges = Array.isArray(data.colleges)
      ? data.colleges
        .filter((c) => c?.name && Array.isArray(c.coords) && c.coords.length === 2)
        .map((c) => ({
          id: c.id ?? Date.now() + Math.random(),
          name: String(c.name),
          coords: [Number(c.coords[0]), Number(c.coords[1])],
          students: Array.isArray(c.students) ? c.students.filter((s) => typeof s === 'string') : [],
        }))
      : [];
    const origin =
      data.origin?.name && Array.isArray(data.origin?.coords) && data.origin.coords.length === 2
        ? {
            name: String(data.origin.name),
            coords: [Number(data.origin.coords[0]), Number(data.origin.coords[1])],
          }
        : null;
    return { colleges, origin, originInput: typeof data.originInput === 'string' ? data.originInput : '' };
  } catch {
    return null;
  }
}

function saveMapState(colleges, origin, originInput) {
  if (typeof window === 'undefined') return;
  try {
    const payload = {
      colleges: colleges.map((c) => ({
        id: c.id,
        name: c.name,
        coords: c.coords,
        students: c.students ?? [],
      })),
      origin: origin ? { name: origin.name, coords: origin.coords } : null,
      originInput: originInput ?? '',
    };
    localStorage.setItem(STORAGE_KEY, JSON.stringify(payload));
  } catch {
    /* ignore */
  }
}

export default function MapClient() {
  const containerRef = useRef(null);
  const mapRef = useRef(null);
  const layersRef = useRef([]);

  const [mounted, setMounted] = useState(false);
  const [colleges, setColleges] = useState([]);
  const [collegeName, setCollegeName] = useState('');
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');
  const [origin, setOrigin] = useState(null);
  const [originInput, setOriginInput] = useState('');
  const [originLoading, setOriginLoading] = useState(false);
  const [hydrated, setHydrated] = useState(false);

  // Restore from localStorage on mount (client-only)
  useEffect(() => {
    const saved = loadMapState();
    if (saved) {
      setColleges(saved.colleges);
      setOrigin(saved.origin);
      setOriginInput(saved.originInput);
    }
    setHydrated(true);
  }, []);

  // Persist to localStorage whenever colleges or origin change
  useEffect(() => {
    if (!hydrated || typeof window === 'undefined') return;
    saveMapState(colleges, origin, originInput);
  }, [hydrated, colleges, origin, originInput]);

  // Create map once when container is available
  useEffect(() => {
    if (!mounted || !containerRef.current || mapRef.current) return;
    mapRef.current = L.map(containerRef.current).setView([39.8283, -98.5795], 4);
    L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
      attribution: '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a>',
    }).addTo(mapRef.current);
    return () => {
      if (mapRef.current) {
        mapRef.current.remove();
        mapRef.current = null;
      }
      layersRef.current = [];
    };
  }, [mounted]);

  // Update markers and polylines when colleges or origin change
  useEffect(() => {
    const map = mapRef.current;
    if (!map) return;

    layersRef.current.forEach((layer) => map.removeLayer(layer));
    layersRef.current = [];

    if (origin?.coords) {
      const originMarker = L.marker(origin.coords).addTo(map);
      originMarker.bindPopup(`<strong>Origin</strong><br/>${escapeHtml(origin.name)}`);
      layersRef.current.push(originMarker);
    }

    if (origin?.coords) {
      colleges.forEach((college) => {
        const line = L.polyline([origin.coords, college.coords], {
          color: '#94D1BE',
          weight: 2,
          opacity: 0.8,
        }).addTo(map);
        layersRef.current.push(line);
      });
    }

    colleges.forEach((college) => {
      const popupContent =
        `<strong class="text-sm">${escapeHtml(college.name)}</strong>` +
        (college.students?.length
          ? `<div class="mt-2 text-xs"><span class="font-semibold">Students:</span><ul class="list-disc list-inside mt-1">${college.students.map((s) => `<li>${escapeHtml(s)}</li>`).join('')}</ul></div>`
          : '<p class="mt-1 text-xs text-zinc-500">No students added yet.</p>');
      const marker = L.marker(college.coords).addTo(map);
      marker.bindPopup(popupContent, { minWidth: 180 });
      layersRef.current.push(marker);
    });
  }, [mounted, colleges, origin]);

  useEffect(() => {
    const t = setTimeout(() => setMounted(true), 0);
    return () => clearTimeout(t);
  }, []);

  function escapeHtml(text) {
    const div = typeof document !== 'undefined' ? document.createElement('div') : null;
    if (!div) return String(text);
    div.textContent = text;
    return div.innerHTML;
  }

  const addCollege = async () => {
    const name = collegeName.trim();
    if (!name) return;
    const existing = colleges.find((c) => c.name.toLowerCase() === name.toLowerCase());
    if (existing) {
      setError('Already on map.');
      return;
    }
    setError('');
    setLoading(true);
    try {
      const res = await fetch(`/api/colleges/admissions?name=${encodeURIComponent(name)}`);
      const data = await res.json().catch(() => ({}));
      const canonicalName = data.name || name;
      const loc = data.location;
      const lat = loc?.lat ?? FALLBACK_COORDS[canonicalName]?.[0] ?? FALLBACK_COORDS[name]?.[0];
      const lon = loc?.lon ?? FALLBACK_COORDS[canonicalName]?.[1] ?? FALLBACK_COORDS[name]?.[1];
      if (lat != null && lon != null) {
        setColleges((prev) => [...prev, { id: Date.now(), name: canonicalName, coords: [lat, lon], students: [] }]);
        setCollegeName('');
      } else {
        setError('Location not found. Try adding city/state in the Discover page first.');
      }
    } catch (e) {
      setError('Could not load school.');
    } finally {
      setLoading(false);
    }
  };

  const removeCollege = (id) => {
    setColleges((prev) => prev.filter((c) => c.id !== id));
  };

  const addStudents = (id, text) => {
    const names = text
      .split(/[,;]/)
      .map((s) => s.trim())
      .filter(Boolean);
    setColleges((prev) =>
      prev.map((c) => (c.id === id ? { ...c, students: [...new Set([...c.students, ...names])] } : c))
    );
  };

  const setStudentInput = (id, value) => {
    setColleges((prev) => prev.map((c) => (c.id === id ? { ...c, studentInput: value } : c)));
  };

  const removeStudent = (collegeId, studentName) => {
    setColleges((prev) =>
      prev.map((c) => (c.id === collegeId ? { ...c, students: c.students.filter((s) => s !== studentName) } : c))
    );
  };

  const setOriginFromPlace = async () => {
    const q = originInput.trim();
    if (!q) return;
    setOriginLoading(true);
    setError('');
    try {
      const res = await fetch(
        `https://nominatim.openstreetmap.org/search?q=${encodeURIComponent(q)}&format=json&limit=1`
      );
      const data = await res.json();
      if (data?.[0]) {
        setOrigin({ name: data[0].display_name, coords: [parseFloat(data[0].lat), parseFloat(data[0].lon)] });
      } else {
        setError('Origin place not found.');
      }
    } catch (e) {
      setError('Could not look up origin.');
    } finally {
      setOriginLoading(false);
    }
  };

  const clearOrigin = () => {
    setOrigin(null);
    setOriginInput('');
  };

  if (!mounted) {
    return (
      <div className="w-full rounded-card border border-border bg-surface flex items-center justify-center text-muted-foreground text-sm" style={{ height: '400px' }}>
        Loading map...
      </div>
    );
  }

  return (
    <div className="flex flex-col lg:flex-row gap-6 w-full">
      <div className="lg:w-2/3 flex flex-col gap-4">
        <div className="flex flex-wrap gap-2">
          <input
            type="text"
            value={collegeName}
            onChange={(e) => setCollegeName(e.target.value)}
            onKeyDown={(e) => e.key === 'Enter' && addCollege()}
            placeholder="Add a college by name"
            className="flex-1 min-w-[180px] bg-surface border border-border rounded-input px-3 py-2.5 text-white placeholder-muted text-sm focus:outline-none focus:ring-2 focus:ring-primary/50 focus:border-primary"
          />
          <button
            type="button"
            onClick={addCollege}
            disabled={loading}
            className="bg-primary text-black font-medium px-5 py-2.5 rounded-button hover:bg-primary-hover disabled:opacity-50 text-sm"
          >
            {loading ? 'Adding...' : 'Add college'}
          </button>
        </div>
        <div className="flex flex-wrap gap-2 items-center">
          <input
            type="text"
            value={originInput}
            onChange={(e) => setOriginInput(e.target.value)}
            onKeyDown={(e) => e.key === 'Enter' && setOriginFromPlace()}
            placeholder="Origin (e.g. city name) for arrows"
            className="flex-1 min-w-[180px] bg-surface border border-border rounded-input px-3 py-2.5 text-white placeholder-muted text-sm focus:outline-none focus:ring-2 focus:ring-primary/50 focus:border-primary"
          />
          <button
            type="button"
            onClick={setOriginFromPlace}
            disabled={originLoading}
            className="bg-surface border border-border text-white font-medium px-4 py-2.5 rounded-button hover:bg-surface-hover disabled:opacity-50 text-sm"
          >
            {originLoading ? '...' : 'Set origin'}
          </button>
          {origin && (
            <button type="button" onClick={clearOrigin} className="text-muted hover:text-red-400 text-sm">
              Clear origin
            </button>
          )}
        </div>
        {error && <p className="text-red-400 text-sm">{error}</p>}
        <div
          ref={containerRef}
          className="w-full rounded-card overflow-hidden border border-border bg-surface"
          style={{ height: '400px' }}
        />
      </div>

      <div className="lg:w-1/3 space-y-4">
        <h3 className="text-white font-medium text-sm">Colleges & students</h3>
        {colleges.length === 0 ? (
          <p className="text-muted-foreground text-sm">Add colleges above. Then add student names for each (comma-separated).</p>
        ) : (
          <ul className="space-y-4">
            {colleges.map((c) => (
              <li key={c.id} className="bg-surface border border-border rounded-card p-4">
                <div className="flex items-center justify-between gap-2 mb-2">
                  <span className="text-white font-medium text-sm truncate">{c.name}</span>
                  <button
                    type="button"
                    onClick={() => removeCollege(c.id)}
                    className="text-muted hover:text-red-400 shrink-0 text-sm"
                    aria-label="Remove college"
                  >
                    ×
                  </button>
                </div>
                <div className="flex gap-2 mb-2">
                  <input
                    type="text"
                    value={c.studentInput ?? ''}
                    onChange={(e) => setStudentInput(c.id, e.target.value)}
                    onKeyDown={(e) => e.key === 'Enter' && (addStudents(c.id, c.studentInput ?? ''), setStudentInput(c.id, ''))}
                    placeholder="Student names (comma-separated)"
                    className="flex-1 min-w-0 bg-background border border-border rounded-input px-3 py-2 text-white placeholder-muted text-sm focus:outline-none focus:ring-2 focus:ring-primary/50"
                  />
                  <button
                    type="button"
                    onClick={() => (addStudents(c.id, c.studentInput ?? ''), setStudentInput(c.id, ''))}
                    className="bg-primary text-black font-medium px-3 py-2 rounded-button text-sm shrink-0 hover:bg-primary-hover"
                  >
                    Add
                  </button>
                </div>
                {c.students?.length > 0 && (
                  <ul className="mt-2 space-y-1">
                    {c.students.map((name) => (
                      <li key={name} className="flex items-center gap-2 text-sm text-muted-foreground">
                        <span className="text-primary">→</span>
                        <span className="flex-1 truncate">{name}</span>
                        <button
                          type="button"
                          onClick={() => removeStudent(c.id, name)}
                          className="text-muted hover:text-red-400"
                          aria-label={`Remove ${name}`}
                        >
                          ×
                        </button>
                      </li>
                    ))}
                  </ul>
                )}
              </li>
            ))}
          </ul>
        )}
      </div>
    </div>
  );
}
