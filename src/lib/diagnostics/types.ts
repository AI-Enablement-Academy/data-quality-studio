export type ProductType = "dmm" | "drl";
export type ScopeType = "use_case" | "organization";
export type ScoreDirection = "risk" | "maturity";
export type ConfidenceLabel = "Low" | "Moderate" | "High";

export type RootConditionKey =
  | "multiple_data_sources"
  | "subjective_judgement"
  | "resource_limitations"
  | "security_access_balance"
  | "diverse_coding_systems"
  | "complex_representation"
  | "volume_processing"
  | "input_standards"
  | "evolving_requirements"
  | "system_integration";

export type DRLSignalKey =
  | "manual_collection_risk"
  | "digital_foundation"
  | "byproduct_dependence"
  | "data_product_discipline"
  | "dpm_ownership"
  | "tdqm_discipline"
  | "structured_ai_readiness"
  | "advanced_ai_integration";

export type DRLBand =
  | "DRL 1-2"
  | "DRL 3-4"
  | "DRL 5-6"
  | "DRL 7"
  | "Emerging DRL 8-9";

export type UseCaseKey =
  | "attrition"
  | "internal_mobility"
  | "succession"
  | "skills"
  | "quality_of_hire"
  | "general_workforce";

export type AnswerValue = 0 | 1 | 2 | 3;

export interface RootConditionDefinition {
  key: RootConditionKey;
  title: string;
  summary: string;
  drl7Expectation: string;
}

export interface DRLSignalDefinition {
  key: DRLSignalKey;
  title: string;
  direction: ScoreDirection;
}

export interface UseCaseDefinition {
  key: UseCaseKey;
  title: string;
  summary: string;
}

export interface InterventionDefinition {
  id: string;
  title: string;
  summary: string;
  targetConditions: RootConditionKey[];
  thirtyDayMove: string;
  pilotMove: string;
}

export interface QuestionOption {
  value: AnswerValue;
  label: string;
  description: string;
}

export interface QuestionDefinition {
  id: string;
  shortLabel: string;
  prompt: string;
  helpText: string;
  direction: ScoreDirection;
  productTypes: ProductType[];
  scopeTypes: ScopeType[];
  rootWeights: Partial<Record<RootConditionKey, number>>;
  signalWeights: Partial<Record<DRLSignalKey, number>>;
  options: QuestionOption[];
}

export interface EvidenceInput {
  csvFiles: Array<{
    fileName: string;
    content: string;
  }>;
  metricDefinitionText: string;
  workflowNotesText: string;
}

export interface EvidenceSummary {
  notes: string[];
  tags: string[];
  confidenceBoost: number;
  rootConditionAdjustments: Partial<Record<RootConditionKey, number>>;
}

export interface AssessmentAnswers {
  [questionId: string]: AnswerValue | undefined;
}

export interface AssessmentInput {
  productType: ProductType;
  scopeType: ScopeType;
  useCaseKey: UseCaseKey | null;
  answers: AssessmentAnswers;
  evidence: EvidenceInput;
}

export interface RootConditionScore {
  key: RootConditionKey;
  title: string;
  score: AnswerValue;
  severityLabel: "No current issue" | "Mild" | "Significant" | "Severe";
  explanation: string;
  contributingQuestions: string[];
}

export interface DRLRationale {
  band: DRLBand;
  summary: string;
  whyNotHigher: string[];
  thresholdNotes: string[];
}

export interface ActionPlanItem {
  title: string;
  summary: string;
  targetConditions: RootConditionKey[];
  thirtyDayMove: string;
  sixWeekPilotMove: string;
}

export interface ResultModel {
  topBlockers: RootConditionScore[];
  rootConditionScores: RootConditionScore[];
  drlBand: DRLBand;
  drlRationale: DRLRationale;
  gapToDRL7: string[];
  actionPlan: ActionPlanItem[];
  summaryCard: string;
  confidence: {
    label: ConfidenceLabel;
    score: number;
    notes: string[];
  };
  evidenceSummary: EvidenceSummary;
  signalScores: Record<DRLSignalKey, number>;
}

export interface AssessmentSession {
  id: string;
  productType: ProductType;
  scopeType: ScopeType;
  useCaseKey: UseCaseKey | null;
  startedAt: string;
  completedAt: string;
  answers: AssessmentAnswers;
  evidenceSummary: EvidenceSummary;
  scores: Record<RootConditionKey, AnswerValue>;
  drlBand: DRLBand;
  confidence: ResultModel["confidence"];
  resultModel: ResultModel;
}

export interface SavedReportSummary {
  id: string;
  productType: ProductType;
  scopeType: ScopeType;
  useCaseKey: UseCaseKey | null;
  completedAt: string;
  expiresAt: string;
  drlBand: DRLBand;
  summaryCard: string;
  topBlockerTitles: string[];
}
