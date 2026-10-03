"use client";

import Link from "next/link";
import { ArrowLeft } from "lucide-react";
import { motion, type Variants } from "framer-motion";

const fadeInUp: Variants = {
  hidden: { opacity: 0, y: 24 },
  visible: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.55, ease: [0.22, 1, 0.36, 1] },
  },
};

const lineGrow: Variants = {
  hidden: { opacity: 0, scaleX: 0 },
  visible: {
    opacity: 1,
    scaleX: 1,
    transition: { duration: 0.85, ease: [0.22, 1, 0.36, 1], delay: 0.12 },
  },
};

const headerStagger: Variants = {
  hidden: {},
  visible: {
    transition: { staggerChildren: 0.08, delayChildren: 0.04 },
  },
};

const contentReveal: Variants = {
  hidden: { opacity: 0, y: 28 },
  visible: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.68, ease: [0.22, 1, 0.36, 1], delay: 0.14 },
  },
};

type LegalPageLayoutProps = {
  title: string;
  effectiveDate: string;
  children: React.ReactNode;
};

export default function LegalPageLayout({
  title,
  effectiveDate,
  children,
}: LegalPageLayoutProps) {
  return (
    <div className="relative max-w-4xl mx-auto px-4 sm:px-6 py-16 sm:py-24 overflow-hidden">
      <div className="absolute inset-0 pointer-events-none select-none" aria-hidden>
        <motion.div
          className="absolute -top-32 -right-16 w-[min(100vw,28rem)] h-[min(100vw,28rem)] max-w-[480px] max-h-[480px] rounded-full bg-primary/30 blur-[100px] sm:blur-[128px]"
          animate={{
            x: [0, 24, 0],
            y: [0, 16, 0],
            opacity: [0.35, 0.55, 0.35],
          }}
          transition={{ duration: 14, repeat: Infinity, ease: "easeInOut" }}
        />
        <motion.div
          className="absolute top-[40%] -left-24 w-[min(100vw,22rem)] h-[min(100vw,22rem)] rounded-full bg-accent/25 blur-[90px] sm:blur-[110px]"
          animate={{
            x: [0, -20, 0],
            y: [0, 28, 0],
            opacity: [0.25, 0.45, 0.25],
          }}
          transition={{ duration: 18, repeat: Infinity, ease: "easeInOut" }}
        />
        <motion.div
          className="absolute -bottom-20 right-[15%] w-72 h-72 rounded-full bg-violet-500/20 blur-[100px]"
          animate={{
            scale: [1, 1.12, 1],
            opacity: [0.2, 0.38, 0.2],
          }}
          transition={{ duration: 11, repeat: Infinity, ease: "easeInOut" }}
        />
      </div>

      <div className="relative z-10">
        <motion.header
          variants={headerStagger}
          initial="hidden"
          animate="visible"
          className="mb-10 sm:mb-12"
        >
          {/* Top back navigation */}
          <motion.div variants={fadeInUp} className="mb-4">
            <Link
              href="/"
              className="inline-flex items-center gap-2 text-xs font-medium text-white/50 hover:text-primary transition-colors group py-2.5 px-2 -mx-2 rounded-lg min-h-[44px] touch-manipulation"
            >
              <ArrowLeft className="w-3.5 h-3.5 group-hover:-translate-x-1 transition-transform" />
              <span>Back to Homepage</span>
            </Link>
          </motion.div>

          <motion.div variants={fadeInUp}>
            <span className="inline-block text-[10px] sm:text-[11px] font-heading font-bold uppercase tracking-[0.22em] text-primary mb-3">
              Legal Documentation
            </span>
          </motion.div>
          <motion.h1
            variants={fadeInUp}
            className="text-4xl sm:text-5xl font-heading font-black mb-4 tracking-tight"
          >
            <span className="bg-gradient-to-r from-white via-white to-white/80 bg-clip-text text-transparent">
              {title}
            </span>
          </motion.h1>
          <motion.div
            variants={lineGrow}
            className="h-[2px] w-28 sm:w-36 rounded-full bg-gradient-to-r from-primary via-violet-400/80 to-transparent origin-left mb-4"
          />
          <motion.div
            variants={fadeInUp}
            className="flex flex-wrap items-center gap-x-4 gap-y-1 text-white/50 font-body text-xs sm:text-sm"
          >
            <span>Effective Date: {effectiveDate}</span>
            <span>•</span>
            <span>Last Updated: {effectiveDate}</span>
          </motion.div>

          {/* Placeholder Legal Text Notice */}
          <motion.div
            variants={fadeInUp}
            className="mt-4 p-3 sm:p-3.5 rounded-xl bg-amber-500/10 border border-amber-500/20 text-amber-300 text-xs font-mono leading-relaxed"
          >
            <div className="flex items-center gap-2 font-bold uppercase tracking-wider text-amber-400 text-[11px]">
              <span className="w-2 h-2 rounded-full bg-amber-400 animate-pulse" />
              [PLACEHOLDER — REPLACE WITH REVIEWED LEGAL TEXT]
            </div>
            <p className="mt-1 text-amber-300/80 text-[11px] font-sans">
              This document contains standard boilerplate legal language for development and layout preview. It must be reviewed by qualified legal counsel or generated via an official policy generator (e.g. Termly, iubenda) before commercial deployment.
            </p>
          </motion.div>
        </motion.header>

        <motion.div
          variants={contentReveal}
          initial="hidden"
          animate="visible"
          className="space-y-8 sm:space-y-12 [&>section]:scroll-mt-24 [&>section]:transition-transform [&>section]:duration-300 [&>section]:hover:-translate-y-0.5"
        >
          {children}
        </motion.div>

        {/* Bottom back navigation */}
        <div className="mt-14 pt-8 border-t border-white/10 flex items-center justify-between">
          <Link
            href="/"
            className="inline-flex items-center gap-2 text-xs sm:text-sm text-white/60 hover:text-white transition-colors group"
          >
            <ArrowLeft className="w-4 h-4 group-hover:-translate-x-1 transition-transform" />
            <span>Back to Homepage</span>
          </Link>
          <span className="text-xs text-white/40 font-mono">Zelvoxx Legal System</span>
        </div>
      </div>
    </div>
  );
}
