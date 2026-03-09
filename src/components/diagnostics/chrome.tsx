import Link from "next/link";

import { AnimatedShell } from "@/components/diagnostics/animated-shell";
import { productConfigs } from "@/lib/diagnostics/product-config";
import { ProductType } from "@/lib/diagnostics/types";

export function DiagnosticsNav({ activeProduct }: { activeProduct?: ProductType }) {
  return (
    <nav
      className="flex flex-wrap items-center justify-between gap-4 rounded-full border border-white/60 bg-white/80 px-4 py-3 shadow-[0_20px_60px_rgba(15,23,42,0.08)] backdrop-blur"
      data-reveal="nav"
    >
      <Link href="/" className="font-semibold tracking-[0.22em] text-slate-900 uppercase">
        Data Maturity Studio
      </Link>
      <div className="flex gap-2 text-sm">
        {Object.values(productConfigs).map((config) => {
          const isActive = activeProduct === config.productType;
          return (
            <Link
              key={config.productType}
              href={config.routeBase}
              className={`rounded-full px-4 py-2 transition ${
                isActive
                  ? "bg-slate-900 text-white"
                  : "bg-slate-100 text-slate-700 hover:bg-slate-200"
              }`}
            >
              {config.shortTitle}
            </Link>
          );
        })}
      </div>
    </nav>
  );
}

export function PageShell({
  activeProduct,
  eyebrow,
  title,
  summary,
  children,
}: {
  activeProduct?: ProductType;
  eyebrow: string;
  title: string;
  summary: string;
  children: React.ReactNode;
}) {
  return (
    <div className="min-h-screen bg-[radial-gradient(circle_at_top_left,_rgba(251,191,36,0.18),_transparent_32%),linear-gradient(180deg,#f8fafc_0%,#eef2f7_100%)]">
      <AnimatedShell>
        <div className="mx-auto flex min-h-screen max-w-7xl flex-col gap-8 px-5 py-6 sm:px-8 lg:px-10">
          <DiagnosticsNav activeProduct={activeProduct} />
          <header className="grid gap-6 rounded-[2rem] border border-white/50 bg-white/85 p-8 shadow-[0_24px_80px_rgba(15,23,42,0.10)] lg:grid-cols-[minmax(0,1fr)_260px]">
            <div className="space-y-4" data-reveal="hero">
              <p className="text-xs font-semibold uppercase tracking-[0.28em] text-amber-700">
                {eyebrow}
              </p>
              <h1 className="max-w-3xl text-4xl leading-tight font-semibold text-slate-950 sm:text-5xl">
                {title}
              </h1>
              <p className="max-w-3xl text-lg leading-8 text-slate-600">{summary}</p>
            </div>
            <div
              className="rounded-[1.5rem] bg-slate-950 p-6 text-sm leading-7 text-slate-200"
              data-reveal="hero"
            >
              <p className="font-medium text-white">Build for trust, not novelty.</p>
              <p className="mt-3">
                Deterministic scoring, handbook-grounded logic, and exportable artifacts come first.
              </p>
            </div>
          </header>
          <main className="flex-1">{children}</main>
          <footer
            className="rounded-[1.75rem] border border-white/50 bg-white/75 px-5 py-4 text-sm leading-7 text-slate-600 shadow-[0_18px_50px_rgba(15,23,42,0.06)] backdrop-blur"
            data-reveal="card"
          >
            <p>
              Built by{" "}
              <a
                className="font-semibold text-slate-900 underline decoration-slate-300 underline-offset-4"
                href="https://www.linkedin.com/in/adambkovacs/"
                rel="noreferrer"
                target="_blank"
              >
                Adam Kovacs
              </a>{" "}
              x{" "}
              <a
                className="font-semibold text-slate-900 underline decoration-slate-300 underline-offset-4"
                href="https://aienablement.academy"
                rel="noreferrer"
                target="_blank"
              >
                AI Enablement Academy
              </a>
              . Open source, free to use, and still a limited public alpha.
            </p>
            <p className="mt-2 text-slate-500">
              Some features rely on tightly budgeted third-party APIs, so availability may be capped or temporarily downgraded.
            </p>
          </footer>
        </div>
      </AnimatedShell>
    </div>
  );
}
