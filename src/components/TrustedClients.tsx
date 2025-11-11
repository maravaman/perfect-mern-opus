import { useEffect, useRef } from "react";

const clients = [
  { name: "Anvika Computers", logo: "https://anvikacomputersservices.com/wp-content/uploads/2024/11/cropped-ANVIKA-LOGO-1-removebg-preview.png" },
  { name: "Sri Academy", logo: "https://sriacademy111.com/wp-content/uploads/2024/06/cropped-srii-academy-1.png" },
  { name: "Vedha Software", logo: "https://vedhasoftwaresolutions.com/wp-content/uploads/2024/11/vedha-software-solutions-logo.png" },
  { name: "Dine Empire", logo: "https://dineempire.com/wp-content/uploads/2024/12/Dine-Empire-Logo-1.png" },
  { name: "MB Prime Projects", logo: "https://mbprimeprojects.com/wp-content/uploads/2024/11/cropped-MB-Prime-Projects-1.png" },
  { name: "New Gen Elevators", logo: "https://newgenelevators.in/wp-content/uploads/2024/10/new-gen-elevator-logo.png" },
];

export const TrustedClients = () => {
  const scrollerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const scroller = scrollerRef.current;
    if (!scroller) return;

    // Duplicate items for seamless loop
    const scrollerInner = scroller.querySelector(".scroller-inner");
    if (scrollerInner) {
      const scrollerContent = Array.from(scrollerInner.children);
      scrollerContent.forEach((item) => {
        const duplicatedItem = item.cloneNode(true);
        scrollerInner.appendChild(duplicatedItem);
      });
    }
  }, []);

  return (
    <section className="py-16 bg-white overflow-hidden">
      <div className="container mx-auto px-4">
        <h2 className="text-3xl md:text-4xl font-bold text-center mb-12 font-poppins">
          Our <span className="text-primary">Trusted Clients</span>
        </h2>
        
        <div ref={scrollerRef} className="scroller" data-animated="true">
          <div className="scroller-inner flex gap-8 animate-scroll">
            {clients.map((client, index) => (
              <div
                key={index}
                className="flex items-center justify-center min-w-[200px] h-24 px-8 bg-white rounded-lg shadow-md hover:shadow-lg transition-shadow"
              >
                <img
                  src={client.logo}
                  alt={client.name}
                  className="max-h-16 max-w-full object-contain grayscale hover:grayscale-0 transition-all"
                  loading="lazy"
                />
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
