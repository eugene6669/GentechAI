# Gentech AI Tools — Architecture

## System Overview

```
┌─────────────────────────────────────────────────────────────┐
│                        USERS                                 │
│  Freelancers │ Virtual Assistants │ Students (PH-focused)   │
└───────────────────────────┬─────────────────────────────────┘
                            │
                            ▼
┌─────────────────────────────────────────────────────────────┐
│                    FRONTEND (React SPA)                      │
│  ┌──────────────┐  ┌──────────────┐  ┌──────────────┐      │
│  │   App Shell  │  │ Browser-side │  │  Extensions  │      │
│  │  - Sidebar   │  │    Tools     │  │  - Clipper   │      │
│  │  - Command   │  │  - PDF/Image │  │  - Screenshot│      │
│  │    Palette   │  │  - Audio/OCR │  │  - YT→Text   │      │
│  │  - Routing   │  │  (WASM/Web   │  │  (Phase 13)  │      │
│  │  - Theme     │  │   Workers)   │  │              │      │
│  └──────────────┘  └──────────────┘  └──────────────┘      │
│                                                               │
│  State: Zustand (UI), React Query (server data)             │
└───────────────────────────┬─────────────────────────────────┘
                            │ HTTPS + WebSocket
                            ▼
┌─────────────────────────────────────────────────────────────┐
│                   API SERVER (Node.js)                       │
│  ┌──────────────┐  ┌──────────────┐  ┌──────────────┐      │
│  │  Auth        │  │  AI Proxy    │  │ Lead Finder  │      │
│  │  - Google    │  │  - Claude    │  │  - Google    │      │
│  │    OAuth     │  │    API       │  │    Places    │      │
│  │  - JWT       │  │  - Rate      │  │    API       │      │
│  │  - Sessions  │  │    Limiting  │  │  - Quota     │      │
│  └──────────────┘  └──────────────┘  └──────────────┘      │
│                                                               │
│  Security: Zod validation, CORS, per-user quotas            │
└───────────────────────────┬─────────────────────────────────┘
                            │
                            ▼
┌─────────────────────────────────────────────────────────────┐
│                   DATABASE (PostgreSQL)                      │
│  users, sessions, profiles, clients, invoices, tasks,       │
│  boards, leads, applications, snippets, links, community    │
└─────────────────────────────────────────────────────────────┘
```

## Technology Choices

### Frontend
- **React 18** — Industry standard, rich ecosystem
- **Vite** — Fast dev server and build tool
- **TypeScript** — Type safety, better tooling
- **Tailwind CSS** — Utility-first, design tokens integration
- **React Router 7** — Client-side routing
- **Zustand** — Lightweight state management (theme, UI state)
- **TanStack Query** — Server state management (Phase 2+)

### Backend
- **Node.js + Express** — Familiar, flexible
- **TypeScript** — Shared types with frontend
- **PostgreSQL** — Relational data, ACID guarantees
- **Socket.IO** — Real-time chat and notifications
- **Zod** — Runtime validation, shared with frontend

### Browser-Side Processing
- **pdf-lib / pdf.js** — PDF manipulation
- **Tesseract.js** — OCR (image/screenshot to text)
- **Transformers.js / ONNX Runtime Web** — On-device AI models (background removal, upscaling, Whisper transcription)
- **ffmpeg.wasm** — Audio/video conversion
- **Web Workers** — Keep heavy processing off the main thread
- **Web Crypto API** — Secure random generation

### Infrastructure
- **Frontend**: Vercel or Netlify (static hosting, CDN)
- **Backend**: Render, Railway, or Fly.io (Node.js hosting)
- **Database**: Managed PostgreSQL (Supabase, Neon, or provider's managed service)
- **Monitoring**: Sentry (errors), Plausible (analytics, privacy-first)

## Design System

### Principles
1. **Minimalist** — Show few things at a time, one primary action per screen
2. **Eye-catching** — Bold brand orange (#FF5000) as the primary accent
3. **Calm** — Generous white space, subtle shadows, quiet colors for everything else

### Color Palette
| Token | Light | Dark | Usage |
|-------|-------|------|-------|
| `--color-orange` | #FF5000 | #FF5000 | Primary buttons, active states, key accents |
| `--color-charcoal` | #2E2E2E | #E8E3DA | Text, headings |
| `--color-canvas` | #FAFAF7 | #1A1A1A | App background |
| `--color-surface` | #FFFFFF | #2E2E2E | Cards, modals |
| `--color-sand` | #F3EFE8 | #252525 | Hover states, subtle sections |
| `--color-teal` | #1E6F73 | #1E6F73 | Secondary buttons, links, info |
| `--color-muted` | #6B6B6B | #9B9B9B | Secondary text |
| `--color-border` | #E8E3DA | #3D3D3D | Dividers, card borders |

All colors defined in `client/src/tokens/tokens.css`. Dark mode overrides only what changes.

### Typography
- **Headings**: Plus Jakarta Sans (geometric sans, bold, confident)
- **UI/Body**: Inter (readable, neutral)
- **Sizes**: Large headings (2xl–4xl), small quiet labels (xs–sm)

### Spacing & Layout
- **8px grid**: All spacing in multiples of 8px (Tailwind's default 1=4px, 2=8px, etc.)
- **Max widths**: Content containers max 1280px (7xl), tool pages max 1024px (5xl)
- **Generous white space**: 24–48px sections, 16–24px cards

### Components
- **Buttons**: 3 variants (primary, secondary, ghost), 3 sizes (sm, md, lg)
- **Cards**: 12px rounded corners, 1px border, soft shadow
- **Focus rings**: 2px orange outline, 2px offset (WCAG 2.4.7)

## Tool Registry Pattern

Every tool is defined in one place: `client/src/tools/registry.ts`.

```typescript
{
  id: 'word-counter',                    // Unique identifier
  name: 'Word Counter',                  // Display name
  description: 'Count words, chars...',  // One-line summary
  category: 'Text',                      // For filtering
  icon: Type,                            // Lucide icon component
  route: '/tools/word-counter',          // URL path
  component: lazy(() => import('...')), // Lazy-loaded component
}
```

**Benefits:**
1. Single source of truth — add a tool here, it appears everywhere
2. Lazy loading — tools only load when accessed, keeping initial bundle small
3. Searchable — command palette and tools grid read from the registry
4. Type-safe — TypeScript ensures all required fields are present

## Data Flow

### Phase 1 (Current)
- All state is client-side (Zustand for theme/UI)
- Tools run entirely in the browser (no server calls)

### Phase 2+ (Auth & Server State)
```
User signs in
     ↓
Google OAuth (backend)
     ↓
JWT in httpOnly cookie
     ↓
Frontend reads /api/me → user profile
     ↓
React Query caches user data
     ↓
Protected routes check authentication
```

### Phase 10+ (AI Tools)
```
User submits AI request
     ↓
Frontend → POST /api/ai/chat (with JWT cookie)
     ↓
Backend checks quota, proxies to Claude API
     ↓
Streams response back to client
     ↓
Frontend displays result, updates quota
```

## Security Model

1. **Browser-side tools**: Files never uploaded, processed locally
2. **API keys**: Never exposed to frontend, always proxied through backend
3. **Authentication**: Google OAuth → JWT in httpOnly cookie (no localStorage)
4. **Input validation**: Zod schemas on both client and server
5. **Rate limiting**: Per-user quotas for AI and Lead Finder (Phase 2+)
6. **CORS**: Locked to app origin only
7. **SQL injection**: Parameterized queries only (no string concatenation)
8. **Audit log**: All admin actions logged (Phase 2+)

## Build Phases

| Phase | Focus | Status |
|-------|-------|--------|
| 1 | Environment, design system, app shell, 3 tools | ✅ Complete |
| 2 | Database, auth, sessions, entitlements | ⏳ Next |
| 3 | Landing page, pricing, FAQ | Planned |
| 4 | Text/dev utilities, finance tools | Planned |
| 5 | PDF and image tools | Planned |
| 6 | OCR, audio transcriber, file converter | Planned |
| 7 | Workspace (tasks, calendar, snippets) | Planned |
| 8 | Client CRM, hours, invoices | Planned |
| 9 | Lead finder, job hub, application tracker | Planned |
| 10 | AI proxy, assistant, writing tools, agent mode | Planned |
| 11 | Community feed, chat, points, leaderboard | Planned |
| 12 | Guides, library, blog, PH ID guides | Planned |
| 13 | Browser extensions | Planned |
| 14 | Payments, hardening, deployment, legal | Planned |

Each phase is built completely before moving to the next.

## Future Considerations

### Scalability
- **Database**: Partition by user or date for large tables (community, tasks)
- **CDN**: Static assets on CDN, dynamic content from regional edge functions
- **Caching**: Redis for sessions, rate limits, and frequently-accessed data

### Monitoring
- **Errors**: Sentry for frontend and backend exceptions
- **Performance**: Lighthouse CI, Core Web Vitals tracking
- **Analytics**: Plausible (privacy-first, GDPR-friendly)
- **Uptime**: UptimeRobot or similar for API health checks

### Internationalization (Future)
- Currently PH-focused (PHP currency, PH tax calculator, PH ID guides)
- i18n framework (react-i18next) can be added in Phase 15+
- Currency, date, and number formatting via `Intl` API

---

Last updated: Phase 1 completion, 2026-09-30
