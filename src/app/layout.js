import { Outfit, Space_Grotesk, JetBrains_Mono } from "next/font/google";
import "./globals.css";
import SmoothScroll from "@/components/SmoothScroll";

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
    <html lang="en" className="dark">
      <body
        className={`${outfit.variable} ${spaceGrotesk.variable} ${mono.variable} antialiased bg-[#050816] text-[#f3f3f3] selection:bg-indigo-500/30 selection:text-white`}
      >
        <SmoothScroll>
          {children}
        </SmoothScroll>
      </body>
    </html>
  );
}
