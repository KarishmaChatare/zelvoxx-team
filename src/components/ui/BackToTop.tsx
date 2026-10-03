"use client";

import { motion, AnimatePresence, useReducedMotion } from "framer-motion";
import { useState, useEffect } from "react";
import { ArrowUp } from "lucide-react";

const SCROLL_THRESHOLD = 500;

export default function BackToTop() {
  const prefersReducedMotion = useReducedMotion();
  const [isVisible, setIsVisible] = useState(false);
  const [isHovered, setIsHovered] = useState(false);

  useEffect(() => {
    let ticking = false;

    const handleScroll = () => {
      if (!ticking) {
        window.requestAnimationFrame(() => {
          setIsVisible(window.scrollY > SCROLL_THRESHOLD);
          ticking = false;
        });
        ticking = true;
      }
    };

    // Check initial scroll position on mount
    handleScroll();

    window.addEventListener("scroll", handleScroll, { passive: true });
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const scrollToTop = () => {
    if (prefersReducedMotion) {
      window.scrollTo(0, 0);
    } else {
      window.scrollTo({
        top: 0,
        behavior: "smooth",
      });
    }
  };

  return (
    <AnimatePresence>
      {isVisible && (
        <div className="fixed bottom-[82px] right-5 sm:bottom-[94px] sm:right-6 md:bottom-[98px] md:right-7 z-50 pointer-events-auto select-none">
          <motion.button
            type="button"
            onClick={scrollToTop}
            aria-label="Back to top"
            onMouseEnter={() => setIsHovered(true)}
            onMouseLeave={() => setIsHovered(false)}
            initial={
              prefersReducedMotion
                ? { opacity: 0 }
                : { opacity: 0, scale: 0.8, y: 15 }
            }
            animate={
              prefersReducedMotion
                ? { opacity: 1 }
                : { opacity: 1, scale: 1, y: 0 }
            }
            exit={
              prefersReducedMotion
                ? { opacity: 0 }
                : { opacity: 0, scale: 0.8, y: 15 }
            }
            transition={{
              duration: prefersReducedMotion ? 0.1 : 0.35,
              ease: [0.16, 1, 0.3, 1],
            }}
            whileHover={prefersReducedMotion ? {} : { scale: 1.08 }}
            whileTap={prefersReducedMotion ? {} : { scale: 0.94 }}
            className="group relative flex items-center justify-center w-[50px] h-[50px] sm:w-[56px] sm:h-[56px] rounded-full bg-[#0E0D17]/90 hover:bg-[#141322] border border-[#7C61FF]/40 hover:border-[#7C61FF] shadow-[0_8px_24px_rgba(0,0,0,0.6),0_0_15px_rgba(124,97,255,0.25)] hover:shadow-[0_12px_32px_rgba(0,0,0,0.8),0_0_28px_rgba(124,97,255,0.5)] backdrop-blur-xl transition-all duration-300 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#7C61FF] focus-visible:ring-offset-2 focus-visible:ring-offset-[#0E0D17] cursor-pointer"
          >
            {/* Ambient violet soft glow */}
            <div className="absolute -inset-1 rounded-full bg-[#7C61FF]/20 blur-md -z-10 group-hover:bg-[#7C61FF]/35 transition-colors duration-300 pointer-events-none" />

            {/* Upward arrow icon */}
            <ArrowUp
              className="w-5 h-5 sm:w-6 sm:h-6 text-[#A78BFA] group-hover:text-white group-hover:-translate-y-0.5 transition-all duration-200"
              strokeWidth={2.2}
              aria-hidden="true"
            />

            {/* Desktop hover tooltip */}
            <span
              className={`hidden sm:inline-flex absolute right-[calc(100%+12px)] top-1/2 -translate-y-1/2 items-center px-3 py-1.5 rounded-full bg-[#0E0D17]/95 border border-[#7C61FF]/30 text-white text-xs font-semibold tracking-wide shadow-xl backdrop-blur-md whitespace-nowrap transition-all duration-200 pointer-events-none ${
                isHovered
                  ? "opacity-100 translate-x-0"
                  : "opacity-0 translate-x-2"
              }`}
            >
              <span className="w-1.5 h-1.5 rounded-full bg-[#7C61FF] mr-2" />
              Back to top
            </span>
          </motion.button>
        </div>
      )}
    </AnimatePresence>
  );
}
