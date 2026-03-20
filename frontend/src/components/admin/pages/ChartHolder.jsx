import { useMemo, useState } from "react";
import { motion } from "framer-motion";
import { BarChart3, PieChart, Sparkles, LayoutGrid, Focus } from "lucide-react";

// ✅ Add .jsx extension (important for Vercel)
import PiechartUser from "../components/PiechartUser.jsx";
import PiechartRecruiter from "../components/PiechartRecruiter.jsx";
import Barchart from "../components/Barchart.jsx";

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
  const [mode, setMode] = useState("compact");

  const subtitle = useMemo(() => {
    return mode === "focus"
      ? "Focus mode highlights the bar chart for deeper analysis."
      : "Compact mode shows distribution + bar trends together.";
  }, [mode]);

  return (
    <div className="relative">
      {/* Background */}
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
              Premium visual dashboard for user & recruiter distribution.
            </p>

            <div className="mt-3 flex flex-wrap items-center gap-2">
              <Chip tone="primary" icon={<PieChart size={14} />}>
                Distributions
              </Chip>
              <Chip tone="good" icon={<BarChart3 size={14} />}>
                Trend View
              </Chip>
              <Chip icon={<LayoutGrid size={14} />}>
                Responsive Layout
              </Chip>
            </div>
          </div>

          {/* Toggle */}
          <div className="flex items-center gap-2">
            <button
              onClick={() => setMode("compact")}
              className={`px-4 py-2 rounded-xl border text-sm ${
                mode === "compact"
                  ? "bg-primary/10 text-primary"
                  : "bg-card"
              }`}
            >
              <LayoutGrid size={16} /> Compact
            </button>

            <button
              onClick={() => setMode("focus")}
              className={`px-4 py-2 rounded-xl border text-sm ${
                mode === "focus"
                  ? "bg-primary/10 text-primary"
                  : "bg-card"
              }`}
            >
              <Focus size={16} /> Focus
            </button>
          </div>
        </div>

        <p className="mt-3 text-xs text-muted-foreground">{subtitle}</p>
      </motion.div>

      {/* Content */}
      {mode === "compact" ? (
        <div className="grid grid-cols-1 gap-4 lg:grid-cols-12">
          {/* Pie charts */}
          <div className="lg:col-span-5 space-y-4">
            <GlassCard className="p-4">
              <h2 className="font-semibold">Students Distribution</h2>
              <PiechartUser />
            </GlassCard>

            <GlassCard className="p-4">
              <h2 className="font-semibold">Recruiters Distribution</h2>
              <PiechartRecruiter />
            </GlassCard>
          </div>

          {/* Bar chart */}
          <div className="lg:col-span-7">
            <GlassCard className="p-4">
              <h2 className="font-semibold">Trend Analysis</h2>
              <Barchart />
            </GlassCard>
          </div>
        </div>
      ) : (
        <GlassCard className="p-4">
          <h2 className="font-semibold">Deep Trend View</h2>
          <Barchart />
        </GlassCard>
      )}
    </div>
  );
}