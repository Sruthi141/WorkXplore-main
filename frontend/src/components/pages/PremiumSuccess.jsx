// import Navbar from "../common/Navbar";

import { Button } from "../ui/button.jsx";
import { motion } from "framer-motion";
import { Link } from "react-router-dom";

function PremiumSuccess() {
  return (
    <div className="min-h-screen bg-gradient-to-b from-emerald-50 to-white dark:from-slate-900 dark:to-slate-950">
      {/* <Navbar /> */}
      <main className="max-w-3xl mx-auto px-4 py-16">
        <motion.div
          initial={{ opacity: 0, y: 16 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.4 }}
          className="glass-card dark:glass-card-dark p-8 rounded-2xl text-center"
        >
          <div className="mx-auto mb-5 h-12 w-12 rounded-full bg-emerald-100 text-emerald-700 flex items-center justify-center text-2xl">
            ✓
          </div>
          <h1 className="text-2xl font-semibold mb-2">You&apos;re premium now</h1>
          <p className="text-sm text-muted-foreground mb-6">
            Your subscription is active. You can now post more jobs, see deeper insights, and access
            premium filters.
          </p>
          <div className="flex flex-wrap justify-center gap-3">
            <Button asChild>
              <Link to="/recruiter/jobs">Go to recruiter jobs</Link>
            </Button>
            <Button asChild variant="outline">
              <Link to="/dashboard">Open dashboard</Link>
            </Button>
          </div>
        </motion.div>
      </main>
    </div>
  );
}

export default PremiumSuccess;

