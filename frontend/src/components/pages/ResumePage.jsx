import { useState } from "react";
// import Navbar from "../common/Navbar.jsx";

import { Button } from "../ui/button.jsx";
import { motion } from "framer-motion";

import axios from "axios";
import { toast } from "sonner";
import { USER_API_END_POINT } from "../../utils/constant.js";

const BACKEND_BASE = USER_API_END_POINT.replace("/api/v1/users", "");

const variants = {
  initial: { opacity: 0, y: 12 },
  animate: { opacity: 1, y: 0 },
};

function ResumePage() {
  const [file, setFile] = useState(null);
  const [jobDescription, setJobDescription] = useState("");
  const [loading, setLoading] = useState(false);
  const [result, setResult] = useState(null);

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!file) {
      toast.error("Please upload your resume (PDF or DOCX).");
      return;
    }
    if (!jobDescription.trim()) {
      toast.error("Please paste the job description.");
      return;
    }
    setLoading(true);
    setResult(null);
    try {
      const formData = new FormData();
      formData.append("resume", file);
      formData.append("jobDescription", jobDescription);

      const res = await axios.post(
        `${BACKEND_BASE}/api/v1/resume/score`,
        formData,
        {
          withCredentials: true,
          headers: { "Content-Type": "multipart/form-data" },
        }
      );

      if (res.data.success) {
        setResult(res.data.data);
        toast.success("Resume scored successfully");
      } else {
        toast.error(res.data.message || "Unable to score resume.");
      }
    } catch (error) {
      console.error(error);
      toast.error(
        error.response?.data?.message ||
          "Something went wrong while scoring resume."
      );
    } finally {
      setLoading(false);
    }
  };

  const score = result?.score ?? 0;

  return (
    <div className="min-h-screen bg-gradient-to-b from-background to-muted">
      {/* <Navbar /> */}
      <main className="max-w-5xl mx-auto px-4 py-10">
        <motion.section
          initial="initial"
          animate="animate"
          variants={variants}
          transition={{ duration: 0.5 }}
          className="grid gap-8 md:grid-cols-[1.2fr,1fr]"
        >
          <div className="glass-card dark:glass-card-dark p-6 rounded-2xl">
            <h1 className="text-2xl font-bold mb-2">AI-style Resume Match</h1>
            <p className="text-sm text-muted-foreground mb-6">
              Upload your resume and paste a job description. We&apos;ll
              estimate how well you match, highlight missing keywords, and
              suggest improvements.
            </p>
            <form onSubmit={handleSubmit} className="space-y-4">
              <div>
                <label className="block text-sm font-medium mb-1">
                  Resume (PDF or DOCX)
                </label>
                <input
                  type="file"
                  accept=".pdf,.docx"
                  onChange={(e) => setFile(e.target.files?.[0] || null)}
                  className="block w-full text-sm file:mr-4 file:py-2 file:px-4 file:rounded-md file:border-0 file:text-sm file:font-semibold file:bg-indigo-50 file:text-indigo-700 hover:file:bg-indigo-100"
                />
              </div>
              <div>
                <label className="block text-sm font-medium mb-1">
                  Job Description
                </label>
                <textarea
                  value={jobDescription}
                  onChange={(e) => setJobDescription(e.target.value)}
                  rows={8}
                  className="w-full rounded-md border border-border bg-background px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-indigo-500"
                  placeholder="Paste the role description, responsibilities, and requirements here..."
                />
              </div>
              <div className="flex items-center justify-between gap-3 text-xs text-muted-foreground">
                <p>
                  We process your resume in-memory only for scoring and do not
                  persist the file or text on the server.
                </p>
              </div>
              <div className="pt-2">
                {/* ✅ FIX: make button submit the form */}
                <Button type="submit" disabled={loading} className="w-full">
                  {loading ? "Scoring..." : "Score my resume"}
                </Button>
              </div>
            </form>
          </div>

          <div className="space-y-4">
            <motion.div
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.15 }}
              className="glass-card dark:glass-card-dark p-5 rounded-2xl flex flex-col gap-4"
            >
              <div className="flex items-center justify-between">
                <span className="text-sm font-medium text-muted-foreground">
                  Match score
                </span>
                <span className="text-xs rounded-full px-2 py-0.5 bg-indigo-50 text-indigo-700">
                  Experimental
                </span>
              </div>
              <div className="relative h-2 w-full bg-muted rounded-full overflow-hidden">
                <motion.div
                  key={score}
                  initial={{ width: 0 }}
                  animate={{ width: `${score}%` }}
                  transition={{ duration: 0.6, ease: "easeOut" }}
                  className={`h-full rounded-full ${
                    score > 70
                      ? "bg-emerald-500"
                      : score > 40
                      ? "bg-amber-500"
                      : "bg-red-500"
                  }`}
                />
              </div>
              <div className="flex items-baseline justify-between">
                <p className="text-3xl font-semibold">{score}</p>
                <p className="text-xs text-muted-foreground uppercase tracking-wide">
                  Out of 100
                </p>
              </div>
              <p className="text-xs text-muted-foreground">
                This is an automated estimate based on keyword overlap and
                simple heuristics. Always review manually before applying.
              </p>
            </motion.div>

            {result && (
              <>
                <motion.div
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.2 }}
                  className="glass-card dark:glass-card-dark p-5 rounded-2xl"
                >
                  <h2 className="text-sm font-semibold mb-2">
                    Missing keywords
                  </h2>
                  {result.missingKeywords?.length ? (
                    <div className="flex flex-wrap gap-1.5">
                      {result.missingKeywords.map((kw) => (
                        <span
                          key={kw}
                          className="px-2 py-0.5 rounded-full bg-rose-50 text-rose-600 text-xs border border-rose-100"
                        >
                          {kw}
                        </span>
                      ))}
                    </div>
                  ) : (
                    <p className="text-xs text-muted-foreground">
                      No major missing keywords detected.
                    </p>
                  )}
                </motion.div>

                <motion.div
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.25 }}
                  className="glass-card dark:glass-card-dark p-5 rounded-2xl space-y-2"
                >
                  <h2 className="text-sm font-semibold">Strengths</h2>
                  {result.strengths?.length ? (
                    <ul className="list-disc list-inside text-xs text-emerald-600 space-y-1">
                      {result.strengths.map((s, i) => (
                        <li key={i}>{s}</li>
                      ))}
                    </ul>
                  ) : (
                    <p className="text-xs text-muted-foreground">
                      We&apos;ll highlight strengths here.
                    </p>
                  )}
                </motion.div>

                <motion.div
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.3 }}
                  className="glass-card dark:glass-card-dark p-5 rounded-2xl space-y-2"
                >
                  <h2 className="text-sm font-semibold">Suggestions</h2>
                  {result.suggestions?.length ? (
                    <ul className="list-disc list-inside text-xs text-amber-700 space-y-1">
                      {result.suggestions.map((s, i) => (
                        <li key={i}>{s}</li>
                      ))}
                    </ul>
                  ) : (
                    <p className="text-xs text-muted-foreground">
                      Once scored, we&apos;ll suggest concrete improvements.
                    </p>
                  )}
                </motion.div>
              </>
            )}
          </div>
        </motion.section>
      </main>
    </div>
  );
}

export default ResumePage;