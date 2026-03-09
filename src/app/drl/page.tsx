import Link from "next/link";

import { PageShell } from "@/components/diagnostics/chrome";

export default function DRLPage() {
  return (
    <PageShell
      activeProduct="drl"
      eyebrow="Secondary product"
      title="DRL Diagnostic"
      summary="Estimate the likely Data Readiness Level for a workflow and show what is still missing for DRL 7."
    >
      <div className="grid gap-6 lg:grid-cols-[minmax(0,1fr)_320px]">
        <section className="rounded-[2rem] border border-white/50 bg-white/90 p-8 shadow-[0_24px_80px_rgba(15,23,42,0.08)]">
          <h2 className="text-2xl font-semibold text-slate-950">What DRL emphasizes</h2>
          <ul className="mt-6 space-y-4 text-sm leading-7 text-slate-600">
            <li>A likely DRL band grounded in deterministic logic.</li>
            <li>Why the workflow is not yet at a higher level.</li>
            <li>The explicit gap between current state and DRL 7.</li>
            <li>A lighter sponsor-facing assessment that still stays specific.</li>
          </ul>
          <div className="mt-8 flex flex-wrap gap-3">
            <Link
              href="/drl/start"
              className="rounded-full bg-slate-950 px-5 py-3 text-sm font-semibold text-white"
            >
              Start DRL assessment
            </Link>
            <Link
              href="/dmm"
              className="rounded-full border border-slate-200 px-5 py-3 text-sm font-semibold text-slate-700"
            >
              Open full DMM
            </Link>
          </div>
        </section>
        <aside className="rounded-[2rem] border border-white/50 bg-slate-950 p-6 text-sm leading-7 text-slate-200 shadow-[0_24px_80px_rgba(15,23,42,0.14)]">
          <p className="font-semibold text-white">Best use</p>
          <p className="mt-3">
            Use DRL for sponsor conversations, initial qualification, and “what level are we really at?” moments.
          </p>
        </aside>
      </div>
    </PageShell>
  );
}
