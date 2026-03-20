import React, { useEffect, useMemo, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import axios from "axios";
import UserChart from "../components/UserChart.jsx";
import TableList from "../components/TableList.jsx";
import { ADMIN_API_END_POINT } from "../utils/constant.js";
import { motion } from "framer-motion";
import { ArrowLeft, Mail, Phone, Shield, MapPin, Sparkles } from "lucide-react";
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

function SkeletonLine({ className = "" }) {
  return <div className={`animate-pulse rounded-lg bg-muted ${className}`} />;
}

function EmptyState({ title, subtitle, onBack }) {
  return (
    <div className="rounded-2xl border border-dashed border-border/70 bg-card/60 p-10 text-center">
      <div className="mx-auto grid h-12 w-12 place-items-center rounded-2xl bg-primary/10 text-primary">
        <Sparkles size={18} />
      </div>
      <h3 className="mt-4 text-lg font-semibold text-foreground">{title}</h3>
      <p className="mt-2 text-sm text-muted-foreground">{subtitle}</p>
      <button
        type="button"
        onClick={onBack}
        className="mt-5 inline-flex items-center gap-2 rounded-xl bg-primary px-4 py-2 text-sm font-semibold text-primary-foreground transition hover:opacity-95 focus:outline-none focus:ring-2 focus:ring-ring/50"
      >
        <ArrowLeft size={16} />
        Go Back
      </button>
    </div>
  );
}

export default function Single() {
  const { userId } = useParams();
  const navigate = useNavigate();

  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);

  const avatarSrc = useMemo(() => {
    // safe fallback (no broken images)
    return user?.profile?.profilePhoto || "/default-avatar.png";
  }, [user]);

  useEffect(() => {
    let isMounted = true;

    const fetchUser = async () => {
      try {
        setLoading(true);
        const response = await axios.get(`${ADMIN_API_END_POINT}/users`, {
          withCredentials: true,
        });

        const students = response?.data?.students || [];
        const userData = students.find((u) => u?._id === userId) || null;

        if (!isMounted) return;
        setUser(userData);
      } catch (error) {
        console.error("Error fetching user data:", error?.response?.data || error?.message || error);
        toast.error(error?.response?.data?.message || "Failed to load user profile");
        if (!isMounted) return;
        setUser(null);
      } finally {
        if (isMounted) setLoading(false);
      }
    };

    fetchUser();

    return () => {
      isMounted = false;
    };
  }, [userId]);

  // Loading skeleton
  if (loading) {
    return (
      <div className="relative min-h-[calc(100vh-80px)] px-4 py-6">
        {/* Aurora bg */}
        <div className="pointer-events-none absolute inset-0 -z-10 opacity-90">
          <div className="absolute -top-20 left-[-10%] h-72 w-72 rounded-full bg-primary/20 blur-3xl" />
          <div className="absolute -top-24 right-[-12%] h-72 w-72 rounded-full bg-emerald-500/15 blur-3xl" />
          <div className="absolute -bottom-28 left-[30%] h-72 w-72 rounded-full bg-sky-500/10 blur-3xl" />
        </div>

        <div className="mx-auto max-w-7xl space-y-4">
          <GlassCard className="p-6">
            <div className="flex items-start justify-between">
              <div className="space-y-2">
                <SkeletonLine className="h-6 w-56" />
                <SkeletonLine className="h-4 w-80" />
              </div>
              <SkeletonLine className="h-10 w-28" />
            </div>

            <div className="mt-6 grid grid-cols-1 gap-4 lg:grid-cols-12">
              <div className="lg:col-span-5">
                <GlassCard className="p-5">
                  <div className="flex gap-4">
                    <SkeletonLine className="h-16 w-16 rounded-2xl" />
                    <div className="flex-1 space-y-2">
                      <SkeletonLine className="h-5 w-44" />
                      <SkeletonLine className="h-4 w-60" />
                      <SkeletonLine className="h-4 w-52" />
                    </div>
                  </div>
                </GlassCard>
              </div>

              <div className="lg:col-span-7">
                <GlassCard className="p-5">
                  <SkeletonLine className="h-5 w-40" />
                  <SkeletonLine className="mt-4 h-56 w-full" />
                </GlassCard>
              </div>
            </div>
          </GlassCard>

          <GlassCard className="p-6">
            <SkeletonLine className="h-5 w-40" />
            <SkeletonLine className="mt-4 h-40 w-full" />
          </GlassCard>
        </div>
      </div>
    );
  }

  // Not found
  if (!user) {
    return (
      <div className="relative min-h-[calc(100vh-80px)] px-4 py-6">
        <div className="pointer-events-none absolute inset-0 -z-10 opacity-90">
          <div className="absolute -top-20 left-[-10%] h-72 w-72 rounded-full bg-primary/20 blur-3xl" />
          <div className="absolute -top-24 right-[-12%] h-72 w-72 rounded-full bg-emerald-500/15 blur-3xl" />
          <div className="absolute -bottom-28 left-[30%] h-72 w-72 rounded-full bg-sky-500/10 blur-3xl" />
        </div>

        <div className="mx-auto max-w-3xl">
          <EmptyState
            title="User not found"
            subtitle="This user may have been deleted or the link is incorrect."
            onBack={() => navigate(-1)}
          />
        </div>
      </div>
    );
  }

  return (
    <div className="relative min-h-[calc(100vh-80px)] px-4 py-6">
      {/* Aurora bg */}
      <div className="pointer-events-none absolute inset-0 -z-10 opacity-90">
        <div className="absolute -top-20 left-[-10%] h-72 w-72 rounded-full bg-primary/20 blur-3xl" />
        <div className="absolute -top-24 right-[-12%] h-72 w-72 rounded-full bg-emerald-500/15 blur-3xl" />
        <div className="absolute -bottom-28 left-[30%] h-72 w-72 rounded-full bg-sky-500/10 blur-3xl" />
      </div>

      <motion.div
        initial={{ opacity: 0, y: 10 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.45, ease }}
        className="mx-auto max-w-7xl"
      >
        {/* Top header */}
        <GlassCard className="p-6 sm:p-7">
          <div className="flex flex-col gap-4 sm:flex-row sm:items-end sm:justify-between">
            <div>
              <div className="flex items-center gap-3">
                <div className="grid h-11 w-11 place-items-center rounded-2xl bg-primary text-primary-foreground shadow">
                  <Sparkles size={18} />
                </div>
                <div>
                  <h1 className="text-2xl sm:text-3xl font-semibold tracking-tight text-foreground">
                    User Profile
                  </h1>
                  <p className="mt-1 text-sm text-muted-foreground">
                    Admin view of user details and activity.
                  </p>
                </div>
              </div>
            </div>

            <button
              type="button"
              onClick={() => navigate(-1)}
              className="inline-flex items-center gap-2 rounded-xl border border-border/70 bg-card/70 px-4 py-2 text-sm font-semibold text-foreground transition hover:bg-muted/60 focus:outline-none focus:ring-2 focus:ring-ring/50"
            >
              <ArrowLeft size={16} />
              Back
            </button>
          </div>

          {/* Main grid */}
          <div className="mt-6 grid grid-cols-1 gap-4 lg:grid-cols-12">
            {/* Left profile card */}
            <div className="lg:col-span-5">
              <GlassCard className="p-5">
                <div className="flex items-start gap-4">
                  <img
                    src={avatarSrc}
                    alt="User"
                    className="h-16 w-16 rounded-2xl object-cover border border-border/70"
                    onError={(e) => {
                      e.currentTarget.src = "/default-avatar.png";
                    }}
                  />

                  <div className="min-w-0 flex-1">
                    <div className="flex flex-wrap items-center justify-between gap-2">
                      <h2 className="truncate text-lg font-semibold text-foreground">
                        {user.fullname || "Unnamed User"}
                      </h2>
                      <span className="inline-flex items-center gap-2 rounded-full border border-primary/25 bg-primary/10 px-3 py-1 text-xs font-medium text-primary">
                        <Shield size={14} />
                        {user.role || "student"}
                      </span>
                    </div>

                    <div className="mt-3 space-y-2">
                      <div className="flex items-center gap-2 text-sm text-muted-foreground">
                        <Mail size={16} />
                        <span className="truncate">{user.email || "—"}</span>
                      </div>
                      <div className="flex items-center gap-2 text-sm text-muted-foreground">
                        <Phone size={16} />
                        <span>{user.phoneNumber ? `+91 ${user.phoneNumber}` : "—"}</span>
                      </div>
                      <div className="flex items-center gap-2 text-sm text-muted-foreground">
                        <MapPin size={16} />
                        <span>India</span>
                      </div>
                    </div>

                    {/* UI-only tags */}
                    <div className="mt-4 flex flex-wrap gap-2">
                      <span className="rounded-full border border-border/70 bg-muted/40 px-3 py-1 text-xs text-muted-foreground">
                        Verified UI
                      </span>
                      <span className="rounded-full border border-border/70 bg-muted/40 px-3 py-1 text-xs text-muted-foreground">
                        Activity Tracking
                      </span>
                    </div>
                  </div>
                </div>
              </GlassCard>
            </div>

            {/* Right chart card */}
            <div className="lg:col-span-7">
              <GlassCard className="p-5">
                <div className="flex items-center justify-between">
                  <div>
                    <h3 className="text-base font-semibold text-foreground">Usage Overview</h3>
                    <p className="text-sm text-muted-foreground">
                      Chart visualization for this user.
                    </p>
                  </div>
                  <span className="rounded-full border border-border/70 bg-muted/40 px-3 py-1 text-xs text-muted-foreground">
                    Live
                  </span>
                </div>

                <div className="mt-4">
                  <UserChart />
                </div>
              </GlassCard>
            </div>
          </div>
        </GlassCard>

        {/* Bottom activity */}
        <div className="mt-4">
          <GlassCard className="p-5">
            <div className="flex items-center justify-between">
              <div>
                <h3 className="text-base font-semibold text-foreground">Recent Activity</h3>
                <p className="text-sm text-muted-foreground">
                  Transactions / interactions list for this user.
                </p>
              </div>

              {/* UI-only action */}
              <button
                type="button"
                onClick={() => toast.message("Export activity (UI only)")}
                className="rounded-xl border border-border/70 bg-card/70 px-4 py-2 text-sm font-semibold text-foreground hover:bg-muted/60 transition"
              >
                Export
              </button>
            </div>

            <div className="mt-4">
              <TableList id={user._id} />
            </div>
          </GlassCard>
        </div>
      </motion.div>
    </div>
  );
}