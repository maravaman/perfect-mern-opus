import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Mail, Phone, MapPin, Facebook, Instagram, Youtube, Linkedin, MessageCircle } from "lucide-react";
import { useState } from "react";
import { toast } from "sonner";

export default function Knight21Contact() {
  const [formData, setFormData] = useState({
    name: "",
    phone: "",
    email: "",
    subject: "",
    message: ""
  });
  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);

    try {
      // Send to Google Sheets via Web App
      const formDataToSend = new FormData();
      formDataToSend.append('name', formData.name);
      formDataToSend.append('phone', formData.phone);
      formDataToSend.append('email', formData.email);
      formDataToSend.append('subject', formData.subject);
      formDataToSend.append('message', formData.message);

      // Replace this URL with your Google Apps Script Web App URL
      const GOOGLE_SCRIPT_URL = 'YOUR_GOOGLE_APPS_SCRIPT_WEB_APP_URL';
      
      const response = await fetch(GOOGLE_SCRIPT_URL, {
        method: 'POST',
        body: formDataToSend,
        mode: 'no-cors'
      });

      toast.success("Message sent successfully! We'll get back to you soon.");
      setFormData({ name: "", phone: "", email: "", subject: "", message: "" });
    } catch (error) {
      console.error('Error submitting form:', error);
      toast.error("Failed to send message. Please try again or contact us directly.");
    } finally {
      setIsSubmitting(false);
    }
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  return (
    <div className="font-outfit">
      {/* Hero Section */}
      <section className="bg-gradient-to-br from-gray-50 to-white py-20">
        <div className="container mx-auto px-4">
          <div className="max-w-4xl mx-auto text-center space-y-6">
            <h1 className="text-4xl md:text-6xl font-bold font-poppins">
              Contact <span className="text-primary">Us</span>
            </h1>
            <p className="text-xl text-muted-foreground">
              Feel Free To Contact us & Get In Touch!
            </p>
          </div>
        </div>
      </section>

      {/* Contact Info & Form */}
      <section className="py-20 bg-white">
        <div className="container mx-auto px-4">
          <div className="grid lg:grid-cols-2 gap-12 max-w-6xl mx-auto">
            {/* Contact Information */}
            <div className="space-y-8">
              <div>
                <h2 className="text-3xl font-bold font-poppins mb-8">
                  Get in touch with <span className="text-primary">Knight21</span>
                </h2>
                <p className="text-muted-foreground mb-8">
                  Get in touch with Knight21 today and let's create something amazing together!
                </p>
              </div>

              <Card className="p-6">
                <div className="space-y-6">
                  <div className="flex items-start gap-4">
                    <div className="w-12 h-12 rounded-full bg-primary/10 flex items-center justify-center flex-shrink-0">
                      <Mail className="w-6 h-6 text-primary" />
                    </div>
                    <div>
                      <h3 className="font-semibold mb-1">Email Address</h3>
                      <a href="mailto:knight21digihub@gmail.com" className="text-muted-foreground hover:text-primary transition-colors">
                        knight21digihub@gmail.com
                      </a>
                    </div>
                  </div>

                  <div className="flex items-start gap-4">
                    <div className="w-12 h-12 rounded-full bg-primary/10 flex items-center justify-center flex-shrink-0">
                      <Phone className="w-6 h-6 text-primary" />
                    </div>
                    <div>
                      <h3 className="font-semibold mb-1">Phone Number</h3>
                      <a href="tel:+918187007475" className="text-muted-foreground hover:text-primary transition-colors">
                        +91 8187007475
                      </a>
                    </div>
                  </div>

                  <div className="flex items-start gap-4">
                    <div className="w-12 h-12 rounded-full bg-primary/10 flex items-center justify-center flex-shrink-0">
                      <MapPin className="w-6 h-6 text-primary" />
                    </div>
                    <div>
                      <h3 className="font-semibold mb-1">Location Address</h3>
                      <p className="text-muted-foreground">
                        Near msn charities, mahalaxmi nagar, jaganaikpur, kakinada, 522003
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
                    className="w-12 h-12 rounded-full bg-primary/10 hover:bg-primary hover:text-white flex items-center justify-center transition-colors">
                    <Facebook className="w-5 h-5" />
                  </a>
                  <a href="https://www.instagram.com/knight21.in" target="_blank" rel="noopener noreferrer"
                    className="w-12 h-12 rounded-full bg-primary/10 hover:bg-primary hover:text-white flex items-center justify-center transition-colors">
                    <Instagram className="w-5 h-5" />
                  </a>
                  <a href="https://youtube.com/@knight21digihub" target="_blank" rel="noopener noreferrer"
                    className="w-12 h-12 rounded-full bg-primary/10 hover:bg-primary hover:text-white flex items-center justify-center transition-colors">
                    <Youtube className="w-5 h-5" />
                  </a>
                  <a href="https://www.linkedin.com/in/knight-digi-hub-9a597528b" target="_blank" rel="noopener noreferrer"
                    className="w-12 h-12 rounded-full bg-primary/10 hover:bg-primary hover:text-white flex items-center justify-center transition-colors">
                    <Linkedin className="w-5 h-5" />
                  </a>
                  <a href="http://wa.me/918187007475" target="_blank" rel="noopener noreferrer"
                    className="w-12 h-12 rounded-full bg-primary/10 hover:bg-primary hover:text-white flex items-center justify-center transition-colors">
                    <MessageCircle className="w-5 h-5" />
                  </a>
                </div>
              </div>
            </div>

            {/* Contact Form */}
            <Card className="p-8">
              <form onSubmit={handleSubmit} className="space-y-6">
                <div>
                  <label className="block text-sm font-medium mb-2">Your Name *</label>
                  <Input
                    name="name"
                    value={formData.name}
                    onChange={handleChange}
                    placeholder="Your Name..."
                    required
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium mb-2">Your Mobile Number *</label>
                  <Input
                    name="phone"
                    type="tel"
                    value={formData.phone}
                    onChange={handleChange}
                    placeholder="Your Mobile Number..."
                    required
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium mb-2">Your Email *</label>
                  <Input
                    name="email"
                    type="email"
                    value={formData.email}
                    onChange={handleChange}
                    placeholder="Your Email..."
                    required
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium mb-2">Your Subject *</label>
                  <Input
                    name="subject"
                    value={formData.subject}
                    onChange={handleChange}
                    placeholder="Your Subject..."
                    required
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium mb-2">Your Message</label>
                  <Textarea
                    name="message"
                    value={formData.message}
                    onChange={handleChange}
                    placeholder="Your Message (Optional)"
                    rows={5}
                  />
                </div>

                <Button type="submit" className="w-full" disabled={isSubmitting}>
                  {isSubmitting ? "Sending..." : "Submit Message"}
                </Button>
                <p className="text-sm text-muted-foreground text-center">
                  Note: To set up Google Sheets integration, please follow our documentation.
                </p>
              </form>
            </Card>
          </div>
        </div>
      </section>
    </div>
  );
}
