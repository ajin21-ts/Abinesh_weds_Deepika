"use client";

import { motion, useReducedMotion } from "framer-motion";
import { Lotus } from "./ornaments/Lotus";

interface Props {
  className?: string;
  tone?: "gold" | "light";
}

/** Two hairlines drawing outward from a lotus */
export function DecorativeDivider({ className, tone = "gold" }: Props) {
  const reduce = useReducedMotion();
  const color = tone === "gold" ? "text-gold" : "text-gold-muted";
  const line = (origin: "right" | "left") => (
    <motion.span
      aria-hidden
      className="block h-px w-16 bg-current opacity-60 sm:w-24"
      style={{ transformOrigin: origin }}
      initial={reduce ? false : { scaleX: 0 }}
      whileInView={{ scaleX: 1 }}
      viewport={{ once: true }}
      transition={{ duration: 1.4, ease: [0.22, 1, 0.36, 1] }}
    />
  );
  return (
    <div className={`flex items-center justify-center gap-4 ${color} ${className ?? ""}`} role="presentation">
      {line("right")}
      <Lotus className="h-5 w-8 shrink-0" />
      {line("left")}
    </div>
  );
}
