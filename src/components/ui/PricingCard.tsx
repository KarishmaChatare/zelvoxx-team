"use client";

import React from "react";
import Link from "next/link";
import { motion } from "framer-motion";
import { Check, ArrowRight } from "lucide-react";
import TiltCard from "@/src/components/ui/TiltCard";
import { pushToDataLayer } from "@/src/lib/analytics";

export interface PricingPlan {
  _id?: string;
  name: string;
  price: string;
  priceNote?: string;
  description: string;
  features: string[];
  popular?: boolean;
  highlighted?: boolean;
  cta?: string;
  ctaText?: string;
  ctaLink?: string;
}

interface PricingCardProps {
  plan: PricingPlan;
  index: number;
  isMobile?: boolean;
}

export default function PricingCard({ plan, index, isMobile = false }: PricingCardProps) {
  const isPopular = Boolean(plan.popular || plan.highlighted);

  const ctaLabel =
    plan.cta ||
    (plan.ctaText &&
    plan.ctaText !== "Get Started" &&
    plan.ctaText !== "Most Popular" &&
    plan.ctaText !== "Contact Us"
      ? plan.ctaText
      : isPopular
      ? "Start Scaling Now"
      : index === 0
      ? "Connect With Us"
      : "Apply for Partnership");

  const ctaHref = plan.ctaLink || "/contact";

  return (
    <TiltCard className={`h-full ${isPopular ? "lg:-mt-6 lg:-mb-6 z-10" : ""}`}>
      <motion.div
        initial={{ opacity: 0, y: 40 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, margin: "-50px" }}
        transition={{ duration: isMobile ? 0.4 : 0.6, delay: 0 }}
        className={`p-6 sm:p-8 lg:p-10 rounded-2xl sm:rounded-[2.5rem] relative group border flex flex-col justify-between h-full transition-all duration-500 ${
          isPopular
            ? "bg-gradient-to-b from-[#181729] to-[#0A0912] border-[#7C61FF]/60 shadow-[0_15px_50px_rgba(124,97,255,0.25)]"
            : "glass border-white/10 bg-[#12111E]/80 hover:border-[#7C61FF]/30 hover:shadow-[0_10px_40px_rgba(0,0,0,0.5)]"
        }`}
      >
        {isPopular && (
          <div className="absolute -top-4 left-1/2 -translate-x-1/2 bg-gradient-to-r from-[#7C61FF] via-[#8B5CF6] to-[#A78BFA] text-white px-6 py-1.5 rounded-full text-xs font-bold tracking-widest uppercase shadow-lg shadow-[#7C61FF]/40 z-20 whitespace-nowrap">
            Most Popular
          </div>
        )}

        <div>
          <div className="mb-6 sm:mb-8">
            <h3 className="text-xl sm:text-2xl font-heading font-bold text-white mb-3 sm:mb-4 tracking-wide group-hover:text-[#A78BFA] transition-colors">
              {plan.name}
            </h3>
            <p className="text-white/70 font-body min-h-[40px] sm:min-h-[48px] leading-relaxed text-sm sm:text-base">
              {plan.description}
            </p>
          </div>

          <div className="mb-6 sm:mb-8 pb-6 sm:pb-8 border-b border-white/10">
            <div className="flex items-end gap-2">
              <span className="text-4xl sm:text-5xl font-black font-heading text-white tracking-tight drop-shadow-md">
                {plan.price ? plan.price.replace(/^\$/, "₹") : "₹15,000"}
              </span>
              {plan.price !== "Custom" && (
                <span className="text-white/60 font-body mb-1 sm:mb-2 font-medium tracking-wide text-sm sm:text-base">
                  /project
                </span>
              )}
            </div>
          </div>

          <div className="flex-1">
            <ul className="space-y-3 sm:space-y-5 mb-8 sm:mb-10">
              {plan.features?.map((feat, i) => (
                <li key={i} className="flex items-start gap-3 sm:gap-4">
                  <div className="mt-0.5 shrink-0 bg-[#7C61FF]/20 p-1 rounded-full sm:p-1.5 group-hover:bg-[#7C61FF]/30 transition-colors">
                    <Check className="w-3 h-3 sm:w-3.5 sm:h-3.5 text-[#A78BFA]" />
                  </div>
                  <span className="text-white/80 font-body leading-relaxed text-sm sm:text-base">
                    {feat}
                  </span>
                </li>
              ))}
            </ul>
          </div>
        </div>

        <Link
          href={ctaHref}
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
          className={`w-full py-4 sm:py-5 rounded-full font-bold transition-all duration-500 flex items-center justify-center gap-2 sm:gap-3 group/btn uppercase tracking-wider text-sm overflow-hidden relative min-h-[56px] touch-manipulation active:scale-95 ${
            isPopular
              ? "bg-gradient-to-r from-[#7C61FF] via-[#8B5CF6] to-[#A78BFA] text-white hover:shadow-[0_0_35px_rgba(124,97,255,0.6)] lg:hover:scale-102"
              : "bg-white/5 text-white border border-white/10 hover:border-[#7C61FF]/50 hover:bg-[#7C61FF]/10 hover:shadow-[0_0_20px_rgba(124,97,255,0.2)]"
          }`}
        >
          <span className="relative z-10 flex items-center gap-2">
            {ctaLabel}
            <ArrowRight className="w-5 h-5 group-hover/btn:translate-x-1.5 transition-transform" />
          </span>
          {isPopular && (
            <div className="absolute inset-0 bg-gradient-to-r from-[#8B5CF6] to-[#7C61FF] opacity-0 group-hover/btn:opacity-100 transition-opacity duration-500 z-0" />
          )}
        </Link>
      </motion.div>
    </TiltCard>
  );
}
