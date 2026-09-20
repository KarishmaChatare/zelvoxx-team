"use client";

import Link from "next/link";
import Image from "next/image";
import { motion } from "framer-motion";
import { ArrowLeft, Quote, Star, MessageCircle, Heart, ThumbsUp } from "lucide-react";
import { urlForImage } from "@/sanity/lib/image";
import DynamicBackground from "@/src/components/ui/DynamicBackground";

interface TestimonialsContentClientProps {
  testimonialsData: any[];
}

export default function TestimonialsContentClient({ testimonialsData }: TestimonialsContentClientProps) {
  return (
    <main className="min-h-screen bg-background text-white selection:bg-primary/30 relative">
      {/* Dynamic Background */}
      <DynamicBackground variant="purple" intensity="medium" />

      {/* Page Content */}
      <div className="relative z-10 pt-24">
        {/* Page Header */}
        <section className="py-20 md:py-32 relative overflow-hidden">
          {/* Floating hearts and likes animation */}
          <div className="absolute inset-0 overflow-hidden pointer-events-none">
            {[...Array(8)].map((_, i) => (
              <motion.div
                key={i}
                className="absolute"
                style={{
                  right: `${5 + i * 12}%`,
                  top: `${15 + (i % 4) * 20}%`,
                }}
                animate={{
                  opacity: [0.2, 0.6, 0.2],
                  y: [0, -30, 0],
                  scale: [0.8, 1.2, 0.8],
                }}
                transition={{
                  duration: 3 + i * 0.4,
                  repeat: Infinity,
                  ease: "easeInOut",
                  delay: i * 0.3,
                }}
              >
                {i % 2 === 0 ? (
                  <Heart className="w-5 h-5 text-primary/40" />
                ) : (
                  <ThumbsUp className="w-5 h-5 text-accent/40" />
                )}
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
                <MessageCircle className="w-4 h-4 text-primary" />
                <span className="text-xs font-bold tracking-wider text-primary uppercase">Client Reviews</span>
              </motion.div>

              <motion.h1 
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.8, delay: 0.3 }}
                className="text-4xl md:text-5xl lg:text-7xl font-heading font-black text-white leading-tight mb-6"
              >
                What our clients{" "}
                <span className="text-transparent bg-clip-text bg-gradient-to-r from-accent via-primary to-accent bg-300% animate-gradient">
                  say about us.
                </span>
              </motion.h1>
              
              <motion.p 
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.8, delay: 0.4 }}
                className="text-lg md:text-xl text-white/60 max-w-2xl mx-auto leading-relaxed"
              >
                Don&apos;t just take our word for it. Here&apos;s what industry leaders say about working with Zelvoxx.
              </motion.p>
            </motion.div>
          </div>
        </section>

        {/* Testimonials Grid */}
        <section className="py-20 pb-32">
          <div className="max-w-7xl mx-auto px-6">
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
              {testimonialsData.map((testimonial: any, idx: number) => {
                const imageUrl = urlForImage(testimonial.image);
                
                return (
                  <motion.div
                    key={testimonial._id || idx}
                    initial={{ opacity: 0, y: 40 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true, margin: "-50px" }}
                    transition={{ duration: 0.6, delay: idx * 0.1 }}
                    className="relative p-8 rounded-2xl bg-[#0f0f14] border border-white/10 hover:border-primary/30 transition-all duration-300 hover:-translate-y-2 group"
                  >
                    {/* Top bar: Stars + Verified Partner Badge */}
                    <div className="flex items-center justify-between gap-3 mb-6">
                      <div className="flex gap-1 items-center">
                        {[...Array(5)].map((_, i) => (
                          <Star key={i} className="w-4 h-4 fill-[#A78BFA] text-[#A78BFA]" />
                        ))}
                        <span className="text-xs text-white/60 ml-1 font-semibold">5.0</span>
                      </div>
                      <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-emerald-500/10 border border-emerald-500/20 text-emerald-400 text-xs font-semibold">
                        <span>Verified Partner</span>
                      </div>
                    </div>
                    
                    {/* Quote Icon */}
                    <Quote className="w-10 h-10 text-primary/20 mb-4" />
                    
                    {/* Review */}
                    <p className="text-white/85 text-base sm:text-lg leading-relaxed mb-8 flex-grow">
                      &quot;{testimonial.review || testimonial.content}&quot;
                    </p>
                    
                    {/* Metric Outcome Footer */}
                    <div className="pt-4 border-t border-white/10 flex items-center justify-between mt-auto">
                      <div>
                        <span className="text-xs uppercase tracking-widest text-[#A78BFA] font-semibold block">Outcome</span>
                        <span className="text-sm font-semibold text-white/80">{testimonial.company || "Enterprise Partner"}</span>
                      </div>
                      <span className="text-2xl font-black font-heading text-transparent bg-clip-text bg-gradient-to-r from-primary to-accent">
                        {testimonial.metric || "+120%"}
                      </span>
                    </div>
                  </motion.div>
                );
              })}
            </div>

            {testimonialsData.length === 0 && (
              <div className="text-center py-20">
                <p className="text-white/60">No testimonials yet. Be our first!</p>
              </div>
            )}
          </div>
        </section>

        {/* CTA Section */}
        <section className="py-20 border-t border-white/5">
          <div className="max-w-4xl mx-auto px-6 text-center">
            <h2 className="text-3xl md:text-4xl font-heading font-black text-white mb-6">
              Ready to be our next success story?
            </h2>
            <p className="text-white/60 mb-8 max-w-xl mx-auto">
              Join the growing list of businesses that have transformed their digital presence with Zelvoxx.
            </p>
            <Link
              href="/"
              className="inline-block bg-primary hover:bg-primary/90 text-white px-8 py-4 rounded-full font-bold transition-all hover:scale-105"
            >
              Start Your Project
            </Link>
          </div>
        </section>
      </div>
    </main>
  );
}
