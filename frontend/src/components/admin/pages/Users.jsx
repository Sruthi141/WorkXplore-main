import React from "react";
import { motion } from "framer-motion";
import Datatable from "../components/Datatable";
import { Download, RefreshCcw, Sparkles, Users as UsersIcon } from "lucide-react";
import { toast } from "sonner";

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

export default function Users() {
  return (
    <div className="relative min-h-[calc(100vh-80px)] px-4 py-6">
      {/* Aurora background */}
      <div className="pointer-events-none absolute inset-0 -z-10 opacity-90">
        <div className="absolute -top-20 left-[-10%] h-72 w-72 rounded-full bg-primary/20 blur-3xl" />
        <div className="absolute -top-24 right-[-12%] h-72 w-72 rounded-full bg-emerald-500/15 blur-3xl" />
        <div className="absolute -bottom-28 left-[30%] h-72 w-72 rounded-full bg-sky-500/10 blur-3xl" />
      </div>

      <motion.div
        initial={{ opacity: 0, y: 12 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.45, ease }}
        className="mx-auto max-w-7xl"
      >
        {/* Header */}
        <div className="flex flex-col gap-4 sm:flex-row sm:items-end sm:justify-between">
          <div className="flex items-start gap-3">
            <div className="grid h-12 w-12 place-items-center rounded-2xl bg-primary text-primary-foreground shadow">
              <UsersIcon size={20} />
            </div>
            <div>
              <h1 className="text-2xl sm:text-3xl font-semibold tracking-tight text-foreground">
                Users
              </h1>
              <p className="mt-1 text-sm text-muted-foreground">
                Manage student accounts and review onboarding (premium UI).
              </p>
              <div className="mt-2 inline-flex items-center gap-2 rounded-full border border-border/70 bg-card/60 px-3 py-1 text-xs text-muted-foreground">
                <Sparkles size={14} className="text-primary" />
                Enhanced table + tools
              </div>
            </div>
          </div>

          {/* Actions (UI-only) */}
          <div className="flex flex-wrap gap-2">
            <button
              type="button"
              onClick={() => toast.message("Refresh handled inside Datatable (UI only)")}
              className="inline-flex items-center gap-2 rounded-xl border border-border/70 bg-card/70 px-4 py-2 text-sm font-semibold text-foreground transition hover:bg-muted/60 focus:outline-none focus:ring-2 focus:ring-ring/50"
            >
              <RefreshCcw size={16} />
              Refresh
            </button>

            <button
              type="button"
              onClick={() => toast.message("Export CSV (UI only). Add logic later if needed.")}
              className="inline-flex items-center gap-2 rounded-xl bg-primary px-4 py-2 text-sm font-semibold text-primary-foreground transition hover:opacity-95 focus:outline-none focus:ring-2 focus:ring-ring/50"
            >
              <Download size={16} />
              Export CSV
            </button>
          </div>
        </div>

        {/* Search + Filters row (UI only) */}
        <GlassCard className="mt-6 p-4">
          <div className="flex flex-col gap-3 md:flex-row md:items-center md:justify-between">
            <div className="w-full md:max-w-md">
              <label className="text-xs font-medium text-muted-foreground">
                Search users
              </label>
              <input
                placeholder="Search by name, email, phone..."
                className="mt-1 w-full rounded-xl border border-border bg-background/60 px-4 py-2.5 text-sm outline-none transition focus:ring-2 focus:ring-ring/50"
              />
            </div>

            <div className="flex flex-wrap gap-2">
              <button
                type="button"
                className="rounded-xl border border-border/70 bg-card/70 px-4 py-2 text-sm font-medium text-foreground hover:bg-muted/60 transition"
              >
                Status: All
              </button>
              <button
                type="button"
                className="rounded-xl border border-border/70 bg-card/70 px-4 py-2 text-sm font-medium text-foreground hover:bg-muted/60 transition"
              >
                Sort: Recent
              </button>
              <button
                type="button"
                className="rounded-xl border border-border/70 bg-card/70 px-4 py-2 text-sm font-medium text-foreground hover:bg-muted/60 transition"
              >
                Filter
              </button>
            </div>
          </div>
        </GlassCard>

        {/* Table */}
        <GlassCard className="mt-4 p-3 sm:p-4">
          <Datatable />
        </GlassCard>
      </motion.div>
    </div>
  );
}