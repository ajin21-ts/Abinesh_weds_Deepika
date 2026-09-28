"use client";

import { useEffect, useRef, useState } from "react";
import { AnimatePresence, motion } from "framer-motion";
import { Menu, X } from "lucide-react";
import { Monogram } from "./ornaments/Monogram";
import { Lotus } from "./ornaments/Lotus";

const links = [
  { href: "#home", label: "Home" },
  { href: "#couple", label: "Our Wedding" },
  { href: "#events", label: "Events" },
  { href: "#venue", label: "Venue" },
  // { href: "#gallery", label: "Gallery" },
  { href: "#wishes", label: "Wishes" },
];

export function Navigation() {
  const [scrolled, setScrolled] = useState(false);
  const [open, setOpen] = useState(false);
  const [active, setActive] = useState("#home");
  const toggleRef = useRef<HTMLButtonElement>(null);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 40);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  // Highlight the section in view
  useEffect(() => {
    const sections = links
      .map((l) => document.querySelector<HTMLElement>(l.href))
      .filter((el): el is HTMLElement => Boolean(el));
    const io = new IntersectionObserver(
      (entries) => {
        entries.forEach((e) => {
          if (e.isIntersecting) setActive(`#${e.target.id}`);
        });
      },
      { rootMargin: "-45% 0px -50% 0px" },
    );
    sections.forEach((s) => io.observe(s));
    return () => io.disconnect();
  }, []);

  // Lock scroll + close on Escape while the mobile menu is open
  useEffect(() => {
    if (!open) return;
    document.body.classList.add("scroll-locked");
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") {
        setOpen(false);
        toggleRef.current?.focus();
      }
    };
    window.addEventListener("keydown", onKey);
    return () => {
      document.body.classList.remove("scroll-locked");
      window.removeEventListener("keydown", onKey);
    };
  }, [open]);

  const solid = scrolled || open;

  return (
    <>
      <header
        className={`fixed inset-x-0 top-0 z-50 transition-[background-color,box-shadow,backdrop-filter] duration-700 ${
          solid
            ? "bg-ivory/80 shadow-[0_1px_0_0_rgba(200,154,67,0.25)] backdrop-blur-xl"
            : "bg-transparent"
        }`}
      >
        <a
          href="#main"
          className="sr-only focus:not-sr-only focus:absolute focus:left-4 focus:top-3 focus:z-50 focus:bg-ivory focus:px-4 focus:py-2 focus:text-maroon"
        >
          Skip to content
        </a>
        <nav
          aria-label="Primary"
          className={`container-wedding flex items-center justify-between transition-[height] duration-500 ${
            scrolled ? "h-16" : "h-20"
          }`}
        >
          <a
            href="#home"
            aria-label="Abinesh and Deepika, back to top"
            className={`transition-colors duration-500 ${solid ? "text-maroon" : "text-ivory"}`}
          >
            <Monogram className="h-11 w-10 text-lg" />
          </a>

          <ul className="hidden items-center gap-9 lg:flex">
            {links.map((l) => (
              <li key={l.href}>
                <a
                  href={l.href}
                  aria-current={active === l.href ? "true" : undefined}
                  className={`group relative py-2 font-display text-[1.15rem] transition-colors duration-500 ${
                    solid
                      ? "text-ink hover:text-maroon"
                      : "text-ivory/90 hover:text-ivory"
                  }`}
                >
                  {l.label}
                  <span
                    aria-hidden
                    className={`absolute -bottom-0.5 left-1/2 h-px -translate-x-1/2 bg-gold transition-all duration-500 ${
                      active === l.href ? "w-full" : "w-0 group-hover:w-full"
                    }`}
                  />
                </a>
              </li>
            ))}
          </ul>

          <button
            ref={toggleRef}
            type="button"
            className={`grid h-11 w-11 place-items-center lg:hidden ${solid ? "text-maroon" : "text-ivory"}`}
            aria-expanded={open}
            aria-controls="mobile-menu"
            aria-label={open ? "Close menu" : "Open menu"}
            onClick={() => setOpen((v) => !v)}
          >
            {open ? <X strokeWidth={1.3} /> : <Menu strokeWidth={1.3} />}
          </button>
        </nav>
      </header>
      <AnimatePresence>
        {open && (
          <motion.div
            id="mobile-menu"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.4 }}
            className="fixed inset-0 z-40 pt-16 flex flex-col items-center justify-center bg-ivory lg:hidden"
          >
            <ul className="flex flex-col items-center gap-5">
              {links.map((l, i) => (
                <motion.li
                  key={l.href}
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.05 * i + 0.1, duration: 0.5 }}
                >
                  <a
                    href={l.href}
                    onClick={() => setOpen(false)}
                    className={`font-display text-4xl font-light ${
                      active === l.href ? "text-maroon" : "text-ink"
                    }`}
                  >
                    {l.label}
                  </a>
                </motion.li>
              ))}
            </ul>
            <Lotus className="mt-12 h-6 w-10 text-gold" />
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}
