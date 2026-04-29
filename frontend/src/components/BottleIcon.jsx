// Small craft-beer bottle silhouette, color-tinted by beer style.
// SVG = no copyright issues, no extra HTTP request, looks clean on dark theme.

export default function BottleIcon({ color = "#d97706", className = "" }) {
  return (
    <svg
      viewBox="0 0 64 160"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      className={className}
      aria-hidden="true"
    >
      {/* Cap */}
      <rect x="24" y="2" width="16" height="12" rx="1.5" fill="#1c1917" />
      <rect x="22" y="13" width="20" height="3" rx="0.5" fill="#0c0a09" />
      {/* Neck */}
      <rect x="26" y="16" width="12" height="22" fill={color} opacity="0.92" />
      {/* Shoulder */}
      <path
        d={`M 26 38
            C 26 44, 14 50, 14 64
            L 14 148
            C 14 154, 18 158, 24 158
            L 40 158
            C 46 158, 50 154, 50 148
            L 50 64
            C 50 50, 38 44, 38 38
            Z`}
        fill={color}
        opacity="0.95"
      />
      {/* Glass highlight */}
      <path
        d="M 18 64 L 18 144 C 18 148, 20 150, 22 150 L 22 64 Z"
        fill="#ffffff"
        opacity="0.18"
      />
      {/* Label */}
      <rect
        x="16"
        y="84"
        width="32"
        height="44"
        rx="1"
        fill="#0c0a09"
        opacity="0.88"
      />
      <rect
        x="16"
        y="84"
        width="32"
        height="44"
        rx="1"
        fill="none"
        stroke="#d97706"
        strokeOpacity="0.55"
        strokeWidth="0.8"
      />
      {/* Label flame mark (brand hint) */}
      <path
        d="M 32 92
           C 34 95, 36 98, 35 102
           C 36 100, 38 102, 37 105
           C 39 103, 40 106, 39 109
           C 38 111, 35 112, 32 112
           C 29 112, 26 111, 25 109
           C 24 106, 25 103, 27 105
           C 26 102, 28 100, 29 102
           C 28 98, 30 95, 32 92 Z"
        fill="#d97706"
      />
      <rect x="20" y="116" width="24" height="2" fill="#d97706" opacity="0.8" />
      <rect x="22" y="120" width="20" height="1" fill="#fafaf9" opacity="0.6" />
      <rect x="24" y="123" width="16" height="1" fill="#fafaf9" opacity="0.5" />
    </svg>
  );
}
