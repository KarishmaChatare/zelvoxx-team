"use client";

import React, { useRef, useState, useEffect, useCallback, ReactNode } from "react";
import { motion, useSpring, useTransform, useReducedMotion } from "framer-motion";

interface TiltCardProps {
  children: ReactNode;
  className?: string;
  maxTilt?: number; // max degrees tilt, defaults to 7deg
  glare?: boolean;
  glareOpacity?: number;
}

export default function TiltCard({
  children,
  className = "",
  maxTilt = 7,
  glare = true,
  glareOpacity = 0.18,
}: TiltCardProps) {
  const cardRef = useRef<HTMLDivElement>(null);
  const [isHovered, setIsHovered] = useState(false);
  const [isTouchDevice, setIsTouchDevice] = useState(false);
  const prefersReducedMotion = useReducedMotion();

  useEffect(() => {
    // Detect touch / coarse pointer devices where hover tilt is inactive
    if (typeof window !== "undefined") {
      setIsTouchDevice(window.matchMedia("(pointer: coarse)").matches || !!prefersReducedMotion);
    }
  }, [prefersReducedMotion]);

  // Spring physics for buttery smooth motion without snappy stops
  const springConfig = { damping: 20, stiffness: 260, mass: 0.5 };
  const x = useSpring(0, springConfig);
  const y = useSpring(0, springConfig);

  const rotateX = useTransform(y, [-0.5, 0.5], [maxTilt, -maxTilt]);
  const rotateY = useTransform(x, [-0.5, 0.5], [-maxTilt, maxTilt]);

  const handleMouseMove = useCallback(
    (e: React.MouseEvent<HTMLDivElement>) => {
      if (isTouchDevice || !cardRef.current) return;
      const rect = cardRef.current.getBoundingClientRect();
      const clientX = e.clientX - rect.left;
      const clientY = e.clientY - rect.top;

      // Normalized coordinates from -0.5 to 0.5
      const normX = (clientX / rect.width) - 0.5;
      const normY = (clientY / rect.height) - 0.5;

      x.set(normX);
      y.set(normY);

      // Direct DOM style update via CSS custom properties — zero React re-renders on mousemove!
      if (glare) {
        cardRef.current.style.setProperty("--glare-x", `${(clientX / rect.width) * 100}%`);
        cardRef.current.style.setProperty("--glare-y", `${(clientY / rect.height) * 100}%`);
      }
    },
    [x, y, glare, isTouchDevice]
  );

  const handleMouseEnter = () => {
    if (!isTouchDevice) {
      setIsHovered(true);
    }
  };

  const handleMouseLeave = () => {
    if (!isTouchDevice) {
      setIsHovered(false);
      x.set(0);
      y.set(0);
    }
  };

  // If mobile / touch device, render lightweight wrapper with zero 3D spring overhead
  if (isTouchDevice) {
    return <div className={`relative ${className}`}>{children}</div>;
  }

  return (
    <div
      ref={cardRef}
      onMouseMove={handleMouseMove}
      onMouseEnter={handleMouseEnter}
      onMouseLeave={handleMouseLeave}
      style={{ perspective: 1200 }}
      className={`relative ${className}`}
    >
      <motion.div
        style={{
          rotateX,
          rotateY,
          transformStyle: "preserve-3d",
          willChange: isHovered ? "transform" : "auto",
        }}
        className="w-full h-full relative"
      >
        {children}

        {/* Dynamic Specular Glare Overlay driven purely via CSS custom properties */}
        {glare && (
          <div
            aria-hidden="true"
            className="absolute inset-0 pointer-events-none rounded-[inherit] transition-opacity duration-300 z-30"
            style={{
              background: `radial-gradient(circle 240px at var(--glare-x, 50%) var(--glare-y, 50%), rgba(167, 139, 250, ${glareOpacity}), transparent 70%)`,
              opacity: isHovered ? 1 : 0,
            }}
          />
        )}
      </motion.div>
    </div>
  );
}
