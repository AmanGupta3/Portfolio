"use client";

import { useState, useMemo } from "react";
import Link from "next/link";
import {
  Search, Zap, Sparkles, ArrowRight, CheckCircle2,
  Briefcase, Trophy, Star, Clock,
} from "lucide-react";
import ProjectCard from "@/components/ProjectCard";

// ── Category tabs ─────────────────────────────────────────────
const TABS = ["All", "Web App", "Enterprise", "AI/ML", "Cloud"] as const;
type Tab = (typeof TABS)[number];

// ── Projects data ─────────────────────────────────────────────
const PROJECTS = [
  {
    name: "Freightly",
    tagline: "End-to-end logistics & warehouse operations platform",
    shortDescription:
      "A full-scale Warehouse & Transport Management System built for logistics companies to manage shipments, routes, billing, inventory, and compliance — all from a single web platform.",
    longDescription:
      "An end-to-end logistics operations platform handling the complete lifecycle of warehouse and transport management. From Air Waybills and dispatch manifests to multi-city routes, tax invoices, vendor payments, and stock — the system brings every department of a freight business under one roof. Built for real-world scale with production data.",
    category: "Web App" as Tab,
    tags: ["React", "Node.js", "PostgreSQL", "REST API", "Multi-branch", "Logistics"] as const,
    gradientFrom: "#2563EB",
    gradientTo: "#06B6D4",
    stats: ["1000+ Active Routes", "426+ Tax Invoices", "Multi-branch Operations"] as const,
    featured: true,
  },
  {
    name: "PetroDesk",
    tagline: "Enterprise data portal for India's largest oil & gas company",
    shortDescription:
      "Developed the frontend of an enterprise data portal for a leading energy conglomerate — building interactive dashboards, data tables, charts, graphs, and multi-module screens with live API integration.",
    longDescription:
      "Engineered multiple feature-rich modules using Angular — transforming complex backend data into clean, interactive user interfaces. Work involved dynamic charts for data visualization, responsive data tables with filtering and sorting, and seamlessly binding UI components to live REST APIs across several functional modules serving different operational departments of the client.",
    category: "Enterprise" as Tab,
    tags: ["Angular", "TypeScript", "REST API", "Data Visualization", "Charts", "Enterprise"] as const,
    gradientFrom: "#F97316",
    gradientTo: "#FACC15",
    stats: ["10+ Modules Built", "Live API Integration", "Enterprise Scale"] as const,
    featured: true,
  },
  {
    name: "Querivo",
    tagline: "AI-powered autonomous calling & requirement capture system",
    shortDescription:
      "An intelligent AI calling system that autonomously contacts customers, captures requirements through smart conversation, performs cross-questioning, and stores everything in real-time with a live admin dashboard.",
    longDescription:
      "An AI-driven outbound calling platform replacing manual customer discovery calls with an intelligent voice agent. The AI autonomously calls customers, asks structured requirement-gathering questions, performs smart cross-questioning based on responses, and stores entire conversations in real-time. The admin panel provides live monitoring of ongoing calls, captured data, and conversation logs — giving teams instant visibility into every interaction.",
    category: "AI/ML" as Tab,
    tags: ["AI", "Voice Agent", "Node.js", "React", "WebSocket", "Real-time", "Admin Dashboard"] as const,
    gradientFrom: "#9333EA",
    gradientTo: "#EC4899",
    stats: ["Real-time Call Monitoring", "Auto Cross-questioning", "Live Call Dashboard"] as const,
    featured: true,
  },
  {
    name: "Vaultrix",
    tagline: "Enterprise-grade secure cloud file storage & management",
    shortDescription:
      "A secure, scalable cloud file storage platform that lets users upload, organize, manage and access their files from anywhere — with enterprise-grade security and a clean, intuitive interface.",
    longDescription:
      "A full-featured cloud file storage solution built for organizations needing reliable, secure, and scalable document management. Users can upload files of any type, organize into folders, share with team members, and access from any device. Features role-based access control, real-time sync, file versioning, and a powerful admin panel to manage users, storage quotas, and permissions across the organization.",
    category: "Cloud" as Tab,
    tags: ["React", "Node.js", "AWS S3", "PostgreSQL", "RBAC", "File Versioning", "Cloud"] as const,
    gradientFrom: "#14B8A6",
    gradientTo: "#34D399",
    stats: ["Role-based Access Control", "File Versioning", "Enterprise Security"] as const,
    featured: false,
  },
  {
    name: "Omnidesk",
    tagline: "Multi-department enterprise portal with tile-based navigation",
    shortDescription:
      "A unified enterprise portal with a tile-based dashboard covering employee payroll, purchase & sales, room booking, WiFi management and more — all under one secure login.",
    longDescription:
      "A large-scale unified enterprise portal built from scratch as a full stack project. Features a clean tile-based navigation where each tile opens a fully functional independent department portal. Handles database design, backend APIs, frontend UI, and portal integration. Built for security, role-based access, and department-wise data segregation — with modules for salary management, purchase & sales tracking, room booking, and WiFi access management.",
    category: "Enterprise" as Tab,
    tags: ["React", "Node.js", "PostgreSQL", "RBAC", "Full Stack", "Multi-dept", "Modular"] as const,
    gradientFrom: "#4F46E5",
    gradientTo: "#3B82F6",
    stats: ["6+ Department Modules", "Role-based Access", "Full Stack Build"] as const,
    featured: false,
  },
  {
    name: "Siftly",
    tagline: "AI-powered resume screening & recruitment automation",
    shortDescription:
      "An intelligent recruitment tool that lets HR teams bulk upload resumes, apply smart filters to shortlist the best candidates, and manage the entire hiring pipeline — fast, accurate, and effortless.",
    longDescription:
      "A smart recruitment and resume screening platform eliminating manual CV review. HR teams bulk upload resumes in any format, define screening criteria, and the system automatically filters, ranks, and shortlists the most relevant candidates. Extracts key information — skills, experience, education — and matches against job requirements to surface best fits instantly. Recruiters get powerful filtering tools to narrow down by any parameter without reading a single resume manually.",
    category: "AI/ML" as Tab,
    tags: ["Python", "AI", "NLP", "React", "Node.js", "PostgreSQL", "Resume Parsing"] as const,
    gradientFrom: "#F43F5E",
    gradientTo: "#FB923C",
    stats: ["Bulk Resume Upload", "AI-powered Ranking", "Smart Shortlisting"] as const,
    featured: false,
  },
] as const;

// ── Stats bar ─────────────────────────────────────────────────
const STATS = [
  { icon: Briefcase, value: "9+",  label: "Projects Delivered"  },
  { icon: Trophy,    value: "5+",  label: "Enterprise Clients"  },
  { icon: Star,      value: "98%", label: "Client Satisfaction" },
  { icon: Clock,     value: "3+",  label: "Years Experience"    },
] as const;

export default function PortfolioPage() {
  const [query,     setQuery]     = useState("");
  const [activeTab, setActiveTab] = useState<Tab>("All");

  const filtered = useMemo(() => {
    const q = query.toLowerCase().trim();
    return PROJECTS.filter((p) => {
      const matchesTab =
        activeTab === "All" || p.category === activeTab;
      const matchesSearch =
        !q ||
        p.name.toLowerCase().includes(q) ||
        p.tagline.toLowerCase().includes(q) ||
        p.shortDescription.toLowerCase().includes(q) ||
        p.tags.some((t) => t.toLowerCase().includes(q));
      return matchesTab && matchesSearch;
    });
  }, [query, activeTab]);

  const isFiltering = query.trim() !== "" || activeTab !== "All";

  return (
    <div className="min-h-screen bg-white dark:bg-gray-950 transition-colors duration-300">

      {/* ── Top header bar ───────────────────────────────────── */}
      <div className="border-b border-gray-100 dark:border-gray-800 bg-white dark:bg-gray-900 px-6 py-5 md:px-10">
        <div className="mx-auto flex max-w-6xl items-start justify-between gap-4">
          <div>
            <h1 className="text-2xl font-extrabold tracking-tight text-gray-900 dark:text-white">
              Our Portfolio
            </h1>
            <p className="mt-0.5 text-sm text-gray-500 dark:text-gray-400">
              A selection of our work across enterprise, government, AI/ML, cloud and web platforms
            </p>
          </div>
          <Link
            href="/contact"
            className="flex-shrink-0 inline-flex items-center gap-2 rounded-xl bg-gradient-to-r from-[#7C3AED] to-[#2563EB] px-5 py-2.5 text-sm font-semibold text-white shadow-md shadow-purple-200 transition-all hover:shadow-lg hover:shadow-purple-300 hover:scale-[1.02] active:scale-95"
          >
            <Zap size={14} />
            Get Quote
          </Link>
        </div>
      </div>

      <div className="mx-auto max-w-6xl px-6 py-10 md:px-10">

        {/* ── Search bar ───────────────────────────────────────── */}
        <div className="animate-fade-in relative mb-8 max-w-xl">
          <Search
            size={16}
            className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400 pointer-events-none"
          />
          <input
            type="text"
            placeholder="Search projects..."
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            className="w-full rounded-xl border border-gray-200 dark:border-gray-700 bg-gray-50 dark:bg-gray-800 py-3 pl-10 pr-4 text-sm text-gray-800 dark:text-gray-100 placeholder-gray-400 dark:placeholder-gray-600 outline-none transition-all focus:border-[#7C3AED] focus:bg-white dark:focus:bg-gray-700 focus:ring-2 focus:ring-[#7C3AED]/15"
          />
        </div>

        {/* ── Hero text (hidden while filtering) ────────────── */}
        {!isFiltering && (
          <div className="animate-fade-in-up mb-10">
            <div className="mb-2 flex items-center gap-2">
              <Sparkles size={15} className="text-[#7C3AED]" />
              <span className="text-xs font-semibold uppercase tracking-widest text-[#7C3AED]">
                Our work
              </span>
            </div>
            <h2 className="text-3xl font-extrabold tracking-tight text-gray-900 dark:text-white sm:text-4xl">
              Work That Speaks For Itself
            </h2>
            <p className="mt-3 max-w-2xl text-base text-gray-500 dark:text-gray-400 leading-relaxed">
              From enterprise data portals to AI-driven automation systems, every project here is a
              production-grade delivery built for real clients with real stakes.
              <br className="hidden sm:block" />
              We operate across enterprise, government, AI/ML, cloud, and web — bringing the same
              level of precision and craft to each engagement.
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
                <span
                  className={[
                    "ml-1.5 text-[11px]",
                    activeTab === tab ? "text-purple-200" : "text-gray-400 dark:text-gray-500",
                  ].join(" ")}
                >
                  {PROJECTS.filter((p) => p.category === tab).length}
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
            Showing{" "}
            <span className="font-semibold text-gray-700 dark:text-gray-300">{filtered.length}</span> of{" "}
            {PROJECTS.length} projects
          </p>
        )}

        {/* ── Cards grid ───────────────────────────────────────── */}
        {filtered.length > 0 ? (
          <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3">
            {filtered.map((project, i) => (
              <div
                key={project.name}
                className="animate-fade-in-up"
                style={{ animationDelay: `${i * 60}ms` }}
              >
                <ProjectCard {...project} />
              </div>
            ))}
          </div>
        ) : (
          <div className="flex flex-col items-center justify-center py-24 text-center">
            <div className="mb-4 flex h-14 w-14 items-center justify-center rounded-2xl bg-gray-100 dark:bg-gray-800">
              <Search size={22} className="text-gray-400" />
            </div>
            <h3 className="text-base font-semibold text-gray-700 dark:text-gray-300">No projects found</h3>
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
        <div className="animate-fade-in-up mt-20 grid grid-cols-2 gap-4 md:grid-cols-4">
          {STATS.map(({ icon: Icon, value, label }) => (
            <div
              key={label}
              className="flex flex-col items-center justify-center gap-2 rounded-2xl border border-gray-100 dark:border-gray-700 bg-gray-50 dark:bg-gray-800 px-4 py-6 text-center shadow-sm"
            >
              <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-[#EDE9FE] dark:bg-[#7C3AED]/20">
                <Icon size={18} className="text-[#7C3AED]" />
              </div>
              <span className="text-2xl font-extrabold tracking-tight text-gray-900 dark:text-white">{value}</span>
              <span className="text-xs font-medium text-gray-500 dark:text-gray-400">{label}</span>
            </div>
          ))}
        </div>

        {/* ── Bottom CTA ───────────────────────────────────────── */}
        <section className="animate-fade-in-up mt-16 overflow-hidden rounded-3xl bg-gradient-to-r from-[#7C3AED] to-[#2563EB] px-8 py-14 text-center shadow-lg">
          <div className="mb-3 flex items-center justify-center gap-2">
            <Sparkles size={15} className="text-purple-200" />
            <span className="text-xs font-semibold uppercase tracking-widest text-purple-200">
              Let&apos;s work together
            </span>
          </div>
          <h2 className="text-3xl font-extrabold tracking-tight text-white sm:text-4xl">
            Have a Project in Mind?
          </h2>
          <p className="mx-auto mt-4 max-w-xl text-base text-purple-100 leading-relaxed">
            Trusted by enterprise and government clients across India.
            Get a free consultation and project estimate today.
          </p>
          <div className="mt-8 flex flex-wrap items-center justify-center gap-3">
            <Link
              href="/contact"
              className="inline-flex items-center gap-2 rounded-xl bg-white px-7 py-3 text-sm font-semibold text-[#7C3AED] shadow-md transition-all hover:shadow-lg hover:scale-[1.02] active:scale-95"
            >
              Get Free Quote
              <ArrowRight size={15} />
            </Link>
            <Link
              href="/services"
              className="inline-flex items-center gap-2 rounded-xl border-2 border-white/40 px-7 py-3 text-sm font-semibold text-white transition-all hover:border-white hover:bg-white/10 active:scale-95"
            >
              View Services
            </Link>
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
  );
}
