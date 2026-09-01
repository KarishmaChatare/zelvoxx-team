"use client";

import { motion } from "framer-motion";
import { XCircle } from "lucide-react";

const painPoints = [
  "Websites that look good but don't convert.",
  "Ads that burn money with no real results.",
  "No clear funnel or customer journey.",
  "No strategy. Just random actions.",
];

export default function Problem() {
  return (
    <section id="problem" className="relative overflow-hidden border-t border-white/5 bg-[#0d0d12] py-16 sm:py-24 lg:py-32">
      {/* Background Ambient Glows */}
      <div className="absolute inset-0 pointer-events-none overflow-hidden">
        <div className="absolute -top-24 left-0 w-[300px] sm:w-[500px] h-[300px] sm:h-[500px] bg-primary/10 blur-[140px] rounded-full" />
        <div className="absolute bottom-0 right-0 w-[300px] sm:w-[450px] h-[300px] sm:h-[450px] bg-accent/10 blur-[140px] rounded-full" />
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        <div className="grid grid-cols-1 lg:grid-cols-[1fr_1.5fr] gap-10 sm:gap-14 lg:gap-20 items-start">
          
          {/* Left Column: Heading (ONLY sticky on desktop `lg:`, static on mobile/tablet) */}
          <div className="relative lg:sticky lg:top-32 space-y-4 sm:space-y-6 text-center lg:text-left">
            <motion.div
              initial={{ opacity: 0, y: 15 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              className="inline-block"
            >
              <span className="text-xs font-bold tracking-[0.2em] text-primary uppercase">
                The Problem
              </span>
            </motion.div>
            
            <motion.h2
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5 }}
              className="text-2.5xl sm:text-4xl md:text-5xl font-heading font-black text-white leading-[1.2] tracking-tight"
            >
              Most businesses don't have a growth problem.{" "}
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-primary via-[#8b5cf6] to-accent block sm:inline">
                They have a system problem.
              </span>
            </motion.h2>
          </div>

          {/* Right Column: 2x2 Grid with clean mobile spacing */}
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 sm:gap-6 w-full">
            {painPoints.map((point, idx) => (
              <motion.div
                key={idx}
                initial={{ opacity: 0, y: 25 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: "-30px" }}
                transition={{ duration: 0.4, delay: idx * 0.08 }}
                className="p-6 sm:p-8 rounded-2xl border border-white/10 bg-white/[0.03] backdrop-blur-sm hover:border-primary/40 transition-all duration-300 hover:-translate-y-1 hover:shadow-xl hover:shadow-primary/5 flex flex-col justify-start"
              >
                <div className="w-12 h-12 rounded-xl bg-white/5 border border-white/10 flex items-center justify-center mb-5">
                  <XCircle className="w-6 h-6 text-red-400" />
                </div>
                <p className="text-sm sm:text-base md:text-lg text-white/90 font-medium leading-relaxed">
                  {point}
                </p>
              </motion.div>
            ))}
          </div>

        </div>
      </div>
    </section>
  );
}