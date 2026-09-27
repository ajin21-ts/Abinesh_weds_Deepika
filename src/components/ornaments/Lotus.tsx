interface Props {
  className?: string;
  strokeWidth?: number;
}

/** Line-art lotus, drawn in currentColor */
export function Lotus({ className, strokeWidth = 1.1 }: Props) {
  return (
    <svg viewBox="0 0 64 40" fill="none" aria-hidden className={className}>
      <g stroke="currentColor" strokeWidth={strokeWidth} strokeLinejoin="round" strokeLinecap="round">
        <path d="M32 4C38 12 38 26 32 34C26 26 26 12 32 4Z" />
        <path d="M32 34C24 30 16 22 14 12C22 14 29 22 32 34Z" />
        <path d="M32 34C40 30 48 22 50 12C42 14 35 22 32 34Z" />
        <path d="M32 35C22 35 10 30 4 22C14 20 25 26 32 35Z" />
        <path d="M32 35C42 35 54 30 60 22C50 20 39 26 32 35Z" />
        <path d="M18 38.5H46" />
        <path d="M32 12V26" opacity=".5" />
      </g>
    </svg>
  );
}
