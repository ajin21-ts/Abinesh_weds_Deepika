"use client";

import Image from "next/image";
import { useCallback, useEffect, useRef, useState } from "react";
import { AnimatePresence, motion, useReducedMotion } from "framer-motion";
import { ChevronLeft, ChevronRight, X } from "lucide-react";
import { wedding } from "@/config/wedding";
import { SectionTitle } from "./SectionTitle";

export function Gallery() {
  const images = wedding.gallery;
  const [index, setIndex] = useState<number | null>(null);
  const reduce = useReducedMotion();
  const dialogRef = useRef<HTMLDivElement>(null);
  const lastTrigger = useRef<HTMLButtonElement | null>(null);

  const close = useCallback(() => {
    setIndex(null);
    lastTrigger.current?.focus();
  }, []);
  const step = useCallback(
    (dir: 1 | -1) => setIndex((i) => (i === null ? i : (i + dir + images.length) % images.length)),
    [images.length],
  );

  useEffect(() => {
    if (index === null) return;
    document.body.classList.add("scroll-locked");
    dialogRef.current?.querySelector<HTMLElement>("[data-autofocus]")?.focus();

    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") close();
      else if (e.key === "ArrowRight") step(1);
      else if (e.key === "ArrowLeft") step(-1);
      else if (e.key === "Tab" && dialogRef.current) {
        // keep focus inside the lightbox
        const focusables = dialogRef.current.querySelectorAll<HTMLElement>("button");
        const first = focusables[0];
        const last = focusables[focusables.length - 1];
        if (e.shiftKey && document.activeElement === first) {
          e.preventDefault();
          last.focus();
        } else if (!e.shiftKey && document.activeElement === last) {
          e.preventDefault();
          first.focus();
        }
      }
    };
    window.addEventListener("keydown", onKey);
    return () => {
      window.removeEventListener("keydown", onKey);
      document.body.classList.remove("scroll-locked");
    };
  }, [index, close, step]);

  // Simple swipe on touch screens
  const touchX = useRef<number | null>(null);

  const current = index === null ? null : images[index];

  return (
    <section id="gallery" aria-labelledby="gallery-title" className="section-pad bg-champagne/60">
      <div className="container-wedding">
        <SectionTitle id="gallery-title" title="Our Moments" kicker="A few frames from our story" />

        <ul className="columns-1 gap-4 min-[480px]:columns-2 md:gap-6 lg:columns-3">
          {images.map((img, i) => (
            <motion.li
              key={img.src}
              className="mb-4 break-inside-avoid md:mb-6"
              initial={reduce ? false : { opacity: 0, clipPath: "inset(12% 0 0 0)" }}
              whileInView={{ opacity: 1, clipPath: "inset(0% 0 0 0)" }}
              viewport={{ once: true, margin: "0px 0px -10% 0px" }}
              transition={{ duration: 1.2, delay: (i % 3) * 0.1, ease: [0.22, 1, 0.36, 1] }}
            >
              <button
                type="button"
                onClick={(e) => {
                  lastTrigger.current = e.currentTarget;
                  setIndex(i);
                }}
                className={`group relative block w-full overflow-hidden bg-sandal ${i === 0 ? "arch" : ""}`}
                aria-label={`Open photo: ${img.alt}`}
              >
                <Image
                  src={img.src}
                  alt={img.alt}
                  width={img.width}
                  height={img.height}
                  sizes="(min-width: 1024px) 30vw, (min-width: 480px) 45vw, 92vw"
                  className="h-auto w-full transition-transform duration-[1.6s] ease-[var(--ease-silk)] group-hover:scale-[1.05]"
                />
                <span aria-hidden className="absolute inset-0 bg-maroon/0 transition-colors duration-700 group-hover:bg-maroon/15" />
                <span aria-hidden className="absolute inset-3 border border-ivory/0 transition-colors duration-700 group-hover:border-ivory/60" />
              </button>
            </motion.li>
          ))}
        </ul>
      </div>

      <AnimatePresence>
        {current && index !== null && (
          <motion.div
            ref={dialogRef}
            role="dialog"
            aria-modal="true"
            aria-label={`Photo ${index + 1} of ${images.length}: ${current.alt}`}
            className="fixed inset-0 z-[80] flex items-center justify-center bg-ink/95 p-4 md:p-12"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.35 }}
            onClick={(e) => {
              if (e.target === e.currentTarget) close();
            }}
            onTouchStart={(e) => (touchX.current = e.touches[0].clientX)}
            onTouchEnd={(e) => {
              if (touchX.current === null) return;
              const dx = e.changedTouches[0].clientX - touchX.current;
              if (Math.abs(dx) > 50) step(dx < 0 ? 1 : -1);
              touchX.current = null;
            }}
          >
            <AnimatePresence mode="wait">
              <motion.div
                key={current.src}
                initial={{ opacity: 0, scale: reduce ? 1 : 0.97 }}
                animate={{ opacity: 1, scale: 1 }}
                exit={{ opacity: 0 }}
                transition={{ duration: 0.4 }}
                className="relative h-full max-h-[85vh] w-full max-w-5xl"
              >
                <Image src={current.src} alt={current.alt} fill sizes="100vw" className="object-contain" />
              </motion.div>
            </AnimatePresence>

            <p className="absolute bottom-5 left-1/2 -translate-x-1/2 font-display text-lg italic text-ivory/80">
              {index + 1} / {images.length}
            </p>
            <button
              type="button"
              data-autofocus
              onClick={close}
              aria-label="Close photo"
              className="absolute right-4 top-4 grid h-12 w-12 place-items-center rounded-full border border-ivory/30 text-ivory hover:bg-ivory/10"
            >
              <X strokeWidth={1.3} />
            </button>
            <button
              type="button"
              onClick={() => step(-1)}
              aria-label="Previous photo"
              className="absolute left-2 top-1/2 grid h-12 w-12 -translate-y-1/2 place-items-center rounded-full text-ivory hover:bg-ivory/10 md:left-6"
            >
              <ChevronLeft strokeWidth={1.3} />
            </button>
            <button
              type="button"
              onClick={() => step(1)}
              aria-label="Next photo"
              className="absolute right-2 top-1/2 grid h-12 w-12 -translate-y-1/2 place-items-center rounded-full text-ivory hover:bg-ivory/10 md:right-6"
            >
              <ChevronRight strokeWidth={1.3} />
            </button>
          </motion.div>
        )}
      </AnimatePresence>
    </section>
  );
}
