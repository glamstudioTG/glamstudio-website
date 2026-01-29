import { easeOut, easeInOut } from "framer-motion";

export const sectionHeader = {
  initial: { opacity: 0, y: 28, filter: "blur(6px)" },
  enter: {
    opacity: 1,
    y: 0,
    filter: "blur(0px)",
    transition: { duration: 0.6, ease: easeOut },
  },
  exit: {
    opacity: 0,
    y: 16,
    filter: "blur(2px)",
    transition: { duration: 0.35, ease: easeInOut },
  },
};

export const containerStagger = {
  initial: {},
  enter: {
    transition: {
      staggerChildren: 0.12,
      delayChildren: 0.05,
    },
  },
};

export const itemFadeUp = {
  initial: { opacity: 0, y: 22 },
  enter: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.45, ease: easeOut },
  },
  exit: {
    opacity: 0,
    y: 14,
    transition: { duration: 0.3, ease: easeInOut },
  },
};
