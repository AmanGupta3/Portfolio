"use client";

import { useState, useEffect, useMemo, useCallback } from "react";
import Link from "next/link";
import {
  Search, Zap, Sparkles, ArrowRight, CheckCircle2,
  RotateCw, AlertCircle,
} from "lucide-react";
import NewsCard from "@/components/NewsCard";
import type { NewsCardProps } from "@/components/NewsCard";

// ── API types ─────────────────────────────────────────────────
interface DevToUser {
  name: string;
  profile_image: string;
}
interface DevToArticle {
  id: number;
  title: string;
  url: string;
  cover_image: string | null;
  user: DevToUser;
  published_at: string;
  reading_time_minutes: number;
  tag_list: string[];
  positive_reactions_count: number;
  comments_count: number;
}
interface HNItem {
  id: number;
  title: string;
  url: string;
  by: string;
  time: number;
  score: number;
  descendants?: number;
  type: string;
}

// ── Internal article shape ────────────────────────────────────
interface NewsItem extends NewsCardProps {
  id: string;
}

// ── Constants ─────────────────────────────────────────────────
const SOURCE_TABS = ["All", "Dev.to", "Hacker News"] as const;
type SourceTab = (typeof SOURCE_TABS)[number];

const CATEGORIES = [
  "All", "React", "Node.js", "AI", "Mobile",
  "Cloud", "DevOps", "Python", "TypeScript",
] as const;
type Category = (typeof CATEGORIES)[number];

const CATEGORY_TAG_MAP: Record<string, string[]> = {
  "React":      ["react", "reactjs"],
  "Node.js":    ["node", "nodejs"],
  "AI":         ["ai", "machinelearning", "artificialintelligence", "ml", "openai", "llm"],
  "Mobile":     ["mobile", "android", "ios", "flutter", "reactnative"],
  "Cloud":      ["cloud", "aws", "azure", "gcp", "serverless"],
  "DevOps":     ["devops", "docker", "kubernetes", "cicd", "github"],
  "Python":     ["python"],
  "TypeScript": ["typescript", "ts"],
};

// ── Helpers ───────────────────────────────────────────────────
function formatDate(str: string): string {
  return new Date(str).toLocaleDateString("en-US", {
    month: "short", day: "numeric", year: "numeric",
  });
}
function formatUnixDate(ts: number): string {
  return new Date(ts * 1000).toLocaleDateString("en-US", {
    month: "short", day: "numeric", year: "numeric",
  });
}
function formatTime(date: Date): string {
  return date.toLocaleTimeString("en-US", { hour: "2-digit", minute: "2-digit" });
}

// ── Skeleton card ─────────────────────────────────────────────
function SkeletonCard() {
  return (
    <div className="animate-pulse overflow-hidden rounded-2xl border border-gray-100 dark:border-gray-700 bg-white dark:bg-gray-800 shadow-sm">
      <div className="h-48 bg-gray-200 dark:bg-gray-700" />
      <div className="space-y-3 p-5">
        <div className="h-4 w-full rounded-md bg-gray-200 dark:bg-gray-700" />
        <div className="h-4 w-3/4 rounded-md bg-gray-200 dark:bg-gray-700" />
        <div className="flex items-center gap-2 pt-1">
          <div className="h-5 w-5 flex-shrink-0 rounded-full bg-gray-200 dark:bg-gray-700" />
          <div className="h-3 w-24 rounded-md bg-gray-200 dark:bg-gray-700" />
        </div>
        <div className="h-3 w-32 rounded-md bg-gray-200 dark:bg-gray-700" />
        <div className="flex gap-1.5">
          <div className="h-5 w-14 rounded-full bg-gray-200 dark:bg-gray-700" />
          <div className="h-5 w-10 rounded-full bg-gray-200 dark:bg-gray-700" />
          <div className="h-5 w-12 rounded-full bg-gray-200 dark:bg-gray-700" />
        </div>
        <div className="flex gap-4 pt-1">
          <div className="h-3 w-12 rounded-md bg-gray-200 dark:bg-gray-700" />
          <div className="h-3 w-12 rounded-md bg-gray-200 dark:bg-gray-700" />
        </div>
        <div className="h-9 w-full rounded-xl bg-gray-200 dark:bg-gray-700" />
      </div>
    </div>
  );
}

// ── Page ──────────────────────────────────────────────────────
export default function BlogPage() {
  const [articles,     setArticles]     = useState<NewsItem[]>([]);
  const [loading,      setLoading]      = useState(true);
  const [error,        setError]        = useState(false);
  const [activeSource, setActiveSource] = useState<SourceTab>("All");
  const [activeCategory, setActiveCategory] = useState<Category>("All");
  const [query,        setQuery]        = useState("");
  const [lastUpdated,  setLastUpdated]  = useState<Date | null>(null);

  const fetchAll = useCallback(async () => {
    setLoading(true);
    setError(false);

    try {
      // ── Dev.to — 4 parallel tag fetches ───────────────────
      const [webdev, react, node, ai] = await Promise.all([
        fetch("https://dev.to/api/articles?tag=webdev&per_page=12").then(
          (r) => r.json() as Promise<DevToArticle[]>,
        ),
        fetch("https://dev.to/api/articles?tag=react&per_page=6").then(
          (r) => r.json() as Promise<DevToArticle[]>,
        ),
        fetch("https://dev.to/api/articles?tag=node&per_page=6").then(
          (r) => r.json() as Promise<DevToArticle[]>,
        ),
        fetch("https://dev.to/api/articles?tag=ai&per_page=6").then(
          (r) => r.json() as Promise<DevToArticle[]>,
        ),
      ]);

      // Deduplicate by id, sort newest first
      const seen = new Set<number>();
      const uniqueDevTo = [...webdev, ...react, ...node, ...ai]
        .filter((a) => {
          if (seen.has(a.id)) return false;
          seen.add(a.id);
          return true;
        })
        .sort(
          (a, b) =>
            new Date(b.published_at).getTime() -
            new Date(a.published_at).getTime(),
        );

      const devtoItems: NewsItem[] = uniqueDevTo.map((a) => ({
        id:           `devto-${a.id}`,
        title:        a.title,
        author:       a.user.name,
        authorAvatar: a.user.profile_image || undefined,
        date:         formatDate(a.published_at),
        readTime:     `${a.reading_time_minutes} min read`,
        tags:         (a.tag_list ?? []).slice(0, 3),
        url:          a.url,
        source:       "devto" as const,
        coverImage:   a.cover_image ?? undefined,
        score:        a.positive_reactions_count,
        comments:     a.comments_count,
      }));

      // ── Hacker News — top 20 stories ──────────────────────
      const topIds = await fetch(
        "https://hacker-news.firebaseio.com/v0/topstories.json",
      ).then((r) => r.json() as Promise<number[]>);

      const hnRaw: (HNItem | null)[] = await Promise.all(
        topIds.slice(0, 20).map((id) =>
          fetch(`https://hacker-news.firebaseio.com/v0/item/${id}.json`)
            .then((r): Promise<HNItem> => r.json())
            .catch((): null => null),
        ),
      );

      const hnItems: NewsItem[] = hnRaw
        .filter(
          (item): item is HNItem =>
            item !== null &&
            item.type === "story" &&
            typeof item.url === "string" &&
            item.url.length > 0,
        )
        .map((item) => ({
          id:       `hn-${item.id}`,
          title:    item.title,
          author:   item.by,
          date:     formatUnixDate(item.time),
          tags:     ["Hacker News", "Tech"],
          url:      item.url,
          source:   "hackernews" as const,
          score:    item.score ?? 0,
          comments: item.descendants ?? 0,
        }));

      setArticles([...devtoItems, ...hnItems]);
      setLastUpdated(new Date());
    } catch {
      setError(true);
    } finally {
      setLoading(false);
    }
  }, []);

  useEffect(() => {
    fetchAll();
  }, [fetchAll]);

  // ── Combined filter ──────────────────────────────────────
  const filtered = useMemo(() => {
    return articles.filter((article) => {
      if (activeSource === "Dev.to"       && article.source !== "devto")      return false;
      if (activeSource === "Hacker News"  && article.source !== "hackernews") return false;

      if (activeCategory !== "All" && article.source === "devto") {
        const mapped = CATEGORY_TAG_MAP[activeCategory] ?? [activeCategory.toLowerCase()];
        const matches = article.tags.some((tag) =>
          mapped.some((mt) => tag.toLowerCase().includes(mt)),
        );
        if (!matches) return false;
      }

      if (query.trim()) {
        if (!article.title.toLowerCase().includes(query.toLowerCase().trim()))
          return false;
      }

      return true;
    });
  }, [articles, activeSource, activeCategory, query]);

  const isFiltering =
    activeSource !== "All" || activeCategory !== "All" || query.trim() !== "";

  const clearAll = () => {
    setActiveSource("All");
    setActiveCategory("All");
    setQuery("");
  };

  return (
    <div className="min-h-screen bg-white dark:bg-gray-950 transition-colors duration-300">

      {/* ── Header bar ─────────────────────────────────────── */}
      <div className="border-b border-gray-100 dark:border-gray-800 bg-white dark:bg-gray-900 px-6 py-5 md:px-10">
        <div className="mx-auto flex max-w-6xl items-start justify-between gap-4">
          <div>
            <h1 className="text-2xl font-extrabold tracking-tight text-gray-900 dark:text-white">
              Stay Updated
            </h1>
            <p className="mt-0.5 text-sm text-gray-500 dark:text-gray-400">
              Latest from the dev world — updated in real time
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

        {/* ── Hero text ──────────────────────────────────────── */}
        <div className="animate-fade-in-up mb-10">
          <div className="mb-2 flex items-center gap-2">
            <Sparkles size={15} className="text-[#7C3AED]" />
            <span className="text-xs font-semibold uppercase tracking-widest text-[#7C3AED]">
              Tech news
            </span>
          </div>
          <h2 className="text-3xl font-extrabold tracking-tight text-gray-900 dark:text-white sm:text-4xl">
            Stay Ahead of the Curve
          </h2>
          <p className="mt-3 max-w-2xl text-base leading-relaxed text-gray-500 dark:text-gray-400">
            The dev world moves fast — we pull the best articles from Dev.to and Hacker News
            so you&rsquo;re always in the loop on web development, AI, mobile, cloud and
            software engineering.
            <br className="hidden sm:block" />
            Fresh content, real time, no noise.
          </p>
        </div>

        {/* ── Source tabs ────────────────────────────────────── */}
        <div className="animate-fade-in mb-5 flex flex-wrap gap-2">
          {SOURCE_TABS.map((tab) => (
            <button
              key={tab}
              onClick={() => setActiveSource(tab)}
              className={[
                "rounded-full px-4 py-1.5 text-sm font-semibold transition-all duration-200",
                activeSource === tab
                  ? "bg-[#7C3AED] text-white shadow-sm shadow-purple-200"
                  : "bg-gray-100 dark:bg-gray-800 text-gray-500 dark:text-gray-400 hover:bg-[#EDE9FE] dark:hover:bg-[#7C3AED]/15 hover:text-[#7C3AED] dark:hover:text-[#A78BFA]",
              ].join(" ")}
            >
              {tab}
            </button>
          ))}
        </div>

        {/* ── Category filter pills ──────────────────────────── */}
        <div className="animate-fade-in mb-6 flex flex-wrap gap-2">
          {CATEGORIES.map((cat) => (
            <button
              key={cat}
              onClick={() => setActiveCategory(cat)}
              className={[
                "rounded-full border px-3.5 py-1 text-xs font-semibold transition-all duration-200",
                activeCategory === cat
                  ? "border-[#7C3AED]/40 bg-[#EDE9FE] dark:bg-[#7C3AED]/20 text-[#7C3AED] dark:text-[#A78BFA]"
                  : "border-gray-200 dark:border-gray-700 text-gray-500 dark:text-gray-400 hover:border-[#7C3AED]/40 hover:bg-[#EDE9FE]/50 dark:hover:bg-[#7C3AED]/10 hover:text-[#7C3AED] dark:hover:text-[#A78BFA]",
              ].join(" ")}
            >
              {cat}
            </button>
          ))}

          {isFiltering && (
            <button
              onClick={clearAll}
              className="rounded-full border border-gray-200 dark:border-gray-700 px-3.5 py-1 text-xs font-medium text-gray-400 dark:text-gray-500 transition-all hover:border-gray-300 dark:hover:border-gray-600 hover:text-gray-600 dark:hover:text-gray-300"
            >
              Clear ×
            </button>
          )}
        </div>

        {/* ── Search bar ─────────────────────────────────────── */}
        <div className="animate-fade-in relative mb-8 max-w-xl">
          <Search
            size={16}
            className="pointer-events-none absolute left-4 top-1/2 -translate-y-1/2 text-gray-400"
          />
          <input
            type="text"
            placeholder="Search articles..."
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            className="w-full rounded-xl border border-gray-200 dark:border-gray-700 bg-gray-50 dark:bg-gray-800 py-3 pl-10 pr-4 text-sm text-gray-800 dark:text-gray-100 placeholder-gray-400 dark:placeholder-gray-600 outline-none transition-all focus:border-[#7C3AED] focus:bg-white dark:focus:bg-gray-700 focus:ring-2 focus:ring-[#7C3AED]/15"
          />
        </div>

        {/* Result count */}
        {isFiltering && !loading && (
          <p className="mb-5 text-sm text-gray-400 dark:text-gray-500">
            Showing{" "}
            <span className="font-semibold text-gray-700 dark:text-gray-300">{filtered.length}</span>{" "}
            of {articles.length} articles
          </p>
        )}

        {/* ── Grid: loading / error / empty / cards ──────────── */}
        {loading ? (
          <div className="grid grid-cols-1 gap-5 sm:grid-cols-2 lg:grid-cols-3">
            {Array.from({ length: 9 }).map((_, i) => (
              <SkeletonCard key={i} />
            ))}
          </div>
        ) : error ? (
          <div className="flex flex-col items-center justify-center py-24 text-center">
            <div className="mb-4 flex h-14 w-14 items-center justify-center rounded-2xl bg-red-50 dark:bg-red-900/20">
              <AlertCircle size={24} className="text-red-400" />
            </div>
            <h3 className="text-base font-semibold text-gray-700 dark:text-gray-300">
              Failed to load articles
            </h3>
            <p className="mt-1 text-sm text-gray-400 dark:text-gray-500">
              Check your connection and try again
            </p>
            <button
              onClick={fetchAll}
              className="mt-4 inline-flex items-center gap-2 rounded-xl bg-[#7C3AED] px-5 py-2.5 text-sm font-semibold text-white shadow-sm transition-all hover:bg-[#6D28D9] active:scale-95"
            >
              <RotateCw size={14} />
              Try Again
            </button>
          </div>
        ) : filtered.length === 0 ? (
          <div className="flex flex-col items-center justify-center py-24 text-center">
            <div className="mb-4 flex h-14 w-14 items-center justify-center rounded-2xl bg-gray-100 dark:bg-gray-800">
              <Search size={22} className="text-gray-400" />
            </div>
            <h3 className="text-base font-semibold text-gray-700 dark:text-gray-300">
              No articles found
            </h3>
            <p className="mt-1 text-sm text-gray-400 dark:text-gray-500">
              Try a different search or filter
            </p>
            <button
              onClick={clearAll}
              className="mt-4 inline-flex items-center gap-2 rounded-xl border-2 border-[#7C3AED] px-5 py-2.5 text-sm font-semibold text-[#7C3AED] transition-all hover:bg-[#7C3AED] hover:text-white active:scale-95"
            >
              Clear Filters
            </button>
          </div>
        ) : (
          <div className="grid grid-cols-1 gap-5 sm:grid-cols-2 lg:grid-cols-3">
            {filtered.map((article, i) => {
              const { id, ...cardProps } = article;
              return (
                <div
                  key={id}
                  className="animate-fade-in-up"
                  style={{ animationDelay: `${Math.min(i * 40, 400)}ms` }}
                >
                  <NewsCard {...cardProps} />
                </div>
              );
            })}
          </div>
        )}

        {/* ── Stats bar ──────────────────────────────────────── */}
        {!loading && !error && (
          <div className="mt-12 flex flex-wrap items-center justify-between gap-3 rounded-2xl border border-gray-100 dark:border-gray-700 bg-gray-50 dark:bg-gray-800 px-5 py-4">
            <div className="flex flex-wrap items-center gap-3 text-sm text-gray-500 dark:text-gray-400">
              <span>
                Showing{" "}
                <span className="font-semibold text-gray-700 dark:text-gray-200">{filtered.length}</span>{" "}
                articles
              </span>
              <span className="hidden h-4 w-px bg-gray-200 dark:bg-gray-600 sm:block" />
              {lastUpdated && (
                <span>
                  Last updated:{" "}
                  <span className="font-medium text-gray-700 dark:text-gray-200">
                    {formatTime(lastUpdated)}
                  </span>
                </span>
              )}
              <span className="hidden h-4 w-px bg-gray-200 dark:bg-gray-600 sm:block" />
              <span>
                Sources:{" "}
                <span className="font-medium text-gray-700 dark:text-gray-200">Dev.to + Hacker News</span>
              </span>
            </div>
            <button
              onClick={fetchAll}
              className="flex items-center gap-2 rounded-xl border border-gray-200 dark:border-gray-600 px-4 py-2 text-sm font-medium text-gray-600 dark:text-gray-300 transition-all hover:border-[#7C3AED] hover:bg-[#7C3AED]/5 dark:hover:bg-[#7C3AED]/10 hover:text-[#7C3AED] dark:hover:text-[#A78BFA]"
            >
              <RotateCw size={14} />
              Refresh
            </button>
          </div>
        )}

        {/* ── Bottom CTA ─────────────────────────────────────── */}
        <section className="animate-fade-in-up mt-16 overflow-hidden rounded-3xl bg-gradient-to-r from-[#7C3AED] to-[#2563EB] px-8 py-14 text-center shadow-lg">
          <div className="mb-3 flex items-center justify-center gap-2">
            <Sparkles size={15} className="text-purple-200" />
            <span className="text-xs font-semibold uppercase tracking-widest text-purple-200">
              Let&apos;s build together
            </span>
          </div>
          <h2 className="text-3xl font-extrabold tracking-tight text-white sm:text-4xl">
            Building Something New?
          </h2>
          <p className="mx-auto mt-4 max-w-xl text-base leading-relaxed text-purple-100">
            Turn your next idea into a production-ready application.
            Get a free consultation today.
          </p>
          <div className="mt-8 flex flex-wrap items-center justify-center gap-3">
            <Link
              href="/contact"
              className="inline-flex items-center gap-2 rounded-xl bg-white px-7 py-3 text-sm font-semibold text-[#7C3AED] shadow-md transition-all hover:scale-[1.02] hover:shadow-lg active:scale-95"
            >
              Get Free Quote
              <ArrowRight size={15} />
            </Link>
            <Link
              href="/portfolio"
              className="inline-flex items-center gap-2 rounded-xl border-2 border-white/40 px-7 py-3 text-sm font-semibold text-white transition-all hover:border-white hover:bg-white/10 active:scale-95"
            >
              View Our Work
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
