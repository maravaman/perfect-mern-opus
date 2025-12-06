import { Card } from "@/components/ui/card";
import { CheckCircle2, Star } from "lucide-react";
import { Link } from "react-router-dom";
import { useQuery } from "@tanstack/react-query";
import { supabase } from "@/integrations/supabase/client";

export default function Knight21About() {
  const { data: teamMembers } = useQuery({
    queryKey: ["team_members"],
    queryFn: async () => {
      const { data, error } = await supabase
        .from("team_members")
        .select("*")
        .eq("active", true)
        .order("display_order", { ascending: true });
      if (error) throw error;
      return data;
    },
  });

  const renderStars = (rating: string) => {
    const numRating = parseFloat(rating) || 0;
    const fullStars = Math.floor(numRating);
    const hasHalfStar = numRating % 1 >= 0.5;
    
    return (
      <div className="flex justify-center gap-1 mb-2">
        {[...Array(fullStars)].map((_, i) => (
          <Star key={i} className="w-5 h-5 fill-yellow-400 text-yellow-400" />
        ))}
        {hasHalfStar && (
          <Star className="w-5 h-5 fill-yellow-400 text-yellow-400" style={{ clipPath: "inset(0 50% 0 0)" }} />
        )}
      </div>
    );
  };

  return (
    <div className="font-outfit">
      {/* Hero Section */}
      <section className="bg-gradient-hero pattern-dots py-20 relative overflow-hidden">
        <div className="absolute inset-0 bg-gradient-mesh"></div>
        <div className="container mx-auto px-4 relative z-10">
          <div className="max-w-4xl mx-auto text-center space-y-6 animate-fade-in">
            <h1 className="text-4xl md:text-6xl font-bold font-poppins">
              About <span className="text-gradient">Us</span>
            </h1>
            <p className="text-xl text-muted-foreground">
              Your Digital Growth Partner
            </p>
          </div>
        </div>
      </section>

      {/* Company Story */}
      <section className="py-20 bg-white pattern-grid relative">
        <div className="absolute inset-0 bg-gradient-mesh opacity-30"></div>
        <div className="container mx-auto px-4 relative z-10">
          <div className="max-w-4xl mx-auto space-y-8">
            <div className="animate-fade-in">
              <h2 className="text-3xl md:text-4xl font-bold font-poppins mb-6">
                Welcome to <span className="text-gradient">Knight21</span>
              </h2>
              <p className="text-lg text-muted-foreground leading-relaxed mb-4">
                Where creativity meets strategy, and innovation powers results. We are a passionate team of Digital Marketing, designers, and strategists with over 3 years of proven experience in helping businesses grow online.
              </p>
              <p className="text-lg text-muted-foreground leading-relaxed">
                With a portfolio of 100+ successfully delivered projects, we've become a trusted partner for startups, small businesses, and enterprises seeking to make a bold impact in the digital world.
              </p>
            </div>

            <div className="grid md:grid-cols-2 gap-6">
              <Card className="p-6 glass-card border-2 border-primary/10 hover:border-primary/30 hover:shadow-card-hover transition-all animate-slide-up">
                <h3 className="text-2xl font-bold font-poppins mb-4 text-gradient">Who We Are</h3>
                <p className="text-muted-foreground">
                  Founded in 2023, Knight21 was born out of a vision to help brands navigate the ever-evolving digital landscape. In just a few years, we've grown from a small team with big dreams to a full-fledged Digi Hub offering end-to-end solutions in website design, SEO, Google Ads, social media marketing, Digital Marketing courses, and more.
                </p>
                <p className="text-muted-foreground mt-4">
                  Every member of our team brings a unique skill set to the table, from UI/UX designers to performance marketers, working together to craft powerful digital experiences that drive real, measurable results.
                </p>
              </Card>

              <Card className="p-6 bg-gradient-to-br from-primary to-secondary text-primary-foreground shadow-lg hover:shadow-card-hover transition-all animate-slide-up" style={{animationDelay: '0.1s'}}>
                <div className="text-6xl font-bold mb-4">3+</div>
                <p className="text-xl font-semibold mb-2">Years of Experience</p>
                <p className="text-primary-foreground/90">in Website Designing & Digital Marketing</p>
              </Card>
            </div>
          </div>
        </div>
      </section>

      {/* Why Choose Us */}
      <section className="py-20 bg-gradient-hero pattern-dots relative overflow-hidden">
        <div className="absolute inset-0 bg-gradient-mesh"></div>
        <div className="container mx-auto px-4 relative z-10">
          <div className="max-w-4xl mx-auto">
            <h2 className="text-3xl md:text-4xl font-bold font-poppins text-center mb-12">
              Why Choose <span className="text-gradient">Us</span>
            </h2>
            <div className="grid md:grid-cols-2 gap-4">
              {[
                "3+ Years of Expertise in Website Designing & Digital Marketing",
                "100+ Projects Delivered with measurable ROI",
                "Customized Strategies tailored to your business goals",
                "Creative + Technical Team under one roof",
                "Transparent Communication and result-focused approach",
                "Affordable Packages without compromising on quality"
              ].map((item, index) => (
                <div key={index} className="flex items-start gap-3 p-4 glass-card rounded-lg border-2 border-primary/10 hover:border-primary/30 hover:shadow-card-hover transition-all animate-slide-up" style={{animationDelay: `${index * 0.05}s`}}>
                  <CheckCircle2 className="w-6 h-6 text-primary flex-shrink-0 mt-0.5" />
                  <span className="text-muted-foreground">{item}</span>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* Team Section */}
      <section className="py-20 bg-white pattern-grid relative">
        <div className="absolute inset-0 bg-gradient-mesh opacity-30"></div>
        <div className="container mx-auto px-4 relative z-10">
          <h2 className="text-3xl md:text-4xl font-bold font-poppins text-center mb-12">
            Meet Our <span className="text-gradient">Team</span>
          </h2>
          <div className="max-w-4xl mx-auto grid md:grid-cols-2 lg:grid-cols-3 gap-6">
            {teamMembers && teamMembers.length > 0 ? (
              teamMembers.map((member, index) => (
                <Card key={member.id} className="p-8 glass-card border-2 border-primary/10 hover:shadow-card-hover transition-all animate-fade-in" style={{animationDelay: `${index * 0.1}s`}}>
                  <div className="text-center">
                    <div className="mb-6">
                      {member.image_url ? (
                        <img 
                          src={member.image_url} 
                          alt={member.name} 
                          className="w-24 h-24 rounded-full mx-auto mb-4 object-cover shadow-lg"
                        />
                      ) : (
                        <div className="w-24 h-24 bg-gradient-to-br from-primary to-secondary rounded-full mx-auto mb-4 flex items-center justify-center text-primary-foreground text-3xl font-bold shadow-lg">
                          {member.name.charAt(0)}
                        </div>
                      )}
                      <h3 className="text-2xl font-bold font-poppins">{member.name}</h3>
                      <p className="text-muted-foreground">{member.role}</p>
                    </div>
                    {member.bio && (
                      <p className="text-sm text-muted-foreground mb-4">{member.bio}</p>
                    )}
                    {member.rating && renderStars(member.rating)}
                    {member.reviews_count && (
                      <p className="text-lg font-semibold text-gradient">({member.reviews_count})</p>
                    )}
                  </div>
                </Card>
              ))
            ) : (
              <Card className="p-8 glass-card border-2 border-primary/10 hover:shadow-card-hover transition-all animate-fade-in col-span-full max-w-md mx-auto">
                <div className="text-center">
                  <div className="mb-6">
                    <div className="w-24 h-24 bg-gradient-to-br from-primary to-secondary rounded-full mx-auto mb-4 flex items-center justify-center text-primary-foreground text-3xl font-bold shadow-lg">
                      V
                    </div>
                    <h3 className="text-2xl font-bold font-poppins">Vennela</h3>
                    <p className="text-muted-foreground">CEO, Head Director</p>
                  </div>
                  <div className="flex justify-center gap-1 mb-2">
                    {[1, 2, 3, 4].map((i) => (
                      <Star key={i} className="w-5 h-5 fill-yellow-400 text-yellow-400" />
                    ))}
                    <Star className="w-5 h-5 fill-yellow-400 text-yellow-400" style={{ clipPath: "inset(0 50% 0 0)" }} />
                  </div>
                  <p className="text-lg font-semibold text-gradient">(15k+ Positive Reviews)</p>
                </div>
              </Card>
            )}
          </div>
        </div>
      </section>

      {/* What We Do */}
      <section className="py-20 bg-gradient-hero pattern-dots relative overflow-hidden">
        <div className="absolute inset-0 bg-gradient-mesh"></div>
        <div className="container mx-auto px-4 relative z-10">
          <h2 className="text-3xl md:text-4xl font-bold font-poppins text-center mb-12">
            What We <span className="text-gradient">Do</span>
          </h2>
          <div className="grid md:grid-cols-2 gap-6 max-w-4xl mx-auto">
            {[
              {
                title: "Website Designing & Development",
                description: "Stunning, responsive websites that deliver seamless user experiences across devices built with performance, speed, and design in mind.",
                link: "/services"
              },
              {
                title: "Digital Marketing Services",
                description: "Data-driven strategies including SEO, Google Ads, and content marketing to attract, engage, and convert your ideal audience.",
                link: "/services"
              },
              {
                title: "Social Media Marketing & Management",
                description: "From campaign planning to daily content, we manage your brand's voice across platforms like Instagram, Facebook, LinkedIn, and more.",
                link: "/services"
              },
              {
                title: "CA Services",
                description: "Complete chartered accountant services including MSME registration, GST filing, trademark registration, and business compliance.",
                link: "/services"
              },
              {
                title: "Online Training & Consultation",
                description: "We empower individuals and businesses with knowledge through workshops and custom digital training in web design, digital marketing, and paid media.",
                link: "/services"
              }
            ].map((service, index) => (
              <Link key={index} to={service.link}>
                <Card className="p-6 glass-card border-2 border-primary/10 hover:border-primary/30 hover:shadow-card-hover transition-all cursor-pointer group animate-slide-up" style={{animationDelay: `${index * 0.1}s`}}>
                  <div className="flex items-start gap-3">
                    <Star className="w-6 h-6 text-primary flex-shrink-0 mt-1 group-hover:scale-110 transition-transform" />
                    <div>
                      <h3 className="text-xl font-semibold font-poppins mb-2 group-hover:text-primary transition-colors">{service.title}</h3>
                      <p className="text-muted-foreground">{service.description}</p>
                    </div>
                  </div>
                </Card>
              </Link>
            ))}
          </div>
        </div>
      </section>

      {/* Mission & Vision */}
      <section className="py-20 bg-white pattern-grid relative">
        <div className="absolute inset-0 bg-gradient-mesh opacity-30"></div>
        <div className="container mx-auto px-4 relative z-10">
          <div className="grid md:grid-cols-2 gap-8 max-w-5xl mx-auto">
            <Card className="p-8 glass-card border-2 border-primary/20 hover:border-primary/40 hover:shadow-card-hover transition-all animate-slide-up">
              <h3 className="text-2xl font-bold font-poppins mb-4 text-gradient">Our Mission</h3>
              <p className="text-muted-foreground leading-relaxed">
                Our mission is simple – to empower businesses of all sizes with result-oriented digital solutions that deliver growth, visibility, and long-term value. We believe every brand has a story, and our job is to tell that story through impactful design and strategic digital execution.
              </p>
            </Card>
            <Card className="p-8 glass-card border-2 border-secondary/20 hover:border-secondary/40 hover:shadow-card-hover transition-all animate-slide-up" style={{animationDelay: '0.1s'}}>
              <h3 className="text-2xl font-bold font-poppins mb-4 text-gradient">Our Vision</h3>
              <p className="text-muted-foreground leading-relaxed">
                To be recognized as one of the most reliable and creative digital marketing agencies, known for delivering innovative, affordable, and scalable solutions that help brands grow with confidence in the digital space.
              </p>
            </Card>
          </div>
        </div>
      </section>
    </div>
  );
}