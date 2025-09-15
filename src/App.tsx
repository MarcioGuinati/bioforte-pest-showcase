import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Layout from "./components/Layout";
import Home from "./pages/Home";
import QuemSomos from "./pages/QuemSomos";
import BiologiaPragas from "./pages/BiologiaPragas";
import AreaAtuacao from "./pages/AreaAtuacao";
import NossoTime from "./pages/NossoTime";
import TrabalheConosco from "./pages/TrabalheConosco";
import Contato from "./pages/Contato";
import NotFound from "./pages/NotFound";

const queryClient = new QueryClient();

const App = () => (
  <QueryClientProvider client={queryClient}>
    <TooltipProvider>
      <Toaster />
      <Sonner />
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<Layout />}>
            <Route index element={<Home />} />
            <Route path="quem-somos" element={<QuemSomos />} />
            <Route path="biologia-pragas" element={<BiologiaPragas />} />
            <Route path="area-atuacao" element={<AreaAtuacao />} />
            <Route path="nosso-time" element={<NossoTime />} />
            <Route path="trabalhe-conosco" element={<TrabalheConosco />} />
            <Route path="contato" element={<Contato />} />
            {/* ADD ALL CUSTOM ROUTES ABOVE THE CATCH-ALL "*" ROUTE */}
            <Route path="*" element={<NotFound />} />
          </Route>
        </Routes>
      </BrowserRouter>
    </TooltipProvider>
  </QueryClientProvider>
);

export default App;
