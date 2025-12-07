import { useEffect } from "react";
import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import { ScrollToTop } from "@/components/ScrollToTop";
import Home from "./pages/Home";
import Products from "./pages/Products";
import About from "./pages/About";
import Contact from "./pages/Contact";
import ShedSense from "./pages/ShedSense";
import SquirrelApiStudioPage from "./pages/SquirrelApiStudioPage";
import VawtLabPage from "./pages/VawtLabPage";
import LightsOutPage from "./pages/LightsOutPage";
import TrustChainPage from "./pages/TrustChainPage";
import NotFound from "./pages/NotFound";
import ProjectDetail from "./pages/ProjectDetail";
import Studio from "./pages/Studio";
import Labs from "./pages/Labs";
import Opportunities from "./pages/Opportunities";
import Terms from "./pages/Terms";
import Privacy from "./pages/Privacy";
import { initSmoothScroll } from "./effects/parallax";
import { shouldDeferHeavyEffects } from "./utils/performance";

const queryClient = new QueryClient();

const App = () => {
  useEffect(() => {
    if (shouldDeferHeavyEffects()) return () => {};
    const teardownSmooth = initSmoothScroll();
    return () => teardownSmooth();
  }, []);

  return (
    <QueryClientProvider client={queryClient}>
      <TooltipProvider>
        <Toaster />
        <Sonner />
        <BrowserRouter>
          <ScrollToTop />
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/projects" element={<Products />} />
            <Route path="/projects/squirrel-api-studio" element={<SquirrelApiStudioPage />} />
            <Route path="/projects/rodent-labs-vawt" element={<VawtLabPage />} />
            <Route path="/projects/lights-out" element={<LightsOutPage />} />
            <Route path="/projects/trustchain" element={<TrustChainPage />} />
            <Route path="/projects/:slug" element={<ProjectDetail />} />
            <Route path="/products" element={<Products />} />
            <Route path="/products/shedsense" element={<ShedSense />} />
            <Route path="/about" element={<About />} />
            <Route path="/studio" element={<Studio />} />
            <Route path="/labs" element={<Labs />} />
            <Route path="/opportunities" element={<Opportunities />} />
            <Route path="/contact" element={<Contact />} />
            <Route path="/terms" element={<Terms />} />
            <Route path="/privacy" element={<Privacy />} />
            {/* ADD ALL CUSTOM ROUTES ABOVE THE CATCH-ALL "*" ROUTE */}
            <Route path="*" element={<NotFound />} />
          </Routes>
        </BrowserRouter>
      </TooltipProvider>
    </QueryClientProvider>
  );
};

export default App;
