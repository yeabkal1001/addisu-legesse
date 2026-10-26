"use client";

import { motion } from "framer-motion";

interface HandDrawnCrownProps {
  className?: string;
}

export function HandDrawnCrown({ className = "" }: HandDrawnCrownProps) {
  return (
    <motion.svg
      viewBox="0 0 140 100"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      className={className}
      initial={{ opacity: 0, scale: 0.7, rotate: 0 }}
      animate={{ opacity: 1, scale: 1, rotate: 12 }}
      transition={{
        delay: 0.7,
        duration: 0.9,
        ease: [0.16, 1, 0.3, 1],
      }}
    >
      {/* Hand-drawn crown outline matching reference photo */}
      {/* Base curve: sweeping curved bottom */}
      <motion.path
        d="M 22,76 C 50,84 90,84 118,74"
        stroke="#E5A842"
        strokeWidth="3.6"
        strokeLinecap="round"
        initial={{ pathLength: 0 }}
        animate={{ pathLength: 1 }}
        transition={{ delay: 0.8, duration: 0.7, ease: "easeInOut" }}
      />

      {/* Main 3-peak crown silhouette */}
      <motion.path
        d="M 22,74 L 18,28 L 52,54 L 70,14 L 88,54 L 122,28 L 118,74"
        stroke="#E5A842"
        strokeWidth="3.8"
        strokeLinecap="round"
        strokeLinejoin="round"
        initial={{ pathLength: 0 }}
        animate={{ pathLength: 1 }}
        transition={{ delay: 0.95, duration: 1.1, ease: "easeInOut" }}
      />

      {/* Second sketchy stroke overlay for authentic hand-drawn feel */}
      <motion.path
        d="M 24,72 L 20,30 L 53,53 L 70,16 L 87,53 L 120,30 L 117,72"
        stroke="#F5CF78"
        strokeWidth="1.6"
        strokeLinecap="round"
        strokeLinejoin="round"
        initial={{ pathLength: 0 }}
        animate={{ pathLength: 1 }}
        transition={{ delay: 1.2, duration: 0.9, ease: "easeInOut" }}
      />

      {/* Gentle base arc underline */}
      <motion.path
        d="M 26,81 C 52,88 88,88 114,80"
        stroke="#D49A32"
        strokeWidth="2"
        strokeLinecap="round"
        initial={{ pathLength: 0 }}
        animate={{ pathLength: 1 }}
        transition={{ delay: 1.05, duration: 0.6, ease: "easeInOut" }}
      />
    </motion.svg>
  );
}
