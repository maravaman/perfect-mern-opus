import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from "@/components/ui/accordion";
import { ArrowRight, Globe, Search, Megaphone, Share2, FileText, Smartphone, Code, TrendingUp, CheckCircle2 } from "lucide-react";
import { Link, useSearchParams } from "react-router-dom";

const serviceIcons = {
  // Main categories
  "App & Software Development": Code,
  "Digital Marketing": TrendingUp,
  "Business Certificates": FileText,
  
  // App & Software Development services
  "Mobile Apps (Android/iOS)": Smartphone,
  "Web Applications": Globe,
  "CRM & ERP Software": Code,
  "UI/UX Design": Globe,
  "API Integration": Code,
  
  // Digital Marketing services
  "Social Media Marketing": Share2,
  "SEO Optimization": Search,
  "Google Ads (PPC)": Megaphone,
  "Content Marketing": FileText,
  "Email & WhatsApp Marketing": Megaphone,
  
  // Business Certificates services
  "GST & MSME Registration": FileText,
  "Company Formation": FileText,
  "Tax & Compliance": FileText,
  "Import-Export Licenses": FileText,
  "Business Consultancy": FileText
} as const;

const detailedServices = [
  {
    id: 1,
    number: "01",
    title: "App & Software Development",
    description: "Complete app and software solutions with modern technologies for startups, enterprises, and individuals.",
    subcategories: ["Mobile Apps (Android/iOS)", "Web Applications", "CRM & ERP Software", "UI/UX Design", "API Integration"]
  },
  {
    id: 2,
    number: "02",
    title: "Digital Marketing",
    description: "Data-driven strategies, creative content, and performance marketing to help brands grow online.",
    subcategories: ["Social Media Marketing", "SEO Optimization", "Google Ads (PPC)", "Content Marketing", "Email & WhatsApp Marketing"]
  },
  {
    id: 3,
    number: "03",
    title: "Business Certificates",
    description: "Get all necessary registrations, licenses, and legal documents to operate your business legally.",
    subcategories: ["GST & MSME Registration", "Company Formation", "Tax & Compliance", "Import-Export Licenses", "Business Consultancy"]
  }
];

const services = [
  // App & Software Development
  { id: 1, number: "01", title: "Mobile Apps (Android/iOS)", description: "Native and cross-platform mobile applications for all devices", display_order: 1, active: true, category: "App & Software Development" },
  { id: 2, number: "02", title: "Web Applications", description: "Professional, responsive web applications tailored to your business", display_order: 2, active: true, category: "App & Software Development" },
  { id: 3, number: "03", title: "CRM & ERP Software", description: "Custom CRM and ERP solutions to streamline your operations", display_order: 3, active: true, category: "App & Software Development" },
  { id: 4, number: "04", title: "UI/UX Design", description: "Beautiful, user-friendly designs that enhance user experience", display_order: 4, active: true, category: "App & Software Development" },
  { id: 5, number: "05", title: "API Integration", description: "Seamless API integration and development services", display_order: 5, active: true, category: "App & Software Development" },
  
  // Digital Marketing
  { id: 6, number: "06", title: "Social Media Marketing", description: "Engage your audience and build your brand across social platforms", display_order: 6, active: true, category: "Digital Marketing" },
  { id: 7, number: "07", title: "SEO Optimization", description: "Boost your visibility and rank higher on search engines", display_order: 7, active: true, category: "Digital Marketing" },
  { id: 8, number: "08", title: "Google Ads (PPC)", description: "Targeted advertising campaigns that drive real results", display_order: 8, active: true, category: "Digital Marketing" },
  { id: 9, number: "09", title: "Content Marketing", description: "Compelling content that converts visitors into customers", display_order: 9, active: true, category: "Digital Marketing" },
  { id: 10, number: "10", title: "Email & WhatsApp Marketing", description: "Direct marketing campaigns to reach your customers effectively", display_order: 10, active: true, category: "Digital Marketing" },
  
  // Business Certificates
  { id: 11, number: "11", title: "GST & MSME Registration", description: "Complete GST and MSME/Udyam registration services", display_order: 11, active: true, category: "Business Certificates" },
  { id: 12, number: "12", title: "Company Formation", description: "Private Limited, LLP, and other company formations", display_order: 12, active: true, category: "Business Certificates" },
  { id: 13, number: "13", title: "Tax & Compliance", description: "Expert tax filing and compliance management services", display_order: 13, active: true, category: "Business Certificates" },
  { id: 14, number: "14", title: "Import-Export Licenses", description: "IEC code and complete import-export documentation", display_order: 14, active: true, category: "Business Certificates" },
  { id: 15, number: "15", title: "Business Consultancy", description: "Professional guidance for business growth and operations", display_order: 15, active: true, category: "Business Certificates" }
];

export default function Knight21Services() {
  const [searchParams] = useSearchParams();
  const categoryFilter = searchParams.get('category');
  
  const filteredDetailedServices = categoryFilter 
    ? detailedServices.filter(s => s.title === categoryFilter)
    : detailedServices;
  
  const filteredServices = categoryFilter
    ? services.filter(s => s.category === categoryFilter)
    : services;
  
  const showDetailedServices = filteredDetailedServices.length > 0;
  const defaultExpandedValue = categoryFilter ? `service-${filteredDetailedServices[0]?.id}` : undefined;

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

      {/* Detailed Services Section */}
      {showDetailedServices && (
        <section className="py-20 bg-white pattern-grid relative">
          <div className="absolute inset-0 bg-gradient-mesh opacity-30"></div>
          <div className="container mx-auto px-4 relative z-10">
            <div className="max-w-4xl mx-auto">
              <Accordion type="single" collapsible className="space-y-4" defaultValue={defaultExpandedValue}>
                {filteredDetailedServices.map((service) => {
                  const IconComponent = serviceIcons[service.title as keyof typeof serviceIcons] || Globe;
                  return (
                    <AccordionItem key={service.id} value={`service-${service.id}`} className="glass-card rounded-lg border-2 border-primary/10 hover:border-primary/30 transition-all animate-slide-up">
                      <AccordionTrigger className="px-6 py-4 hover:no-underline group">
                        <div className="flex items-center gap-4 text-left">
                          <div className="w-14 h-14 rounded-lg bg-gradient-to-br from-primary via-secondary to-accent flex items-center justify-center flex-shrink-0 shadow-lg group-hover:scale-110 transition-transform">
                            <IconComponent className="w-7 h-7 text-white" />
                          </div>
                          <div>
                            <div className="flex items-center gap-3 mb-1">
                              <h3 className="text-xl font-bold font-poppins group-hover:text-primary transition-colors">{service.title}</h3>
                              <span className="text-sm font-bold text-primary/40">{service.number}</span>
                            </div>
                            <p className="text-sm text-muted-foreground">{service.description}</p>
                          </div>
                        </div>
                      </AccordionTrigger>
                      <AccordionContent className="px-6 pb-4">
                        <div className="pl-[72px] space-y-3">
                          {service.subcategories.map((sub, idx) => (
                            <div key={idx} className="flex items-start gap-2">
                              <CheckCircle2 className="w-4 h-4 text-primary flex-shrink-0 mt-1" />
                              <span className="text-sm text-muted-foreground">{sub}</span>
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
              const IconComponent = serviceIcons[service.title as keyof typeof serviceIcons] || Globe;
              return (
                <Card key={service.id} className="p-6 glass-card hover:shadow-card-hover transition-all group hover:scale-105 animate-slide-up" style={{animationDelay: `${index * 0.05}s`}}>
                  <div className="w-14 h-14 rounded-lg bg-gradient-to-br from-primary via-secondary to-accent flex items-center justify-center mb-4 shadow-lg group-hover:scale-110 transition-transform">
                    <IconComponent className="w-7 h-7 text-white" />
                  </div>
                  <div className="text-sm font-bold text-primary/40 mb-2">{service.number || `0${index + 1}`}</div>
                  <h3 className="text-xl font-semibold font-poppins mb-3 group-hover:text-primary transition-colors">{service.title}</h3>
                  <p className="text-muted-foreground mb-4">{service.description}</p>
                  <Link to="/contact" className="text-primary font-medium inline-flex items-center hover:gap-2 transition-all group">
                    GET STARTED <ArrowRight className="w-4 h-4 ml-1 group-hover:translate-x-1 transition-transform" />
                  </Link>
                </Card>
              );
            })}
          </div>
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
          <a href="/contact">
            <button className="bg-white text-primary px-8 py-3 rounded-lg font-semibold hover:bg-gray-100 transition-colors">
              Contact Us Today
            </button>
          </a>
        </div>
      </section>
    </div>
  );
}
