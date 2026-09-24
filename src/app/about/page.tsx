import Link from "next/link";
import {
  Zap, Heart, Shield, MessageCircle, BookOpen, Users,
  ArrowRight, Sparkles, CheckCircle2, Github, Linkedin, Phone,
} from "lucide-react";
import Reveal from "@/components/motion/Reveal";
import AnimatedCounter from "@/components/motion/AnimatedCounter";
import PageHero from "@/components/PageHero";

// ── Core values ───────────────────────────────────────────────
const VALUES = [
  {
    icon: Zap,
    title: "No Limits Thinking",
    description:
      "If you can dream it, we can build it. We never say no to a challenge — we find a way.",
    iconColor: "#7C3AED",
    iconBg: "#EDE9FE",
  },
  {
    icon: Heart,
    title: "Client First, Always",
    description:
      "Your success is our success. Every decision we make is filtered through one question: is this best for the client?",
    iconColor: "#EC4899",
    iconBg: "#FCE7F3",
  },
  {
    icon: Shield,
    title: "Quality Over Speed",
    description:
      "We don't ship broken code. Every project goes through rigorous testing, review, and polish before delivery.",
    iconColor: "#2563EB",
    iconBg: "#DBEAFE",
  },
  {
    icon: MessageCircle,
    title: "Honest Communication",
    description:
      "No jargon, no hiding problems. We keep clients in the loop at every stage with clear, honest updates.",
    iconColor: "#059669",
    iconBg: "#D1FAE5",
  },
  {
    icon: BookOpen,
    title: "Continuous Learning",
    description:
      "Technology evolves fast. We stay ahead by constantly learning, experimenting, and upskilling as a team.",
    iconColor: "#D97706",
    iconBg: "#FEF3C7",
  },
  {
    icon: Users,
    title: "Long-term Partnership",
    description:
      "We don't just deliver and disappear. We build lasting relationships and support clients long after launch.",
    iconColor: "#7C3AED",
    iconBg: "#EDE9FE",
  },
] as const;

// ── Timeline milestones ───────────────────────────────────────
const TIMELINE = [
  {
    year: "2023",
    title: "Codand Founded",
    description:
      "Two co-founders united by one vision — build anything clients need, with no compromise on quality. Codand was born.",
  },
  {
    year: "2023",
    title: "First Project Delivered",
    description:
      "Delivered our first production application — Logistar, a full-scale logistics and warehouse management platform built for real-world scale.",
  },
  {
    year: "2023",
    title: "Enterprise Breakthrough",
    description:
      "Landed our first enterprise client — built PetroDesk, a multi-module data portal for India's largest oil & gas company.",
  },
  {
    year: "2024",
    title: "AI/ML Expansion",
    description:
      "Expanded into artificial intelligence — built Querivo, an autonomous AI calling system with real-time conversation capture and admin monitoring.",
  },
  {
    year: "2024",
    title: "Sector Diversification",
    description:
      "Entered new sectors with Omnidesk — a unified enterprise portal built for a large multi-department organisation covering payroll, operations, and more.",
  },
  {
    year: "2024",
    title: "Growing Strong",
    description:
      "9+ projects delivered, 5+ enterprise clients, and a hard-earned reputation for building whatever our clients imagine.",
  },
  {
    year: "2025",
    title: "Platform Scaling",
    description:
      "Scaled multiple client platforms to handle enterprise-level traffic. Launched Siftly — an AI-powered document intelligence platform — and significantly expanded our cloud and DevOps capabilities.",
  },
  {
    year: "2026",
    title: "A Trusted Name",
    description:
      "Now in our third year, Codand is a recognized name in full-stack and AI development. We continue to take on the industry's most challenging builds with the same no-limits spirit we started with.",
  },
] as const;

// ── Team ──────────────────────────────────────────────────────
const TEAM = [
  {
    name: "Anubhav Agarwal",
    initials: "AA",
    gradientFrom: "#7C3AED",
    gradientTo: "#2563EB",
    bio: "Leads engineering and architecture at Codand, bringing deep full-stack expertise across modern web, cloud, and API platforms. Anubhav also drives project delivery, keeping every build on schedule without compromising quality.",
    tags: ["Full Stack", "Architecture", "React", "Node.js", "Project Management", "Delivery"],
  },
  {
    name: "Aman Gupta",
    initials: "AG",
    gradientFrom: "#4F46E5",
    gradientTo: "#7C3AED",
    bio: "Leads UI/UX design and frontend engineering, crafting interfaces that are as functional as they are beautiful. Aman also owns product strategy and client relationships, ensuring every project is scoped and delivered to exceed expectations.",
    tags: ["UI/UX Design", "Frontend", "Figma", "TypeScript", "Product Strategy", "Client Success"],
  },
] as const;

// ── Story stats ───────────────────────────────────────────────
const STORY_STATS = [
  { value: "9+",  label: "Projects Completed"  },
  { value: "5+",  label: "Enterprise Clients"  },
  { value: "3+",  label: "Years Experience"    },
  { value: "98%", label: "Client Satisfaction" },
  { value: "6",   label: "Services Offered"    },
  { value: "2",   label: "Co-founders"         },
] as const;

export default function AboutPage() {
  return (
    <>
      {/* ── Header bar ───────────────────────────────────────── */}
      <PageHero
        title="About Us"
        subtitle="The team behind the code — passionate builders, problem solvers, and digital creators"
        rightSlot={
          <Link
            href="/contact"
            className="flex-shrink-0 inline-flex items-center gap-2 rounded-xl bg-gradient-to-r from-[#7C3AED] to-[#2563EB] px-5 py-2.5 text-sm font-semibold text-white shadow-md shadow-purple-200 transition-all hover:shadow-lg hover:shadow-purple-300 hover:scale-[1.02] active:scale-95"
          >
            <Zap size={14} />
            Contact Us
          </Link>
        }
      />

      <div className="relative min-h-screen overflow-hidden bg-white dark:bg-gray-950 transition-colors duration-300">
      {/* ── Decorative background blobs ── */}
      <div
        aria-hidden="true"
        className="pointer-events-none absolute -top-20 -left-24 w-[420px] h-[420px] rounded-full bg-[#7C3AED]/6 blur-3xl"
      />
      <div
        aria-hidden="true"
        className="pointer-events-none absolute top-[80%] -right-24 w-[400px] h-[400px] rounded-full bg-[#2563EB]/6 blur-3xl"
      />

      <div className="mx-auto max-w-6xl px-6 py-12 md:px-10">

        {/* ══════════════════════════════════════════════════════ */}
        {/* SECTION 1 — HERO STORY BLOCK                         */}
        {/* ══════════════════════════════════════════════════════ */}
        <div className="mb-24 grid grid-cols-1 items-start gap-12 lg:grid-cols-2 lg:gap-16">

          {/* Left — story copy */}
          <div className="animate-fade-in-up">
            <div className="mb-3 flex items-center gap-2">
              <Sparkles size={15} className="text-[#7C3AED]" />
              <span className="text-xs font-semibold uppercase tracking-widest text-[#7C3AED]">
                Our Story
              </span>
            </div>

            <h2 className="mb-6 text-3xl font-extrabold tracking-tight text-gray-900 dark:text-white sm:text-4xl">
              Building Digital Solutions{" "}
              <span className="bg-gradient-to-r from-[#7C3AED] to-[#2563EB] bg-clip-text text-transparent">
                Without Limits
              </span>
            </h2>

            <div className="space-y-4 text-[15px] leading-relaxed text-gray-500 dark:text-gray-400">
              <p>
                Founded in 2023, Codand was built on a simple but bold belief — that no client
                request should go unanswered. Web app, mobile platform, AI system, enterprise
                portal — whatever you need, we build it. No boundaries, no hand-waving, no
                &ldquo;that&rsquo;s not our area.&rdquo; Just solutions.
              </p>
              <p>
                Two co-founders came together with deeply complementary skills — one leading
                engineering, architecture, and delivery, and the other owning design, frontend
                craft, product strategy, and client success. Together, we cover every layer of a
                project from first wireframe to production deployment.
              </p>
              <p>
                Our approach is straightforward: put the client first, hold the line on quality,
                and do whatever it takes to deliver. We&rsquo;re not a faceless agency — we&rsquo;re
                builders who genuinely care about the work we put our name on.
              </p>
            </div>

            <div className="mt-8 flex flex-wrap gap-3">
              <Link
                href="/contact"
                className="inline-flex items-center gap-2 rounded-xl bg-gradient-to-r from-[#7C3AED] to-[#2563EB] px-6 py-3 text-sm font-semibold text-white shadow-md shadow-purple-200 transition-all hover:shadow-lg hover:scale-[1.02] active:scale-95"
              >
                <Zap size={14} />
                Start Your Project
              </Link>
              <Link
                href="/portfolio"
                className="inline-flex items-center gap-2 rounded-xl border-2 border-[#7C3AED] px-6 py-3 text-sm font-semibold text-[#7C3AED] transition-all hover:bg-[#7C3AED] hover:text-white active:scale-95"
              >
                Our Work
                <ArrowRight size={14} />
              </Link>
            </div>
          </div>

          {/* Right — stats grid */}
          <div className="animate-fade-in-right delay-200 grid grid-cols-2 gap-4 sm:grid-cols-3 lg:grid-cols-2">
            {STORY_STATS.map(({ value, label }, i) => (
              <Reveal key={label} delay={i * 0.06}>
                <div className="flex flex-col items-center justify-center gap-1.5 rounded-2xl border border-gray-100 dark:border-gray-700 bg-gray-50 dark:bg-gray-800 px-4 py-7 text-center shadow-sm transition-all duration-300 hover:shadow-md hover:border-gray-200 dark:hover:border-gray-600">
                  <AnimatedCounter
                    value={value}
                    className="text-3xl font-extrabold tracking-tight bg-gradient-to-r from-[#7C3AED] to-[#2563EB] bg-clip-text text-transparent"
                  />
                  <span className="text-xs font-medium text-gray-500 dark:text-gray-400">{label}</span>
                </div>
              </Reveal>
            ))}
          </div>
        </div>

        {/* ══════════════════════════════════════════════════════ */}
        {/* SECTION 2 — CORE VALUES                              */}
        {/* ══════════════════════════════════════════════════════ */}
        <section className="mb-24">
          <div className="animate-fade-in-up mb-10 text-center">
            <div className="mb-3 flex items-center justify-center gap-2">
              <Sparkles size={15} className="text-[#7C3AED]" />
              <span className="text-xs font-semibold uppercase tracking-widest text-[#7C3AED]">
                What drives us
              </span>
            </div>
            <h2 className="text-3xl font-extrabold tracking-tight text-gray-900 dark:text-white sm:text-4xl">
              Our Core Values
            </h2>
            <p className="mx-auto mt-3 max-w-xl text-base text-gray-500 dark:text-gray-400">
              Principles we live by on every single project
            </p>
          </div>

          <div className="grid grid-cols-1 gap-5 sm:grid-cols-2 lg:grid-cols-3">
            {VALUES.map(({ icon: Icon, title, description, iconColor, iconBg }, i) => (
              <Reveal key={title} delay={(i % 3) * 0.08}>
                <div className="flex flex-col rounded-2xl border border-gray-100 dark:border-gray-700 bg-white dark:bg-gray-800 p-6 shadow-sm transition-all duration-300 hover:shadow-xl hover:-translate-y-1.5 hover:border-gray-200 dark:hover:border-gray-600">
                  <div
                    className="mb-4 flex h-11 w-11 flex-shrink-0 items-center justify-center rounded-xl"
                    style={{ backgroundColor: iconBg }}
                  >
                    <Icon size={20} style={{ color: iconColor }} />
                  </div>
                  <h3 className="mb-2 text-[15px] font-bold text-gray-900 dark:text-white">{title}</h3>
                  <p className="text-[13px] leading-relaxed text-gray-500 dark:text-gray-400">{description}</p>
                </div>
              </Reveal>
            ))}
          </div>
        </section>

        {/* ══════════════════════════════════════════════════════ */}
        {/* SECTION 3 — TIMELINE                                  */}
        {/* ══════════════════════════════════════════════════════ */}
        <section className="mb-24">
          <div className="animate-fade-in-up mb-12 text-center">
            <div className="mb-3 flex items-center justify-center gap-2">
              <Sparkles size={15} className="text-[#7C3AED]" />
              <span className="text-xs font-semibold uppercase tracking-widest text-[#7C3AED]">
                Since 2023
              </span>
            </div>
            <h2 className="text-3xl font-extrabold tracking-tight text-gray-900 dark:text-white sm:text-4xl">
              Our Journey
            </h2>
            <p className="mx-auto mt-3 max-w-xl text-base text-gray-500 dark:text-gray-400">
              From a bold idea to a trusted development partner
            </p>
          </div>

          {/* ── Desktop alternating timeline ── */}
          <div className="relative hidden md:block">
            {/* Vertical center spine */}
            <div className="absolute left-1/2 top-0 h-full w-px -translate-x-px bg-gray-100 dark:bg-gray-700" />

            <div className="space-y-10">
              {TIMELINE.map((item, i) => {
                const isLeft = i % 2 === 0;
                const isCurrent = i === TIMELINE.length - 1;
                return (
                  <div key={item.title} className="relative grid grid-cols-2">
                    {/* Center dot */}
                    <div className="absolute left-1/2 top-1/2 z-10 -translate-x-1/2 -translate-y-1/2">
                      <div className="flex h-5 w-5 items-center justify-center rounded-full border-2 border-[#7C3AED] bg-white dark:bg-gray-950 shadow-sm">
                        <div className="h-2 w-2 rounded-full bg-[#7C3AED]" />
                      </div>
                    </div>

                    {/* Left column */}
                    <div className={`pr-12 ${isLeft ? "" : "pointer-events-none"}`}>
                      {isLeft && (
                        <Reveal>
                          <div className="ml-auto max-w-sm rounded-2xl border border-gray-100 dark:border-gray-700 bg-white dark:bg-gray-800 p-5 shadow-sm text-right">
                            <span className="mb-2 inline-flex items-center gap-1.5 rounded-full bg-gradient-to-r from-[#7C3AED] to-[#2563EB] px-3 py-1 text-[11px] font-bold text-white">
                              {item.year}
                              {isCurrent && <span className="rounded-full bg-white/20 px-1.5 py-0.5 text-[9px]">NOW</span>}
                            </span>
                            <h3 className="text-[15px] font-bold text-gray-900 dark:text-white mb-1.5">{item.title}</h3>
                            <p className="text-[13px] leading-relaxed text-gray-500 dark:text-gray-400">{item.description}</p>
                          </div>
                        </Reveal>
                      )}
                    </div>

                    {/* Right column */}
                    <div className={`pl-12 ${!isLeft ? "" : "pointer-events-none"}`}>
                      {!isLeft && (
                        <Reveal>
                          <div className="max-w-sm rounded-2xl border border-gray-100 dark:border-gray-700 bg-white dark:bg-gray-800 p-5 shadow-sm">
                            <span className="mb-2 inline-flex items-center gap-1.5 rounded-full bg-gradient-to-r from-[#7C3AED] to-[#2563EB] px-3 py-1 text-[11px] font-bold text-white">
                              {item.year}
                              {isCurrent && <span className="rounded-full bg-white/20 px-1.5 py-0.5 text-[9px]">NOW</span>}
                            </span>
                            <h3 className="text-[15px] font-bold text-gray-900 dark:text-white mb-1.5">{item.title}</h3>
                            <p className="text-[13px] leading-relaxed text-gray-500 dark:text-gray-400">{item.description}</p>
                          </div>
                        </Reveal>
                      )}
                    </div>
                  </div>
                );
              })}
            </div>
          </div>

          {/* ── Mobile single-column timeline ── */}
          <div className="relative md:hidden">
            {/* Left spine */}
            <div className="absolute left-4 top-0 h-full w-px bg-gray-100 dark:bg-gray-700" />

            <div className="space-y-6">
              {TIMELINE.map((item, i) => (
                <div key={item.title} className="relative flex gap-6">
                  {/* Dot */}
                  <div className="relative z-10 mt-5 flex-shrink-0">
                    <div className="flex h-8 w-8 items-center justify-center rounded-full border-2 border-[#7C3AED] bg-white dark:bg-gray-950 shadow-sm">
                      <div className="h-2.5 w-2.5 rounded-full bg-[#7C3AED]" />
                    </div>
                  </div>
                  {/* Card */}
                  <Reveal className="flex-1">
                    <div className="rounded-2xl border border-gray-100 dark:border-gray-700 bg-white dark:bg-gray-800 p-5 shadow-sm">
                      <span className="mb-2 inline-flex items-center gap-1.5 rounded-full bg-gradient-to-r from-[#7C3AED] to-[#2563EB] px-3 py-1 text-[11px] font-bold text-white">
                        {item.year}
                        {i === TIMELINE.length - 1 && (
                          <span className="rounded-full bg-white/20 px-1.5 py-0.5 text-[9px]">NOW</span>
                        )}
                      </span>
                      <h3 className="text-[15px] font-bold text-gray-900 dark:text-white mb-1.5">{item.title}</h3>
                      <p className="text-[13px] leading-relaxed text-gray-500 dark:text-gray-400">{item.description}</p>
                    </div>
                  </Reveal>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* ══════════════════════════════════════════════════════ */}
        {/* SECTION 4 — TEAM                                      */}
        {/* ══════════════════════════════════════════════════════ */}
        <section className="mb-24">
          <div className="animate-fade-in-up mb-10 text-center">
            <div className="mb-3 flex items-center justify-center gap-2">
              <Sparkles size={15} className="text-[#7C3AED]" />
              <span className="text-xs font-semibold uppercase tracking-widest text-[#7C3AED]">
                The founders
              </span>
            </div>
            <h2 className="text-3xl font-extrabold tracking-tight text-gray-900 dark:text-white sm:text-4xl">
              Meet the Co-Founders
            </h2>
            <p className="mx-auto mt-3 max-w-xl text-base text-gray-500 dark:text-gray-400">
              Two builders who started it all
            </p>
          </div>

          <div className="mx-auto grid max-w-2xl grid-cols-1 gap-6 sm:grid-cols-2">
            {TEAM.map(({ name, initials, gradientFrom, gradientTo, bio, tags }, i) => (
              <Reveal key={name} delay={i * 0.1}>
              <div
                className="flex flex-col items-center rounded-2xl border border-gray-100 dark:border-gray-700 bg-white dark:bg-gray-800 p-7 shadow-sm text-center transition-all duration-300 hover:shadow-xl hover:-translate-y-1.5"
              >
                {/* Avatar */}
                <div
                  className="mb-5 flex h-20 w-20 items-center justify-center rounded-full text-2xl font-extrabold text-white shadow-md"
                  style={{
                    background: `linear-gradient(135deg, ${gradientFrom}, ${gradientTo})`,
                  }}
                >
                  {initials}
                </div>

                {/* Name */}
                <h3 className="mb-2 text-[16px] font-extrabold text-gray-900 dark:text-white">{name}</h3>

                {/* Role badge */}
                <span className="mb-4 inline-flex items-center rounded-full bg-[#EDE9FE] dark:bg-[#7C3AED]/20 px-3 py-1 text-[11px] font-semibold text-[#7C3AED] dark:text-[#A78BFA]">
                  Co-Founder
                </span>

                {/* Bio */}
                <p className="mb-5 text-[13px] leading-relaxed text-gray-500 dark:text-gray-400">{bio}</p>

                {/* Expertise tags */}
                <div className="mb-5 flex flex-wrap justify-center gap-1.5">
                  {tags.map((tag) => (
                    <span
                      key={tag}
                      className="rounded-full bg-gray-100 dark:bg-gray-700 px-2.5 py-1 text-[11px] font-medium text-gray-600 dark:text-gray-300"
                    >
                      {tag}
                    </span>
                  ))}
                </div>

                {/* Social links */}
                <div className="mt-auto flex items-center gap-3">
                  <a
                    href="#"
                    aria-label={`${name} GitHub`}
                    className="flex h-8 w-8 items-center justify-center rounded-lg border border-gray-200 dark:border-gray-600 text-gray-400 dark:text-gray-500 transition-all hover:border-gray-900 dark:hover:border-gray-300 hover:text-gray-900 dark:hover:text-gray-200"
                  >
                    <Github size={15} />
                  </a>
                  <a
                    href="#"
                    aria-label={`${name} LinkedIn`}
                    className="flex h-8 w-8 items-center justify-center rounded-lg border border-gray-200 dark:border-gray-600 text-gray-400 dark:text-gray-500 transition-all hover:border-[#0A66C2] hover:text-[#0A66C2]"
                  >
                    <Linkedin size={15} />
                  </a>
                </div>
              </div>
              </Reveal>
            ))}
          </div>
        </section>

        {/* ══════════════════════════════════════════════════════ */}
        {/* SECTION 5 — BOTTOM CTA BANNER                        */}
        {/* ══════════════════════════════════════════════════════ */}
        <section className="animate-fade-in-up overflow-hidden rounded-3xl bg-gradient-to-r from-[#7C3AED] to-[#2563EB] px-8 py-14 text-center shadow-lg">
          <div className="mb-3 flex items-center justify-center gap-2">
            <Sparkles size={15} className="text-purple-200" />
            <span className="text-xs font-semibold uppercase tracking-widest text-purple-200">
              Let&apos;s build together
            </span>
          </div>
          <h2 className="text-3xl font-extrabold tracking-tight text-white sm:text-4xl">
            Ready to Build Something Amazing?
          </h2>
          <p className="mx-auto mt-4 max-w-xl text-base leading-relaxed text-purple-100">
            Let&apos;s turn your ideas into reality. Whatever you need built — we&apos;re the team for it.
          </p>

          <div className="mt-8 flex flex-wrap items-center justify-center gap-3">
            <Link
              href="/contact"
              className="inline-flex items-center gap-2 rounded-xl bg-white px-7 py-3 text-sm font-semibold text-[#7C3AED] shadow-md transition-all hover:shadow-lg hover:scale-[1.02] active:scale-95"
            >
              Start Your Project
              <ArrowRight size={15} />
            </Link>
            <a
              href="tel:+91XXXXXXXXXX"
              className="inline-flex items-center gap-2 rounded-xl border-2 border-white/40 px-7 py-3 text-sm font-semibold text-white transition-all hover:border-white hover:bg-white/10 active:scale-95"
            >
              <Phone size={14} />
              Call Now (+91 XXXXXXXXXX)
            </a>
          </div>

          <div className="mt-6 flex flex-wrap items-center justify-center gap-4 text-xs text-purple-200">
            {["Free initial consultation", "Response within 24 hours", "No lock-in contracts"].map(
              (item) => (
                <span key={item} className="flex items-center gap-1.5">
                  <CheckCircle2 size={12} className="text-purple-300" />
                  {item}
                </span>
              ),
            )}
          </div>
        </section>

      </div>
    </div>
    </>
  );
}
