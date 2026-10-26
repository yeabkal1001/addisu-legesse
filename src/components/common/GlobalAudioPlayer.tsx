"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import {
  Play,
  Pause,
  SkipBack,
  SkipForward,
  Volume2,
  VolumeX,
  Maximize2,
  Minimize2,
  X,
  ExternalLink,
  Tv,
} from "lucide-react";
import { useAudio } from "@/context/AudioContext";
import { YoutubeIcon } from "./SocialIcons";

function formatTime(seconds: number): string {
  if (isNaN(seconds) || seconds < 0) return "00:00";
  const mins = Math.floor(seconds / 60);
  const secs = Math.floor(seconds % 60);
  return `${mins < 10 ? "0" : ""}${mins}:${secs < 10 ? "0" : ""}${secs}`;
}

export function GlobalAudioPlayer() {
  const {
    currentTrack,
    isPlaying,
    currentTime,
    duration,
    volume,
    isMuted,
    isVideoModalOpen,
    togglePlay,
    seekTo,
    setVolume,
    toggleMute,
    toggleVideoModal,
    nextTrack,
    prevTrack,
  } = useAudio();

  const [showVolumeSlider, setShowVolumeSlider] = useState(false);
  const progressPercent = duration > 0 ? (currentTime / duration) * 100 : 0;

  const handleSeek = (e: React.MouseEvent<HTMLDivElement>) => {
    const rect = e.currentTarget.getBoundingClientRect();
    const clickX = e.clientX - rect.left;
    const ratio = Math.max(0, Math.min(1, clickX / rect.width));
    seekTo(ratio * duration);
  };

  return (
    <>
      {/* 1. Fixed Apple-Style Floating Audio Dock */}
      <motion.div
        initial={{ y: 80, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ duration: 0.6, ease: [0.16, 1, 0.3, 1] }}
        className="fixed bottom-4 sm:bottom-6 inset-x-0 z-40 flex justify-center px-3 sm:px-6 pointer-events-none"
      >
        <div className="pointer-events-auto w-full max-w-2xl bg-[#0f0f11]/90 backdrop-blur-2xl border border-white/[0.12] rounded-2xl sm:rounded-full px-3.5 sm:px-5 py-2.5 shadow-[0_20px_50px_rgba(0,0,0,0.85),inset_0_1px_1px_rgba(255,255,255,0.12)] flex flex-col sm:flex-row items-center gap-2 sm:gap-4 select-none">
          
          {/* Left: Thumbnail & Track Details */}
          <div className="w-full sm:w-auto flex items-center justify-between sm:justify-start gap-3 min-w-0">
            <div className="flex items-center gap-3 min-w-0">
              <div className="relative h-10 w-10 sm:h-11 sm:w-11 rounded-lg sm:rounded-xl overflow-hidden shrink-0 border border-white/10 shadow-md">
                <img
                  src={currentTrack.coverImage}
                  alt={currentTrack.title}
                  className={`h-full w-full object-cover transition-transform duration-700 ${
                    isPlaying ? "scale-105" : "scale-100"
                  }`}
                />
                {isPlaying && (
                  <div className="absolute inset-0 bg-black/20 flex items-center justify-center">
                    <span className="h-2 w-2 rounded-full bg-white animate-ping" />
                  </div>
                )}
              </div>

              <div className="flex flex-col min-w-0 pr-1">
                <span className="font-sans font-medium text-xs sm:text-sm text-white truncate max-w-[150px] sm:max-w-[200px]">
                  {currentTrack.title}
                </span>
                <div className="flex items-center gap-1.5 text-[10px] text-neutral-400 font-mono tracking-wider">
                  <span className="truncate max-w-[110px]">{currentTrack.album}</span>
                  <span>•</span>
                  <span className="text-[#E5A842]">{currentTrack.year}</span>
                </div>
              </div>
            </div>

            {/* Mobile Play Button */}
            <div className="flex sm:hidden items-center gap-1.5">
              <button
                onClick={togglePlay}
                className="h-9 w-9 rounded-full bg-white text-black flex items-center justify-center hover:scale-105 active:scale-95 transition-transform"
                aria-label={isPlaying ? "Pause" : "Play"}
              >
                {isPlaying ? (
                  <Pause className="h-4 w-4 fill-black" />
                ) : (
                  <Play className="h-4 w-4 fill-black ml-0.5" />
                )}
              </button>
              <button
                onClick={toggleVideoModal}
                className="h-9 w-9 rounded-full bg-white/10 text-white flex items-center justify-center"
                aria-label="Toggle video"
              >
                <Tv className="h-4 w-4" />
              </button>
            </div>
          </div>

          {/* Center: Controls & Scrubber */}
          <div className="w-full flex-1 flex flex-col items-center justify-center gap-1">
            
            {/* Desktop Playback Buttons */}
            <div className="hidden sm:flex items-center gap-3">
              <button
                onClick={prevTrack}
                className="text-neutral-400 hover:text-white transition-colors p-1"
                aria-label="Previous track"
              >
                <SkipBack className="h-4 w-4" />
              </button>

              <button
                onClick={togglePlay}
                className="h-8 w-8 rounded-full bg-white text-black flex items-center justify-center hover:scale-105 active:scale-95 transition-transform shadow-md"
                aria-label={isPlaying ? "Pause" : "Play"}
              >
                {isPlaying ? (
                  <Pause className="h-3.5 w-3.5 fill-black" />
                ) : (
                  <Play className="h-3.5 w-3.5 fill-black ml-0.5" />
                )}
              </button>

              <button
                onClick={nextTrack}
                className="text-neutral-400 hover:text-white transition-colors p-1"
                aria-label="Next track"
              >
                <SkipForward className="h-4 w-4" />
              </button>
            </div>

            {/* Progress Bar & Timestamps */}
            <div className="w-full flex items-center gap-2">
              <span className="text-[10px] font-mono text-neutral-400 shrink-0 w-8 text-right">
                {formatTime(currentTime)}
              </span>

              <div
                onClick={handleSeek}
                className="relative flex-1 h-1.5 bg-white/10 hover:bg-white/20 rounded-full cursor-pointer overflow-hidden transition-colors py-1 group"
              >
                <div
                  className="absolute inset-y-0 left-0 bg-gradient-to-r from-neutral-200 to-[#E5A842] rounded-full"
                  style={{ width: `${progressPercent}%` }}
                />
              </div>

              <span className="text-[10px] font-mono text-neutral-400 shrink-0 w-8">
                {formatTime(duration)}
              </span>
            </div>
          </div>

          {/* Right: Video PIP, Volume & Official YouTube Link */}
          <div className="hidden sm:flex items-center gap-2 shrink-0">
            {/* Watch Video PIP Toggle */}
            <button
              onClick={toggleVideoModal}
              className={`p-2 rounded-full border text-xs font-sans transition-all flex items-center gap-1.5 ${
                isVideoModalOpen
                  ? "border-[#E5A842] bg-[#E5A842]/15 text-[#E5A842]"
                  : "border-white/10 bg-white/5 text-neutral-300 hover:border-white/25 hover:text-white"
              }`}
              title="Watch Official Video"
            >
              <Tv className="h-3.5 w-3.5" />
              <span className="text-[11px] font-medium hidden md:inline">Watch Video</span>
            </button>

            {/* Volume Control */}
            <div
              className="relative flex items-center"
              onMouseEnter={() => setShowVolumeSlider(true)}
              onMouseLeave={() => setShowVolumeSlider(false)}
            >
              <button
                onClick={toggleMute}
                className="p-2 text-neutral-400 hover:text-white transition-colors"
                aria-label="Toggle mute"
              >
                {isMuted || volume === 0 ? (
                  <VolumeX className="h-4 w-4" />
                ) : (
                  <Volume2 className="h-4 w-4" />
                )}
              </button>

              <AnimatePresence>
                {showVolumeSlider && (
                  <motion.div
                    initial={{ opacity: 0, scaleX: 0.8 }}
                    animate={{ opacity: 1, scaleX: 1 }}
                    exit={{ opacity: 0, scaleX: 0.8 }}
                    className="absolute bottom-full right-0 mb-3 bg-[#161619] border border-white/10 p-2.5 rounded-xl shadow-xl flex items-center gap-2"
                  >
                    <input
                      type="range"
                      min={0}
                      max={100}
                      value={isMuted ? 0 : volume}
                      onChange={(e) => setVolume(Number(e.target.value))}
                      className="w-20 h-1 bg-white/20 accent-[#E5A842] cursor-pointer"
                    />
                  </motion.div>
                )}
              </AnimatePresence>
            </div>

            {/* Official YouTube Channel Link */}
            <a
              href={currentTrack.youtubeUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="p-2 text-neutral-400 hover:text-red-400 transition-colors"
              title="Open Official Video on YouTube"
            >
              <YoutubeIcon className="h-4 w-4" />
            </a>
          </div>
        </div>
      </motion.div>

      {/* 2. Apple Picture-in-Picture Floating Video Modal */}
      <AnimatePresence>
        {isVideoModalOpen && (
          <motion.div
            initial={{ opacity: 0, scale: 0.9, y: 20 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.9, y: 20 }}
            transition={{ type: "spring", damping: 25, stiffness: 280 }}
            className="fixed bottom-24 sm:bottom-28 right-4 sm:right-8 z-50 w-[92vw] sm:w-[460px] md:w-[520px] aspect-video rounded-2xl overflow-hidden bg-black border border-white/20 shadow-[0_25px_60px_rgba(0,0,0,0.95)]"
          >
            {/* Header bar */}
            <div className="absolute top-0 inset-x-0 z-20 flex items-center justify-between px-3.5 py-2.5 bg-gradient-to-b from-black/90 to-transparent">
              <div className="flex items-center gap-2">
                <span className="h-2 w-2 rounded-full bg-red-500 animate-pulse" />
                <span className="font-sans text-xs text-white font-medium truncate max-w-[240px]">
                  {currentTrack.title} — Official Video
                </span>
              </div>
              <div className="flex items-center gap-2">
                <a
                  href={currentTrack.youtubeUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="p-1 rounded-full bg-white/10 hover:bg-white/20 text-white transition-colors"
                  title="Open on YouTube"
                >
                  <ExternalLink className="h-3.5 w-3.5" />
                </a>
                <button
                  onClick={toggleVideoModal}
                  className="p-1 rounded-full bg-white/10 hover:bg-white/20 text-white transition-colors"
                  title="Close Video"
                >
                  <X className="h-3.5 w-3.5" />
                </button>
              </div>
            </div>

            {/* Responsive Iframe */}
            <iframe
              src={`https://www.youtube-nocookie.com/embed/${currentTrack.youtubeId}?autoplay=1&enablejsapi=1&origin=${typeof window !== "undefined" ? window.location.origin : ""}`}
              title={currentTrack.title}
              className="w-full h-full border-0"
              allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
              allowFullScreen
            />
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}
