import { Link } from "react-router-dom";
import { Facebook, Instagram, Youtube, Linkedin, MessageCircle, Mail, Phone, MapPin, Shield } from "lucide-react";

export const Footer = () => {
  return (
    <footer className="bg-gray-900 text-white py-12">
      <div className="container mx-auto px-4">
        <div className="grid md:grid-cols-5 gap-8">
          {/* About Column */}
          <div>
          <div className="font-bold text-2xl mb-4">
            <span>Knight</span>
            <span className="text-primary">21</span>
          </div>
            <p className="text-gray-400 text-sm">
              Ready to take your business to the next level? Let's work together to achieve your goals.
            </p>
          </div>

          {/* Useful Links */}
          <div>
            <h6 className="font-semibold text-lg mb-4">Useful Links</h6>
            <ul className="space-y-2 text-sm">
              <li><Link to="/" className="text-gray-400 hover:text-primary transition-colors">Home</Link></li>
              <li><Link to="/about" className="text-gray-400 hover:text-primary transition-colors">About Us</Link></li>
              <li><Link to="/services" className="text-gray-400 hover:text-primary transition-colors">Services</Link></li>
              <li><Link to="/contact" className="text-gray-400 hover:text-primary transition-colors">Contact Us</Link></li>
            </ul>
          </div>

          {/* Legal Links */}
          <div>
            <h6 className="font-semibold text-lg mb-4">Legal</h6>
            <ul className="space-y-2 text-sm">
              <li><Link to="/privacy-policy" className="text-gray-400 hover:text-primary transition-colors">Privacy Policy</Link></li>
              <li><Link to="/terms-conditions" className="text-gray-400 hover:text-primary transition-colors">Terms & Conditions</Link></li>
              <li><Link to="/cancellation-refunds" className="text-gray-400 hover:text-primary transition-colors">Cancellation & Refunds</Link></li>
              <li><Link to="/shipping" className="text-gray-400 hover:text-primary transition-colors">Shipping & Delivery</Link></li>
            </ul>
          </div>

          {/* Contact Info */}
          <div>
            <h6 className="font-semibold text-lg mb-4">Contact</h6>
            <ul className="space-y-3 text-sm text-gray-400">
              <li className="flex items-start gap-2">
                <Mail className="w-4 h-4 mt-1 flex-shrink-0" />
                <a href="mailto:knight21digihub@gmail.com" className="hover:text-primary transition-colors">
                  knight21digihub@gmail.com
                </a>
              </li>
              <li className="flex items-start gap-2">
                <Phone className="w-4 h-4 mt-1 flex-shrink-0" />
                <a href="tel:+918187007475" className="hover:text-primary transition-colors">
                  +91 8187007475
                </a>
              </li>
              <li className="flex items-start gap-2">
                <MapPin className="w-4 h-4 mt-1 flex-shrink-0" />
                <span>Near msn charities, mahalaxmi nagar, jaganaikpur, kakinada, 522003</span>
              </li>
            </ul>
          </div>

          {/* Social Media */}
          <div>
            <h6 className="font-semibold text-lg mb-4">Follow Us</h6>
            <div className="flex gap-3">
              <a href="https://www.facebook.com/share/1JYd3DXAxz/" target="_blank" rel="noopener noreferrer" 
                className="w-10 h-10 rounded-full bg-white/10 hover:bg-primary flex items-center justify-center transition-colors">
                <Facebook className="w-5 h-5" />
              </a>
              <a href="https://www.instagram.com/knight21.in" target="_blank" rel="noopener noreferrer"
                className="w-10 h-10 rounded-full bg-white/10 hover:bg-primary flex items-center justify-center transition-colors">
                <Instagram className="w-5 h-5" />
              </a>
              <a href="https://youtube.com/@knight21digihub" target="_blank" rel="noopener noreferrer"
                className="w-10 h-10 rounded-full bg-white/10 hover:bg-primary flex items-center justify-center transition-colors">
                <Youtube className="w-5 h-5" />
              </a>
              <a href="https://www.linkedin.com/in/knight-digi-hub-9a597528b" target="_blank" rel="noopener noreferrer"
                className="w-10 h-10 rounded-full bg-white/10 hover:bg-primary flex items-center justify-center transition-colors">
                <Linkedin className="w-5 h-5" />
              </a>
              <a href="http://wa.me/918187007475" target="_blank" rel="noopener noreferrer"
                className="w-10 h-10 rounded-full bg-white/10 hover:bg-primary flex items-center justify-center transition-colors">
                <MessageCircle className="w-5 h-5" />
              </a>
            </div>
          </div>
        </div>

        <div className="border-t border-gray-800 mt-8 pt-6 flex flex-col md:flex-row justify-between items-center gap-4 text-sm text-gray-400">
          <p>&copy; {new Date().getFullYear()} Knight21. All rights reserved.</p>
          <Link
            to="/admin/login"
            className="flex items-center gap-2 px-4 py-2 bg-blue-600 hover:bg-blue-700 text-white rounded-lg transition-all duration-300 hover:scale-105 shadow-lg hover:shadow-xl"
          >
            <Shield className="w-4 h-4" />
            <span className="font-semibold">Admin Access</span>
          </Link>
        </div>
      </div>
    </footer>
  );
};
