"use client";

import { motion } from "framer-motion";
import { Sparkles, Layout, Filter, Target, DollarSign } from "lucide-react";
import { useState, useEffect } from "react";

const steps = [
  { icon: Sparkles, title: "Brand", desc: "Identity & Positioning" },
  { icon: Layout, title: "Website", desc: "High-Converting Design" },
  { icon: Filter, title: "Funnel", desc: "Lead Capture System" },
  { icon: Target, title: "Ads", desc: "Paid Acquisition" },
  { icon: DollarSign, title: "Sales", desc: "Revenue Optimization" },
];

export default function SystemFlow() {
  const [hoveredNode, setHoveredNode] = useState<number | null>(null);

  // Mobile detection for faster animations
  const [isMobile, setIsMobile] = useState(false);
  useEffect(() => {
    const checkMobile = () => setIsMobile(window.innerWidth < 768);
    checkMobile();
    window.addEventListener('resize', checkMobile, { passive: true });
    return () => window.removeEventListener('resize', checkMobile);
  }, []);

  return (
    <section id="system" className="py-32 md:py-44 relative overflow-hidden border-y border-white/5">
      
      {/* Background Glow with animated pulse */}
      <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_center,_var(--tw-gradient-stops))] from-primary/8 via-transparent to-transparent pointer-events-none" />
      
      {/* Subtle animated gradient orbs */}
      <motion.div
        animate={{ opacity: [0.3, 0.5, 0.3], scale: [1, 1.1, 1] }}
        transition={{ duration: 8, repeat: Infinity, ease: "easeInOut" }}
        className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[800px] h-[400px] bg-primary/10 blur-[150px] rounded-full pointer-events-none"
      />

      <div className="max-w-7xl mx-auto px-6 relative z-10">
        <div className="grid grid-cols-1 lg:grid-cols-[1fr_2.3fr] gap-10 sm:gap-14 lg:gap-24 items-center">
          
          {/* LEFT */}
          <div className="space-y-3 sm:space-y-4 text-center lg:text-left">
            <motion.div 
              initial={{ opacity: 0, y: 15 }} 
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              className="inline-block"
            >
              <span className="text-xs font-bold tracking-[0.2em] text-[#A78BFA] uppercase">
                Our System
              </span>
            </motion.div>

            <motion.h2
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5 }}
              className="text-[1.5rem] sm:text-[1.75rem] md:text-[2rem] lg:text-[2.25rem] xl:text-[2.5rem] font-heading font-bold text-white leading-tight sm:leading-[1.2] tracking-tight"
            >
              A proven system that turns brands into <br className="hidden lg:block" />
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-[#7C61FF] via-[#8B5CF6] to-[#A78BFA]">
                revenue machines.
              </span>
            </motion.h2>

            <motion.p
              initial={{ opacity: 0, y: 15 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: 0.1 }}
              className="text-[0.8125rem] sm:text-[0.875rem] md:text-[0.9375rem] text-gray-400 font-normal leading-relaxed max-w-md mx-auto lg:mx-0"
            >
              Everything connected. Everything optimized. Everything built for growth.
            </motion.p>
          </div>

          {/* RIGHT FLOW */}
          <motion.div
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: true }}
            transition={{ duration: isMobile ? 0.4 : 0.8, delay: 0 }}
            className="relative w-full overflow-visible"
          >
            {/* Desktop Horizontal Flow */}
            <div className="hidden md:flex w-full max-w-full justify-between items-center relative">

              {/* Connecting Line Container */}
              <div className="absolute top-1/2 left-[12%] right-[12%] h-10 -translate-y-1/2 z-0">
                {/* Base line - subtle dashed */}
                <svg width="100%" height="100%" preserveAspectRatio="none" className="overflow-visible">
                  <path
                    d="M 0,20 L 100%,20"
                    fill="none"
                    stroke="rgba(255,255,255,0.06)"
                    strokeWidth="2"
                    strokeDasharray="8 6"
                  />
                  
                  {/* Animated glowing flow line */}
                  <motion.path
                    d="M 0,20 L 100%,20"
                    fill="none"
                    stroke="url(#flowGradient)"
                    strokeWidth="2"
                    strokeLinecap="round"
                    initial={{ pathLength: 0 }}
                    whileInView={{ pathLength: 1 }}
                    viewport={{ once: true }}
                    transition={{ duration: 2, delay: 0.5, ease: "easeOut" }}
                  />
                  
                  {/* Pulsing animated dots moving left to right (GPU-accelerated transform) */}
                  <motion.g
                    style={{ willChange: "transform" }}
                    animate={{ x: ["0%", "100%"] }}
                    transition={{ duration: 4, repeat: Infinity, ease: "linear" }}
                  >
                    <circle
                      cx="0"
                      cy="20"
                      r="5"
                      fill="#7C61FF"
                      style={{ 
                        filter: "drop-shadow(0 0 10px rgba(124,97,255,0.8))",
                      }}
                    />
                  </motion.g>
                  <motion.g
                    style={{ willChange: "transform" }}
                    animate={{ x: ["0%", "100%"] }}
                    transition={{ duration: 4, repeat: Infinity, ease: "linear", delay: 1.3 }}
                  >
                    <circle
                      cx="0"
                      cy="20"
                      r="4"
                      fill="#8B5CF6"
                      style={{ 
                        filter: "drop-shadow(0 0 8px rgba(139,92,246,0.7))",
                        opacity: 0.85,
                      }}
                    />
                  </motion.g>
                  <motion.g
                    style={{ willChange: "transform" }}
                    animate={{ x: ["0%", "100%"] }}
                    transition={{ duration: 4, repeat: Infinity, ease: "linear", delay: 2.6 }}
                  >
                    <circle
                      cx="0"
                      cy="20"
                      r="3.5"
                      fill="#A78BFA"
                      style={{ 
                        filter: "drop-shadow(0 0 8px rgba(167,139,250,0.6))",
                        opacity: 0.75,
                      }}
                    />
                  </motion.g>
                  
                  <defs>
                    <linearGradient id="flowGradient" x1="0%" y1="0%" x2="100%" y2="0%">
                      <stop offset="0%" stopColor="#7C61FF" stopOpacity="0.8" />
                      <stop offset="50%" stopColor="#8B5CF6" stopOpacity="1" />
                      <stop offset="100%" stopColor="#A78BFA" stopOpacity="0.8" />
                    </linearGradient>
                  </defs>
                </svg>
              </div>

              {/* NODES */}
              {steps.map((step, idx) => {
                const Icon = step.icon;
                const isHovered = hoveredNode === idx;
                
                return (
                  <motion.div 
                    key={idx} 
                    className="flex flex-col items-center relative z-10 mx-1 sm:mx-1.5 md:mx-2 lg:mx-4 flex-1 min-w-0"
                    onMouseEnter={() => setHoveredNode(idx)}
                    onMouseLeave={() => setHoveredNode(null)}
                  >
                    {/* Pulse ring animation - positioned relative to node */}
                    <motion.div
                      animate={{ 
                        scale: [1, 1.8], 
                        opacity: isHovered ? [0.6, 0] : [0.4, 0],
                      }}
                      transition={{ 
                        duration: isHovered ? 0.8 : 2, 
                        repeat: Infinity,
                        delay: idx * 0.2,
                      }}
                      className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-16 h-16 sm:w-20 sm:h-20 md:w-20 md:h-20 lg:w-24 lg:h-24 rounded-full bg-primary/30 pointer-events-none"
                    />
                    
                    {/* Outer glow ring */}
                    <motion.div
                      animate={{ 
                        opacity: isHovered ? 1 : 0,
                        scale: isHovered ? 1.1 : 1,
                      }}
                      transition={{ duration: 0.3 }}
                      className="absolute -inset-2 rounded-full border-2 border-primary/50"
                      style={{ 
                        boxShadow: "0 0 30px rgba(123,97,255,0.4), inset 0 0 20px rgba(123,97,255,0.1)",
                      }}
                    />
                    
                    <motion.div
                      initial={{ opacity: 0, scale: 0.8, y: 20 }}
                      whileInView={{ opacity: 1, scale: 1, y: 0 }}
                      viewport={{ once: true }}
                      transition={{ delay: idx * 0.15, duration: 0.5 }}
                      whileHover={{ scale: 1.08 }}
                      className="relative w-16 h-16 sm:w-20 sm:h-20 md:w-20 md:h-20 lg:w-24 lg:h-24 rounded-full bg-gradient-to-b from-[#14141c] to-[#0a0a0f] flex items-center justify-center shadow-[0_8px_32px_rgba(0,0,0,0.5)] border border-white/10 hover:border-primary/60 cursor-pointer transition-all duration-500 group"
                    >
                      {/* Inner gradient shimmer */}
                      <div className="absolute inset-0 rounded-full bg-gradient-to-br from-primary/0 to-accent/0 group-hover:from-primary/10 group-hover:to-accent/5 transition-all duration-500" />
                      
                      {/* Icon */}
                      <div className="relative z-10 text-white/70 group-hover:text-primary transition-colors duration-300">
                        <Icon className={`w-6 h-6 transition-all duration-300 ${isHovered ? 'scale-110' : ''}`} />
                      </div>
                      
                      {/* Node connection dot */}
                      <div className="absolute bottom-1 w-2 h-2 rounded-full bg-primary/50 group-hover:bg-primary group-hover:shadow-[0_0_10px_rgba(123,97,255,0.8)] transition-all duration-300" />
                    </motion.div>

                    {/* Title with hover highlight */}
                    <motion.p 
                      animate={{ 
                        y: isHovered ? -2 : 0,
                        color: isHovered ? "rgba(255,255,255,1)" : "rgba(255,255,255,0.6)",
                      }}
                      transition={{ duration: 0.3 }}
                      className="mt-4 text-sm font-bold tracking-wide"
                    >
                      {step.title}
                    </motion.p>
                    
                    {/* Description on hover */}
                    <motion.p
                      initial={{ opacity: 0, y: 5 }}
                      animate={{ 
                        opacity: isHovered ? 1 : 0,
                        y: isHovered ? 0 : 5,
                      }}
                      transition={{ duration: 0.3 }}
                      className="text-xs text-primary/80 mt-1 font-medium"
                    >
                      {step.desc}
                    </motion.p>
                  </motion.div>
                );
              })}

            </div>

            {/* Mobile Vertical Flow */}
            <div className="flex md:hidden flex-col gap-6 relative">
              {steps.map((step, idx) => {
                const Icon = step.icon;
                return (
                  <motion.div
                    key={idx}
                    initial={{ opacity: 0, x: -30 }}
                    whileInView={{ opacity: 1, x: 0 }}
                    viewport={{ once: true }}
                    transition={{ delay: 0, duration: 0.3 }}
                    className="flex items-center gap-4 p-4 rounded-2xl bg-gradient-to-r from-white/[0.03] to-transparent border border-white/10 touch-manipulation"
                  >
                    <div className="w-12 h-12 rounded-full bg-gradient-to-b from-[#14141c] to-[#0a0a0f] flex items-center justify-center shadow-[0_4px_20px_rgba(0,0,0,0.5)] border border-white/10 shrink-0">
                      <Icon className="w-5 h-5 text-primary" />
                    </div>
                    <div className="flex-1 min-w-0">
                      <p className="text-white font-bold text-sm">{step.title}</p>
                      <p className="text-white/50 text-xs">{step.desc}</p>
                    </div>
                    <div className="text-lg font-black text-white/10">{String(idx + 1).padStart(2, '0')}</div>
                  </motion.div>
                );
              })}
            </div>

          </motion.div>

         </div>
       </div>
     </section>
   );
 }