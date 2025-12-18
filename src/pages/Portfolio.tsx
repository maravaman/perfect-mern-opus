import { Card } from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { ExternalLink, Loader2, Play } from "lucide-react";
import { useState } from "react";
import { useQuery } from "@tanstack/react-query";
import { supabase } from "@/integrations/supabase/client";

// Helper to extract YouTube video ID
const getYouTubeId = (url: string): string | null => {
  if (!url) return null;
  const regExp = /^.*(youtu.be\/|v\/|u\/\w\/|embed\/|watch\?v=|&v=)([^#&?]*).*/;
  const match = url.match(regExp);
  return match && match[2].length === 11 ? match[2] : null;
};

// Helper to check if URL is a direct video file
const isDirectVideo = (url: string): boolean => {
  if (!url) return false;
  return /\.(mp4|webm|ogg|mov)$/i.test(url);
};

// Shared sub-categories (same as admin panel)
const SHARED_SUB_CATEGORIES = [
  'E-commerce', 'Education', 'Restaurant', 'Real Estate', 'Healthcare', 
  'Fashion', 'Technology', 'Corporate', 'Portfolio', 'Entertainment',
  'Finance', 'Travel', 'Sports', 'Food & Beverage', 'Automotive', 'Other'
];

import anvikaImg from "@/assets/portfolio/anvika.png";
import sriAcademyImg from "@/assets/portfolio/sri-academy.png";
import vedhaImg from "@/assets/portfolio/vedha.png";
import dineEmpireImg from "@/assets/portfolio/dine-empire.png";
import jirehMelodiesImg from "@/assets/portfolio/jireh-melodies.png";
import mbPrimeImg from "@/assets/portfolio/mb-prime.png";
import nextgenImg from "@/assets/portfolio/nextgen.png";
import newGenElevatorsImg from "@/assets/portfolio/new-gen-elevators.png";
import leelavathiImg from "@/assets/portfolio/leelavathi.png";

// Static portfolio data for websites (with matching sub-categories)
const staticWebsites = [
  { 
    id: 1, 
    title: "Anvika Computers Services", 
    sub_category: "Technology", 
    url: "https://anvikacomputersservices.com",
    description: "Professional computer services and IT solutions",
    image: anvikaImg
  },
  { 
    id: 2, 
    title: "Sri Academy", 
    sub_category: "Education", 
    url: "https://sriacademy111.com",
    description: "Educational institution providing quality learning",
    image: sriAcademyImg
  },
  { 
    id: 3, 
    title: "Vedha Software Solutions", 
    sub_category: "Technology", 
    url: "https://vedhasoftwaresolutions.com",
    description: "Complete software development and IT consulting",
    image: vedhaImg
  },
  { 
    id: 4, 
    title: "Dine Empire", 
    sub_category: "Restaurant", 
    url: "https://dineempire.com",
    description: "Fine dining restaurant and culinary experiences",
    image: dineEmpireImg
  },
  { 
    id: 5, 
    title: "Jireh Melodies", 
    sub_category: "Entertainment", 
    url: "https://www.jirehmelodies.com",
    description: "Music production and entertainment services",
    image: jirehMelodiesImg
  },
  { 
    id: 7, 
    title: "MB Prime Projects",
    sub_category: "Real Estate", 
    url: "https://mbprimeprojects.com",
    description: "Prime real estate and construction projects",
    image: mbPrimeImg
  },
  { 
    id: 10, 
    title: "Next Gens Store",
    sub_category: "E-commerce", 
    url: "https://nextgensstore.com",
    description: "Modern online store with latest products",
    image: nextgenImg
  },
  { 
    id: 11, 
    title: "New Gen Elevators",
    sub_category: "Corporate", 
    url: "https://newgenelevators.in",
    description: "Elevator installation and maintenance services",
    image: newGenElevatorsImg
  },
  { 
    id: 8, 
    title: "Leelavathi Designer",
    sub_category: "Fashion", 
    url: "https://leelavathidesigner.com",
    description: "Custom fashion design and styling services",
    image: leelavathiImg
  }
];

export default function Portfolio() {
  const [activeTab, setActiveTab] = useState<string>("websites");
  const [activeCategory, setActiveCategory] = useState<string>("all");

  // Fetch portfolio items from database
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

  // Filter database items by portfolio type
  const getDbItemsByType = (type: string) => {
    return (dbPortfolioItems || []).filter(item => 
      item.category?.toLowerCase() === type.toLowerCase()
    );
  };

  // Combine static websites with database website items
  const allWebsites = [
    ...staticWebsites.map(item => ({
      id: `static-${item.id}`,
      title: item.title,
      category: 'Websites',
      project_url: item.url,
      description: item.description,
      image_url: item.image,
      sub_category: item.sub_category,
    })),
    ...getDbItemsByType('Websites').map(item => ({
      id: item.id,
      title: item.title,
      category: 'Websites',
      project_url: item.project_url,
      description: item.description,
      image_url: item.image_url,
      sub_category: item.sub_category || 'Other',
    })),
  ];

  const allLogos = getDbItemsByType('Logos');
  const allVideos = getDbItemsByType('Videos');
  const allPosters = getDbItemsByType('Posters');
  const allResults = getDbItemsByType('Results');

  // Show all sub-categories for filtering (same as admin panel)
  const categories = SHARED_SUB_CATEGORIES;

  // Reset category filter when tab changes
  const handleTabChange = (value: string) => {
    setActiveTab(value);
    setActiveCategory("all");
  };

  const filterByCategory = (items: any[]) => {
    if (activeCategory === "all") return items;
    return items.filter(item => item.sub_category === activeCategory);
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
          <Tabs value={activeTab} onValueChange={handleTabChange} className="w-full">
            <TabsList className="grid w-full max-w-3xl mx-auto grid-cols-5 mb-12">
              <TabsTrigger value="websites">Websites</TabsTrigger>
              <TabsTrigger value="logos">Logos</TabsTrigger>
              <TabsTrigger value="videos">Videos</TabsTrigger>
              <TabsTrigger value="posters">Posters</TabsTrigger>
              <TabsTrigger value="results">Results</TabsTrigger>
            </TabsList>

            {/* Category Filter - Dynamic based on active tab */}
            {categories.length > 0 && (
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
            )}

            <TabsContent value="websites">
              {isLoading ? (
                <div className="flex justify-center py-12">
                  <Loader2 className="w-8 h-8 animate-spin text-primary" />
                </div>
              ) : (
                <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
                  {filterByCategory(allWebsites).map((item) => {
                    const hasValidUrl = item.project_url && item.project_url.startsWith('http');
                    const CardContent = (
                      <Card className="overflow-hidden group cursor-pointer glass-card hover:shadow-card-hover transition-all border-2 border-primary/10 hover:border-primary/30 h-full">
                        <div className="aspect-video overflow-hidden relative bg-gradient-to-br from-primary/5 to-secondary/5">
                          <img 
                            src={item.image_url || "https://images.unsplash.com/photo-1460925895917-afdab827c52f?w=500"} 
                            alt={item.title}
                            className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
                          />
                          {hasValidUrl && (
                            <div className="absolute inset-0 bg-gradient-to-t from-primary/80 via-secondary/40 to-transparent opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center">
                              <div className="w-16 h-16 rounded-full bg-white/90 backdrop-blur flex items-center justify-center shadow-lg">
                                <ExternalLink className="w-8 h-8 text-primary" />
                              </div>
                            </div>
                          )}
                          {hasValidUrl && (
                            <div className="absolute top-3 right-3 bg-gradient-to-r from-primary to-secondary text-primary-foreground text-xs px-3 py-1.5 rounded-full font-semibold shadow-lg">
                              Live
                            </div>
                          )}
                        </div>
                        <div className="p-4 border-t border-primary/10">
                          <h3 className="font-bold text-lg mb-2 group-hover:text-primary transition-colors">{item.title}</h3>
                          <p className="text-sm text-muted-foreground mb-3 line-clamp-2">{item.description}</p>
                          <div className="flex items-center justify-between">
                            <span className="text-sm font-semibold bg-gradient-to-r from-primary/10 to-secondary/10 text-primary px-3 py-1 rounded-full">{item.sub_category}</span>
                            {hasValidUrl && (
                              <span className="text-xs text-muted-foreground hover:text-primary transition-colors">
                                Visit Site →
                              </span>
                            )}
                          </div>
                        </div>
                      </Card>
                    );

                    return hasValidUrl ? (
                      <a 
                        key={item.id} 
                        href={item.project_url} 
                        target="_blank" 
                        rel="noopener noreferrer"
                        className="block"
                      >
                        {CardContent}
                      </a>
                    ) : (
                      <div key={item.id} className="block">
                        {CardContent}
                      </div>
                    );
                  })}
                </div>
              )}
              {!isLoading && filterByCategory(allWebsites).length === 0 && (
                <div className="text-center py-12 text-muted-foreground">
                  No websites found in this category.
                </div>
              )}
            </TabsContent>

            <TabsContent value="logos">
              {isLoading ? (
                <div className="flex justify-center py-12">
                  <Loader2 className="w-8 h-8 animate-spin text-primary" />
                </div>
              ) : (
                <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
                  {filterByCategory(allLogos).map((item) => (
                    <Card key={item.id} className="overflow-hidden group cursor-pointer glass-card hover:shadow-card-hover transition-all border-2 border-primary/10 hover:border-primary/30">
                      <div className="aspect-square overflow-hidden bg-gradient-to-br from-primary/5 to-secondary/5">
                        <img
                          src={item.image_url || "https://images.unsplash.com/photo-1634942537034-2531766767d1?w=500"}
                          alt={item.title}
                          className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-300"
                        />
                      </div>
                      <div className="p-4 border-t border-primary/10">
                        <h3 className="font-semibold text-lg mb-1 group-hover:text-primary transition-colors">{item.title}</h3>
                        <p className="text-sm text-muted-foreground">{item.sub_category || item.client_name || item.description}</p>
                      </div>
                    </Card>
                  ))}
                </div>
              )}
              {!isLoading && filterByCategory(allLogos).length === 0 && (
                <div className="text-center py-12 text-muted-foreground">
                  No logos found. Add logos from the admin panel.
                </div>
              )}
            </TabsContent>

            <TabsContent value="videos">
              {isLoading ? (
                <div className="flex justify-center py-12">
                  <Loader2 className="w-8 h-8 animate-spin text-primary" />
                </div>
              ) : (
                <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
                  {filterByCategory(allVideos).map((item) => {
                    const youtubeId = getYouTubeId(item.project_url || '');
                    const isDirectVid = isDirectVideo(item.project_url || '');
                    
                    return (
                      <Card key={item.id} className="overflow-hidden glass-card hover:shadow-card-hover transition-all border-2 border-primary/10 hover:border-primary/30">
                        <div className="aspect-video overflow-hidden relative bg-gradient-to-br from-primary/5 to-secondary/5">
                          {youtubeId ? (
                            // YouTube embed
                            <iframe
                              src={`https://www.youtube.com/embed/${youtubeId}?autoplay=0&rel=0`}
                              title={item.title}
                              className="w-full h-full"
                              allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                              allowFullScreen
                            />
                          ) : isDirectVid ? (
                            // Direct video file
                            <video
                              src={item.project_url}
                              controls
                              className="w-full h-full object-cover"
                              poster={item.image_url || undefined}
                            >
                              Your browser does not support the video tag.
                            </video>
                          ) : (
                            // Fallback: thumbnail with play button linking to URL
                            <a 
                              href={item.project_url || "#"} 
                              target="_blank" 
                              rel="noopener noreferrer"
                              className="block w-full h-full"
                            >
                              <img
                                src={item.image_url || "https://images.unsplash.com/photo-1492619375914-88005aa9e8fb?w=500"}
                                alt={item.title}
                                className="w-full h-full object-cover"
                              />
                              <div className="absolute inset-0 bg-gradient-to-t from-primary/60 to-secondary/40 flex items-center justify-center hover:bg-primary/40 transition-colors">
                                <div className="w-16 h-16 rounded-full bg-white/90 backdrop-blur flex items-center justify-center shadow-lg hover:scale-110 transition-transform">
                                  <Play className="w-8 h-8 text-primary ml-1" />
                                </div>
                              </div>
                            </a>
                          )}
                        </div>
                        <div className="p-4 border-t border-primary/10">
                          <h3 className="font-semibold text-lg mb-1">{item.title}</h3>
                          <p className="text-sm text-muted-foreground">{item.sub_category || item.client_name || item.description}</p>
                        </div>
                      </Card>
                    );
                  })}
                </div>
              )}
              {!isLoading && filterByCategory(allVideos).length === 0 && (
                <div className="text-center py-12 text-muted-foreground">
                  No videos found. Add videos from the admin panel.
                </div>
              )}
            </TabsContent>

            <TabsContent value="posters">
              {isLoading ? (
                <div className="flex justify-center py-12">
                  <Loader2 className="w-8 h-8 animate-spin text-primary" />
                </div>
              ) : (
                <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
                  {filterByCategory(allPosters).map((item) => (
                    <Card key={item.id} className="overflow-hidden group cursor-pointer glass-card hover:shadow-card-hover transition-all border-2 border-primary/10 hover:border-primary/30">
                      <div className="aspect-[3/4] overflow-hidden bg-gradient-to-br from-primary/5 to-secondary/5">
                        <img
                          src={item.image_url || "https://images.unsplash.com/photo-1611162617474-5b21e879e113?w=500"}
                          alt={item.title}
                          className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-300"
                        />
                      </div>
                      <div className="p-4 border-t border-primary/10">
                        <h3 className="font-semibold text-lg mb-1 group-hover:text-primary transition-colors">{item.title}</h3>
                        <p className="text-sm text-muted-foreground">{item.sub_category || item.client_name || item.description}</p>
                      </div>
                    </Card>
                  ))}
                </div>
              )}
              {!isLoading && filterByCategory(allPosters).length === 0 && (
                <div className="text-center py-12 text-muted-foreground">
                  No posters found. Add posters from the admin panel.
                </div>
              )}
            </TabsContent>

            <TabsContent value="results">
              {isLoading ? (
                <div className="flex justify-center py-12">
                  <Loader2 className="w-8 h-8 animate-spin text-primary" />
                </div>
              ) : (
                <div className="grid md:grid-cols-2 gap-6 max-w-4xl mx-auto">
                  {filterByCategory(allResults).map((item) => (
                    <Card key={item.id} className="overflow-hidden group cursor-pointer glass-card hover:shadow-card-hover transition-all border-2 border-primary/10 hover:border-primary/30">
                      <div className="aspect-video overflow-hidden relative bg-gradient-to-br from-primary/5 to-secondary/5">
                        <img
                          src={item.image_url || "https://images.unsplash.com/photo-1551288049-bebda4e38f71?w=500"}
                          alt={item.title}
                          className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-300"
                        />
                        <div className="absolute inset-0 bg-gradient-to-t from-primary/90 via-secondary/60 to-transparent flex items-end p-6">
                          <div className="text-primary-foreground">
                            <p className="text-3xl font-bold drop-shadow-lg">{item.description || 'View Results'}</p>
                          </div>
                        </div>
                      </div>
                      <div className="p-4 border-t border-primary/10">
                        <h3 className="font-semibold text-lg group-hover:text-primary transition-colors">{item.title}</h3>
                        <p className="text-sm text-muted-foreground">{item.sub_category || item.client_name}</p>
                      </div>
                    </Card>
                  ))}
                </div>
              )}
              {!isLoading && filterByCategory(allResults).length === 0 && (
                <div className="text-center py-12 text-muted-foreground">
                  No results found. Add results from the admin panel.
                </div>
              )}
            </TabsContent>
          </Tabs>
        </div>
      </section>
    </div>
  );
}