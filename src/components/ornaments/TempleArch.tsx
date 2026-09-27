"use client";

import { motion, useReducedMotion } from "framer-motion";

interface Props {
  className?: string;
  /** Start drawing once this is true */
  play?: boolean;
  delay?: number;
}

/**
 * Mandapam arch outline. It stretches to fill its box (preserveAspectRatio
 * none) while strokes stay hairline-thin via non-scaling-stroke; it rises
 * into view with a clip reveal.
 */
export function TempleArch({ className, play = true, delay = 0.2 }: Props) {
  const reduce = useReducedMotion();
  return (
    <motion.svg
      viewBox="0 0 400 560"
      fill="none"
      preserveAspectRatio="none"
      aria-hidden
      className={className}
      initial={reduce ? false : { clipPath: "inset(100% 0% 0% 0%)", opacity: 0 }}
      animate={play ? { clipPath: "inset(0% 0% 0% 0%)", opacity: 1 } : undefined}
      transition={{ duration: 2.2, delay, ease: [0.22, 1, 0.36, 1] }}
    >
      <g stroke="currentColor" strokeLinecap="round">
        <path d="M20 560V250C20 146 100 76 200 44C300 76 380 146 380 250V560" strokeWidth="1.2" vectorEffect="non-scaling-stroke" />
        <path d="M34 560V254C34 158 108 92 200 62C292 92 366 158 366 254V560" strokeWidth="0.7" opacity=".55" vectorEffect="non-scaling-stroke" />
        <path d="M10 246H44M356 246H390M10 254H44M356 254H390" strokeWidth=".8" vectorEffect="non-scaling-stroke" />
      </g>
    </motion.svg>
  );
}

/** Kalasam finial that sits at the apex of the arch (kept separate so it isn't stretched) */
export function Kalasam({ className }: { className?: string }) {
  return (
    <svg viewBox="0 0 24 34" fill="none" aria-hidden className={className}>
      <g stroke="currentColor" strokeWidth="1" strokeLinecap="round" strokeLinejoin="round">
        <path d="M12 1V6" />
        <path d="M12 6C15 9 15 12 12 13C9 12 9 9 12 6Z" />
        <path d="M6 20C6 15 9 13 12 13C15 13 18 15 18 20C18 24 15 26 12 26C9 26 6 24 6 20Z" />
        <path d="M4 29H20M7 33H17" />
      </g>
    </svg>
  );
}
