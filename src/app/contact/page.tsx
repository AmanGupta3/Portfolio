import type { Metadata } from "next";
import { Mail, Calendar, Check, ArrowRight, Sparkles } from "lucide-react";
import QuoteWizard from "@/components/QuoteWizard";

export const metadata: Metadata = {
  title: "Get a Quote",
  description:
    "Tell us about your project and we'll get back to you within 24 hours with a detailed quote.",
};

// ── Trust pills ───────────────────────────────────────────────────────────────

const TRUST_PILLS = [
  "Free Consultation",
  "Response within 24 hours",
  "NDA Protection",
  "100% Satisfaction Guarantee",
];

// ── Why CODAND items ──────────────────────────────────────────────────────────

const WHY_ITEMS = [
  "Whatever you need — we build it",
  "3+ years of real project experience",
  "5+ Enterprise clients served",
  "98% client satisfaction rate",
];

// ── Consultation what's covered ───────────────────────────────────────────────

const CONSULTATION_ITEMS = [
  "Project scoping",
  "Tech stack advice",
  "Timeline & budget estimate",
];

export default function ContactPage() {
  return (
    <div className="min-h-screen bg-white dark:bg-gray-950 transition-colors duration-300">

      {/* ── Header bar ── */}
      <div className="border-b border-gray-100 dark:border-gray-800 bg-white dark:bg-gray-900 px-6 py-5 md:px-10">
        <div className="flex items-center justify-between">
          <div>
            <h1 className="text-xl font-bold text-gray-900 dark:text-white">
              Get a Quote
            </h1>
            <p className="mt-0.5 text-sm text-gray-500 dark:text-gray-400">
              Tell us about your project and we&apos;ll get back to you within 24 hours
            </p>
          </div>
          {/* Decorative pill */}
          <div className="hidden sm:flex items-center gap-2 rounded-full border border-[#7C3AED]/20 dark:border-[#7C3AED]/30 bg-[#EDE9FE] dark:bg-[#7C3AED]/10 px-4 py-1.5">
            <Sparkles size={13} className="text-[#7C3AED]" />
            <span className="text-xs font-semibold tracking-wide text-[#7C3AED] dark:text-[#A78BFA] uppercase">
              Free to ask
            </span>
          </div>
        </div>
      </div>

      {/* ── Main content ── */}
      <div className="px-6 py-8 md:px-10 lg:px-16">

        {/* ── Trust pills bar ── */}
        <div className="mb-8 flex flex-wrap justify-center gap-2.5">
          {TRUST_PILLS.map((pill) => (
            <span
              key={pill}
              className="flex items-center gap-1.5 rounded-full border border-[#7C3AED]/20 bg-[#EDE9FE] dark:bg-[#7C3AED]/10 px-4 py-1.5 text-xs font-medium text-[#7C3AED] dark:text-[#A78BFA]"
            >
              <span className="text-[10px]">✦</span>
              {pill}
            </span>
          ))}
        </div>

        {/* ── Two-column layout ── */}
        <div className="grid grid-cols-1 gap-8 lg:grid-cols-[2fr_1fr]">

          {/* ══ LEFT — Quote Wizard ═══════════════════════════════════════════ */}
          <QuoteWizard />

          {/* ══ RIGHT — Contact cards ═════════════════════════════════════════ */}
          <div className="space-y-4 lg:sticky lg:top-6 self-start">

            {/* Card 1 — Email Us */}
            <div className="rounded-2xl border border-gray-100 dark:border-gray-700 bg-white dark:bg-gray-800 p-5 shadow-sm">
              <div className="mb-3 flex h-10 w-10 items-center justify-center rounded-xl bg-[#7C3AED]/10">
                <Mail size={20} className="text-[#7C3AED]" />
              </div>
              <h3 className="mb-1 font-semibold text-gray-900 dark:text-white">
                Email Us
              </h3>
              <p className="mb-0.5 text-sm font-medium text-[#7C3AED]">
                contact@codand.in
              </p>
              <p className="mb-4 text-xs text-gray-400 dark:text-gray-500">
                We reply within 24 hours
              </p>
              <a
                href="mailto:contact@codand.in"
                className="flex w-full items-center justify-center gap-2 rounded-xl border border-[#7C3AED] px-4 py-2.5 text-sm font-semibold text-[#7C3AED] transition-all hover:bg-[#7C3AED] hover:text-white"
              >
                Send Email
                <ArrowRight size={14} />
              </a>
            </div>

            {/* Card 2 — Free Consultation */}
            <div className="rounded-2xl border border-[#7C3AED]/20 bg-gradient-to-br from-[#7C3AED]/5 to-[#2563EB]/5 dark:from-[#7C3AED]/10 dark:to-[#2563EB]/10 dark:border-[#7C3AED]/30 p-5 shadow-sm">
              <div className="mb-3 flex h-10 w-10 items-center justify-center rounded-xl bg-[#7C3AED]/15">
                <Calendar size={20} className="text-[#7C3AED]" />
              </div>
              <h3 className="mb-1 font-semibold text-gray-900 dark:text-white">
                Book Free Consultation
              </h3>
              <p className="mb-4 text-xs text-gray-500 dark:text-gray-400 leading-relaxed">
                30-minute strategy session — no commitment, no pressure
              </p>

              <p className="mb-2 text-[11px] font-semibold uppercase tracking-wide text-gray-400 dark:text-gray-500">
                What&apos;s covered
              </p>
              <div className="mb-4 space-y-2">
                {CONSULTATION_ITEMS.map((item) => (
                  <div key={item} className="flex items-center gap-2">
                    <span className="text-[10px] text-[#7C3AED]">✦</span>
                    <span className="text-xs text-gray-600 dark:text-gray-300">{item}</span>
                  </div>
                ))}
              </div>

              <button className="flex w-full items-center justify-center gap-2 rounded-xl bg-gradient-to-r from-[#7C3AED] to-[#2563EB] px-4 py-2.5 text-sm font-semibold text-white shadow-md shadow-purple-200 dark:shadow-purple-900/30 transition-all hover:shadow-lg hover:scale-[1.02] active:scale-95">
                Schedule a Call
                <ArrowRight size={14} />
              </button>
            </div>

            {/* Card 3 — Why Choose CODAND */}
            <div className="rounded-2xl border border-gray-100 dark:border-gray-700 bg-white dark:bg-gray-800 p-5 shadow-sm">
              <h3 className="mb-3 font-semibold text-gray-900 dark:text-white">
                Why Choose CODAND
              </h3>
              <div className="space-y-2.5">
                {WHY_ITEMS.map((item) => (
                  <div key={item} className="flex items-start gap-2.5">
                    <div className="mt-0.5 flex h-4 w-4 flex-shrink-0 items-center justify-center rounded-full bg-green-100 dark:bg-green-900/30">
                      <Check size={9} className="text-green-600 dark:text-green-400" />
                    </div>
                    <span className="text-xs text-gray-600 dark:text-gray-300 leading-relaxed">
                      {item}
                    </span>
                  </div>
                ))}
              </div>
            </div>
          </div>
          {/* ══ END RIGHT ══ */}
        </div>
      </div>

      {/* ── Bottom CTA Banner ── */}
      <div className="mx-6 mb-10 md:mx-10 lg:mx-16 overflow-hidden rounded-2xl bg-gradient-to-r from-[#7C3AED] to-[#2563EB] p-8 text-center shadow-lg shadow-purple-200/50 dark:shadow-purple-900/30">
        <h2 className="mb-2 text-xl font-bold text-white">
          Prefer to talk directly?
        </h2>
        <p className="mx-auto mb-6 max-w-md text-sm text-white/80 leading-relaxed">
          Schedule a free 30-minute consultation and let&apos;s discuss your project
          in detail.
        </p>
        <button className="inline-flex items-center gap-2 rounded-xl bg-white px-6 py-3 text-sm font-semibold text-[#7C3AED] shadow-md transition-all hover:shadow-lg hover:scale-[1.02] active:scale-95">
          Book Free Consultation
          <ArrowRight size={15} />
        </button>
      </div>
    </div>
  );
}
