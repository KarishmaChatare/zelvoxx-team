"use client";

import { motion, useReducedMotion } from "framer-motion";
import TiltCard from "@/src/components/ui/TiltCard";

function FastExecutionGraphic({ prefersReducedMotion }: { prefersReducedMotion: boolean }) {
  return (
    <svg
      width="400"
      height="240"
      viewBox="0 0 400 240"
      fill="none"
      className="w-full h-auto"
      xmlns="http://www.w3.org/2000/svg"
      aria-label="Fast Execution Growth Sprint Graphic"
    >
      <defs>
        <linearGradient id="cardBg" x1="0" y1="0" x2="400" y2="240" gradientUnits="userSpaceOnUse">
          <stop offset="0%" stopColor="#12111E" />
          <stop offset="100%" stopColor="#09080E" />
        </linearGradient>
        <linearGradient id="purpleGlowLine" x1="0" y1="0" x2="100%" y2="0%">
          <stop offset="0%" stopColor="#7C61FF" />
          <stop offset="100%" stopColor="#A78BFA" />
        </linearGradient>
      </defs>

      <rect width="400" height="240" rx="16" fill="url(#cardBg)" stroke="#7C61FF" strokeOpacity="0.2" />
      
      {/* Subtle Grid */}
      <g opacity="0.05" stroke="#FFFFFF">
        <line x1="20" y1="40" x2="380" y2="40" />
        <line x1="20" y1="100" x2="380" y2="100" />
        <line x1="20" y1="160" x2="380" y2="160" />
        <line x1="20" y1="220" x2="380" y2="220" />
      </g>

      {/* Header pill: RAPID SPRINT */}
      <rect x="24" y="24" width="112" height="24" rx="6" fill="#7C61FF" fillOpacity="0.15" stroke="#7C61FF" strokeOpacity="0.3" />
      <text x="34" y="40" fill="#A78BFA" fontFamily="system-ui, -apple-system, sans-serif" fontWeight="700" fontSize="11">RAPID SPRINT</text>

      {/* Metric: 7-14 Days */}
      <text x="24" y="82" fill="#FFFFFF" fontFamily="system-ui, -apple-system, sans-serif" fontWeight="800" fontSize="24" letterSpacing="-0.5">7-14 Days</text>
      
      {/* Production Ready Badge */}
      <rect x="175" y="64" width="144" height="24" rx="12" fill="#10B981" fillOpacity="0.12" stroke="#10B981" strokeOpacity="0.3" strokeWidth="1" />
      <circle cx="189" cy="76" r="3.5" fill="#34D399" />
      <text x="199" y="80" fill="#34D399" fontFamily="system-ui, -apple-system, sans-serif" fontWeight="600" fontSize="11" letterSpacing="0.2">Production Ready</text>

      {/* Timeline Step Progress Bar: Background Track */}
      <rect x="24" y="115" width="352" height="6" rx="3" fill="#1F1D30" />
      
      {/* Timeline Step Progress Bar: Animated Fill on Scroll */}
      <motion.rect
        x="24"
        y="115"
        height="6"
        rx="3"
        fill="url(#purpleGlowLine)"
        initial={prefersReducedMotion ? { width: 280 } : { width: 0 }}
        whileInView={{ width: 280 }}
        viewport={{ once: true }}
        transition={{ duration: 1.1, delay: 0.25, ease: [0.22, 1, 0.36, 1] }}
      />

      {/* Milestone Nodes */}
      {/* Node 1: Wireframe */}
      <circle cx="50" cy="155" r="14" fill="#1A1829" stroke="#7C61FF" strokeWidth="2" />
      <text x="50" y="159" textAnchor="middle" fill="#A78BFA" fontFamily="system-ui, -apple-system, sans-serif" fontWeight="700" fontSize="10">01</text>
      <text x="50" y="185" textAnchor="middle" fill="#9CA3AF" fontFamily="system-ui, -apple-system, sans-serif" fontSize="10">Wireframe</text>

      {/* Connector 1 */}
      <line x1="70" y1="155" x2="130" y2="155" stroke="#7C61FF" strokeOpacity="0.4" strokeWidth="2" strokeDasharray="2 2" />

      {/* Node 2: Engineered */}
      <circle cx="150" cy="155" r="14" fill="#1A1829" stroke="#7C61FF" strokeWidth="2" />
      <text x="150" y="159" textAnchor="middle" fill="#A78BFA" fontFamily="system-ui, -apple-system, sans-serif" fontWeight="700" fontSize="10">02</text>
      <text x="150" y="185" textAnchor="middle" fill="#9CA3AF" fontFamily="system-ui, -apple-system, sans-serif" fontSize="10">Engineered</text>

      {/* Connector 2 */}
      <line x1="170" y1="155" x2="230" y2="155" stroke="#7C61FF" strokeOpacity="0.4" strokeWidth="2" strokeDasharray="2 2" />

      {/* Node 3: Deployed */}
      <circle cx="250" cy="155" r="16" fill="#7C61FF" fillOpacity="0.25" stroke="#A78BFA" strokeWidth="2" />
      <motion.path
        d="M245 155L249 159L256 151"
        stroke="#34D399"
        strokeWidth="2"
        strokeLinecap="round"
        strokeLinejoin="round"
        initial={prefersReducedMotion ? { pathLength: 1 } : { pathLength: 0 }}
        whileInView={{ pathLength: 1 }}
        viewport={{ once: true }}
        transition={{ duration: 0.5, delay: 0.8, ease: "easeOut" }}
      />
      <text x="250" y="185" textAnchor="middle" fill="#34D399" fontFamily="system-ui, -apple-system, sans-serif" fontWeight="600" fontSize="10">Deployed</text>

      {/* Floating Velocity Tag */}
      <rect x="290" y="140" width="86" height="30" rx="8" fill="#181628" stroke="#34D399" strokeOpacity="0.4" />
      <text x="333" y="159" textAnchor="middle" fill="#34D399" fontFamily="system-ui, -apple-system, sans-serif" fontWeight="700" fontSize="11">⚡ 3x Speed</text>
    </svg>
  );
}

function ClearReportingGraphic({ prefersReducedMotion }: { prefersReducedMotion: boolean }) {
  return (
    <svg
      width="400"
      height="240"
      viewBox="0 0 400 240"
      fill="none"
      className="w-full h-auto"
      xmlns="http://www.w3.org/2000/svg"
      aria-label="Clear Reporting Dashboard Analytics Graphic"
    >
      <defs>
        <linearGradient id="reportBg" x1="0" y1="0" x2="400" y2="240" gradientUnits="userSpaceOnUse">
          <stop offset="0%" stopColor="#12111E" />
          <stop offset="100%" stopColor="#09080E" />
        </linearGradient>
        <linearGradient id="chartGrad" x1="0" y1="0" x2="0" y2="100%">
          <stop offset="0%" stopColor="#7C61FF" stopOpacity="0.35" />
          <stop offset="100%" stopColor="#7C61FF" stopOpacity="0" />
        </linearGradient>
      </defs>

      <rect width="400" height="240" rx="16" fill="url(#reportBg)" stroke="#7C61FF" strokeOpacity="0.2" />

      {/* Top Pill: SINGLE COCKPIT */}
      <rect x="24" y="24" width="120" height="24" rx="6" fill="#8B5CF6" fillOpacity="0.15" stroke="#8B5CF6" strokeOpacity="0.3" />
      <text x="34" y="40" fill="#A78BFA" fontFamily="system-ui, -apple-system, sans-serif" fontWeight="700" fontSize="11">SINGLE COCKPIT</text>

      {/* Metric: $184.2K */}
      <text x="24" y="85" fill="#FFFFFF" fontFamily="system-ui, -apple-system, sans-serif" fontWeight="800" fontSize="28" letterSpacing="-0.5">$184.2K</text>

      {/* +48.6% Monthly Badge */}
      <rect x="175" y="66" width="155" height="24" rx="12" fill="#10B981" fillOpacity="0.12" stroke="#10B981" strokeOpacity="0.3" strokeWidth="1" />
      <text x="252" y="82" textAnchor="middle" fill="#34D399" fontFamily="system-ui, -apple-system, sans-serif" fontWeight="600" fontSize="11" letterSpacing="0.2">▲ +48.6% Monthly</text>

      {/* Area Chart Gradient Fill */}
      <motion.path
        d="M 24 190 L 60 170 L 110 175 L 160 145 L 210 150 L 260 120 L 310 125 L 376 95 L 376 210 L 24 210 Z"
        fill="url(#chartGrad)"
        initial={prefersReducedMotion ? { opacity: 1 } : { opacity: 0 }}
        whileInView={{ opacity: 1 }}
        viewport={{ once: true }}
        transition={{ duration: 0.8, delay: 0.5 }}
      />
      
      {/* Line Stroke with path drawing animation on scroll */}
      <motion.path
        d="M 24 190 L 60 170 L 110 175 L 160 145 L 210 150 L 260 120 L 310 125 L 376 95"
        stroke="#7C61FF"
        strokeWidth="2.5"
        strokeLinecap="round"
        strokeLinejoin="round"
        initial={prefersReducedMotion ? { pathLength: 1 } : { pathLength: 0 }}
        whileInView={{ pathLength: 1 }}
        viewport={{ once: true }}
        transition={{ duration: 1.2, delay: 0.25, ease: [0.22, 1, 0.36, 1] }}
      />

      {/* Peak point highlight */}
      <motion.circle
        cx="376"
        cy="95"
        r="5"
        fill="#A78BFA"
        stroke="#FFFFFF"
        strokeWidth="2"
        initial={prefersReducedMotion ? { scale: 1 } : { scale: 0 }}
        whileInView={{ scale: 1 }}
        viewport={{ once: true }}
        transition={{ duration: 0.35, delay: 1.2, type: "spring", stiffness: 300 }}
      />

      {/* Chart Axis line */}
      <line x1="24" y1="210" x2="376" y2="210" stroke="#FFFFFF" strokeOpacity="0.1" strokeWidth="1" />
      
      {/* Mini KPI Badges below */}
      <g transform="translate(24, 218)">
        <text x="0" y="10" fill="#6B7280" fontFamily="system-ui, -apple-system, sans-serif" fontSize="10">W1</text>
        <text x="80" y="10" fill="#6B7280" fontFamily="system-ui, -apple-system, sans-serif" fontSize="10">W2</text>
        <text x="170" y="10" fill="#6B7280" fontFamily="system-ui, -apple-system, sans-serif" fontSize="10">W3</text>
        <text x="260" y="10" fill="#6B7280" fontFamily="system-ui, -apple-system, sans-serif" fontSize="10">W4</text>
        <text x="340" y="10" fill="#A78BFA" fontFamily="system-ui, -apple-system, sans-serif" fontSize="10" fontWeight="700">NOW</text>
      </g>
    </svg>
  );
}

function CompoundingGainsGraphic({ prefersReducedMotion }: { prefersReducedMotion: boolean }) {
  const bars = [
    { x: 26, y: 176, w: 28, h: 24, fill: "#2E2A4A", label: "M1" },
    { x: 64, y: 160, w: 28, h: 40, fill: "#3D3568", label: "M2" },
    { x: 102, y: 142, w: 28, h: 58, fill: "url(#barGrad1)", label: "M3" },
    { x: 140, y: 122, w: 28, h: 78, fill: "url(#barGrad2)", label: "M4" },
    { x: 178, y: 102, w: 32, h: 98, fill: "url(#barGrad3)", label: "M6" },
  ];

  return (
    <svg
      width="400"
      height="240"
      viewBox="0 0 400 240"
      fill="none"
      className="w-full h-auto"
      xmlns="http://www.w3.org/2000/svg"
      aria-label="Compounding ROI and Growth Chart Graphic"
    >
      <defs>
        <linearGradient id="compBg" x1="0" y1="0" x2="400" y2="240" gradientUnits="userSpaceOnUse">
          <stop offset="0%" stopColor="#12111E" />
          <stop offset="100%" stopColor="#09080E" />
        </linearGradient>
        <linearGradient id="barGrad1" x1="0" y1="0" x2="0" y2="100%">
          <stop offset="0%" stopColor="#7C61FF" />
          <stop offset="100%" stopColor="#4F46E5" />
        </linearGradient>
        <linearGradient id="barGrad2" x1="0" y1="0" x2="0" y2="100%">
          <stop offset="0%" stopColor="#8B5CF6" />
          <stop offset="100%" stopColor="#6D28D9" />
        </linearGradient>
        <linearGradient id="barGrad3" x1="0" y1="0" x2="0" y2="100%">
          <stop offset="0%" stopColor="#A78BFA" />
          <stop offset="100%" stopColor="#7C61FF" />
        </linearGradient>
      </defs>

      <rect width="400" height="240" rx="16" fill="url(#compBg)" stroke="#7C61FF" strokeOpacity="0.2" />

      {/* Top Pill: COMPOUNDING ROI */}
      <rect x="24" y="24" width="128" height="24" rx="6" fill="#A78BFA" fillOpacity="0.15" stroke="#A78BFA" strokeOpacity="0.3" />
      <text x="34" y="40" fill="#A78BFA" fontFamily="system-ui, -apple-system, sans-serif" fontWeight="700" fontSize="11">COMPOUNDING ROI</text>

      {/* Metric: 8.4x Multiplier */}
      <text x="24" y="82" fill="#FFFFFF" fontFamily="system-ui, -apple-system, sans-serif" fontWeight="800" fontSize="22" letterSpacing="-0.5">8.4x Multiplier</text>

      {/* Decreasing CAC Badge */}
      <rect x="195" y="64" width="138" height="24" rx="12" fill="#10B981" fillOpacity="0.12" stroke="#10B981" strokeOpacity="0.3" strokeWidth="1" />
      <text x="264" y="80" textAnchor="middle" fill="#34D399" fontFamily="system-ui, -apple-system, sans-serif" fontWeight="600" fontSize="11">📉 Decreasing CAC</text>

      {/* Ground baseline */}
      <line x1="24" y1="200" x2="376" y2="200" stroke="#FFFFFF" strokeOpacity="0.08" strokeWidth="1" />

      {/* Compounding Bars: Animating upward from baseline y=200 */}
      {bars.map((bar, idx) => {
        const initialProps = prefersReducedMotion
          ? { y: bar.y, height: bar.h }
          : { y: 200, height: 0 };

        return (
          <g key={bar.label}>
            <motion.rect
              x={bar.x}
              width={bar.w}
              rx={5}
              fill={bar.fill}
              initial={initialProps}
              whileInView={{ y: bar.y, height: bar.h }}
              viewport={{ once: true }}
              transition={{
                duration: 0.6,
                delay: 0.2 + idx * 0.1,
                ease: [0.22, 1, 0.36, 1],
              }}
            />
            <text
              x={bar.x + bar.w / 2}
              y={216}
              textAnchor="middle"
              fill={idx === 4 ? "#FFFFFF" : "#6B7280"}
              fontFamily="system-ui, -apple-system, sans-serif"
              fontWeight={idx === 4 ? "700" : "400"}
              fontSize="10"
            >
              {bar.label}
            </text>
          </g>
        );
      })}

      {/* Dotted Exponential Trend Line */}
      <motion.path
        d="M 40 174 Q 116 138 194 100"
        stroke="#FFFFFF"
        strokeWidth="2"
        strokeDasharray="3 3"
        initial={prefersReducedMotion ? { pathLength: 1 } : { pathLength: 0 }}
        whileInView={{ pathLength: 1 }}
        viewport={{ once: true }}
        transition={{ duration: 0.9, delay: 0.65, ease: [0.22, 1, 0.36, 1] }}
      />
      <motion.circle
        cx="194"
        cy="100"
        r="3.5"
        fill="#FFFFFF"
        initial={prefersReducedMotion ? { scale: 1 } : { scale: 0 }}
        whileInView={{ scale: 1 }}
        viewport={{ once: true }}
        transition={{ duration: 0.3, delay: 1.25, type: "spring" }}
      />

      {/* Badge in open right-hand area: +340% Conversion Lift */}
      <motion.g
        initial={prefersReducedMotion ? { opacity: 1 } : { opacity: 0, y: 10 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ duration: 0.5, delay: 0.8 }}
      >
        <rect x="238" y="112" width="138" height="46" rx="10" fill="#181728" stroke="#A78BFA" strokeOpacity="0.4" strokeWidth="1" />
        <text x="307" y="131" textAnchor="middle" fill="#A78BFA" fontFamily="system-ui, -apple-system, sans-serif" fontWeight="800" fontSize="13">+340%</text>
        <text x="307" y="147" textAnchor="middle" fill="#9CA3AF" fontFamily="system-ui, -apple-system, sans-serif" fontWeight="500" fontSize="10">Conversion Lift</text>
      </motion.g>
    </svg>
  );
}

export default function BuiltForGrowth() {
  const prefersReducedMotion = useReducedMotion();

  const pillars = [
    {
      title: "Fast Execution",
      text: "Deploy high-converting pages, targeted campaigns, and acquisition funnels in days—not quarters.",
      graphic: <FastExecutionGraphic prefersReducedMotion={!!prefersReducedMotion} />,
    },
    {
      title: "Clear Reporting",
      text: "Track qualified pipeline, attribution, and real-time revenue across one unified cockpit.",
      graphic: <ClearReportingGraphic prefersReducedMotion={!!prefersReducedMotion} />,
    },
    {
      title: "Compounding Gains",
      text: "Continuous iteration sharpens conversion rates while systematically driving down acquisition costs.",
      graphic: <CompoundingGainsGraphic prefersReducedMotion={!!prefersReducedMotion} />,
    },
  ];

  return (
    <section className="py-20 md:py-28 relative overflow-hidden border-t border-white/5">
      <div className="absolute inset-0 pointer-events-none bg-[radial-gradient(circle_at_20%_20%,rgba(124,97,255,0.14),transparent_42%),radial-gradient(circle_at_85%_70%,rgba(139,92,246,0.1),transparent_45%)]" />
      <div className="max-w-7xl mx-auto px-6 relative z-10">
        
        {/* Section Header */}
        <div className="space-y-3 sm:space-y-4 mb-10 md:mb-14">
          <motion.div
            initial={{ opacity: 0, y: 15 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.4 }}
            className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-[#7C61FF]/10 border border-[#7C61FF]/25 backdrop-blur-sm shadow-[0_0_15px_rgba(124,97,255,0.12)] hover:border-[#A78BFA]/40 transition-colors"
          >
            <span className="relative flex h-2 w-2">
              <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-[#A78BFA] opacity-75" />
              <span className="relative inline-flex rounded-full h-2 w-2 bg-[#7C61FF]" />
            </span>
            <span className="text-xs font-bold tracking-[0.2em] text-[#A78BFA] uppercase">
              Built for Growing Businesses
            </span>
          </motion.div>

          <motion.h2
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, delay: 0.1, ease: [0.22, 1, 0.36, 1] }}
            className="text-[1.5rem] sm:text-[1.75rem] md:text-[2rem] lg:text-[2.25rem] xl:text-[2.5rem] font-heading font-bold text-white leading-tight sm:leading-[1.2] tracking-tight max-w-3xl"
          >
            Engineered systems that convert market attention into{" "}
            <span className="relative inline-block text-transparent bg-clip-text bg-gradient-to-r from-[#7C61FF] via-[#8B5CF6] to-[#A78BFA]">
              predictable revenue.
              <motion.span
                initial={{ scaleX: 0 }}
                whileInView={{ scaleX: 1 }}
                viewport={{ once: true }}
                transition={{ duration: 0.8, delay: 0.35, ease: [0.22, 1, 0.36, 1] }}
                className="absolute left-0 -bottom-1 w-full h-[2px] bg-gradient-to-r from-[#7C61FF] via-[#8B5CF6] to-[#A78BFA] origin-left rounded-full shadow-[0_0_10px_rgba(124,97,255,0.6)]"
              />
            </span>
          </motion.h2>

          <motion.p
            initial={{ opacity: 0, y: 15 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5, delay: 0.2 }}
            className="text-[0.8125rem] sm:text-[0.875rem] md:text-[0.9375rem] font-normal text-gray-400 max-w-2xl leading-relaxed"
          >
            Deploy high-velocity architecture, unified analytics, and compounding conversion loops engineered for scale.
          </motion.p>
        </div>

        {/* 3 Interactive Cards Grid */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {pillars.map((item, idx) => (
            <TiltCard key={item.title} className="h-full">
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: idx * 0.1, duration: 0.5 }}
                whileHover={
                  prefersReducedMotion
                    ? {}
                    : { y: -6, transition: { duration: 0.3, ease: "easeOut" } }
                }
                className="glass-premium rounded-2xl p-6 border border-white/10 hover:border-[#7C61FF]/50 transition-all duration-300 flex flex-col justify-between h-full group bg-gradient-to-b from-[#141322]/85 to-[#0A0912]/85 hover:shadow-[0_16px_40px_rgba(124,97,255,0.18)] cursor-pointer"
              >
                {/* Visual Interactive Illustration Graphic */}
                <div className="w-full mb-6 rounded-xl overflow-hidden border border-white/5 bg-[#0A0912] shadow-inner group-hover:border-[#7C61FF]/40 transition-colors duration-500">
                  {item.graphic}
                </div>

                <div>
                  <h3 className="text-white font-heading font-bold text-lg mb-2 group-hover:text-[#A78BFA] transition-colors duration-300">
                    {item.title}
                  </h3>
                  <p className="text-white/70 text-sm leading-relaxed">{item.text}</p>
                </div>
              </motion.div>
            </TiltCard>
          ))}
        </div>
      </div>
    </section>
  );
}
