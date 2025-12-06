import { Link } from "react-router-dom";
import { Facebook, Instagram, Youtube, Linkedin, MessageCircle, Mail, Phone, MapPin, Shield } from "lucide-react";

export const Footer = () => {
  return (
    <footer className="bg-gradient-to-br from-slate-900 via-slate-800 to-slate-900 text-white py-12 relative overflow-hidden">
      {/* Background Pattern */}
      <div className="absolute inset-0 opacity-5">
        <div className="absolute inset-0" style={{ backgroundImage: 'radial-gradient(circle at 25px 25px, white 2%, transparent 0%), radial-gradient(circle at 75px 75px, white 2%, transparent 0%)', backgroundSize: '100px 100px' }}></div>
      </div>
      <div className="container mx-auto px-4 relative z-10">
        <div className="grid md:grid-cols-5 gap-8">
          {/* About Column */}
          <div>
          <div className="font-bold text-2xl mb-4">
            <span>Knight</span>
            <span className="text-gradient">21</span>
          </div>
            <p className="text-slate-400 text-sm">
              Ready to take your business to the next level? Let's work together to achieve your goals.
            </p>
          </div>

          {/* Useful Links */}
          <div>
            <h6 className="font-semibold text-lg mb-4 text-gradient">Useful Links</h6>
            <ul className="space-y-2 text-sm">
              <li><Link to="/" className="text-slate-400 hover:text-primary transition-colors">Home</Link></li>
              <li><Link to="/about" className="text-slate-400 hover:text-primary transition-colors">About Us</Link></li>
              <li><Link to="/services" className="text-slate-400 hover:text-primary transition-colors">Services</Link></li>
              <li><Link to="/reviews" className="text-slate-400 hover:text-primary transition-colors">Reviews</Link></li>
              <li><Link to="/contact" className="text-slate-400 hover:text-primary transition-colors">Contact Us</Link></li>
            </ul>
          </div>

          {/* Legal Links */}
          <div>
            <h6 className="font-semibold text-lg mb-4 text-gradient">Legal</h6>
            <ul className="space-y-2 text-sm">
              <li><Link to="/privacy-policy" className="text-slate-400 hover:text-primary transition-colors">Privacy Policy</Link></li>
              <li><Link to="/terms-conditions" className="text-slate-400 hover:text-primary transition-colors">Terms & Conditions</Link></li>
              <li><Link to="/cancellation-refunds" className="text-slate-400 hover:text-primary transition-colors">Cancellation & Refunds</Link></li>
              <li><Link to="/shipping" className="text-slate-400 hover:text-primary transition-colors">Shipping & Delivery</Link></li>
            </ul>
          </div>

          {/* Contact Info */}
          <div>
            <h6 className="font-semibold text-lg mb-4 text-gradient">Contact</h6>
            <ul className="space-y-3 text-sm text-slate-400">
              <li className="flex items-start gap-2">
                <Mail className="w-4 h-4 mt-1 flex-shrink-0 text-primary" />
                <a href="mailto:knight21digihub@gmail.com" className="hover:text-primary transition-colors">
                  knight21digihub@gmail.com
                </a>
              </li>
              <li className="flex items-start gap-2">
                <Phone className="w-4 h-4 mt-1 flex-shrink-0 text-primary" />
                <a href="tel:+918187007475" className="hover:text-primary transition-colors">
                  +91 8187007475
                </a>
              </li>
              <li className="flex items-start gap-2">
                <MapPin className="w-4 h-4 mt-1 flex-shrink-0 text-primary" />
                <span>Near msn charities, mahalaxmi nagar, jaganaikpur, kakinada, 522003</span>
              </li>
            </ul>
          </div>

          {/* Social Media */}
          <div>
            <h6 className="font-semibold text-lg mb-4 text-gradient">Follow Us</h6>
            <div className="flex gap-3">
              <a href="https://www.facebook.com/share/1JYd3DXAxz/" target="_blank" rel="noopener noreferrer" 
                className="w-10 h-10 rounded-full bg-white/10 hover:bg-gradient-to-r hover:from-primary hover:to-secondary flex items-center justify-center transition-all hover:scale-110 hover:shadow-lg">
                <Facebook className="w-5 h-5" />
              </a>
              <a href="https://www.instagram.com/knight21.in" target="_blank" rel="noopener noreferrer"
                className="w-10 h-10 rounded-full bg-white/10 hover:bg-gradient-to-r hover:from-primary hover:to-secondary flex items-center justify-center transition-all hover:scale-110 hover:shadow-lg">
                <Instagram className="w-5 h-5" />
              </a>
              <a href="https://youtube.com/@knight21digihub" target="_blank" rel="noopener noreferrer"
                className="w-10 h-10 rounded-full bg-white/10 hover:bg-gradient-to-r hover:from-primary hover:to-secondary flex items-center justify-center transition-all hover:scale-110 hover:shadow-lg">
                <Youtube className="w-5 h-5" />
              </a>
              <a href="https://www.linkedin.com/in/knight-digi-hub-9a597528b" target="_blank" rel="noopener noreferrer"
                className="w-10 h-10 rounded-full bg-white/10 hover:bg-gradient-to-r hover:from-primary hover:to-secondary flex items-center justify-center transition-all hover:scale-110 hover:shadow-lg">
                <Linkedin className="w-5 h-5" />
              </a>
              <a href="http://wa.me/918187007475" target="_blank" rel="noopener noreferrer"
                className="w-10 h-10 rounded-full bg-white/10 hover:bg-gradient-to-r hover:from-primary hover:to-secondary flex items-center justify-center transition-all hover:scale-110 hover:shadow-lg">
                <MessageCircle className="w-5 h-5" />
              </a>
            </div>
          </div>
        </div>

        <div className="border-t border-slate-700/50 mt-8 pt-6 flex flex-col md:flex-row justify-between items-center gap-4 text-sm text-slate-400">
          <p>&copy; {new Date().getFullYear()} Knight21. All rights reserved.</p>
          <Link
            to="/admin/login"
            className="flex items-center gap-2 px-4 py-2 bg-gradient-to-r from-primary to-secondary hover:from-primary/90 hover:to-secondary/90 text-primary-foreground rounded-lg transition-all duration-300 hover:scale-105 shadow-lg hover:shadow-xl"
          >
            <Shield className="w-4 h-4" />
            <span className="font-semibold">Admin Access</span>
          </Link>
        </div>
      </div>
    </footer>
  );
};
