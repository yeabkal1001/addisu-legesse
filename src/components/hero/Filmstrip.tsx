"use client";

import { motion } from "framer-motion";
import { Play, Pause, Disc } from "lucide-react";
import { useAudio, OFFICIAL_TRACKS } from "@/context/AudioContext";

export function Filmstrip() {
  const { currentTrack, isPlaying, playTrack, togglePlay } = useAudio();

  // The 4 smash singles with their official YouTube thumbnails
  const filmItems = OFFICIAL_TRACKS.slice(0, 4);

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ delay: 0.95, duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
      className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 sm:gap-4 select-none w-full"
    >
      <div className="flex flex-col sm:flex-row sm:items-center gap-2.5 sm:gap-3 w-full sm:w-auto">
        {/* Label badge */}
        <span className="font-mono text-[10px] tracking-widest uppercase text-[#E5A842] flex items-center gap-2 shrink-0">
          <Disc className={`h-3.5 w-3.5 ${isPlaying ? "animate-spin" : ""}`} />
          <span>Featured Singles</span>
        </span>

        {/* 4 Interactive Single Thumbnails */}
        <div className="flex items-center gap-2 sm:gap-2.5 p-1.5 rounded-2xl border border-white/10 bg-black/60 backdrop-blur-xl shadow-lg overflow-x-auto scrollbar-none w-full sm:w-auto">
          {filmItems.map((track, idx) => {
            const isThisPlaying = isPlaying && currentTrack.id === track.id;

            return (
              <motion.button
                key={track.id}
                onClick={() => {
                  if (isThisPlaying) {
                    togglePlay();
                  } else {
                    playTrack(track);
                  }
                }}
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.96 }}
                className={`group relative h-11 w-18 xs:h-12 xs:w-20 sm:h-12 sm:w-22 shrink-0 overflow-hidden rounded-xl transition-all duration-300 ${
                  isThisPlaying
                    ? "ring-2 ring-[#E5A842] shadow-[0_0_15px_rgba(229,168,66,0.5)]"
                    : "opacity-80 hover:opacity-100 ring-1 ring-white/10 hover:ring-white/30"
                }`}
                title={`Click to play: ${track.title} (${track.views})`}
                aria-label={`Play ${track.title}`}
              >
                {/* YouTube Thumbnail Image */}
                <img
                  src={track.coverImage}
                  alt={track.title}
                  className={`h-full w-full object-cover transition-all duration-500 ${
                    isThisPlaying ? "brightness-105 contrast-110" : "brightness-85 group-hover:brightness-100"
                  }`}
                />

                {/* Film frame overlay */}
                <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/20 to-transparent" />

                {/* Track number badge */}
                <span className="absolute top-1 left-1 font-mono text-[8px] sm:text-[9px] text-white/80 font-bold px-1 rounded bg-black/60">
                  0{idx + 1}
                </span>

                {/* Playing Equalizer Wave or Hover Play Icon */}
                <div className="absolute inset-0 flex items-center justify-center pointer-events-none">
                  {isThisPlaying ? (
                    <div className="flex items-end gap-0.5 h-3">
                      {[40, 90, 60, 100].map((h, i) => (
                        <span
                          key={i}
                          className="w-0.5 bg-[#E5A842] rounded-full animate-pulse"
                          style={{ height: `${h}%`, animationDelay: `${i * 0.15}s` }}
                        />
                      ))}
                    </div>
                  ) : (
                    <div className="h-5 w-5 rounded-full bg-white/20 backdrop-blur-sm opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center">
                      <Play className="h-2.5 w-2.5 fill-white text-white ml-0.5" />
                    </div>
                  )}
                </div>

                {/* Track Title snippet */}
                <span className="absolute bottom-0.5 inset-x-0 text-center font-sans font-medium text-[8px] sm:text-[9px] text-white truncate px-1">
                  {track.title}
                </span>
              </motion.button>
            );
          })}
        </div>
      </div>

      {/* Quick Stream Hint */}
      <div className="hidden sm:flex items-center gap-2 text-[10px] font-mono text-neutral-400">
        <span className="h-1.5 w-1.5 rounded-full bg-[#E5A842] animate-pulse" />
        <span>Tap any thumbnail to stream instantly</span>
      </div>
    </motion.div>
  );
}
