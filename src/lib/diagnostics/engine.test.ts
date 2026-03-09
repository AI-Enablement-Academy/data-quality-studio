import { buildResultModel } from "@/lib/diagnostics/engine";
import { AssessmentInput, AssessmentAnswers } from "@/lib/diagnostics/types";

function buildAnswers(values: Partial<AssessmentAnswers>): AssessmentAnswers {
  return values;
}

function buildInput(overrides: Partial<AssessmentInput>): AssessmentInput {
  return {
    productType: "dmm",
    scopeType: "use_case",
    useCaseKey: "internal_mobility",
    answers: {},
    evidence: {
      csvFiles: [],
      metricDefinitionText: "",
      workflowNotesText: "",
    },
    ...overrides,
  };
}

describe("buildResultModel", () => {
  it("classifies a typical digitally enabled but by-product workflow as DRL 5-6", () => {
    const result = buildResultModel(
      buildInput({
        answers: buildAnswers({
          manual_dependency: 1,
          source_conflict: 3,
          subjective_capture: 2,
          access_friction: 1,
          taxonomy_mismatch: 3,
          representation_complexity: 2,
          volume_drag: 2,
          input_variability: 2,
          requirements_drift: 2,
          integration_gaps: 3,
          digital_foundation: 2,
          data_product_design: 1,
          named_owner: 1,
          quality_management: 1,
          ai_ready_structure: 1,
          advanced_ai: 0,
        }),
        evidence: {
          csvFiles: [
            {
              fileName: "mobility.csv",
              content: "employee_id,job_level,job_level\n1,L4,L4",
            },
          ],
          metricDefinitionText: "",
          workflowNotesText:
            "We export from ATS and HRIS, then manually recode job levels before leaders review mobility readiness.",
        },
      }),
    );

    expect(result.drlBand).toBe("DRL 5-6");
    expect(result.topBlockers).toHaveLength(3);
    expect(result.topBlockers[0].score).toBeGreaterThanOrEqual(2);
    expect(result.gapToDRL7.length).toBeGreaterThan(0);
    expect(result.confidence.label).toBe("High");
  });

  it("blocks DRL 7 when critical root conditions remain severe", () => {
    const result = buildResultModel(
      buildInput({
        answers: buildAnswers({
          manual_dependency: 0,
          source_conflict: 3,
          subjective_capture: 3,
          access_friction: 0,
          taxonomy_mismatch: 3,
          representation_complexity: 1,
          volume_drag: 1,
          input_variability: 3,
          requirements_drift: 1,
          integration_gaps: 3,
          digital_foundation: 3,
          data_product_design: 3,
          named_owner: 3,
          quality_management: 3,
          ai_ready_structure: 3,
          advanced_ai: 2,
        }),
      }),
    );

    expect(result.drlBand).not.toBe("DRL 7");
    expect(result.gapToDRL7.join(" ")).toMatch(/critical|multiple data sources|subjective/i);
  });

  it("awards DRL 7 when data-product, ownership, and quality signals are all present", () => {
    const result = buildResultModel(
      buildInput({
        answers: buildAnswers({
          manual_dependency: 0,
          source_conflict: 1,
          subjective_capture: 0,
          access_friction: 1,
          taxonomy_mismatch: 1,
          representation_complexity: 1,
          volume_drag: 1,
          input_variability: 1,
          requirements_drift: 1,
          integration_gaps: 1,
          digital_foundation: 3,
          data_product_design: 3,
          named_owner: 3,
          quality_management: 3,
          ai_ready_structure: 3,
          advanced_ai: 2,
        }),
      }),
    );

    expect(result.drlBand).toBe("DRL 7");
    expect(result.drlRationale.summary).toMatch(/strategic product breakthrough/i);
  });
});
