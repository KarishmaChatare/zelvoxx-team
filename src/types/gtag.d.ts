export {};

declare global {
  interface Window {
    dataLayer?: unknown[];
    gtag?: (
      command: "config" | "event" | "consent" | "set" | "js" | string,
      targetIdOrAction: string | Date,
      params?: Record<string, unknown>
    ) => void;
  }

  function gtag(
    command: "config" | "event" | "consent" | "set" | "js" | string,
    targetIdOrAction: string | Date,
    params?: Record<string, unknown>
  ): void;
}
