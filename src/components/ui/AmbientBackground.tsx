"use client";

import Image from "next/image";
import { motion, useScroll, useTransform, useReducedMotion } from "framer-motion";
import { usePathname } from "next/navigation";

interface AmbientBackgroundProps {
  /** Ambient opacity between 0 and 1, defaults to 0.24 for rich atmospheric depth */
  opacity?: number;
  /** Whether to use fixed viewport positioning (defaults to true for continuous site-wide flow) */
  fixed?: boolean;
}

export default function AmbientBackground({ opacity = 0.24, fixed = true }: AmbientBackgroundProps) {
  const prefersReducedMotion = useReducedMotion();
  const pathname = usePathname();
  const isHome = pathname === "/";

  // Track global page scroll
  const { scrollY, scrollYProgress } = useScroll();

  // Parallax sink motion: background shifts downward as user scrolls
  // Re-tuned for widescreen 16:9 composition across sections
  const yParallax = useTransform(
    scrollYProgress,
    [0, 1],
    prefersReducedMotion ? ["0%", "0%"] : ["-3%", "6%"]
  );

  // Fade in smoothly as user scrolls past the Hero into "Built for Growing Businesses"
  // When scrollY is 0 (in Hero), opacity is 0 (Hero remains 100% untouched)
  const heroFade = useTransform(scrollY, [0, 140], [0, 1]);

  return (
    <motion.div
      aria-hidden="true"
      style={{ contain: "strict", opacity: isHome ? heroFade : 1 }}
      className="fixed inset-0 pointer-events-none overflow-hidden select-none z-0"
    >
      {/* Viewport frame to maintain ambient texture across entire scrollable page */}
      <div className="w-full h-full overflow-hidden" style={{ isolation: "isolate" }}>
        <motion.div
          style={{
            y: yParallax,
            willChange: "transform",
            transform: "translate3d(0, 0, 0)",
            backfaceVisibility: "hidden",
          }}
          className="relative w-full h-[120%] -top-[10%]"
        >
          {/* Widescreen 16:9 Glass Background - GPU texture blit with zero blend-mode recalculation */}
          <Image
            src="/images/abstract-glass-widescreen.webp"
            alt=""
            fill
            sizes="100vw"
            className="object-cover object-center pointer-events-none select-none"
            style={{ opacity: opacity * 1.15 }}
            priority={false}
          />

          {/* High-contrast gradient overlays to preserve deep dark aesthetic and readability */}
          <div className="absolute inset-0 bg-gradient-to-b from-[#08080C]/40 via-transparent to-[#08080C]/50 pointer-events-none" />
          <div
            className="absolute inset-0 pointer-events-none"
            style={{
              background:
                "radial-gradient(ellipse at 50% 50%, transparent 35%, #08080C 85%)",
            }}
          />
        </motion.div>
      </div>
    </motion.div>
  );
}
