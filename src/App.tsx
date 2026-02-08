import { lazy, Suspense } from "react";
import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import { ThemeProvider } from "next-themes";
import Layout from "./components/Layout";
import Home from "./pages/Home";

// Lazy load secondary pages for better initial load
const QuemSomos = lazy(() => import("./pages/QuemSomos"));
const BiologiaPragas = lazy(() => import("./pages/BiologiaPragas"));
const AreaAtuacao = lazy(() => import("./pages/AreaAtuacao"));
const NossoTime = lazy(() => import("./pages/NossoTime"));
const TrabalheConosco = lazy(() => import("./pages/TrabalheConosco"));
const AreaCliente = lazy(() => import("./pages/AreaCliente"));
const Contato = lazy(() => import("./pages/Contato"));
const NotFound = lazy(() => import("./pages/NotFound"));

const queryClient = new QueryClient({
  defaultOptions: {
    queries: {
      staleTime: 1000 * 60 * 5, // 5 minutes
      gcTime: 1000 * 60 * 30, // 30 minutes
    },
  },
});

// Minimal loading fallback for better perceived performance
const PageLoader = () => (
  <div className="min-h-[50vh] flex items-center justify-center" role="status" aria-label="Carregando página">
    <div className="w-8 h-8 border-4 border-primary border-t-transparent rounded-full animate-spin" />
    <span className="sr-only">Carregando...</span>
  </div>
);

const App = () => (
  <QueryClientProvider client={queryClient}>
    <ThemeProvider attribute="class" defaultTheme="light" enableSystem>
      <TooltipProvider>
        <Toaster />
        <Sonner />
        <BrowserRouter future={{ v7_startTransition: true, v7_relativeSplatPath: true }}>
          <Routes>
            <Route path="/" element={<Layout />}>
              <Route index element={<Home />} />
              <Route path="quem-somos" element={<Suspense fallback={<PageLoader />}><QuemSomos /></Suspense>} />
              <Route path="biologia-pragas" element={<Suspense fallback={<PageLoader />}><BiologiaPragas /></Suspense>} />
              <Route path="area-atuacao" element={<Suspense fallback={<PageLoader />}><AreaAtuacao /></Suspense>} />
              <Route path="nosso-time" element={<Suspense fallback={<PageLoader />}><NossoTime /></Suspense>} />
              <Route path="trabalhe-conosco" element={<Suspense fallback={<PageLoader />}><TrabalheConosco /></Suspense>} />
              <Route path="area-cliente" element={<Suspense fallback={<PageLoader />}><AreaCliente /></Suspense>} />
              <Route path="contato" element={<Suspense fallback={<PageLoader />}><Contato /></Suspense>} />
              {/* ADD ALL CUSTOM ROUTES ABOVE THE CATCH-ALL "*" ROUTE */}
              <Route path="*" element={<Suspense fallback={<PageLoader />}><NotFound /></Suspense>} />
            </Route>
          </Routes>
        </BrowserRouter>
      </TooltipProvider>
    </ThemeProvider>
  </QueryClientProvider>
);

export default App;
