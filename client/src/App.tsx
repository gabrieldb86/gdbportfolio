// Direção visual: Arquivo Editorial — fundo marfim, grafite, vermelho-carmim, ritmo assimétrico e tipografia editorial.
import { TooltipProvider } from "@/components/ui/tooltip";
import { lazy, Suspense } from "react";
import { Head } from "@/components/Head";
import { ClientToaster } from "@/components/ClientToaster";
import NotFound from "@/pages/NotFound";
import { Route, Switch } from "wouter";
import ErrorBoundary from "./components/ErrorBoundary";
import AnalyticsConsent from "./components/AnalyticsConsent";
import { ThemeProvider } from "./contexts/ThemeContext";
import CV from "@/pages/CV";
import CaseStudy from "@/pages/CaseStudy";
import Home from "@/pages/Home";
import Privacy from "@/pages/Privacy";

const Editor = lazy(() => import("@/pages/Editor"));
function Router() {
  // make sure to consider if you need authentication for certain routes
  return (
    <Switch>
      <Route path="/" component={Home} />
      <Route path="/cv" component={CV} />
      <Route path="/cases/:slug" component={CaseStudy} />
      <Route path="/privacidade" component={Privacy} />
      <Route path="/editor">
        {() => {
          const params = new URLSearchParams(typeof window === "undefined" ? "" : window.location.search);
          if (params.get("secret") !== "gabriel2026") {
            return <NotFound />;
          }
          return <Suspense fallback={null}><Editor /></Suspense>;
        }}
      </Route>
      <Route path="/404" component={NotFound} />
      <Route component={NotFound} />
    </Switch>
  );
}

function App() {
  return (
    <ErrorBoundary>
      <ThemeProvider defaultTheme="light">
        <TooltipProvider>
          <ClientToaster />
          <Head />
          <Router />
          <AnalyticsConsent />
        </TooltipProvider>
      </ThemeProvider>
    </ErrorBoundary>
  );
}

export default App;
