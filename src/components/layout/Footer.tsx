import Link from "next/link";
import { socialLinks, legalLinks, footerNavLinks, CALENDLY_URL } from "@/src/constants/data";

export default function Footer() {
  const currentYear = new Date().getFullYear();

  return (
    <footer className="bg-[#050508] pt-16 sm:pt-20 lg:pt-24 pb-8 sm:pb-12 border-t border-white/5 relative z-10">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Main 4-Column Grid: 1 col on small phones, 2 on tablets, 4 on desktop */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-10 sm:gap-8 lg:gap-12 mb-14 sm:mb-16">
          
          {/* Column 1: Brand Info */}
          <div className="space-y-4">
            <Link href="/" className="inline-flex items-center gap-1">
              <span className="text-2xl sm:text-3xl font-heading font-black tracking-widest bg-gradient-to-r from-white via-white to-white/80 bg-clip-text text-transparent">
                ZELVOX
              </span>
              <span className="text-2xl sm:text-3xl font-heading font-black text-transparent bg-clip-text bg-gradient-to-r from-[#6366f1] via-[#8b5cf6] to-[#a78bfa]">
                X
              </span>
            </Link>
            <p className="text-white/50 font-body max-w-sm leading-relaxed text-xs sm:text-sm">
              We build premium digital growth systems that generate predictable revenue and dominate industries.
            </p>
            <div className="pt-2">
              <span className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-emerald-500/10 border border-emerald-500/20 text-emerald-400 text-xs font-semibold">
                <span className="w-1.5 h-1.5 rounded-full bg-emerald-400 animate-pulse" />
                Available for New Projects
              </span>
            </div>
          </div>
          
          {/* Column 2: Navigation */}
          <div>
            <h4 className="text-white font-bold font-heading uppercase tracking-widest mb-4 sm:mb-6 text-xs sm:text-sm">
              Navigation
            </h4>
            <ul className="space-y-2 text-xs sm:text-sm text-white/50 font-body">
              {footerNavLinks.map((link) => (
                <li key={link.label}>
                  <Link
                    href={link.url}
                    className="hover:text-primary transition-colors duration-200 block py-1"
                  >
                    {link.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>
          
          {/* Column 3: Legal Policies */}
          <div>
            <h4 className="text-white font-bold font-heading uppercase tracking-widest mb-4 sm:mb-6 text-xs sm:text-sm">
              Legal
            </h4>
            <ul className="space-y-2 text-xs sm:text-sm text-white/50 font-body">
              {legalLinks.map((link) => (
                <li key={link.label}>
                  <Link
                    href={link.url}
                    className="hover:text-primary transition-colors duration-200 block py-1"
                  >
                    {link.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Column 4: Contact & Social */}
          <div className="space-y-4">
            <h4 className="text-white font-bold font-heading uppercase tracking-widest mb-4 sm:mb-6 text-xs sm:text-sm">
              Connect
            </h4>
            
            <a
              href={CALENDLY_URL}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center justify-center w-full sm:w-auto px-5 py-2.5 rounded-xl bg-primary/10 hover:bg-primary text-primary hover:text-white border border-primary/30 transition-all text-xs sm:text-sm font-bold uppercase tracking-wider mb-2"
            >
              Book a Strategy Call
            </a>

            <div>
              <p className="text-xs uppercase tracking-wider font-semibold text-white/40 mb-3 pt-2">
                Follow Us
              </p>
              <div className="flex items-center gap-2 flex-wrap">
                {socialLinks.map((social) => (
                  <a
                    key={social.platform}
                    href={social.url}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="px-3 py-1.5 rounded-lg bg-white/[0.04] hover:bg-white/10 border border-white/5 hover:border-white/20 text-white/70 hover:text-white transition-all text-xs font-semibold tracking-wide"
                  >
                    {social.platform}
                  </a>
                ))}
              </div>
            </div>
          </div>

        </div>
        
        {/* Bottom Copyright & Guarantee Bar */}
        <div className="border-t border-white/5 pt-6 sm:pt-8 flex flex-col sm:flex-row items-center justify-between text-white/40 text-xs font-body tracking-wider gap-4 sm:gap-0">
          <p className="text-center sm:text-left">
            © {currentYear} Zelvoxx. All rights reserved.
          </p>
          <div className="flex items-center gap-4 text-[11px] text-white/30 uppercase tracking-widest">
            <span>Engineered for Revenue</span>
            <span>•</span>
            <span>Next.js High Velocity</span>
          </div>
        </div>

      </div>
    </footer>
  );
}