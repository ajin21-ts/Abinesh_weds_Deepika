"use client";

import { useSyncExternalStore } from "react";

/**
 * Tiny shared flag: has the loader / intro screen finished?
 * The hero waits for it so its entrance plays when guests can see it.
 */
let revealed = false;
const listeners = new Set<() => void>();

export function markSiteRevealed(): void {
  if (revealed) return;
  revealed = true;
  listeners.forEach((l) => l());
}

function subscribe(cb: () => void) {
  listeners.add(cb);
  return () => listeners.delete(cb);
}

export function useSiteRevealed(): boolean {
  return useSyncExternalStore(
    subscribe,
    () => revealed,
    () => false,
  );
}
