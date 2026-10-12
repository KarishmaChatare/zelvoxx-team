import { Metadata } from "next";
import Link from "next/link";
import Navbar from "@/src/components/layout/Navbar";
import Footer from "@/src/components/layout/Footer";
import LegalContactSection from "@/src/components/legal/LegalContactSection";
import LegalPageLayout from "@/src/components/legal/LegalPageLayout";
import { legalSiteInfo } from "@/src/constants/data";

export const metadata: Metadata = {
  title: "Privacy Policy | Zelvoxx",
  description: "Learn how Zelvoxx collects, uses, and protects your personal data. Comprehensive privacy notice covering forms, analytics, cookies, and user rights.",
  alternates: {
    canonical: "/privacy-policy",
  },
  openGraph: {
    title: "Privacy Policy | Zelvoxx",
    description: "Learn how Zelvoxx collects, uses, and protects your personal data. Your privacy is our priority.",
    url: "https://zelvoxx.com/privacy-policy",
  },
};

export default function PrivacyPolicyPage() {
  return (
    <main className="min-h-screen bg-background text-white selection:bg-primary/30">
      <Navbar />
      
      <LegalPageLayout title="Privacy Policy" effectiveDate={legalSiteInfo.effectiveDate}>
        <section>
          <h2 className="text-2xl sm:text-3xl font-heading font-bold mb-4 text-white">
            Our Commitment to Your Privacy
          </h2>
          <p className="text-white/75 font-body leading-relaxed">
            Zelvoxx (&quot;we&quot;, &quot;our&quot;, &quot;us&quot;) respects your privacy and is committed to protecting your personal data. This privacy policy informs you as to how we look after your personal data when you visit our website, submit inquiries, or interact with our digital systems, and explains your privacy rights and how applicable laws protect you.
          </p>
        </section>

        <section>
          <h2 className="text-2xl sm:text-3xl font-heading font-bold mb-4 text-white">
            Information We Collect
          </h2>
          <p className="text-white/75 font-body leading-relaxed mb-4">
            We collect, process, and retain personal data strictly as necessary to deliver our services, communicate with clients, and optimize our digital platforms:
          </p>
          <ul className="space-y-3 text-white/75 font-body">
            <li className="flex items-start gap-3">
              <span className="text-[#A78BFA] mt-1 font-bold">•</span>
              <span><strong className="text-white">Direct Inquiries &amp; Form Submissions:</strong> Full name, business email address, phone number, company name, project scope, budget range, and project timelines submitted via our contact and consultation forms.</span>
            </li>
            <li className="flex items-start gap-3">
              <span className="text-[#A78BFA] mt-1 font-bold">•</span>
              <span><strong className="text-white">Technical &amp; Device Data:</strong> Internet Protocol (IP) address, browser type and version, time zone setting, operating system, platform, and device diagnostics collected automatically when accessing our website.</span>
            </li>
            <li className="flex items-start gap-3">
              <span className="text-[#A78BFA] mt-1 font-bold">•</span>
              <span><strong className="text-white">Usage &amp; Interaction Data:</strong> Information about how you use our website, page load timings, referral paths, navigation journeys, and interactions with buttons and call-to-actions.</span>
            </li>
            <li className="flex items-start gap-3">
              <span className="text-[#A78BFA] mt-1 font-bold">•</span>
              <span><strong className="text-white">Cookies &amp; Local Storage:</strong> Essential state flags (such as cookie consent preferences) and performance indicators.</span>
            </li>
          </ul>
        </section>

        <section>
          <h2 className="text-2xl sm:text-3xl font-heading font-bold mb-4 text-white">
            How We Use Your Information
          </h2>
          <p className="text-white/75 font-body leading-relaxed mb-4">
            We use your personal data only where there is a legitimate legal basis, including:
          </p>
          <ul className="space-y-3 text-white/75 font-body">
            <li className="flex items-start gap-3">
              <span className="text-[#A78BFA] mt-1 font-bold">•</span>
              <span><strong className="text-white">Service Delivery &amp; Proposals:</strong> To evaluate project requirements, prepare architectural roadmaps, and provide contracted digital growth services.</span>
            </li>
            <li className="flex items-start gap-3">
              <span className="text-[#A78BFA] mt-1 font-bold">•</span>
              <span><strong className="text-white">Communication:</strong> To respond to your inquiries, schedule strategy consultations, and provide milestone updates.</span>
            </li>
            <li className="flex items-start gap-3">
              <span className="text-[#A78BFA] mt-1 font-bold">•</span>
              <span><strong className="text-white">Security &amp; Fraud Prevention:</strong> To protect our platform from automated abuse, spam submissions, and security vulnerabilities.</span>
            </li>
            <li className="flex items-start gap-3">
              <span className="text-[#A78BFA] mt-1 font-bold">•</span>
              <span><strong className="text-white">Analytics &amp; Optimization:</strong> To analyze usage patterns, monitor site performance, and improve user experience across all devices.</span>
            </li>
          </ul>
        </section>

        <section>
          <h2 className="text-2xl sm:text-3xl font-heading font-bold mb-4 text-white">
            Third-Party Processors &amp; Infrastructure
          </h2>
          <p className="text-white/75 font-body leading-relaxed mb-4">
            We partner with enterprise-grade third-party service providers to host, process, and manage infrastructure securely:
          </p>
          <ul className="space-y-3 text-white/75 font-body">
            <li className="flex items-start gap-3">
              <span className="text-[#A78BFA] mt-1 font-bold">•</span>
              <span><strong className="text-white">Hosting &amp; Edge Delivery:</strong> Vercel Inc. (for edge network hosting, serverless execution, and privacy-first web analytics).</span>
            </li>
            <li className="flex items-start gap-3">
              <span className="text-[#A78BFA] mt-1 font-bold">•</span>
              <span><strong className="text-white">Content Management:</strong> Sanity.io (for structured content and inquiry data management with strict access control).</span>
            </li>
            <li className="flex items-start gap-3">
              <span className="text-[#A78BFA] mt-1 font-bold">•</span>
              <span><strong className="text-white">Payment Gateways:</strong> Stripe, Razorpay, or authorized banking partners (payment credentials are handled directly by PCI-DSS certified processors; Zelvoxx never stores raw credit card details).</span>
            </li>
          </ul>
        </section>

        <section>
          <h2 className="text-2xl sm:text-3xl font-heading font-bold mb-4 text-white">
            Cookies &amp; Tracking Technologies
          </h2>
          <p className="text-white/75 font-body leading-relaxed">
            We use cookies and similar technologies to operate the site, measure performance, and remember your interface preferences. You can configure your browser to decline cookies, or adjust your choices at any time via our{" "}
            <Link href="/cookie-policy" className="text-[#A78BFA] hover:underline font-semibold">
              Cookie Policy
            </Link>
            .
          </p>
        </section>

        <section>
          <h2 className="text-2xl sm:text-3xl font-heading font-bold mb-4 text-white">
            Your Rights
          </h2>
          <p className="text-white/75 font-body leading-relaxed mb-4">
            Depending on your jurisdiction (such as GDPR, CCPA, or applicable data protection regulations), you have the right to:
          </p>
          <ul className="space-y-3 text-white/75 font-body">
            <li className="flex items-start gap-3">
              <span className="text-[#A78BFA] mt-1 font-bold">•</span>
              <span><strong className="text-white">Access:</strong> Request a copy of the personal data we hold about you.</span>
            </li>
            <li className="flex items-start gap-3">
              <span className="text-[#A78BFA] mt-1 font-bold">•</span>
              <span><strong className="text-white">Rectification:</strong> Request correction of any inaccurate or incomplete data.</span>
            </li>
            <li className="flex items-start gap-3">
              <span className="text-[#A78BFA] mt-1 font-bold">•</span>
              <span><strong className="text-white">Erasure:</strong> Request deletion of your personal data where retention is no longer necessary.</span>
            </li>
            <li className="flex items-start gap-3">
              <span className="text-[#A78BFA] mt-1 font-bold">•</span>
              <span><strong className="text-white">Restriction &amp; Objection:</strong> Object to or restrict the processing of your data.</span>
            </li>
            <li className="flex items-start gap-3">
              <span className="text-[#A78BFA] mt-1 font-bold">•</span>
              <span><strong className="text-white">Data Portability:</strong> Request transmission of your data in a structured, machine-readable format.</span>
            </li>
          </ul>
        </section>

        <LegalContactSection
          heading="Contact Us Regarding Privacy"
          intro="If you have questions regarding this Privacy Policy, wish to exercise your data rights, or have privacy concerns, please contact our Data Privacy Officer:"
        />
      </LegalPageLayout>

      <Footer />
    </main>
  );
}
