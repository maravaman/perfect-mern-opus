import { useQuery } from "@tanstack/react-query";
import { supabase } from "@/integrations/supabase/client";
import { Link } from "react-router-dom";
import { ArrowRight, X, Gift } from "lucide-react";
import { useState, useEffect } from "react";
import { Button } from "@/components/ui/button";

interface OfferBanner {
  id: string;
  title: string;
  description: string | null;
  link_url: string | null;
  link_text: string | null;
  background_color: string | null;
  text_color: string | null;
  image_url: string | null;
}

export function OffersPopup() {
  const [isOpen, setIsOpen] = useState(false);
  const [dismissedOffers, setDismissedOffers] = useState<string[]>([]);

  const { data: banners } = useQuery({
    queryKey: ["offers_banner_popup"],
    queryFn: async () => {
      const { data, error } = await supabase
        .from("offers_banner")
        .select("*")
        .eq("active", true)
        .order("display_order", { ascending: true });
      if (error) throw error;
      return data as OfferBanner[];
    },
  });

  // Check session storage for dismissed offers on mount
  useEffect(() => {
    const dismissed = sessionStorage.getItem("dismissed_offers");
    if (dismissed) {
      setDismissedOffers(JSON.parse(dismissed));
    }
  }, []);

  // Show popup when banners load and there are active ones not dismissed
  useEffect(() => {
    if (banners && banners.length > 0) {
      const visibleBanners = banners.filter(b => !dismissedOffers.includes(b.id));
      if (visibleBanners.length > 0) {
        // Small delay to show popup after page loads
        const timer = setTimeout(() => setIsOpen(true), 1000);
        return () => clearTimeout(timer);
      }
    }
  }, [banners, dismissedOffers]);

  const handleClose = () => {
    setIsOpen(false);
    // Mark all current offers as dismissed for this session
    if (banners) {
      const newDismissed = [...dismissedOffers, ...banners.map(b => b.id)];
      setDismissedOffers(newDismissed);
      sessionStorage.setItem("dismissed_offers", JSON.stringify(newDismissed));
    }
  };

  const visibleBanners = banners?.filter(b => !dismissedOffers.includes(b.id)) || [];

  if (!isOpen || visibleBanners.length === 0) return null;

  const currentOffer = visibleBanners[0];
  const hasImage = currentOffer.image_url && currentOffer.image_url.startsWith('http');

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
      {/* Backdrop */}
      <div 
        className="absolute inset-0 bg-black/60 backdrop-blur-sm animate-fade-in"
        onClick={handleClose}
      />
      
      {/* Popup */}
      <div 
        className="relative w-full max-w-md rounded-2xl shadow-2xl overflow-hidden animate-scale-in"
        style={{
          backgroundColor: currentOffer.background_color || "#EBFBFF",
          color: currentOffer.text_color || "#000000",
        }}
      >
        {/* Close button */}
        <button
          onClick={handleClose}
          className="absolute right-3 top-3 p-2 rounded-full bg-black/10 hover:bg-black/20 transition-colors z-10"
          aria-label="Close"
        >
          <X className="w-5 h-5" />
        </button>

        {/* Content */}
        <div className="p-8 text-center">
          {/* Image or Icon */}
          {hasImage ? (
            <img 
              src={currentOffer.image_url!} 
              alt={currentOffer.title}
              className="w-32 h-32 mx-auto mb-6 object-contain rounded-lg"
            />
          ) : (
            <div className="w-16 h-16 mx-auto mb-6 rounded-full bg-gradient-to-br from-primary to-secondary flex items-center justify-center shadow-lg">
              <Gift className="w-8 h-8 text-white" />
            </div>
          )}

          {/* Title */}
          <h2 className="text-2xl md:text-3xl font-bold font-poppins mb-3">
            {currentOffer.title}
          </h2>

          {/* Description */}
          {currentOffer.description && (
            <p className="text-lg opacity-90 mb-6">
              {currentOffer.description}
            </p>
          )}

          {/* CTA Button */}
          {currentOffer.link_url && (
            <Link to={currentOffer.link_url} onClick={handleClose}>
              <Button 
                size="lg" 
                className="w-full bg-gradient-to-r from-primary to-secondary text-white hover:opacity-90 shadow-lg group"
              >
                {currentOffer.link_text || "Learn More"}
                <ArrowRight className="ml-2 w-5 h-5 group-hover:translate-x-1 transition-transform" />
              </Button>
            </Link>
          )}

          {/* Skip link */}
          <button
            onClick={handleClose}
            className="mt-4 text-sm opacity-70 hover:opacity-100 transition-opacity underline"
          >
            Maybe later
          </button>
        </div>

        {/* Decorative elements */}
        <div className="absolute -top-10 -right-10 w-32 h-32 rounded-full bg-gradient-to-br from-primary/20 to-secondary/20 blur-2xl" />
        <div className="absolute -bottom-10 -left-10 w-32 h-32 rounded-full bg-gradient-to-br from-secondary/20 to-accent/20 blur-2xl" />
      </div>
    </div>
  );
}
