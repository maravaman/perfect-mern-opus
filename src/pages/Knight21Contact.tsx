import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Label } from "@/components/ui/label";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Mail, Phone, MapPin, Facebook, Instagram, Youtube, Linkedin, MessageCircle } from "lucide-react";
import { useState } from "react";
import { toast } from "sonner";
import { supabase } from "@/integrations/supabase/client";
import { z } from "zod";
import { useQuery } from "@tanstack/react-query";

const inquiryCategories = [
  { value: "general", label: "General Inquiry" },
  { value: "courses", label: "Course Enrollment" },
  { value: "web-development", label: "Website Development" },
  { value: "digital-marketing", label: "Digital Marketing Services" },
  { value: "app-development", label: "App Development" },
  { value: "ca-services", label: "CA / Business Services" },
  { value: "partnership", label: "Partnership / Collaboration" },
  { value: "support", label: "Support / Help" },
];

const contactSchema = z.object({
  name: z.string().trim().min(1, "Name is required").max(100, "Name must be less than 100 characters"),
  phone: z.string().trim().min(10, "Please enter a valid phone number").max(15, "Phone number too long"),
  email: z.string().trim().email("Please enter a valid email").max(255, "Email must be less than 255 characters"),
  category: z.string().min(1, "Please select a category"),
  message: z.string().trim().min(1, "Message is required").max(1000, "Message must be less than 1000 characters"),
});

export default function Knight21Contact() {
  const [formData, setFormData] = useState({
    name: "",
    phone: "",
    email: "",
    category: "",
    message: "",
  });
  const [isSubmitting, setIsSubmitting] = useState(false);

  // Fetch site settings for dynamic contact info
  const { data: settings } = useQuery({
    queryKey: ["site_settings_contact"],
    queryFn: async () => {
      const { data, error } = await supabase
        .from("site_settings")
        .select("key, value");
      if (error) throw error;
      return data.reduce((acc: Record<string, string>, item) => {
        acc[item.key] = item.value || "";
        return acc;
      }, {});
    },
  });

  const contactEmail = settings?.contact_email || "knight21digihub@gmail.com";
  const contactPhone = settings?.contact_phone || "+91 8187007475";
  const contactAddress = settings?.contact_address || "Near msn charities, mahalaxmi nagar, jaganaikpur, kakinada, 522003";
  const whatsappNumber = contactPhone.replace(/[^0-9]/g, "");

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);

    try {
      // Validate form data
      const validatedData = contactSchema.parse(formData);

      // Get category label for subject
      const categoryLabel = inquiryCategories.find(c => c.value === validatedData.category)?.label || validatedData.category;

      // Save to database
      const { error: dbError } = await supabase
        .from('contact_inquiries')
        .insert([{
          name: validatedData.name,
          phone: validatedData.phone,
          email: validatedData.email,
          subject: categoryLabel,
          message: validatedData.message,
        }]);

      if (dbError) throw dbError;

      // Send to Google Sheets automatically
      try {
        const { data, error: functionError } = await supabase.functions.invoke('send-to-google-sheets', {
          body: {
            name: validatedData.name,
            email: validatedData.email,
            phone: validatedData.phone,
            category: categoryLabel,
            message: validatedData.message,
          }
        });

        if (functionError) {
          console.error('Google Sheets function error:', functionError);
        }
      } catch (sheetsError) {
        console.error('Failed to send to Google Sheets:', sheetsError);
        // Don't fail the entire submission if Google Sheets fails
      }

      toast.success("Message sent successfully! We'll get back to you soon.");
      setFormData({ name: "", phone: "", email: "", category: "", message: "" });
    } catch (error: any) {
      console.error('Error submitting form:', error);
      if (error instanceof z.ZodError) {
        toast.error(error.errors[0].message);
      } else {
        toast.error("Failed to send message. Please try again or contact us directly.");
      }
    } finally {
      setIsSubmitting(false);
    }
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleCategoryChange = (value: string) => {
    setFormData({ ...formData, category: value });
  };

  return (
    <div className="font-outfit">
      {/* Hero Section */}
      <section className="bg-gradient-hero pattern-dots py-20 relative overflow-hidden">
        <div className="absolute inset-0 bg-gradient-mesh"></div>
        <div className="container mx-auto px-4 relative z-10">
          <div className="max-w-4xl mx-auto text-center space-y-6 animate-fade-in">
            <h1 className="text-4xl md:text-6xl font-bold font-poppins text-gradient">
              Contact Us
            </h1>
            <p className="text-xl text-muted-foreground">
              Feel Free To Contact us & Get In Touch!
            </p>
          </div>
        </div>
      </section>

      {/* Contact Info & Form */}
      <section className="py-20 bg-white pattern-grid relative">
        <div className="absolute inset-0 bg-gradient-mesh opacity-30"></div>
        <div className="container mx-auto px-4 relative z-10">
          <div className="grid lg:grid-cols-2 gap-12 max-w-6xl mx-auto">
            {/* Contact Information */}
            <div className="space-y-8 animate-slide-up">
              <div>
                <h2 className="text-3xl font-bold font-poppins mb-8 text-gradient">
                  Get in touch with Knight21
                </h2>
                <p className="text-muted-foreground mb-8">
                  Get in touch with Knight21 today and let's create something amazing together!
                </p>
              </div>

              <Card className="p-6 glass-card shadow-card hover:shadow-card-hover transition-all">
                <div className="space-y-6">
                  <div className="flex items-start gap-4">
                    <div className="w-12 h-12 rounded-full bg-gradient-to-br from-primary to-secondary flex items-center justify-center flex-shrink-0 shadow-lg">
                      <Mail className="w-6 h-6 text-white" />
                    </div>
                    <div>
                      <h3 className="font-semibold mb-1">Email Address</h3>
                      <a href={`mailto:${contactEmail}`} className="text-muted-foreground hover:text-primary transition-colors">
                        {contactEmail}
                      </a>
                    </div>
                  </div>

                  <div className="flex items-start gap-4">
                    <div className="w-12 h-12 rounded-full bg-gradient-to-br from-primary to-secondary flex items-center justify-center flex-shrink-0 shadow-lg">
                      <Phone className="w-6 h-6 text-white" />
                    </div>
                    <div>
                      <h3 className="font-semibold mb-1">Phone Number</h3>
                      <a href={`tel:${contactPhone.replace(/\s/g, '')}`} className="text-muted-foreground hover:text-primary transition-colors">
                        {contactPhone}
                      </a>
                    </div>
                  </div>

                  <div className="flex items-start gap-4">
                    <div className="w-12 h-12 rounded-full bg-gradient-to-br from-primary to-secondary flex items-center justify-center flex-shrink-0 shadow-lg">
                      <MapPin className="w-6 h-6 text-white" />
                    </div>
                    <div>
                      <h3 className="font-semibold mb-1">Location Address</h3>
                      <p className="text-muted-foreground">
                        {contactAddress}
                      </p>
                    </div>
                  </div>
                </div>
              </Card>

              {/* Social Media */}
              <div>
                <h3 className="text-xl font-semibold font-poppins mb-4">Follow us on social media:</h3>
                <div className="flex gap-3">
                  <a href="https://www.facebook.com/share/1JYd3DXAxz/" target="_blank" rel="noopener noreferrer" 
                    className="w-12 h-12 rounded-full glass-card hover:bg-primary hover:text-white flex items-center justify-center transition-all hover:scale-110 shadow-card hover:shadow-card-hover">
                    <Facebook className="w-5 h-5" />
                  </a>
                  <a href="https://www.instagram.com/knight21.in" target="_blank" rel="noopener noreferrer"
                    className="w-12 h-12 rounded-full glass-card hover:bg-primary hover:text-white flex items-center justify-center transition-all hover:scale-110 shadow-card hover:shadow-card-hover">
                    <Instagram className="w-5 h-5" />
                  </a>
                  <a href="https://youtube.com/@knight21digihub" target="_blank" rel="noopener noreferrer"
                    className="w-12 h-12 rounded-full glass-card hover:bg-primary hover:text-white flex items-center justify-center transition-all hover:scale-110 shadow-card hover:shadow-card-hover">
                    <Youtube className="w-5 h-5" />
                  </a>
                  <a href="https://www.linkedin.com/in/knight-digi-hub-9a597528b" target="_blank" rel="noopener noreferrer"
                    className="w-12 h-12 rounded-full glass-card hover:bg-primary hover:text-white flex items-center justify-center transition-all hover:scale-110 shadow-card hover:shadow-card-hover">
                    <Linkedin className="w-5 h-5" />
                  </a>
                  <a href={`http://wa.me/${whatsappNumber}`} target="_blank" rel="noopener noreferrer"
                    className="w-12 h-12 rounded-full glass-card hover:bg-primary hover:text-white flex items-center justify-center transition-all hover:scale-110 shadow-card hover:shadow-card-hover">
                    <MessageCircle className="w-5 h-5" />
                  </a>
                </div>
              </div>
            </div>

            {/* Contact Form */}
            <Card className="p-8 glass-card shadow-card hover:shadow-card-hover transition-all animate-slide-up" style={{animationDelay: '0.1s'}}>
              <form onSubmit={handleSubmit} className="space-y-6">
                <div>
                  <Label>Your Name *</Label>
                  <Input
                    name="name"
                    value={formData.name}
                    onChange={handleChange}
                    placeholder="Your Name..."
                    required
                    maxLength={100}
                  />
                </div>

                <div>
                  <Label>Your Mobile Number *</Label>
                  <Input
                    name="phone"
                    type="tel"
                    value={formData.phone}
                    onChange={handleChange}
                    placeholder="Your Mobile Number..."
                    required
                    maxLength={15}
                  />
                </div>

                <div>
                  <Label>Your Email *</Label>
                  <Input
                    name="email"
                    type="email"
                    value={formData.email}
                    onChange={handleChange}
                    placeholder="Your Email..."
                    required
                    maxLength={255}
                  />
                </div>

                <div>
                  <Label>Inquiry Category *</Label>
                  <Select value={formData.category} onValueChange={handleCategoryChange}>
                    <SelectTrigger className="w-full bg-white/80">
                      <SelectValue placeholder="Select a category..." />
                    </SelectTrigger>
                    <SelectContent className="bg-white z-50">
                      {inquiryCategories.map((cat) => (
                        <SelectItem key={cat.value} value={cat.value}>
                          {cat.label}
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                </div>

                <div>
                  <Label>Your Message *</Label>
                  <Textarea
                    name="message"
                    value={formData.message}
                    onChange={handleChange}
                    placeholder="Your Message..."
                    rows={5}
                    required
                    maxLength={1000}
                  />
                </div>


                <Button type="submit" className="w-full shadow-card hover:shadow-card-hover" disabled={isSubmitting}>
                  {isSubmitting ? "Sending..." : "Submit Message"}
                </Button>
              </form>
            </Card>
          </div>
        </div>
      </section>
    </div>
  );
}
