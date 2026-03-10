# Task

## Objective
Implement a Vercel-ready diagnostic suite with two public entry points:
- `DMM Diagnostic`
- `DRL Diagnostic`

The suite must use one shared codebase, deterministic scoring, and optional server-side AI assist that never affects scoring.

## Current status
- Standalone Next.js app scaffolded in `data-maturity-studio/`
- Shared question bank, content model, evidence mapper, and scoring engine implemented
- DMM and DRL public routes implemented
- Local draft storage and local report storage implemented
- Branded PDF export, printable report fallback, and JSON export implemented
- Vercel-oriented server-side Groq chat integration implemented
- Deterministic browser-only chat fallback implemented
- Rate-limit countdown and auto-fallback to deterministic mode implemented
- Server-side chat request validation and best-effort in-memory abuse throttling implemented
- CSP, COOP, CORP, referrer policy, frame denial, permissions policy, and production HSTS added in Next.js config
- CSV upload count and file-size bounds enforced in the client flow
- Results-page local-storage hydration bug fixed
- Live Playwright validation completed for DMM flow, DRL flow, exports, print trigger, deterministic chat, AI chat, and rate-limit fallback behavior
- Root-condition wording and DRL threshold language aligned against the October 2025 white paper source text
- GSAP and Lenis motion layer added with reduced-motion handling
- Motion tuning updated with a subtle GSAP overshoot on reveal so cards settle with a light bounce instead of dead linear movement
- Lenis scroll tuning now runs on Lenis auto-RAF instead of the GSAP ticker, with a lighter lerp and stronger wheel response so scroll starts feel less resistant
- Home-page feature cards now use stricter vertical alignment, equal-height layout, and bottom-aligned actions for cleaner spacing
- Chart.js report visuals added for severity, readiness profile, and severity mix
- Focus visibility, live-region feedback, semantic state, and chart accessibility improved after manual a11y review
- Local saved-report history added for same-browser reuse
- Portable share-link snapshots added so a completed report can open on another device without backend storage
- Share links now use URL fragments instead of query params to reduce casual leakage through logs
- Skip link and chart table fallbacks added for stronger accessibility support
- Method and alpha-limitations page added for public claim boundaries
- Method page now states that v1 does not run automatic search-based company enrichment behind the scenes
- Draft autosave now strips raw CSV content and pasted evidence from local storage
- Local report history now supports expiry, report deletion, and full browser-local data clearing
- Open-source alpha footer added with attribution and limited-API note
- Footer, overview pages, recent-report history, and report export rail redesigned to clarify private-by-default sharing and improve visual hierarchy
- Site-wide product-area strip and clearer navigation labels added so DMM and DRL read as two distinct surfaces, not just two acronyms
- Domain tests passing
- Production build passing

## Remaining follow-up opportunities
- Add richer component-level acceptance tests
- Add analytics sink instead of local `dataLayer` pushes only
- Add more nuanced evidence parsing and unsupported-file UX
- Expand optional AI assist only after deterministic usage is validated
- Add persistent saved assessments only if a real backend is warranted
- Add server-side persistence and shareable reports in a future V2 rather than expanding local storage
- Replace best-effort in-memory chat throttling with a durable shared store before claiming stronger abuse protection
- Complete a dedicated WCAG 2.2 AA audit and manual assistive-technology pass before any formal accessibility claim
