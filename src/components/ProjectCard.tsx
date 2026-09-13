"use client";

import { useState, useEffect } from "react";
import { X, ArrowRight, Star, Zap } from "lucide-react";
import Link from "next/link";
import ProjectIllustration, { type IllustrationVariant } from "@/components/ProjectIllustration";

interface ProjectCardProps {
  name: string;
  tagline: string;
  shortDescription: string;
  longDescription: string;
  category: string;
  tags: readonly string[];
  gradientFrom: string;
  gradientTo: string;
  stats: readonly string[];
  illustration: IllustrationVariant;
  featured?: boolean;
}

export default function ProjectCard({
  name,
  tagline,
  shortDescription,
  longDescription,
  category,
  tags,
  gradientFrom,
  gradientTo,
  stats,
  illustration,
  featured = false,
}: ProjectCardProps) {
  const [modalOpen, setModalOpen] = useState(false);

  // Lock body scroll when modal is open
  useEffect(() => {
    if (modalOpen) {
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "";
    }
    return () => { document.body.style.overflow = ""; };
  }, [modalOpen]);

  // Close on Escape key
  useEffect(() => {
    if (!modalOpen) return;
    const handleKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") setModalOpen(false);
    };
    window.addEventListener("keydown", handleKey);
    return () => window.removeEventListener("keydown", handleKey);
  }, [modalOpen]);

  const bannerStyle = {
    background: `linear-gradient(135deg, ${gradientFrom}, ${gradientTo})`,
  };

  return (
    <>
      {/* ── Card ── */}
      <div className="group flex flex-col rounded-2xl border border-gray-100 dark:border-gray-700 bg-white dark:bg-gray-800 shadow-sm overflow-hidden transition-all duration-300 hover:shadow-xl hover:-translate-y-1.5 hover:scale-[1.01] dark:hover:border-gray-600">

        {/* Gradient banner */}
        <div className="relative h-40 flex items-center justify-center overflow-hidden" style={bannerStyle}>

          {/* Thematic illustration */}
          <ProjectIllustration
            variant={illustration}
            className="absolute inset-0 h-full w-full transition-transform duration-500 group-hover:scale-105"
          />

          {/* Category badge */}
          <div className="absolute top-3 left-3 rounded-full bg-black/25 px-3 py-1 text-[11px] font-semibold text-white backdrop-blur-sm">
            {category}
          </div>

          {/* Featured badge */}
          {featured && (
            <div className="absolute top-3 right-3 flex items-center gap-1 rounded-full bg-yellow-400 px-2.5 py-1 text-[11px] font-bold text-yellow-900 shadow-sm">
              <Star size={10} fill="currentColor" />
              Featured
            </div>
          )}

          {/* Project name at bottom of banner */}
          <div className="absolute bottom-0 left-0 right-0 bg-gradient-to-t from-black/50 to-transparent px-4 pb-3 pt-6">
            <h3 className="text-lg font-extrabold text-white leading-tight">{name}</h3>
          </div>
        </div>

        {/* Content */}
        <div className="flex flex-1 flex-col p-5">

          {/* Tagline */}
          <p className="mb-2 text-[13px] font-semibold text-[#7C3AED] dark:text-[#A78BFA]">{tagline}</p>

          {/* Short description */}
          <p className="mb-4 flex-1 text-[13px] leading-relaxed text-gray-500 dark:text-gray-400 line-clamp-3">
            {shortDescription}
          </p>

          {/* Tech tags */}
          <div className="mb-4 flex flex-wrap gap-1.5">
            {tags.map((tag) => (
              <span
                key={tag}
                className="rounded-full bg-gray-100 dark:bg-gray-700 px-2.5 py-1 text-[11px] font-medium text-gray-600 dark:text-gray-300"
              >
                {tag}
              </span>
            ))}
          </div>

          {/* Stats */}
          <div className="mb-5 space-y-1.5 border-t border-gray-50 dark:border-gray-700 pt-4">
            {stats.map((stat) => (
              <div key={stat} className="flex items-center gap-2">
                <div
                  className="h-1.5 w-1.5 flex-shrink-0 rounded-full"
                  style={{ backgroundColor: gradientFrom }}
                />
                <span className="text-[12px] font-semibold text-gray-700 dark:text-gray-300">{stat}</span>
              </div>
            ))}
          </div>

          {/* CTA button */}
          <button
            onClick={() => setModalOpen(true)}
            className="mt-auto flex items-center justify-center gap-2 rounded-xl border border-gray-200 dark:border-gray-600 px-4 py-2.5 text-sm font-medium text-gray-600 dark:text-gray-300 transition-all duration-200 hover:border-[#7C3AED] hover:text-[#7C3AED] hover:bg-[#7C3AED]/5 dark:hover:border-[#7C3AED] dark:hover:text-[#A78BFA] dark:hover:bg-[#7C3AED]/10"
          >
            View Case Study
            <ArrowRight size={14} />
          </button>
        </div>
      </div>

      {/* ── Case Study Modal ── */}
      {modalOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4">

          {/* Backdrop */}
          <div
            className="absolute inset-0 bg-black/60 backdrop-blur-sm"
            onClick={() => setModalOpen(false)}
          />

          {/* Modal panel */}
          <div className="relative flex max-h-[90vh] w-full max-w-2xl flex-col overflow-hidden rounded-2xl bg-white dark:bg-gray-900 shadow-2xl">

            {/* Modal gradient header */}
            <div className="relative flex h-52 flex-shrink-0 items-center justify-center overflow-hidden" style={bannerStyle}>

              {/* Thematic illustration */}
              <ProjectIllustration variant={illustration} className="absolute inset-0 h-full w-full" />

              {/* Category badge */}
              <div className="absolute top-4 left-4 rounded-full bg-black/25 px-3 py-1 text-[11px] font-semibold text-white backdrop-blur-sm">
                {category}
              </div>

              {/* Featured badge */}
              {featured && (
                <div className="absolute top-4 right-14 flex items-center gap-1 rounded-full bg-yellow-400 px-2.5 py-1 text-[11px] font-bold text-yellow-900">
                  <Star size={10} fill="currentColor" />
                  Featured
                </div>
              )}

              {/* Close button */}
              <button
                onClick={() => setModalOpen(false)}
                className="absolute right-4 top-4 flex h-8 w-8 items-center justify-center rounded-full bg-black/30 text-white backdrop-blur-sm transition-colors hover:bg-black/50"
              >
                <X size={16} />
              </button>

              {/* Name + tagline overlay */}
              <div className="absolute bottom-0 left-0 right-0 bg-gradient-to-t from-black/50 to-transparent px-6 pb-4 pt-8">
                <h2 className="text-2xl font-extrabold text-white">{name}</h2>
                <p className="mt-0.5 text-sm text-white/80">{tagline}</p>
              </div>
            </div>

            {/* Modal body — scrollable */}
            <div className="flex-1 overflow-y-auto px-6 py-6">

              {/* Long description */}
              <p className="mb-6 text-[14px] leading-relaxed text-gray-600 dark:text-gray-300">{longDescription}</p>

              {/* Technologies */}
              <div className="mb-6">
                <span className="mb-2.5 block text-[10px] font-semibold uppercase tracking-widest text-gray-400 dark:text-gray-500">
                  Technologies Used
                </span>
                <div className="flex flex-wrap gap-1.5">
                  {tags.map((tag) => (
                    <span
                      key={tag}
                      className="rounded-full bg-gray-100 dark:bg-gray-700 px-2.5 py-1 text-[11px] font-medium text-gray-600 dark:text-gray-300"
                    >
                      {tag}
                    </span>
                  ))}
                </div>
              </div>

              {/* Key highlights */}
              <div>
                <span className="mb-3 block text-[10px] font-semibold uppercase tracking-widest text-gray-400 dark:text-gray-500">
                  Key Highlights
                </span>
                <div className="space-y-2">
                  {stats.map((stat) => (
                    <div
                      key={stat}
                      className="flex items-center gap-3 rounded-xl bg-gray-50 dark:bg-gray-800 px-4 py-3"
                    >
                      <div
                        className="h-2 w-2 flex-shrink-0 rounded-full"
                        style={{ backgroundColor: gradientFrom }}
                      />
                      <span className="text-[13px] font-semibold text-gray-700 dark:text-gray-200">{stat}</span>
                    </div>
                  ))}
                </div>
              </div>
            </div>

            {/* Modal footer */}
            <div className="flex-shrink-0 border-t border-gray-100 dark:border-gray-700 px-6 py-4">
              <Link
                href="/contact"
                className="flex items-center justify-center gap-2 rounded-xl bg-gradient-to-r from-[#7C3AED] to-[#2563EB] px-6 py-3 text-sm font-semibold text-white shadow-md shadow-purple-200 transition-all hover:scale-[1.02] hover:shadow-lg hover:shadow-purple-300 active:scale-95"
              >
                <Zap size={14} />
                Get a Quote for a Similar Project
              </Link>
            </div>
          </div>
        </div>
      )}
    </>
  );
}
