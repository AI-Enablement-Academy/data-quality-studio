import { compressToEncodedURIComponent, decompressFromEncodedURIComponent } from "lz-string";

import { AssessmentSession } from "@/lib/diagnostics/types";

export function encodeSharedSession(session: AssessmentSession) {
  return compressToEncodedURIComponent(JSON.stringify(session));
}

export function decodeSharedSession(payload: string) {
  try {
    const decompressed = decompressFromEncodedURIComponent(payload);
    if (!decompressed) {
      return null;
    }

    return JSON.parse(decompressed) as AssessmentSession;
  } catch {
    return null;
  }
}
