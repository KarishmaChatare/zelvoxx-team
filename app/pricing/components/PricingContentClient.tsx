"use client";

import React from "react";
import Link from "next/link";
import { motion } from "framer-motion";
import { ArrowLeft, Sparkles, Gift } from "lucide-react";
import DynamicBackground from "@/src/components/ui/DynamicBackground";
import { pushToDataLayer } from "@/src/lib/analytics";

import PhonePricingMockup, { PhonePricingPlan } from "@/src/components/ui/PhonePricingMockup";

interface PricingContentClientProps {
  plans: any[];
}

export default function PricingContentClient({ plans }: PricingContentClientProps) {
  const [isMobile, setIsMobile] = React.useState(false);
  React.useEffect(() => {
    const checkMobile = () => setIsMobile(window.innerWidth < 768);
    checkMobile();
    window.addEventListener("resize", checkMobile, { passive: true });
    return () => window.removeEventListener("resize", checkMobile);
  }, []);
  return (
    <main className="min-h-screen bg-background text-white selection:bg-primary/30 relative">
      {/* Dynamic Background */}
      <DynamicBackground variant="purple" intensity="medium" />

      {/* Page Content */}
      <div className="relative z-10 pt-24">
        {/* Page Header */}
        <section className="py-20 md:py-32 relative overflow-hidden">
          {/* Floating price tags animation */}
          <div className="absolute inset-0 overflow-hidden pointer-events-none">
            {[...Array(6)].map((_, i) => (
              <motion.div
                key={i}
                className="absolute flex items-center gap-1 px-3 py-1 rounded-full bg-white/5 border border-white/10"
                style={{
                  right: `${5 + i * 15}%`,
                  top: `${20 + (i % 3) * 25}%`,
                }}
                animate={{
                  opacity: [0.2, 0.5, 0.2],
                  y: [0, -15, 0],
                  rotate: [-5, 5, -5],
                }}
                transition={{
                  duration: 4 + i * 0.5,
                  repeat: Infinity,
                  ease: "easeInOut",
                  delay: i * 0.4,
                }}
              >
                <Gift className="w-3 h-3 text-primary/60" />
                <span className="text-xs text-white/40">Save {20 + i * 10}%</span>
              </motion.div>
            ))}
          </div>
          
          <div className="max-w-7xl mx-auto px-6 relative z-10">
            <motion.div 
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8 }}
              className="text-center max-w-3xl mx-auto"
            >
              <motion.div
                initial={{ opacity: 0, x: -20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ duration: 0.6, delay: 0.1 }}
              >
                <Link 
                  href="/" 
                  className="inline-flex items-center gap-2 text-sm text-white/50 hover:text-primary transition-colors mb-8 group"
                >
                  <ArrowLeft className="w-4 h-4 group-hover:-translate-x-1 transition-transform" />
                  Back to Home
                </Link>
              </motion.div>

              <motion.div
                initial={{ opacity: 0, scale: 0.9 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ duration: 0.6, delay: 0.2 }}
                className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-primary/10 border border-primary/20 mb-6"
              >
                <Sparkles className="w-4 h-4 text-primary" />
                <span className="text-xs font-bold tracking-wider text-primary uppercase">Pricing Plans</span>
              </motion.div>

              <motion.h1 
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.8, delay: 0.3 }}
                className="text-4xl md:text-5xl lg:text-7xl font-heading font-black text-white leading-tight mb-6"
              >
                Simple,{" "}
                <span className="text-transparent bg-clip-text bg-gradient-to-r from-accent via-primary to-accent bg-300% animate-gradient">
                  transparent pricing.
                </span>
              </motion.h1>
              
              <motion.p 
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.8, delay: 0.4 }}
                className="text-lg md:text-xl text-white/60 max-w-2xl mx-auto leading-relaxed"
              >
                No hidden fees. No surprises. Just premium digital growth systems that deliver results.
              </motion.p>
            </motion.div>
          </div>
        </section>

        {/* Pricing Cards (3-Phone Mockup) */}
        <section className="py-12 pb-32">
          <div className="max-w-7xl mx-auto px-4 sm:px-6">
            <div className="flex flex-col lg:flex-row items-center justify-center gap-10 lg:gap-3 xl:gap-6 max-w-7xl mx-auto pt-4 pb-8 [perspective:1400px]">
              {plans.map((plan: any, idx: number) => {
                const position = idx === 0 ? "left" : idx === 1 ? "center" : "right";
                const phonePlan: PhonePricingPlan = {
                  ...plan,
                  tierNumber: `0${idx + 1}`,
                  tagline: idx === 0 ? "FOUNDATIONS" : idx === 1 ? "SCALE ENGINE" : "BESPOKE PARTNER",
                  cta:
                    plan.cta ||
                    (plan.ctaText &&
                    plan.ctaText !== "Get Started" &&
                    plan.ctaText !== "Most Popular" &&
                    plan.ctaText !== "Contact Us"
                      ? plan.ctaText
                      : idx === 1
                      ? "Start Scaling Now"
                      : idx === 0
                      ? "Connect With Us"
                      : "Apply for Partnership"),
                };
                return (
                  <PhonePricingMockup
                    key={plan._id || plan.name}
                    plan={phonePlan}
                    position={position}
                    isMobile={isMobile}
                  />
                );
              })}
            </div>

            {/* Custom Quote */}
            <motion.div 
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6, delay: 0.3 }}
              className="mt-16 text-center"
            >
              <p className="text-white/60 mb-4">
                Need something custom? We build bespoke solutions for complex requirements.
              </p>
              <Link
                href="/contact"
                onClick={() => {
                  pushToDataLayer("connect_with_us_click", {
                    event_category: "engagement",
                    event_label: "Pricing Custom Consultation",
                  });
                  pushToDataLayer("checkout_click", {
                    event_category: "engagement",
                    event_label: "Custom Consultation Call",
                    pricing_tier: "Custom",
                  });
                  pushToDataLayer("begin_checkout", {
                    event_category: "engagement",
                    event_label: "Custom Consultation Call",
                    pricing_tier: "Custom",
                  });
                }}
                className="inline-block text-primary hover:underline font-semibold"
              >
                Connect With Us for Consultation →
              </Link>
            </motion.div>
          </div>
        </section>
      </div>
    </main>
  );
}
