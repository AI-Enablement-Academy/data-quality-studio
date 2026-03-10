"use client";

import { useEffect, useState } from "react";

import {
  ArcElement,
  BarElement,
  CategoryScale,
  Chart as ChartJS,
  Filler,
  Legend,
  LineElement,
  LinearScale,
  PointElement,
  RadialLinearScale,
  Tooltip,
} from "chart.js";
import { Bar, Doughnut, Radar } from "react-chartjs-2";

import { AssessmentSession } from "@/lib/diagnostics/types";

ChartJS.register(
  ArcElement,
  BarElement,
  CategoryScale,
  Filler,
  Legend,
  LineElement,
  LinearScale,
  PointElement,
  RadialLinearScale,
  Tooltip,
);

const surfaceBorder = "rgba(148, 163, 184, 0.22)";
const slate = "#0f172a";
const orange = "#f97316";
const blue = "#60a5fa";
const rose = "#f43f5e";
const emerald = "#10b981";

function shortConditionLabel(label: string) {
  return label
    .replace(" as Conflicting Information", "")
    .replace(" and Information Architecture", " and Architecture")
    .replace(" Considerations", "")
    .replace(" Across Functions", "")
    .replace(" Challenges", "")
    .replace(" Relationships", "")
    .replace(" Patterns", "");
}

function normalizeSignalPercent(value: number) {
  return Math.round((value / 3) * 100);
}

export function ReportCharts({ session }: { session: AssessmentSession }) {
  const [prefersReducedMotion, setPrefersReducedMotion] = useState(false);

  useEffect(() => {
    if (typeof window === "undefined" || typeof window.matchMedia !== "function") {
      return;
    }

    const mediaQuery = window.matchMedia("(prefers-reduced-motion: reduce)");
    const updatePreference = () => setPrefersReducedMotion(mediaQuery.matches);

    updatePreference();
    mediaQuery.addEventListener("change", updatePreference);
    return () => mediaQuery.removeEventListener("change", updatePreference);
  }, []);

  const rootScores = session.resultModel.rootConditionScores;
  const signalScores = session.resultModel.signalScores ?? {
    digital_foundation: 0,
    data_product_discipline: 0,
    dpm_ownership: 0,
    tdqm_discipline: 0,
    structured_ai_readiness: 0,
    advanced_ai_integration: 0,
    manual_collection_risk: 0,
    byproduct_dependence: 0,
  };
  const severityBuckets = rootScores.reduce(
    (accumulator, score) => {
      accumulator[score.severityLabel] += 1;
      return accumulator;
    },
    {
      "No current issue": 0,
      Mild: 0,
      Significant: 0,
      Severe: 0,
    } as Record<string, number>,
  );

  const horizontalBarData = {
    labels: rootScores.map((item) => shortConditionLabel(item.title)),
    datasets: [
      {
        label: "Severity",
        data: rootScores.map((item) => item.score),
        borderRadius: 999,
        borderSkipped: false,
        backgroundColor: rootScores.map((item) => {
          if (item.score >= 3) return "rgba(244, 63, 94, 0.82)";
          if (item.score >= 2) return "rgba(249, 115, 22, 0.78)";
          if (item.score >= 1) return "rgba(30, 64, 175, 0.72)";
          return "rgba(16, 185, 129, 0.7)";
        }),
      },
    ],
  };

  const radarData = {
    labels: [
      "Digital foundation",
      "Info product",
      "DPM coordination",
      "TDQM discipline",
      "AI-ready structure",
      "Advanced AI",
    ],
    datasets: [
      {
        label: "Current state",
        data: [
          signalScores.digital_foundation,
          signalScores.data_product_discipline,
          signalScores.dpm_ownership,
          signalScores.tdqm_discipline,
          signalScores.structured_ai_readiness,
          signalScores.advanced_ai_integration,
        ].map((value) => Number((value * 33.33).toFixed(1))),
        borderColor: "rgba(15, 23, 42, 0.88)",
        backgroundColor: "rgba(30, 64, 175, 0.18)",
        pointBackgroundColor: orange,
        pointBorderColor: "#fffaf0",
        pointHoverBackgroundColor: "#ffffff",
        pointHoverBorderColor: slate,
        pointRadius: 3.5,
        borderWidth: 2.5,
      },
    ],
  };

  const doughnutData = {
    labels: Object.keys(severityBuckets),
    datasets: [
      {
        label: "Conditions",
        data: Object.values(severityBuckets),
        backgroundColor: [
          "rgba(16, 185, 129, 0.82)",
          "rgba(30, 64, 175, 0.72)",
          "rgba(249, 115, 22, 0.78)",
          "rgba(244, 63, 94, 0.78)",
        ],
        borderColor: ["#d1fae5", "#e0f2fe", "#fef3c7", "#ffe4e6"],
        borderWidth: 2,
        hoverOffset: 12,
      },
    ],
  };

  const commonTooltip = {
    backgroundColor: "rgba(15, 23, 42, 0.94)",
    titleColor: "#f8fafc",
    bodyColor: "#e2e8f0",
    borderColor: "rgba(249, 115, 22, 0.35)",
    borderWidth: 1,
    padding: 12,
    displayColors: true,
    cornerRadius: 14,
  };

  const chartAnimation = prefersReducedMotion
    ? false
    : {
        duration: 1100,
        easing: "easeOutQuart" as const,
      };

  return (
    <section
      className="grid gap-6 xl:grid-cols-[minmax(0,1.35fr)_minmax(300px,0.9fr)]"
      data-reveal="chart"
    >
      <article className="rounded-[2rem] border border-white/50 bg-[linear-gradient(180deg,rgba(255,255,255,0.96),rgba(248,250,252,0.94))] p-6 shadow-[0_24px_80px_rgba(15,23,42,0.08)]">
        <div className="flex flex-wrap items-end justify-between gap-4">
          <div>
            <p className="text-xs font-semibold uppercase tracking-[0.22em] text-[#1E40AF]">
              Signal atlas
            </p>
            <h2 className="mt-2 text-2xl font-semibold text-slate-950">
              Severity landscape
            </h2>
          </div>
          <p className="max-w-md text-sm leading-7 text-slate-500">
            Ten root conditions, one visual scan. Higher bars mean more drag on data reliability and AI readiness.
          </p>
        </div>
        <div className="sr-only">
          Root-condition severity summary: {rootScores.map((item) => `${item.title}, ${item.severityLabel}.`).join(" ")}
        </div>
        <div className="mt-6 h-[420px]">
          <Bar
            aria-label="Horizontal bar chart showing severity across the ten root conditions."
            data={horizontalBarData}
            options={{
              animation: chartAnimation,
              maintainAspectRatio: false,
              responsive: true,
              indexAxis: "y",
              layout: {
                padding: {
                  left: 8,
                  right: 10,
                  top: 4,
                  bottom: 4,
                },
              },
              scales: {
                x: {
                  beginAtZero: true,
                  max: 3,
                  grid: {
                    color: "rgba(148,163,184,0.16)",
                  },
                  border: { display: false },
                  ticks: {
                    stepSize: 1,
                    color: "#64748b",
                    font: { size: 11 },
                    callback(value) {
                      return ["None", "Mild", "Significant", "Severe"][Number(value)] ?? value;
                    },
                  },
                },
                y: {
                  grid: { display: false },
                  border: { display: false },
                  ticks: {
                    color: slate,
                    font: { size: 11, weight: 600 },
                  },
                },
              },
              plugins: {
                legend: { display: false },
                tooltip: commonTooltip,
              },
            }}
          />
        </div>
        <div className="mt-6 overflow-x-auto rounded-[1.25rem] border border-slate-200 bg-slate-50">
          <table className="min-w-full text-left text-sm text-slate-700">
            <caption className="sr-only">Tabular fallback for root-condition severity.</caption>
            <thead className="border-b border-slate-200 bg-white">
              <tr>
                <th className="px-4 py-3 font-semibold">Root condition</th>
                <th className="px-4 py-3 font-semibold">Severity</th>
              </tr>
            </thead>
            <tbody>
              {rootScores.map((item) => (
                <tr key={item.key} className="border-b border-slate-200 last:border-b-0">
                  <td className="px-4 py-3">{item.title}</td>
                  <td className="px-4 py-3">{item.severityLabel}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </article>

      <div className="grid gap-6">
        <article className="rounded-[2rem] border border-white/50 bg-[linear-gradient(145deg,rgba(15,23,42,0.98),rgba(15,23,42,0.9))] p-6 text-white shadow-[0_24px_80px_rgba(15,23,42,0.16)]">
          <p className="text-xs font-semibold uppercase tracking-[0.22em] text-orange-300">
            Readiness profile
          </p>
          <h2 className="mt-2 text-2xl font-semibold">Breakthrough geometry</h2>
          <p className="mt-3 text-sm leading-7 text-slate-300">
            This radar isolates the structural ingredients the paper says separate DRL 5-6 from DRL 7.
          </p>
          <div className="sr-only">
            Readiness profile summary: digital foundation {normalizeSignalPercent(signalScores.digital_foundation)} percent,
            information product discipline {normalizeSignalPercent(signalScores.data_product_discipline)} percent,
            DPM coordination {normalizeSignalPercent(signalScores.dpm_ownership)} percent,
            TDQM discipline {normalizeSignalPercent(signalScores.tdqm_discipline)} percent,
            AI-ready structure {normalizeSignalPercent(signalScores.structured_ai_readiness)} percent,
            advanced AI integration {normalizeSignalPercent(signalScores.advanced_ai_integration)} percent.
          </div>
          <div className="mt-4 h-[320px]">
            <Radar
              aria-label="Radar chart showing readiness signals linked to progression toward DRL 7."
              data={radarData}
              options={{
                animation: prefersReducedMotion
                  ? false
                  : {
                      duration: 1200,
                      easing: "easeOutQuart",
                    },
                maintainAspectRatio: false,
                responsive: true,
                scales: {
                  r: {
                    min: 0,
                    max: 100,
                    angleLines: {
                      color: "rgba(255,255,255,0.09)",
                    },
                    grid: {
                      color: "rgba(255,255,255,0.09)",
                    },
                    pointLabels: {
                      color: "#e2e8f0",
                      font: { size: 11, weight: 600 },
                    },
                    ticks: {
                      display: false,
                      backdropColor: "transparent",
                    },
                  },
                },
                plugins: {
                  legend: { display: false },
                  tooltip: commonTooltip,
                },
              }}
            />
          </div>
          <div className="mt-4 overflow-x-auto rounded-[1.25rem] border border-white/10 bg-white/5">
            <table className="min-w-full text-left text-sm text-slate-200">
              <caption className="sr-only">Tabular fallback for readiness profile signals.</caption>
              <thead className="border-b border-white/10 text-slate-300">
                <tr>
                  <th className="px-4 py-3 font-semibold">Signal</th>
                  <th className="px-4 py-3 font-semibold">Current state</th>
                </tr>
              </thead>
              <tbody>
                {[
                  ["Digital foundation", normalizeSignalPercent(signalScores.digital_foundation)],
                  ["Information product discipline", normalizeSignalPercent(signalScores.data_product_discipline)],
                  ["DPM coordination", normalizeSignalPercent(signalScores.dpm_ownership)],
                  ["TDQM discipline", normalizeSignalPercent(signalScores.tdqm_discipline)],
                  ["AI-ready structure", normalizeSignalPercent(signalScores.structured_ai_readiness)],
                  ["Advanced AI integration", normalizeSignalPercent(signalScores.advanced_ai_integration)],
                ].map(([label, value]) => (
                  <tr key={label} className="border-b border-white/10 last:border-b-0">
                    <td className="px-4 py-3">{label}</td>
                    <td className="px-4 py-3">{value}%</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </article>

        <article className="rounded-[2rem] border border-white/50 bg-white/90 p-6 shadow-[0_24px_80px_rgba(15,23,42,0.08)]">
          <div className="flex items-start justify-between gap-4">
            <div>
              <p className="text-xs font-semibold uppercase tracking-[0.22em] text-[#1E40AF]">
                Severity mix
              </p>
              <h2 className="mt-2 text-2xl font-semibold text-slate-950">
                Pressure balance
              </h2>
            </div>
            <div className="rounded-full border border-slate-200 bg-slate-50 px-3 py-1 text-xs font-semibold text-slate-500">
              {rootScores.length} conditions
            </div>
          </div>
          <div className="sr-only">
            Severity mix summary: no current issue {severityBuckets["No current issue"]}, mild {severityBuckets.Mild},
            significant {severityBuckets.Significant}, severe {severityBuckets.Severe}.
          </div>
          <div className="mt-5 grid gap-4 sm:grid-cols-[180px_minmax(0,1fr)]">
            <div className="h-[180px]">
              <Doughnut
                aria-label="Doughnut chart showing how many root conditions fall into each severity band."
                data={doughnutData}
                options={{
                  animation: prefersReducedMotion
                    ? false
                    : {
                        animateRotate: true,
                        animateScale: true,
                        duration: 1150,
                        easing: "easeOutQuart",
                      },
                  cutout: "66%",
                  maintainAspectRatio: false,
                  responsive: true,
                  plugins: {
                    legend: { display: false },
                    tooltip: commonTooltip,
                  },
                }}
              />
            </div>
            <div className="grid gap-3 self-center">
              {[
                { label: "No current issue", value: severityBuckets["No current issue"], color: emerald },
                { label: "Mild", value: severityBuckets.Mild, color: blue },
                { label: "Significant", value: severityBuckets.Significant, color: orange },
                { label: "Severe", value: severityBuckets.Severe, color: rose },
              ].map((item) => (
                <div
                  key={item.label}
                  className="rounded-[1.25rem] border px-4 py-3"
                  style={{ borderColor: surfaceBorder, background: "rgba(248,250,252,0.72)" }}
                >
                  <div className="flex items-center justify-between gap-3">
                    <div className="flex items-center gap-3">
                      <span
                        aria-hidden="true"
                        className="h-3.5 w-3.5 rounded-full"
                        style={{ backgroundColor: item.color }}
                      />
                      <span className="text-sm font-medium text-slate-700">{item.label}</span>
                    </div>
                    <span className="text-lg font-semibold text-slate-950">{item.value}</span>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </article>
      </div>
    </section>
  );
}
