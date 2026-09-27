"use client";

import { useEffect, useId, useRef, useState } from "react";
import { AnimatePresence, motion } from "framer-motion";
import { CalendarPlus, Download } from "lucide-react";
import type { WeddingEvent } from "@/types/wedding";
import { downloadIcs, googleCalendarUrl } from "@/utils/calendar";

export function AddToCalendar({ event }: { event: WeddingEvent }) {
  const [open, setOpen] = useState(false);
  const wrapRef = useRef<HTMLDivElement>(null);
  const triggerRef = useRef<HTMLButtonElement>(null);
  const firstRef = useRef<HTMLAnchorElement>(null);
  const menuId = useId();

  useEffect(() => {
    if (!open) return;
    firstRef.current?.focus();
    const onDown = (e: PointerEvent) => {
      if (!wrapRef.current?.contains(e.target as Node)) setOpen(false);
    };
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") {
        setOpen(false);
        triggerRef.current?.focus();
      }
      if (e.key === "ArrowDown" || e.key === "ArrowUp") {
        e.preventDefault();
        const items = wrapRef.current?.querySelectorAll<HTMLElement>("[data-cal-item]");
        if (!items?.length) return;
        const idx = Array.from(items).indexOf(document.activeElement as HTMLElement);
        const next = e.key === "ArrowDown" ? (idx + 1) % items.length : (idx - 1 + items.length) % items.length;
        items[next].focus();
      }
    };
    document.addEventListener("pointerdown", onDown);
    document.addEventListener("keydown", onKey);
    return () => {
      document.removeEventListener("pointerdown", onDown);
      document.removeEventListener("keydown", onKey);
    };
  }, [open]);

  return (
    <div ref={wrapRef} className="relative">
      <button
        ref={triggerRef}
        type="button"
        className="btn btn-solid w-full sm:w-auto"
        aria-haspopup="true"
        aria-expanded={open}
        aria-controls={menuId}
        onClick={() => setOpen((v) => !v)}
      >
        <CalendarPlus aria-hidden className="h-4 w-4" strokeWidth={1.5} />
        Add to Calendar
      </button>

      <AnimatePresence>
        {open && (
          <motion.div
            id={menuId}
            role="group"
            aria-label={`Add ${event.name} to your calendar`}
            initial={{ opacity: 0, y: -6 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -6 }}
            transition={{ duration: 0.25 }}
            className="absolute left-0 right-0 top-full z-20 mt-2 min-w-[15rem] border border-gold/40 bg-jasmine p-1.5 shadow-[0_18px_40px_-18px_rgba(74,18,27,0.4)] sm:right-auto"
          >
            <a
              ref={firstRef}
              data-cal-item
              href={googleCalendarUrl(event)}
              target="_blank"
              rel="noopener noreferrer"
              onClick={() => setOpen(false)}
              className="flex items-center gap-3 px-4 py-3 font-display text-lg text-ink transition-colors hover:bg-champagne focus-visible:bg-champagne"
            >
              <CalendarPlus aria-hidden className="h-4 w-4 text-gold-deep" strokeWidth={1.5} />
              Google Calendar
            </a>
            <button
              data-cal-item
              type="button"
              onClick={() => {
                downloadIcs(event);
                setOpen(false);
              }}
              className="flex w-full items-center gap-3 px-4 py-3 text-left font-display text-lg text-ink transition-colors hover:bg-champagne focus-visible:bg-champagne"
            >
              <Download aria-hidden className="h-4 w-4 text-gold-deep" strokeWidth={1.5} />
              <span>
                Download calendar file
                <span className="block font-body text-xs text-ink-soft">.ics for Apple, Outlook &amp; others</span>
              </span>
            </button>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}
