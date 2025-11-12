import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Briefcase, Users, TrendingUp, Award, Upload, PenSquare } from "lucide-react";
import { useState } from "react";
import { supabase } from "@/integrations/supabase/client";
import { toast } from "sonner";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";

export default function Career() {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    phone: "",
    position: "",
    experience: "",
    message: "",
  });
  const [resumeFile, setResumeFile] = useState<File | null>(null);
  const [uploading, setUploading] = useState(false);
  
  const [blogData, setBlogData] = useState({
    title: "",
    content: "",
    author_name: "",
    author_email: "",
    category: "",
  });
  const [submittingBlog, setSubmittingBlog] = useState(false);

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files[0]) {
      setResumeFile(e.target.files[0]);
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setUploading(true);

    try {
      let resumeUrl = "";

      // Upload resume if provided
      if (resumeFile) {
        const fileExt = resumeFile.name.split(".").pop();
        const fileName = `${Date.now()}_${formData.name.replace(/\s+/g, "_")}.${fileExt}`;
        const filePath = `resumes/${fileName}`;

        const { error: uploadError } = await supabase.storage
          .from("knight21-uploads")
          .upload(filePath, resumeFile);

        if (uploadError) throw uploadError;

        const { data: { publicUrl } } = supabase.storage
          .from("knight21-uploads")
          .getPublicUrl(filePath);

        resumeUrl = publicUrl;
      }

      // Save application to contact_inquiries
      const { error } = await supabase.from("contact_inquiries").insert({
        name: formData.name,
        email: formData.email,
        phone: formData.phone,
        subject: `Career Application - ${formData.position}`,
        message: `Position: ${formData.position}\nExperience: ${formData.experience}\n\nMessage: ${formData.message}\n\nResume: ${resumeUrl}`,
      });

      if (error) throw error;

      toast.success("Application submitted successfully!");
      setFormData({
        name: "",
        email: "",
        phone: "",
        position: "",
        experience: "",
        message: "",
      });
      setResumeFile(null);
    } catch (error) {
      console.error("Error submitting application:", error);
      toast.error("Failed to submit application. Please try again.");
    } finally {
      setUploading(false);
    }
  };

  const handleBlogSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setSubmittingBlog(true);

    try {
      const { error } = await supabase.from("blog_posts").insert({
        title: blogData.title,
        content: blogData.content,
        author_name: blogData.author_name,
        author_email: blogData.author_email,
        category: blogData.category,
        published: false,
      });

      if (error) throw error;

      toast.success("Blog post submitted for review!");
      setBlogData({
        title: "",
        content: "",
        author_name: "",
        author_email: "",
        category: "",
      });
    } catch (error) {
      console.error("Error submitting blog:", error);
      toast.error("Failed to submit blog post.");
    } finally {
      setSubmittingBlog(false);
    }
  };

  const jobOpenings = [
    {
      title: "Digital Marketing Executive",
      type: "Full Time",
      location: "Hyderabad / Remote",
      experience: "1-3 years",
      description: "Looking for a passionate digital marketer with expertise in SEO, social media, and content marketing.",
    },
    {
      title: "Web Developer",
      type: "Full Time",
      location: "Hyderabad / Remote",
      experience: "2-4 years",
      description: "Seeking an experienced web developer proficient in React, Node.js, and modern web technologies.",
    },
    {
      title: "Graphic Designer",
      type: "Full Time / Part Time",
      location: "Hyderabad / Remote",
      experience: "1-2 years",
      description: "Creative designer needed for social media graphics, branding, and marketing materials.",
    },
    {
      title: "Content Writer",
      type: "Full Time / Freelance",
      location: "Remote",
      experience: "1-3 years",
      description: "Looking for talented content writers with SEO knowledge and creative writing skills.",
    },
  ];

  return (
    <div className="font-outfit">
      {/* Hero Section */}
      <section className="bg-gradient-to-br from-primary/10 via-secondary/10 to-accent/10 py-20">
        <div className="container mx-auto px-4">
          <div className="max-w-4xl mx-auto text-center space-y-6">
            <h1 className="text-4xl md:text-6xl font-bold font-poppins">
              Join Our <span className="text-primary">Team</span>
            </h1>
            <p className="text-xl text-muted-foreground">
              Be part of a dynamic team that's transforming digital marketing
            </p>
          </div>
        </div>
      </section>

      {/* Why Work With Us */}
      <section className="py-20 bg-white">
        <div className="container mx-auto px-4">
          <h2 className="text-3xl md:text-4xl font-bold text-center mb-12 font-poppins">
            Why Work With <span className="text-primary">Knight21?</span>
          </h2>
          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6 max-w-6xl mx-auto">
            {[
              { icon: TrendingUp, title: "Growth Opportunities", desc: "Continuous learning and career advancement" },
              { icon: Users, title: "Great Team Culture", desc: "Collaborative and supportive work environment" },
              { icon: Award, title: "Competitive Benefits", desc: "Attractive salary and benefits package" },
              { icon: Briefcase, title: "Exciting Projects", desc: "Work on diverse and challenging projects" },
            ].map((item, index) => (
              <Card key={index} className="p-6 text-center hover:shadow-lg transition-shadow">
                <item.icon className="w-12 h-12 text-primary mx-auto mb-4" />
                <h3 className="font-semibold text-lg mb-2">{item.title}</h3>
                <p className="text-sm text-muted-foreground">{item.desc}</p>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* Job Openings */}
      <section className="py-20 bg-gray-50">
        <div className="container mx-auto px-4">
          <h2 className="text-3xl md:text-4xl font-bold text-center mb-12 font-poppins">
            Current <span className="text-primary">Openings</span>
          </h2>
          <div className="grid md:grid-cols-2 gap-6 max-w-5xl mx-auto">
            {jobOpenings.map((job, index) => (
              <Card key={index} className="p-6 hover:shadow-lg transition-shadow">
                <h3 className="text-xl font-bold mb-2">{job.title}</h3>
                <div className="flex flex-wrap gap-2 mb-4">
                  <span className="text-xs bg-primary/10 text-primary px-3 py-1 rounded-full">{job.type}</span>
                  <span className="text-xs bg-secondary/10 text-secondary px-3 py-1 rounded-full">{job.location}</span>
                  <span className="text-xs bg-accent/10 text-accent px-3 py-1 rounded-full">{job.experience}</span>
                </div>
                <p className="text-muted-foreground text-sm mb-4">{job.description}</p>
                <Button 
                  variant="outline" 
                  className="w-full"
                  onClick={() => {
                    setFormData({ ...formData, position: job.title });
                    document.getElementById("application-form")?.scrollIntoView({ behavior: "smooth" });
                  }}
                >
                  Apply Now
                </Button>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* Application Form & Blog Posting */}
      <section id="application-form" className="py-20 bg-white">
        <div className="container mx-auto px-4">
          <div className="max-w-3xl mx-auto">
            <Tabs defaultValue="apply" className="w-full">
              <TabsList className="grid w-full grid-cols-2 mb-8">
                <TabsTrigger value="apply">Apply for Job</TabsTrigger>
                <TabsTrigger value="blog"><PenSquare className="w-4 h-4 mr-2" />Post Blog</TabsTrigger>
              </TabsList>
              
              <TabsContent value="apply">
                <h2 className="text-3xl font-bold text-center mb-4 font-poppins">
                  Apply <span className="text-primary">Now</span>
                </h2>
                <p className="text-center text-muted-foreground mb-8">
                  Fill out the form below and we'll get back to you soon
                </p>
            
            <Card className="p-8">
              <form onSubmit={handleSubmit} className="space-y-6">
                <div>
                  <Label htmlFor="name">Full Name *</Label>
                  <Input
                    id="name"
                    name="name"
                    value={formData.name}
                    onChange={handleInputChange}
                    required
                    placeholder="Enter your full name"
                  />
                </div>

                <div className="grid md:grid-cols-2 gap-4">
                  <div>
                    <Label htmlFor="email">Email *</Label>
                    <Input
                      id="email"
                      name="email"
                      type="email"
                      value={formData.email}
                      onChange={handleInputChange}
                      required
                      placeholder="your.email@example.com"
                    />
                  </div>
                  <div>
                    <Label htmlFor="phone">Phone *</Label>
                    <Input
                      id="phone"
                      name="phone"
                      type="tel"
                      value={formData.phone}
                      onChange={handleInputChange}
                      required
                      placeholder="+91 1234567890"
                    />
                  </div>
                </div>

                <div>
                  <Label htmlFor="position">Position Applied For *</Label>
                  <Input
                    id="position"
                    name="position"
                    value={formData.position}
                    onChange={handleInputChange}
                    required
                    placeholder="e.g., Digital Marketing Executive"
                  />
                </div>

                <div>
                  <Label htmlFor="experience">Years of Experience *</Label>
                  <Input
                    id="experience"
                    name="experience"
                    value={formData.experience}
                    onChange={handleInputChange}
                    required
                    placeholder="e.g., 2 years"
                  />
                </div>

                <div>
                  <Label htmlFor="message">Cover Letter / Message</Label>
                  <Textarea
                    id="message"
                    name="message"
                    value={formData.message}
                    onChange={handleInputChange}
                    rows={4}
                    placeholder="Tell us why you'd be a great fit..."
                  />
                </div>

                <div>
                  <Label htmlFor="resume">Upload Resume (PDF, DOC, DOCX) *</Label>
                  <div className="mt-2">
                    <label
                      htmlFor="resume"
                      className="flex items-center justify-center w-full px-4 py-3 border-2 border-dashed border-gray-300 rounded-lg cursor-pointer hover:border-primary transition-colors"
                    >
                      <Upload className="w-5 h-5 mr-2 text-muted-foreground" />
                      <span className="text-sm text-muted-foreground">
                        {resumeFile ? resumeFile.name : "Click to upload your resume"}
                      </span>
                      <Input
                        id="resume"
                        type="file"
                        accept=".pdf,.doc,.docx"
                        onChange={handleFileChange}
                        required
                        className="hidden"
                      />
                    </label>
                  </div>
                </div>

                <Button type="submit" className="w-full" size="lg" disabled={uploading}>
                  {uploading ? "Submitting..." : "Submit Application"}
                </Button>
              </form>
            </Card>
          </TabsContent>

          <TabsContent value="blog">
            <h2 className="text-3xl font-bold text-center mb-4 font-poppins">
              Submit a <span className="text-primary">Blog Post</span>
            </h2>
            <p className="text-center text-muted-foreground mb-8">
              Share your knowledge and insights with our community
            </p>
            
            <Card className="p-8">
              <form onSubmit={handleBlogSubmit} className="space-y-6">
                <div>
                  <Label htmlFor="blog-title">Blog Title *</Label>
                  <Input
                    id="blog-title"
                    value={blogData.title}
                    onChange={(e) => setBlogData({...blogData, title: e.target.value})}
                    required
                    placeholder="Enter blog title"
                  />
                </div>

                <div>
                  <Label htmlFor="blog-content">Content *</Label>
                  <Textarea
                    id="blog-content"
                    value={blogData.content}
                    onChange={(e) => setBlogData({...blogData, content: e.target.value})}
                    required
                    rows={10}
                    placeholder="Write your blog content here..."
                  />
                </div>

                <div className="grid md:grid-cols-2 gap-4">
                  <div>
                    <Label htmlFor="blog-author">Author Name *</Label>
                    <Input
                      id="blog-author"
                      value={blogData.author_name}
                      onChange={(e) => setBlogData({...blogData, author_name: e.target.value})}
                      required
                      placeholder="Your name"
                    />
                  </div>
                  <div>
                    <Label htmlFor="blog-email">Email *</Label>
                    <Input
                      id="blog-email"
                      type="email"
                      value={blogData.author_email}
                      onChange={(e) => setBlogData({...blogData, author_email: e.target.value})}
                      required
                      placeholder="your.email@example.com"
                    />
                  </div>
                </div>

                <div>
                  <Label htmlFor="blog-category">Category</Label>
                  <Input
                    id="blog-category"
                    value={blogData.category}
                    onChange={(e) => setBlogData({...blogData, category: e.target.value})}
                    placeholder="e.g., Technology, Career Tips, Industry News"
                  />
                </div>

                <Button type="submit" className="w-full" size="lg" disabled={submittingBlog}>
                  {submittingBlog ? "Submitting..." : "Submit Blog Post"}
                </Button>
              </form>
            </Card>
          </TabsContent>
        </Tabs>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-16 bg-gradient-to-br from-primary/10 via-secondary/10 to-accent/10">
        <div className="container mx-auto px-4 text-center">
          <h2 className="text-2xl md:text-3xl font-bold mb-4 font-poppins">
            Don't See Your Role?
          </h2>
          <p className="text-muted-foreground mb-6 max-w-2xl mx-auto">
            We're always looking for talented individuals. Send us your resume and we'll reach out when suitable opportunities arise.
          </p>
          <a href="/contact">
            <Button size="lg" variant="secondary">
              Contact Us
            </Button>
          </a>
        </div>
      </section>
    </div>
  );
}
