import { Card } from "@/components/ui/card";
import { CheckCircle2 } from "lucide-react";

const services = [
  {
    title: "Website Designing",
    description: "Your website is your online identity. We create modern, responsive, and SEO friendly websites that reflect your brand and engage your visitors. From single page websites to complex e-commerce platforms, our web design team brings your vision to life with stunning layouts, easy navigation, and strong calls to action.",
    features: [
      "Business & Portfolio Websites",
      "E-Commerce Websites",
      "Landing Pages",
      "Custom Web Applications",
      "Domain & Hosting Support"
    ]
  },
  {
    title: "Search Engine Optimization",
    description: "Appear on the first page of Google and dominate your industry with our result driven SEO strategies. We offer on-page, off-page, and technical SEO services to help you get higher rankings, increase organic traffic, and attract qualified leads.",
    features: [
      "Keyword Research",
      "Competitor Analysis",
      "Technical SEO Audits",
      "On-Page Optimization",
      "Backlink Building",
      "Local SEO & Google Business Setup",
      "Monthly SEO Reports"
    ]
  },
  {
    title: "Google Ads",
    description: "Get instant visibility on Google with our expertly managed Google Ads campaigns. We create compelling ad copy, manage bidding strategies, and continuously optimize campaigns for better ROI.",
    features: [
      "Search Ads",
      "Display Ads",
      "Shopping Ads",
      "Remarketing Campaigns",
      "YouTube Video Ads",
      "Conversion Tracking",
      "Budget Optimization"
    ]
  },
  {
    title: "Social Media Marketing",
    description: "We build your brand on platforms like Facebook, Instagram, LinkedIn, and Twitter with engaging content, paid ads, and audience interaction strategies. Whether you're launching a product or building a loyal customer base, we make your social media shine.",
    features: [
      "Profile Setup & Optimization",
      "Paid Campaigns (Meta Ads)",
      "Influencer Collaboration",
      "Lead Generation Campaigns",
      "Performance Reporting"
    ]
  },
  {
    title: "Content Marketing",
    description: "Content is the king, and we are the kingmakers. Our content team develops well-structured, SEO-optimized content that educates, entertains, and converts. From blogs to website content to ad copy – we write it all.",
    features: [
      "Blog Writing",
      "Website Page Content",
      "SEO Articles",
      "Ad Copy & Creatives",
      "Social Media Captions",
      "Email Campaigns"
    ]
  },
  {
    title: "Social Media Maintenance",
    description: "We don't just market – we maintain your brand presence. Our Social Media Maintenance services ensure your profiles stay active, engaging, and on-trend. This includes regular posting, designing creative visuals, and replying to messages/comments.",
    features: [
      "Monthly Content Calendars",
      "Daily Posting & Hashtags",
      "Festival & Event Creatives",
      "Community Management",
      "Weekly Performance Reports"
    ]
  },
  {
    title: "Mobile App Development",
    description: "Need a mobile app to engage your users on the go? We design and develop custom Android and iOS applications with interactive user interfaces and smart features. From eCommerce apps to service-based apps, we cover all.",
    features: [
      "Native & Hybrid App Development",
      "UI/UX Design for Mobile",
      "App Store Publishing",
      "API Integration",
      "App Maintenance & Support"
    ]
  },
  {
    title: "Website Designing and Digital Marketing Online Training",
    description: "Want to learn how to design websites or run digital marketing campaigns like a pro? Join our hands-on, beginner-to-advanced Online Training Programs. Get certified, learn from experienced trainers, and build real-time projects.",
    features: [
      "Website Designing",
      "Digital Marketing Master Course",
      "SEO, Google Ads & Social Media",
      "Content Writing & Branding",
      "Freelancing & Client Handling Skills",
      "One-on-One Doubt Sessions"
    ]
  },
  {
    title: "Buy Pro Tools",
    description: "Now, you can buy premium digital tools directly from our website at affordable prices. These tools can boost your design, marketing, and productivity.",
    features: [
      "Canva",
      "Chat GPT",
      "SEO & Keyword Research Tools"
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
          <div className="max-w-6xl mx-auto space-y-16">
            {services.map((service, index) => (
              <div key={index} className={`grid md:grid-cols-2 gap-8 items-center ${index % 2 === 1 ? 'md:flex-row-reverse' : ''}`}>
                <div className={`${index % 2 === 1 ? 'md:order-2' : ''}`}>
                  <div className="text-6xl font-bold text-primary/10 mb-4">
                    {String(index + 1).padStart(2, '0')}
                  </div>
                  <h2 className="text-3xl font-bold font-poppins mb-4">{service.title}</h2>
                  <p className="text-muted-foreground leading-relaxed mb-6">
                    {service.description}
                  </p>
                  {service.features.length > 0 && (
                    <div>
                      <h3 className="font-semibold mb-3">
                        {service.title.includes("Training") ? "Courses We Offer:" : 
                         service.title.includes("Tools") ? "Available Tools:" : 
                         `Our ${service.title} Services Include:`}
                      </h3>
                      <ul className="space-y-2">
                        {service.features.map((feature, fIndex) => (
                          <li key={fIndex} className="flex items-start gap-2">
                            <CheckCircle2 className="w-5 h-5 text-primary flex-shrink-0 mt-0.5" />
                            <span className="text-muted-foreground">{feature}</span>
                          </li>
                        ))}
                      </ul>
                    </div>
                  )}
                </div>
                <Card className={`p-8 bg-gradient-to-br from-gray-50 to-white ${index % 2 === 1 ? 'md:order-1' : ''}`}>
                  <div className="aspect-video bg-gradient-to-br from-primary/20 to-primary/5 rounded-lg flex items-center justify-center">
                    <div className="text-4xl font-bold text-primary/20">{service.title}</div>
                  </div>
                </Card>
              </div>
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
