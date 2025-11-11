import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Code, TrendingUp, Clock, Award, Users, BookOpen } from "lucide-react";
import webDevBg from "@/assets/courses/web-dev-bg.png";
import digitalMarketingBg from "@/assets/courses/digital-marketing-bg.png";

const Courses = () => {
  const courses = [
    {
      id: "web-development",
      title: "Web Development Course",
      description: "Master modern web development with hands-on projects and industry-relevant skills",
      icon: Code,
      bgImage: webDevBg,
      duration: "3-6 Months",
      level: "Beginner to Advanced",
      students: "500+ Enrolled",
      features: [
        "HTML, CSS, JavaScript fundamentals",
        "React.js and modern frameworks",
        "Backend development with Node.js",
        "Database management (SQL & NoSQL)",
        "Responsive design & UI/UX principles",
        "Version control with Git",
        "Deployment and hosting",
        "Real-world project portfolio"
      ],
      highlights: [
        "Live interactive sessions",
        "1-on-1 mentorship",
        "Industry certification",
        "Job placement assistance"
      ]
    },
    {
      id: "digital-marketing",
      title: "Digital Marketing Course",
      description: "Learn cutting-edge digital marketing strategies to grow businesses online",
      icon: TrendingUp,
      bgImage: digitalMarketingBg,
      duration: "2-4 Months",
      level: "Beginner to Advanced",
      students: "300+ Enrolled",
      features: [
        "SEO (Search Engine Optimization)",
        "Social Media Marketing (Facebook, Instagram, LinkedIn)",
        "Google Ads & PPC campaigns",
        "Content marketing strategies",
        "Email marketing automation",
        "Analytics and reporting",
        "Conversion rate optimization",
        "Brand building and strategy"
      ],
      highlights: [
        "Practical case studies",
        "Industry expert trainers",
        "Google & Facebook certifications",
        "Internship opportunities"
      ]
    }
  ];

  return (
    <div className="min-h-screen bg-gradient-to-b from-background to-secondary/20 font-outfit">
      {/* Hero Section */}
      <section className="py-20 px-4">
        <div className="container mx-auto text-center">
          <h1 className="text-4xl md:text-5xl font-bold mb-6 font-poppins">
            Professional <span className="text-primary">Courses</span>
          </h1>
          <p className="text-xl text-muted-foreground max-w-2xl mx-auto font-outfit">
            Upgrade your skills with our comprehensive courses designed by industry experts
          </p>
        </div>
      </section>

      {/* Courses Section */}
      <section className="py-12 px-4">
        <div className="container mx-auto max-w-6xl">
          <div className="space-y-12">
            {courses.map((course, index) => (
              <Card key={course.id} className="overflow-hidden">
                <div className="grid md:grid-cols-3 gap-6">
                  {/* Left side - Course Info with Image */}
                  <div 
                    className="md:col-span-1 bg-gradient-to-br from-pink-50 to-pink-100/50 p-8 flex flex-col justify-center items-center text-center relative bg-cover bg-center bg-no-repeat"
                    style={{
                      backgroundImage: `url(${course.bgImage})`,
                      backgroundBlendMode: 'overlay'
                    }}
                  >
                    <div className="w-32 h-32 rounded-2xl bg-white shadow-lg flex items-center justify-center mb-6">
                      <course.icon className="w-16 h-16 text-primary" />
                    </div>
                    <h2 className="text-2xl font-bold mb-2 font-poppins">{course.title}</h2>
                    <p className="text-muted-foreground mb-6 font-outfit">{course.description}</p>
                    
                    <div className="space-y-3 w-full">
                      <div className="flex items-center justify-center gap-2 text-sm font-outfit">
                        <Clock className="w-4 h-4 text-primary" />
                        <span>{course.duration}</span>
                      </div>
                      <div className="flex items-center justify-center gap-2 text-sm font-outfit">
                        <Award className="w-4 h-4 text-primary" />
                        <span>{course.level}</span>
                      </div>
                      <div className="flex items-center justify-center gap-2 text-sm font-outfit">
                        <Users className="w-4 h-4 text-primary" />
                        <span>{course.students}</span>
                      </div>
                    </div>
                  </div>

                  {/* Right side - Course Details */}
                  <CardContent className="md:col-span-2 p-8">
                    <div className="space-y-6">
                      <div>
                        <h3 className="text-xl font-semibold mb-4 flex items-center gap-2 font-poppins">
                          <BookOpen className="w-5 h-5 text-primary" />
                          Course Curriculum
                        </h3>
                        <ul className="grid md:grid-cols-2 gap-3">
                          {course.features.map((feature, idx) => (
                            <li key={idx} className="flex items-start gap-2">
                              <span className="text-primary mt-1">✓</span>
                              <span className="text-sm font-outfit">{feature}</span>
                            </li>
                          ))}
                        </ul>
                      </div>

                      <div>
                        <h3 className="text-xl font-semibold mb-4 font-poppins">Course Highlights</h3>
                        <div className="grid grid-cols-2 gap-4">
                          {course.highlights.map((highlight, idx) => (
                            <div key={idx} className="flex items-center gap-2 bg-primary/5 p-3 rounded-lg">
                              <span className="text-primary">★</span>
                              <span className="text-sm font-medium font-outfit">{highlight}</span>
                            </div>
                          ))}
                        </div>
                      </div>

                      <Button className="w-full md:w-auto" size="lg">
                        Enroll Now
                      </Button>
                    </div>
                  </CardContent>
                </div>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-16 px-4">
        <div className="container mx-auto text-center">
          <Card className="bg-primary text-primary-foreground p-8">
            <h2 className="text-3xl font-bold mb-4 font-poppins">Ready to Start Learning?</h2>
            <p className="text-lg mb-6 opacity-90 font-outfit">
              Join hundreds of students who have transformed their careers with our courses
            </p>
            <Button variant="secondary" size="lg" className="font-outfit">
              Contact Us for More Information
            </Button>
          </Card>
        </div>
      </section>
    </div>
  );
};

export default Courses;
