export interface Project {
  slug: string;
  name: string;
  industry: string;
  url: string;
  image: string;
  summary: string;
  services: string[];
  featured: boolean;
}

export const projects: Project[] = [
  {
    slug: "unisafe-cookware",
    name: "Unisafe Cookware",
    industry: "Kitchenware & Cookware",
    url: "https://unisafecookware.in/",
    image: "/images/projects/unisafe.png",
    summary: "Authentic tri-ply stainless steel cookware and induction kitchen appliances.",
    services: [],
    featured: true,
  },
  {
    slug: "propertyy-solutions",
    name: "Propertyy Solutions",
    industry: "Real Estate & Property Management",
    url: "https://propertyysolutions.co.in/",
    image: "/images/projects/propertyy-solutions.png",
    summary: "Real estate consulting and residential property advisory portal.",
    services: [],
    featured: false,
  },
  {
    slug: "primus-cosmetics",
    name: "Primus Cosmetics",
    industry: "Beauty & Personal Care",
    url: "https://primuscosmetics.com/",
    image: "/images/projects/primus.png",
    summary: "Ayurvedic botanical skincare formulations and natural personal care products.",
    services: [],
    featured: false,
  },
  {
    slug: "agaro-lifestyle",
    name: "Agaro Lifestyle",
    industry: "Consumer Appliances & Lifestyle",
    url: "https://agarolifestyle.com/",
    image: "/images/projects/agaro-lifestyle.png",
    summary: "Everyday home appliances, personal wellness electronics, and lifestyle accessories.",
    services: [],
    featured: false,
  },
  {
    slug: "woscher",
    name: "Woscher",
    industry: "Automotive & Home Electronics",
    url: "https://woscher.com/",
    image: "/images/projects/woscher.png",
    summary: "Portable automotive electronics and multi-purpose cleaning appliances.",
    services: [],
    featured: false,
  },
  {
    slug: "the-indus-valley",
    name: "The Indus Valley",
    industry: "Toxin-Free Kitchenware",
    url: "https://www.theindusvalley.in/",
    image: "/images/projects/the-indus-valley.png",
    summary: "Healthy toxin-free cast iron and tri-ply stainless steel kitchen cookware.",
    services: [],
    featured: false,
  },
  {
    slug: "cuminco",
    name: "Cuminco",
    industry: "Premium Cookware & Chef Tools",
    url: "https://www.cuminco.com/",
    image: "/images/projects/cumin-co.png",
    summary: "High-carbon stainless steel knives, cast iron cookware, and culinary essentials.",
    services: [],
    featured: false,
  },
  {
    slug: "made-in-cookware",
    name: "Made In Cookware",
    industry: "Professional Culinary Equipment",
    url: "https://madeincookware.com/",
    image: "/images/projects/made-in-cookware.png",
    summary: "Professional-grade stainless clad cookware, bakeware, and tabletop tools.",
    services: [],
    featured: false,
  },
  {
    slug: "aagrotma-herbal",
    name: "Aagrotma Herbal",
    industry: "Organic Health & Superfoods",
    url: "https://aagrotmaherbal.com/",
    image: "/images/projects/aagrotma.png",
    summary: "Natural herbal seeds, organic superfoods, and wellness nutrition products.",
    services: [],
    featured: false,
  },
];
