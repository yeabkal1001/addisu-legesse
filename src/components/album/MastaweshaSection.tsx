"use client";

import { useState } from "react";
import { motion } from "framer-motion";
import { VinylScene3D } from "../three/VinylScene3D";
import { Play, Pause, ExternalLink, Disc, Sparkles } from "lucide-react";
import { useAudio, MASTAWESHA_TRACKLIST, OFFICIAL_TRACKS } from "@/context/AudioContext";
import { YoutubeIcon } from "@/components/common/SocialIcons";

export function MastaweshaSection() {
  const { currentTrack, isPlaying, playMastaweshaTrack, togglePlay } = useAudio();
  const [selectedTrackIndex, setSelectedTrackIndex] = useState(0);

  const handleTrackClick = (index: number) => {
    setSelectedTrackIndex(index);
    playMastaweshaTrack(index);
  };

  const isAlbumPlaying = isPlaying && currentTrack.id.startsWith("mastawesha");

  return (
    <section
      id="music"
      className="relative w-full py-14 sm:py-36 px-5 sm:px-10 lg:px-16 bg-[#000000] text-white overflow-hidden border-t border-white/[0.06]"
    >
      {/* Background Lighting */}
      <div className="absolute right-0 top-1/3 w-[500px] h-[500px] rounded-full bg-[#E5A842]/8 blur-[150px] pointer-events-none" />
      <div className="absolute left-[-100px] bottom-1/4 w-[400px] h-[400px] rounded-full bg-blue-500/5 blur-[140px] pointer-events-none" />

      <div className="relative z-10 max-w-7xl mx-auto">
        
        {/* Apple-style Section Header */}
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 mb-10 sm:mb-16 pb-6 sm:pb-8 border-b border-white/[0.08]">
          <div className="max-w-2xl">
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-white/[0.06] border border-white/[0.1] text-neutral-300 text-[10px] font-mono tracking-widest uppercase mb-4">
              <Disc className="h-3 w-3 text-[#E5A842] animate-spin" style={{ animationDuration: "6s" }} />
              <span>Landmark Studio Album • 2025</span>
            </div>

            <h2 className="text-4xl sm:text-5xl lg:text-6xl font-bold font-sans tracking-tight text-white leading-tight">
              Mastawesha. <span className="font-serif italic font-normal text-neutral-300">Studio Album</span>
            </h2>
            <p className="mt-3 text-neutral-400 text-sm sm:text-base font-normal leading-relaxed">
              14 original compositions recorded with live orchestrations, vintage Rhodes, traditional Ethiopian pentatonic scales, and master percussion.
            </p>
          </div>

          {/* Official Streaming Links */}
          <div className="flex flex-wrap items-center gap-2.5">
            <a
              href="https://www.youtube.com/watch?v=EqKmcKxaH4o"
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-2 px-4 py-2 rounded-full border border-red-500/30 bg-red-500/10 text-xs text-red-200 hover:bg-red-500/20 transition-colors font-sans"
            >
              <YoutubeIcon className="h-3.5 w-3.5 text-red-500" />
              <span>YouTube Official Stream</span>
              <ExternalLink className="h-3 w-3 text-red-400" />
            </a>
            <a
              href="https://music.apple.com/us/album/mastawesha/1835109893"
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-2 px-4 py-2 rounded-full border border-white/15 bg-white/5 text-xs text-white/80 hover:bg-white/10 transition-colors font-sans"
            >
              <span>Apple Music</span>
              <ExternalLink className="h-3 w-3" />
            </a>
          </div>
        </div>

        {/* Apple Music Showcase Layout: 3D Turntable + Real Interactive Tracklist */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 lg:gap-14 items-start">
          
          {/* Left Column: 3D Vintage Hi-Fi Turntable Canvas */}
          <div className="lg:col-span-5 flex flex-col items-center">
            <div className="w-full relative p-5 sm:p-7 rounded-[32px] bg-gradient-to-b from-[#18130e] via-[#0e0c0a] to-[#070605] border border-[#E5A842]/25 shadow-[0_25px_70px_rgba(0,0,0,0.9),inset_0_1px_1px_rgba(255,230,180,0.15)] overflow-hidden">
              {/* Warm Acoustic Glow inside card */}
              <div className="absolute top-0 right-1/4 w-48 h-48 bg-[#E5A842]/10 rounded-full blur-3xl pointer-events-none" />

              {/* Card Meta Bar */}
              <div className="relative z-10 flex items-center justify-between pb-3.5 border-b border-white/[0.08] text-xs font-mono">
                <span className="text-[#E5A842] flex items-center gap-2">
                  <span className={`h-2 w-2 rounded-full ${isPlaying ? "bg-[#E5A842] animate-ping" : "bg-white/30"}`} />
                  VINTAGE HI-FI DECK • MECHANICAL POINTER
                </span>
                <span className="text-neutral-400">33 ⅓ RPM • STEREO</span>
              </div>

              {/* 3D Vintage Turntable Mount */}
              <div className="my-2 w-full">
                <VinylScene3D
                  isPlaying={isPlaying}
                  onTogglePlay={togglePlay}
                  albumTitle="MASTAWESHA"
                  trackName={currentTrack.title}
                />
              </div>

              {/* Interactive Player Quick Trigger */}
              <div className="pt-4 border-t border-white/[0.08] flex items-center justify-between">
                <div>
                  <span className="text-[10px] font-mono text-neutral-400 uppercase tracking-wider block">
                    Now Selected
                  </span>
                  <span className="text-sm font-semibold text-white block">
                    {MASTAWESHA_TRACKLIST[selectedTrackIndex]?.title}
                  </span>
                </div>

                <button
                  onClick={() => handleTrackClick(selectedTrackIndex)}
                  className="flex items-center gap-2 px-4 py-2 rounded-full bg-white text-black text-xs font-semibold hover:bg-neutral-200 transition-colors shadow-md"
                >
                  {isAlbumPlaying ? (
                    <>
                      <Pause className="h-3.5 w-3.5 fill-black" />
                      <span>Pause</span>
                    </>
                  ) : (
                    <>
                      <Play className="h-3.5 w-3.5 fill-black ml-0.5" />
                      <span>Play Track</span>
                    </>
                  )}
                </button>
              </div>
            </div>
          </div>

          {/* Right Column: Apple Music Style 14-Track Tracklist */}
          <div className="lg:col-span-7">
            <div className="rounded-[32px] bg-[#0c0c0e] border border-white/[0.08] p-6 sm:p-8 shadow-[0_20px_60px_rgba(0,0,0,0.8),inset_0_1px_1px_rgba(255,255,255,0.06)]">
              
              <div className="flex items-center justify-between pb-4 mb-4 border-b border-white/[0.08]">
                <span className="text-xs font-mono uppercase tracking-widest text-neutral-400">
                  Tracklist &amp; Ethiopian Pentatonic Modes
                </span>
                <span className="text-xs font-mono text-[#E5A842]">
                  Click to Stream Real Audio
                </span>
              </div>

              <div className="space-y-1.5 max-h-[580px] overflow-y-auto pr-1 scrollbar-thin scrollbar-thumb-white/10">
                {MASTAWESHA_TRACKLIST.map((track, idx) => {
                  const isCurrent = currentTrack.id === `mastawesha-${track.num}`;
                  const isSelected = selectedTrackIndex === idx;

                  return (
                    <motion.div
                      key={track.num}
                      whileHover={{ scale: 1.005 }}
                      onClick={() => handleTrackClick(idx)}
                      className={`group flex items-center justify-between p-3 sm:p-3.5 rounded-2xl cursor-pointer transition-all duration-200 ${
                        isCurrent
                          ? "bg-white/[0.1] border border-white/20 text-white shadow-sm"
                          : isSelected
                          ? "bg-white/[0.05] border border-white/10 text-white"
                          : "hover:bg-white/[0.03] text-neutral-300 border border-transparent"
                      }`}
                    >
                      {/* Left: Track Number + Mini Thumbnail + Title */}
                      <div className="flex items-center gap-2.5 sm:gap-3.5 min-w-0">
                        {/* Track Number / Playing Wave */}
                        <div className="flex h-6 w-6 items-center justify-center shrink-0">
                          {isCurrent && isPlaying ? (
                            <div className="flex items-end gap-0.5 h-3">
                              {[40, 90, 60].map((h, i) => (
                                <span
                                  key={i}
                                  className="w-0.5 bg-[#E5A842] rounded-full animate-pulse"
                                  style={{ height: `${h}%`, animationDelay: `${i * 0.15}s` }}
                                />
                              ))}
                            </div>
                          ) : (
                            <span className="font-mono text-xs text-neutral-500 group-hover:text-white transition-colors">
                              {track.num}
                            </span>
                          )}
                        </div>

                        {/* YouTube Video Artwork Thumbnail */}
                        <div className="relative h-9 w-14 sm:h-10 sm:w-16 rounded-lg overflow-hidden shrink-0 border border-white/10 bg-neutral-900 shadow-sm">
                          <img
                            src={track.thumbnail}
                            alt={track.title}
                            className="h-full w-full object-cover group-hover:scale-105 transition-transform duration-300"
                          />
                          <div className="absolute inset-0 bg-black/25 group-hover:bg-transparent transition-colors" />
                        </div>

                        <div className="flex flex-col min-w-0">
                          <span className="font-sans font-medium text-xs sm:text-sm text-white truncate">
                            {track.title}
                          </span>
                          <span className="text-[10px] font-mono text-neutral-500 tracking-wider">
                            {track.scale}
                          </span>
                        </div>
                      </div>

                      {/* Right: Duration & Direct Play Badge */}
                      <div className="flex items-center gap-3 shrink-0">
                        <span className="font-mono text-xs text-neutral-400">
                          {track.length}
                        </span>
                        <div className="h-6 w-6 rounded-full bg-white/5 group-hover:bg-white/20 flex items-center justify-center transition-colors">
                          <Play className="h-2.5 w-2.5 fill-white text-white ml-0.5" />
                        </div>
                      </div>
                    </motion.div>
                  );
                })}
              </div>

            </div>
          </div>

        </div>

      </div>
    </section>
  );
}
