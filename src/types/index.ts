import { ReactNode } from "react";

export interface ServiceType {
  title: string;
  desc?: string; // local fallback shape
  shortDescription?: string; // sanity shape
  description?: string; // sanity shape
  fullDescription?: string; // detail page
  icon: string | ReactNode;
  slug?: string; // URL slug for detail page
  pricing?: string;
  duration?: string;
  features?: string[];
  benefits?: Array<{ title: string; description: string }>;
  process?: Array<{ step: number; title: string; description: string }>;
  ctaText?: string;
  heroImage?: any;
}

export type { Project } from "@/src/data/projects";
export type ProjectType = import("@/src/data/projects").Project;

export interface TestimonialType {
  name: string;
  role: string;
  content: string;
  company?: string;
  excerpt?: string;
  slug?: string;
  image?: any;
  rating?: number;
  featured?: boolean;
  caseStudySlug?: string;
  fullStory?: string;
  socialLinks?: {
    linkedin?: string;
    twitter?: string;
    website?: string;
  };
}
