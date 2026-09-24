import { MetadataRoute } from "next"; export default function sitemap(): 
MetadataRoute.Sitemap { const baseUrl = "https://zelvoxx.com"; 
    const pages = [ "", "cancellation-policy", "case-studies", "contact", "cookie-policy", "copyright", "disclaimer", "dmca", "portfolio", "pricing", "privacy", "refund-policy", "service-agreement", "team", "terms", "testimonials", "why-Zelvoxx", "work-with-us", ]; 
    return pages.map((page) => ({ url: `${baseUrl}/${page}`, lastModified: new Date(), })); }