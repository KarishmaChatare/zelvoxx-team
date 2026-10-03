"use client";

import Link from "next/link";
import { motion } from "framer-motion";
import { ArrowRight, ArrowUpRight, TrendingUp, AlertCircle, Zap, CheckCircle2 } from "lucide-react";
import Image from "next/image";
import { useState, useEffect } from "react";
import { caseStudies } from "@/src/constants/data";
import { CaseStudyType } from "@/src/types";
import TiltCard from "@/src/components/ui/TiltCard";
import { urlForImage } from "@/sanity/lib/image";

const caseStudyVisuals: Record<string, string> = {
  // Live case study items from Sanity / seed data
  "Avora Luxury": "/images/case-studies/ecommerce-growth.webp",
  "Hexabit Technologies": "/images/case-studies/saas-scale.webp",
  "Pulse Fitness": "/images/case-studies/pulse-fitness.webp",
  "Lumen Analytics": "/images/case-studies/lumen-analytics.webp",

  // Fallback case studies from data.tsx
  "E-commerce Brand": "/images/case-studies/ecommerce-growth.webp",
  "B2B SaaS Startup": "/images/case-studies/saas-scale.webp",

  // Portfolio clients in case referenced
  "Apex Financial": "/images/portfolio/apex-financial.webp",
  "Luminary MedSpa": "/images/portfolio/luminary-medspa.webp",
  "Velocity SaaS": "/images/portfolio/velocity-saas.webp",
  "Strata Real Estate": "/images/portfolio/strata-realestate.webp",
};

const keyResultHighlights: Record<string, string> = {
  "Avora Luxury": "$50K/mo Automated Funnels",
  "Hexabit Technologies": "+400% Organic Traffic",
  "Pulse Fitness": "+3,587 New Members",
  "Lumen Analytics": "$2.4M Enterprise Pipeline",
  "E-commerce Brand": "+3.4x ROAS / $120k/mo",
  "B2B SaaS Startup": "$2M Series A Funding",
  "Apex Financial": "+340% Lead Volume",
  "Luminary MedSpa": "$100k Monthly Added Revenue",
  "Velocity SaaS": "4.2x ROI on Ads",
  "Strata Real Estate": "$12M Closed Volume",
};

function getKeyResult(study: CaseStudyType, clientName: string): string {
  if (keyResultHighlights[clientName]) {
    return keyResultHighlights[clientName];
  }
  if (study.results && study.results.length > 0) {
    const r = study.results[0];
    return `${r.value} ${r.label}`;
  }
  if (study.result) {
    const firstSentence = study.result.split(/[.\n]/)[0].trim();
    if (firstSentence.length > 0 && firstSentence.length <= 40) {
      return firstSentence;
    }
    return firstSentence.slice(0, 36) + "...";
  }
  return "Proven Growth Impact";
}

export default function CaseStudies({ data }: { data?: CaseStudyType[] }) {
  const allData = data?.length ? data : caseStudies;
  // Limit to first 3 items
  const displayData = allData.slice(0, 3);
  const hasMore = allData.length > 3;

  // Mobile detection for faster animations
  const [isMobile, setIsMobile] = useState(false);
  useEffect(() => {
    const checkMobile = () => setIsMobile(window.innerWidth < 768);
    checkMobile();
    window.addEventListener("resize", checkMobile, { passive: true });
    return () => window.removeEventListener("resize", checkMobile);
  }, []);

  return (
    <section id="case-studies" className="py-20 sm:py-32 relative border-t border-white/5 scroll-mt-20">
      {/* Background gradients */}
      <div className="absolute top-1/4 left-0 w-full h-[300px] bg-[#7C61FF]/5 blur-[120px] pointer-events-none z-0 -skew-y-12" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 relative z-10">
        <div className="grid grid-cols-1 lg:grid-cols-[1fr_2fr] gap-10 lg:gap-20 items-start">
          
          {/* Left Column: Intro */}
          <div className="lg:sticky lg:top-32 space-y-3 sm:space-y-4 text-center lg:text-left">
            <motion.div
              initial={{ opacity: 0, y: 15 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              className="inline-block"
            >
              <span className="text-xs font-bold tracking-[0.2em] text-[#A78BFA] uppercase">Case Studies</span>
            </motion.div>

            <motion.h2
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5 }}
              className="text-[1.5rem] sm:text-[1.75rem] md:text-[2rem] lg:text-[2.25rem] xl:text-[2.5rem] font-heading font-bold text-white leading-tight sm:leading-[1.2] tracking-tight"
            >
              Real strategies. <br className="hidden lg:block" />
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-[#7C61FF] via-[#8B5CF6] to-[#A78BFA]">
                Real results.
              </span>
            </motion.h2>

            <motion.p
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: 0.1 }}
              className="text-[0.8125rem] sm:text-[0.875rem] md:text-[0.9375rem] font-normal text-gray-400 max-w-sm mx-auto lg:mx-0 leading-relaxed"
            >
              Audited performance breakthroughs and engineered revenue systems across industries.
            </motion.p>
          </div>

          {/* Right Column: Case Studies */}
          <div className="space-y-6 sm:space-y-8">
            {displayData.map((study, idx) => {
              const clientName = study.clientName || study.client || "Client";
              
              let visualImage: string = caseStudyVisuals[clientName];
              if (!visualImage && (study.thumbnail || study.heroImage)) {
                try {
                  const url = urlForImage(study.thumbnail || study.heroImage)?.url();
                  if (url) visualImage = url;
                } catch {}
              }
              if (!visualImage) {
                visualImage = idx % 2 === 0
                  ? "/images/case-studies/ecommerce-growth.webp"
                  : "/images/case-studies/saas-scale.webp";
              }

              const keyMetric = getKeyResult(study, clientName);
              
              // Use slug if available, otherwise fallback to /case-studies
              const studySlug = study.slug;
              const href = studySlug ? `/case-study/${studySlug}` : "/case-studies";

              // No delay on mobile
              const delay = isMobile ? 0 : idx * 0.12;

              return (
                <TiltCard key={idx} maxTilt={6} glareOpacity={0.12} className="w-full">
                  <Link
                    href={href}
                    className="group block h-full"
                  >
                    <motion.div
                      initial={{ opacity: 0, y: 35 }}
                      whileInView={{ opacity: 1, y: 0 }}
                      viewport={{ once: true, margin: "-60px" }}
                      transition={{ duration: 0.6, delay, ease: [0.22, 1, 0.36, 1] }}
                      className="relative rounded-2xl sm:rounded-3xl p-4 sm:p-6 lg:p-7 overflow-hidden border border-white/10 group-hover:border-[#7C61FF]/50 bg-gradient-to-b from-[#141322]/90 via-[#0e0d1a]/90 to-[#0A0912]/95 backdrop-blur-xl shadow-2xl transition-all duration-500 touch-manipulation flex flex-col justify-between"
                    >
                      {/* Ambient Glow on Hover */}
                      <div className="absolute -inset-[1px] rounded-2xl sm:rounded-3xl bg-gradient-to-r from-[#7C61FF]/25 via-[#8B5CF6]/15 to-[#34D399]/25 opacity-0 group-hover:opacity-100 blur-md transition-opacity duration-700 pointer-events-none" />
                      <div className="absolute top-0 right-0 w-[450px] h-[450px] bg-[#7C61FF]/8 rounded-full blur-[100px] opacity-0 group-hover:opacity-100 transition-opacity duration-700 pointer-events-none" />

                      {/* TOP: Prominent Visual Anchor with Gradient Overlays */}
                      <div className="relative w-full h-56 sm:h-72 md:h-80 lg:h-84 rounded-xl sm:rounded-2xl overflow-hidden mb-6 bg-[#07070B] border border-white/10 group-hover:border-[#7C61FF]/40 transition-all duration-500 shadow-lg">
                        {/* Main Case Study Image with Hover Zoom */}
                        <Image
                          src={visualImage}
                          alt={`${clientName} Case Study - ${study.industry || "Zelvoxx System"}`}
                          fill
                          sizes="(max-width: 640px) 100vw, (max-width: 1024px) 100vw, 860px"
                          quality={95}
                          priority={idx === 0}
                          className="object-cover object-center transform scale-100 group-hover:scale-106 transition-transform duration-700 ease-out"
                        />

                        {/* Ambient Gradient Overlays for Readability */}
                        <div className="absolute inset-0 bg-gradient-to-t from-[#0e0d1a] via-[#0e0d1a]/40 to-transparent opacity-85 pointer-events-none" />
                        <div className="absolute inset-0 bg-gradient-to-b from-[#07070B]/50 via-transparent to-transparent pointer-events-none" />

                        {/* Floating Top Elements on Image */}
                        <div className="absolute top-3 sm:top-4 left-3 sm:left-4 right-3 sm:right-4 flex items-center justify-between gap-3 z-10 pointer-events-none">
                          {/* Industry Badge */}
                          {study.industry ? (
                            <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-[#0A0912]/80 backdrop-blur-md border border-white/15 text-[11px] sm:text-xs font-semibold text-[#A78BFA] shadow-sm">
                              <span className="w-1.5 h-1.5 rounded-full bg-[#A78BFA] animate-pulse" />
                              {study.industry}
                            </span>
                          ) : <div />}

                          {/* Interactive Arrow Action Button */}
                          <span className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-full bg-[#0A0912]/80 backdrop-blur-md border border-white/15 text-xs font-semibold text-white/90 group-hover:bg-[#7C61FF] group-hover:border-[#7C61FF] group-hover:text-white transition-all duration-300 shadow-md">
                            <span>View Case Study</span>
                            <ArrowUpRight className="w-3.5 h-3.5 sm:w-4 sm:h-4 group-hover:translate-x-0.5 group-hover:-translate-y-0.5 transition-transform duration-300" />
                          </span>
                        </div>

                        {/* Bottom Elements on Image: Client Headline & Key Result Metric */}
                        <div className="absolute bottom-3 sm:bottom-4 left-3 sm:left-4 right-3 sm:right-4 flex flex-col sm:flex-row sm:items-end justify-between gap-3 z-10">
                          <div>
                            <span className="text-[11px] uppercase tracking-wider font-bold text-white/50 block mb-0.5">
                              Client Transformation
                            </span>
                            <h3 className="text-lg sm:text-xl md:text-2xl font-bold font-heading text-white group-hover:text-transparent group-hover:bg-clip-text group-hover:bg-gradient-to-r group-hover:from-white group-hover:via-[#C4B5FD] group-hover:to-[#7C61FF] transition-all duration-300">
                              How we helped <span className="text-white underline decoration-[#7C61FF]/40 group-hover:decoration-[#7C61FF]">{clientName}</span> scale
                            </h3>
                          </div>

                          {/* Animated Key Result Metric Badge */}
                          <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-[#0A0912]/90 backdrop-blur-md border border-white/15 text-[#34D399] group-hover:border-[#34D399]/60 group-hover:bg-[#0A0912] group-hover:shadow-[0_0_22px_rgba(52,211,153,0.35)] transition-all duration-500 shrink-0 self-start sm:self-auto">
                            <TrendingUp className="w-4 h-4 text-[#34D399] group-hover:scale-110 transition-transform duration-300" />
                            <span className="text-xs sm:text-sm font-bold tracking-wide text-white group-hover:text-[#34D399] transition-colors">
                              {keyMetric}
                            </span>
                          </div>
                        </div>
                      </div>

                      {/* 3-Column Problem / Solution / Result Breakdown */}
                      <div className="grid grid-cols-1 md:grid-cols-3 gap-3.5 sm:gap-5 relative z-10 pt-1">
                        {/* Problem */}
                        <div className="p-3.5 sm:p-4 rounded-xl bg-white/[0.02] border border-white/5 group-hover:border-white/10 transition-colors space-y-1.5 sm:space-y-2">
                          <div className="flex items-center gap-1.5 text-xs font-bold font-heading uppercase tracking-wider text-rose-400">
                            <AlertCircle className="w-3.5 h-3.5" />
                            <span>Problem</span>
                          </div>
                          <p className="text-white/60 font-body leading-relaxed text-xs sm:text-sm line-clamp-3">
                            {study.problem || "Identified growth bottlenecks and conversion challenges."}
                          </p>
                        </div>

                        {/* Solution */}
                        <div className="p-3.5 sm:p-4 rounded-xl bg-white/[0.02] border border-white/5 group-hover:border-white/10 transition-colors space-y-1.5 sm:space-y-2">
                          <div className="flex items-center gap-1.5 text-xs font-bold font-heading uppercase tracking-wider text-[#A78BFA]">
                            <Zap className="w-3.5 h-3.5" />
                            <span>Solution</span>
                          </div>
                          <p className="text-white/60 font-body leading-relaxed text-xs sm:text-sm line-clamp-3">
                            {study.solution || "Implemented strategic systems and optimization."}
                          </p>
                        </div>

                        {/* Result */}
                        <div className="p-3.5 sm:p-4 rounded-xl bg-gradient-to-br from-[#34D399]/[0.08] to-transparent border border-[#34D399]/20 group-hover:border-[#34D399]/40 transition-colors space-y-1.5 sm:space-y-2">
                          <div className="flex items-center gap-1.5 text-xs font-bold font-heading uppercase tracking-wider text-[#34D399]">
                            <CheckCircle2 className="w-3.5 h-3.5" />
                            <span>Result</span>
                          </div>
                          <p className="text-white font-medium font-body leading-relaxed text-xs sm:text-sm line-clamp-3">
                            {study.result || "Significant growth and improved performance metrics."}
                          </p>
                        </div>
                      </div>
                    </motion.div>
                  </Link>
                </TiltCard>
              );
            })}

            {/* View All Button */}
            {hasMore && (
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: 0 }}
                className="flex justify-center pt-4"
              >
                <Link
                  href="/case-studies"
                  className="group inline-flex items-center gap-2 px-6 py-3 rounded-full bg-white/5 border border-white/10 hover:border-[#7C61FF]/40 hover:bg-[#7C61FF]/10 transition-all duration-300"
                >
                  <span className="text-white font-semibold text-sm sm:text-base">View All Case Studies</span>
                  <ArrowRight className="w-4 h-4 text-[#A78BFA] group-hover:translate-x-1 transition-transform" />
                </Link>
              </motion.div>
            )}
          </div>

        </div>
      </div>
    </section>
  );
}
