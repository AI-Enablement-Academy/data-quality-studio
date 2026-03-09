import { beforeEach, describe, expect, it } from "vitest";

import { getSavedReports, loadReportById, saveResult } from "@/lib/diagnostics/storage";
import { AssessmentSession } from "@/lib/diagnostics/types";

function buildSession(id: string, productType: "dmm" | "drl"): AssessmentSession {
  return {
    id,
    productType,
    scopeType: "use_case",
    useCaseKey: "general_workforce",
    startedAt: "2026-03-09T10:00:00.000Z",
    completedAt: "2026-03-09T10:10:00.000Z",
    answers: {},
    evidenceSummary: {
      notes: [],
      tags: [],
      confidenceBoost: 0,
      rootConditionAdjustments: {},
    },
    scores: {
      multiple_data_sources: 1,
      subjective_judgement: 1,
      resource_limitations: 1,
      security_access_balance: 1,
      diverse_coding_systems: 1,
      complex_representation: 1,
      volume_processing: 1,
      input_standards: 1,
      evolving_requirements: 1,
      system_integration: 1,
    },
    drlBand: "DRL 5-6",
    confidence: {
      label: "Moderate",
      score: 0.7,
      notes: ["Use case mode improves confidence."],
    },
    resultModel: {
      topBlockers: [],
      rootConditionScores: [],
      drlBand: "DRL 5-6",
      drlRationale: {
        band: "DRL 5-6",
        summary: "By-product data still dominates.",
        whyNotHigher: ["DPM discipline is still weak."],
        thresholdNotes: ["Digital foundation exists."],
      },
      gapToDRL7: ["Treat the workflow as a data product."],
      actionPlan: [],
      summaryCard: `${id} summary`,
      confidence: {
        label: "Moderate",
        score: 0.7,
        notes: ["Use case mode improves confidence."],
      },
      evidenceSummary: {
        notes: [],
        tags: [],
        confidenceBoost: 0,
        rootConditionAdjustments: {},
      },
      signalScores: {
        manual_collection_risk: 1,
        digital_foundation: 2,
        byproduct_dependence: 2,
        data_product_discipline: 1,
        dpm_ownership: 1,
        tdqm_discipline: 1,
        structured_ai_readiness: 1,
        advanced_ai_integration: 0,
      },
    },
  };
}

describe("report storage", () => {
  beforeEach(() => {
    const store = new Map<string, string>();
    Object.defineProperty(window, "localStorage", {
      configurable: true,
      value: {
        getItem: (key: string) => store.get(key) ?? null,
        setItem: (key: string, value: string) => {
          store.set(key, value);
        },
        removeItem: (key: string) => {
          store.delete(key);
        },
        clear: () => {
          store.clear();
        },
      },
    });
  });

  it("stores results in recent history and loads them by id", () => {
    const dmmSession = buildSession("session-dmm", "dmm");
    const drlSession = buildSession("session-drl", "drl");

    saveResult("dmm", dmmSession);
    saveResult("drl", drlSession);

    const savedReports = getSavedReports();

    expect(savedReports).toHaveLength(2);
    expect(savedReports[0]?.id).toBe("session-drl");
    expect(savedReports[1]?.id).toBe("session-dmm");
    expect(loadReportById("session-dmm")?.resultModel.summaryCard).toBe("session-dmm summary");
  });
});
