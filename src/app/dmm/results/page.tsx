import { Suspense } from "react";

import { ResultsClient } from "@/components/diagnostics/results-client";
import { PageShell } from "@/components/diagnostics/chrome";

export default function DMMResultsPage() {
  return (
    <PageShell
      activeProduct="dmm"
      eyebrow="Report"
      title="DMM report"
      summary="Review the root-cause diagnosis, likely DRL band, and the next moves that would improve trust and AI readiness."
    >
      <Suspense fallback={<div className="rounded-[2rem] border border-white/50 bg-white/90 p-8">Loading report...</div>}>
        <ResultsClient productType="dmm" />
      </Suspense>
    </PageShell>
  );
}
