"use client";

import { usePathname } from "next/navigation";

/**
 * FlowingBackground — Premium animated background layer.
 *
 * Each variant uses pure CSS animations on lightweight blurred gradient
 * divs for silky-smooth, GPU-accelerated motion. No canvas, no JS-driven
 * requestAnimationFrame loops, no particles.
 *
 * Variants:
 *   1. "waves"      — Diagonal flowing light waves (Home)
 *   2. "aurora"     — Horizontal aurora ribbons (Our Work / Portfolio)
 *   3. "silk"       — Vertical silk-curtain drift (Contact / Careers)
 *   4. "tidal"      — Slow expanding tidal pulse (Pricing / Testimonials)
 *   5. "nebula"     — Drifting nebula clouds (Team / Why Zelvoxx)
 *   6. "prism"      — Rotating prismatic sweep (Legal pages)
 */

type Variant = "waves" | "aurora" | "silk" | "tidal" | "nebula" | "prism";

/* ──────────────────────────── Route → variant map ──────────────────────────── */

function resolveVariant(pathname: string): Variant {
  if (pathname === "/") return "waves";
  if (pathname.startsWith("/our-work") || pathname.startsWith("/portfolio")) return "aurora";
  if (pathname === "/contact" || pathname.startsWith("/work-with-us")) return "silk";
  if (pathname.startsWith("/pricing") || pathname.startsWith("/testimonial")) return "tidal";
  if (pathname.startsWith("/team") || pathname.startsWith("/why-")) return "nebula";
  // Legal / policy / everything else
  return "prism";
}

/* ──────────────────────────── The component ──────────────────────────── */

export default function FlowingBackground() {
  const pathname = usePathname();

  // Don't render inside the Sanity Studio
  if (pathname.startsWith("/studio")) return null;

  const variant = resolveVariant(pathname);

  return (
    <div
      aria-hidden="true"
      className="pointer-events-none fixed inset-0 z-0 overflow-hidden"
      style={{ contain: "strict" }}
    >
      {variant === "waves" && <WavesVariant />}
      {variant === "aurora" && <AuroraVariant />}
      {variant === "silk" && <SilkVariant />}
      {variant === "tidal" && <TidalVariant />}
      {variant === "nebula" && <NebulaVariant />}
      {variant === "prism" && <PrismVariant />}
    </div>
  );
}

/* ════════════════════════════════════════════════════════════════════════════
   VARIANT 1 — Flowing Waves (Home)
   Diagonal light bands that drift across the viewport like soft ocean swells.
   ════════════════════════════════════════════════════════════════════════════ */
function WavesVariant() {
  return (
    <>
      {/* Wave band 1 — top-left to mid-right */}
      <div
        className="absolute w-[120%] h-[45%] -top-[10%] -left-[10%] animate-flowing-wave-1"
        style={{
          background:
            "linear-gradient(135deg, transparent 30%, rgba(124,97,255,0.04) 45%, rgba(139,92,246,0.06) 55%, transparent 70%)",
          transform: "rotate(-8deg) translate3d(0,0,0)",
          willChange: "transform, opacity",
        }}
      />
      {/* Wave band 2 — mid sweep */}
      <div
        className="absolute w-[130%] h-[35%] top-[35%] -left-[15%] animate-flowing-wave-2"
        style={{
          background:
            "linear-gradient(140deg, transparent 25%, rgba(99,102,241,0.035) 40%, rgba(124,97,255,0.05) 55%, transparent 72%)",
          transform: "rotate(-5deg) translate3d(0,0,0)",
          willChange: "transform, opacity",
        }}
      />
      {/* Wave band 3 — lower atmospheric */}
      <div
        className="absolute w-[110%] h-[40%] bottom-[0%] -right-[5%] animate-flowing-wave-3"
        style={{
          background:
            "linear-gradient(125deg, transparent 28%, rgba(167,139,250,0.03) 45%, rgba(139,92,246,0.04) 60%, transparent 75%)",
          transform: "rotate(3deg) translate3d(0,0,0)",
          willChange: "transform, opacity",
        }}
      />
    </>
  );
}

/* ════════════════════════════════════════════════════════════════════════════
   VARIANT 2 — Aurora Ribbons (Our Work / Portfolio)
   Horizontal ribbons of light that slowly undulate like northern lights.
   ════════════════════════════════════════════════════════════════════════════ */
function AuroraVariant() {
  return (
    <>
      {/* Ribbon 1 — top */}
      <div
        className="absolute w-[200%] h-[2px] top-[18%] -left-[50%] animate-aurora-ribbon-1"
        style={{
          background:
            "linear-gradient(90deg, transparent 0%, rgba(124,97,255,0.12) 25%, rgba(139,92,246,0.18) 50%, rgba(124,97,255,0.12) 75%, transparent 100%)",
          filter: "blur(20px)",
          height: "60px",
          willChange: "transform, opacity",
        }}
      />
      {/* Ribbon 2 — mid */}
      <div
        className="absolute w-[200%] h-[2px] top-[45%] -left-[50%] animate-aurora-ribbon-2"
        style={{
          background:
            "linear-gradient(90deg, transparent 0%, rgba(99,102,241,0.08) 30%, rgba(167,139,250,0.14) 50%, rgba(99,102,241,0.08) 70%, transparent 100%)",
          filter: "blur(28px)",
          height: "50px",
          willChange: "transform, opacity",
        }}
      />
      {/* Ribbon 3 — lower */}
      <div
        className="absolute w-[200%] h-[2px] top-[72%] -left-[50%] animate-aurora-ribbon-3"
        style={{
          background:
            "linear-gradient(90deg, transparent 0%, rgba(139,92,246,0.06) 20%, rgba(124,97,255,0.1) 50%, rgba(139,92,246,0.06) 80%, transparent 100%)",
          filter: "blur(24px)",
          height: "45px",
          willChange: "transform, opacity",
        }}
      />
    </>
  );
}

/* ════════════════════════════════════════════════════════════════════════════
   VARIANT 3 — Silk Curtain (Contact / Careers)
   Vertical sheets of soft light that sway gently like translucent curtains.
   ════════════════════════════════════════════════════════════════════════════ */
function SilkVariant() {
  return (
    <>
      {/* Curtain 1 — left side */}
      <div
        className="absolute w-[40%] h-[130%] -top-[15%] left-[8%] animate-silk-curtain-1"
        style={{
          background:
            "linear-gradient(180deg, transparent 0%, rgba(124,97,255,0.04) 30%, rgba(139,92,246,0.06) 50%, rgba(124,97,255,0.04) 70%, transparent 100%)",
          filter: "blur(40px)",
          willChange: "transform, opacity",
        }}
      />
      {/* Curtain 2 — right side */}
      <div
        className="absolute w-[35%] h-[130%] -top-[15%] right-[12%] animate-silk-curtain-2"
        style={{
          background:
            "linear-gradient(180deg, transparent 0%, rgba(99,102,241,0.03) 25%, rgba(167,139,250,0.05) 50%, rgba(99,102,241,0.03) 75%, transparent 100%)",
          filter: "blur(45px)",
          willChange: "transform, opacity",
        }}
      />
      {/* Curtain 3 — center accent */}
      <div
        className="absolute w-[25%] h-[120%] -top-[10%] left-[38%] animate-silk-curtain-3"
        style={{
          background:
            "linear-gradient(180deg, transparent 0%, rgba(124,97,255,0.025) 35%, rgba(139,92,246,0.04) 55%, transparent 100%)",
          filter: "blur(50px)",
          willChange: "transform, opacity",
        }}
      />
    </>
  );
}

/* ════════════════════════════════════════════════════════════════════════════
   VARIANT 4 — Tidal Pulse (Pricing / Testimonials)
   Concentric rings of light that slowly expand outward from the center.
   ════════════════════════════════════════════════════════════════════════════ */
function TidalVariant() {
  return (
    <>
      {/* Ring 1 — primary */}
      <div
        className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 animate-tidal-pulse-1"
        style={{
          width: "40vmax",
          height: "40vmax",
          borderRadius: "50%",
          background:
            "radial-gradient(circle, rgba(124,97,255,0.06) 0%, rgba(124,97,255,0.02) 40%, transparent 70%)",
          willChange: "transform, opacity",
        }}
      />
      {/* Ring 2 — offset & delayed */}
      <div
        className="absolute top-[45%] left-[55%] -translate-x-1/2 -translate-y-1/2 animate-tidal-pulse-2"
        style={{
          width: "35vmax",
          height: "35vmax",
          borderRadius: "50%",
          background:
            "radial-gradient(circle, rgba(139,92,246,0.05) 0%, rgba(139,92,246,0.015) 45%, transparent 70%)",
          willChange: "transform, opacity",
        }}
      />
      {/* Ring 3 — accent */}
      <div
        className="absolute top-[55%] left-[42%] -translate-x-1/2 -translate-y-1/2 animate-tidal-pulse-3"
        style={{
          width: "30vmax",
          height: "30vmax",
          borderRadius: "50%",
          background:
            "radial-gradient(circle, rgba(167,139,250,0.04) 0%, rgba(167,139,250,0.01) 40%, transparent 65%)",
          willChange: "transform, opacity",
        }}
      />
    </>
  );
}

/* ════════════════════════════════════════════════════════════════════════════
   VARIANT 5 — Nebula Drift (Team / Why Zelvoxx)
   Large soft cloud-shapes that drift slowly across the viewport.
   ════════════════════════════════════════════════════════════════════════════ */
function NebulaVariant() {
  return (
    <>
      {/* Cloud 1 */}
      <div
        className="absolute w-[50vw] h-[50vh] top-[5%] left-[10%] rounded-full animate-nebula-drift-1"
        style={{
          background:
            "radial-gradient(ellipse at center, rgba(124,97,255,0.05) 0%, rgba(124,97,255,0.02) 50%, transparent 80%)",
          filter: "blur(60px)",
          willChange: "transform, opacity",
        }}
      />
      {/* Cloud 2 */}
      <div
        className="absolute w-[45vw] h-[40vh] top-[40%] right-[5%] rounded-full animate-nebula-drift-2"
        style={{
          background:
            "radial-gradient(ellipse at center, rgba(139,92,246,0.04) 0%, rgba(139,92,246,0.015) 50%, transparent 80%)",
          filter: "blur(55px)",
          willChange: "transform, opacity",
        }}
      />
      {/* Cloud 3 */}
      <div
        className="absolute w-[35vw] h-[35vh] bottom-[10%] left-[25%] rounded-full animate-nebula-drift-3"
        style={{
          background:
            "radial-gradient(ellipse at center, rgba(167,139,250,0.035) 0%, rgba(167,139,250,0.01) 50%, transparent 80%)",
          filter: "blur(50px)",
          willChange: "transform, opacity",
        }}
      />
    </>
  );
}

/* ════════════════════════════════════════════════════════════════════════════
   VARIANT 6 — Prism Sweep (Legal pages)
   A single wide gradient beam that slowly rotates and sweeps across.
   ════════════════════════════════════════════════════════════════════════════ */
function PrismVariant() {
  return (
    <>
      {/* Main sweep beam */}
      <div
        className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 animate-prism-sweep"
        style={{
          width: "150vmax",
          height: "8px",
          background:
            "linear-gradient(90deg, transparent 0%, rgba(124,97,255,0.06) 30%, rgba(139,92,246,0.1) 50%, rgba(124,97,255,0.06) 70%, transparent 100%)",
          filter: "blur(35px)",
          transformOrigin: "center center",
          willChange: "transform, opacity",
        }}
      />
      {/* Subtle wide wash */}
      <div
        className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 animate-prism-wash"
        style={{
          width: "120vmax",
          height: "4px",
          background:
            "linear-gradient(90deg, transparent 0%, rgba(167,139,250,0.035) 35%, rgba(99,102,241,0.05) 50%, rgba(167,139,250,0.035) 65%, transparent 100%)",
          filter: "blur(45px)",
          transformOrigin: "center center",
          willChange: "transform, opacity",
        }}
      />
    </>
  );
}
