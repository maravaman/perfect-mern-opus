import { useEffect, useRef, useState } from "react";
import { supabase } from "@/integrations/supabase/client";
import anvikaLogo from "@/assets/clients/anvika.png";
import sriAcademyLogo from "@/assets/clients/sri-academy.png";
import vedhaLogo from "@/assets/clients/vedha.png";
import dineEmpireLogo from "@/assets/clients/dine-empire.png";
import jirehMelodiesLogo from "@/assets/clients/jireh-melodies.png";
import mbPrimeLogo from "@/assets/clients/mb-prime.png";
import nextgenLogo from "@/assets/clients/nextgen.png";
import newGenElevatorsLogo from "@/assets/clients/new-gen-elevators.png";
import leelavathiLogo from "@/assets/clients/leelavathi.png";

interface Client {
  id: string;
  name: string;
  logo_url: string | null;
  website_url: string | null;
}

const fallbackClients = [
  { id: "1", name: "Anvika Computers", logo_url: anvikaLogo, website_url: null },
  { id: "2", name: "Sri Academy", logo_url: sriAcademyLogo, website_url: null },
  { id: "3", name: "Vedha Software", logo_url: vedhaLogo, website_url: null },
  { id: "4", name: "Dine Empire", logo_url: dineEmpireLogo, website_url: null },
  { id: "5", name: "Jireh Melodies", logo_url: jirehMelodiesLogo, website_url: null },
  { id: "6", name: "MB Prime Projects", logo_url: mbPrimeLogo, website_url: null },
  { id: "7", name: "Next Gens Store", logo_url: nextgenLogo, website_url: null },
  { id: "8", name: "New Gen Elevators", logo_url: newGenElevatorsLogo, website_url: null },
  { id: "9", name: "Leelavathi Designer", logo_url: leelavathiLogo, website_url: null },
];

export const TrustedClients = () => {
  const scrollerRef = useRef<HTMLDivElement>(null);
  const [clients, setClients] = useState<Client[]>(fallbackClients);

  useEffect(() => {
    fetchClients();

    // Subscribe to real-time updates
    const channel = supabase
      .channel('trusted-clients-public')
      .on('postgres_changes', { event: '*', schema: 'public', table: 'trusted_clients' }, fetchClients)
      .subscribe();

    return () => {
      supabase.removeChannel(channel);
    };
  }, []);

  const fetchClients = async () => {
    const { data, error } = await supabase
      .from("trusted_clients")
      .select("*")
      .eq("active", true)
      .order("display_order", { ascending: true });

    if (!error && data && data.length > 0) {
      setClients(data);
    }
  };

  useEffect(() => {
    const scroller = scrollerRef.current;
    if (!scroller) return;

    // Clear and re-duplicate items for seamless loop
    const scrollerInner = scroller.querySelector(".scroller-inner");
    if (scrollerInner) {
      // Remove previously duplicated items
      const originalItems = Array.from(scrollerInner.children).slice(0, clients.length);
      scrollerInner.innerHTML = '';
      originalItems.forEach(item => scrollerInner.appendChild(item.cloneNode(true)));
      
      // Duplicate items for seamless loop
      const scrollerContent = Array.from(scrollerInner.children);
      scrollerContent.forEach((item) => {
        const duplicatedItem = item.cloneNode(true);
        scrollerInner.appendChild(duplicatedItem);
      });
    }
  }, [clients]);

  return (
    <section className="py-16 bg-white overflow-hidden">
      <div className="container mx-auto px-4">
        <h2 className="text-3xl md:text-4xl font-bold text-center mb-12 font-poppins">
          Our <span className="text-primary">Trusted Clients</span>
        </h2>
        
        <div ref={scrollerRef} className="scroller" data-animated="true">
          <div className="scroller-inner flex gap-8 animate-scroll">
            {clients.map((client) => (
              <div
                key={client.id}
                className="flex items-center justify-center min-w-[200px] h-24 px-8 bg-white rounded-lg shadow-md hover:shadow-lg transition-shadow"
              >
                {client.website_url ? (
                  <a href={client.website_url} target="_blank" rel="noopener noreferrer">
                    <img
                      src={client.logo_url || ''}
                      alt={client.name}
                      className="max-h-16 max-w-full object-contain transition-all hover:scale-110"
                      loading="lazy"
                    />
                  </a>
                ) : (
                  <img
                    src={client.logo_url || ''}
                    alt={client.name}
                    className="max-h-16 max-w-full object-contain transition-all hover:scale-110"
                    loading="lazy"
                  />
                )}
              </div>
            ))}
          </div>
        </div>
      </div>

      <style>{`
        .scroller {
          max-width: 100%;
        }

        .scroller[data-animated="true"] {
          overflow: hidden;
          -webkit-mask: linear-gradient(
            90deg,
            transparent,
            white 10%,
            white 90%,
            transparent
          );
          mask: linear-gradient(90deg, transparent, white 10%, white 90%, transparent);
        }

        .scroller[data-animated="true"] .scroller-inner {
          width: max-content;
          flex-wrap: nowrap;
          animation: scroll 30s linear infinite;
        }

        .scroller-inner:hover {
          animation-play-state: paused;
        }

        @keyframes scroll {
          to {
            transform: translateX(-50%);
          }
        }
      `}</style>
    </section>
  );
};
