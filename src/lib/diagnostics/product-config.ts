import { ProductType } from "@/lib/diagnostics/types";

export interface ProductConfig {
  productType: ProductType;
  title: string;
  shortTitle: string;
  summary: string;
  positioning: string;
  routeBase: `/${ProductType}`;
  questionIds: string[];
}

export const productConfigs: Record<ProductType, ProductConfig> = {
  dmm: {
    productType: "dmm",
    title: "DMM Diagnostic",
    shortTitle: "DMM",
    summary:
      "Diagnose the Ten Root Conditions that block trustworthy people analytics and AI readiness.",
    positioning:
      "Use DMM when you need to find what is actually broken in a workflow, not just label maturity at a distance.",
    routeBase: "/dmm",
    questionIds: [
      "manual_dependency",
      "source_conflict",
      "subjective_capture",
      "access_friction",
      "taxonomy_mismatch",
      "representation_complexity",
      "volume_drag",
      "input_variability",
      "requirements_drift",
      "integration_gaps",
      "digital_foundation",
      "data_product_design",
      "named_owner",
      "quality_management",
      "ai_ready_structure",
      "advanced_ai",
    ],
  },
  drl: {
    productType: "drl",
    title: "DRL Diagnostic",
    shortTitle: "DRL",
    summary:
      "Estimate the likely Data Readiness Level for a workflow and show the gap to DRL 7.",
    positioning:
      "Use DRL when you need a sharper maturity signal for sponsors, grounded in deterministic evidence rather than a vague quiz.",
    routeBase: "/drl",
    questionIds: [
      "manual_dependency",
      "source_conflict",
      "subjective_capture",
      "integration_gaps",
      "digital_foundation",
      "data_product_design",
      "named_owner",
      "quality_management",
      "ai_ready_structure",
      "advanced_ai",
    ],
  },
};
