"use client";

import Link from "next/link";
import { motion } from "framer-motion";
import { ArrowRight } from "lucide-react";
import Image from "next/image";
import { useState, useEffect } from "react";
import { caseStudies } from "@/src/constants/data";
import { CaseStudyType } from "@/src/types";
import TiltCard from "@/src/components/ui/TiltCard";

const caseStudyVisuals: Record<string, string> = {
  "E-commerce Brand": "/images/case-studies/ecommerce-growth.webp",
  "B2B SaaS Startup": "/images/case-studies/saas-scale.webp",
};

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
    window.addEventListener('resize', checkMobile, { passive: true });
    return () => window.removeEventListener('resize', checkMobile);
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
          </div>

          {/* Right Column: Case Studies */}
          <div className="space-y-6 sm:space-y-8">
            {displayData.map((study, idx) => {
              const clientName = study.clientName || study.client || "Client";
              const visualImage = caseStudyVisuals[clientName] || (idx % 2 === 0 ? "/images/case-studies/ecommerce-growth.webp" : "/images/case-studies/saas-scale.webp");
              
              // Use slug if available, otherwise fallback to /case-studies
              const studySlug = study.slug;
              const href = studySlug ? `/case-study/${studySlug}` : "/case-studies";

              // No delay on mobile
              const delay = isMobile ? 0 : idx * 0.1;

              return (
                <TiltCard key={idx} className="w-full">
                  <Link
                    href={href}
                    className="block"
                  >
                    <motion.div
                      initial={{ opacity: 0, y: 30 }}
                      whileInView={{ opacity: 1, y: 0 }}
                      viewport={{ once: true, margin: "-50px" }}
                      transition={{ duration: 0.5, delay }}
                      className="glass-premium premium-border soft-glow rounded-xl sm:rounded-2xl p-5 sm:p-8 relative overflow-hidden group hover:border-[#7C61FF]/40 transition-all duration-500 bg-gradient-to-b from-[#141322]/80 to-[#0A0912]/80 touch-manipulation"
                    >
                      <div className="absolute top-0 right-0 w-[500px] h-[500px] bg-[#7C61FF]/5 rounded-full blur-[100px] opacity-0 group-hover:opacity-100 transition-opacity duration-700 pointer-events-none" />
                      
                      <div className="border-b border-white/10 pb-4 sm:pb-6 mb-4 sm:mb-6 flex flex-col sm:flex-row sm:items-center justify-between gap-3 sm:gap-4 relative z-10">
                        <div>
                          <p className="text-white/80 font-heading text-lg">
                            How we helped <strong className="text-white font-black">{clientName}</strong> scale.
                          </p>
                          {study.industry && (
                            <span className="text-xs text-[#A78BFA]/70 mt-1 block">{study.industry}</span>
                          )}
                        </div>
                        <span className="flex items-center gap-2 text-white/50 group-hover:text-[#A78BFA] text-sm font-bold transition-colors shrink-0">
                          View Case Study <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
                        </span>
                      </div>

                      {/* Case Study Visual Preview Mockup */}
                      <div className="w-full h-44 sm:h-60 mb-6 rounded-xl overflow-hidden relative border border-white/10 shadow-lg bg-[#07070B] group-hover:border-[#7C61FF]/40 transition-all duration-500">
                        <Image
                          src={visualImage}
                          alt={`${clientName} Case Study Result`}
                          fill
                          sizes="(max-width: 1024px) 100vw, 800px"
                          loading="lazy"
                          className="object-cover group-hover:scale-105 transition-transform duration-700"
                        />
                        <div className="absolute inset-0 bg-gradient-to-t from-[#0A0912] via-transparent to-transparent opacity-60" />
                      </div>

                      <div className="grid grid-cols-1 md:grid-cols-3 gap-4 sm:gap-8 relative z-10">
                        {/* Problem */}
                        <div className="space-y-2 sm:space-y-3">
                          <h4 className="text-xs font-bold font-heading uppercase tracking-wider text-red-400">Problem</h4>
                          <p className="text-white/60 font-body leading-relaxed text-xs sm:text-sm line-clamp-3">
                            {study.problem || "Identified growth bottlenecks and conversion challenges."}
                          </p>
                        </div>

                        {/* Solution */}
                        <div className="space-y-2 sm:space-y-3">
                          <h4 className="text-xs font-bold font-heading uppercase tracking-wider text-[#A78BFA]">Solution</h4>
                          <p className="text-white/60 font-body leading-relaxed text-xs sm:text-sm line-clamp-3">
                            {study.solution || "Implemented strategic systems and optimization."}
                          </p>
                        </div>

                        {/* Result */}
                        <div className="space-y-2 sm:space-y-3">
                          <h4 className="text-xs font-bold font-heading uppercase tracking-wider text-[#34D399]">Result</h4>
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
