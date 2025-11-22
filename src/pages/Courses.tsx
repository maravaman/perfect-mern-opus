import { useEffect, useState } from "react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Code, TrendingUp, Clock, Award, Users, BookOpen, Loader2 } from "lucide-react";
import { supabase } from "@/integrations/supabase/client";
import { toast } from "sonner";
import webDevBg from "@/assets/courses/web-dev-bg.png";
import digitalMarketingBg from "@/assets/courses/digital-marketing-bg.png";

const iconMap: Record<string, any> = {
  Code,
  TrendingUp,
  BookOpen,
  Award
};

const Courses = () => {
  const [courses, setCourses] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchCourses();

    const channel = supabase
      .channel('courses-changes')
      .on('postgres_changes', { event: '*', schema: 'public', table: 'courses' }, () => {
        fetchCourses();
      })
      .subscribe();

    return () => {
      supabase.removeChannel(channel);
    };
  }, []);

  const fetchCourses = async () => {
    try {
      const { data, error } = await supabase
        .from('courses')
        .select('*')
        .eq('active', true)
        .order('display_order', { ascending: true });

      if (error) throw error;
      setCourses(data || []);
    } catch (error) {
      console.error('Error fetching courses:', error);
      toast.error('Failed to load courses');
    } finally {
      setLoading(false);
    }
  };

  if (loading) {
    return (
      <div className="min-h-screen bg-gradient-to-b from-background to-secondary/20 flex items-center justify-center">
        <Loader2 className="w-8 h-8 animate-spin" />
      </div>
    );
  }

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
            {courses.map((course, index) => {
              const IconComponent = iconMap[course.icon] || Code;
              const features = Array.isArray(course.features) ? course.features : [];
              const highlights = Array.isArray(course.highlights) ? course.highlights : [];
              const learningOutcomes = Array.isArray(course.learning_outcomes) ? course.learning_outcomes : [];

              return (
              <Card key={course.id} className="overflow-hidden">
                <div className="grid md:grid-cols-3 gap-6">
                  {/* Left side - Course Info with Image */}
                  <div
                    className="md:col-span-1 bg-gradient-to-br from-pink-50 to-pink-100/50 p-8 flex flex-col justify-center items-center text-center relative bg-cover bg-center bg-no-repeat"
                    style={{
                      backgroundImage: course.image_url ? `url(${course.image_url})` : `url(${webDevBg})`,
                      backgroundBlendMode: 'overlay'
                    }}
                  >
                    <div className="w-32 h-32 rounded-2xl bg-white shadow-lg flex items-center justify-center mb-6">
                      <IconComponent className="w-16 h-16 text-primary" />
                    </div>
                    <h2 className="text-2xl font-bold mb-2 font-poppins">{course.title}</h2>
                    <p className="text-muted-foreground mb-6 font-outfit">{course.short_description || course.description}</p>

                    <div className="space-y-3 w-full">
                      {course.duration && (
                        <div className="flex items-center justify-center gap-2 text-sm font-outfit">
                          <Clock className="w-4 h-4 text-primary" />
                          <span>{course.duration}</span>
                        </div>
                      )}
                      {course.level && (
                        <div className="flex items-center justify-center gap-2 text-sm font-outfit">
                          <Award className="w-4 h-4 text-primary" />
                          <span className="capitalize">{course.level}</span>
                        </div>
                      )}
                      {course.enrolled_count && (
                        <div className="flex items-center justify-center gap-2 text-sm font-outfit">
                          <Users className="w-4 h-4 text-primary" />
                          <span>{course.enrolled_count}+ Enrolled</span>
                        </div>
                      )}
                      {course.price && (
                        <div className="text-xl font-bold text-primary">
                          {course.discount_price ? (
                            <>
                              <span className="line-through text-muted-foreground text-sm mr-2">
                                ${course.price}
                              </span>
                              ${course.discount_price}
                            </>
                          ) : (
                            `$${course.price}`
                          )}
                        </div>
                      )}
                    </div>
                  </div>

                  {/* Right side - Course Details */}
                  <CardContent className="md:col-span-2 p-8">
                    <div className="space-y-6">
                      {(learningOutcomes.length > 0 || features.length > 0) && (
                        <div>
                          <h3 className="text-xl font-semibold mb-4 flex items-center gap-2 font-poppins">
                            <BookOpen className="w-5 h-5 text-primary" />
                            {learningOutcomes.length > 0 ? 'What You\'ll Learn' : 'Course Curriculum'}
                          </h3>
                          <ul className="grid md:grid-cols-2 gap-3">
                            {(learningOutcomes.length > 0 ? learningOutcomes : features).map((item: string, idx: number) => (
                              <li key={idx} className="flex items-start gap-2">
                                <span className="text-primary mt-1">✓</span>
                                <span className="text-sm font-outfit">{item}</span>
                              </li>
                            ))}
                          </ul>
                        </div>
                      )}

                      {highlights.length > 0 && (
                        <div>
                          <h3 className="text-xl font-semibold mb-4 font-poppins">Course Highlights</h3>
                          <div className="grid grid-cols-2 gap-4">
                            {highlights.map((highlight: string, idx: number) => (
                              <div key={idx} className="flex items-center gap-2 bg-primary/5 p-3 rounded-lg">
                                <span className="text-primary">★</span>
                                <span className="text-sm font-medium font-outfit">{highlight}</span>
                              </div>
                            ))}
                          </div>
                        </div>
                      )}

                      {course.instructor && (
                        <div className="text-sm text-muted-foreground">
                          <strong>Instructor:</strong> {course.instructor}
                        </div>
                      )}

                      <Button className="w-full md:w-auto" size="lg">
                        Enroll Now {course.price && `- $${course.discount_price || course.price}`}
                      </Button>
                    </div>
                  </CardContent>
                </div>
              </Card>
              );
            })}
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
