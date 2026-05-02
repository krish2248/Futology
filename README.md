# FUTOLOGY ⚽

> Every Goal. Every Emotion. Every Insight.

The definitive football intelligence platform — live scores, ML-powered match prediction, player playing-style clusters, live community sentiment, tactical breakdowns, transfer-value prediction and fantasy squad optimization. One unified dark interface, one URL, one login.

**🚀 Live demo:** **https://krish2248.github.io/futology/**

The demo runs against deterministic seed data so every feature works without backend keys. Deploy is automated from `main` via GitHub Actions (`.github/workflows/deploy.yml`).

---

## 📁 Project Structure

```
Sick-Boy/
├── .github/
│   └── workflows/
│       └── deploy.yml              # GitHub Actions CI/CD for static export
├── futology/                       # Next.js 14 Application
│   ├── app/                        # App Router Pages
│   │   ├── layout.tsx              # Root layout (Navbar, MobileNav, AuthGate, Providers)
│   │   ├── page.tsx                # Homepage (Hero, Quick Links, Snapshot, News)
│   │   ├── loading.tsx             # Custom loading UI
│   │   ├── not-found.tsx           # Custom 404 page
│   │   ├── globals.css             # Global styles
│   │   ├── icon.svg                # Favicon
│   │   ├── HomeLive.tsx            # Live matches section on homepage
│   │   ├── HomeNews.tsx            # Personalized news section on homepage
│   │   ├── login/
│   │   │   └── page.tsx           # Login page with magic link simulation
│   │   ├── onboarding/
│   │   │   └── page.tsx           # 3-step onboarding flow
│   │   ├── scores/
│   │   │   ├── page.tsx           # Scores & Fixtures page wrapper
│   │   │   └── ScoresView.tsx     # Match list with status filters
│   │   ├── predictions/
│   │   │   ├── page.tsx           # Predictions page wrapper
│   │   │   └── PredictionsView.tsx # AI + My Predictions + Leagues + Community
│   │   ├── news/
│   │   │   ├── page.tsx           # News page wrapper
│   │   │   └── NewsView.tsx       # Category-filtered news feed
│   │   ├── clubs/
│   │   │   ├── page.tsx           # Clubs listing page
│   │   │   ├── ClubsView.tsx      # Followed + Popular clubs
│   │   │   └── [clubId]/
│   │   │       ├── page.tsx       # Club detail page wrapper
│   │   │       └── ClubDetailView.tsx # Club information & stats
│   │   ├── leagues/
│   │   │   ├── page.tsx           # Leagues listing
│   │   │   └── [leagueId]/
│   │   │       ├── page.tsx       # League detail page wrapper
│   │   │       └── LeagueDetailView.tsx # Standings, matches, stats
│   │   ├── players/
│   │   │   ├── page.tsx           # Players listing wrapper
│   │   │   └── [playerId]/
│   │   │       ├── page.tsx       # Player detail page wrapper
│   │   │       └── PlayerDetailView.tsx # Player stats & comparisons
│   │   ├── tournaments/
│   │   │   └── page.tsx           # Tournaments page (Phase 2)
│   │   ├── profile/
│   │   │   ├── page.tsx           # Profile page wrapper
│   │   │   ├── ProfileView.tsx    # User info, following, stats
│   │   │   └── settings/
│   │   │       ├── page.tsx       # Settings page wrapper
│   │   │       └── SettingsView.tsx # Notifications, preferences, danger zone
│   │   └── intelligence/          # ML & Analytics Hub
│   │       ├── page.tsx           # Intelligence Hub landing
│   │       ├── match/
│   │       │   ├── page.tsx       # Match Predictor wrapper
│   │       │   └── MatchPredictorView.tsx # Team picker + prediction
│   │       ├── players/
│   │       │   ├── page.tsx       # Player Pulse wrapper
│   │       │   └── PlayerPulseView.tsx # Player stats & comparisons
│   │       ├── sentiment/
│   │       │   ├── page.tsx       # Sentiment Storm wrapper
│   │       │   └── SentimentStormView.tsx # Live sentiment tracking
│   │       ├── tactics/
│   │       │   ├── page.tsx       # TacticBoard wrapper
│   │       │   └── TacticBoardView.tsx # Formation & tactics analysis
│   │       ├── transfer/
│   │       │   ├── page.tsx       # Transfer Oracle wrapper
│   │       │   └── TransferOracleView.tsx # Transfer value prediction
│   │       ├── fantasy/
│   │       │   ├── page.tsx       # Fantasy IQ wrapper
│   │       │   └── FantasyIQView.tsx # Squad optimizer
│   │       └── extras/            # Bonus Features
│   │           ├── page.tsx       # Extras hub
│   │           ├── injuries/
│   │           ├── momentum/
│   │           ├── odds/
│   │           ├── press-intensity/
│   │           ├── referee-bias/
│   │           ├── tournament-simulator/
│   │           └── weather/
│   ├── components/                 # Reusable Components
│   │   ├── layout/
│   │   │   ├── Navbar.tsx         # Main navigation bar
│   │   │   ├── MobileNav.tsx      # Mobile bottom navigation
│   │   │   ├── AuthGate.tsx       # Route protection wrapper
│   │   │   └── NotificationBell.tsx # Notification dropdown
│   │   ├── shared/
│   │   │   ├── Toggle.tsx         # Accessible toggle/switch
│   │   │   ├── ErrorBoundary.tsx  # Error boundary with fallback UI
│   │   │   ├── ApiError.tsx       # API error display
│   │   │   ├── SearchModal.tsx    # Global search modal
│   │   │   ├── StatTile.tsx       # Statistic display tile
│   │   │   ├── EmptyState.tsx     # Empty state component
│   │   │   ├── LiveBadge.tsx      # Live indicator badge
│   │   │   ├── Card.tsx           # Container with surface styling
│   │   │   └── PageHeader.tsx     # Page header with actions
│   │   ├── cards/
│   │   │   ├── MatchCard.tsx      # Match display card
│   │   │   ├── MatchDetailSheet.tsx # Slide-in match details
│   │   │   ├── NewsCard.tsx       # News article card
│   │   │   └── StandingsTable.tsx # League standings table
│   │   ├── predictions/
│   │   │   ├── PredictionCard.tsx # ML prediction display
│   │   │   ├── PredictionForm.tsx # Prediction form
│   │   │   ├── ScoresPicker.tsx   # Interactive score picker
│   │   │   ├── WinProbabilityBar.tsx # Win probability visualization
│   │   │   ├── MyPredictions.tsx  # User's predictions list
│   │   │   ├── PredictionLeagues.tsx # League management
│   │   │   └── CommunityTab.tsx  # Community features
│   │   ├── intelligence/
│   │   │   ├── FantasyPitch.tsx   # Fantasy pitch visualization
│   │   │   ├── PitchSVG.tsx       # SVG football pitch
│   │   │   ├── SentimentGauge.tsx # Sentiment gauge (-1 to 1)
│   │   │   ├── SentimentTimeline.tsx # Sentiment over time
│   │   │   ├── PlayerPicker.tsx   # Searchable player dropdown
│   │   │   ├── PlayerComparisonRadar.tsx # Radar chart comparison
│   │   │   ├── PlayerClusterChart.tsx # Player cluster scatter plot
│   │   │   └── TeamPicker.tsx     # Searchable team dropdown
│   │   └── providers/
│   │       └── Providers.tsx       # React Query wrapper
│   ├── hooks/                      # Custom React Hooks
│   │   ├── useLiveScores.ts       # Live scores polling (30s)
│   │   └── useHydratedSession.ts  # Client-side hydration check
│   ├── lib/                        # Utilities & Logic
│   │   ├── api/
│   │   │   ├── client.ts          # API client (demo mode)
│   │   │   └── config.ts          # API configuration
│   │   ├── ml/
│   │   │   ├── predictor.ts       # Match prediction (seeded RNG)
│   │   │   ├── transfer.ts        # Transfer value prediction
│   │   │   └── tournamentSim.ts  # Monte Carlo tournament simulation
│   │   ├── store/
│   │   │   ├── session.ts         # Zustand session store
│   │   │   └── preferences.ts     # Notification preferences store
│   │   ├── data/                   # Demo/Seed Data
│   │   │   ├── demoMatches.ts
│   │   │   ├── demoMatchDetail.ts
│   │   │   ├── demoStandings.ts
│   │   │   ├── demoNews.ts
│   │   │   ├── demoPredictions.ts
│   │   │   ├── demoPlayerStats.ts
│   │   │   ├── demoCommunity.ts
│   │   │   ├── demoFantasy.ts
│   │   │   ├── demoLeagues.ts
│   │   │   ├── demoOdds.ts
│   │   │   ├── demoInjuries.ts
│   │   │   ├── demoMomentum.ts
│   │   │   ├── demoPress.ts
│   │   │   ├── demoWeather.ts
│   │   │   ├── demoReferees.ts
│   │   │   ├── leagues.ts
│   │   │   ├── clubs.ts
│   │   │   ├── players.ts
│   │   │   ├── tournaments.ts
│   │   │   └── playerClusters.ts
│   │   ├── constants/
│   │   │   ├── intelligence.ts   # INTEL_FEATURES array
│   │   │   ├── extras.ts         # EXTRA_FEATURES array
│   │   │   └── navigation.ts     # PRIMARY_NAV, SECONDARY_NAV
│   │   └── utils/
│   │       ├── cn.ts              # Tailwind class merger
│   │       └── format.ts          # Date/score formatting
│   ├── next.config.js              # Next.js config (static export)
│   ├── tailwind.config.ts          # Tailwind configuration
│   ├── postcss.config.js           # PostCSS configuration
│   ├── tsconfig.json               # TypeScript configuration
│   ├── package.json                # Dependencies
│   ├── .eslintrc.json              # ESLint configuration
│   ├── .env.example                # Environment variables template
│   └── public/
│       ├── manifest.json
│       ├── robots.txt
│       └── icon.svg
├── PROJECT_Sick-Boy.md             # Project bible (vision, tech stack, schema)
├── SESSION.md                      # Living session log
├── README.md                       # This file
└── .gitignore
```

---

## 🚀 Features & Functions

### Layout Components

| Component | File | Description |
|-----------|------|-------------|
| **Navbar** | `components/layout/Navbar.tsx` | Main navigation with primary/secondary links, search button, notification bell. Keyboard shortcuts: Cmd+K, / |
| **MobileNav** | `components/layout/MobileNav.tsx` | Mobile bottom nav with 5 primary items. Hidden on login/onboarding |
| **AuthGate** | `components/layout/AuthGate.tsx` | Route protection wrapper. Redirects unauthenticated users to /login |
| **NotificationBell** | `components/layout/NotificationBell.tsx` | Notification dropdown with unread badge, time-ago formatting |
| **Providers** | `components/providers/Providers.tsx` | React Query (TanStack Query) wrapper with staleTime, gcTime, retry config |

### Shared Components

| Component | File | Description |
|-----------|------|-------------|
| **Toggle** | `components/shared/Toggle.tsx` | Accessible toggle/switch with aria-checked support |
| **ErrorBoundary** | `components/shared/ErrorBoundary.tsx` | Class component error boundary with fallback UI and reset() |
| **ApiError** | `components/shared/ApiError.tsx` | API error display with icon, message, retry button |
| **SearchModal** | `components/shared/SearchModal.tsx` | Global search with tabs (all/teams/players/leagues), debounced search, keyboard navigation |
| **StatTile** | `components/shared/StatTile.tsx` | Statistic display with label, value, optional hint |
| **EmptyState** | `components/shared/EmptyState.tsx` | Empty state with icon, title, description, action button |
| **LiveBadge** | `components/shared/LiveBadge.tsx` | Live indicator badge (full/dot variant) with pulse animation |
| **Card** | `components/shared/Card.tsx` | Container with surface styling, hover effect, elevated variant |
| **PageHeader** | `components/shared/PageHeader.tsx` | Page header with title, description, action button |

### Prediction Components

| Component | File | Description |
|-----------|------|-------------|
| **PredictionCard** | `components/predictions/PredictionCard.tsx` | ML prediction display: win probabilities, score, confidence, factors. Confetti animation |
| **PredictionForm** | `components/predictions/PredictionForm.tsx` | User prediction form with ML hints, score pickers, save/delete |
| **ScoresPicker** | `components/predictions/ScoresPicker.tsx` | Interactive score picker (+/- buttons, 0-9 range). Includes SideColumn |
| **WinProbabilityBar** | `components/predictions/WinProbabilityBar.tsx` | Visual bar: home/draw/away probabilities with percentages |
| **MyPredictions** | `components/predictions/MyPredictions.tsx` | User's upcoming/settled predictions. Auto-settles finished matches |
| **PredictionLeagues** | `components/predictions/PredictionLeagues.tsx` | League management: create, join (invite code), leave. Includes LeagueCard, LeagueDetail |
| **CommunityTab** | `components/predictions/CommunityTab.tsx` | Community features: polls, trending predictions, accuracy leaders |

### Intelligence Components

| Component | File | Description |
|-----------|------|-------------|
| **FantasyPitch** | `components/intelligence/FantasyPitch.tsx` | Fantasy pitch visualization with starters and captain |
| **PitchSVG** | `components/intelligence/PitchSVG.tsx` | SVG football pitch with accurate proportions. Includes PitchMarker |
| **SentimentGauge** | `components/intelligence/SentimentGauge.tsx` | SVG gauge (-1 to 1) with needle, color coding, mood labels |
| **SentimentTimeline** | `components/intelligence/SentimentTimeline.tsx` | SVG timeline chart: home/away sentiment over minutes |
| **PlayerPicker** | `components/intelligence/PlayerPicker.tsx` | Searchable player dropdown with position badges, cluster colors |
| **PlayerComparisonRadar** | `components/intelligence/PlayerComparisonRadar.tsx` | SVG radar chart: goals, assists, creativity, pressing, defending, passing |
| **PlayerClusterChart** | `components/intelligence/PlayerClusterChart.tsx` | SVG scatter plot: creative output vs defensive activity |
| **TeamPicker** | `components/intelligence/TeamPicker.tsx` | Searchable team dropdown with league filtering |

### Card Components

| Component | File | Description |
|-----------|------|-------------|
| **MatchCard** | `components/cards/MatchCard.tsx` | Match card: live/finished/scheduled states. Includes Team, ScoreOrTime, LiveStrip |
| **MatchDetailSheet** | `components/cards/MatchDetailSheet.tsx` | Slide-in sheet with 6 tabs: Overview, Predict, Stats, Lineups, Events, H2H |
| **NewsCard** | `components/cards/NewsCard.tsx` | News card with category badge, personalized indicator, time-ago |
| **StandingsTable** | `components/cards/StandingsTable.tsx` | League standings with position bands (UCL, UEL, Relegation) |

### Custom Hooks

| Hook | File | Description |
|------|------|-------------|
| **useLiveScores** | `hooks/useLiveScores.ts` | Fetches live scores with 30-second polling |
| **useFixtures** | `hooks/useLiveScores.ts` | Fetches fixtures filtered by league, team, or status |
| **useMatchDetail** | `hooks/useLiveScores.ts` | Fetches detailed match info by fixture ID |
| **useStandings** | `hooks/useLiveScores.ts` | Fetches league standings by league ID |
| **useIsClient** | `hooks/useHydratedSession.ts` | Returns true after client-side hydration |

### State Management (Zustand Stores)

| Store | File | Description |
|-------|------|-------------|
| **useSession** | `lib/store/session.ts` | Session state: user, onboarding, followed items, predictions (CRUD), leagues, polls, notifications |
| **useNotificationPreferences** | `lib/store/preferences.ts` | Notification settings: matchStart, goal, transfer, predictionSettled, weeklyDigest |

### API Client Functions

| Function | File | Description |
|----------|------|-------------|
| **api.liveScores** | `lib/api/client.ts` | Returns live matches (demo: synchronous filtered lookup) |
| **api.fixtures** | `lib/api/client.ts` | Returns fixtures filtered by league, team, or status |
| **api.standings** | `lib/api/client.ts` | Returns league standings with rows and bands |
| **api.match** | `lib/api/client.ts` | Returns detailed match data by fixture ID |
| **api.search** | `lib/api/client.ts` | Search across leagues, clubs, players. Returns top 24 results |
| **isDemoMode** | `lib/api/config.ts` | Boolean flag for demo mode |
| **cacheHeaders** | `lib/api/config.ts` | Cache control constants for different data types |

### ML Functions

| Function | File | Description |
|----------|------|-------------|
| **predictMatch** | `lib/ml/predictor.ts` | Generates match prediction with probabilities, score, confidence, factors |
| **seeded** | `lib/ml/predictor.ts` | Seeded PRNG (Lehmer RNG) for reproducible predictions |
| **predictTransferValue** | `lib/ml/transfer.ts` | Predicts player market value with SHAP-style factor breakdown |
| **runSimulation** | `lib/ml/tournamentSim.ts` | Monte Carlo tournament simulation (10,000 runs) for 16-team knockout |
| **simulateRound** | `lib/ml/tournamentSim.ts` | Simulates single tournament round using ELO-based probability |
| **winProb** | `lib/ml/tournamentSim.ts` | Calculates win probability from ELO ratings with home advantage |

### Utility Functions

| Function | File | Description |
|----------|------|-------------|
| **formatKickoff** | `lib/utils/format.ts` | Formats ISO date to "Today · HH:MM", "Tomorrow · HH:MM", or "EEE, D MMM · HH:MM" |
| **formatScore** | `lib/utils/format.ts` | Formats home/away score as "X – Y" or "—" |
| **formatRelativeMinute** | `lib/utils/format.ts` | Formats minute as "X'" or "X'+" for extra time |
| **cn** | `lib/utils/cn.ts` | Merges Tailwind classes using clsx and tailwind-merge |

### Pages

| Page | File | Description |
|------|------|-------------|
| **Home** | `app/page.tsx` | Hero section, quick links, "Jump in" cards, snapshot stats, news |
| **Scores** | `app/scores/ScoresView.tsx` | Live/Scheduled/Finished matches with status filters |
| **Predictions** | `app/predictions/PredictionsView.tsx` | AI Predictions, My Predictions, Leagues, Community tabs |
| **News** | `app/news/NewsView.tsx` | Category filters, All/For You scope toggle, personalized feed |
| **Intelligence Hub** | `app/intelligence/page.tsx` | 6 feature cards + extras section + model performance stats |
| **Match Predictor** | `app/intelligence/match/MatchPredictorView.tsx` | Team picker + prediction with WinProbabilityBar |
| **Player Pulse** | `app/intelligence/players/PlayerPulseView.tsx` | Player stats & comparisons |
| **Sentiment Storm** | `app/intelligence/sentiment/SentimentStormView.tsx` | Live sentiment tracking |
| **TacticBoard** | `app/intelligence/tactics/TacticBoardView.tsx` | Formation & tactics analysis |
| **Transfer Oracle** | `app/intelligence/transfer/TransferOracleView.tsx` | Transfer value prediction with SHAP factors |
| **Fantasy IQ** | `app/intelligence/fantasy/FantasyIQView.tsx` | Squad optimizer with budget, formation, risk tolerance |
| **Clubs** | `app/clubs/ClubsView.tsx` | Followed + Popular clubs listing |
| **Leagues** | `app/leagues/page.tsx` | League listing with flag emojis |
| **Profile** | `app/profile/ProfileView.tsx` | User info, stats, following lists, settings link |
| **Settings** | `app/profile/settings/SettingsView.tsx` | Notification toggles, email preferences, danger zone |
| **Login** | `app/login/page.tsx` | Email form, magic link simulation (demo mode) |
| **Onboarding** | `app/onboarding/page.tsx` | 3-step: Pick leagues → Pick clubs → Players & tournaments |

---

## 🛠 Tech Stack

- **Frontend** — Next.js 14, TypeScript strict, Tailwind, shadcn/ui, Framer Motion, TanStack Query, Recharts/Plotly, Zustand
- **Backend** — Next.js API routes (proxy keys server-side) + Python FastAPI ML microservice
- **ML** — XGBoost, KMeans + PCA, HuggingFace transformers, PuLP, SHAP
- **Data** — Supabase (Postgres + Auth + Realtime + Storage), Upstash Redis
- **Hosting** — Vercel (frontend) + Railway (ML service)

---

## 🚀 Quick Start

```bash
cd futology
npm install
cp .env.example .env.local   # fill in keys per PROJECT_Sick-Boy.md §7
npm run dev
```

Open [http://localhost:3000](http://localhost:3000).

### Build the GH Pages static export locally

```bash
cd futology
npm run build:export
npx serve out
```

---

## 📋 Build Phases

| Phase | Title | Status |
|-------|-------|--------|
| 0 | Repo & Environment Setup | ✅ Complete |
| 1 | Auth, Onboarding, Shell | ✅ Layout shell complete |
| 2 | Live Data Layer & Core Pages | 🔄 In Progress |
| 3 | ML Service (FastAPI) | ⏳ Pending |
| 4 | Intelligence Hub & ML Pages | ⏳ Pending |
| 5 | Predictions, Profile, Notifications | ⏳ Pending |
| 6 | Bonus / Wishlist Features | ⏳ Pending |
| 7 | Polish, Performance, Deploy | ⏳ Pending |

---

## 🎨 Design Principles

1. **Dark mode only.** `#0A0A0A` background, `#00D563` accent, `#FFD700` premium, `#FF3B3B` live
2. **Mobile-first.** Test at 375px before declaring done
3. **Functional over fancy.** Skeleton loaders, designed empty states, real backends
4. **TypeScript strict.** No `any`, no `@ts-ignore`
5. **Server-only API keys.** Only Supabase URL + anon key reach browser

---

## 📖 Additional Documentation

- **[PROJECT_Sick-Boy.md](./PROJECT_Sick-Boy.md)** — Project bible: vision, features, tech stack, schema, ML specs, API routes, build plan
- **[SESSION.md](./SESSION.md)** — Living session log. Read first; updated after every working session

---

## 📸 Screenshots

> **Note:** Screenshots should be added to a `screenshots/` directory and linked here. Run the app locally and capture:
> - Homepage hero section
> - Live Scores page
> - Predictions with ML card
> - Intelligence Hub
> - Match Predictor with TeamPicker
> - Player Pulse with radar chart
> - Fantasy IQ with pitch visualization
> - Mobile responsive views

```
screenshots/
├── homepage.png
├── live-scores.png
├── predictions.png
├── intelligence-hub.png
├── match-predictor.png
├── player-pulse.png
├── fantasy-iq.png
└── mobile-views.png
```

---

## 🤝 Contributing

This project is in active development. See `SESSION.md` for current progress and `PROJECT_Sick-Boy.md` for the complete roadmap.

---

**Built with ❤️ for football fans everywhere.**
