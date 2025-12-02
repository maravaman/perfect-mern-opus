import { useEffect, useState } from "react";
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { 
  Loader2, Wrench, ExternalLink, Search, Palette, Image, 
  FileText, Code, TrendingUp, BarChart, Settings, Zap,
  Bot, Sparkles, MessageSquare, Globe
} from "lucide-react";
import { supabase } from "@/integrations/supabase/client";
import { toast } from "sonner";

interface Tool {
  id: string;
  title: string;
  description: string | null;
  icon: string | null;
  url: string | null;
  category: string | null;
  active: boolean | null;
  display_order: number | null;
}

const iconMap: Record<string, any> = {
  Search,
  Palette,
  Image,
  FileText,
  Code,
  TrendingUp,
  BarChart,
  Settings,
  Zap,
  Bot,
  Sparkles,
  MessageSquare,
  Globe,
  Wrench
};

const categoryColors: Record<string, { bg: string; text: string; border: string }> = {
  "SEO Tools": { bg: "bg-green-50", text: "text-green-700", border: "border-green-200" },
  "Design Tools": { bg: "bg-purple-50", text: "text-purple-700", border: "border-purple-200" },
  "Optimization": { bg: "bg-blue-50", text: "text-blue-700", border: "border-blue-200" },
  "Analytics": { bg: "bg-orange-50", text: "text-orange-700", border: "border-orange-200" },
  "Development": { bg: "bg-pink-50", text: "text-pink-700", border: "border-pink-200" },
  "default": { bg: "bg-gray-50", text: "text-gray-700", border: "border-gray-200" }
};

const Tools = () => {
  const [tools, setTools] = useState<Tool[]>([]);
  const [loading, setLoading] = useState(true);
  const [selectedCategory, setSelectedCategory] = useState<string>("all");

  useEffect(() => {
    fetchTools();

    const channel = supabase
      .channel('tools-changes')
      .on('postgres_changes', { event: '*', schema: 'public', table: 'tools' }, () => {
        fetchTools();
      })
      .subscribe();

    return () => {
      supabase.removeChannel(channel);
    };
  }, []);

  const fetchTools = async () => {
    try {
      const { data, error } = await supabase
        .from('tools')
        .select('*')
        .eq('active', true)
        .order('display_order', { ascending: true });

      if (error) throw error;
      setTools(data || []);
    } catch (error) {
      console.error('Error fetching tools:', error);
      toast.error('Failed to load tools');
    } finally {
      setLoading(false);
    }
  };

  const categories = ["all", ...Array.from(new Set(tools.map(t => t.category).filter(Boolean)))];
  const filteredTools = selectedCategory === "all" 
    ? tools 
    : tools.filter(t => t.category === selectedCategory);

  if (loading) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-slate-50 via-blue-50/30 to-pink-50/20 flex items-center justify-center">
        <Loader2 className="w-8 h-8 animate-spin text-primary" />
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 via-blue-50/30 to-pink-50/20">
      {/* Hero Section */}
      <section className="py-16 md:py-24 px-4">
        <div className="container mx-auto text-center">
          <div className="inline-flex items-center gap-2 px-4 py-2 bg-primary/10 rounded-full mb-6">
            <Wrench className="w-4 h-4 text-primary" />
            <span className="text-sm font-medium text-primary">Free Digital Tools</span>
          </div>
          <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold mb-6 font-poppins text-gray-900">
            Useful <span className="text-primary">Tools</span> & Resources
          </h1>
          <p className="text-lg md:text-xl text-muted-foreground max-w-2xl mx-auto font-outfit">
            Access our collection of free tools to help grow your digital presence
          </p>
        </div>
      </section>

      {/* Category Filter */}
      {categories.length > 2 && (
        <section className="px-4 pb-8">
          <div className="container mx-auto max-w-6xl">
            <div className="flex flex-wrap justify-center gap-3">
              {categories.map((category) => (
                <Button
                  key={category}
                  variant={selectedCategory === category ? "default" : "outline"}
                  size="sm"
                  onClick={() => setSelectedCategory(category)}
                  className="capitalize"
                >
                  {category === "all" ? "All Tools" : category}
                </Button>
              ))}
            </div>
          </div>
        </section>
      )}

      {/* Tools Grid */}
      <section className="py-12 px-4 pb-24">
        <div className="container mx-auto max-w-6xl">
          {filteredTools.length === 0 ? (
            <Card className="p-12 text-center">
              <Wrench className="w-16 h-16 text-muted-foreground/50 mx-auto mb-4" />
              <h3 className="text-xl font-semibold text-muted-foreground">No tools available yet</h3>
              <p className="text-muted-foreground mt-2">Check back soon for useful tools!</p>
            </Card>
          ) : (
            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
              {filteredTools.map((tool) => {
                const IconComponent = iconMap[tool.icon || ""] || Wrench;
                const colorScheme = categoryColors[tool.category || ""] || categoryColors.default;

                return (
                  <Card 
                    key={tool.id} 
                    className="group hover:shadow-xl transition-all duration-300 border bg-white overflow-hidden"
                  >
                    <div className="p-6">
                      {/* Icon & Category */}
                      <div className="flex items-start justify-between mb-4">
                        <div className={`w-14 h-14 rounded-xl ${colorScheme.bg} flex items-center justify-center group-hover:scale-110 transition-transform duration-300`}>
                          <IconComponent className={`w-7 h-7 ${colorScheme.text}`} />
                        </div>
                        {tool.category && (
                          <span className={`text-xs font-medium px-2.5 py-1 rounded-full ${colorScheme.bg} ${colorScheme.text}`}>
                            {tool.category}
                          </span>
                        )}
                      </div>

                      {/* Title */}
                      <h3 className="text-lg font-bold mb-2 font-poppins text-gray-900 group-hover:text-primary transition-colors">
                        {tool.title}
                      </h3>

                      {/* Description */}
                      {tool.description && (
                        <p className="text-muted-foreground text-sm mb-6 line-clamp-3 font-outfit">
                          {tool.description}
                        </p>
                      )}

                      {/* Action Button */}
                      {tool.url ? (
                        <a href={tool.url} target="_blank" rel="noopener noreferrer" className="block">
                          <Button className="w-full gap-2 bg-primary hover:bg-primary/90">
                            <span>Open Tool</span>
                            <ExternalLink className="w-4 h-4" />
                          </Button>
                        </a>
                      ) : (
                        <Button className="w-full" variant="secondary">
                          Coming Soon
                        </Button>
                      )}
                    </div>
                  </Card>
                );
              })}
            </div>
          )}
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-16 px-4 bg-gradient-to-r from-primary to-pink-500">
        <div className="container mx-auto text-center">
          <h2 className="text-3xl md:text-4xl font-bold mb-4 font-poppins text-white">
            Need a Custom Tool for Your Business?
          </h2>
          <p className="text-lg mb-8 text-white/90 font-outfit max-w-2xl mx-auto">
            We can build custom digital solutions tailored to your specific needs
          </p>
          <Button size="lg" variant="secondary" className="font-semibold">
            Contact Us
          </Button>
        </div>
      </section>
    </div>
  );
};

export default Tools;