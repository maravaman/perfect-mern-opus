import { useEffect, useState } from "react";
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Clock, BookOpen, Loader2, GraduationCap, Users, Star } from "lucide-react";
import { supabase } from "@/integrations/supabase/client";
import { toast } from "sonner";

interface Course {
  id: string;
  title: string;
  description: string | null;
  duration: string | null;
  price: number | null;
  image_url: string | null;
  active: boolean | null;
  display_order: number | null;
}

const Courses = () => {
  const [courses, setCourses] = useState<Course[]>([]);
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
      <div className="min-h-screen bg-gradient-to-br from-slate-50 via-blue-50/30 to-pink-50/20 flex items-center justify-center">
        <Loader2 className="w-8 h-8 animate-spin text-primary" />
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 via-blue-50/30 to-pink-50/20">
      {/* Hero Section */}
      <section className="py-16 md:py-24 px-4">
        <div className="container mx-auto text-center">
          <div className="inline-flex items-center gap-2 px-4 py-2 bg-primary/10 rounded-full mb-6">
            <GraduationCap className="w-4 h-4 text-primary" />
            <span className="text-sm font-medium text-primary">Learn from Experts</span>
          </div>
          <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold mb-6 font-poppins text-gray-900">
            Professional <span className="text-primary">Courses</span>
          </h1>
          <p className="text-lg md:text-xl text-muted-foreground max-w-2xl mx-auto font-outfit">
            Upgrade your skills with our comprehensive courses designed by industry experts
          </p>
        </div>
      </section>

      {/* Courses Grid */}
      <section className="py-12 px-4 pb-24">
        <div className="container mx-auto max-w-6xl">
          {courses.length === 0 ? (
            <Card className="p-12 text-center">
              <BookOpen className="w-16 h-16 text-muted-foreground/50 mx-auto mb-4" />
              <h3 className="text-xl font-semibold text-muted-foreground">No courses available yet</h3>
              <p className="text-muted-foreground mt-2">Check back soon for exciting new courses!</p>
            </Card>
          ) : (
            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
              {courses.map((course) => (
                <Card key={course.id} className="overflow-hidden group hover:shadow-xl transition-all duration-300 border-0 bg-white">
                  {/* Course Image */}
                  <div className="relative h-48 bg-gradient-to-br from-primary/20 via-pink-100 to-blue-100 overflow-hidden">
                    {course.image_url ? (
                      <img 
                        src={course.image_url} 
                        alt={course.title}
                        className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                      />
                    ) : (
                      <div className="w-full h-full flex items-center justify-center">
                        <div className="w-20 h-20 rounded-2xl bg-white/80 backdrop-blur shadow-lg flex items-center justify-center">
                          <BookOpen className="w-10 h-10 text-primary" />
                        </div>
                      </div>
                    )}
                    {course.price && (
                      <div className="absolute top-4 right-4 bg-primary text-white px-3 py-1 rounded-full text-sm font-bold shadow-lg">
                        ₹{course.price.toLocaleString()}
                      </div>
                    )}
                  </div>

                  {/* Course Content */}
                  <div className="p-6">
                    <h3 className="text-xl font-bold mb-3 font-poppins text-gray-900 group-hover:text-primary transition-colors line-clamp-2">
                      {course.title}
                    </h3>
                    
                    {course.description && (
                      <p className="text-muted-foreground text-sm mb-4 line-clamp-3 font-outfit">
                        {course.description}
                      </p>
                    )}

                    {/* Course Meta */}
                    <div className="flex items-center gap-4 mb-6 text-sm text-muted-foreground">
                      {course.duration && (
                        <div className="flex items-center gap-1.5">
                          <Clock className="w-4 h-4 text-primary" />
                          <span>{course.duration}</span>
                        </div>
                      )}
                      <div className="flex items-center gap-1.5">
                        <Star className="w-4 h-4 text-yellow-500 fill-yellow-500" />
                        <span>4.8</span>
                      </div>
                      <div className="flex items-center gap-1.5">
                        <Users className="w-4 h-4 text-primary" />
                        <span>100+</span>
                      </div>
                    </div>

                    <Button className="w-full bg-primary hover:bg-primary/90 text-white font-semibold">
                      Enroll Now
                    </Button>
                  </div>
                </Card>
              ))}
            </div>
          )}
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-16 px-4 bg-gradient-to-r from-primary to-pink-500">
        <div className="container mx-auto text-center">
          <h2 className="text-3xl md:text-4xl font-bold mb-4 font-poppins text-white">
            Ready to Start Your Learning Journey?
          </h2>
          <p className="text-lg mb-8 text-white/90 font-outfit max-w-2xl mx-auto">
            Join hundreds of students who have transformed their careers with our courses
          </p>
          <Button size="lg" variant="secondary" className="font-semibold">
            Contact Us for More Information
          </Button>
        </div>
      </section>
    </div>
  );
};

export default Courses;