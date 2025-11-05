import { Card } from "@/components/ui/card";
import { ArrowRight, Globe, Search, Megaphone, Share2, FileText, Smartphone } from "lucide-react";
import { Link } from "react-router-dom";

const serviceIcons = {
  "Website Designing": Globe,
  "SEO Management": Search,
  "Google Ads": Megaphone,
  "Social Media Marketing": Share2,
  "Content Marketing": FileText,
  "Mobile App Development": Smartphone
} as const;

const services = [
  { id: 1, number: "01", title: "Website Designing", description: "Professional, responsive websites tailored to your business needs", display_order: 1, active: true },
  { id: 2, number: "02", title: "SEO Management", description: "Boost your visibility and rank higher on search engines", display_order: 2, active: true },
  { id: 3, number: "03", title: "Google Ads", description: "Targeted advertising campaigns that drive real results", display_order: 3, active: true },
  { id: 4, number: "04", title: "Social Media Marketing", description: "Engage your audience and build your brand across social platforms", display_order: 4, active: true },
  { id: 5, number: "05", title: "Content Marketing", description: "Compelling content that converts visitors into customers", display_order: 5, active: true },
  { id: 6, number: "06", title: "Mobile App Development", description: "Native and cross-platform mobile applications", display_order: 6, active: true }
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

      {/* Services Grid */}
      <section className="py-20 bg-white">
        <div className="container mx-auto px-4">
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
            {services.map((service, index) => {
              const IconComponent = serviceIcons[service.title as keyof typeof serviceIcons] || Globe;
              return (
                <Card key={service.id} className="p-6 hover:shadow-lg transition-shadow">
                  <div className="w-14 h-14 rounded-lg bg-primary/10 flex items-center justify-center mb-4">
                    <IconComponent className="w-7 h-7 text-primary" />
                  </div>
                  <div className="text-sm font-bold text-primary/40 mb-2">{service.number || `0${index + 1}`}</div>
                  <h3 className="text-xl font-semibold font-poppins mb-3">{service.title}</h3>
                  <p className="text-muted-foreground mb-4">{service.description}</p>
                  <Link to="/contact" className="text-primary font-medium inline-flex items-center hover:gap-2 transition-all">
                    GET STARTED <ArrowRight className="w-4 h-4 ml-1" />
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
