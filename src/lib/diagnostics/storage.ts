import { AssessmentInput, AssessmentSession, ProductType, SavedReportSummary } from "@/lib/diagnostics/types";

const draftKey = (productType: ProductType) => `diagnostics:draft:${productType}`;
const resultKey = (productType: ProductType) => `diagnostics:result:${productType}`;
const reportHistoryKey = "diagnostics:report-history:v1";
const reportItemKey = (reportId: string) => `diagnostics:report-item:${reportId}`;

export function loadDraft(productType: ProductType): AssessmentInput | null {
  if (typeof window === "undefined") {
    return null;
  }

  const raw = window.localStorage.getItem(draftKey(productType));
  if (!raw) {
    return null;
  }

  try {
    return JSON.parse(raw) as AssessmentInput;
  } catch {
    return null;
  }
}

export function saveDraft(productType: ProductType, draft: AssessmentInput) {
  if (typeof window === "undefined") {
    return;
  }

  window.localStorage.setItem(draftKey(productType), JSON.stringify(draft));
}

export function clearDraft(productType: ProductType) {
  if (typeof window === "undefined") {
    return;
  }

  window.localStorage.removeItem(draftKey(productType));
}

export function loadResult(productType: ProductType): AssessmentSession | null {
  const raw = loadResultSnapshot(productType);
  if (!raw) {
    return null;
  }

  return parseResultSnapshot(raw);
}

export function loadResultSnapshot(productType: ProductType): string | null {
  if (typeof window === "undefined") {
    return null;
  }

  return window.localStorage.getItem(resultKey(productType));
}

export function parseResultSnapshot(raw: string): AssessmentSession | null {
  if (!raw) {
    return null;
  }

  try {
    return JSON.parse(raw) as AssessmentSession;
  } catch {
    return null;
  }
}

function buildSavedReportSummary(result: AssessmentSession): SavedReportSummary {
  return {
    id: result.id,
    productType: result.productType,
    scopeType: result.scopeType,
    useCaseKey: result.useCaseKey,
    completedAt: result.completedAt,
    drlBand: result.drlBand,
    summaryCard: result.resultModel.summaryCard,
    topBlockerTitles: result.resultModel.topBlockers.map((item) => item.title),
  };
}

function parseSavedReportHistory(raw: string | null): SavedReportSummary[] {
  if (!raw) {
    return [];
  }

  try {
    return JSON.parse(raw) as SavedReportSummary[];
  } catch {
    return [];
  }
}

export function getSavedReports(productType?: ProductType): SavedReportSummary[] {
  if (typeof window === "undefined") {
    return [];
  }

  const history = parseSavedReportHistory(window.localStorage.getItem(reportHistoryKey));
  if (!productType) {
    return history;
  }

  return history.filter((report) => report.productType === productType);
}

export function loadReportById(reportId: string): AssessmentSession | null {
  if (typeof window === "undefined") {
    return null;
  }

  const raw = window.localStorage.getItem(reportItemKey(reportId));
  if (!raw) {
    return null;
  }

  return parseResultSnapshot(raw);
}

export function saveResult(productType: ProductType, result: AssessmentSession) {
  if (typeof window === "undefined") {
    return;
  }

  const serialized = JSON.stringify(result);
  const summary = buildSavedReportSummary(result);
  const nextHistory = [
    summary,
    ...getSavedReports().filter((item) => item.id !== result.id),
  ].slice(0, 12);

  window.localStorage.setItem(resultKey(productType), serialized);
  window.localStorage.setItem(reportItemKey(result.id), serialized);
  window.localStorage.setItem(reportHistoryKey, JSON.stringify(nextHistory));
}
