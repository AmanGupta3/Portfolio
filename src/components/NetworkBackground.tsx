"use client";

import { useEffect, useRef } from "react";
import { useTheme } from "@/contexts/ThemeContext";

interface Particle {
  x: number;
  y: number;
  targetX: number;
  targetY: number;
  vx: number;
  vy: number;
  radius: number;
  color: string;
  opacity: number;
}

const PARTICLE_COLORS = ["#7C3AED", "#2563EB", "#A78BFA", "#60A5FA"];
const PARTICLE_COUNT = 64;
const MOUSE_RADIUS = 120;
const MAX_SPEED = 3;
const SPRING_STRENGTH = 0.012;
const DAMPING = 0.9;
const LINE_MAX_DISTANCE = 90;

// The dot-constellation already reads as the "C" from the CodandLogo motif —
// hovering reveals the rest of the name letter by letter to spell "CODAND".
const REVEAL_LETTERS = ["O", "D", "A", "N", "D"];
const LETTER_STAGGER = 0.15; // seconds between each letter starting to appear
const LETTER_EASE_IN = 0.08;
const LETTER_EASE_OUT = 0.14;

function getArcGeometry(width: number, height: number, reserveLetterSpace: boolean) {
  // When the reveal letters are enabled, the "C" shifts left and shrinks a
  // touch so "ODAND" has room to appear to its right without clipping.
  const cx = width * (reserveLetterSpace ? 0.3 : 0.55);
  const cy = height * 0.5;
  const outerR = Math.min(width, height) * (reserveLetterSpace ? 0.28 : 0.38);
  const innerR = outerR * 0.62;
  const startAngle = Math.PI * 0.22;
  const endAngle = Math.PI * 1.78; // leaves a gap on the right — the "C" opening
  return { cx, cy, outerR, innerR, startAngle, endAngle };
}

// Points tracing an open "C" arc — the same 3-dot brand motif from
// CodandLogo, scaled up into a full constellation instead of 3 dots.
function computeCTargets(width: number, height: number, count: number, reserveLetterSpace: boolean): { x: number; y: number }[] {
  const { cx, cy, outerR, innerR, startAngle, endAngle } = getArcGeometry(width, height, reserveLetterSpace);
  const points: { x: number; y: number }[] = [];

  for (let i = 0; i < count; i++) {
    const t = i / (count - 1);
    const angle = startAngle + t * (endAngle - startAngle);
    // Alternate between two radii so the arc has visual thickness, not a thin line
    const ring = i % 3 === 0 ? outerR : i % 3 === 1 ? (outerR + innerR) / 2 : innerR;
    const jitterR = (Math.random() - 0.5) * outerR * 0.06;
    points.push({
      x: cx + Math.cos(angle) * (ring + jitterR),
      y: cy + Math.sin(angle) * (ring + jitterR),
    });
  }
  return points;
}

interface NetworkBackgroundProps {
  // Reveals "ODAND" next to the C constellation on hover, spelling out
  // "CODAND". Only meant for the one hero it was designed around.
  interactiveLetters?: boolean;
}

export default function NetworkBackground({ interactiveLetters = false }: NetworkBackgroundProps) {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const { theme } = useTheme();

  useEffect(() => {
    const canvas = canvasRef.current;
    const ctx = canvas?.getContext("2d");
    if (!canvas || !ctx) return;

    // Purple line reads well on dark backgrounds but washes out on white —
    // use a deeper, more saturated tone with higher opacity in light mode.
    const lineColorRgb = theme === "dark" ? "124, 58, 237" : "91, 33, 182";
    const lineOpacityScale = theme === "dark" ? 0.3 : 0.45;
    const letterColor = theme === "dark" ? "#F5F3FF" : "#3B0764";

    const prefersReducedMotion = window.matchMedia(
      "(prefers-reduced-motion: reduce)"
    ).matches;

    const mouse = { x: -9999, y: -9999 };
    let particles: Particle[] = [];
    let animationId = 0;

    // Letter-reveal state (only used when interactiveLetters is on)
    let hoverActive = false;
    let hoverElapsed = 0;
    const letterReveal = new Array(REVEAL_LETTERS.length).fill(0);

    function initParticles() {
      const targets = computeCTargets(canvas!.width, canvas!.height, PARTICLE_COUNT, interactiveLetters);
      particles = targets.map((t) => ({
        // Start scattered randomly across the canvas — they'll drift and
        // settle into the constellation shape once the animation begins.
        x: Math.random() * canvas!.width,
        y: Math.random() * canvas!.height,
        targetX: t.x,
        targetY: t.y,
        vx: 0,
        vy: 0,
        radius: Math.random() * 2 + 1.5,
        color: PARTICLE_COLORS[Math.floor(Math.random() * PARTICLE_COLORS.length)],
        opacity: Math.random() * 0.4 + 0.5,
      }));
    }

    function resize() {
      canvas!.width = canvas!.offsetWidth;
      canvas!.height = canvas!.offsetHeight;
      initParticles();
    }

    function handleMouseMove(e: MouseEvent) {
      const rect = canvas!.getBoundingClientRect();
      mouse.x = e.clientX - rect.left;
      mouse.y = e.clientY - rect.top;
    }
    function handleMouseLeave() {
      mouse.x = -9999;
      mouse.y = -9999;
      hoverActive = false;
    }
    function handleMouseEnter() {
      hoverActive = true;
      hoverElapsed = 0;
    }

    function drawLetters(width: number, height: number) {
      const { cx, cy, outerR } = getArcGeometry(width, height, true);
      hoverElapsed += hoverActive ? 1 / 60 : 0;

      const fontSize = Math.min(Math.max(outerR * 0.5, 16), 30);
      ctx!.font = `700 ${fontSize}px "Inter", system-ui, sans-serif`;
      ctx!.textBaseline = "middle";
      ctx!.textAlign = "left";

      let x = cx + outerR + fontSize * 0.5;
      for (let i = 0; i < REVEAL_LETTERS.length; i++) {
        const delay = i * LETTER_STAGGER;
        const target = hoverActive && hoverElapsed > delay ? 1 : 0;
        const ease = target === 1 ? LETTER_EASE_IN : LETTER_EASE_OUT;
        letterReveal[i] += (target - letterReveal[i]) * ease;

        const reveal = letterReveal[i];
        if (reveal > 0.01) {
          const rise = (1 - reveal) * 10;
          ctx!.save();
          ctx!.globalAlpha = reveal;
          ctx!.fillStyle = letterColor;
          ctx!.fillText(REVEAL_LETTERS[i], x, cy + rise);
          ctx!.restore();
        }
        x += ctx!.measureText(REVEAL_LETTERS[i]).width + fontSize * 0.12;
      }
    }

    function drawFrame() {
      const width = canvas!.width;
      const height = canvas!.height;
      ctx!.clearRect(0, 0, width, height);

      for (const p of particles) {
        // Spring pull toward the resolved constellation position
        p.vx += (p.targetX - p.x) * SPRING_STRENGTH;
        p.vy += (p.targetY - p.y) * SPRING_STRENGTH;

        // Scatter away from the cursor on hover
        const dx = p.x - mouse.x;
        const dy = p.y - mouse.y;
        const dist = Math.sqrt(dx * dx + dy * dy);
        if (dist < MOUSE_RADIUS && dist > 0) {
          const force = (MOUSE_RADIUS - dist) / MOUSE_RADIUS;
          p.vx += (dx / dist) * force * 0.6;
          p.vy += (dy / dist) * force * 0.6;
        }

        // A faint continuous jitter so resolved particles still feel alive
        p.vx += (Math.random() - 0.5) * 0.015;
        p.vy += (Math.random() - 0.5) * 0.015;

        p.vx *= DAMPING;
        p.vy *= DAMPING;

        const speed = Math.sqrt(p.vx * p.vx + p.vy * p.vy);
        if (speed > MAX_SPEED) {
          p.vx = (p.vx / speed) * MAX_SPEED;
          p.vy = (p.vy / speed) * MAX_SPEED;
        }

        p.x += p.vx;
        p.y += p.vy;
      }

      for (let i = 0; i < particles.length; i++) {
        for (let j = i + 1; j < particles.length; j++) {
          const a = particles[i];
          const b = particles[j];
          const dx = a.x - b.x;
          const dy = a.y - b.y;
          const dist = Math.sqrt(dx * dx + dy * dy);
          if (dist < LINE_MAX_DISTANCE) {
            const opacity = (1 - dist / LINE_MAX_DISTANCE) * lineOpacityScale;
            ctx!.beginPath();
            ctx!.moveTo(a.x, a.y);
            ctx!.lineTo(b.x, b.y);
            ctx!.strokeStyle = `rgba(${lineColorRgb}, ${opacity})`;
            ctx!.lineWidth = 0.8;
            ctx!.stroke();
          }
        }
      }

      for (const p of particles) {
        ctx!.beginPath();
        ctx!.arc(p.x, p.y, p.radius, 0, Math.PI * 2);
        const alphaHex = Math.round(255 * p.opacity).toString(16).padStart(2, "0");
        ctx!.fillStyle = p.color + alphaHex;
        ctx!.fill();
      }

      if (interactiveLetters) {
        drawLetters(width, height);
      }
    }

    function loop() {
      drawFrame();
      animationId = requestAnimationFrame(loop);
    }

    resize();
    if (prefersReducedMotion) {
      // Skip straight to the resolved shape for reduced-motion users
      particles.forEach((p) => {
        p.x = p.targetX;
        p.y = p.targetY;
      });
      drawFrame();
    } else {
      loop();
    }

    const resizeObserver = new ResizeObserver(() => resize());
    resizeObserver.observe(canvas);
    canvas.addEventListener("mousemove", handleMouseMove);
    canvas.addEventListener("mouseleave", handleMouseLeave);
    if (interactiveLetters) {
      canvas.addEventListener("mouseenter", handleMouseEnter);
    }

    return () => {
      cancelAnimationFrame(animationId);
      resizeObserver.disconnect();
      canvas.removeEventListener("mousemove", handleMouseMove);
      canvas.removeEventListener("mouseleave", handleMouseLeave);
      if (interactiveLetters) {
        canvas.removeEventListener("mouseenter", handleMouseEnter);
      }
    };
  }, [theme, interactiveLetters]);

  return (
    <canvas ref={canvasRef} className="w-full h-full" style={{ display: "block" }} />
  );
}
