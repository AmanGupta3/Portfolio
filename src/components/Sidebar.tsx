"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { useState, useEffect } from "react";
import {
  FolderOpen,
  Layers,
  Cpu,
  Users,
  Radio,
  Zap,
  Menu,
  X,
} from "lucide-react";
import CodandLogo from "@/components/CodandLogo";
import ThemeToggle from "@/components/ThemeToggle";
import { useTheme } from "@/contexts/ThemeContext";

const NAV_LINKS = [
  { href: "/", label: "Portfolio", icon: FolderOpen },
  { href: "/services", label: "Services", icon: Layers },
  { href: "/technologies", label: "Technologies", icon: Cpu },
  { href: "/about", label: "About Us", icon: Users },
  { href: "/blog", label: "Stay Updated", icon: Radio },
] as const;

export default function Sidebar() {
  const pathname = usePathname();
  const [mobileOpen, setMobileOpen] = useState(false);
  const { theme } = useTheme();

  // Close sidebar on route change (mobile)
  useEffect(() => {
    setMobileOpen(false);
  }, [pathname]);

  // Prevent body scroll when mobile sidebar is open
  useEffect(() => {
    if (mobileOpen) {
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "";
    }
    return () => {
      document.body.style.overflow = "";
    };
  }, [mobileOpen]);

  const isActive = (href: string) => {
    if (href === "/") return pathname === "/";
    return pathname.startsWith(href);
  };

  return (
    <>
      {/* ── Mobile hamburger button ── */}
      <button
        onClick={() => setMobileOpen(true)}
        aria-label="Open navigation"
        className="lg:hidden fixed top-4 left-4 z-50 p-2 rounded-lg bg-white dark:bg-gray-800 shadow-md border border-gray-200 dark:border-gray-700 text-gray-600 dark:text-gray-300 hover:text-[#7C3AED] transition-colors"
      >
        <Menu size={22} />
      </button>

      {/* ── Backdrop (mobile only) ── */}
      {mobileOpen && (
        <div
          onClick={() => setMobileOpen(false)}
          className="lg:hidden fixed inset-0 z-40 bg-black/40 backdrop-blur-sm"
          aria-hidden="true"
        />
      )}

      {/* ── Sidebar panel ── */}
      <aside
        className={[
          // Base layout
          "fixed top-0 left-0 h-screen w-64 z-50",
          "flex flex-col bg-white dark:bg-gray-900 border-r border-gray-200 dark:border-gray-700 shadow-sm",
          // Mobile: slide in/out
          "transition-transform duration-300 ease-in-out",
          mobileOpen ? "translate-x-0" : "-translate-x-full",
          // Desktop: always visible
          "lg:translate-x-0",
        ].join(" ")}
      >
        {/* ── Logo / Brand ── */}
        <div className="flex items-center justify-between px-5 py-5 border-b border-gray-100 dark:border-gray-700">
          <CodandLogo variant="full" theme={theme} size="sm" />

          {/* Close button (mobile only) */}
          <button
            onClick={() => setMobileOpen(false)}
            aria-label="Close navigation"
            className="lg:hidden ml-2 p-1 rounded-md text-gray-400 dark:text-gray-500 hover:text-gray-700 dark:hover:text-gray-300 transition-colors flex-shrink-0"
          >
            <X size={18} />
          </button>
        </div>

        {/* ── Nav Links ── */}
        <nav className="flex-1 px-3 py-4 space-y-0.5 overflow-y-auto">
          {NAV_LINKS.map(({ href, label, icon: Icon }) => {
            const active = isActive(href);
            return (
              <Link
                key={href}
                href={href}
                className={[
                  "flex items-center gap-3 px-3 py-2.5 rounded-lg text-sm font-medium transition-all duration-150 group",
                  active
                    ? "bg-[#7C3AED] text-white shadow-sm"
                    : "text-gray-600 dark:text-gray-400 hover:bg-[#EDE9FE] dark:hover:bg-[#7C3AED]/15 hover:text-[#7C3AED] dark:hover:text-[#A78BFA]",
                ].join(" ")}
              >
                <Icon
                  size={18}
                  className={[
                    "flex-shrink-0 transition-colors",
                    active
                      ? "text-white"
                      : "text-gray-400 dark:text-gray-500 group-hover:text-[#7C3AED] dark:group-hover:text-[#A78BFA]",
                  ].join(" ")}
                />
                {label}
              </Link>
            );
          })}
        </nav>

        {/* ── Bottom actions ── */}
        <div className="px-4 py-5 border-t border-gray-100 dark:border-gray-700 space-y-3">
          {/* Theme toggle */}
          <ThemeToggle />

          {/* Get Quote CTA */}
          <Link
            href="/contact"
            className={[
              "flex items-center justify-center gap-2 w-full px-4 py-3 rounded-xl text-sm font-semibold transition-all duration-200",
              pathname === "/contact"
                ? "bg-[#6D28D9] text-white shadow-lg shadow-purple-200"
                : "bg-gradient-to-r from-[#7C3AED] to-[#2563EB] text-white hover:shadow-lg hover:shadow-purple-200 hover:scale-[1.02] active:scale-100",
            ].join(" ")}
          >
            <Zap size={16} className="flex-shrink-0" />
            Get a Quote
          </Link>
        </div>
      </aside>
    </>
  );
}
