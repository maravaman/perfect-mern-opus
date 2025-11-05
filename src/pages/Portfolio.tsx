import { Card } from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { ExternalLink } from "lucide-react";
import { useState } from "react";

const portfolioData = {
  websites: [
    { 
      id: 1, 
      title: "Anvika Computers Services", 
      category: "Computer Services", 
      url: "https://anvikacomputersservices.com",
      description: "Professional computer services and IT solutions"
    },
    { 
      id: 2, 
      title: "Sri Academy", 
      category: "Education", 
      url: "https://sriacademy111.com",
      description: "Educational institution providing quality learning"
    },
    { 
      id: 3, 
      title: "Vedha Software Solutions", 
      category: "Software", 
      url: "https://vedhasoftwaresolutions.com",
      description: "Complete software development and IT consulting"
    },
    { 
      id: 4, 
      title: "Dine Empire", 
      category: "Restaurant", 
      url: "https://dineempire.com",
      description: "Fine dining restaurant and culinary experiences"
    },
    { 
      id: 5, 
      title: "Jireh Melodies", 
      category: "Music", 
      url: "https://www.jirehmelodies.com",
      description: "Music production and entertainment services"
    },
    { 
      id: 6, 
      title: "Saduvu Mallesh Mudhiraj", 
      category: "Personal", 
      url: "https://saduvumalleshmudhiraj.com",
      description: "Personal portfolio and professional profile"
    },
    { 
      id: 7, 
      title: "MB Prime Projects", 
      category: "Real Estate", 
      url: "https://mbprimeprojects.com",
      description: "Prime real estate and construction projects"
    },
    { 
      id: 8, 
      title: "Decorative & Return Gifts", 
      category: "E-commerce", 
      url: "https://decorativeandreturngifts.com",
      description: "Unique decorative items and gift solutions"
    },
    { 
      id: 9, 
      title: "Next Gens Store", 
      category: "E-commerce", 
      url: "https://nextgensstore.com",
      description: "Modern online store with latest products"
    },
    { 
      id: 10, 
      title: "New Gen Elevators", 
      category: "Industrial", 
      url: "https://newgenelevators.in",
      description: "Elevator installation and maintenance services"
    },
    { 
      id: 11, 
      title: "Leelavathi Designer", 
      category: "Fashion", 
      url: "https://leelavathidesigner.com",
      description: "Custom fashion design and styling services"
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

  const filterByCategory = (items: any[]) => {
    if (activeCategory === "all") return items;
    return items.filter(item => item.category?.toLowerCase().includes(activeCategory.toLowerCase()));
  };

  return (
    <div className="font-outfit">
      {/* Hero Section */}
      <section className="bg-gradient-to-br from-gray-50 to-white py-20">
        <div className="container mx-auto px-4">
          <div className="max-w-4xl mx-auto text-center space-y-6">
            <h1 className="text-4xl md:text-6xl font-bold font-poppins">
              Our <span className="text-primary">Portfolio</span>
            </h1>
            <p className="text-xl text-muted-foreground">
              Showcasing our best work across web design, branding, and digital marketing
            </p>
          </div>
        </div>
      </section>

      {/* Portfolio Tabs */}
      <section className="py-20 bg-white">
        <div className="container mx-auto px-4">
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
                className={`px-4 py-2 rounded-full transition-colors ${
                  activeCategory === "all" ? "bg-primary text-white" : "bg-gray-100 hover:bg-gray-200"
                }`}
              >
                All
              </button>
              {["Education", "Restaurant", "E-commerce", "Software", "Real Estate", "Fashion"].map((cat) => (
                <button
                  key={cat}
                  onClick={() => setActiveCategory(cat)}
                  className={`px-4 py-2 rounded-full transition-colors ${
                    activeCategory === cat ? "bg-primary text-white" : "bg-gray-100 hover:bg-gray-200"
                  }`}
                >
                  {cat}
                </button>
              ))}
            </div>

            <TabsContent value="websites">
              <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
                {filterByCategory(portfolioData.websites).map((item) => (
                  <a 
                    key={item.id} 
                    href={item.url} 
                    target="_blank" 
                    rel="noopener noreferrer"
                    className="block"
                  >
                    <Card className="overflow-hidden group cursor-pointer hover:shadow-xl transition-all hover:border-primary/50 border-2 h-full">
                      <div className="aspect-video overflow-hidden bg-gradient-to-br from-primary/10 to-primary/5 flex items-center justify-center relative">
                        <div className="text-center p-6">
                          <div className="w-16 h-16 rounded-full bg-primary/20 flex items-center justify-center mx-auto mb-3 group-hover:scale-110 transition-transform">
                            <ExternalLink className="w-8 h-8 text-primary" />
                          </div>
                          <h3 className="font-bold text-lg mb-2">{item.title}</h3>
                          <p className="text-sm text-muted-foreground line-clamp-2">{item.description}</p>
                        </div>
                        <div className="absolute top-3 right-3 bg-primary text-white text-xs px-3 py-1 rounded-full">
                          Live
                        </div>
                      </div>
                      <div className="p-4 border-t">
                        <div className="flex items-center justify-between">
                          <span className="text-sm font-medium text-primary">{item.category}</span>
                          <span className="text-xs text-muted-foreground hover:text-primary transition-colors">
                            Visit Site →
                          </span>
                        </div>
                      </div>
                    </Card>
                  </a>
                ))}
              </div>
            </TabsContent>

            <TabsContent value="logos">
              <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
                {portfolioData.logos.map((item) => (
                  <Card key={item.id} className="overflow-hidden group cursor-pointer hover:shadow-lg transition-shadow">
                    <div className="aspect-square overflow-hidden">
                      <img
                        src={item.image}
                        alt={item.title}
                        className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-300"
                      />
                    </div>
                    <div className="p-4">
                      <h3 className="font-semibold text-lg mb-1">{item.title}</h3>
                      <p className="text-sm text-muted-foreground">{item.category}</p>
                    </div>
                  </Card>
                ))}
              </div>
            </TabsContent>

            <TabsContent value="videos">
              <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
                {portfolioData.videos.map((item) => (
                  <Card key={item.id} className="overflow-hidden group cursor-pointer hover:shadow-lg transition-shadow">
                    <div className="aspect-video overflow-hidden relative">
                      <img
                        src={item.image}
                        alt={item.title}
                        className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-300"
                      />
                      <div className="absolute inset-0 bg-black/40 flex items-center justify-center">
                        <div className="w-16 h-16 rounded-full bg-white flex items-center justify-center">
                          <div className="w-0 h-0 border-l-8 border-t-4 border-b-4 border-l-primary border-t-transparent border-b-transparent ml-1"></div>
                        </div>
                      </div>
                    </div>
                    <div className="p-4">
                      <h3 className="font-semibold text-lg mb-1">{item.title}</h3>
                      <p className="text-sm text-muted-foreground">{item.category}</p>
                    </div>
                  </Card>
                ))}
              </div>
            </TabsContent>

            <TabsContent value="posters">
              <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
                {portfolioData.posters.map((item) => (
                  <Card key={item.id} className="overflow-hidden group cursor-pointer hover:shadow-lg transition-shadow">
                    <div className="aspect-[3/4] overflow-hidden">
                      <img
                        src={item.image}
                        alt={item.title}
                        className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-300"
                      />
                    </div>
                    <div className="p-4">
                      <h3 className="font-semibold text-lg mb-1">{item.title}</h3>
                      <p className="text-sm text-muted-foreground">{item.category}</p>
                    </div>
                  </Card>
                ))}
              </div>
            </TabsContent>

            <TabsContent value="results">
              <div className="grid md:grid-cols-2 gap-6 max-w-4xl mx-auto">
                {portfolioData.results.map((item) => (
                  <Card key={item.id} className="overflow-hidden group cursor-pointer hover:shadow-lg transition-shadow">
                    <div className="aspect-video overflow-hidden relative">
                      <img
                        src={item.image}
                        alt={item.title}
                        className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-300"
                      />
                      <div className="absolute inset-0 bg-gradient-to-t from-black/80 to-transparent flex items-end p-6">
                        <div className="text-white">
                          <p className="text-3xl font-bold">{item.metric}</p>
                        </div>
                      </div>
                    </div>
                    <div className="p-4">
                      <h3 className="font-semibold text-lg">{item.title}</h3>
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
