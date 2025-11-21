import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import { Header } from "./components/knight21/Header";
import { Footer } from "./components/knight21/Footer";
import { ScrollToTop } from "./components/ScrollToTop";
import Knight21Home from "./pages/Knight21Home";
import Knight21About from "./pages/Knight21About";
import Knight21Services from "./pages/Knight21Services";
import Knight21Contact from "./pages/Knight21Contact";
import Portfolio from "./pages/Portfolio";
import Reviews from "./pages/Reviews";
import Career from "./pages/Career";
import Blog from "./pages/Blog";
import BlogPost from "./pages/BlogPost";
import Auth from "./pages/Auth";
import Admin from "./pages/Admin";
import AdminDashboard from "./pages/AdminDashboard";
import AdminSetup from "./pages/AdminSetup";
import Courses from "./pages/Courses";
import Tools from "./pages/Tools";
import ServiceDetail from "./pages/ServiceDetail";
import NotFound from "./pages/NotFound";
import PrivacyPolicy from "./pages/PrivacyPolicy";
import TermsConditions from "./pages/TermsConditions";
import CancellationRefunds from "./pages/CancellationRefunds";
import Shipping from "./pages/Shipping";

const queryClient = new QueryClient();

const App = () => (
  <QueryClientProvider client={queryClient}>
    <TooltipProvider>
      <Toaster />
      <Sonner />
      <BrowserRouter>
        <ScrollToTop />
        <div className="min-h-screen flex flex-col">
          <Header />
          <main className="flex-1">
            <Routes>
              <Route path="/" element={<Knight21Home />} />
              <Route path="/about" element={<Knight21About />} />
              <Route path="/services" element={<Knight21Services />} />
              <Route path="/service/:slug" element={<ServiceDetail />} />
              <Route path="/contact" element={<Knight21Contact />} />
              <Route path="/portfolio" element={<Portfolio />} />
              <Route path="/reviews" element={<Reviews />} />
              <Route path="/career" element={<Career />} />
          <Route path="/blog" element={<Blog />} />
          <Route path="/blog/:id" element={<BlogPost />} />
              <Route path="/courses" element={<Courses />} />
              <Route path="/tools" element={<Tools />} />
              <Route path="/auth" element={<Auth />} />
              <Route path="/admin" element={<Admin />} />
              <Route path="/admin/setup" element={<AdminSetup />} />
              <Route path="/admin/dashboard" element={<AdminDashboard />} />
              <Route path="/privacy-policy" element={<PrivacyPolicy />} />
              <Route path="/terms-conditions" element={<TermsConditions />} />
              <Route path="/cancellation-refunds" element={<CancellationRefunds />} />
              <Route path="/shipping" element={<Shipping />} />
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
