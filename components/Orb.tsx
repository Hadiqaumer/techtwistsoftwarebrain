// The "brain": a glowing sphere with a circuit pattern (echoes the circuit texture of the Tech Twist logo).
export default function Orb({ id = "orb" }: { id?: string }) {
  const nodes: [number, number][] = [[44, 120], [156, 98], [62, 164], [178, 142], [92, 62], [152, 62], [186, 90], [120, 178]];
  return (
    <svg viewBox="0 0 240 240" className="h-full w-full" role="img" aria-label="Restaurant Brain core">
      <defs>
        <radialGradient id={id} cx="35%" cy="28%" r="78%">
          <stop offset="0" stopColor="#D5EEF1" /><stop offset=".42" stopColor="#4FB59F" /><stop offset="1" stopColor="#0D2B3E" />
        </radialGradient>
      </defs>
      <circle cx="120" cy="120" r="108" fill={`url(#${id})`} />
      <g stroke="#F5E9B6" strokeWidth="1.8" fill="none" strokeLinecap="round" opacity=".95">
        <path d="M44 120h46l22-22h44" /><path d="M62 164h44l22-22h50" /><path d="M92 62l26 26v34" />
        <path d="M152 62l-12 28h46" /><path d="M120 122v56" /><path d="M70 92h22" />
      </g>
      <g fill="#F5E9B6">
        {nodes.map(([x, y]) => <circle key={`${x}-${y}`} cx={x} cy={y} r="4.5" />)}
        <circle cx="120" cy="122" r="6" />
      </g>
      <ellipse cx="92" cy="58" rx="52" ry="26" fill="#fff" opacity=".2" transform="rotate(-28 92 58)" />
    </svg>
  );
}
