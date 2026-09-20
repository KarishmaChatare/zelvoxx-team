import { legalSiteInfo } from "@/src/constants/data";

export interface ContactEmailParams {
  name: string;
  email: string;
  phone?: string;
  company?: string;
  services?: string[];
  budget?: string;
  timeline?: string;
  discoverySource?: string;
  message?: string;
}

const SERVICE_LABELS: Record<string, string> = {
  "web-design": "Web Design & Development",
  "branding": "Brand Strategy & Identity",
  "marketing": "Digital Marketing & Ads",
  "seo": "SEO & Content Strategy",
  "funnels": "Funnel Architecture",
  "automation": "Sales Automation & CRM",
  "complete-system": "Complete Growth System",
};

const BUDGET_LABELS: Record<string, string> = {
  "5k-10k": "$5,000 - $10,000",
  "10k-25k": "$10,000 - $25,000",
  "25k-50k": "$25,000 - $50,000",
  "50k+": "$50,000+",
  "not-sure": "Not Sure Yet",
};

const TIMELINE_LABELS: Record<string, string> = {
  "asap": "ASAP (Within 2 weeks)",
  "1-2-months": "1-2 Months",
  "3-6-months": "3-6 Months",
  "exploring": "Just Exploring",
};

const DISCOVERY_LABELS: Record<string, string> = {
  "google": "Google Search",
  "social": "Social Media",
  "referral": "Referral / Word of Mouth",
  "linkedin": "LinkedIn",
  "other": "Other",
};

/**
 * Formats contact parameters into template variables for EmailJS.
 * Target email: enquiry.zelvoxx@gmail.com (from legalSiteInfo.email)
 */
export function buildEmailJsTemplateParams(data: ContactEmailParams) {
  const targetEmail = process.env.CONTACT_RECEIVER_EMAIL || legalSiteInfo.email;
  
  const servicesList = Array.isArray(data.services) && data.services.length > 0
    ? data.services.map((s) => SERVICE_LABELS[s] || s).join(", ")
    : "General Inquiry";

  const budgetLabel = data.budget ? (BUDGET_LABELS[data.budget] || data.budget) : "Not specified";
  const timelineLabel = data.timeline ? (TIMELINE_LABELS[data.timeline] || data.timeline) : "Not specified";
  const discoveryLabel = data.discoverySource ? (DISCOVERY_LABELS[data.discoverySource] || data.discoverySource) : "Not specified";

  return {
    to_email: targetEmail,
    to_name: "Zelvoxx Team",
    from_name: data.name,
    from_email: data.email,
    reply_to: data.email,
    phone: data.phone || "Not provided",
    company: data.company || "Not provided",
    services: servicesList,
    budget: budgetLabel,
    timeline: timelineLabel,
    discovery_source: discoveryLabel,
    message: data.message || "No additional message provided.",
    submitted_at: new Date().toLocaleString("en-US", {
      timeZone: "Asia/Kolkata",
      dateStyle: "medium",
      timeStyle: "short",
    }),
  };
}

/**
 * Server-side sender using EmailJS REST API.
 * This runs securely in Next.js API routes without exposing private keys.
 */
export async function sendContactEmailServer(data: ContactEmailParams): Promise<{ success: boolean; error?: string }> {
  const serviceId = process.env.EMAILJS_SERVICE_ID || process.env.NEXT_PUBLIC_EMAILJS_SERVICE_ID;
  const templateId = process.env.EMAILJS_TEMPLATE_ID || process.env.NEXT_PUBLIC_EMAILJS_TEMPLATE_ID;
  const publicKey = process.env.EMAILJS_PUBLIC_KEY || process.env.NEXT_PUBLIC_EMAILJS_PUBLIC_KEY;
  const privateKey = process.env.EMAILJS_PRIVATE_KEY;

  if (!serviceId || !templateId || !publicKey) {
    console.warn(
      "[EmailJS Notice] Missing configuration. Required variables:\n" +
      `- EMAILJS_SERVICE_ID: ${serviceId ? "set" : "MISSING"}\n` +
      `- EMAILJS_TEMPLATE_ID: ${templateId ? "set" : "MISSING"}\n` +
      `- EMAILJS_PUBLIC_KEY: ${publicKey ? "set" : "MISSING"}`
    );
    return {
      success: false,
      error: "EmailJS is not fully configured yet in environment variables.",
    };
  }

  const templateParams = buildEmailJsTemplateParams(data);

  const payload: Record<string, any> = {
    service_id: serviceId,
    template_id: templateId,
    user_id: publicKey,
    template_params: templateParams,
  };

  if (privateKey) {
    payload.accessToken = privateKey;
  }

  try {
    const response = await fetch("https://api.emailjs.com/api/v1.0/email/send", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(payload),
    });

    if (!response.ok) {
      const errorText = await response.text();
      console.error(`[EmailJS Error] HTTP ${response.status}: ${errorText}`);
      return { success: false, error: `EmailJS responded with ${response.status}: ${errorText}` };
    }

    console.log(`[EmailJS Success] Contact email delivered to ${templateParams.to_email} for ${data.name} (${data.email})`);
    return { success: true };
  } catch (error: any) {
    console.error("[EmailJS Network Error]:", error);
    return { success: false, error: error.message || "Failed to reach EmailJS server." };
  }
}

/**
 * Browser-side sender using @emailjs/browser.
 * Can be called directly from client components if preferred.
 */
export async function sendContactEmailBrowser(data: ContactEmailParams): Promise<{ success: boolean; error?: string }> {
  try {
    const emailjs = await import("@emailjs/browser");
    const serviceId = process.env.NEXT_PUBLIC_EMAILJS_SERVICE_ID;
    const templateId = process.env.NEXT_PUBLIC_EMAILJS_TEMPLATE_ID;
    const publicKey = process.env.NEXT_PUBLIC_EMAILJS_PUBLIC_KEY;

    if (!serviceId || !templateId || !publicKey) {
      return { success: false, error: "NEXT_PUBLIC_EMAILJS environment variables are not configured." };
    }

    const templateParams = buildEmailJsTemplateParams(data);
    await emailjs.send(serviceId, templateId, templateParams, publicKey);
    return { success: true };
  } catch (error: any) {
    console.error("[EmailJS Browser Error]:", error);
    return { success: false, error: error.text || error.message || "Failed to send email." };
  }
}
