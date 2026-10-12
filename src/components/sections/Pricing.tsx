"use client";

import { motion } from "framer-motion";
import { useState, useEffect } from "react";
import PhonePricingMockup, { PhonePricingPlan } from "@/src/components/ui/PhonePricingMockup";

const tiers: PhonePricingPlan[] = [
  {
    name: "Growth Foundations",
    price: "₹15,000",
    description: "For businesses who need a high-converting digital storefront.",
    features: [
      "Custom UI/UX Design",
      "Next.js Lightning Fast Build",
      "Basic SEO Implementation",
      "CMS Integration",
      "1x Conversion Funnel",
      "30 Days Support"
    ],
    highlighted: false,
    cta: "Connect With Us",
    tierNumber: "01",
    tagline: "FOUNDATIONS"
  },
  {
    name: "Revenue System",
    price: "₹49,000",
    description: "The complete digital growth engine for aggressive scaling.",
    features: [
      "Everything in Foundations",
      "Advanced Funnel Architectures",
      "Custom E-commerce/SaaS Logic",
      "CRM & Sales Automation",
      "Meta & Google Ads Setup",
      "Conversion Rate Optimization (CRO)",
      "90 Days VIP Support"
    ],
    highlighted: true,
    popular: true,
    cta: "Start Scaling Now",
    tierNumber: "02",
    tagline: "SCALE ENGINE"
  },
  {
    name: "Enterprise Partner",
    price: "₹99,000",
    description: "Bespoke engineering and fractional CMO-level guidance.",
    features: [
      "Everything in Revenue System",
      "Dedicated Full-Stack Team",
      "Custom Web Apps & AI Tools",
      "Omnichannel Ads Management",
      "Continuous A/B Testing",
      "Priority 24/7 Slack Channel"
    ],
    highlighted: false,
    cta: "Apply for Partnership",
    tierNumber: "03",
    tagline: "BESPOKE PARTNER"
  }
];

export default function Pricing() {
  const [isMobile, setIsMobile] = useState(false);
  useEffect(() => {
    const checkMobile = () => setIsMobile(window.innerWidth < 1024);
    checkMobile();
    window.addEventListener('resize', checkMobile, { passive: true });
    return () => window.removeEventListener('resize', checkMobile);
  }, []);

  return (
    <section id="pricing" className="relative py-16 sm:py-24 overflow-hidden scroll-mt-20">
      <div className="absolute inset-0 bg-gradient-to-t from-transparent via-transparent to-transparent z-0 pointer-events-none" />
      <div className="absolute -top-10 left-[15%] w-[42vw] h-[42vw] bg-[#7C61FF]/10 blur-[150px] rounded-full pointer-events-none" />
      <div className="absolute -bottom-20 right-[10%] w-[38vw] h-[38vw] bg-[#8B5CF6]/10 blur-[140px] rounded-full pointer-events-none" />
      
      <div className="max-w-7xl mx-auto px-4 sm:px-6 relative z-10">
        <div className="text-center max-w-3xl mx-auto mb-12 sm:mb-16 space-y-3 sm:space-y-4">
          <motion.div
            initial={{ opacity: 0, y: 15 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="inline-block"
          >
            <span className="text-xs font-bold tracking-[0.2em] text-[#A78BFA] uppercase px-4 py-1.5 rounded-full bg-[#7C61FF]/10 border border-[#7C61FF]/20">
              Investment
            </span>
          </motion.div>
          
          <motion.h2
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5 }}
            className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-heading font-black text-white leading-tight tracking-tight"
          >
            Choose your <span className="text-transparent bg-clip-text bg-gradient-to-r from-[#7C61FF] via-[#8B5CF6] to-[#A78BFA] relative inline-block">
              weapon.
              <div className="absolute bottom-1 left-0 w-full h-[40%] bg-[#7C61FF]/20 blur-xl z-[-1]" />
            </span>
          </motion.h2>
          <motion.p
            initial={{ opacity: 0, y: 15 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5, delay: 0.1 }}
            className="text-sm sm:text-base text-white/60 max-w-xl mx-auto"
          >
            Architected growth ecosystems designed to scale revenue predictably.
          </motion.p>
        </div>

        {/* 3-Phone Mockup Staggered Row */}
        <div className="flex flex-col lg:flex-row items-center justify-center gap-10 lg:gap-3 xl:gap-6 max-w-7xl mx-auto pt-4 pb-8 [perspective:1400px]">
          {tiers.map((tier, idx) => {
            const position = idx === 0 ? "left" : idx === 1 ? "center" : "right";
            return (
              <PhonePricingMockup
                key={tier.name}
                plan={tier}
                position={position}
                isMobile={isMobile}
              />
            );
          })}
        </div>
      </div>
    </section>
  );
}
