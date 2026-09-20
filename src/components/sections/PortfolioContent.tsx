"use client";

import { motion } from "framer-motion";
import { ArrowUpRight, TrendingUp, ArrowRight } from "lucide-react";
import Link from "next/link";
import Image from "next/image";
import { useState, useEffect } from "react";
import { urlForImage } from "@/sanity/lib/image";
import { projects } from "@/src/constants/data";
import TiltCard from "@/src/components/ui/TiltCard";

interface PortfolioContentProps {
  data: any[];
}

const localProjectImages: Record<string, string> = {
  "Apex Financial": "/images/portfolio/apex-financial.webp",
  "Luminary MedSpa": "/images/portfolio/luminary-medspa.webp",
  "Velocity SaaS": "/images/portfolio/velocity-saas.webp",
  "Strata Real Estate": "/images/portfolio/strata-realestate.webp",
};

export default function PortfolioContent({ data }: PortfolioContentProps) {
  // Use data from Sanity if available, otherwise fall back to rich projects from data.tsx
  const sourceData = data?.length ? data : projects.map((p, idx) => ({
    _id: `project-${idx}`,
    clientName: p.client || `Project ${idx + 1}`,
    niche: p.niche,
    result: p.result,
    slug: (p.client || `project-${idx}`).toLowerCase().replace(/\s+/g, "-"),
  }));

  // Limit to first 4 items for a clean 2x2 grid
  const displayData = sourceData.slice(0, 4);
  const hasMore = sourceData.length > 4;

  // Mobile detection for faster animations
  const [isMobile, setIsMobile] = useState(false);
  useEffect(() => {
    const checkMobile = () => setIsMobile(window.innerWidth < 768);
    checkMobile();
    window.addEventListener('resize', checkMobile, { passive: true });
    return () => window.removeEventListener('resize', checkMobile);
  }, []);

  return (
    <section className="py-20 sm:py-32 md:py-44 relative overflow-hidden">
      <div className="max-w-7xl mx-auto px-4 sm:px-6">

        <div className="grid grid-cols-1 lg:grid-cols-[1fr_2fr] gap-10 lg:gap-16">

          {/* LEFT */}
          <div className="lg:sticky lg:top-32 space-y-3 sm:space-y-4 text-center lg:text-left">
            <motion.div
              initial={{ opacity: 0, y: 15 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              className="inline-block"
            >
              <span className="text-xs font-bold tracking-[0.2em] text-[#A78BFA] uppercase">
                Our Work
              </span>
            </motion.div>

            <motion.h2
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5 }}
              className="text-[1.5rem] sm:text-[1.75rem] md:text-[2rem] lg:text-[2.25rem] xl:text-[2.5rem] font-heading font-bold text-white leading-tight sm:leading-[1.2] tracking-tight"
            >
              Results that <br className="hidden sm:block" />
              <span className="bg-gradient-to-r from-[#7C61FF] via-[#8B5CF6] to-[#A78BFA] bg-clip-text text-transparent">
                speak for themselves.
              </span>
            </motion.h2>

            <motion.p
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: 0.1 }}
              className="text-[0.8125rem] sm:text-[0.875rem] md:text-[0.9375rem] font-normal text-gray-400 max-w-sm mx-auto lg:mx-0 leading-relaxed"
            >
              Conversion-focused systems, measured by revenue and growth.
            </motion.p>
          </div>

          {/* GRID */}
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 sm:gap-6">

            {displayData.map((project: any, idx: number) => {
              const sanityImage = urlForImage(project.thumbnail || project.image);
              const displayName = project.clientName || project.client || project.title || "Project";
              const fallbackImage = localProjectImages[displayName] || "/images/portfolio/apex-financial.webp";
              const imageSrc = sanityImage ? sanityImage.url() : fallbackImage;
              
              // Use slug if available, otherwise fallback to /portfolio
              const projectSlug = project.slug;
              const href = projectSlug ? `/case-study/${projectSlug}` : "/portfolio";

              // No delay on mobile
              const delay = isMobile ? 0 : idx * 0.1;

              return (
                <TiltCard key={idx} className="h-full">
                  <Link
                    href={href}
                    className="group block h-full"
                  >
                    <motion.div
                      initial={{ opacity: 0, y: 40 }}
                      whileInView={{ opacity: 1, y: 0 }}
                      viewport={{ once: true, margin: "-40px" }}
                      transition={{ duration: 0.5, delay }}
                      className="relative rounded-xl sm:rounded-2xl overflow-hidden bg-[#12111E]/90 border border-white/10 hover:border-[#7C61FF]/50 transition-all duration-300 h-full flex flex-col justify-between touch-manipulation hover:shadow-xl hover:shadow-[#7C61FF]/10"
                    >

                      {/* IMAGE */}
                      <div className="relative h-[200px] sm:h-[240px] w-full overflow-hidden bg-[#0A0912]">
                          <Image
                            src={imageSrc}
                            alt={`${displayName} - ${project.niche || "Digital Growth"} Case Study by Zelvoxx`}
                            fill
                            sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 600px"
                            loading="lazy"
                            className="object-cover group-hover:scale-105 transition duration-700"
                          />
                        <div className="absolute inset-0 bg-gradient-to-t from-[#12111E] via-transparent to-transparent" />
                      </div>

                      {/* CONTENT */}
                      <div className="p-6 space-y-4 flex-1 flex flex-col justify-between">

                        <div>
                          {/* TAG */}
                          {project.niche && (
                            <span className="inline-block text-xs px-3 py-1 bg-white/10 rounded-full text-[#A78BFA] font-medium mb-3">
                              {project.niche}
                            </span>
                          )}

                          {/* TITLE */}
                          <h3 className="text-xl font-bold text-white group-hover:text-[#A78BFA] transition-colors">
                            {displayName}
                          </h3>

                          {/* EXCERPT */}
                          {project.excerpt && (
                            <p className="text-white/60 text-sm line-clamp-2 mt-2">{project.excerpt}</p>
                          )}
                        </div>

                        <div>
                          {/* RESULT */}
                          {project.result && (
                            <div className="flex items-center gap-2 text-white/90 mb-3">
                              <TrendingUp className="w-4 h-4 text-[#34D399]" />
                              <span className="text-sm font-semibold text-[#34D399]">{project.result}</span>
                            </div>
                          )}

                          {/* CTA */}
                          <div className="flex items-center gap-2 text-sm font-semibold text-[#A78BFA] group-hover:text-white transition-colors">
                            View Case Study
                            <ArrowUpRight className="w-4 h-4 group-hover:translate-x-1 group-hover:-translate-y-1 transition-transform" />
                          </div>
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
                className="col-span-1 sm:col-span-2 flex justify-center mt-4 sm:mt-6"
              >
                <Link
                  href="/portfolio"
                  className="group inline-flex items-center gap-2 px-6 py-3 rounded-full bg-white/5 border border-white/10 hover:border-[#7C61FF]/40 hover:bg-[#7C61FF]/10 transition-all duration-300"
                >
                  <span className="text-white font-semibold text-sm sm:text-base">View All Projects</span>
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