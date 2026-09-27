"use client";

import Image from "next/image";
import { useRef } from "react";
import { motion, useReducedMotion, useScroll, useTransform, type Variants } from "framer-motion";
import { wedding } from "@/config/wedding";
import { useSiteRevealed } from "@/hooks/useIntro";
import { TempleArch, Kalasam } from "./ornaments/TempleArch";
import { Lotus } from "./ornaments/Lotus";

const ease = [0.22, 1, 0.36, 1] as const;

const rise: Variants = {
  hidden: { opacity: 0, y: 28 },
  show: (i: number) => ({ opacity: 1, y: 0, transition: { duration: 1.4, delay: 0.3 + i * 0.18, ease } }),
};

export function Hero() {
  const ref = useRef<HTMLElement>(null);
  const revealed = useSiteRevealed();
  const reduce = useReducedMotion();
  const { scrollYProgress } = useScroll({ target: ref, offset: ["start start", "end start"] });
  const imgY = useTransform(scrollYProgress, [0, 1], ["0%", reduce ? "0%" : "12%"]);
  const contentOpacity = useTransform(scrollYProgress, [0, 0.6], [1, reduce ? 1 : 0]);

  const state = revealed || reduce ? "show" : "hidden";
  const { groom, bride, hero } = wedding;

  return (
    <section
      id="home"
      ref={ref}
      aria-label="Abinesh and Deepika are getting married"
      className="relative isolate h-[92svh] min-h-[600px] overflow-hidden bg-maroon-deep md:h-screen md:min-h-[680px]"
    >
      <motion.div className="absolute inset-0 -z-20" style={{ y: imgY }}>
        <Image
          src={hero.image}
          alt={hero.imageAlt}
          fill
          priority
          sizes="100vw"
          className="scale-[1.06] object-cover"
          style={{ objectPosition: hero.focalPoint }}
        />
      </motion.div>

      {/* Light-touch overlays: keep faces clear, give the lower third depth for type */}
      <div aria-hidden className="absolute inset-0 -z-10 bg-gradient-to-b from-ink/45 via-transparent to-transparent to-30%" />
      <div aria-hidden className="absolute inset-0 -z-10 bg-gradient-to-t from-maroon-deep/90 via-maroon-deep/35 via-40% to-transparent to-70%" />

      {/* The photo is seen through a mandapam arch */}
      <div aria-hidden className="pointer-events-none absolute inset-x-3 bottom-4 top-[4.5rem] text-gold-muted/70 sm:inset-x-6 md:inset-x-12 md:bottom-8 md:top-24">
        <TempleArch className="h-full w-full" play={revealed || Boolean(reduce)} delay={0.1} />
        <motion.div
          className="absolute left-1/2 top-[7.85%] -translate-x-1/2 -translate-y-full"
          initial={reduce ? false : { opacity: 0, y: -6 }}
          animate={revealed ? { opacity: 1, y: 0 } : undefined}
          transition={{ duration: 1.2, delay: 1.6 }}
        >
          <Kalasam className="h-9 w-7 text-gold-muted" />
        </motion.div>
      </div>

      <motion.div
        style={{ opacity: contentOpacity }}
        className="absolute inset-x-0 bottom-0 flex flex-col items-center px-6 pb-16 text-center text-ivory md:pb-20"
      >
        <motion.p
          custom={0}
          variants={rise}
          initial="hidden"
          animate={state}
          className="font-display text-lg italic text-ivory/85 md:text-xl"
        >
          Together with their families
        </motion.p>

        <h1 className="mt-3 font-display font-light uppercase leading-[0.9] tracking-[0.06em] md:mt-4">
          <motion.span
            custom={1}
            variants={rise}
            initial="hidden"
            animate={state}
            className="block text-[clamp(2.9rem,13vw,8.25rem)]"
          >
            {groom.firstName}
          </motion.span>
          <motion.span
            custom={2}
            variants={rise}
            initial="hidden"
            animate={state}
            className="my-1 block text-[clamp(2rem,8vw,4.5rem)] normal-case italic leading-none text-gold-muted md:my-0"
          >
            <span className="sr-only">and</span>
            <span aria-hidden>&amp;</span>
          </motion.span>
          <motion.span
            custom={3}
            variants={rise}
            initial="hidden"
            animate={state}
            className="block text-[clamp(2.9rem,13vw,8.25rem)]"
          >
            {bride.firstName}
          </motion.span>
        </h1>

        <motion.div custom={4} variants={rise} initial="hidden" animate={state} className="mt-7 flex items-center gap-4">
          <span aria-hidden className="h-px w-10 bg-gold-muted/70 sm:w-16" />
          <time dateTime="2026-11-11" className="font-display text-xl tracking-[0.3em] text-ivory md:text-2xl">
            11 • 11 • 2026
          </time>
          <span aria-hidden className="h-px w-10 bg-gold-muted/70 sm:w-16" />
        </motion.div>

        <motion.p custom={5} variants={rise} initial="hidden" animate={state} className="mt-4 text-sm tracking-[0.2em] text-ivory/85 uppercase">
          We&rsquo;re getting married
        </motion.p>
        <motion.p custom={6} variants={rise} initial="hidden" animate={state} className="mt-2 hidden font-display text-lg italic text-gold-muted sm:block">
          {hero.tagline}
        </motion.p>

        <motion.a
          href="#welcome"
          aria-label="Scroll to the invitation"
          custom={7}
          variants={rise}
          initial="hidden"
          animate={state}
          className="mt-8 flex flex-col items-center gap-2 text-gold-muted"
        >
          <Lotus className="h-4 w-7" />
          <span className="relative block h-9 w-px overflow-hidden bg-gold-muted/30">
            <span className="absolute inset-x-0 top-0 h-1/2 bg-gold-muted motion-safe:animate-[scrollcue_2.4s_ease-in-out_infinite]" />
          </span>
        </motion.a>
      </motion.div>
    </section>
  );
}
