import { AssessmentSession, ProductType } from "@/lib/diagnostics/types";

export function buildFixtureSession(productType: ProductType = "dmm"): AssessmentSession {
  return {
    id: `${productType}-fixture-session`,
    productType,
    scopeType: "use_case",
    useCaseKey: "internal_mobility",
    startedAt: "2026-03-09T10:00:00.000Z",
    completedAt: "2026-03-09T10:10:00.000Z",
    answers: {},
    evidenceSummary: {
      notes: ["Evidence suggests monthly reconciliation across HRIS and payroll."],
      tags: ["multiple-sources", "taxonomy"],
      confidenceBoost: 0.1,
      rootConditionAdjustments: {
        multiple_data_sources: 1,
        diverse_coding_systems: 1,
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
      system_integration: 2,
    },
    drlBand: "DRL 5-6",
    confidence: {
      label: "Moderate",
      score: 0.72,
      notes: ["Use-case mode improves confidence."],
    },
    resultModel: {
      summaryCard:
        "This workflow sits in DRL 5-6 because it still depends on manual recoding, caveats, and conflicting sources.",
      topBlockers: [
        {
          key: "multiple_data_sources",
          title: "Multiple Data Sources as Conflicting Information",
          score: 3,
          severityLabel: "Severe",
          explanation: "Core metrics still disagree across systems.",
          contributingQuestions: ["Q2"],
        },
        {
          key: "subjective_judgement",
          title: "Subjective Judgement in Data Production",
          score: 2,
          severityLabel: "Significant",
          explanation: "Managers still enter free-text evidence.",
          contributingQuestions: ["Q3"],
        },
        {
          key: "system_integration",
          title: "System Integration and Information Architecture",
          score: 2,
          severityLabel: "Significant",
          explanation: "Analysts still maintain brittle joins.",
          contributingQuestions: ["Q10"],
        },
      ],
      rootConditionScores: [
        {
          key: "multiple_data_sources",
          title: "Multiple Data Sources as Conflicting Information",
          score: 3,
          severityLabel: "Severe",
          explanation: "Core metrics still disagree across systems.",
          contributingQuestions: ["Q2"],
        },
        {
          key: "subjective_judgement",
          title: "Subjective Judgement in Data Production",
          score: 2,
          severityLabel: "Significant",
          explanation: "Managers still enter free-text evidence.",
          contributingQuestions: ["Q3"],
        },
      ],
      drlBand: "DRL 5-6",
      drlRationale: {
        band: "DRL 5-6",
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
        notes: ["Use-case mode improves confidence."],
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
