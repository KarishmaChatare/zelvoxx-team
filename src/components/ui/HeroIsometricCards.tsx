"use client";

import React, { useRef, useState, useEffect, useCallback } from "react";
import { motion, useSpring, useTransform, useReducedMotion } from "framer-motion";
import { CheckCircle2, Users, TrendingUp, Clock } from "lucide-react";

interface StatItem {
  label?: string;
  value?: string;
}

interface HeroIsometricCardsProps {
  stats?: StatItem[];
}

// Default stats fallback matching existing content
const defaultStatsFallback: StatItem[] = [
  { value: "250+", label: "Projects Delivered" },
  { value: "150+", label: "Happy Clients" },
  { value: "8X", label: "Average ROI Generated" },
  { value: "24/7", label: "Growth Support" },
];

// Helper to parse numbers and suffixes (e.g., "250+" -> { num: 250, suffix: "+" })
function parseStatValue(valStr: string = "") {
  const cleanStr = valStr.trim();
  const match = cleanStr.match(/^(\d+(?:\.\d+)?)(.*)$/);
  if (match) {
    return {
      num: parseFloat(match[1]),
      suffix: match[2] || "",
    };
  }
  return { num: 0, suffix: cleanStr };
}

// Count-up animated number component using direct textContent updates for 60fps performance
function CountUpNumber({ value, shouldAnimate }: { value: string; shouldAnimate: boolean }) {
  const { num, suffix } = parseStatValue(value);
  const spanRef = useRef<HTMLSpanElement>(null);

  useEffect(() => {
    const node = spanRef.current;
    if (!node) return;

    if (!shouldAnimate || num === 0) {
      node.textContent = `${num}${suffix}`;
      return;
    }

    const duration = 1600;
    const startTime = performance.now();
    let animationFrameId: number;

    const updateCounter = (currentTime: number) => {
      const elapsed = currentTime - startTime;
      const progress = Math.min(elapsed / duration, 1);
      // Ease-out cubic curve
      const easedProgress = 1 - Math.pow(1 - progress, 3);
      const currentVal = Math.round(num * easedProgress);

      node.textContent = `${currentVal}${suffix}`;

      if (progress < 1) {
        animationFrameId = requestAnimationFrame(updateCounter);
      } else {
        node.textContent = `${num}${suffix}`;
      }
    };

    animationFrameId = requestAnimationFrame(updateCounter);
    return () => cancelAnimationFrame(animationFrameId);
  }, [num, suffix, shouldAnimate]);

  return <span ref={spanRef}>{shouldAnimate ? `0${suffix}` : `${num}${suffix}`}</span>;
}

export default function HeroIsometricCards({ stats }: HeroIsometricCardsProps) {
  const containerRef = useRef<HTMLDivElement>(null);
  const prefersReducedMotion = useReducedMotion();

  // Mobile / touch screen detection
  const [isInteractive, setIsInteractive] = useState(false);

  useEffect(() => {
    const checkInteractivity = () => {
      const isMobileScreen = window.innerWidth < 1024;
      const hasCoarsePointer = window.matchMedia("(pointer: coarse)").matches;
      setIsInteractive(!isMobileScreen && !hasCoarsePointer && !prefersReducedMotion);
    };

    checkInteractivity();
    window.addEventListener("resize", checkInteractivity, { passive: true });
    return () => window.removeEventListener("resize", checkInteractivity);
  }, [prefersReducedMotion]);

  // Spring physics for responsive, buttery smooth parallax
  const springConfig = { damping: 25, stiffness: 180, mass: 0.6 };
  const mouseX = useSpring(0, springConfig);
  const mouseY = useSpring(0, springConfig);

  const handleMouseMove = useCallback(
    (e: React.MouseEvent<HTMLDivElement>) => {
      if (!isInteractive || !containerRef.current) return;
      const rect = containerRef.current.getBoundingClientRect();
      const clientX = e.clientX - rect.left;
      const clientY = e.clientY - rect.top;

      // Normalized coordinates: -0.5 to +0.5
      const normX = clientX / rect.width - 0.5;
      const normY = clientY / rect.height - 0.5;

      mouseX.set(normX);
      mouseY.set(normY);
    },
    [isInteractive, mouseX, mouseY]
  );

  const handleMouseLeave = useCallback(() => {
    if (!isInteractive) return;
    mouseX.set(0);
    mouseY.set(0);
  }, [isInteractive, mouseX, mouseY]);

  // Frontal centerpiece presentation with subtle 3D parallax tilt
  const baseRotateX = prefersReducedMotion ? 0 : 4;
  const baseRotateY = 0;
  const baseRotateZ = 0;

  const clusterRotateX = useTransform(mouseY, [-0.5, 0.5], [baseRotateX + 5, baseRotateX - 5]);
  const clusterRotateY = useTransform(mouseX, [-0.5, 0.5], [baseRotateY - 7, baseRotateY + 7]);

  // Multi-layer differential parallax offsets for centered floating cards
  const card1X = useTransform(mouseX, [-0.5, 0.5], [-12, 12]);
  const card1Y = useTransform(mouseY, [-0.5, 0.5], [-10, 10]);

  const card2X = useTransform(mouseX, [-0.5, 0.5], [-18, 18]);
  const card2Y = useTransform(mouseY, [-0.5, 0.5], [-15, 15]);

  const card3X = useTransform(mouseX, [-0.5, 0.5], [-24, 24]);
  const card3Y = useTransform(mouseY, [-0.5, 0.5], [-20, 20]);

  const card4X = useTransform(mouseX, [-0.5, 0.5], [-32, 32]);
  const card4Y = useTransform(mouseY, [-0.5, 0.5], [-26, 26]);

  const pill1X = useTransform(mouseX, [-0.5, 0.5], [-14, 14]);
  const pill1Y = useTransform(mouseY, [-0.5, 0.5], [-11, 11]);

  const pill2X = useTransform(mouseX, [-0.5, 0.5], [-22, 22]);
  const pill2Y = useTransform(mouseY, [-0.5, 0.5], [-18, 18]);

  // Stat item data mapping
  const effectiveStats = stats && stats.length >= 4 ? stats : defaultStatsFallback;
  const stat1 = effectiveStats[0] || defaultStatsFallback[0];
  const stat2 = effectiveStats[1] || defaultStatsFallback[1];
  const stat3 = effectiveStats[2] || defaultStatsFallback[2];
  const stat4 = effectiveStats[3] || defaultStatsFallback[3];

  return (
    <div
      ref={containerRef}
      onMouseMove={handleMouseMove}
      onMouseLeave={handleMouseLeave}
      className="relative w-full max-w-[620px] lg:max-w-[680px] mx-auto py-1 sm:py-2 px-2 sm:px-4 select-none"
      style={{ perspective: 1200, contain: "layout style" }}
    >
      {/* Ambient Violet/Blue Centerpiece Glow */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[420px] h-[280px] sm:w-[540px] sm:h-[320px] bg-gradient-to-tr from-primary/20 via-accent/10 to-transparent blur-[90px] rounded-full pointer-events-none -z-10" />

      {/* 3D Floating Constellation Container */}
      <motion.div
        style={{
          rotateX: isInteractive ? clusterRotateX : baseRotateX,
          rotateY: isInteractive ? clusterRotateY : baseRotateY,
          rotateZ: baseRotateZ,
          transformStyle: "preserve-3d",
          willChange: "transform",
          transform: "translateZ(0)",
          backfaceVisibility: "hidden",
        }}
        initial={false}
        animate={{ opacity: 1, y: 0, scale: 1 }}
        transition={{ duration: 0.8, ease: [0.22, 1, 0.36, 1] }}
        className="relative w-full flex flex-col gap-2.5 sm:gap-3.5"
      >
        {/* Top Status Pill: Realtime Sync */}
        <motion.div
          style={{
            x: isInteractive ? pill1X : 0,
            y: isInteractive ? pill1Y : 0,
            transform: "translateZ(30px)",
            willChange: "transform",
          }}
          className="flex justify-center sm:justify-end pr-0 sm:pr-6"
        >
          <motion.div
            style={{ willChange: "transform", transform: "translateZ(0)", backfaceVisibility: "hidden" }}
            animate={
              prefersReducedMotion
                ? {}
                : {
                    y: [0, -10, 0],
                  }
            }
            transition={{
              duration: 4.4,
              repeat: Infinity,
              ease: "easeInOut",
              delay: 0.3,
            }}
            className="rounded-full px-3 py-1 border border-white/10 bg-[#0E0D17]/90 shadow-lg flex items-center gap-2 relative overflow-hidden"
          >
            <span className="w-2 h-2 rounded-full bg-emerald-400 animate-pulse shadow-[0_0_8px_rgba(52,211,153,0.8)]" />
            <span className="text-[11px] font-medium text-white/80 tracking-wide">
              Realtime Sync
            </span>
          </motion.div>
        </motion.div>

        {/* Row 1: Cards 1 & 2 */}
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 sm:gap-4">
          {/* Card 1: 250+ Projects Delivered */}
          <motion.div
            style={{
              x: isInteractive ? card1X : 0,
              y: isInteractive ? card1Y : 0,
              transform: "translateZ(20px)",
              transformStyle: "preserve-3d",
              willChange: "transform",
            }}
          >
            <motion.div
              style={{ willChange: "transform", transform: "translateZ(0)", backfaceVisibility: "hidden" }}
              animate={
                prefersReducedMotion
                  ? {}
                  : {
                      y: [0, -15, 0],
                    }
              }
              transition={{
                duration: 4.8,
                repeat: Infinity,
                ease: "easeInOut",
                delay: 0,
              }}
              whileHover={{
                y: -8,
                scale: 1.04,
                borderColor: "rgba(167, 139, 250, 0.45)",
                boxShadow: "0 0 35px rgba(124, 97, 255, 0.45), 0 20px 40px rgba(0,0,0,0.8)",
              }}
              className="rounded-2xl p-3.5 sm:p-4 border border-white/10 bg-gradient-to-b from-[#141322] via-[#100F1E] to-[#0A0912] shadow-[0_15px_35px_rgba(0,0,0,0.6)] flex items-center gap-3 cursor-default group relative overflow-hidden"
            >
              {/* Specular top highlight */}
              <div className="absolute inset-x-0 top-0 h-px bg-gradient-to-r from-transparent via-white/25 to-transparent" />
              <div className="absolute inset-0 bg-gradient-to-br from-white/[0.04] to-transparent opacity-50 pointer-events-none" />

              {/* Violet accent icon badge */}
              <div className="w-10 h-10 rounded-xl bg-primary/20 border border-primary/30 flex items-center justify-center shrink-0 shadow-[0_0_15px_rgba(124,97,255,0.25)]">
                <CheckCircle2 className="w-5 h-5 text-highlight" />
              </div>

              {/* Stat text */}
              <div>
                <div className="text-xl sm:text-2xl font-black font-heading tracking-tight bg-clip-text text-transparent bg-gradient-to-r from-[#7C61FF] via-[#8B5CF6] to-[#A78BFA] drop-shadow-[0_0_12px_rgba(124,97,255,0.35)] leading-tight">
                  <CountUpNumber value={stat1.value || "250+"} shouldAnimate={!prefersReducedMotion} />
                </div>
                <p className="text-[11px] sm:text-xs text-white/60 font-medium tracking-wide whitespace-nowrap">
                  {stat1.label || "Projects Delivered"}
                </p>
              </div>
            </motion.div>
          </motion.div>

          {/* Card 2: 150+ Happy Clients */}
          <motion.div
            style={{
              x: isInteractive ? card2X : 0,
              y: isInteractive ? card2Y : 0,
              transform: "translateZ(30px)",
              transformStyle: "preserve-3d",
              willChange: "transform",
            }}
            className="sm:translate-y-2"
          >
            <motion.div
              style={{ willChange: "transform", transform: "translateZ(0)", backfaceVisibility: "hidden" }}
              animate={
                prefersReducedMotion
                  ? {}
                  : {
                      y: [0, 14, 0],
                    }
              }
              transition={{
                duration: 5.6,
                repeat: Infinity,
                ease: "easeInOut",
                delay: 1.2,
              }}
              whileHover={{
                y: -8,
                scale: 1.04,
                borderColor: "rgba(167, 139, 250, 0.45)",
                boxShadow: "0 0 35px rgba(124, 97, 255, 0.45), 0 20px 40px rgba(0,0,0,0.8)",
              }}
              className="rounded-2xl p-3.5 sm:p-4 border border-white/10 bg-gradient-to-b from-[#141322] via-[#100F1E] to-[#0A0912] shadow-[0_15px_35px_rgba(0,0,0,0.6)] flex items-center gap-3 cursor-default group relative overflow-hidden"
            >
              {/* Specular top highlight */}
              <div className="absolute inset-x-0 top-0 h-px bg-gradient-to-r from-transparent via-white/25 to-transparent" />
              <div className="absolute inset-0 bg-gradient-to-br from-white/[0.04] to-transparent opacity-50 pointer-events-none" />

              {/* Violet accent icon badge */}
              <div className="w-10 h-10 rounded-xl bg-accent/20 border border-accent/30 flex items-center justify-center shrink-0 shadow-[0_0_15px_rgba(139,92,246,0.25)]">
                <Users className="w-5 h-5 text-highlight" />
              </div>

              {/* Stat text */}
              <div>
                <div className="text-xl sm:text-2xl font-black font-heading tracking-tight bg-clip-text text-transparent bg-gradient-to-r from-[#7C61FF] via-[#8B5CF6] to-[#A78BFA] drop-shadow-[0_0_12px_rgba(124,97,255,0.35)] leading-tight">
                  <CountUpNumber value={stat2.value || "150+"} shouldAnimate={!prefersReducedMotion} />
                </div>
                <p className="text-[11px] sm:text-xs text-white/60 font-medium tracking-wide whitespace-nowrap">
                  {stat2.label || "Happy Clients"}
                </p>
              </div>
            </motion.div>
          </motion.div>
        </div>

        {/* Row 2: Cards 3 & 4 */}
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 sm:gap-4">
          {/* Card 3: 8X Average ROI Generated */}
          <motion.div
            style={{
              x: isInteractive ? card3X : 0,
              y: isInteractive ? card3Y : 0,
              transform: "translateZ(40px)",
              transformStyle: "preserve-3d",
              willChange: "transform",
            }}
          >
            <motion.div
              style={{ willChange: "transform", transform: "translateZ(0)", backfaceVisibility: "hidden" }}
              animate={
                prefersReducedMotion
                  ? {}
                  : {
                      y: [0, -16, 0],
                    }
              }
              transition={{
                duration: 5.2,
                repeat: Infinity,
                ease: "easeInOut",
                delay: 0.8,
              }}
              whileHover={{
                y: -8,
                scale: 1.04,
                borderColor: "rgba(167, 139, 250, 0.45)",
                boxShadow: "0 0 35px rgba(124, 97, 255, 0.45), 0 20px 40px rgba(0,0,0,0.8)",
              }}
              className="rounded-2xl p-3.5 sm:p-4 border border-white/10 bg-gradient-to-b from-[#141322] via-[#100F1E] to-[#0A0912] shadow-[0_20px_45px_rgba(0,0,0,0.7)] flex items-center gap-3 cursor-default group relative overflow-hidden"
            >
              {/* Specular top highlight */}
              <div className="absolute inset-x-0 top-0 h-px bg-gradient-to-r from-transparent via-white/30 to-transparent" />
              <div className="absolute inset-0 bg-gradient-to-br from-white/[0.04] to-transparent opacity-50 pointer-events-none" />

              {/* Violet accent icon badge matching "trending up" style */}
              <div className="w-10 h-10 rounded-xl bg-primary/25 border border-primary/35 flex items-center justify-center shrink-0 shadow-[0_0_18px_rgba(124,97,255,0.35)]">
                <TrendingUp className="w-5 h-5 text-highlight" />
              </div>

              {/* Stat text */}
              <div>
                <div className="text-xl sm:text-2xl font-black font-heading tracking-tight bg-clip-text text-transparent bg-gradient-to-r from-[#7C61FF] via-[#8B5CF6] to-[#A78BFA] drop-shadow-[0_0_12px_rgba(124,97,255,0.4)] leading-tight">
                  <CountUpNumber value={stat3.value || "8X"} shouldAnimate={!prefersReducedMotion} />
                </div>
                <p className="text-[11px] sm:text-xs text-white/60 font-medium tracking-wide whitespace-nowrap">
                  {stat3.label || "Average ROI Generated"}
                </p>
              </div>
            </motion.div>
          </motion.div>

          {/* Card 4: 24/7 Growth Support */}
          <motion.div
            style={{
              x: isInteractive ? card4X : 0,
              y: isInteractive ? card4Y : 0,
              transform: "translateZ(50px)",
              transformStyle: "preserve-3d",
              willChange: "transform",
            }}
            className="sm:translate-y-2"
          >
            <motion.div
              style={{ willChange: "transform", transform: "translateZ(0)", backfaceVisibility: "hidden" }}
              animate={
                prefersReducedMotion
                  ? {}
                  : {
                      y: [0, 15, 0],
                    }
              }
              transition={{
                duration: 5.8,
                repeat: Infinity,
                ease: "easeInOut",
                delay: 2.2,
              }}
              whileHover={{
                y: -8,
                scale: 1.04,
                borderColor: "rgba(167, 139, 250, 0.45)",
                boxShadow: "0 0 35px rgba(124, 97, 255, 0.45), 0 20px 40px rgba(0,0,0,0.8)",
              }}
              className="rounded-2xl p-3.5 sm:p-4 border border-white/10 bg-gradient-to-b from-[#141322] via-[#100F1E] to-[#0A0912] shadow-[0_20px_45px_rgba(0,0,0,0.7)] flex items-center gap-3 cursor-default group relative overflow-hidden"
            >
              {/* Specular top highlight */}
              <div className="absolute inset-x-0 top-0 h-px bg-gradient-to-r from-transparent via-white/30 to-transparent" />
              <div className="absolute inset-0 bg-gradient-to-br from-white/[0.04] to-transparent opacity-50 pointer-events-none" />

              {/* Violet accent icon badge */}
              <div className="w-10 h-10 rounded-xl bg-accent/25 border border-accent/35 flex items-center justify-center shrink-0 shadow-[0_0_18px_rgba(139,92,246,0.35)]">
                <Clock className="w-5 h-5 text-highlight" />
              </div>

              {/* Stat text */}
              <div>
                <div className="text-xl sm:text-2xl font-black font-heading tracking-tight bg-clip-text text-transparent bg-gradient-to-r from-[#7C61FF] via-[#8B5CF6] to-[#A78BFA] drop-shadow-[0_0_12px_rgba(124,97,255,0.4)] leading-tight">
                  <CountUpNumber value={stat4.value || "24/7"} shouldAnimate={!prefersReducedMotion} />
                </div>
                <p className="text-[11px] sm:text-xs text-white/60 font-medium tracking-wide whitespace-nowrap">
                  {stat4.label || "Growth Support"}
                </p>
              </div>
            </motion.div>
          </motion.div>
        </div>

        {/* Bottom Status Pill: 24/7 Monitoring */}
        <motion.div
          style={{
            x: isInteractive ? pill2X : 0,
            y: isInteractive ? pill2Y : 0,
            transform: "translateZ(35px)",
          }}
          className="flex justify-center sm:justify-start pl-0 sm:pl-6"
        >
          <motion.div
            style={{ willChange: "transform", transform: "translateZ(0)", backfaceVisibility: "hidden" }}
            animate={
              prefersReducedMotion
                ? {}
                : {
                    y: [0, -11, 0],
                  }
            }
            transition={{
              duration: 4.6,
              repeat: Infinity,
              ease: "easeInOut",
              delay: 1.8,
            }}
            className="rounded-full px-3 py-1 border border-white/10 bg-[#0E0D17]/90 shadow-lg flex items-center gap-2 relative overflow-hidden"
          >
            <span className="w-2 h-2 rounded-full bg-primary animate-pulse shadow-[0_0_8px_rgba(124,97,255,0.8)]" />
            <span className="text-[11px] font-medium text-white/80 tracking-wide">
              24/7 Monitoring
            </span>
          </motion.div>
        </motion.div>
      </motion.div>
    </div>
  );
}
