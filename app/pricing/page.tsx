import { Metadata } from "next";
import { client } from "@/sanity/lib/client";
import { pricingQuery } from "@/sanity/lib/queries";
import Navbar from "@/src/components/layout/Navbar";
import Footer from "@/src/components/layout/Footer";
import PricingContentClient from "./components/PricingContentClient";

export const metadata: Metadata = {
  title: "Pricing | Zelvoxx",
  description: "Transparent pricing for premium digital growth systems. Choose the plan that fits your business goals.",
};

export const revalidate = 60;

// Canonical pricing plans matching homepage Investment section exactly
const defaultPlans = [
  {
    _id: "foundations",
    name: "Growth Foundations",
    slug: "growth-foundations",
    description: "For businesses who need a high-converting digital storefront.",
    price: "₹15,000",
    priceNote: "",
    popular: false,
    features: [
      "Custom UI/UX Design",
      "Next.js Lightning Fast Build",
      "Basic SEO Implementation",
      "CMS Integration",
      "1x Conversion Funnel",
      "30 Days Support"
    ],
    ctaText: "Connect With Us",
    tierNumber: "01",
    tagline: "FOUNDATIONS"
  },
  {
    _id: "revenue",
    name: "Revenue System",
    slug: "revenue-system",
    description: "The complete digital growth engine for aggressive scaling.",
    price: "₹49,000",
    priceNote: "",
    popular: true,
    features: [
      "Everything in Foundations",
      "Advanced Funnel Architectures",
      "Custom E-commerce/SaaS Logic",
      "CRM & Sales Automation",
      "Meta & Google Ads Setup",
      "Conversion Rate Optimization (CRO)",
      "90 Days VIP Support"
    ],
    ctaText: "Start Scaling Now",
    tierNumber: "02",
    tagline: "SCALE ENGINE"
  },
  {
    _id: "enterprise",
    name: "Enterprise Partner",
    slug: "enterprise-partner",
    description: "Bespoke engineering and fractional CMO-level guidance.",
    price: "₹99,000",
    priceNote: "",
    popular: false,
    features: [
      "Everything in Revenue System",
      "Dedicated Full-Stack Team",
      "Custom Web Apps & AI Tools",
      "Omnichannel Ads Management",
      "Continuous A/B Testing",
      "Priority 24/7 Slack Channel"
    ],
    ctaText: "Apply for Partnership",
    tierNumber: "03",
    tagline: "BESPOKE PARTNER"
  }
];

export default async function PricingPage() {
  const pricingData = await client.fetch(pricingQuery).catch(() => []);
  
  // Use canonical tiers and ensure price always uses ₹ and matches homepage exactly
  const plans = defaultPlans.map((canonicalPlan, idx) => {
    const fetched = Array.isArray(pricingData) && pricingData[idx] ? pricingData[idx] : null;
    return {
      ...canonicalPlan,
      ...(fetched ? {
        ...fetched,
        name: canonicalPlan.name,
        price: canonicalPlan.price,
        features: canonicalPlan.features,
      } : {}),
      price: canonicalPlan.price, // Guarantee ₹15,000, ₹49,000, ₹99,000
    };
  });

  return (
    <>
      <Navbar />
      <PricingContentClient plans={plans} />
      <Footer />
    </>
  );
}
