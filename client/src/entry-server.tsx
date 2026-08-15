import { httpBatchLink } from "@trpc/client";
import { dehydrate, QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { renderToString } from "react-dom/server";
import superjson from "superjson";
import { Router } from "wouter";
import { trpc } from "@/lib/trpc";
import { getPortfolioRouteMeta, type PortfolioRouteMeta } from "@shared/portfolioSeo";
import App from "./App";

export type SsrRenderResult = {
  html: string;
  dehydratedState: unknown;
  head: PortfolioRouteMeta;
};

export async function render(url: string): Promise<SsrRenderResult> {
  const queryClient = new QueryClient({
    defaultOptions: { queries: { retry: false, refetchOnWindowFocus: false } },
  });
  const queryIndex = url.indexOf("?");
  const ssrPath = queryIndex === -1 ? url : url.slice(0, queryIndex);
  const ssrSearch = queryIndex === -1 ? "" : url.slice(queryIndex + 1);
  const trpcClient = trpc.createClient({
    links: [httpBatchLink({ url: "/api/trpc", transformer: superjson })],
  });
  const html = renderToString(
    <trpc.Provider client={trpcClient} queryClient={queryClient}>
      <QueryClientProvider client={queryClient}>
        <Router ssrPath={ssrPath} ssrSearch={ssrSearch}>
          <App />
        </Router>
      </QueryClientProvider>
    </trpc.Provider>,
  );

  return {
    html,
    dehydratedState: dehydrate(queryClient),
    head: getPortfolioRouteMeta(ssrPath),
  };
}
