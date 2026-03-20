import { useEffect, useMemo, useState } from "react";
import axios from "axios";
import { ADMIN_API_END_POINT } from "../utils/constant.js";
import Widget from "../components/Widget.jsx";
import Featured from "../components/Featured.jsx";
import Chart from "../components/Chart.jsx";
import { motion } from "framer-motion";
import { RefreshCcw, Download, Sparkles, TrendingUp, Users, Briefcase } from "lucide-react";
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

function Pill({ children, tone = "default" }) {
  const styles =
    tone === "good"
      ? "bg-emerald-500/12 text-emerald-600 dark:text-emerald-300 border-emerald-500/20"
      : tone === "warn"
      ? "bg-amber-500/12 text-amber-600 dark:text-amber-300 border-amber-500/20"
      : "bg-primary/10 text-primary border-primary/20";

  return (
    <span className={`inline-flex items-center gap-1 rounded-full border px-2.5 py-1 text-xs font-medium ${styles}`}>
      {children}
    </span>
  );
}

function SkeletonBlock({ className = "" }) {
  return <div className={`animate-pulse rounded-xl bg-muted ${className}`} />;
}

function EmptyState({ onRetry }) {
  return (
    <div className="rounded-2xl border border-dashed border-border/70 bg-card/60 p-10 text-center">
      <div className="mx-auto grid h-12 w-12 place-items-center rounded-2xl bg-primary/10 text-primary">
        <Sparkles size={18} />
      </div>
      <h3 className="mt-4 text-lg font-semibold text-foreground">No data to show</h3>
      <p className="mt-2 text-sm text-muted-foreground">
        We couldn’t load users/recruiters. Please try refreshing.
      </p>
      <button
        onClick={onRetry}
        type="button"
        className="mt-5 inline-flex items-center justify-center gap-2 rounded-xl bg-primary px-4 py-2 text-sm font-semibold text-primary-foreground transition hover:opacity-95 focus:outline-none focus:ring-2 focus:ring-ring/50"
      >
        <RefreshCcw size={16} />
        Refresh
      </button>
    </div>
  );
}

function StatTile({ icon, label, value, hint }) {
  return (
    <GlassCard className="p-4">
      <div className="flex items-start justify-between gap-3">
        <div className="grid h-10 w-10 place-items-center rounded-xl bg-primary/10 text-primary">
          {icon}
        </div>
        <div className="text-right">
          <div className="text-sm text-muted-foreground">{label}</div>
          <div className="mt-1 text-2xl font-semibold tracking-tight text-foreground">{value}</div>
          {hint ? <div className="mt-1 text-xs text-muted-foreground">{hint}</div> : null}
        </div>
      </div>
    </GlassCard>
  );
}

function Home() {
  const [users, setUsers] = useState([]);
  const [recruiters, setRecruiters] = useState([]);
  const [loading, setLoading] = useState(true);
  const [errored, setErrored] = useState(false);

  const totalUsers = users?.length || 0;
  const totalRecruiters = recruiters?.length || 0;

  // UI-only insights (no backend change)
  const insights = useMemo(() => {
    const total = totalUsers + totalRecruiters;
    const recruiterRatio = total ? Math.round((totalRecruiters / total) * 100) : 0;
    const userRatio = 100 - recruiterRatio;
    return { total, recruiterRatio, userRatio };
  }, [totalUsers, totalRecruiters]);

  const kpis = useMemo(
    () => [
      { type: "users", amount: totalUsers },
      { type: "orders", amount: totalRecruiters },
      { type: "earning", amount: 100 },
      { type: "balance", amount: 200 },
    ],
    [totalUsers, totalRecruiters]
  );

  const fetchUsers = async () => {
    setLoading(true);
    setErrored(false);
    try {
      const response = await axios.get(`${ADMIN_API_END_POINT}/users`, {
        withCredentials: true,
      });

      setUsers(response?.data?.students || []);
      setRecruiters(response?.data?.recruiters || []);
      toast.success("Dashboard updated");
    } catch (error) {
      setErrored(true);
      console.error("Error fetching users:", error?.response?.data || error?.message || error);
      toast.error(error?.response?.data?.message || "Failed to load dashboard data");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    let isMounted = true;

    (async () => {
      try {
        const response = await axios.get(`${ADMIN_API_END_POINT}/users`, {
          withCredentials: true,
        });
        if (!isMounted) return;
        setUsers(response?.data?.students || []);
        setRecruiters(response?.data?.recruiters || []);
        setErrored(false);
      } catch (error) {
        if (!isMounted) return;
        setErrored(true);
        console.error("Error fetching users:", error?.response?.data || error?.message || error);
        toast.error(error?.response?.data?.message || "Failed to load dashboard data");
      } finally {
        if (isMounted) setLoading(false);
      }
    })();

    return () => {
      isMounted = false;
    };
  }, []);

  const noData = !loading && (totalUsers === 0 && totalRecruiters === 0);

  return (
    <div className="min-h-[calc(100vh-64px)]">
      {/* Premium “Aurora” background section */}
      <div className="relative overflow-hidden rounded-3xl border border-border/60 bg-background/30 p-6 sm:p-8">
        <div className="pointer-events-none absolute inset-0 opacity-90">
          <div className="absolute -top-24 left-[-10%] h-72 w-72 rounded-full bg-primary/20 blur-3xl" />
          <div className="absolute -top-20 right-[-10%] h-72 w-72 rounded-full bg-emerald-500/15 blur-3xl" />
          <div className="absolute -bottom-24 left-[30%] h-72 w-72 rounded-full bg-sky-500/10 blur-3xl" />
        </div>

        <motion.div
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.45, ease }}
          className="relative"
        >
          {/* Header row */}
          <div className="flex flex-col gap-4 md:flex-row md:items-end md:justify-between">
            <div>
              <div className="flex items-center gap-2">
                <div className="grid h-10 w-10 place-items-center rounded-2xl bg-primary text-primary-foreground shadow">
                  <Sparkles size={18} />
                </div>
                <h1 className="text-2xl sm:text-3xl font-semibold tracking-tight text-foreground">
                  Admin Command Center
                </h1>
              </div>

              <p className="mt-2 max-w-2xl text-sm sm:text-base text-muted-foreground">
                A premium overview of your platform — users, recruiters, and trends.
                Built with smooth motion, glass UI, and clean structure.
              </p>

              <div className="mt-3 flex flex-wrap items-center gap-2">
                <Pill>Live Overview</Pill>
                <Pill tone="good">
                  <TrendingUp size={14} /> Insights
                </Pill>
                <Pill tone="warn">Beta UI</Pill>
              </div>
            </div>

            <div className="flex flex-wrap gap-2">
              <button
                type="button"
                onClick={fetchUsers}
                className="inline-flex items-center gap-2 rounded-xl border border-border/70 bg-card/70 px-4 py-2 text-sm font-semibold text-foreground backdrop-blur-md transition hover:bg-muted/60 focus:outline-none focus:ring-2 focus:ring-ring/50"
              >
                <RefreshCcw size={16} />
                Refresh
              </button>

              {/* UI-only export (no backend) */}
              <button
                type="button"
                onClick={() => toast.message("Export coming soon (UI only)")}
                className="inline-flex items-center gap-2 rounded-xl bg-primary px-4 py-2 text-sm font-semibold text-primary-foreground transition hover:opacity-95 focus:outline-none focus:ring-2 focus:ring-ring/50"
              >
                <Download size={16} />
                Export
              </button>
            </div>
          </div>

          {/* Top stats row (different layout) */}
          <div className="mt-6 grid grid-cols-1 gap-4 md:grid-cols-3">
            {loading ? (
              <>
                <GlassCard className="p-4">
                  <SkeletonBlock className="h-10 w-10" />
                  <SkeletonBlock className="mt-3 h-6 w-24" />
                  <SkeletonBlock className="mt-2 h-4 w-36" />
                </GlassCard>
                <GlassCard className="p-4">
                  <SkeletonBlock className="h-10 w-10" />
                  <SkeletonBlock className="mt-3 h-6 w-24" />
                  <SkeletonBlock className="mt-2 h-4 w-36" />
                </GlassCard>
                <GlassCard className="p-4">
                  <SkeletonBlock className="h-10 w-10" />
                  <SkeletonBlock className="mt-3 h-6 w-24" />
                  <SkeletonBlock className="mt-2 h-4 w-36" />
                </GlassCard>
              </>
            ) : (
              <>
                <StatTile
                  icon={<Users size={18} />}
                  label="Students"
                  value={totalUsers}
                  hint={`${insights.userRatio}% of total`}
                />
                <StatTile
                  icon={<Briefcase size={18} />}
                  label="Recruiters"
                  value={totalRecruiters}
                  hint={`${insights.recruiterRatio}% of total`}
                />
                <StatTile
                  icon={<TrendingUp size={18} />}
                  label="Total Accounts"
                  value={insights.total}
                  hint="Students + Recruiters"
                />
              </>
            )}
          </div>
        </motion.div>
      </div>

      {/* Main content: split layout + side panel */}
      <div className="mt-6 grid grid-cols-1 gap-4 lg:grid-cols-12">
        {/* Left: KPIs + Chart */}
        <div className="lg:col-span-8 space-y-4">
          {/* KPI widgets (kept, but new premium container) */}
          <GlassCard className="p-4">
            <div className="flex items-center justify-between gap-3">
              <div>
                <h2 className="text-base font-semibold text-foreground">Quick KPIs</h2>
                <p className="text-sm text-muted-foreground">Key platform metrics in one place.</p>
              </div>
              <Pill tone="good">Updated</Pill>
            </div>

            <div className="mt-4 grid grid-cols-1 gap-3 sm:grid-cols-2 xl:grid-cols-4">
              {loading ? (
                <>
                  <SkeletonBlock className="h-24" />
                  <SkeletonBlock className="h-24" />
                  <SkeletonBlock className="h-24" />
                  <SkeletonBlock className="h-24" />
                </>
              ) : (
                kpis.map((kpi, idx) => (
                  <div
                    key={idx}
                    className="rounded-2xl border border-border/60 bg-card/60 p-1 backdrop-blur-md"
                  >
                    <Widget type={kpi.type} amount={kpi.amount} />
                  </div>
                ))
              )}
            </div>
          </GlassCard>

          {/* Chart section */}
          <GlassCard className="p-4">
            <div className="flex items-center justify-between">
              <div>
                <h2 className="text-base font-semibold text-foreground">Platform Trends</h2>
                <p className="text-sm text-muted-foreground">
                  Growth & activity visualization.
                </p>
              </div>
              <Pill>
                <TrendingUp size={14} /> Trendline
              </Pill>
            </div>

            <div className="mt-4">
              {loading ? (
                <SkeletonBlock className="h-[280px]" />
              ) : errored || noData ? (
                <EmptyState onRetry={fetchUsers} />
              ) : (
                <Chart users={users} recruiters={recruiters} />
              )}
            </div>
          </GlassCard>
        </div>

        {/* Right: Highlights + Quick Actions (new feature) */}
        <div className="lg:col-span-4 space-y-4">
          <GlassCard className="p-4">
            <div className="flex items-center justify-between">
              <div>
                <h2 className="text-base font-semibold text-foreground">Highlights</h2>
                <p className="text-sm text-muted-foreground">Insights & summary.</p>
              </div>
              <Pill tone="good">Smart</Pill>
            </div>

            <div className="mt-4">
              {loading ? (
                <div className="space-y-3">
                  <SkeletonBlock className="h-4 w-40" />
                  <SkeletonBlock className="h-20" />
                  <SkeletonBlock className="h-4 w-32" />
                </div>
              ) : errored || noData ? (
                <EmptyState onRetry={fetchUsers} />
              ) : (
                <Featured users={users} recruiters={recruiters} />
              )}
            </div>
          </GlassCard>

          {/* ✅ New UI-only “Quick Actions” feature */}
          <GlassCard className="p-4">
            <div className="flex items-center justify-between">
              <div>
                <h2 className="text-base font-semibold text-foreground">Quick Actions</h2>
                <p className="text-sm text-muted-foreground">UI-only shortcuts (no backend changes).</p>
              </div>
              <Pill>Tools</Pill>
            </div>

            <div className="mt-4 grid gap-2">
              <button
                type="button"
                onClick={() => toast.message("Report builder UI coming soon")}
                className="w-full rounded-xl border border-border/70 bg-card/70 px-4 py-3 text-left text-sm font-medium text-foreground transition hover:bg-muted/60 focus:outline-none focus:ring-2 focus:ring-ring/50"
              >
                <div className="flex items-center justify-between">
                  <span>Create Monthly Report</span>
                  <span className="text-xs text-muted-foreground">UI</span>
                </div>
                <div className="mt-1 text-xs text-muted-foreground">
                  Generate a premium admin report view.
                </div>
              </button>

              <button
                type="button"
                onClick={() => toast.message("CSV export UI coming soon")}
                className="w-full rounded-xl bg-primary px-4 py-3 text-left text-sm font-semibold text-primary-foreground transition hover:opacity-95 focus:outline-none focus:ring-2 focus:ring-ring/50"
              >
                <div className="flex items-center justify-between">
                  <span>Export Users (CSV)</span>
                  <span className="text-xs opacity-90">UI</span>
                </div>
                <div className="mt-1 text-xs opacity-90">
                  Download students + recruiters list.
                </div>
              </button>
            </div>
          </GlassCard>
        </div>
      </div>
    </div>
  );
}

export default Home;