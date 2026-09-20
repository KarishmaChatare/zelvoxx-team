"use client";

import { motion } from "framer-motion";
import { XCircle } from "lucide-react";
import Image from "next/image";
import TiltCard from "@/src/components/ui/TiltCard";

const painPoints = [
  "Websites that look good but don't convert.",
  "Ads that burn money with no real results.",
  "No clear funnel or customer journey.",
  "No strategy. Just random actions.",
];

export default function Problem() {
  return (
    <section id="problem" className="relative z-10 bg-transparent overflow-hidden border-t border-white/5 py-16 sm:py-24 lg:py-32 scroll-mt-20">
      {/* Background Ambient Glows */}
      <div className="absolute inset-0 pointer-events-none overflow-hidden">
        <div className="absolute -top-24 left-0 w-[300px] sm:w-[500px] h-[300px] sm:h-[500px] bg-[#7C61FF]/10 blur-[140px] rounded-full" />
        <div className="absolute bottom-0 right-0 w-[300px] sm:w-[450px] h-[300px] sm:h-[450px] bg-[#8B5CF6]/10 blur-[140px] rounded-full" />
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        <div className="grid grid-cols-1 lg:grid-cols-[1.1fr_1.3fr] gap-8 sm:gap-12 lg:gap-14 items-center">
          
          {/* Left Column: Heading + Visual Diagram */}
          <div className="space-y-3 sm:space-y-4 text-center lg:text-left">
            <motion.div
              initial={{ opacity: 0, y: 15 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              className="inline-block"
            >
              <span className="text-xs font-bold tracking-[0.2em] text-[#A78BFA] uppercase">
                The Problem
              </span>
            </motion.div>
            
            <motion.h2
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5 }}
              className="text-[1.5rem] sm:text-[1.75rem] md:text-[2rem] lg:text-[2.25rem] xl:text-[2.5rem] font-heading font-bold text-white leading-tight sm:leading-[1.2] tracking-tight"
            >
              Most businesses don't have a growth problem.{" "}
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-[#7C61FF] via-[#8B5CF6] to-[#A78BFA] block sm:inline">
                They have a system problem.
              </span>
            </motion.h2>

            {/* Problem Section Visual Illustration Diagram */}
            <motion.div
              initial={{ opacity: 0, scale: 0.95 }}
              whileInView={{ opacity: 1, scale: 1 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6, delay: 0.15 }}
              className="mt-4 sm:mt-5 rounded-2xl overflow-hidden border border-[#7C61FF]/25 shadow-[0_12px_40px_rgba(0,0,0,0.6)] group hover:border-[#A78BFA]/40 transition-all duration-500"
            >
              <Image
                src="/images/problem/system-leak-diagram.svg"
                alt="System Leak & Bottleneck Architecture Diagram"
                width={600}
                height={400}
                loading="lazy"
                sizes="(max-width: 1024px) 100vw, 600px"
                className="w-full h-auto object-cover group-hover:scale-[1.02] transition-transform duration-500"
              />
            </motion.div>
          </div>

          {/* Right Column: 2x2 Grid with 3D Tilt Cards */}
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 sm:gap-6 w-full">
            {painPoints.map((point, idx) => (
              <TiltCard key={idx} className="h-full">
                <motion.div
                  initial={{ opacity: 0, y: 25 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true, margin: "-30px" }}
                  transition={{ duration: 0.4, delay: idx * 0.08 }}
                  className="p-6 sm:p-7 rounded-2xl border border-white/10 bg-[#0E0D17]/80 backdrop-blur-sm hover:border-[#7C61FF]/50 transition-all duration-300 hover:shadow-xl hover:shadow-[#7C61FF]/10 flex flex-col justify-start h-full"
                >
                  <div className="w-11 h-11 rounded-xl bg-red-500/10 border border-red-500/20 flex items-center justify-center mb-4">
                    <XCircle className="w-5 h-5 text-red-400" />
                  </div>
                  <p className="text-[0.8125rem] sm:text-[0.875rem] md:text-[0.9375rem] text-gray-400 font-normal leading-relaxed">
                    {point}
                  </p>
                </motion.div>
              </TiltCard>
            ))}
          </div>

        </div>
      </div>
    </section>
  );
}