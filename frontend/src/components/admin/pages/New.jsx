import { motion } from "framer-motion";
import { Briefcase, MapPin, DollarSign, FileText, Sparkles } from "lucide-react";
import { useState } from "react";

const ease = [0.22, 1, 0.36, 1];

export default function New() {
  const [preview, setPreview] = useState(false);

  return (
    <div className="relative min-h-[calc(100vh-80px)] px-4 py-8">

      {/* Aurora background */}
      <div className="pointer-events-none absolute inset-0 -z-10 opacity-90">
        <div className="absolute -top-20 left-[-10%] h-72 w-72 rounded-full bg-primary/20 blur-3xl" />
        <div className="absolute -top-24 right-[-12%] h-72 w-72 rounded-full bg-emerald-500/15 blur-3xl" />
      </div>

      <motion.div
        initial={{ opacity: 0, y: 15 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.45, ease }}
        className="mx-auto max-w-4xl"
      >
        {/* Header */}
        <div className="flex items-center gap-3">
          <div className="grid h-12 w-12 place-items-center rounded-2xl bg-primary text-primary-foreground shadow">
            <Sparkles size={20} />
          </div>
          <div>
            <h1 className="text-2xl font-semibold text-foreground">
              Create New Job
            </h1>
            <p className="text-sm text-muted-foreground">
              Post a new opportunity for candidates
            </p>
          </div>
        </div>

        {/* Form Card */}
        <div className="mt-6 rounded-3xl border border-border/60 bg-card/70 backdrop-blur-md p-8 shadow-[0_15px_40px_rgba(0,0,0,0.15)]">

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">

            {/* Job Title */}
            <div>
              <label className="text-sm font-medium text-foreground">
                Job Title
              </label>
              <div className="relative mt-1">
                <Briefcase size={16} className="absolute left-3 top-3 text-muted-foreground" />
                <input
                  type="text"
                  placeholder="Frontend Developer"
                  className="w-full rounded-xl border border-border bg-background/60 px-10 py-2.5 text-sm focus:ring-2 focus:ring-ring/50 outline-none transition"
                />
              </div>
            </div>

            {/* Location */}
            <div>
              <label className="text-sm font-medium text-foreground">
                Location
              </label>
              <div className="relative mt-1">
                <MapPin size={16} className="absolute left-3 top-3 text-muted-foreground" />
                <input
                  type="text"
                  placeholder="Remote / Hyderabad"
                  className="w-full rounded-xl border border-border bg-background/60 px-10 py-2.5 text-sm focus:ring-2 focus:ring-ring/50 outline-none transition"
                />
              </div>
            </div>

            {/* Salary */}
            <div>
              <label className="text-sm font-medium text-foreground">
                Salary Range
              </label>
              <div className="relative mt-1">
                <DollarSign size={16} className="absolute left-3 top-3 text-muted-foreground" />
                <input
                  type="text"
                  placeholder="6-12 LPA"
                  className="w-full rounded-xl border border-border bg-background/60 px-10 py-2.5 text-sm focus:ring-2 focus:ring-ring/50 outline-none transition"
                />
              </div>
            </div>

            {/* Job Type */}
            <div>
              <label className="text-sm font-medium text-foreground">
                Job Type
              </label>
              <select className="mt-1 w-full rounded-xl border border-border bg-background/60 px-4 py-2.5 text-sm focus:ring-2 focus:ring-ring/50 outline-none transition">
                <option>Full Time</option>
                <option>Part Time</option>
                <option>Internship</option>
                <option>Contract</option>
              </select>
            </div>

          </div>

          {/* Description */}
          <div className="mt-6">
            <label className="text-sm font-medium text-foreground">
              Job Description
            </label>
            <div className="relative mt-1">
              <FileText size={16} className="absolute left-3 top-3 text-muted-foreground" />
              <textarea
                rows="5"
                placeholder="Describe job responsibilities, skills required..."
                className="w-full rounded-xl border border-border bg-background/60 px-10 py-3 text-sm focus:ring-2 focus:ring-ring/50 outline-none transition"
              />
            </div>
          </div>

          {/* Buttons */}
          <div className="mt-6 flex flex-col sm:flex-row gap-4 justify-end">
            <button
              type="button"
              onClick={() => setPreview(!preview)}
              className="rounded-xl border border-border bg-background/60 px-6 py-2 text-sm font-medium hover:bg-muted/50 transition"
            >
              {preview ? "Hide Preview" : "Preview"}
            </button>

            <button
              type="button"
              className="rounded-xl bg-primary px-6 py-2 text-sm font-semibold text-primary-foreground hover:opacity-95 transition focus:ring-2 focus:ring-ring/50"
            >
              Publish Job
            </button>
          </div>

          {/* UI-only Preview */}
          {preview && (
            <div className="mt-6 rounded-xl border border-border bg-muted/40 p-4 text-sm text-muted-foreground">
              Live preview feature (UI-only).  
              You can enhance this later with backend integration.
            </div>
          )}
        </div>
      </motion.div>
    </div>
  );
}