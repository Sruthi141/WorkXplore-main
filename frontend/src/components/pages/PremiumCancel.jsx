// import Navbar from "../common/Navbar.jsx";

import { Button } from "../ui/button.jsx";
import { motion } from "framer-motion";
import { Link } from "react-router-dom";
const variants = {
  initial: { opacity: 0, y: 12 },
  animate: { opacity: 1, y: 0 },
};

function PremiumCancel() {
  return (
    <div className="min-h-screen bg-gradient-to-b from-background to-muted">
      {/* <Navbar /> */}
      <main className="max-w-5xl mx-auto px-4 py-12">
        <motion.section
          initial="initial"
          animate="animate"
          variants={variants}
          transition={{ duration: 0.5 }}
          className="grid gap-8 md:grid-cols-[1.2fr,1fr] items-start"
        >
          {/* Left: Message card (same style as your Resume page) */}
          <div className="glass-card dark:glass-card-dark p-8 rounded-2xl">
            <div className="flex items-center justify-between mb-6">
              <div>
                <h1 className="text-2xl font-bold mb-1">Payment cancelled</h1>
                <p className="text-sm text-muted-foreground">
                  Your card was not charged. You can try again anytime to unlock premium tools.
                </p>
              </div>

              <span className="text-xs rounded-full px-2 py-0.5 bg-rose-50 text-rose-700 border border-rose-100">
                Status
              </span>
            </div>

            <div className="flex flex-wrap gap-3">
              <Button asChild>
                <Link to="/plans">Back to plans</Link>
              </Button>

              <Button asChild variant="outline">
                <Link to="/">Return home</Link>
              </Button>
            </div>

            <p className="text-xs text-muted-foreground mt-6">
              Tip: If this keeps happening, check your internet connection or try a different payment method.
            </p>
          </div>

          {/* Right: Visual card with progress-like bar (matches your score UI vibe) */}
          <motion.div
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.15 }}
            className="glass-card dark:glass-card-dark p-6 rounded-2xl"
          >
            <div className="flex items-center justify-between mb-3">
              <span className="text-sm font-medium text-muted-foreground">Payment status</span>
              <span className="text-xs rounded-full px-2 py-0.5 bg-rose-50 text-rose-700">
                Cancelled
              </span>
            </div>

            <div className="relative h-2 w-full bg-muted rounded-full overflow-hidden mb-4">
              <motion.div
                initial={{ width: 0 }}
                animate={{ width: "35%" }}
                transition={{ duration: 0.6, ease: "easeOut" }}
                className="h-full rounded-full bg-rose-500"
              />
            </div>

            <div className="flex items-start gap-3">
              <div className="h-11 w-11 rounded-2xl bg-rose-50 text-rose-700 flex items-center justify-center text-xl border border-rose-100">
                ✕
              </div>
              <div>
                <p className="text-base font-semibold">No charge made</p>
                <p className="text-xs text-muted-foreground mt-1">
                  You can safely retry. Your plan will activate only after successful payment.
                </p>
              </div>
            </div>
          </motion.div>
        </motion.section>
      </main>
    </div>
  );
}

export default PremiumCancel;