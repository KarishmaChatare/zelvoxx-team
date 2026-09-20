"use client";

import { motion, type Variants } from "framer-motion";
import Link from "next/link";
import { ArrowRight, Zap, Target, ShieldCheck, Trophy, Rocket, BarChart3, Clock } from "lucide-react";
import { useState, useEffect } from "react";
import TiltCard from "@/src/components/ui/TiltCard";

const getContainerVariants = (isMobile: boolean): Variants => ({
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: {
      staggerChildren: 0,
      delayChildren: 0,
    },
  },
});

const getFadeInUp = (isMobile: boolean): Variants => ({
  hidden: { opacity: 0, y: 30 },
  visible: {
    opacity: 1,
    y: 0,
    transition: { duration: isMobile ? 0.4 : 0.6, ease: [0.22, 1, 0.36, 1] },
  },
});

const getCardVariants = (isMobile: boolean): Variants => ({
  hidden: { opacity: 0, y: 40, scale: 0.95 },
  visible: {
    opacity: 1,
    y: 0,
    scale: 1,
    transition: { duration: isMobile ? 0.4 : 0.5, ease: [0.22, 1, 0.36, 1] },
  },
});

const reasons = [
  {
    icon: Zap,
    title: "Unmatched Speed",
    desc: "We deploy growth systems in weeks, not months. Speed to market is everything.",
    color: "from-[#7C61FF] to-[#8B5CF6]",
    stat: "2-4x",
    statLabel: "Faster Deployment",
  },
  {
    icon: Target,
    title: "Precision Targeting",
    desc: "Every decision is backed by hard data and analytics, eliminating guesswork entirely.",
    color: "from-[#8B5CF6] to-[#A78BFA]",
    stat: "95%",
    statLabel: "Data Accuracy",
  },
  {
    icon: ShieldCheck,
    title: "Battle-Tested Systems",
    desc: "We've spent millions on ads and funnels. We know exactly what works today.",
    color: "from-[#7C61FF] via-[#8B5CF6] to-[#A78BFA]",
    stat: "$2M+",
    statLabel: "Ad Spend Managed",
  },
  {
    icon: BarChart3,
    title: "Revenue Focused",
    desc: "We don't care about vanity metrics. We only optimize for your bottom-line revenue.",
    color: "from-[#A78BFA] to-[#7C61FF]",
    stat: "340%",
    statLabel: "Avg. ROI Increase",
  },
];

const additionalFeatures = [
  { icon: Rocket, text: "Launch-Ready Systems" },
  { icon: Clock, text: "24/7 Support" },
  { icon: Trophy, text: "Proven Track Record" },
];

export default function HomeWhyZelvoxx() {
  // Mobile detection for faster animations
  const [isMobile, setIsMobile] = useState(false);
  useEffect(() => {
    const checkMobile = () => setIsMobile(window.innerWidth < 768);
    checkMobile();
    window.addEventListener('resize', checkMobile, { passive: true });
    return () => window.removeEventListener('resize', checkMobile);
  }, []);

  const containerVariants = getContainerVariants(isMobile);
  const fadeInUp = getFadeInUp(isMobile);
  const cardVariants = getCardVariants(isMobile);

  return (
    <section id="why-zelvoxx" className="relative py-24 lg:py-32 px-4 sm:px-6 lg:px-8 overflow-hidden scroll-mt-20">
      {/* Background Effects */}
      <div className="absolute inset-0 pointer-events-none">
        <div className="absolute inset-0 bg-gradient-to-b from-transparent via-transparent to-transparent" />
        
        {/* Grid Pattern */}
        <div 
          className="absolute inset-0 opacity-[0.03]"
          style={{
            backgroundImage: `linear-gradient(rgba(124, 97, 255, 0.4) 1px, transparent 1px),
                              linear-gradient(90deg, rgba(124, 97, 255, 0.4) 1px, transparent 1px)`,
            backgroundSize: '60px 60px',
          }}
        />

        {/* Glowing Orbs */}
        <motion.div
          className="absolute top-1/2 left-1/4 w-[500px] h-[500px] bg-[#7C61FF]/10 rounded-full blur-[150px]"
          style={{ willChange: "transform", transform: "translateZ(0)" }}
          animate={{
            x: [0, 40, 0],
            y: [0, -30, 0],
            scale: [1, 1.2, 1],
          }}
          transition={{
            duration: 12,
            repeat: Infinity,
            ease: "easeInOut",
          }}
        />
        <motion.div
          className="absolute bottom-0 right-1/4 w-[400px] h-[400px] bg-[#8B5CF6]/10 rounded-full blur-[120px]"
          style={{ willChange: "transform", transform: "translateZ(0)" }}
          animate={{
            x: [0, -30, 0],
            y: [0, 20, 0],
          }}
          transition={{
            duration: 10,
            repeat: Infinity,
            ease: "easeInOut",
            delay: 3,
          }}
        />
      </div>

      <div className="max-w-7xl mx-auto relative">
        <motion.div
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: "-100px" }}
          variants={containerVariants}
        >
          {/* Section Header */}
          <div className="text-center max-w-3xl mx-auto mb-12 sm:mb-16 space-y-3 sm:space-y-4">
            <motion.div
              initial={{ opacity: 0, y: 15 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-[#7C61FF]/10 border border-[#7C61FF]/20"
              whileHover={{ scale: 1.05, backgroundColor: "rgba(124, 97, 255, 0.15)" }}
              transition={{ duration: 0.3 }}
            >
              <Zap className="w-4 h-4 text-[#A78BFA]" />
              <span className="text-sm text-[#A78BFA] font-semibold">Why Choose Us</span>
            </motion.div>

            <motion.h2
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5 }}
              className="text-[1.5rem] sm:text-[1.75rem] md:text-[2rem] lg:text-[2.25rem] xl:text-[2.5rem] font-heading font-bold text-white leading-tight sm:leading-[1.2] tracking-tight"
            >
              The{" "}
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-[#7C61FF] via-[#8B5CF6] to-[#A78BFA] bg-[length:200%_auto] animate-gradient">
                Zelvoxx
              </span>{" "}
              Advantage
            </motion.h2>

            <motion.p
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: 0.1 }}
              className="text-[0.8125rem] sm:text-[0.875rem] md:text-[0.9375rem] font-normal text-gray-400 max-w-2xl mx-auto leading-relaxed"
            >
              We don&apos;t just run campaigns. We architect growth systems that compound over time.
            </motion.p>
          </div>

          {/* Main Cards Grid */}
          <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-6 mb-16">
            {reasons.map((reason, idx) => (
              <TiltCard key={idx} className="h-full">
                <motion.div
                  variants={cardVariants}
                  className="group relative h-full"
                >
                  {/* Gradient Border */}
                  <div className={`absolute -inset-[1px] rounded-2xl bg-gradient-to-r ${reason.color} opacity-0 group-hover:opacity-40 blur-sm transition-opacity duration-500`} />
                  
                  {/* Card */}
                  <div className="relative h-full p-6 lg:p-8 bg-[#12111E]/80 backdrop-blur-sm rounded-2xl border border-white/10 group-hover:border-[#7C61FF]/40 transition-all duration-500 overflow-hidden flex flex-col justify-between">
                    {/* Hover Background */}
                    <div className={`absolute inset-0 bg-gradient-to-br ${reason.color} opacity-0 group-hover:opacity-5 transition-opacity duration-500`} />

                    <div>
                      {/* Icon */}
                      <motion.div
                        className={`w-14 h-14 rounded-xl bg-gradient-to-br ${reason.color} p-0.5 mb-6`}
                        whileHover={{ scale: 1.1, rotate: 5 }}
                        transition={{ type: "spring", stiffness: 400 }}
                      >
                        <div className="w-full h-full rounded-xl bg-[#0F0E18] flex items-center justify-center">
                          <reason.icon className="w-6 h-6 text-white" />
                        </div>
                      </motion.div>

                      {/* Content */}
                      <h3 className="text-xl font-bold text-white mb-3 group-hover:text-[#A78BFA] transition-colors duration-300">
                        {reason.title}
                      </h3>
                      <p className="text-white/50 text-sm leading-relaxed mb-6">
                        {reason.desc}
                      </p>
                    </div>

                    {/* Stat */}
                    <div className="pt-4 border-t border-white/10">
                      <div className={`text-2xl lg:text-3xl font-bold bg-gradient-to-r ${reason.color} bg-clip-text text-transparent`}>
                        {reason.stat}
                      </div>
                      <div className="text-xs text-white/40 mt-1">
                        {reason.statLabel}
                      </div>
                    </div>

                    {/* Corner Accent */}
                    <div className={`absolute top-0 right-0 w-20 h-20 bg-gradient-to-br ${reason.color} opacity-0 group-hover:opacity-15 blur-2xl transition-opacity duration-500`} />
                  </div>
                </motion.div>
              </TiltCard>
            ))}
          </div>

          {/* Additional Features Row */}
          <motion.div
            variants={fadeInUp}
            className="flex flex-wrap items-center justify-center gap-4 lg:gap-8 mb-12"
          >
            {additionalFeatures.map((feature, idx) => (
              <motion.div
                key={idx}
                className="flex items-center gap-3 px-5 py-3 rounded-full bg-white/5 border border-white/10 hover:border-primary/30 hover:bg-white/[0.08] transition-all duration-300 cursor-default"
                whileHover={{ scale: 1.05, y: -2 }}
                transition={{ type: "spring", stiffness: 400 }}
              >
                <feature.icon className="w-5 h-5 text-primary" />
                <span className="text-sm text-white/70 font-medium">{feature.text}</span>
              </motion.div>
            ))}
          </motion.div>

          {/* CTA */}
          <motion.div variants={fadeInUp} className="text-center">
            <Link
              href="/why-Zelvoxx"
              className="group inline-flex items-center gap-3 px-8 py-4 rounded-full bg-primary hover:bg-primary/90 text-white font-semibold transition-all duration-300 hover:scale-105 hover:shadow-[0_0_30px_rgba(123,97,255,0.4)]"
            >
              <span>Discover More Reasons</span>
              <ArrowRight className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
            </Link>
          </motion.div>
        </motion.div>
      </div>
    </section>
  );
}
