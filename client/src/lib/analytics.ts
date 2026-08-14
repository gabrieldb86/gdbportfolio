export type PortfolioAnalyticsEvent =
  | "contact_whatsapp"
  | "contact_linkedin"
  | "contact_email"
  | "contact_form_whatsapp"
  | "cta_fale_comigo"
  | "portfolio_behance"
  | "project_case_open";

type AnalyticsProperties = Record<string, string | number | boolean | undefined>;

declare global {
  interface Window {
    umami?: { track?: (eventName: string, properties?: AnalyticsProperties) => void };
    dataLayer?: unknown[][];
    gtag?: (...args: unknown[]) => void;
  }
}

const GA4_ID_PATTERN = /^G-[A-Z0-9]{6,}$/i;

export function isGoogleAnalyticsMeasurementId(value: string | undefined): boolean {
  return Boolean(value && GA4_ID_PATTERN.test(value.trim()));
}

export function getGoogleAnalyticsMeasurementId(): string | undefined {
  const candidate = import.meta.env.VITE_GA_MEASUREMENT_ID as string | undefined;
  return candidate && isGoogleAnalyticsMeasurementId(candidate) ? candidate.trim() : undefined;
}

export function enableGoogleAnalytics(measurementId = getGoogleAnalyticsMeasurementId()): boolean {
  if (!measurementId || typeof window === "undefined" || typeof document === "undefined") return false;

  window.dataLayer = window.dataLayer ?? [];
  window.gtag = window.gtag ?? ((...args: unknown[]) => window.dataLayer?.push(args));
  window.gtag("js", new Date());
  window.gtag("config", measurementId, { anonymize_ip: true });

  if (!document.getElementById("ga4-measurement-script")) {
    const script = document.createElement("script");
    script.id = "ga4-measurement-script";
    script.async = true;
    script.src = `https://www.googletagmanager.com/gtag/js?id=${encodeURIComponent(measurementId)}`;
    document.head.append(script);
  }

  return true;
}

export function trackPortfolioEvent(eventName: PortfolioAnalyticsEvent, properties: AnalyticsProperties = {}): void {
  if (typeof window === "undefined") return;

  window.umami?.track?.(eventName, properties);
  window.gtag?.("event", eventName, properties);
}
