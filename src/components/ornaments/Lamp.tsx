/** Kuthu vilakku (brass oil lamp) line silhouette */
export function Lamp({ className }: { className?: string }) {
  return (
    <svg viewBox="0 0 40 100" fill="none" aria-hidden className={className}>
      <g stroke="currentColor" strokeWidth="1" strokeLinecap="round" strokeLinejoin="round">
        <path d="M20 2C23 8 23 13 20 16C17 13 17 8 20 2Z" fill="currentColor" fillOpacity=".15" />
        <path d="M6 22C8 25 8 28 6 29C4 28 4 25 6 22Z" />
        <path d="M34 22C36 25 36 28 34 29C32 28 32 25 34 22Z" />
        <path d="M17 20H23L22 24H18Z" />
        <path d="M3 31Q20 43 37 31" />
        <path d="M3 31H37" />
        <path d="M20 38V80" />
        <ellipse cx="20" cy="50" rx="4" ry="2" />
        <ellipse cx="20" cy="64" rx="5" ry="2.4" />
        <path d="M8 92Q20 78 32 92Z" />
        <path d="M4 96H36" />
      </g>
    </svg>
  );
}
