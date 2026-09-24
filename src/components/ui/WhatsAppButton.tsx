"use client";

import { motion, useReducedMotion } from "framer-motion";
import { useState } from "react";
import { WHATSAPP_URL } from "@/src/constants/data";
import { gtag } from "@/src/lib/analytics";

export default function WhatsAppButton() {
  const prefersReducedMotion = useReducedMotion();
  const [isHovered, setIsHovered] = useState(false);

  return (
    <div className="fixed bottom-5 right-5 sm:bottom-6 sm:right-6 md:bottom-7 md:right-7 z-50 pointer-events-auto select-none">
      <motion.a
        href={WHATSAPP_URL}
        target="_blank"
        rel="noopener noreferrer"
        aria-label="Chat with Zelvoxx on WhatsApp (+91 98106 01084)"
        onClick={() => {
          gtag("event", "whatsapp_click", {
            event_category: "engagement",
            event_label: "Floating WhatsApp Button",
          });
        }}
        onMouseEnter={() => setIsHovered(true)}
        onMouseLeave={() => setIsHovered(false)}
        initial={{ opacity: 0, scale: 0.8, y: 20 }}
        animate={{ opacity: 1, scale: 1, y: 0 }}
        transition={{ duration: 0.5, ease: [0.16, 1, 0.3, 1] }}
        whileHover={{ scale: 1.08 }}
        whileTap={{ scale: 0.94 }}
        className="group relative flex items-center justify-center w-[50px] h-[50px] sm:w-[56px] sm:h-[56px] rounded-full bg-[#0E0D17]/90 hover:bg-[#141322] border border-[#25D366]/40 hover:border-[#25D366] shadow-[0_8px_24px_rgba(0,0,0,0.6),0_0_15px_rgba(37,211,102,0.25)] hover:shadow-[0_12px_32px_rgba(0,0,0,0.8),0_0_28px_rgba(37,211,102,0.5)] backdrop-blur-xl transition-all duration-300"
      >
        {/* Subtle idle pulsing outer ring / halo */}
        <motion.span
          className="absolute inset-0 rounded-full border border-[#25D366]/50 pointer-events-none"
          animate={
            prefersReducedMotion
              ? {}
              : {
                  scale: [1, 1.32, 1],
                  opacity: [0.65, 0, 0.65],
                }
          }
          transition={{
            duration: 2.8,
            repeat: Infinity,
            ease: "easeInOut",
          }}
        />

        {/* Ambient soft glow pulse */}
        <motion.span
          className="absolute -inset-1 rounded-full bg-[#25D366]/20 blur-md -z-10 pointer-events-none"
          animate={
            prefersReducedMotion
              ? {}
              : {
                  opacity: [0.35, 0.7, 0.35],
                  scale: [0.95, 1.12, 0.95],
                }
          }
          transition={{
            duration: 3,
            repeat: Infinity,
            ease: "easeInOut",
          }}
        />

        {/* Official WhatsApp Glyph */}
        <svg
          viewBox="0 0 24 24"
          className="w-6 h-6 sm:w-7 sm:h-7 text-[#25D366] group-hover:scale-110 transition-transform duration-200"
          fill="currentColor"
          aria-hidden="true"
        >
          <path d="M12.04 2c-5.46 0-9.91 4.45-9.91 9.91 0 1.75.46 3.45 1.32 4.95L2.05 22l5.25-1.38c1.45.79 3.08 1.21 4.74 1.21 5.46 0 9.91-4.45 9.91-9.91 0-2.65-1.03-5.14-2.9-7.01A9.816 9.816 0 0 0 12.04 2m.01 1.67c2.2 0 4.26.86 5.82 2.42a8.225 8.225 0 0 1 2.41 5.83c0 4.54-3.7 8.24-8.24 8.24-1.48 0-2.93-.4-4.2-1.15l-.3-.18-3.12.82.83-3.04-.2-.31a8.196 8.196 0 0 1-1.26-4.38c0-4.54 3.7-8.24 8.24-8.24m4.52 11.66c-.25-.13-1.47-.72-1.7-.81-.23-.08-.39-.13-.56.13-.17.25-.64.81-.79.97-.14.17-.29.19-.54.06-.25-.13-1.06-.39-2.03-1.25-.75-.67-1.26-1.5-1.41-1.75-.15-.25-.02-.38.11-.51.11-.11.25-.29.37-.44.13-.15.17-.25.25-.42.08-.17.04-.31-.02-.44-.06-.13-.56-1.35-.77-1.85-.2-.49-.41-.42-.56-.43h-.48c-.17 0-.44.06-.67.31-.23.25-.88.86-.88 2.1 0 1.24.9 2.44 1.03 2.61.13.17 1.77 2.7 4.29 3.79.6.26 1.07.41 1.43.53.6.19 1.15.16 1.58.1.48-.07 1.47-.6 1.68-1.18.21-.58.21-1.07.15-1.18-.06-.1-.22-.17-.47-.29" />
        </svg>

        {/* Small active status dot */}
        <span className="absolute top-0 right-0 w-3 h-3 rounded-full bg-[#25D366] border-2 border-[#0E0D17] shadow-[0_0_8px_rgba(37,211,102,0.9)]" />

        {/* Desktop hover tooltip */}
        <span
          className={`hidden sm:inline-flex absolute right-[calc(100%+12px)] top-1/2 -translate-y-1/2 items-center px-3 py-1.5 rounded-full bg-[#0E0D17]/95 border border-[#25D366]/30 text-white text-xs font-semibold tracking-wide shadow-xl backdrop-blur-md whitespace-nowrap transition-all duration-200 pointer-events-none ${
            isHovered
              ? "opacity-100 translate-x-0"
              : "opacity-0 translate-x-2"
          }`}
        >
          <span className="w-1.5 h-1.5 rounded-full bg-[#25D366] mr-2 animate-pulse" />
          Chat on WhatsApp
        </span>
      </motion.a>
    </div>
  );
}
