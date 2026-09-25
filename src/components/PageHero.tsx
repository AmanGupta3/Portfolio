"use client";

import type { ReactNode } from "react";
import NetworkBackground from "@/components/NetworkBackground";

interface PageHeroProps {
  title: string;
  subtitle: string;
  rightSlot?: ReactNode;
}

// Shared page header used across every inner page — same title/subtitle/CTA
// structure as before, now with the constellation particle background as a
// subtle accent on the right (desktop only), matching the homepage hero.
export default function PageHero({ title, subtitle, rightSlot }: PageHeroProps) {
  return (
    <div className="sticky top-0 z-20 overflow-hidden border-b border-gray-100 dark:border-gray-800 bg-white dark:bg-gray-900 pl-16 pr-6 py-10 md:pr-10 lg:pl-10 lg:pr-[400px] lg:py-12">
      {/* Constellation accent — right side, desktop only */}
      <div className="pointer-events-none absolute inset-y-0 right-0 hidden w-[360px] opacity-70 lg:block">
        <NetworkBackground />
      </div>

      <div className="relative mx-auto flex max-w-6xl items-start justify-between gap-4">
        <div>
          <h1 className="text-2xl font-extrabold tracking-tight text-gray-900 dark:text-white">
            {title}
          </h1>
          <p className="mt-0.5 text-sm text-gray-500 dark:text-gray-400">
            {subtitle}
          </p>
        </div>
        {rightSlot}
      </div>
    </div>
  );
}
