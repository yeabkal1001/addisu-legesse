"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Maximize2, X, Camera, Sparkles } from "lucide-react";

export function GallerySection() {
  const [selectedPhoto, setSelectedPhoto] = useState<null | {
    src: string;
    title: string;
    location: string;
    year: string;
    category: string;
    description: string;
  }>(null);

  const [activeFilter, setActiveFilter] = useState("All");

  const photos = [
    {
      id: "live-concert",
      src: "/Addisu_Legesse_Website_Asset_Pack/04-live-performance/addisu-live-performance-original.png",
      title: "Live Concert with Brass Ensemble",
      location: "Toronto / Addis Tour",
      year: "2024",
      category: "Concert Stage",
      aspect: "col-span-1 md:col-span-2 row-span-2 aspect-[4/3] md:aspect-auto",
      description: "Electrifying vocal performance backed by live saxophone and full rhythm section under dramatic blue concert lighting.",
    },
    {
      id: "studio-contemplation",
      src: "/Addisu_Legesse_Website_Asset_Pack/04-live-performance/addisu-recording-session-original.png",
      title: "Vocal Recording Session",
      location: "Addis Soundstage",
      year: "2025",
      category: "Studio Master",
      aspect: "col-span-1 aspect-[3/4]",
      description: "Intimate late-night vocal tracking session for Mastawesha in warm amber tungsten backlighting with AKG condenser mic.",
    },
    {
      id: "amber-profile",
      src: "/Addisu_Legesse_Website_Asset_Pack/02-about-artist/addisu-amber-profile-portrait.jpg",
      title: "Ewedshalew Session Take",
      location: "Studio Control Room",
      year: "2024",
      category: "Portraits",
      aspect: "col-span-1 aspect-[3/4]",
      description: "Close-up profile capture during the recording of the 8.5M+ view viral hit single Ewedshalew.",
    },
    {
      id: "bw-studio-passion",
      src: "/Addisu_Legesse_Website_Asset_Pack/05-gallery-and-editorial/addisu-studio-session-monochrome-editorial.jpg",
      title: "Acoustic Take & Vocal Lift",
      location: "Mastering Studio",
      year: "2025",
      category: "Studio Master",
      aspect: "col-span-1 aspect-square",
      description: "High-contrast black-and-white editorial portrait capturing vocal passion and emotional resonance.",
    },
    {
      id: "warm-film-editorial",
      src: "/Addisu_Legesse_Website_Asset_Pack/05-gallery-and-editorial/addisu-portrait-vertical-warm-film-treatment.jpg",
      title: "Warm 35mm Film Grain Treatment",
      location: "Addis Ababa",
      year: "2024",
      category: "Portraits",
      aspect: "col-span-1 aspect-square",
      description: "35mm warm analogue film treatment with subtle halation and rich texture.",
    },
  ];

  const filteredPhotos =
    activeFilter === "All"
      ? photos
      : photos.filter((p) => p.category === activeFilter);

  return (
    <section
      id="gallery"
      className="relative w-full py-14 sm:py-36 px-5 sm:px-10 lg:px-16 bg-[#000000] text-white overflow-hidden border-t border-white/[0.06]"
    >
      {/* Background Ambience */}
      <div className="absolute left-[-100px] top-1/3 w-[500px] h-[500px] rounded-full bg-[#E5A842]/5 blur-[160px] pointer-events-none" />

      <div className="relative z-10 max-w-7xl mx-auto">
        
        {/* Apple-style Section Header */}
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 mb-10 pb-6 md:mb-16 md:pb-8 border-b border-white/[0.08]">
          <div className="max-w-2xl">
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-white/[0.06] border border-white/[0.1] text-neutral-300 text-[10px] font-mono tracking-widest uppercase mb-4">
              <Camera className="h-3 w-3 text-[#E5A842]" />
              <span>Visual Archive &amp; Live Performances</span>
            </div>

            <h2 className="text-4xl sm:text-5xl lg:text-6xl font-bold font-sans tracking-tight text-white leading-tight">
              Moments in Motion.
            </h2>
            <p className="mt-3 text-neutral-400 text-sm sm:text-base font-normal leading-relaxed">
              Curated photography documenting sold-out stadium performances, live improvisations, and intimate studio tracking sessions.
            </p>
          </div>

          {/* Filter Pills */}
          <div className="flex flex-wrap items-center gap-2">
            {["All", "Concert Stage", "Studio Master", "Portraits"].map((filter) => (
              <button
                key={filter}
                onClick={() => setActiveFilter(filter)}
                className={`px-4 py-1.5 rounded-full text-xs font-sans transition-all ${
                  activeFilter === filter
                    ? "bg-white text-black font-semibold shadow-sm"
                    : "bg-white/[0.05] border border-white/10 text-neutral-400 hover:text-white hover:bg-white/[0.08]"
                }`}
              >
                {filter}
              </button>
            ))}
          </div>
        </div>

        {/* Masonry / Grid Gallery */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-5 sm:gap-6">
          {filteredPhotos.map((item, idx) => (
            <motion.div
              key={item.id}
              layout
              initial={{ opacity: 0, scale: 0.96 }}
              whileInView={{ opacity: 1, scale: 1 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6, delay: idx * 0.08, ease: [0.16, 1, 0.3, 1] }}
              onClick={() => setSelectedPhoto(item)}
              className={`group relative rounded-[32px] overflow-hidden bg-[#0c0c0e] border border-white/[0.08] hover:border-white/20 transition-all duration-500 cursor-pointer shadow-[inset_0_1px_1px_rgba(255,255,255,0.06)] ${item.aspect}`}
            >
              <img
                src={item.src}
                alt={item.title}
                className="h-full w-full object-cover filter contrast-[1.06] brightness-[0.92] group-hover:scale-105 group-hover:brightness-100 transition-all duration-700"
              />

              {/* Gradient Vignette on Hover */}
              <div className="absolute inset-0 bg-gradient-to-t from-black/90 via-black/20 to-transparent opacity-80 group-hover:opacity-95 transition-opacity duration-300" />

              {/* Top Category Badge */}
              <div className="absolute top-4 left-4 z-10">
                <span className="px-3 py-1 rounded-full bg-black/60 backdrop-blur-md border border-white/10 text-[10px] font-mono text-neutral-300 uppercase tracking-wider">
                  {item.category}
                </span>
              </div>

              {/* Bottom Caption */}
              <div className="absolute inset-x-0 bottom-0 p-6 z-10 flex items-end justify-between">
                <div>
                  <h3 className="font-sans font-bold text-lg sm:text-xl text-white group-hover:text-[#E5A842] transition-colors">
                    {item.title}
                  </h3>
                  <div className="flex items-center gap-2 text-xs font-mono text-neutral-400 mt-1">
                    <span>{item.location}</span>
                    <span>•</span>
                    <span>{item.year}</span>
                  </div>
                </div>

                <div className="h-9 w-9 rounded-full bg-white/10 backdrop-blur-md border border-white/15 flex items-center justify-center text-white opacity-0 group-hover:opacity-100 transition-opacity">
                  <Maximize2 className="h-4 w-4" />
                </div>
              </div>
            </motion.div>
          ))}
        </div>

      </div>

      {/* Lightbox Modal */}
      <AnimatePresence>
        {selectedPhoto && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={() => setSelectedPhoto(null)}
            className="fixed inset-0 z-50 flex items-center justify-center p-4 sm:p-8 bg-black/95 backdrop-blur-2xl"
          >
            <motion.div
              initial={{ scale: 0.95, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0.95, opacity: 0 }}
              transition={{ type: "spring", damping: 28, stiffness: 320 }}
              onClick={(e) => e.stopPropagation()}
              className="relative max-w-4xl w-full max-h-[90vh] rounded-[32px] overflow-hidden bg-[#0c0c0e] border border-white/15 shadow-2xl flex flex-col"
            >
              <div className="relative flex-1 bg-black overflow-hidden flex items-center justify-center">
                <img
                  src={selectedPhoto.src}
                  alt={selectedPhoto.title}
                  className="max-h-[70vh] w-auto object-contain"
                />

                <button
                  onClick={() => setSelectedPhoto(null)}
                  className="absolute top-4 right-4 h-9 w-9 rounded-full bg-black/70 border border-white/20 text-white flex items-center justify-center hover:bg-white hover:text-black transition-colors"
                >
                  <X className="h-4 w-4" />
                </button>
              </div>

              <div className="p-6 bg-[#0e0e12] border-t border-white/10 flex flex-col sm:flex-row sm:items-center justify-between gap-4">
                <div>
                  <h4 className="font-sans font-bold text-lg text-white">
                    {selectedPhoto.title}
                  </h4>
                  <p className="text-xs text-neutral-400 mt-1 max-w-xl">
                    {selectedPhoto.description}
                  </p>
                </div>
                <div className="text-right shrink-0">
                  <span className="text-xs font-mono text-[#E5A842] block">
                    {selectedPhoto.category}
                  </span>
                  <span className="text-[11px] font-mono text-neutral-500">
                    {selectedPhoto.location} • {selectedPhoto.year}
                  </span>
                </div>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </section>
  );
}
