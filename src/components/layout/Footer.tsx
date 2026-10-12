"use client";

import Link from "next/link";
import { motion, useReducedMotion, type Variants } from "framer-motion";
import { ArrowUpRight } from "lucide-react";
import { socialLinks, footerNavLinks, legalLinks, legalSiteInfo } from "@/src/constants/data";
import { pushToDataLayer } from "@/src/lib/analytics";

function getSocialIcon(platform: string) {
  const p = platform.toLowerCase();
  if (p.includes("linkedin")) {
    return (
      <svg
        viewBox="0 0 24 24"
        width="15"
        height="15"
        fill="currentColor"
        aria-hidden="true"
      >
        <path d="M19 3a2 2 0 0 1 2 2v14a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h14m-.5 15.5v-5.3a3.26 3.26 0 0 0-3.26-3.26c-.85 0-1.84.52-2.28 1.3v-1.11h-2.79v8.37h2.79v-4.93c0-.77.62-1.4 1.39-1.4a1.4 1.4 0 0 1 1.4 1.4v4.93h2.75M6.46 8.76c.92 0 1.66-.74 1.66-1.66 0-.92-.74-1.67-1.66-1.67a1.67 1.67 0 0 0-1.67 1.67c0 .92.75 1.66 1.67 1.66m1.39 9.74v-8.37H5.07v8.37h2.78z" />
      </svg>
    );
  }
  if (p.includes("twitter") || p.includes("x")) {
    return (
      <svg
        viewBox="0 0 24 24"
        width="14"
        height="14"
        fill="currentColor"
        aria-hidden="true"
      >
        <path d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-5.214-6.817L4.99 21.75H1.68l7.73-8.835L1.254 2.25H8.08l4.713 6.231zm-1.161 17.52h1.833L7.084 4.126H5.117z" />
      </svg>
    );
  }
  if (p.includes("instagram")) {
    return (
      <svg
        viewBox="0 0 24 24"
        width="15"
        height="15"
        stroke="currentColor"
        strokeWidth="2"
        fill="none"
        strokeLinecap="round"
        strokeLinejoin="round"
        aria-hidden="true"
      >
        <rect x="2" y="2" width="20" height="20" rx="5" ry="5" />
        <path d="M16 11.37A4 4 0 1 1 12.63 8 4 4 0 0 1 16 11.37z" />
        <line x1="17.5" y1="6.5" x2="17.51" y2="6.5" />
      </svg>
    );
  }
  if (p.includes("facebook")) {
    return (
      <svg
        viewBox="0 0 24 24"
        width="15"
        height="15"
        fill="currentColor"
        aria-hidden="true"
      >
        <path d="M22 12c0-5.52-4.48-10-10-10S2 6.48 2 12c0 4.84 3.44 8.87 8 9.8V15H8v-3h2V9.5C10 7.57 11.57 6 13.5 6H16v3h-2c-.55 0-1 .45-1 1v2h3v3h-3v6.95c5.05-.5 9-4.76 9-9.95z" />
      </svg>
    );
  }
  return null;
}

export default function Footer() {
  const currentYear = new Date().getFullYear();
  const prefersReducedMotion = useReducedMotion();
  const contactEmail = legalSiteInfo.email || "enquiry.zelvoxx@gmail.com";

  const containerVariants: Variants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: prefersReducedMotion ? 0 : 0.1,
      },
    },
  };

  const rowVariants: Variants = {
    hidden: prefersReducedMotion ? { opacity: 1, y: 0 } : { opacity: 0, y: 20 },
    visible: {
      opacity: 1,
      y: 0,
      transition: {
        duration: 0.55,
        ease: [0.22, 1, 0.36, 1] as const,
      },
    },
  };

  return (
    <footer className="bg-transparent pt-14 sm:pt-18 lg:pt-22 pb-10 sm:pb-14 relative z-10 overflow-hidden">
      {/* Top subtle border gradient separator */}
      <div className="absolute top-0 left-0 right-0 h-[1px] bg-gradient-to-r from-transparent via-[#7C61FF]/30 to-transparent" />
      {/* Centered glowing accent hairline */}
      <div className="absolute top-0 left-1/2 -translate-x-1/2 w-3/4 max-w-4xl h-[1px] bg-gradient-to-r from-transparent via-[#A78BFA]/60 to-transparent blur-[0.5px]" />
      {/* Soft atmospheric ambient glow */}
      <div className="absolute -top-28 left-1/2 -translate-x-1/2 w-[min(100vw,600px)] max-w-full h-[120px] bg-[#7C61FF]/8 blur-[100px] pointer-events-none rounded-full" />

      {/* Subtle background contrast tint */}
      <div className="absolute inset-0 bg-gradient-to-b from-transparent via-[#0A0914]/40 to-[#07060C]/70 pointer-events-none -z-10" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        <motion.div
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: "-40px" }}
          variants={containerVariants}
          className="space-y-8 sm:space-y-10"
        >
          {/* 1. TOP ROW: Contact line (left) + Nav links (right) */}
          <motion.div
            variants={rowVariants}
            className="flex flex-col lg:flex-row lg:items-center justify-between gap-6 pb-8 border-b border-white/10"
          >
            {/* Left: Contact line with mailto and arrow */}
            <div className="flex items-center gap-2 text-xs sm:text-sm md:text-[15px] font-body text-white/70 flex-wrap">
              <span>Contact us at:</span>
              <a
                href={`mailto:${contactEmail}`}
                onClick={() => {
                  pushToDataLayer("contact_email_click", {
                    event_category: "engagement",
                    event_label: `Footer Email ${contactEmail}`,
                  });
                }}
                className="group inline-flex items-center gap-1.5 text-white hover:text-[#A78BFA] font-medium transition-colors duration-200 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#7C61FF] rounded px-2 -mx-2 py-2 min-h-[44px] touch-manipulation"
              >
                <span className="underline underline-offset-4 decoration-white/30 group-hover:decoration-[#A78BFA] transition-colors">
                  {contactEmail}
                </span>
                <ArrowUpRight className="w-3.5 h-3.5 sm:w-4 sm:h-4 text-white/70 group-hover:text-[#A78BFA] group-hover:translate-x-0.5 group-hover:-translate-y-0.5 transition-all duration-200" />
              </a>
            </div>

            {/* Right: Horizontal Nav links */}
            <nav aria-label="Footer navigation">
              <ul className="flex items-center flex-wrap gap-x-5 sm:gap-x-7 lg:gap-x-8 gap-y-2 text-xs sm:text-sm font-medium text-white/70">
                {footerNavLinks.map((link) => (
                  <li key={link.label}>
                    <Link
                      href={link.url}
                      className="relative py-2 sm:py-1 px-1 text-white/70 hover:text-white transition-colors duration-200 group flex items-center touch-manipulation focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#7C61FF] rounded"
                    >
                      <span className="group-hover:text-white transition-colors">
                        {link.label}
                      </span>
                      {/* Smooth violet underline animation */}
                      <span className="absolute bottom-0 left-0 w-0 h-[1.5px] bg-[#7C61FF] group-hover:w-full transition-all duration-300 ease-out" />
                    </Link>
                  </li>
                ))}
              </ul>
            </nav>
          </motion.div>

          {/* 2. MIDDLE: Large bold "ZELVOXX" wordmark */}
          <motion.div
            variants={rowVariants}
            className="relative py-2 sm:py-4 lg:py-6 overflow-hidden select-none"
          >
            <div className="relative group block w-full">
              {/* Soft ambient violet glow halo behind the wordmark */}
              <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-4/5 h-24 bg-[#7C61FF]/10 blur-[80px] pointer-events-none rounded-full group-hover:bg-[#7C61FF]/20 group-hover:blur-[90px] transition-all duration-700" />

              <Link
                href="/"
                className="group block w-full focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#7C61FF] rounded-2xl"
                aria-label="Zelvoxx Home"
              >
                <div className="w-full text-center sm:text-left font-heading font-black tracking-[-0.04em] uppercase leading-[0.82] text-[13.5vw] sm:text-[14vw] md:text-[14.5vw] lg:text-[13.8vw] xl:text-[180px] transition-transform duration-500 group-hover:scale-[1.008]">
                  <span className="text-white/90 group-hover:text-white transition-colors duration-500">
                    ZELVOX
                  </span>
                  <span className="text-transparent bg-clip-text bg-gradient-to-r from-[#7C61FF] via-[#906BFF] to-[#C4B5FD] drop-shadow-[0_0_24px_rgba(124,97,255,0.7)] group-hover:drop-shadow-[0_0_45px_rgba(124,97,255,1)] inline-block transition-all duration-500">
                    X
                  </span>
                </div>
              </Link>
            </div>
          </motion.div>

          {/* 3. LEGAL SECTION: Clearly labeled Legal group with all 9 pages */}
          <motion.div
            variants={rowVariants}
            className="pt-6 sm:pt-8 pb-2 border-t border-white/10"
          >
            <div className="flex flex-col lg:flex-row lg:items-center justify-between gap-4">
              <div className="flex items-center gap-2 flex-shrink-0">
                <span className="text-[11px] sm:text-xs font-heading font-bold uppercase tracking-[0.2em] text-[#A78BFA]">
                  Legal
                </span>
                <span className="w-1.5 h-1.5 rounded-full bg-[#7C61FF]" />
              </div>

              <nav aria-label="Legal policies">
                <ul className="flex items-center flex-wrap gap-x-5 sm:gap-x-6 lg:gap-x-7 gap-y-2 text-xs text-white/60">
                  {legalLinks.map((link) => (
                    <li key={link.label}>
                      <Link
                        href={link.url}
                        className="relative py-2 sm:py-1 px-1 text-white/55 hover:text-white transition-colors duration-200 group flex items-center touch-manipulation focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-[#7C61FF] rounded"
                      >
                        <span className="group-hover:text-[#A78BFA] transition-colors">
                          {link.label}
                        </span>
                        {/* Smooth violet underline animation */}
                        <span className="absolute bottom-0 left-0 w-0 h-[1.5px] bg-[#7C61FF] group-hover:w-full transition-all duration-300 ease-out" />
                      </Link>
                    </li>
                  ))}
                </ul>
              </nav>
            </div>
          </motion.div>

          {/* 4. BOTTOM ROW: Copyright (left) + Social icons (right) */}
          <motion.div
            variants={rowVariants}
            className="pt-6 border-t border-white/10 flex flex-col sm:flex-row items-center justify-between gap-5"
          >
            {/* Left: Copyright */}
            <div className="text-xs text-white/50 text-center sm:text-left font-body">
              <p>© {currentYear} Zelvoxx. All rights reserved.</p>
            </div>

            {/* Right: Social icons with scale-up + glow-background hover */}
            <div className="flex items-center gap-2.5 sm:gap-3">
              {socialLinks.map((social) => {
                const icon = getSocialIcon(social.platform);
                return (
                  <a
                    key={social.platform}
                    href={social.url}
                    target="_blank"
                    rel="noopener noreferrer"
                    aria-label={`Visit Zelvoxx on ${social.platform}`}
                    onClick={() => {
                      pushToDataLayer("social_click", {
                        event_category: "engagement",
                        event_label: `Footer Social ${social.platform}`,
                        social_network: social.platform,
                      });
                    }}
                    className="w-9 h-9 sm:w-10 sm:h-10 rounded-full bg-white/[0.04] hover:bg-[#7C61FF]/20 border border-white/10 hover:border-[#7C61FF]/60 text-white/70 hover:text-white transition-all duration-300 flex items-center justify-center hover:scale-110 hover:shadow-[0_0_18px_rgba(124,97,255,0.45)] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#7C61FF]"
                  >
                    {icon}
                  </a>
                );
              })}
            </div>
          </motion.div>
        </motion.div>
      </div>
    </footer>
  );
}