"use client";

import { Sun, Moon } from "lucide-react";
import { useTheme } from "@/contexts/ThemeContext";

export default function ThemeToggle() {
  const { theme, toggle } = useTheme();
  const isDark = theme === "dark";

  return (
    <div className="flex items-center justify-between px-1 py-1">
      {/* Label */}
      <span className="text-[11px] font-medium text-gray-400 dark:text-gray-500 uppercase tracking-widest select-none">
        {isDark ? "Dark" : "Light"}
      </span>

      {/* Toggle pill */}
      <button
        onClick={toggle}
        aria-label={isDark ? "Switch to light mode" : "Switch to dark mode"}
        className={[
          "relative flex h-7 w-[52px] cursor-pointer items-center rounded-full border transition-colors duration-300",
          isDark
            ? "bg-gray-700 border-gray-600"
            : "bg-gray-100 border-gray-200",
        ].join(" ")}
      >
        {/* Sliding dot */}
        <span
          className={[
            "absolute flex h-5 w-5 items-center justify-center rounded-full shadow-sm transition-transform duration-300",
            isDark ? "translate-x-[28px] bg-gray-900" : "translate-x-[2px] bg-white",
          ].join(" ")}
        >
          {isDark ? (
            <Moon size={11} className="text-[#A78BFA]" />
          ) : (
            <Sun size={11} className="text-amber-500" />
          )}
        </span>

        {/* Background icons (decorative) */}
        <Sun
          size={10}
          className={[
            "ml-[6px] transition-opacity duration-300 text-amber-400",
            isDark ? "opacity-0" : "opacity-30",
          ].join(" ")}
        />
        <Moon
          size={10}
          className={[
            "ml-auto mr-[6px] transition-opacity duration-300 text-purple-300",
            isDark ? "opacity-30" : "opacity-0",
          ].join(" ")}
        />
      </button>
    </div>
  );
}
