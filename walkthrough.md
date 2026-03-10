# Walkthrough

## Run locally
1. `cd data-maturity-studio`
2. `pnpm install`
3. `pnpm dev`
4. Open `http://127.0.0.1:3000` or the port shown by Next.js

## Main routes
- `/`
- `/dmm`
- `/dmm/start`
- `/dmm/results`
- `/drl`
- `/drl/start`
- `/drl/results`

## Product flow
1. Choose DMM or DRL
2. Start an assessment
3. Set scope:
   - use case
   - organization
4. Answer deterministic questions
5. Optionally upload CSV evidence and paste notes
6. Generate a report
7. Ask follow-up questions in AI mode or deterministic mode
8. Export via branded PDF, print fallback, JSON download, or portable share link

## Architecture
- `src/lib/diagnostics/types.ts`
  - shared domain types
- `src/lib/diagnostics/catalog.ts`
  - root conditions, signals, use cases, interventions
- `src/lib/diagnostics/questions.ts`
  - typed question bank
- `src/lib/diagnostics/evidence.ts`
  - deterministic evidence summarization
- `src/lib/diagnostics/engine.ts`
  - root scoring, confidence, DRL banding, action plan composition
- `src/lib/diagnostics/deterministic-chat.ts`
  - browser-only report assistant fallback
- `src/lib/diagnostics/storage.ts`
  - browser-local draft and result persistence with evidence stripping, expiry, and delete/clear controls
- `src/lib/diagnostics/chat-guard.ts`
  - request validation, same-origin checks, request-size guards, and best-effort chat throttling
- `src/lib/diagnostics/pdf.ts`
  - branded PDF rendering helper
- `src/app/api/chat/route.ts`
  - server-side Groq proxy using env-backed secrets only
- `src/app/api/report-pdf/route.ts`
  - server-side PDF download route
- `src/app/method/page.tsx`
  - public method, privacy, alpha-limitations, and no-automatic-search-enrichment page
- `src/components/diagnostics/*`
  - shared product UI, site-wide DMM/DRL area switcher, assessment flow, motion shell with subtle reveal bounce, charts, PDF document, and results rendering
  - Lenis auto-RAF scroll tuning with lighter initial wheel response and reduced inertial drag

## Current test coverage
- domain tests for scoring, evidence parsing, and deterministic chat
- PDF rendering tests for DMM and DRL fixture sessions
- live Playwright validation on the Vercel deployment for DMM and DRL public flows
- local browser validation for charts, focus handling, semantic state, PDF download, share behavior, and console cleanliness
- UI refinement pass covering richer DMM/DRL overview pages, clearer footer ownership links, private-by-default share messaging, and cleaner recent-report history layout
- Site-level IA refinement so users can immediately see DMM and DRL as two separate areas with different jobs
- Home-page card layout tightened so spacing, padding, and CTA alignment stay consistent across the DMM and DRL hero cards
- source-alignment pass against the October 2025 white paper for Ten Root Conditions, DRL 1-7 language, and DPM / TDQM framing
- Lighthouse baseline on the local home page with accessibility, best-practices, and SEO at 100 in the tested run, and performance lower on dev-server conditions

## Validation commands
- `pnpm test`
- `pnpm lint`
- `pnpm build`
- local browser pass on `http://localhost:3000`
- manual Playwright CLI pass against `https://data-maturity-studio.vercel.app`

## Deployment
- Deploy on Vercel
- Set `GROQ_API_KEY` and `GROQ_MODEL` in project environment variables
- The server route is responsible for Groq requests so the key never reaches the client
- If Groq rate-limits, the UI shows a countdown and keeps deterministic chat available
- PDF export is generated server-side through `/api/report-pdf`
- Share links are URL-fragment snapshots and browser-local reports expire after 30 days
- Production URL: `https://data-maturity-studio.vercel.app`
