"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import {
  Mail,
  MapPin,
  Calendar,
  Send,
  CheckCircle2,
  Download,
  Globe2,
  Sparkles,
  Music,
  Tv,
  ArrowRight,
  ShieldCheck,
} from "lucide-react";
import { YoutubeIcon, InstagramIcon } from "@/components/common/SocialIcons";

const INQUIRY_TYPES = [
  "Festival Headline",
  "Concert Tour",
  "Corporate / Gala",
  "Film & Sync Licensing",
  "Studio Collaboration",
];

export function ContactSection() {
  const [selectedType, setSelectedType] = useState("Festival Headline");
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    organization: "",
    location: "",
    eventDate: "",
    estimatedAudience: "",
    message: "",
  });
  const [isSubmitted, setIsSubmitted] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);
    setTimeout(() => {
      setIsSubmitting(false);
      setIsSubmitted(true);
    }, 850);
  };

  return (
    <section
      id="contact"
      className="relative w-full py-14 sm:py-36 px-5 sm:px-10 lg:px-16 bg-[#030304] text-white overflow-hidden border-t border-white/[0.08]"
    >
      {/* Background Luminescence */}
      <div className="absolute right-1/4 top-1/4 w-[600px] h-[600px] rounded-full bg-[#E5A842]/5 blur-[180px] pointer-events-none" />
      <div className="absolute left-10 bottom-10 w-[500px] h-[500px] rounded-full bg-[#8C4A14]/5 blur-[160px] pointer-events-none" />

      <div className="relative z-10 max-w-7xl mx-auto">
        
        {/* Section Header: Awwwards / Editorial Keynote */}
        <div className="flex flex-col lg:flex-row lg:items-end justify-between gap-8 mb-10 sm:mb-20 pb-6 sm:pb-10 border-b border-white/[0.08]">
          <div className="max-w-3xl">
            <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-white/[0.06] border border-white/[0.12] text-neutral-300 text-[10px] font-mono tracking-widest uppercase mb-4">
              <Sparkles className="h-3 w-3 text-[#E5A842]" />
              <span>Worldwide Management &amp; Inquiries</span>
              <span className="text-white/20">•</span>
              <span className="text-[#E5A842]">Booking Hub</span>
            </div>

            <h2 className="text-4xl sm:text-6xl lg:text-[4.2rem] font-bold font-sans tracking-tight text-white leading-[1.05]">
              Let&apos;s Create Something <br />
              <span className="font-serif italic font-normal text-transparent bg-clip-text bg-gradient-to-r from-neutral-200 via-[#E5A842] to-neutral-400">
                Extraordinary.
              </span>
            </h2>
            <p className="mt-4 text-neutral-400 text-sm sm:text-base font-normal leading-relaxed max-w-2xl">
              For festival headline performances, international concert routing, film sync licensing, and orchestral collaborations worldwide.
            </p>
          </div>

          <div className="flex flex-col items-start lg:items-end gap-3">
            <div className="flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-emerald-500/10 border border-emerald-500/20 text-emerald-400 text-xs font-mono">
              <span className="h-2 w-2 rounded-full bg-emerald-400 animate-pulse" />
              <span>2026 — 2027 Tour Calendar Open</span>
            </div>
            <a
              href="/Addisu_Legesse_Resume_reference.pdf"
              download="Addisu_Legesse_Technical_Rider.pdf"
              className="inline-flex items-center gap-2 px-5 py-2.5 rounded-full bg-white/5 hover:bg-white/10 border border-white/15 text-xs font-medium text-white transition-all active:scale-95 cursor-pointer shadow-sm"
            >
              <Download className="h-3.5 w-3.5 text-[#E5A842]" />
              <span>Download Technical Rider &amp; EPK</span>
            </a>
          </div>
        </div>

        {/* 2-Column Luxury Portal Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-12 items-start">
          
          {/* Left Column: Official Management Credentials & Direct Channels */}
          <div className="lg:col-span-5 space-y-6">
            
            {/* Primary Management Hub Card */}
            <div className="p-7 sm:p-8 rounded-[32px] bg-gradient-to-b from-[#121216] to-[#0a0a0d] border border-white/10 shadow-[0_20px_50px_rgba(0,0,0,0.85)] space-y-6">
              <div>
                <span className="text-[10px] font-mono uppercase tracking-widest text-[#E5A842] block mb-2">
                  Official Artist Representation
                </span>
                <h3 className="text-2xl sm:text-3xl font-bold font-sans text-white">
                  Addis Legesse Management
                </h3>
                <p className="text-xs sm:text-sm text-neutral-400 mt-2 font-light leading-relaxed">
                  Direct management handling global concert scheduling, headline festivals, symphonic scores, and media partnerships.
                </p>
              </div>

              <div className="space-y-4 pt-5 border-t border-white/10 text-xs font-mono">
                {/* Headquarters */}
                <div className="flex items-start gap-3.5 text-neutral-300">
                  <div className="h-9 w-9 rounded-xl bg-white/5 border border-white/10 flex items-center justify-center text-[#E5A842] shrink-0 mt-0.5">
                    <MapPin className="h-4 w-4" />
                  </div>
                  <div>
                    <span className="text-[10px] text-neutral-500 block uppercase tracking-wider">
                      Headquarters &amp; Routing
                    </span>
                    <span className="text-sm font-sans font-medium text-white">
                      Addis Ababa, Ethiopia • Global Routing
                    </span>
                  </div>
                </div>

                {/* Direct Booking Email */}
                <div className="flex items-start gap-3.5 text-neutral-300">
                  <div className="h-9 w-9 rounded-xl bg-white/5 border border-white/10 flex items-center justify-center text-[#E5A842] shrink-0 mt-0.5">
                    <Mail className="h-4 w-4" />
                  </div>
                  <div>
                    <span className="text-[10px] text-neutral-500 block uppercase tracking-wider">
                      Direct Booking Inquiries
                    </span>
                    <a
                      href="mailto:booking@addisulegesse.com"
                      className="text-sm font-sans font-medium text-white hover:text-[#E5A842] transition-colors"
                    >
                      booking@addisulegesse.com
                    </a>
                  </div>
                </div>

                {/* Worldwide Representation Guarantee */}
                <div className="flex items-start gap-3.5 text-neutral-300">
                  <div className="h-9 w-9 rounded-xl bg-white/5 border border-white/10 flex items-center justify-center text-emerald-400 shrink-0 mt-0.5">
                    <ShieldCheck className="h-4 w-4" />
                  </div>
                  <div>
                    <span className="text-[10px] text-neutral-500 block uppercase tracking-wider">
                      Verified Direct Contact
                    </span>
                    <span className="text-xs text-neutral-400">
                      Response within 24 to 48 business hours
                    </span>
                  </div>
                </div>
              </div>
            </div>

            {/* Official Artist Media Channels Card */}
            <div className="p-7 rounded-[32px] bg-gradient-to-b from-[#101014] to-[#0a0a0d] border border-white/10 shadow-lg space-y-4">
              <span className="text-[10px] font-mono uppercase tracking-widest text-neutral-400 block">
                Official Artist Channels
              </span>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                <a
                  href="https://www.youtube.com/@addislegesseofficial"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="group flex items-center justify-between p-3.5 rounded-2xl border border-red-500/25 bg-red-500/5 hover:bg-red-500/15 transition-all"
                >
                  <div className="flex items-center gap-3">
                    <YoutubeIcon className="h-5 w-5 text-red-500 group-hover:scale-110 transition-transform" />
                    <div>
                      <span className="block text-xs font-semibold text-white">YouTube</span>
                      <span className="block text-[10px] font-mono text-neutral-400">35.7M+ Streams</span>
                    </div>
                  </div>
                  <ArrowRight className="h-3.5 w-3.5 text-red-400 group-hover:translate-x-1 transition-transform" />
                </a>

                <a
                  href="https://instagram.com/addis_leggese"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="group flex items-center justify-between p-3.5 rounded-2xl border border-pink-500/25 bg-pink-500/5 hover:bg-pink-500/15 transition-all"
                >
                  <div className="flex items-center gap-3">
                    <InstagramIcon className="h-5 w-5 text-[#E5A842] group-hover:scale-110 transition-transform" />
                    <div>
                      <span className="block text-xs font-semibold text-white">Instagram</span>
                      <span className="block text-[10px] font-mono text-neutral-400">@addis_leggese</span>
                    </div>
                  </div>
                  <ArrowRight className="h-3.5 w-3.5 text-[#E5A842] group-hover:translate-x-1 transition-transform" />
                </a>
              </div>
            </div>

            {/* Performance Scope Pills */}
            <div className="p-6 rounded-[28px] bg-white/[0.02] border border-white/[0.06] space-y-2">
              <span className="text-[10px] font-mono uppercase tracking-widest text-[#E5A842] block">
                Live Performance Formats
              </span>
              <p className="text-xs text-neutral-300 font-light leading-relaxed">
                Available with full 10-piece Ethio-Soul Orchestra, 5-piece acoustic jazz ensemble, or special guest appearances.
              </p>
            </div>

          </div>

          {/* Right Column: Interactive Booking Form */}
          <div className="lg:col-span-7">
            <div className="p-7 sm:p-10 rounded-[36px] bg-gradient-to-b from-[#121216] to-[#0a0a0d] border border-white/10 shadow-[0_25px_60px_rgba(0,0,0,0.9)]">
              
              <div className="mb-8">
                <span className="text-[10px] font-mono uppercase tracking-widest text-[#E5A842] block mb-1">
                  Online Inquiry Form
                </span>
                <h3 className="text-2xl sm:text-3xl font-bold font-sans text-white">
                  Direct Booking Request
                </h3>
                <p className="text-xs sm:text-sm text-neutral-400 mt-1 font-light">
                  Please provide details about your proposed event or project.
                </p>
              </div>

              {isSubmitted ? (
                <motion.div
                  initial={{ opacity: 0, scale: 0.95 }}
                  animate={{ opacity: 1, scale: 1 }}
                  className="py-14 px-6 rounded-3xl border border-white/20 bg-white/[0.03] text-center space-y-4"
                >
                  <div className="h-14 w-14 rounded-full bg-[#E5A842]/20 border border-[#E5A842] flex items-center justify-center mx-auto text-[#E5A842]">
                    <CheckCircle2 className="h-7 w-7" />
                  </div>
                  <h4 className="text-2xl sm:text-3xl font-bold font-sans text-white">
                    Inquiry Received
                  </h4>
                  <p className="text-xs sm:text-sm text-neutral-300 max-w-md mx-auto leading-relaxed font-light">
                    Thank you. Your inquiry has been forwarded directly to Addis Legesse Management. Our team will review your project details and reach out within 24 to 48 hours.
                  </p>
                  <button
                    onClick={() => {
                      setIsSubmitted(false);
                      setFormData({
                        name: "",
                        email: "",
                        organization: "",
                        location: "",
                        eventDate: "",
                        estimatedAudience: "",
                        message: "",
                      });
                    }}
                    className="mt-6 px-6 py-2.5 rounded-full border border-white/20 text-xs font-medium text-white hover:bg-white/10 transition-colors cursor-pointer"
                  >
                    Submit Another Inquiry
                  </button>
                </motion.div>
              ) : (
                <form onSubmit={handleSubmit} className="space-y-5">
                  
                  {/* Select Engagement Type Pills */}
                  <div>
                    <label className="block text-[11px] font-mono uppercase tracking-wider text-neutral-400 mb-2.5">
                      Select Engagement Type
                    </label>
                    <div className="flex flex-wrap gap-2">
                      {INQUIRY_TYPES.map((type) => {
                        const isSelected = selectedType === type;
                        return (
                          <button
                            type="button"
                            key={type}
                            onClick={() => setSelectedType(type)}
                            className={`px-3.5 py-2 rounded-full text-xs font-sans transition-all cursor-pointer ${
                              isSelected
                                ? "bg-[#E5A842] text-black font-semibold shadow-md"
                                : "bg-white/[0.04] border border-white/10 text-neutral-300 hover:border-white/25 hover:text-white"
                            }`}
                          >
                            {type}
                          </button>
                        );
                      })}
                    </div>
                  </div>

                  {/* Name & Email Row */}
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    <div>
                      <label className="block text-[11px] font-mono uppercase tracking-wider text-neutral-400 mb-1.5">
                        Your Name *
                      </label>
                      <input
                        type="text"
                        required
                        value={formData.name}
                        onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                        placeholder="e.g. Samuel Bekele"
                        className="w-full px-4 py-3 rounded-2xl bg-white/[0.04] border border-white/10 text-white placeholder-neutral-600 text-xs focus:outline-none focus:border-[#E5A842] transition-colors"
                      />
                    </div>

                    <div>
                      <label className="block text-[11px] font-mono uppercase tracking-wider text-neutral-400 mb-1.5">
                        Work Email Address *
                      </label>
                      <input
                        type="email"
                        required
                        value={formData.email}
                        onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                        placeholder="you@agency.com"
                        className="w-full px-4 py-3 rounded-2xl bg-white/[0.04] border border-white/10 text-white placeholder-neutral-600 text-xs focus:outline-none focus:border-[#E5A842] transition-colors"
                      />
                    </div>
                  </div>

                  {/* Organization & Location Row */}
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    <div>
                      <label className="block text-[11px] font-mono uppercase tracking-wider text-neutral-400 mb-1.5">
                        Organization / Agency
                      </label>
                      <input
                        type="text"
                        value={formData.organization}
                        onChange={(e) => setFormData({ ...formData, organization: e.target.value })}
                        placeholder="e.g. Live Nation / Festival"
                        className="w-full px-4 py-3 rounded-2xl bg-white/[0.04] border border-white/10 text-white placeholder-neutral-600 text-xs focus:outline-none focus:border-[#E5A842] transition-colors"
                      />
                    </div>

                    <div>
                      <label className="block text-[11px] font-mono uppercase tracking-wider text-neutral-400 mb-1.5">
                        Host City &amp; Country
                      </label>
                      <input
                        type="text"
                        value={formData.location}
                        onChange={(e) => setFormData({ ...formData, location: e.target.value })}
                        placeholder="e.g. London, UK / Washington DC"
                        className="w-full px-4 py-3 rounded-2xl bg-white/[0.04] border border-white/10 text-white placeholder-neutral-600 text-xs focus:outline-none focus:border-[#E5A842] transition-colors"
                      />
                    </div>
                  </div>

                  {/* Proposed Date & Estimated Audience Row */}
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    <div>
                      <label className="block text-[11px] font-mono uppercase tracking-wider text-neutral-400 mb-1.5">
                        Proposed Event Date
                      </label>
                      <input
                        type="text"
                        value={formData.eventDate}
                        onChange={(e) => setFormData({ ...formData, eventDate: e.target.value })}
                        placeholder="e.g. November 2026 / Flexible"
                        className="w-full px-4 py-3 rounded-2xl bg-white/[0.04] border border-white/10 text-white placeholder-neutral-600 text-xs focus:outline-none focus:border-[#E5A842] transition-colors"
                      />
                    </div>

                    <div>
                      <label className="block text-[11px] font-mono uppercase tracking-wider text-neutral-400 mb-1.5">
                        Estimated Audience / Venue
                      </label>
                      <input
                        type="text"
                        value={formData.estimatedAudience}
                        onChange={(e) => setFormData({ ...formData, estimatedAudience: e.target.value })}
                        placeholder="e.g. 5,000+ Outdoor Arena"
                        className="w-full px-4 py-3 rounded-2xl bg-white/[0.04] border border-white/10 text-white placeholder-neutral-600 text-xs focus:outline-none focus:border-[#E5A842] transition-colors"
                      />
                    </div>
                  </div>

                  {/* Message / Scope Textarea */}
                  <div>
                    <label className="block text-[11px] font-mono uppercase tracking-wider text-neutral-400 mb-1.5">
                      Event Scope &amp; Special Requirements *
                    </label>
                    <textarea
                      rows={4}
                      required
                      value={formData.message}
                      onChange={(e) => setFormData({ ...formData, message: e.target.value })}
                      placeholder="Please share details regarding your event schedule, stage production specs, and performance duration..."
                      className="w-full px-4 py-3 rounded-2xl bg-white/[0.04] border border-white/10 text-white placeholder-neutral-600 text-xs focus:outline-none focus:border-[#E5A842] transition-colors resize-none"
                    />
                  </div>

                  {/* Submit Button */}
                  <button
                    type="submit"
                    disabled={isSubmitting}
                    className="w-full py-4 rounded-full bg-white text-black font-semibold text-xs sm:text-sm hover:bg-neutral-200 active:scale-[0.99] transition-all flex items-center justify-center gap-2 shadow-[0_10px_25px_rgba(255,255,255,0.15)] cursor-pointer"
                  >
                    {isSubmitting ? (
                      <span className="inline-block h-4 w-4 border-2 border-black border-t-transparent rounded-full animate-spin" />
                    ) : (
                      <>
                        <Send className="h-4 w-4" />
                        <span>Submit Booking Request to Addis Legesse Management</span>
                      </>
                    )}
                  </button>
                </form>
              )}

            </div>
          </div>

        </div>

        {/* Apple-style Footer */}
        <div className="pt-16 mt-20 border-t border-white/[0.08] flex flex-col sm:flex-row items-center justify-between gap-4 text-xs text-neutral-500 font-mono">
          <div>
            © 2026 Addisu Legesse. All Rights Reserved. Addis Legesse Management.
          </div>
          <div className="flex items-center gap-6">
            <a href="#home" className="hover:text-white transition-colors">Back to top</a>
            <span>•</span>
            <a href="https://www.youtube.com/@addislegesseofficial" target="_blank" rel="noopener noreferrer" className="hover:text-white transition-colors">YouTube</a>
            <span>•</span>
            <a href="https://instagram.com/addis_leggese" target="_blank" rel="noopener noreferrer" className="hover:text-white transition-colors">Instagram</a>
          </div>
        </div>

      </div>
    </section>
  );
}
