import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";
import Sidebar from "@/components/Sidebar";
import { ThemeProvider } from "@/contexts/ThemeContext";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: {
    default:  "CODAND — Digital Solutions",
    template: "%s | CODAND",
  },
  description:
    "CODAND builds world-class web, mobile, AI and enterprise applications. Whatever you need built — we build it.",
  keywords: [
    "CODAND",
    "web development",
    "mobile apps",
    "AI solutions",
    "enterprise software",
    "digital solutions",
  ],
  authors:  [{ name: "CODAND" }],
  creator:  "CODAND",
  icons: {
    icon: "/favicon.svg",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" suppressHydrationWarning>
      <head>
        {/* Anti-FOUC: set dark class before React hydrates to prevent white flash */}
        <script
          dangerouslySetInnerHTML={{
            __html: `
              try {
                if (localStorage.getItem('codand-theme') === 'dark') {
                  document.documentElement.classList.add('dark');
                }
              } catch(e) {}
            `,
          }}
        />
      </head>
      <body
        className={`${geistSans.variable} ${geistMono.variable} antialiased bg-white dark:bg-gray-950 transition-colors duration-300`}
      >
        <ThemeProvider>
          {/* Sidebar — client component, handles all interactivity */}
          <Sidebar />

          {/* Main content — offset by sidebar width on desktop */}
          <main className="lg:ml-64 min-h-screen">
            {children}
          </main>
        </ThemeProvider>
      </body>
    </html>
  );
}
