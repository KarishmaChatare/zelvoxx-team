import { NextRequest, NextResponse } from "next/server";
import { createClient } from "next-sanity";
import { sendContactEmailServer } from "@/src/lib/emailjs";

// In-memory rate limiting map: IP -> { count: number, resetAt: number }
const rateLimitMap = new Map<string, { count: number; resetAt: number }>();
const RATE_LIMIT_WINDOW = 10 * 60 * 1000; // 10 minutes
const MAX_REQUESTS = 5;

function isRateLimited(ip: string): boolean {
  const now = Date.now();
  const record = rateLimitMap.get(ip);

  if (!record || now > record.resetAt) {
    rateLimitMap.set(ip, { count: 1, resetAt: now + RATE_LIMIT_WINDOW });
    return false;
  }

  if (record.count >= MAX_REQUESTS) {
    return true;
  }

  record.count += 1;
  return false;
}

export async function POST(req: NextRequest) {
  try {
    const ip = req.headers.get("x-forwarded-for")?.split(",")[0]?.trim() || "anonymous";

    // 1. Rate Limiting Check
    if (isRateLimited(ip)) {
      return NextResponse.json(
        { error: "Too many requests. Please wait a few minutes before trying again." },
        { status: 429 }
      );
    }

    const body = await req.json();
    const { name, email, phone, company, services, budget, timeline, discoverySource, message, website_url_hp } = body;

    // 2. Honeypot Spam Protection
    // If the invisible honeypot field is filled, it's an automated bot.
    if (website_url_hp) {
      console.warn(`[SPAM BLOCKED] Honeypot triggered by IP ${ip}: ${JSON.stringify(website_url_hp)}`);
      // Return 200 OK so the spam bot believes submission succeeded
      return NextResponse.json({ success: true, message: "Inquiry received." }, { status: 200 });
    }

    // 3. Server-side Field Validations
    const errors: Record<string, string> = {};

    if (!name || typeof name !== "string" || name.trim().length < 2) {
      errors.name = "Full name is required (minimum 2 characters).";
    }

    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!email || typeof email !== "string" || !emailRegex.test(email.trim())) {
      errors.email = "A valid business email address is required.";
    }

    if (!Array.isArray(services) || services.length === 0) {
      errors.services = "Please select at least one service of interest.";
    }

    if (Object.keys(errors).length > 0) {
      return NextResponse.json(
        { error: "Validation failed", errors },
        { status: 400 }
      );
    }

    // 4. Sanitize and Store Submission
    const sanitizedData = {
      _type: "contactSubmission",
      name: name.trim().slice(0, 100),
      email: email.trim().toLowerCase().slice(0, 150),
      phone: typeof phone === "string" ? phone.trim().slice(0, 30) : undefined,
      company: typeof company === "string" ? company.trim().slice(0, 100) : undefined,
      services,
      budget: typeof budget === "string" ? budget.slice(0, 50) : undefined,
      timeline: typeof timeline === "string" ? timeline.slice(0, 50) : undefined,
      discoverySource: typeof discoverySource === "string" ? discoverySource.slice(0, 50) : undefined,
      message: typeof message === "string" ? message.trim().slice(0, 3000) : undefined,
      submittedAt: new Date().toISOString(),
      ipAddress: ip,
      status: "new",
    };

    // If Sanity write token is configured, save securely server-side
    const token = process.env.SANITY_API_TOKEN;
    const projectId = process.env.NEXT_PUBLIC_SANITY_PROJECT_ID || "a0nhkjjj";
    const dataset = process.env.NEXT_PUBLIC_SANITY_DATASET || "production";

    if (token) {
      try {
        const serverClient = createClient({
          projectId,
          dataset,
          apiVersion: "2024-01-01",
          useCdn: false,
          token,
        });
        await serverClient.create(sanitizedData);
      } catch (sanityErr) {
        console.warn("[Sanity Save Notice]:", sanityErr);
      }
    } else {
      console.log("[INQUIRY LOGGED (No SANITY_API_TOKEN configured)]:", sanitizedData);
    }

    // 5. Send notification email via EmailJS to enquiry.zelvoxx@gmail.com
    const emailResult = await sendContactEmailServer(sanitizedData);

    return NextResponse.json(
      { 
        success: true, 
        message: "Thank you! Your inquiry has been submitted successfully.",
        emailSent: emailResult.success 
      },
      { status: 200 }
    );
  } catch (error: any) {
    console.error("Contact API submission error:", error);
    return NextResponse.json(
      { error: "An unexpected error occurred while processing your request. Please try again later." },
      { status: 500 }
    );
  }
}
