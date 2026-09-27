"use client";

import { useEffect, useRef, useState } from "react";
import { AnimatePresence, motion, useReducedMotion } from "framer-motion";
import { wedding } from "@/config/wedding";
import { markSiteRevealed } from "@/hooks/useIntro";
import { useMusic } from "./MusicProvider";
import { Monogram } from "./ornaments/Monogram";
import { Lotus } from "./ornaments/Lotus";
import { KolamCorner } from "./ornaments/Kolam";

type Phase = "loading" | "intro" | "opening" | "done";

const ease = [0.22, 1, 0.36, 1] as const;

export function IntroScreen() {
  const [phase, setPhase] = useState<Phase>("loading");
  const reduce = useReducedMotion();
  const { play } = useMusic();
  const buttonRef = useRef<HTMLButtonElement>(null);

  // Loader → intro (or straight to the site)
  useEffect(() => {
    const t = setTimeout(
      () => setPhase(wedding.site.enableIntroScreen ? "intro" : "opening"),
      reduce ? 300 : 1600,
    );
    return () => clearTimeout(t);
  }, [reduce]);

  // Doors finish opening → site is live
  useEffect(() => {
    if (phase !== "opening") return;
    const t = setTimeout(() => setPhase("done"), reduce ? 50 : 1500);
    return () => clearTimeout(t);
  }, [phase, reduce]);

  useEffect(() => {
    if (phase === "done") {
      document.body.classList.remove("scroll-locked");
      markSiteRevealed();
    } else {
      document.body.classList.add("scroll-locked");
    }
    if (phase === "intro") buttonRef.current?.focus({ preventScroll: true });
  }, [phase]);

  const open = () => {
    if (wedding.site.playMusicOnIntroOpen) void play();
    setPhase("opening");
  };

  if (phase === "done") return null;

  const doorsClosed = phase === "loading" || phase === "intro";

  return (
    <div
      className="fixed inset-0 z-[100] overflow-hidden"
      role={phase === "intro" ? "dialog" : undefined}
      aria-modal={phase === "intro" ? true : undefined}
      aria-label={phase === "intro" ? "Wedding invitation cover" : undefined}
      aria-busy={phase === "loading"}
    >
      <noscript>
        <style>{`.intro-cover{display:none!important}body{overflow:auto!important}`}</style>
      </noscript>

      {/* Temple doors */}
      {(["left", "right"] as const).map((side) => (
        <motion.div
          key={side}
          aria-hidden
          className={`intro-cover kolam-dots absolute inset-y-0 w-1/2 bg-maroon ${side === "left" ? "left-0" : "right-0"}`}
          initial={false}
          animate={{ x: doorsClosed ? "0%" : side === "left" ? "-101%" : "101%" }}
          transition={{ duration: reduce ? 0 : 1.4, ease }}
        >
        </motion.div>
      ))}

      <AnimatePresence>
        {doorsClosed && (
          <motion.div
            key="content"
            className="intro-cover absolute inset-0 flex flex-col items-center justify-center px-6 text-center text-ivory"
            exit={{ opacity: 0, scale: 0.98 }}
            transition={{ duration: 0.5 }}
          >
            <KolamCorner className="absolute left-4 top-4 h-24 w-24 text-gold/40 md:h-32 md:w-32" />
            <KolamCorner flip="x" className="absolute right-4 top-4 h-24 w-24 text-gold/40 md:h-32 md:w-32" />
            <KolamCorner flip="y" className="absolute bottom-4 left-4 h-24 w-24 text-gold/40 md:h-32 md:w-32" />
            <KolamCorner flip="xy" className="absolute bottom-4 right-4 h-24 w-24 text-gold/40 md:h-32 md:w-32" />

            <motion.div
              initial={reduce ? false : { opacity: 0, scale: 0.94 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 1.2, ease }}
              className="text-gold-muted"
            >
              <Monogram className="h-28 w-24 text-4xl text-ivory md:h-36 md:w-32 md:text-5xl" />
            </motion.div>

            <AnimatePresence mode="wait">
              {phase === "loading" ? (
                <motion.div
                  key="loader"
                  exit={{ opacity: 0 }}
                  className="mt-8 text-gold-muted"
                  aria-label="Loading the invitation"
                >
                  <motion.div
                    animate={reduce ? undefined : { opacity: [0.35, 1, 0.35] }}
                    transition={{ duration: 1.6, repeat: Infinity }}
                  >
                    <Lotus className="h-6 w-10" />
                  </motion.div>
                </motion.div>
              ) : (
                <motion.div
                  key="intro"
                  initial={{ opacity: 0, y: 12 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 1, ease }}
                  className="mt-8 flex max-w-md flex-col items-center"
                >
                  <p className="font-display text-xl italic leading-snug text-ivory/90 md:text-2xl">
                    Together with their families
                    <br />
                    invite you to celebrate their wedding
                  </p>
                  <p className="mt-6 font-display text-2xl tracking-[0.3em] text-gold-muted">11.11.2026</p>
                  <button
                    ref={buttonRef}
                    type="button"
                    onClick={open}
                    className="btn mt-10 border border-gold-muted/80 bg-transparent text-ivory hover:bg-ivory hover:text-maroon"
                  >
                    Open Invitation
                  </button>
                  {wedding.site.playMusicOnIntroOpen && (
                    <p className="mt-4 text-xs text-ivory/60">Music will begin softly</p>
                  )}
                </motion.div>
              )}
            </AnimatePresence>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}
