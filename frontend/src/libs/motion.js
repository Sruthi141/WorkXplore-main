export const ease = [0.22, 0.9, 0.36, 1];

export const pageVariant = {
  initial: { opacity: 0, y: 12, filter: "blur(6px)" },
  animate: { opacity: 1, y: 0, filter: "blur(0px)", transition: { duration: 0.48, ease } },
  exit: { opacity: 0, y: -8, filter: "blur(4px)", transition: { duration: 0.36, ease } },
};

export const pop = { scale: [0.98, 1.02, 1], transition: { duration: 0.28, ease } };

export const floaty = { y: [0, -6, 0], transition: { duration: 4, repeat: Infinity, ease: "easeInOut" } };

export const springModal = (opts = {}) => ({ type: "spring", stiffness: 120, damping: 16, ...opts });

export default { pageVariant, pop, floaty, springModal };
