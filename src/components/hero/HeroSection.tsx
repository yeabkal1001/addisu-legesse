"use client";

import { useEffect, useRef, useState } from "react";
import { motion, useMotionValue, useSpring, useTransform } from "framer-motion";
import gsap from "gsap";
import { Navbar } from "./Navbar";
import { HandDrawnCrown } from "./HandDrawnCrown";
import { Filmstrip } from "./Filmstrip";
import { SoundVisualizer } from "./SoundVisualizer";
import { WatchReelModal } from "./WatchReelModal";
import { useAudio, OFFICIAL_TRACKS } from "@/context/AudioContext";
import { Play, Disc3, Sparkles, ArrowRight } from "lucide-react";

export function HeroSection() {
  const containerRef = useRef<HTMLDivElement>(null);
  const heroImageRef = useRef<HTMLDivElement>(null);
  const [isReelOpen, setIsReelOpen] = useState(false);
  const { isPlaying, playTrack, togglePlay, pause } = useAudio();

  // Smooth Mouse Parallax for Desktop
  const mouseX = useMotionValue(0);
  const mouseY = useMotionValue(0);

  const springConfig = { damping: 30, stiffness: 140, mass: 0.6 };
  const smoothMouseX = useSpring(mouseX, springConfig);
  const smoothMouseY = useSpring(mouseY, springConfig);

  const bgX = useTransform(smoothMouseX, [-0.5, 0.5], [12, -12]);
  const bgY = useTransform(smoothMouseY, [-0.5, 0.5], [8, -8]);
  const textX = useTransform(smoothMouseX, [-0.5, 0.5], [-5, 5]);
  const textY = useTransform(smoothMouseY, [-0.5, 0.5], [-3, 3]);

  const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
    if (!containerRef.current || window.innerWidth < 768) return;
    const rect = containerRef.current.getBoundingClientRect();
    const x = (e.clientX - rect.left) / rect.width - 0.5;
    const y = (e.clientY - rect.top) / rect.height - 0.5;
    mouseX.set(x);
    mouseY.set(y);
  };

  const handleMouseLeave = () => {
    mouseX.set(0);
    mouseY.set(0);
  };

  useEffect(() => {
    const ctx = gsap.context(() => {
      gsap.fromTo(
        heroImageRef.current,
        { scale: 1.05, opacity: 0.8 },
        { scale: 1, opacity: 1, duration: 1.8, ease: "power2.out" }
      );
    }, containerRef);

    return () => ctx.revert();
  }, []);

  return (
    <div
      ref={containerRef}
      onMouseMove={handleMouseMove}
      onMouseLeave={handleMouseLeave}
      className="relative w-full md:min-h-screen overflow-hidden bg-[#000000] text-[#FAF5EE] flex flex-col justify-between select-none"
    >
      {/* 1. Background Image with Face Centered on Mobile */}
      <motion.div
        ref={heroImageRef}
        style={{ x: bgX, y: bgY }}
        className="absolute -inset-4 sm:-inset-6 pointer-events-none z-0 overflow-hidden"
      >
        <img
          src="/hero-background.png"
          alt="Addisu Legesse"
          className="h-full w-full object-cover object-[62%_22%] sm:object-[center_34%] filter brightness-[0.88] contrast-[1.08]"
        />

        {/* Apple-style deep vignetting: Mobile protects center face, Desktop provides dramatic left studio shadow */}
        <div className="absolute inset-0 bg-gradient-to-t from-black via-black/55 to-black/35 md:hidden" />
        <div className="hidden md:block absolute inset-0 bg-gradient-to-r from-black/95 via-black/60 to-transparent w-[65%]" />
        <div className="absolute inset-x-0 top-0 h-32 bg-gradient-to-b from-black/85 via-black/30 to-transparent" />
        <div className="absolute inset-x-0 bottom-0 h-24 sm:h-44 bg-gradient-to-t from-black via-black/85 to-transparent" />

        {/* Ambient subtle light gradient */}
        <div className="absolute right-[20%] top-[30%] h-64 w-64 rounded-full bg-[#E5A842]/10 blur-[100px] pointer-events-none" />
      </motion.div>

      {/* 2. Top Navigation */}
      <Navbar onAudioToggle={togglePlay} isPlaying={isPlaying} />

      {/* 3. Main Hero Body with Apple Keynote Typography */}
      <main className="relative z-10 w-full flex-1 flex flex-col justify-start md:justify-center px-5 sm:px-10 lg:px-16 pt-24 sm:pt-28 pb-8 sm:pb-10">
        <div className="w-full flex flex-col lg:flex-row lg:items-center justify-between gap-8 lg:gap-14">
          
          {/* Left Column: Eyebrow + Name + Crown + Apple CTA Buttons */}
          <motion.div
            style={{ x: textX, y: textY }}
            className="max-w-3xl flex flex-col items-start"
          >
            {/* Apple-style Frosted Pill Badge */}
            <motion.div
              initial={{ opacity: 0, y: 14 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.2, duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
              className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-white/[0.08] border border-white/[0.14] backdrop-blur-xl mb-4 sm:mb-6 shadow-sm"
            >
              <span className="h-1.5 w-1.5 rounded-full bg-[#E5A842] animate-pulse" />
              <span className="font-sans text-[10px] sm:text-[11px] font-medium tracking-[0.2em] uppercase text-neutral-300">
                The Sound of Modern Ethiopia
              </span>
              <span className="hidden xs:inline text-white/20 text-xs">•</span>
              <span className="hidden xs:inline font-mono text-[10px] text-[#E5A842] tracking-wider">
                Album Mastawesha (2025)
              </span>
            </motion.div>

            {/* Headline Name + Crown */}
            <div className="relative inline-block max-w-full mb-4 sm:mb-6">
              {/* Ultra-crisp High Fashion Editorial Heading */}
              <div className="flex flex-col font-serif leading-[1.0] sm:leading-[0.92] text-white">
                <div className="overflow-visible py-0.5 sm:py-1 relative inline-block">
                  <motion.h1
                    initial={{ y: "115%", opacity: 0 }}
                    animate={{ y: "0%", opacity: 1 }}
                    transition={{
                      delay: 0.35,
                      duration: 1.1,
                      ease: [0.16, 1, 0.3, 1],
                    }}
                    className="text-[2.8rem] xs:text-[3.5rem] sm:text-7xl md:text-8xl lg:text-[7.5rem] xl:text-[8.8rem] font-bold tracking-tight uppercase drop-shadow-[0_4px_30px_rgba(0,0,0,0.9)] inline-block relative"
                  >
                    Addisu
                    {/* Crown placed directly over the letter U of Addisu */}
                    <span className="absolute -top-6 xs:-top-8 sm:-top-16 md:-top-20 -right-3 xs:-right-5 sm:-right-8 md:-right-10 w-11 xs:w-13 sm:w-20 md:w-24 z-20 pointer-events-none inline-block">
                      <HandDrawnCrown className="w-full h-full filter drop-shadow-[0_2px_12px_rgba(229,168,66,0.6)]" />
                    </span>
                  </motion.h1>
                </div>

                <div className="overflow-hidden py-0.5 sm:py-1">
                  <motion.div
                    initial={{ y: "115%", opacity: 0 }}
                    animate={{ y: "0%", opacity: 1 }}
                    transition={{
                      delay: 0.48,
                      duration: 1.1,
                      ease: [0.16, 1, 0.3, 1],
                    }}
                    className="text-[2.8rem] xs:text-[3.5rem] sm:text-7xl md:text-8xl lg:text-[7.5rem] xl:text-[8.8rem] font-bold tracking-tight uppercase text-white drop-shadow-[0_4px_30px_rgba(0,0,0,0.9)]"
                  >
                    Legesse
                  </motion.div>
                </div>
              </div>
            </div>

            {/* Apple-style Multi-role Typography with increased spacing */}
            <motion.div
              initial={{ opacity: 0, y: 15 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.65, duration: 0.85, ease: [0.16, 1, 0.3, 1] }}
              className="mt-3 sm:mt-6 flex flex-wrap items-center gap-2.5 sm:gap-4 font-sans text-xs sm:text-sm tracking-[0.22em] sm:tracking-[0.24em] text-neutral-300 uppercase font-medium"
            >
              <span>Lead Vocalist</span>
              <span className="text-[#E5A842]">•</span>
              <span>Keyboardist</span>
              <span className="text-[#E5A842]">•</span>
              <span>Drummer</span>
            </motion.div>

            {/* Apple-style Action Buttons with generous spacing */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.8, duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
              className="mt-7 sm:mt-9 flex flex-wrap items-center gap-3.5 sm:gap-4"
            >
              {/* Primary: Play Real Audio */}
              <button
                onClick={() => {
                  playTrack(OFFICIAL_TRACKS[0]);
                }}
                className="group flex items-center gap-2.5 px-6 sm:px-7 py-3.5 rounded-full bg-white text-black font-sans text-xs sm:text-sm font-semibold hover:bg-neutral-200 active:scale-95 transition-all duration-300 shadow-[0_10px_25px_rgba(255,255,255,0.15)] cursor-pointer"
              >
                <Play className="h-4 w-4 fill-black text-black ml-0.5 group-hover:scale-110 transition-transform" />
                <span>Play Ewedshalew</span>
              </button>

              {/* Secondary: Watch Reel Video Modal */}
              <button
                onClick={() => {
                  pause();
                  setIsReelOpen(true);
                }}
                className="group flex items-center gap-2.5 px-6 py-3.5 rounded-full bg-white/[0.08] hover:bg-white/[0.14] border border-white/15 text-white font-sans text-xs sm:text-sm font-medium backdrop-blur-xl transition-all duration-300 active:scale-95 cursor-pointer"
              >
                <div className="h-2 w-2 rounded-full bg-red-500 animate-pulse" />
                <span>Watch Official Videos</span>
              </button>

              {/* Jump to Album */}
              <a
                href="#music"
                className="hidden sm:inline-flex items-center gap-1.5 px-3 py-2 text-xs text-neutral-400 hover:text-white transition-colors font-sans"
              >
                <span>Explore Album</span>
                <ArrowRight className="h-3.5 w-3.5" />
              </a>
            </motion.div>

            {/* Mobile Inline Filmstrip with breathing room */}
            <div className="lg:hidden mt-10 w-full pt-6 border-t border-white/10">
              <Filmstrip />
            </div>
          </motion.div>

          {/* Right Column: Editorial Quote + Live Music Audio Indicator (Desktop Only) */}
          <motion.div
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: 0.9, duration: 0.9, ease: [0.16, 1, 0.3, 1] }}
            className="hidden lg:flex flex-col items-end justify-end gap-6 sm:gap-10 text-right pr-0 sm:pr-4"
          >
            {/* Elegant Handwritten Quote */}
            <div className="max-w-[280px] sm:max-w-[340px] text-right">
              <span className="font-script text-2xl sm:text-3xl text-neutral-300 tracking-wide block transform -rotate-1 leading-snug">
                &ldquo;Real music. Real stories. The timeless soul of Ethiopia.&rdquo;
              </span>
              <span className="font-mono text-[10px] text-[#E5A842] uppercase tracking-[0.2em] mt-2 block">
                — Addis Legesse
              </span>
            </div>

            {/* Apple-style Live Audio Indicator Card */}
            <div
              onClick={togglePlay}
              className="flex items-center gap-3 px-4 py-2.5 rounded-2xl bg-white/[0.05] border border-white/10 backdrop-blur-2xl cursor-pointer hover:bg-white/[0.08] transition-all"
            >
              <div className="text-right">
                <span className="block text-[10px] font-mono uppercase tracking-widest text-neutral-400">
                  {isPlaying ? "Streaming Official Audio" : "Tap to Stream"}
                </span>
                <span className="block text-xs font-medium text-white truncate max-w-[120px]">
                  Ewedshalew
                </span>
              </div>
              <SoundVisualizer isPlaying={isPlaying} />
            </div>
          </motion.div>
        </div>
      </main>

      {/* 4. Bottom Filmstrip Bar (Desktop) */}
      <footer className="hidden lg:block relative z-10 w-full px-4 sm:px-10 lg:px-16 pb-4 sm:pb-6">
        <Filmstrip />
      </footer>

      {/* 5. Watch Reel Video Modal */}
      <WatchReelModal isOpen={isReelOpen} onClose={() => setIsReelOpen(false)} />
    </div>
  );
}
