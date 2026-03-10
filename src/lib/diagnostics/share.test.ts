import { describe, expect, it } from "vitest";

import { decodeSharedSession, encodeSharedSession } from "@/lib/diagnostics/share";
import { AssessmentSession } from "@/lib/diagnostics/types";

function buildSession(): AssessmentSession {
  return {
    id: "shared-session",
    productType: "dmm",
    scopeType: "use_case",
    useCaseKey: "general_workforce",
    startedAt: "2026-03-09T10:00:00.000Z",
    completedAt: "2026-03-09T10:10:00.000Z",
    answers: {},
    evidenceSummary: {
      notes: ["Evidence mentions manual reconciliation."],
      tags: ["multiple-sources"],
      confidenceBoost: 0.1,
      rootConditionAdjustments: {
        multiple_data_sources: 1,
      },
    },
    scores: {
      multiple_data_sources: 3,
      subjective_judgement: 2,
      resource_limitations: 1,
      security_access_balance: 1,
      diverse_coding_systems: 2,
      complex_representation: 2,
      volume_processing: 1,
      input_standards: 2,
      evolving_requirements: 1,
      system_integration: 3,
    },
    drlBand: "DRL 5-6",
    confidence: {
      label: "High",
      score: 0.92,
      notes: ["Use case mode improves confidence."],
    },
    resultModel: {
      topBlockers: [],
      rootConditionScores: [],
      drlBand: "DRL 5-6",
      drlRationale: {
        band: "DRL 5-6",
        summary: "Still operating with by-product data and manual translation.",
        whyNotHigher: ["Structured AI readiness is still weak."],
        thresholdNotes: ["Digital foundation exists, but DAP discipline is weak."],
      },
      gapToDRL7: ["Treat this workflow as an information product."],
      actionPlan: [],
      summaryCard: "This workflow remains in DRL 5-6.",
      confidence: {
        label: "High",
        score: 0.92,
        notes: ["Use case mode improves confidence."],
      },
      evidenceSummary: {
        notes: ["Evidence mentions manual reconciliation."],
        tags: ["multiple-sources"],
        confidenceBoost: 0.1,
        rootConditionAdjustments: {
          multiple_data_sources: 1,
        },
      },
      signalScores: {
        manual_collection_risk: 2.2,
        digital_foundation: 2.1,
        byproduct_dependence: 2.5,
        data_product_discipline: 1.2,
        dpm_ownership: 1.1,
        tdqm_discipline: 1.3,
        structured_ai_readiness: 1.2,
        advanced_ai_integration: 0.6,
      },
    },
  };
}

describe("share helpers", () => {
  it("round-trips a shareable assessment session", () => {
    const session = buildSession();

    const encoded = encodeSharedSession(session);
    const decoded = decodeSharedSession(encoded);

    expect(encoded.length).toBeGreaterThan(0);
    expect(decoded).toEqual(session);
  });

  it("returns null for malformed input", () => {
    expect(decodeSharedSession("not-a-valid-share-payload")).toBeNull();
  });
});
