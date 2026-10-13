"use client";

import { motion } from "framer-motion";
import { Quote, CheckCircle2, ChevronLeft, ChevronRight } from "lucide-react";
import { useState, useEffect, useRef } from "react";
import { testimonials } from "@/src/constants/data";
import { TestimonialType } from "@/src/types";
import TiltCard from "@/src/components/ui/TiltCard";

const getInitials = (name: string) => {
  const parts = name.trim().split(/\s+/);
  if (parts.length >= 2) return `${parts[0][0]}${parts[parts.length - 1][0]}`.toUpperCase();
  return (parts[0]?.[0] || "").toUpperCase();
};

export default function Testimonials({ data }: { data?: TestimonialType[] }) {
  // Use the verified real client testimonials from constants
  const displayData = testimonials;

  const [activeIndex, setActiveIndex] = useState(0);
  const sliderRef = useRef<HTMLDivElement>(null);
  const [isMobile, setIsMobile] = useState(false);

  useEffect(() => {
    const checkMobile = () => setIsMobile(window.innerWidth < 768);
    checkMobile();
    window.addEventListener("resize", checkMobile, { passive: true });
    return () => window.removeEventListener("resize", checkMobile);
  }, []);

  const scrollToIndex = (index: number) => {
    if (!sliderRef.current) return;
    const cards = sliderRef.current.querySelectorAll<HTMLElement>("[data-testimonial-card]");
    const targetCard = cards[index];
    if (targetCard) {
      targetCard.scrollIntoView({
        behavior: "smooth",
        block: "nearest",
        inline: "center",
      });
      setActiveIndex(index);
    }
  };

  const handleScroll = () => {
    if (!sliderRef.current) return;
    const cards = sliderRef.current.querySelectorAll<HTMLElement>("[data-testimonial-card]");
    const sliderCenter = sliderRef.current.getBoundingClientRect().left + sliderRef.current.offsetWidth / 2;
    let closestIdx = 0;
    let minDiff = Infinity;
    cards.forEach((card, idx) => {
      const cardCenter = card.getBoundingClientRect().left + card.offsetWidth / 2;
      const diff = Math.abs(cardCenter - sliderCenter);
      if (diff < minDiff) {
        minDiff = diff;
        closestIdx = idx;
      }
    });
    setActiveIndex(closestIdx);
  };

  return (
    <section id="testimonials" className="py-20 sm:py-32 md:py-40 relative overflow-hidden border-t border-white/5 scroll-mt-20">
      {/* Background ambient glow */}
      <div className="absolute top-0 right-0 w-1/2 h-[600px] bg-[#7C61FF]/5 blur-[180px] pointer-events-none z-0 rounded-full" />
      <div className="absolute bottom-0 left-0 w-[400px] h-[400px] bg-[#8B5CF6]/5 blur-[150px] pointer-events-none z-0 rounded-full" />
      
      <div className="max-w-7xl mx-auto px-4 sm:px-6 relative z-10">
        <div className="grid grid-cols-1 lg:grid-cols-[1fr_1.65fr] gap-10 lg:gap-16 items-start">
          
          {/* Left Column: Intro & Interactive Dial / Selector */}
          <div className="lg:sticky lg:top-32 space-y-6 sm:space-y-8 text-center lg:text-left">
            <div className="space-y-3 sm:space-y-4">
              <motion.div
                initial={{ opacity: 0, y: 15 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                className="inline-block"
              >
                <span className="text-xs font-bold tracking-[0.2em] text-[#A78BFA] uppercase">What Clients Say</span>
              </motion.div>

              <motion.h2
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5 }}
                className="text-[1.75rem] sm:text-[2rem] md:text-[2.25rem] lg:text-[2.5rem] font-heading font-bold text-white leading-tight sm:leading-[1.2] tracking-tight"
              >
                Don&apos;t just take <br className="hidden lg:block" />
                <span className="text-transparent bg-clip-text bg-gradient-to-r from-[#7C61FF] via-[#8B5CF6] to-[#A78BFA]">
                  our word for it.
                </span>
              </motion.h2>
              
              <motion.p
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: 0.1 }}
                className="text-[0.875rem] sm:text-[0.9375rem] font-normal text-gray-400 max-w-md mx-auto lg:mx-0 leading-relaxed"
              >
                Direct feedback from founders and brand leaders on how Zelvoxx developed their digital presence and online platforms.
              </motion.p>
            </div>

            {/* Testimonial Dial / Selector for exactly 4 entries */}
            <div className="hidden lg:flex flex-col gap-3 pt-2">
              <div className="flex items-center justify-between text-[11px] font-mono uppercase tracking-widest text-white/40 px-1">
                <span>Client Index</span>
                <span className="text-[#A78BFA]">0{activeIndex + 1} / 04</span>
              </div>
              
              <div className="flex flex-col gap-2">
                {displayData.map((test, idx) => {
                  const isActive = activeIndex === idx;
                  return (
                    <button
                      key={idx}
                      type="button"
                      onClick={() => scrollToIndex(idx)}
                      className={`group text-left px-4 py-3 rounded-xl transition-all duration-300 flex items-center justify-between border cursor-pointer ${
                        isActive
                          ? "bg-[#7C61FF]/15 border-[#7C61FF]/50 shadow-[0_0_20px_rgba(124,97,255,0.2)] text-white"
                          : "bg-white/[0.02] border-white/5 hover:bg-white/[0.05] hover:border-white/15 text-white/60 hover:text-white"
                      }`}
                    >
                      <div className="flex items-center gap-3 min-w-0">
                        <span className={`text-xs font-mono font-bold transition-colors shrink-0 ${
                          isActive ? "text-[#A78BFA]" : "text-white/40 group-hover:text-white/70"
                        }`}>
                          0{idx + 1}
                        </span>
                        <span className="text-sm font-semibold truncate">
                          {test.company}
                        </span>
                      </div>
                      <span className={`text-xs ml-3 shrink-0 transition-colors ${
                        isActive ? "text-[#A78BFA] font-medium" : "text-white/40 group-hover:text-white/70"
                      }`}>
                        {test.name}
                      </span>
                    </button>
                  );
                })}
              </div>

              {/* Prev / Next Dial Navigation */}
              <div className="flex items-center justify-between pt-2 px-1">
                <div className="flex items-center gap-2">
                  <button
                    type="button"
                    onClick={() => scrollToIndex(Math.max(0, activeIndex - 1))}
                    disabled={activeIndex === 0}
                    aria-label="Previous testimonial"
                    className="w-9 h-9 rounded-full border border-white/10 bg-white/[0.03] hover:bg-[#7C61FF]/20 hover:border-[#7C61FF]/40 flex items-center justify-center text-white/70 hover:text-white transition-all disabled:opacity-25 disabled:pointer-events-none cursor-pointer"
                  >
                    <ChevronLeft className="w-4 h-4" />
                  </button>
                  <button
                    type="button"
                    onClick={() => scrollToIndex(Math.min(displayData.length - 1, activeIndex + 1))}
                    disabled={activeIndex === displayData.length - 1}
                    aria-label="Next testimonial"
                    className="w-9 h-9 rounded-full border border-white/10 bg-white/[0.03] hover:bg-[#7C61FF]/20 hover:border-[#7C61FF]/40 flex items-center justify-center text-white/70 hover:text-white transition-all disabled:opacity-25 disabled:pointer-events-none cursor-pointer"
                  >
                    <ChevronRight className="w-4 h-4" />
                  </button>
                </div>
                <span className="text-xs font-mono text-white/40">
                  Click or scroll cards
                </span>
              </div>
            </div>

            {/* Mobile Dial Indicator */}
            <div className="lg:hidden flex items-center justify-center gap-2 pt-2">
              {displayData.map((test, idx) => (
                <button
                  key={idx}
                  type="button"
                  onClick={() => scrollToIndex(idx)}
                  className={`h-2 transition-all duration-300 rounded-full cursor-pointer ${
                    activeIndex === idx
                      ? "w-8 bg-gradient-to-r from-[#7C61FF] to-[#A78BFA] shadow-[0_0_10px_rgba(124,97,255,0.5)]"
                      : "w-2 bg-white/20 hover:bg-white/40"
                  }`}
                  aria-label={`Jump to testimonial ${idx + 1} (${test.company})`}
                />
              ))}
            </div>

          </div>

          {/* Right Column: Cards Slider */}
          <div
            ref={sliderRef}
            onScroll={handleScroll}
            className="flex overflow-x-auto gap-4 sm:gap-6 pb-8 sm:pb-12 pt-2 snap-x snap-mandatory scrollbar-hide relative z-10 -mx-4 px-4 sm:mx-0 sm:px-0"
          >
            {displayData.map((test, idx) => (
              <TiltCard key={idx} className="snap-center shrink-0 rounded-2xl sm:rounded-[2rem] bg-gradient-to-b from-[#0D0C18] to-[#060610]">
                <div
                  data-testimonial-card
                  className="w-[84vw] sm:w-[460px] md:w-[480px] min-h-[390px] sm:min-h-[420px] glass-premium premium-border p-6 sm:p-8 rounded-2xl sm:rounded-[2rem] relative group bg-gradient-to-b from-[#0D0C18] to-[#060610] flex flex-col justify-between transition-all duration-500 touch-manipulation hover:border-[#7C61FF]/40"
                  style={{
                    boxShadow: "0 8px 32px rgba(0,0,0,0.4), 0 0 0 1px rgba(255,255,255,0.05)",
                  }}
                >
                  {/* Subtle card glow on hover */}
                  <div
                    className="absolute -inset-[1px] rounded-[2rem] opacity-0 group-hover:opacity-100 transition-opacity duration-500 pointer-events-none"
                    style={{
                      background: "linear-gradient(135deg, rgba(124,97,255,0.18), rgba(139,92,246,0.08))",
                      filter: "blur(20px)",
                    }}
                  />

                  {/* Top Header: Dial Index Badge & Verified Partner Badge */}
                  <div className="flex items-center justify-between gap-3 relative z-10 mb-5 sm:mb-6">
                    <div className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full bg-white/[0.04] border border-white/10 text-xs font-mono text-[#A78BFA]">
                      <span>0{idx + 1}</span>
                      <span className="text-white/20">/</span>
                      <span className="text-white/40">04</span>
                    </div>

                    <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-emerald-500/10 border border-emerald-500/20 text-emerald-400 text-xs font-semibold tracking-wide shadow-[0_0_12px_rgba(16,185,129,0.15)]">
                      <CheckCircle2 className="w-3.5 h-3.5" />
                      <span>Verified Partner</span>
                    </div>
                  </div>

                  {/* Subtle background Quote watermark */}
                  <div className="absolute top-16 right-6 sm:top-20 sm:right-8 opacity-10 group-hover:opacity-20 transition-all duration-500 pointer-events-none">
                    <Quote className="w-16 h-16 sm:w-20 sm:h-20 text-[#A78BFA]" />
                  </div>

                  {/* Quote Text - Exact copy, clean and comfortable typography */}
                  <p className="text-white/90 font-body text-[0.9375rem] sm:text-base leading-relaxed sm:leading-[1.75] mb-6 sm:mb-8 relative z-10 flex-grow font-normal">
                    &ldquo;{test.content}&rdquo;
                  </p>

                  {/* Card Footer: Prominent Client & Company Identity (No fabricated metrics or photos) */}
                  <div className="pt-4 sm:pt-5 border-t border-white/10 relative z-10 flex items-center justify-between gap-4">
                    <div className="flex items-center gap-3.5 min-w-0">
                      {/* Initials circle avatar */}
                      <div className="w-11 h-11 sm:w-12 sm:h-12 rounded-full bg-gradient-to-br from-[#7C61FF] via-[#8B5CF6] to-[#A78BFA] p-[1.5px] shadow-[0_0_15px_rgba(124,97,255,0.3)] shrink-0">
                        <div className="w-full h-full rounded-full bg-[#0E0D18] flex items-center justify-center text-white font-bold font-heading text-sm sm:text-base tracking-wider">
                          {getInitials(test.name)}
                        </div>
                      </div>

                      <div className="min-w-0">
                        <h4 className="text-white font-bold font-heading text-base sm:text-lg tracking-tight leading-snug truncate">
                          {test.name}
                        </h4>
                        <p className="text-[#A78BFA] font-medium text-xs sm:text-sm tracking-wide mt-0.5 truncate">
                          {test.company}
                        </p>
                      </div>
                    </div>

                    <div className="text-right shrink-0">
                      <span className="text-[10px] font-mono uppercase tracking-widest text-white/40 block">
                        Client Partner
                      </span>
                      <span className="text-xs font-semibold text-white/70">
                        Verified
                      </span>
                    </div>
                  </div>
                </div>
              </TiltCard>
            ))}
          </div>

        </div>
      </div>
    </section>
  );
}
