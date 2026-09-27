"use client";

import { createContext, useCallback, useContext, useEffect, useMemo, useRef, useState } from "react";
import { wedding } from "@/config/wedding";

interface MusicContextValue {
  isPlaying: boolean;
  unavailable: boolean;
  play: () => Promise<void>;
  pause: () => void;
  toggle: () => void;
}

const MusicContext = createContext<MusicContextValue | null>(null);

const FADE_MS = 900;

export function MusicProvider({ children }: { children: React.ReactNode }) {
  const audioRef = useRef<HTMLAudioElement | null>(null);
  const fadeRef = useRef<number | null>(null);
  const [isPlaying, setIsPlaying] = useState(false);
  const [unavailable, setUnavailable] = useState(false);

  // The <audio> element is only created on first play, so the song
  // is never downloaded for guests who don't press play.
  const getAudio = useCallback(() => {
    if (!audioRef.current) {
      const audio = new Audio();
      audio.preload = "none";
      audio.loop = wedding.songs.loop;
      audio.src = wedding.songs.src;
      audio.volume = 0;
      audio.addEventListener("error", () => {
        setUnavailable(true);
        setIsPlaying(false);
      });
      audio.addEventListener("ended", () => setIsPlaying(false));
      audioRef.current = audio;
    }
    return audioRef.current;
  }, []);

  const fadeTo = useCallback((target: number, onDone?: () => void) => {
    const audio = audioRef.current;
    if (!audio) return;
    if (fadeRef.current) cancelAnimationFrame(fadeRef.current);
    const from = audio.volume;
    const startedAt = performance.now();
    const step = (now: number) => {
      const t = Math.min(1, (now - startedAt) / FADE_MS);
      audio.volume = Math.max(0, Math.min(1, from + (target - from) * t));
      if (t < 1) fadeRef.current = requestAnimationFrame(step);
      else {
        fadeRef.current = null;
        onDone?.();
      }
    };
    fadeRef.current = requestAnimationFrame(step);
  }, []);

  const play = useCallback(async () => {
    const audio = getAudio();
    try {
      audio.volume = 0;
      await audio.play();
      setUnavailable(false);
      setIsPlaying(true);
      fadeTo(wedding.songs.volume);
    } catch {
      // Autoplay blocked or file missing — leave the button in its play state.
      setIsPlaying(false);
    }
  }, [getAudio, fadeTo]);

  const pause = useCallback(() => {
    const audio = audioRef.current;
    if (!audio) return;
    setIsPlaying(false);
    fadeTo(0, () => audio.pause());
  }, [fadeTo]);

  const toggle = useCallback(() => {
    if (isPlaying) pause();
    else void play();
  }, [isPlaying, pause, play]);

  // Pause when the tab is hidden; resume is left to the guest.
  useEffect(() => {
    const onHide = () => {
      if (document.hidden && audioRef.current && !audioRef.current.paused) {
        audioRef.current.pause();
        setIsPlaying(false);
      }
    };
    document.addEventListener("visibilitychange", onHide);
    return () => {
      document.removeEventListener("visibilitychange", onHide);
      if (fadeRef.current) cancelAnimationFrame(fadeRef.current);
      audioRef.current?.pause();
    };
  }, []);

  const value = useMemo(
    () => ({ isPlaying, unavailable, play, pause, toggle }),
    [isPlaying, unavailable, play, pause, toggle],
  );

  return <MusicContext.Provider value={value}>{children}</MusicContext.Provider>;
}

export function useMusic(): MusicContextValue {
  const ctx = useContext(MusicContext);
  if (!ctx) throw new Error("useMusic must be used inside <MusicProvider>");
  return ctx;
}
