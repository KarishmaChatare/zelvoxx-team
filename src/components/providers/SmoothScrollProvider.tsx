"use client";

import React, { useEffect, createContext, useContext, useRef } from "react";
import { usePathname } from "next/navigation";
import Lenis from "lenis";
import gsap from "gsap";

interface SmoothScrollContextType {
  lenis: Lenis | null;
  scrollTo: (
    target: string | number | HTMLElement,
    options?: { offset?: number; duration?: number; immediate?: boolean }
  ) => void;
}

const SmoothScrollContext = createContext<SmoothScrollContextType>({
  lenis: null,
  scrollTo: () => {},
});

export function useSmoothScroll() {
  return useContext(SmoothScrollContext);
}

export default function SmoothScrollProvider({
  children,
}: {
  children: React.ReactNode;
}) {
  const lenisRef = useRef<Lenis | null>(null);
  const pathname = usePathname();

  useEffect(() => {
    // Check if user prefers reduced motion
    const prefersReducedMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    if (prefersReducedMotion) return;

    // Single unified scroll driver synced to GSAP ticker
    const lenis = new Lenis({
      autoRaf: false,
      duration: 0.9,
      easing: (t) => Math.min(1, 1.001 - Math.pow(2, -10 * t)),
      orientation: "vertical",
      gestureOrientation: "vertical",
      smoothWheel: true,
      wheelMultiplier: 1.0,
      touchMultiplier: 1.0,
    });

    lenisRef.current = lenis;

    // Synchronize Lenis with single GSAP ticker (no duplicate RAF loops)
    const updateTicker = (time: number) => {
      lenis.raf(time * 1000);
    };

    gsap.ticker.add(updateTicker);
    gsap.ticker.lagSmoothing(500, 33);

    // Initial hash scroll if present
    if (window.location.hash) {
      setTimeout(() => {
        const hash = window.location.hash;
        if (hash && lenisRef.current) {
          lenisRef.current.scrollTo(hash, { offset: -80, duration: 0.8 });
        }
      }, 200);
    }

    return () => {
      gsap.ticker.remove(updateTicker);
      lenis.destroy();
      lenisRef.current = null;
    };
  }, []);

  // Handle route changes: instantly scroll to top or target hash
  useEffect(() => {
    if (!window.location.hash) {
      if (lenisRef.current) {
        lenisRef.current.scrollTo(0, { immediate: true });
      } else {
        window.scrollTo(0, 0);
      }
    } else {
      setTimeout(() => {
        const hash = window.location.hash;
        if (hash) {
          if (lenisRef.current) {
            lenisRef.current.scrollTo(hash, { offset: -80, duration: 0.8 });
          } else {
            document.querySelector(hash)?.scrollIntoView({ behavior: "smooth" });
          }
        }
      }, 150);
    }
  }, [pathname]);

  const scrollTo = (
    target: string | number | HTMLElement,
    options?: { offset?: number; duration?: number; immediate?: boolean }
  ) => {
    if (lenisRef.current) {
      lenisRef.current.scrollTo(target, options);
    } else {
      if (typeof target === "number") {
        window.scrollTo({
          top: target,
          behavior: options?.immediate ? "instant" : "smooth",
        });
      } else if (typeof target === "string") {
        const el = document.querySelector(target);
        if (el) {
          el.scrollIntoView({
            behavior: options?.immediate ? "instant" : "smooth",
          });
        }
      } else if (target instanceof HTMLElement) {
        target.scrollIntoView({
          behavior: options?.immediate ? "instant" : "smooth",
        });
      }
    }
  };

  return (
    <SmoothScrollContext.Provider
      value={{ lenis: lenisRef.current, scrollTo }}
    >
      {children}
    </SmoothScrollContext.Provider>
  );
}
