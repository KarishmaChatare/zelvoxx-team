"use client";

import { usePathname } from "next/navigation";
import AmbientBackground from "./AmbientBackground";

/**
 * Renders the subtle ambient background image across the entire site,
 * EXCEPT:
 *   a) The Hero section on homepage (handled in page.tsx below hero)
 *   b) The "Connect With Us" page/section (/contact and #contact)
 */
export default function SitewideAmbientBackground() {
  const pathname = usePathname();

  // Exclude homepage (where page.tsx applies it specifically below the Hero section),
  // exclude "/contact" ("Connect With Us" page, keeping its background untouched),
  // and exclude "/studio" (Sanity CMS studio)
  if (pathname === "/" || pathname === "/contact" || pathname.startsWith("/studio")) {
    return null;
  }

  return <AmbientBackground opacity={0.12} fixed={true} />;
}
