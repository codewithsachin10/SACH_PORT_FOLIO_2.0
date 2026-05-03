import { Outfit, Space_Grotesk, JetBrains_Mono } from "next/font/google";
import "./globals.css";
import PortfolioShell from "@/components/PortfolioShell";

const outfit = Outfit({
  variable: "--font-outfit",
  subsets: ["latin"],
});

const spaceGrotesk = Space_Grotesk({
  variable: "--font-space-grotesk",
  subsets: ["latin"],
});

const mono = JetBrains_Mono({
  variable: "--font-mono",
  subsets: ["latin"],
});

export const metadata = {
  title: "Sachin Gopalakrishnan | Personal Portfolio",
  description: "World-class premium portfolio of Sachin Gopalakrishnan, a student developer focused on high-end UI and practical product building.",
};

export default function RootLayout({ children }) {
  return (
    <html lang="en" suppressHydrationWarning>
      <head>
        <script
          dangerouslySetInnerHTML={{
            __html: `
              try {
                if (localStorage.theme === 'dark' || (!('theme' in localStorage) && window.matchMedia('(prefers-color-scheme: dark)').matches)) {
                  document.documentElement.classList.add('dark')
                } else {
                  document.documentElement.classList.remove('dark')
                }
              } catch (_) {}
            `,
          }}
        />
      </head>
      <body
        suppressHydrationWarning
        className={`${outfit.variable} ${spaceGrotesk.variable} ${mono.variable} antialiased bg-slate-50 dark:bg-[#050816] text-slate-900 dark:text-[#f3f3f3] selection:bg-indigo-500/30 selection:text-white`}
      >
        <PortfolioShell>{children}</PortfolioShell>
      </body>
    </html>
  );
}
