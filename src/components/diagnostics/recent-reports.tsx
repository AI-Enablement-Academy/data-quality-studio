"use client";

import Link from "next/link";
import { useEffect, useMemo, useState } from "react";

import { getSavedReports } from "@/lib/diagnostics/storage";
import { ProductType, SavedReportSummary } from "@/lib/diagnostics/types";

function formatScope(report: SavedReportSummary) {
  return report.scopeType === "use_case" ? "Use case" : "Organization";
}

export function RecentReports({ productType }: { productType?: ProductType }) {
  const [reports, setReports] = useState<SavedReportSummary[]>(() => getSavedReports(productType));

  useEffect(() => {
    function handleStorage(event: StorageEvent) {
      if (!event.key || event.key.startsWith("diagnostics:report")) {
        setReports(getSavedReports(productType));
      }
    }

    window.addEventListener("storage", handleStorage);
    return () => window.removeEventListener("storage", handleStorage);
  }, [productType]);

  const recentReports = useMemo(() => reports.slice(0, 4), [reports]);

  if (recentReports.length === 0) {
    return null;
  }

  return (
    <section className="rounded-[2rem] border border-white/50 bg-white/90 p-8 shadow-[0_24px_80px_rgba(15,23,42,0.08)]" data-reveal="card">
      <div className="flex flex-wrap items-end justify-between gap-4">
        <div>
          <p className="text-xs font-semibold uppercase tracking-[0.22em] text-amber-700">Saved reports</p>
          <h2 className="mt-3 text-2xl font-semibold text-slate-950">Recent local history</h2>
        </div>
        <p className="max-w-md text-sm leading-7 text-slate-500">
          Stored in this browser only for now. Open any report again without rerunning the full assessment.
        </p>
      </div>
      <div className="mt-6 grid gap-4 lg:grid-cols-2">
        {recentReports.map((report) => (
          <article key={report.id} className="rounded-[1.5rem] border border-slate-200 bg-slate-50 p-5">
            <div className="flex flex-wrap items-center gap-2">
              <span className="rounded-full bg-slate-950 px-3 py-1 text-xs font-semibold text-white">
                {report.productType.toUpperCase()}
              </span>
              <span className="rounded-full bg-white px-3 py-1 text-xs font-semibold text-slate-600">
                {report.drlBand}
              </span>
              <span className="rounded-full bg-white px-3 py-1 text-xs font-semibold text-slate-500">
                {formatScope(report)}
              </span>
            </div>
            <p className="mt-4 text-sm leading-7 text-slate-700">{report.summaryCard}</p>
            {report.topBlockerTitles.length > 0 ? (
              <p className="mt-3 text-xs uppercase tracking-[0.16em] text-slate-500">
                Top blockers: {report.topBlockerTitles.join(", ")}
              </p>
            ) : null}
            <div className="mt-5 flex flex-wrap items-center justify-between gap-3">
              <p className="text-xs text-slate-500">
                {new Date(report.completedAt).toLocaleString()}
              </p>
              <Link
                href={`/${report.productType}/results?reportId=${encodeURIComponent(report.id)}`}
                className="rounded-full border border-slate-200 px-4 py-2 text-sm font-semibold text-slate-700"
              >
                Open report
              </Link>
            </div>
          </article>
        ))}
      </div>
    </section>
  );
}
