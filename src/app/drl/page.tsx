import Link from "next/link";

import { PageShell } from "@/components/diagnostics/chrome";
import { RecentReports } from "@/components/diagnostics/recent-reports";

export default function DRLPage() {
  return (
    <PageShell
      activeProduct="drl"
      eyebrow="Secondary product"
      title="DRL Diagnostic"
      summary="Estimate the likely Data Readiness Level for a workflow and show what is still missing for DRL 7."
    >
      <div className="grid gap-6 xl:grid-cols-[minmax(0,1.2fr)_minmax(320px,0.8fr)]">
        <section className="space-y-6">
          <article className="rounded-[2rem] border border-slate-200/80 bg-[linear-gradient(145deg,rgba(255,255,255,0.98),rgba(241,245,249,0.96))] p-8 shadow-[0_24px_80px_rgba(15,23,42,0.08)]">
            <p className="text-xs font-semibold uppercase tracking-[0.22em] text-[#1E40AF]">What DRL emphasizes</p>
            <h2 className="mt-3 text-3xl font-semibold text-slate-950">A sponsor-friendly maturity signal that still shows its work</h2>
            <div className="mt-6 grid gap-4 md:grid-cols-2">
              {[
                "A likely DRL band grounded in deterministic logic",
                "Why the workflow is not yet at a higher level",
                "The explicit gap between current state and DRL 7",
                "A lighter sponsor-facing assessment that still stays specific",
              ].map((item) => (
                <div key={item} className="rounded-[1.4rem] border border-slate-200 bg-white/90 px-4 py-4 text-sm leading-7 text-slate-700">
                  {item}
                </div>
              ))}
            </div>
            <div className="mt-8 flex flex-wrap gap-3">
              <Link
                href="/drl/start"
                className="rounded-full bg-[#1E40AF] px-5 py-3 text-sm font-semibold text-white shadow-[0_14px_30px_rgba(30,64,175,0.22)]"
              >
                Start DRL assessment
              </Link>
              <Link
                href="/dmm"
                className="rounded-full border border-slate-200 bg-white px-5 py-3 text-sm font-semibold text-slate-700"
              >
                Open full DMM
              </Link>
            </div>
          </article>

          <div className="grid gap-4 lg:grid-cols-2">
            <article className="rounded-[1.8rem] border border-slate-200/80 bg-white/88 p-6 shadow-[0_18px_50px_rgba(15,23,42,0.05)]">
              <p className="text-xs font-semibold uppercase tracking-[0.18em] text-[#F97316]">When to use it</p>
              <h3 className="mt-3 text-2xl font-semibold text-slate-950">Use DRL when the room needs a band quickly.</h3>
              <p className="mt-3 text-sm leading-7 text-slate-600">
                Choose DRL for sponsor conversations, first-pass qualification, and “what level are we really at?” moments where speed matters.
              </p>
            </article>
            <article className="rounded-[1.8rem] border border-slate-200/80 bg-white/88 p-6 shadow-[0_18px_50px_rgba(15,23,42,0.05)]">
              <p className="text-xs font-semibold uppercase tracking-[0.18em] text-[#F97316]">What changes after the report</p>
              <h3 className="mt-3 text-2xl font-semibold text-slate-950">You can escalate to DMM without losing the logic.</h3>
              <p className="mt-3 text-sm leading-7 text-slate-600">
                DRL is the lighter wrapper. The full DMM view stays available when you need the blocker-level operating picture behind the band.
              </p>
            </article>
          </div>
        </section>

        <aside className="space-y-6">
          <section className="rounded-[2rem] border border-slate-900/20 bg-[linear-gradient(180deg,#1E293B_0%,#0F172A_100%)] p-6 text-sm leading-7 text-slate-200 shadow-[0_24px_80px_rgba(15,23,42,0.18)]">
            <p className="text-xs font-semibold uppercase tracking-[0.22em] text-orange-300">Sample output</p>
            <div className="mt-4 space-y-3">
              {["Likely DRL band", "Why not higher", "Gap to DRL 7", "Action-focused sponsor summary"].map((item) => (
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

      <RecentReports productType="drl" />
    </PageShell>
  );
}
