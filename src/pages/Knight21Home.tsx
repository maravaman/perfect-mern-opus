import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { ArrowRight, Star, CheckCircle2 } from "lucide-react";
import { Link } from "react-router-dom";

const services = [
  {
    number: "01",
    title: "Website Designing",
    description: "A strong website is the foundation of your online presence. Our responsive, SEO-friendly websites are designed to attract and convert visitors."
  },
  {
    number: "02",
    title: "SEO Management",
    description: "Reach the top of search engines and attract more organic traffic with proven, data-driven optimization strategies."
  },
  {
    number: "03",
    title: "Google Ads",
    description: "With targeted pay-per-click campaigns, we help you reach the right audience at the right time and maximize your return on investment."
  },
  {
    number: "04",
    title: "Social Media Marketing",
    description: "Engage your audience and grow your brand across all major social media platforms – Facebook, Instagram, LinkedIn, Youtube, Twitter and more."
  },
  {
    number: "05",
    title: "Content Marketing",
    description: "Our team develops valuable, relevant content that informs, engages, and drives action – helping you build trust and authority in your niche."
  },
  {
    number: "06",
    title: "Social Media Maintenance",
    description: "We manage and maintain your social media profiles with consistent, engaging content, timely responses, and regular performance tracking."
  },
  {
    number: "07",
    title: "Mobile App Development",
    description: "From concept to launch, we build responsive, feature-rich mobile apps that enhance user experiences and grow your business."
  },
  {
    number: "08",
    title: "Professional Online Training",
    description: "We offer hands-on Online training in Digital Marketing and Website Designing & Development to help individuals and businesses upskill."
  },
  {
    number: "09",
    title: "Buy Pro Tools Online",
    description: "Upgrade your digital toolkit with our premium marketing and development tools. Browse, choose, and buy the best pro tools to boost your productivity."
  }
];

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
            {services.map((service) => (
              <Card key={service.number} className="p-6 hover:shadow-lg transition-shadow">
                <div className="text-4xl font-bold text-primary/20 mb-4">{service.number}</div>
                <h3 className="text-xl font-semibold font-poppins mb-3">{service.title}</h3>
                <p className="text-muted-foreground mb-4">{service.description}</p>
                <Link to="/services" className="text-primary font-medium inline-flex items-center hover:gap-2 transition-all">
                  LEARN MORE… <ArrowRight className="w-4 h-4 ml-1" />
                </Link>
              </Card>
            ))}
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

      {/* Who We Serve */}
      <section className="py-16 bg-gray-50">
        <div className="container mx-auto px-4">
          <h2 className="text-3xl md:text-4xl font-bold font-poppins text-center mb-8">
            Industries We <span className="text-primary">Serve</span>
          </h2>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-6 max-w-4xl mx-auto">
            {[
              { name: "Schools", icon: "🎓" },
              { name: "Restaurants", icon: "🍽️" },
              { name: "Colleges", icon: "🏫" },
              { name: "Hospitals", icon: "🏥" }
            ].map((category) => (
              <Link key={category.name} to="/portfolio">
                <Card className="p-6 text-center hover:shadow-lg transition-shadow cursor-pointer group">
                  <div className="text-4xl mb-3 group-hover:scale-110 transition-transform">{category.icon}</div>
                  <p className="font-semibold text-lg">{category.name}</p>
                </Card>
              </Link>
            ))}
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
