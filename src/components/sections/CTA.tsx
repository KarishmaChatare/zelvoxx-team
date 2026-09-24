"use client";

import Link from "next/link";
import { motion, useReducedMotion, useSpring, type Variants } from "framer-motion";
import { ArrowRight, PhoneCall, Sparkles } from "lucide-react";
import { useState, useEffect, useRef } from "react";
import { gtag } from "@/src/lib/analytics";

function MagneticButton({
  children,
  className = "",
  distance = 0.18,
  disabled = false,
}: {
  children: React.ReactNode;
  className?: string;
  distance?: number;
  disabled?: boolean;
}) {
  const ref = useRef<HTMLDivElement>(null);
  const x = useSpring(0, { stiffness: 260, damping: 20, mass: 0.5 });
  const y = useSpring(0, { stiffness: 260, damping: 20, mass: 0.5 });

  const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
    if (disabled || !ref.current) return;
    const { clientX, clientY } = e;
    const { left, top, width, height } = ref.current.getBoundingClientRect();
    const centerX = left + width / 2;
    const centerY = top + height / 2;
    const deltaX = (clientX - centerX) * distance;
    const deltaY = (clientY - centerY) * distance;
    x.set(deltaX);
    y.set(deltaY);
  };

  const handleMouseLeave = () => {
    x.set(0);
    y.set(0);
  };

  if (disabled) {
    return <div className={className}>{children}</div>;
  }

  return (
    <motion.div
      ref={ref}
      onMouseMove={handleMouseMove}
      onMouseLeave={handleMouseLeave}
      style={{ x, y }}
      className={className}
    >
      {children}
    </motion.div>
  );
}

export default function CTA() {
  const [isMobile, setIsMobile] = useState(false);
  const prefersReducedMotion = useReducedMotion();
  const cardRef = useRef<HTMLDivElement>(null);

  // Subtle mouse-parallax within this CTA card
  const bgX = useSpring(0, { stiffness: 120, damping: 24 });
  const bgY = useSpring(0, { stiffness: 120, damping: 24 });

  useEffect(() => {
    const checkMobile = () => setIsMobile(window.innerWidth < 768);
    checkMobile();
    window.addEventListener("resize", checkMobile, { passive: true });
    return () => window.removeEventListener("resize", checkMobile);
  }, []);

  const handleCardMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
    if (prefersReducedMotion || isMobile || !cardRef.current) return;
    const rect = cardRef.current.getBoundingClientRect();
    const normX = (e.clientX - rect.left) / rect.width - 0.5;
    const normY = (e.clientY - rect.top) / rect.height - 0.5;
    bgX.set(normX * 28);
    bgY.set(normY * 28);
  };

  const handleCardMouseLeave = () => {
    bgX.set(0);
    bgY.set(0);
  };

  // Staggered sequence variants for deliberate reveal
  const containerVariants: Variants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: prefersReducedMotion ? 0 : 0.14,
        delayChildren: 0.1,
      },
    },
  };

  const itemVariants: Variants = {
    hidden: prefersReducedMotion ? { opacity: 1, y: 0 } : { opacity: 0, y: 24 },
    visible: {
      opacity: 1,
      y: 0,
      transition: {
        duration: 0.6,
        ease: [0.22, 1, 0.36, 1] as const,
      },
    },
  };

  const phoneIconVariants: Variants = {
    initial: { rotate: 0, scale: 1 },
    hover: {
      rotate: [0, -15, 12, -8, 8, 0],
      scale: 1.15,
      transition: { duration: 0.5, ease: "easeInOut" },
    },
  };

  const arrowIconVariants: Variants = {
    initial: { x: 0 },
    hover: {
      x: 5,
      transition: { duration: 0.25, ease: "easeOut" },
    },
  };

  return (
    <section className="bg-transparent relative overflow-hidden py-16 sm:py-24 lg:py-28" id="cta">
      {/* Ambient background anchor */}
      <div className="absolute inset-0 z-0 bg-transparent pointer-events-none" />

      <div className="max-w-6xl mx-auto px-4 sm:px-6 relative z-10 text-center">
        <motion.div
          ref={cardRef}
          onMouseMove={handleCardMouseMove}
          onMouseLeave={handleCardMouseLeave}
          initial={{ opacity: 0, y: 50, scale: 0.95 }}
          whileInView={{ opacity: 1, y: 0, scale: 1 }}
          viewport={{ once: true }}
          transition={{ duration: isMobile ? 0.5 : 0.8, ease: "easeOut" }}
          className="p-6 sm:p-14 md:p-20 lg:p-24 rounded-[1.75rem] sm:rounded-[3rem] relative overflow-hidden shadow-2xl group border border-white/10 glass-premium"
        >
          {/* Card Dark Backdrop */}
          <div className="absolute inset-0 bg-[#0B0B0B]/60 backdrop-blur-md z-0 pointer-events-none" />

          {/* Mouse-Parallax Ambient Glow */}
          <motion.div
            style={prefersReducedMotion || isMobile ? {} : { x: bgX, y: bgY }}
            className="absolute inset-0 bg-[radial-gradient(ellipse_at_center,_var(--tw-gradient-stops))] from-primary/25 via-[#8B5CF6]/10 to-transparent opacity-90 pointer-events-none z-0"
          />

          {/* Staggered Content Sequence */}
          <motion.div
            variants={containerVariants}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
            className="relative z-10 flex flex-col items-center"
          >
            {/* 1. Animated Badge with idle sparkle pulse & border breathing glow */}
            <motion.div
              variants={itemVariants}
              animate={
                prefersReducedMotion
                  ? {}
                  : {
                      boxShadow: [
                        "0 0 10px rgba(124,97,255,0.06)",
                        "0 0 24px rgba(167,139,250,0.22)",
                        "0 0 10px rgba(124,97,255,0.06)",
                      ],
                      borderColor: [
                        "rgba(255,255,255,0.1)",
                        "rgba(167,139,250,0.35)",
                        "rgba(255,255,255,0.1)",
                      ],
                    }
              }
              transition={{ duration: 3.5, repeat: Infinity, ease: "easeInOut" }}
              className="inline-flex items-center gap-2 px-4 sm:px-6 py-2 rounded-full bg-white/5 border border-white/10 mb-6 sm:mb-8 backdrop-blur-sm text-xs sm:text-sm"
            >
              <motion.span
                animate={
                  prefersReducedMotion
                    ? {}
                    : { rotate: [0, 15, -15, 0], scale: [1, 1.15, 1] }
                }
                transition={{ duration: 4, repeat: Infinity, ease: "easeInOut" }}
                className="inline-flex items-center justify-center"
              >
                <Sparkles className="w-4 h-4 text-primary" />
              </motion.span>
              <span>Built for Growing Businesses</span>
            </motion.div>

            {/* 2. Headline with ambient shimmer sweep on accent words */}
            <motion.h2
              variants={itemVariants}
              className="text-[1.625rem] sm:text-[2.125rem] md:text-[2.5rem] lg:text-[3.5rem] xl:text-[3.875rem] font-heading font-black text-white uppercase tracking-tight sm:tracking-tighter mb-6 sm:mb-8 leading-[1.12] sm:leading-[1.08] drop-shadow-2xl"
            >
              Ready to stop wasting time and start{" "}
              <span className="relative inline-block">
                {/* Soft ambient glow aura behind accent words */}
                <motion.span
                  aria-hidden="true"
                  animate={
                    prefersReducedMotion
                      ? {}
                      : { opacity: [0.35, 0.7, 0.35], scale: [0.98, 1.02, 0.98] }
                  }
                  transition={{ duration: 4, repeat: Infinity, ease: "easeInOut" }}
                  className="absolute -inset-2 rounded-xl bg-gradient-to-r from-[#7C61FF]/25 via-[#8B5CF6]/25 to-[#A78BFA]/25 blur-xl pointer-events-none"
                />
                <motion.span
                  className="text-transparent bg-clip-text bg-gradient-to-r from-[#7C61FF] via-[#A78BFA] to-[#7C61FF] bg-[length:200%_auto] relative inline-block"
                  animate={
                    prefersReducedMotion
                      ? {}
                      : { backgroundPosition: ["0% center", "200% center"] }
                  }
                  transition={{ duration: 6, repeat: Infinity, ease: "linear" }}
                >
                  dominating your market?
                </motion.span>
              </span>
            </motion.h2>

            {/* 3. Subtext */}
            <motion.p
              variants={itemVariants}
              className="text-sm sm:text-lg md:text-xl lg:text-2xl text-white/70 font-body font-light mb-10 sm:mb-14 max-w-3xl mx-auto leading-relaxed"
            >
              Stop bleeding cash on broken marketing and weak templates. We build{" "}
              <strong className="text-white font-medium">lethal growth systems</strong> that crush
              your competition and scale your revenue on autopilot.
            </motion.p>

            {/* 4. Interactive Action Buttons with Magnetic Pull */}
            <motion.div
              variants={itemVariants}
              className="flex flex-col sm:flex-row items-center justify-center gap-4 sm:gap-6 w-full sm:w-auto"
            >
              {/* Button 1: Connect With Us */}
              <MagneticButton disabled={!!prefersReducedMotion || isMobile}>
                <motion.div
                  initial="initial"
                  whileHover="hover"
                  whileTap={{ scale: 0.97 }}
                  animate={{ scale: 1 }}
                >
                  <Link
                    href="/contact"
                    onClick={() => {
                      gtag("event", "connect_with_us_click", {
                        event_category: "engagement",
                        event_label: "CTA Section Connect With Us",
                      });
                    }}
                    className="group relative inline-flex items-center justify-center gap-3 bg-white text-black px-8 sm:px-12 py-4 sm:py-6 rounded-full font-black text-base sm:text-lg tracking-wide w-full sm:w-auto uppercase overflow-hidden transition-all duration-300 hover:shadow-[0_0_50px_rgba(255,255,255,0.4),0_10px_40px_rgba(124,97,255,0.3)] min-h-[52px] sm:min-h-[64px] touch-manipulation focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-white focus-visible:ring-offset-2 focus-visible:ring-offset-black"
                    style={{
                      boxShadow:
                        "0 0 40px rgba(255,255,255,0.2), 0 10px 40px rgba(255,255,255,0.1)",
                    }}
                  >
                    {/* Animated gradient sheen on hover */}
                    <motion.div
                      className="absolute inset-0 bg-gradient-to-r from-gray-100 via-white to-gray-100 bg-[length:200%_100%]"
                      initial={{ opacity: 0 }}
                      whileHover={{
                        opacity: 1,
                        backgroundPosition: ["0% 50%", "100% 50%", "0% 50%"],
                      }}
                      transition={{ duration: 3, repeat: Infinity, ease: "easeInOut" }}
                    />
                    {/* Glow expansion on hover */}
                    <div className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-500 rounded-full shadow-[0_0_60px_rgba(255,255,255,0.4)]" />

                    {/* Animated Phone Icon */}
                    <motion.span
                      variants={phoneIconVariants}
                      className="relative z-10 inline-flex items-center justify-center"
                    >
                      <PhoneCall className="w-5 h-5" />
                    </motion.span>
                    <span className="relative z-10">Connect With Us</span>
                  </Link>
                </motion.div>
              </MagneticButton>

              {/* Button 2: See Pricing */}
              <MagneticButton disabled={!!prefersReducedMotion || isMobile}>
                <motion.div
                  initial="initial"
                  whileHover="hover"
                  whileTap={{ scale: 0.97 }}
                  animate={{ scale: 1 }}
                >
                  <motion.a
                    href="/#pricing"
                    onClick={() => {
                      gtag("event", "see_pricing_click", {
                        event_category: "engagement",
                        event_label: "CTA Section See Pricing",
                      });
                    }}
                    className="group relative inline-flex items-center justify-center gap-3 bg-transparent border border-white/20 hover:border-[#7C61FF]/60 hover:bg-white/[0.06] text-white px-8 sm:px-12 py-4 sm:py-6 rounded-full font-bold text-base sm:text-lg backdrop-blur-md tracking-wide w-full sm:w-auto uppercase overflow-hidden transition-all duration-300 hover:shadow-[0_0_35px_rgba(124,97,255,0.25)] min-h-[52px] sm:min-h-[64px] touch-manipulation focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#A78BFA] focus-visible:ring-offset-2 focus-visible:ring-offset-black"
                  >
                    {/* Shimmer sweep effect on hover */}
                    <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/10 to-transparent -translate-x-full group-hover:translate-x-full transition-transform duration-700" />
                    <span className="relative z-10">See Pricing</span>

                    {/* Animated Arrow Icon */}
                    <motion.span
                      variants={arrowIconVariants}
                      className="relative z-10 inline-flex items-center justify-center"
                    >
                      <ArrowRight className="w-5 h-5" />
                    </motion.span>
                  </motion.a>
                </motion.div>
              </MagneticButton>
            </motion.div>
          </motion.div>
        </motion.div>
      </div>
    </section>
  );
}