import Link from "next/link";

import { PageShell } from "@/components/diagnostics/chrome";
import { RecentReports } from "@/components/diagnostics/recent-reports";

export default function HomePage() {
  return (
    <PageShell
      eyebrow="Diagnostic Suite"
      title="Deterministic diagnostics for data maturity, root causes, and the path to DRL 7."
      summary="This studio has two distinct product areas from one codebase: DMM for root-cause diagnosis and DRL for maturity banding and sponsor-facing readouts."
    >
      <section className="rounded-[1.8rem] border border-slate-200/80 bg-white/82 px-6 py-5 shadow-[0_18px_50px_rgba(15,23,42,0.05)]" data-reveal="card">
        <div className="grid gap-4 lg:grid-cols-[220px_minmax(0,1fr)] lg:items-start">
          <div>
            <p className="text-xs font-semibold uppercase tracking-[0.18em] text-[#F97316]">Choose your area</p>
          </div>
          <p className="max-w-4xl text-sm leading-7 text-slate-600">
            Start with <span className="font-semibold text-slate-950">DMM</span> when you need the blocker-level operating picture. Start with <span className="font-semibold text-slate-950">DRL</span> when the main question is “what level are we at, and what is missing for DRL 7?”
          </p>
        </div>
      </section>

      <div className="grid items-stretch gap-6 lg:grid-cols-[minmax(0,1.15fr)_minmax(0,0.85fr)]">
        <article
          className="relative flex h-full flex-col overflow-hidden rounded-[2.2rem] border border-slate-200/80 bg-[linear-gradient(145deg,rgba(255,255,255,0.98),rgba(241,245,249,0.96))] p-8 shadow-[0_24px_80px_rgba(15,23,42,0.08)]"
          data-reveal="card"
        >
          <div className="pointer-events-none absolute right-0 top-0 h-44 w-44 bg-[radial-gradient(circle,_rgba(30,64,175,0.14),_transparent_70%)]" />
          <div className="space-y-4">
            <p className="text-xs font-semibold uppercase tracking-[0.22em] text-[#1E40AF]">DMM</p>
            <h2 className="max-w-xl text-4xl leading-tight font-semibold text-slate-950">
              Diagnose what is actually broken before you label maturity.
            </h2>
            <p className="max-w-2xl text-base leading-8 text-slate-600">
              The DMM surface is the serious workflow tool: Ten Root Conditions, top blockers, DRL interpretation, and an action plan built for real operating friction.
            </p>
          </div>
          <div className="mt-8 grid gap-4 sm:grid-cols-3">
            {[
              ["10", "root conditions"],
              ["3", "top blockers"],
              ["30", "day action move"],
            ].map(([value, label]) => (
              <div key={label} className="flex h-full flex-col justify-between rounded-[1.5rem] border border-slate-200 bg-white/90 px-4 py-5">
                <p className="text-3xl font-semibold text-slate-950">{value}</p>
                <p className="mt-2 text-xs font-semibold uppercase tracking-[0.16em] text-slate-500">{label}</p>
              </div>
            ))}
          </div>
          <div className="mt-auto flex flex-wrap gap-3 pt-8">
            <Link
              href="/dmm/start"
              className="rounded-full bg-[#1E40AF] px-6 py-3 text-sm font-semibold text-white shadow-[0_14px_30px_rgba(30,64,175,0.22)]"
            >
              Start DMM assessment
            </Link>
            <Link
              href="/dmm"
              className="rounded-full border border-slate-200 bg-white px-6 py-3 text-sm font-semibold text-slate-700"
            >
              Open DMM overview
            </Link>
          </div>
        </article>

        <article
          className="relative flex h-full flex-col overflow-hidden rounded-[2.2rem] border border-slate-900/20 bg-[linear-gradient(180deg,#1E293B_0%,#0F172A_100%)] p-8 text-white shadow-[0_24px_80px_rgba(15,23,42,0.18)]"
          data-reveal="card"
        >
          <div className="pointer-events-none absolute -right-10 top-8 h-36 w-36 rounded-full bg-[radial-gradient(circle,_rgba(249,115,22,0.35),_transparent_68%)]" />
          <div className="space-y-4">
            <p className="text-xs font-semibold uppercase tracking-[0.22em] text-orange-300">DRL</p>
            <h2 className="text-3xl leading-tight font-semibold">Get the sponsor-facing band without losing the evidence trail.</h2>
            <p className="text-base leading-8 text-slate-300">
              DRL is the lighter wrapper for “where are we really?” conversations. It still stays grounded in deterministic evidence and explicit gaps to DRL 7.
            </p>
          </div>
          <div className="mt-8 space-y-3">
            {[
              "Likely DRL band",
              "Why not higher",
              "Gap to DRL 7",
            ].map((item) => (
              <div key={item} className="rounded-[1.3rem] border border-white/10 bg-white/8 px-4 py-3 text-sm text-slate-100">
                {item}
              </div>
            ))}
          </div>
          <div className="mt-auto flex flex-wrap gap-3 pt-8">
            <Link
              href="/drl/start"
              className="rounded-full bg-white px-6 py-3 text-sm font-semibold text-slate-950"
            >
              Start DRL assessment
            </Link>
            <Link
              href="/drl"
              className="rounded-full border border-white/15 px-6 py-3 text-sm font-semibold text-white"
            >
              Open DRL overview
            </Link>
          </div>
        </article>
      </div>

      <div className="grid gap-4 md:grid-cols-3">
        {[
          {
            title: "Explainable scoring",
            summary: "The root-cause profile and DRL band come from deterministic logic you can inspect and challenge.",
          },
          {
            title: "Private by default",
            summary: "Reports stay in this browser until someone deliberately copies a portable share link or downloads an export.",
          },
          {
            title: "AI is optional",
            summary: "The assistant can interpret a finished report, but deterministic mode is always available and never leaves the browser.",
          },
        ].map((item) => (
          <div
            key={item.title}
            className="rounded-[1.6rem] border border-slate-200/80 bg-white/84 px-5 py-5 shadow-[0_18px_50px_rgba(15,23,42,0.05)] transition duration-200 hover:-translate-y-0.5 hover:shadow-[0_22px_60px_rgba(15,23,42,0.08)]"
            data-reveal="card"
          >
            <p className="text-xs font-semibold uppercase tracking-[0.18em] text-[#1E40AF]">{item.title}</p>
            <p className="mt-3 text-sm leading-7 text-slate-700">{item.summary}</p>
          </div>
        ))}
      </div>

      <RecentReports />
    </PageShell>
  );
}
