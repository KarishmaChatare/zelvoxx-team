"use client";

import Link from "next/link";
import { motion } from "framer-motion";
import * as LucideIcons from "lucide-react";
import { ArrowRight, Code2 } from "lucide-react";
import { services } from "@/src/constants/data";
import { ServiceType } from "@/src/types";

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
      className="relative bg-background overflow-hidden border-t border-white/5 py-16 sm:py-24 lg:py-32 scroll-mt-24"
    >
      {/* Background Gradients & Glows */}
      <div className="absolute inset-0 bg-gradient-to-b from-primary/5 via-transparent to-transparent pointer-events-none" />
      <div className="absolute top-1/2 right-0 w-[300px] sm:w-[500px] h-[300px] sm:h-[500px] bg-primary/5 blur-[150px] z-0 rounded-full pointer-events-none -translate-y-1/2" />
      <div className="absolute bottom-0 left-0 w-[250px] sm:w-[400px] h-[250px] sm:h-[400px] bg-accent/5 blur-[150px] z-0 rounded-full pointer-events-none" />

      <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 sm:gap-12 lg:gap-16 items-start">
          
          {/* Left Column: Intro (Sticky ONLY on desktop `lg:`, static on mobile/tablet) */}
          <div className="lg:col-span-5 relative lg:sticky lg:top-36 space-y-6 text-center lg:text-left">
            <motion.div
              initial={{ opacity: 0, y: 15 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              className="inline-block"
            >
              <span className="text-xs font-bold tracking-[0.2em] text-primary uppercase">
                Our Services
              </span>
            </motion.div>

            <motion.h2
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5 }}
              className="text-3xl sm:text-4xl md:text-5xl font-heading font-black text-white leading-[1.15] tracking-tight"
            >
              End-to-end growth solutions{" "}
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-primary to-accent block sm:inline">
                under one roof.
              </span>
            </motion.h2>

            <motion.p
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: 0.1 }}
              className="text-sm sm:text-base text-gray-400 max-w-md mx-auto lg:mx-0 leading-relaxed"
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
              <a
                href="#contact"
                className="inline-flex items-center justify-center gap-2 text-white/80 hover:text-white border border-white/10 hover:border-primary/40 bg-white/[0.03] hover:bg-primary/10 px-6 py-3.5 rounded-xl transition-all text-sm font-semibold shadow-sm"
              >
                <span>View All Services</span>
                <ArrowRight className="w-4 h-4 text-primary" />
              </a>
            </motion.div>
          </div>

          {/* Right Column: 2-Column Responsive Cards Grid */}
          <div className="lg:col-span-7 grid grid-cols-1 sm:grid-cols-2 gap-4 sm:gap-6">
            {displayData.map((service, idx) => (
              <Link
                key={idx}
                href={service.slug ? `/service/${service.slug}` : "#"}
                className="flex flex-col h-full group"
              >
                <motion.div
                  initial={{ opacity: 0, y: 25 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true, margin: "-40px" }}
                  transition={{ duration: 0.4, delay: idx * 0.07 }}
                  whileHover={{ y: -4 }}
                  className="flex flex-col justify-between h-full p-6 sm:p-8 rounded-2xl sm:rounded-3xl border border-white/10 bg-[#12121A]/70 backdrop-blur-md group-hover:border-primary/40 transition-all duration-300 relative overflow-hidden group-hover:shadow-xl group-hover:shadow-primary/5"
                >
                  {/* Subtle inner hover glow */}
                  <div className="absolute inset-0 bg-gradient-to-br from-primary/10 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500 pointer-events-none" />

                  <div className="relative z-10">
                    <div className="w-12 h-12 bg-white/5 rounded-2xl flex items-center justify-center text-primary mb-6 group-hover:scale-110 group-hover:bg-primary/20 transition-all duration-300 border border-white/10 group-hover:border-primary/30">
                      {service.icon}
                    </div>

                    <h3 className="text-lg sm:text-xl font-bold font-heading text-white mb-2.5 tracking-wide group-hover:text-primary transition-colors">
                      {service.title}
                    </h3>

                    <p className="text-white/60 leading-relaxed font-body text-xs sm:text-sm">
                      {service.desc}
                    </p>
                  </div>

                  {/* Bottom Explore Link & Animated Indicator */}
                  <div className="relative z-10 pt-6 mt-6 border-t border-white/5 flex items-center justify-between text-xs font-bold uppercase tracking-wider text-primary group-hover:text-white transition-colors">
                    <span>Explore Service</span>
                    <ArrowRight className="w-3.5 h-3.5 transform group-hover:translate-x-1 transition-transform" />
                  </div>

                  {/* Bottom Accent line */}
                  <div className="absolute bottom-0 left-0 h-0.5 w-0 bg-gradient-to-r from-primary to-accent group-hover:w-full transition-all duration-500 z-10" />
                </motion.div>
              </Link>
            ))}
          </div>

        </div>
      </div>
    </section>
  );
}