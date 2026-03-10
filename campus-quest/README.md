# CampusQuest

A Next.js app for discovering and comparing US colleges using the College Scorecard API. Explore acceptance rates, tuition, locations, view schools on a map, and compare them side-by-side.

## Features

- **Discover** — Search and browse colleges; view acceptance rate, tuition, room & board, and location
- **Compare** — Add up to 4 schools and see a side-by-side comparison table
- **Map** — Add colleges and see their locations on an interactive US map
- **Statistics** — Sample stats from the College Scorecard dataset (average tuition, acceptance rate, top states)
- **Sign in** — Optional credential-based auth (configure via env)

## Stack

- **Frontend:** React, Next.js 15, Tailwind CSS
- **Data:** College Scorecard API (api.data.gov)
- **Auth:** NextAuth.js (Credentials provider)
- **Map:** Leaflet / react-leaflet

## Getting Started

### 1. Install dependencies

```bash
cd campus-quest
npm install
```

### 2. Environment variables

Copy `.env.example` to `.env.local` and fill in:

```bash
cp .env.example .env.local
```

- **COLLEGESCORECARD_API_KEY** — Required for Discover, Compare, Map, and Statistics. Get a key at [api.data.gov/signup](https://api.data.gov/signup/).
- **NEXTAUTH_SECRET** — Required for sign-in. Use a random string (e.g. `openssl rand -base64 32`).
- **NEXTAUTH_URL** — Your app URL (e.g. `http://localhost:3001` for local dev).
- **AUTH_EMAIL** and **AUTH_PASSWORD** — Optional. If set, users can sign in with this email/password.

### 3. Run locally

```bash
npm run dev
```

Open [http://localhost:3001](http://localhost:3001).

### 4. Build

```bash
npm run build
npm start
```

## Deploy on Vercel

The repo root contains a `vercel.json` that sets **Root Directory** to `campus-quest`, so the Next app is built from that folder.

1. Push your code to GitHub.
2. Go to [vercel.com](https://vercel.com) and import the repository.
3. Leave **Root Directory** as `campus-quest` (or set it if you use the default).
4. Add environment variables in the Vercel project:
   - `COLLEGESCORECARD_API_KEY`
   - `NEXTAUTH_SECRET`
   - `NEXTAUTH_URL` (e.g. `https://your-app.vercel.app`)
   - Optionally: `AUTH_EMAIL`, `AUTH_PASSWORD`
5. Deploy.

Or use the Vercel CLI from the repo root:

```bash
vercel login
vercel
```

Then add the same env vars in the Vercel dashboard for the project.

## Project structure

- `src/app/` — App Router pages and layout
- `src/app/api/` — API routes (auth, colleges admissions, colleges stats)
- `src/app/discover/` — Discover page and search/icon helpers
- `src/app/map/` — Map page (client-only Leaflet)
- `src/app/compare/` — Compare page
- `src/app/statistics/` — Statistics page
- `src/app/signin/` — Sign-in page

## License

See repository LICENSE.
