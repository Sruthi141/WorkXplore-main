import { motion } from "framer-motion";
import { Mail, Lock, Sparkles } from "lucide-react";
import { Link } from "react-router-dom";

const ease = [0.22, 1, 0.36, 1];

export default function Loginpage() {
  return (
    <div className="relative min-h-[calc(100vh-80px)] flex items-center justify-center px-4">

      {/* Aurora background */}
      <div className="pointer-events-none absolute inset-0 -z-10 opacity-90">
        <div className="absolute -top-20 left-[-10%] h-72 w-72 rounded-full bg-primary/20 blur-3xl" />
        <div className="absolute -top-24 right-[-12%] h-72 w-72 rounded-full bg-emerald-500/15 blur-3xl" />
        <div className="absolute -bottom-28 left-[30%] h-72 w-72 rounded-full bg-sky-500/10 blur-3xl" />
      </div>

      <motion.div
        initial={{ opacity: 0, y: 15 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5, ease }}
        className="w-full max-w-md"
      >
        {/* Glass Card */}
        <div className="rounded-3xl border border-border/60 bg-card/70 backdrop-blur-md p-8 shadow-[0_15px_40px_rgba(0,0,0,0.15)]">

          {/* Logo + Title */}
          <div className="text-center">
            <div className="mx-auto grid h-12 w-12 place-items-center rounded-2xl bg-primary text-primary-foreground shadow">
              <Sparkles size={20} />
            </div>
            <h2 className="mt-4 text-2xl font-semibold tracking-tight text-foreground">
              Welcome Back
            </h2>
            <p className="mt-1 text-sm text-muted-foreground">
              Sign in to continue to Work Xplore
            </p>
          </div>

          {/* Form */}
          <form className="mt-6 space-y-4">

            {/* Email */}
            <div>
              <label className="text-sm font-medium text-foreground">
                Email
              </label>
              <div className="mt-1 relative">
                <Mail className="absolute left-3 top-3 text-muted-foreground" size={16} />
                <input
                  type="email"
                  placeholder="you@example.com"
                  className="w-full rounded-xl border border-border bg-background/60 px-10 py-2.5 text-sm outline-none focus:ring-2 focus:ring-ring/50 transition"
                />
              </div>
            </div>

            {/* Password */}
            <div>
              <label className="text-sm font-medium text-foreground">
                Password
              </label>
              <div className="mt-1 relative">
                <Lock className="absolute left-3 top-3 text-muted-foreground" size={16} />
                <input
                  type="password"
                  placeholder="••••••••"
                  className="w-full rounded-xl border border-border bg-background/60 px-10 py-2.5 text-sm outline-none focus:ring-2 focus:ring-ring/50 transition"
                />
              </div>
            </div>

            {/* Remember + Forgot */}
            <div className="flex items-center justify-between text-sm">
              <label className="flex items-center gap-2 text-muted-foreground">
                <input type="checkbox" className="accent-primary" />
                Remember me
              </label>
              <button
                type="button"
                className="text-primary hover:underline"
              >
                Forgot password?
              </button>
            </div>

            {/* Login Button */}
            <button
              type="submit"
              className="w-full rounded-xl bg-primary py-2.5 text-sm font-semibold text-primary-foreground transition hover:opacity-95 focus:ring-2 focus:ring-ring/50"
            >
              Sign In
            </button>
          </form>

          {/* Divider */}
          <div className="mt-6 flex items-center gap-3 text-xs text-muted-foreground">
            <div className="h-px flex-1 bg-border" />
            OR
            <div className="h-px flex-1 bg-border" />
          </div>

          {/* Social Login UI (frontend only) */}
          <div className="mt-4 space-y-2">
            <button
              type="button"
              className="w-full rounded-xl border border-border bg-background/60 py-2 text-sm font-medium hover:bg-muted/50 transition"
            >
              Continue with Google
            </button>
            <button
              type="button"
              className="w-full rounded-xl border border-border bg-background/60 py-2 text-sm font-medium hover:bg-muted/50 transition"
            >
              Continue with LinkedIn
            </button>
          </div>

          {/* Signup */}
          <p className="mt-6 text-center text-sm text-muted-foreground">
            Don’t have an account?{" "}
            <Link to="/signup" className="text-primary font-medium hover:underline">
              Create account
            </Link>
          </p>

        </div>
      </motion.div>
    </div>
  );
}