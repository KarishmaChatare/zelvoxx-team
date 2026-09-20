"use client";

import Link from "next/link";
import { motion } from "framer-motion";
import * as LucideIcons from "lucide-react";
import { ArrowRight, Code2 } from "lucide-react";
import Image from "next/image";
import { services } from "@/src/constants/data";
import { ServiceType } from "@/src/types";
import TiltCard from "@/src/components/ui/TiltCard";

const serviceVisualMap: Record<string, string> = {
  "Brand Positioning": "/images/services/brand-positioning.svg",
  "High-Converting Web Design": "/images/services/web-design.svg",
  "Full-Stack Web Development": "/images/services/web-dev.svg",
  "Funnel Architecture": "/images/services/funnel-architecture.svg",
  "Meta & Google Ads": "/images/services/paid-ads.svg",
  "SEO & Content Systems": "/images/services/seo-systems.svg",
  "Sales Automation & CRM": "/images/services/sales-automation.svg",
};

export default function Services({ data }: { data?: ServiceType[] }) {
  const displayData = data?.length
    ? data.map((d: ServiceType) => {
        // Safe dynamic icon resolution with fallback
        const IconComponent =
          ((LucideIcons as Record<string, any>)[d.icon as string] as React.ElementType) || Code2;
        return {
          title: d.title,
          desc: d.shortDescription || d.description,
          slug: d.slug,
          icon: <IconComponent className="w-6 h-6 relative z-10" />,
        };
      })
    : services;

  return (
    <section
      id="services"
      className="relative overflow-hidden border-t border-white/5 py-16 sm:py-24 lg:py-32 scroll-mt-24"
    >
      {/* Background Gradients & Glows */}
      <div className="absolute inset-0 bg-gradient-to-b from-[#7C61FF]/5 via-transparent to-transparent pointer-events-none" />
      <div className="absolute top-1/2 right-0 w-[300px] sm:w-[500px] h-[300px] sm:h-[500px] bg-[#7C61FF]/5 blur-[150px] z-0 rounded-full pointer-events-none -translate-y-1/2" />
      <div className="absolute bottom-0 left-0 w-[250px] sm:w-[400px] h-[250px] sm:h-[400px] bg-[#8B5CF6]/5 blur-[150px] z-0 rounded-full pointer-events-none" />

      <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 sm:gap-12 lg:gap-16 items-start">
          
          {/* Left Column: Intro (Sticky ONLY on desktop `lg:`, static on mobile/tablet) */}
          <div className="lg:col-span-5 relative lg:sticky lg:top-36 space-y-3 sm:space-y-4 text-center lg:text-left">
            <motion.div
              initial={{ opacity: 0, y: 15 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              className="inline-block"
            >
              <span className="text-xs font-bold tracking-[0.2em] text-[#A78BFA] uppercase">
                Our Services
              </span>
            </motion.div>

            <motion.h2
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5 }}
              className="text-[1.5rem] sm:text-[1.75rem] md:text-[2rem] lg:text-[2.25rem] xl:text-[2.5rem] font-heading font-bold text-white leading-tight sm:leading-[1.2] tracking-tight"
            >
              End-to-end growth solutions{" "}
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-[#7C61FF] via-[#8B5CF6] to-[#A78BFA] block sm:inline">
                under one roof.
              </span>
            </motion.h2>

            <motion.p
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: 0.1 }}
              className="text-[0.8125rem] sm:text-[0.875rem] md:text-[0.9375rem] font-normal text-gray-400 max-w-md mx-auto lg:mx-0 leading-relaxed"
            >
              From conversion-focused web architecture to automated lead systems and high-ROI acquisition campaigns.
            </motion.p>

            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: 0.2 }}
              className="pt-2"
            >
              <Link
                href="/contact"
                className="inline-flex items-center justify-center gap-2 text-white/90 hover:text-white border border-white/10 hover:border-[#7C61FF]/50 bg-white/[0.03] hover:bg-[#7C61FF]/10 px-6 py-3.5 rounded-xl transition-all text-sm font-semibold shadow-sm"
              >
                <span>Connect With Us</span>
                <ArrowRight className="w-4 h-4 text-[#A78BFA]" />
              </Link>
            </motion.div>
          </div>

          {/* Right Column: 2-Column Responsive Cards Grid with Visuals & 3D Tilt */}
          <div className="lg:col-span-7 grid grid-cols-1 sm:grid-cols-2 gap-4 sm:gap-6">
            {displayData.map((service, idx) => {
              const visualImage = serviceVisualMap[service.title] || "/images/services/web-design.svg";

              return (
                <TiltCard key={idx} className="h-full">
                  <Link
                    href={service.slug ? `/service/${service.slug}` : "#"}
                    className="flex flex-col h-full group block"
                  >
                    <motion.div
                      initial={{ opacity: 0, y: 25 }}
                      whileInView={{ opacity: 1, y: 0 }}
                      viewport={{ once: true, margin: "-40px" }}
                      transition={{ duration: 0.4, delay: idx * 0.07 }}
                      className="flex flex-col justify-between h-full p-6 sm:p-7 rounded-2xl sm:rounded-3xl border border-white/10 bg-[#12111E]/80 backdrop-blur-md group-hover:border-[#7C61FF]/50 transition-all duration-300 relative overflow-hidden group-hover:shadow-xl group-hover:shadow-[#7C61FF]/10"
                    >
                      {/* Subtle inner hover glow */}
                      <div className="absolute inset-0 bg-gradient-to-br from-[#7C61FF]/10 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500 pointer-events-none" />

                      <div className="relative z-10">
                        {/* Service Illustration Banner */}
                        <div className="w-full h-24 mb-5 rounded-xl overflow-hidden border border-white/5 bg-[#09080E] shadow-inner">
                          <Image
                            src={visualImage}
                            alt={service.title}
                            width={320}
                            height={100}
                            loading="lazy"
                            sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 320px"
                            className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                          />
                        </div>

                        <div className="flex items-center gap-3 mb-3">
                          <div className="w-10 h-10 bg-white/5 rounded-xl flex items-center justify-center text-[#A78BFA] group-hover:scale-110 group-hover:bg-[#7C61FF]/20 transition-all duration-300 border border-white/10 group-hover:border-[#7C61FF]/40">
                            {service.icon}
                          </div>
                          <h3 className="text-lg font-bold font-heading text-white tracking-wide group-hover:text-[#A78BFA] transition-colors">
                            {service.title}
                          </h3>
                        </div>

                        <p className="text-white/60 leading-relaxed font-body text-xs sm:text-sm">
                          {service.desc}
                        </p>
                      </div>

                      {/* Bottom Explore Link & Animated Indicator */}
                      <div className="relative z-10 pt-5 mt-5 border-t border-white/5 flex items-center justify-between text-xs font-bold uppercase tracking-wider text-[#A78BFA] group-hover:text-white transition-colors">
                        <span>Explore Service</span>
                        <ArrowRight className="w-3.5 h-3.5 transform group-hover:translate-x-1 transition-transform" />
                      </div>

                      {/* Bottom Accent line */}
                      <div className="absolute bottom-0 left-0 h-0.5 w-0 bg-gradient-to-r from-[#7C61FF] via-[#8B5CF6] to-[#A78BFA] group-hover:w-full transition-all duration-500 z-10" />
                    </motion.div>
                  </Link>
                </TiltCard>
              );
            })}
          </div>

        </div>
      </div>
    </section>
  );
}