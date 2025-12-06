import { Card } from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { ExternalLink, Loader2 } from "lucide-react";
import { useState } from "react";
import { useQuery } from "@tanstack/react-query";
import { supabase } from "@/integrations/supabase/client";

import anvikaImg from "@/assets/portfolio/anvika.png";
import sriAcademyImg from "@/assets/portfolio/sri-academy.png";
import vedhaImg from "@/assets/portfolio/vedha.png";
import dineEmpireImg from "@/assets/portfolio/dine-empire.png";
import jirehMelodiesImg from "@/assets/portfolio/jireh-melodies.png";
import mbPrimeImg from "@/assets/portfolio/mb-prime.png";
import nextgenImg from "@/assets/portfolio/nextgen.png";
import newGenElevatorsImg from "@/assets/portfolio/new-gen-elevators.png";
import leelavathiImg from "@/assets/portfolio/leelavathi.png";

// Original portfolio data
const portfolioData = {
  websites: [
    { 
      id: 1, 
      title: "Anvika Computers Services", 
      category: "Computer Services", 
      url: "https://anvikacomputersservices.com",
      description: "Professional computer services and IT solutions",
      image: anvikaImg
    },
    { 
      id: 2, 
      title: "Sri Academy", 
      category: "Education", 
      url: "https://sriacademy111.com",
      description: "Educational institution providing quality learning",
      image: sriAcademyImg
    },
    { 
      id: 3, 
      title: "Vedha Software Solutions", 
      category: "Software", 
      url: "https://vedhasoftwaresolutions.com",
      description: "Complete software development and IT consulting",
      image: vedhaImg
    },
    { 
      id: 4, 
      title: "Dine Empire", 
      category: "Restaurant", 
      url: "https://dineempire.com",
      description: "Fine dining restaurant and culinary experiences",
      image: dineEmpireImg
    },
    { 
      id: 5, 
      title: "Jireh Melodies", 
      category: "Music", 
      url: "https://www.jirehmelodies.com",
      description: "Music production and entertainment services",
      image: jirehMelodiesImg
    },
    { 
      id: 7, 
      title: "MB Prime Projects",
      category: "Real Estate", 
      url: "https://mbprimeprojects.com",
      description: "Prime real estate and construction projects",
      image: mbPrimeImg
    },
    { 
      id: 10, 
      title: "Next Gens Store",
      category: "E-commerce", 
      url: "https://nextgensstore.com",
      description: "Modern online store with latest products",
      image: nextgenImg
    },
    { 
      id: 11, 
      title: "New Gen Elevators",
      category: "Industrial", 
      url: "https://newgenelevators.in",
      description: "Elevator installation and maintenance services",
      image: newGenElevatorsImg
    },
    { 
      id: 8, 
      title: "Leelavathi Designer",
      category: "Fashion", 
      url: "https://leelavathidesigner.com",
      description: "Custom fashion design and styling services",
      image: leelavathiImg
    }
  ],
  logos: [
    { id: 1, title: "Tech Startup Logo", category: "Technology", image: "https://images.unsplash.com/photo-1634942537034-2531766767d1?w=500" },
    { id: 2, title: "Restaurant Branding", category: "Restaurant", image: "https://images.unsplash.com/photo-1635405074683-96d6921a2a68?w=500" },
    { id: 3, title: "Healthcare Logo", category: "Hospital", image: "https://images.unsplash.com/photo-1599305445671-ac291c95aaa9?w=500" },
  ],
  videos: [
    { id: 1, title: "Product Demo Video", category: "Marketing", image: "https://images.unsplash.com/photo-1492619375914-88005aa9e8fb?w=500" },
    { id: 2, title: "Brand Story", category: "Branding", image: "https://images.unsplash.com/photo-1485846234645-a62644f84728?w=500" },
  ],
  posters: [
    { id: 1, title: "Social Media Campaign", category: "Social Media", image: "https://images.unsplash.com/photo-1611162617474-5b21e879e113?w=500" },
    { id: 2, title: "Event Poster", category: "Events", image: "https://images.unsplash.com/photo-1557804506-669a67965ba0?w=500" },
  ],
  results: [
    { id: 1, title: "SEO Growth Report", metric: "+250% Traffic", image: "https://images.unsplash.com/photo-1551288049-bebda4e38f71?w=500" },
    { id: 2, title: "Social Media ROI", metric: "+180% Engagement", image: "https://images.unsplash.com/photo-1460925895917-afdab827c52f?w=500" },
  ],
};

export default function Portfolio() {
  const [activeCategory, setActiveCategory] = useState<string>("all");

  // Fetch additional portfolio items from database
  const { data: dbPortfolioItems, isLoading } = useQuery({
    queryKey: ["portfolio_items_public"],
    queryFn: async () => {
      const { data, error } = await supabase
        .from("portfolio_items")
        .select("*")
        .eq("active", true)
        .order("display_order", { ascending: true });
      if (error) throw error;
      return data;
    },
  });

  // Combine original websites with database items
  const allWebsites = [
    ...portfolioData.websites.map(item => ({
      id: `static-${item.id}`,
      title: item.title,
      category: item.category,
      project_url: item.url,
      description: item.description,
      image_url: item.image,
    })),
    ...(dbPortfolioItems || []).map(item => ({
      id: item.id,
      title: item.title,
      category: item.category,
      project_url: item.project_url,
      description: item.description,
      image_url: item.image_url,
    })),
  ];

  // Get unique categories from all website items
  const categories = [...new Set(allWebsites.map(item => item.category).filter(Boolean))];

  const filterByCategory = (items: any[]) => {
    if (activeCategory === "all") return items;
    return items.filter(item => item.category?.toLowerCase().includes(activeCategory.toLowerCase()));
  };

  return (
    <div className="font-outfit">
      {/* Hero Section */}
      <section className="bg-gradient-hero pattern-dots py-20 relative overflow-hidden">
        <div className="absolute inset-0 bg-gradient-mesh"></div>
        <div className="container mx-auto px-4 relative z-10">
          <div className="max-w-4xl mx-auto text-center space-y-6 animate-fade-in">
            <h1 className="text-4xl md:text-6xl font-bold font-poppins">
              Our <span className="text-gradient">Portfolio</span>
            </h1>
            <p className="text-xl text-muted-foreground">
              Showcasing our best work across web design, branding, and digital marketing
            </p>
          </div>
        </div>
      </section>

      {/* Portfolio Tabs */}
      <section className="py-20 bg-white pattern-grid relative">
        <div className="absolute inset-0 bg-gradient-mesh opacity-30"></div>
        <div className="container mx-auto px-4 relative z-10">
          <Tabs defaultValue="websites" className="w-full">
            <TabsList className="grid w-full max-w-3xl mx-auto grid-cols-5 mb-12">
              <TabsTrigger value="websites">Websites</TabsTrigger>
              <TabsTrigger value="logos">Logos</TabsTrigger>
              <TabsTrigger value="videos">Videos</TabsTrigger>
              <TabsTrigger value="posters">Posters</TabsTrigger>
              <TabsTrigger value="results">Results</TabsTrigger>
            </TabsList>

            {/* Category Filter */}
            <div className="flex flex-wrap gap-2 justify-center mb-8">
              <button
                onClick={() => setActiveCategory("all")}
                className={`px-4 py-2 rounded-full transition-all duration-300 font-medium ${
                  activeCategory === "all" 
                    ? "bg-gradient-to-r from-primary to-secondary text-primary-foreground shadow-lg shadow-primary/25" 
                    : "bg-gradient-to-r from-primary/10 to-secondary/10 hover:from-primary/20 hover:to-secondary/20 text-foreground border border-primary/20"
                }`}
              >
                All
              </button>
              {categories.map((cat) => (
                <button
                  key={cat}
                  onClick={() => setActiveCategory(cat)}
                  className={`px-4 py-2 rounded-full transition-all duration-300 font-medium ${
                    activeCategory === cat 
                      ? "bg-gradient-to-r from-primary to-secondary text-primary-foreground shadow-lg shadow-primary/25" 
                      : "bg-gradient-to-r from-primary/10 to-secondary/10 hover:from-primary/20 hover:to-secondary/20 text-foreground border border-primary/20"
                  }`}
                >
                  {cat}
                </button>
              ))}
            </div>

            <TabsContent value="websites">
              {isLoading ? (
                <div className="flex justify-center py-12">
                  <Loader2 className="w-8 h-8 animate-spin text-primary" />
                </div>
              ) : (
                <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
                  {filterByCategory(allWebsites).map((item) => (
                    <a 
                      key={item.id} 
                      href={item.project_url || "#"} 
                      target="_blank" 
                      rel="noopener noreferrer"
                      className="block"
                    >
                      <Card className="overflow-hidden group cursor-pointer glass-card hover:shadow-card-hover transition-all border-2 border-primary/10 hover:border-primary/30 h-full">
                        <div className="aspect-video overflow-hidden relative bg-gradient-to-br from-primary/5 to-secondary/5">
                          <img 
                            src={item.image_url || "https://images.unsplash.com/photo-1460925895917-afdab827c52f?w=500"} 
                            alt={item.title}
                            className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
                          />
                          <div className="absolute inset-0 bg-gradient-to-t from-primary/80 via-secondary/40 to-transparent opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center">
                            <div className="w-16 h-16 rounded-full bg-white/90 backdrop-blur flex items-center justify-center shadow-lg">
                              <ExternalLink className="w-8 h-8 text-primary" />
                            </div>
                          </div>
                          <div className="absolute top-3 right-3 bg-gradient-to-r from-primary to-secondary text-primary-foreground text-xs px-3 py-1.5 rounded-full font-semibold shadow-lg">
                            Live
                          </div>
                        </div>
                        <div className="p-4 border-t border-primary/10">
                          <h3 className="font-bold text-lg mb-2 group-hover:text-primary transition-colors">{item.title}</h3>
                          <p className="text-sm text-muted-foreground mb-3 line-clamp-2">{item.description}</p>
                          <div className="flex items-center justify-between">
                            <span className="text-sm font-semibold bg-gradient-to-r from-primary/10 to-secondary/10 text-primary px-3 py-1 rounded-full">{item.category}</span>
                            <span className="text-xs text-muted-foreground hover:text-primary transition-colors">
                              Visit Site →
                            </span>
                          </div>
                        </div>
                      </Card>
                    </a>
                  ))}
                </div>
              )}
            </TabsContent>

            <TabsContent value="logos">
              <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
                {portfolioData.logos.map((item) => (
                  <Card key={item.id} className="overflow-hidden group cursor-pointer glass-card hover:shadow-card-hover transition-all border-2 border-primary/10 hover:border-primary/30">
                    <div className="aspect-square overflow-hidden bg-gradient-to-br from-primary/5 to-secondary/5">
                      <img
                        src={item.image}
                        alt={item.title}
                        className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-300"
                      />
                    </div>
                    <div className="p-4 border-t border-primary/10">
                      <h3 className="font-semibold text-lg mb-1 group-hover:text-primary transition-colors">{item.title}</h3>
                      <p className="text-sm text-muted-foreground">{item.category}</p>
                    </div>
                  </Card>
                ))}
              </div>
            </TabsContent>

            <TabsContent value="videos">
              <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
                {portfolioData.videos.map((item) => (
                  <Card key={item.id} className="overflow-hidden group cursor-pointer glass-card hover:shadow-card-hover transition-all border-2 border-primary/10 hover:border-primary/30">
                    <div className="aspect-video overflow-hidden relative bg-gradient-to-br from-primary/5 to-secondary/5">
                      <img
                        src={item.image}
                        alt={item.title}
                        className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-300"
                      />
                      <div className="absolute inset-0 bg-gradient-to-t from-primary/60 to-secondary/40 flex items-center justify-center">
                        <div className="w-16 h-16 rounded-full bg-white/90 backdrop-blur flex items-center justify-center shadow-lg group-hover:scale-110 transition-transform">
                          <div className="w-0 h-0 border-l-8 border-t-4 border-b-4 border-l-primary border-t-transparent border-b-transparent ml-1"></div>
                        </div>
                      </div>
                    </div>
                    <div className="p-4 border-t border-primary/10">
                      <h3 className="font-semibold text-lg mb-1 group-hover:text-primary transition-colors">{item.title}</h3>
                      <p className="text-sm text-muted-foreground">{item.category}</p>
                    </div>
                  </Card>
                ))}
              </div>
            </TabsContent>

            <TabsContent value="posters">
              <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
                {portfolioData.posters.map((item) => (
                  <Card key={item.id} className="overflow-hidden group cursor-pointer glass-card hover:shadow-card-hover transition-all border-2 border-primary/10 hover:border-primary/30">
                    <div className="aspect-[3/4] overflow-hidden bg-gradient-to-br from-primary/5 to-secondary/5">
                      <img
                        src={item.image}
                        alt={item.title}
                        className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-300"
                      />
                    </div>
                    <div className="p-4 border-t border-primary/10">
                      <h3 className="font-semibold text-lg mb-1 group-hover:text-primary transition-colors">{item.title}</h3>
                      <p className="text-sm text-muted-foreground">{item.category}</p>
                    </div>
                  </Card>
                ))}
              </div>
            </TabsContent>

            <TabsContent value="results">
              <div className="grid md:grid-cols-2 gap-6 max-w-4xl mx-auto">
                {portfolioData.results.map((item) => (
                  <Card key={item.id} className="overflow-hidden group cursor-pointer glass-card hover:shadow-card-hover transition-all border-2 border-primary/10 hover:border-primary/30">
                    <div className="aspect-video overflow-hidden relative bg-gradient-to-br from-primary/5 to-secondary/5">
                      <img
                        src={item.image}
                        alt={item.title}
                        className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-300"
                      />
                      <div className="absolute inset-0 bg-gradient-to-t from-primary/90 via-secondary/60 to-transparent flex items-end p-6">
                        <div className="text-primary-foreground">
                          <p className="text-3xl font-bold drop-shadow-lg">{item.metric}</p>
                        </div>
                      </div>
                    </div>
                    <div className="p-4 border-t border-primary/10">
                      <h3 className="font-semibold text-lg group-hover:text-primary transition-colors">{item.title}</h3>
                    </div>
                  </Card>
                ))}
              </div>
            </TabsContent>
          </Tabs>
        </div>
      </section>
    </div>
  );
}