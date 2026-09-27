interface Props {
  className?: string;
  /** Mirror for use in other corners */
  flip?: "x" | "y" | "xy";
}

const dots: [number, number][] = [
  [16, 16], [46, 16], [76, 16], [106, 16],
  [16, 46], [46, 46], [76, 46],
  [16, 76], [46, 76],
  [16, 106],
];

function lens(a: [number, number], b: [number, number]): string {
  const mx = (a[0] + b[0]) / 2;
  const my = (a[1] + b[1]) / 2;
  const dx = b[0] - a[0];
  const dy = b[1] - a[1];
  // perpendicular offset for the petal curve
  const px = -dy * 0.32;
  const py = dx * 0.32;
  return `M${a[0]} ${a[1]}Q${mx + px} ${my + py} ${b[0]} ${b[1]}Q${mx - px} ${my - py} ${a[0]} ${a[1]}Z`;
}

/** Corner ornament inspired by a pulli (dot) kolam */
export function KolamCorner({ className, flip }: Props) {
  const pairs: [number, number][] = [];
  dots.forEach((d, i) =>
    dots.forEach((e, j) => {
      if (j <= i) return;
      const dist = Math.hypot(d[0] - e[0], d[1] - e[1]);
      if (Math.abs(dist - 30) < 0.5) pairs.push([i, j]);
    }),
  );
  const transform =
    flip === "x" ? "scale(-1,1) translate(-122,0)" : flip === "y" ? "scale(1,-1) translate(0,-122)" : flip === "xy" ? "scale(-1,-1) translate(-122,-122)" : undefined;

  return (
    <svg viewBox="0 0 122 122" fill="none" aria-hidden className={className}>
      <g transform={transform} stroke="currentColor" strokeWidth="0.9" strokeLinecap="round">
        {pairs.map(([i, j]) => (
          <path key={`${i}-${j}`} d={lens(dots[i], dots[j])} />
        ))}
        {dots.map(([x, y]) => (
          <circle key={`${x}-${y}`} cx={x} cy={y} r="1.6" fill="currentColor" stroke="none" />
        ))}
        <path d="M4 118C4 56 56 4 118 4" opacity=".55" />
      </g>
    </svg>
  );
}
