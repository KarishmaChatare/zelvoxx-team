import { track } from "@vercel/analytics";

/**
 * Universal event tracking helper.
 * Tracks custom user interactions, conversions, and funnel steps.
 */
export function trackEvent(
  eventName: string,
  properties?: Record<string, string | number | boolean | null>
) {
  try {
    track(eventName, properties);
  } catch (err) {
    if (process.env.NODE_ENV !== "production") {
      console.log(`[Event Tracked: ${eventName}]`, properties);
    }
  }
}
