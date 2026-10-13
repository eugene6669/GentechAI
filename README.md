# Gentech AI Tools

> All-in-one workspace of productivity, file, and AI tools for freelancers, virtual assistants, and students.

## What is this?

Gentech AI Tools is a free web app that brings together:
- **Workspace**: Task boards, calendar, snippets, links, and utilities
- **Clients & Money**: CRM, invoices, hours tracking, and PH tax calculator
- **Growth**: Lead finder, job hub, and application tracker
- **40+ Browser Tools**: PDF, image, audio, text, and dev tools that run entirely in your browser (files never leave your device)
- **AI Tools**: Assistant, writing tools, and agent mode (Pro plan)

**Target users**: Freelancers, virtual assistants, and students in the Philippines (and beyond).

## Project Status

**Phase 1 — Complete** ✅  
Environment, design system, app shell, command palette, tool registry, and 3 sample tools.

**Next**: Phase 2 (auth, database, user profiles)

## Tech Stack

- **Frontend**: React 18 + Vite + TypeScript + Tailwind CSS
- **Backend**: Node.js + Express + TypeScript + PostgreSQL (Phase 2+)
- **Browser-side tools**: Web Workers, WASM (pdf-lib, Tesseract.js, Transformers.js, ffmpeg.wasm)
- **Design**: Minimalist, eye-catching, calm — solid colors, generous white space, one primary action per screen

## Getting Started

### Prerequisites
- Node.js 20+ and npm

### Installation

```bash
# Install dependencies
npm install

# Start the frontend (dev mode)
npm run dev

# Open http://localhost:5173
```

The backend server is a placeholder for Phase 1. It will be wired up in Phase 2.

### Environment Variables

Copy `.env.example` to `.env` and fill in the values (required for Phase 2+):

```bash
cp .env.example .env
```

## Project Structure

```
GentechAI/
├── client/          # React frontend
│   ├── src/
│   │   ├── tokens/      # Design tokens (CSS custom properties)
│   │   ├── components/  # UI primitives and layout
│   │   ├── pages/       # Route pages
│   │   ├── tools/       # Tool registry + tool components
│   │   └── stores/      # Zustand state management
│   └── public/
├── server/          # Node.js backend (placeholder in Phase 1)
├── database/        # SQL schema (Phase 2+)
├── docs/            # Documentation
└── README.md
```

## Design System

- **Brand orange**: #FF5000 (primary buttons, accents)
- **Deep teal**: #1E6F73 (secondary actions, links)
- **Charcoal**: #2E2E2E (text and dark surfaces)
- **Canvas**: #FAFAF7 (app background)
- **Light and dark mode** with one-click toggle

All colors are defined as CSS custom properties in `client/src/tokens/tokens.css`.

## Adding a New Tool

See `docs/ADD_A_TOOL.md` for a step-by-step guide. Summary:

1. Create `client/src/tools/your-tool/YourTool.tsx`
2. Add an entry to `client/src/tools/registry.ts`
3. The tool appears everywhere automatically (grid, command palette, routing)

## Scripts

| Command | Description |
|---------|-------------|
| `npm run dev` | Start the frontend dev server (port 5173) |
| `npm run dev:server` | Start the backend dev server (port 4000) |
| `npm run dev:all` | Start both frontend and backend |
| `npm run build` | Build the frontend for production |

## License

Proprietary. All rights reserved.

## Build Phases

This project is built in strict phases. Each phase is completed and verified before moving to the next.

- ✅ **Phase 1**: Environment, design system, app shell, tool registry, 3 sample tools
- ⏳ **Phase 2**: Database, Google sign-in, sessions, profile, entitlements
- **Phase 3**: Landing page, pricing, FAQ
- **Phase 4**: Text/dev utilities and finance tools
- **Phase 5**: PDF and image tools
- **Phase 6**: OCR, audio transcriber, file converter
- **Phase 7**: Workspace (tasks, calendar, snippets, links, sheet)
- **Phase 8**: Client CRM, hours tracking, invoices
- **Phase 9**: Lead finder, job hub, application tracker
- **Phase 10**: AI backend proxy, assistant, AI writing tools, agent mode
- **Phase 11**: Community feed, chat, points, leaderboard
- **Phase 12**: Guides, library, blog, case studies, PH ID guides
- **Phase 13**: Browser extensions
- **Phase 14**: Payments, hardening, deployment, legal review

---

Built with care for freelancers, VAs, and students. 🚀
