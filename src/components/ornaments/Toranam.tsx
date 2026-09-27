interface Props {
  className?: string;
  leaves?: number;
}

/** A thoranam of mango leaves with small marigolds, as hung over a doorway */
export function Toranam({ className, leaves = 13 }: Props) {
  const gap = 28;
  const width = leaves * gap;
  return (
    <svg viewBox={`0 0 ${width} 44`} fill="none" aria-hidden className={className} preserveAspectRatio="xMidYMin meet">
      <path d={`M0 5Q${width / 2} 11 ${width} 5`} stroke="currentColor" strokeWidth="0.9" />
      {Array.from({ length: leaves }).map((_, i) => {
        const x = gap / 2 + i * gap;
        const t = x / width;
        const y = 5 + 24 * t * (1 - t); // follow the gentle sag
        const long = i % 2 === 0;
        return (
          <g key={i} transform={`translate(${x} ${y})`}>
            {long ? (
              <>
                <path d="M0 0C5 7 5 21 0 30C-5 21 -5 7 0 0Z" fill="currentColor" fillOpacity=".08" stroke="currentColor" strokeWidth=".9" />
                <path d="M0 3V27" stroke="currentColor" strokeWidth=".6" opacity=".6" />
              </>
            ) : (
              <circle cx="0" cy="5" r="3.4" stroke="currentColor" strokeWidth=".9" strokeDasharray="1.6 1.2" />
            )}
          </g>
        );
      })}
    </svg>
  );
}
