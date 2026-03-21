import { ArrowRight, Heart, MessageCircle, Clock, ArrowUp } from "lucide-react";

export interface NewsCardProps {
  title: string;
  author: string;
  authorAvatar?: string;
  date: string;
  readTime?: string;
  tags: string[];
  url: string;
  source: "devto" | "hackernews";
  coverImage?: string;
  score: number;
  comments: number;
}

const PLACEHOLDER_GRADIENTS = [
  ["#7C3AED", "#2563EB"],
  ["#2563EB", "#06B6D4"],
  ["#4F46E5", "#7C3AED"],
  ["#0D9488", "#06B6D4"],
  ["#F97316", "#EAB308"],
] as const;

export default function NewsCard({
  title,
  author,
  authorAvatar,
  date,
  readTime,
  tags,
  url,
  source,
  coverImage,
  score,
  comments,
}: NewsCardProps) {
  const [gFrom, gTo] =
    PLACEHOLDER_GRADIENTS[title.charCodeAt(0) % PLACEHOLDER_GRADIENTS.length];

  return (
    <div className="group flex flex-col rounded-2xl border border-gray-100 dark:border-gray-700 bg-white dark:bg-gray-800 shadow-sm overflow-hidden transition-all duration-300 hover:shadow-xl hover:-translate-y-1.5 hover:scale-[1.01] dark:hover:border-gray-600">

      {/* ── Cover image / gradient placeholder ── */}
      <div className="relative h-48 flex-shrink-0 overflow-hidden">
        {coverImage ? (
          /* eslint-disable-next-line @next/next/no-img-element */
          <img
            src={coverImage}
            alt={title}
            className="h-full w-full object-cover transition-transform duration-300 group-hover:scale-105"
          />
        ) : (
          <div
            className="flex h-full w-full items-center justify-center"
            style={{ background: `linear-gradient(135deg, ${gFrom}, ${gTo})` }}
          >
            <span className="select-none text-[80px] font-black leading-none text-white/15">
              {title.charAt(0).toUpperCase()}
            </span>
          </div>
        )}

        {/* Source badge */}
        <div
          className={[
            "absolute left-3 top-3 rounded-full px-3 py-1 text-[11px] font-semibold text-white shadow-sm",
            source === "devto" ? "bg-green-500" : "bg-orange-500",
          ].join(" ")}
        >
          {source === "devto" ? "Dev.to" : "Hacker News"}
        </div>
      </div>

      {/* ── Card body ── */}
      <div className="flex flex-1 flex-col p-5">

        {/* Title */}
        <h3 className="mb-3 line-clamp-2 text-[15px] font-bold leading-snug text-gray-900 dark:text-white">
          {title}
        </h3>

        {/* Author */}
        <div className="mb-2 flex items-center gap-2">
          {authorAvatar ? (
            /* eslint-disable-next-line @next/next/no-img-element */
            <img
              src={authorAvatar}
              alt={author}
              className="h-5 w-5 flex-shrink-0 rounded-full object-cover"
            />
          ) : (
            <div className="flex h-5 w-5 flex-shrink-0 items-center justify-center rounded-full bg-gradient-to-br from-[#7C3AED] to-[#2563EB] text-[9px] font-bold text-white">
              {author.charAt(0).toUpperCase()}
            </div>
          )}
          <span className="truncate text-[12px] font-medium text-gray-600 dark:text-gray-300">{author}</span>
        </div>

        {/* Date + read time */}
        <div className="mb-3 flex items-center gap-1.5 text-[11px] text-gray-400 dark:text-gray-500">
          <Clock size={11} />
          <span>{date}</span>
          {readTime && (
            <>
              <span>·</span>
              <span>{readTime}</span>
            </>
          )}
        </div>

        {/* Tags */}
        <div className="mb-3 flex flex-wrap gap-1.5">
          {tags.map((tag) => (
            <span
              key={tag}
              className="rounded-full bg-gray-100 dark:bg-gray-700 px-2 py-0.5 text-[11px] font-medium text-gray-600 dark:text-gray-300"
            >
              {tag}
            </span>
          ))}
        </div>

        {/* Stats */}
        <div className="mb-4 flex items-center gap-4 text-[12px] text-gray-400 dark:text-gray-500">
          <span className="flex items-center gap-1">
            {source === "devto" ? (
              <Heart size={12} className="text-red-400" />
            ) : (
              <ArrowUp size={12} className="text-orange-400" />
            )}
            <span>{score}</span>
          </span>
          <span className="flex items-center gap-1">
            <MessageCircle size={12} />
            <span>{comments}</span>
          </span>
        </div>

        {/* Read button */}
        <a
          href={url}
          target="_blank"
          rel="noopener noreferrer"
          className="mt-auto flex items-center justify-center gap-2 rounded-xl border border-gray-200 dark:border-gray-600 px-4 py-2.5 text-sm font-medium text-gray-600 dark:text-gray-300 transition-all duration-200 hover:border-[#7C3AED] hover:bg-[#7C3AED]/5 dark:hover:border-[#7C3AED] dark:hover:text-[#A78BFA] dark:hover:bg-[#7C3AED]/10"
        >
          Read Article
          <ArrowRight size={14} />
        </a>
      </div>
    </div>
  );
}
