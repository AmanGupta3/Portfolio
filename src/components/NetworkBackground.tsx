"use client";

import { useEffect, useRef } from "react";
import { useTheme } from "@/contexts/ThemeContext";

interface Particle {
  x: number;
  y: number;
  vx: number;
  vy: number;
  radius: number;
  color: string;
  opacity: number;
}

const PARTICLE_COLORS = ["#7C3AED", "#2563EB", "#A78BFA", "#60A5FA"];
const PARTICLE_COUNT = 70;
const MOUSE_RADIUS = 120;
const MAX_SPEED = 1.2;
const MIN_SPEED = 0.2;
const LINE_MAX_DISTANCE = 150;

export default function NetworkBackground() {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const { theme } = useTheme();

  useEffect(() => {
    const canvas = canvasRef.current;
    const ctx = canvas?.getContext("2d");
    if (!canvas || !ctx) return;

    // Purple line reads well on dark backgrounds but washes out on white —
    // use a deeper, more saturated tone with higher opacity in light mode.
    const lineColorRgb = theme === "dark" ? "124, 58, 237" : "91, 33, 182";
    const lineOpacityScale = theme === "dark" ? 0.25 : 0.4;

    const prefersReducedMotion = window.matchMedia(
      "(prefers-reduced-motion: reduce)"
    ).matches;

    const mouse = { x: -9999, y: -9999 };
    let particles: Particle[] = [];
    let animationId = 0;

    function initParticles() {
      particles = Array.from({ length: PARTICLE_COUNT }, () => ({
        x: Math.random() * canvas!.width,
        y: Math.random() * canvas!.height,
        vx: (Math.random() - 0.5) * 0.6,
        vy: (Math.random() - 0.5) * 0.6,
        radius: Math.random() * 2.5 + 1.5,
        color: PARTICLE_COLORS[Math.floor(Math.random() * PARTICLE_COLORS.length)],
        opacity: Math.random() * 0.4 + 0.4,
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
    }

    function drawFrame() {
      const width = canvas!.width;
      const height = canvas!.height;
      ctx!.clearRect(0, 0, width, height);

      for (const p of particles) {
        const dx = p.x - mouse.x;
        const dy = p.y - mouse.y;
        const dist = Math.sqrt(dx * dx + dy * dy);
        if (dist < MOUSE_RADIUS && dist > 0) {
          const force = (MOUSE_RADIUS - dist) / MOUSE_RADIUS;
          p.vx += (dx / dist) * force * 0.4;
          p.vy += (dy / dist) * force * 0.4;
        }

        p.vx *= 0.98;
        p.vy *= 0.98;

        const speed = Math.sqrt(p.vx * p.vx + p.vy * p.vy);
        if (speed > MAX_SPEED) {
          p.vx = (p.vx / speed) * MAX_SPEED;
          p.vy = (p.vy / speed) * MAX_SPEED;
        }
        if (speed < MIN_SPEED) {
          p.vx += (Math.random() - 0.5) * 0.05;
          p.vy += (Math.random() - 0.5) * 0.05;
        }

        p.x += p.vx;
        p.y += p.vy;

        if (p.x < p.radius) {
          p.x = p.radius;
          p.vx = Math.abs(p.vx);
        }
        if (p.x > width - p.radius) {
          p.x = width - p.radius;
          p.vx = -Math.abs(p.vx);
        }
        if (p.y < p.radius) {
          p.y = p.radius;
          p.vy = Math.abs(p.vy);
        }
        if (p.y > height - p.radius) {
          p.y = height - p.radius;
          p.vy = -Math.abs(p.vy);
        }
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
    }

    function loop() {
      drawFrame();
      animationId = requestAnimationFrame(loop);
    }

    resize();
    if (prefersReducedMotion) {
      drawFrame();
    } else {
      loop();
    }

    const resizeObserver = new ResizeObserver(() => resize());
    resizeObserver.observe(canvas);
    canvas.addEventListener("mousemove", handleMouseMove);
    canvas.addEventListener("mouseleave", handleMouseLeave);

    return () => {
      cancelAnimationFrame(animationId);
      resizeObserver.disconnect();
      canvas.removeEventListener("mousemove", handleMouseMove);
      canvas.removeEventListener("mouseleave", handleMouseLeave);
    };
  }, [theme]);

  return (
    <canvas ref={canvasRef} className="w-full h-full" style={{ display: "block" }} />
  );
}
