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
- Printable report and JSON export implemented
- Vercel-oriented server-side Groq chat integration implemented
- Deterministic browser-only chat fallback implemented
- Rate-limit countdown and auto-fallback to deterministic mode implemented
- Server-side chat request validation and best-effort in-memory abuse throttling implemented
- Basic response-security headers added in Next.js config
- CSV upload count and file-size bounds enforced in the client flow
- Results-page local-storage hydration bug fixed
- Live Playwright validation completed for DMM flow, DRL flow, exports, print trigger, deterministic chat, AI chat, and rate-limit fallback behavior
- Root-condition wording and DRL threshold language aligned against the October 2025 white paper source text
- GSAP and Lenis motion layer added with reduced-motion handling
- Chart.js report visuals added for severity, readiness profile, and severity mix
- Focus visibility, live-region feedback, semantic state, and chart accessibility improved after manual a11y review
- Domain tests passing
- Production build passing

## Remaining follow-up opportunities
- Add richer component-level acceptance tests
- Add analytics sink instead of local `dataLayer` pushes only
- Add real PDF generation instead of print-to-PDF flow
- Add more nuanced evidence parsing and unsupported-file UX
- Expand optional AI assist only after deterministic usage is validated
- Add persistent saved assessments only if a real backend is warranted
- Add server-side persistence and shareable reports in a future V2 rather than expanding local storage
- Expand server hardening beyond best-effort headers and in-memory throttling before making OWASP or compliance claims
