import { NextResponse } from 'next/server';

const STATE_ABBR_TO_NAME = {
  AZ: 'Arizona', AL: 'Alabama', AK: 'Alaska', AR: 'Arkansas', CA: 'California',
  CO: 'Colorado', CT: 'Connecticut', DE: 'Delaware', FL: 'Florida', GA: 'Georgia',
  HI: 'Hawaii', ID: 'Idaho', IL: 'Illinois', IN: 'Indiana', IA: 'Iowa',
  KS: 'Kansas', KY: 'Kentucky', LA: 'Louisiana', ME: 'Maine', MD: 'Maryland',
  MA: 'Massachusetts', MI: 'Michigan', MN: 'Minnesota', MS: 'Mississippi',
  MO: 'Missouri', MT: 'Montana', NE: 'Nebraska', NV: 'Nevada', NH: 'New Hampshire',
  NJ: 'New Jersey', NM: 'New Mexico', NY: 'New York', NC: 'North Carolina',
  ND: 'North Dakota', OH: 'Ohio', OK: 'Oklahoma', OR: 'Oregon', PA: 'Pennsylvania',
  RI: 'Rhode Island', SC: 'South Carolina', SD: 'South Dakota', TN: 'Tennessee',
  TX: 'Texas', UT: 'Utah', VT: 'Vermont', VA: 'Virginia', WA: 'Washington',
  WV: 'West Virginia', WI: 'Wisconsin', WY: 'Wyoming', DC: 'District of Columbia',
};

// Levenshtein distance (edit distance)
function levenshtein(a, b) {
  const m = a.length;
  const n = b.length;
  const dp = Array(m + 1)
    .fill(null)
    .map(() => Array(n + 1).fill(0));
  for (let i = 0; i <= m; i++) dp[i][0] = i;
  for (let j = 0; j <= n; j++) dp[0][j] = j;
  for (let i = 1; i <= m; i++) {
    for (let j = 1; j <= n; j++) {
      const cost = a[i - 1] === b[j - 1] ? 0 : 1;
      dp[i][j] = Math.min(
        dp[i - 1][j] + 1,
        dp[i][j - 1] + 1,
        dp[i - 1][j - 1] + cost
      );
    }
  }
  return dp[m][n];
}

// Normalize for matching: lowercase, collapse spaces, remove common suffixes for comparison
function normalize(s) {
  return (s || '')
    .toLowerCase()
    .replace(/\s+/g, ' ')
    .trim()
    .replace(/\b(university|college|institute|school|of)\b/gi, '')
    .replace(/\s+/g, ' ')
    .trim();
}

// Combined similarity 0–1: substring boost, then bigram + Levenshtein
function similarity(query, target) {
  if (!query || !target) return 0;
  const q = query.toLowerCase().replace(/\s+/g, ' ').trim();
  const t = target.toLowerCase().replace(/\s+/g, ' ').trim();
  if (q === t) return 1;
  if (t.includes(q) || q.includes(t)) return 0.92;

  const nq = normalize(q);
  const nt = normalize(t);
  if (nq === nt) return 0.95;
  if (nt.includes(nq) || nq.includes(nt)) return 0.88;

  const bigrams = (s) => {
    const set = new Set();
    for (let i = 0; i < s.length - 1; i++) set.add(s.slice(i, i + 2));
    return set;
  };
  const bq = bigrams(q);
  const bt = bigrams(t);
  let hit = 0;
  bq.forEach((bg) => { if (bt.has(bg)) hit++; });
  const dice = (2 * hit) / (bq.size + bt.size) || 0;

  const maxLen = Math.max(q.length, t.length);
  const levDist = levenshtein(q, t);
  const levScore = 1 - levDist / maxLen;

  const firstWordQ = q.split(/\s+/)[0] || q;
  const firstWordT = t.split(/\s+/)[0] || t;
  const firstWordSim = firstWordQ.length >= 3 && firstWordT.length >= 3
    ? 1 - levenshtein(firstWordQ, firstWordT) / Math.max(firstWordQ.length, firstWordT.length)
    : 0;

  return Math.min(1, Math.max(dice, levScore * 1.05, firstWordSim * 0.85));
}

const KNOWN_SCHOOLS = [
  'Harvard University', 'Stanford University', 'MIT', 'Massachusetts Institute of Technology',
  'Yale University', 'Princeton University', 'Columbia University', 'Cornell University',
  'University of California Berkeley', 'UCLA', 'University of California Los Angeles',
  'University of Michigan', 'University of Virginia', 'Duke University', 'Northwestern University',
  'Brown University', 'Dartmouth College', 'University of Pennsylvania', 'Penn',
  'California Institute of Technology', 'Caltech', 'Carnegie Mellon University', 'CMU',
  'New York University', 'NYU', 'Boston University', 'Boston College', 'Georgetown University',
  'University of Texas at Austin', 'University of North Carolina Chapel Hill', 'UNC',
  'Vanderbilt University', 'Rice University', 'Emory University', 'Notre Dame',
  'University of Florida', 'University of Washington', 'University of Illinois Urbana-Champaign',
  'University of Wisconsin Madison', 'Ohio State University', 'University of Southern California', 'USC',
  'Georgia Institute of Technology', 'Georgia Tech', 'Purdue University', 'University of Maryland',
  'University of Minnesota', 'Texas A&M University', 'University of Pittsburgh', 'Syracuse University',
];

const CACHE_TTL_MS = 5 * 60 * 1000;
const cache = new Map();
const geoCache = new Map();
const GEO_CACHE_TTL_MS = 24 * 60 * 60 * 1000;

function getCached(key) {
  const entry = cache.get(key);
  if (!entry || Date.now() > entry.exp) {
    if (entry) cache.delete(key);
    return null;
  }
  return entry.data;
}

function setCache(key, data) {
  cache.set(key, { data, exp: Date.now() + CACHE_TTL_MS });
}

async function geocode(name, city, state) {
  const key = [name, city, state].filter(Boolean).join('|').toLowerCase();
  const hit = geoCache.get(key);
  if (hit && Date.now() < hit.exp) return hit.data;
  const queries = [];
  if (name && (city || state)) queries.push(`${name}, ${[city, state].filter(Boolean).join(', ')}, USA`);
  if (city && state) queries.push(`${city}, ${state}, USA`);
  if (state) queries.push(`${state}, USA`);
  const headers = { 'User-Agent': 'CampusQuest/1.0 (school map)' };
  for (const q of queries) {
    try {
      const res = await fetch(
        `https://nominatim.openstreetmap.org/search?q=${encodeURIComponent(q)}&format=json&limit=1`,
        { headers }
      );
      const data = await res.json();
      if (data?.[0]) {
        const lat = parseFloat(data[0].lat);
        const lon = parseFloat(data[0].lon);
        if (Number.isFinite(lat) && Number.isFinite(lon)) {
          const result = { lat, lon };
          geoCache.set(key, { data: result, exp: Date.now() + GEO_CACHE_TTL_MS });
          return result;
        }
      }
    } catch (e) {
      /* try next query */
    }
  }
  return null;
}

function buildResponse(school) {
  const latest = school.latest;
  const admissionRate = latest?.admissions?.admission_rate?.overall;
  const tuition = latest?.cost?.tuition?.in_state;
  const roomBoard = latest?.cost?.roomboard?.oncampus;
  const city = school.school?.city ?? null;
  const stateAbbr = school.school?.state ?? null;
  const state = stateAbbr ? (STATE_ABBR_TO_NAME[stateAbbr] || stateAbbr) : null;
  const lat = school.school?.location?.lat;
  const lon = school.school?.location?.lon;
  const location = (lat != null && lon != null) ? { lat: Number(lat), lon: Number(lon) } : null;
  return {
    name: school.school?.name ?? null,
    acceptanceRate: admissionRate != null ? Number(admissionRate) : null,
    tuitionCost: tuition != null ? tuition.toLocaleString() : null,
    roomBoardCost: roomBoard != null ? roomBoard.toLocaleString() : null,
    city,
    state,
    location,
  };
}

export async function GET(request) {
  const { searchParams } = new URL(request.url);
  const raw = searchParams.get('name');
  if (!raw || typeof raw !== 'string') {
    return NextResponse.json({ error: 'Missing or invalid name' }, { status: 400 });
  }

  const name = raw.replace(/\s+/g, ' ').trim();
  if (!name) {
    return NextResponse.json({ error: 'Missing or invalid name' }, { status: 400 });
  }

  const apiKey = process.env.COLLEGESCORECARD_API_KEY;
  if (!apiKey) {
    return NextResponse.json(
      { error: 'API key not configured' },
      { status: 503 }
    );
  }

  const cacheKey = name.toLowerCase();
  const cached = getCached(cacheKey);
  if (cached) return NextResponse.json(cached);

  const fetchFromApi = async (query) => {
    const url = `https://api.data.gov/ed/collegescorecard/v1/schools.json?api_key=${apiKey}&school.name=${encodeURIComponent(query)}&per_page=20`;
    const res = await fetch(url);
    if (!res.ok) return { results: [] };
    const json = await res.json();
    return json;
  };

  try {
    let json = await fetchFromApi(name);
    let results = json.results || [];

    if (results.length === 0) {
      const scored = KNOWN_SCHOOLS.map((canon) => ({ canon, score: similarity(name, canon) }))
        .filter((x) => x.score > 0.4)
        .sort((a, b) => b.score - a.score);
      const best = scored[0];
      if (best) {
        json = await fetchFromApi(best.canon);
        results = json.results || [];
      }
    }

    if (results.length === 0) {
      const firstWord = name.split(/\s+/)[0];
      if (firstWord && firstWord.length >= 2) {
        json = await fetchFromApi(firstWord);
        results = json.results || [];
      }
    }

    if (results.length === 0) {
      return NextResponse.json(
        { error: 'No school found. Try a different name or spelling.' },
        { status: 404 }
      );
    }

    const queryNorm = name.toLowerCase();
    const scored = results
      .filter((r) => r.school?.name && r.latest)
      .map((r) => ({
        school: r,
        score: similarity(queryNorm, (r.school?.name || '').toLowerCase()),
      }))
      .sort((a, b) => b.score - a.score);

    const best = scored[0];
    if (!best || best.score < 0.2) {
      return NextResponse.json(
        { error: 'No school found. Try a different name or spelling.' },
        { status: 404 }
      );
    }

    const out = buildResponse(best.school);
    if (!out.location && (out.city || out.state || out.name)) {
      const coords = await geocode(out.name, out.city, out.state);
      if (coords) out.location = coords;
    }
    setCache(cacheKey, out);
    return NextResponse.json(out);
  } catch (e) {
    console.error('College Scorecard API error:', e);
    return NextResponse.json(
      { error: 'Failed to fetch school data' },
      { status: 502 }
    );
  }
}
