import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from "@/components/ui/accordion";
import { ArrowRight, Star, CheckCircle2, Globe, Search, Megaphone, Share2, FileText, Users, Smartphone, GraduationCap, ShoppingCart, Code, TrendingUp, Bot, Sparkles } from "lucide-react";
import { Link } from "react-router-dom";
import { TrustedClients } from "@/components/TrustedClients";

const serviceIcons = {
  "App & Software Development": Code,
  "Digital Marketing": TrendingUp,
  "Business Certificates": FileText
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
  const services = [
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

  const portfolioItems = [
    { id: 1, title: "E-Commerce Website", category: "Web Development", image_url: "https://images.unsplash.com/photo-1563013544-824ae1b704d3?w=800&q=80", display_order: 1 },
    { id: 2, title: "Digital Marketing Campaign", category: "Marketing", image_url: "https://images.unsplash.com/photo-1557804506-669a67965ba0?w=800&q=80", display_order: 2 },
    { id: 3, title: "Mobile App Design", category: "App Development", image_url: "https://images.unsplash.com/photo-1512941937669-90a1b58e7e9c?w=800&q=80", display_order: 3 },
    { id: 4, title: "SEO Optimization Project", category: "SEO", image_url: "https://images.unsplash.com/photo-1571677205640-d1c4e73f1d09?w=800&q=80", display_order: 4 },
    { id: 5, title: "Social Media Strategy", category: "Social Media", image_url: "https://images.unsplash.com/photo-1611162617213-7d7a39e9b1d7?w=800&q=80", display_order: 5 },
    { id: 6, title: "Brand Identity Design", category: "Branding", image_url: "https://images.unsplash.com/photo-1626785774625-ddcddc3445e9?w=800&q=80", display_order: 6 }
  ];

  const reviews = [
    { id: 1, name: "Rajesh Kumar", role: "CEO, TechStart Solutions", rating: 5, comment: "Knight21 transformed our online presence completely. Their SEO and digital marketing strategies increased our traffic by 300%. Highly recommended!", image_url: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=150", display_order: 1 },
    { id: 2, name: "Priya Sharma", role: "Founder, EcoLife Products", rating: 5, comment: "Excellent work on our e-commerce website. The team was professional, responsive, and delivered beyond our expectations. Our sales have doubled since launch!", image_url: "https://images.unsplash.com/photo-1494790108377-be9c29b29330?w=150", display_order: 2 },
    { id: 3, name: "Arun Patel", role: "Marketing Director, FashionHub", rating: 5, comment: "Their social media marketing campaigns are outstanding. We saw a 250% increase in engagement within just 2 months. The ROI speaks for itself!", image_url: "https://images.unsplash.com/photo-1500648767791-00dcc994a43e?w=150", display_order: 3 },
    { id: 4, name: "Sneha Reddy", role: "Owner, Café Delight", rating: 5, comment: "Knight21 created a beautiful website and helped us rank on first page of Google. Their Google Ads management brought us so many new customers!", image_url: "https://images.unsplash.com/photo-1438761681033-6461ffad8d80?w=150", display_order: 4 },
    { id: 5, name: "Vikram Singh", role: "Director, BuildPro Construction", rating: 5, comment: "Professional team with great expertise. They handled everything from website to complete digital marketing. Our business visibility has increased tremendously.", image_url: "https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=150", display_order: 5 },
    { id: 6, name: "Meera Desai", role: "CEO, EduLearn Platform", rating: 5, comment: "Amazing results! Their content marketing and SEO strategies helped us reach thousands of students. The team is knowledgeable and always available to help.", image_url: "https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=150", display_order: 6 }
  ];

  return (
    <div className="font-outfit">
      {/* Hero Section */}
      <section className="bg-gradient-hero pattern-dots py-20 relative overflow-hidden">
        <div className="absolute inset-0 bg-gradient-mesh"></div>
        <div className="container mx-auto px-4 relative z-10">
          <div className="max-w-4xl mx-auto text-center space-y-6 animate-fade-in">
            <div className="inline-flex items-center gap-2 glass-card text-primary px-4 py-2 rounded-full text-sm font-medium shadow-card">
              <Star className="w-4 h-4 animate-glow-pulse" />
              Enterprise-Grade Digital Marketing
            </div>
            <h1 className="text-4xl md:text-6xl font-bold font-poppins">
              We Are <span className="text-gradient">Knight 21</span>
              <br />
              Digital Marketing Agency
            </h1>
            <p className="text-xl text-muted-foreground max-w-2xl mx-auto">
              Your Growth Partner In Website Designing, SEO Management, Google Ads, Social Media Marketing, Content Marketing, Email Marketing, Mobile Apps
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center pt-4">
              <a href="http://wa.me/918187007475" target="_blank" rel="noopener noreferrer">
                <Button size="lg" variant="secondary" className="group shadow-lg hover:shadow-card-hover hover:scale-105 transition-all">
                  Get Start Today
                  <ArrowRight className="ml-2 w-5 h-5 group-hover:translate-x-1 transition-transform" />
                </Button>
              </a>
              <Link to="/services">
                <Button size="lg" variant="accent" className="shadow-lg hover:shadow-card-hover hover:scale-105 transition-all">
                  All Services
                </Button>
              </Link>
            </div>
          </div>
        </div>
      </section>

      {/* Trusted Clients */}
      <TrustedClients />

      {/* Stats Section */}
      <section className="py-16 bg-white pattern-grid relative">
        <div className="absolute inset-0 bg-gradient-mesh opacity-30"></div>
        <div className="container mx-auto px-4 relative z-10">
          <div className="text-center mb-12 animate-fade-in">
            <h2 className="text-3xl md:text-4xl font-bold font-poppins mb-4">
              Driven by Data, Fueled by Creativity,{" "}
              <span className="text-gradient">Focused on Results</span>
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
              <Card key={index} className="p-6 text-center glass-card hover:shadow-card-hover transition-all group hover:scale-105 animate-slide-up" style={{animationDelay: `${index * 0.1}s`}}>
                <item.icon className="w-8 h-8 text-primary mx-auto mb-2 group-hover:scale-110 transition-transform" />
                <p className="font-semibold">{item.label}</p>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* Services Section */}
      <section className="py-20 bg-gradient-hero pattern-dots relative overflow-hidden">
        <div className="absolute inset-0 bg-gradient-mesh"></div>
        <div className="container mx-auto px-4 relative z-10">
          <div className="text-center mb-12 animate-fade-in">
            <h2 className="text-3xl md:text-4xl font-bold font-poppins mb-4 text-gradient">
              Our Services & Features
            </h2>
            <p className="text-lg text-muted-foreground max-w-3xl mx-auto">
              Our range of customized solutions is designed to help your business grow, connect with customers, and achieve measurable success online.
            </p>
          </div>
          <div className="max-w-4xl mx-auto">
            <Accordion type="single" collapsible className="space-y-4">
              {services.map((service, idx) => {
                const IconComponent = serviceIcons[service.title as keyof typeof serviceIcons] || Globe;
                return (
                    <AccordionItem key={service.id} value={`service-${service.id}`} className="glass-card rounded-xl border-2 border-primary/10 hover:border-primary/30 transition-all hover:shadow-card-hover animate-slide-up" style={{animationDelay: `${idx * 0.1}s`}}>
                      <AccordionTrigger className="px-6 py-4 hover:no-underline group">
                        <div className="flex items-center gap-4 text-left">
                          <div className="w-14 h-14 rounded-xl bg-gradient-to-br from-primary via-secondary to-accent flex items-center justify-center flex-shrink-0 shadow-lg group-hover:scale-110 transition-transform">
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
                        <Link 
                          to={`/services?category=${encodeURIComponent(service.title)}`}
                          className="inline-flex items-center text-primary font-semibold hover:gap-2 transition-all group mt-4"
                        >
                          VIEW DETAILS <ArrowRight className="w-4 h-4 ml-1 group-hover:translate-x-1 transition-transform" />
                        </Link>
                      </div>
                    </AccordionContent>
                  </AccordionItem>
                );
              })}
            </Accordion>
          </div>
        </div>
      </section>

      {/* Courses Section */}
      <section className="py-20 bg-white pattern-grid relative">
        <div className="absolute inset-0 bg-gradient-mesh opacity-30"></div>
        <div className="container mx-auto px-4 relative z-10">
          <div className="text-center mb-12 animate-fade-in">
            <h2 className="text-3xl md:text-4xl font-bold font-poppins mb-4 text-gradient">
              Professional Courses
            </h2>
            <p className="text-lg text-muted-foreground max-w-3xl mx-auto">
              Master in-demand skills with our expert-led training programs
            </p>
          </div>
          <div className="grid md:grid-cols-2 gap-6 max-w-4xl mx-auto">
            <Card className="p-8 glass-card hover:shadow-card-hover transition-all group border-2 border-primary/10 hover:border-primary/30 animate-slide-up">
              <div className="w-16 h-16 rounded-xl bg-gradient-to-br from-primary via-secondary to-accent flex items-center justify-center mb-4 group-hover:scale-110 transition-transform shadow-lg">
                <Code className="w-8 h-8 text-white" />
              </div>
              <h3 className="text-2xl font-semibold font-poppins mb-3 group-hover:text-primary transition-colors">Web Development</h3>
              <p className="text-muted-foreground mb-6">
                Learn HTML, CSS, JavaScript, React, and build real-world projects with hands-on training
              </p>
              <ul className="space-y-2 mb-6">
                <li className="flex items-center gap-2">
                  <CheckCircle2 className="w-4 h-4 text-primary" />
                  <span className="text-sm">3-6 Months Duration</span>
                </li>
                <li className="flex items-center gap-2">
                  <CheckCircle2 className="w-4 h-4 text-primary" />
                  <span className="text-sm">Industry Certification</span>
                </li>
                <li className="flex items-center gap-2">
                  <CheckCircle2 className="w-4 h-4 text-primary" />
                  <span className="text-sm">Job Placement Support</span>
                </li>
              </ul>
              <Link to="/courses">
                <Button className="w-full group-hover:gap-2 shadow-card hover:shadow-card-hover">
                  Explore Course <ArrowRight className="ml-2 w-4 h-4" />
                </Button>
              </Link>
            </Card>

            <Card className="p-8 glass-card hover:shadow-card-hover transition-all group border-2 border-primary/10 hover:border-primary/30 animate-slide-up" style={{animationDelay: '0.1s'}}>
              <div className="w-16 h-16 rounded-xl bg-gradient-to-br from-primary via-secondary to-accent flex items-center justify-center mb-4 group-hover:scale-110 transition-transform shadow-lg">
                <TrendingUp className="w-8 h-8 text-white" />
              </div>
              <h3 className="text-2xl font-semibold font-poppins mb-3 group-hover:text-primary transition-colors">Digital Marketing</h3>
              <p className="text-muted-foreground mb-6">
                Master SEO, social media marketing, Google Ads, and grow businesses online
              </p>
              <ul className="space-y-2 mb-6">
                <li className="flex items-center gap-2">
                  <CheckCircle2 className="w-4 h-4 text-primary" />
                  <span className="text-sm">2-4 Months Duration</span>
                </li>
                <li className="flex items-center gap-2">
                  <CheckCircle2 className="w-4 h-4 text-primary" />
                  <span className="text-sm">Google & Facebook Certified</span>
                </li>
                <li className="flex items-center gap-2">
                  <CheckCircle2 className="w-4 h-4 text-primary" />
                  <span className="text-sm">Internship Opportunities</span>
                </li>
              </ul>
              <Link to="/courses">
                <Button className="w-full group-hover:gap-2 shadow-card hover:shadow-card-hover">
                  Explore Course <ArrowRight className="ml-2 w-4 h-4" />
                </Button>
              </Link>
            </Card>
          </div>
        </div>
      </section>

      {/* Tools Section */}
      <section className="py-20 bg-gradient-to-br from-gray-50 via-accent/5 to-primary/5">
        <div className="container mx-auto px-4">
          <div className="text-center mb-12">
            <h2 className="text-3xl md:text-4xl font-bold font-poppins mb-4">
              AI <span className="text-primary">Tools</span> We Use
            </h2>
            <p className="text-lg text-muted-foreground max-w-3xl mx-auto">
              Leverage cutting-edge AI technology to transform your business
            </p>
          </div>
          <div className="grid md:grid-cols-2 gap-6 max-w-4xl mx-auto">
            <Card className="p-8 hover:shadow-lg transition-shadow group border-2 hover:border-accent/30">
              <div className="w-16 h-16 rounded-xl bg-gradient-to-br from-green-500 to-emerald-600 flex items-center justify-center mb-4 group-hover:scale-110 transition-transform shadow-lg">
                <Bot className="w-8 h-8 text-white" />
              </div>
              <h3 className="text-2xl font-semibold font-poppins mb-3">OpenAI</h3>
              <p className="text-muted-foreground mb-6">
                Advanced AI for content generation, chatbots, code development, and business automation
              </p>
              <ul className="space-y-2 mb-6">
                <li className="flex items-center gap-2">
                  <CheckCircle2 className="w-4 h-4 text-primary" />
                  <span className="text-sm">GPT Models</span>
                </li>
                <li className="flex items-center gap-2">
                  <CheckCircle2 className="w-4 h-4 text-primary" />
                  <span className="text-sm">DALL-E Image Generation</span>
                </li>
                <li className="flex items-center gap-2">
                  <CheckCircle2 className="w-4 h-4 text-primary" />
                  <span className="text-sm">Natural Language Processing</span>
                </li>
              </ul>
              <Link to="/tools">
                <Button className="w-full group-hover:gap-2">
                  Learn More <ArrowRight className="ml-2 w-4 h-4" />
                </Button>
              </Link>
            </Card>

            <Card className="p-8 hover:shadow-lg transition-shadow group border-2 hover:border-accent/30">
              <div className="w-16 h-16 rounded-xl bg-gradient-to-br from-blue-500 to-cyan-600 flex items-center justify-center mb-4 group-hover:scale-110 transition-transform shadow-lg">
                <Sparkles className="w-8 h-8 text-white" />
              </div>
              <h3 className="text-2xl font-semibold font-poppins mb-3">Gemini AI</h3>
              <p className="text-muted-foreground mb-6">
                Google's powerful multimodal AI for advanced analysis, document processing, and insights
              </p>
              <ul className="space-y-2 mb-6">
                <li className="flex items-center gap-2">
                  <CheckCircle2 className="w-4 h-4 text-primary" />
                  <span className="text-sm">Multimodal Processing</span>
                </li>
                <li className="flex items-center gap-2">
                  <CheckCircle2 className="w-4 h-4 text-primary" />
                  <span className="text-sm">Long Context Understanding</span>
                </li>
                <li className="flex items-center gap-2">
                  <CheckCircle2 className="w-4 h-4 text-primary" />
                  <span className="text-sm">Real-time Processing</span>
                </li>
              </ul>
              <Link to="/tools">
                <Button className="w-full group-hover:gap-2">
                  Learn More <ArrowRight className="ml-2 w-4 h-4" />
                </Button>
              </Link>
            </Card>
          </div>
        </div>
      </section>

      {/* Portfolio Section */}
      <section className="py-20 bg-white">
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
              <Link key={item.id} to="/portfolio">
                <Card className="overflow-hidden group cursor-pointer hover:shadow-xl transition-all hover:border-primary/50 border-2 h-full">
                  <div className="aspect-video overflow-hidden">
                    <img
                      src={item.image_url}
                      alt={item.title}
                      className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-300"
                    />
                  </div>
                  <div className="p-4">
                    <h3 className="font-semibold text-lg mb-1 group-hover:text-primary transition-colors">{item.title}</h3>
                    <p className="text-sm text-muted-foreground">{item.category}</p>
                  </div>
                </Card>
              </Link>
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

      {/* Our Packages Section */}
      <section className="py-20 bg-gradient-to-br from-primary/5 via-purple-50 to-white">
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
                name: "Basic",
                price: "₹5,999",
                features: [
                  "Create Facebook and Instagram accounts",
                  "SMO (Social Media Optimization)",
                  "SMM (Facebook and Instagram ads)",
                  "12 posters, 4 videos + festival posters",
                  "Maintenance",
                  "Daily Report"
                ]
              },
              {
                name: "Standard",
                price: "₹7,499",
                popular: true,
                features: [
                  "Create Facebook, Instagram and YouTube",
                  "SMO (Social Media Optimization)",
                  "SMM (Facebook, Instagram, and YouTube ads)",
                  "12 posters, 4 videos + festival posters",
                  "YouTube SEO and maintenance",
                  "Facebook 20 groups share",
                  "WhatsApp marketing 200 numbers",
                  "Daily report"
                ]
              },
              {
                name: "Premium",
                price: "₹9,999",
                features: [
                  "Create Facebook, Instagram and YouTube",
                  "Google ads & Local SEO",
                  "GMB Setup",
                  "SMO (Social Media Optimization)",
                  "SMM (Facebook, Instagram, and YouTube ads)",
                  "12 posters, 4 videos + festival posters",
                  "5 videos editing related business promotion",
                  "YouTube SEO and maintenance",
                  "Facebook 20 groups and marketplace share",
                  "WhatsApp marketing 500 numbers",
                  "Daily report"
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
                <a href="http://wa.me/918187007475" target="_blank" rel="noopener noreferrer" className="block">
                  <Button className="w-full">Get Started</Button>
                </a>
              </Card>
            ))}
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

      {/* Terms and Conditions Section */}
      <section className="py-16 bg-white border-t">
        <div className="container mx-auto px-4">
          <div className="max-w-4xl mx-auto">
            <h2 className="text-3xl md:text-4xl font-bold font-poppins mb-8 text-center">
              Terms & <span className="text-primary">Conditions</span>
            </h2>
            <div className="space-y-6 text-muted-foreground">
              <div>
                <h3 className="text-xl font-semibold text-foreground mb-3">1. Service Agreement</h3>
                <p className="leading-relaxed">
                  By engaging Knight21's services, you agree to our terms and conditions. All services are provided as per the agreed scope of work and timeline. Any modifications to the project scope may result in additional charges.
                </p>
              </div>
              
              <div>
                <h3 className="text-xl font-semibold text-foreground mb-3">2. Payment Terms</h3>
                <p className="leading-relaxed">
                  Payment terms are specified in the service agreement. Typically, we require 50% advance payment before project commencement and the remaining 50% upon completion. All prices are subject to applicable GST.
                </p>
              </div>
              
              <div>
                <h3 className="text-xl font-semibold text-foreground mb-3">3. Intellectual Property</h3>
                <p className="leading-relaxed">
                  Upon full payment, all rights to the deliverables are transferred to the client. Knight21 retains the right to showcase the work in our portfolio unless otherwise agreed in writing.
                </p>
              </div>
              
              <div>
                <h3 className="text-xl font-semibold text-foreground mb-3">4. Refund Policy</h3>
                <p className="leading-relaxed">
                  Refunds are considered on a case-by-case basis. Once work has commenced, advance payments are non-refundable. Any refund requests must be made in writing within 7 days of project initiation.
                </p>
              </div>
              
              <div>
                <h3 className="text-xl font-semibold text-foreground mb-3">5. Confidentiality</h3>
                <p className="leading-relaxed">
                  We maintain strict confidentiality of all client information and project details. Both parties agree not to disclose confidential information to third parties without prior written consent.
                </p>
              </div>

            </div>
          </div>
        </div>
      </section>

      {/* FAQ Section */}
      <section className="py-20 bg-white">
        <div className="container mx-auto px-4">
          <div className="text-center mb-12">
            <h2 className="text-3xl md:text-4xl font-bold font-poppins mb-4">
              Frequently Asked <span className="text-primary">Questions</span>
            </h2>
            <p className="text-lg text-muted-foreground max-w-3xl mx-auto">
              Get answers to common questions about our services
            </p>
          </div>
          <div className="max-w-3xl mx-auto">
            <Accordion type="single" collapsible className="space-y-4">
              <AccordionItem value="faq-1" className="border rounded-lg px-6">
                <AccordionTrigger className="hover:no-underline">
                  <span className="text-left font-semibold">What services does Knight21 offer?</span>
                </AccordionTrigger>
                <AccordionContent className="text-muted-foreground">
                  Knight21 offers comprehensive digital marketing services including website design & development, SEO optimization, Google Ads management, social media marketing, mobile app development, content marketing, and business certificate services.
                </AccordionContent>
              </AccordionItem>

              <AccordionItem value="faq-2" className="border rounded-lg px-6">
                <AccordionTrigger className="hover:no-underline">
                  <span className="text-left font-semibold">How long does it take to build a website?</span>
                </AccordionTrigger>
                <AccordionContent className="text-muted-foreground">
                  The timeline varies based on project complexity. A basic website typically takes 2-3 weeks, while more complex websites with custom features can take 4-8 weeks. We'll provide a detailed timeline during our initial consultation.
                </AccordionContent>
              </AccordionItem>

              <AccordionItem value="faq-3" className="border rounded-lg px-6">
                <AccordionTrigger className="hover:no-underline">
                  <span className="text-left font-semibold">What are your pricing plans?</span>
                </AccordionTrigger>
                <AccordionContent className="text-muted-foreground">
                  We offer flexible pricing plans starting from our Free Plan (YouTube tutorials), 45 Days Plan at ₹8,500 + GST, and 3 Months Plan at ₹18,500 + GST with comprehensive features. Custom packages are also available based on your specific requirements.
                </AccordionContent>
              </AccordionItem>

              <AccordionItem value="faq-4" className="border rounded-lg px-6">
                <AccordionTrigger className="hover:no-underline">
                  <span className="text-left font-semibold">Do you provide SEO services?</span>
                </AccordionTrigger>
                <AccordionContent className="text-muted-foreground">
                  Yes! We offer comprehensive SEO services including on-page optimization, technical SEO, keyword research, content optimization, link building, and local SEO. Our SEO strategies are designed to improve your search rankings and drive organic traffic.
                </AccordionContent>
              </AccordionItem>

              <AccordionItem value="faq-5" className="border rounded-lg px-6">
                <AccordionTrigger className="hover:no-underline">
                  <span className="text-left font-semibold">Can you help with social media marketing?</span>
                </AccordionTrigger>
                <AccordionContent className="text-muted-foreground">
                  Absolutely! We manage social media accounts across Facebook, Instagram, LinkedIn, and YouTube. Our services include content creation, posting schedules, paid advertising, engagement management, and detailed analytics reporting.
                </AccordionContent>
              </AccordionItem>

              <AccordionItem value="faq-6" className="border rounded-lg px-6">
                <AccordionTrigger className="hover:no-underline">
                  <span className="text-left font-semibold">Do you offer training courses?</span>
                </AccordionTrigger>
                <AccordionContent className="text-muted-foreground">
                  Yes! We offer professional courses in Web Development (3-6 months) and Digital Marketing (2-4 months). Both courses include hands-on training, industry certifications, and job placement assistance.
                </AccordionContent>
              </AccordionItem>

              <AccordionItem value="faq-7" className="border rounded-lg px-6">
                <AccordionTrigger className="hover:no-underline">
                  <span className="text-left font-semibold">What is your refund policy?</span>
                </AccordionTrigger>
                <AccordionContent className="text-muted-foreground">
                  Refunds are considered on a case-by-case basis. Once work has commenced, advance payments are non-refundable. Any refund requests must be made in writing within 7 days of project initiation. Please refer to our Terms & Conditions for complete details.
                </AccordionContent>
              </AccordionItem>

              <AccordionItem value="faq-8" className="border rounded-lg px-6">
                <AccordionTrigger className="hover:no-underline">
                  <span className="text-left font-semibold">How can I get started with Knight21?</span>
                </AccordionTrigger>
                <AccordionContent className="text-muted-foreground">
                  Simply contact us through our website, WhatsApp, or phone. We'll schedule a free consultation to discuss your needs, provide a customized quote, and outline a project timeline. You can reach us at +91 8187007475.
                </AccordionContent>
              </AccordionItem>
            </Accordion>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-20 bg-gradient-to-r from-primary via-secondary to-primary text-white relative overflow-hidden">
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_30%_50%,rgba(255,255,255,0.1),transparent_50%)]"></div>
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_70%_50%,rgba(255,165,0,0.2),transparent_50%)]"></div>
        <div className="container mx-auto px-4 text-center relative z-10">
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
