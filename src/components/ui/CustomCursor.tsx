"use client";

import React, { useEffect, useRef } from "react";

export default function CustomCursor() {
  const containerRef = useRef<HTMLDivElement>(null);
  const ringRef = useRef<HTMLDivElement>(null);
  const ringInnerRef = useRef<HTMLDivElement>(null);
  const dotRef = useRef<HTMLDivElement>(null);
  const dotInnerRef = useRef<HTMLDivElement>(null);
  const labelRef = useRef<HTMLSpanElement>(null);

  useEffect(() => {
    // 1. Fallback: Automatically disable on touch / coarse-pointer devices
    const isCoarse = window.matchMedia("(pointer: coarse)").matches;
    const hasTouch = "ontouchstart" in window && !window.matchMedia("(pointer: fine)").matches;
    if (isCoarse || hasTouch) {
      return;
    }

    // Check reduced motion preference
    const prefersReducedMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches;

    // Add active class to document.body for hiding native cursor on desktop fine-pointer
    document.body.classList.add("has-custom-cursor");

    // Coordinates tracking
    let targetX = -100;
    let targetY = -100;
    let dotX = -100;
    let dotY = -100;
    let ringX = -100;
    let ringY = -100;
    let isInitialized = false;
    let isVisible = false;

    // State caching to prevent DOM thrashing
    let currentHovered = false;
    let currentLabel: string | null = null;
    let lastTarget: EventTarget | null = null;
    let lastHoverCheckTime = 0;

    // Lerp factors: Dot tracks near instantly (0.82), Ring trails softly (0.16)
    const dotLerp = prefersReducedMotion ? 1.0 : 0.82;
    const ringLerp = prefersReducedMotion ? 1.0 : 0.16;

    let animFrameId: number | null = null;

    // Render loop - Zero Reflow, Pure GPU translate3d
    const updateCursor = () => {
      if (isVisible) {
        // Lerp coordinates
        dotX += (targetX - dotX) * dotLerp;
        dotY += (targetY - dotY) * dotLerp;
        ringX += (targetX - ringX) * ringLerp;
        ringY += (targetY - ringY) * ringLerp;

        // Snap if infinitesimal
        if (Math.abs(targetX - dotX) < 0.05 && Math.abs(targetY - dotY) < 0.05) {
          dotX = targetX;
          dotY = targetY;
        }
        if (Math.abs(targetX - ringX) < 0.05 && Math.abs(targetY - ringY) < 0.05) {
          ringX = targetX;
          ringY = targetY;
        }

        if (dotRef.current) {
          dotRef.current.style.transform = `translate3d(${dotX}px, ${dotY}px, 0)`;
        }
        if (ringRef.current) {
          ringRef.current.style.transform = `translate3d(${ringX}px, ${ringY}px, 0)`;
        }
      }

      animFrameId = requestAnimationFrame(updateCursor);
    };

    animFrameId = requestAnimationFrame(updateCursor);

    // Apply hover state & label styling directly to DOM nodes without React re-render
    const applyHoverStyle = (hovered: boolean, label: string | null) => {
      currentHovered = hovered;
      currentLabel = label;

      if (!ringInnerRef.current || !dotInnerRef.current || !labelRef.current) return;

      if (hovered) {
        // Expanded ring: 54px with violet-blue gradient fill, glass rim, and inner glow
        ringInnerRef.current.style.width = "54px";
        ringInnerRef.current.style.height = "54px";
        ringInnerRef.current.style.borderColor = "rgba(167, 139, 250, 0.75)";
        ringInnerRef.current.style.background =
          "linear-gradient(135deg, rgba(124, 97, 255, 0.22) 0%, rgba(45, 156, 219, 0.20) 100%)";
        ringInnerRef.current.style.boxShadow =
          "0 0 24px rgba(124, 97, 255, 0.45), inset 0 0 12px rgba(45, 156, 219, 0.28)";
        ringInnerRef.current.style.backdropFilter = "blur(3px)";
        ringInnerRef.current.style.animation = "none"; // Pause breathing when hovering

        // Dot: hide so expanded ring and label read cleanly
        dotInnerRef.current.style.transform = "translate(-50%, -50%) scale(0)";
        dotInnerRef.current.style.opacity = "0";

        // Label update
        if (label) {
          labelRef.current.textContent = label;
          labelRef.current.style.opacity = "1";
          labelRef.current.style.transform = "scale(1)";
        } else {
          labelRef.current.textContent = "";
          labelRef.current.style.opacity = "0";
          labelRef.current.style.transform = "scale(0.85)";
        }
      } else {
        // Idle ring: 34px with thin violet border, subtle glass tint, and breathing glow
        ringInnerRef.current.style.width = "34px";
        ringInnerRef.current.style.height = "34px";
        ringInnerRef.current.style.borderColor = "rgba(124, 97, 255, 0.48)";
        ringInnerRef.current.style.background =
          "radial-gradient(circle, rgba(124, 97, 255, 0.06) 0%, rgba(45, 156, 219, 0.02) 100%)";
        ringInnerRef.current.style.boxShadow =
          "inset 0 0 8px rgba(124, 97, 255, 0.2), 0 0 12px rgba(124, 97, 255, 0.15)";
        ringInnerRef.current.style.backdropFilter = "none";

        // Idle breathing effect (disabled if prefersReducedMotion)
        if (!prefersReducedMotion) {
          ringInnerRef.current.style.animation = "cursor-breathe 3.5s ease-in-out infinite";
        }

        // Dot: visible and precise (8px)
        dotInnerRef.current.style.transform = "translate(-50%, -50%) scale(1)";
        dotInnerRef.current.style.opacity = "1";

        // Hide label
        labelRef.current.textContent = "";
        labelRef.current.style.opacity = "0";
        labelRef.current.style.transform = "scale(0.85)";
      }
    };

    // Fast, cached hover & context detection
    const evaluateTarget = (target: EventTarget | null) => {
      if (!target || !(target instanceof Element)) {
        if (currentHovered || currentLabel) applyHoverStyle(false, null);
        return;
      }

      const el = target as Element;

      // 1. Explicit data-cursor attribute
      const cursorTarget = el.closest("[data-cursor]") as HTMLElement | null;
      if (cursorTarget) {
        const val = cursorTarget.getAttribute("data-cursor")?.trim();
        if (val) {
          if (!currentHovered || currentLabel !== val) {
            applyHoverStyle(true, val);
          }
          return;
        }
      }

      // 2. Our Work / Portfolio cards -> "VIEW"
      const portfolioCard = el.closest('a[href*="/our-work"], [data-portfolio-card]');
      if (portfolioCard) {
        if (!currentHovered || currentLabel !== "VIEW") {
          applyHoverStyle(true, "VIEW");
        }
        return;
      }

      // 3. Draggable Gallery Viewport -> "DRAG"
      const dragTarget = el.closest(".cursor-grab, [data-gallery-track]");
      if (dragTarget) {
        if (!currentHovered || currentLabel !== "DRAG") {
          applyHoverStyle(true, "DRAG");
        }
        return;
      }

      // 4. General links & buttons -> "EXPLORE"
      const clickable = el.closest(
        'a, button, [role="button"], input[type="submit"], input[type="button"], .cursor-pointer'
      );
      if (clickable) {
        if (!currentHovered || currentLabel !== "EXPLORE") {
          applyHoverStyle(true, "EXPLORE");
        }
        return;
      }

      // 5. Text inputs -> subtle text cursor fallback
      const inputEl = el.closest('input, textarea, select, [contenteditable="true"]');
      if (inputEl) {
        if (currentHovered || currentLabel !== null) {
          applyHoverStyle(false, null);
        }
        return;
      }

      // Default: idle state
      if (currentHovered || currentLabel !== null) {
        applyHoverStyle(false, null);
      }
    };

    // Pointer move listener
    const onPointerMove = (e: MouseEvent) => {
      targetX = e.clientX;
      targetY = e.clientY;

      if (!isInitialized) {
        dotX = ringX = targetX;
        dotY = ringY = targetY;
        isInitialized = true;
      }

      if (!isVisible && containerRef.current) {
        isVisible = true;
        containerRef.current.style.opacity = "1";
      }

      if (e.target !== lastTarget) {
        lastTarget = e.target;
        evaluateTarget(e.target as HTMLElement | null);
      }
    };

    // Boundary cross listener (instant response on entering new element)
    const onPointerOver = (e: MouseEvent) => {
      if (e.target !== lastTarget) {
        lastTarget = e.target;
        evaluateTarget(e.target as HTMLElement | null);
      }
    };

    // Window enter/leave listeners
    const onPointerLeaveWindow = () => {
      isVisible = false;
      if (containerRef.current) {
        containerRef.current.style.opacity = "0";
      }
    };

    const onPointerEnterWindow = () => {
      isVisible = true;
      if (containerRef.current) {
        containerRef.current.style.opacity = "1";
      }
    };

    window.addEventListener("pointermove", onPointerMove as EventListener, { passive: true });
    window.addEventListener("pointerover", onPointerOver as EventListener, { passive: true });
    document.documentElement.addEventListener("pointerleave", onPointerLeaveWindow);
    document.documentElement.addEventListener("pointerenter", onPointerEnterWindow);

    return () => {
      if (animFrameId) cancelAnimationFrame(animFrameId);
      document.body.classList.remove("has-custom-cursor");
      window.removeEventListener("pointermove", onPointerMove as EventListener);
      window.removeEventListener("pointerover", onPointerOver as EventListener);
      document.documentElement.removeEventListener("pointerleave", onPointerLeaveWindow);
      document.documentElement.removeEventListener("pointerenter", onPointerEnterWindow);
    };
  }, []);

  return (
    <div
      ref={containerRef}
      aria-hidden="true"
      className="pointer-events-none fixed inset-0 z-[99999] overflow-hidden opacity-0 transition-opacity duration-200 select-none"
      style={{ contain: "layout style paint" }}
    >
      {/* Outer Trailing Ring */}
      <div
        ref={ringRef}
        className="absolute top-0 left-0 will-change-transform pointer-events-none"
        style={{ transform: "translate3d(-100px, -100px, 0)" }}
      >
        <div
          ref={ringInnerRef}
          className="relative flex items-center justify-center rounded-full pointer-events-none transition-[width,height,background-color,border-color,box-shadow] duration-250 ease-out"
          style={{
            transform: "translate(-50%, -50%)",
            width: "34px",
            height: "34px",
            border: "1px solid rgba(124, 97, 255, 0.48)",
            background:
              "radial-gradient(circle, rgba(124, 97, 255, 0.06) 0%, rgba(45, 156, 219, 0.02) 100%)",
            boxShadow:
              "inset 0 0 8px rgba(124, 97, 255, 0.2), 0 0 12px rgba(124, 97, 255, 0.15)",
            animation: "cursor-breathe 3.5s ease-in-out infinite",
          }}
        >
          {/* Centered Context Label */}
          <span
            ref={labelRef}
            className="text-[9.5px] font-heading font-black tracking-[0.18em] text-white uppercase select-none pointer-events-none opacity-0 transform scale-90 transition-all duration-200 ease-out drop-shadow-[0_1px_4px_rgba(0,0,0,0.8)]"
          />
        </div>
      </div>

      {/* Inner Solid Dot (8px) */}
      <div
        ref={dotRef}
        className="absolute top-0 left-0 will-change-transform pointer-events-none"
        style={{ transform: "translate3d(-100px, -100px, 0)" }}
      >
        <div
          ref={dotInnerRef}
          className="w-2 h-2 rounded-full pointer-events-none transition-transform duration-200 ease-out"
          style={{
            transform: "translate(-50%, -50%) scale(1)",
            background:
              "radial-gradient(circle, #FFFFFF 20%, #A78BFA 65%, #7C61FF 100%)",
            boxShadow:
              "0 0 8px rgba(124, 97, 255, 0.8), 0 0 2px #FFFFFF",
          }}
        />
      </div>
    </div>
  );
}
