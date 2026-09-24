"use client";

import { useEffect, useState } from "react";
import { GoogleAnalytics as NextGoogleAnalytics } from "@next/third-parties/google";

const CONSENT_STORAGE_KEY = "zelvoxx_cookie_consent";

interface GoogleAnalyticsProps {
  gaId?: string;
}

export default function GoogleAnalytics({ gaId }: GoogleAnalyticsProps) {
  const [hasConsent, setHasConsent] = useState(false);
  const measurementId =
    gaId ||
    process.env.NEXT_PUBLIC_GA_MEASUREMENT_ID ||
    "G-P5K8WT88DZ";

  useEffect(() => {
    // 1. Establish Google Consent Mode v2 default (privacy-first default)
    try {
      window.dataLayer = window.dataLayer || [];
      if (typeof window.gtag !== "function") {
        window.gtag = function (...args: unknown[]) {
          window.dataLayer?.push(args);
        };
      }
    } catch {}

    const checkConsent = () => {
      try {
        const stored = localStorage.getItem(CONSENT_STORAGE_KEY);
        if (stored === "accepted") {
          // Update Consent Mode to granted
          if (typeof window.gtag === "function") {
            window.gtag("consent", "update", {
              analytics_storage: "granted",
              ad_storage: "granted",
              ad_user_data: "granted",
              ad_personalization: "granted",
            });
          }
          setHasConsent(true);
        } else {
          // If declined or not yet accepted, keep consent denied and do not load script
          if (typeof window.gtag === "function") {
            window.gtag("consent", "default", {
              analytics_storage: "denied",
              ad_storage: "denied",
              ad_user_data: "denied",
              ad_personalization: "denied",
            });
          }
          setHasConsent(false);
        }
      } catch {
        setHasConsent(false);
      }
    };

    // Check initial state from storage
    checkConsent();

    // Listen for real-time acceptance / decline from CookieConsent banner
    const handleConsentEvent = (e: Event) => {
      const customEvt = e as CustomEvent<string>;
      if (customEvt.detail === "accepted") {
        if (typeof window.gtag === "function") {
          window.gtag("consent", "update", {
            analytics_storage: "granted",
            ad_storage: "granted",
            ad_user_data: "granted",
            ad_personalization: "granted",
          });
        }
        setHasConsent(true);
      } else if (customEvt.detail === "declined") {
        setHasConsent(false);
      } else {
        checkConsent();
      }
    };

    window.addEventListener("cookie-consent-updated", handleConsentEvent);
    window.addEventListener("storage", checkConsent);

    return () => {
      window.removeEventListener("cookie-consent-updated", handleConsentEvent);
      window.removeEventListener("storage", checkConsent);
    };
  }, []);

  // Strict gating: Only render the official @next/third-parties GoogleAnalytics component
  // once the user has explicitly accepted cookie consent
  if (!hasConsent || !measurementId) {
    return null;
  }

  return <NextGoogleAnalytics gaId={measurementId} />;
}
