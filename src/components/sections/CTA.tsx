"use client";

import Link from "next/link";
import {
  motion,
  useReducedMotion,
  useSpring,
  useScroll,
  useTransform,
  type Variants,
} from "framer-motion";
import { ArrowRight, PhoneCall, Sparkles } from "lucide-react";
import { useState, useEffect, useRef } from "react";
import { pushToDataLayer } from "@/src/lib/analytics";

function MagneticButton({
  children,
  className = "",
  distance = 0.22,
  disabled = false,
}: {
  children: React.ReactNode;
  className?: string;
  distance?: number;
  disabled?: boolean;
}) {
  const ref = useRef<HTMLDivElement>(null);
  const x = useSpring(0, { stiffness: 280, damping: 18, mass: 0.4 });
  const y = useSpring(0, { stiffness: 280, damping: 18, mass: 0.4 });

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
  const sectionRef = useRef<HTMLElement>(null);

  // Extend scroll-parallax "sink" motion through this CTA section
  const { scrollYProgress } = useScroll({
    target: sectionRef,
    offset: ["start end", "end start"],
  });

  // Local parallax sink: shifts the ambient violet bloom downward with page scroll
  const sinkY = useTransform(
    scrollYProgress,
    [0, 1],
    prefersReducedMotion ? ["0px", "0px"] : ["-50px", "70px"]
  );

  const sinkYDeep = useTransform(
    scrollYProgress,
    [0, 1],
    prefersReducedMotion ? ["0px", "0px"] : ["-80px", "100px"]
  );

  // Subtle mouse-parallax within this section
  const mouseX = useSpring(0, { stiffness: 90, damping: 22 });
  const mouseY = useSpring(0, { stiffness: 90, damping: 22 });

  const mouseXInverted = useTransform(mouseX, (v) => -v * 0.55);
  const mouseXScaled = useTransform(mouseX, (v) => v * 0.75);

  useEffect(() => {
    const checkMobile = () => setIsMobile(window.innerWidth < 768);
    checkMobile();
    window.addEventListener("resize", checkMobile, { passive: true });
    return () => window.removeEventListener("resize", checkMobile);
  }, []);

  const handleMouseMove = (e: React.MouseEvent<HTMLElement>) => {
    if (prefersReducedMotion || isMobile || !sectionRef.current) return;
    const rect = sectionRef.current.getBoundingClientRect();
    const normX = (e.clientX - rect.left) / rect.width - 0.5;
    const normY = (e.clientY - rect.top) / rect.height - 0.5;
    mouseX.set(normX * 42);
    mouseY.set(normY * 42);
  };

  const handleMouseLeave = () => {
    mouseX.set(0);
    mouseY.set(0);
  };

  // Staggered sequence variants for deliberate scroll-reveal entrance
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
    hidden: prefersReducedMotion ? { opacity: 1, y: 0 } : { opacity: 0, y: 28 },
    visible: {
      opacity: 1,
      y: 0,
      transition: {
        duration: 0.65,
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
      x: 6,
      transition: { duration: 0.25, ease: "easeOut" },
    },
  };

  return (
    <section
      id="cta"
      ref={sectionRef}
      onMouseMove={handleMouseMove}
      onMouseLeave={handleMouseLeave}
      className="relative z-10 bg-transparent overflow-hidden py-24 sm:py-32 lg:py-40"
    >
      {/* 1. Continuous Scroll & Mouse Parallax Light Blooms (Fully blended into site background) */}
      <div className="absolute inset-0 pointer-events-none select-none overflow-hidden z-0">
        {/* Soft atmospheric gradient veil - guarantees high text contrast without harsh box edges */}
        <div
          aria-hidden="true"
          className="absolute inset-0 bg-[radial-gradient(ellipse_at_center,rgba(8,8,12,0.55)_0%,rgba(8,8,12,0.25)_55%,transparent_85%)] pointer-events-none"
        />

        {/* Primary soft radial glow centered behind headline specifically */}
        <motion.div
          style={
            prefersReducedMotion || isMobile
              ? {}
              : {
                  x: mouseX,
                  y: sinkY,
                }
          }
          className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[650px] sm:w-[900px] lg:w-[1100px] h-[360px] sm:h-[460px] pointer-events-none"
        >
          {/* Broad violet/blue aura */}
          <div className="absolute inset-0 bg-gradient-to-tr from-[#7C61FF]/22 via-[#8B5CF6]/16 to-[#3B82F6]/10 blur-[100px] sm:blur-[140px] rounded-full" />
          {/* Luminous core under the accent text */}
          <div className="absolute top-1/4 left-1/4 w-1/2 h-1/2 bg-[#A78BFA]/22 blur-[70px] sm:blur-[95px] rounded-full" />
        </motion.div>

        {/* Secondary ambient drift orbs reacting inversely to cursor for 3D depth */}
        <motion.div
          style={
            prefersReducedMotion || isMobile
              ? {}
              : {
                  x: mouseXInverted,
                  y: sinkYDeep,
                }
          }
          className="absolute top-1/4 left-8 sm:left-1/5 w-72 h-72 bg-[#7C61FF]/12 blur-[105px] rounded-full pointer-events-none"
        />
        <motion.div
          style={
            prefersReducedMotion || isMobile
              ? {}
              : {
                  x: mouseXScaled,
                  y: sinkY,
                }
          }
          className="absolute bottom-1/4 right-8 sm:right-1/5 w-80 h-80 bg-[#8B5CF6]/12 blur-[115px] rounded-full pointer-events-none"
        />
      </div>

      {/* 2. Open, Unboxed Content Layer (Floating naturally within the continuous background) */}
      <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10 text-center">
        <motion.div
          variants={containerVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, amount: 0.15 }}
          className="flex flex-col items-center"
        >
          {/* Step 1: Animated Badge with breathing border and gentle glow */}
          <motion.div
            variants={itemVariants}
            animate={
              prefersReducedMotion
                ? {}
                : {
                    boxShadow: [
                      "0 0 14px rgba(124,97,255,0.12)",
                      "0 0 28px rgba(167,139,250,0.32)",
                      "0 0 14px rgba(124,97,255,0.12)",
                    ],
                    borderColor: [
                      "rgba(255,255,255,0.12)",
                      "rgba(167,139,250,0.45)",
                      "rgba(255,255,255,0.12)",
                    ],
                  }
            }
            transition={{ duration: 3.5, repeat: Infinity, ease: "easeInOut" }}
            className="inline-flex items-center gap-2.5 px-5 sm:px-7 py-2.5 rounded-full bg-white/[0.04] border border-white/15 mb-7 sm:mb-9 backdrop-blur-md text-xs sm:text-sm font-semibold tracking-wide text-white/90"
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
              <Sparkles className="w-4 h-4 text-[#A78BFA]" />
            </motion.span>
            <span>Built for Growing Businesses</span>
          </motion.div>

          {/* Step 2: Two-color Headline with slow gradient shimmer sweep on accent words */}
          <motion.h2
            variants={itemVariants}
            className="text-[1.875rem] sm:text-[2.5rem] md:text-[3.25rem] lg:text-[4rem] xl:text-[4.5rem] font-heading font-black text-white uppercase tracking-tight sm:tracking-tighter mb-6 sm:mb-8 leading-[1.08] sm:leading-[1.04] drop-shadow-[0_4px_24px_rgba(0,0,0,0.9)]"
          >
            Ready to stop wasting time and start{" "}
            <span className="relative inline-block mt-1 sm:mt-0">
              {/* Soft ambient aura specifically hugging the accent text */}
              <motion.span
                aria-hidden="true"
                animate={
                  prefersReducedMotion
                    ? {}
                    : { opacity: [0.45, 0.85, 0.45], scale: [0.98, 1.03, 0.98] }
                }
                transition={{ duration: 4, repeat: Infinity, ease: "easeInOut" }}
                className="absolute -inset-3 rounded-2xl bg-gradient-to-r from-[#7C61FF]/30 via-[#8B5CF6]/30 to-[#A78BFA]/30 blur-xl pointer-events-none"
              />
              <motion.span
                className="text-transparent bg-clip-text bg-gradient-to-r from-[#7C61FF] via-[#C4B5FD] to-[#7C61FF] bg-[length:200%_auto] relative inline-block drop-shadow-[0_0_20px_rgba(124,97,255,0.4)]"
                animate={
                  prefersReducedMotion
                    ? {}
                    : { backgroundPosition: ["0% center", "200% center"] }
                }
                transition={{ duration: 5.5, repeat: Infinity, ease: "linear" }}
              >
                dominating your market?
              </motion.span>
            </span>
          </motion.h2>

          {/* Step 3: Subtext with generous spacing and high legibility */}
          <motion.p
            variants={itemVariants}
            className="text-base sm:text-xl md:text-2xl text-white/80 font-body font-light mb-12 sm:mb-16 max-w-3xl mx-auto leading-relaxed drop-shadow-[0_2px_12px_rgba(0,0,0,0.8)]"
          >
            Stop bleeding cash on broken marketing and weak templates. We build{" "}
            <strong className="text-white font-semibold">lethal growth systems</strong> that crush
            your competition and scale your revenue on autopilot.
          </motion.p>

          {/* Step 4: Interactive Action Buttons with Magnetic Pull and Hover Dynamics */}
          <motion.div
            variants={itemVariants}
            className="flex flex-col sm:flex-row items-center justify-center gap-4 sm:gap-6 w-full sm:w-auto"
          >
            {/* Button 1: Connect With Us */}
            <MagneticButton disabled={!!prefersReducedMotion || isMobile}>
              <motion.div
                initial="initial"
                whileHover="hover"
                whileTap={{ scale: 0.96 }}
                animate={{ scale: 1 }}
              >
                <Link
                  href="/contact"
                  onClick={() => {
                    pushToDataLayer("connect_with_us_click", {
                      event_category: "engagement",
                      event_label: "CTA Section Connect With Us",
                    });
                  }}
                  className="group relative inline-flex items-center justify-center gap-3 bg-white text-black px-9 sm:px-12 py-4 sm:py-5 rounded-full font-black text-base sm:text-lg tracking-wide w-full sm:w-auto uppercase overflow-hidden transition-all duration-300 hover:shadow-[0_0_50px_rgba(255,255,255,0.45),0_10px_40px_rgba(124,97,255,0.35)] min-h-[54px] sm:min-h-[60px] touch-manipulation focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-white focus-visible:ring-offset-2 focus-visible:ring-offset-black"
                  style={{
                    boxShadow:
                      "0 0 40px rgba(255,255,255,0.22), 0 10px 40px rgba(255,255,255,0.12)",
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
                  <div className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-500 rounded-full shadow-[0_0_60px_rgba(255,255,255,0.45)]" />

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
                whileTap={{ scale: 0.96 }}
                animate={{ scale: 1 }}
              >
                <motion.a
                  href="/#pricing"
                  onClick={() => {
                    pushToDataLayer("see_pricing_click", {
                      event_category: "engagement",
                      event_label: "CTA Section See Pricing",
                    });
                  }}
                  className="group relative inline-flex items-center justify-center gap-3 bg-white/[0.05] hover:bg-white/[0.1] border border-white/20 hover:border-[#A78BFA]/70 text-white px-9 sm:px-12 py-4 sm:py-5 rounded-full font-bold text-base sm:text-lg backdrop-blur-md tracking-wide w-full sm:w-auto uppercase overflow-hidden transition-all duration-300 hover:shadow-[0_0_35px_rgba(124,97,255,0.35)] min-h-[54px] sm:min-h-[60px] touch-manipulation focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#A78BFA] focus-visible:ring-offset-2 focus-visible:ring-offset-black"
                >
                  {/* Shimmer sweep effect on hover */}
                  <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/15 to-transparent -translate-x-full group-hover:translate-x-full transition-transform duration-700" />
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
      </div>
    </section>
  );
}