"use client";

import { useState, useMemo } from "react";
import Link from "next/link";
import {
  Globe,
  Smartphone,
  Monitor,
  Palette,
  Cloud,
  Brain,
  Search,
  Zap,
  CheckCircle2,
  ArrowRight,
  Sparkles,
} from "lucide-react";
import ServiceCard from "@/components/ServiceCard";

// ── Service definitions ──────────────────────────────────────
const SERVICES = [
  {
    title: "Web Applications",
    description:
      "From sleek marketing sites to complex enterprise portals, we architect web experiences that scale effortlessly. Every layer of the stack is engineered for speed, accessibility, and long-term maintainability.",
    icon: Globe,
    iconBg: "bg-blue-100",
    iconColor: "text-blue-600",
    tags: ["React", "Next.js", "Node.js", "TypeScript", "MongoDB", "PostgreSQL"],
    guideLink: "/services/web-applications",
  },
  {
    title: "Android Development",
    description:
      "Reach billions of Android users with native-quality apps that feel right on any device. We build performant, polished experiences — from first wireframe to Play Store launch and beyond.",
    icon: Smartphone,
    iconBg: "bg-green-100",
    iconColor: "text-green-600",
    tags: ["Kotlin", "Java", "React Native", "Flutter", "Firebase", "SQLite"],
    guideLink: "/services/android",
  },
  {
    title: "iOS Development",
    description:
      "Craft premium iPhone and iPad experiences that meet Apple's exacting standards. Our engineers blend SwiftUI elegance with robust architecture to deliver apps users genuinely love opening.",
    icon: Smartphone,
    iconBg: "bg-purple-100",
    iconColor: "text-purple-600",
    tags: ["Swift", "SwiftUI", "Objective-C", "Core Data", "CloudKit", "Xcode"],
    guideLink: "/services/ios",
  },
  {
    title: "Desktop Applications",
    description:
      "Power users deserve powerful tools. We build cross-platform desktop software that runs natively on Windows, macOS, and Linux — delivering the performance and depth a browser simply can't match.",
    icon: Monitor,
    iconBg: "bg-orange-100",
    iconColor: "text-orange-600",
    tags: ["Electron", "Tauri", "Qt", "C++", "Python", "Rust"],
    guideLink: "/services/desktop",
  },
  {
    title: "UI/UX Design",
    description:
      "Great software starts with great design. We translate your vision into intuitive interfaces backed by research, prototyping, and real user testing — before a single line of production code is written.",
    icon: Palette,
    iconBg: "bg-pink-100",
    iconColor: "text-pink-600",
    tags: ["Figma", "Adobe XD", "Sketch", "Tailwind CSS", "Material Design", "Human Interface"],
    guideLink: "/services/design",
  },
  {
    title: "DevOps & Deployment",
    description:
      "Shipping fast without breaking things is an art form. We set up bulletproof CI/CD pipelines, container orchestration, and cloud infrastructure so your team deploys with confidence every single time.",
    icon: Cloud,
    iconBg: "bg-indigo-100",
    iconColor: "text-indigo-600",
    tags: ["Docker", "AWS", "Vercel", "GitHub Actions", "Kubernetes", "Nginx"],
    guideLink: "/services/devops",
  },
  {
    title: "AI / ML Solutions",
    description:
      "Unlock the full potential of your data with custom machine learning models and AI-powered features. From intelligent automation to predictive analytics, we build systems that grow smarter over time.",
    icon: Brain,
    iconBg: "bg-yellow-100",
    iconColor: "text-yellow-600",
    tags: ["Python", "TensorFlow", "PyTorch", "OpenAI", "LangChain", "Hugging Face"],
    guideLink: "/services/ai-ml",
  },
] as const;

// ── Pricing plans ────────────────────────────────────────────
const PLANS = [
  {
    name: "Starter",
    price: "$5,000",
    duration: "2 – 4 weeks",
    tagline: "Small projects & MVPs",
    popular: false,
    features: [
      "Responsive web application",
      "Core functionality build-out",
      "Mobile-friendly design",
      "Basic SEO optimisation",
      "1 month post-launch support",
    ],
    cta: "Get Started",
    ctaStyle: "outlined" as const,
  },
  {
    name: "Professional",
    price: "$15,000",
    duration: "6 – 8 weeks",
    tagline: "Growing businesses",
    popular: true,
    features: [
      "Full-stack web application",
      "Advanced functionality",
      "Custom UI/UX design",
      "Third-party API integration",
      "Database architecture & optimisation",
      "3 months post-launch support",
    ],
    cta: "Get Started",
    ctaStyle: "solid" as const,
  },
  {
    name: "Enterprise",
    price: "$35,000+",
    duration: "10 – 16 weeks",
    tagline: "Large organisations",
    popular: false,
    features: [
      "Multi-platform application",
      "Advanced third-party integrations",
      "Custom architecture design",
      "Performance & load optimisation",
      "Security audit & implementation",
      "6 months post-launch support",
      "Team training & onboarding",
    ],
    cta: "Contact Us",
    ctaStyle: "dark" as const,
  },
] as const;

export default function ServicesPage() {
  const [query, setQuery] = useState("");

  const filtered = useMemo(() => {
    const q = query.toLowerCase().trim();
    if (!q) return SERVICES;
    return SERVICES.filter(
      (s) =>
        s.title.toLowerCase().includes(q) ||
        s.description.toLowerCase().includes(q) ||
        s.tags.some((t) => t.toLowerCase().includes(q))
    );
  }, [query]);

  return (
    <div className="min-h-screen bg-white dark:bg-gray-950 transition-colors duration-300">

      {/* ── Top header bar ───────────────────────────────────── */}
      <div className="border-b border-gray-100 dark:border-gray-800 bg-white dark:bg-gray-900 px-6 py-5 md:px-10">
        <div className="mx-auto flex max-w-6xl items-start justify-between gap-4">
          <div>
            <h1 className="text-2xl font-extrabold tracking-tight text-gray-900 dark:text-white">
              Our Services
            </h1>
            <p className="mt-0.5 text-sm text-gray-500 dark:text-gray-400">
              Professional application development services tailored to your needs
            </p>
          </div>
          <Link
            href="/contact"
            className="flex-shrink-0 inline-flex items-center gap-2 rounded-xl bg-gradient-to-r from-[#7C3AED] to-[#2563EB] px-5 py-2.5 text-sm font-semibold text-white shadow-md shadow-purple-200 transition-all hover:shadow-lg hover:shadow-purple-300 hover:scale-[1.02] active:scale-95"
          >
            <Zap size={14} />
            Contact Us
          </Link>
        </div>
      </div>

      <div className="mx-auto max-w-6xl px-6 py-10 md:px-10">

        {/* ── Search bar ───────────────────────────────────────── */}
        <div className="animate-fade-in relative mb-10 max-w-xl">
          <Search
            size={16}
            className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400 pointer-events-none"
          />
          <input
            type="text"
            placeholder="Search services..."
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            className="w-full rounded-xl border border-gray-200 dark:border-gray-700 bg-gray-50 dark:bg-gray-800 py-3 pl-10 pr-4 text-sm text-gray-800 dark:text-gray-100 placeholder-gray-400 dark:placeholder-gray-600 outline-none transition-all focus:border-[#7C3AED] focus:bg-white dark:focus:bg-gray-700 focus:ring-2 focus:ring-[#7C3AED]/15"
          />
        </div>

        {/* ── Hero text ─────────────────────────────────────────── */}
        {!query && (
          <div className="animate-fade-in-up mb-10">
            <div className="mb-2 flex items-center gap-2">
              <Sparkles size={16} className="text-[#7C3AED]" />
              <span className="text-xs font-semibold uppercase tracking-widest text-[#7C3AED]">
                What we build
              </span>
            </div>
            <h2 className="text-3xl font-extrabold tracking-tight text-gray-900 dark:text-white sm:text-4xl">
              Complete Development Solutions
            </h2>
            <p className="mt-3 max-w-2xl text-base text-gray-500 dark:text-gray-400 leading-relaxed">
              End-to-end engineering across every platform and discipline.
              Whether you need a polished consumer app or a mission-critical
              backend system, our team delivers with precision and care.
            </p>
          </div>
        )}

        {/* ── Service cards grid ────────────────────────────────── */}
        {filtered.length > 0 ? (
          <div className="grid grid-cols-1 gap-5 sm:grid-cols-2 lg:grid-cols-3">
            {filtered.map((service, i) => (
              <div
                key={service.title}
                className="animate-fade-in-up"
                style={{ animationDelay: `${i * 60}ms` }}
              >
                <ServiceCard {...service} />
              </div>
            ))}
          </div>
        ) : (
          /* Empty state */
          <div className="flex flex-col items-center justify-center py-24 text-center">
            <div className="mb-4 flex h-14 w-14 items-center justify-center rounded-2xl bg-gray-100 dark:bg-gray-800">
              <Search size={22} className="text-gray-400" />
            </div>
            <h3 className="text-base font-semibold text-gray-700 dark:text-gray-300">
              No services found
            </h3>
            <p className="mt-1 text-sm text-gray-400 dark:text-gray-500">
              Try a different keyword — e.g. &quot;React&quot;, &quot;mobile&quot;, or
              &quot;cloud&quot;.
            </p>
            <button
              onClick={() => setQuery("")}
              className="mt-4 text-sm font-medium text-[#7C3AED] hover:underline"
            >
              Clear search
            </button>
          </div>
        )}

        {/* ── Pricing section ───────────────────────────────────── */}
        <section className="mt-24">
          {/* Heading */}
          <div className="mb-12 text-center">
            <div className="mb-3 flex items-center justify-center gap-2">
              <Sparkles size={15} className="text-[#7C3AED]" />
              <span className="text-xs font-semibold uppercase tracking-widest text-[#7C3AED]">
                Transparent pricing
              </span>
            </div>
            <h2 className="text-3xl font-extrabold tracking-tight text-gray-900 dark:text-white sm:text-4xl">
              Flexible Pricing Plans
            </h2>
            <p className="mx-auto mt-3 max-w-xl text-base text-gray-500 dark:text-gray-400">
              Every project is unique. These plans are starting points — we
              scope each engagement individually to match your goals and budget.
            </p>
          </div>

          {/* Plans grid */}
          <div className="grid grid-cols-1 gap-6 md:grid-cols-3">
            {PLANS.map((plan) => {
              const isPopular = plan.popular;
              return (
                <div
                  key={plan.name}
                  className={[
                    "relative flex flex-col rounded-2xl p-7 transition-all duration-300",
                    isPopular
                      ? "border-2 border-[#7C3AED] bg-white dark:bg-gray-800 shadow-xl shadow-purple-100 dark:shadow-purple-900/20 scale-[1.02]"
                      : "border border-gray-200 dark:border-gray-700 bg-white dark:bg-gray-800 shadow-sm hover:shadow-lg",
                  ].join(" ")}
                >
                  {/* Most Popular badge */}
                  {isPopular && (
                    <div className="absolute -top-3.5 left-1/2 -translate-x-1/2">
                      <span className="inline-flex items-center gap-1.5 rounded-full bg-gradient-to-r from-[#7C3AED] to-[#2563EB] px-4 py-1 text-xs font-bold text-white shadow-md">
                        <Sparkles size={11} />
                        Most Popular
                      </span>
                    </div>
                  )}

                  {/* Plan name + price */}
                  <div className="mb-5">
                    <h3
                      className={[
                        "text-xs font-bold uppercase tracking-widest mb-3",
                        isPopular ? "text-[#7C3AED]" : "text-gray-400 dark:text-gray-500",
                      ].join(" ")}
                    >
                      {plan.name}
                    </h3>
                    <div className="flex items-end gap-1">
                      <span className="text-4xl font-extrabold tracking-tight text-gray-900 dark:text-white">
                        {plan.price}
                      </span>
                    </div>
                    <p className="mt-1 text-sm text-gray-500 dark:text-gray-400">
                      {plan.duration} &nbsp;·&nbsp; {plan.tagline}
                    </p>
                  </div>

                  {/* Divider */}
                  <div
                    className={[
                      "mb-5 h-px w-full",
                      isPopular ? "bg-[#7C3AED]/15" : "bg-gray-100 dark:bg-gray-700",
                    ].join(" ")}
                  />

                  {/* Feature list */}
                  <ul className="flex-1 space-y-3 mb-7">
                    {plan.features.map((feat) => (
                      <li key={feat} className="flex items-start gap-2.5">
                        <CheckCircle2
                          size={15}
                          className={[
                            "mt-0.5 flex-shrink-0",
                            isPopular ? "text-[#7C3AED]" : "text-green-500",
                          ].join(" ")}
                        />
                        <span className="text-sm text-gray-600 dark:text-gray-300">{feat}</span>
                      </li>
                    ))}
                  </ul>

                  {/* CTA button */}
                  <Link
                    href="/contact"
                    className={[
                      "flex items-center justify-center gap-2 rounded-xl px-5 py-3 text-sm font-semibold transition-all duration-200 active:scale-95",
                      plan.ctaStyle === "solid"
                        ? "bg-gradient-to-r from-[#7C3AED] to-[#2563EB] text-white shadow-md shadow-purple-200 hover:shadow-lg hover:shadow-purple-300 hover:scale-[1.02]"
                        : plan.ctaStyle === "dark"
                        ? "bg-gray-900 dark:bg-gray-700 text-white hover:bg-gray-800 dark:hover:bg-gray-600"
                        : "border-2 border-gray-200 dark:border-gray-600 text-gray-700 dark:text-gray-300 hover:border-[#7C3AED] hover:text-[#7C3AED]",
                    ].join(" ")}
                  >
                    {plan.cta}
                    <ArrowRight size={14} />
                  </Link>
                </div>
              );
            })}
          </div>

          {/* Footnote */}
          <p className="mt-8 text-center text-xs text-gray-400 dark:text-gray-500">
            All prices are starting estimates. Final cost depends on project scope.&nbsp;
            <Link href="/contact" className="text-[#7C3AED] font-medium hover:underline">
              Let&apos;s talk about your project →
            </Link>
          </p>
        </section>
      </div>
    </div>
  );
}
