import { useEffect, useState } from "react";
import { enableGoogleAnalytics, getGoogleAnalyticsMeasurementId } from "@/lib/analytics";

const CONSENT_KEY = "gabriel-portfolio-analytics-consent";

type ConsentState = "accepted" | "declined" | null;

function readConsent(): ConsentState {
  if (typeof window === "undefined") return null;
  const stored = window.localStorage.getItem(CONSENT_KEY);
  return stored === "accepted" || stored === "declined" ? stored : null;
}

export default function AnalyticsConsent() {
  const measurementId = getGoogleAnalyticsMeasurementId();
  const [consent, setConsent] = useState<ConsentState>(() => readConsent());

  useEffect(() => {
    if (consent === "accepted" && measurementId) enableGoogleAnalytics(measurementId);
  }, [consent, measurementId]);

  if (!measurementId || consent) return null;

  const choose = (value: Exclude<ConsentState, null>) => {
    window.localStorage.setItem(CONSENT_KEY, value);
    setConsent(value);
  };

  return (
    <aside className="analytics-consent" aria-label="Preferências de métricas">
      <p>Usamos métricas de navegação para entender acessos e contatos. Você pode aceitar ou recusar essa medição.</p>
      <div>
        <button type="button" onClick={() => choose("declined")}>Recusar</button>
        <button type="button" onClick={() => choose("accepted")}>Aceitar analytics</button>
      </div>
    </aside>
  );
}
