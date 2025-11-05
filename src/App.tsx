import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import { Header } from "./components/knight21/Header";
import { Footer } from "./components/knight21/Footer";
import Knight21Home from "./pages/Knight21Home";
import Knight21About from "./pages/Knight21About";
import Knight21Services from "./pages/Knight21Services";
import Knight21Contact from "./pages/Knight21Contact";
import Portfolio from "./pages/Portfolio";
import Reviews from "./pages/Reviews";
import Auth from "./pages/Auth";
import Admin from "./pages/Admin";
import Courses from "./pages/Courses";
import Tools from "./pages/Tools";
import NotFound from "./pages/NotFound";

const queryClient = new QueryClient();

const App = () => (
  <QueryClientProvider client={queryClient}>
    <TooltipProvider>
      <Toaster />
      <Sonner />
      <BrowserRouter>
        <div className="min-h-screen flex flex-col">
          <Header />
          <main className="flex-1">
            <Routes>
              <Route path="/" element={<Knight21Home />} />
              <Route path="/about" element={<Knight21About />} />
              <Route path="/services" element={<Knight21Services />} />
              <Route path="/contact" element={<Knight21Contact />} />
              <Route path="/portfolio" element={<Portfolio />} />
              <Route path="/reviews" element={<Reviews />} />
              <Route path="/courses" element={<Courses />} />
              <Route path="/tools" element={<Tools />} />
              <Route path="/auth" element={<Auth />} />
              <Route path="/admin" element={<Admin />} />
              {/* ADD ALL CUSTOM ROUTES ABOVE THE CATCH-ALL "*" ROUTE */}
              <Route path="*" element={<NotFound />} />
            </Routes>
          </main>
          <Footer />
        </div>
      </BrowserRouter>
    </TooltipProvider>
  </QueryClientProvider>
);

export default App;
