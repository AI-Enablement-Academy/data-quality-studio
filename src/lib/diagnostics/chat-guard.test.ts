import { afterEach, describe, expect, it } from "vitest";

import {
  consumeChatRateLimit,
  getClientIdentifier,
  resetChatRateLimitStore,
  validateAssessmentSession,
  validateChatBody,
  validateRequestSize,
  validateTrustedOrigin,
} from "@/lib/diagnostics/chat-guard";
import { buildFixtureSession } from "@/lib/diagnostics/test-fixtures";

afterEach(() => {
  resetChatRateLimitStore();
});

describe("validateChatBody", () => {
  it("accepts a safe request shape", () => {
    const result = validateChatBody({
      messages: [{ role: "user", content: "What blocks DRL 7?" }],
      session: buildFixtureSession("dmm"),
    });

    expect(result.ok).toBe(true);
  });

  it("rejects oversized or invalid message payloads", () => {
    const result = validateChatBody({
      messages: [{ role: "user", content: "x".repeat(1601) }],
      session: buildFixtureSession("dmm"),
    });

    expect(result.ok).toBe(false);
  });
});

describe("validateAssessmentSession", () => {
  it("accepts a fixture assessment session", () => {
    const result = validateAssessmentSession(buildFixtureSession("dmm"));

    expect(result.ok).toBe(true);
  });
});

describe("consumeChatRateLimit", () => {
  it("blocks once the in-memory window is exhausted", () => {
    let finalResult = consumeChatRateLimit("client-a", 0);

    for (let index = 0; index < 11; index += 1) {
      finalResult = consumeChatRateLimit("client-a", 0);
    }

    expect(finalResult.allowed).toBe(true);

    const blocked = consumeChatRateLimit("client-a", 0);
    expect(blocked.allowed).toBe(false);
    expect(blocked.retryAfterSeconds).toBeGreaterThan(0);
  });
});

describe("getClientIdentifier", () => {
  it("prefers x-forwarded-for", () => {
    const headers = new Headers({
      "x-forwarded-for": "203.0.113.8, 10.0.0.1",
      "x-real-ip": "198.51.100.4",
      "user-agent": "vitest-agent",
    });

    expect(getClientIdentifier(headers)).toContain("203.0.113.8");
  });
});

describe("request validation helpers", () => {
  it("accepts same-origin requests", () => {
    const headers = new Headers({
      origin: "https://data-maturity.example",
    });

    expect(validateTrustedOrigin("https://data-maturity.example/api/chat", headers)).toBe(true);
  });

  it("rejects oversized request bodies", () => {
    const headers = new Headers({
      "content-length": "100001",
    });

    expect(validateRequestSize(headers)).toBe(false);
  });
});
