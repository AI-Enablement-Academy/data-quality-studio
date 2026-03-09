import {
  DRLSignalDefinition,
  InterventionDefinition,
  RootConditionDefinition,
  UseCaseDefinition,
} from "@/lib/diagnostics/types";

export const rootConditions: RootConditionDefinition[] = [
  {
    key: "multiple_data_sources",
    title: "Multiple Data Sources as Conflicting Information",
    summary:
      "Organisations often maintain similar workforce data across different systems that may contain varying values for similar data points.",
    drl7Expectation:
      "At DRL 7, systematic data integration eliminates conflicts between multiple sources through coordinated Data-as-a-Product Manager (DPM) management.",
  },
  {
    key: "subjective_judgement",
    title: "Subjective Judgement in Data Production",
    summary:
      "Human interpretation and decision-making in data collection processes may introduce variability that affects analytical consistency.",
    drl7Expectation:
      "At DRL 7, structured collection protocols reduce subjective bias through standardised assessment instruments.",
  },
  {
    key: "resource_limitations",
    title: "Resource Limitations Affecting Data Access",
    summary:
      "Constraints on infrastructure or processing capability may limit access to comprehensive information sets.",
    drl7Expectation:
      "At DRL 7, strategic infrastructure investment ensures analytics and AI systems can access comprehensive information efficiently.",
  },
  {
    key: "security_access_balance",
    title: "Security and Accessibility Balance Considerations",
    summary:
      "The tension between data protection and analytical access creates implementation challenges.",
    drl7Expectation:
      "At DRL 7, balanced security and access is achieved through systematic information product design that maintains protection whilst enabling analysis.",
  },
  {
    key: "diverse_coding_systems",
    title: "Diverse Coding Systems Across Functions",
    summary:
      "Different departments may use varying terminology, classification systems, or data structures for similar concepts.",
    drl7Expectation:
      "At DRL 7, standardised cross-functional frameworks eliminate coding conflicts through DPM coordination.",
  },
  {
    key: "complex_representation",
    title: "Complex Data Representation Challenges",
    summary:
      "Data exists in varied formats, from structured to unstructured, which presents different analytical possibilities.",
    drl7Expectation:
      "At DRL 7, structured qualitative collection translates human values, decisions, and behaviours into standardised machine-readable data.",
  },
  {
    key: "volume_processing",
    title: "Data Volume and Processing Relationships",
    summary:
      "The relationship between information quantity and processing capability creates analytical trade-offs.",
    drl7Expectation:
      "At DRL 7, focused collection strategy emphasises quality over volume through systematic design.",
  },
  {
    key: "input_standards",
    title: "Data Input Standards and User Behavior Patterns",
    summary:
      "The interaction between formal data collection requirements and actual user behaviour often creates implementation variability.",
    drl7Expectation:
      "At DRL 7, systematic input standards balance usability with consistency through TDQM principles.",
  },
  {
    key: "evolving_requirements",
    title: "Evolving Information Requirements",
    summary:
      "Organisational needs and analytical objectives change over time, creating misalignment between historical collection methods and current analytical requirements.",
    drl7Expectation:
      "At DRL 7, adaptive information products evolve with changing analytical requirements through continuous improvement.",
  },
  {
    key: "system_integration",
    title: "System Integration and Information Architecture",
    summary:
      "The relationship between distributed information systems and comprehensive analytical access presents architectural considerations.",
    drl7Expectation:
      "At DRL 7, integrated system architecture provides comprehensive data access through systematic information product design.",
  },
];

export const drlSignals: DRLSignalDefinition[] = [
  { key: "manual_collection_risk", title: "Manual collection risk", direction: "risk" },
  { key: "digital_foundation", title: "Digital collection foundation", direction: "maturity" },
  { key: "byproduct_dependence", title: "By-product dependence", direction: "risk" },
  { key: "data_product_discipline", title: "Information Product / DAP discipline", direction: "maturity" },
  { key: "dpm_ownership", title: "DPM coordination", direction: "maturity" },
  { key: "tdqm_discipline", title: "TDQM-style quality discipline", direction: "maturity" },
  { key: "structured_ai_readiness", title: "Structured AI readiness", direction: "maturity" },
  { key: "advanced_ai_integration", title: "Advanced AI integration", direction: "maturity" },
];

export const useCases: UseCaseDefinition[] = [
  {
    key: "attrition",
    title: "Attrition / Regretted Attrition",
    summary: "Diagnose the data maturity behind retention, regretted loss, and exit-risk workflows.",
  },
  {
    key: "internal_mobility",
    title: "Internal Mobility",
    summary: "Diagnose how role, skill, and readiness signals support internal movement decisions.",
  },
  {
    key: "succession",
    title: "Succession / Readiness",
    summary: "Diagnose whether readiness and potential signals are reliable enough for high-stakes planning.",
  },
  {
    key: "skills",
    title: "Skills / Capability Data",
    summary: "Diagnose whether skill data is structured, trustworthy, and useful beyond profiles.",
  },
  {
    key: "quality_of_hire",
    title: "Quality of Hire",
    summary: "Diagnose whether recruiting and downstream performance signals form a usable information product.",
  },
  {
    key: "general_workforce",
    title: "General Workforce Analytics",
    summary: "Use a broader diagnostic when the workflow is not limited to one people analytics use case.",
  },
];

export const interventionCatalog: InterventionDefinition[] = [
  {
    id: "source-truth",
    title: "Source Truth Alignment",
    summary:
      "Establish an explicit source-of-truth and reconciliation policy before the next analysis cycle.",
    targetConditions: ["multiple_data_sources", "system_integration", "diverse_coding_systems"],
    thirtyDayMove:
      "Document one canonical metric definition, source owner, and exception rule for the assessed workflow.",
    pilotMove:
      "Run a 6-week reconciliation sprint across the top conflicting systems with defined DPM ownership.",
  },
  {
    id: "structured-evidence",
    title: "Structured Evidence Capture",
    summary:
      "Replace vague judgement and free text with guided prompts, rubrics, and comparable evidence fields.",
    targetConditions: ["subjective_judgement", "complex_representation", "input_standards"],
    thirtyDayMove:
      "Redesign one assessment or review form so the highest-risk judgement calls become structured evidence.",
    pilotMove:
      "Pilot a structured capture instrument for one high-stakes use case and validate consistency improvements.",
  },
  {
    id: "taxonomy-harmonization",
    title: "Coding and Taxonomy Harmonization",
    summary:
      "Define canonical labels and translation rules so systems stop competing at the definition layer.",
    targetConditions: ["diverse_coding_systems", "multiple_data_sources", "system_integration"],
    thirtyDayMove:
      "Publish a translation table for one taxonomy family such as job levels, skills, or functions.",
    pilotMove:
      "Deploy a harmonized taxonomy pack into one workflow and measure joinability and cycle-time improvement.",
  },
  {
    id: "quality-discipline",
    title: "TDQM-Style Quality Discipline",
    summary:
      "Introduce measurable quality checks at point of entry and before downstream reuse.",
    targetConditions: ["input_standards", "evolving_requirements", "resource_limitations"],
    thirtyDayMove:
      "Set three measurable quality rules, owners, and review cadence for the diagnosed workflow.",
    pilotMove:
      "Run a 6-week quality loop with baseline, monitoring, and remediation against the highest-risk inputs.",
  },
  {
    id: "ownership-control",
    title: "DPM Ownership and Escalation",
    summary:
      "Assign named responsibility across business, data, and technical stakeholders for the information product.",
    targetConditions: ["resource_limitations", "security_access_balance", "system_integration"],
    thirtyDayMove:
      "Name one accountable owner, one escalation route, and one review rhythm for the assessed workflow.",
    pilotMove:
      "Pilot a DPM-style operating model across one use case with explicit decision rights and issue tracking.",
  },
  {
    id: "ai-readiness",
    title: "AI Readiness Gate",
    summary:
      "Set a deterministic gate for whether the current data product is fit for predictive or generative AI use.",
    targetConditions: ["complex_representation", "volume_processing", "input_standards"],
    thirtyDayMove:
      "Define a simple pass-fail gate covering structure, missingness, ambiguity, and caveats.",
    pilotMove:
      "Apply the readiness gate to one real dataset and remediate the blocking issues before model exposure.",
  },
];
