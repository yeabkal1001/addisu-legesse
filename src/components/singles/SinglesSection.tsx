"use client";

import { motion } from "framer-motion";
import { Play, Pause, Award, Sparkles, ExternalLink, Tv } from "lucide-react";
import { useAudio, OFFICIAL_TRACKS, Track } from "@/context/AudioContext";
import { YoutubeIcon } from "@/components/common/SocialIcons";

export function SinglesSection() {
  const { currentTrack, isPlaying, playTrack, togglePlay, openVideoModal } = useAudio();

  // First 4 tracks are the 4 singles
  const singles = OFFICIAL_TRACKS.slice(0, 4);

  return (
    <section
      id="singles"
      className="relative w-full py-14 sm:py-36 px-5 sm:px-10 lg:px-16 bg-[#000000] text-white overflow-hidden border-t border-white/[0.06]"
    >
      {/* Background Subtle Ambience */}
      <div className="absolute left-1/3 top-1/2 -translate-y-1/2 w-[600px] h-[600px] rounded-full bg-[#E5A842]/6 blur-[160px] pointer-events-none" />

      <div className="relative z-10 max-w-7xl mx-auto">
        
        {/* Apple-style Section Header */}
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 mb-10 sm:mb-16 pb-6 sm:pb-8 border-b border-white/[0.08]">
          <div className="max-w-2xl">
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-white/[0.06] border border-white/[0.1] text-neutral-300 text-[10px] font-mono tracking-widest uppercase mb-4">
              <Sparkles className="h-3 w-3 text-[#E5A842]" />
              <span>35.7M+ Verified Digital Stream Impact</span>
            </div>

            <h2 className="text-4xl sm:text-5xl lg:text-6xl font-bold font-sans tracking-tight text-white leading-tight">
              Record-Breaking Singles.
            </h2>
            <p className="mt-3 text-neutral-400 text-sm sm:text-base font-normal leading-relaxed">
              Groundbreaking anthems that captured millions of hearts across the Horn of Africa, the global diaspora, and continental award stages.
            </p>
          </div>

          <a
            href="https://www.youtube.com/@addislegesseofficial"
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center gap-2.5 px-5 py-2.5 rounded-full border border-red-500/30 bg-red-500/10 text-xs font-medium text-red-200 hover:bg-red-500/20 transition-all font-sans"
          >
            <YoutubeIcon className="h-4 w-4 text-red-500" />
            <span>Official Channel @addislegesseofficial</span>
            <ExternalLink className="h-3 w-3 text-red-400" />
          </a>
        </div>

        {/* 4 Apple-Style Full-Image Single Poster Cards Grid with Official YouTube Thumbnails */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 lg:gap-7">
          {singles.map((single, index) => {
            const isThisTrackPlaying = isPlaying && currentTrack.id === single.id;
            const isAfrima = single.id === "enja";

            return (
              <motion.div
                key={single.id}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.8, delay: index * 0.1, ease: [0.16, 1, 0.3, 1] }}
                className={`group relative h-[490px] sm:h-[530px] rounded-[32px] overflow-hidden border transition-all duration-500 flex flex-col justify-between p-6 select-none ${
                  isThisTrackPlaying
                    ? "border-[#E5A842] shadow-[0_20px_50px_rgba(229,168,66,0.25)]"
                    : "border-white/[0.12] hover:border-white/30 shadow-[0_20px_50px_rgba(0,0,0,0.85)]"
                }`}
              >
                {/* 1. Official YouTube Video Thumbnail */}
                <img
                  src={single.coverImage}
                  alt={single.title}
                  className="absolute inset-0 z-0 h-full w-full object-cover filter brightness-[0.85] contrast-[1.08] group-hover:scale-105 group-hover:brightness-[0.95] transition-all duration-700 ease-out"
                />

                {/* 2. Apple-Grade Cinematic Gradients for Flawless Text Legibility */}
                <div className="absolute inset-0 z-[1] bg-gradient-to-t from-black via-black/60 to-black/35 pointer-events-none" />
                <div className="absolute inset-x-0 bottom-0 h-3/4 bg-gradient-to-t from-black via-black/85 to-transparent z-[1] pointer-events-none" />
                <div className="absolute inset-0 z-[1] bg-[#E5A842]/0 group-hover:bg-[#E5A842]/5 transition-colors duration-500 pointer-events-none" />

                {/* 3. Top Badges (z-10) */}
                <div className="relative z-10 flex items-center justify-between w-full">
                  <span className="px-3 py-1 rounded-full bg-black/75 backdrop-blur-md border border-white/15 text-[11px] font-mono font-medium text-white shadow-sm">
                    {single.views}
                  </span>

                  {isAfrima && (
                    <span className="flex items-center gap-1.5 px-3 py-1 rounded-full bg-[#E5A842] text-black text-[11px] font-mono font-bold shadow-lg">
                      <Award className="h-3.5 w-3.5" />
                      <span>AFRIMA 2X</span>
                    </span>
                  )}
                </div>

                {/* 4. Center Quick Play Button on Hover / Playing Wave */}
                <div
                  onClick={() => {
                    if (isThisTrackPlaying) {
                      togglePlay();
                    } else {
                      playTrack(single);
                    }
                  }}
                  className="relative z-10 my-auto flex items-center justify-center cursor-pointer"
                >
                  <div
                    className={`h-16 w-16 rounded-full flex items-center justify-center transition-all duration-300 shadow-[0_10px_30px_rgba(0,0,0,0.7)] ${
                      isThisTrackPlaying
                        ? "bg-[#E5A842] text-black scale-100 ring-4 ring-[#E5A842]/30"
                        : "bg-white/20 backdrop-blur-md border border-white/30 text-white opacity-0 group-hover:opacity-100 hover:scale-110 active:scale-95 hover:bg-white hover:text-black"
                    }`}
                  >
                    {isThisTrackPlaying ? (
                      <Pause className="h-7 w-7 fill-black text-black" />
                    ) : (
                      <Play className="h-7 w-7 fill-current ml-1" />
                    )}
                  </div>
                </div>

                {/* 5. Bottom Overlay Content (z-10) */}
                <div className="relative z-10 flex flex-col justify-end">
                  {/* Track Title (English only) */}
                  <div className="flex items-baseline justify-between mb-1">
                    <h3 className="text-2xl sm:text-[1.7rem] font-bold font-sans tracking-tight text-white group-hover:text-[#E5A842] transition-colors drop-shadow-[0_2px_10px_rgba(0,0,0,0.8)]">
                      {single.title}
                    </h3>
                  </div>

                  {/* Metadata: Year • Modal Scale */}
                  <div className="flex items-center gap-2 text-[11px] font-mono text-[#E5A842] mb-2 drop-shadow">
                    <span className="text-white/80">{single.year}</span>
                    <span className="text-white/30">•</span>
                    <span>{single.scale}</span>
                  </div>

                  {/* Song Description */}
                  <p className="text-xs text-neutral-200/90 leading-relaxed font-light line-clamp-2 mb-4 drop-shadow group-hover:text-white transition-colors">
                    {single.description}
                  </p>

                  {/* Action Buttons Row */}
                  <div className="pt-3 border-t border-white/15 flex items-center justify-between gap-2">
                    <button
                      onClick={() => {
                        if (isThisTrackPlaying) {
                          togglePlay();
                        } else {
                          playTrack(single);
                        }
                      }}
                      className={`flex items-center gap-2 px-4 py-2 rounded-full text-xs font-semibold transition-all active:scale-95 cursor-pointer shadow-md ${
                        isThisTrackPlaying
                          ? "bg-[#E5A842] text-black"
                          : "bg-white text-black hover:bg-neutral-200"
                      }`}
                    >
                      {isThisTrackPlaying ? (
                        <>
                          <Pause className="h-3.5 w-3.5 fill-black" />
                          <span>Pause</span>
                        </>
                      ) : (
                        <>
                          <Play className="h-3.5 w-3.5 fill-black ml-0.5" />
                          <span>Stream</span>
                        </>
                      )}
                    </button>

                    <div className="flex items-center gap-2">
                      <button
                        onClick={() => {
                          openVideoModal(single);
                        }}
                        className="p-2 rounded-full border border-white/20 bg-black/60 backdrop-blur-md hover:border-white/50 text-neutral-200 hover:text-white transition-all cursor-pointer active:scale-95 shadow-sm"
                        title="Watch Video"
                      >
                        <Tv className="h-4 w-4" />
                      </button>
                      <a
                        href={single.youtubeUrl}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="p-2 rounded-full border border-white/20 bg-black/60 backdrop-blur-md hover:border-red-500/50 text-neutral-200 hover:text-red-400 transition-all active:scale-95 shadow-sm"
                        title="Open on YouTube"
                      >
                        <YoutubeIcon className="h-4 w-4" />
                      </a>
                    </div>
                  </div>
                </div>
              </motion.div>
            );
          })}
        </div>

      </div>
    </section>
  );
}
