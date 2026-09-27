"use client";

import { useEffect, useState } from "react";
import { AnimatePresence, motion, useReducedMotion } from "framer-motion";
import { wedding } from "@/config/wedding";
import { SectionTitle } from "./SectionTitle";
import { Reveal } from "./Reveal";

type Status = "pending" | "counting" | "today" | "married";

interface Remaining {
  days: number;
  hours: number;
  minutes: number;
  seconds: number;
}

const START = new Date(wedding.weddingEvent.start).getTime();
const IST_DAY_AFTER = (() => {
  // Midnight IST after the wedding day — until then it's still "today"
  const d = wedding.weddingEvent.start.slice(0, 10);
  return new Date(`${d}T00:00:00+05:30`).getTime() + 24 * 60 * 60 * 1000;
})();

function compute(now: number): { status: Status; left: Remaining } {
  const zero = { days: 0, hours: 0, minutes: 0, seconds: 0 };
  if (now >= IST_DAY_AFTER) return { status: "married", left: zero };
  if (now >= START) return { status: "today", left: zero };
  const diff = Math.max(0, START - now);
  const s = Math.floor(diff / 1000);
  return {
    status: "counting",
    left: {
      days: Math.floor(s / 86400),
      hours: Math.floor((s % 86400) / 3600),
      minutes: Math.floor((s % 3600) / 60),
      seconds: s % 60,
    },
  };
}

function Unit({ value, label, pad = 2 }: { value: number | null; label: string; pad?: number }) {
  const reduce = useReducedMotion();
  const text = value === null ? "––" : String(value).padStart(pad, "0");
  return (
    <div className="flex flex-col items-center">
      <div className="relative h-[1.1em] overflow-hidden font-display text-[clamp(2.8rem,11vw,6rem)] font-light leading-none lining-nums tabular-nums text-ivory">
        <AnimatePresence mode="popLayout" initial={false}>
          <motion.span
            key={text}
            className="block"
            initial={reduce ? false : { y: "-40%", opacity: 0 }}
            animate={{ y: "0%", opacity: 1 }}
            exit={reduce ? undefined : { y: "40%", opacity: 0 }}
            transition={{ duration: 0.6, ease: [0.22, 1, 0.36, 1] }}
          >
            {text}
          </motion.span>
        </AnimatePresence>
      </div>
      <span className="mt-3 text-[0.7rem] font-medium uppercase tracking-[0.3em] text-gold-muted">{label}</span>
    </div>
  );
}

export function Countdown() {
  // null until mounted, so server and client render the same markup
  const [now, setNow] = useState<number | null>(null);

  useEffect(() => {
    setNow(Date.now());
    const id = setInterval(() => setNow(Date.now()), 1000);
    return () => clearInterval(id);
  }, []);

  const result = now === null ? null : compute(now);
  const status: Status = result?.status ?? "pending";
  const left = result?.left;

  return (
    <section
      id="countdown"
      aria-labelledby="countdown-title"
      className="kolam-dots relative overflow-hidden bg-maroon section-pad"
    >
      <div aria-hidden className="absolute inset-0 bg-gradient-to-b from-maroon via-maroon/80 to-maroon" />
      <div className="container-wedding relative">
        <SectionTitle
          id="countdown-title"
          tone="light"
          title="Counting the Moments"
          kicker={`${wedding.weddingEvent.dayLabel}, ${wedding.weddingEvent.dateLabel}, ${wedding.weddingEvent.timeLabel.split("–")[0].trim()} IST`}
        />

        <Reveal>
          {status === "today" || status === "married" ? (
            <p className="text-center font-display text-4xl font-light italic text-ivory md:text-6xl" role="status">
              {status === "today" ? "Today is the beautiful day ❤️" : "Happily Married ❤️"}
            </p>
          ) : (
            <div
              className="mx-auto grid max-w-3xl grid-cols-4 gap-2 sm:gap-6"
              role="timer"
              aria-live="off"
              aria-label={
                left
                  ? `${left.days} days, ${left.hours} hours, ${left.minutes} minutes until the muhurtham`
                  : "Countdown to the muhurtham"
              }
            >
              <Unit value={left?.days ?? null} label="Days" pad={left && left.days >= 100 ? 3 : 2} />
              <Unit value={left?.hours ?? null} label="Hours" />
              <Unit value={left?.minutes ?? null} label="Minutes" />
              <Unit value={left?.seconds ?? null} label="Seconds" />
            </div>
          )}
        </Reveal>
      </div>
    </section>
  );
}
