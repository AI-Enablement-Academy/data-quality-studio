import { describe, expect, it } from "vitest";

import { renderReportPdfBuffer } from "@/lib/diagnostics/pdf";
import { buildFixtureSession } from "@/lib/diagnostics/test-fixtures";

describe("renderReportPdfBuffer", () => {
  it("renders a DMM report to a non-empty PDF buffer", async () => {
    const output = await renderReportPdfBuffer(buildFixtureSession("dmm"));

    expect(output).toBeTruthy();
  });

  it("renders a DRL report to a non-empty PDF buffer", async () => {
    const output = await renderReportPdfBuffer(buildFixtureSession("drl"));

    expect(output).toBeTruthy();
  });
});
