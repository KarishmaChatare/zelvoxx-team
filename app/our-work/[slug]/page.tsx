import { Metadata } from "next";
import { notFound } from "next/navigation";
import Image from "next/image";
import Link from "next/link";
import { ArrowLeft, ArrowRight, ExternalLink, ArrowUpRight } from "lucide-react";
import Navbar from "@/src/components/layout/Navbar";
import Footer from "@/src/components/layout/Footer";
import DynamicBackground from "@/src/components/ui/DynamicBackground";
import { projects } from "@/src/data/projects";

interface PageProps {
  params: Promise<{ slug: string }>;
}

export function generateStaticParams() {
  return projects.map((p) => ({
    slug: p.slug,
  }));
}

export async function generateMetadata({ params }: PageProps): Promise<Metadata> {
  const { slug } = await params;
  const project = projects.find((p) => p.slug === slug);

  if (!project) {
    return {
      title: "Project Not Found | Zelvoxx",
    };
  }

  return {
    title: `${project.name} | Our Work | Zelvoxx`,
    description: project.summary,
    openGraph: {
      title: `${project.name} | Our Work | Zelvoxx`,
      description: project.summary,
      url: `https://zelvoxx.com/our-work/${project.slug}`,
      images: [
        {
          url: project.image,
          width: 1200,
          height: 675,
          alt: project.name,
        },
      ],
    },
  };
}

export default async function ProjectDetailPage({ params }: PageProps) {
  const { slug } = await params;
  const projectIndex = projects.findIndex((p) => p.slug === slug);

  if (projectIndex === -1) {
    notFound();
  }

  const project = projects[projectIndex];
  const prevProject = projects[(projectIndex - 1 + projects.length) % projects.length];
  const nextProject = projects[(projectIndex + 1) % projects.length];
  const initialLetter = project.name.charAt(0);

  return (
    <>
      <Navbar />

      <main className="min-h-screen bg-[#07060D] text-white selection:bg-[#7C61FF]/30 relative overflow-hidden">
        <DynamicBackground variant="purple" intensity="high" />

        <div className="relative z-10 pt-28 sm:pt-36 pb-24 sm:pb-36">
          <div className="max-w-7xl mx-auto px-4 sm:px-6">
            {/* Back Link */}
            <div className="mb-10 sm:mb-12">
              <Link
                href="/our-work"
                className="inline-flex items-center gap-2 text-sm text-white/50 hover:text-[#A78BFA] transition-colors group"
              >
                <ArrowLeft className="w-4 h-4 group-hover:-translate-x-1 transition-transform" />
                Back to Our Work
              </Link>
            </div>

            {/* Project Header Banner with Signature Touch */}
            <div className="relative rounded-2xl sm:rounded-3xl p-6 sm:p-10 lg:p-14 bg-gradient-to-b from-[#131221]/90 via-[#0F0E1B]/95 to-[#0A0912] border border-white/10 overflow-hidden shadow-2xl mb-12 sm:mb-16">
              {/* Oversized Background Letter */}
              <span
                aria-hidden="true"
                className="absolute -top-12 -left-6 sm:-top-16 sm:-left-8 select-none pointer-events-none z-0 font-heading font-black text-[14rem] sm:text-[22rem] lg:text-[28rem] leading-none text-white/[0.03]"
              >
                {initialLetter}
              </span>

              {/* Accent top gradient line */}
              <div className="absolute top-0 inset-x-0 h-[2px] bg-gradient-to-r from-transparent via-[#7C61FF] to-transparent opacity-80" />

              <div className="relative z-10 space-y-6 max-w-4xl">
                {/* Industry Badge */}
                <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-[#7C61FF]/10 border border-[#7C61FF]/30 text-xs font-semibold uppercase tracking-wider text-[#A78BFA]">
                  {project.industry}
                </div>

                {/* Project Title */}
                <h1 className="text-4xl sm:text-6xl lg:text-7xl font-heading font-black text-white tracking-tight leading-[1.05]">
                  {project.name}
                </h1>

                {/* One-Line Summary */}
                <p className="text-lg sm:text-xl md:text-2xl text-white/70 font-normal leading-relaxed">
                  {project.summary}
                </p>

                {/* Services Tags & CTA */}
                <div className="pt-4 flex flex-col sm:flex-row sm:items-center justify-between gap-6 border-t border-white/10">
                  {project.services && project.services.length > 0 && (
                    <div className="flex flex-wrap gap-2">
                      {project.services.map((svc) => (
                        <span
                          key={svc}
                          className="text-xs px-3 py-1.5 rounded-lg bg-white/[0.05] border border-white/10 text-white/80 font-medium"
                        >
                          {svc}
                        </span>
                      ))}
                    </div>
                  )}

                  {/* Visit Live Website Button */}
                  <a
                    href={project.url}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-flex items-center justify-center gap-2.5 px-6 py-3.5 rounded-full bg-gradient-to-r from-[#7C61FF] to-[#8B5CF6] hover:from-[#8B5CF6] hover:to-[#A78BFA] text-white font-semibold text-sm transition-all duration-300 shadow-lg shadow-[#7C61FF]/30 hover:shadow-[#7C61FF]/50 hover:scale-[1.02] flex-shrink-0"
                  >
                    <span>Visit Live Website</span>
                    <ExternalLink className="w-4 h-4" />
                  </a>
                </div>
              </div>
            </div>

            {/* Full-Width Screenshot Showcase */}
            <div className="relative rounded-2xl sm:rounded-3xl overflow-hidden border border-white/10 bg-[#0E0D18] shadow-[0_25px_70px_rgba(0,0,0,0.8)] mb-16 sm:mb-24">
              {/* Browser Mockup Chrome Header */}
              <div className="flex items-center justify-between px-4 sm:px-6 py-3 border-b border-white/10 bg-[#12111E]">
                <div className="flex items-center gap-2">
                  <div className="w-3 h-3 rounded-full bg-white/20" />
                  <div className="w-3 h-3 rounded-full bg-white/20" />
                  <div className="w-3 h-3 rounded-full bg-white/20" />
                </div>
                <div className="flex-1 max-w-md mx-4 text-center">
                  <div className="inline-block px-4 py-1 rounded-md bg-white/[0.04] border border-white/5 text-xs font-mono text-white/50 truncate max-w-full">
                    {project.url}
                  </div>
                </div>
                <a
                  href={project.url}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-white/40 hover:text-white transition-colors"
                  aria-label={`Open ${project.name} in new window`}
                >
                  <ExternalLink className="w-4 h-4" />
                </a>
              </div>

              {/* Full-width Screenshot */}
              <div className="relative w-full aspect-[16/9] sm:aspect-[16/10] bg-[#0A0912]">
                <Image
                  src={project.image}
                  alt={`${project.name} desktop showcase`}
                  fill
                  priority
                  sizes="(max-width: 1280px) 100vw, 1280px"
                  quality={95}
                  className="object-cover object-top"
                />
              </div>
            </div>

            {/* Previous & Next Project Navigation */}
            <div className="border-t border-white/10 pt-12 sm:pt-16">
              <div className="text-xs font-bold tracking-[0.2em] text-[#A78BFA] uppercase mb-6">
                Explore More Projects
              </div>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
                {/* Previous Project Card */}
                <Link
                  href={`/our-work/${prevProject.slug}`}
                  className="group relative rounded-2xl p-6 bg-gradient-to-b from-[#131221]/80 to-[#0A0912] border border-white/10 hover:border-[#7C61FF]/50 transition-all duration-300 flex items-center justify-between overflow-hidden"
                >
                  <div className="space-y-1">
                    <span className="text-xs text-white/40 uppercase tracking-wider flex items-center gap-1.5">
                      <ArrowLeft className="w-3.5 h-3.5 group-hover:-translate-x-1 transition-transform" />
                      Previous Project
                    </span>
                    <h3 className="text-lg sm:text-xl font-heading font-bold text-white group-hover:text-[#A78BFA] transition-colors">
                      {prevProject.name}
                    </h3>
                    <p className="text-xs text-white/50">{prevProject.industry}</p>
                  </div>
                  <div className="relative w-16 h-12 rounded-lg overflow-hidden border border-white/10 flex-shrink-0">
                    <Image
                      src={prevProject.image}
                      alt={prevProject.name}
                      fill
                      sizes="64px"
                      className="object-cover object-top group-hover:scale-105 transition-transform"
                    />
                  </div>
                </Link>

                {/* Next Project Card */}
                <Link
                  href={`/our-work/${nextProject.slug}`}
                  className="group relative rounded-2xl p-6 bg-gradient-to-b from-[#131221]/80 to-[#0A0912] border border-white/10 hover:border-[#7C61FF]/50 transition-all duration-300 flex items-center justify-between text-right overflow-hidden"
                >
                  <div className="relative w-16 h-12 rounded-lg overflow-hidden border border-white/10 flex-shrink-0 order-last sm:order-first">
                    <Image
                      src={nextProject.image}
                      alt={nextProject.name}
                      fill
                      sizes="64px"
                      className="object-cover object-top group-hover:scale-105 transition-transform"
                    />
                  </div>
                  <div className="space-y-1">
                    <span className="text-xs text-white/40 uppercase tracking-wider flex items-center justify-end gap-1.5">
                      Next Project
                      <ArrowRight className="w-3.5 h-3.5 group-hover:translate-x-1 transition-transform" />
                    </span>
                    <h3 className="text-lg sm:text-xl font-heading font-bold text-white group-hover:text-[#A78BFA] transition-colors">
                      {nextProject.name}
                    </h3>
                    <p className="text-xs text-white/50">{nextProject.industry}</p>
                  </div>
                </Link>
              </div>
            </div>
          </div>
        </div>
      </main>

      <Footer />
    </>
  );
}
