"use client";

import { useEffect, useState } from "react";
import Script from "next/script";

const CONSENT_STORAGE_KEY = "zelvoxx_cookie_consent";
const DEFAULT_GTM_ID = "GTM-5GXNX9QZ";

interface GoogleTagManagerProps {
  gtmId?: string;
}

export default function GoogleTagManager({ gtmId }: GoogleTagManagerProps) {
  const [hasConsent, setHasConsent] = useState(false);
  const containerId =
    gtmId || process.env.NEXT_PUBLIC_GTM_ID || DEFAULT_GTM_ID;

  useEffect(() => {
    // 1. Ensure dataLayer exists
    window.dataLayer = window.dataLayer || [];

    // 2. Establish Google Consent Mode v2 default
    if (typeof window.gtag !== "function") {
      window.gtag = function (...args: unknown[]) {
        window.dataLayer?.push(args);
      };
    }

    const checkConsent = () => {
      try {
        const stored = localStorage.getItem(CONSENT_STORAGE_KEY);
        if (stored === "accepted") {
          if (typeof window.gtag === "function") {
            window.gtag("consent", "update", {
              analytics_storage: "granted",
              ad_storage: "granted",
              ad_user_data: "granted",
              ad_personalization: "granted",
            });
          }
          window.dataLayer?.push({ event: "cookie_consent_accepted" });
          setHasConsent(true);
        } else {
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

    checkConsent();

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
        window.dataLayer?.push({ event: "cookie_consent_accepted" });
        setHasConsent(true);
      } else if (customEvt.detail === "declined") {
        if (typeof window.gtag === "function") {
          window.gtag("consent", "default", {
            analytics_storage: "denied",
            ad_storage: "denied",
            ad_user_data: "denied",
            ad_personalization: "denied",
          });
        }
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

  if (!containerId) {
    return null;
  }

  return (
    <>
      {/* 1. Google Consent Mode v2 Default - sets up consent default denial before GTM fires tags */}
      <Script
        id="gtm-consent-default"
        strategy="afterInteractive"
        dangerouslySetInnerHTML={{
          __html: `
            window.dataLayer = window.dataLayer || [];
            function gtag(){dataLayer.push(arguments);}
            try {
              var consent = localStorage.getItem('${CONSENT_STORAGE_KEY}');
              if (consent === 'accepted') {
                gtag('consent', 'default', {
                  'analytics_storage': 'granted',
                  'ad_storage': 'granted',
                  'ad_user_data': 'granted',
                  'ad_personalization': 'granted'
                });
              } else {
                gtag('consent', 'default', {
                  'analytics_storage': 'denied',
                  'ad_storage': 'denied',
                  'ad_user_data': 'denied',
                  'ad_personalization': 'denied'
                });
              }
            } catch(e) {
              gtag('consent', 'default', {
                'analytics_storage': 'denied',
                'ad_storage': 'denied',
                'ad_user_data': 'denied',
                'ad_personalization': 'denied'
              });
            }
          `,
        }}
      />

      {/* 2. Google Tag Manager Main Container Script */}
      <Script
        id="google-tag-manager"
        strategy="afterInteractive"
        dangerouslySetInnerHTML={{
          __html: `(function(w,d,s,l,i){w[l]=w[l]||[];w[l].push({'gtm.start':
new Date().getTime(),event:'gtm.js'});var f=d.getElementsByTagName(s)[0],
j=d.createElement(s),dl=l!='dataLayer'?'&l='+l:'';j.async=true;j.src=
'https://www.googletagmanager.com/gtm.js?id='+i+dl;f.parentNode.insertBefore(j,f);
})(window,document,'script','dataLayer','${containerId}');`,
        }}
      />
    </>
  );
}
