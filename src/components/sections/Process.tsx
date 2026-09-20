"use client";

import { motion } from "framer-motion";
import Image from "next/image";
import { useState, useEffect } from "react";
import TiltCard from "@/src/components/ui/TiltCard";

const processes = [
  {
    num: "01",
    title: "Discovery & Audit",
    desc: "We analyze metrics, pinpointing exactly where your business bleeds revenue.",
    image: "/images/process/step-01-audit.svg",
  },
  {
    num: "02",
    title: "System Strategy",
    desc: "We architect a bespoke blueprint for your growth system, detailing UX and funnels.",
    image: "/images/process/step-02-strategy.svg",
  },
  {
    num: "03",
    title: "Build & Integration",
    desc: "Our engineers construct your platform with precision, integrating tracking & tools.",
    image: "/images/process/step-03-build.svg",
  },
  {
    num: "04",
    title: "Launch & Dominate",
    desc: "Your new growth engine goes live. We monitor data to aggressively optimize.",
    image: "/images/process/step-04-launch.svg",
  }
];

export default function Process() {
  // Mobile detection for faster animations
  const [isMobile, setIsMobile] = useState(false);
  useEffect(() => {
    const checkMobile = () => setIsMobile(window.innerWidth < 768);
    checkMobile();
    window.addEventListener('resize', checkMobile, { passive: true });
    return () => window.removeEventListener('resize', checkMobile);
  }, []);

  return (
    <section id="process" className="relative overflow-hidden border-t border-white/5 scroll-mt-20">
      <div className="absolute inset-0 pointer-events-none bg-[linear-gradient(180deg,rgba(124,97,255,0.05),transparent_30%,transparent_70%,rgba(139,92,246,0.05))]" />
      <div className="max-w-7xl mx-auto px-6 relative z-10">
        <div className="text-center mb-12 sm:mb-16 space-y-3 sm:space-y-4">
          <motion.div
            initial={{ opacity: 0, y: 15 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="inline-block"
          >
            <span className="text-xs font-bold tracking-[0.2em] text-[#A78BFA] uppercase">The Process</span>
          </motion.div>
          
          <motion.h2
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5 }}
            className="text-[1.5rem] sm:text-[1.75rem] md:text-[2rem] lg:text-[2.25rem] xl:text-[2.5rem] font-heading font-bold text-white leading-tight sm:leading-[1.2] tracking-tight"
          >
            How We <span className="text-transparent bg-clip-text bg-gradient-to-r from-[#7C61FF] via-[#8B5CF6] to-[#A78BFA]">Execute.</span>
          </motion.h2>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 lg:gap-8 relative">
          {/* Connector line on desktop */}
          <div className="hidden lg:block absolute top-12 left-[10%] right-[10%] h-[2px] bg-white/5 z-0" />
          
          {processes.map((step, idx) => (
            <TiltCard key={idx} className="h-full">
              <motion.div
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: "-50px" }}
                transition={{ duration: isMobile ? 0.3 : 0.5, delay: 0 }}
                className="relative z-10 flex flex-col justify-between h-full p-6 rounded-2xl bg-[#12111E]/80 border border-white/10 hover:border-[#7C61FF]/40 transition-all duration-500 group"
              >
                <div>
                  <div className="flex items-center justify-between mb-4">
                    <div className="text-5xl md:text-6xl font-black font-heading text-transparent bg-clip-text bg-gradient-to-b from-white/20 to-white/5 group-hover:from-[#7C61FF] group-hover:to-[#A78BFA] transition-all duration-700">
                      {step.num}
                    </div>
                  </div>

                  {/* Process Step Visual Illustration */}
                  <div className="w-full h-28 mb-5 rounded-xl overflow-hidden border border-white/5 bg-[#09080E] shadow-inner group-hover:border-[#7C61FF]/30 transition-all duration-500">
                    <Image
                      src={step.image}
                      alt={`Phase ${step.num}: ${step.title} - Zelvoxx Engineering Lifecycle`}
                      width={280}
                      height={160}
                      loading="lazy"
                      sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 280px"
                      className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                    />
                  </div>

                  <div className="border-l-2 border-[#7C61FF]/30 pl-4 group-hover:border-[#A78BFA] transition-colors duration-500">
                    <h3 className="text-xl font-heading font-bold text-white mb-2 group-hover:text-[#A78BFA] transition-colors duration-500">{step.title}</h3>
                    <p className="text-white/50 font-body text-xs sm:text-sm leading-relaxed">{step.desc}</p>
                  </div>
                </div>
              </motion.div>
            </TiltCard>
          ))}
        </div>
      </div>
    </section>
  );
}
