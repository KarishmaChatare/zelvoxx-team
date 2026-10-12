"use client";

import React from "react";
import Link from "next/link";
import { motion } from "framer-motion";
import { Check, ArrowRight, Sparkles, Wifi } from "lucide-react";
import { pushToDataLayer } from "@/src/lib/analytics";

export interface PhonePricingPlan {
  _id?: string;
  name: string;
  price: string;
  priceNote?: string;
  description: string;
  features: string[];
  highlighted?: boolean;
  popular?: boolean;
  cta: string;
  ctaLink?: string;
  tierNumber: string;
  tagline: string;
}

interface PhonePricingMockupProps {
  plan: PhonePricingPlan;
  position: "left" | "center" | "right";
  isMobile?: boolean;
}

export default function PhonePricingMockup({
  plan,
  position,
  isMobile = false,
}: PhonePricingMockupProps) {
  const isCenter = position === "center";
  const isLeft = position === "left";
  const isRight = position === "right";

  // Position-based 3D transform on desktop
  const desktopTransform = isCenter
    ? "lg:-translate-y-4 lg:scale-[1.04] z-20"
    : isLeft
    ? "lg:translate-y-2 lg:scale-[0.98] [transform:perspective(1200px)_rotateY(7deg)_rotateZ(-1.5deg)] hover:[transform:perspective(1200px)_rotateY(2deg)_translateY(-8px)_scale(1.01)] z-10"
    : "lg:translate-y-2 lg:scale-[0.98] [transform:perspective(1200px)_rotateY(-7deg)_rotateZ(1.5deg)] hover:[transform:perspective(1200px)_rotateY(-2deg)_translateY(-8px)_scale(1.01)] z-10";

  const shadowClass = isCenter
    ? "shadow-[0_25px_60px_-10px_rgba(0,0,0,0.9),0_0_50px_rgba(124,97,255,0.35)]"
    : "shadow-[0_20px_50px_-10px_rgba(0,0,0,0.85),0_0_35px_rgba(124,97,255,0.18)]";

  return (
    <motion.div
      initial={{ opacity: 0, y: isCenter ? 30 : 50 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-40px" }}
      transition={{
        duration: isMobile ? 0.4 : 0.7,
        delay: isCenter ? 0.1 : isLeft ? 0.2 : 0.3,
        ease: [0.22, 1, 0.36, 1],
      }}
      whileHover={
        isCenter && !isMobile
          ? { y: -20, scale: 1.06, transition: { duration: 0.3 } }
          : undefined
      }
      className={`relative w-full max-w-[340px] sm:max-w-[360px] lg:max-w-[350px] xl:max-w-[380px] mx-auto transition-all duration-500 transform-gpu ${desktopTransform}`}
    >
      {/* Ambient background glow for center phone */}
      {isCenter && (
        <div className="absolute -inset-4 bg-gradient-to-r from-[#7C61FF]/30 via-[#8B5CF6]/25 to-[#A78BFA]/30 rounded-[64px] blur-2xl opacity-70 pointer-events-none -z-10" />
      )}

      {/* Realistic iPhone Outer Chassis */}
      <div
        className={`relative rounded-[50px] sm:rounded-[54px] p-2.5 sm:p-3 bg-gradient-to-b from-[#2B2844] via-[#171527] to-[#0F0E1B] border border-white/20 ${shadowClass}`}
      >
        {/* Subtle Side Button Protrusions (iPhone Hardware) */}
        {/* Left Side: Mute switch & Volume rocker */}
        <div className="hidden sm:block absolute -left-[3px] top-24 w-[3px] h-6 bg-[#3C385C] rounded-l-sm" />
        <div className="hidden sm:block absolute -left-[3px] top-36 w-[3px] h-11 bg-[#3C385C] rounded-l-sm" />
        <div className="hidden sm:block absolute -left-[3px] top-52 w-[3px] h-11 bg-[#3C385C] rounded-l-sm" />

        {/* Right Side: Power Button */}
        <div className="hidden sm:block absolute -right-[3px] top-40 w-[3px] h-16 bg-[#3C385C] rounded-r-sm" />

        {/* Outer Titanium Rim Specular Highlight */}
        <div className="absolute inset-0 rounded-[50px] sm:rounded-[54px] ring-1 ring-inset ring-white/15 pointer-events-none z-30" />

        {/* iPhone Inner Screen Frame */}
        <div
          className={`relative rounded-[40px] sm:rounded-[44px] overflow-hidden flex flex-col justify-between border border-white/10 h-[680px] sm:h-[720px] xl:h-[740px] ${
            isCenter
              ? "bg-gradient-to-b from-[#1C1836] via-[#100E22] to-[#0A0914]"
              : "bg-gradient-to-b from-[#141225] via-[#0C0B18] to-[#070610]"
          }`}
        >
          {/* Subtle Ambient Radial Glow on Screen */}
          <div
            className={`absolute top-0 left-1/2 -translate-x-1/2 w-[300px] h-[250px] rounded-full blur-[90px] pointer-events-none z-0 ${
              isCenter ? "bg-[#7C61FF]/25" : "bg-[#7C61FF]/12"
            }`}
          />

          {/* STATUS BAR & DYNAMIC ISLAND */}
          <div className="relative pt-3.5 px-6 pb-2 flex items-center justify-between z-20 select-none">
            {/* Clock */}
            <span className="text-[12px] font-semibold text-white/90 tracking-tight font-heading">
              9:41
            </span>

            {/* Dynamic Island */}
            <div className="w-24 sm:w-28 h-6 bg-black rounded-full flex items-center justify-between px-2.5 shadow-[inset_0_1px_2px_rgba(255,255,255,0.12)]">
              {/* Camera Lens */}
              <div className="w-2.5 h-2.5 rounded-full bg-[#0D0C18] ring-1 ring-[#2C2849] relative flex items-center justify-center">
                <div className="w-1 h-1 rounded-full bg-[#7C61FF]/60 absolute top-0.5 right-0.5" />
              </div>
              {/* Sensor dot */}
              <div className="w-1.5 h-1.5 rounded-full bg-[#181628]" />
            </div>

            {/* Status Icons: Signal, Wifi, Battery */}
            <div className="flex items-center gap-1.5 text-white/80">
              {/* Signal Bars */}
              <svg className="w-3.5 h-3 fill-current" viewBox="0 0 16 12">
                <rect x="1" y="8" width="2" height="4" rx="0.5" />
                <rect x="5" y="5" width="2" height="7" rx="0.5" />
                <rect x="9" y="3" width="2" height="9" rx="0.5" />
                <rect x="13" y="1" width="2" height="11" rx="0.5" />
              </svg>
              {/* Wifi */}
              <Wifi className="w-3.5 h-3.5 text-white/80" />
              {/* Battery */}
              <div className="w-5 h-2.5 rounded-[3px] border border-white/70 p-[1.5px] flex items-center">
                <div className="w-2.5 h-full bg-white/90 rounded-[1px]" />
              </div>
            </div>
          </div>

          {/* SCREEN MAIN CONTENT */}
          <div className="relative z-10 px-5 sm:px-6 pt-2 pb-3 flex-1 flex flex-col justify-between overflow-hidden">
            {/* Top Tier Header */}
            <div>
              {/* Center Highlight Badge */}
              {isCenter && (
                <div className="mb-2 text-center">
                  <div className="inline-flex items-center gap-1.5 px-3.5 py-1 rounded-full bg-gradient-to-r from-[#7C61FF] via-[#8B5CF6] to-[#A78BFA] text-white text-[10px] sm:text-[11px] font-black tracking-widest uppercase shadow-[0_0_15px_rgba(124,97,255,0.6)]">
                    <Sparkles className="w-3 h-3 text-white" />
                    <span>MOST POPULAR</span>
                  </div>
                </div>
              )}

              {/* Sub-label / Tier Index */}
              <div className="flex items-center justify-between mb-1">
                <span className="text-[10px] sm:text-[11px] font-bold tracking-[0.2em] text-[#A78BFA] uppercase">
                  TIER {plan.tierNumber} • {plan.tagline}
                </span>
                <span className="text-[10px] text-white/40 uppercase tracking-widest font-mono">
                  ZELVOXX
                </span>
              </div>

              {/* Tier Name */}
              <h3 className="text-xl sm:text-2xl xl:text-[25px] font-heading font-black text-white tracking-tight leading-tight group-hover:text-[#A78BFA] transition-colors">
                {plan.name}
              </h3>

              {/* Description */}
              <p className="text-[11px] sm:text-xs text-white/65 mt-1 leading-relaxed line-clamp-2 min-h-[32px]">
                {plan.description}
              </p>

              {/* Price Display Card */}
              <div className="mt-3 p-3 sm:p-3.5 rounded-2xl bg-white/[0.04] border border-white/10 backdrop-blur-md flex items-baseline justify-between shadow-inner">
                <div>
                  <span className="text-[10px] text-white/50 uppercase tracking-wider block font-medium">
                    Investment
                  </span>
                  <div className="flex items-baseline gap-1 mt-0.5">
                    <span className="text-3xl sm:text-4xl font-heading font-black text-white tracking-tight drop-shadow-md">
                      {plan.price ? plan.price.replace(/^\$/, "₹") : "₹15,000"}
                    </span>
                    {plan.price !== "Custom" && (
                      <span className="text-xs font-semibold text-white/60">
                        /project
                      </span>
                    )}
                  </div>
                </div>
                <div className="text-right">
                  <span className="text-[10px] px-2 py-0.5 rounded-full bg-[#7C61FF]/20 text-[#C4B5FD] font-semibold border border-[#7C61FF]/30">
                    System
                  </span>
                </div>
              </div>
            </div>

            {/* Feature Checklist List (Mobile App UI Style) */}
            <div className="mt-3.5 flex-1 flex flex-col justify-start">
              <span className="text-[10px] uppercase font-bold tracking-wider text-white/40 mb-2 block">
                Deliverables Included:
              </span>
              <ul className="space-y-2 sm:space-y-2.5">
                {plan.features.map((feat, i) => (
                  <li key={i} className="flex items-center gap-2.5">
                    <div className="w-5 h-5 rounded-full bg-[#7C61FF]/25 border border-[#7C61FF]/45 flex items-center justify-center shrink-0 shadow-sm">
                      <Check className="w-3 h-3 text-[#D8B4FE]" />
                    </div>
                    <span className="text-xs sm:text-[12.5px] text-white/85 font-medium leading-snug">
                      {feat}
                    </span>
                  </li>
                ))}
              </ul>
            </div>

            {/* Bottom Pinned CTA Button */}
            <div className="pt-3 mt-auto">
              <Link
                href="/contact"
                onClick={() => {
                  pushToDataLayer("checkout_click", {
                    event_category: "engagement",
                    event_label: `Pricing Tier: ${plan.name} (${plan.price})`,
                    pricing_tier: plan.name,
                    pricing_price: plan.price,
                  });
                  pushToDataLayer("begin_checkout", {
                    event_category: "engagement",
                    event_label: `Pricing Tier: ${plan.name} (${plan.price})`,
                    pricing_tier: plan.name,
                    pricing_price: plan.price,
                  });
                }}
                className={`w-full py-3.5 sm:py-4 rounded-2xl font-bold uppercase tracking-wider text-xs sm:text-[13px] overflow-hidden relative flex items-center justify-center gap-2 transition-all duration-300 group/btn touch-manipulation active:scale-95 ${
                  isCenter
                    ? "bg-gradient-to-r from-[#7C61FF] via-[#8B5CF6] to-[#A78BFA] text-white shadow-[0_4px_25px_rgba(124,97,255,0.5)] hover:shadow-[0_4px_35px_rgba(124,97,255,0.75)] hover:brightness-110"
                    : "bg-white/10 hover:bg-[#7C61FF]/20 text-white border border-white/15 hover:border-[#7C61FF]/50 shadow-sm"
                }`}
              >
                <span className="relative z-10 flex items-center gap-2">
                  {plan.cta}
                  <ArrowRight className="w-4 h-4 group-hover/btn:translate-x-1 transition-transform" />
                </span>
                {isCenter && (
                  <div className="absolute inset-0 bg-gradient-to-r from-[#8B5CF6] to-[#7C61FF] opacity-0 group-hover/btn:opacity-100 transition-opacity duration-500 z-0" />
                )}
              </Link>

              {/* iOS Home Indicator Bar */}
              <div className="w-28 sm:w-32 h-1 bg-white/25 rounded-full mx-auto mt-3" />
            </div>
          </div>
        </div>
      </div>
    </motion.div>
  );
}
