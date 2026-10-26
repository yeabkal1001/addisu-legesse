"use client";

import { motion, AnimatePresence } from "framer-motion";
import { useState, useEffect } from "react";
import { Menu, X, Disc } from "lucide-react";
import { YoutubeIcon } from "@/components/common/SocialIcons";

interface NavbarProps {
  onAudioToggle?: () => void;
  isPlaying?: boolean;
}

export function Navbar({ onAudioToggle, isPlaying = false }: NavbarProps) {
  const [activeTab, setActiveTab] = useState("HOME");
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 30);
    };
    window.addEventListener("scroll", handleScroll, { passive: true });
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const navItems = [
    { label: "Home", id: "home" },
    { label: "Singles", id: "singles" },
    { label: "Music", id: "music" },
    { label: "Artistry", id: "artistry" },
    { label: "Archive", id: "gallery" },
    { label: "Booking", id: "contact" },
  ];

  const handleNavClick = (id: string, label: string) => {
    setActiveTab(label);
    setIsMobileMenuOpen(false);
    if (id === "home") {
      window.scrollTo({ top: 0, behavior: "smooth" });
    } else {
      const el = document.getElementById(id);
      if (el) {
        el.scrollIntoView({ behavior: "smooth" });
      }
    }
  };

  return (
    <>
      <div className="fixed top-3 sm:top-5 inset-x-0 z-50 flex justify-center px-3 sm:px-6 pointer-events-none">
        <motion.header
          initial={{ y: -30, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ duration: 0.7, ease: [0.16, 1, 0.3, 1] }}
          className={`pointer-events-auto w-full max-w-4xl rounded-full transition-all duration-300 flex items-center justify-between px-4 sm:px-6 py-2.5 ${
            scrolled
              ? "bg-[#0b0b0d]/85 backdrop-blur-2xl border border-white/15 shadow-[0_15px_40px_rgba(0,0,0,0.85)]"
              : "bg-black/50 backdrop-blur-xl border border-white/10 shadow-lg"
          }`}
        >
          {/* Brand Signature */}
          <button
            onClick={() => handleNavClick("home", "Home")}
            className="flex items-center gap-2 group text-left"
          >
            <span className="font-script text-2xl sm:text-3xl text-white tracking-wide transition-colors group-hover:text-[#E5A842]">
              Addisu
            </span>
            <span className="hidden sm:inline-block h-3.5 w-[1px] bg-white/20" />
            <span className="hidden sm:inline-block text-[10px] font-sans font-medium tracking-[0.2em] text-neutral-400 uppercase">
              Official
            </span>
          </button>

          {/* Desktop Navigation Links */}
          <nav className="hidden md:flex items-center gap-1.5 lg:gap-2">
            {navItems.map((item) => {
              const isActive = activeTab === item.label;
              return (
                <button
                  key={item.id}
                  onClick={() => handleNavClick(item.id, item.label)}
                  className={`px-3 py-1.5 rounded-full text-xs font-sans font-medium transition-all duration-200 ${
                    isActive
                      ? "bg-white/15 text-white"
                      : "text-neutral-400 hover:text-white hover:bg-white/5"
                  }`}
                >
                  {item.label}
                </button>
              );
            })}
          </nav>

          {/* Right Action Buttons */}
          <div className="flex items-center gap-2 sm:gap-3">
            {/* Live Audio / Stream Button */}
            <button
              onClick={onAudioToggle}
              title={isPlaying ? "Pause music" : "Play music"}
              className={`flex items-center gap-2 px-3 py-1.5 rounded-full border text-xs transition-all ${
                isPlaying
                  ? "border-[#E5A842]/50 bg-[#E5A842]/15 text-[#E5A842]"
                  : "border-white/15 bg-white/5 text-neutral-300 hover:border-white/30 hover:text-white"
              }`}
            >
              <Disc
                className={`h-3.5 w-3.5 ${isPlaying ? "animate-spin text-[#E5A842]" : ""}`}
                style={{ animationDuration: "4s" }}
              />
              <span className="text-[11px] font-mono hidden sm:inline">
                {isPlaying ? "Streaming" : "Listen"}
              </span>
            </button>

            {/* Official YouTube Channel Link */}
            <a
              href="https://www.youtube.com/@addislegesseofficial"
              target="_blank"
              rel="noopener noreferrer"
              className="hidden xs:flex items-center justify-center h-8 w-8 rounded-full border border-white/10 bg-white/5 hover:bg-red-500/20 hover:border-red-500/40 text-neutral-300 hover:text-red-400 transition-colors"
              title="YouTube Official Channel"
            >
              <YoutubeIcon className="h-3.5 w-3.5" />
            </a>

            {/* Mobile Menu Toggle */}
            <button
              onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
              className="md:hidden flex h-8 w-8 items-center justify-center rounded-full border border-white/15 bg-white/5 text-white"
              aria-label="Toggle navigation menu"
            >
              {isMobileMenuOpen ? <X className="h-4 w-4" /> : <Menu className="h-4 w-4" />}
            </button>
          </div>
        </motion.header>
      </div>

      {/* Mobile Drawer Menu */}
      <AnimatePresence>
        {isMobileMenuOpen && (
          <motion.div
            initial={{ opacity: 0, y: -20, scale: 0.98 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: -20, scale: 0.98 }}
            transition={{ duration: 0.2 }}
            className="md:hidden fixed inset-x-4 top-20 z-50 bg-[#0d0d10]/95 backdrop-blur-2xl border border-white/15 rounded-3xl p-6 shadow-2xl flex flex-col gap-3 text-center"
          >
            <div className="pb-3 border-b border-white/10 flex items-center justify-between">
              <span className="font-script text-2xl text-white">Addisu Legesse</span>
              <span className="text-[10px] font-mono uppercase tracking-widest text-[#E5A842]">
                Official Portfolio
              </span>
            </div>

            <div className="flex flex-col gap-1 py-2">
              {navItems.map((item) => (
                <button
                  key={item.id}
                  onClick={() => handleNavClick(item.id, item.label)}
                  className={`py-2.5 rounded-xl text-sm font-sans font-medium transition-colors ${
                    activeTab === item.label
                      ? "bg-white/15 text-white font-semibold"
                      : "text-neutral-400 hover:text-white"
                  }`}
                >
                  {item.label}
                </button>
              ))}
            </div>

            <div className="pt-3 border-t border-white/10 flex items-center justify-center gap-3">
              <a
                href="https://www.youtube.com/@addislegesseofficial"
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center gap-2 px-4 py-2 rounded-full border border-red-500/30 bg-red-500/10 text-xs text-red-200"
              >
                <YoutubeIcon className="h-4 w-4 text-red-500" />
                <span>@addislegesseofficial</span>
              </a>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}
