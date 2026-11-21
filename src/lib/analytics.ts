declare global {
  interface Window {
    gtag?: (...args: unknown[]) => void;
    dataLayer?: unknown[];
  }
}

export type TrackedEvent = "generate_lead" | "whatsapp_click" | "phone_click" | "directions_click";

/** Sends a GA4 event only when analytics is configured and loaded. Safe no-op otherwise. */
export function track(event: TrackedEvent, params: Record<string, unknown> = {}) {
  if (typeof window !== "undefined" && typeof window.gtag === "function") {
    window.gtag("event", event, params);
  }
}
