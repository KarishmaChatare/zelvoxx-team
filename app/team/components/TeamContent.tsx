"use client";

import { motion, type Variants } from "framer-motion";
import Link from "next/link";
import Image from "next/image";
import { ArrowRight, Sparkles, Zap, Users, Target, MessageCircle, Phone } from "lucide-react";
import { urlForImage } from "@/sanity/lib/image";
import CTASection from "@/src/components/ui/CTASection";
import { PHONE_CALL_URL, PHONE_NUMBER } from "@/src/constants/data";
import { pushToDataLayer } from "@/src/lib/analytics";

interface TeamMember {
  _id: string;
  name: string;
  role: string;
  image?: any;
  isFounder?: boolean;
  shortBio?: string;
  order?: number;
  socialLinks?: {
    linkedin?: string;
    twitter?: string;
    github?: string;
  };
}

interface Props {
  members: TeamMember[];
}

const fadeInUp: Variants = {
  hidden: { opacity: 0, y: 40 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.7 } },
};

const staggerContainer: Variants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: { staggerChildren: 0.12, delayChildren: 0.1 },
  },
};

const scaleIn: Variants = {
  hidden: { opacity: 0, scale: 0.9 },
  visible: { opacity: 1, scale: 1, transition: { duration: 0.5 } },
};

// Default founders data for fallback
const defaultFounders: TeamMember[] = [
  {
    _id: "founder-1",
    name: "Akshat Singh Jain",
    role: "Co-Founder",
    isFounder: true,
    shortBio: "Systems architect. Growth strategist. Building the future of digital.",
    image: "/images/team/founder-akshat.webp",
  },
  {
    _id: "founder-2",
    name: "Antara Das",
    role: "Co-Founder",
    isFounder: true,
    shortBio: "Operations excellence. Client success. Making vision reality.",
    image: "/images/team/founder-antara.webp",
  },
  {
    _id: "operator-karishma",
    name: "Karishma Chatare",
    role: "CTO (Chief Technology Officer)",
    isFounder: true,
    shortBio: "Technical infrastructure & engineering systems",
    image: "/images/team/operator-karishma.webp",
  },
];

export default function TeamContent({ members }: Props) {
  // Separate founders
  const baseFounders = members.filter((m) => m.isFounder).length > 0
    ? members.filter((m) => m.isFounder).filter((m) => !m.name.toLowerCase().includes("karishma")).slice(0, 2)
    : defaultFounders.slice(0, 2);

  const karishmaFromSanity = members.find((m) => m.name.toLowerCase().includes("karishma"));

  const karishmaMember: TeamMember = {
    _id: "operator-karishma",
    name: "Karishma Chatare",
    role: "CTO (Chief Technology Officer)",
    isFounder: true,
    shortBio: "Technical infrastructure & engineering systems",
    image: "/images/team/operator-karishma.webp",
    ...(karishmaFromSanity ? { ...karishmaFromSanity, image: "/images/team/operator-karishma.webp" } : {}),
  };

  const founders = [...baseFounders, karishmaMember];

  return (
    <>
      {/* HERO SECTION - Cinematic Entry */}
      <section className="relative min-h-[90vh] flex items-center justify-center pt-24 pb-16 px-4 sm:px-6 lg:px-8 overflow-hidden">
        {/* Animated gradient background */}
        <div className="absolute inset-0">
          <div className="absolute inset-0 bg-gradient-to-b from-primary/5 via-transparent to-transparent" />
          <motion.div
            className="absolute top-1/4 left-1/4 w-[600px] h-[600px] bg-primary/20 rounded-full blur-[150px]"
            animate={{
              x: [0, 50, 0],
              y: [0, 30, 0],
              scale: [1, 1.1, 1],
            }}
            transition={{
              duration: 8,
              repeat: Infinity,
              ease: "easeInOut",
            }}
          />
          <motion.div
            className="absolute bottom-1/4 right-1/4 w-[500px] h-[500px] bg-accent/20 rounded-full blur-[130px]"
            animate={{
              x: [0, -40, 0],
              y: [0, -20, 0],
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

        {/* Floating elements */}
        <div className="absolute inset-0 overflow-hidden pointer-events-none">
          {[...Array(5)].map((_, i) => (
            <motion.div
              key={i}
              className="absolute w-2 h-2 bg-primary/30 rounded-full"
              style={{
                left: `${20 + i * 15}%`,
                top: `${30 + (i % 3) * 20}%`,
              }}
              animate={{
                y: [0, -30, 0],
                opacity: [0.3, 0.8, 0.3],
              }}
              transition={{
                duration: 3 + i * 0.5,
                repeat: Infinity,
                ease: "easeInOut",
                delay: i * 0.3,
              }}
            />
          ))}
        </div>

        <motion.div
          className="relative max-w-5xl mx-auto text-center"
          initial={false}
          animate="visible"
          variants={staggerContainer}
        >
          <motion.div
            variants={fadeInUp}
            className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-white/5 border border-white/10 mb-8 backdrop-blur-sm"
          >
            <Users className="w-4 h-4 text-primary" />
            <span className="text-sm text-white/70">The Operators</span>
          </motion.div>

          <motion.h1
            variants={fadeInUp}
            className="text-5xl sm:text-6xl md:text-7xl lg:text-8xl font-bold text-white leading-[0.9] mb-8"
          >
            The People Behind
            <br />
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-primary via-accent to-primary bg-[length:200%_auto] animate-gradient">
              The Systems
            </span>
          </motion.h1>

          <motion.p
            variants={fadeInUp}
            className="text-xl sm:text-2xl text-white/50 max-w-2xl mx-auto mb-12 leading-relaxed"
          >
            We don&apos;t just execute — we engineer growth.
            <br />
            <span className="text-white/70">Meet the team building your competitive advantage.</span>
          </motion.p>

          <motion.div variants={fadeInUp} className="flex items-center justify-center gap-4">
            <Link
              href="#founders"
              className="group inline-flex items-center gap-2 text-white/60 hover:text-white transition-colors"
            >
              Meet the Founders
              <ArrowRight className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
            </Link>
          </motion.div>
        </motion.div>
      </section>

      {/* FOUNDERS SECTION - Spotlight */}
      <section id="founders" className="py-24 px-4 sm:px-6 lg:px-8 border-t border-white/5 relative overflow-hidden">
        {/* Glow effect behind founders */}
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[800px] h-[400px] bg-primary/10 rounded-full blur-[150px] pointer-events-none" />

        <div className="max-w-6xl mx-auto relative">
          <motion.div
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, margin: "-100px" }}
            variants={staggerContainer}
          >
            <motion.div variants={fadeInUp} className="text-center mb-16">
              <span className="text-primary font-semibold text-sm tracking-wider uppercase mb-4 block">
                Leadership
              </span>
              <h2 className="text-3xl sm:text-4xl md:text-5xl font-bold text-white mb-4">
                The Founders
              </h2>
              <p className="text-white/50 text-lg max-w-2xl mx-auto">
                Visionaries who built Zelvoxx from the ground up. Systems thinkers. Growth architects.
              </p>
            </motion.div>

            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8 max-w-6xl mx-auto">
              {founders.map((founder, idx) => {
                let photoSrc: string | null = null;
                if (founder.name.toLowerCase().includes("karishma")) {
                  photoSrc = "/images/team/operator-karishma.webp";
                } else if (founder.image) {
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
                  if (idx === 0) photoSrc = "/images/team/founder-akshat.webp";
                  else if (idx === 1) photoSrc = "/images/team/founder-antara.webp";
                  else if (idx === 2 || founder.name.toLowerCase().includes("karishma")) photoSrc = "/images/team/operator-karishma.webp";
                }
                return (
                  <motion.div
                    key={founder._id}
                    variants={scaleIn}
                    className="group relative"
                  >
                    {/* Animated gradient border */}
                    <div className="absolute -inset-px bg-gradient-to-r from-primary via-accent to-primary rounded-3xl opacity-20 group-hover:opacity-50 blur-sm transition-opacity duration-500" />
                    
                    <div className="relative p-8 bg-[#0f0f14]/90 backdrop-blur-xl rounded-3xl border border-white/10 hover:border-white/20 transition-all duration-500">
                      {/* Glow on hover */}
                      <div className="absolute inset-0 rounded-3xl bg-gradient-to-br from-primary/5 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500" />

                      <div className="relative flex flex-col items-center text-center">
                        {/* Profile image */}
                        <div className="relative w-32 h-32 mb-6">
                          <div className="absolute inset-0 rounded-full bg-gradient-to-br from-primary to-accent opacity-20 blur-md group-hover:opacity-40 transition-opacity" />
                          <div className="relative w-full h-full rounded-full overflow-hidden border-2 border-white/10 group-hover:border-primary/30 transition-colors bg-[#0D0C18]">
                            {photoSrc ? (
                              <Image
                                src={photoSrc}
                                alt={founder.name}
                                fill
                                sizes="128px"
                                loading="lazy"
                                placeholder="blur"
                                blurDataURL="data:image/svg+xml;base64,PHN2ZyB4bWxucz0iaHR0cDovL3d3dy53My5vcmcvMjAwMC9zdmciIHZpZXdCb3g9IjAgMCA4IDUiPjxyZWN0IHdpZHRoPSI4IiBoZWlnaHQ9IjUiIGZpbGw9IiMxNDEzMjIiLz48L3N2Zz4="
                                className="object-cover group-hover:scale-110 transition-transform duration-700"
                              />
                            ) : (
                              <div className="w-full h-full flex items-center justify-center bg-gradient-to-br from-primary/20 to-accent/20">
                                <span className="text-4xl font-bold text-white/30">
                                  {founder.name.charAt(0)}
                                </span>
                              </div>
                            )}
                          </div>
                          {/* Founder badge */}
                          <div className="absolute -bottom-1 -right-1 w-8 h-8 rounded-full bg-primary flex items-center justify-center">
                            <Sparkles className="w-4 h-4 text-white" />
                          </div>
                        </div>

                        <h3 className="text-2xl font-bold text-white mb-2 group-hover:text-primary transition-colors">
                          {founder.name}
                        </h3>
                        <p className="text-primary font-semibold mb-4">{founder.role}</p>
                        {founder.shortBio && (
                          <p className="text-white/50 text-sm max-w-xs">{founder.shortBio}</p>
                        )}

                        {/* Social links */}
                        {founder.socialLinks && (
                          <div className="flex items-center gap-3 mt-6">
                            {founder.socialLinks.linkedin && (
                              <a
                                href={founder.socialLinks.linkedin}
                                target="_blank"
                                rel="noopener noreferrer"
                                className="w-10 h-10 rounded-full bg-white/5 flex items-center justify-center hover:bg-primary/20 transition-colors"
                              >
                                <svg className="w-5 h-5 text-white/60" fill="currentColor" viewBox="0 0 24 24"><path d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433c-1.144 0-2.063-.926-2.063-2.065 0-1.138.92-2.063 2.063-2.063 1.14 0 2.064.925 2.064 2.063 0 1.139-.925 2.065-2.064 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z"/></svg>
                              </a>
                            )}
                            {founder.socialLinks.twitter && (
                              <a
                                href={founder.socialLinks.twitter}
                                target="_blank"
                                rel="noopener noreferrer"
                                className="w-10 h-10 rounded-full bg-white/5 flex items-center justify-center hover:bg-primary/20 transition-colors"
                              >
                                <svg className="w-5 h-5 text-white/60" fill="currentColor" viewBox="0 0 24 24"><path d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-5.214-6.817L4.99 21.75H1.68l7.73-8.835L1.254 2.25H8.08l4.713 6.231zm-1.161 17.52h1.833L7.084 4.126H5.117z"/></svg>
                              </a>
                            )}
                          </div>
                        )}
                      </div>
                    </div>
                  </motion.div>
                );
              })}
            </div>
          </motion.div>
        </div>
      </section>

      {/* PHILOSOPHY SECTION */}
      <section className="py-24 px-4 sm:px-6 lg:px-8 bg-white/[0.02] border-y border-white/5">
        <div className="max-w-4xl mx-auto text-center">
          <motion.div
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, margin: "-100px" }}
            variants={staggerContainer}
          >
            <motion.div variants={fadeInUp} className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-primary/10 border border-primary/20 mb-8">
              <Zap className="w-4 h-4 text-primary" />
              <span className="text-sm text-primary font-medium">Our Philosophy</span>
            </motion.div>

            <motion.h2
              variants={fadeInUp}
              className="text-4xl sm:text-5xl md:text-6xl font-bold text-white mb-8 leading-tight"
            >
              We don&apos;t hire employees.
              <br />
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-primary to-accent">
                We build operators.
              </span>
            </motion.h2>

            <motion.div variants={fadeInUp} className="grid md:grid-cols-3 gap-6 mt-12">
              {[
                { icon: Target, text: "Execution over theory" },
                { icon: Zap, text: "Systems over tasks" },
                { icon: Users, text: "Results over effort" },
              ].map((item, idx) => (
                <div
                  key={idx}
                  className="p-6 bg-white/5 rounded-2xl border border-white/10 hover:border-primary/30 transition-all duration-300 hover:-translate-y-1"
                >
                  <item.icon className="w-8 h-8 text-primary mb-4 mx-auto" />
                  <p className="text-white/80 font-medium">{item.text}</p>
                </div>
              ))}
            </motion.div>
          </motion.div>
        </div>
      </section>

      {/* CTA SECTION - WORK WITH US */}
      <section className="py-24 px-4 sm:px-6 lg:px-8 relative overflow-hidden bg-gradient-to-b from-[#040408] via-[#090810] to-[#040408] border-t border-white/10">
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] bg-[#7C61FF]/10 rounded-full blur-[150px] pointer-events-none" />

        <div className="max-w-4xl mx-auto text-center relative z-10">
          <motion.div
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, margin: "-100px" }}
            variants={staggerContainer}
          >
            <motion.div
              variants={fadeInUp}
              className="inline-block mb-4"
            >
              <span className="text-xs font-bold tracking-[0.2em] text-[#A78BFA] uppercase px-4 py-1.5 rounded-full bg-[#7C61FF]/15 border border-[#7C61FF]/30 shadow-[0_0_15px_rgba(124,97,255,0.2)]">
                Work With Us
              </span>
            </motion.div>

            <motion.h2
              variants={fadeInUp}
              className="text-4xl sm:text-5xl md:text-6xl font-heading font-black text-white mb-6 tracking-tight leading-tight"
            >
              Work with a team that builds
              <br />
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-[#7C61FF] via-[#8B5CF6] to-[#A78BFA] drop-shadow-[0_0_30px_rgba(124,97,255,0.5)]">
                real growth systems.
              </span>
            </motion.h2>

            <motion.p
              variants={fadeInUp}
              className="text-lg sm:text-xl text-white/80 font-medium mb-10 max-w-2xl mx-auto leading-relaxed"
            >
              Ready to partner with operators who execute? Let&apos;s talk.
            </motion.p>

            <motion.div variants={fadeInUp} className="flex flex-col sm:flex-row items-center justify-center gap-4">
              <Link
                href="/contact"
                onClick={() => {
                  pushToDataLayer("connect_with_us_click", {
                    event_category: "engagement",
                    event_label: "Team Section Connect With Us",
                  });
                }}
                className="inline-flex items-center justify-center bg-gradient-to-r from-[#7C61FF] via-[#8B5CF6] to-[#A78BFA] hover:brightness-110 text-white px-8 py-4 rounded-full font-bold text-sm sm:text-base transition-all hover:scale-105 active:scale-95 shadow-[0_0_25px_rgba(124,97,255,0.45)] tracking-wide min-h-[48px] touch-manipulation"
              >
                Connect With Us
              </Link>

              <Link
                href="https://wa.me/919810601084"
                target="_blank"
                rel="noopener noreferrer"
                className="group inline-flex items-center justify-center gap-2 bg-white/10 hover:bg-white/20 text-white font-semibold px-8 py-4 rounded-full transition-all duration-300 hover:scale-105 min-h-[48px] touch-manipulation"
              >
                <MessageCircle className="w-5 h-5" />
                Chat on WhatsApp
              </Link>
            </motion.div>
          </motion.div>
        </div>
      </section>

      {/* Standard CTA Section */}
      <CTASection
        title="Join the team?"
        subtitle="We're always looking for exceptional operators. If you think you'd fit, reach out."
        primaryCtaText="Get in Touch"
        primaryCtaLink="/contact"
        secondaryCtaText="View Open Roles"
        secondaryCtaLink="/work-with-us#open-roles"
      />
    </>
  );
}
