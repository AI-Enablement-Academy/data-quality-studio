import { AssessmentSession } from "@/lib/diagnostics/types";

const RATE_LIMIT_WINDOW_MS = 5 * 60 * 1000;
const RATE_LIMIT_MAX_REQUESTS = 12;
const MAX_REQUEST_BYTES = 100_000;
const MAX_MESSAGES = 20;
const MAX_MESSAGE_LENGTH = 1500;

export interface ChatMessage {
  role: "user" | "assistant";
  content: string;
}

interface RateLimitEntry {
  count: number;
  resetAt: number;
}

const rateLimitStore = new Map<string, RateLimitEntry>();

function isRecord(value: unknown): value is Record<string, unknown> {
  return typeof value === "object" && value !== null;
}

function isChatRole(value: unknown): value is ChatMessage["role"] {
  return value === "user" || value === "assistant";
}

function isValidMessage(value: unknown): value is ChatMessage {
  return (
    isRecord(value) &&
    isChatRole(value.role) &&
    typeof value.content === "string" &&
    value.content.trim().length > 0 &&
    value.content.length <= MAX_MESSAGE_LENGTH
  );
}

function isAssessmentSessionLike(value: unknown): value is AssessmentSession {
  if (!isRecord(value) || !isRecord(value.resultModel) || !isRecord(value.resultModel.drlRationale)) {
    return false;
  }

  return (
    (value.productType === "dmm" || value.productType === "drl") &&
    typeof value.scopeType === "string" &&
    typeof value.resultModel.summaryCard === "string" &&
    Array.isArray(value.resultModel.topBlockers) &&
    typeof value.resultModel.drlBand === "string" &&
    typeof value.resultModel.drlRationale.summary === "string" &&
    Array.isArray(value.resultModel.gapToDRL7) &&
    Array.isArray(value.resultModel.actionPlan) &&
    isRecord(value.resultModel.confidence)
  );
}

export function validateAssessmentSession(body: unknown):
  | { ok: true; value: AssessmentSession }
  | { ok: false; message: string } {
  if (!isAssessmentSessionLike(body)) {
    return { ok: false, message: "The diagnostic report context is incomplete or invalid." };
  }

  return { ok: true, value: body };
}

export function validateChatBody(body: unknown):
  | { ok: true; value: { messages: ChatMessage[]; session: AssessmentSession } }
  | { ok: false; message: string } {
  if (!isRecord(body)) {
    return { ok: false, message: "Invalid request body." };
  }

  if (!Array.isArray(body.messages) || body.messages.length === 0 || body.messages.length > MAX_MESSAGES) {
    return { ok: false, message: "Messages must be a non-empty array with a safe upper bound." };
  }

  if (!body.messages.every(isValidMessage)) {
    return { ok: false, message: "Each message must include a valid role and a non-empty prompt under the length limit." };
  }

  const session = validateAssessmentSession(body.session);
  if (!session.ok) {
    return { ok: false, message: session.message };
  }

  return {
    ok: true,
    value: {
      messages: body.messages,
      session: session.value,
    },
  };
}

export function getClientIdentifier(headers: Headers) {
  const forwardedFor = headers.get("x-forwarded-for");
  if (forwardedFor) {
    return forwardedFor.split(",")[0]?.trim() || "anonymous";
  }

  const ip = headers.get("x-real-ip") ?? "anonymous";
  const agent = headers.get("user-agent")?.slice(0, 80) ?? "unknown-agent";
  return `${ip}:${agent}`;
}

export function validateTrustedOrigin(requestUrl: string, headers: Headers) {
  const origin = headers.get("origin");
  const referer = headers.get("referer");
  const requestOrigin = new URL(requestUrl).origin;

  if (origin) {
    return origin === requestOrigin;
  }

  if (referer) {
    try {
      return new URL(referer).origin === requestOrigin;
    } catch {
      return false;
    }
  }

  return true;
}

export function validateRequestSize(headers: Headers, maxBytes = MAX_REQUEST_BYTES) {
  const contentLength = headers.get("content-length");
  if (!contentLength) {
    return true;
  }

  const bytes = Number(contentLength);
  return Number.isFinite(bytes) && bytes > 0 && bytes <= maxBytes;
}

export function consumeChatRateLimit(identifier: string, now = Date.now()) {
  const current = rateLimitStore.get(identifier);

  if (!current || current.resetAt <= now) {
    rateLimitStore.set(identifier, {
      count: 1,
      resetAt: now + RATE_LIMIT_WINDOW_MS,
    });

    return {
      allowed: true as const,
      remaining: RATE_LIMIT_MAX_REQUESTS - 1,
      retryAfterSeconds: Math.ceil(RATE_LIMIT_WINDOW_MS / 1000),
    };
  }

  if (current.count >= RATE_LIMIT_MAX_REQUESTS) {
    return {
      allowed: false as const,
      remaining: 0,
      retryAfterSeconds: Math.max(1, Math.ceil((current.resetAt - now) / 1000)),
    };
  }

  current.count += 1;
  rateLimitStore.set(identifier, current);

  return {
    allowed: true as const,
    remaining: RATE_LIMIT_MAX_REQUESTS - current.count,
    retryAfterSeconds: Math.max(1, Math.ceil((current.resetAt - now) / 1000)),
  };
}

export function resetChatRateLimitStore() {
  rateLimitStore.clear();
}
