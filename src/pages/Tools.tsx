import { useEffect, useState } from "react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Bot, Sparkles, Zap, MessageSquare, Image, Code, Loader2 } from "lucide-react";
import { supabase } from "@/integrations/supabase/client";
import { toast } from "sonner";

const iconMap: Record<string, any> = {
  Bot,
  Sparkles,
  Zap,
  MessageSquare,
  Image,
  Code
};

const Tools = () => {
  const [tools, setTools] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);

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

  if (loading) {
    return (
      <div className="min-h-screen bg-gradient-to-b from-background to-secondary/20 flex items-center justify-center">
        <Loader2 className="w-8 h-8 animate-spin" />
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-b from-background to-secondary/20">
      {/* Hero Section */}
      <section className="py-20 px-4">
        <div className="container mx-auto text-center">
          <h1 className="text-4xl md:text-5xl font-bold mb-6">
            AI <span className="text-primary">Tools</span> & Solutions
          </h1>
          <p className="text-xl text-muted-foreground max-w-2xl mx-auto">
            Leverage cutting-edge AI technology to transform your business with intelligent automation
          </p>
        </div>
      </section>

      {/* Tools Grid */}
      <section className="py-12 px-4">
        <div className="container mx-auto max-w-6xl">
          <div className="space-y-16">
            {tools.map((tool) => {
              const IconComponent = iconMap[tool.icon] || Bot;
              const capabilities = Array.isArray(tool.capabilities) ? tool.capabilities : [];

              return (
              <div key={tool.id} className="relative">
                <Card className="overflow-hidden">
                  {/* Gradient Header */}
                  <div className={`h-2 bg-gradient-to-r from-${tool.color_from} to-${tool.color_to}`} />

                  <div className="grid md:grid-cols-5 gap-8 p-8">
                    {/* Left - Tool Info */}
                    <div className="md:col-span-2 space-y-6">
                      <div className="flex items-start gap-4">
                        <div className={`p-4 rounded-lg bg-gradient-to-br from-${tool.color_from} to-${tool.color_to} text-white`}>
                          <IconComponent className="w-8 h-8" />
                        </div>
                        <div>
                          <h2 className="text-3xl font-bold mb-2">{tool.name}</h2>
                          <p className="text-muted-foreground">{tool.description}</p>
                        </div>
                      </div>

                      <div>
                        <h3 className="font-semibold mb-3 text-lg">Key Capabilities</h3>
                        <div className="grid grid-cols-2 gap-3">
                          {capabilities.map((cap: any, idx: number) => {
                            const CapIcon = iconMap[cap.icon] || Bot;
                            return (
                              <div key={idx} className="flex flex-col items-center gap-2 p-4 bg-secondary/50 rounded-lg text-center">
                                <CapIcon className="w-6 h-6 text-primary" />
                                <span className="text-sm font-semibold text-foreground leading-tight">{cap.text}</span>
                              </div>
                            );
                          })}
                        </div>
                      </div>

                      <Button className="w-full" size="lg">
                        Get Started with {tool.name}
                      </Button>
                    </div>

                    {/* Right - Features & Use Cases */}
                    <div className="md:col-span-3 space-y-6">
                      <div>
                        <h3 className="text-xl font-semibold mb-4">Features</h3>
                        <ul className="space-y-2">
                          {tool.features?.map((feature: string, idx: number) => (
                            <li key={idx} className="flex items-start gap-3">
                              <span className="text-primary mt-1">✓</span>
                              <span>{feature}</span>
                            </li>
                          ))}
                        </ul>
                      </div>

                      <div>
                        <h3 className="text-xl font-semibold mb-4">Use Cases</h3>
                        <div className="grid md:grid-cols-2 gap-3">
                          {tool.use_cases?.map((useCase: string, idx: number) => (
                            <div key={idx} className="flex items-center gap-2 p-3 bg-primary/5 rounded-lg">
                              <span className="text-primary">→</span>
                              <span className="text-sm">{useCase}</span>
                            </div>
                          ))}
                        </div>
                      </div>
                    </div>
                  </div>
                </Card>
              </div>
              );
            })}
          </div>
        </div>
      </section>

      {/* Integration CTA */}
      <section className="py-16 px-4">
        <div className="container mx-auto max-w-4xl">
          <Card className="bg-gradient-to-r from-primary to-primary/80 text-primary-foreground p-8 text-center">
            <h2 className="text-3xl font-bold mb-4">Ready to Integrate AI into Your Business?</h2>
            <p className="text-lg mb-6 opacity-90">
              Let us help you implement these powerful AI tools to automate and enhance your operations
            </p>
            <Button variant="secondary" size="lg">
              Schedule a Consultation
            </Button>
          </Card>
        </div>
      </section>
    </div>
  );
};

export default Tools;
