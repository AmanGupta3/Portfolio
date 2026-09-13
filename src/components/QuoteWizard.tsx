"use client";

import { useState, useRef, useCallback, DragEvent, ChangeEvent } from "react";
import {
  Check,
  Globe,
  Smartphone,
  Monitor,
  Layers,
  Brain,
  Settings,
  Upload,
  X,
  CheckCircle2,
  Mail,
  Calendar,
} from "lucide-react";

// ── Types ─────────────────────────────────────────────────────────────────────

interface FormData {
  name: string;
  email: string;
  company: string;
  phone: string;
  projectType: string;
  budget: string;
  timeline: string;
  techStack: string[];
  requirements: string[];
  files: File[];
  description: string;
}

// ── Constants ─────────────────────────────────────────────────────────────────

const INITIAL_FORM: FormData = {
  name: "",
  email: "",
  company: "",
  phone: "",
  projectType: "",
  budget: "",
  timeline: "",
  techStack: [],
  requirements: [],
  files: [],
  description: "",
};

const PROJECT_TYPES = [
  { id: "web", label: "Web Application", icon: Globe },
  { id: "mobile", label: "Mobile App", icon: Smartphone },
  { id: "desktop", label: "Desktop Application", icon: Monitor },
  { id: "fullstack", label: "Full-Stack Solution", icon: Layers },
  { id: "ai", label: "AI / ML Project", icon: Brain },
  { id: "enterprise", label: "Custom Enterprise", icon: Settings },
];

const BUDGETS = [
  { id: "5k-15k", label: "$5k – $15k", sub: "Small project" },
  { id: "15k-35k", label: "$15k – $35k", sub: "Medium project" },
  { id: "35k-75k", label: "$35k – $75k", sub: "Large project" },
  { id: "75k+", label: "$75k+", sub: "Enterprise" },
];

const TIMELINES = [
  { id: "1-2m", label: "1–2 Months" },
  { id: "3-4m", label: "3–4 Months" },
  { id: "5-6m", label: "5–6 Months" },
  { id: "6+m", label: "6+ Months" },
];

const TECH_STACK_OPTIONS = [
  "React", "Next.js", "Node.js", "Python", "React Native", "Flutter",
  "Swift", "Kotlin", "AWS", "Firebase", "PostgreSQL", "MongoDB",
  "Docker", "TypeScript", "GraphQL", "AI/ML", "No Preference",
];

const REQUIREMENT_OPTIONS = [
  "UI/UX Design", "API Development",
  "Database Design", "Cloud Hosting",
  "Mobile Responsive", "SEO Optimization",
  "Payment Integration", "User Authentication",
  "Admin Panel", "Real-time Features",
  "Third-party APIs", "Performance Optimization",
];

const STEP_LABELS = ["Your Info", "Project Details", "Requirements", "Confirm"];

// ── Helpers ───────────────────────────────────────────────────────────────────

function formatFileSize(bytes: number): string {
  if (bytes < 1024) return `${bytes} B`;
  if (bytes < 1024 * 1024) return `${(bytes / 1024).toFixed(1)} KB`;
  return `${(bytes / (1024 * 1024)).toFixed(1)} MB`;
}

function validateEmail(email: string): boolean {
  return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email);
}

// ── Step Indicator ────────────────────────────────────────────────────────────

function StepIndicator({ current }: { current: number }) {
  return (
    <div className="flex items-start justify-between mb-8">
      {STEP_LABELS.map((label, i) => {
        const stepNum = i + 1;
        const isCompleted = current > stepNum;
        const isActive = current === stepNum;

        return (
          <div key={label} className="flex flex-1 items-start">
            {/* Circle + label */}
            <div className="flex flex-col items-center gap-1.5 flex-shrink-0">
              <div
                className={[
                  "flex h-9 w-9 items-center justify-center rounded-full text-sm font-bold transition-all duration-300",
                  isCompleted || isActive
                    ? "bg-[#7C3AED] text-white shadow-md shadow-purple-200 dark:shadow-purple-900/40"
                    : "border-2 border-gray-300 dark:border-gray-600 text-gray-400 dark:text-gray-500 bg-white dark:bg-gray-800",
                ].join(" ")}
              >
                {isCompleted ? <Check size={15} /> : stepNum}
              </div>
              <span
                className={[
                  "w-14 text-[10px] font-medium text-center leading-tight sm:w-auto sm:whitespace-nowrap",
                  isActive
                    ? "text-[#7C3AED] dark:text-[#A78BFA]"
                    : isCompleted
                    ? "text-[#7C3AED] dark:text-[#A78BFA]"
                    : "text-gray-400 dark:text-gray-500",
                ].join(" ")}
              >
                {label}
              </span>
            </div>

            {/* Progress line (not after last step) */}
            {i < STEP_LABELS.length - 1 && (
              <div className="flex-1 h-0.5 mx-2 mt-4 rounded-full bg-gray-200 dark:bg-gray-700 overflow-hidden">
                <div
                  className="h-full bg-[#7C3AED] transition-all duration-500"
                  style={{
                    width:
                      current > stepNum ? "100%" : current === stepNum ? "50%" : "0%",
                  }}
                />
              </div>
            )}
          </div>
        );
      })}
    </div>
  );
}

// ── Summary Section ───────────────────────────────────────────────────────────

function SummarySection({
  title,
  onEdit,
  items,
}: {
  title: string;
  onEdit: () => void;
  items: [string, string][];
}) {
  return (
    <div className="rounded-xl border border-gray-100 dark:border-gray-700 p-4">
      <div className="mb-3 flex items-center justify-between">
        <h4 className="text-sm font-semibold text-gray-700 dark:text-gray-300">{title}</h4>
        <button
          onClick={onEdit}
          className="text-xs text-[#7C3AED] hover:underline transition-colors"
        >
          Edit
        </button>
      </div>
      <div className="space-y-2">
        {items.map(([label, value]) => (
          <div key={label} className="flex items-baseline gap-2">
            <span className="w-16 flex-shrink-0 text-[11px] text-gray-400 dark:text-gray-500">
              {label}
            </span>
            <span className="text-xs font-medium text-gray-700 dark:text-gray-200">{value}</span>
          </div>
        ))}
      </div>
    </div>
  );
}

// ── Main Component ────────────────────────────────────────────────────────────

export default function QuoteWizard() {
  const [step, setStep] = useState(1);
  const [formData, setFormData] = useState<FormData>(INITIAL_FORM);
  const [errors, setErrors] = useState<Record<string, string>>({});
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isSuccess, setIsSuccess] = useState(false);
  const [descExpanded, setDescExpanded] = useState(false);
  const [isDragging, setIsDragging] = useState(false);
  const fileInputRef = useRef<HTMLInputElement>(null);

  // ── Field helpers ────────────────────────────────────────────────────────────

  const updateField = <K extends keyof FormData>(key: K, value: FormData[K]) => {
    setFormData((prev) => ({ ...prev, [key]: value }));
    if (errors[key]) setErrors((prev) => ({ ...prev, [key]: "" }));
  };

  const toggleArray = (key: "techStack" | "requirements", value: string) => {
    setFormData((prev) => ({
      ...prev,
      [key]: prev[key].includes(value)
        ? prev[key].filter((v) => v !== value)
        : [...prev[key], value],
    }));
  };

  // ── File upload ──────────────────────────────────────────────────────────────

  const addFiles = useCallback((newFiles: FileList | null) => {
    if (!newFiles) return;
    const allowed = ["pdf", "png", "jpg", "jpeg", "doc", "docx"];
    const valid = Array.from(newFiles).filter((f) => {
      const ext = f.name.split(".").pop()?.toLowerCase() ?? "";
      return allowed.includes(ext) && f.size <= 10 * 1024 * 1024;
    });
    setFormData((prev) => ({ ...prev, files: [...prev.files, ...valid] }));
  }, []);

  const removeFile = (index: number) => {
    setFormData((prev) => ({
      ...prev,
      files: prev.files.filter((_, i) => i !== index),
    }));
  };

  const handleDrop = (e: DragEvent<HTMLDivElement>) => {
    e.preventDefault();
    setIsDragging(false);
    addFiles(e.dataTransfer.files);
  };

  // ── Validation ───────────────────────────────────────────────────────────────

  const validateStep = (s: number): boolean => {
    const errs: Record<string, string> = {};
    if (s === 1) {
      if (!formData.name.trim() || formData.name.trim().length < 2)
        errs.name = "Name must be at least 2 characters";
      if (!formData.email.trim() || !validateEmail(formData.email))
        errs.email = "Enter a valid email address";
    }
    if (s === 2) {
      if (!formData.projectType) errs.projectType = "Please select a project type";
      if (!formData.budget) errs.budget = "Please select a budget range";
      if (!formData.timeline) errs.timeline = "Please select a timeline";
    }
    if (s === 3) {
      if (!formData.description.trim() || formData.description.trim().length < 50)
        errs.description = "Please provide at least 50 characters";
    }
    setErrors(errs);
    return Object.keys(errs).length === 0;
  };

  const handleNext = () => {
    if (validateStep(step)) setStep((s) => Math.min(s + 1, 4));
  };

  const handleBack = () => {
    setErrors({});
    setStep((s) => Math.max(s - 1, 1));
  };

  const handleSubmit = () => {
    setIsSubmitting(true);
    setTimeout(() => {
      setIsSubmitting(false);
      setIsSuccess(true);
    }, 1500);
  };

  // ── Input class helpers ──────────────────────────────────────────────────────

  const inputClass = (hasError: boolean) =>
    [
      "w-full rounded-xl border px-4 py-3 text-sm outline-none transition-colors",
      "bg-white dark:bg-gray-700 text-gray-900 dark:text-white",
      "placeholder:text-gray-400 dark:placeholder:text-gray-500",
      hasError
        ? "border-red-400 dark:border-red-500 focus:border-red-400"
        : "border-gray-200 dark:border-gray-600 focus:border-[#7C3AED]",
    ].join(" ");

  // ── SUCCESS STATE ─────────────────────────────────────────────────────────────

  if (isSuccess) {
    return (
      <div className="rounded-2xl border border-gray-100 dark:border-gray-700 bg-white dark:bg-gray-800 p-8 text-center shadow-sm">
        {/* Animated checkmark */}
        <div className="mx-auto mb-6 flex h-20 w-20 items-center justify-center rounded-full bg-[#7C3AED]/10 border-4 border-[#7C3AED]">
          <CheckCircle2 size={40} className="text-[#7C3AED]" />
        </div>

        <h2 className="mb-3 text-2xl font-bold text-gray-900 dark:text-white">
          We&apos;ve received your request!
        </h2>
        <p className="mx-auto mb-8 max-w-md text-sm text-gray-500 dark:text-gray-400 leading-relaxed">
          Our team will review your project details and get back to you within 24 hours
          with a detailed quote.
        </p>

        {/* Action cards */}
        <div className="mb-8 grid grid-cols-1 gap-4 sm:grid-cols-2 text-left">
          <div className="rounded-xl border border-gray-100 dark:border-gray-700 bg-gray-50 dark:bg-gray-700/50 p-4">
            <div className="mb-2 flex h-9 w-9 items-center justify-center rounded-lg bg-[#7C3AED]/10">
              <Mail size={18} className="text-[#7C3AED]" />
            </div>
            <p className="mb-1 font-semibold text-gray-900 dark:text-white text-sm">
              Check your email
            </p>
            <p className="text-xs text-gray-500 dark:text-gray-400 leading-relaxed">
              We&apos;ve sent a confirmation to{" "}
              <span className="font-medium text-[#7C3AED]">{formData.email}</span>
            </p>
          </div>

          <div className="rounded-xl border border-gray-100 dark:border-gray-700 bg-gray-50 dark:bg-gray-700/50 p-4">
            <div className="mb-2 flex h-9 w-9 items-center justify-center rounded-lg bg-[#7C3AED]/10">
              <Calendar size={18} className="text-[#7C3AED]" />
            </div>
            <p className="mb-1 font-semibold text-gray-900 dark:text-white text-sm">
              Want to talk sooner?
            </p>
            <p className="mb-3 text-xs text-gray-500 dark:text-gray-400">
              Book a free 30-min consultation call
            </p>
            <button className="rounded-lg border border-[#7C3AED] px-3 py-1.5 text-xs font-semibold text-[#7C3AED] hover:bg-[#7C3AED] hover:text-white transition-colors">
              Schedule Now →
            </button>
          </div>
        </div>

        <button
          onClick={() => {
            setIsSuccess(false);
            setStep(1);
            setFormData(INITIAL_FORM);
          }}
          className="text-sm text-gray-400 hover:text-[#7C3AED] transition-colors"
        >
          Submit another request
        </button>
      </div>
    );
  }

  // ── WIZARD ────────────────────────────────────────────────────────────────────

  return (
    <div className="rounded-2xl border border-gray-100 dark:border-gray-700 bg-white dark:bg-gray-800 p-6 md:p-8 shadow-sm">
      <StepIndicator current={step} />

      {/* ══ STEP 1 — YOUR INFO ══════════════════════════════════════════════════ */}
      {step === 1 && (
        <div>
          <h2 className="mb-1 text-xl font-bold text-gray-900 dark:text-white">
            Let&apos;s start with the basics
          </h2>
          <p className="mb-6 text-sm text-gray-500 dark:text-gray-400">Tell us who you are</p>

          <div className="space-y-4">
            {/* Full Name */}
            <div>
              <label className="mb-1.5 block text-sm font-medium text-gray-700 dark:text-gray-300">
                Full Name <span className="text-red-400">*</span>
              </label>
              <input
                type="text"
                value={formData.name}
                onChange={(e) => updateField("name", e.target.value)}
                placeholder="John Smith"
                className={inputClass(!!errors.name)}
              />
              {errors.name && (
                <p className="mt-1 text-xs text-red-400">{errors.name}</p>
              )}
            </div>

            {/* Email */}
            <div>
              <label className="mb-1.5 block text-sm font-medium text-gray-700 dark:text-gray-300">
                Email Address <span className="text-red-400">*</span>
              </label>
              <input
                type="email"
                value={formData.email}
                onChange={(e) => updateField("email", e.target.value)}
                placeholder="john@company.com"
                className={inputClass(!!errors.email)}
              />
              {errors.email && (
                <p className="mt-1 text-xs text-red-400">{errors.email}</p>
              )}
            </div>

            {/* Company */}
            <div>
              <label className="mb-1.5 block text-sm font-medium text-gray-700 dark:text-gray-300">
                Company / Organization{" "}
                <span className="text-xs font-normal text-gray-400">(optional)</span>
              </label>
              <input
                type="text"
                value={formData.company}
                onChange={(e) => updateField("company", e.target.value)}
                placeholder="ACME Inc."
                className={inputClass(false)}
              />
            </div>

            {/* Phone */}
            <div>
              <label className="mb-1.5 block text-sm font-medium text-gray-700 dark:text-gray-300">
                Phone Number{" "}
                <span className="text-xs font-normal text-gray-400">(optional)</span>
              </label>
              <div className="flex gap-2">
                <div className="flex items-center rounded-xl border border-gray-200 dark:border-gray-600 bg-gray-50 dark:bg-gray-700 px-3 text-sm text-gray-500 dark:text-gray-400 select-none flex-shrink-0">
                  +91
                </div>
                <input
                  type="tel"
                  value={formData.phone}
                  onChange={(e) => updateField("phone", e.target.value)}
                  placeholder="98765 43210"
                  className={inputClass(false)}
                />
              </div>
            </div>
          </div>

          <div className="mt-8">
            <button
              onClick={handleNext}
              className="flex w-full items-center justify-center gap-2 rounded-xl bg-gradient-to-r from-[#7C3AED] to-[#2563EB] px-6 py-3.5 text-sm font-semibold text-white shadow-md shadow-purple-200 dark:shadow-purple-900/30 transition-all hover:shadow-lg hover:scale-[1.01] active:scale-95"
            >
              Next Step →
            </button>
          </div>
        </div>
      )}

      {/* ══ STEP 2 — PROJECT DETAILS ════════════════════════════════════════════ */}
      {step === 2 && (
        <div>
          <h2 className="mb-1 text-xl font-bold text-gray-900 dark:text-white">
            Tell us about your project
          </h2>
          <p className="mb-6 text-sm text-gray-500 dark:text-gray-400">
            Help us understand what you want to build
          </p>

          {/* Project Type */}
          <div className="mb-6">
            <label className="mb-3 block text-sm font-semibold text-gray-700 dark:text-gray-300">
              Project Type <span className="text-red-400">*</span>
            </label>
            <div className="grid grid-cols-2 gap-3 sm:grid-cols-3">
              {PROJECT_TYPES.map(({ id, label, icon: Icon }) => (
                <button
                  key={id}
                  onClick={() => updateField("projectType", id)}
                  className={[
                    "flex flex-col items-center gap-2 rounded-xl border-2 p-4 text-center transition-all duration-200",
                    formData.projectType === id
                      ? "border-[#7C3AED] bg-[#7C3AED]/5 dark:bg-[#7C3AED]/10"
                      : "border-gray-200 dark:border-gray-600 hover:border-[#7C3AED]/50 hover:bg-gray-50 dark:hover:bg-gray-700/50",
                  ].join(" ")}
                >
                  <Icon
                    size={22}
                    className={
                      formData.projectType === id
                        ? "text-[#7C3AED]"
                        : "text-gray-400 dark:text-gray-500"
                    }
                  />
                  <span
                    className={[
                      "text-xs font-medium leading-tight",
                      formData.projectType === id
                        ? "text-[#7C3AED]"
                        : "text-gray-600 dark:text-gray-300",
                    ].join(" ")}
                  >
                    {label}
                  </span>
                </button>
              ))}
            </div>
            {errors.projectType && (
              <p className="mt-2 text-xs text-red-400">{errors.projectType}</p>
            )}
          </div>

          {/* Budget Range */}
          <div className="mb-6">
            <label className="mb-3 block text-sm font-semibold text-gray-700 dark:text-gray-300">
              Budget Range <span className="text-red-400">*</span>
            </label>
            <div className="grid grid-cols-2 gap-2.5 sm:grid-cols-4">
              {BUDGETS.map(({ id, label, sub }) => (
                <button
                  key={id}
                  onClick={() => updateField("budget", id)}
                  className={[
                    "rounded-xl border-2 p-3 text-left transition-all duration-200",
                    formData.budget === id
                      ? "border-[#7C3AED] bg-[#7C3AED]/5 dark:bg-[#7C3AED]/10"
                      : "border-gray-200 dark:border-gray-600 hover:border-[#7C3AED]/50 hover:bg-gray-50 dark:hover:bg-gray-700/50",
                  ].join(" ")}
                >
                  <p
                    className={[
                      "text-xs font-bold",
                      formData.budget === id
                        ? "text-[#7C3AED]"
                        : "text-gray-700 dark:text-gray-200",
                    ].join(" ")}
                  >
                    {label}
                  </p>
                  <p className="text-[11px] text-gray-400 dark:text-gray-500 mt-0.5">{sub}</p>
                </button>
              ))}
            </div>
            {errors.budget && (
              <p className="mt-2 text-xs text-red-400">{errors.budget}</p>
            )}
          </div>

          {/* Timeline */}
          <div className="mb-6">
            <label className="mb-3 block text-sm font-semibold text-gray-700 dark:text-gray-300">
              Timeline <span className="text-red-400">*</span>
            </label>
            <div className="grid grid-cols-2 gap-2.5 sm:grid-cols-4">
              {TIMELINES.map(({ id, label }) => (
                <button
                  key={id}
                  onClick={() => updateField("timeline", id)}
                  className={[
                    "rounded-xl border-2 px-3 py-3 text-center text-xs font-semibold transition-all duration-200",
                    formData.timeline === id
                      ? "border-[#7C3AED] bg-[#7C3AED]/5 dark:bg-[#7C3AED]/10 text-[#7C3AED]"
                      : "border-gray-200 dark:border-gray-600 text-gray-600 dark:text-gray-300 hover:border-[#7C3AED]/50 hover:bg-gray-50 dark:hover:bg-gray-700/50",
                  ].join(" ")}
                >
                  {label}
                </button>
              ))}
            </div>
            {errors.timeline && (
              <p className="mt-2 text-xs text-red-400">{errors.timeline}</p>
            )}
          </div>

          {/* Navigation */}
          <div className="mt-8 flex gap-3">
            <button
              onClick={handleBack}
              className="flex flex-1 items-center justify-center rounded-xl border-2 border-gray-200 dark:border-gray-600 px-6 py-3.5 text-sm font-semibold text-gray-600 dark:text-gray-300 transition-all hover:border-[#7C3AED] hover:text-[#7C3AED]"
            >
              ← Back
            </button>
            <button
              onClick={handleNext}
              className="flex flex-[2] items-center justify-center rounded-xl bg-gradient-to-r from-[#7C3AED] to-[#2563EB] px-6 py-3.5 text-sm font-semibold text-white shadow-md shadow-purple-200 dark:shadow-purple-900/30 transition-all hover:shadow-lg hover:scale-[1.01] active:scale-95"
            >
              Next Step →
            </button>
          </div>
        </div>
      )}

      {/* ══ STEP 3 — REQUIREMENTS ═══════════════════════════════════════════════ */}
      {step === 3 && (
        <div>
          <h2 className="mb-1 text-xl font-bold text-gray-900 dark:text-white">
            Almost there!
          </h2>
          <p className="mb-6 text-sm text-gray-500 dark:text-gray-400">
            A few more details to give you the best quote
          </p>

          {/* Tech Stack Preferences */}
          <div className="mb-6">
            <label className="mb-3 block text-sm font-semibold text-gray-700 dark:text-gray-300">
              Tech Stack Preferences
            </label>
            <div className="flex flex-wrap gap-2">
              {TECH_STACK_OPTIONS.map((tech) => {
                const selected = formData.techStack.includes(tech);
                return (
                  <button
                    key={tech}
                    onClick={() => toggleArray("techStack", tech)}
                    className={[
                      "rounded-full px-3 py-1.5 text-xs font-medium transition-all duration-200",
                      selected
                        ? "bg-[#7C3AED] text-white shadow-sm"
                        : "bg-gray-100 dark:bg-gray-700 text-gray-600 dark:text-gray-300 hover:bg-[#EDE9FE] dark:hover:bg-[#7C3AED]/20 hover:text-[#7C3AED]",
                    ].join(" ")}
                  >
                    {tech}
                  </button>
                );
              })}
            </div>
          </div>

          {/* Additional Requirements */}
          <div className="mb-6">
            <label className="mb-3 block text-sm font-semibold text-gray-700 dark:text-gray-300">
              Additional Requirements
            </label>
            <div className="grid grid-cols-1 gap-2 sm:grid-cols-2">
              {REQUIREMENT_OPTIONS.map((req) => {
                const checked = formData.requirements.includes(req);
                return (
                  <button
                    key={req}
                    onClick={() => toggleArray("requirements", req)}
                    className={[
                      "flex items-center gap-2.5 rounded-xl border px-3 py-2.5 text-left text-xs font-medium transition-all duration-200",
                      checked
                        ? "border-[#7C3AED] bg-[#7C3AED]/5 dark:bg-[#7C3AED]/10 text-[#7C3AED]"
                        : "border-gray-200 dark:border-gray-600 text-gray-600 dark:text-gray-300 hover:border-[#7C3AED]/50 hover:bg-gray-50 dark:hover:bg-gray-700/50",
                    ].join(" ")}
                  >
                    <div
                      className={[
                        "flex h-4 w-4 flex-shrink-0 items-center justify-center rounded border transition-colors",
                        checked
                          ? "border-[#7C3AED] bg-[#7C3AED]"
                          : "border-gray-300 dark:border-gray-500 bg-white dark:bg-gray-700",
                      ].join(" ")}
                    >
                      {checked && <Check size={10} className="text-white" />}
                    </div>
                    {req}
                  </button>
                );
              })}
            </div>
          </div>

          {/* File Upload */}
          <div className="mb-6">
            <label className="mb-3 block text-sm font-semibold text-gray-700 dark:text-gray-300">
              Attach Files
            </label>
            <div
              onDragOver={(e: DragEvent<HTMLDivElement>) => {
                e.preventDefault();
                setIsDragging(true);
              }}
              onDragLeave={() => setIsDragging(false)}
              onDrop={handleDrop}
              onClick={() => fileInputRef.current?.click()}
              className={[
                "cursor-pointer rounded-xl border-2 border-dashed p-6 text-center transition-all duration-200",
                isDragging
                  ? "border-[#7C3AED] bg-[#7C3AED]/5"
                  : "border-gray-200 dark:border-gray-600 hover:border-[#7C3AED]/60 hover:bg-gray-50 dark:hover:bg-gray-700/30",
              ].join(" ")}
            >
              <Upload
                size={24}
                className="mx-auto mb-2 text-gray-400 dark:text-gray-500"
              />
              <p className="text-sm font-medium text-gray-600 dark:text-gray-300">
                Drag &amp; drop your files here or{" "}
                <span className="text-[#7C3AED]">click to browse</span>
              </p>
              <p className="mt-1 text-xs text-gray-400 dark:text-gray-500">
                Attach wireframes, docs, references (PDF, PNG, JPG — max 10MB each)
              </p>
            </div>
            <input
              ref={fileInputRef}
              type="file"
              multiple
              accept=".pdf,.png,.jpg,.jpeg,.doc,.docx"
              className="hidden"
              onChange={(e: ChangeEvent<HTMLInputElement>) => addFiles(e.target.files)}
            />
            {formData.files.length > 0 && (
              <div className="mt-3 space-y-2">
                {formData.files.map((file, i) => (
                  <div
                    key={i}
                    className="flex items-center justify-between rounded-lg border border-gray-100 dark:border-gray-700 bg-gray-50 dark:bg-gray-700/50 px-3 py-2"
                  >
                    <div>
                      <p className="text-xs font-medium text-gray-700 dark:text-gray-200">
                        {file.name}
                      </p>
                      <p className="text-[10px] text-gray-400 dark:text-gray-500">
                        {formatFileSize(file.size)}
                      </p>
                    </div>
                    <button
                      onClick={(e) => {
                        e.stopPropagation();
                        removeFile(i);
                      }}
                      className="rounded-md p-1 text-gray-400 hover:text-red-400 transition-colors"
                    >
                      <X size={14} />
                    </button>
                  </div>
                ))}
              </div>
            )}
          </div>

          {/* Project Description */}
          <div className="mb-6">
            <label className="mb-1.5 flex items-center justify-between text-sm font-semibold text-gray-700 dark:text-gray-300">
              <span>
                Project Description <span className="text-red-400">*</span>
              </span>
              <span
                className={[
                  "text-xs font-normal",
                  formData.description.length >= 50
                    ? "text-green-500"
                    : "text-gray-400 dark:text-gray-500",
                ].join(" ")}
              >
                {formData.description.length} / 50 min
              </span>
            </label>
            <textarea
              value={formData.description}
              onChange={(e) => updateField("description", e.target.value)}
              placeholder="Describe your project in detail — what problem does it solve, who are the users, what are the key features you need?"
              rows={5}
              className={[
                "w-full resize-none rounded-xl border px-4 py-3 text-sm outline-none transition-colors",
                "bg-white dark:bg-gray-700 text-gray-900 dark:text-white",
                "placeholder:text-gray-400 dark:placeholder:text-gray-500",
                errors.description
                  ? "border-red-400 dark:border-red-500"
                  : "border-gray-200 dark:border-gray-600 focus:border-[#7C3AED]",
              ].join(" ")}
            />
            {errors.description && (
              <p className="mt-1 text-xs text-red-400">{errors.description}</p>
            )}
          </div>

          {/* Navigation */}
          <div className="flex gap-3">
            <button
              onClick={handleBack}
              className="flex flex-1 items-center justify-center rounded-xl border-2 border-gray-200 dark:border-gray-600 px-6 py-3.5 text-sm font-semibold text-gray-600 dark:text-gray-300 transition-all hover:border-[#7C3AED] hover:text-[#7C3AED]"
            >
              ← Back
            </button>
            <button
              onClick={handleNext}
              className="flex flex-[2] items-center justify-center rounded-xl bg-gradient-to-r from-[#7C3AED] to-[#2563EB] px-6 py-3.5 text-sm font-semibold text-white shadow-md shadow-purple-200 dark:shadow-purple-900/30 transition-all hover:shadow-lg hover:scale-[1.01] active:scale-95"
            >
              Review &amp; Submit →
            </button>
          </div>
        </div>
      )}

      {/* ══ STEP 4 — CONFIRM ════════════════════════════════════════════════════ */}
      {step === 4 && (
        <div>
          <h2 className="mb-1 text-xl font-bold text-gray-900 dark:text-white">
            Review your details
          </h2>
          <p className="mb-6 text-sm text-gray-500 dark:text-gray-400">
            Everything look good? Submit and we&apos;ll be in touch within 24 hours.
          </p>

          <div className="space-y-3">
            {/* Personal Info */}
            <SummarySection
              title="Personal Info"
              onEdit={() => setStep(1)}
              items={[
                ["Name", formData.name],
                ["Email", formData.email],
                ...(formData.company
                  ? ([["Company", formData.company]] as [string, string][])
                  : []),
                ...(formData.phone
                  ? ([["Phone", `+91 ${formData.phone}`]] as [string, string][])
                  : []),
              ]}
            />

            {/* Project */}
            <SummarySection
              title="Project"
              onEdit={() => setStep(2)}
              items={[
                [
                  "Type",
                  PROJECT_TYPES.find((p) => p.id === formData.projectType)?.label ?? "—",
                ],
                ["Budget", BUDGETS.find((b) => b.id === formData.budget)?.label ?? "—"],
                [
                  "Timeline",
                  TIMELINES.find((t) => t.id === formData.timeline)?.label ?? "—",
                ],
              ]}
            />

            {/* Requirements */}
            {(formData.techStack.length > 0 || formData.requirements.length > 0) && (
              <div className="rounded-xl border border-gray-100 dark:border-gray-700 p-4">
                <div className="mb-3 flex items-center justify-between">
                  <h4 className="text-sm font-semibold text-gray-700 dark:text-gray-300">
                    Requirements
                  </h4>
                  <button
                    onClick={() => setStep(3)}
                    className="text-xs text-[#7C3AED] hover:underline"
                  >
                    Edit
                  </button>
                </div>
                {formData.techStack.length > 0 && (
                  <div className="mb-3">
                    <p className="text-[11px] text-gray-400 dark:text-gray-500 mb-1.5">
                      Tech Stack
                    </p>
                    <div className="flex flex-wrap gap-1.5">
                      {formData.techStack.map((t) => (
                        <span
                          key={t}
                          className="rounded-full bg-[#7C3AED]/10 px-2 py-0.5 text-[11px] font-medium text-[#7C3AED]"
                        >
                          {t}
                        </span>
                      ))}
                    </div>
                  </div>
                )}
                {formData.requirements.length > 0 && (
                  <div>
                    <p className="text-[11px] text-gray-400 dark:text-gray-500 mb-1.5">
                      Additional
                    </p>
                    <div className="flex flex-wrap gap-1.5">
                      {formData.requirements.map((r) => (
                        <span
                          key={r}
                          className="rounded-full bg-gray-100 dark:bg-gray-700 px-2 py-0.5 text-[11px] font-medium text-gray-600 dark:text-gray-300"
                        >
                          {r}
                        </span>
                      ))}
                    </div>
                  </div>
                )}
              </div>
            )}

            {/* Description */}
            <div className="rounded-xl border border-gray-100 dark:border-gray-700 p-4">
              <div className="mb-3 flex items-center justify-between">
                <h4 className="text-sm font-semibold text-gray-700 dark:text-gray-300">
                  Description
                </h4>
                <button
                  onClick={() => setStep(3)}
                  className="text-xs text-[#7C3AED] hover:underline"
                >
                  Edit
                </button>
              </div>
              <p
                className={[
                  "text-xs text-gray-600 dark:text-gray-400 leading-relaxed",
                  !descExpanded ? "line-clamp-3" : "",
                ].join(" ")}
              >
                {formData.description}
              </p>
              {formData.description.length > 150 && (
                <button
                  onClick={() => setDescExpanded((v) => !v)}
                  className="mt-1 text-[11px] text-[#7C3AED] hover:underline"
                >
                  {descExpanded ? "Show less" : "Show more"}
                </button>
              )}
            </div>

            {/* Files */}
            {formData.files.length > 0 && (
              <div className="rounded-xl border border-gray-100 dark:border-gray-700 p-4">
                <div className="mb-3 flex items-center justify-between">
                  <h4 className="text-sm font-semibold text-gray-700 dark:text-gray-300">
                    Attached Files
                  </h4>
                  <button
                    onClick={() => setStep(3)}
                    className="text-xs text-[#7C3AED] hover:underline"
                  >
                    Edit
                  </button>
                </div>
                <div className="space-y-1">
                  {formData.files.map((f, i) => (
                    <p key={i} className="text-xs text-gray-500 dark:text-gray-400">
                      {f.name}{" "}
                      <span className="text-gray-400">({formatFileSize(f.size)})</span>
                    </p>
                  ))}
                </div>
              </div>
            )}
          </div>

          {/* Terms */}
          <p className="mt-5 text-center text-[11px] text-gray-400 dark:text-gray-500 leading-relaxed">
            By submitting you agree to our{" "}
            <span className="cursor-pointer text-[#7C3AED] hover:underline">
              Privacy Policy
            </span>{" "}
            and{" "}
            <span className="cursor-pointer text-[#7C3AED] hover:underline">
              Terms of Service
            </span>
            . Your information is kept confidential.
          </p>

          {/* Navigation */}
          <div className="mt-6 flex gap-3">
            <button
              onClick={handleBack}
              className="flex flex-1 items-center justify-center rounded-xl border-2 border-gray-200 dark:border-gray-600 px-6 py-3.5 text-sm font-semibold text-gray-600 dark:text-gray-300 transition-all hover:border-[#7C3AED] hover:text-[#7C3AED]"
            >
              ← Back
            </button>
            <button
              onClick={handleSubmit}
              disabled={isSubmitting}
              className="flex flex-[2] items-center justify-center gap-2 rounded-xl bg-gradient-to-r from-[#7C3AED] to-[#2563EB] px-6 py-3.5 text-sm font-semibold text-white shadow-md shadow-purple-200 dark:shadow-purple-900/30 transition-all hover:shadow-lg hover:scale-[1.01] active:scale-95 disabled:opacity-70 disabled:cursor-not-allowed disabled:scale-100"
            >
              {isSubmitting ? (
                <>
                  <svg
                    className="h-4 w-4 animate-spin"
                    viewBox="0 0 24 24"
                    fill="none"
                  >
                    <circle
                      className="opacity-25"
                      cx="12"
                      cy="12"
                      r="10"
                      stroke="currentColor"
                      strokeWidth="4"
                    />
                    <path
                      className="opacity-75"
                      fill="currentColor"
                      d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4z"
                    />
                  </svg>
                  Sending...
                </>
              ) : (
                "Send My Quote Request"
              )}
            </button>
          </div>
        </div>
      )}
    </div>
  );
}
