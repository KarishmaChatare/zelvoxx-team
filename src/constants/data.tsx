import { 
  Building2, 
  MonitorSmartphone, 
  Code2, 
  Filter, 
  Megaphone, 
  Search, 
  Bot 
} from "lucide-react";
import { ServiceType, TestimonialType } from "@/src/types";

export const PHONE_NUMBER = "+91 98106 01084";
export const PHONE_CALL_URL = "tel:+919810601084";
export const CALENDLY_URL = PHONE_CALL_URL; // Replaced with direct phone call
export const WHATSAPP_URL = "https://wa.me/919810601084";

export const services: ServiceType[] = [
  {
    icon: <Building2 className="w-8 h-8" />,
    title: "Brand Positioning",
    desc: "We don't just design logos. We architect premium brand identities that command authority and trust.",
  },
  {
    icon: <MonitorSmartphone className="w-8 h-8" />,
    title: "High-Converting Web Design",
    desc: "Aesthetic interfaces engineered specifically to convert cold traffic into high-paying clients.",
  },
  {
    icon: <Code2 className="w-8 h-8" />,
    title: "Full-Stack Web Development",
    desc: "Robust, scalable, and lightning-fast web applications built on modern technologies.",
  },
  {
    icon: <Filter className="w-8 h-8" />,
    title: "Funnel Architecture",
    desc: "Strategic sales funnels designed to seamlessly guide users from awareness to purchase.",
  },
  {
    icon: <Megaphone className="w-8 h-8" />,
    title: "Meta & Google Ads",
    desc: "Data-driven advertising campaigns that systematically acquire customers at profit.",
  },
  {
    icon: <Search className="w-8 h-8" />,
    title: "SEO & Content Systems",
    desc: "Dominate search engines with SEO systems that generate predictable organic revenue.",
  },
  {
    icon: <Bot className="w-8 h-8" />,
    title: "Sales Automation & CRM",
    desc: "Automate your follow-ups, lead nurturing, and closing sequences to infinite scale.",
  },
];

export { projects } from "@/src/data/projects";

export const testimonials: TestimonialType[] = [
  {
    name: "Sarah J.",
    role: "Founder, E-commerce Brand",
    content: "The clarity in their system is what stood out. They didn't just build us a website. They handed us a machine that prints money. Our conversion rate literally doubled in 45 days.",
  },
  {
    name: "Marcus T.",
    role: "Startup Founder",
    content: "The level of engineering and psychology that went into our funnels is insane. We closed our Series A off the back of the growth system they built. It permanently solves lead generation.",
  },
  {
    name: "David C.",
    role: "Local Business Owner",
    content: "If you want a pretty site, go somewhere else. If you want a scalable infrastructure that predictably generates revenue and scales on autopilot, hire Zelvoxx.",
  }
];

export const socialLinks = [
  { platform: "Instagram", url: "https://instagram.com/Zelvoxx" },
  { platform: "Twitter", url: "https://twitter.com/Zelvoxx" },
  { platform: "LinkedIn", url: "https://linkedin.com/company/Zelvoxx" },
];

export const legalSiteInfo = {
  effectiveDate: "May 14, 2026",
  email: "enquiry.zelvoxx@gmail.com",
  website: "https://www.zelvoxx.com",
  linkedIn: "https://www.linkedin.com/company/Zelvoxx",
} as const;

export const legalLinks = [
  { label: "Privacy Policy", url: "/privacy" },
  { label: "Terms & Conditions", url: "/terms" },
  { label: "Cookie Policy", url: "/cookie-policy" },
  { label: "Refund Policy", url: "/refund-policy" },
  { label: "Cancellation Policy", url: "/cancellation-policy" },
  { label: "Service Agreement", url: "/service-agreement" },
  { label: "Disclaimer", url: "/disclaimer" },
  { label: "Copyright", url: "/copyright" },
  { label: "DMCA", url: "/dmca" },
];

export const footerNavLinks = [
  { label: "Services", url: "/#services" },
  { label: "Our Work", url: "/our-work" },
  { label: "Why Zelvoxx", url: "/why-Zelvoxx" },
  { label: "Our Team", url: "/team" },
  { label: "Careers", url: "/work-with-us" },
  { label: "Pricing", url: "/pricing" },
  { label: "Reviews", url: "/testimonials" },
  { label: "Contact", url: "/contact" },
];
