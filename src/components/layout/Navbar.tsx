"use client";

import Link from "next/link";
import Image from "next/image";
import { motion, AnimatePresence } from "framer-motion";
import { Menu, X } from "lucide-react";
import { useState, useEffect, useRef } from "react";

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
  const [isScrolled, setIsScrolled] = useState(false);

  const navRef = useRef<HTMLElement>(null);
  const isHiddenRef = useRef(false);
  const isScrolledRef = useRef(false);
  const lastScrollY = useRef(0);

  useEffect(() => {
    let ticking = false;
    let accumulatedDelta = 0;
    const hideThreshold = 30; // Intentional downward scroll required to hide
    const showThreshold = 12; // Gentle upward flick required to reveal

    let cachedMaxScroll = 0;
    const updateDimensions = () => {
      cachedMaxScroll = Math.max(0, document.documentElement.scrollHeight - window.innerHeight);
    };
    updateDimensions();
    window.addEventListener("resize", updateDimensions, { passive: true });

    const updateNavbar = () => {
      const currentScrollY = Math.max(0, window.scrollY);
      const navEl = navRef.current;

      // Handle scrolled styling (soft background & border glow transition)
      const shouldBeScrolled = currentScrollY > 20;
      if (shouldBeScrolled !== isScrolledRef.current) {
        isScrolledRef.current = shouldBeScrolled;
        setIsScrolled(shouldBeScrolled);
      }

      // Always keep navbar visible near the top
      if (currentScrollY <= 30 || isOpen) {
        accumulatedDelta = 0;
        if (isHiddenRef.current && navEl) {
          isHiddenRef.current = false;
          navEl.style.transform = "translate3d(0, 0, 0)";
          navEl.style.pointerEvents = "auto";
        }
        lastScrollY.current = currentScrollY;
        ticking = false;
        return;
      }

      // Avoid rubber-band overscroll at page bottom without reading DOM every frame
      if (cachedMaxScroll > 0 && currentScrollY >= cachedMaxScroll - 20) {
        ticking = false;
        return;
      }

      const delta = currentScrollY - lastScrollY.current;

      // Reset accumulation when reversing scroll direction
      if ((delta > 0 && accumulatedDelta < 0) || (delta < 0 && accumulatedDelta > 0)) {
        accumulatedDelta = 0;
      }
      accumulatedDelta += delta;

      // Hide or show via direct GPU-accelerated translate3d (0ms latency, zero re-renders)
      if (accumulatedDelta > hideThreshold) {
        if (!isHiddenRef.current && navEl) {
          isHiddenRef.current = true;
          navEl.style.transform = "translate3d(0, -100%, 0)";
          navEl.style.pointerEvents = "none";
        }
      } else if (accumulatedDelta < -showThreshold) {
        if (isHiddenRef.current && navEl) {
          isHiddenRef.current = false;
          navEl.style.transform = "translate3d(0, 0, 0)";
          navEl.style.pointerEvents = "auto";
        }
      }

      lastScrollY.current = currentScrollY;
      ticking = false;
    };

    const handleScroll = () => {
      if (!ticking) {
        window.requestAnimationFrame(updateNavbar);
        ticking = true;
      }
    };

    window.addEventListener("scroll", handleScroll, { passive: true });
    return () => {
      window.removeEventListener("scroll", handleScroll);
      window.removeEventListener("resize", updateDimensions);
    };
  }, [isOpen]);

  // Keep visible if mobile drawer opens
  useEffect(() => {
    if (isOpen && navRef.current) {
      isHiddenRef.current = false;
      navRef.current.style.transform = "translate3d(0, 0, 0)";
      navRef.current.style.pointerEvents = "auto";
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "unset";
    }
    return () => {
      document.body.style.overflow = "unset";
    };
  }, [isOpen]);

  // Close menu on Escape
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === "Escape") setIsOpen(false);
    };
    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, []);

  return (
    <nav
      ref={navRef}
      style={{
        transform: "translate3d(0, 0, 0)",
        transition:
          "transform 380ms cubic-bezier(0.16, 1, 0.3, 1), background-color 300ms ease, border-color 300ms ease, box-shadow 300ms ease",
        willChange: "transform",
      }}
      className={`fixed top-0 left-0 w-full z-50 backdrop-blur-xl ${
        isScrolled
          ? "bg-[#08080C]/90 border-b border-[#7C61FF]/20 shadow-[0_10px_30px_rgba(0,0,0,0.8),0_1px_0_rgba(167,139,250,0.1)]"
          : "bg-[#08080C]/40 border-b border-white/[0.05]"
      }`}
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 h-16 sm:h-18 lg:h-20 flex items-center justify-between">
        {/* Brand Logo */}
        <Link
          href="/"
          className="relative z-[60] flex items-center group py-1 focus:outline-none focus-visible:ring-2 focus-visible:ring-[#7C61FF]/50 rounded-lg"
          aria-label="Zelvoxx Home"
        >
          <div className="relative h-8 sm:h-9 lg:h-10 flex items-center transition-all duration-300 group-hover:scale-105 group-hover:drop-shadow-[0_0_16px_rgba(124,97,255,0.5)]">
            <Image
              src="/images/zelvoxx-zk-logo.webp"
              alt="Zelvoxx Digital Growth Systems Logo"
              width={140}
              height={76}
              priority
              className="h-full w-auto object-contain rounded-md"
            />
          </div>
        </Link>

        {/* Desktop Navigation (>= 1280px / xl) */}
        <div className="hidden xl:flex items-center gap-1.5 2xl:gap-3 text-xs 2xl:text-sm font-medium tracking-wide">
          {NAV_ITEMS.map((item) => (
            <Link
              key={item.href}
              href={item.href}
              className="text-gray-300 hover:text-white px-2.5 py-1.5 2xl:px-3 rounded-full hover:bg-white/[0.06] transition-all duration-200 whitespace-nowrap"
            >
              {item.label}
            </Link>
          ))}
        </div>

        {/* Desktop Merged CTA Button (>= 1280px / xl) */}
        <div className="hidden xl:block">
          <Link
            href="/contact"
            className="inline-block bg-gradient-to-r from-[#7C61FF] via-[#8B5CF6] to-[#A78BFA] hover:brightness-110 text-white px-5 py-2.5 2xl:px-6 2xl:py-2.5 rounded-full font-bold text-xs 2xl:text-sm transition-all hover:scale-105 active:scale-95 shadow-[0_0_25px_rgba(124,97,255,0.45)] tracking-wide whitespace-nowrap"
          >
            Connect With Us
          </Link>
        </div>

        {/* Mobile & Tablet Hamburger Toggle (< 1280px / xl) */}
        <button
          type="button"
          aria-label={isOpen ? "Close Navigation Menu" : "Open Navigation Menu"}
          aria-expanded={isOpen}
          aria-controls="mobile-menu-overlay"
          className="xl:hidden text-white relative z-[60] min-w-[44px] min-h-[44px] flex items-center justify-center p-2 rounded-lg hover:bg-white/10 transition-colors focus:outline-none touch-manipulation"
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
            className="xl:hidden fixed inset-0 bg-[#08080C]/98 backdrop-blur-2xl z-50 flex flex-col justify-between pt-24 pb-10 px-6 overflow-y-auto h-[100dvh] w-full"
          >
            <div className="flex flex-col items-center justify-center space-y-2 sm:space-y-3 my-auto">
              {NAV_ITEMS.map((item, index) => (
                <motion.div
                  key={item.href}
                  initial={{ opacity: 0, y: 15 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: index * 0.04 }}
                  className="w-full flex justify-center"
                >
                  <Link
                    href={item.href}
                    onClick={() => setIsOpen(false)}
                    className="text-lg sm:text-2xl md:text-3xl font-heading font-black text-gray-200 hover:text-primary transition-colors uppercase tracking-wider min-h-[44px] px-4 py-2 flex items-center justify-center rounded-xl hover:bg-white/5 active:scale-95 touch-manipulation text-center"
                  >
                    {item.label}
                  </Link>
                </motion.div>
              ))}
            </div>

            {/* Mobile Bottom CTA Button */}
            <div className="w-full max-w-sm mx-auto pt-6">
              <Link
                href="/contact"
                onClick={() => setIsOpen(false)}
                className="w-full text-center bg-gradient-to-r from-[#7C61FF] via-[#8B5CF6] to-[#A78BFA] hover:brightness-110 text-white py-4 rounded-full font-bold text-base block transition-all active:scale-95 shadow-[0_0_25px_rgba(124,97,255,0.45)] tracking-wide"
              >
                Connect With Us
              </Link>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </nav>
  );
}