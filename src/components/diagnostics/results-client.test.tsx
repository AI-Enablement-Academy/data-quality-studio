import { render, screen } from "@testing-library/react";
import { describe, expect, it, vi, beforeEach } from "vitest";

import { ResultsClient } from "@/components/diagnostics/results-client";
import { saveResult } from "@/lib/diagnostics/storage";
import { encodeSharedSession } from "@/lib/diagnostics/share";
import { buildFixtureSession } from "@/lib/diagnostics/test-fixtures";

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
    saveResult("dmm", buildFixtureSession("dmm"));

    render(<ResultsClient productType="dmm" />);

    expect(await screen.findByText("Ten Root Conditions")).toBeInTheDocument();
    expect(screen.getByText("DRL 5-6")).toBeInTheDocument();
    expect(screen.getByTestId("assistant-chat")).toBeInTheDocument();
    expect(screen.getByTestId("report-charts")).toBeInTheDocument();
  });

  it("falls back to the DMM result for DRL when launched from the DMM view", async () => {
    mockGet.mockImplementation((key) => (key === "source" ? "dmm" : null));
    saveResult("dmm", buildFixtureSession("dmm"));

    render(<ResultsClient productType="drl" />);

    expect(await screen.findByText("Gap to DRL 7")).toBeInTheDocument();
    expect(screen.getByText("Stabilize definitions")).toBeInTheDocument();
  });

  it("renders a shared report payload from the URL", async () => {
    mockGet.mockImplementation((key) =>
      key === "share" ? encodeSharedSession(buildFixtureSession("dmm")) : null,
    );

    render(<ResultsClient productType="dmm" />);

    expect(await screen.findByText("Export / share")).toBeInTheDocument();
    expect(screen.getByText("Stabilize definitions")).toBeInTheDocument();
  });
});
