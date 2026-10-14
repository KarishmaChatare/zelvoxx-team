import { createClient } from "next-sanity";
import { NextResponse } from "next/server";
import { sendCareerApplicationEmailServer } from "@/src/lib/emailjs";

const projectId = process.env.NEXT_PUBLIC_SANITY_PROJECT_ID || "a0nhkjjj";
const dataset = process.env.NEXT_PUBLIC_SANITY_DATASET || "production";

function getWriteClient() {
  const token = process.env.SANITY_API_TOKEN;
  if (!token) return null;
  return createClient({
    projectId,
    dataset,
    apiVersion: "2024-01-01",
    useCdn: false,
    token,
  });
}

export async function POST(request: Request) {
  try {
    const formData = await request.formData();

    const name = String(formData.get("name") || "").trim();
    const email = String(formData.get("email") || "").trim();
    const role = String(formData.get("role") || "").trim();
    const honeypot = String(formData.get("website_url_hp") || "").trim();

    // Honeypot spam defense
    if (honeypot) {
      return NextResponse.json(
        { success: true, message: "Application received." },
        { status: 200 }
      );
    }

    if (!name || !email || !role) {
      return NextResponse.json(
        { error: "Name, email, and role are required." },
        { status: 400 }
      );
    }

    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(email)) {
      return NextResponse.json(
        { error: "Please enter a valid email address." },
        { status: 400 }
      );
    }

    const phone = String(formData.get("phone") || "").trim() || undefined;
    const location = String(formData.get("location") || "").trim() || undefined;
    const portfolioUrl = String(formData.get("portfolioUrl") || "").trim() || undefined;
    const workMode = String(formData.get("workMode") || "").trim() || undefined;
    const yearsOfExperience = String(formData.get("yearsOfExperience") || "").trim() || undefined;
    const whyJoin = String(formData.get("whyJoin") || "").trim() || undefined;

    const resumeFile = formData.get("resume");
    let resumeField: { _type: "file"; asset: { _type: "reference"; _ref: string } } | undefined;
    let resumeFileName: string | undefined;

    const sanityClient = getWriteClient();

    if (resumeFile instanceof File && resumeFile.size > 0) {
      resumeFileName = resumeFile.name;
      if (sanityClient) {
        try {
          const buffer = Buffer.from(await resumeFile.arrayBuffer());
          const asset = await sanityClient.assets.upload("file", buffer, {
            filename: resumeFile.name,
            contentType: resumeFile.type || "application/octet-stream",
          });
          resumeField = {
            _type: "file",
            asset: { _type: "reference", _ref: asset._id },
          };
        } catch (assetErr) {
          console.warn("[Sanity Asset Upload Notice]:", assetErr);
        }
      }
    }

    // 1. Store in Sanity CMS Content Lake if SANITY_API_TOKEN is configured
    let savedToSanity = false;
    if (sanityClient) {
      try {
        await sanityClient.create({
          _type: "careerApplication",
          name,
          email,
          phone,
          location,
          role,
          portfolioUrl,
          resume: resumeField,
          resumeFileName,
          workMode,
          yearsOfExperience,
          whyJoin,
          submittedAt: new Date().toISOString(),
          status: "new",
        });
        savedToSanity = true;
      } catch (sanityErr) {
        console.warn("[Sanity Career Save Notice]:", sanityErr);
      }
    } else {
      console.log("[CAREER APPLICATION LOGGED (SANITY_API_TOKEN pending)]:", {
        name,
        email,
        phone,
        location,
        role,
        workMode,
        yearsOfExperience,
        portfolioUrl,
        resumeFileName,
        whyJoin,
        submittedAt: new Date().toISOString(),
      });
    }

    // 2. Dispatch email notification to enquiry.zelvoxx@gmail.com via EmailJS
    const emailResult = await sendCareerApplicationEmailServer({
      name,
      email,
      phone,
      location,
      role,
      portfolioUrl,
      workMode,
      yearsOfExperience,
      whyJoin,
      resumeFileName,
    });

    return NextResponse.json({
      success: true,
      message: "Application submitted successfully.",
      emailSent: emailResult.success,
      storedInSanity: savedToSanity,
    });
  } catch (error) {
    console.error("Career application error:", error);
    return NextResponse.json(
      { error: "Failed to submit application. Please try again." },
      { status: 500 }
    );
  }
}
