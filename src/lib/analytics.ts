import { track } from "@vercel/analytics";

/**
 * Safe gtag wrapper that works on client whether GA4 script is fully loaded,
 * queuing, or initialized.
 */
export function gtag(
  command: "config" | "event" | "consent" | "set" | "js" | string,
  targetOrAction: string | Date,
  params?: Record<string, unknown>
) {
  if (typeof window === "undefined") return;

  try {
    if (typeof window.gtag === "function") {
      window.gtag(command, targetOrAction, params);
    } else {
      window.dataLayer = window.dataLayer || [];
      window.gtag = function (...args: unknown[]) {
        window.dataLayer?.push(args);
      };
      window.gtag(command, targetOrAction, params);
    }
  } catch (err) {
    if (process.env.NODE_ENV !== "production") {
      console.warn("[gtag error]", err);
    }
  }
}

/**
 * Universal event tracking helper.
 * Tracks custom user interactions across both Vercel Analytics and Google Analytics (GA4).
 */
export function trackEvent(
  eventName: string,
  properties?: Record<string, string | number | boolean | null>
) {
  try {
    track(eventName, properties);
  } catch {
    if (process.env.NODE_ENV !== "production") {
      console.log(`[Vercel Event Tracked: ${eventName}]`, properties);
    }
  }

  // Also forward to Google Analytics 4
  try {
    gtag("event", eventName, {
      event_category: "engagement",
      ...properties,
    });
  } catch {
    if (process.env.NODE_ENV !== "production") {
      console.log(`[GA4 Event Error: ${eventName}]`);
    }
  }
}

/**
 * Dedicated conversion tracking helpers matching GA4 event conventions:
 * gtag('event', 'event_name', { event_category: 'engagement', event_label: '...' })
 */

export function trackConnectWithUsClick(label: string = "Connect With Us Button") {
  gtag("event", "connect_with_us_click", {
    event_category: "engagement",
    event_label: label,
  });
}

export function trackWhatsAppClick(label: string = "Floating WhatsApp Button") {
  gtag("event", "whatsapp_click", {
    event_category: "engagement",
    event_label: label,
  });
}

export function trackSeePricingClick(label: string = "See Pricing Button") {
  gtag("event", "see_pricing_click", {
    event_category: "engagement",
    event_label: label,
  });
}

export function trackCheckoutClick(label: string = "Stripe/Razorpay Checkout Button", value?: number) {
  gtag("event", "checkout_click", {
    event_category: "engagement",
    event_label: label,
    ...(value !== undefined ? { value } : {}),
  });
  // Also fire standard GA4 ecommerce begin_checkout
  gtag("event", "begin_checkout", {
    event_category: "engagement",
    event_label: label,
    ...(value !== undefined ? { value } : {}),
  });
}
