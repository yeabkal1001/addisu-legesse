"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Download, Award, Sparkles, Play } from "lucide-react";
import { useAudio, OFFICIAL_TRACKS } from "@/context/AudioContext";

export function AboutSection() {
  const [activeChapter, setActiveChapter] = useState(0);
  const { playTrack } = useAudio();

  const chapters = [
    {
      period: "2014 — 2019",
      title: "Rhythm & Traditional Foundations",
      highlight: "Mastering the Kebero & Studio Drums",
      description:
        "Starting out as a drummer in Addis Ababa, Addisu spent his early years immersed in traditional Ethiopian percussion. Before stepping up as a vocalist, he developed an instinctive feel for time and groove, playing both the double-headed Kebero drum and modern drum kits.",
      stat: "5 Years",
      statLabel: "Percussion & Rhythmic Training",
    },
    {
      period: "2020 — 2022",
      title: "Keys, Harmony & Rhodes",
      highlight: "Blending Ethio-Jazz with Warm Rhodes Chords",
      description:
        "Drawn to the rich heritage of Ethiopian music and golden-era soul, Addisu took to the keyboards. Working with a 1973 Fender Rhodes Stage 73, he began arranging traditional pentatonic modal scales (Tizita, Bati, Ambassel, and Anchihoye) with warm, modern jazz harmony.",
      stat: "4 Scales",
      statLabel: "Modal Music Foundations",
    },
    {
      period: "2023 — 2024",
      title: "Breakthrough Singles & AFRIMA",
      highlight: "Over 35.7 Million Worldwide Views",
      description:
        "His singles Ewedshalew, Enjori, Etu, and Enja found an immediate, enthusiastic audience across Ethiopia and around the world. The breakout single 'Enja' earned two nominations at the All Africa Music Awards (AFRIMA) for Best Male Artist in Eastern Africa and Best Duo/Group in African Jazz.",
      stat: "35.7M+",
      statLabel: "Verified YouTube Views",
    },
    {
      period: "2025 — PRESENT",
      title: "Debut Album: Mastawesha",
      highlight: "14-Track Live Studio Recording",
      description:
        "In 2025, Addisu released Mastawesha ('Memories') — a full-length 14-track studio album recorded with live instrumentation, acoustic warmth, and expressive vocals that celebrate the depth of Ethiopian soul.",
      stat: "14 Songs",
      statLabel: "Full Studio Album",
    },
  ];

  const current = chapters[activeChapter];

  return (
    <section
      id="about"
      className="relative w-full py-12 sm:py-36 px-5 sm:px-10 lg:px-16 bg-[#030304] text-white overflow-hidden border-t border-white/[0.08]"
    >
      {/* Background Luminescence */}
      <div className="absolute top-1/3 left-1/4 w-[700px] h-[700px] bg-gradient-to-br from-[#E5A842]/8 via-[#8C4A14]/5 to-transparent rounded-full blur-[200px] pointer-events-none" />
      <div className="absolute bottom-10 right-10 w-[500px] h-[500px] bg-white/[0.02] rounded-full blur-[160px] pointer-events-none" />

      <div className="relative z-10 max-w-7xl mx-auto">
        
        {/* Editorial Header */}
        <div className="flex flex-col lg:flex-row lg:items-end justify-between gap-6 sm:gap-8 mb-10 sm:mb-24 pb-8 sm:pb-12 border-b border-white/[0.08]">
          <div className="max-w-3xl">
            <motion.div
              initial={{ opacity: 0, y: 15 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-white/[0.06] border border-white/[0.12] text-neutral-300 text-[10px] font-mono tracking-widest uppercase mb-5"
            >
              <Sparkles className="h-3 w-3 text-[#E5A842]" />
              <span>Biography &amp; Musical Journey</span>
              <span className="text-white/20">•</span>
              <span className="text-[#E5A842]">Addis Ababa, Ethiopia</span>
            </motion.div>

            <motion.h2
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: 0.1 }}
              className="text-4xl sm:text-6xl lg:text-[4.5rem] font-bold font-sans tracking-tight text-white leading-[1.02]"
            >
              The Story &amp; Sound of <br />
              <span className="font-serif italic font-normal text-transparent bg-clip-text bg-gradient-to-r from-neutral-200 via-[#E5A842] to-neutral-400">
                Addisu Legesse.
              </span>
            </motion.h2>
          </div>

          <motion.div
            initial={{ opacity: 0, x: 20 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            className="flex flex-col items-start lg:items-end gap-3"
          >
            <div className="flex items-center gap-2 px-3 py-1.5 rounded-full bg-amber-500/10 border border-amber-500/20 text-[#E5A842] text-xs font-mono">
              <Award className="h-3.5 w-3.5" />
              <span>AFRIMA 2X Continental Nominee</span>
            </div>
            <a
              href="/Addisu_Legesse_Resume_reference.pdf"
              download="Addisu_Legesse_Official_CV.pdf"
              className="inline-flex items-center gap-2 px-5 py-2.5 rounded-full bg-white text-black text-xs font-semibold hover:bg-neutral-200 transition-all shadow-[0_10px_25px_rgba(255,255,255,0.15)] active:scale-95 cursor-pointer"
            >
              <Download className="h-3.5 w-3.5" />
              <span>Download Press CV (PDF)</span>
            </a>
          </motion.div>
        </div>

        {/* Dual Editorial Display */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-12 items-stretch">
          
          {/* Left Column: Portrait Photography */}
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8 }}
            className="lg:col-span-5 relative rounded-[28px] sm:rounded-[36px] overflow-hidden border border-white/15 bg-gradient-to-b from-[#141418] to-[#0a0a0d] shadow-[0_30px_70px_rgba(0,0,0,0.9)] p-4 sm:p-6 flex flex-col justify-between min-h-[580px] sm:min-h-[620px] group"
          >
            {/* Background Portrait Photo - Pristine studio session without chevrons */}
            <img
              src="/hero-background.png"
              alt="Addisu Legesse Studio Session"
              className="absolute inset-0 h-full w-full object-cover object-[62%_15%] sm:object-[60%_25%] filter brightness-[0.88] contrast-[1.08] group-hover:scale-105 transition-transform duration-700 ease-out"
            />
            {/* Smooth Atmospheric Bottom Vignette */}
            <div className="absolute inset-0 bg-gradient-to-t from-[#030304] via-[#030304]/75 via-45% to-black/30 pointer-events-none" />

            {/* Top Telemetry Stamp */}
            <div className="relative z-10 flex items-center justify-between">
              <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-black/60 backdrop-blur-md border border-white/15 shadow-sm">
                <span className="h-1.5 w-1.5 rounded-full bg-[#E5A842] animate-pulse" />
                <span className="font-mono text-[10px] uppercase tracking-wider text-[#E5A842]">
                  ARTIST PROFILE
                </span>
              </div>
              <span className="font-mono text-[10px] text-neutral-300 tracking-wider uppercase">
                ADDIS ABABA, ETHIOPIA
              </span>
            </div>

            {/* Bottom Card: Sound Bite & Philosophy */}
            <div className="relative z-10 p-4 sm:p-5 rounded-2xl bg-black/65 backdrop-blur-xl border border-white/12 shadow-[0_15px_35px_rgba(0,0,0,0.7)] mt-auto">
              <div className="flex items-center justify-between mb-2">
                <span className="text-[10px] font-mono uppercase tracking-widest text-[#E5A842]">
                  ARTISTIC PHILOSOPHY
                </span>
                <span className="text-[11px] font-mono text-neutral-400">
                  Addis Ababa
                </span>
              </div>
              <p className="font-serif italic text-base sm:text-lg text-neutral-100 leading-snug">
                &ldquo;Music is about heartfelt storytelling and genuine emotion. It brings the timeless melodies of our heritage forward into the modern world.&rdquo;
              </p>
              <div className="mt-3 pt-2.5 border-t border-white/10 flex items-center justify-between gap-2">
                <span className="text-[11px] sm:text-xs text-neutral-400 font-sans font-medium truncate">
                  Addis Legesse Management
                </span>
                <button
                  onClick={() => playTrack(OFFICIAL_TRACKS[0])}
                  className="flex items-center gap-1.5 px-3 py-1.5 rounded-full bg-[#E5A842]/10 hover:bg-[#E5A842] text-[#E5A842] hover:text-black border border-[#E5A842]/30 text-xs font-sans font-medium transition-all active:scale-95 shrink-0 cursor-pointer"
                >
                  <Play className="h-3 w-3 fill-current" />
                  <span>Stream Ewedshalew</span>
                </button>
              </div>
            </div>
          </motion.div>

          {/* Right Column: Interactive Journey (Chapters) */}
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8, delay: 0.15 }}
            className="lg:col-span-7 flex flex-col justify-between"
          >
            {/* Chapter Navigation Stepper */}
            <div className="grid grid-cols-2 sm:grid-cols-4 gap-2 mb-6">
              {chapters.map((ch, idx) => {
                const isActive = activeChapter === idx;
                return (
                  <button
                    key={ch.period}
                    onClick={() => setActiveChapter(idx)}
                    className={`p-3.5 rounded-2xl border text-left transition-all duration-300 cursor-pointer ${
                      isActive
                        ? "bg-[#E5A842]/15 border-[#E5A842] text-white shadow-lg ring-1 ring-[#E5A842]/40"
                        : "bg-white/[0.02] border-white/10 text-neutral-400 hover:border-white/25 hover:text-white"
                    }`}
                  >
                    <span className="block text-[9px] font-mono uppercase tracking-wider text-[#E5A842]">
                      STAGE 0{idx + 1}
                    </span>
                    <span className="block text-xs font-mono font-medium text-white truncate">
                      {ch.period}
                    </span>
                  </button>
                );
              })}
            </div>

            {/* Active Chapter Feature Card with AnimatePresence */}
            <div className="flex-1 p-6 sm:p-9 rounded-[32px] bg-gradient-to-b from-[#101014] to-[#0a0a0d] border border-white/10 shadow-[0_20px_50px_rgba(0,0,0,0.8)] flex flex-col justify-between mb-6 min-h-[300px]">
              <AnimatePresence mode="wait">
                <motion.div
                  key={current.period}
                  initial={{ opacity: 0, y: 15 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -15 }}
                  transition={{ duration: 0.35, ease: [0.16, 1, 0.3, 1] }}
                >
                  <div className="flex flex-wrap items-center justify-between gap-2 mb-3">
                    <span className="text-xs font-mono uppercase tracking-widest text-[#E5A842]">
                      {current.period} • {current.highlight}
                    </span>
                  </div>

                  <h3 className="text-2xl sm:text-3xl font-bold font-sans tracking-tight text-white mb-4">
                    {current.title}
                  </h3>

                  <p className="text-sm sm:text-base text-neutral-300 leading-relaxed font-light mb-6">
                    {current.description}
                  </p>

                  <div className="p-4 rounded-2xl bg-white/[0.03] border border-white/10 flex items-center justify-between">
                    <div>
                      <span className="text-xs text-neutral-400 font-mono block">
                        Milestone:
                      </span>
                      <span className="text-xl sm:text-2xl font-bold font-sans text-white">
                        {current.stat}
                      </span>
                    </div>
                    <span className="text-xs font-mono text-[#E5A842] max-w-[200px] text-right">
                      {current.statLabel}
                    </span>
                  </div>
                </motion.div>
              </AnimatePresence>
            </div>

            {/* 4 Essential Facts Counter Bar */}
            <div className="grid grid-cols-2 sm:grid-cols-4 gap-3">
              <div className="p-4 rounded-2xl bg-white/[0.02] border border-white/10 text-center">
                <span className="block text-2xl sm:text-3xl font-bold font-sans text-white">
                  35.7M+
                </span>
                <span className="block text-[10px] font-mono text-neutral-400 mt-1 uppercase tracking-wider">
                  Verified Views
                </span>
              </div>

              <div className="p-4 rounded-2xl bg-white/[0.02] border border-white/10 text-center">
                <span className="block text-2xl sm:text-3xl font-bold font-sans text-[#E5A842]">
                  2X
                </span>
                <span className="block text-[10px] font-mono text-neutral-400 mt-1 uppercase tracking-wider">
                  AFRIMA Nominee
                </span>
              </div>

              <div className="p-4 rounded-2xl bg-white/[0.02] border border-white/10 text-center">
                <span className="block text-2xl sm:text-3xl font-bold font-sans text-white">
                  14
                </span>
                <span className="block text-[10px] font-mono text-neutral-400 mt-1 uppercase tracking-wider">
                  Album Songs
                </span>
              </div>

              <div className="p-4 rounded-2xl bg-white/[0.02] border border-white/10 text-center">
                <span className="block text-2xl sm:text-3xl font-bold font-sans text-white">
                  3-in-1
                </span>
                <span className="block text-[10px] font-mono text-neutral-400 mt-1 uppercase tracking-wider">
                  Voice • Keys • Drums
                </span>
              </div>
            </div>

          </motion.div>
        </div>

      </div>
    </section>
  );
}
