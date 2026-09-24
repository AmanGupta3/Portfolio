import Link from "next/link";
import {
  ArrowRight,
  CheckCircle2,
  Star,
  Briefcase,
  Zap,
} from "lucide-react";
import NetworkBackground from "@/components/NetworkBackground";
import AnimatedCounter from "@/components/motion/AnimatedCounter";

// ── Stats data ──────────────────────────────────────────────
const STATS = [
  {
    icon: Briefcase,
    value: "9+",
    label: "Projects Delivered",
  },
  {
    icon: Star,
    value: "98%",
    label: "Client Satisfaction",
  },
  {
    icon: CheckCircle2,
    value: "Free",
    label: "Consultation",
  },
] as const;

export default function HomePage() {
  return (
    <section className="relative min-h-screen flex flex-col justify-center overflow-hidden bg-white dark:bg-gray-950 px-6 py-16 md:px-10 lg:px-16 transition-colors duration-300">

      {/* ── Subtle background gradient blobs ── */}
      <div
        aria-hidden="true"
        className="pointer-events-none absolute -top-32 -left-32 w-[480px] h-[480px] rounded-full bg-[#7C3AED]/6 blur-3xl"
      />
      <div
        aria-hidden="true"
        className="pointer-events-none absolute -bottom-32 -right-10 w-[420px] h-[420px] rounded-full bg-[#2563EB]/6 blur-3xl"
      />

      {/* ── Main hero grid ── */}
      <div className="relative mx-auto w-full max-w-6xl">
        <div className="grid grid-cols-1 items-center gap-12 lg:grid-cols-2 lg:gap-16">

          {/* ══ LEFT — Copy ══════════════════════════════════════ */}
          <div className="flex flex-col items-start">

            {/* Eyebrow pill */}
            <div className="animate-fade-in mb-5 flex items-center gap-2 rounded-full border border-[#7C3AED]/20 dark:border-[#7C3AED]/30 bg-[#EDE9FE] dark:bg-[#7C3AED]/10 px-4 py-1.5">
              <Zap size={13} className="text-[#7C3AED]" />
              <span className="text-xs font-semibold tracking-wide text-[#7C3AED] dark:text-[#A78BFA] uppercase">
                Full-Stack Development Agency
              </span>
            </div>

            {/* Headline */}
            <h1 className="animate-fade-in-up delay-100 text-[2.6rem] font-extrabold leading-[1.15] tracking-tight text-gray-900 dark:text-white sm:text-5xl lg:text-[3.2rem]">
              Build Amazing{" "}
              <span className="bg-gradient-to-r from-[#7C3AED] to-[#2563EB] bg-clip-text text-transparent">
                Applications
              </span>
            </h1>

            {/* Subheading */}
            <p className="animate-fade-in-up delay-200 mt-5 max-w-lg text-[1.05rem] leading-relaxed text-gray-500 dark:text-gray-400">
              We design and engineer high-performance web &amp; mobile products
              — from MVPs to enterprise platforms. Ship faster with a team that
              cares about quality, scalability, and results.
            </p>

            {/* CTA buttons */}
            <div className="animate-fade-in-up delay-300 mt-8 flex flex-wrap items-center gap-3">
              <Link
                href="/portfolio"
                className="inline-flex items-center gap-2 rounded-xl border-2 border-[#7C3AED] px-6 py-3 text-sm font-semibold text-[#7C3AED] transition-all hover:bg-[#7C3AED] hover:text-white active:scale-95"
              >
                View Portfolio
                <ArrowRight size={15} />
              </Link>
              <Link
                href="/contact"
                className="inline-flex items-center gap-2 rounded-xl bg-gradient-to-r from-[#7C3AED] to-[#2563EB] px-6 py-3 text-sm font-semibold text-white shadow-md shadow-purple-200 transition-all hover:shadow-lg hover:shadow-purple-300 hover:scale-[1.02] active:scale-95"
              >
                <Zap size={15} />
                Get a Quote
              </Link>
            </div>

            {/* Trust micro-copy */}
            <p className="animate-fade-in delay-400 mt-5 flex items-center gap-1.5 text-xs text-gray-400 dark:text-gray-500">
              <CheckCircle2 size={13} className="text-green-500" />
              No commitment required &nbsp;·&nbsp;
              <CheckCircle2 size={13} className="text-green-500" />
              Response within 24 hours
            </p>

            {/* ── Stats bar ── */}
            <div className="animate-fade-in-up delay-500 mt-10 grid grid-cols-3 gap-0 divide-x divide-gray-200 dark:divide-gray-700 rounded-2xl border border-gray-100 dark:border-gray-700 bg-gray-50/80 dark:bg-gray-800/80 px-2 py-4 w-full max-w-md shadow-sm">
              {STATS.map(({ icon: Icon, value, label }) => (
                <div
                  key={label}
                  className="flex flex-col items-center gap-1 px-3 text-center"
                >
                  <Icon size={16} className="text-[#7C3AED] mb-0.5" />
                  <AnimatedCounter
                    value={value}
                    className="text-lg font-bold text-gray-900 dark:text-white leading-none"
                  />
                  <span className="text-[11px] text-gray-500 dark:text-gray-400 leading-snug">
                    {label}
                  </span>
                </div>
              ))}
            </div>
          </div>

          {/* ══ RIGHT — Animated network background ═══════════════ */}
          <div className="animate-fade-in-right delay-200 hidden lg:block">
            <div className="w-full h-[520px]">
              <NetworkBackground interactiveLetters />
            </div>
          </div>
          {/* ══ END RIGHT ══ */}

        </div>
      </div>
    </section>
  );
}
