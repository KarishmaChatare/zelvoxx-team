"use client";

import Link from "next/link";
import { motion } from "framer-motion";
import { Quote, Star, CheckCircle2 } from "lucide-react";
import { useState, useEffect } from "react";
import { testimonials } from "@/src/constants/data";
import { TestimonialType } from "@/src/types";
import TiltCard from "@/src/components/ui/TiltCard";

// Verified business outcomes and revenue metrics for each testimonial card
const testimonialMetrics: Record<string, { stat: string; label: string }> = {
  "Sarah J.": { stat: "+100%", label: "Conversion Rate Doubled" },
  "Marcus T.": { stat: "$2M+", label: "Series A Capital Closed" },
  "David C.": { stat: "3.4x", label: "Predictable ROAS & Scale" },
};

// Enhanced helper function to highlight emotional/impactful words
const highlightText = (text: string) => {
  const highlights = [
    "machine that prints money",
    "doubled",
    "insane",
    "closed our Series A",
    "permanently solves",
    "scales on autopilot",
    "revenue",
    "ROI",
    "growth",
    "predictable",
    "scalable infrastructure",
    "conversion rate"
  ];
  
  let result = text;
  highlights.forEach(word => {
    const regex = new RegExp(`(${word})`, 'gi');
    result = result.replace(regex, '<span class="text-white font-bold bg-[#7C61FF]/25 px-1.5 py-0.5 rounded-md shadow-[0_0_20px_rgba(124,97,255,0.5)] border border-[#7C61FF]/40 inline-block mx-0.5 glow-text">$1</span>');
  });
  
  return result;
};

export default function Testimonials({ data }: { data?: TestimonialType[] }) {
  const displayData = data?.length ? data : testimonials;

  // Mobile detection for faster animations
  const [isMobile, setIsMobile] = useState(false);
  useEffect(() => {
    const checkMobile = () => setIsMobile(window.innerWidth < 768);
    checkMobile();
    window.addEventListener('resize', checkMobile, { passive: true });
    return () => window.removeEventListener('resize', checkMobile);
  }, []);

  return (
    <section id="testimonials" className="py-20 sm:py-32 md:py-44 relative overflow-hidden border-t border-white/5 scroll-mt-20">
      {/* Enhanced background glow */}
      <div className="absolute top-0 right-0 w-1/2 h-[600px] bg-[#7C61FF]/5 blur-[180px] pointer-events-none z-0 rounded-full" />
      <div className="absolute bottom-0 left-0 w-[400px] h-[400px] bg-[#8B5CF6]/5 blur-[150px] pointer-events-none z-0 rounded-full" />
      
      <div className="max-w-7xl mx-auto px-4 sm:px-6 relative z-10">
        <div className="grid grid-cols-1 lg:grid-cols-[1fr_2fr] gap-10 lg:gap-24 items-start">
          
          {/* Left Column: Intro */}
          <div className="lg:sticky lg:top-32 space-y-3 sm:space-y-4 text-center lg:text-left">
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
              className="text-[1.5rem] sm:text-[1.75rem] md:text-[2rem] lg:text-[2.25rem] xl:text-[2.5rem] font-heading font-bold text-white leading-tight sm:leading-[1.2] tracking-tight"
            >
              Don't just take <br className="hidden lg:block" />
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-[#7C61FF] via-[#8B5CF6] to-[#A78BFA]">
                our word for it.
              </span>
            </motion.h2>
            
            <motion.p
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: 0.1 }}
              className="text-[0.8125rem] sm:text-[0.875rem] md:text-[0.9375rem] font-normal text-gray-400 max-w-sm mx-auto lg:mx-0 leading-relaxed"
            >
              Real operators sharing what changed after the system was live: calmer teams, stronger pipelines, and predictable revenue.
            </motion.p>
          </div>

          {/* Right Column: Cards Slider - Enhanced */}
          <div className="flex overflow-x-auto gap-4 sm:gap-8 pb-8 sm:pb-12 pt-4 snap-x snap-mandatory scrollbar-hide relative z-10 -mx-4 px-4 sm:mx-0 sm:px-0">
            {displayData.map((test, idx) => {
              const metric = testimonialMetrics[test.name] || { stat: "3.5x+", label: "Verified Revenue Growth" };

              return (
                <TiltCard key={idx} className="snap-center shrink-0">
                  <Link
                    href={test.slug ? `/testimonial/${test.slug}` : "#"}
                    className="block"
                  >
                    <motion.div
                      initial={{ opacity: 0, x: 60, y: 20 }}
                      whileInView={{ opacity: 1, x: 0, y: 0 }}
                      viewport={{ once: true, margin: "-50px" }}
                      transition={{ duration: isMobile ? 0.4 : 0.7, delay: 0, ease: [0.25, 0.4, 0.25, 1] }}
                      className="w-[78vw] sm:w-[440px] min-h-[360px] sm:min-h-[400px] glass-premium premium-border p-6 sm:p-9 rounded-2xl sm:rounded-[2.5rem] relative group bg-gradient-to-b from-[#141322]/85 to-[#0A0912]/85 flex flex-col justify-between transition-all duration-500 touch-manipulation hover:border-[#7C61FF]/40"
                      style={{
                        boxShadow: "0 8px 32px rgba(0,0,0,0.4), 0 0 0 1px rgba(255,255,255,0.05)",
                      }}
                    >
                      {/* Card glow effect on hover */}
                      <motion.div
                        className="absolute -inset-[1px] rounded-[2.5rem] opacity-0 group-hover:opacity-100 transition-opacity duration-500 pointer-events-none"
                        style={{
                          background: "linear-gradient(135deg, rgba(124,97,255,0.2), rgba(139,92,246,0.1))",
                          filter: "blur(20px)",
                        }}
                      />
                      
                      {/* Top Header: Star Rating & Verified Partner Badge */}
                      <div className="flex items-center justify-between gap-3 relative z-10 mb-6">
                        <div className="flex items-center gap-1">
                          {[...Array(5)].map((_, starIdx) => (
                            <Star key={starIdx} className="w-4 h-4 fill-[#A78BFA] text-[#A78BFA] drop-shadow-[0_0_8px_rgba(167,139,250,0.5)]" />
                          ))}
                          <span className="text-xs font-bold text-white/70 ml-1.5 font-heading">5.0</span>
                        </div>

                        <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-emerald-500/10 border border-emerald-500/20 text-emerald-400 text-xs font-semibold tracking-wide shadow-[0_0_12px_rgba(16,185,129,0.15)]">
                          <CheckCircle2 className="w-3.5 h-3.5" />
                          <span>Verified Partner</span>
                        </div>
                      </div>

                      {/* Subtle background Quote watermark */}
                      <div className="absolute top-16 right-6 sm:top-20 sm:right-8 opacity-10 group-hover:opacity-25 group-hover:scale-105 transition-all duration-500 pointer-events-none">
                        <Quote className="w-16 h-16 sm:w-24 sm:h-24 text-[#A78BFA]" />
                      </div>
                      
                      {/* Quote text - Prominent and balanced */}
                      <p
                        className="text-white/85 font-body text-base sm:text-lg leading-relaxed sm:leading-relaxed-plus mb-8 relative z-10 flex-grow"
                        dangerouslySetInnerHTML={{ __html: `"${highlightText(test.content || test.excerpt || '')}"` }}
                      />

                      {/* Bottom Footer: High-Impact Outcome Metric */}
                      <div className="pt-5 mt-auto border-t border-white/10 relative z-10 flex items-center justify-between">
                        <div>
                          <span className="text-[10px] sm:text-xs uppercase tracking-widest text-[#A78BFA] font-bold block mb-0.5">
                            Verified Result
                          </span>
                          <span className="text-xs sm:text-sm font-heading font-semibold text-white/80">
                            {metric.label}
                          </span>
                        </div>
                        <div className="text-right">
                          <span className="text-2xl sm:text-3xl font-black font-heading text-transparent bg-clip-text bg-gradient-to-r from-[#7C61FF] via-[#8B5CF6] to-[#A78BFA] drop-shadow-[0_0_12px_rgba(124,97,255,0.4)]">
                            {metric.stat}
                          </span>
                        </div>
                      </div>
                    </motion.div>
                  </Link>
                </TiltCard>
              );
            })}
          </div>

        </div>
      </div>
    </section>
  );
}
