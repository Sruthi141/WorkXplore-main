import React, { useEffect, useMemo, useState } from "react";
import PropTypes from "prop-types";

// ✅ FIXED imports (add .jsx)
import StatUser from "../components/StatUser.jsx";
import StatRecruiter from "../components/StatRecruiter.jsx";
import Chart from "../components/Chart.jsx";

// ✅ FIX path + extension
import { ADMIN_API_END_POINT } from "../utils/constant.js";

import axios from "axios";
import { motion } from "framer-motion";
import {
  Sparkles,
  Users,
  Briefcase,
  TrendingUp,
  RefreshCcw,
} from "lucide-react";
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

GlassCard.propTypes = {
  className: PropTypes.string,
  children: PropTypes.node,
};

function SkeletonBlock({ className = "" }) {
  return (
    <div className={`animate-pulse rounded-xl bg-muted ${className}`} />
  );
}

SkeletonBlock.propTypes = {
  className: PropTypes.string,
};

function EmptyState({ onRetry }) {
  return (
    <div className="rounded-2xl border border-dashed border-border/70 bg-card/60 p-10 text-center">
      <div className="mx-auto grid h-12 w-12 place-items-center rounded-2xl bg-primary/10 text-primary">
        <Sparkles size={18} />
      </div>

      <h3 className="mt-4 text-lg font-semibold text-foreground">
        No stats to show
      </h3>

      <p className="mt-2 text-sm text-muted-foreground">
        We couldn’t load statistics. Try refreshing.
      </p>

      <button
        type="button"
        onClick={onRetry}
        className="mt-5 inline-flex items-center gap-2 rounded-xl bg-primary px-4 py-2 text-sm font-semibold text-primary-foreground transition hover:opacity-95 focus:outline-none focus:ring-2 focus:ring-ring/50"
      >
        <RefreshCcw size={16} />
        Refresh
      </button>
    </div>
  );
}

EmptyState.propTypes = {
  onRetry: PropTypes.func.isRequired,
};

function InsightTile({ icon, label, value, hint }) {
  return (
    <GlassCard className="p-4">
      <div className="flex items-start justify-between gap-3">
        <div className="grid h-10 w-10 place-items-center rounded-xl bg-primary/10 text-primary">
          {icon}
        </div>

        <div className="text-right">
          <div className="text-sm text-muted-foreground">{label}</div>
          <div className="mt-1 text-2xl font-semibold tracking-tight text-foreground">
            {value}
          </div>
          {hint && (
            <div className="mt-1 text-xs text-muted-foreground">
              {hint}
            </div>
          )}
        </div>
      </div>
    </GlassCard>
  );
}

InsightTile.propTypes = {
  icon: PropTypes.node.isRequired,
  label: PropTypes.string.isRequired,
  value: PropTypes.oneOfType([PropTypes.string, PropTypes.number]).isRequired,
  hint: PropTypes.string,
};

export default function StatHolder() {
  const [users, setUsers] = useState([]);
  const [recruiters, setRecruiters] = useState([]);
  const [loading, setLoading] = useState(true);
  const [errored, setErrored] = useState(false);

  const insights = useMemo(() => {
    const u = users?.length || 0;
    const r = recruiters?.length || 0;
    const total = u + r;

    const recruiterRatio = total
      ? Math.round((r / total) * 100)
      : 0;

    const userRatio = 100 - recruiterRatio;

    return { u, r, total, recruiterRatio, userRatio };
  }, [users, recruiters]);

  const fetchStats = async () => {
    setLoading(true);
    setErrored(false);

    try {
      const response = await axios.get(
        `${ADMIN_API_END_POINT}/users`,
        { withCredentials: true }
      );

      setUsers(response?.data?.students || []);
      setRecruiters(response?.data?.recruiters || []);
      toast.success("Stats updated");
    } catch (error) {
      setErrored(true);
      console.error(
        "Error fetching users:",
        error?.response?.data || error?.message || error
      );
      toast.error(
        error?.response?.data?.message ||
          "Failed to load statistics"
      );
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchStats();
  }, []);

  const noData = !loading && insights.total === 0;

  return (
    <div className="relative min-h-[calc(100vh-80px)] px-4 py-6">
      <motion.div
        initial={{ opacity: 0, y: 10 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.45, ease }}
        className="mx-auto max-w-7xl"
      >
        {/* Header */}
        <div className="flex justify-between items-center">
          <h1 className="text-2xl font-semibold">
            Stats & Insights
          </h1>

          <button
            onClick={fetchStats}
            className="flex items-center gap-2 px-4 py-2 bg-primary text-white rounded-xl"
          >
            <RefreshCcw size={16} />
            Refresh
          </button>
        </div>

        {/* Insight Cards */}
        <div className="mt-6 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
          {loading ? (
            <>
              <SkeletonBlock className="h-24" />
              <SkeletonBlock className="h-24" />
              <SkeletonBlock className="h-24" />
              <SkeletonBlock className="h-24" />
            </>
          ) : (
            <>
              <InsightTile
                icon={<Users size={18} />}
                label="Students"
                value={insights.u}
                hint={`${insights.userRatio}% of total`}
              />
              <InsightTile
                icon={<Briefcase size={18} />}
                label="Recruiters"
                value={insights.r}
                hint={`${insights.recruiterRatio}% of total`}
              />
              <InsightTile
                icon={<Sparkles size={18} />}
                label="Total Accounts"
                value={insights.total}
                hint="Students + Recruiters"
              />
              <InsightTile
                icon={<TrendingUp size={18} />}
                label="Growth"
                value="—"
                hint="Coming soon"
              />
            </>
          )}
        </div>

        {/* Main Section */}
        <div className="mt-6 grid grid-cols-1 lg:grid-cols-12 gap-4">
          <div className="lg:col-span-5 space-y-4">
            <GlassCard className="p-4">
              {loading ? (
                <SkeletonBlock className="h-56" />
              ) : errored || noData ? (
                <EmptyState onRetry={fetchStats} />
              ) : (
                <StatUser users={users} recruiters={recruiters} />
              )}
            </GlassCard>

            <GlassCard className="p-4">
              {loading ? (
                <SkeletonBlock className="h-56" />
              ) : errored || noData ? (
                <EmptyState onRetry={fetchStats} />
              ) : (
                <StatRecruiter
                  users={users}
                  recruiters={recruiters}
                />
              )}
            </GlassCard>
          </div>

          <div className="lg:col-span-7">
            <GlassCard className="p-4">
              {loading ? (
                <SkeletonBlock className="h-[340px]" />
              ) : errored || noData ? (
                <EmptyState onRetry={fetchStats} />
              ) : (
                <Chart
                  users={users}
                  recruiters={recruiters}
                />
              )}
            </GlassCard>
          </div>
        </div>
      </motion.div>
    </div>
  );
}