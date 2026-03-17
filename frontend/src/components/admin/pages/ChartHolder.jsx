import React, { useMemo, useState } from "react";
import { motion } from "framer-motion";
import { BarChart3, PieChart, Sparkles, LayoutGrid, Focus } from "lucide-react";

import PiechartUser from "../components/PiechartUser";
import PiechartRecruiter from "../components/PiechartRecruiter";
import Barchart from "../components/Barchart";

const ease = [0.22, 1, 0.36, 1];

function GlassCard({ className = "", children }) {
  return (
    <div
      className={[
        "rounded-2xl border border-border/60 bg-card/70 backdrop-blur-md",
        "shadow-[0_12px_34px_rgba(0,0,0,0.10)]",
        className,
      ].join(" ")}
    >
      {children}
    </div>
  );
}

function Chip({ icon, children, tone = "default" }) {
  const base =
    "inline-flex items-center gap-2 rounded-full border px-3 py-1 text-xs font-medium";
  const styles =
    tone === "primary"
      ? "border-primary/25 bg-primary/10 text-primary"
      : tone === "good"
      ? "border-emerald-500/25 bg-emerald-500/10 text-emerald-600 dark:text-emerald-300"
      : "border-border/70 bg-muted/40 text-muted-foreground";

  return (
    <span className={`${base} ${styles}`}>
      {icon}
      {children}
    </span>
  );
}

export default function ChartHolder() {
  const [mode, setMode] = useState("compact"); // "compact" | "focus"

  const subtitle = useMemo(() => {
    return mode === "focus"
      ? "Focus mode highlights the bar chart for deeper analysis."
      : "Compact mode shows distribution + bar trends together.";
  }, [mode]);

  return (
    <div className="relative">
      {/* Premium aurora background */}
      <div className="pointer-events-none absolute inset-0 -z-10 opacity-90">
        <div className="absolute -top-20 left-[-10%] h-72 w-72 rounded-full bg-primary/20 blur-3xl" />
        <div className="absolute -top-24 right-[-12%] h-72 w-72 rounded-full bg-emerald-500/15 blur-3xl" />
        <div className="absolute -bottom-28 left-[30%] h-72 w-72 rounded-full bg-sky-500/10 blur-3xl" />
      </div>

      {/* Header */}
      <motion.div
        initial={{ opacity: 0, y: 10 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.45, ease }}
        className="mb-5"
      >
        <div className="flex flex-col gap-3 sm:flex-row sm:items-end sm:justify-between">
          <div>
            <div className="flex items-center gap-2">
              <div className="grid h-10 w-10 place-items-center rounded-2xl bg-primary text-primary-foreground shadow">
                <Sparkles size={18} />
              </div>
              <h1 className="text-2xl sm:text-3xl font-semibold tracking-tight text-foreground">
                Analytics Studio
              </h1>
            </div>
            <p className="mt-2 text-sm sm:text-base text-muted-foreground">
              Premium visual dashboard for user & recruiter distribution with trend insights.
            </p>

            <div className="mt-3 flex flex-wrap items-center gap-2">
              <Chip tone="primary" icon={<PieChart size={14} />}>
                Distributions
              </Chip>
              <Chip tone="good" icon={<BarChart3 size={14} />}>
                Trend View
              </Chip>
              <Chip icon={<LayoutGrid size={14} />}>Responsive Layout</Chip>
            </div>
          </div>

          {/* View toggle (UI-only feature) */}
          <div className="flex items-center gap-2">
            <button
              type="button"
              onClick={() => setMode("compact")}
              className={[
                "inline-flex items-center gap-2 rounded-xl border px-4 py-2 text-sm font-semibold transition",
                "focus:outline-none focus:ring-2 focus:ring-ring/50",
                mode === "compact"
                  ? "border-primary/30 bg-primary/10 text-primary"
                  : "border-border/70 bg-card/70 text-foreground hover:bg-muted/60",
              ].join(" ")}
            >
              <LayoutGrid size={16} />
              Compact
            </button>

            <button
              type="button"
              onClick={() => setMode("focus")}
              className={[
                "inline-flex items-center gap-2 rounded-xl border px-4 py-2 text-sm font-semibold transition",
                "focus:outline-none focus:ring-2 focus:ring-ring/50",
                mode === "focus"
                  ? "border-primary/30 bg-primary/10 text-primary"
                  : "border-border/70 bg-card/70 text-foreground hover:bg-muted/60",
              ].join(" ")}
            >
              <Focus size={16} />
              Focus
            </button>
          </div>
        </div>

        <p className="mt-3 text-xs text-muted-foreground">{subtitle}</p>
      </motion.div>

      {/* Content */}
      {mode === "compact" ? (
        <div className="grid grid-cols-1 gap-4 lg:grid-cols-12">
          {/* Left: Pie cards */}
          <div className="lg:col-span-5 space-y-4">
            <motion.div
              initial={{ opacity: 0, y: 8 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.35, ease }}
            >
              <GlassCard className="p-4">
                <div className="flex items-center justify-between">
                  <div>
                    <h2 className="text-base font-semibold text-foreground">Students Distribution</h2>
                    <p className="text-sm text-muted-foreground">
                      Understand user base breakdown.
                    </p>
                  </div>
                  <Chip tone="primary" icon={<PieChart size={14} />}>Students</Chip>
                </div>
                <div className="mt-4">
                  <PiechartUser />
                </div>
              </GlassCard>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, y: 8 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.35, ease, delay: 0.05 }}
            >
              <GlassCard className="p-4">
                <div className="flex items-center justify-between">
                  <div>
                    <h2 className="text-base font-semibold text-foreground">Recruiters Distribution</h2>
                    <p className="text-sm text-muted-foreground">
                      Track hiring-side presence.
                    </p>
                  </div>
                  <Chip tone="good" icon={<PieChart size={14} />}>Recruiters</Chip>
                </div>
                <div className="mt-4">
                  <PiechartRecruiter />
                </div>
              </GlassCard>
            </motion.div>
          </div>

          {/* Right: Bar chart */}
          <div className="lg:col-span-7">
            <motion.div
              initial={{ opacity: 0, y: 8 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.35, ease, delay: 0.1 }}
            >
              <GlassCard className="p-4 h-full">
                <div className="flex items-center justify-between">
                  <div>
                    <h2 className="text-base font-semibold text-foreground">Trend Analysis</h2>
                    <p className="text-sm text-muted-foreground">
                      Compare overall activity with a clean bar visualization.
                    </p>
                  </div>
                  <Chip icon={<BarChart3 size={14} />}>Bar</Chip>
                </div>

                <div className="mt-4">
                  <Barchart />
                </div>
              </GlassCard>
            </motion.div>
          </div>
        </div>
      ) : (
        // Focus mode: Bar chart large + side quick summary panel (UI-only)
        <div className="grid grid-cols-1 gap-4 lg:grid-cols-12">
          <div className="lg:col-span-9">
            <motion.div
              initial={{ opacity: 0, y: 8 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.35, ease }}
            >
              <GlassCard className="p-4">
                <div className="flex items-center justify-between">
                  <div>
                    <h2 className="text-base font-semibold text-foreground">Deep Trend View</h2>
                    <p className="text-sm text-muted-foreground">
                      Focus on growth and activity changes.
                    </p>
                  </div>
                  <Chip tone="primary" icon={<BarChart3 size={14} />}>Focus</Chip>
                </div>
                <div className="mt-4">
                  <Barchart />
                </div>
              </GlassCard>
            </motion.div>
          </div>

          <div className="lg:col-span-3">
            <motion.div
              initial={{ opacity: 0, y: 8 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.35, ease, delay: 0.05 }}
              className="space-y-4"
            >
              <GlassCard className="p-4">
                <h3 className="text-sm font-semibold text-foreground">Quick Insights</h3>
                <p className="mt-1 text-xs text-muted-foreground">
                  UI-only summary cards (no backend changes).
                </p>

                <div className="mt-3 space-y-2">
                  <div className="rounded-xl border border-border/60 bg-muted/30 p-3">
                    <div className="text-xs text-muted-foreground">Suggestion</div>
                    <div className="mt-1 text-sm font-medium text-foreground">
                      Highlight top locations in Jobs page
                    </div>
                  </div>

                  <div className="rounded-xl border border-border/60 bg-muted/30 p-3">
                    <div className="text-xs text-muted-foreground">Suggestion</div>
                    <div className="mt-1 text-sm font-medium text-foreground">
                      Add “Saved Jobs” & “Recent Searches”
                    </div>
                  </div>
                </div>
              </GlassCard>

              <GlassCard className="p-4">
                <h3 className="text-sm font-semibold text-foreground">Distributions</h3>
                <p className="mt-1 text-xs text-muted-foreground">
                  Quick access to pie charts.
                </p>

                <div className="mt-3 grid gap-2">
                  <button
                    type="button"
                    className="rounded-xl border border-border/70 bg-card/70 px-3 py-2 text-sm font-medium text-foreground hover:bg-muted/60 transition"
                  >
                    Students Pie
                  </button>
                  <button
                    type="button"
                    className="rounded-xl border border-border/70 bg-card/70 px-3 py-2 text-sm font-medium text-foreground hover:bg-muted/60 transition"
                  >
                    Recruiters Pie
                  </button>
                </div>
              </GlassCard>
            </motion.div>
          </div>
        </div>
      )}
    </div>
  );
}