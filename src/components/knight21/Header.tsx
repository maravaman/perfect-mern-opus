import { Link, useLocation } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Menu, X, LogIn } from "lucide-react";
import { useState } from "react";

export const Header = () => {
  const location = useLocation();
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  const isActive = (path: string) => location.pathname === path;

  const navLinks = [
    { path: "/", label: "Home" },
    { path: "/about", label: "About Us" },
    { path: "/services", label: "Services" },
    { path: "/courses", label: "Courses" },
    { path: "/tools", label: "Tools" },
    { path: "/portfolio", label: "Portfolio" },
    { path: "/reviews", label: "Reviews" },
    { path: "/contact", label: "Contact Us" },
  ];

  return (
    <header className="sticky top-0 z-50 w-full bg-white/95 backdrop-blur supports-[backdrop-filter]:bg-white/80 shadow-md border-b border-border/40">
      <div className="container mx-auto px-4">
        <div className="flex items-center justify-between h-20">
          {/* Logo */}
          <Link to="/" className="flex items-center group">
            <div className="font-bold text-2xl transition-transform group-hover:scale-105">
              <span className="text-foreground">Knight</span>
              <span className="bg-gradient-to-r from-primary to-secondary bg-clip-text text-transparent">21</span>
            </div>
          </Link>

          {/* Desktop Navigation */}
          <nav className="hidden md:flex items-center gap-8">
            {navLinks.map((link) => (
              <Link
                key={link.path}
                to={link.path}
                className={`font-semibold transition-all hover:text-primary relative ${
                  isActive(link.path) ? "text-primary" : "text-foreground"
                }`}
              >
                {link.label}
                {isActive(link.path) && (
                  <span className="absolute -bottom-1 left-0 w-full h-0.5 bg-gradient-to-r from-primary to-secondary"></span>
                )}
              </Link>
            ))}
          </nav>

          {/* Desktop CTA */}
          <div className="hidden md:flex items-center gap-3">
            <Link to="/auth">
              <Button variant="outline" size="sm">
                <LogIn className="w-4 h-4 mr-2" />
                Admin Login
              </Button>
            </Link>
            <a href="http://wa.me/918187007475" target="_blank" rel="noopener noreferrer">
              <Button variant="secondary">Get Started</Button>
            </a>
          </div>

          {/* Mobile Menu Button */}
          <button
            className="md:hidden"
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
          >
            {mobileMenuOpen ? <X /> : <Menu />}
          </button>
        </div>

        {/* Mobile Menu */}
        {mobileMenuOpen && (
          <div className="md:hidden border-t py-4">
            <nav className="flex flex-col gap-4">
              {navLinks.map((link) => (
                <Link
                  key={link.path}
                  to={link.path}
                  onClick={() => setMobileMenuOpen(false)}
                  className={`font-medium transition-colors hover:text-primary ${
                    isActive(link.path) ? "text-primary" : "text-foreground"
                  }`}
                >
                  {link.label}
                </Link>
              ))}
              <Link to="/auth" onClick={() => setMobileMenuOpen(false)}>
                <Button className="w-full" variant="outline">
                  <LogIn className="w-4 h-4 mr-2" />
                  Admin Login
                </Button>
              </Link>
              <a href="http://wa.me/918187007475" target="_blank" rel="noopener noreferrer" onClick={() => setMobileMenuOpen(false)}>
                <Button className="w-full" variant="secondary">Get Started</Button>
              </a>
            </nav>
          </div>
        )}
      </div>
    </header>
  );
};
