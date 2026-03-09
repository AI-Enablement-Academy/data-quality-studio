import { AssessmentInput, AssessmentSession, ProductType } from "@/lib/diagnostics/types";

const draftKey = (productType: ProductType) => `diagnostics:draft:${productType}`;
const resultKey = (productType: ProductType) => `diagnostics:result:${productType}`;

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
  if (typeof window === "undefined") {
    return null;
  }

  const raw = window.localStorage.getItem(resultKey(productType));
  if (!raw) {
    return null;
  }

  try {
    return JSON.parse(raw) as AssessmentSession;
  } catch {
    return null;
  }
}

export function saveResult(productType: ProductType, result: AssessmentSession) {
  if (typeof window === "undefined") {
    return;
  }

  window.localStorage.setItem(resultKey(productType), JSON.stringify(result));
}
