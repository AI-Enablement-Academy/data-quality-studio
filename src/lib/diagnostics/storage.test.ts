import { beforeEach, describe, expect, it } from "vitest";

import {
  clearLocalDiagnosticsData,
  getSavedReports,
  loadDraft,
  loadReportById,
  saveDraft,
  saveResult,
} from "@/lib/diagnostics/storage";
import { buildFixtureSession } from "@/lib/diagnostics/test-fixtures";
import { AssessmentInput } from "@/lib/diagnostics/types";

function buildDraft(): AssessmentInput {
  return {
    productType: "dmm",
    scopeType: "use_case",
    useCaseKey: "general_workforce",
    answers: {
      manual_dependency: 2,
    },
    evidence: {
      csvFiles: [{ fileName: "people.csv", content: "id,name\n1,Ada" }],
      metricDefinitionText: "Attrition excludes interns.",
      workflowNotesText: "Finance and HR still reconcile headcount manually.",
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
    const dmmSession = buildFixtureSession("dmm");
    const drlSession = buildFixtureSession("drl");

    saveResult("dmm", dmmSession);
    saveResult("drl", drlSession);

    const savedReports = getSavedReports();

    expect(savedReports).toHaveLength(2);
    expect(savedReports[0]?.id).toBe(drlSession.id);
    expect(savedReports[0]?.expiresAt).toBeTruthy();
    expect(savedReports[1]?.id).toBe(dmmSession.id);
    expect(loadReportById(dmmSession.id)?.resultModel.summaryCard).toBe(dmmSession.resultModel.summaryCard);
  });

  it("sanitizes raw evidence before draft autosave", () => {
    saveDraft("dmm", buildDraft());

    const loaded = loadDraft("dmm");

    expect(loaded?.answers.manual_dependency).toBe(2);
    expect(loaded?.evidence.csvFiles).toEqual([]);
    expect(loaded?.evidence.metricDefinitionText).toBe("");
    expect(loaded?.evidence.workflowNotesText).toBe("");
  });

  it("clears all saved diagnostic data from the browser", () => {
    saveDraft("dmm", buildDraft());
    saveResult("dmm", buildFixtureSession("dmm"));

    clearLocalDiagnosticsData();

    expect(loadDraft("dmm")).toBeNull();
    expect(getSavedReports()).toEqual([]);
  });
});
