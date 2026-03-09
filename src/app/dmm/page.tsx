import Link from "next/link";

import { PageShell } from "@/components/diagnostics/chrome";

export default function DMMPage() {
  return (
    <PageShell
      activeProduct="dmm"
      eyebrow="Primary product"
      title="DMM Diagnostic"
      summary="Find the root conditions blocking trustworthy people analytics and AI readiness. DMM is the substantive product in this suite."
    >
      <div className="grid gap-6 lg:grid-cols-[minmax(0,1fr)_320px]">
        <section className="rounded-[2rem] border border-white/50 bg-white/90 p-8 shadow-[0_24px_80px_rgba(15,23,42,0.08)]">
          <h2 className="text-2xl font-semibold text-slate-950">What DMM produces</h2>
          <ul className="mt-6 space-y-4 text-sm leading-7 text-slate-600">
            <li>Severity across all Ten Root Conditions.</li>
            <li>Top 3 blockers ranked by impact on trust and decision speed.</li>
            <li>Likely DRL band and a gap-to-DRL-7 explanation.</li>
            <li>30-day action plan plus an optional 6-week pilot move.</li>
            <li>Printable report and JSON export for internal reuse.</li>
          </ul>
          <div className="mt-8 flex flex-wrap gap-3">
            <Link
              href="/dmm/start"
              className="rounded-full bg-slate-950 px-5 py-3 text-sm font-semibold text-white"
            >
              Start DMM assessment
            </Link>
            <Link
              href="/drl"
              className="rounded-full border border-slate-200 px-5 py-3 text-sm font-semibold text-slate-700"
            >
              Compare with DRL view
            </Link>
          </div>
        </section>
        <aside className="rounded-[2rem] border border-white/50 bg-slate-950 p-6 text-sm leading-7 text-slate-200 shadow-[0_24px_80px_rgba(15,23,42,0.14)]">
          <p className="font-semibold text-white">Best use</p>
          <p className="mt-3">
            Use DMM when a team keeps losing time to metric disputes, recoding, inconsistent judgement, or weak AI readiness.
          </p>
        </aside>
      </div>
    </PageShell>
  );
}
