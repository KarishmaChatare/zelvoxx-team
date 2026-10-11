"use client";

import { useState, useMemo } from "react";
import Link from "next/link";
import Image from "next/image";
import { motion, useReducedMotion } from "framer-motion";
import { ArrowUpRight, ArrowLeft, FolderGit2, Sparkles } from "lucide-react";
import { projects, type Project } from "@/src/data/projects";
import TiltCard from "@/src/components/ui/TiltCard";
import DynamicBackground from "@/src/components/ui/DynamicBackground";

export default function OurWorkClient() {
  const [selectedIndustry, setSelectedIndustry] = useState<string>("All");
  const prefersReducedMotion = useReducedMotion();

  // Extract unique industries dynamically strictly from real data
  const industries = useMemo(() => {
    const unique = Array.from(new Set(projects.map((p) => p.industry)));
    return ["All", ...unique];
  }, []);

  // Filter projects by industry
  const filteredProjects = useMemo(() => {
    if (selectedIndustry === "All") return projects;
    return projects.filter((p) => p.industry === selectedIndustry);
  }, [selectedIndustry]);

  // Mixed bento grid column spans for editorial desktop rhythm
  const getColSpanClass = (index: number, total: number) => {
    if (total === 1) return "lg:col-span-12";
    const pattern = index % 4;
    switch (pattern) {
      case 0:
        return "lg:col-span-7";
      case 1:
        return "lg:col-span-5";
      case 2:
        return "lg:col-span-5";
      case 3:
        return "lg:col-span-7";
      default:
        return "lg:col-span-6";
    }
  };

  return (
    <main className="min-h-screen bg-[#07060D] text-white selection:bg-[#7C61FF]/30 relative">
      <DynamicBackground variant="purple" intensity="high" />

      <div className="relative z-10 pt-28 sm:pt-36 pb-24 sm:pb-36">
        <div className="max-w-7xl mx-auto px-4 sm:px-6">
          {/* Header section */}
          <div className="mb-12 sm:mb-16">
            <motion.div
              initial={{ opacity: 0, x: -15 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.4 }}
              className="mb-8"
            >
              <Link
                href="/"
                className="inline-flex items-center gap-2 text-sm text-white/50 hover:text-[#A78BFA] transition-colors group"
              >
                <ArrowLeft className="w-4 h-4 group-hover:-translate-x-1 transition-transform" />
                Back to Home
              </Link>
            </motion.div>

            <div className="flex flex-col lg:flex-row lg:items-end justify-between gap-6">
              <div className="space-y-3 max-w-2xl">
                <motion.div
                  initial={{ opacity: 0, y: 15 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.5 }}
                  className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-[#7C61FF]/10 border border-[#7C61FF]/30 text-xs font-semibold uppercase tracking-wider text-[#A78BFA]"
                >
                  <Sparkles className="w-3.5 h-3.5" />
                  <span>Selected Client Work</span>
                </motion.div>

                <motion.h1
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.5, delay: 0.1 }}
                  className="text-4xl sm:text-5xl md:text-6xl font-heading font-black text-white tracking-tight leading-[1.1]"
                >
                  Architectures built for{" "}
                  <span className="bg-gradient-to-r from-[#7C61FF] via-[#8B5CF6] to-[#A78BFA] bg-clip-text text-transparent">
                    measurable scale.
                  </span>
                </motion.h1>
              </div>

              <motion.p
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: 0.2 }}
                className="text-sm sm:text-base text-gray-400 max-w-md leading-relaxed"
              >
                A curated showcase of live digital flagships, e-commerce stores, and high-conversion interfaces engineered by Zelvoxx.
              </motion.p>
            </div>

            {/* Dynamic Industry Filter Pills */}
            {industries.length > 2 && (
              <motion.div
                initial={{ opacity: 0, y: 15 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: 0.3 }}
                className="flex flex-wrap items-center gap-2 sm:gap-3 mt-10 pt-8 border-t border-white/5"
              >
                {industries.map((industry) => {
                  const isActive = selectedIndustry === industry;
                  return (
                    <button
                      key={industry}
                      onClick={() => setSelectedIndustry(industry)}
                      className={`px-4 py-2 rounded-full text-xs sm:text-sm font-medium transition-all duration-300 ${
                        isActive
                          ? "bg-[#7C61FF] text-white shadow-lg shadow-[#7C61FF]/30 border border-[#7C61FF]"
                          : "bg-white/[0.04] text-white/70 border border-white/10 hover:border-[#7C61FF]/40 hover:text-white hover:bg-white/[0.08]"
                      }`}
                    >
                      {industry}
                    </button>
                  );
                })}
              </motion.div>
            )}
          </div>

          {/* Mixed Editorial Bento Grid */}
          {filteredProjects.length > 0 ? (
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-12 gap-6 lg:gap-8">
              {filteredProjects.map((project, idx) => {
                const initialLetter = project.name.charAt(0);
                const colSpanClass = getColSpanClass(idx, filteredProjects.length);
                const href = `/our-work/${project.slug}`;

                return (
                  <motion.div
                    key={project.slug}
                    initial={
                      prefersReducedMotion
                        ? { opacity: 0 }
                        : { opacity: 0, y: 35, clipPath: "inset(10% 0% 0% 0% round 24px)" }
                    }
                    whileInView={
                      prefersReducedMotion
                        ? { opacity: 1 }
                        : { opacity: 1, y: 0, clipPath: "inset(0% 0% 0% 0% round 24px)" }
                    }
                    viewport={{ once: true, margin: "-40px" }}
                    transition={{
                      duration: 0.7,
                      delay: idx * 0.1,
                      ease: [0.22, 1, 0.36, 1],
                    }}
                    className={`${colSpanClass} flex flex-col`}
                  >
                    <TiltCard maxTilt={6} className="h-full">
                      <Link
                        href={href}
                        data-cursor="VIEW"
                        className="group relative block h-full w-full rounded-2xl sm:rounded-3xl p-5 sm:p-7 bg-gradient-to-b from-[#131221]/90 via-[#0F0E1B]/95 to-[#0A0912] border border-white/10 hover:border-[#7C61FF]/50 transition-all duration-500 overflow-hidden shadow-2xl flex flex-col justify-between"
                      >
                        {/* Top ambient hover accent border glow */}
                        <div className="absolute top-0 inset-x-0 h-[2px] bg-gradient-to-r from-transparent via-[#7C61FF] to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500" />

                        {/* Signature touch: Oversized letter behind screenshot */}
                        <span
                          aria-hidden="true"
                          className="absolute -top-10 -left-6 sm:-top-12 sm:-left-8 select-none pointer-events-none z-0 font-heading font-black text-[12rem] sm:text-[16rem] lg:text-[20rem] leading-none text-white/[0.04] group-hover:text-[#A78BFA]/[0.08] transition-all duration-700 ease-out transform group-hover:translate-x-2 group-hover:-translate-y-2"
                        >
                          {initialLetter}
                        </span>

                        {/* Top: Screenshot frame */}
                        <div className="relative z-10 w-full h-56 sm:h-64 lg:h-72 rounded-xl sm:rounded-2xl overflow-hidden bg-[#0A0912] border border-white/5 shadow-inner mb-6">
                          <Image
                            src={project.image}
                            alt={project.name}
                            fill
                            priority={idx < 4}
                            placeholder="blur"
                            blurDataURL="data:image/svg+xml;base64,PHN2ZyB4bWxucz0iaHR0cDovL3d3dy53My5vcmcvMjAwMC9zdmciIHZpZXdCb3g9IjAgMCA4IDUiPjxyZWN0IHdpZHRoPSI4IiBoZWlnaHQ9IjUiIGZpbGw9IiMwQTA5MTIiLz48L3N2Zz4="
                            sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 650px"
                            className="object-cover object-top transition-transform duration-700 ease-out group-hover:scale-105"
                          />
                          {/* Subtle dark gradient overlay */}
                          <div className="absolute inset-x-0 bottom-0 h-24 bg-gradient-to-t from-[#0A0912]/90 via-[#0A0912]/30 to-transparent pointer-events-none" />
                        </div>

                        {/* Middle: Project Metadata */}
                        <div className="relative z-10 flex-1 flex flex-col justify-between space-y-4">
                          <div>
                            {/* Industry Pill & Index */}
                            <div className="flex items-center justify-between gap-3 mb-3">
                              <span className="inline-block text-xs px-3 py-1 bg-white/10 rounded-full text-[#A78BFA] font-medium border border-white/5">
                                {project.industry}
                              </span>
                              <span className="text-xs font-mono font-medium text-white/30">
                                0{idx + 1}
                              </span>
                            </div>

                            {/* Project Name */}
                            <h3 className="text-xl sm:text-2xl font-bold font-heading text-white group-hover:text-[#A78BFA] transition-colors mb-2">
                              {project.name}
                            </h3>

                            {/* One-line Summary */}
                            <p className="text-white/60 text-sm leading-relaxed mb-4">
                              {project.summary}
                            </p>
                          </div>

                          {/* Services Pills */}
                          {project.services && project.services.length > 0 && (
                            <div className="flex flex-wrap gap-1.5 pt-2">
                              {project.services.map((svc) => (
                                <span
                                  key={svc}
                                  className="text-[11px] px-2.5 py-1 rounded-md bg-white/[0.04] text-white/60 border border-white/5"
                                >
                                  {svc}
                                </span>
                              ))}
                            </div>
                          )}

                          {/* Bottom Action Line */}
                          <div className="pt-4 border-t border-white/10 flex items-center justify-between text-sm font-semibold text-[#A78BFA] group-hover:text-white transition-colors">
                            <span>View Case Details</span>
                            <div className="w-8 h-8 rounded-full bg-white/5 border border-white/10 group-hover:border-[#7C61FF]/60 group-hover:bg-[#7C61FF]/20 flex items-center justify-center transition-all duration-300">
                              <ArrowUpRight className="w-4 h-4 text-[#A78BFA] group-hover:text-white group-hover:translate-x-0.5 group-hover:-translate-y-0.5 transition-transform" />
                            </div>
                          </div>
                        </div>
                      </Link>
                    </TiltCard>
                  </motion.div>
                );
              })}
            </div>
          ) : (
            /* Clean Empty State */
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6 }}
              className="relative rounded-2xl sm:rounded-3xl overflow-hidden border border-white/10 bg-gradient-to-b from-[#141322]/90 via-[#0e0d1a]/90 to-[#0A0912]/95 backdrop-blur-xl p-8 sm:p-14 text-center flex flex-col items-center justify-center min-h-[380px] shadow-2xl"
            >
              <div className="w-16 h-16 rounded-2xl bg-white/[0.04] border border-white/10 flex items-center justify-center text-[#A78BFA] mb-6 shadow-inner relative z-10">
                <FolderGit2 className="w-7 h-7 text-[#A78BFA]" />
              </div>

              <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-[#7C61FF]/10 border border-[#7C61FF]/30 text-xs font-semibold uppercase tracking-wider text-[#A78BFA] mb-4 relative z-10">
                <Sparkles className="w-3.5 h-3.5" />
                <span>Projects Curation</span>
              </div>

              <h3 className="text-2xl sm:text-3xl font-heading font-bold text-white mb-3 relative z-10">
                Projects coming soon.
              </h3>

              <p className="text-sm sm:text-base text-gray-400 max-w-lg mx-auto leading-relaxed mb-8 relative z-10">
                No projects matched your selected filter. Clear filters or check back shortly.
              </p>

              <button
                onClick={() => setSelectedIndustry("All")}
                className="inline-flex items-center gap-2 px-6 py-3 rounded-full bg-white/5 border border-white/15 hover:border-[#7C61FF]/50 hover:bg-[#7C61FF]/15 text-white text-sm font-semibold transition-all duration-300 relative z-10"
              >
                Reset Filter
              </button>
            </motion.div>
          )}
        </div>
      </div>
    </main>
  );
}
