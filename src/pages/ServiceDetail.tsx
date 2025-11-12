import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { ArrowRight, CheckCircle2, ArrowLeft } from "lucide-react";
import { Link, useParams } from "react-router-dom";

const serviceDetails = {
  "mobile-apps": {
    title: "Mobile Apps (Android / iOS)",
    hero: "Transform Your Business with a Powerful Mobile App",
    about: "From idea to app launch, our expert developers handle UI design, backend integration, testing, and Play Store/App Store publishing.",
    whyChooseUs: [
      "Cross-platform (Android & iOS) support",
      "Flutter & React Native options",
      "Secure payment & OTP systems",
      "Real-time tracking & push notifications",
      "Fast & scalable performance"
    ],
    process: [
      "Requirement Analysis",
      "Design & Prototype",
      "Development (Kotlin/Swift/Flutter/React Native)",
      "QA & Testing",
      "Publishing & Support"
    ],
    projects: [
      "GoRide — Car Rental App (User, Driver, Admin)",
      "ShopQuick — Grocery E-commerce App",
      "EduLearn — Online Learning App",
      "KnightFood — Food Delivery App"
    ]
  },
  "web-applications": {
    title: "Web Applications",
    hero: "Build Powerful Web Solutions for Your Business",
    about: "Our team creates responsive, scalable web applications using modern technologies like React, Node.js, and cloud platforms.",
    whyChooseUs: [
      "Custom web application development",
      "Responsive and mobile-friendly design",
      "Secure authentication and data handling",
      "API integration and development",
      "Cloud deployment and scaling"
    ],
    process: [
      "Requirements Gathering",
      "Architecture Planning",
      "Frontend & Backend Development",
      "Testing & Quality Assurance",
      "Deployment & Maintenance"
    ],
    projects: [
      "Knight21 Admin Portal — Business Management System",
      "EduPortal — Learning Management System",
      "ShopHub — E-commerce Platform"
    ]
  },
  "gst-msme-registration": {
    title: "GST & MSME Registration",
    hero: "Start Your Business Legally — GST & MSME Registration Made Easy!",
    about: "We provide complete support for small and medium businesses in GST and MSME registration — from documentation to final certificate delivery. Our experts ensure 100% accuracy, legal compliance, and fast approval timelines.",
    whyChooseUs: [
      "Quick & hassle-free online process",
      "Expert documentation support",
      "Transparent & affordable pricing",
      "Lifetime registration guidance",
      "Dedicated post-registration helpdesk"
    ],
    process: [
      "Document collection & verification",
      "Application form preparation",
      "Online portal submission (GST/MSME)",
      "Government approval tracking",
      "Certificate delivery via email/PDF"
    ],
    projects: [
      "Local Manufacturer – MSME registration for tender eligibility",
      "Freelancer/Trader – GST registration for online business",
      "E-commerce Vendor – Dual GST + MSME registration"
    ]
  },
  "company-formation": {
    title: "Company Formation",
    hero: "Start Your Dream Company with Us — Pvt Ltd, LLP, OPC & More",
    about: "From private limited companies to LLPs, our experts register your business under the Ministry of Corporate Affairs. We provide end-to-end support — including DSC, DIN, PAN, TAN, and incorporation certificate delivery.",
    whyChooseUs: [
      "Pvt Ltd, LLP, OPC, Partnership setup",
      "Fast and 100% online registration",
      "PAN, TAN & DIN included",
      "Guidance on name approval & legal docs",
      "Post-registration support for startups"
    ],
    process: [
      "Choose company type",
      "Submit director/partner documents",
      "Apply for DSC & Name Approval",
      "File incorporation with MCA",
      "Receive company incorporation certificate"
    ],
    projects: [
      "Knight21 Digi Hub Pvt Ltd – IT & Marketing Company",
      "Green Home Property LLP – Real estate company",
      "RN Pickles Pvt Ltd – Food manufacturing firm"
    ]
  },
  "tax-compliance": {
    title: "Tax & Compliance",
    hero: "Stay Compliant, Stay Confident — Tax Filing & Legal Compliance",
    about: "Our accounting and taxation experts handle GST filings, ITR, and ROC compliance. We help businesses avoid penalties by ensuring accurate and timely submissions to government portals.",
    whyChooseUs: [
      "GST, ITR, TDS & ROC filing",
      "Monthly, quarterly & annual returns",
      "Tax notice handling & support",
      "Expert CA team available 24/7",
      "Affordable pricing packages"
    ],
    process: [
      "Collect financial documents",
      "Prepare returns & statements",
      "File on government portals",
      "Track acknowledgement & status",
      "Provide compliance reports"
    ],
    projects: [
      "E-commerce Business — Complete GST & ITR management",
      "Manufacturing Unit — ROC annual compliance",
      "Service Provider — TDS filing & compliance"
    ]
  },
  "import-export-licenses": {
    title: "Import-Export Licenses",
    hero: "Expand Your Business Globally — IEC & Trade Licenses",
    about: "We help businesses obtain Import-Export Codes (IEC), RCMC, and other trade licenses required for international business operations.",
    whyChooseUs: [
      "IEC registration in 5-7 days",
      "RCMC & trade licenses",
      "Expert customs documentation",
      "Import-export consulting",
      "Post-license support"
    ],
    process: [
      "Document verification",
      "IEC application filing",
      "DGFT portal submission",
      "Certificate download",
      "Trade license guidance"
    ],
    projects: [
      "Textile Exporter — IEC & RCMC registration",
      "Electronics Importer — Complete documentation support",
      "Agricultural Products — Export license processing"
    ]
  },
  "business-consultancy": {
    title: "Business Consultancy",
    hero: "Expert Business Guidance for Growth & Success",
    about: "Professional business consulting services to help you make informed decisions, streamline operations, and achieve sustainable growth.",
    whyChooseUs: [
      "Experienced business consultants",
      "Market research & analysis",
      "Business plan development",
      "Financial advisory services",
      "Growth strategy planning"
    ],
    process: [
      "Initial business assessment",
      "Market & competitor analysis",
      "Strategy development",
      "Implementation planning",
      "Ongoing support & monitoring"
    ],
    projects: [
      "Startup Launch — Complete business setup guidance",
      "SME Growth — Expansion strategy consulting",
      "Business Turnaround — Operational improvement"
    ]
  },
  "social-media-marketing": {
    title: "Social Media Marketing",
    hero: "Boost Your Brand with Powerful Social Media Strategies",
    about: "Engage your audience and build your brand across all major social platforms with data-driven campaigns and creative content.",
    whyChooseUs: [
      "Platform expertise (Facebook, Instagram, LinkedIn, Twitter)",
      "Creative content creation",
      "Community management",
      "Paid advertising campaigns",
      "Analytics and reporting"
    ],
    process: [
      "Social media audit",
      "Strategy development",
      "Content calendar creation",
      "Campaign execution",
      "Performance monitoring & optimization"
    ],
    projects: [
      "Fashion Brand — 250% increase in engagement",
      "Restaurant Chain — Viral social media campaigns",
      "Tech Startup — LinkedIn lead generation"
    ]
  },
  "seo-optimization": {
    title: "SEO Optimization",
    hero: "Rank Higher on Google — Professional SEO Services",
    about: "Boost your visibility and drive organic traffic with comprehensive SEO strategies tailored to your business goals.",
    whyChooseUs: [
      "Technical SEO audits",
      "On-page optimization",
      "Quality link building",
      "Local SEO services",
      "Content optimization"
    ],
    process: [
      "Website audit & analysis",
      "Keyword research",
      "On-page optimization",
      "Link building campaigns",
      "Monthly reporting & adjustments"
    ],
    projects: [
      "E-commerce Store — 300% traffic increase in 6 months",
      "Local Business — First page Google rankings",
      "Service Provider — National SEO success"
    ]
  },
  "google-ads": {
    title: "Google Ads (PPC)",
    hero: "Drive Results with Targeted Google Ads Campaigns",
    about: "Generate quality leads and maximize ROI with expertly managed Google Ads campaigns.",
    whyChooseUs: [
      "Google Ads certified experts",
      "Advanced keyword research",
      "A/B testing & optimization",
      "Conversion tracking setup",
      "Transparent reporting"
    ],
    process: [
      "Campaign strategy planning",
      "Account setup & configuration",
      "Ad creation & copywriting",
      "Bid management & optimization",
      "Performance analysis & scaling"
    ],
    projects: [
      "Real Estate — 150+ quality leads per month",
      "Education Institute — 80% reduction in cost per lead",
      "Healthcare Services — 5x ROI on ad spend"
    ]
  },
  "content-marketing": {
    title: "Content Marketing",
    hero: "Compelling Content That Converts",
    about: "Engage your audience with high-quality content that drives traffic, builds authority, and converts visitors into customers.",
    whyChooseUs: [
      "SEO-optimized content",
      "Blog writing & management",
      "Video content creation",
      "Email newsletter campaigns",
      "Content strategy development"
    ],
    process: [
      "Content audit & planning",
      "Topic research & ideation",
      "Content creation & editing",
      "Distribution & promotion",
      "Performance tracking"
    ],
    projects: [
      "Tech Blog — 200k+ monthly readers",
      "B2B Company — Thought leadership content",
      "E-commerce Brand — Product content optimization"
    ]
  },
  "email-whatsapp-marketing": {
    title: "Email & WhatsApp Marketing",
    hero: "Direct Marketing That Delivers Results",
    about: "Reach your customers effectively with personalized email and WhatsApp marketing campaigns.",
    whyChooseUs: [
      "Advanced segmentation",
      "Automation workflows",
      "Personalized messaging",
      "WhatsApp Business API integration",
      "Detailed analytics"
    ],
    process: [
      "Audience segmentation",
      "Campaign strategy",
      "Template design & creation",
      "Automated deployment",
      "Performance optimization"
    ],
    projects: [
      "Retail Store — 35% email open rate",
      "Service Provider — WhatsApp booking system",
      "E-commerce — Abandoned cart recovery campaign"
    ]
  }
};

export default function ServiceDetail() {
  const { slug } = useParams<{ slug: string }>();
  const service = slug ? serviceDetails[slug as keyof typeof serviceDetails] : null;

  if (!service) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="text-center">
          <h1 className="text-3xl font-bold mb-4">Service Not Found</h1>
          <Link to="/services">
            <Button>Back to Services</Button>
          </Link>
        </div>
      </div>
    );
  }

  return (
    <div className="font-outfit">
      {/* Hero Section */}
      <section className="bg-gradient-hero pattern-dots py-20 relative overflow-hidden">
        <div className="absolute inset-0 bg-gradient-mesh"></div>
        <div className="container mx-auto px-4 relative z-10">
          <div className="max-w-4xl mx-auto">
            <Link to="/services" className="inline-flex items-center text-primary hover:gap-2 transition-all mb-6">
              <ArrowLeft className="w-4 h-4 mr-1" /> Back to Services
            </Link>
            <h1 className="text-4xl md:text-6xl font-bold font-poppins mb-6 animate-fade-in">
              {service.hero}
            </h1>
          </div>
        </div>
      </section>

      {/* About Section */}
      <section className="py-20 bg-white">
        <div className="container mx-auto px-4">
          <div className="max-w-4xl mx-auto">
            <h2 className="text-3xl md:text-4xl font-bold font-poppins mb-6">About This Service</h2>
            <p className="text-lg text-muted-foreground">{service.about}</p>
          </div>
        </div>
      </section>

      {/* Why Choose Us */}
      <section className="py-20 bg-gray-50">
        <div className="container mx-auto px-4">
          <div className="max-w-4xl mx-auto">
            <h2 className="text-3xl md:text-4xl font-bold font-poppins mb-8">Why Choose Us</h2>
            <div className="grid md:grid-cols-2 gap-4">
              {service.whyChooseUs.map((item, index) => (
                <Card key={index} className="p-4 flex items-start gap-3">
                  <CheckCircle2 className="w-5 h-5 text-primary flex-shrink-0 mt-0.5" />
                  <span>{item}</span>
                </Card>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* Process */}
      <section className="py-20 bg-white">
        <div className="container mx-auto px-4">
          <div className="max-w-4xl mx-auto">
            <h2 className="text-3xl md:text-4xl font-bold font-poppins mb-8">Our Process</h2>
            <div className="space-y-4">
              {service.process.map((step, index) => (
                <Card key={index} className="p-6 flex items-center gap-4 hover:shadow-lg transition-shadow">
                  <div className="w-12 h-12 rounded-full bg-gradient-to-br from-primary to-secondary flex items-center justify-center text-white font-bold flex-shrink-0">
                    {index + 1}
                  </div>
                  <span className="text-lg font-medium">{step}</span>
                </Card>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* Real-Time Projects */}
      <section className="py-20 bg-gray-50">
        <div className="container mx-auto px-4">
          <div className="max-w-4xl mx-auto">
            <h2 className="text-3xl md:text-4xl font-bold font-poppins mb-8">Real-Time Project Examples</h2>
            <div className="grid md:grid-cols-2 gap-6">
              {service.projects.map((project, index) => (
                <Card key={index} className="p-6 hover:shadow-lg transition-shadow">
                  <div className="flex items-start gap-3">
                    <CheckCircle2 className="w-5 h-5 text-primary flex-shrink-0 mt-1" />
                    <p className="text-muted-foreground">{project}</p>
                  </div>
                </Card>
              ))}
            </div>
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
            Let's discuss how we can help with {service.title}
          </p>
          <Link to="/contact">
            <Button size="lg" variant="secondary">
              Contact Us Today <ArrowRight className="ml-2 w-4 h-4" />
            </Button>
          </Link>
        </div>
      </section>
    </div>
  );
}
