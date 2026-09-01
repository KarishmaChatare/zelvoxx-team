"use client";

import Link from "next/link";
import { motion, AnimatePresence } from "framer-motion";
import { Menu, X } from "lucide-react";
import { useState, useEffect } from "react";
import { CALENDLY_URL } from "@/src/constants/data";

const NAV_ITEMS = [
  { label: "OUR WORK", href: "/portfolio" },
  { label: "CASE STUDIES", href: "/case-studies" },
  { label: "WHY Zelvoxx", href: "/why-Zelvoxx" },
  { label: "OUR TEAM", href: "/team" },
  { label: "CAREERS", href: "/work-with-us" },
  { label: "PRICING", href: "/pricing" },
  { label: "REVIEWS", href: "/testimonials" },
];

export default function Navbar() {
  const [isOpen, setIsOpen] = useState(false);

  // Prevent background scrolling when mobile menu is open
  useEffect(() => {
    if (isOpen) {
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "unset";
    }
    return () => {
      document.body.style.overflow = "unset";
    };
  }, [isOpen]);

  // Close menu on Escape key press
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === "Escape") setIsOpen(false);
    };
    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, []);

  return (
    <motion.nav
      initial={{ y: -100 }}
      animate={{ y: 0 }}
      transition={{ type: "spring", stiffness: 100, damping: 20 }}
      className="fixed top-0 left-0 w-full z-50 bg-[#0B0B0B]/80 backdrop-blur-xl border-b border-white/10"
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 h-16 sm:h-20 lg:h-24 flex items-center justify-between">
        {/* Brand Logo */}
        <Link href="/" className="relative z-[60] flex items-center gap-1 group">
          <span className="text-xl sm:text-2xl lg:text-3xl font-heading font-black tracking-widest bg-gradient-to-r from-white via-white to-white/80 bg-clip-text text-transparent">
            ZELVOX
          </span>
          <span className="text-xl sm:text-2xl lg:text-3xl font-heading font-black text-transparent bg-clip-text bg-gradient-to-r from-[#6366f1] via-[#8b5cf6] to-[#a78bfa]">
            X
          </span>
        </Link>

        {/* Desktop Navigation (>= 1280px / xl) */}
        <div className="hidden xl:flex items-center gap-6 2xl:gap-8 text-xs 2xl:text-sm font-semibold tracking-wide">
          {NAV_ITEMS.map((item) => (
            <Link
              key={item.href}
              href={item.href}
              className="text-gray-300 hover:text-white transition-colors duration-200"
            >
              {item.label}
            </Link>
          ))}
          <Link
            href="/contact"
            className="px-4 py-2 bg-primary/20 border border-primary/40 rounded-full text-primary hover:bg-primary hover:text-white transition-all duration-200"
          >
            CONTACT
          </Link>
        </div>

        {/* Desktop CTA Button (>= 1280px / xl) */}
        <div className="hidden xl:block">
          <a
            href={CALENDLY_URL}
            target="_blank"
            rel="noopener noreferrer"
            className="inline-block bg-primary hover:bg-primary/90 text-white px-6 py-3 rounded-full font-bold text-sm transition-all hover:scale-105 active:scale-95 shadow-[0_0_20px_rgba(123,97,255,0.4)] tracking-wide whitespace-nowrap"
          >
            Book a Call
          </a>
        </div>

        {/* Mobile & Tablet Hamburger Toggle (< 1280px / xl) */}
        <button
          type="button"
          aria-label={isOpen ? "Close Navigation Menu" : "Open Navigation Menu"}
          aria-expanded={isOpen}
          aria-controls="mobile-menu-overlay"
          className="xl:hidden text-white relative z-[60] p-2 rounded-lg hover:bg-white/10 transition-colors focus:outline-none"
          onClick={() => setIsOpen(!isOpen)}
        >
          {isOpen ? <X className="w-7 h-7 sm:w-8 sm:h-8" /> : <Menu className="w-7 h-7 sm:w-8 sm:h-8" />}
        </button>
      </div>

      {/* Mobile & Tablet Full-Screen Overlay */}
      <AnimatePresence>
        {isOpen && (
          <motion.div
            id="mobile-menu-overlay"
            role="dialog"
            aria-modal="true"
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            transition={{ type: "tween", ease: "easeInOut", duration: 0.25 }}
            className="xl:hidden fixed inset-0 bg-[#0B0B0B]/98 backdrop-blur-2xl z-50 flex flex-col justify-between pt-24 pb-10 px-6 overflow-y-auto h-[100dvh] w-full"
          >
            <div className="flex flex-col items-center justify-center space-y-4 sm:space-y-5 my-auto">
              {NAV_ITEMS.map((item, index) => (
                <motion.div
                  key={item.href}
                  initial={{ opacity: 0, y: 15 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: index * 0.04 }}
                >
                  <Link
                    href={item.href}
                    onClick={() => setIsOpen(false)}
                    className="text-xl sm:text-2xl md:text-3xl font-heading font-black text-gray-200 hover:text-primary transition-colors uppercase tracking-wider block py-1"
                  >
                    {item.label}
                  </Link>
                </motion.div>
              ))}

              <motion.div
                initial={{ opacity: 0, y: 15 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: NAV_ITEMS.length * 0.04 }}
              >
                <Link
                  href="/contact"
                  onClick={() => setIsOpen(false)}
                  className="text-xl sm:text-2xl md:text-3xl font-heading font-black text-primary hover:text-white transition-colors uppercase tracking-wider block py-1"
                >
                  CONTACT
                </Link>
              </motion.div>
            </div>

            {/* Mobile Bottom CTA Button */}
            <div className="w-full max-w-sm mx-auto pt-6">
              <a
                href={CALENDLY_URL}
                target="_blank"
                rel="noopener noreferrer"
                onClick={() => setIsOpen(false)}
                className="w-full text-center bg-primary hover:bg-primary/90 text-white py-4 rounded-full font-bold text-base block transition-all active:scale-95 shadow-[0_0_25px_rgba(123,97,255,0.4)] tracking-wide"
              >
                Book a Call
              </a>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </motion.nav>
  );
}