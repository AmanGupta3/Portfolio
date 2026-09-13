"use client";

import { motion } from "framer-motion";

interface NewsIllustrationProps {
  className?: string;
}

// A generic animated tech-pattern placeholder for articles without a cover
// image — reuses the brand's connected-dots motif (see CodandLogo) so it
// reads as "on-brand" rather than a random stock illustration.
export default function NewsIllustration({ className }: NewsIllustrationProps) {
  const nodes = [
    { cx: 60, cy: 45, r: 8, o: 1 },
    { cx: 110, cy: 75, r: 6, o: 0.75 },
    { cx: 150, cy: 35, r: 5, o: 0.6 },
    { cx: 170, cy: 90, r: 7, o: 0.85 },
  ];

  return (
    <svg
      viewBox="0 0 220 130"
      className={className}
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      aria-hidden="true"
    >
      <motion.line
        x1={nodes[0].cx} y1={nodes[0].cy} x2={nodes[1].cx} y2={nodes[1].cy}
        stroke="white" strokeOpacity="0.35" strokeWidth="1.5" strokeDasharray="4 4"
        animate={{ strokeDashoffset: [0, -16] }}
        transition={{ duration: 2.4, repeat: Infinity, ease: "linear" }}
      />
      <motion.line
        x1={nodes[1].cx} y1={nodes[1].cy} x2={nodes[2].cx} y2={nodes[2].cy}
        stroke="white" strokeOpacity="0.3" strokeWidth="1.5" strokeDasharray="4 4"
        animate={{ strokeDashoffset: [0, -16] }}
        transition={{ duration: 2.4, repeat: Infinity, ease: "linear", delay: 0.3 }}
      />
      <motion.line
        x1={nodes[1].cx} y1={nodes[1].cy} x2={nodes[3].cx} y2={nodes[3].cy}
        stroke="white" strokeOpacity="0.3" strokeWidth="1.5" strokeDasharray="4 4"
        animate={{ strokeDashoffset: [0, -16] }}
        transition={{ duration: 2.4, repeat: Infinity, ease: "linear", delay: 0.6 }}
      />
      {nodes.map((n, i) => (
        <motion.circle
          key={`${n.cx}-${n.cy}`}
          cx={n.cx}
          cy={n.cy}
          r={n.r}
          fill="white"
          fillOpacity={n.o}
          animate={{ y: [0, -6, 0] }}
          transition={{ duration: 2.2, repeat: Infinity, ease: "easeInOut", delay: i * 0.25 }}
        />
      ))}
    </svg>
  );
}
