import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { CheckCircle2, Clock, Users, Award } from "lucide-react";
import { Link } from "react-router-dom";

export default function DigitalMarketingCourse() {
  const modules = [
    "Introduction to Digital Marketing",
    "Search Engine Optimization (SEO)",
    "Google Ads & PPC",
    "Social Media Marketing",
    "Facebook & Instagram Ads",
    "Email Marketing",
    "Content Marketing",
    "Google Analytics",
    "Marketing Automation",
    "Affiliate Marketing",
    "Lead Generation Strategies",
    "Real-time Projects"
  ];

  return (
    <div className="font-outfit">
      {/* Hero Section */}
      <section className="bg-gradient-to-br from-gray-50 to-white py-20">
        <div className="container mx-auto px-4">
          <div className="max-w-4xl mx-auto text-center space-y-6">
            <h1 className="text-4xl md:text-6xl font-bold font-poppins">
              Digital Marketing <span className="text-primary">Course</span>
            </h1>
            <p className="text-xl text-muted-foreground">
              Master digital marketing from basics to advanced with hands-on training
            </p>
            <div className="flex flex-wrap justify-center gap-8 pt-4">
              <div className="flex items-center gap-2">
                <Clock className="w-5 h-5 text-primary" />
                <span>3 Months</span>
              </div>
              <div className="flex items-center gap-2">
                <Users className="w-5 h-5 text-primary" />
                <span>Live Sessions</span>
              </div>
              <div className="flex items-center gap-2">
                <Award className="w-5 h-5 text-primary" />
                <span>Certification</span>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Course Overview */}
      <section className="py-20 bg-white">
        <div className="container mx-auto px-4">
          <div className="max-w-4xl mx-auto">
            <h2 className="text-3xl md:text-4xl font-bold font-poppins mb-6">
              Course <span className="text-primary">Overview</span>
            </h2>
            <p className="text-lg text-muted-foreground leading-relaxed mb-8">
              Our comprehensive Digital Marketing course covers everything you need to become a successful digital marketer. Learn from industry experts with 3+ years of experience and work on real-world projects.
            </p>

            {/* Course Features */}
            <div className="grid md:grid-cols-2 gap-4 mb-12">
              {[
                "100% Job-Oriented Training",
                "Live Interactive Sessions",
                "Real-time Projects",
                "Industry Expert Trainers",
                "Certification on Completion",
                "Lifetime Support",
                "Interview Preparation",
                "Resume Building"
              ].map((feature, index) => (
                <div key={index} className="flex items-center gap-3">
                  <CheckCircle2 className="w-5 h-5 text-primary flex-shrink-0" />
                  <span>{feature}</span>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* Course Modules */}
      <section className="py-20 bg-gray-50">
        <div className="container mx-auto px-4">
          <div className="max-w-4xl mx-auto">
            <h2 className="text-3xl md:text-4xl font-bold font-poppins text-center mb-12">
              What You'll <span className="text-primary">Learn</span>
            </h2>
            <div className="grid md:grid-cols-2 gap-4">
              {modules.map((module, index) => (
                <Card key={index} className="p-4 hover:shadow-lg transition-shadow">
                  <div className="flex items-center gap-3">
                    <div className="w-8 h-8 rounded-full bg-primary text-white flex items-center justify-center font-semibold flex-shrink-0">
                      {index + 1}
                    </div>
                    <span className="font-medium">{module}</span>
                  </div>
                </Card>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* Pricing */}
      <section className="py-20 bg-white">
        <div className="container mx-auto px-4">
          <div className="max-w-2xl mx-auto">
            <Card className="p-8 border-2 border-primary">
              <div className="text-center mb-8">
                <h3 className="text-3xl font-bold font-poppins mb-2">3 Months Complete Plan</h3>
                <div className="text-4xl font-bold text-primary mb-4">₹18,500 <span className="text-lg text-muted-foreground">+ GST</span></div>
              </div>
              <ul className="space-y-3 mb-8">
                {[
                  "Complete Digital Marketing Course",
                  "Live Interactive Classes",
                  "Real-time Projects",
                  "Google Ads Certification Prep",
                  "Social Media Marketing",
                  "Email Marketing",
                  "Google Analytics Training",
                  "AI Tools Training",
                  "Resume Preparation",
                  "Job Assistance",
                  "Lifetime Support"
                ].map((feature, index) => (
                  <li key={index} className="flex items-start gap-2">
                    <CheckCircle2 className="w-5 h-5 text-primary flex-shrink-0 mt-0.5" />
                    <span>{feature}</span>
                  </li>
                ))}
              </ul>
              <Link to="/contact">
                <Button size="lg" className="w-full">
                  Enroll Now
                </Button>
              </Link>
            </Card>
          </div>
        </div>
      </section>
    </div>
  );
}
