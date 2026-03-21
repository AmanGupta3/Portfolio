interface TechCardProps {
  name: string;
  description: string;
  category: string;
  experience: string;
  projects: string;
  popularity: number;
  // React.ElementType accepts both react-icons (IconType) and lucide-react icons
  logo: React.ElementType<{ size?: number; style?: React.CSSProperties; className?: string }>;
  brandColor: string; // hex e.g. "#61DAFB"
}

export default function TechCard({
  name,
  description,
  category,
  experience,
  projects,
  popularity,
  logo: Logo,
  brandColor,
}: TechCardProps) {
  return (
    <div className="group flex flex-col rounded-2xl border border-gray-100 dark:border-gray-700 bg-white dark:bg-gray-800 p-5 shadow-sm transition-all duration-300 hover:shadow-xl hover:-translate-y-1.5 hover:border-gray-200 dark:hover:border-gray-600">

      {/* ── Top row: logo + popularity % ── */}
      <div className="flex items-start justify-between mb-3">
        {/* Brand logo circle */}
        <div
          className="flex h-11 w-11 items-center justify-center rounded-full flex-shrink-0 transition-transform duration-300 group-hover:scale-110"
          style={{ backgroundColor: `${brandColor}1A` }}
        >
          <Logo size={22} style={{ color: brandColor }} />
        </div>

        {/* Popularity % */}
        <span className="text-2xl font-extrabold tracking-tight text-gray-900 dark:text-white">
          {popularity}%
        </span>
      </div>

      {/* ── Progress bar ── */}
      <div className="mb-4 h-1.5 w-full rounded-full bg-gray-100 dark:bg-gray-700 overflow-hidden">
        <div
          className="h-full rounded-full transition-all duration-700"
          style={{
            width: `${popularity}%`,
            background: `linear-gradient(to right, #7C3AED, #2563EB)`,
          }}
        />
      </div>

      {/* ── Name + description ── */}
      <h3 className="text-[15px] font-bold text-gray-900 dark:text-white mb-1 leading-snug">
        {name}
      </h3>
      <p className="text-[13px] text-gray-500 dark:text-gray-400 leading-snug mb-4 line-clamp-1">
        {description}
      </p>

      {/* ── Stat rows ── */}
      <div className="mt-auto space-y-2 border-t border-gray-50 dark:border-gray-700 pt-4">
        {(
          [
            { label: "Experience", value: experience },
            { label: "Projects",   value: projects   },
            { label: "Category",   value: category   },
          ] as const
        ).map(({ label, value }) => (
          <div key={label} className="flex items-center justify-between">
            <span className="text-[11px] font-medium text-gray-400 dark:text-gray-500 uppercase tracking-wide">
              {label}
            </span>
            <span className="text-[12px] font-semibold text-gray-700 dark:text-gray-300">{value}</span>
          </div>
        ))}
        <div className="flex items-center justify-between">
          <span className="text-[11px] font-medium text-gray-400 dark:text-gray-500 uppercase tracking-wide">
            Popularity
          </span>
          <span className="text-[12px] font-semibold" style={{ color: brandColor }}>
            {popularity}%
          </span>
        </div>
      </div>
    </div>
  );
}
