import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { ArrowRight, Star, CheckCircle2, Globe, Search, Megaphone, Share2, FileText, Users, Smartphone, GraduationCap, ShoppingCart } from "lucide-react";
import { Link } from "react-router-dom";

const serviceIcons = {
  "Website Designing": Globe,
  "SEO Management": Search,
  "Google Ads": Megaphone,
  "Social Media Marketing": Share2,
  "Content Marketing": FileText,
  "Social Media Maintenance": Users,
  "Mobile App Development": Smartphone,
  "Professional Online Training": GraduationCap,
  "Buy Pro Tools Online": ShoppingCart
} as const;

const pricingPlans = [
  {
    name: "Free Plan",
    price: "₹ 0",
    features: [
      "Website Designing",
      "SEO",
      "Google Ads",
      "Social Media Marketing",
      "FB Ads",
      "Email Marketing",
      "Google Analytics",
      "No Job Support",
      "Free On Youtube"
    ]
  },
  {
    name: "45 Days Plan",
    price: "₹ 8,500 +GST",
    features: [
      "Website Designing",
      "Landing Page (Elementor)",
      "Blogging & E-commerce",
      "SEO",
      "Mock Interviews",
      "Resume Prepare",
      "Live Projects",
      "No Job Support"
    ],
    popular: false
  },
  {
    name: "3 Months Plan",
    price: "₹ 18,500 +GST",
    features: [
      "Everything in 45 Days",
      "Google Ads",
      "Canva Design",
      "Social Media Marketing",
      "Email Marketing",
      "Google Analytics",
      "AI Tools",
      "Job Assistance"
    ],
    popular: true
  }
];

export default function Knight21Home() {
  // Temporary mock data until Supabase environment is ready
  const services = [
    { id: 1, number: "01", title: "Website Designing", description: "Professional, responsive websites tailored to your business needs", display_order: 1, active: true },
    { id: 2, number: "02", title: "SEO Management", description: "Boost your visibility and rank higher on search engines", display_order: 2, active: true },
    { id: 3, number: "03", title: "Google Ads", description: "Targeted advertising campaigns that drive real results", display_order: 3, active: true },
    { id: 4, number: "04", title: "Social Media Marketing", description: "Engage your audience and build your brand across social platforms", display_order: 4, active: true },
    { id: 5, number: "05", title: "Content Marketing", description: "Compelling content that converts visitors into customers", display_order: 5, active: true },
    { id: 6, number: "06", title: "Mobile App Development", description: "Native and cross-platform mobile applications", display_order: 6, active: true }
  ];

  const portfolioItems: any[] = [];
  const reviews: any[] = [];

  return (
    <div className="font-outfit">
      {/* Hero Section */}
      <section className="bg-gradient-to-br from-gray-50 to-white py-20">
        <div className="container mx-auto px-4">
          <div className="max-w-4xl mx-auto text-center space-y-6">
            <div className="inline-flex items-center gap-2 bg-primary/10 text-primary px-4 py-2 rounded-full text-sm font-medium">
              <Star className="w-4 h-4" />
              Enterprise-Grade Digital Marketing
            </div>
            <h1 className="text-4xl md:text-6xl font-bold font-poppins">
              We Are <span className="text-primary">Knight 21</span>
              <br />
              Digital Marketing Agency
            </h1>
            <p className="text-xl text-muted-foreground max-w-2xl mx-auto">
              Your Growth Partner In Website Designing, SEO Management, Google Ads, Social Media Marketing, Content Marketing, Email Marketing, Mobile Apps
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center pt-4">
              <a href="http://wa.me/918187007475" target="_blank" rel="noopener noreferrer">
                <Button size="lg" className="group">
                  Get Start Today
                  <ArrowRight className="ml-2 w-5 h-5 group-hover:translate-x-1 transition-transform" />
                </Button>
              </a>
              <Link to="/services">
                <Button size="lg" variant="outline">
                  All Services
                </Button>
              </Link>
            </div>
          </div>
        </div>
      </section>

      {/* Stats Section */}
      <section className="py-16 bg-white">
        <div className="container mx-auto px-4">
          <div className="text-center mb-12">
            <h2 className="text-3xl md:text-4xl font-bold font-poppins mb-4">
              Driven by Data, Fueled by Creativity,{" "}
              <span className="text-primary">Focused on Results</span>
            </h2>
            <p className="text-lg text-muted-foreground max-w-3xl mx-auto">
              We are a passionate team of digital marketers, designers, and strategists dedicated to helping your business thrive online.
            </p>
          </div>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-6 max-w-4xl mx-auto">
            {[
              { label: "Expert Team", icon: CheckCircle2 },
              { label: "Tailored Strategies", icon: CheckCircle2 },
              { label: "Results-Driven", icon: CheckCircle2 },
              { label: "Customer Support", icon: CheckCircle2 }
            ].map((item, index) => (
              <Card key={index} className="p-6 text-center">
                <item.icon className="w-8 h-8 text-primary mx-auto mb-2" />
                <p className="font-semibold">{item.label}</p>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* Services Section */}
      <section className="py-20 bg-gray-50">
        <div className="container mx-auto px-4">
          <div className="text-center mb-12">
            <h2 className="text-3xl md:text-4xl font-bold font-poppins mb-4">
              Our Services & <span className="text-primary">Features</span>
            </h2>
            <p className="text-lg text-muted-foreground max-w-3xl mx-auto">
              Our range of customized solutions is designed to help your business grow, connect with customers, and achieve measurable success online.
            </p>
          </div>
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
                  <Link to="/services" className="text-primary font-medium inline-flex items-center hover:gap-2 transition-all">
                    LEARN MORE… <ArrowRight className="w-4 h-4 ml-1" />
                  </Link>
                </Card>
              );
            })}
          </div>
        </div>
      </section>

      {/* Our Packages Section */}
      <section className="py-20 bg-white">
        <div className="container mx-auto px-4">
          <div className="text-center mb-12">
            <h2 className="text-3xl md:text-4xl font-bold font-poppins mb-4">
              Our <span className="text-primary">Packages</span>
            </h2>
            <p className="text-lg text-muted-foreground max-w-3xl mx-auto">
              Choose the perfect package for your business needs
            </p>
          </div>
          <div className="grid md:grid-cols-3 gap-6 max-w-5xl mx-auto">
            {[
              {
                name: "Starter Package",
                price: "₹15,000",
                features: [
                  "Basic Website Design",
                  "5 Pages",
                  "Mobile Responsive",
                  "SEO Basic Setup",
                  "1 Month Support",
                  "Social Media Integration"
                ]
              },
              {
                name: "Professional Package",
                price: "₹35,000",
                popular: true,
                features: [
                  "Advanced Website Design",
                  "10 Pages",
                  "E-commerce Integration",
                  "Advanced SEO Setup",
                  "3 Months Support",
                  "Google Ads Setup",
                  "Social Media Marketing",
                  "Content Writing"
                ]
              },
              {
                name: "Enterprise Package",
                price: "₹75,000",
                features: [
                  "Custom Web Application",
                  "Unlimited Pages",
                  "Full E-commerce Solution",
                  "Complete SEO Campaign",
                  "6 Months Support",
                  "Google Ads Management",
                  "Social Media Management",
                  "Email Marketing",
                  "Analytics & Reporting"
                ]
              }
            ].map((pkg) => (
              <Card key={pkg.name} className={`p-6 ${pkg.popular ? "border-primary border-2 relative" : ""}`}>
                {pkg.popular && (
                  <div className="absolute -top-3 left-1/2 -translate-x-1/2 bg-primary text-white px-4 py-1 rounded-full text-sm font-semibold">
                    Most Popular
                  </div>
                )}
                <h3 className="text-2xl font-bold font-poppins mb-2">{pkg.name}</h3>
                <div className="text-3xl font-bold text-primary mb-6">{pkg.price}</div>
                <ul className="space-y-3 mb-6">
                  {pkg.features.map((feature, index) => (
                    <li key={index} className="flex items-start gap-2">
                      <CheckCircle2 className="w-5 h-5 text-primary flex-shrink-0 mt-0.5" />
                      <span>{feature}</span>
                    </li>
                  ))}
                </ul>
                <Link to="/contact">
                  <Button className="w-full">Get Started</Button>
                </Link>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* Portfolio Section */}
      <section className="py-20 bg-gray-50">
        <div className="container mx-auto px-4">
          <div className="text-center mb-12">
            <h2 className="text-3xl md:text-4xl font-bold font-poppins mb-4">
              Our <span className="text-primary">Portfolio</span>
            </h2>
            <p className="text-lg text-muted-foreground max-w-3xl mx-auto">
              Check out some of our recent projects and success stories
            </p>
          </div>
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6 max-w-6xl mx-auto">
            {portfolioItems.map((item) => (
              <Card key={item.id} className="overflow-hidden group cursor-pointer hover:shadow-lg transition-shadow">
                <div className="aspect-video overflow-hidden">
                  <img
                    src={item.image_url || "https://images.unsplash.com/photo-1460925895917-afdab827c52f?w=500"}
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
          <div className="text-center mt-8">
            <Link to="/portfolio">
              <Button variant="outline" size="lg">
                View All Projects <ArrowRight className="ml-2 w-4 h-4" />
              </Button>
            </Link>
          </div>
        </div>
      </section>

      {/* Client Reviews */}
      <section className="py-20 bg-white">
        <div className="container mx-auto px-4">
          <div className="text-center mb-12">
            <h2 className="text-3xl md:text-4xl font-bold font-poppins mb-4">
              What Our <span className="text-primary">Clients Say</span>
            </h2>
            <div className="flex items-center justify-center gap-2 mb-4">
              <div className="flex">
                {[1, 2, 3, 4, 5].map((i) => (
                  <Star key={i} className="w-5 h-5 fill-yellow-400 text-yellow-400" />
                ))}
              </div>
              <span className="text-xl font-bold">4.9/5.0</span>
            </div>
          </div>
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6 max-w-6xl mx-auto">
            {reviews.map((review) => (
              <Card key={review.id} className="p-6 hover:shadow-lg transition-shadow">
                <div className="flex items-center gap-4 mb-4">
                  <img
                    src={review.image_url || "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=150"}
                    alt={review.name}
                    className="w-16 h-16 rounded-full object-cover"
                  />
                  <div>
                    <h3 className="font-semibold text-lg">{review.name}</h3>
                    <p className="text-sm text-muted-foreground">{review.role}</p>
                  </div>
                </div>
                <div className="flex mb-3">
                  {[...Array(review.rating || 5)].map((_, i) => (
                    <Star key={i} className="w-4 h-4 fill-yellow-400 text-yellow-400" />
                  ))}
                </div>
                <p className="text-muted-foreground leading-relaxed">{review.comment}</p>
              </Card>
            ))}
          </div>
          <div className="text-center mt-8">
            <Link to="/reviews">
              <Button variant="outline" size="lg">
                Read More Reviews <ArrowRight className="ml-2 w-4 h-4" />
              </Button>
            </Link>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-20 bg-primary text-white">
        <div className="container mx-auto px-4 text-center">
          <h2 className="text-3xl md:text-4xl font-bold font-poppins mb-4">
            Ready to Grow Your Business?
          </h2>
          <p className="text-xl mb-8 opacity-90">
            Contact us today for a free consultation and let's take your business to the next level
          </p>
          <Link to="/contact">
            <Button size="lg" variant="secondary" className="group">
              Get Started Today
              <ArrowRight className="ml-2 w-5 h-5 group-hover:translate-x-1 transition-transform" />
            </Button>
          </Link>
        </div>
      </section>
    </div>
  );
}
