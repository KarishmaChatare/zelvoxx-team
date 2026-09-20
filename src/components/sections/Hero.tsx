"use client";

import { motion, useReducedMotion } from "framer-motion";
import { useState, useEffect } from "react";
import Image from "next/image";
import HeroIsometricCards from "@/src/components/ui/HeroIsometricCards";

const logos = ["LUMEN", "PULSE", "HEXABIT", "AVORA", "NEXORA", "VERTEX"];

// Floating particles configuration
const particles = [
  { size: 4, x: "15%", y: "20%", delay: 0, duration: 20 },
  { size: 3, x: "85%", y: "15%", delay: 2, duration: 25 },
  { size: 5, x: "70%", y: "60%", delay: 4, duration: 22 },
  { size: 2, x: "25%", y: "70%", delay: 1, duration: 28 },
  { size: 4, x: "90%", y: "80%", delay: 3, duration: 24 },
  { size: 3, x: "40%", y: "35%", delay: 5, duration: 26 },
  { size: 2, x: "60%", y: "85%", delay: 2.5, duration: 30 },
  { size: 4, x: "10%", y: "50%", delay: 1.5, duration: 23 },
];

interface HeroData {
  title?: string;
  subtitle?: string;
  ctaText?: string;
  ctaLink?: string;
}

interface StatItem {
  label?: string;
  value?: string;
}

interface HeroProps {
  data?: HeroData | null;
  stats?: StatItem[];
}

// Default stats fallback
const defaultStats = [
  { value: "250+", label: "Projects Delivered" },
  { value: "150+", label: "Happy Clients" },
  { value: "8X", label: "Average ROI Generated" },
  { value: "24/7", label: "Growth Support" },
];

export default function Hero({ data, stats }: HeroProps) {
  const prefersReducedMotion = useReducedMotion();
  // Mobile detection for faster animations
  const [isMobile, setIsMobile] = useState(false);
  useEffect(() => {
    const checkMobile = () => setIsMobile(window.innerWidth < 768);
    checkMobile();
    window.addEventListener('resize', checkMobile, { passive: true });
    return () => window.removeEventListener('resize', checkMobile);
  }, []);

  // Animation config based on device - no delay on mobile
  const baseDelay = isMobile ? 0 : 0.2;
  const animDuration = isMobile ? 0.4 : 0.7;

  return (
    <section className="relative z-10 bg-background min-h-screen flex flex-col justify-center overflow-hidden pt-20 sm:pt-22 lg:pt-24 pb-4 sm:pb-6">
      <div 
        className="absolute inset-0 z-0 pointer-events-none"
        style={{
          transform: "translateZ(0)",
          backfaceVisibility: "hidden",
          contain: "paint",
        }}
      >
        {/* Background Image with enhanced overlay - direct static fetch, hardware cached in GPU VRAM */}
        <Image
          src="/images/hero-bg.webp"
          alt="Zelvoxx Cinematic Workspace"
          fill
          priority
          unoptimized
          sizes="100vw"
          className="object-cover object-[center_right] sm:object-center opacity-45 sm:opacity-50 select-none"
          style={{
            transform: "translateZ(0)",
            backfaceVisibility: "hidden",
            willChange: "transform",
          }}
        />
        <div className="absolute inset-0 bg-gradient-to-r from-background via-background/85 to-transparent" />
        <div className="absolute inset-0 bg-gradient-to-b from-background/70 via-transparent to-background" />

        {/* Animated gradient orbs - GPU-composited, hardware accelerated */}
        <motion.div
          style={{ willChange: "transform, opacity", transform: "translateZ(0)" }}
          animate={{ 
            scale: [1, 1.15, 1], 
            opacity: [0.35, 0.55, 0.35],
            x: [0, 30, 0],
          }}
          transition={{ duration: 12, repeat: Infinity, repeatType: "reverse", ease: "easeInOut" }}
          className="absolute top-0 right-0 w-[700px] h-[700px] bg-primary/20 blur-[120px] rounded-full"
        />
        <motion.div
          style={{ willChange: "transform, opacity", transform: "translateZ(0)" }}
          animate={{ 
            scale: [1, 1.2, 1], 
            opacity: [0.25, 0.45, 0.25],
            y: [0, -40, 0],
          }}
          transition={{ duration: 15, repeat: Infinity, repeatType: "reverse", ease: "easeInOut", delay: 2 }}
          className="absolute bottom-0 left-0 w-[600px] h-[600px] bg-accent/15 blur-[120px] rounded-full"
        />
        <motion.div
          style={{ willChange: "transform, opacity", transform: "translateZ(0)" }}
          animate={{ 
            scale: [1, 1.1, 1], 
            opacity: [0.15, 0.3, 0.15],
          }}
          transition={{ duration: 10, repeat: Infinity, repeatType: "reverse", ease: "easeInOut", delay: 4 }}
          className="absolute top-1/3 left-1/4 w-[450px] h-[450px] bg-primary/10 blur-[100px] rounded-full"
        />

        {/* Slow animated gradient beam */}
        <motion.div
          aria-hidden="true"
          style={{ willChange: "transform, opacity", transform: "translateZ(0)" }}
          animate={{ x: [-30, 30, -30], opacity: [0.05, 0.15, 0.05] }}
          transition={{ duration: 12, repeat: Infinity, ease: "easeInOut" }}
          className="absolute inset-y-0 left-1/2 w-[40vw] -translate-x-1/2 bg-gradient-to-r from-transparent via-primary/20 to-transparent blur-3xl"
        />

        {/* Floating particles layer - low opacity for depth */}
        <div className="absolute inset-0 overflow-hidden pointer-events-none" style={{ contain: "strict" }}>
          {particles.map((particle, idx) => (
            <motion.div
              key={idx}
              className="absolute rounded-full bg-white"
              style={{
                width: particle.size,
                height: particle.size,
                left: particle.x,
                top: particle.y,
                filter: "blur(1px)",
                willChange: "transform, opacity",
              }}
              animate={{
                y: [0, -30, 0, 20, 0],
                x: [0, 15, -10, 5, 0],
                opacity: [0.1, 0.25, 0.15, 0.3, 0.1],
                scale: [1, 1.2, 0.9, 1.1, 1],
              }}
              transition={{
                duration: particle.duration,
                delay: particle.delay,
                repeat: Infinity,
                ease: "easeInOut",
              }}
            />
          ))}
        </div>

        {/* Subtle animated gradient mesh (GPU opacity crossfade, zero JS string interpolation) */}
        <div
          className="absolute inset-0 pointer-events-none"
          style={{
            background: "radial-gradient(circle at 20% 30%, rgba(123, 97, 255, 0.08) 0%, transparent 50%)",
            transform: "translateZ(0)",
          }}
        />
        <motion.div
          animate={{ opacity: [0.3, 0.8, 0.3] }}
          transition={{ duration: 16, repeat: Infinity, ease: "easeInOut" }}
          style={{
            background: "radial-gradient(circle at 80% 70%, rgba(139, 92, 246, 0.08) 0%, transparent 50%)",
            willChange: "opacity",
            transform: "translateZ(0)",
          }}
          className="absolute inset-0 pointer-events-none"
        />
      </div>

      <div className="relative z-20 max-w-7xl mx-auto px-4 sm:px-6 w-full flex flex-col items-center">
        {/* 1. Main Hero Headline & Subtext Block */}
        <div className="flex flex-col items-center justify-center text-center w-full">
          <motion.h1
            initial={{ opacity: 0, y: 12 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: animDuration, delay: baseDelay }}
            className="text-xs sm:text-sm md:text-base lg:text-lg font-heading font-bold tracking-[0.25em] sm:tracking-[0.35em] uppercase whitespace-normal sm:whitespace-nowrap text-center"
          >
            <span className="text-white">Build. Scale. </span>
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-[#7C61FF] via-[#8B5CF6] to-[#A78BFA] drop-shadow-[0_0_15px_rgba(124,97,255,0.6)]">
              Dominate.
            </span>
          </motion.h1>

          <motion.p
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: animDuration, delay: baseDelay + 0.1 }}
            className="mt-2.5 sm:mt-3 max-w-[680px] text-xs sm:text-sm md:text-[15px] text-gray-400 font-normal leading-relaxed text-center px-4"
          >
            Stop chasing random tactics—build a growth system that turns visitors into customers and customers into revenue.
          </motion.p>
        </div>

        {/* 2. Central Hero Centerpiece (Floating Stat-Card Cluster) */}
        <div className="w-full my-3 sm:my-5 md:my-6 relative z-30 flex justify-center">
          <HeroIsometricCards stats={stats} />
        </div>

        {/* 3. Closing Strip: Trusted By Brands */}
        <div className="w-full border-t border-white/[0.06] pt-4 sm:pt-6 mt-2 sm:mt-3 flex flex-col items-center text-center">
          <p className="text-[10px] sm:text-[11px] font-bold tracking-[0.25em] text-white/60 uppercase mb-2 sm:mb-2.5">
            Trusted By Growing Brands Worldwide
          </p>
          <div className="flex flex-wrap justify-center gap-2 sm:gap-3 md:gap-3.5 items-center">
            {logos.map((logo, idx) => (
              <motion.div
                key={idx}
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.4, delay: isMobile ? 0.1 : 0.35 + idx * 0.05, ease: "easeOut" }}
                whileHover={{ y: -3, scale: 1.05 }}
                className="group relative flex items-center gap-2 px-3 py-1.5 sm:px-3.5 sm:py-2 min-h-[36px] rounded-full glass-premium border border-white/10 bg-[#0E0D17]/70 hover:bg-[#141322]/90 hover:border-[#7C61FF]/40 shadow-sm hover:shadow-[0_0_20px_rgba(124,97,255,0.35)] transition-all duration-300 cursor-pointer touch-manipulation"
              >
                <div className="w-1.5 h-1.5 rounded-full bg-white/30 group-hover:bg-[#7C61FF] group-hover:shadow-[0_0_8px_rgba(124,97,255,0.9)] group-hover:scale-125 transition-all duration-300 shrink-0" />
                <span className="font-heading font-bold text-[10px] sm:text-[11px] tracking-widest text-white/50 group-hover:text-white transition-colors duration-300">
                  {logo}
                </span>
              </motion.div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}