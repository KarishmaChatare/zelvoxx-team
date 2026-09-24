"use client";

import Link from "next/link";
import { motion, useReducedMotion, type Variants } from "framer-motion";
import { ArrowUp } from "lucide-react";
import { socialLinks, legalLinks, footerNavLinks } from "@/src/constants/data";
import { gtag } from "@/src/lib/analytics";

function getSocialIcon(platform: string) {
  const p = platform.toLowerCase();
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
  if (p.includes("linkedin")) {
    return (
      <svg
        viewBox="0 0 24 24"
        width="14"
        height="14"
        stroke="currentColor"
        strokeWidth="2"
        fill="none"
        strokeLinecap="round"
        strokeLinejoin="round"
        aria-hidden="true"
      >
        <path d="M16 8a6 6 0 0 1 6 6v7h-4v-7a2 2 0 0 0-2-2 2 2 0 0 0-2 2v7h-4v-7a6 6 0 0 1 6-6z" />
        <rect x="2" y="9" width="4" height="12" />
        <circle cx="4" cy="4" r="2" />
      </svg>
    );
  }
  return null;
}

export default function Footer() {
  const currentYear = new Date().getFullYear();
  const prefersReducedMotion = useReducedMotion();

  const scrollToTop = () => {
    if (typeof window !== "undefined") {
      window.scrollTo({ top: 0, behavior: "smooth" });
    }
  };

  const containerVariants: Variants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: prefersReducedMotion ? 0 : 0.08,
      },
    },
  };

  const columnVariants: Variants = {
    hidden: prefersReducedMotion ? { opacity: 1, y: 0 } : { opacity: 0, y: 20 },
    visible: {
      opacity: 1,
      y: 0,
      transition: {
        duration: 0.5,
        ease: [0.22, 1, 0.36, 1] as const,
      },
    },
  };

  return (
    <footer className="bg-transparent pt-16 sm:pt-20 lg:pt-24 pb-10 sm:pb-12 relative z-10 overflow-hidden">
      {/* Top subtle border gradient separator */}
      <div className="absolute top-0 left-0 right-0 h-[1px] bg-gradient-to-r from-transparent via-[#7C61FF]/30 to-transparent" />
      {/* Centered glowing accent hairline */}
      <div className="absolute top-0 left-1/2 -translate-x-1/2 w-3/4 max-w-4xl h-[1px] bg-gradient-to-r from-transparent via-[#A78BFA]/60 to-transparent blur-[0.5px]" />
      {/* Soft atmospheric ambient glow */}
      <div className="absolute -top-28 left-1/2 -translate-x-1/2 w-[600px] h-[120px] bg-[#7C61FF]/6 blur-[100px] pointer-events-none rounded-full" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        {/* Main 4-Column Grid */}
        <motion.div
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: "-40px" }}
          variants={containerVariants}
          className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-10 sm:gap-8 lg:gap-12 mb-14 sm:mb-16"
        >
          {/* Column 1: Brand Info */}
          <motion.div variants={columnVariants} className="space-y-4">
            <Link
              href="/"
              className="inline-flex items-center gap-1 group focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#A78BFA] rounded-lg transition-transform"
            >
              <span className="text-2xl sm:text-3xl font-heading font-black tracking-widest bg-gradient-to-r from-white via-white to-white/80 bg-clip-text text-transparent">
                ZELVOX
              </span>
              <span className="text-2xl sm:text-3xl font-heading font-black text-transparent bg-clip-text bg-gradient-to-r from-[#7C61FF] via-[#8B5CF6] to-[#A78BFA] drop-shadow-[0_0_14px_rgba(124,97,255,0.7)] group-hover:drop-shadow-[0_0_20px_rgba(124,97,255,0.9)] transition-all">
                X
              </span>
              <span className="relative flex h-2 w-2 ml-1.5" aria-hidden="true">
                <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-[#A78BFA] opacity-75" />
                <span className="relative inline-flex rounded-full h-2 w-2 bg-[#7C61FF]" />
              </span>
            </Link>

            <p className="text-white/70 font-body max-w-sm leading-relaxed text-xs sm:text-sm">
              We build premium digital growth systems that generate predictable revenue and dominate industries.
            </p>

            <div className="pt-2">
              <span className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-emerald-500/10 border border-emerald-500/20 text-emerald-400 text-xs font-semibold backdrop-blur-sm shadow-[0_0_12px_rgba(16,185,129,0.12)]">
                <span className="w-1.5 h-1.5 rounded-full bg-emerald-400 animate-pulse" />
                Available for New Projects
              </span>
            </div>
          </motion.div>

          {/* Column 2: Navigation */}
          <motion.div variants={columnVariants}>
            <h4 className="text-white font-bold font-heading uppercase tracking-widest mb-4 sm:mb-6 text-xs sm:text-sm flex items-center gap-2">
              <span>Navigation</span>
              <span className="w-1.5 h-1.5 rounded-full bg-[#7C61FF]/60" />
            </h4>
            <ul className="space-y-1 text-xs sm:text-sm text-white/70 font-body">
              {footerNavLinks.map((link) => (
                <li key={link.label}>
                  <Link
                    href={link.url}
                    className="group inline-flex items-center gap-1.5 text-white/65 hover:text-[#A78BFA] transition-all duration-300 py-1.5 min-h-[36px] touch-manipulation focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#A78BFA] rounded"
                  >
                    <span className="w-1 h-1 rounded-full bg-[#7C61FF] opacity-0 -translate-x-1 group-hover:opacity-100 group-hover:translate-x-0 transition-all duration-300" />
                    <span className="group-hover:translate-x-1 transition-transform duration-300">
                      {link.label}
                    </span>
                  </Link>
                </li>
              ))}
            </ul>
          </motion.div>

          {/* Column 3: Legal Policies */}
          <motion.div variants={columnVariants}>
            <h4 className="text-white font-bold font-heading uppercase tracking-widest mb-4 sm:mb-6 text-xs sm:text-sm flex items-center gap-2">
              <span>Legal</span>
              <span className="w-1.5 h-1.5 rounded-full bg-[#8B5CF6]/60" />
            </h4>
            <ul className="space-y-1 text-xs sm:text-sm text-white/70 font-body">
              {legalLinks.map((link) => (
                <li key={link.label}>
                  <Link
                    href={link.url}
                    className="group inline-flex items-center gap-1.5 text-white/65 hover:text-[#A78BFA] transition-all duration-300 py-1.5 min-h-[36px] touch-manipulation focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#A78BFA] rounded"
                  >
                    <span className="w-1 h-1 rounded-full bg-[#8B5CF6] opacity-0 -translate-x-1 group-hover:opacity-100 group-hover:translate-x-0 transition-all duration-300" />
                    <span className="group-hover:translate-x-1 transition-transform duration-300">
                      {link.label}
                    </span>
                  </Link>
                </li>
              ))}
            </ul>
          </motion.div>

          {/* Column 4: Contact & Social */}
          <motion.div variants={columnVariants} className="space-y-4">
            <h4 className="text-white font-bold font-heading uppercase tracking-widest mb-4 sm:mb-6 text-xs sm:text-sm flex items-center gap-2">
              <span>Connect</span>
              <span className="w-1.5 h-1.5 rounded-full bg-[#A78BFA]/60" />
            </h4>

            <Link
              href="/contact"
              onClick={() => {
                gtag("event", "connect_with_us_click", {
                  event_category: "engagement",
                  event_label: "Footer Connect With Us",
                });
              }}
              className="inline-flex items-center justify-center w-full sm:w-auto px-5 py-2.5 min-h-[44px] rounded-xl bg-gradient-to-r from-[#7C61FF]/15 to-[#8B5CF6]/15 hover:from-[#7C61FF] hover:via-[#8B5CF6] hover:to-[#A78BFA] text-[#A78BFA] hover:text-white border border-[#7C61FF]/30 transition-all text-xs sm:text-sm font-bold uppercase tracking-wider mb-2 shadow-[0_0_15px_rgba(124,97,255,0.15)] hover:shadow-[0_0_25px_rgba(124,97,255,0.4)] hover:-translate-y-0.5 touch-manipulation focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#A78BFA]"
            >
              Connect With Us
            </Link>

            <div>
              <p className="text-xs uppercase tracking-wider font-semibold text-white/60 mb-3 pt-2">
                Follow Us
              </p>
              <div className="flex items-center gap-2.5 flex-wrap">
                {socialLinks.map((social) => {
                  const icon = getSocialIcon(social.platform);
                  return (
                    <a
                      key={social.platform}
                      href={social.url}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="group/social inline-flex items-center gap-2 px-3 py-2 min-h-[38px] rounded-lg bg-white/[0.03] hover:bg-[#7C61FF]/15 border border-white/10 hover:border-[#7C61FF]/40 text-white/75 hover:text-white transition-all duration-300 text-xs font-semibold tracking-wide hover:scale-105 hover:shadow-[0_0_15px_rgba(124,97,255,0.25)] touch-manipulation focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#A78BFA]"
                      aria-label={`Visit Zelvoxx on ${social.platform}`}
                    >
                      {icon && (
                        <span className="text-white/60 group-hover/social:text-[#A78BFA] group-hover/social:scale-110 transition-all duration-300">
                          {icon}
                        </span>
                      )}
                      <span>{social.platform}</span>
                    </a>
                  );
                })}
              </div>
            </div>
          </motion.div>
        </motion.div>

        {/* Bottom Copyright & Guarantee Bar */}
        <div className="border-t border-white/10 pt-6 sm:pt-8 flex flex-col md:flex-row items-center justify-between text-white/60 text-xs font-body tracking-wider gap-4">
          <p className="text-center md:text-left">
            © {currentYear} Zelvoxx. All rights reserved.
          </p>

          <div className="flex items-center gap-3 text-[11px] text-white/50 uppercase tracking-widest">
            <span>Engineered for Revenue</span>
            <span className="text-[#7C61FF]">•</span>
            <span>Next.js High Velocity</span>
          </div>

          {/* Back to Top Button */}
          <button
            onClick={scrollToTop}
            type="button"
            className="inline-flex items-center gap-2 px-4 py-2 min-h-[40px] rounded-full bg-white/[0.04] hover:bg-[#7C61FF]/15 border border-white/10 hover:border-[#7C61FF]/40 text-white/70 hover:text-white transition-all duration-300 text-xs font-medium group focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#A78BFA] cursor-pointer hover:shadow-[0_0_12px_rgba(124,97,255,0.2)] touch-manipulation"
            aria-label="Scroll back to top of page"
          >
            <span>Back to top</span>
            <ArrowUp className="w-3.5 h-3.5 text-[#A78BFA] group-hover:-translate-y-0.5 transition-transform duration-300" />
          </button>
        </div>
      </div>
    </footer>
  );
}