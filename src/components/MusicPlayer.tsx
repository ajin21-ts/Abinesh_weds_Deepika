"use client";

import { useState } from "react";
import { Pause, Play } from "lucide-react";
import { useMusic } from "./MusicProvider";

export function MusicPlayer() {
  const { isPlaying, unavailable, toggle } = useMusic();
  const [hover, setHover] = useState(false);

  const label = unavailable
    ? "Song unavailable"
    : isPlaying
      ? "Pause our song"
      : "Play Our Song";

  return (
    <div
      className="fixed z-[60] left-4 bottom-5 md:left-6 md:bottom-auto md:top-[58%]"
      onMouseEnter={() => setHover(true)}
      onMouseLeave={() => setHover(false)}
    >
      <button
        type="button"
        onClick={toggle}
        onFocus={() => setHover(true)}
        onBlur={() => setHover(false)}
        aria-label={label}
        aria-pressed={isPlaying}
        className="group relative grid h-12 w-12 place-items-center rounded-full border border-gold/70 bg-ivory/90 text-maroon shadow-[0_6px_24px_-8px_rgba(74,18,27,0.45)] backdrop-blur-md transition-colors duration-500 hover:bg-maroon hover:text-ivory md:h-14 md:w-14"
      >
        {/* Slow golden halo while playing */}
        {isPlaying && (
          <span
            aria-hidden
            className="absolute inset-[-5px] rounded-full border border-gold/40 motion-safe:animate-ping [animation-duration:2.6s]"
          />
        )}
        {isPlaying ? (
          <Pause aria-hidden className="h-4 w-4" strokeWidth={1.6} fill="currentColor" />
        ) : (
          <Play aria-hidden className="ml-0.5 h-4 w-4" strokeWidth={1.6} fill="currentColor" />
        )}
        {/* Tiny music waves while playing */}
        {isPlaying && (
          <span
            aria-hidden
            className="absolute -right-1 -top-1 flex h-5 w-5 items-end justify-center gap-[2px] rounded-full bg-maroon px-[4px] pb-[4px] pt-[5px] text-gold-muted"
          >
            {[0, 0.3, 0.15].map((d, i) => (
              <span
                key={i}
                className="eq-bar block h-full w-[2px] rounded-full bg-current"
                style={{ animationDelay: `${d}s` }}
              />
            ))}
          </span>
        )}
      </button>

      <span
        role="tooltip"
        className={`pointer-events-none absolute left-full top-1/2 ml-3 -translate-y-1/2 whitespace-nowrap rounded-full bg-maroon-deep/90 px-3 py-1 font-display text-sm italic text-ivory transition-all duration-300 ${
          hover ? "translate-x-0 opacity-100" : "-translate-x-1 opacity-0"
        }`}
      >
        {label}
      </span>
    </div>
  );
}
