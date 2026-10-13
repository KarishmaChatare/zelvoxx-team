"use client";

import { motion } from "framer-motion";
import { ArrowRight, FolderGit2, Sparkles, ArrowUpRight } from "lucide-react";
import Link from "next/link";
import { projects, type Project } from "@/src/data/projects";
import CurvedGallery from "./CurvedGallery";

interface PortfolioContentProps {
  data?: Project[];
}

export default function PortfolioContent({ data }: PortfolioContentProps) {
  // Use data if provided, otherwise default to src/data/projects.ts
  const sourceData: Project[] = data && data.length > 0 ? data : projects;

  return (
    <section
      id="portfolio"
      className="pt-10 sm:pt-14 md:pt-16 pb-12 sm:pb-20 relative overflow-hidden border-t border-white/5 scroll-mt-20"
    >
      {/* Centered Stacked Section Header: Subtext directly BELOW the Heading */}
      <div className="max-w-4xl mx-auto px-4 sm:px-6 mb-4 sm:mb-6 md:mb-8 text-center">
        <motion.div
          initial={{ opacity: 0, y: 15 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="inline-block mb-3 sm:mb-4"
        >
          <span className="text-xs font-bold tracking-[0.2em] text-[#A78BFA] uppercase px-3.5 py-1.5 rounded-full bg-[#7C61FF]/10 border border-[#7C61FF]/25 shadow-sm">
            Our Work
          </span>
        </motion.div>

        <motion.h2
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5 }}
          className="text-3xl sm:text-5xl md:text-6xl font-heading font-black text-white tracking-tight leading-[1.1] mb-4 sm:mb-5"
        >
          Results that{" "}
          <span className="bg-gradient-to-r from-[#7C61FF] via-[#8B5CF6] to-[#A78BFA] bg-clip-text text-transparent">
            speak for themselves.
          </span>
        </motion.h2>

        {/* Subtext placed directly BELOW the heading */}
        <motion.p
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5, delay: 0.1 }}
          className="text-base sm:text-lg md:text-xl text-gray-400 max-w-2xl mx-auto leading-relaxed"
        >
          Conversion-focused systems, measured by revenue and growth.
        </motion.p>
      </div>

      {/* Large Curved 3D Gallery or Clean Empty State */}
      {sourceData.length > 0 ? (
        <div className="relative w-full">
          {/* Curved Gallery Arc */}
          <CurvedGallery projects={sourceData} />

          {/* View More Button below gallery */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5, delay: 0.2 }}
            className="flex justify-center mt-10 sm:mt-14"
          >
            <Link
              href="/our-work"
              className="group inline-flex items-center gap-2.5 px-8 py-4 rounded-full bg-white/[0.04] border border-white/10 hover:border-[#7C61FF]/60 hover:bg-[#7C61FF]/15 text-white font-semibold text-sm sm:text-base transition-all duration-300 shadow-xl hover:shadow-[#7C61FF]/25 hover:scale-[1.02]"
            >
              <span>View More</span>
              <ArrowRight className="w-4 h-4 text-[#A78BFA] group-hover:translate-x-1 transition-transform" />
            </Link>
          </motion.div>
        </div>
      ) : (
        /* Clean Empty State */
        <div className="max-w-7xl mx-auto px-4 sm:px-6">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
            className="relative rounded-2xl sm:rounded-3xl overflow-hidden border border-white/10 bg-gradient-to-b from-[#0D0C18]/90 via-[#08071A]/90 to-[#060610]/95 backdrop-blur-xl p-8 sm:p-14 text-center flex flex-col items-center justify-center min-h-[380px] shadow-2xl"
          >
            <div className="w-16 h-16 rounded-2xl bg-white/[0.04] border border-white/10 flex items-center justify-center text-[#A78BFA] mb-6 shadow-inner relative z-10">
              <FolderGit2 className="w-7 h-7 text-[#A78BFA]" />
            </div>

            <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-[#7C61FF]/10 border border-[#7C61FF]/30 text-xs font-semibold uppercase tracking-wider text-[#A78BFA] mb-4 relative z-10 shadow-sm">
              <Sparkles className="w-3.5 h-3.5" />
              <span>Projects Curation</span>
            </div>

            <h3 className="text-2xl sm:text-3xl font-heading font-bold text-white mb-3 relative z-10">
              Projects coming soon.
            </h3>

            <p className="text-sm sm:text-base text-gray-400 max-w-lg mx-auto leading-relaxed mb-8 relative z-10">
              We are currently curating and documenting our client flagships and conversion architectures.
            </p>

            <Link
              href="/contact"
              className="inline-flex items-center gap-2 px-6 py-3 rounded-full bg-white/5 border border-white/15 hover:border-[#7C61FF]/50 hover:bg-[#7C61FF]/15 text-white text-sm font-semibold transition-all duration-300 relative z-10 group"
            >
              <span>Inquire About Recent Work</span>
              <ArrowUpRight className="w-4 h-4 text-[#A78BFA] group-hover:translate-x-0.5 group-hover:-translate-y-0.5 transition-transform" />
            </Link>
          </motion.div>
        </div>
      )}
    </section>
  );
}