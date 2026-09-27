/** A strand of jasmine buds (malli), as woven into a garland */
export function JasmineStrand({ className, buds = 11 }: { className?: string; buds?: number }) {
  const gap = 18;
  const width = buds * gap + 6;
  return (
    <svg viewBox={`0 0 ${width} 24`} fill="none" aria-hidden className={className}>
      <path d={`M0 12Q${width / 4} 6 ${width / 2} 12T${width} 12`} stroke="currentColor" strokeWidth=".7" opacity=".5" />
      {Array.from({ length: buds }).map((_, i) => {
        const x = 6 + i * gap;
        const rot = i % 2 === 0 ? -28 : 28;
        return (
          <g key={i} transform={`translate(${x} 12) rotate(${rot})`}>
            <ellipse cx="0" cy="-5" rx="2.6" ry="5.4" fill="currentColor" fillOpacity=".12" stroke="currentColor" strokeWidth=".8" />
          </g>
        );
      })}
    </svg>
  );
}
