import { afterEach, describe, expect, it } from "vitest";

import {
  consumeChatRateLimit,
  getClientIdentifier,
  resetChatRateLimitStore,
  validateChatBody,
} from "@/lib/diagnostics/chat-guard";
import { AssessmentSession } from "@/lib/diagnostics/types";

function buildSession(): AssessmentSession {
  return {
    id: "session-1",
    productType: "dmm",
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
      multiple_data_sources: 2,
      subjective_judgement: 2,
      resource_limitations: 1,
      security_access_balance: 1,
      diverse_coding_systems: 2,
      complex_representation: 2,
      volume_processing: 1,
      input_standards: 2,
      evolving_requirements: 1,
      system_integration: 2,
    },
    drlBand: "DRL 5-6",
    confidence: {
      label: "Moderate",
      score: 0.72,
      notes: ["Use-case mode improves confidence."],
    },
    resultModel: {
      summaryCard: "Summary",
      topBlockers: [],
      rootConditionScores: [],
      drlBand: "DRL 5-6",
      drlRationale: {
        band: "DRL 5-6",
        summary: "Rationale",
        whyNotHigher: [],
        thresholdNotes: [],
      },
      gapToDRL7: ["Gap"],
      actionPlan: [],
      confidence: {
        label: "Moderate",
        score: 0.72,
        notes: ["Use-case mode improves confidence."],
      },
      evidenceSummary: {
        notes: [],
        tags: [],
        confidenceBoost: 0,
        rootConditionAdjustments: {},
      },
      signalScores: {
        manual_collection_risk: 1.2,
        digital_foundation: 1.8,
        byproduct_dependence: 1.6,
        data_product_discipline: 1.4,
        dpm_ownership: 1.2,
        tdqm_discipline: 1.1,
        structured_ai_readiness: 1.3,
        advanced_ai_integration: 0.8,
      },
    },
  };
}

afterEach(() => {
  resetChatRateLimitStore();
});

describe("validateChatBody", () => {
  it("accepts a safe request shape", () => {
    const result = validateChatBody({
      messages: [{ role: "user", content: "What blocks DRL 7?" }],
      session: buildSession(),
    });

    expect(result.ok).toBe(true);
  });

  it("rejects oversized or invalid message payloads", () => {
    const result = validateChatBody({
      messages: [{ role: "user", content: "x".repeat(1601) }],
      session: buildSession(),
    });

    expect(result.ok).toBe(false);
  });
});

describe("consumeChatRateLimit", () => {
  it("blocks once the in-memory window is exhausted", () => {
    let finalResult = consumeChatRateLimit("client-a", 0);

    for (let index = 0; index < 11; index += 1) {
      finalResult = consumeChatRateLimit("client-a", 0);
    }

    expect(finalResult.allowed).toBe(true);

    const blocked = consumeChatRateLimit("client-a", 0);
    expect(blocked.allowed).toBe(false);
    expect(blocked.retryAfterSeconds).toBeGreaterThan(0);
  });
});

describe("getClientIdentifier", () => {
  it("prefers x-forwarded-for", () => {
    const headers = new Headers({
      "x-forwarded-for": "203.0.113.8, 10.0.0.1",
      "x-real-ip": "198.51.100.4",
    });

    expect(getClientIdentifier(headers)).toBe("203.0.113.8");
  });
});
