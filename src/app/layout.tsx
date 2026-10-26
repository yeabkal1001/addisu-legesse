import type { Metadata } from "next";
import { Playfair_Display, Cormorant_Garamond, Cinzel, Caveat, Plus_Jakarta_Sans } from "next/font/google";
import "./globals.css";

const sansFont = Plus_Jakarta_Sans({
  variable: "--font-sans",
  subsets: ["latin"],
});

const playfairDisplay = Playfair_Display({
  variable: "--font-playfair",
  subsets: ["latin"],
  weight: ["400", "500", "600", "700", "800"],
});

const serifDisplay = Cormorant_Garamond({
  variable: "--font-serif",
  subsets: ["latin"],
  weight: ["400", "500", "600", "700"],
});

const cinzelFont = Cinzel({
  variable: "--font-cinzel",
  subsets: ["latin"],
  weight: ["400", "600", "700"],
});

const scriptFont = Caveat({
  variable: "--font-script",
  subsets: ["latin"],
  weight: ["400", "600", "700"],
});

export const metadata: Metadata = {
  title: "Addisu Legesse | Ethiopian Recording Artist",
  description: "Official portfolio of Addisu Legesse — Vocalist, Keyboardist, Drummer. Ethiopian Recording Artist.",
};

import { AudioProvider } from "@/context/AudioContext";

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html
      lang="en"
      suppressHydrationWarning
      className={`${sansFont.variable} ${playfairDisplay.variable} ${serifDisplay.variable} ${cinzelFont.variable} ${scriptFont.variable} dark h-full antialiased`}
    >
      <body
        suppressHydrationWarning
        className="min-h-full bg-[#050505] text-[#FAF6F0] selection:bg-white/20 selection:text-white overflow-x-hidden font-sans"
      >
        <AudioProvider>
          {children}
        </AudioProvider>
      </body>
    </html>
  );
}
