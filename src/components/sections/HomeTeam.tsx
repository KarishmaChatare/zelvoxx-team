"use client";

import { motion, type Variants } from "framer-motion";
import Image from "next/image";
import Link from "next/link";
import { ArrowRight, Sparkles, Users } from "lucide-react";
import { urlForImage } from "@/sanity/lib/image";
import TiltCard from "@/src/components/ui/TiltCard";

interface TeamMember {
  _id: string;
  name: string;
  role: string;
  image?: any;
  isFounder?: boolean;
  shortBio?: string;
}

interface Props {
  members: TeamMember[];
}

const containerVariants: Variants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: {
      staggerChildren: 0.15,
      delayChildren: 0.2,
    },
  },
};

const fadeInUp: Variants = {
  hidden: { opacity: 0, y: 40 },
  visible: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.7, ease: [0.22, 1, 0.36, 1] },
  },
};

const scaleIn: Variants = {
  hidden: { opacity: 0, scale: 0.8 },
  visible: {
    opacity: 1,
    scale: 1,
    transition: { duration: 0.6, ease: [0.22, 1, 0.36, 1] },
  },
};

const floatingAnimation = {
  y: [0, -10, 0],
  transition: {
    duration: 4,
    repeat: Infinity,
    ease: "easeInOut" as const,
  },
};

// Default founders with localized image paths
const defaultFounders: TeamMember[] = [
  {
    _id: "founder-1",
    name: "Akshat Singh Jain",
    role: "Co-Founder",
    isFounder: true,
    shortBio: "Systems architect",
    image: "/images/team/founder-akshat.webp",
  },
  {
    _id: "founder-2",
    name: "Antara Das",
    role: "Co-Founder",
    isFounder: true,
    shortBio: "Operations excellence",
    image: "/images/team/founder-antara.webp",
  },
  {
    _id: "operator-karishma",
    name: "Karishma Chatare",
    role: "CTO (Chief Technology Officer)",
    isFounder: true,
    shortBio: "Technical infrastructure & engineering systems",
    image: null,
  },
];

export default function HomeTeam({ members }: Props) {
  const baseFounders = members.filter((m) => m.isFounder).length > 0
    ? members.filter((m) => m.isFounder).slice(0, 2)
    : defaultFounders.slice(0, 2);

  const karishmaFromSanity = members.find((m) => m.name.toLowerCase().includes("karishma"));

  const karishmaMember: TeamMember = karishmaFromSanity || {
    _id: "operator-karishma",
    name: "Karishma Chatare",
    role: "CTO (Chief Technology Officer)",
    isFounder: true,
    shortBio: "Technical infrastructure & engineering systems",
    image: null,
  };

  const operators = [...baseFounders, karishmaMember];

  return (
    <section id="team" className="relative pt-20 sm:pt-24 lg:pt-32 pb-16 sm:pb-20 lg:pb-24 px-4 sm:px-6 lg:px-8 overflow-hidden">
      {/* Animated Background */}
      <div className="absolute inset-0">
        <div className="absolute inset-0 bg-gradient-to-b from-transparent via-primary/[0.02] to-transparent" />
        
        {/* Floating Orbs */}
        <motion.div
          className="absolute top-20 left-[10%] w-[400px] h-[400px] bg-primary/10 rounded-full blur-[120px]"
          style={{ willChange: "transform", transform: "translateZ(0)" }}
          animate={{
            x: [0, 30, 0],
            y: [0, 20, 0],
            scale: [1, 1.1, 1],
          }}
          transition={{
            duration: 8,
            repeat: Infinity,
            ease: "easeInOut",
          }}
        />
        <motion.div
          className="absolute bottom-20 right-[10%] w-[350px] h-[350px] bg-accent/10 rounded-full blur-[100px]"
          style={{ willChange: "transform", transform: "translateZ(0)" }}
          animate={{
            x: [0, -20, 0],
            y: [0, -15, 0],
            scale: [1, 1.15, 1],
          }}
          transition={{
            duration: 10,
            repeat: Infinity,
            ease: "easeInOut",
            delay: 2,
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
              className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-white/5 border border-white/10 backdrop-blur-sm"
              whileHover={{ scale: 1.05, borderColor: "rgba(123, 97, 255, 0.3)" }}
              transition={{ duration: 0.3 }}
            >
              <Users className="w-4 h-4 text-primary" />
              <span className="text-sm text-white/70 font-medium">The Operators</span>
            </motion.div>

            <motion.h2
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5 }}
              className="text-[1.5rem] sm:text-[1.75rem] md:text-[2rem] lg:text-[2.25rem] xl:text-[2.5rem] font-heading font-bold text-white leading-tight sm:leading-[1.2] tracking-tight"
            >
              Meet the{" "}
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-primary via-accent to-primary bg-[length:200%_auto] animate-gradient">
                Founders
              </span>
            </motion.h2>

            <motion.p
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: 0.1 }}
              className="text-[0.8125rem] sm:text-[0.875rem] md:text-[0.9375rem] font-normal text-gray-400 max-w-2xl mx-auto leading-relaxed"
            >
              Visionaries who don&apos;t just execute — they engineer growth systems that scale.
            </motion.p>

            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: 0.15 }}
              className="pt-2"
            >
              <Link
                href="/team"
                className="group inline-flex items-center gap-2 text-primary hover:text-white transition-colors duration-300 text-sm sm:text-base font-semibold"
              >
                <span>Meet the Full Team</span>
                <ArrowRight className="w-4 h-4 sm:w-5 sm:h-5 group-hover:translate-x-1 transition-transform" />
              </Link>
            </motion.div>
          </div>

          {/* Founders & Operators Cards */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 lg:gap-6 xl:gap-8 max-w-7xl mx-auto">
            {operators.map((founder, index) => {
              let photoSrc: string | null = null;
              if (founder.image) {
                if (typeof founder.image === "string") {
                  photoSrc = founder.image;
                } else {
                  try {
                    photoSrc = urlForImage(founder.image)?.url() || null;
                  } catch {
                    photoSrc = null;
                  }
                }
              }
              if (!photoSrc) {
                if (index === 0) photoSrc = "/images/team/founder-akshat.webp";
                else if (index === 1) photoSrc = "/images/team/founder-antara.webp";
              }

              const memberTags = (index === 0
                ? ["Growth Architect", "System Builder"]
                : index === 1
                ? ["Operations Lead", "Client Success"]
                : ["Tech Architecture", "Engineering Lead"]);

              const isThird = index === 2;

              return (
                <motion.div
                  key={founder._id}
                  variants={scaleIn}
                  className={`group relative ${isThird ? "md:col-span-2 lg:col-span-1 md:max-w-md md:mx-auto lg:max-w-none w-full" : "w-full"}`}
                >
                  <TiltCard maxTilt={6} glareOpacity={0.15} className="h-full">
                    {/* Animated Border */}
                    <motion.div
                      className="absolute -inset-[1px] rounded-3xl bg-gradient-to-r from-primary via-accent to-primary opacity-0 group-hover:opacity-30 blur-sm transition-opacity duration-500"
                      animate={{
                        background: [
                          "linear-gradient(0deg, rgba(123,97,255,0.3), rgba(123,97,255,0.1))",
                          "linear-gradient(180deg, rgba(123,97,255,0.3), rgba(123,97,255,0.1))",
                          "linear-gradient(360deg, rgba(123,97,255,0.3), rgba(123,97,255,0.1))",
                        ],
                      }}
                      transition={{ duration: 4, repeat: Infinity }}
                    />

                    {/* Card */}
                    <div className="relative h-full p-6 sm:p-7 xl:p-8 bg-[#0f0f14]/90 backdrop-blur-xl rounded-3xl border border-white/10 group-hover:border-primary/40 transition-all duration-500 overflow-hidden flex flex-col justify-between">
                      {/* Hover Glow */}
                      <div className="absolute inset-0 bg-gradient-to-br from-primary/10 via-transparent to-accent/10 opacity-0 group-hover:opacity-100 transition-opacity duration-700 pointer-events-none" />

                      {/* Shine Effect on Hover */}
                      <motion.div
                        className="absolute inset-0 bg-gradient-to-r from-transparent via-white/5 to-transparent -skew-x-12 opacity-0 group-hover:opacity-100 pointer-events-none"
                        initial={{ x: "-100%" }}
                        whileHover={{ x: "200%" }}
                        transition={{ duration: 1 }}
                      />

                      <div className="relative flex flex-col sm:flex-row lg:flex-col xl:flex-row items-center sm:items-start lg:items-center xl:items-start gap-5 sm:gap-6 text-center sm:text-left lg:text-center xl:text-left">
                        {/* Profile Image */}
                        <motion.div
                          className="relative flex-shrink-0"
                          animate={floatingAnimation}
                        >
                          <div className="absolute inset-0 rounded-full bg-gradient-to-br from-primary to-accent opacity-20 blur-xl group-hover:opacity-40 transition-opacity duration-500" />
                          
                          <div className="relative w-24 h-24 sm:w-28 sm:h-28 rounded-full overflow-hidden border-2 border-white/10 group-hover:border-primary/50 transition-colors duration-500">
                            {photoSrc ? (
                              <Image
                                src={photoSrc}
                                alt={`${founder.name} - ${founder.role} at Zelvoxx`}
                                fill
                                sizes="112px"
                                loading="lazy"
                                className="object-cover group-hover:scale-110 transition-transform duration-700"
                              />
                            ) : (
                              <div className="w-full h-full flex flex-col items-center justify-center bg-gradient-to-br from-[#7C61FF]/25 via-[#8B5CF6]/20 to-[#12111E] border border-white/5 relative group-hover:scale-105 transition-transform duration-700">
                                <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,rgba(124,97,255,0.3)_0%,transparent_70%)]" />
                                <span className="text-3xl font-bold font-heading text-transparent bg-clip-text bg-gradient-to-br from-white via-white/90 to-white/60 drop-shadow-[0_0_12px_rgba(124,97,255,0.4)]">
                                  {founder.name.split(" ").map((n) => n[0]).join("").slice(0, 2)}
                                </span>
                              </div>
                            )}
                          </div>

                          {/* Founder Badge */}
                          <motion.div
                            className="absolute -bottom-1 -right-1 w-9 h-9 sm:w-10 sm:h-10 rounded-full bg-primary flex items-center justify-center shadow-lg shadow-primary/30"
                            whileHover={{ scale: 1.1, rotate: 10 }}
                            transition={{ type: "spring", stiffness: 400 }}
                          >
                            <Sparkles className="w-4 h-4 sm:w-5 sm:h-5 text-white" />
                          </motion.div>
                        </motion.div>

                        {/* Info */}
                        <div className="flex-1 min-w-0">
                          <motion.h3
                            className="text-xl sm:text-2xl font-bold text-white mb-1.5 group-hover:text-primary transition-colors duration-300"
                          >
                            {founder.name}
                          </motion.h3>
                          
                          <p className="text-primary font-semibold text-xs sm:text-sm mb-2.5">
                            {founder.role}
                          </p>
                          
                          {founder.shortBio && (
                            <p className="text-white/60 text-xs sm:text-sm leading-relaxed">
                              {founder.shortBio}
                            </p>
                          )}

                          {/* Stats or Tags */}
                          <div className="flex flex-wrap gap-1.5 sm:gap-2 mt-4 justify-center sm:justify-start lg:justify-center xl:justify-start">
                            {memberTags.map((tag, tIdx) => (
                              <span
                                key={tIdx}
                                className="px-2.5 py-1 rounded-full bg-white/5 border border-white/10 text-[11px] sm:text-xs text-white/60 font-medium"
                              >
                                {tag}
                              </span>
                            ))}
                          </div>
                        </div>
                      </div>
                    </div>
                  </TiltCard>
                </motion.div>
              );
            })}
          </div>

          {/* Bottom CTA */}
          <motion.div variants={fadeInUp} className="text-center mt-16">
            <p className="text-white/40 text-sm mb-4">
              Backed by a team of developers, marketers, and growth engineers
            </p>
            <Link
              href="/team"
              className="inline-flex items-center gap-2 px-6 py-3 rounded-full bg-white/5 border border-white/10 hover:bg-primary/20 hover:border-primary/30 transition-all duration-300 group"
            >
              <span className="text-white/70 group-hover:text-white font-medium">View All Team Members</span>
              <ArrowRight className="w-4 h-4 text-white/50 group-hover:text-white group-hover:translate-x-1 transition-all" />
            </Link>
          </motion.div>
        </motion.div>
      </div>
    </section>
  );
}
