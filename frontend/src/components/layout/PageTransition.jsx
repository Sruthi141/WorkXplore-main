import { AnimatePresence, motion } from "framer-motion";
import { useLocation } from "react-router-dom";
import React from "react";
import { pageVariant } from "@/libs/motion";

export default function PageTransition({ children }) {
  const location = useLocation();

  return (
    <AnimatePresence mode="wait">
      <motion.div
        key={location.pathname}
        variants={pageVariant}
        initial="initial"
        animate="animate"
        exit="exit"
        className="min-h-[60vh]"
      >
        {children}
      </motion.div>
    </AnimatePresence>
  );
}
