import { track } from "@vercel/analytics";

/**
 * Push an event object directly to GTM dataLayer:
 * window.dataLayer.push({ event: 'event_name', ...params })
 */
export function pushToDataLayer(
  event: string,
  params?: Record<string, unknown>
) {
  if (typeof window === "undefined") return;

  try {
    window.dataLayer = window.dataLayer || [];
    window.dataLayer.push({
      event,
      ...params,
    });
  } catch (err) {
    if (process.env.NODE_ENV !== "production") {
      console.warn("[dataLayer error]", err);
    }
  }
}

/**
 * Safe gtag wrapper that redirects events to GTM dataLayer objects.
 * Calling gtag("event", "connect_with_us_click", { ... }) pushes:
 * { event: "connect_with_us_click", ... } into window.dataLayer.
 */
export function gtag(
  command: "config" | "event" | "consent" | "set" | "js" | string,
  targetOrAction: string | Date,
  params?: Record<string, unknown>
) {
  if (typeof window === "undefined") return;

  try {
    window.dataLayer = window.dataLayer || [];

    if (command === "event" && typeof targetOrAction === "string") {
      pushToDataLayer(targetOrAction, params);
      return;
    }

    if (typeof window.gtag === "function") {
      window.gtag(command, targetOrAction, params);
    } else {
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
 * Tracks custom user interactions across Vercel Analytics and GTM dataLayer.
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

  // Forward directly to GTM dataLayer
  pushToDataLayer(eventName, {
    event_category: "engagement",
    ...properties,
  });
}

/**
 * Dedicated conversion tracking helpers pushing directly to GTM dataLayer:
 * window.dataLayer.push({ event: '...', ... })
 */

export function trackConnectWithUsClick(label: string = "Connect With Us Button") {
  pushToDataLayer("connect_with_us_click", {
    event_category: "engagement",
    event_label: label,
  });
}

export function trackWhatsAppClick(label: string = "Floating WhatsApp Button") {
  pushToDataLayer("whatsapp_click", {
    event_category: "engagement",
    event_label: label,
  });
}

export function trackSeePricingClick(label: string = "See Pricing Button") {
  pushToDataLayer("see_pricing_click", {
    event_category: "engagement",
    event_label: label,
  });
}

export function trackCheckoutClick(
  label: string = "Stripe/Razorpay Checkout Button",
  tierDetails?: { name?: string; price?: string; value?: number }
) {
  const payload = {
    event_category: "engagement",
    event_label: label,
    ...(tierDetails?.name ? { pricing_tier: tierDetails.name } : {}),
    ...(tierDetails?.price ? { pricing_price: tierDetails.price } : {}),
    ...(tierDetails?.value !== undefined ? { value: tierDetails.value } : {}),
  };
  pushToDataLayer("checkout_click", payload);
  pushToDataLayer("begin_checkout", payload);
}

export function trackContactEmailClick(label: string = "Footer Contact Email") {
  pushToDataLayer("contact_email_click", {
    event_category: "engagement",
    event_label: label,
  });
}

export function trackSocialClick(platform: string, label?: string) {
  pushToDataLayer("social_click", {
    event_category: "engagement",
    event_label: label || `Footer Social - ${platform}`,
    social_network: platform,
  });
}

