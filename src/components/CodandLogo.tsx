import React from "react";

type Variant = "full" | "icon" | "favicon";
type Theme   = "light" | "dark" | "mono";
type Size    = "sm" | "md" | "lg";

interface CodandLogoProps {
  variant?: Variant;
  theme?:   Theme;
  size?:    Size;
}

// ── Size scale maps ─────────────────────────────────────────────
const ICON_SCALE: Record<Size, number> = { sm: 0.6, md: 0.8, lg: 1 };

const TEXT_SIZE: Record<Size, { cod: number; and: number; tag: number }> = {
  sm: { cod: 24, and: 16, tag: 10 },
  md: { cod: 34, and: 22, tag: 10 },
  lg: { cod: 42, and: 28, tag: 10 },
};

// ── Colour maps ─────────────────────────────────────────────────
const COD_COLOR: Record<Theme, string> = {
  light: "#0F0720",
  dark:  "#FFFFFF",
  mono:  "#111111",
};

const AND_COLOR: Record<Theme, string> = {
  light: "#7C3AED",
  dark:  "#A78BFA",
  mono:  "#6B7280",
};

const TAG_COLOR: Record<Theme, string> = {
  light: "#9CA3AF",
  dark:  "#4B5563",
  mono:  "#9CA3AF",
};

export default function CodandLogo({
  variant = "full",
  theme   = "light",
  size    = "md",
}: CodandLogoProps) {

  // ── FAVICON variant ─────────────────────────────────────────
  if (variant === "favicon") {
    return (
      <svg
        xmlns="http://www.w3.org/2000/svg"
        viewBox="0 0 32 32"
        width={32}
        height={32}
        aria-label="CODAND favicon"
      >
        <rect width={32} height={32} rx={8} fill="#7C3AED" />
        {/* 3 white dots in C formation */}
        <circle cx={18} cy={9}  r={5.4} fill="white" opacity={1}    />
        <circle cx={14} cy={16} r={4.2} fill="white" opacity={0.75} />
        <circle cx={18} cy={23} r={3.3} fill="white" opacity={0.45} />
      </svg>
    );
  }

  // ── ICON variant ────────────────────────────────────────────
  if (variant === "icon") {
    const s = ICON_SCALE[size];
    // Base coords (lg scale)
    const cx1 = 18, cy1 = 9,  r1 = 9;
    const cx2 = 13, cy2 = 20, r2 = 7;
    const cx3 = 18, cy3 = 30, r3 = 5.5;
    const divX = 30, divY = 19;

    const W = Math.round(42 * s);
    const H = Math.round(42 * s);

    return (
      <svg
        xmlns="http://www.w3.org/2000/svg"
        viewBox={`0 0 42 42`}
        width={W}
        height={H}
        aria-label="CODAND icon"
      >
        <defs>
          <linearGradient id="pg-icon" x1="0" y1="0" x2="1" y2="1">
            <stop offset="0%"   stopColor="#7C3AED" />
            <stop offset="100%" stopColor="#2563EB" />
          </linearGradient>
        </defs>
        {/* Connector line: dot1 → dot2 */}
        <line
          x1={cx1} y1={cy1 + r1}
          x2={cx2} y2={cy2 - r2}
          stroke="#D8B4FE"
          strokeWidth={1.5}
          strokeDasharray="2,2"
        />
        {/* Connector line: dot2 → dot3 */}
        <line
          x1={cx2} y1={cy2 + r2}
          x2={cx3} y2={cy3 - r3}
          stroke="#D8B4FE"
          strokeWidth={1.5}
          strokeDasharray="2,2"
        />
        {/* 3 dots */}
        <circle cx={cx1} cy={cy1} r={r1}  fill="#7C3AED" opacity={1}    />
        <circle cx={cx2} cy={cy2} r={r2}  fill="#5B21B6" opacity={0.75} />
        <circle cx={cx3} cy={cy3} r={r3}  fill="#2563EB" opacity={0.45} />
        {/* Small divider dot */}
        <circle cx={divX} cy={divY} r={3.5} fill="url(#pg-icon)" />
      </svg>
    );
  }

  // ── FULL variant ─────────────────────────────────────────────
  const s   = ICON_SCALE[size];
  const ts  = TEXT_SIZE[size];
  const showTagline = size === "lg";

  // Icon geometry (base = lg)
  const cx1 = 18, cy1 = 12,  r1 = 9;
  const cx2 = 13, cy2 = 24,  r2 = 7;
  const cx3 = 18, cy3 = 35,  r3 = 5.5;
  const divX = 30, divY = 23;

  // Icon bounding box height (lg) ≈ 44, scaled
  const iconH = Math.round(44 * s);
  // Icon section width (lg) ≈ 38
  const iconW = Math.round(38 * s);

  // Text x offset from icon
  const gapX  = 10;
  const textX = iconW + gapX;

  // Text y offsets — align COD near top of icon
  const codY   = Math.round(ts.cod * 0.82); // baseline relative to top
  const andY   = codY + Math.round(ts.and * 1.05);
  const tagY   = andY + Math.round(ts.tag * 1.8);
  const ruleY  = andY + Math.round(ts.and * 0.35);

  // Total canvas dimensions
  const wordmarkW = 200; // generous
  const canvasW   = textX + wordmarkW;
  const canvasH   = Math.max(iconH, showTagline ? tagY + 4 : andY + ts.and);

  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      viewBox={`0 0 ${canvasW} ${canvasH}`}
      height={canvasH}
      aria-label="CODAND"
    >
      <defs>
        <linearGradient id="pg-full" x1="0" y1="0" x2="1" y2="1">
          <stop offset="0%"   stopColor="#7C3AED" />
          <stop offset="100%" stopColor="#2563EB" />
        </linearGradient>
        <linearGradient id="rule-grad" x1="0" y1="0" x2="1" y2="0">
          <stop offset="0%"   stopColor="#7C3AED" />
          <stop offset="100%" stopColor="#2563EB" />
        </linearGradient>
      </defs>

      {/* ── Icon group (scaled) ── */}
      <g transform={`scale(${s})`}>
        {/* Connectors */}
        <line
          x1={cx1} y1={cy1 + r1}
          x2={cx2} y2={cy2 - r2}
          stroke="#D8B4FE" strokeWidth={1.5} strokeDasharray="2,2"
        />
        <line
          x1={cx2} y1={cy2 + r2}
          x2={cx3} y2={cy3 - r3}
          stroke="#D8B4FE" strokeWidth={1.5} strokeDasharray="2,2"
        />
        {/* 3 dots */}
        <circle cx={cx1} cy={cy1} r={r1}  fill="#7C3AED" opacity={1}    />
        <circle cx={cx2} cy={cy2} r={r2}  fill="#5B21B6" opacity={0.75} />
        <circle cx={cx3} cy={cy3} r={r3}  fill="#2563EB" opacity={0.45} />
        {/* Divider dot */}
        <circle cx={divX} cy={divY} r={3.5} fill="url(#pg-full)" />
      </g>

      {/* ── Wordmark ── */}
      {/* COD */}
      <text
        x={textX}
        y={codY}
        fontFamily="'Geist', 'Inter', system-ui, sans-serif"
        fontSize={ts.cod}
        fontWeight={800}
        letterSpacing="-0.5"
        fill={COD_COLOR[theme]}
      >
        COD
      </text>

      {/* AND */}
      <text
        x={textX}
        y={andY}
        fontFamily="'Geist', 'Inter', system-ui, sans-serif"
        fontSize={ts.and}
        fontWeight={300}
        letterSpacing="7"
        fill={AND_COLOR[theme]}
      >
        AND
      </text>

      {/* Baseline rule */}
      {showTagline && (
        <>
          <line
            x1={textX} y1={ruleY}
            x2={textX + 160} y2={ruleY}
            stroke="#E5E7EB" strokeWidth={1}
          />
          {/* Purple override — first 74px */}
          <line
            x1={textX} y1={ruleY}
            x2={textX + 74} y2={ruleY}
            stroke="url(#rule-grad)" strokeWidth={1}
          />
          {/* Tagline */}
          <text
            x={textX}
            y={tagY}
            fontFamily="'Geist', 'Inter', system-ui, sans-serif"
            fontSize={ts.tag}
            fontWeight={400}
            letterSpacing="3.5"
            fill={TAG_COLOR[theme]}
          >
            DIGITAL SOLUTIONS
          </text>
        </>
      )}
    </svg>
  );
}
