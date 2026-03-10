import { NextResponse } from 'next/server';

export async function GET() {
  const apiKey = process.env.COLLEGESCORECARD_API_KEY;
  if (!apiKey) {
    return NextResponse.json(
      { error: 'API key not configured' },
      { status: 503 }
    );
  }

  const url = `https://api.data.gov/ed/collegescorecard/v1/schools.json?api_key=${apiKey}&per_page=100&sort=latest.student.size:desc`;
  try {
    const res = await fetch(url);
    if (!res.ok) return NextResponse.json({ error: 'Failed to fetch' }, { status: 502 });
    const json = await res.json();
    const results = json.results || [];

    let totalTuition = 0;
    let tuitionCount = 0;
    let totalAdmission = 0;
    let admissionCount = 0;
    const byState = {};

    for (const r of results) {
      const state = r.school?.state;
      if (state) byState[state] = (byState[state] || 0) + 1;
      const tuition = r.latest?.cost?.tuition?.in_state;
      if (typeof tuition === 'number') {
        totalTuition += tuition;
        tuitionCount++;
      }
      const rate = r.latest?.admissions?.admission_rate?.overall;
      if (typeof rate === 'number') {
        totalAdmission += rate;
        admissionCount++;
      }
    }

    const topStates = Object.entries(byState)
      .sort((a, b) => b[1] - a[1])
      .slice(0, 10)
      .map(([state, count]) => ({ state, count }));

    return NextResponse.json({
      totalSchools: results.length,
      averageTuition: tuitionCount ? Math.round(totalTuition / tuitionCount) : null,
      averageAdmissionRate: admissionCount ? (totalAdmission / admissionCount) : null,
      topStates,
    });
  } catch (e) {
    console.error(e);
    return NextResponse.json({ error: 'Failed to fetch stats' }, { status: 502 });
  }
}
