"use client";

import { useEffect, useRef, useState } from "react";

/**
 * A fine gold ring that trails the pointer and widens over links and
 * buttons. Desktop only (precise pointer) and off for reduced motion.
 */
export function CursorRing() {
  const ref = useRef<HTMLDivElement>(null);
  const [enabled, setEnabled] = useState(false);

  useEffect(() => {
    const mq = window.matchMedia("(pointer: fine) and (prefers-reduced-motion: no-preference)");
    const update = () => setEnabled(mq.matches);
    update();
    mq.addEventListener("change", update);
    return () => mq.removeEventListener("change", update);
  }, []);

  useEffect(() => {
    if (!enabled) return;
    const el = ref.current;
    if (!el) return;
    let x = -100, y = -100, tx = -100, ty = -100, raf = 0;
    let hovering = false;

    const onMove = (e: PointerEvent) => {
      tx = e.clientX;
      ty = e.clientY;
      const target = e.target as Element | null;
      const next = Boolean(target?.closest("a, button, [role='button'], input, textarea, label"));
      if (next !== hovering) {
        hovering = next;
        el.dataset.hover = String(next);
      }
      el.style.opacity = "1";
    };
    const onLeave = () => (el.style.opacity = "0");
    const loop = () => {
      x += (tx - x) * 0.2;
      y += (ty - y) * 0.2;
      el.style.transform = `translate3d(${x}px, ${y}px, 0) translate(-50%, -50%)`;
      raf = requestAnimationFrame(loop);
    };
    window.addEventListener("pointermove", onMove, { passive: true });
    document.documentElement.addEventListener("pointerleave", onLeave);
    raf = requestAnimationFrame(loop);
    return () => {
      cancelAnimationFrame(raf);
      window.removeEventListener("pointermove", onMove);
      document.documentElement.removeEventListener("pointerleave", onLeave);
    };
  }, [enabled]);

  if (!enabled) return null;
  return (
    <div
      ref={ref}
      aria-hidden
      data-hover="false"
      className="pointer-events-none fixed left-0 top-0 z-[120] h-7 w-7 rounded-full border border-gold opacity-0 transition-[width,height,background-color,opacity] duration-300 data-[hover=true]:h-12 data-[hover=true]:w-12 data-[hover=true]:bg-gold/10"
    />
  );
}
