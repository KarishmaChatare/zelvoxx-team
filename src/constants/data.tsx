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
    name: "Shubham",
    company: "Unisafe Cookware",
    role: "Unisafe Cookware",
    content: "Working with Zelvoxx on our website development was a great experience. The team understood our requirements and helped us build a professional e-commerce website for Unisafe Cookware, with a strong focus on product presentation, navigation, and customer experience. Their attention to detail and willingness to customise the website according to our needs made the process smooth and convenient. We appreciate their efforts in helping us strengthen our online presence and showcase our products more effectively.",
  },
  {
    name: "Rishabh",
    company: "Primus Cosmetics",
    role: "Primus Cosmetics",
    content: "Working with Zelvoxx on our website development was a positive experience. The team took the time to understand our requirements and worked towards creating a professional online presence for Primus Cosmetics. We appreciated their attention to design, product presentation, and the overall user experience. Their approach was collaborative, and they were willing to make adjustments to align the website with our expectations. We're glad to have worked with a team that values both presentation and functionality.",
  },
  {
    name: "Naresh Tyagi",
    company: "New Sandeep Garments",
    role: "New Sandeep Garments",
    content: "Zelvoxx worked with us on developing a website for New Sandeep Garments, with a focus on creating a professional online presence for our clothing business. The project involved custom design elements, organised product categories, and a layout tailored to our brand. The team worked on bringing our requirements into the website and building a foundation for showcasing our men's, women's, and kids' collections online. We appreciate the effort invested in the website development process.",
  },
  {
    name: "Deepali Jain",
    company: "Marffil",
    role: "Marffil",
    content: "Working with Zelvoxx on Marffil's website development was a valuable step towards strengthening our brand's digital presence. The team worked on translating our brand's premium identity into a professional online experience, with attention to visual presentation, brand consistency, and the way our products are showcased. We appreciated the focus on understanding our brand and creating a digital platform aligned with the quality and elegance we want Marffil to represent. It was a pleasure collaborating on building our online presence.",
  },
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
  { label: "Privacy Policy", url: "/privacy-policy" },
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
  { label: "Contact", url: PHONE_CALL_URL },
];
