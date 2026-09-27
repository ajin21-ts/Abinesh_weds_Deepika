import { wedding } from "@/config/wedding";

interface Props {
  className?: string;
  /** Show the fine arch around the letters */
  framed?: boolean;
}

export function Monogram({ className, framed = true }: Props) {
  const { first, second } = wedding.monogram;
  return (
    <span className={`relative inline-flex items-center justify-center font-display ${className ?? ""}`}>
      {framed && (
        <svg viewBox="0 0 60 70" fill="none" aria-hidden className="absolute inset-0 h-full w-full">
          <path d="M6 70V32C6 16 18 6 30 3C42 6 54 16 54 32V70" stroke="currentColor" strokeWidth="1" vectorEffect="non-scaling-stroke" opacity=".7" />
        </svg>
      )}
      <span className="relative leading-none tracking-wide">
        {first}
        <span className="mx-[0.08em] italic text-gold">&amp;</span>
        {second}
      </span>
    </span>
  );
}
