import type { MetadataRoute } from "next";
import { projects } from "@/src/data/projects";

export default function sitemap(): MetadataRoute.Sitemap {
  const baseUrl = "https://zelvoxx.com";
  const lastModified = new Date();

  const routes: { path: string; priority: number; changeFrequency: "always" | "hourly" | "daily" | "weekly" | "monthly" | "yearly" }[] = [
    { path: "", priority: 1.0, changeFrequency: "daily" },
    { path: "/our-work", priority: 0.9, changeFrequency: "weekly" },
    { path: "/portfolio", priority: 0.8, changeFrequency: "monthly" },
    { path: "/pricing", priority: 0.9, changeFrequency: "weekly" },
    { path: "/contact", priority: 0.9, changeFrequency: "monthly" },
    { path: "/why-Zelvoxx", priority: 0.8, changeFrequency: "monthly" },
    { path: "/team", priority: 0.8, changeFrequency: "monthly" },
    { path: "/work-with-us", priority: 0.7, changeFrequency: "monthly" },
    { path: "/testimonials", priority: 0.8, changeFrequency: "weekly" },
    { path: "/privacy-policy", priority: 0.5, changeFrequency: "yearly" },
    { path: "/terms", priority: 0.5, changeFrequency: "yearly" },
    { path: "/cookie-policy", priority: 0.5, changeFrequency: "yearly" },
    { path: "/refund-policy", priority: 0.5, changeFrequency: "yearly" },
    { path: "/cancellation-policy", priority: 0.5, changeFrequency: "yearly" },
    { path: "/service-agreement", priority: 0.5, changeFrequency: "yearly" },
    { path: "/disclaimer", priority: 0.5, changeFrequency: "yearly" },
    { path: "/copyright", priority: 0.5, changeFrequency: "yearly" },
    { path: "/dmca", priority: 0.5, changeFrequency: "yearly" },
  ];

  const staticEntries = routes.map((route) => ({
    url: `${baseUrl}${route.path}`,
    lastModified,
    changeFrequency: route.changeFrequency,
    priority: route.priority,
  }));

  const projectEntries = projects.map((project) => ({
    url: `${baseUrl}/our-work/${project.slug}`,
    lastModified,
    changeFrequency: "weekly" as const,
    priority: 0.8,
  }));

  return [...staticEntries, ...projectEntries];
}
