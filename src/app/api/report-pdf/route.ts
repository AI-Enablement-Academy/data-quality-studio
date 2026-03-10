import { NextRequest, NextResponse } from "next/server";

import {
  validateAssessmentSession,
  validateRequestSize,
  validateTrustedOrigin,
} from "@/lib/diagnostics/chat-guard";
import { renderReportPdfBuffer } from "@/lib/diagnostics/pdf";

export const runtime = "nodejs";

export async function POST(request: NextRequest) {
  if (!validateTrustedOrigin(request.nextUrl.toString(), request.headers)) {
    return NextResponse.json(
      { message: "Cross-origin PDF export is not allowed." },
      { status: 403, headers: { "Cache-Control": "no-store" } },
    );
  }

  if (!validateRequestSize(request.headers)) {
    return NextResponse.json(
      { message: "The export payload is too large." },
      { status: 413, headers: { "Cache-Control": "no-store" } },
    );
  }

  const body = await request.json().catch(() => null);
  const session = validateAssessmentSession(
    typeof body === "object" && body !== null ? (body as { session?: unknown }).session : null,
  );

  if (!session.ok) {
    return NextResponse.json(
      { message: session.message },
      { status: 400, headers: { "Cache-Control": "no-store" } },
    );
  }

  const buffer = await renderReportPdfBuffer(session.value);

  return new NextResponse(buffer as BodyInit, {
    status: 200,
    headers: {
      "Cache-Control": "no-store",
      "Content-Disposition": `attachment; filename="${session.value.productType}-diagnostic-report.pdf"`,
      "Content-Type": "application/pdf",
    },
  });
}
