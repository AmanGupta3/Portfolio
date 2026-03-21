import Link from "next/link";
import {
  ArrowRight,
  CheckCircle2,
  Star,
  Users,
  Briefcase,
  Globe,
  TrendingUp,
  Layers,
  Zap,
  Circle,
} from "lucide-react";

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

// ── Tech stack badges shown in the mock card ─────────────────
const TECH_BADGES = ["React", "Node.js", "PostgreSQL", "AWS"] as const;

// ── Mock chart bar heights (decorative) ─────────────────────
const CHART_BARS = [40, 65, 50, 80, 60, 90, 70] as const;

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
                  <span className="text-lg font-bold text-gray-900 dark:text-white leading-none">
                    {value}
                  </span>
                  <span className="text-[11px] text-gray-500 dark:text-gray-400 leading-snug">
                    {label}
                  </span>
                </div>
              ))}
            </div>
          </div>

          {/* ══ RIGHT — Featured project card ════════════════════ */}
          <div className="animate-fade-in-right delay-200 flex justify-center lg:justify-end">
            <div className="relative w-full max-w-[420px]">

              {/* Floating badge — top left */}
              <div className="absolute -top-4 -left-4 z-10 flex items-center gap-2 rounded-xl bg-white dark:bg-gray-800 px-3 py-2 shadow-lg border border-gray-100 dark:border-gray-700">
                <div className="flex h-7 w-7 items-center justify-center rounded-lg bg-gradient-to-br from-[#7C3AED] to-[#2563EB]">
                  <Globe size={13} className="text-white" />
                </div>
                <div>
                  <p className="text-[11px] font-semibold text-gray-800 dark:text-gray-100 leading-none">SaaS Platform</p>
                  <p className="text-[10px] text-gray-400 dark:text-gray-500 mt-0.5">Featured Project</p>
                </div>
              </div>

              {/* Floating badge — bottom right */}
              <div className="absolute -bottom-4 -right-4 z-10 flex items-center gap-2 rounded-xl bg-white dark:bg-gray-800 px-3 py-2 shadow-lg border border-gray-100 dark:border-gray-700">
                <div className="flex h-7 w-7 items-center justify-center rounded-full bg-green-100 dark:bg-green-900/30">
                  <TrendingUp size={13} className="text-green-600 dark:text-green-400" />
                </div>
                <div>
                  <p className="text-[11px] font-semibold text-gray-800 dark:text-gray-100 leading-none">+340% Growth</p>
                  <p className="text-[10px] text-gray-400 dark:text-gray-500 mt-0.5">Post-launch metric</p>
                </div>
              </div>

              {/* ── Main mock browser card ── */}
              <div className="overflow-hidden rounded-2xl border border-gray-200 dark:border-gray-700 bg-white dark:bg-gray-800 shadow-xl shadow-gray-200/70 dark:shadow-gray-900/70">

                {/* Browser chrome bar */}
                <div className="flex items-center gap-2 border-b border-gray-100 dark:border-gray-700 bg-gray-50 dark:bg-gray-900 px-4 py-3">
                  <Circle size={9} className="fill-red-400 text-red-400" />
                  <Circle size={9} className="fill-yellow-400 text-yellow-400" />
                  <Circle size={9} className="fill-green-400 text-green-400" />
                  <div className="ml-3 flex-1 rounded-md bg-gray-200 dark:bg-gray-700 px-3 py-1">
                    <span className="text-[10px] text-gray-400 dark:text-gray-400">app.codand.io/dashboard</span>
                  </div>
                </div>

                {/* Mock dashboard content */}
                <div className="p-5">

                  {/* Top nav row */}
                  <div className="mb-4 flex items-center justify-between">
                    <div className="flex items-center gap-2">
                      <div className="h-6 w-6 rounded-md bg-gradient-to-br from-[#7C3AED] to-[#2563EB]" />
                      <div className="h-2.5 w-20 rounded-full bg-gray-200 dark:bg-gray-700" />
                    </div>
                    <div className="flex items-center gap-2">
                      <div className="h-6 w-6 rounded-full bg-gray-200 dark:bg-gray-700" />
                      <div className="h-6 w-6 rounded-full bg-[#7C3AED]/20" />
                    </div>
                  </div>

                  {/* Stat widgets */}
                  <div className="mb-4 grid grid-cols-3 gap-2.5">
                    {[
                      { label: "Revenue", val: "$84k", color: "from-[#7C3AED] to-[#2563EB]" },
                      { label: "Users", val: "12.4k", color: "from-[#2563EB] to-cyan-500" },
                      { label: "Orders", val: "3,291", color: "from-emerald-500 to-teal-400" },
                    ].map(({ label, val, color }) => (
                      <div key={label} className="rounded-xl border border-gray-100 dark:border-gray-600 bg-gray-50 dark:bg-gray-700 p-2.5">
                        <div className={`mb-1.5 h-1.5 w-8 rounded-full bg-gradient-to-r ${color}`} />
                        <p className="text-xs font-bold text-gray-800 dark:text-gray-100">{val}</p>
                        <p className="text-[10px] text-gray-400 dark:text-gray-500">{label}</p>
                      </div>
                    ))}
                  </div>

                  {/* Bar chart */}
                  <div className="mb-4 rounded-xl border border-gray-100 dark:border-gray-600 bg-gray-50 dark:bg-gray-700 px-4 py-3">
                    <div className="mb-2 flex items-center justify-between">
                      <div className="flex items-center gap-1.5">
                        <Layers size={11} className="text-[#7C3AED]" />
                        <span className="text-[10px] font-semibold text-gray-600 dark:text-gray-300">Monthly Revenue</span>
                      </div>
                      <span className="text-[10px] text-[#7C3AED] dark:text-[#A78BFA] font-semibold">+24%</span>
                    </div>
                    <div className="flex items-end gap-1.5 h-14">
                      {CHART_BARS.map((h, i) => (
                        <div
                          key={i}
                          className="flex-1 rounded-t-sm bg-gradient-to-t from-[#7C3AED] to-[#2563EB] opacity-80"
                          style={{ height: `${h}%` }}
                        />
                      ))}
                    </div>
                  </div>

                  {/* User avatars + activity row */}
                  <div className="flex items-center justify-between">
                    <div className="flex items-center gap-1.5">
                      <Users size={11} className="text-gray-400" />
                      <span className="text-[10px] text-gray-400 dark:text-gray-500">Active users</span>
                    </div>
                    <div className="flex -space-x-2">
                      {["bg-violet-400", "bg-blue-400", "bg-pink-400", "bg-emerald-400"].map(
                        (c, i) => (
                          <div
                            key={i}
                            className={`h-5 w-5 rounded-full border-2 border-white dark:border-gray-800 ${c}`}
                          />
                        )
                      )}
                      <div className="flex h-5 w-5 items-center justify-center rounded-full border-2 border-white dark:border-gray-800 bg-gray-200 dark:bg-gray-600">
                        <span className="text-[8px] font-semibold text-gray-500 dark:text-gray-300">+9</span>
                      </div>
                    </div>
                  </div>
                </div>

                {/* Bottom tech stack strip */}
                <div className="flex items-center gap-2 border-t border-gray-100 dark:border-gray-700 bg-gray-50 dark:bg-gray-900 px-5 py-2.5">
                  <span className="text-[10px] font-medium text-gray-400 dark:text-gray-500 mr-1">Built with</span>
                  {TECH_BADGES.map((tech) => (
                    <span
                      key={tech}
                      className="rounded-md bg-white dark:bg-gray-700 border border-gray-200 dark:border-gray-600 px-2 py-0.5 text-[10px] font-semibold text-gray-600 dark:text-gray-300 shadow-sm"
                    >
                      {tech}
                    </span>
                  ))}
                </div>
              </div>
            </div>
          </div>
          {/* ══ END RIGHT ══ */}

        </div>
      </div>
    </section>
  );
}
