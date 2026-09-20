"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import { motion, AnimatePresence } from "framer-motion";
import { Cookie, X } from "lucide-react";

const CONSENT_STORAGE_KEY = "zelvoxx_cookie_consent";

export default function CookieConsent() {
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    // Check if user has already made a decision
    try {
      const storedConsent = localStorage.getItem(CONSENT_STORAGE_KEY);
      if (!storedConsent) {
        // Delay slightly for smooth page entry
        const timer = setTimeout(() => setIsVisible(true), 1200);
        return () => clearTimeout(timer);
      }
    } catch {
      // In case localStorage is disabled/restricted
    }
  }, []);

  const handleAccept = () => {
    try {
      localStorage.setItem(CONSENT_STORAGE_KEY, "accepted");
    } catch {}
    setIsVisible(false);
  };

  const handleDecline = () => {
    try {
      localStorage.setItem(CONSENT_STORAGE_KEY, "declined");
    } catch {}
    setIsVisible(false);
  };

  return (
    <AnimatePresence>
      {isVisible && (
        <motion.div
          initial={{ opacity: 0, y: 50, scale: 0.95 }}
          animate={{ opacity: 1, y: 0, scale: 1 }}
          exit={{ opacity: 0, y: 30, scale: 0.95 }}
          transition={{ duration: 0.4, ease: [0.22, 1, 0.36, 1] }}
          className="fixed bottom-20 sm:bottom-6 left-4 sm:left-6 right-4 sm:right-auto sm:max-w-md z-50 pointer-events-auto"
          role="dialog"
          aria-live="polite"
          aria-label="Cookie consent banner"
        >
          <div className="relative p-5 sm:p-6 rounded-2xl bg-[#0E0D17]/95 backdrop-blur-xl border border-white/10 shadow-[0_10px_40px_rgba(0,0,0,0.7),0_0_20px_rgba(124,97,255,0.15)] overflow-hidden">
            {/* Ambient accent glow */}
            <div className="absolute top-0 right-0 w-32 h-32 bg-[#7C61FF]/15 blur-2xl rounded-full pointer-events-none" />
            
            <div className="relative flex items-start gap-3.5">
              <div className="p-2.5 rounded-xl bg-[#7C61FF]/15 text-[#A78BFA] flex-shrink-0 mt-0.5 border border-[#7C61FF]/20">
                <Cookie className="w-5 h-5" />
              </div>

              <div className="flex-1 min-w-0 pr-4">
                <h4 className="text-white font-heading font-bold text-sm tracking-wide mb-1">
                  Cookie &amp; Privacy Notice
                </h4>
                <p className="text-white/70 font-body text-xs sm:text-[13px] leading-relaxed mb-4">
                  We use cookies and privacy-first analytics to optimize performance and elevate your browsing experience. Read our{" "}
                  <Link
                    href="/privacy-policy"
                    className="text-[#A78BFA] hover:underline font-medium"
                  >
                    Privacy Policy
                  </Link>{" "}
                  and{" "}
                  <Link
                    href="/cookie-policy"
                    className="text-[#A78BFA] hover:underline font-medium"
                  >
                    Cookie Policy
                  </Link>
                  .
                </p>

                <div className="flex items-center gap-2.5">
                  <button
                    onClick={handleAccept}
                    className="flex-1 py-2 px-4 rounded-xl bg-gradient-to-r from-[#7C61FF] to-[#8B5CF6] hover:brightness-110 text-white font-heading font-semibold text-xs sm:text-sm tracking-wide shadow-[0_0_15px_rgba(124,97,255,0.4)] transition-all active:scale-95"
                  >
                    Accept All
                  </button>
                  <button
                    onClick={handleDecline}
                    className="py-2 px-3 rounded-xl bg-white/5 hover:bg-white/10 text-white/60 hover:text-white border border-white/10 font-body text-xs transition-colors"
                  >
                    Necessary Only
                  </button>
                </div>
              </div>

              <button
                onClick={handleDecline}
                aria-label="Dismiss cookie notice"
                className="text-white/40 hover:text-white p-1 rounded-lg hover:bg-white/10 transition-colors"
              >
                <X className="w-4 h-4" />
              </button>
            </div>
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
