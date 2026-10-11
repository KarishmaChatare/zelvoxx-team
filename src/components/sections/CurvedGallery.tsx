"use client";

import React, { useRef, useEffect, useState, useCallback } from "react";
import Image from "next/image";
import Link from "next/link";
import { ArrowUpRight, ChevronLeft, ChevronRight } from "lucide-react";
import gsap from "gsap";
import { Project } from "@/src/data/projects";

interface CurvedGalleryProps {
  projects: Project[];
}

export default function CurvedGallery({ projects }: CurvedGalleryProps) {
  const containerRef = useRef<HTMLDivElement>(null);
  const trackRef = useRef<HTMLDivElement>(null);
  const cardsRef = useRef<(HTMLDivElement | null)[]>([]);

  const [isMobile, setIsMobile] = useState(false);
  const [isTouch, setIsTouch] = useState(false);
  const [isHovered, setIsHovered] = useState(false);
  const [reducedMotion, setReducedMotion] = useState(false);

  // Smooth position tracking
  const targetXRef = useRef(0);
  const currentXRef = useRef(0);
  const velocityRef = useRef(0);
  const lastTimeRef = useRef<number | null>(null);

  // Drag tracking refs
  const isDraggingRef = useRef(false);
  const lastXRef = useRef(0);
  const dragDistanceRef = useRef(0);
  const preventClickRef = useRef(false);
  const lastScrollYRef = useRef(0);

  const animFrameRef = useRef<number | null>(null);
  const isInViewRef = useRef(false);
  const containerWidthRef = useRef(1200);

  // Large responsive card dimensions
  const getCardWidth = useCallback(() => {
    if (typeof window === "undefined") return 500;
    if (window.innerWidth < 640) return 300;
    if (window.innerWidth < 1024) return 400;
    if (window.innerWidth < 1440) return 480;
    return 540;
  }, []);

  const getCardGap = useCallback(() => {
    if (typeof window === "undefined") return 32;
    if (window.innerWidth < 640) return 16;
    if (window.innerWidth < 1024) return 24;
    return 32;
  }, []);

  // Detect device characteristics and cache container dimensions
  useEffect(() => {
    const checkDevice = () => {
      setIsMobile(window.innerWidth < 768);
      setIsTouch(window.matchMedia("(pointer: coarse)").matches);
      setReducedMotion(window.matchMedia("(prefers-reduced-motion: reduce)").matches);
      if (containerRef.current) {
        containerWidthRef.current = containerRef.current.clientWidth || window.innerWidth;
      }
    };

    checkDevice();
    window.addEventListener("resize", checkDevice, { passive: true });
    return () => window.removeEventListener("resize", checkDevice);
  }, []);

  // Fan-in entrance animation
  useEffect(() => {
    if (!cardsRef.current.length || reducedMotion) return;

    cardsRef.current.forEach((card, idx) => {
      if (!card) return;
      const distFromCenter = Math.min(idx, projects.length - idx);
      const delay = distFromCenter * 0.06;

      gsap.fromTo(
        card,
        {
          opacity: 0,
          scale: 0.8,
        },
        {
          opacity: 1,
          scale: 1,
          duration: 0.9,
          delay: 0.1 + delay,
          ease: "power3.out",
        }
      );
    });
  }, [projects.length, reducedMotion]);

  // Main high-precision render loop gated by IntersectionObserver
  useEffect(() => {
    const N = projects.length;
    if (N === 0) return;

    const baseDriftSpeed = reducedMotion ? 0 : -0.55;
    const lerpFactor = 0.075; // Ultra-smooth fluid damping

    const updateTransforms = (timestamp: number) => {
      if (!isInViewRef.current) {
        animFrameRef.current = null;
        return;
      }

      const dt = lastTimeRef.current ? Math.min(32, timestamp - lastTimeRef.current) / 16.67 : 1;
      lastTimeRef.current = timestamp;

      const containerWidth = containerWidthRef.current;
      const cardWidth = getCardWidth();
      const cardGap = getCardGap();
      const itemStride = cardWidth + cardGap;
      const totalTrackWidth = N * itemStride;

      // Inertia & Auto-drift
      if (!isDraggingRef.current) {
        // Friction decay
        velocityRef.current *= Math.pow(0.93, dt);
        if (Math.abs(velocityRef.current) < 0.05) {
          velocityRef.current = 0;
        }

        // Auto-drift when idle and not hovered
        if (!isHovered && Math.abs(velocityRef.current) < 0.1 && !reducedMotion) {
          targetXRef.current += baseDriftSpeed * dt;
        } else {
          targetXRef.current += velocityRef.current * dt;
        }
      }

      // Buttery smooth lerp to target position
      currentXRef.current += (targetXRef.current - currentXRef.current) * (lerpFactor * dt);

      const centerX = containerWidth / 2;

      // Update 3D card transforms
      for (let i = 0; i < N; i++) {
        const cardEl = cardsRef.current[i];
        if (!cardEl) continue;

        const rawOffset = i * itemStride + currentXRef.current;

        // Modulo wrapping around totalTrackWidth
        let offset = ((rawOffset % totalTrackWidth) + totalTrackWidth) % totalTrackWidth;
        if (offset > totalTrackWidth / 2) {
          offset -= totalTrackWidth;
        }

        const norm = offset / (cardWidth * 1.15);
        const absNorm = Math.abs(norm);

        if (reducedMotion) {
          cardEl.style.transform = `translate3d(${centerX + offset - cardWidth / 2}px, 0, 0)`;
          cardEl.style.zIndex = `${Math.round(50 - absNorm * 10)}`;
          continue;
        }

        // 3D Perspective Arc Geometry
        const maxRotation = isMobile ? 18 : 26;
        const rotateY = Math.max(-maxRotation, Math.min(maxRotation, -norm * (isMobile ? 18 : 24)));
        const translateZ = -Math.pow(Math.min(absNorm, 2.8), 1.6) * (isMobile ? 50 : 115);
        const translateY = Math.pow(Math.min(absNorm, 2.5), 1.8) * (isMobile ? 6 : 14);
        const scale = Math.max(0.75, 1.1 - absNorm * 0.11);
        const opacity = Math.max(0.45, 1 - absNorm * 0.22);
        const zIndexStr = `${Math.round(100 - absNorm * 25)}`;

        const xPos = centerX + offset - cardWidth / 2;

        cardEl.style.transform = `translate3d(${xPos}px, ${translateY}px, ${translateZ}px) rotateY(${rotateY}deg) scale(${scale})`;
        cardEl.style.opacity = `${opacity}`;
        if (cardEl.style.zIndex !== zIndexStr) {
          cardEl.style.zIndex = zIndexStr;
        }
      }

      animFrameRef.current = requestAnimationFrame(updateTransforms);
    };

    // IntersectionObserver to only animate when within viewport
    const container = containerRef.current;
    let observer: IntersectionObserver | null = null;

    if (container) {
      observer = new IntersectionObserver(
        (entries) => {
          entries.forEach((entry) => {
            isInViewRef.current = entry.isIntersecting;
            if (entry.isIntersecting) {
              if (containerRef.current) {
                containerWidthRef.current = containerRef.current.clientWidth || window.innerWidth;
              }
              lastTimeRef.current = null;
              if (!animFrameRef.current) {
                animFrameRef.current = requestAnimationFrame(updateTransforms);
              }
            } else {
              if (animFrameRef.current) {
                cancelAnimationFrame(animFrameRef.current);
                animFrameRef.current = null;
              }
            }
          });
        },
        { rootMargin: "300px 0px 300px 0px" }
      );
      observer.observe(container);
    }

    return () => {
      if (observer) observer.disconnect();
      if (animFrameRef.current) {
        cancelAnimationFrame(animFrameRef.current);
        animFrameRef.current = null;
      }
    };
  }, [projects.length, isHovered, reducedMotion, getCardWidth, getCardGap, isMobile]);

  // Zero-reflow passive scroll linkage
  useEffect(() => {
    if (reducedMotion) return;

    lastScrollYRef.current = window.scrollY;

    const handleScroll = () => {
      if (!isInViewRef.current) {
        lastScrollYRef.current = window.scrollY;
        return;
      }
      const delta = window.scrollY - lastScrollYRef.current;
      targetXRef.current -= delta * 0.22;
      lastScrollYRef.current = window.scrollY;
    };

    window.addEventListener("scroll", handleScroll, { passive: true });
    return () => window.removeEventListener("scroll", handleScroll);
  }, [reducedMotion]);

  // Trackpad horizontal wheel support
  useEffect(() => {
    const container = containerRef.current;
    if (!container) return;

    const handleWheel = (e: WheelEvent) => {
      if (Math.abs(e.deltaX) > Math.abs(e.deltaY) * 0.8) {
        e.preventDefault();
        targetXRef.current -= e.deltaX * 0.9;
        velocityRef.current = -e.deltaX * 0.4;
      }
    };

    container.addEventListener("wheel", handleWheel, { passive: false });
    return () => container.removeEventListener("wheel", handleWheel);
  }, []);

  // Pointer drag handling
  const handlePointerDown = (e: React.PointerEvent) => {
    isDraggingRef.current = true;
    lastXRef.current = e.clientX;
    dragDistanceRef.current = 0;
    preventClickRef.current = false;
    velocityRef.current = 0;

    const target = e.currentTarget as HTMLElement;
    target.setPointerCapture(e.pointerId);
  };

  const handlePointerMove = (e: React.PointerEvent) => {
    if (!isDraggingRef.current) return;

    const currentClientX = e.clientX;
    const delta = currentClientX - lastXRef.current;
    lastXRef.current = currentClientX;

    dragDistanceRef.current += Math.abs(delta);
    if (dragDistanceRef.current > 6) {
      preventClickRef.current = true;
    }

    targetXRef.current += delta * 1.15;
    velocityRef.current = delta * 1.1;
  };

  const handlePointerUp = (e: React.PointerEvent) => {
    if (!isDraggingRef.current) return;
    isDraggingRef.current = false;

    try {
      const target = e.currentTarget as HTMLElement;
      target.releasePointerCapture(e.pointerId);
    } catch {
      // Ignore pointer release error
    }
  };

  // Step button handlers with smooth GSAP tween
  const handleStep = (direction: "left" | "right") => {
    const cardWidth = getCardWidth();
    const cardGap = getCardGap();
    const stride = cardWidth + cardGap;
    velocityRef.current = 0;
    const delta = direction === "left" ? stride : -stride;
    targetXRef.current += delta;
  };

  return (
    <div className="relative w-full overflow-hidden">
      {/* 3D Perspective Gallery Viewport (Tightly aligned to eliminate dead space) */}
      <div
        ref={containerRef}
        data-cursor="DRAG"
        onMouseEnter={() => !isTouch && setIsHovered(true)}
        onMouseLeave={() => !isTouch && setIsHovered(false)}
        onPointerDown={handlePointerDown}
        onPointerMove={handlePointerMove}
        onPointerUp={handlePointerUp}
        onPointerCancel={handlePointerUp}
        className="relative w-full h-[260px] sm:h-[350px] md:h-[420px] lg:h-[480px] xl:h-[510px] overflow-hidden select-none cursor-grab active:cursor-grabbing touch-pan-y [perspective:1000px] md:[perspective:1350px] [perspective-origin:center_45%]"
      >
        {/* Theatrical Vignette Shadows */}
        <div className="absolute inset-y-0 left-0 w-16 sm:w-28 md:w-40 bg-gradient-to-r from-[#07060D] via-[#07060D]/85 to-transparent pointer-events-none z-30" />
        <div className="absolute inset-y-0 right-0 w-16 sm:w-28 md:w-40 bg-gradient-to-l from-[#07060D] via-[#07060D]/85 to-transparent pointer-events-none z-30" />

        {/* 3D Track Container */}
        <div
          ref={trackRef}
          className="relative w-full h-full [transform-style:preserve-3d]"
        >
          {projects.map((project, idx) => {
            const isCenterLead = idx === 0;

            return (
              <div
                key={project.slug}
                ref={(el) => {
                  cardsRef.current[idx] = el;
                }}
                className="absolute top-2 sm:top-3 md:top-4 left-0 w-[300px] sm:w-[400px] lg:w-[480px] xl:w-[540px] h-[220px] sm:h-[300px] md:h-[360px] lg:h-[420px] xl:h-[450px] transition-[filter] duration-300 [transform-style:preserve-3d] [backface-visibility:hidden] [will-change:transform,opacity]"
              >
                <Link
                  href={`/our-work/${project.slug}`}
                  data-cursor="VIEW"
                  onClick={(e) => {
                    if (preventClickRef.current) {
                      e.preventDefault();
                    }
                  }}
                  className="group relative block w-full h-full rounded-2xl sm:rounded-3xl overflow-hidden bg-[#0F0E1B] border border-white/10 hover:border-[#7C61FF]/70 shadow-[0_20px_55px_rgba(0,0,0,0.85)] hover:shadow-[0_25px_75px_rgba(124,97,255,0.25)] transition-all duration-500"
                >
                  {/* Top highlight rim */}
                  <div className="absolute top-0 inset-x-0 h-[1.5px] bg-gradient-to-r from-transparent via-[#7C61FF]/60 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500 z-20" />

                  {/* Screenshot Image Container with solid base background and blur fallback */}
                  <div className="absolute inset-0 bg-[#0F0E1B]">
                    <Image
                      src={project.image}
                      alt={project.name}
                      fill
                      priority={idx < 4}
                      loading={idx < 4 ? "eager" : "lazy"}
                      placeholder="blur"
                      blurDataURL="data:image/svg+xml;base64,PHN2ZyB4bWxucz0iaHR0cDovL3d3dy53My5vcmcvMjAwMC9zdmciIHZpZXdCb3g9IjAgMCA4IDUiPjxyZWN0IHdpZHRoPSI4IiBoZWlnaHQ9IjUiIGZpbGw9IiMxMjExMWUiLz48L3N2Zz4="
                      sizes="(max-width: 640px) 300px, (max-width: 1024px) 400px, 540px"
                      className="object-cover object-top transition-transform duration-700 ease-out group-hover:scale-105"
                      draggable={false}
                    />
                  </div>

                  {/* Subtle dark ambient bottom gradient */}
                  <div className="absolute inset-x-0 bottom-0 h-28 bg-gradient-to-t from-[#0A0912]/95 via-[#0A0912]/45 to-transparent pointer-events-none z-10" />

                  {/* Project name & arrow pill fading in on hover */}
                  <div className="absolute inset-x-0 bottom-0 p-4 sm:p-5 z-20 flex items-center justify-between opacity-0 group-hover:opacity-100 transition-all duration-300 transform translate-y-2 group-hover:translate-y-0 pointer-events-none">
                    <div className="px-3.5 py-1.5 rounded-full bg-black/65 backdrop-blur-md border border-white/15 text-white font-heading font-semibold text-xs sm:text-sm tracking-tight shadow-xl flex items-center gap-2">
                      <span>{project.name}</span>
                    </div>

                    <div className="w-8 h-8 sm:w-9 sm:h-9 rounded-full bg-[#7C61FF] text-white flex items-center justify-center shadow-lg shadow-[#7C61FF]/40">
                      <ArrowUpRight className="w-4 h-4 group-hover:translate-x-0.5 group-hover:-translate-y-0.5 transition-transform" />
                    </div>
                  </div>
                </Link>
              </div>
            );
          })}
        </div>
      </div>

      {/* Floating Arrow Controls */}
      <div className="hidden sm:flex items-center justify-center gap-3 mt-3 mb-1 z-20 relative">
        <button
          onClick={() => handleStep("left")}
          aria-label="Previous project"
          className="w-10 h-10 rounded-full bg-white/[0.04] hover:bg-[#7C61FF]/20 border border-white/10 hover:border-[#7C61FF]/50 text-white/70 hover:text-white flex items-center justify-center transition-all duration-300 shadow-md active:scale-95"
        >
          <ChevronLeft className="w-5 h-5" />
        </button>
        <button
          onClick={() => handleStep("right")}
          aria-label="Next project"
          className="w-10 h-10 rounded-full bg-white/[0.04] hover:bg-[#7C61FF]/20 border border-white/10 hover:border-[#7C61FF]/50 text-white/70 hover:text-white flex items-center justify-center transition-all duration-300 shadow-md active:scale-95"
        >
          <ChevronRight className="w-5 h-5" />
        </button>
      </div>
    </div>
  );
}
