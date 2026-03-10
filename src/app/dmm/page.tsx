import Link from "next/link";

import { PageShell } from "@/components/diagnostics/chrome";
import { RecentReports } from "@/components/diagnostics/recent-reports";

export default function DMMPage() {
  return (
    <PageShell
      activeProduct="dmm"
      eyebrow="Primary product"
      title="DMM Diagnostic"
      summary="Find the root conditions blocking trustworthy people analytics and AI readiness. DMM is the substantive product in this suite."
    >
      <div className="grid gap-6 xl:grid-cols-[minmax(0,1.2fr)_minmax(320px,0.8fr)]">
        <section className="space-y-6">
          <article className="rounded-[2rem] border border-slate-200/80 bg-[linear-gradient(145deg,rgba(255,255,255,0.98),rgba(241,245,249,0.96))] p-8 shadow-[0_24px_80px_rgba(15,23,42,0.08)]">
            <p className="text-xs font-semibold uppercase tracking-[0.22em] text-[#1E40AF]">What DMM produces</p>
            <h2 className="mt-3 text-3xl font-semibold text-slate-950">A root-cause operating picture, not just a maturity label</h2>
            <div className="mt-6 grid gap-4 md:grid-cols-2">
              {[
                "Severity across all Ten Root Conditions",
                "Top 3 blockers ranked by impact on trust and decision speed",
                "Likely DRL band plus a gap-to-DRL-7 explanation",
                "30-day action plan and optional 6-week pilot move",
              ].map((item) => (
                <div key={item} className="rounded-[1.4rem] border border-slate-200 bg-white/90 px-4 py-4 text-sm leading-7 text-slate-700">
                  {item}
                </div>
              ))}
            </div>
            <div className="mt-8 flex flex-wrap gap-3">
              <Link
                href="/dmm/start"
                className="rounded-full bg-[#1E40AF] px-5 py-3 text-sm font-semibold text-white shadow-[0_14px_30px_rgba(30,64,175,0.22)]"
              >
                Start DMM assessment
              </Link>
              <Link
                href="/drl"
                className="rounded-full border border-slate-200 bg-white px-5 py-3 text-sm font-semibold text-slate-700"
              >
                Compare with DRL view
              </Link>
            </div>
          </article>

          <div className="grid gap-4 lg:grid-cols-2">
            <article className="rounded-[1.8rem] border border-slate-200/80 bg-white/88 p-6 shadow-[0_18px_50px_rgba(15,23,42,0.05)]">
              <p className="text-xs font-semibold uppercase tracking-[0.18em] text-[#F97316]">When to use it</p>
              <h3 className="mt-3 text-2xl font-semibold text-slate-950">Use DMM when the work is messy, political, or slow.</h3>
              <p className="mt-3 text-sm leading-7 text-slate-600">
                Choose DMM when a team keeps losing time to metric disputes, recoding, inconsistent judgement, or weak AI readiness.
              </p>
            </article>
            <article className="rounded-[1.8rem] border border-slate-200/80 bg-white/88 p-6 shadow-[0_18px_50px_rgba(15,23,42,0.05)]">
              <p className="text-xs font-semibold uppercase tracking-[0.18em] text-[#F97316]">What changes after the report</p>
              <h3 className="mt-3 text-2xl font-semibold text-slate-950">You leave with a decision-ready next move.</h3>
              <p className="mt-3 text-sm leading-7 text-slate-600">
                The report is built to support a 30-day operating decision, a sponsor review, or a scoped pilot, not just a score reveal.
              </p>
            </article>
          </div>
        </section>

        <aside className="space-y-6">
          <section className="rounded-[2rem] border border-slate-900/20 bg-[linear-gradient(180deg,#1E293B_0%,#0F172A_100%)] p-6 text-sm leading-7 text-slate-200 shadow-[0_24px_80px_rgba(15,23,42,0.18)]">
            <p className="text-xs font-semibold uppercase tracking-[0.22em] text-orange-300">Sample output</p>
            <div className="mt-4 space-y-3">
              {["Top blocker cards", "Root-cause heatmap", "Gap to DRL 7", "Branded PDF export"].map((item) => (
                <div key={item} className="rounded-[1.25rem] border border-white/10 bg-white/8 px-4 py-3 text-sm text-slate-100">
                  {item}
                </div>
              ))}
            </div>
          </section>

          <section className="rounded-[2rem] border border-slate-200/80 bg-white/88 p-6 shadow-[0_18px_50px_rgba(15,23,42,0.05)]">
            <p className="text-xs font-semibold uppercase tracking-[0.18em] text-[#1E40AF]">Report stance</p>
            <p className="mt-3 text-sm leading-7 text-slate-600">
              Private by default in this browser. Public only if someone deliberately creates and shares a report snapshot link.
            </p>
          </section>
        </aside>
      </div>

      <RecentReports productType="dmm" />
    </PageShell>
  );
}
