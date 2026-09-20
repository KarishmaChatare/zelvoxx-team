
const companies = [
  { name: "Apex Financial", icon: "▲" },
  { name: "Luminary MedSpa", icon: "✦" },
  { name: "Velocity SaaS", icon: "⚡" },
  { name: "Strata Real Estate", icon: "⬡" },
  { name: "Evolve E-commerce", icon: "◈" },
  { name: "Nexus Tech Solutions", icon: "❖" },
];

export default function TrustedBy() {
  return (
    <section className="py-12 border-b border-[#7C61FF]/10 relative z-10 bg-transparent overflow-hidden">
      <div className="max-w-7xl mx-auto px-6 relative z-10 flex flex-col md:flex-row items-center gap-8 md:gap-16">
        <p className="text-white/50 font-body uppercase tracking-widest text-xs sm:text-sm font-semibold whitespace-nowrap shrink-0">
          Built for growing businesses
        </p>
        
        {/* Pure CSS Hardware-Accelerated Continuous Marquee */}
        <div className="relative flex overflow-hidden w-full mask-image-[linear-gradient(to_right,transparent,black_10%,black_90%,transparent)]">
          <div className="animate-marquee-css flex items-center">
            {/* First Set */}
            <div className="flex gap-16 items-center whitespace-nowrap pr-16 shrink-0">
              {companies.map((company, idx) => (
                <div
                  key={`a-${idx}`}
                  className="flex items-center gap-3 text-lg md:text-xl font-heading font-bold text-white/40 uppercase tracking-wide flex-shrink-0 hover:text-[#A78BFA] transition-all duration-300 cursor-default hover:scale-105 group"
                >
                  <span className="w-7 h-7 rounded-lg bg-white/[0.04] border border-white/[0.08] group-hover:border-[#7C61FF]/40 group-hover:bg-[#7C61FF]/10 flex items-center justify-center text-xs text-[#A78BFA] transition-all">
                    {company.icon}
                  </span>
                  <span>{company.name}</span>
                </div>
              ))}
            </div>

            {/* Duplicate Set for Seamless Loop */}
            <div className="flex gap-16 items-center whitespace-nowrap pr-16 shrink-0" aria-hidden="true">
              {companies.map((company, idx) => (
                <div
                  key={`b-${idx}`}
                  className="flex items-center gap-3 text-lg md:text-xl font-heading font-bold text-white/40 uppercase tracking-wide flex-shrink-0 hover:text-[#A78BFA] transition-all duration-300 cursor-default hover:scale-105 group"
                >
                  <span className="w-7 h-7 rounded-lg bg-white/[0.04] border border-white/[0.08] group-hover:border-[#7C61FF]/40 group-hover:bg-[#7C61FF]/10 flex items-center justify-center text-xs text-[#A78BFA] transition-all">
                    {company.icon}
                  </span>
                  <span>{company.name}</span>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
