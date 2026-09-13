"use client";

import { motion } from "framer-motion";

export type IllustrationVariant =
  | "logistics"
  | "energy"
  | "voice-ai"
  | "cloud"
  | "enterprise"
  | "resume-ai";

interface ProjectIllustrationProps {
  variant: IllustrationVariant;
  className?: string;
}

export default function ProjectIllustration({ variant, className }: ProjectIllustrationProps) {
  return (
    <svg
      viewBox="0 0 220 140"
      className={className}
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      aria-hidden="true"
    >
      {variant === "logistics" && <LogisticsArt />}
      {variant === "energy" && <EnergyArt />}
      {variant === "voice-ai" && <VoiceAiArt />}
      {variant === "cloud" && <CloudArt />}
      {variant === "enterprise" && <EnterpriseArt />}
      {variant === "resume-ai" && <ResumeAiArt />}
    </svg>
  );
}

// ── Logistics: truck driving along a flowing route ──────────────────────────
function LogisticsArt() {
  return (
    <>
      <motion.path
        d="M10 100 Q 60 40, 110 75 T 210 45"
        stroke="white"
        strokeOpacity="0.35"
        strokeWidth="2"
        strokeDasharray="6 6"
        animate={{ strokeDashoffset: [0, -24] }}
        transition={{ duration: 2, repeat: Infinity, ease: "linear" }}
      />
      <circle cx="10" cy="100" r="5" fill="white" fillOpacity="0.5" />
      <circle cx="110" cy="75" r="5" fill="white" fillOpacity="0.5" />
      <motion.circle
        cx="210"
        cy="45"
        r="6"
        fill="white"
        fillOpacity="0.9"
        animate={{ scale: [1, 1.35, 1] }}
        transition={{ duration: 1.6, repeat: Infinity, ease: "easeInOut" }}
        style={{ transformOrigin: "210px 45px" }}
      />
      <motion.g
        animate={{ x: [0, 6, 0], y: [0, -2, 0] }}
        transition={{ duration: 1.1, repeat: Infinity, ease: "easeInOut" }}
      >
        {/* Truck body */}
        <rect x="70" y="90" width="52" height="28" rx="4" fill="white" fillOpacity="0.15" />
        <rect x="122" y="98" width="26" height="20" rx="3" fill="white" fillOpacity="0.25" />
        <circle cx="88" cy="122" r="7" fill="white" fillOpacity="0.6" />
        <circle cx="132" cy="122" r="7" fill="white" fillOpacity="0.6" />
        {/* Boxes */}
        <rect x="78" y="78" width="14" height="14" rx="2" fill="white" fillOpacity="0.3" />
        <rect x="96" y="76" width="14" height="16" rx="2" fill="white" fillOpacity="0.2" />
      </motion.g>
    </>
  );
}

// ── Energy: live gauge needle, pulsing bar chart ────────────────────────────
function EnergyArt() {
  const bars = [
    { x: 130, y: 80, h: 40, o: 0.25, delay: 0 },
    { x: 150, y: 60, h: 60, o: 0.4, delay: 0.15 },
    { x: 170, y: 40, h: 80, o: 0.6, delay: 0.3 },
    { x: 190, y: 55, h: 65, o: 0.3, delay: 0.45 },
  ];
  return (
    <>
      <circle cx="60" cy="70" r="34" stroke="white" strokeOpacity="0.3" strokeWidth="3" />
      <motion.path
        d="M60 70 L60 42"
        stroke="white"
        strokeOpacity="0.8"
        strokeWidth="3"
        strokeLinecap="round"
        animate={{ rotate: [10, 60, 10] }}
        transition={{ duration: 2.4, repeat: Infinity, ease: "easeInOut" }}
        style={{ transformOrigin: "60px 70px" }}
      />
      <circle cx="60" cy="70" r="4" fill="white" fillOpacity="0.9" />
      {bars.map((b) => (
        <motion.rect
          key={b.x}
          x={b.x}
          width="14"
          rx="2"
          fill="white"
          fillOpacity={b.o}
          initial={{ y: b.y, height: b.h }}
          animate={{ y: [b.y, b.y - 8, b.y], height: [b.h, b.h + 8, b.h] }}
          transition={{ duration: 1.8, repeat: Infinity, ease: "easeInOut", delay: b.delay }}
        />
      ))}
    </>
  );
}

// ── Voice AI: rippling soundwave, typing chat dots ──────────────────────────
function VoiceAiArt() {
  const bars = [
    { x: 20, y: 70, h: 16, o: 0.4, delay: 0 },
    { x: 32, y: 55, h: 46, o: 0.6, delay: 0.1 },
    { x: 44, y: 40, h: 76, o: 0.8, delay: 0.2 },
    { x: 56, y: 58, h: 40, o: 0.5, delay: 0.3 },
    { x: 68, y: 68, h: 20, o: 0.35, delay: 0.4 },
  ];
  return (
    <>
      <rect x="130" y="35" width="70" height="48" rx="14" fill="white" fillOpacity="0.15" />
      {[150, 165, 180].map((cx, i) => (
        <motion.circle
          key={cx}
          cx={cx}
          cy="59"
          r="3"
          fill="white"
          animate={{ opacity: [0.3, 1, 0.3] }}
          transition={{ duration: 1.2, repeat: Infinity, delay: i * 0.2 }}
        />
      ))}
      <path d="M150 83 L140 95 L150 83 Z" fill="white" fillOpacity="0.15" />
      {bars.map((b) => (
        <motion.rect
          key={b.x}
          x={b.x}
          width="5"
          rx="2.5"
          fill="white"
          fillOpacity={b.o}
          initial={{ y: b.y, height: b.h }}
          animate={{ y: [b.y, b.y - b.h * 0.25, b.y], height: [b.h, b.h * 1.3, b.h] }}
          transition={{ duration: 0.9, repeat: Infinity, ease: "easeInOut", delay: b.delay }}
        />
      ))}
    </>
  );
}

// ── Cloud: looping upload arrow, pulsing lock ───────────────────────────────
function CloudArt() {
  return (
    <>
      <path
        d="M55 90c-13 0-23-10-23-22 0-11 8-20 19-22 4-13 16-22 30-22 16 0 29 12 31 27 11 2 19 11 19 22 0 12-10 22-23 22H55z"
        fill="white"
        fillOpacity="0.18"
      />
      <motion.path
        d="M108 60 L108 82 M100 70 L108 60 L116 70"
        stroke="white"
        strokeOpacity="0.8"
        strokeWidth="4"
        strokeLinecap="round"
        strokeLinejoin="round"
        animate={{ y: [6, -4, 6], opacity: [0.4, 1, 0.4] }}
        transition={{ duration: 1.6, repeat: Infinity, ease: "easeInOut" }}
      />
      {/* Lock */}
      <rect x="155" y="75" width="34" height="28" rx="4" fill="white" fillOpacity="0.25" />
      <path
        d="M162 75 v-8a10 10 0 0 1 20 0 v8"
        stroke="white"
        strokeOpacity="0.6"
        strokeWidth="4"
        fill="none"
      />
      <motion.circle
        cx="172"
        cy="89"
        r="3.5"
        fill="white"
        fillOpacity="0.7"
        animate={{ scale: [1, 1.4, 1] }}
        transition={{ duration: 1.5, repeat: Infinity, ease: "easeInOut" }}
        style={{ transformOrigin: "172px 89px" }}
      />
    </>
  );
}

// ── Enterprise: dashboard tiles cycling through a highlight scan ────────────
function EnterpriseArt() {
  const tiles = [
    { x: 30, y: 30, w: 40, h: 32, base: 0.2, delay: 0 },
    { x: 78, y: 30, w: 40, h: 32, base: 0.2, delay: 0.15 },
    { x: 126, y: 30, w: 40, h: 32, base: 0.2, delay: 0.3 },
    { x: 30, y: 70, w: 40, h: 32, base: 0.2, delay: 0.45 },
    { x: 78, y: 70, w: 40, h: 32, base: 0.2, delay: 0.6 },
    { x: 126, y: 70, w: 40, h: 32, base: 0.2, delay: 0.75 },
  ];
  return (
    <>
      {tiles.map((t) => (
        <motion.rect
          key={`${t.x}-${t.y}`}
          x={t.x}
          y={t.y}
          width={t.w}
          height={t.h}
          rx="6"
          fill="white"
          animate={{ fillOpacity: [t.base, 0.6, t.base] }}
          transition={{ duration: 2.4, repeat: Infinity, ease: "easeInOut", delay: t.delay }}
        />
      ))}
    </>
  );
}

// ── Resume AI: magnifier scanning the document ──────────────────────────────
function ResumeAiArt() {
  return (
    <>
      <rect x="65" y="25" width="60" height="80" rx="6" fill="white" fillOpacity="0.18" />
      <rect x="76" y="40" width="38" height="4" rx="2" fill="white" fillOpacity="0.5" />
      <rect x="76" y="52" width="30" height="4" rx="2" fill="white" fillOpacity="0.4" />
      <rect x="76" y="64" width="34" height="4" rx="2" fill="white" fillOpacity="0.4" />
      <rect x="76" y="76" width="24" height="4" rx="2" fill="white" fillOpacity="0.3" />
      <motion.g
        animate={{ y: [-18, 18, -18] }}
        transition={{ duration: 2.6, repeat: Infinity, ease: "easeInOut" }}
      >
        <circle cx="152" cy="70" r="20" stroke="white" strokeOpacity="0.6" strokeWidth="4" />
        <line x1="166" y1="84" x2="182" y2="100" stroke="white" strokeOpacity="0.6" strokeWidth="5" strokeLinecap="round" />
        {/* Checkmark badge — pinned to the lens as it scans */}
        <motion.circle
          cx="152"
          cy="70"
          r="10"
          fill="white"
          fillOpacity="0.85"
          animate={{ scale: [1, 1.15, 1] }}
          transition={{ duration: 1.8, repeat: Infinity, ease: "easeInOut" }}
          style={{ transformOrigin: "152px 70px" }}
        />
        <path d="M147 70 l4 4 l8 -8" stroke="#F43F5E" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round" fill="none" />
      </motion.g>
    </>
  );
}
