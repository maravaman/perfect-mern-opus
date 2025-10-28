import { Card } from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { useState } from "react";

const portfolioData = {
  websites: [
    { id: 1, title: "E-Commerce Platform", category: "E-commerce", image: "https://images.unsplash.com/photo-1460925895917-afdab827c52f?w=500" },
    { id: 2, title: "Restaurant Website", category: "Restaurant", image: "https://images.unsplash.com/photo-1517248135467-4c7edcad34c4?w=500" },
    { id: 3, title: "Hospital Portal", category: "Hospital", image: "https://images.unsplash.com/photo-1519494026892-80bbd2d6fd0d?w=500" },
    { id: 4, title: "School Management", category: "School", image: "https://images.unsplash.com/photo-1523050854058-8df90110c9f1?w=500" },
    { id: 5, title: "College Website", category: "College", image: "https://images.unsplash.com/photo-1541339907198-e08756dedf3f?w=500" },
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
              {["School", "Restaurant", "College", "Hospital"].map((cat) => (
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
                  <Card key={item.id} className="overflow-hidden group cursor-pointer hover:shadow-lg transition-shadow">
                    <div className="aspect-video overflow-hidden">
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
