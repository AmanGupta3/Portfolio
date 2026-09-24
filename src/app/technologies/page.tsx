"use client";

import { useState, useMemo } from "react";
import Link from "next/link";
import {
  Search, Zap, Sparkles, ArrowRight, CheckCircle2,
  Code2, Trophy, Briefcase, Star,
} from "lucide-react";
import {
  SiReact, SiNextdotjs, SiVuedotjs, SiAngular, SiTailwindcss, SiTypescript,
  SiNodedotjs, SiPython, SiOpenjdk, SiDotnet, SiPhp, SiGo,
  SiFlutter, SiSwift, SiKotlin, SiIonic,
  SiMongodb, SiPostgresql, SiMysql, SiRedis, SiFirebase, SiSqlite,
  SiGooglecloud, SiVercel, SiNetlify, SiDigitalocean,
  SiDocker, SiKubernetes, SiGit, SiJenkins, SiGithubactions, SiTerraform,
} from "react-icons/si";
import { Cloud, Server } from "lucide-react";
import TechCard from "@/components/TechCard";
import Reveal from "@/components/motion/Reveal";
import AnimatedCounter from "@/components/motion/AnimatedCounter";
import PageHero from "@/components/PageHero";

// ── Category tabs ──────────────────────────────────────────────
const TABS = ["All", "Frontend", "Backend", "Mobile", "Database", "Cloud", "DevOps"] as const;
type Tab = (typeof TABS)[number];

// ── Technologies data ──────────────────────────────────────────
const TECHNOLOGIES = [
  // ── Frontend ──
  { name: "React",        description: "Modern UI library for building interactive web interfaces",       category: "Frontend", experience: "5+ years", projects: "150+", popularity: 95, logo: SiReact,            brandColor: "#61DAFB" },
  { name: "Next.js",      description: "Full-stack React framework for production applications",          category: "Frontend", experience: "4+ years", projects: "120+", popularity: 92, logo: SiNextdotjs,        brandColor: "#000000" },
  { name: "Vue.js",       description: "Progressive JavaScript framework for modern UIs",                category: "Frontend", experience: "3+ years", projects: "80+",  popularity: 85, logo: SiVuedotjs,         brandColor: "#4FC08D" },
  { name: "Angular",      description: "Enterprise-grade web application platform by Google",            category: "Frontend", experience: "4+ years", projects: "90+",  popularity: 80, logo: SiAngular,           brandColor: "#DD0031" },
  { name: "Tailwind CSS", description: "Utility-first CSS framework for rapid UI development",           category: "Frontend", experience: "3+ years", projects: "200+", popularity: 90, logo: SiTailwindcss,      brandColor: "#06B6D4" },
  { name: "TypeScript",   description: "Strongly typed JavaScript for scalable applications",            category: "Frontend", experience: "4+ years", projects: "160+", popularity: 88, logo: SiTypescript,       brandColor: "#3178C6" },
  // ── Backend ──
  { name: "Node.js",      description: "JavaScript runtime for fast server-side development",            category: "Backend",  experience: "5+ years", projects: "140+", popularity: 90, logo: SiNodedotjs,        brandColor: "#339933" },
  { name: "Python",       description: "Versatile language powering web, AI and data apps",              category: "Backend",  experience: "4+ years", projects: "100+", popularity: 85, logo: SiPython,           brandColor: "#3776AB" },
  { name: "Java",         description: "Reliable enterprise-grade application development",              category: "Backend",  experience: "5+ years", projects: "80+",  popularity: 82, logo: SiOpenjdk,          brandColor: "#ED8B00" },
  { name: "C#/.NET",      description: "Microsoft stack for robust cross-platform apps",                 category: "Backend",  experience: "3+ years", projects: "60+",  popularity: 78, logo: SiDotnet,           brandColor: "#512BD4" },
  { name: "PHP",          description: "Widely used server-side web development language",               category: "Backend",  experience: "4+ years", projects: "70+",  popularity: 75, logo: SiPhp,              brandColor: "#777BB4" },
  { name: "Go",           description: "Fast and lightweight language for backend services",             category: "Backend",  experience: "2+ years", projects: "40+",  popularity: 70, logo: SiGo,               brandColor: "#00ADD8" },
  // ── Mobile ──
  { name: "React Native", description: "Cross-platform mobile apps with React",                         category: "Mobile",   experience: "4+ years", projects: "85+",  popularity: 88, logo: SiReact,            brandColor: "#61DAFB" },
  { name: "Flutter",      description: "Google's UI toolkit for beautiful mobile apps",                 category: "Mobile",   experience: "3+ years", projects: "65+",  popularity: 85, logo: SiFlutter,          brandColor: "#02569B" },
  { name: "Swift",        description: "Apple's language for native iOS development",                   category: "Mobile",   experience: "4+ years", projects: "50+",  popularity: 80, logo: SiSwift,            brandColor: "#FA7343" },
  { name: "Kotlin",       description: "Modern language for native Android development",                category: "Mobile",   experience: "3+ years", projects: "45+",  popularity: 78, logo: SiKotlin,           brandColor: "#7F52FF" },
  { name: "Xamarin",      description: "Microsoft solution for cross-platform mobile apps",             category: "Mobile",   experience: "2+ years", projects: "30+",  popularity: 65, logo: SiDotnet,           brandColor: "#3498DB" },
  { name: "Ionic",        description: "Hybrid mobile app framework using web technologies",            category: "Mobile",   experience: "3+ years", projects: "40+",  popularity: 70, logo: SiIonic,            brandColor: "#3880FF" },
  // ── Database ──
  { name: "MongoDB",      description: "Flexible NoSQL document database for modern apps",              category: "Database", experience: "4+ years", projects: "110+", popularity: 88, logo: SiMongodb,          brandColor: "#47A248" },
  { name: "PostgreSQL",   description: "Advanced open-source relational database",                      category: "Database", experience: "5+ years", projects: "95+",  popularity: 85, logo: SiPostgresql,       brandColor: "#4169E1" },
  { name: "MySQL",        description: "World's most popular open-source relational database",          category: "Database", experience: "5+ years", projects: "120+", popularity: 82, logo: SiMysql,            brandColor: "#4479A1" },
  { name: "Redis",        description: "In-memory data store for caching and real-time apps",           category: "Database", experience: "3+ years", projects: "80+",  popularity: 80, logo: SiRedis,            brandColor: "#DC382D" },
  { name: "Firebase",     description: "Google's real-time app development platform",                   category: "Database", experience: "3+ years", projects: "70+",  popularity: 78, logo: SiFirebase,         brandColor: "#FFCA28" },
  { name: "SQLite",       description: "Lightweight embedded database for local storage",               category: "Database", experience: "4+ years", projects: "60+",  popularity: 75, logo: SiSqlite,           brandColor: "#003B57" },
  // ── Cloud ──
  { name: "AWS",              description: "Amazon's industry-leading cloud platform",                  category: "Cloud",    experience: "4+ years", projects: "90+",  popularity: 92, logo: Cloud,               brandColor: "#FF9900" },
  { name: "Google Cloud",     description: "Google's scalable cloud computing services",                category: "Cloud",    experience: "3+ years", projects: "65+",  popularity: 85, logo: SiGooglecloud,      brandColor: "#4285F4" },
  { name: "Microsoft Azure",  description: "Microsoft's enterprise cloud platform",                     category: "Cloud",    experience: "3+ years", projects: "55+",  popularity: 82, logo: Server,             brandColor: "#0089D6" },
  { name: "Vercel",           description: "Optimized frontend deployment and hosting platform",        category: "Cloud",    experience: "3+ years", projects: "100+", popularity: 88, logo: SiVercel,           brandColor: "#000000" },
  { name: "Netlify",          description: "Modern platform for web deployment and hosting",            category: "Cloud",    experience: "3+ years", projects: "85+",  popularity: 80, logo: SiNetlify,          brandColor: "#00C7B7" },
  { name: "DigitalOcean",     description: "Developer-friendly cloud infrastructure platform",          category: "Cloud",    experience: "4+ years", projects: "70+",  popularity: 75, logo: SiDigitalocean,     brandColor: "#0080FF" },
  // ── DevOps ──
  { name: "Docker",         description: "Industry-standard containerization platform",                 category: "DevOps",   experience: "3+ years", projects: "85+",  popularity: 90, logo: SiDocker,           brandColor: "#2496ED" },
  { name: "Kubernetes",     description: "Powerful container orchestration at scale",                   category: "DevOps",   experience: "2+ years", projects: "40+",  popularity: 85, logo: SiKubernetes,       brandColor: "#326CE5" },
  { name: "Git",            description: "Essential distributed version control system",                category: "DevOps",   experience: "5+ years", projects: "200+", popularity: 95, logo: SiGit,              brandColor: "#F05032" },
  { name: "Jenkins",        description: "Automation server for CI/CD pipelines",                      category: "DevOps",   experience: "3+ years", projects: "50+",  popularity: 80, logo: SiJenkins,          brandColor: "#D24939" },
  { name: "GitHub Actions", description: "Native CI/CD platform integrated with GitHub",               category: "DevOps",   experience: "3+ years", projects: "120+", popularity: 88, logo: SiGithubactions,    brandColor: "#2088FF" },
  { name: "Terraform",      description: "Infrastructure as Code for cloud provisioning",              category: "DevOps",   experience: "2+ years", projects: "35+",  popularity: 75, logo: SiTerraform,        brandColor: "#7B42BC" },
] as const;

// ── Bottom stats ───────────────────────────────────────────────
const STATS = [
  { icon: Code2,     value: "50+",  label: "Technologies Mastered" },
  { icon: Trophy,    value: "3+",  label: "Years Experience"      },
  { icon: Briefcase, value: "9+",  label: "Projects Delivered"    },
  { icon: Star,      value: "98%",  label: "Client Satisfaction"   },
] as const;

export default function TechnologiesPage() {
  const [query,     setQuery]     = useState("");
  const [activeTab, setActiveTab] = useState<Tab>("All");

  const filtered = useMemo(() => {
    const q = query.toLowerCase().trim();
    return TECHNOLOGIES.filter((tech) => {
      const matchesTab    = activeTab === "All" || tech.category === activeTab;
      const matchesSearch = !q ||
        tech.name.toLowerCase().includes(q) ||
        tech.description.toLowerCase().includes(q) ||
        tech.category.toLowerCase().includes(q);
      return matchesTab && matchesSearch;
    });
  }, [query, activeTab]);

  const isFiltering = query.trim() !== "" || activeTab !== "All";

  return (
    <>
      {/* ── Top header bar ───────────────────────────────────── */}
      <PageHero
        title="Technologies & Tools"
        subtitle="Cutting-edge technologies we use to build exceptional applications"
        rightSlot={
          <Link
            href="/contact"
            className="flex-shrink-0 inline-flex items-center gap-2 rounded-xl bg-gradient-to-r from-[#7C3AED] to-[#2563EB] px-5 py-2.5 text-sm font-semibold text-white shadow-md shadow-purple-200 transition-all hover:shadow-lg hover:shadow-purple-300 hover:scale-[1.02] active:scale-95"
          >
            <Zap size={14} />
            Get Quote
          </Link>
        }
      />

      <div className="relative min-h-screen overflow-hidden bg-white dark:bg-gray-950 transition-colors duration-300">
      {/* ── Decorative background blobs ── */}
      <div
        aria-hidden="true"
        className="pointer-events-none absolute -top-20 -right-20 w-[400px] h-[400px] rounded-full bg-[#2563EB]/6 blur-3xl"
      />
      <div
        aria-hidden="true"
        className="pointer-events-none absolute top-[65%] -left-24 w-[420px] h-[420px] rounded-full bg-[#7C3AED]/6 blur-3xl"
      />

      <div className="mx-auto max-w-6xl px-6 py-10 md:px-10">

        {/* ── Search bar ───────────────────────────────────────── */}
        <div className="animate-fade-in relative mb-8 max-w-xl">
          <Search
            size={16}
            className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400 pointer-events-none"
          />
          <input
            type="text"
            placeholder="Search technologies..."
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            className="w-full rounded-xl border border-gray-200 dark:border-gray-700 bg-gray-50 dark:bg-gray-800 py-3 pl-10 pr-4 text-sm text-gray-800 dark:text-gray-100 placeholder-gray-400 dark:placeholder-gray-600 outline-none transition-all focus:border-[#7C3AED] focus:bg-white dark:focus:bg-gray-700 focus:ring-2 focus:ring-[#7C3AED]/15"
          />
        </div>

        {/* ── Hero text (hidden while filtering) ───────────────── */}
        {!isFiltering && (
          <div className="animate-fade-in-up mb-8">
            <div className="mb-2 flex items-center gap-2">
              <Sparkles size={15} className="text-[#7C3AED]" />
              <span className="text-xs font-semibold uppercase tracking-widest text-[#7C3AED]">
                Our stack
              </span>
            </div>
            <h2 className="text-3xl font-extrabold tracking-tight text-gray-900 dark:text-white sm:text-4xl">
              Modern Technology Stack
            </h2>
            <p className="mt-3 max-w-2xl text-base text-gray-500 dark:text-gray-400 leading-relaxed">
              We build on battle-tested, cutting-edge technologies that power scalable,
              secure, and high-performance applications — from day one through enterprise scale.
              <br className="hidden sm:block" />
              Every tool in our stack is chosen for reliability, ecosystem maturity, and the
              real-world outcomes it delivers for our clients.
            </p>
          </div>
        )}

        {/* ── Tab filter bar ───────────────────────────────────── */}
        <div className="animate-fade-in mb-8 flex flex-wrap gap-2">
          {TABS.map((tab) => (
            <button
              key={tab}
              onClick={() => setActiveTab(tab)}
              className={[
                "rounded-full px-4 py-1.5 text-sm font-semibold transition-all duration-200",
                activeTab === tab
                  ? "bg-[#7C3AED] text-white shadow-sm shadow-purple-200"
                  : "bg-gray-100 dark:bg-gray-800 text-gray-500 dark:text-gray-400 hover:bg-[#EDE9FE] dark:hover:bg-[#7C3AED]/15 hover:text-[#7C3AED] dark:hover:text-[#A78BFA]",
              ].join(" ")}
            >
              {tab}
              {tab !== "All" && (
                <span className={["ml-1.5 text-[11px]", activeTab === tab ? "text-purple-200" : "text-gray-400 dark:text-gray-500"].join(" ")}>
                  {TECHNOLOGIES.filter((t) => t.category === tab).length}
                </span>
              )}
            </button>
          ))}

          {isFiltering && (
            <button
              onClick={() => { setQuery(""); setActiveTab("All"); }}
              className="rounded-full border border-gray-200 dark:border-gray-700 px-4 py-1.5 text-sm font-medium text-gray-400 dark:text-gray-500 hover:text-gray-600 dark:hover:text-gray-300 hover:border-gray-300 dark:hover:border-gray-600 transition-all"
            >
              Clear ×
            </button>
          )}
        </div>

        {/* Result count */}
        {isFiltering && (
          <p className="mb-5 text-sm text-gray-400 dark:text-gray-500">
            Showing <span className="font-semibold text-gray-700 dark:text-gray-300">{filtered.length}</span> of {TECHNOLOGIES.length} technologies
          </p>
        )}

        {/* ── Cards grid ───────────────────────────────────────── */}
        {filtered.length > 0 ? (
          <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-3">
            {filtered.map((tech, i) => (
              <Reveal key={tech.name} delay={(i % 3) * 0.06}>
                <TechCard {...tech} />
              </Reveal>
            ))}
          </div>
        ) : (
          <div className="flex flex-col items-center justify-center py-24 text-center">
            <div className="mb-4 flex h-14 w-14 items-center justify-center rounded-2xl bg-gray-100 dark:bg-gray-800">
              <Search size={22} className="text-gray-400" />
            </div>
            <h3 className="text-base font-semibold text-gray-700 dark:text-gray-300">No technologies found</h3>
            <p className="mt-1 text-sm text-gray-400 dark:text-gray-500">
              Try a different keyword or select a different category.
            </p>
            <button
              onClick={() => { setQuery(""); setActiveTab("All"); }}
              className="mt-4 text-sm font-medium text-[#7C3AED] hover:underline"
            >
              Clear filters
            </button>
          </div>
        )}

        {/* ── Stats bar ────────────────────────────────────────── */}
        <div className="mt-20 grid grid-cols-2 gap-4 md:grid-cols-4">
          {STATS.map(({ icon: Icon, value, label }, i) => (
            <Reveal key={label} delay={i * 0.08}>
              <div className="flex flex-col items-center justify-center gap-2 rounded-2xl border border-gray-100 dark:border-gray-700 bg-gray-50 dark:bg-gray-800 px-4 py-6 text-center shadow-sm">
                <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-[#EDE9FE] dark:bg-[#7C3AED]/20">
                  <Icon size={18} className="text-[#7C3AED]" />
                </div>
                <AnimatedCounter
                  value={value}
                  className="text-2xl font-extrabold tracking-tight text-gray-900 dark:text-white"
                />
                <span className="text-xs font-medium text-gray-500 dark:text-gray-400">{label}</span>
              </div>
            </Reveal>
          ))}
        </div>

        {/* ── Bottom CTA ───────────────────────────────────────── */}
        <section className="animate-fade-in-up mt-16 overflow-hidden rounded-3xl bg-gradient-to-br from-[#EDE9FE] dark:from-[#7C3AED]/20 via-white dark:via-gray-900 to-[#DBEAFE] dark:to-[#2563EB]/20 border border-purple-100 dark:border-[#7C3AED]/30 px-8 py-14 text-center shadow-sm">
          <div className="mb-3 flex items-center justify-center gap-2">
            <Sparkles size={15} className="text-[#7C3AED]" />
            <span className="text-xs font-semibold uppercase tracking-widest text-[#7C3AED]">
              Work with us
            </span>
          </div>
          <h2 className="text-3xl font-extrabold tracking-tight text-gray-900 dark:text-white sm:text-4xl">
            Need a Custom Solution?
          </h2>
          <p className="mx-auto mt-4 max-w-xl text-base text-gray-500 dark:text-gray-400 leading-relaxed">
            Don&apos;t see the technology you need? We&apos;re always learning and adapting
            to new technologies to meet our clients&apos; requirements.
          </p>
          <div className="mt-8 flex flex-wrap items-center justify-center gap-3">
            <Link
              href="/contact"
              className="inline-flex items-center gap-2 rounded-xl bg-gradient-to-r from-[#7C3AED] to-[#2563EB] px-7 py-3 text-sm font-semibold text-white shadow-md shadow-purple-200 transition-all hover:shadow-lg hover:scale-[1.02] active:scale-95"
            >
              <Zap size={15} />
              Get Quote
            </Link>
            <Link
              href="/"
              className="inline-flex items-center gap-2 rounded-xl border-2 border-[#7C3AED] px-7 py-3 text-sm font-semibold text-[#7C3AED] transition-all hover:bg-[#7C3AED] hover:text-white active:scale-95"
            >
              View Portfolio
              <ArrowRight size={15} />
            </Link>
          </div>
          <div className="mt-6 flex flex-wrap items-center justify-center gap-4 text-xs text-gray-400 dark:text-gray-500">
            {["Free initial consultation", "Response within 24 hours", "No lock-in contracts"].map((item) => (
              <span key={item} className="flex items-center gap-1.5">
                <CheckCircle2 size={12} className="text-green-500" />
                {item}
              </span>
            ))}
          </div>
        </section>

      </div>
    </div>
    </>
  );
}
