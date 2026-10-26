"use client";

import { motion } from "framer-motion";
import { useEffect, useRef, useState } from "react";

interface SoundVisualizerProps {
  isPlaying: boolean;
  onToggle?: () => void;
}

export function SoundVisualizer({ isPlaying, onToggle }: SoundVisualizerProps) {
  const heights = [35, 65, 45, 95, 75, 100, 80, 50, 85, 60, 30];

  return (
    <motion.button
      initial={{ opacity: 0, scale: 0.8 }}
      animate={{ opacity: 1, scale: 1 }}
      transition={{ delay: 1.2, duration: 0.8 }}
      onClick={onToggle}
      className="group relative flex items-center justify-center p-3 rounded-full hover:bg-white/5 transition-all duration-300"
      title={isPlaying ? "Mute Studio Equalizer" : "Play Ambient Studio Chords"}
      aria-label="Sound visualizer equalizer"
    >
      <div className="flex items-center gap-[3px] h-6 sm:h-8">
        {heights.map((h, i) => (
          <motion.span
            key={i}
            animate={
              isPlaying
                ? {
                    height: [
                      `${Math.max(15, h * 0.25)}%`,
                      `${h}%`,
                      `${Math.max(20, h * 0.6)}%`,
                      `${Math.max(10, h * 0.3)}%`,
                    ],
                  }
                : {
                    height: "22%",
                  }
            }
            transition={{
              repeat: Infinity,
              duration: 0.9 + (i % 4) * 0.22,
              ease: "easeInOut",
            }}
            className={`w-[2.5px] rounded-full transition-colors duration-300 ${
              isPlaying
                ? "bg-gradient-to-t from-[#B8860B] to-[#F3D389] shadow-[0_0_6px_rgba(243,211,137,0.5)]"
                : "bg-white/40 group-hover:bg-[#E5A842]"
            }`}
            style={{ minHeight: "4px" }}
          />
        ))}
      </div>
    </motion.button>
  );
}
