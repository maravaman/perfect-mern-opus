import { useState, useEffect } from "react";
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from "@/components/ui/accordion";
import { ArrowRight, Globe, Search, Megaphone, Share2, FileText, Smartphone, Code, TrendingUp, CheckCircle2, Loader2, Palette, ShoppingCart, Database, Video } from "lucide-react";
import { Link, useSearchParams } from "react-router-dom";
import { supabase } from "@/integrations/supabase/client";

const serviceIcons: { [key: string]: any } = {
  "Code": Code,
  "TrendingUp": TrendingUp,
  "FileText": FileText,
  "Smartphone": Smartphone,
  "Globe": Globe,
  "Search": Search,
  "Megaphone": Megaphone,
  "Share2": Share2,
  "Palette": Palette,
  "ShoppingCart": ShoppingCart,
  "Database": Database,
  "Video": Video,
};

interface Service {
  id: string;
  number: string | null;
  title: string;
  description: string | null;
  icon: string | null;
  category: string | null;
  active: boolean | null;
  display_order: number | null;
}

export default function Knight21Services() {
  const [searchParams] = useSearchParams();
  const categoryFilter = searchParams.get('category');
  const [services, setServices] = useState<Service[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchServices();

    const channel = supabase
      .channel('services-changes')
      .on('postgres_changes', { event: '*', schema: 'public', table: 'services' }, () => {
        fetchServices();
      })
      .subscribe();

    return () => {
      supabase.removeChannel(channel);
    };
  }, []);

  const fetchServices = async () => {
    try {
      const { data, error } = await supabase
        .from('services')
        .select('*')
        .eq('active', true)
        .order('display_order', { ascending: true });

      if (error) throw error;
      setServices(data || []);
    } catch (error) {
      console.error('Error fetching services:', error);
    } finally {
      setLoading(false);
    }
  };

  // Group services by category
  const groupedServices = services.reduce((acc, service) => {
    const category = service.category || 'Other';
    if (!acc[category]) {
      acc[category] = [];
    }
    acc[category].push(service);
    return acc;
  }, {} as { [key: string]: Service[] });

  const categories = Object.keys(groupedServices);

  const filteredServices = categoryFilter
    ? services.filter(s => s.category === categoryFilter)
    : services;

  const filteredCategories = categoryFilter
    ? categories.filter(c => c === categoryFilter)
    : categories;

  if (loading) {
    return (
      <div className="font-outfit min-h-screen flex items-center justify-center">
        <Loader2 className="w-8 h-8 animate-spin text-primary" />
      </div>
    );
  }

  return (
    <div className="font-outfit">
      {/* Hero Section */}
      <section className="bg-gradient-hero pattern-dots py-20 relative overflow-hidden">
        <div className="absolute inset-0 bg-gradient-mesh"></div>
        <div className="container mx-auto px-4 relative z-10">
          <div className="max-w-4xl mx-auto text-center space-y-6 animate-fade-in">
            <h1 className="text-4xl md:text-6xl font-bold font-poppins">
              Our <span className="text-gradient">Services</span>
            </h1>
            <p className="text-xl text-muted-foreground">
              Comprehensive digital solutions to help your business grow online
            </p>
          </div>
        </div>
      </section>

      {/* Category Accordion Section */}
      {filteredCategories.length > 0 && (
        <section className="py-20 bg-white pattern-grid relative">
          <div className="absolute inset-0 bg-gradient-mesh opacity-30"></div>
          <div className="container mx-auto px-4 relative z-10">
            <div className="max-w-4xl mx-auto">
              <Accordion type="single" collapsible className="space-y-4" defaultValue={categoryFilter ? `category-${categoryFilter}` : undefined}>
                {filteredCategories.map((category, idx) => {
                  const categoryServices = groupedServices[category];
                  const firstServiceIcon = categoryServices[0]?.icon;
                  const IconComponent = serviceIcons[firstServiceIcon || ''] || Globe;
                  
                  return (
                    <AccordionItem key={category} value={`category-${category}`} className="glass-card rounded-lg border-2 border-primary/10 hover:border-primary/30 transition-all animate-slide-up">
                      <AccordionTrigger className="px-6 py-4 hover:no-underline group">
                        <div className="flex items-center gap-4 text-left">
                          <div className="w-14 h-14 rounded-lg bg-gradient-to-br from-primary via-secondary to-accent flex items-center justify-center flex-shrink-0 shadow-lg group-hover:scale-110 transition-transform">
                            <IconComponent className="w-7 h-7 text-white" />
                          </div>
                          <div>
                            <div className="flex items-center gap-3 mb-1">
                              <h3 className="text-xl font-bold font-poppins group-hover:text-primary transition-colors">{category}</h3>
                              <span className="text-sm font-bold text-primary/40">{String(idx + 1).padStart(2, '0')}</span>
                            </div>
                            <p className="text-sm text-muted-foreground">{categoryServices.length} services available</p>
                          </div>
                        </div>
                      </AccordionTrigger>
                      <AccordionContent className="px-6 pb-4">
                        <div className="pl-[72px] space-y-3">
                          {categoryServices.map((service) => (
                            <div key={service.id} className="flex items-start gap-2">
                              <CheckCircle2 className="w-4 h-4 text-primary flex-shrink-0 mt-1" />
                              <span className="text-sm text-muted-foreground">{service.title}</span>
                            </div>
                          ))}
                        </div>
                      </AccordionContent>
                    </AccordionItem>
                  );
                })}
              </Accordion>
              {categoryFilter && (
                <div className="text-center mt-8">
                  <Link to="/services">
                    <Button variant="outline" className="shadow-card hover:shadow-card-hover hover:scale-105 transition-all">View All Services</Button>
                  </Link>
                </div>
              )}
            </div>
          </div>
        </section>
      )}

      {/* Services Grid */}
      <section className="py-20 bg-gradient-hero pattern-dots relative overflow-hidden">
        <div className="absolute inset-0 bg-gradient-mesh"></div>
        <div className="container mx-auto px-4 relative z-10">
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
            {filteredServices.map((service, index) => {
              const IconComponent = serviceIcons[service.icon || ''] || Globe;
              return (
                <Card key={service.id} className="p-6 glass-card hover:shadow-card-hover transition-all group hover:scale-105 animate-slide-up" style={{animationDelay: `${index * 0.05}s`}}>
                  <div className="w-14 h-14 rounded-lg bg-gradient-to-br from-primary via-secondary to-accent flex items-center justify-center mb-4 shadow-lg group-hover:scale-110 transition-transform">
                    <IconComponent className="w-7 h-7 text-white" />
                  </div>
                  <div className="text-sm font-bold text-primary/40 mb-2">{service.number || String(index + 1).padStart(2, '0')}</div>
                  <h3 className="text-xl font-semibold font-poppins mb-3 group-hover:text-primary transition-colors">{service.title}</h3>
                  <p className="text-muted-foreground mb-4">{service.description}</p>
                  <Link to={`/service/${service.title.toLowerCase().replace(/\s+/g, '-').replace(/[()&/]/g, '').replace(/--+/g, '-')}`} className="text-primary font-medium inline-flex items-center hover:gap-2 transition-all group">
                    VIEW DETAILS <ArrowRight className="w-4 h-4 ml-1 group-hover:translate-x-1 transition-transform" />
                  </Link>
                </Card>
              );
            })}
          </div>
          
          {filteredServices.length === 0 && (
            <div className="text-center py-12">
              <p className="text-muted-foreground">No services available at the moment.</p>
            </div>
          )}
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-20 bg-primary text-white">
        <div className="container mx-auto px-4 text-center">
          <h2 className="text-3xl md:text-4xl font-bold font-poppins mb-4">
            Ready to Get Started?
          </h2>
          <p className="text-xl mb-8 opacity-90">
            Let's discuss how our services can help your business grow
          </p>
          <Link to="/contact">
            <button className="bg-white text-primary px-8 py-3 rounded-lg font-semibold hover:bg-gray-100 transition-colors">
              Contact Us Today
            </button>
          </Link>
        </div>
      </section>
    </div>
  );
}
