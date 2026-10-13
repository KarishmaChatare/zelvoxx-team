"use client";

import { motion, useReducedMotion } from "framer-motion";
import { Sparkles, Layout, Filter, Target, DollarSign, ArrowRight, Zap, CheckCircle2 } from "lucide-react";
import { useState, useEffect, useRef } from "react";

// Stage data preserving exact names, order, and existing site definitions
const stages = [
  {
    num: "01",
    title: "Brand",
    shortDesc: "Identity & Positioning",
    detailDesc: "Architecting premium brand identities that command authority, pricing power, and trust.",
    metric: "Command Premium Authority",
    icon: Sparkles,
    xPct: 10,
    yPct: 74,
    tooltipPlacement: "top", // Opens above node toward spacious center
  },
  {
    num: "02",
    title: "Website",
    shortDesc: "High-Converting Design",
    detailDesc: "Aesthetic interfaces engineered specifically to convert cold traffic into high-value clients.",
    metric: "Sub-Second Speed & Conversion",
    icon: Layout,
    xPct: 30,
    yPct: 60,
    tooltipPlacement: "top", // Opens above node toward spacious center
  },
  {
    num: "03",
    title: "Funnel",
    shortDesc: "Lead Capture System",
    detailDesc: "Strategic customer journeys designed to seamlessly guide users from awareness to checkout.",
    metric: "Automated Lead Qualification",
    icon: Filter,
    xPct: 50,
    yPct: 48,
    tooltipPlacement: "bottom", // Opens below node toward spacious center
  },
  {
    num: "04",
    title: "Ads",
    shortDesc: "Paid Acquisition",
    detailDesc: "Data-driven advertising campaigns that systematically acquire high-value customers at profit.",
    metric: "Profitable Customer Acquisition",
    icon: Target,
    xPct: 70,
    yPct: 34,
    tooltipPlacement: "bottom", // Opens below node toward spacious center
  },
  {
    num: "05",
    title: "Sales",
    shortDesc: "Revenue Optimization",
    detailDesc: "Automated closing sequences, CRM tracking, and compounding revenue acceleration.",
    metric: "Compounding Revenue Engine",
    icon: DollarSign,
    xPct: 90,
    yPct: 20,
    tooltipPlacement: "bottom", // Opens below node toward spacious center
  },
];

// SVG path definitions for the desktop ascending S-curve pipeline (viewBox: 0 0 1000 300)
// P0=(100, 222), P1=(300, 180), P2=(500, 144), P3=(700, 102), P4=(900, 60)
const FULL_PATH =
  "M 100 222 C 200 222, 200 180, 300 180 C 400 180, 400 144, 500 144 C 600 144, 600 102, 700 102 C 800 102, 800 60, 900 60";

const SEGMENT_PATHS = [
  "M 100 222 C 200 222, 200 180, 300 180", // 0 -> 1 (Brand to Website)
  "M 300 180 C 400 180, 400 144, 500 144", // 1 -> 2 (Website to Funnel)
  "M 500 144 C 600 144, 600 102, 700 102", // 2 -> 3 (Funnel to Ads)
  "M 700 102 C 800 102, 800 60, 900 60",   // 3 -> 4 (Ads to Sales)
];

export default function SystemFlow() {
  const sectionRef = useRef<HTMLElement>(null);
  const [isInView, setIsInView] = useState(false);
  const [activeNode, setActiveNode] = useState<number | null>(null);
  const [isMobile, setIsMobile] = useState(false);
  const prefersReduced = useReducedMotion();

  useEffect(() => {
    const checkMobile = () => setIsMobile(window.innerWidth < 768);
    checkMobile();
    window.addEventListener("resize", checkMobile, { passive: true });
    return () => window.removeEventListener("resize", checkMobile);
  }, []);

  useEffect(() => {
    const el = sectionRef.current;
    if (!el || typeof IntersectionObserver === "undefined") return;
    const observer = new IntersectionObserver(
      ([entry]) => {
        setIsInView(entry.isIntersecting);
      },
      { rootMargin: "200px 0px 200px 0px" }
    );
    observer.observe(el);
    return () => observer.disconnect();
  }, []);

  return (
    <section ref={sectionRef} id="system" className="py-16 sm:py-24 lg:py-28 relative overflow-hidden border-y border-white/5 scroll-mt-20">
      {/* Background Ambient Glows */}
      <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_center,_var(--tw-gradient-stops))] from-[#7C61FF]/10 via-transparent to-transparent pointer-events-none" />
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[700px] sm:w-[1000px] h-[350px] sm:h-[500px] bg-[#2D9CDB]/5 blur-[160px] rounded-full pointer-events-none" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        
        {/* Section Header */}
        <div className="text-center max-w-3xl mx-auto mb-10 sm:mb-14 lg:mb-16 space-y-3 sm:space-y-4">
          <motion.div
            initial={prefersReduced ? false : { opacity: 0, y: 15 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="inline-block"
          >
            <span className="text-xs font-bold tracking-[0.25em] text-[#A78BFA] uppercase px-3.5 py-1 rounded-full bg-[#7C61FF]/10 border border-[#7C61FF]/20 backdrop-blur-md">
              Our System
            </span>
          </motion.div>

          <motion.h2
            initial={prefersReduced ? false : { opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5, delay: 0.05 }}
            className="text-[1.75rem] sm:text-[2.25rem] md:text-[2.75rem] lg:text-[3rem] font-heading font-bold text-white leading-tight tracking-tight"
          >
            A proven system that turns brands into{" "}
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-[#7C61FF] via-[#2D9CDB] to-[#A78BFA]">
              revenue machines.
            </span>
          </motion.h2>
        </div>

        {/* ------------------------------------------------------------- */}
        {/* DESKTOP / TABLET FLOW (Option A + B: Ascending Energy Pipeline) */}
        {/* ------------------------------------------------------------- */}
        <div className="hidden md:block">
          <motion.div
            initial={prefersReduced ? false : { opacity: 0, scale: 0.98 }}
            whileInView={{ opacity: 1, scale: 1 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
            className="relative w-full rounded-3xl bg-[#090814]/85 border border-white/10 backdrop-blur-2xl p-6 sm:p-8 lg:p-10 shadow-[0_25px_70px_rgba(0,0,0,0.7)] overflow-visible group/panel"
          >
            {/* Ambient Panel Texture & Circuit Watermark */}
            <div className="absolute inset-0 rounded-3xl overflow-hidden pointer-events-none">
              {/* Tech grid dots */}
              <div 
                className="absolute inset-0 opacity-[0.04]"
                style={{
                  backgroundImage: `radial-gradient(circle at 1px 1px, #FFFFFF 1px, transparent 0)`,
                  backgroundSize: "28px 28px",
                }}
              />
              {/* Soft diagonal circuit traces */}
              <svg className="absolute inset-0 w-full h-full opacity-10" preserveAspectRatio="none">
                <line x1="0" y1="300" x2="1000" y2="0" stroke="url(#bgGridGrad)" strokeWidth="1" strokeDasharray="4 8" />
                <line x1="200" y1="300" x2="1000" y2="100" stroke="url(#bgGridGrad)" strokeWidth="1" strokeDasharray="6 12" />
                <defs>
                  <linearGradient id="bgGridGrad" x1="0%" y1="100%" x2="100%" y2="0%">
                    <stop offset="0%" stopColor="#7C61FF" stopOpacity="0.2" />
                    <stop offset="100%" stopColor="#2D9CDB" stopOpacity="0.6" />
                  </linearGradient>
                </defs>
              </svg>

              {/* Corner Tech Calibration Accents */}
              <div className="absolute top-3 left-3 w-3 h-3 border-t border-l border-white/20" />
              <div className="absolute top-3 right-3 w-3 h-3 border-t border-r border-white/20" />
              <div className="absolute bottom-3 left-3 w-3 h-3 border-b border-l border-white/20" />
              <div className="absolute bottom-3 right-3 w-3 h-3 border-b border-r border-white/20" />

              {/* Ambient Radial Glows */}
              <div className="absolute -top-32 right-12 w-96 h-96 bg-[#7C61FF]/15 blur-[120px] rounded-full" />
              <div className="absolute -bottom-32 left-12 w-96 h-96 bg-[#2D9CDB]/10 blur-[120px] rounded-full" />
            </div>

            {/* System Status Micro-Badge */}
            <div className="flex items-center justify-between mb-2 relative z-10 text-[11px] font-mono tracking-widest uppercase text-white/40">
              <span className="flex items-center gap-2">
                <span className="w-1.5 h-1.5 rounded-full bg-emerald-400 animate-pulse shadow-[0_0_8px_#34D399]" />
                System Pipeline Active
              </span>
              <span className="text-[#A78BFA]/70">5 Connected Stages • Ascending Growth Wave</span>
            </div>

            {/* Stage Diagram Container (Aspect Ratio 1000 x 300) */}
            <div className="relative w-full h-[380px] lg:h-[420px] select-none">
              
              {/* SVG Curved Pipeline Track */}
              <svg
                viewBox="0 0 1000 300"
                className="absolute inset-0 w-full h-full overflow-visible pointer-events-none z-10"
                preserveAspectRatio="none"
              >
                <defs>
                  {/* Pipeline Color Gradient */}
                  <linearGradient id="pipelineGrad" x1="0%" y1="100%" x2="100%" y2="0%">
                    <stop offset="0%" stopColor="#7C61FF" stopOpacity="0.9" />
                    <stop offset="45%" stopColor="#2D9CDB" stopOpacity="0.95" />
                    <stop offset="85%" stopColor="#8B5CF6" stopOpacity="1" />
                    <stop offset="100%" stopColor="#A78BFA" stopOpacity="1" />
                  </linearGradient>

                  {/* Active Hover Highlight Gradient */}
                  <linearGradient id="activeSegmentGrad" x1="0%" y1="0%" x2="100%" y2="0%">
                    <stop offset="0%" stopColor="#FFFFFF" stopOpacity="0.9" />
                    <stop offset="50%" stopColor="#38BDF8" stopOpacity="1" />
                    <stop offset="100%" stopColor="#A78BFA" stopOpacity="1" />
                  </linearGradient>

                  {/* Glow Filter for Traveling Pulses */}
                  <filter id="laserGlow" x="-50%" y="-50%" width="200%" height="200%">
                    <feGaussianBlur in="SourceGraphic" stdDeviation="4" result="blur" />
                    <feMerge>
                      <feMergeNode in="blur" />
                      <feMergeNode in="SourceGraphic" />
                    </feMerge>
                  </filter>
                </defs>

                {/* 1. Underlying Base Rail (Subtle dashed track) */}
                <path
                  d={FULL_PATH}
                  fill="none"
                  stroke="rgba(255, 255, 255, 0.08)"
                  strokeWidth="6"
                  strokeLinecap="round"
                />
                <path
                  d={FULL_PATH}
                  fill="none"
                  stroke="rgba(255, 255, 255, 0.15)"
                  strokeWidth="2"
                  strokeDasharray="6 8"
                  strokeLinecap="round"
                />

                {/* 2. Soft Ambient Path Glow */}
                <path
                  d={FULL_PATH}
                  fill="none"
                  stroke="url(#pipelineGrad)"
                  strokeWidth="10"
                  strokeLinecap="round"
                  opacity="0.3"
                  className="blur-[6px]"
                />

                {/* 3. Main Drawn Energy Circuit Path */}
                <motion.path
                  d={FULL_PATH}
                  fill="none"
                  stroke="url(#pipelineGrad)"
                  strokeWidth="3.5"
                  strokeLinecap="round"
                  initial={prefersReduced ? { pathLength: 1 } : { pathLength: 0 }}
                  whileInView={{ pathLength: 1 }}
                  viewport={{ once: true }}
                  transition={{ duration: 1.4, ease: [0.16, 1, 0.3, 1] }}
                />

                {/* 4. Interactive Connected Path Segment Brightening on Hover */}
                {activeNode !== null && (
                  <>
                    {activeNode > 0 && (
                      <path
                        d={SEGMENT_PATHS[activeNode - 1]}
                        fill="none"
                        stroke="url(#activeSegmentGrad)"
                        strokeWidth="5"
                        strokeLinecap="round"
                        className="transition-all duration-300 filter drop-shadow-[0_0_12px_rgba(56,189,248,0.9)]"
                      />
                    )}
                    {activeNode < 4 && (
                      <path
                        d={SEGMENT_PATHS[activeNode]}
                        fill="none"
                        stroke="url(#activeSegmentGrad)"
                        strokeWidth="5"
                        strokeLinecap="round"
                        className="transition-all duration-300 filter drop-shadow-[0_0_12px_rgba(167,139,250,0.9)]"
                      />
                    )}
                  </>
                )}

                {/* 5. Traveling Energetic Pulses of Light (Circuit in Motion, gated by viewport) */}
                {!prefersReduced && isInView && (
                  <>
                    {/* Primary Traveling Comet Pulse */}
                    <g filter="url(#laserGlow)">
                      <animateMotion
                        dur="3.6s"
                        repeatCount="indefinite"
                        path={FULL_PATH}
                      />
                      <circle r="7" fill="#38BDF8" opacity="0.4" />
                      <circle r="4" fill="#FFFFFF" />
                      <circle r="2" fill="#E0F2FE" />
                    </g>

                    {/* Secondary Staggered Traveling Pulse */}
                    <g filter="url(#laserGlow)">
                      <animateMotion
                        dur="3.6s"
                        begin="1.8s"
                        repeatCount="indefinite"
                        path={FULL_PATH}
                      />
                      <circle r="7" fill="#A78BFA" opacity="0.4" />
                      <circle r="4" fill="#FFFFFF" />
                      <circle r="2" fill="#F5F3FF" />
                    </g>
                  </>
                )}
              </svg>

              {/* ------------------------------------------------------------- */}
              {/* FIVE INTERACTIVE NODES (Ascending Along S-Curve Rail) */}
              {/* ------------------------------------------------------------- */}
              {stages.map((stage, idx) => {
                const Icon = stage.icon;
                const isHovered = activeNode === idx;
                const isSales = idx === 4;

                return (
                  <div
                    key={stage.title}
                    id={`stage-node-${idx}`}
                    style={{ left: `${stage.xPct}%`, top: `${stage.yPct}%` }}
                    className="absolute -translate-x-1/2 -translate-y-1/2 z-20 flex flex-col items-center"
                    onMouseEnter={() => setActiveNode(idx)}
                    onMouseLeave={() => setActiveNode(null)}
                    onClick={() => setActiveNode(activeNode === idx ? null : idx)}
                  >
                    {/* Node Entrance Motion */}
                    <motion.div
                      initial={prefersReduced ? false : { opacity: 0, scale: 0.5, y: 15 }}
                      whileInView={{ opacity: 1, scale: 1, y: 0 }}
                      viewport={{ once: true }}
                      transition={{ delay: prefersReduced ? 0 : 0.4 + idx * 0.14, duration: 0.5, ease: "easeOut" }}
                      className="relative flex flex-col items-center cursor-pointer group"
                    >
                      {/* Pulse Ring Behind Node */}
                      <div
                        className={`absolute -inset-3 rounded-full transition-all duration-500 pointer-events-none ${
                          isHovered
                            ? "bg-[#7C61FF]/30 scale-125 blur-md"
                            : isSales
                            ? "bg-[#2D9CDB]/20 scale-110 blur-sm"
                            : "bg-[#7C61FF]/10 scale-95"
                        }`}
                      />

                      {/* Sales Node (Option B Hybrid): Thin Orbiting Rings Payoff */}
                      {isSales && (
                        <div
                          className="absolute -inset-4 rounded-full border border-dashed border-[#A78BFA]/50 animate-spin-slow pointer-events-none"
                          style={{ animationDuration: "14s" }}
                        >
                          <span className="absolute top-0 left-1/2 -translate-x-1/2 -translate-y-1/2 w-2 h-2 rounded-full bg-[#38BDF8] shadow-[0_0_10px_#38BDF8]" />
                        </div>
                      )}

                      {/* Stage Index Chip (01..05) */}
                      <span
                        className={`absolute -top-3.5 px-2 py-0.5 rounded-full text-[9px] font-mono font-bold tracking-widest border transition-all duration-300 z-30 ${
                          isHovered
                            ? "bg-[#7C61FF] text-white border-white/40 shadow-[0_0_12px_rgba(124,97,255,0.8)]"
                            : isSales
                            ? "bg-[#0E0D1C] text-[#38BDF8] border-[#38BDF8]/40 shadow-[0_0_8px_rgba(56,189,248,0.3)]"
                            : "bg-[#0E0D1A] text-white/50 border-white/10"
                        }`}
                      >
                        {stage.num}
                      </span>

                      {/* Main Node Disc */}
                      <motion.div
                        animate={{
                          scale: isHovered ? 1.14 : 1,
                        }}
                        transition={{ type: "spring", stiffness: 350, damping: 20 }}
                        className={`relative w-16 h-16 lg:w-20 lg:h-20 rounded-2xl flex items-center justify-center transition-all duration-300 shadow-[0_10px_30px_rgba(0,0,0,0.6)] ${
                          isHovered
                            ? "bg-gradient-to-br from-[#14122A] via-[#0A0916] to-[#060610] border-2 border-[#7C61FF] shadow-[0_0_35px_rgba(124,97,255,0.6)]"
                            : isSales
                            ? "bg-gradient-to-br from-[#171A32] via-[#0F1122] to-[#080913] border-2 border-[#2D9CDB]/60 hover:border-[#38BDF8]"
                            : "bg-gradient-to-br from-[#0D0B1A] to-[#060610] border border-white/15 hover:border-[#7C61FF]/60"
                        }`}
                      >
                        {/* Inner Glowing Core */}
                        <div
                          className={`absolute inset-0 rounded-2xl transition-opacity duration-300 ${
                            isHovered
                              ? "bg-gradient-to-br from-[#7C61FF]/25 to-[#2D9CDB]/20 opacity-100"
                              : "opacity-0"
                          }`}
                        />

                        {/* Node Icon */}
                        <Icon
                          className={`w-6 h-6 lg:w-7 lg:h-7 relative z-10 transition-all duration-300 ${
                            isHovered
                              ? "text-white scale-110 drop-shadow-[0_0_10px_rgba(255,255,255,0.8)]"
                              : isSales
                              ? "text-[#38BDF8] drop-shadow-[0_0_8px_rgba(56,189,248,0.6)]"
                              : "text-white/80 group-hover:text-[#A78BFA]"
                          }`}
                        />

                        {/* Bottom Anchor Pip */}
                        <div
                          className={`absolute -bottom-1 w-2 h-2 rounded-full transition-all duration-300 ${
                            isHovered
                              ? "bg-[#38BDF8] shadow-[0_0_10px_#38BDF8] scale-125"
                              : isSales
                              ? "bg-[#2D9CDB] shadow-[0_0_6px_#2D9CDB]"
                              : "bg-white/20"
                          }`}
                        />
                      </motion.div>

                      {/* Stage Name & Role Subtitle Under Node */}
                      <div className="mt-3 text-center pointer-events-none">
                        <p
                          className={`text-sm lg:text-base font-heading font-bold tracking-wide transition-colors duration-300 ${
                            isHovered
                              ? "text-white drop-shadow-[0_0_10px_rgba(124,97,255,0.6)]"
                              : isSales
                              ? "text-[#A78BFA]"
                              : "text-white/80"
                          }`}
                        >
                          {stage.title}
                        </p>
                        <p className="text-[11px] font-body text-white/40 tracking-normal mt-0.5 whitespace-nowrap">
                          {stage.shortDesc}
                        </p>
                      </div>

                      {/* Interactive Floating Tooltip Card (Appears on Hover/Tap) */}
                      <motion.div
                        initial={false}
                        animate={{
                          opacity: isHovered ? 1 : 0,
                          y: isHovered ? 0 : stage.tooltipPlacement === "top" ? -8 : 8,
                          scale: isHovered ? 1 : 0.94,
                          pointerEvents: isHovered ? "auto" : "none",
                        }}
                        transition={{ duration: 0.22, ease: "easeOut" }}
                        className={`absolute w-64 lg:w-72 p-3.5 rounded-xl bg-[#0F0E1D]/95 border border-[#7C61FF]/40 backdrop-blur-xl shadow-[0_15px_40px_rgba(0,0,0,0.8)] z-50 text-left pointer-events-none ${
                          stage.tooltipPlacement === "top"
                            ? "bottom-[calc(100%+14px)]"
                            : "top-[calc(100%+14px)]"
                        } ${
                          idx === 0
                            ? "left-0"
                            : idx === 4
                            ? "right-0"
                            : "left-1/2 -translate-x-1/2"
                        }`}
                      >
                        <div className="flex items-center justify-between gap-2 mb-1.5 pb-1.5 border-b border-white/10">
                          <span className="text-[10px] font-mono font-bold tracking-widest text-[#38BDF8] uppercase">
                            Stage {stage.num} Output
                          </span>
                          <span className="flex items-center gap-1 text-[9px] font-mono text-[#A78BFA]">
                            <Zap className="w-2.5 h-2.5 text-[#38BDF8]" />
                            Optimized
                          </span>
                        </div>
                        <p className="text-xs text-white/90 leading-relaxed font-body">
                          {stage.detailDesc}
                        </p>
                        <div className="mt-2.5 pt-2 border-t border-white/5 flex items-center gap-1.5 text-[10px] font-mono text-[#38BDF8]">
                          <CheckCircle2 className="w-3 h-3 text-[#38BDF8] shrink-0" />
                          <span className="truncate">{stage.metric}</span>
                        </div>
                      </motion.div>
                    </motion.div>
                  </div>
                );
              })}
            </div>

            {/* Bottom Status Feed */}
            <div className="mt-4 pt-4 border-t border-white/10 flex flex-wrap items-center justify-between gap-4 text-xs font-body text-white/50">
              <div className="flex items-center gap-2">
                <span className="inline-block w-2 h-2 rounded-full bg-[#7C61FF]" />
                <span>Hover or tap any stage to inspect output details and connected flow.</span>
              </div>
              <div className="flex items-center gap-4 text-[11px] font-mono text-white/40">
                <span>01 BRAND</span>
                <ArrowRight className="w-3 h-3 text-[#7C61FF]" />
                <span>02 WEB</span>
                <ArrowRight className="w-3 h-3 text-[#2D9CDB]" />
                <span>03 FUNNEL</span>
                <ArrowRight className="w-3 h-3 text-[#8B5CF6]" />
                <span>04 ADS</span>
                <ArrowRight className="w-3 h-3 text-[#A78BFA]" />
                <span className="text-[#38BDF8] font-bold">05 SALES</span>
              </div>
            </div>
          </motion.div>
        </div>

        {/* ------------------------------------------------------------- */}
        {/* MOBILE FLOW (Vertical Connected Circuit Pipeline with Energy) */}
        {/* ------------------------------------------------------------- */}
        <div className="block md:hidden">
          <motion.div
            initial={prefersReduced ? false : { opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5 }}
            className="relative w-full rounded-2xl bg-[#090814]/90 border border-white/10 backdrop-blur-xl p-5 shadow-2xl overflow-hidden"
          >
            {/* System Status Pill */}
            <div className="flex items-center justify-between mb-6 pb-3 border-b border-white/10 text-[10px] font-mono uppercase tracking-widest text-white/50">
              <span className="flex items-center gap-2">
                <span className="w-1.5 h-1.5 rounded-full bg-emerald-400 animate-pulse" />
                Pipeline Active
              </span>
              <span className="text-[#A78BFA]">5 Stages Flow</span>
            </div>

            {/* Vertical Flow Track & Cards */}
            <div className="relative pl-12 space-y-6">
              
              {/* Vertical Circuit Line */}
              <div className="absolute top-4 bottom-4 left-5 w-0.5 bg-gradient-to-b from-[#7C61FF] via-[#2D9CDB] to-[#A78BFA]">
                {/* Moving Pulse down the rail (gated by viewport) */}
                {!prefersReduced && isInView && (
                  <motion.div
                    animate={{ y: ["0%", "1000%"] }}
                    transition={{ duration: 4, repeat: Infinity, ease: "linear" }}
                    className="w-2 h-2 -left-[3px] absolute rounded-full bg-white shadow-[0_0_10px_#38BDF8]"
                  />
                )}
              </div>

              {stages.map((stage, idx) => {
                const Icon = stage.icon;
                const isSales = idx === 4;
                const isSelected = activeNode === idx;

                return (
                  <div key={stage.title} className="relative">
                    {/* Node Pip on the vertical track */}
                    <div
                      className={`absolute -left-12 top-3 w-8 h-8 rounded-xl flex items-center justify-center border transition-all duration-300 z-10 ${
                        isSelected
                          ? "bg-[#7C61FF] text-white border-white shadow-[0_0_15px_rgba(124,97,255,0.8)] scale-110"
                          : isSales
                          ? "bg-[#0E1022] text-[#38BDF8] border-[#38BDF8]/60 shadow-[0_0_10px_rgba(56,189,248,0.4)]"
                          : "bg-[#0D0C18] text-white/70 border-white/15"
                      }`}
                    >
                      <Icon className="w-4 h-4" />
                    </div>

                    {/* Stage Card */}
                    <div
                      onClick={() => setActiveNode(isSelected ? null : idx)}
                      className={`p-4 rounded-xl border transition-all duration-300 touch-manipulation cursor-pointer ${
                        isSelected
                          ? "bg-[#141226] border-[#7C61FF] shadow-[0_0_20px_rgba(124,97,255,0.3)]"
                          : isSales
                          ? "bg-[#0D0F1E] border-[#2D9CDB]/40"
                          : "bg-white/[0.02] border-white/10 hover:border-white/20"
                      }`}
                    >
                      <div className="flex items-center justify-between gap-2">
                        <div className="flex items-center gap-2">
                          <span className="text-[10px] font-mono text-[#A78BFA] font-bold">
                            {stage.num}
                          </span>
                          <p className="font-heading font-bold text-white text-base">
                            {stage.title}
                          </p>
                        </div>
                        <span className="text-[10px] font-mono text-white/40 uppercase">
                          {stage.shortDesc}
                        </span>
                      </div>

                      <p className="text-xs text-white/70 mt-2 leading-relaxed font-body">
                        {stage.detailDesc}
                      </p>

                      <div className="mt-3 pt-2 border-t border-white/5 flex items-center gap-1.5 text-[11px] font-mono text-[#38BDF8]">
                        <CheckCircle2 className="w-3 h-3 text-[#38BDF8] shrink-0" />
                        <span>{stage.metric}</span>
                      </div>
                    </div>
                  </div>
                );
              })}
            </div>
          </motion.div>
        </div>

        {/* ------------------------------------------------------------- */}
        {/* CLOSING CAPTION (Directly beneath the diagram) */}
        {/* ------------------------------------------------------------- */}
        <motion.div
          initial={prefersReduced ? false : { opacity: 0, y: 15 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5, delay: 0.15 }}
          className="mt-8 sm:mt-12 text-center"
        >
          <div className="inline-flex items-center gap-3 px-4 py-2 rounded-full bg-white/[0.02] border border-white/5">
            <span className="w-1.5 h-1.5 rounded-full bg-[#7C61FF] shadow-[0_0_8px_#7C61FF]" />
            <p className="text-xs sm:text-sm md:text-base text-gray-400 font-normal tracking-wide">
              Everything connected. Everything optimized. Everything built for growth.
            </p>
            <span className="w-1.5 h-1.5 rounded-full bg-[#2D9CDB] shadow-[0_0_8px_#2D9CDB]" />
          </div>
        </motion.div>

      </div>
    </section>
  );
}