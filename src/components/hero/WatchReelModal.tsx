"use client";

import { motion, AnimatePresence } from "framer-motion";
import { X, ExternalLink, Play } from "lucide-react";
import { useState, useEffect } from "react";
import { OFFICIAL_TRACKS, useAudio } from "@/context/AudioContext";
import { YoutubeIcon } from "@/components/common/SocialIcons";

interface WatchReelModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export function WatchReelModal({ isOpen, onClose }: WatchReelModalProps) {
  const { pause } = useAudio();
  const [selectedVideo, setSelectedVideo] = useState(OFFICIAL_TRACKS[2]); // Enja by default

  // Synchronously halt any playing background audio when the modal opens
  useEffect(() => {
    if (isOpen) {
      pause();
    }
  }, [isOpen, pause]);

  return (
    <AnimatePresence>
      {isOpen && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.3 }}
          className="fixed inset-0 z-50 flex items-center justify-center p-3 sm:p-6 md:p-8 bg-black/90 backdrop-blur-2xl"
          onClick={onClose}
        >
          <motion.div
            initial={{ scale: 0.94, opacity: 0, y: 20 }}
            animate={{ scale: 1, opacity: 1, y: 0 }}
            exit={{ scale: 0.96, opacity: 0, y: 15 }}
            transition={{ type: "spring", damping: 28, stiffness: 320 }}
            className="relative w-full max-w-5xl overflow-hidden rounded-3xl border border-white/15 bg-[#0a0a0c] shadow-[0_30px_90px_rgba(0,0,0,0.95)]"
            onClick={(e) => e.stopPropagation()}
          >
            {/* Modal Header */}
            <div className="flex items-center justify-between border-b border-white/10 px-5 sm:px-7 py-4 bg-white/[0.02]">
              <div className="flex items-center gap-3">
                <span className="inline-block h-2 w-2 rounded-full bg-red-500 animate-pulse" />
                <span className="font-sans text-xs sm:text-sm font-semibold tracking-wide text-white">
                  Addisu Legesse — Official Music Videos
                </span>
                <span className="text-white/20 text-xs hidden sm:inline">•</span>
                <span className="text-xs text-neutral-400 hidden sm:inline font-mono">
                  @addislegesseofficial
                </span>
              </div>

              <div className="flex items-center gap-2">
                <a
                  href={selectedVideo.youtubeUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex items-center gap-1.5 px-3 py-1.5 rounded-full border border-white/10 bg-white/5 hover:bg-white/10 text-white text-xs transition-colors"
                >
                  <YoutubeIcon className="h-3.5 w-3.5 text-red-500" />
                  <span className="hidden sm:inline">Open on YouTube</span>
                  <ExternalLink className="h-3 w-3 text-neutral-400" />
                </a>
                <button
                  onClick={onClose}
                  className="flex h-8 w-8 items-center justify-center rounded-full border border-white/10 bg-white/5 text-white/80 transition-all hover:bg-white/15 hover:text-white"
                  aria-label="Close modal"
                >
                  <X className="h-4 w-4" />
                </button>
              </div>
            </div>

            {/* Video Player Embed Area */}
            <div className="relative aspect-video w-full bg-black">
              <iframe
                src={`https://www.youtube-nocookie.com/embed/${selectedVideo.youtubeId}?autoplay=1&enablejsapi=1&rel=0&modestbranding=1`}
                title={selectedVideo.title}
                className="w-full h-full border-0"
                allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
                allowFullScreen
              />
            </div>

            {/* Track Selector Bar (Apple-style pill selector) */}
            <div className="bg-[#0e0e11] px-4 sm:px-6 py-3 border-t border-white/10 overflow-x-auto scrollbar-none">
              <div className="flex items-center gap-2.5 min-w-max">
                <span className="text-[11px] font-mono uppercase tracking-wider text-neutral-400 pr-2">
                  Select Video:
                </span>
                {OFFICIAL_TRACKS.map((track) => {
                  const isSelected = selectedVideo.id === track.id;
                  return (
                    <button
                      key={track.id}
                      onClick={() => setSelectedVideo(track)}
                      className={`flex items-center gap-2.5 pl-1.5 pr-3.5 py-1.5 rounded-full text-xs transition-all ${
                        isSelected
                          ? "bg-white text-black font-semibold shadow-md"
                          : "bg-white/5 text-neutral-300 hover:bg-white/10 hover:text-white border border-white/5"
                      }`}
                    >
                      <div className="h-6 w-9 rounded overflow-hidden shrink-0 border border-white/10">
                        <img
                          src={track.coverImage}
                          alt={track.title}
                          className="h-full w-full object-cover"
                        />
                      </div>
                      <span>{track.title}</span>
                    </button>
                  );
                })}
              </div>
            </div>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
