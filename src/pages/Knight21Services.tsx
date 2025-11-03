import { Card } from "@/components/ui/card";
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from "@/components/ui/accordion";
import { 
  Smartphone, Globe, Code, Palette, Cloud, Wrench, 
  TrendingUp, Search, MousePointerClick, FileText, Mail, 
  Lightbulb, Building, FileCheck, Scale, ShieldCheck, 
  Award, Briefcase, CheckCircle2 
} from "lucide-react";

const services = [
  {
    icon: Code,
    title: "App & Software Development",
    description: "We provide complete app and software solutions with modern technologies for startups, enterprises, and individuals.",
    subcategories: [
      {
        icon: Smartphone,
        title: "Mobile App Development",
        items: ["Android App Development", "iOS App Development", "Hybrid App Development (Flutter / React Native)"]
      },
      {
        icon: Globe,
        title: "Web App Development",
        items: ["Custom Web Applications", "E-Commerce Development", "Admin Dashboard Development"]
      },
      {
        icon: Briefcase,
        title: "Software Solutions",
        items: ["CRM Software", "ERP Software", "Billing & Inventory Software", "School/College Management Software"]
      },
      {
        icon: Palette,
        title: "UI/UX Design",
        items: ["App UI Design", "Website UI/UX", "Prototyping & Wireframes"]
      },
      {
        icon: Cloud,
        title: "API & Integration Services",
        items: ["Payment Gateway Integration", "Third-Party API Integration", "Cloud & Database Setup"]
      },
      {
        icon: Wrench,
        title: "Maintenance & Support",
        items: ["App Updates", "Bug Fixing", "Version Upgrades"]
      }
    ]
  },
  {
    icon: TrendingUp,
    title: "Digital Marketing",
    description: "We help brands grow online through data-driven strategies, creative content, and performance marketing.",
    subcategories: [
      {
        icon: MousePointerClick,
        title: "Social Media Marketing",
        items: ["Facebook & Instagram Ads", "YouTube Marketing", "LinkedIn & Twitter Ads"]
      },
      {
        icon: Search,
        title: "SEO (Search Engine Optimization)",
        items: ["On-Page SEO", "Off-Page SEO", "Local SEO (Google My Business)"]
      },
      {
        icon: MousePointerClick,
        title: "Google Ads (PPC Campaigns)",
        items: ["Search Ads", "Display Ads", "Remarketing Campaigns"]
      },
      {
        icon: FileText,
        title: "Content Marketing",
        items: ["Blog Writing", "Copywriting", "Video & Reels Content Creation"]
      },
      {
        icon: Mail,
        title: "Email & WhatsApp Marketing",
        items: ["Email Campaign Management", "WhatsApp Business Marketing"]
      },
      {
        icon: Lightbulb,
        title: "Brand Development",
        items: ["Logo & Graphic Design", "Branding Strategy", "Influencer Collaboration"]
      },
      {
        icon: Globe,
        title: "Website Development",
        items: ["WordPress Sites", "Landing Pages", "E-Commerce Websites"]
      }
    ]
  },
  {
    icon: FileCheck,
    title: "Business Certificates",
    description: "We assist startups and businesses in getting all necessary registrations, licenses, and legal documents to operate legally.",
    subcategories: [
      {
        icon: Building,
        title: "Business Registration",
        items: ["GST Registration", "MSME / UDYAM Registration", "Shop Act / Trade License"]
      },
      {
        icon: Briefcase,
        title: "Company Formation",
        items: ["Private Limited Company", "LLP Registration", "One Person Company (OPC)"]
      },
      {
        icon: Scale,
        title: "Tax & Compliance",
        items: ["PAN / TAN Application", "Income Tax Filing", "Professional Tax Registration"]
      },
      {
        icon: ShieldCheck,
        title: "Import-Export & Other Licenses",
        items: ["IEC Code (Import Export Certificate)", "FSSAI License (Food Business)", "ISO Certification", "Trademark Registration"]
      },
      {
        icon: Award,
        title: "Business Consultancy",
        items: ["Startup Guidance", "Legal Documentation Support"]
      }
    ]
  }
];

export default function Knight21Services() {
  return (
    <div className="font-outfit">
      {/* Hero Section */}
      <section className="bg-gradient-to-br from-gray-50 to-white py-20">
        <div className="container mx-auto px-4">
          <div className="max-w-4xl mx-auto text-center space-y-6">
            <h1 className="text-4xl md:text-6xl font-bold font-poppins">
              Our <span className="text-primary">Services</span>
            </h1>
            <p className="text-xl text-muted-foreground">
              Comprehensive digital solutions to help your business grow online
            </p>
          </div>
        </div>
      </section>

      {/* Services List */}
      <section className="py-20 bg-white">
        <div className="container mx-auto px-4">
          <div className="max-w-6xl mx-auto space-y-12">
            {services.map((service, index) => (
              <Card key={index} className="overflow-hidden border-2 hover:border-primary/50 transition-colors">
                <div className="p-8">
                  <div className="flex items-start gap-6 mb-6">
                    <div className="w-20 h-20 rounded-xl bg-gradient-to-br from-primary to-primary/70 flex items-center justify-center flex-shrink-0 shadow-lg">
                      <service.icon className="w-10 h-10 text-white" />
                    </div>
                    <div className="flex-1">
                      <div className="flex items-center gap-3 mb-2">
                        <h2 className="text-3xl font-bold font-poppins">{service.title}</h2>
                        <div className="text-3xl font-bold text-primary/20">
                          {String(index + 1).padStart(2, '0')}
                        </div>
                      </div>
                      <p className="text-muted-foreground leading-relaxed text-lg">
                        {service.description}
                      </p>
                    </div>
                  </div>

                  <Accordion type="multiple" className="w-full">
                    {service.subcategories.map((subcategory, subIndex) => (
                      <AccordionItem key={subIndex} value={`item-${index}-${subIndex}`}>
                        <AccordionTrigger className="hover:no-underline">
                          <div className="flex items-center gap-3">
                            <div className="w-10 h-10 rounded-lg bg-primary/10 flex items-center justify-center">
                              <subcategory.icon className="w-5 h-5 text-primary" />
                            </div>
                            <span className="font-semibold text-lg">{subcategory.title}</span>
                          </div>
                        </AccordionTrigger>
                        <AccordionContent>
                          <div className="pl-[52px] pt-2">
                            <ul className="space-y-2">
                              {subcategory.items.map((item, itemIndex) => (
                                <li key={itemIndex} className="flex items-start gap-2">
                                  <CheckCircle2 className="w-5 h-5 text-primary flex-shrink-0 mt-0.5" />
                                  <span className="text-muted-foreground">{item}</span>
                                </li>
                              ))}
                            </ul>
                          </div>
                        </AccordionContent>
                      </AccordionItem>
                    ))}
                  </Accordion>
                </div>
              </Card>
            ))}
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
