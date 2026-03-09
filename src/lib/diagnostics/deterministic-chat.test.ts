import { createAssessmentSession } from "@/lib/diagnostics/engine";
import { getDeterministicChatReply } from "@/lib/diagnostics/deterministic-chat";

const session = createAssessmentSession({
  productType: "dmm",
  scopeType: "use_case",
  useCaseKey: "attrition",
  answers: {
    manual_dependency: 1,
    source_conflict: 3,
    subjective_capture: 2,
    access_friction: 1,
    taxonomy_mismatch: 2,
    representation_complexity: 2,
    volume_drag: 1,
    input_variability: 2,
    requirements_drift: 2,
    integration_gaps: 3,
    digital_foundation: 2,
    data_product_design: 1,
    named_owner: 1,
    quality_management: 1,
    ai_ready_structure: 1,
    advanced_ai: 0,
  },
  evidence: {
    csvFiles: [],
    metricDefinitionText: "",
    workflowNotesText: "",
  },
});

describe("getDeterministicChatReply", () => {
  it("explains the DRL band deterministically", () => {
    const reply = getDeterministicChatReply(session, "What DRL level is this and why?");
    expect(reply).toMatch(/DRL/i);
    expect(reply).toMatch(/likely maturity band/i);
  });

  it("returns action guidance for next-step questions", () => {
    const reply = getDeterministicChatReply(session, "What should we do next?");
    expect(reply).toMatch(/next moves/i);
    expect(reply).toMatch(/30-day/i);
  });
});
