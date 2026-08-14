// Direção visual: Arquivo Editorial — fundo marfim, grafite, vermelho-carmim, ritmo assimétrico e tipografia editorial.
import { Toaster } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import NotFound from "@/pages/NotFound";
import { Route, Switch } from "wouter";
import ErrorBoundary from "./components/ErrorBoundary";
import { ThemeProvider } from "./contexts/ThemeContext";
import CV from "@/pages/CV";
import CaseStudy from "@/pages/CaseStudy";
import Editor from "@/pages/Editor";
import Home from "@/pages/Home";
import Privacy from "@/pages/Privacy";
function Router() {
  // make sure to consider if you need authentication for certain routes
  return (
    <Switch>
      <Route path="/" component={Home} />
      <Route path="/cv" component={CV} />
      <Route path="/cases/:slug" component={CaseStudy} />
      <Route path="/privacidade" component={Privacy} />
      <Route path="/editor" component={Editor} />
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
          <Toaster />
          <Router />
        </TooltipProvider>
      </ThemeProvider>
    </ErrorBoundary>
  );
}

export default App;
