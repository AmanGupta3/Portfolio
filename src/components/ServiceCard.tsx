import type { LucideIcon } from "lucide-react";
import { ArrowRight } from "lucide-react";
import Link from "next/link";

interface ServiceCardProps {
  title: string;
  description: string;
  icon: LucideIcon;
  iconBg: string;
  iconColor: string;
  tags: readonly string[];
  guideLink: string;
}

export default function ServiceCard({
  title,
  description,
  icon: Icon,
  iconBg,
  iconColor,
  tags,
  guideLink,
}: ServiceCardProps) {
  return (
    <div className="group flex flex-col rounded-2xl border border-gray-100 dark:border-gray-700 bg-white dark:bg-gray-800 p-6 shadow-sm transition-all duration-300 hover:shadow-xl hover:-translate-y-1.5 hover:border-gray-200 dark:hover:border-gray-600">

      {/* Icon box */}
      <div
        className={`flex h-11 w-11 items-center justify-center rounded-xl ${iconBg} mb-5 flex-shrink-0 transition-transform duration-300 group-hover:scale-110`}
      >
        <Icon size={20} className={iconColor} />
      </div>

      {/* Title */}
      <h3 className="text-[15px] font-bold text-gray-900 dark:text-white mb-2 leading-snug">
        {title}
      </h3>

      {/* Description */}
      <p className="text-sm text-gray-500 dark:text-gray-400 leading-relaxed flex-1 mb-5">
        {description}
      </p>

      {/* Tech tags */}
      <div className="mb-5">
        <span className="block text-[10px] font-semibold uppercase tracking-widest text-gray-400 dark:text-gray-500 mb-2">
          Technologies
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

      {/* Guide link */}
      <Link
        href={guideLink}
        className="mt-auto flex items-center justify-center gap-2 rounded-xl border border-gray-200 dark:border-gray-600 px-4 py-2.5 text-sm font-medium text-gray-600 dark:text-gray-300 transition-all duration-200 hover:border-[#7C3AED] hover:text-[#7C3AED] hover:bg-[#7C3AED]/5 dark:hover:border-[#7C3AED] dark:hover:text-[#A78BFA] dark:hover:bg-[#7C3AED]/10 group-hover:border-[#7C3AED]/40"
      >
        Read Detailed Guide
        <ArrowRight size={14} className="transition-transform group-hover:translate-x-0.5" />
      </Link>
    </div>
  );
}
