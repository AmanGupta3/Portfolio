"use client";

import { useEffect, useRef, useState } from "react";
import { useInView } from "framer-motion";

interface AnimatedCounterProps {
  value: string;
  duration?: number;
  className?: string;
  style?: React.CSSProperties;
}

// Parses a leading number out of strings like "9+", "98%", "3+ Years" and
// animates it counting up when scrolled into view. Non-numeric values
// (e.g. "Free") render statically.
export default function AnimatedCounter({ value, duration = 1200, className, style }: AnimatedCounterProps) {
  const ref = useRef<HTMLSpanElement>(null);
  const isInView = useInView(ref, { once: true, margin: "-50px" });

  const match = value.match(/^(\d+(?:\.\d+)?)/);
  const numericPart = match ? parseFloat(match[1]) : null;
  const decimals = match && match[1].includes(".") ? 1 : 0;
  const suffix = match ? value.slice(match[0].length) : "";

  const [display, setDisplay] = useState(numericPart === null ? value : `0${suffix}`);

  useEffect(() => {
    if (!isInView || numericPart === null) return;
    let start: number | null = null;
    let frame: number;

    function step(timestamp: number) {
      if (start === null) start = timestamp;
      const progress = Math.min((timestamp - start) / duration, 1);
      const eased = 1 - Math.pow(1 - progress, 3);
      const current = numericPart! * eased;
      setDisplay(`${current.toFixed(decimals)}${suffix}`);
      if (progress < 1) {
        frame = requestAnimationFrame(step);
      } else {
        setDisplay(`${numericPart!.toFixed(decimals)}${suffix}`);
      }
    }

    frame = requestAnimationFrame(step);
    return () => cancelAnimationFrame(frame);
  }, [isInView, numericPart, decimals, suffix, duration]);

  return (
    <span ref={ref} className={className} style={style}>
      {numericPart === null ? value : display}
    </span>
  );
}
