import { useEffect, useRef } from "react";
import anvikaLogo from "@/assets/clients/anvika.png";
import sriAcademyLogo from "@/assets/clients/sri-academy.png";
import vedhaLogo from "@/assets/clients/vedha.png";
import dineEmpireLogo from "@/assets/clients/dine-empire.png";
import jirehMelodiesLogo from "@/assets/clients/jireh-melodies.png";
import mbPrimeLogo from "@/assets/clients/mb-prime.png";
import nextgenLogo from "@/assets/clients/nextgen.png";
import newGenElevatorsLogo from "@/assets/clients/new-gen-elevators.png";
import leelavathiLogo from "@/assets/clients/leelavathi.png";

const clients = [
  { name: "Anvika Computers", logo: anvikaLogo },
  { name: "Sri Academy", logo: sriAcademyLogo },
  { name: "Vedha Software", logo: vedhaLogo },
  { name: "Dine Empire", logo: dineEmpireLogo },
  { name: "Jireh Melodies", logo: jirehMelodiesLogo },
  { name: "MB Prime Projects", logo: mbPrimeLogo },
  { name: "Next Gens Store", logo: nextgenLogo },
  { name: "New Gen Elevators", logo: newGenElevatorsLogo },
  { name: "Leelavathi Designer", logo: leelavathiLogo },
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
                  className="max-h-16 max-w-full object-contain transition-all hover:scale-110"
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
