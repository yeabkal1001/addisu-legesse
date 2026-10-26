"use client";

import { useState, useRef, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Mic2, Music2, Drum, Sparkles, Play, Pause, Radio, Sliders, ArrowRight } from "lucide-react";
import { useAudio, OFFICIAL_TRACKS } from "@/context/AudioContext";

export function ArtistrySection() {
  const [activeTab, setActiveTab] = useState<"vocals" | "keys" | "drums">("vocals");
  const [activeModeIndex, setActiveModeIndex] = useState(0);
  const [activeChordIndex, setActiveChordIndex] = useState(0);
  const [isPolyrhythmActive, setIsPolyrhythmActive] = useState(false);
  const polyrhythmTimerRef = useRef<NodeJS.Timeout | null>(null);
  const [beatPulse, setBeatPulse] = useState(0);

  const { isPlaying, playTrack } = useAudio();

  // 6/8 Polyrhythm visual pulse engine
  useEffect(() => {
    if (isPolyrhythmActive) {
      polyrhythmTimerRef.current = setInterval(() => {
        setBeatPulse((prev) => (prev + 1) % 6);
      }, 160); // ~125 BPM 6/8 Ethiopian rhythm pulse
    } else {
      if (polyrhythmTimerRef.current) clearInterval(polyrhythmTimerRef.current);
      setBeatPulse(0);
    }
    return () => {
      if (polyrhythmTimerRef.current) clearInterval(polyrhythmTimerRef.current);
    };
  }, [isPolyrhythmActive]);

  // Dimension 1: The Vocal Master (Ancient Ethiopian Qenet Modal System)
  const qenetModes = [
    {
      name: "Tizita",
      scaleType: "Major / Minor Pentatonic",
      mood: "Melancholic Nostalgia & Longing",
      notes: ["C", "D", "E", "G", "A"],
      signatureSong: "Ewedshalew",
      songId: "ewedshalew",
      description:
        "The heartbeat of Ethiopian soul. Addisu's vocal delivery floats between microtonal blue notes and soaring vibrato, capturing centuries of generational memory with deep emotional warmth.",
    },
    {
      name: "Bati",
      scaleType: "Lydian Pentatonic",
      mood: "Expansive Majesty & Celebration",
      notes: ["C", "E", "F#", "G", "B"],
      signatureSong: "Etu",
      songId: "etu",
      description:
        "Characterized by the raised fourth degree, Bati evokes highland grandeur and regal celebration. Addisu's vocal range shines with effortless ornamentation and vocal clarity.",
    },
    {
      name: "Ambassel",
      scaleType: "Modal Phrygian Dominant",
      mood: "Deep Reflection & Solitude",
      notes: ["C", "Db", "F", "G", "Ab"],
      signatureSong: "Enjori",
      songId: "enjori",
      description:
        "An ancient modal scale named after the historic Wollo fortress. It requires deep breath control and subtle micro-inflection, bridging classical secular music with spiritual depth.",
    },
    {
      name: "Anchihoye",
      scaleType: "Microtonal Tension Scale",
      mood: "Passionate Devotion & Soul Yearning",
      notes: ["C", "D#", "F#", "G", "A#"],
      signatureSong: "Becha Ney Enji",
      songId: "mastawesha-album",
      description:
        "Known for its intense emotional tension and resolved climaxes. Addisu commands its delicate intervals with vocal power, precision, and subtle dynamic shading.",
    },
  ];

  // Dimension 2: The Rhodes & Keys (Harmonic Modal Jazz)
  const rhodesChords = [
    {
      name: "Mastawesha Maj9",
      voicing: "C - G - B - D - E",
      tonality: "Vintage Rhodes 73 Tremolo",
      character: "Lush, contemplative, cinematic warmth with bell-like tine harmonics",
      songId: "mastawesha-album",
      songName: "Mastawesha Album",
    },
    {
      name: "Tizita Modal 11th",
      voicing: "A - E - G - C - D",
      tonality: "Fender Rhodes + Hammond B3",
      character: "Deep harmonic suspension, classic Ethio-jazz texture and amber saturation",
      songId: "ewedshalew",
      songName: "Ewedshalew",
    },
    {
      name: "Ambassel Jazz Cluster",
      voicing: "F - C - Eb - G - Ab",
      tonality: "Acoustic Grand + Rhodes Layer",
      character: "Complex African jazz harmony recognized on the AFRIMA continental stage",
      songId: "enja",
      songName: "Enja (AFRIMA Nominee)",
    },
  ];

  const currentMode = qenetModes[activeModeIndex];
  const currentChord = rhodesChords[activeChordIndex];

  return (
    <section
      id="artistry"
      className="relative w-full py-14 sm:py-36 px-5 sm:px-10 lg:px-16 bg-[#030304] text-white overflow-hidden border-t border-white/[0.08]"
    >
      {/* Ambient Acoustic Warmth Backdrops */}
      <div className="absolute left-1/4 top-1/4 w-[650px] h-[650px] rounded-full bg-[#E5A842]/5 blur-[180px] pointer-events-none" />
      <div className="absolute right-1/4 bottom-1/4 w-[500px] h-[500px] rounded-full bg-[#8C4A14]/10 blur-[160px] pointer-events-none" />

      <div className="relative z-10 max-w-7xl mx-auto">
        
        {/* Section Header: Apple Keynote Editorial Typography */}
        <div className="flex flex-col lg:flex-row lg:items-end justify-between gap-6 sm:gap-8 mb-10 sm:mb-18 pb-6 sm:pb-10 border-b border-white/[0.08]">
          <div className="max-w-3xl">
            <motion.div
              initial={{ opacity: 0, y: 15 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-white/[0.06] border border-white/[0.12] text-neutral-300 text-[10px] font-mono tracking-widest uppercase mb-4"
            >
              <Sparkles className="h-3 w-3 text-[#E5A842]" />
              <span>Multi-Instrumental Musician</span>
              <span className="text-white/20">•</span>
              <span className="text-[#E5A842]">Live Performance Studio</span>
            </motion.div>

            <motion.h2
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: 0.1 }}
              className="text-4xl sm:text-6xl lg:text-[4.2rem] font-bold font-sans tracking-tight text-white leading-[1.05]"
            >
              The Instruments of Creation. <br />
              <span className="font-serif italic font-normal text-transparent bg-clip-text bg-gradient-to-r from-neutral-200 via-[#E5A842] to-neutral-400">
                Voice • Rhodes Keys • Kebero Drums.
              </span>
            </motion.h2>

            <motion.p
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: 0.2 }}
              className="mt-4 text-neutral-400 text-sm sm:text-base font-normal leading-relaxed max-w-2xl"
            >
              Addisu Legesse directs every dimension of his sound. Select each instrument below to explore the authentic vintage gear, modal structures, and rhythmic foundations behind his music.
            </motion.p>
          </div>

          {/* Real Studio Principle Badge */}
          <motion.div
            initial={{ opacity: 0, scale: 0.95 }}
            whileInView={{ opacity: 1, scale: 1 }}
            viewport={{ once: true }}
            className="flex flex-col gap-1.5 p-4 rounded-2xl bg-white/[0.03] border border-white/[0.08] backdrop-blur-xl lg:max-w-xs"
          >
            <div className="flex items-center gap-2 text-xs font-mono text-[#E5A842]">
              <Radio className="h-3.5 w-3.5 animate-pulse" />
              <span>ANALOG PURITY</span>
            </div>
            <p className="text-xs text-neutral-400 font-light leading-relaxed">
              Recorded through 1950s tube microphones, a 1973 Fender Rhodes electric piano, and handcrafted ox-hide Kebero drums.
            </p>
          </motion.div>
        </div>

        {/* 3 Rich Visual Instrument Cards (Voice, Keys, Drums) */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-5 sm:gap-6 mb-10 sm:mb-14">
          
          {/* Card 1: Vintage Mic (The Voice) */}
          <div
            onClick={() => setActiveTab("vocals")}
            className={`group relative h-64 sm:h-72 rounded-[28px] overflow-hidden border transition-all duration-500 cursor-pointer flex flex-col justify-between p-6 select-none ${
              activeTab === "vocals"
                ? "border-[#E5A842] ring-2 ring-[#E5A842]/40 shadow-[0_20px_50px_rgba(229,168,66,0.25)]"
                : "border-white/10 hover:border-white/30 shadow-lg"
            }`}
          >
            <img
              src="/artistry/vintage-mic.jpg"
              alt="Vintage 1950s Studio Condenser Microphone"
              className="absolute inset-0 h-full w-full object-cover filter brightness-[0.72] contrast-[1.08] group-hover:scale-105 group-hover:brightness-[0.82] transition-all duration-700 ease-out"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-black via-black/45 to-transparent pointer-events-none" />

            <div className="relative z-10 flex items-center justify-between">
              <span className={`px-3 py-1 rounded-full text-[10px] font-mono tracking-widest uppercase backdrop-blur-md border ${
                activeTab === "vocals"
                  ? "bg-[#E5A842] text-black font-bold border-[#E5A842]"
                  : "bg-black/60 text-white border-white/15"
              }`}>
                01 / THE VOICE
              </span>
              <Mic2 className={`h-4 w-4 ${activeTab === "vocals" ? "text-[#E5A842]" : "text-white/80"}`} />
            </div>

            <div className="relative z-10">
              <h3 className="text-2xl font-bold font-sans text-white drop-shadow">
                Lead Vocalist
              </h3>
              <p className="text-xs text-neutral-200/90 font-light mt-1 line-clamp-1 drop-shadow">
                Vintage 1950s Tube Mic • Ethiopian Modal Tradition
              </p>
            </div>
          </div>

          {/* Card 2: Vintage Rhodes Keys (The Harmony) */}
          <div
            onClick={() => setActiveTab("keys")}
            className={`group relative h-64 sm:h-72 rounded-[28px] overflow-hidden border transition-all duration-500 cursor-pointer flex flex-col justify-between p-6 select-none ${
              activeTab === "keys"
                ? "border-[#E5A842] ring-2 ring-[#E5A842]/40 shadow-[0_20px_50px_rgba(229,168,66,0.25)]"
                : "border-white/10 hover:border-white/30 shadow-lg"
            }`}
          >
            <img
              src="/artistry/vintage-rhodes.jpg"
              alt="Vintage 1973 Fender Rhodes Electric Piano"
              className="absolute inset-0 h-full w-full object-cover filter brightness-[0.72] contrast-[1.08] group-hover:scale-105 group-hover:brightness-[0.82] transition-all duration-700 ease-out"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-black via-black/45 to-transparent pointer-events-none" />

            <div className="relative z-10 flex items-center justify-between">
              <span className={`px-3 py-1 rounded-full text-[10px] font-mono tracking-widest uppercase backdrop-blur-md border ${
                activeTab === "keys"
                  ? "bg-[#E5A842] text-black font-bold border-[#E5A842]"
                  : "bg-black/60 text-white border-white/15"
              }`}>
                02 / THE KEYS
              </span>
              <Music2 className={`h-4 w-4 ${activeTab === "keys" ? "text-[#E5A842]" : "text-white/80"}`} />
            </div>

            <div className="relative z-10">
              <h3 className="text-2xl font-bold font-sans text-white drop-shadow">
                Fender Rhodes 73
              </h3>
              <p className="text-xs text-neutral-200/90 font-light mt-1 line-clamp-1 drop-shadow">
                Walnut Electric Piano • Modal Jazz Harmonization
              </p>
            </div>
          </div>

          {/* Card 3: Kebero & Drums (The Pulse) */}
          <div
            onClick={() => {
              setActiveTab("drums");
              setIsPolyrhythmActive(true);
            }}
            className={`group relative h-64 sm:h-72 rounded-[28px] overflow-hidden border transition-all duration-500 cursor-pointer flex flex-col justify-between p-6 select-none ${
              activeTab === "drums"
                ? "border-[#E5A842] ring-2 ring-[#E5A842]/40 shadow-[0_20px_50px_rgba(229,168,66,0.25)]"
                : "border-white/10 hover:border-white/30 shadow-lg"
            }`}
          >
            <img
              src="/artistry/kebero-drums.jpg"
              alt="Acoustic Drum Kit & Handcrafted Ethiopian Kebero Drum"
              className="absolute inset-0 h-full w-full object-cover filter brightness-[0.72] contrast-[1.08] group-hover:scale-105 group-hover:brightness-[0.82] transition-all duration-700 ease-out"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-black via-black/45 to-transparent pointer-events-none" />

            <div className="relative z-10 flex items-center justify-between">
              <span className={`px-3 py-1 rounded-full text-[10px] font-mono tracking-widest uppercase backdrop-blur-md border ${
                activeTab === "drums"
                  ? "bg-[#E5A842] text-black font-bold border-[#E5A842]"
                  : "bg-black/60 text-white border-white/15"
              }`}>
                03 / THE PULSE
              </span>
              <Drum className={`h-4 w-4 ${activeTab === "drums" ? "text-[#E5A842]" : "text-white/80"}`} />
            </div>

            <div className="relative z-10">
              <h3 className="text-2xl font-bold font-sans text-white drop-shadow">
                Drums &amp; Kebero
              </h3>
              <p className="text-xs text-neutral-200/90 font-light mt-1 line-clamp-1 drop-shadow">
                Ox-hide Kebero Percussion • 6/8 Syncopation
              </p>
            </div>
          </div>

        </div>

        {/* Dynamic Showcase Stage */}
        <AnimatePresence mode="wait">
          {activeTab === "vocals" && (
            <motion.div
              key="vocals"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -20 }}
              transition={{ duration: 0.5, ease: [0.16, 1, 0.3, 1] }}
              className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-10 items-stretch"
            >
              {/* Left Column: Authentic 1950s Tube Mic Visual Feature */}
              <div className="lg:col-span-5 relative rounded-[32px] overflow-hidden border border-white/15 bg-gradient-to-b from-[#121216] to-[#08080a] shadow-[0_25px_60px_rgba(0,0,0,0.9)] flex flex-col justify-between p-6 sm:p-8 min-h-[460px]">
                <img
                  src="/artistry/vintage-mic.jpg"
                  alt="Vintage Studio Condenser Microphone"
                  className="absolute inset-0 h-full w-full object-cover filter brightness-[0.8] contrast-[1.12]"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black via-black/55 to-black/30 pointer-events-none" />

                {/* Top Badge */}
                <div className="relative z-10 flex items-center justify-between">
                  <span className="px-3 py-1 rounded-full bg-black/75 backdrop-blur-md border border-white/15 text-[10px] font-mono uppercase tracking-wider text-[#E5A842]">
                    1950s Tube Condenser Microphone
                  </span>
                  <span className="font-mono text-[10px] text-neutral-300">
                    4-Octave Vocal Range
                  </span>
                </div>

                {/* Bottom Story Card */}
                <div className="relative z-10 pt-6">
                  <div className="p-4 sm:p-5 rounded-2xl bg-black/85 backdrop-blur-xl border border-white/15 shadow-xl">
                    <div className="flex items-center justify-between mb-2">
                      <div className="flex items-center gap-2">
                        <span className="h-2 w-2 rounded-full bg-[#E5A842]" />
                        <span className="text-xs sm:text-sm font-semibold text-white">
                          Signature Style: {currentMode.name}
                        </span>
                      </div>
                      <span className="text-[10px] font-mono text-[#E5A842]">
                        {currentMode.scaleType}
                      </span>
                    </div>

                    <p className="text-xs text-neutral-300 font-light mb-3">
                      {currentMode.mood}
                    </p>

                    <div className="flex items-center justify-between pt-2 border-t border-white/10">
                      <button
                        onClick={() => {
                          const trackToPlay = OFFICIAL_TRACKS.find((t) => t.id === currentMode.songId) || OFFICIAL_TRACKS[0];
                          playTrack(trackToPlay);
                        }}
                        className="flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-[#E5A842] text-black text-xs font-semibold hover:bg-yellow-400 active:scale-95 transition-all cursor-pointer shadow-md"
                      >
                        <Play className="h-3 w-3 fill-black text-black ml-0.5" />
                        <span>Stream {currentMode.signatureSong}</span>
                      </button>

                      <span className="text-xs text-neutral-400 font-mono">
                        Master Recording
                      </span>
                    </div>
                  </div>
                </div>
              </div>

              {/* Right Column: Ethiopian Modal System Narrative */}
              <div className="lg:col-span-7 flex flex-col justify-between p-6 sm:p-8 rounded-[32px] bg-gradient-to-b from-[#101014] to-[#0a0a0d] border border-white/10 shadow-[0_20px_50px_rgba(0,0,0,0.8)]">
                <div>
                  <div className="flex items-center justify-between pb-4 border-b border-white/10 mb-6">
                    <div>
                      <span className="text-[11px] font-mono uppercase tracking-widest text-[#E5A842]">
                        MODAL HERITAGE &amp; VOCAL PHRASING
                      </span>
                      <h4 className="text-2xl font-bold font-sans text-white mt-0.5">
                        The Four Modal Traditions
                      </h4>
                    </div>
                    <span className="text-xs font-mono text-neutral-400">
                      Select Scale
                    </span>
                  </div>

                  {/* 4 Mode Selector Buttons */}
                  <div className="grid grid-cols-2 sm:grid-cols-4 gap-2.5 mb-6">
                    {qenetModes.map((mode, idx) => {
                      const isSelected = activeModeIndex === idx;
                      return (
                        <button
                          key={mode.name}
                          onClick={() => setActiveModeIndex(idx)}
                          className={`p-3 rounded-2xl border text-left transition-all cursor-pointer ${
                            isSelected
                              ? "bg-[#E5A842]/15 border-[#E5A842] text-white shadow-md ring-1 ring-[#E5A842]/30"
                              : "bg-white/[0.03] border-white/10 text-neutral-400 hover:border-white/25 hover:text-white"
                          }`}
                        >
                          <span className="block text-[10px] font-mono uppercase tracking-wider text-[#E5A842]">
                            0{idx + 1}
                          </span>
                          <span className="block text-sm font-semibold text-white">
                            {mode.name}
                          </span>
                          <span className="block text-[11px] font-mono text-neutral-400 mt-0.5">
                            {mode.notes.join(" • ")}
                          </span>
                        </button>
                      );
                    })}
                  </div>

                  {/* Active Mode Deep Dive */}
                  <div className="p-5 rounded-2xl bg-white/[0.02] border border-white/10 mb-6">
                    <div className="flex flex-wrap items-baseline justify-between gap-2 mb-2">
                      <span className="text-lg font-bold font-sans text-white">
                        {currentMode.name} Scale
                      </span>
                      <span className="text-xs font-mono text-[#E5A842]">
                        {currentMode.scaleType}
                      </span>
                    </div>

                    <p className="text-xs sm:text-sm text-neutral-300 font-light leading-relaxed mb-4">
                      {currentMode.description}
                    </p>

                    {/* Scale Note Steps Visual */}
                    <div className="flex items-center gap-2 pt-3 border-t border-white/10">
                      <span className="text-[10px] font-mono text-neutral-400 uppercase tracking-wider mr-2">
                        Scale Degrees:
                      </span>
                      {currentMode.notes.map((note, nIdx) => (
                        <span
                          key={nIdx}
                          className="px-3 py-1 rounded-lg bg-white/[0.06] border border-white/15 text-xs font-mono text-white"
                        >
                          {note}
                        </span>
                      ))}
                    </div>
                  </div>
                </div>

                {/* Studio Vocal Chain Spec Bar */}
                <div className="flex flex-wrap items-center justify-between gap-3 pt-5 border-t border-white/10 text-xs text-neutral-400 font-mono">
                  <div className="flex items-center gap-2">
                    <Sliders className="h-4 w-4 text-[#E5A842]" />
                    <span>Microphone: 1950s Telefunken / Neumann U47 Vintage Tube ➔ Pultec EQP-1A EQ</span>
                  </div>
                </div>
              </div>
            </motion.div>
          )}

          {activeTab === "keys" && (
            <motion.div
              key="keys"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -20 }}
              transition={{ duration: 0.5, ease: [0.16, 1, 0.3, 1] }}
              className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-10 items-stretch"
            >
              {/* Left Column: Vintage 1973 Rhodes Keyboard Visual */}
              <div className="lg:col-span-5 relative rounded-[32px] overflow-hidden border border-white/15 bg-gradient-to-b from-[#121216] to-[#08080a] shadow-[0_25px_60px_rgba(0,0,0,0.9)] flex flex-col justify-between p-6 sm:p-8 min-h-[460px]">
                <img
                  src="/artistry/vintage-rhodes.jpg"
                  alt="Vintage 1973 Fender Rhodes Stage 73 Piano"
                  className="absolute inset-0 h-full w-full object-cover filter brightness-[0.8] contrast-[1.1]"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black via-black/55 to-black/30 pointer-events-none" />

                {/* Top Badge */}
                <div className="relative z-10 flex items-center justify-between">
                  <span className="px-3 py-1 rounded-full bg-black/75 backdrop-blur-md border border-white/15 text-[10px] font-mono uppercase tracking-wider text-[#E5A842]">
                    Fender Rhodes Stage 73 • 1973
                  </span>
                  <span className="font-mono text-[10px] text-neutral-300">
                    Analog Tines &amp; Preamp
                  </span>
                </div>

                {/* Bottom Story Card */}
                <div className="relative z-10 pt-6">
                  <div className="p-4 sm:p-5 rounded-2xl bg-black/85 backdrop-blur-xl border border-white/15 shadow-xl">
                    <div className="flex items-center justify-between mb-2">
                      <span className="text-xs sm:text-sm font-semibold text-white">
                        Harmonic Layer: {currentChord.name}
                      </span>
                      <span className="text-[10px] font-mono text-[#E5A842]">
                        {currentChord.tonality}
                      </span>
                    </div>

                    <p className="text-xs text-neutral-300 font-light mb-3">
                      {currentChord.character}
                    </p>

                    <div className="flex items-center justify-between pt-2 border-t border-white/10">
                      <button
                        onClick={() => {
                          const enja = OFFICIAL_TRACKS.find((t) => t.id === currentChord.songId) || OFFICIAL_TRACKS[2];
                          playTrack(enja);
                        }}
                        className="flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-[#E5A842] text-black text-xs font-semibold hover:bg-yellow-400 active:scale-95 transition-all cursor-pointer shadow-md"
                      >
                        <Play className="h-3 w-3 fill-black text-black ml-0.5" />
                        <span>Hear on {currentChord.songName}</span>
                      </button>

                      <span className="text-xs text-neutral-400 font-mono">
                        Rhodes 73 Tone
                      </span>
                    </div>
                  </div>
                </div>
              </div>

              {/* Right Column: Rhodes Voicing Showcase */}
              <div className="lg:col-span-7 flex flex-col justify-between p-6 sm:p-8 rounded-[32px] bg-gradient-to-b from-[#101014] to-[#0a0a0d] border border-white/10 shadow-[0_20px_50px_rgba(0,0,0,0.8)]">
                <div>
                  <div className="flex items-center justify-between pb-4 border-b border-white/10 mb-6">
                    <div>
                      <span className="text-[11px] font-mono uppercase tracking-widest text-[#E5A842]">
                        ELECTRIC PIANO &amp; HARMONIC ARRANGEMENTS
                      </span>
                      <h4 className="text-2xl font-bold font-sans text-white mt-0.5">
                        Rhodes 73 Modal Voicings
                      </h4>
                    </div>
                    <span className="text-xs font-mono text-neutral-400">
                      Select Voicing
                    </span>
                  </div>

                  {/* Chord Selection Buttons */}
                  <div className="grid grid-cols-1 sm:grid-cols-3 gap-3 mb-6">
                    {rhodesChords.map((chord, idx) => {
                      const isSelected = activeChordIndex === idx;
                      return (
                        <button
                          key={chord.name}
                          onClick={() => setActiveChordIndex(idx)}
                          className={`p-3.5 rounded-2xl border text-left transition-all cursor-pointer ${
                            isSelected
                              ? "bg-[#E5A842]/15 border-[#E5A842] text-white shadow-md ring-1 ring-[#E5A842]/30"
                              : "bg-white/[0.03] border-white/10 text-neutral-400 hover:border-white/25 hover:text-white"
                          }`}
                        >
                          <span className="block text-[10px] font-mono uppercase tracking-wider text-[#E5A842]">
                            VOICING 0{idx + 1}
                          </span>
                          <span className="block text-sm font-semibold text-white">
                            {chord.name}
                          </span>
                          <span className="block text-xs font-mono text-neutral-400 mt-0.5 truncate">
                            {chord.voicing}
                          </span>
                        </button>
                      );
                    })}
                  </div>

                  {/* Stylized Rhodes Keyboard Graphic */}
                  <div className="p-5 rounded-2xl bg-[#09090c] border border-white/15 mb-6">
                    <div className="flex items-center justify-between mb-4">
                      <span className="text-xs font-mono text-[#E5A842] uppercase tracking-wider">
                        Active Voicing: {currentChord.name} ({currentChord.voicing})
                      </span>
                      <span className="text-[10px] font-mono text-neutral-500">
                        Weighted Rhodes Action
                      </span>
                    </div>

                    {/* Stylized Piano Keys Bar */}
                    <div className="flex items-end justify-between h-24 bg-neutral-950 p-2 rounded-xl border border-white/10 overflow-hidden gap-1">
                      {["C", "D", "E", "F", "G", "A", "B", "C2", "D2", "E2", "F2", "G2"].map((keyNote, kIdx) => {
                        const baseNote = keyNote.replace("2", "");
                        const isNoteInChord = currentChord.voicing.includes(baseNote);
                        return (
                          <div
                            key={kIdx}
                            className={`flex-1 h-full rounded-b-md transition-all duration-300 flex flex-col justify-end items-center pb-2 ${
                              isNoteInChord
                                ? "bg-gradient-to-t from-[#E5A842] to-[#FFF3D6] text-black font-bold shadow-[0_0_15px_rgba(229,168,66,0.6)] transform translate-y-1"
                                : "bg-white/80 text-black/60"
                            }`}
                          >
                            <span className="text-[10px] font-mono">{keyNote}</span>
                          </div>
                        );
                      })}
                    </div>
                  </div>
                </div>

                {/* Studio Hardware Specs */}
                <div className="flex flex-wrap items-center justify-between gap-3 pt-5 border-t border-white/10 text-xs text-neutral-400 font-mono">
                  <div className="flex items-center gap-2">
                    <Sliders className="h-4 w-4 text-[#E5A842]" />
                    <span>Keyboards: 1973 Rhodes Stage 73 • Roland Juno-106 • Wurlitzer 200A • Yamaha Grand Piano</span>
                  </div>
                </div>
              </div>
            </motion.div>
          )}

          {activeTab === "drums" && (
            <motion.div
              key="drums"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -20 }}
              transition={{ duration: 0.5, ease: [0.16, 1, 0.3, 1] }}
              className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-10 items-stretch"
            >
              {/* Left Column: Acoustic Drum Kit & Kebero Visual */}
              <div className="lg:col-span-5 relative rounded-[32px] overflow-hidden border border-white/15 bg-gradient-to-b from-[#121216] to-[#08080a] shadow-[0_25px_60px_rgba(0,0,0,0.9)] flex flex-col justify-between p-6 sm:p-8 min-h-[460px]">
                <img
                  src="/artistry/kebero-drums.jpg"
                  alt="Acoustic Drum Kit and Handcrafted Ethiopian Kebero Drum"
                  className="absolute inset-0 h-full w-full object-cover filter brightness-[0.8] contrast-[1.12]"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black via-black/55 to-black/30 pointer-events-none" />

                {/* Top Badge */}
                <div className="relative z-10 flex items-center justify-between">
                  <span className="px-3 py-1 rounded-full bg-black/75 backdrop-blur-md border border-white/15 text-[10px] font-mono uppercase tracking-wider text-[#E5A842]">
                    Traditional Kebero + Acoustic Studio Kit
                  </span>
                  <span className="font-mono text-[10px] text-neutral-300">
                    6/8 &amp; 12/8 Polyrhythms
                  </span>
                </div>

                {/* Bottom Audition Card */}
                <div className="relative z-10 pt-6">
                  <div className="p-4 sm:p-5 rounded-2xl bg-black/85 backdrop-blur-xl border border-white/15 shadow-xl">
                    <div className="flex items-center justify-between mb-2">
                      <span className="text-xs sm:text-sm font-semibold text-white">
                        Polyrhythm Engine: 6/8 Eskista Pulse
                      </span>
                      <span className="text-[10px] font-mono text-[#E5A842]">
                        {isPolyrhythmActive ? "Active • 125 BPM" : "Ready"}
                      </span>
                    </div>

                    <p className="text-xs text-neutral-300 font-light mb-3">
                      Syncopated Ethiopian shoulder-dance time signatures seamlessly intertwined with modern snare grooves.
                    </p>

                    <div className="flex flex-wrap items-center justify-between gap-2 pt-2 border-t border-white/10">
                      <button
                        onClick={() => setIsPolyrhythmActive(!isPolyrhythmActive)}
                        className="flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-[#E5A842] text-black text-xs font-semibold hover:bg-yellow-400 active:scale-95 transition-all cursor-pointer shadow-md"
                      >
                        {isPolyrhythmActive ? <Pause className="h-3.5 w-3.5 fill-black" /> : <Play className="h-3.5 w-3.5 fill-black ml-0.5" />}
                        <span>{isPolyrhythmActive ? "Pause Rhythm Pulse" : "Engage 6/8 Pulse"}</span>
                      </button>

                      <button
                        onClick={() => {
                          const enjori = OFFICIAL_TRACKS.find((t) => t.id === "enjori") || OFFICIAL_TRACKS[1];
                          playTrack(enjori);
                        }}
                        className="flex items-center gap-1.5 text-xs text-neutral-300 hover:text-white transition-colors cursor-pointer"
                      >
                        <span>Hear on Enjori</span>
                        <ArrowRight className="h-3 w-3" />
                      </button>
                    </div>
                  </div>
                </div>
              </div>

              {/* Right Column: 6/8 Polyrhythmic Pulse Clock */}
              <div className="lg:col-span-7 flex flex-col justify-between p-6 sm:p-8 rounded-[32px] bg-gradient-to-b from-[#101014] to-[#0a0a0d] border border-white/10 shadow-[0_20px_50px_rgba(0,0,0,0.8)]">
                <div>
                  <div className="flex items-center justify-between pb-4 border-b border-white/10 mb-6">
                    <div>
                      <span className="text-[11px] font-mono uppercase tracking-widest text-[#E5A842]">
                        RHYTHMIC MATRIX &amp; PERCUSSION ARCHITECTURE
                      </span>
                      <h4 className="text-2xl font-bold font-sans text-white mt-0.5">
                        6/8 Kebero &amp; Drumming Foundation
                      </h4>
                    </div>
                    <span className="text-xs font-mono text-neutral-400">
                      Eskista Signature
                    </span>
                  </div>

                  {/* Polyrhythm Step Visualizer */}
                  <div className="p-6 rounded-2xl bg-white/[0.02] border border-white/10 mb-6">
                    <div className="flex items-center justify-between mb-4">
                      <span className="text-xs font-mono text-white">
                        6-Beat Polyrhythmic Cycle (3 against 2)
                      </span>
                      <span className="text-xs font-mono text-[#E5A842]">
                        Beat {beatPulse + 1} of 6
                      </span>
                    </div>

                    {/* 6 Step Pulsing Beats */}
                    <div className="grid grid-cols-6 gap-2 mb-4">
                      {[0, 1, 2, 3, 4, 5].map((step) => {
                        const isCurrentBeat = isPolyrhythmActive && beatPulse === step;
                        const isAccent = step === 0 || step === 3; // 6/8 primary accents

                        return (
                          <div
                            key={step}
                            className={`h-20 rounded-xl flex flex-col items-center justify-between p-2.5 transition-all duration-150 border ${
                              isCurrentBeat
                                ? "bg-[#E5A842] border-[#E5A842] text-black shadow-[0_0_20px_rgba(229,168,66,0.8)] scale-105"
                                : isAccent
                                ? "bg-white/[0.08] border-white/20 text-white"
                                : "bg-white/[0.02] border-white/5 text-neutral-500"
                            }`}
                          >
                            <span className="text-[10px] font-mono font-bold">
                              {step + 1}
                            </span>
                            <span className="text-[9px] font-mono uppercase tracking-tight text-center">
                              {step === 0 ? "Kebero Dum" : step === 3 ? "Kebero Tek" : "Ghost"}
                            </span>
                          </div>
                        );
                      })}
                    </div>

                    <p className="text-xs sm:text-sm text-neutral-300 font-light leading-relaxed">
                      In Ethiopian music, the 6/8 meter drives traditional shoulder dance movements (Eskista). Addisu pairs the deep resonant low end of the handcrafted Kebero with crisp 16th-note ghost snare work and Istanbul Agop cymbals.
                    </p>
                  </div>
                </div>

                {/* Percussion Hardware Specs */}
                <div className="flex flex-wrap items-center justify-between gap-3 pt-5 border-t border-white/10 text-xs text-neutral-400 font-mono">
                  <div className="flex items-center gap-2">
                    <Sliders className="h-4 w-4 text-[#E5A842]" />
                    <span>Drums: Handcrafted Ethiopian Kebero (Ox-hide) • Gretsch Broadkaster Studio Kit • Istanbul Agop 22&quot; Ride</span>
                  </div>
                </div>
              </div>
            </motion.div>
          )}
        </AnimatePresence>

      </div>
    </section>
  );
}
