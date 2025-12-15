import { Link, useLocation } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Menu, X, ChevronDown } from "lucide-react";
import { useState } from "react";
import {
  NavigationMenu,
  NavigationMenuContent,
  NavigationMenuItem,
  NavigationMenuLink,
  NavigationMenuList,
  NavigationMenuTrigger,
} from "@/components/ui/navigation-menu";

export const Header = () => {
  const location = useLocation();
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  const isActive = (path: string) => location.pathname === path;

  const navLinks = [
    { path: "/about", label: "About Us" },
    { path: "/portfolio", label: "Portfolio" },
    { path: "/career", label: "Career" },
    { path: "/blog", label: "Blog" },
    { path: "/contact", label: "Contact Us" },
  ];

  const servicesDropdown = [
    { path: "/services", label: "All Services" },
    { path: "/courses", label: "Courses" },
    { path: "/tools", label: "Tools" },
  ];

  return (
    <header className="sticky top-0 z-50 w-full backdrop-blur supports-[backdrop-filter]:bg-[#EBFBFF]/90 shadow-md border-b border-primary/10" style={{ backgroundColor: '#EBFBFF' }}>
      <div className="container mx-auto px-4">
        <div className="flex items-center justify-between h-20">
          {/* Logo */}
          <Link to="/" className="flex items-center group">
            <img 
              src={new URL('@/assets/knight21-logo-new.png', import.meta.url).href} 
              alt="Knight21 - Your success is our mission" 
              className="h-20 md:h-24 w-auto transition-all duration-300 group-hover:scale-105 drop-shadow-lg"
              loading="eager"
            />
          </Link>

          {/* Desktop Navigation */}
          <nav className="hidden md:flex items-center gap-8">
            <Link
              to="/"
              className={`font-semibold transition-all hover:text-primary relative ${
                isActive("/") ? "text-primary" : "text-foreground"
              }`}
            >
              Home
              {isActive("/") && (
                <span className="absolute -bottom-1 left-0 w-full h-0.5 bg-gradient-to-r from-primary to-secondary"></span>
              )}
            </Link>
            
            {/* Services Dropdown */}
            <NavigationMenu>
              <NavigationMenuList>
                <NavigationMenuItem>
                  <NavigationMenuTrigger className="font-semibold">
                    Services
                  </NavigationMenuTrigger>
                  <NavigationMenuContent>
                    <ul className="w-[200px] p-2">
                      {servicesDropdown.map((item) => (
                        <li key={item.path}>
                          <NavigationMenuLink asChild>
                            <Link
                              to={item.path}
                              className="block select-none rounded-md p-3 leading-none no-underline outline-none transition-colors hover:bg-accent hover:text-accent-foreground focus:bg-accent focus:text-accent-foreground"
                            >
                              <div className="text-sm font-medium leading-none">{item.label}</div>
                            </Link>
                          </NavigationMenuLink>
                        </li>
                      ))}
                    </ul>
                  </NavigationMenuContent>
                </NavigationMenuItem>
              </NavigationMenuList>
            </NavigationMenu>

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
          <a href="http://wa.me/918187007475" target="_blank" rel="noopener noreferrer" className="hidden md:block">
            <Button variant="secondary">Get Started</Button>
          </a>

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
              <Link
                to="/"
                onClick={() => setMobileMenuOpen(false)}
                className={`font-medium transition-colors hover:text-primary ${
                  isActive("/") ? "text-primary" : "text-foreground"
                }`}
              >
                Home
              </Link>
              
              {/* Mobile Services Submenu */}
              <div className="space-y-2">
                <div className="font-medium text-foreground">Services</div>
                <div className="pl-4 space-y-2">
                  {servicesDropdown.map((item) => (
                    <Link
                      key={item.path}
                      to={item.path}
                      onClick={() => setMobileMenuOpen(false)}
                      className="block font-medium text-sm transition-colors hover:text-primary text-muted-foreground"
                    >
                      {item.label}
                    </Link>
                  ))}
                </div>
              </div>

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
