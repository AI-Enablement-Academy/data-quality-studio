import { render, screen } from "@testing-library/react";
import { describe, expect, it, vi, beforeEach } from "vitest";

import { ResultsClient } from "@/components/diagnostics/results-client";
import { saveResult } from "@/lib/diagnostics/storage";
import { AssessmentSession } from "@/lib/diagnostics/types";
import { encodeSharedSession } from "@/lib/diagnostics/share";

const mockGet = vi.fn<(key: string) => string | null>();

vi.mock("next/navigation", () => ({
  useSearchParams: () => ({
    get: mockGet,
  }),
}));

vi.mock("next/link", () => ({
  default: ({ children, href, ...props }: React.ComponentProps<"a">) => (
    <a href={href} {...props}>
      {children}
    </a>
  ),
}));

vi.mock("@/components/diagnostics/assistant-chat", () => ({
  AssistantChat: () => <div data-testid="assistant-chat">assistant</div>,
}));

vi.mock("@/components/diagnostics/report-charts", () => ({
  ReportCharts: () => <div data-testid="report-charts">charts</div>,
}));

function buildSession(productType: "dmm" | "drl"): AssessmentSession {
  return {
    id: `${productType}-session`,
    productType,
    scopeType: "use_case",
    useCaseKey: "internal_mobility",
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
      multiple_data_sources: 3,
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
      notes: ["Use-case mode increases confidence."],
    },
    resultModel: {
      summaryCard:
        "This workflow sits in DRL 5-6 because it still depends on manual recoding, caveats, and conflicting sources.",
      topBlockers: [
        {
          key: "multiple-sources",
          title: "Multiple data sources as conflicting information",
          score: 3,
          severityLabel: "Severe",
          explanation: "Core metrics still disagree across systems.",
          contributingQuestions: ["Q2"],
        },
        {
          key: "subjective-judgement",
          title: "Subjective judgement in data production",
          score: 2,
          severityLabel: "Significant",
          explanation: "Managers still enter free-text evidence.",
          contributingQuestions: ["Q3"],
        },
        {
          key: "integration-architecture",
          title: "System integration and information architecture",
          score: 2,
          severityLabel: "Significant",
          explanation: "Analysts still maintain brittle joins.",
          contributingQuestions: ["Q10"],
        },
      ],
      rootConditionScores: [
        {
          key: "multiple-sources",
          title: "Multiple data sources as conflicting information",
          score: 3,
          severityLabel: "Severe",
          explanation: "Core metrics still disagree across systems.",
          contributingQuestions: ["Q2"],
        },
      ],
      drlBand: "DRL 5-6",
      drlRationale: {
        summary:
          "The workflow is digitally enabled, but the data is still not intentionally designed for AI consumption.",
        thresholdNotes: ["Integrated reporting exists across several systems."],
        whyNotHigher: ["Critical blockers remain in source conflict and structured inputs."],
      },
      gapToDRL7: [
        "Standardize the metric definitions and evidence fields across systems.",
        "Reduce free-text dependence in manager inputs.",
      ],
      actionPlan: [
        {
          title: "Stabilize definitions",
          summary: "Publish one metric definition card with exclusions and ownership.",
          targetConditions: ["multiple_data_sources"],
          thirtyDayMove: "Publish one canonical definition for internal mobility.",
          sixWeekPilotMove: "Pilot the definition across HRIS and talent review inputs.",
        },
      ],
      confidence: {
        label: "Moderate",
        score: 0.72,
        notes: ["Use-case mode increases confidence."],
      },
      evidenceSummary: {
        notes: [],
        tags: [],
        confidenceBoost: 0,
        rootConditionAdjustments: {},
      },
      signalScores: {
        manual_collection_risk: 1.4,
        digital_foundation: 1.9,
        byproduct_dependence: 2.1,
        data_product_discipline: 1.2,
        dpm_ownership: 1.1,
        tdqm_discipline: 1.3,
        structured_ai_readiness: 1.2,
        advanced_ai_integration: 0.6,
      },
    },
  };
}

describe("ResultsClient", () => {
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

    mockGet.mockReset();
    mockGet.mockReturnValue(null);
  });

  it("renders a saved DMM report from local storage", async () => {
    saveResult("dmm", buildSession("dmm"));

    render(<ResultsClient productType="dmm" />);

    expect(await screen.findByText("Ten Root Conditions")).toBeInTheDocument();
    expect(screen.getByText("DRL 5-6")).toBeInTheDocument();
    expect(screen.getByTestId("assistant-chat")).toBeInTheDocument();
    expect(screen.getByTestId("report-charts")).toBeInTheDocument();
  });

  it("falls back to the DMM result for DRL when launched from the DMM view", async () => {
    mockGet.mockImplementation((key) => (key === "source" ? "dmm" : null));
    saveResult("dmm", buildSession("dmm"));

    render(<ResultsClient productType="drl" />);

    expect(await screen.findByText("Gap to DRL 7")).toBeInTheDocument();
    expect(screen.getByText("Stabilize definitions")).toBeInTheDocument();
  });

  it("renders a shared report payload from the URL", async () => {
    mockGet.mockImplementation((key) =>
      key === "share" ? encodeSharedSession(buildSession("dmm")) : null,
    );

    render(<ResultsClient productType="dmm" />);

    expect(await screen.findByText("Export / share")).toBeInTheDocument();
    expect(screen.getByText("Stabilize definitions")).toBeInTheDocument();
  });
});
