import { useQuery } from "@tanstack/react-query";
import { supabase } from "@/integrations/supabase/client";
import { Link } from "react-router-dom";
import { ArrowRight, X } from "lucide-react";
import { useState } from "react";

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

export function OffersBanner() {
  const [dismissed, setDismissed] = useState<string[]>([]);

  const { data: banners } = useQuery({
    queryKey: ["offers_banner_public"],
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

  const visibleBanners = banners?.filter(b => !dismissed.includes(b.id)) || [];

  if (visibleBanners.length === 0) return null;

  return (
    <div className="w-full">
      {visibleBanners.map((banner) => (
        <div
          key={banner.id}
          className="relative py-3 px-4"
          style={{
            backgroundColor: banner.background_color || "#EBFBFF",
            color: banner.text_color || "#000000",
          }}
        >
          <div className="container mx-auto flex items-center justify-center gap-4 flex-wrap text-center">
            {banner.image_url && banner.image_url.trim() !== '' && (
              <img 
                src={banner.image_url} 
                alt={banner.title} 
                className="h-10 w-auto object-contain rounded"
                onError={(e) => {
                  (e.target as HTMLImageElement).style.display = 'none';
                }}
              />
            )}
            <div className="flex items-center gap-2 flex-wrap justify-center">
              <span className="font-semibold">{banner.title}</span>
              {banner.description && (
                <span className="text-sm opacity-90">— {banner.description}</span>
              )}
            </div>
            {banner.link_url && (
              <Link
                to={banner.link_url}
                className="inline-flex items-center gap-1 font-medium underline hover:opacity-80 transition-opacity"
              >
                {banner.link_text || "Learn More"}
                <ArrowRight className="w-4 h-4" />
              </Link>
            )}
          </div>
          <button
            onClick={() => setDismissed([...dismissed, banner.id])}
            className="absolute right-4 top-1/2 -translate-y-1/2 p-1 hover:opacity-70 transition-opacity"
            aria-label="Dismiss"
          >
            <X className="w-4 h-4" />
          </button>
        </div>
      ))}
    </div>
  );
}
