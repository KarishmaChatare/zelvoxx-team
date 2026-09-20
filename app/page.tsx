import Navbar from "@/src/components/layout/Navbar";
import Hero from "@/src/components/sections/Hero";
import TrustedBy from "@/src/components/sections/TrustedBy";
import Problem from "@/src/components/sections/Problem";
import SystemFlow from "@/src/components/sections/SystemFlow";
import BuiltForGrowth from "@/src/components/sections/BuiltForGrowth";
import Services from "@/src/components/sections/Services";
import Portfolio from "@/src/components/sections/Portfolio";
import CaseStudies from "@/src/components/sections/CaseStudies";
import Testimonials from "@/src/components/sections/Testimonials";
import Pricing from "@/src/components/sections/Pricing";
import Process from "@/src/components/sections/Process";
import HomeWhyZelvoxx from "@/src/components/sections/HomeWhyZelvoxx";
import HomeTeam from "@/src/components/sections/HomeTeam";
import CTA from "@/src/components/sections/CTA";
import Footer from "@/src/components/layout/Footer";
import AmbientBackground from "@/src/components/ui/AmbientBackground";

import { client } from "@/sanity/lib/client";
import { PHONE_CALL_URL } from "@/src/constants/data";
import {
  heroQuery,
  statsQuery,
  servicesQuery,
  caseStudiesQuery,
  testimonialsQuery,
  teamMembersQuery,
} from "@/sanity/lib/queries";

export const revalidate = 60;

export default async function Home() {
  const [
    rawHeroData,
    statsData,
    servicesData,
    caseStudiesData,
    testimonialsData,
    teamMembersData,
  ] = await Promise.all([
    client.fetch(heroQuery).catch(() => null),
    client.fetch(statsQuery).catch(() => []),
    client.fetch(servicesQuery).catch(() => []),
    client.fetch(caseStudiesQuery).catch(() => []),
    client.fetch(testimonialsQuery).catch(() => []),
    client.fetch(teamMembersQuery).catch(() => []),
  ]);

  const heroData = rawHeroData
    ? {
        ...rawHeroData,
        ctaLink: rawHeroData.ctaLink?.includes("calendly")
          ? PHONE_CALL_URL
          : rawHeroData.ctaLink || PHONE_CALL_URL,
      }
    : null;

  return (
    <main className="min-h-screen bg-background selection:bg-primary/30 relative">
      {/* Global Noise Texture for Premium Depth (GPU-accelerated static pattern, zero filter recalculation) */}
      <div
        aria-hidden="true"
        className="pointer-events-none fixed inset-0 z-50 h-full w-full opacity-[0.035]"
        style={{
          backgroundImage: "url('/images/noise.png')",
          backgroundRepeat: "repeat",
          transform: "translate3d(0, 0, 0)",
          backfaceVisibility: "hidden",
          contain: "strict",
        }}
      />

      <Navbar />

      <Hero data={heroData} stats={statsData} />

      {/* Subtle ambient visual texture with gentle parallax across all sections from Built for Growing Businesses down to Footer */}
      <div className="relative">
        <AmbientBackground opacity={0.24} fixed={true} />
        <TrustedBy />
        <Problem />
        <SystemFlow />
        <BuiltForGrowth />
        <Services data={servicesData} />
        <Portfolio data={caseStudiesData} />
        <CaseStudies data={caseStudiesData} />
        <Testimonials data={testimonialsData} />
        <Pricing />
        <Process />
        <HomeWhyZelvoxx />
        <HomeTeam members={teamMembersData} />
        <CTA />
        <Footer />
      </div>

    </main>
  );
}