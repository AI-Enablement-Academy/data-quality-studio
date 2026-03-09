import { AssessmentFlow } from "@/components/diagnostics/assessment-flow";
import { PageShell } from "@/components/diagnostics/chrome";

export default function DMMStartPage() {
  return (
    <PageShell
      activeProduct="dmm"
      eyebrow="Assessment"
      title="Run the DMM Diagnostic"
      summary="Complete the questionnaire, optionally add evidence, and generate a deterministic diagnostic report."
    >
      <AssessmentFlow productType="dmm" />
    </PageShell>
  );
}
