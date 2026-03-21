# CODAND Portfolio Website — Build Progress

## Project Overview

A professional portfolio website for **CODAND**, a software development agency, built with:

- **Framework**: Next.js 16.1.6 (App Router)
- **Language**: TypeScript
- **Styling**: Tailwind CSS v4 (CSS-first config, no `tailwind.config.js`)
- **UI Icons**: `lucide-react` + `react-icons` (Simple Icons set)
- **Fonts**: Geist Sans + Geist Mono (via `next/font/google`)
- **React**: 19.2.3

**Brand:**
- Company name: **CODAND**
- Primary color: Purple `#7C3AED`
- Accent color: Blue `#2563EB`
- Style: Clean, modern, white background, SaaS-like

---

## Pages Status

| Page | Route | Status |
|---|---|---|
| Home | `/` | ✅ Done |
| Services | `/services` | ✅ Done |
| Technologies | `/technologies` | ✅ Done |
| Portfolio | `/portfolio` | ✅ Done |
| About Us | `/about` | ✅ Done |
| Stay Updated (Blog) | `/blog` | ✅ Done |
| Contact / Get Quote | `/contact` | ✅ Done |

---

## What Has Been Built

### Session 1 — Root Layout & Sidebar Navigation

#### `src/app/globals.css` (modified)
- Removed dark mode auto-switching
- Added brand color tokens inside `@theme inline`:
  - `--color-purple: #7C3AED`
  - `--color-purple-dark: #6D28D9`
  - `--color-purple-light: #EDE9FE`
  - `--color-blue: #2563EB`
  - `--color-sidebar: #ffffff`
  - `--color-sidebar-border: #E5E7EB`
- Added global CSS animation keyframes and utility classes:
  - `@keyframes fadeInUp` — slides up + fades in
  - `@keyframes fadeInRight` — slides right + fades in
  - `@keyframes fadeIn` — opacity only
  - Classes: `.animate-fade-in-up`, `.animate-fade-in-right`, `.animate-fade-in`
  - Delay helpers: `.delay-100` through `.delay-500`

#### `src/components/Sidebar.tsx` (new)
- `"use client"` component — uses `usePathname()` and `useState()`
- **Fixed left sidebar**, 256px wide (`w-64`)
- **Logo section**: Purple→Blue gradient icon (`Code2`) + "**Codand**" wordmark
- **Nav links** (typed constant array):

  | Route | Label | Icon |
  |---|---|---|
  | `/` | Portfolio | `FolderOpen` |
  | `/services` | Services | `Layers` |
  | `/technologies` | Technologies | `Cpu` |
  | `/about` | About Us | `Users` |
  | `/blog` | Blog | `BookOpen` |

- **Active state**: Purple filled background + white text via `usePathname()`
- **Hover state**: Light purple background (`#EDE9FE`) + purple text
- **Get Quote CTA**: Purple→Blue gradient button at bottom with `Zap` icon
- **Mobile**: Hidden off-screen, hamburger opens it, backdrop closes it, scroll locked, auto-closes on route change

#### `src/app/layout.tsx` (modified)
- Geist fonts, Codand metadata
- Renders `<Sidebar />` + `<main className="lg:ml-64 min-h-screen">`
- Stays a **Server Component** — only Sidebar is client-side

---

### Session 2 — Home Page Hero Section

#### `src/app/page.tsx` (replaced)
- Pure **Server Component**
- Full-height two-column layout, subtle purple + blue blob backgrounds

**Left column:**
- Eyebrow pill badge (`Zap` icon)
- Headline: "Build Amazing" + gradient "Applications"
- Subheading + two CTA buttons (outlined "View Portfolio" · gradient "Get a Quote")
- Trust micro-copy with `CheckCircle2` icons
- Stats bar: **47+ Projects** · **98% Satisfaction** · **Free Consultation**

**Right column — Browser mockup card:**
- Floating badges (SaaS Platform · +340% Growth)
- Browser chrome with traffic-light dots + fake URL
- Stat widgets: Revenue / Users / Orders
- 7-bar gradient chart with "+24%" label
- Stacked user avatars + tech stack strip (React · Node.js · PostgreSQL · AWS)

**Staggered animations:** `0ms → 100ms → 200ms → 300ms → 400ms → 500ms`

---

### Session 3 — Services Page

#### `src/components/ServiceCard.tsx` (new)
- Pure **Server Component** (no `"use client"`)
- Props: `title`, `description`, `icon` (LucideIcon), `iconBg`, `iconColor`, `tags`, `guideLink`
- Rounded colored icon box, scales on card hover (`group-hover:scale-110`)
- Description uses `flex-1` — "Read Detailed Guide →" button always pinned to bottom
- Card lifts on hover: `hover:shadow-xl hover:-translate-y-1.5`
- Button border turns purple on hover

#### `src/app/services/page.tsx` (new)
- `"use client"` — needs `useState` for live search filter

**Top bar:** Page title + subtitle + "Contact Us" gradient button

**Search:** `useMemo` filter across title, description, and all tags. Empty state with "Clear search" when no results.

**Hero text:** "Complete Development Solutions" — hidden while searching.

**7 Service cards** (3-col desktop / 2-col tablet / 1-col mobile), staggered 60ms per card:

| # | Service | Icon | Color |
|---|---|---|---|
| 1 | Web Applications | `Globe` | Blue |
| 2 | Android Development | `Smartphone` | Green |
| 3 | iOS Development | `Smartphone` | Purple |
| 4 | Desktop Applications | `Monitor` | Orange |
| 5 | UI/UX Design | `Palette` | Pink |
| 6 | DevOps & Deployment | `Cloud` | Indigo |
| 7 | AI / ML Solutions | `Brain` | Yellow |

**Pricing section — 3 cards:**

| Plan | Price | Duration | CTA Style |
|---|---|---|---|
| Starter | $5,000 | 2–4 weeks | Outlined border |
| Professional ⭐ | $15,000 | 6–8 weeks | Purple gradient + "Most Popular" badge |
| Enterprise | $35,000+ | 10–16 weeks | Dark/black button |

---

### Session 4 — Technologies Page

#### `src/components/TechCard.tsx` (new)
- Pure **Server Component** (no `"use client"`)
- Props: `name`, `description`, `category`, `experience`, `projects`, `popularity` (number), `logo` (React.ElementType), `brandColor` (hex string)
- `logo` typed as `React.ElementType<{ size?, style?, className? }>` — accepts both `react-icons` and `lucide-react` icons
- **Logo circle**: brand icon at 22px, background tint via `brandColor + "1A"` (hex alpha ~10%)
- **Popularity %**: displayed bold top-right, drives gradient progress bar width via inline style
- **Progress bar**: purple→blue gradient, dynamic width from `popularity` prop
- Card lifts on hover: `hover:shadow-xl hover:-translate-y-1.5`, logo scales via `group-hover:scale-110`
- 4 stat rows at bottom: Experience · Projects · Category · Popularity (popularity row in brand color)

#### `src/app/technologies/page.tsx` (new)
- `"use client"` — dual filter state: `query` (search) + `activeTab` (category)
- Both filters applied simultaneously via single `useMemo`

**Header bar:** "Technologies & Tools" + subtitle + "Get Quote" gradient button

**Search:** Filters across `name`, `description`, and `category`

**Hero text:** Hidden when either search query or non-All tab is active

**Tab bar (7 tabs):** All · Frontend · Backend · Mobile · Database · Cloud · DevOps
- Each non-All tab shows item count badge
- "Clear ×" button appears dynamically when any filter is active
- Result count shown below tabs when filtering

**36 Technology cards** (3-col desktop / 2-col tablet / 1-col mobile), staggered 40ms per card:

| Category | Technologies |
|---|---|
| Frontend (6) | React, Next.js, Vue.js, Angular, Tailwind CSS, TypeScript |
| Backend (6) | Node.js, Python, Java, C#/.NET, PHP, Go |
| Mobile (6) | React Native, Flutter, Swift, Kotlin, Xamarin, Ionic |
| Database (6) | MongoDB, PostgreSQL, MySQL, Redis, Firebase, SQLite |
| Cloud (6) | AWS, Google Cloud, Microsoft Azure, Vercel, Netlify, DigitalOcean |
| DevOps (6) | Docker, Kubernetes, Git, Jenkins, GitHub Actions, Terraform |

**Icon notes — 4 fallbacks used (SI library gaps):**

| Technology | Icon Used | Why |
|---|---|---|
| Java | `SiOpenjdk` | `SiJava` not exported in this SI version |
| Xamarin | `SiDotnet` | No Xamarin icon; shares .NET runtime |
| AWS | `Cloud` (lucide) | No Amazon/AWS icon in SI |
| Microsoft Azure | `Server` (lucide) | No Azure/Microsoft icon in SI |

**Stats bar (4 boxes):** 50+ Technologies · 5+ Years · 200+ Projects · 98% Satisfaction

**Bottom CTA section:** Purple/blue soft gradient card, "Need a Custom Solution?", two buttons + 3 trust badges

---

### Session 5 — Portfolio Page (Real Projects)

#### `src/components/ProjectCard.tsx` (new — `"use client"`)
- **Client Component** — needs `useState` for case study modal + `useEffect` for scroll lock and Escape key handler
- Props: `name`, `tagline`, `shortDescription`, `longDescription`, `category`, `tags`, `gradientFrom`, `gradientTo`, `stats`, `featured?`
- **Gradient banner** (h-40): 135° gradient unique per project, large translucent first-letter initial as decorative bg element
- **Category badge** (top-left, frosted dark pill) + **Featured badge** (top-right, gold with star icon — only when `featured=true`)
- Project name overlaid at banner bottom via dark gradient fade
- Tagline in purple, 3-line clamped short description, tag pills, stat rows with colored dot markers
- `"View Case Study →"` button opens **Case Study Modal**
- **Modal**: full-screen backdrop blur overlay, matching gradient header (h-52) with large initial, close button, scrollable body with long description + Technologies section + Key Highlights, footer CTA "Get a Quote for a Similar Project"
- Modal closes on backdrop click, close button, or `Escape` key; body scroll locked while open

#### `src/app/portfolio/page.tsx` (new)
- `"use client"` — dual filter: `query` (search) + `activeTab` (category tab) via single `useMemo`

**Header bar:** "Our Portfolio" + subtitle + "Get Quote" gradient button

**Search bar:** Filters across `name`, `tagline`, `shortDescription`, and all `tags`

**Hero text:** "Work That Speaks For Itself" — hidden while any filter is active

**Tab bar (5 tabs):** All · Web App · Enterprise · AI/ML · Cloud
- Each non-All tab shows item count badge; "Clear ×" button when filtering; result count shown

**6 Real projects** (3-col desktop / 2-col tablet / 1-col mobile), staggered 60ms per card:

| # | Project | Category | Key Stats | Stack |
|---|---|---|---|---|
| 1 | Freightly ⭐ | Web App | 1000+ Active Routes, 426+ Tax Invoices | React, Node.js, PostgreSQL, REST API |
| 2 | PetroDesk ⭐ | Enterprise | 10+ Modules, Live API Integration | Angular, TypeScript, REST API, Charts |
| 3 | Querivo ⭐ | AI/ML | Real-time Monitoring, Auto Cross-questioning | AI, Voice Agent, Node.js, WebSocket |
| 4 | Vaultrix | Cloud | Role-based Access, File Versioning | React, Node.js, AWS S3, PostgreSQL |
| 5 | Omnidesk | Enterprise | 6+ Dept Modules, Role-based Access | React, Node.js, PostgreSQL, RBAC |
| 6 | Siftly | AI/ML | Bulk Upload, AI Ranking | Python, AI, NLP, React, Node.js |

**Content decisions (client confidentiality):**
- PetroDesk: "ONGC" replaced with "a leading energy conglomerate" / "the client's operational departments"
- Omnidesk: "government" removed throughout; category changed from `Government` → `Enterprise`; "Government" tag → "Multi-dept"; "Government" filter tab removed

**Stats bar (4 boxes):** 9+ Projects · 5+ Enterprise Clients · 98% Satisfaction · 3+ Years

**Bottom CTA section:** Solid purple→blue gradient band, "Have a Project in Mind?", white "Get Free Quote" + outlined "View Services"

---

### Session 6 — About Us Page

#### `src/app/about/page.tsx` (new)
- Pure **Server Component** — no `"use client"` needed anywhere on this page

**Header bar:** "About Us" + subtitle + "Contact Us" gradient button

---

**Section 1 — Hero Story Block** (two-column)

Left side:
- Eyebrow + gradient heading: "Building Digital Solutions Without Limits"
- 3 paragraphs of fresh professional copy: founding story, co-founder complementarity, client-first approach
- Two CTAs: "Start Your Project" (solid gradient) + "Our Work" (outlined)

Right side — 2×3 stats grid:
- Values with gradient number text: 9+ Projects · 5+ Enterprise Clients · 3+ Years Experience · 98% Satisfaction · 6 Services · 3 Co-founders
- Hover lift on each stat box

---

**Section 2 — Core Values** (6 cards, 3-col grid)

| # | Value | Icon | Accent Color |
|---|---|---|---|
| 1 | No Limits Thinking | `Zap` | Purple |
| 2 | Client First, Always | `Heart` | Pink |
| 3 | Quality Over Speed | `Shield` | Blue |
| 4 | Honest Communication | `MessageCircle` | Green |
| 5 | Continuous Learning | `BookOpen` | Amber |
| 6 | Long-term Partnership | `Users` | Purple |

Each card: colored icon box, bold title, description, hover shadow lift. Staggered 60ms animation delay.

---

**Section 3 — Company Journey Timeline** (6 milestones)

| Year | Milestone |
|---|---|
| 2023 | Codand Founded |
| 2023 | First Project Delivered (Freightly) |
| 2023 | Enterprise Breakthrough (PetroDesk — India's largest oil & gas company) |
| 2024 | AI/ML Expansion (Querivo) |
| 2024 | Sector Diversification (Omnidesk) |
| 2024 | Growing Strong (9+ projects, 5+ enterprise clients) |

- **Desktop**: alternating left/right cards with a center spine line (`w-px bg-gray-100`), purple dot markers, year pill badges, `grid-cols-2` layout with `pointer-events-none` on empty side
- **Mobile**: completely separate layout — left spine line, dot markers, single column stacked cards

---

**Section 4 — Meet the Co-Founders** (3 cards, side by side)

| Founder | Initials | Gradient | Role Focus |
|---|---|---|---|
| Anubhav Agarwal | AA | Purple → Blue | Engineering & Architecture |
| Ansh Goel | AG | Blue → Cyan | Product Strategy & Client Success |
| Aman Gupta | AG | Indigo → Purple | UI/UX Design & Frontend |

Each card: gradient avatar circle with initials, "Co-Founder" purple badge, 2-line bio, expertise tag pills, GitHub + LinkedIn icon buttons (placeholder `#` links, brand-color hover states)

---

**Section 5 — Bottom CTA Banner**
- Solid purple→blue gradient background
- "Ready to Build Something Amazing?" heading
- "Start Your Project" (white bg, purple text) + "Call Now (+91 XXXXXXXXXX)" (outlined white with `Phone` icon, placeholder number)
- 3 trust badges

---

### Session 7 — Brand Identity & Theme Unification

#### `src/components/CodandLogo.tsx` (new)
- Reusable SVG logo component — props: `variant` ("full" | "icon" | "favicon"), `theme` ("light" | "dark" | "mono"), `size` ("sm" | "md" | "lg")
- **Icon (3-dot C-mark)**: Circle 1 (r9, #7C3AED), Circle 2 (r7, #5B21B6, 75% opacity), Circle 3 (r5.5, #2563EB, 45% opacity); dashed connector lines (#D8B4FE); small gradient divider dot
- **Wordmark**: "COD" font-weight 800, tracking -0.5px + "AND" font-weight 300, letter-spacing 7px; stacked below COD; theme-aware colors
- **Tagline** "DIGITAL SOLUTIONS": shown only in full+lg; baseline rule full-width gray, first 74px overridden with purple→blue gradient
- **Size scaling**: sm=0.6×, md=0.8×, lg=1× on icon circles; COD font-sizes 24/34/42px respectively
- **Favicon variant**: purple square bg (#7C3AED, border-radius 4px) + 3 white dots, no wordmark, viewBox 0 0 32 32

#### `src/components/Sidebar.tsx` (modified)
- Replaced hardcoded `Code2` icon + `Dev<span>Agency</span>` with `<CodandLogo variant="full" theme="light" size="sm" />`
- Removed `Code2` from lucide-react imports

#### `src/app/layout.tsx` (modified)
- Metadata: title template `"%s | CODAND"`, default `"CODAND — Digital Solutions"`, full description, keywords array, authors, creator, favicon icon reference

#### `src/app/globals.css` (modified)
- Added 7 brand CSS custom properties on `:root`:
  - `--brand-primary: #7C3AED`
  - `--brand-secondary: #2563EB`
  - `--brand-primary-light: #A78BFA`
  - `--brand-secondary-light: #60A5FA`
  - `--brand-dark: #0F0720`
  - `--brand-gradient: linear-gradient(135deg, #7C3AED, #2563EB)`
  - `--brand-gradient-h: linear-gradient(90deg, #7C3AED, #2563EB)`

#### `src/app/page.tsx` (modified)
- Fixed mock browser URL: `app.devagency.io` → `app.codand.io`

#### `public/favicon.svg` (new)
- Purple square (#7C3AED, rx=4) + 3 white C-formation dots, viewBox 0 0 32 32

#### Global cleanup
- All "DevAgency" / "Dev Agency" / "devagency" occurrences removed from entire `src/` tree — zero remaining instances confirmed via grep

---

### Session 8 — Stay Updated (Blog) Page

#### `src/components/NewsCard.tsx` (new)
- Pure presentational card component — no `"use client"` needed
- Props: `title`, `author`, `authorAvatar?`, `date`, `readTime?`, `tags`, `url`, `source` ("devto" | "hackernews"), `coverImage?`, `score`, `comments`
- **Cover image / gradient placeholder**: if `coverImage` present, renders img with hover zoom; otherwise renders a deterministic gradient banner (5 palette options keyed on `title.charCodeAt(0)`) with a large translucent first-letter watermark
- **Source badge**: absolute top-left pill — green "Dev.to" or orange "Hacker News"
- **Body**: title (2-line clamp), author avatar/initials, date + read time, tag pills, score (Heart icon for devto · ArrowUp icon for HN) + comment count, "Read Article →" button
- Card lifts on hover: `hover:shadow-xl hover:-translate-y-1.5 hover:scale-[1.01]`

#### `src/app/blog/page.tsx` (new — `"use client"`)
- Fetches live articles from two public APIs:
  - **Dev.to**: `https://dev.to/api/articles?per_page=20` (top articles)
  - **Hacker News**: Algolia search API (`hn.algolia.com`) — top stories with comment count
- All data fetched client-side on mount via `useEffect` + `Promise.allSettled` (graceful partial failure)
- **SkeletonCard**: animated shimmer placeholder shown while loading (3 per source tab)

**Header bar:** "Stay Updated" + subtitle + "Refresh" button (triggers refetch)

**Source tabs** (3): All · Dev.to · Hacker News — filters `filteredArticles` via `activeSource` state

**Category pills** (6): All · Web Dev · AI/ML · DevOps · Open Source · Career — filters via `activeCategory` state, matched against article tags

**Search**: filters across `title`, `author`, and `tags` simultaneously

**Stats bar**: Total Articles count · Dev.to count · Hacker News count · Last Updated timestamp

**Error / empty states**: Red card for fetch error; gray card with "Clear filters" for no results

**Article grid**: 3-col desktop / 2-col tablet / 1-col mobile, `NewsCard` components

---

### Session 9 — Dark Mode System

#### `src/app/globals.css` (modified)
- Added `@custom-variant dark (&:where(.dark, .dark *));` at the very top — **critical** Tailwind v4 syntax for class-based dark mode (replaces v3's `darkMode: 'class'` config option)

#### `src/contexts/ThemeContext.tsx` (new — `"use client"`)
- React context providing `theme: "light" | "dark"` and `toggle()` function
- On mount: reads class already set by anti-FOUC script from `document.documentElement.classList` to sync React state with DOM reality
- `toggle()`: flips class on `<html>`, updates state, saves preference to `localStorage` under key `'codand-theme'`

#### `src/components/ThemeToggle.tsx` (new — `"use client"`)
- Pill-shaped toggle with sliding dot; Sun icon (amber) for light, Moon icon (purple) for dark
- Uses `useTheme()` hook; shows "Light" / "Dark" label text
- Placed in Sidebar bottom section, above "Get a Quote" button

#### `src/app/layout.tsx` (modified)
- Added `suppressHydrationWarning` on `<html>` — prevents React hydration mismatch from anti-FOUC class injection
- Added anti-FOUC inline `<script>` in `<head>`: reads `localStorage.getItem('codand-theme')` and sets `dark` class on `<html>` before React hydrates — eliminates white flash on reload
- Wrapped `<body>` children in `<ThemeProvider>`
- Added `dark:bg-gray-950 transition-colors duration-300` to `<body>`

#### Dark mode classes — all pages and components updated:

**Color palette used consistently:**
| Token | Value | Used for |
|---|---|---|
| `dark:bg-gray-950` | Very dark | Main page background |
| `dark:bg-gray-900` | Dark | Header/sidebar surfaces |
| `dark:bg-gray-800` | Medium dark | Card/panel surfaces |
| `dark:border-gray-700` | Muted border | Card borders |
| `dark:text-white` | White | Primary text |
| `dark:text-gray-400` | Light gray | Secondary/muted text |
| `dark:text-[#A78BFA]` | Light purple | Brand accents in dark |

**Files updated with full dark mode coverage:**
- `src/components/Sidebar.tsx` — sidebar bg, nav hover states, border, logo theme switching via `useTheme()`
- `src/components/ServiceCard.tsx` — card bg, title, description, tags, border, guide button
- `src/components/TechCard.tsx` — card bg, popularity text, progress bar track, name, description, stat rows
- `src/components/ProjectCard.tsx` — card, modal panel (`dark:bg-gray-900`), modal body, footer border, tag pills, stats, CTA
- `src/components/NewsCard.tsx` — card, title, author, date/stats, tags, read button hover
- `src/app/page.tsx` — main bg, mock browser card internals, floating badges, stats bar
- `src/app/services/page.tsx` — header bar, search input, hero text, service cards, all 3 pricing plan cards
- `src/app/technologies/page.tsx` — header, search, tab buttons, tech card grid, stats bar, bottom CTA
- `src/app/portfolio/page.tsx` — header, search, tab filter, project cards, stats bar, bottom CTA
- `src/app/about/page.tsx` — header, story block, stats grid, core values, timeline (desktop + mobile), team cards, bottom CTA
- `src/app/blog/page.tsx` — main container, header, source tabs, category pills, search, SkeletonCard, stats bar, error/empty states

---

### Session 10 — Get Quote / Contact Page

#### `src/components/QuoteWizard.tsx` (new — `"use client"`)
- 4-step multi-step form wizard — all state managed via `useState`, no form libraries, no `<form>` tags
- **Single `formData` state object**: `name`, `email`, `company`, `phone`, `projectType`, `budget`, `timeline`, `techStack[]`, `requirements[]`, `files[]`, `description`

**Step Indicator** (`StepIndicator` sub-component):
- 4 circles connected by progress lines
- Completed: purple filled + white checkmark; Active: purple filled + white number; Upcoming: gray outlined + gray number
- Progress line between each pair fills purple proportionally as steps complete
- Transitions smoothly on step change

**Step 1 — Your Info:**
- Full Name *(required, min 2 chars)*, Email *(required, valid format)*, Company *(optional)*, Phone *(optional, +91 prefix)*
- Red border + error message shown on failed Next click

**Step 2 — Project Details:**
- **Project Type** — 6-card visual grid (icon + label): Web Application, Mobile App, Desktop Application, Full-Stack Solution, AI / ML Project, Custom Enterprise
- **Budget Range** — 4 cards: $5k–$15k / $15k–$35k / $35k–$75k / $75k+
- **Timeline** — 4 cards: 1–2 Months / 3–4 Months / 5–6 Months / 6+ Months
- All three required; selected card gets purple border + tinted bg

**Step 3 — Requirements:**
- **Tech stack tag cloud** — 17 toggle pills (purple when selected): React, Next.js, Node.js, Python, React Native, Flutter, Swift, Kotlin, AWS, Firebase, PostgreSQL, MongoDB, Docker, TypeScript, GraphQL, AI/ML, No Preference
- **Additional requirements** — 12 checkbox buttons (2-col grid): UI/UX Design, API Development, Database Design, Cloud Hosting, Mobile Responsive, SEO Optimization, Payment Integration, User Authentication, Admin Panel, Real-time Features, Third-party APIs, Performance Optimization
- **File upload**: dashed border drop zone with drag-and-drop (`onDrop` / `onDragOver` / `onDragLeave`) + hidden `<input type="file">` via `useRef`; accepts `.pdf .png .jpg .jpeg .doc .docx`, max 10MB each; uploaded files listed with name, size, remove button
- **Project description** — textarea, min 50 chars required, live character counter (turns green at 50)

**Step 4 — Confirm:**
- Summary cards for Personal Info, Project, Requirements (tech stack + additional, with tag pills), Description (3-line clamp with expand), Attached Files
- Each section has "Edit" link that jumps directly back to that step
- Terms line with Privacy Policy / Terms of Service links
- Submit button with 1.5s loading spinner → **Success State**

**Success State** (replaces wizard after submit):
- Large checkmark circle (purple), "We've received your request!" heading
- Two action cards: "Check your email" (shows submitted email address) + "Want to talk sooner?" (Schedule Now button)
- "Submit another request" resets everything back to Step 1

- `SummarySection` helper component (defined in same file) for DRY summary card rendering
- Full dark mode throughout; TypeScript strict — zero errors

#### `src/app/contact/page.tsx` (new — Server Component)
- **Header bar**: "Get a Quote" title + subtitle + "Free to ask" eyebrow pill
- **Trust pills bar** (4, centered): Free Consultation · Response within 24 hours · NDA Protection · 100% Satisfaction Guarantee
- **Two-column layout** (`lg:grid-cols-[2fr_1fr]`): QuoteWizard left (65%) + sticky contact cards right (35%); single column stacked on mobile
- **Right column — 3 cards:**
  - Email card: Mail icon, `contact@codand.in`, "Send Email →" outlined button
  - Free Consultation card: purple gradient bg, Calendar icon, "What's covered" list (3 items), "Schedule a Call →" solid button
  - Why CODAND card: 4 checkmark items (experience, clients, satisfaction)
- **Bottom CTA banner**: purple→blue gradient, "Prefer to talk directly?", "Book Free Consultation →" (white bg, purple text)
- Metadata: title "Get a Quote", full description

#### Links confirmed wired to `/contact` across the application:
- `Sidebar.tsx` — "Get a Quote" CTA button (already set, confirmed)
- `src/app/page.tsx` — Hero "Get a Quote" CTA button
- `src/components/ProjectCard.tsx` — Modal footer "Get a Quote for a Similar Project" button

---

## File Tree (current state)

```
my-portfolio/
├── docs/
│   ├── progress.md                  ← this file
│   └── tonyjarvis.md                ← working dynamic doc
├── src/
│   ├── app/
│   │   ├── globals.css              ← brand tokens + animation keyframes + dark variant
│   │   ├── layout.tsx               ← root layout, CODAND metadata, favicon, anti-FOUC, ThemeProvider
│   │   ├── page.tsx                 ← Home hero section (server component)
│   │   ├── services/
│   │   │   └── page.tsx             ← Services page (client component)
│   │   ├── technologies/
│   │   │   └── page.tsx             ← Technologies page (client component)
│   │   ├── portfolio/
│   │   │   └── page.tsx             ← Portfolio page (client component)
│   │   ├── about/
│   │   │   └── page.tsx             ← About Us page (server component)
│   │   ├── blog/
│   │   │   └── page.tsx             ← Stay Updated page (client component, live API fetch)
│   │   └── contact/
│   │       └── page.tsx             ← Get Quote page (server component, wraps QuoteWizard)
│   ├── components/
│   │   ├── CodandLogo.tsx           ← reusable SVG logo (full/icon/favicon × light/dark/mono × sm/md/lg)
│   │   ├── Sidebar.tsx              ← fixed sidebar nav with ThemeToggle (client component)
│   │   ├── ThemeToggle.tsx          ← sun/moon pill toggle (client component)
│   │   ├── ServiceCard.tsx          ← reusable service card (server component)
│   │   ├── TechCard.tsx             ← reusable tech card with brand logo (server component)
│   │   ├── ProjectCard.tsx          ← reusable project card with case study modal (client component)
│   │   ├── NewsCard.tsx             ← reusable news/article card (server component)
│   │   └── QuoteWizard.tsx          ← 4-step multi-step quote form wizard (client component)
│   └── contexts/
│       └── ThemeContext.tsx         ← light/dark theme context + localStorage persistence
├── public/
│   └── favicon.svg                  ← CODAND favicon (purple square + 3-dot C-mark)
├── package.json
├── next.config.ts
├── tsconfig.json
└── postcss.config.mjs
```

---

## Dependencies Added

| Package | Reason |
|---|---|
| `lucide-react` | UI icons (nav, buttons, decorative) |
| `react-icons` | Brand/tech logos via Simple Icons (`react-icons/si`) |

---

## Dev Notes

- **Tailwind v4**: CSS-first config via `@theme inline` in `globals.css`. No `tailwind.config.js`.
- **No external UI libraries** — pure Tailwind utility classes only. No form libraries.
- **Class-based dark mode in Tailwind v4**: Use `@custom-variant dark (&:where(.dark, .dark *));` in `globals.css` — NOT `darkMode: 'class'` in config (that's v3 syntax). This is the critical line that makes all `dark:` prefixes work.
- **Anti-FOUC pattern**: Inline `<script>` in `<head>` reads localStorage before React hydrates → sets `.dark` class on `<html>` immediately → no white flash. Pair with `suppressHydrationWarning` on `<html>`.
- **localStorage key**: `'codand-theme'` — do not change, it's referenced in both the anti-FOUC script and ThemeContext.
- **ThemeContext + Sidebar**: Sidebar is `"use client"`, reads `useTheme()` directly to pass correct `theme` prop to `CodandLogo` — logo wordmark colors switch dynamically with the toggle.
- **Client components**: `Sidebar.tsx`, `ThemeToggle.tsx`, `ProjectCard.tsx`, `QuoteWizard.tsx`, `services/page.tsx`, `technologies/page.tsx`, `portfolio/page.tsx`, `blog/page.tsx`. Everything else is a Server Component.
- **Brand tokens**: 7 CSS custom properties on `:root` in `globals.css` (`--brand-primary`, `--brand-secondary`, etc.) for programmatic access alongside Tailwind inline values.
- **Logo system**: `CodandLogo.tsx` is the single source of truth for all brand logo rendering — use it everywhere, never hardcode the logo again.
- **File upload in QuoteWizard**: uses `useRef` on a hidden `<input type="file">` + drag-and-drop events on the dashed drop zone. No external libraries. Accepts `.pdf .png .jpg .jpeg .doc .docx`, max 10MB each.
- `usePathname()` drives active nav state — works correctly with App Router.
- Animation delays on card grids use inline `style={{ animationDelay }}` for dynamic staggering beyond the 5 CSS delay classes.
- `react-icons/si` color map: use `brandColor + "1A"` hex suffix for ~10% opacity tint backgrounds — avoids Tailwind dynamic class purging issues entirely.
- All builds pass TypeScript strict checks with zero errors.

---

## Next Steps

All 7 pages are complete. The application is fully built.

Potential future enhancements:
1. Backend integration — wire `/contact` form to an email service (Resend, SendGrid) or a CRM
2. Individual blog post pages — `/blog/[slug]` for full article reading within the site
3. `/services/[slug]` — detailed service sub-pages (currently "Read Detailed Guide" links are placeholder `#`)
4. Real scheduling link — connect "Schedule a Call" / "Book Free Consultation" buttons to Calendly or similar
5. SEO — `sitemap.xml`, `robots.txt`, Open Graph images per page
