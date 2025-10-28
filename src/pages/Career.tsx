import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Briefcase, MapPin, Clock } from "lucide-react";
import { Link } from "react-router-dom";

const jobOpenings = [
  {
    title: "Digital Marketing Executive",
    type: "Full-time",
    location: "Kakinada / Remote",
    experience: "1-3 years",
    description: "We're looking for a creative digital marketer to manage campaigns, SEO, and social media strategies.",
  },
  {
    title: "Web Developer",
    type: "Full-time",
    location: "Kakinada / Remote",
    experience: "2-4 years",
    description: "Join our team to build responsive, modern websites using latest technologies.",
  },
  {
    title: "Graphic Designer",
    type: "Full-time",
    location: "Kakinada",
    experience: "1-2 years",
    description: "Create stunning visual content for social media, websites, and marketing materials.",
  },
  {
    title: "Content Writer",
    type: "Full-time",
    location: "Remote",
    experience: "1-3 years",
    description: "Write engaging content for blogs, websites, and social media platforms.",
  },
  {
    title: "SEO Specialist",
    type: "Full-time",
    location: "Kakinada / Remote",
    experience: "2-4 years",
    description: "Optimize websites for search engines and drive organic traffic growth.",
  },
];

export default function Career() {
  return (
    <div className="font-outfit">
      {/* Hero Section */}
      <section className="bg-gradient-to-br from-gray-50 to-white py-20">
        <div className="container mx-auto px-4">
          <div className="max-w-4xl mx-auto text-center space-y-6">
            <h1 className="text-4xl md:text-6xl font-bold font-poppins">
              Join Our <span className="text-primary">Team</span>
            </h1>
            <p className="text-xl text-muted-foreground">
              Build your career with Knight21 and be part of an innovative digital marketing team
            </p>
          </div>
        </div>
      </section>

      {/* Why Work With Us */}
      <section className="py-16 bg-white">
        <div className="container mx-auto px-4">
          <h2 className="text-3xl md:text-4xl font-bold font-poppins text-center mb-12">
            Why Work With <span className="text-primary">Knight21?</span>
          </h2>
          <div className="grid md:grid-cols-3 gap-6 max-w-5xl mx-auto">
            {[
              { title: "Growth Opportunities", description: "Continuous learning and career advancement" },
              { title: "Creative Environment", description: "Work on exciting projects with creative freedom" },
              { title: "Work-Life Balance", description: "Flexible working hours and remote options" },
              { title: "Competitive Salary", description: "Industry-standard compensation packages" },
              { title: "Team Culture", description: "Collaborative and supportive work environment" },
              { title: "Skill Development", description: "Regular training and upskilling opportunities" },
            ].map((benefit, index) => (
              <Card key={index} className="p-6 text-center hover:shadow-lg transition-shadow">
                <h3 className="text-xl font-semibold font-poppins mb-2">{benefit.title}</h3>
                <p className="text-muted-foreground">{benefit.description}</p>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* Job Openings */}
      <section className="py-20 bg-gray-50">
        <div className="container mx-auto px-4">
          <h2 className="text-3xl md:text-4xl font-bold font-poppins text-center mb-12">
            Current <span className="text-primary">Openings</span>
          </h2>
          <div className="max-w-4xl mx-auto space-y-6">
            {jobOpenings.map((job, index) => (
              <Card key={index} className="p-6 hover:shadow-lg transition-shadow">
                <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
                  <div className="flex-1">
                    <h3 className="text-2xl font-bold font-poppins mb-3">{job.title}</h3>
                    <div className="flex flex-wrap gap-4 mb-3 text-sm text-muted-foreground">
                      <div className="flex items-center gap-1">
                        <Briefcase className="w-4 h-4" />
                        <span>{job.type}</span>
                      </div>
                      <div className="flex items-center gap-1">
                        <MapPin className="w-4 h-4" />
                        <span>{job.location}</span>
                      </div>
                      <div className="flex items-center gap-1">
                        <Clock className="w-4 h-4" />
                        <span>{job.experience}</span>
                      </div>
                    </div>
                    <p className="text-muted-foreground">{job.description}</p>
                  </div>
                  <Link to="/contact">
                    <Button>Apply Now</Button>
                  </Link>
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
            Don't See Your Role?
          </h2>
          <p className="text-xl mb-8 opacity-90">
            We're always looking for talented individuals. Send us your resume!
          </p>
          <Link to="/contact">
            <Button size="lg" variant="secondary">
              Contact Us
            </Button>
          </Link>
        </div>
      </section>
    </div>
  );
}
