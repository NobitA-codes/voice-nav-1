import { Link, useNavigate, useLocation } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Mic, Menu, X } from "lucide-react";
import { useState } from "react";

const Navbar = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  const isActive = (path: string) => location.pathname === path;

  return (
    <nav className="sticky top-0 z-50 bg-card/95 backdrop-blur-sm border-b border-border">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16">
          {/* Logo */}
          <Link to="/" className="flex items-center gap-2 group" aria-label="VoiceNav Home">
            <div className="bg-gradient-primary p-2 rounded-lg group-hover:scale-105 transition-transform">
              <Mic className="h-6 w-6 text-primary-foreground" aria-hidden="true" />
            </div>
            <span className="text-xl font-bold bg-gradient-to-r from-primary to-secondary bg-clip-text text-transparent">
              VoiceNav
            </span>
          </Link>

          {/* Desktop Navigation */}
          <div className="hidden md:flex items-center gap-6">
            <Link
              to="/"
              className={`text-base font-medium transition-colors hover:text-primary ${
                isActive("/") ? "text-primary" : "text-muted-foreground"
              }`}
              aria-current={isActive("/") ? "page" : undefined}
            >
              Home
            </Link>
            <Link
              to="/dashboard"
              className={`text-base font-medium transition-colors hover:text-primary ${
                isActive("/dashboard") ? "text-primary" : "text-muted-foreground"
              }`}
              aria-current={isActive("/dashboard") ? "page" : undefined}
            >
              Dashboard
            </Link>
            <Link
              to="/extension"
              className={`text-base font-medium transition-colors hover:text-primary ${
                isActive("/extension") ? "text-primary" : "text-muted-foreground"
              }`}
              aria-current={isActive("/extension") ? "page" : undefined}
            >
              Extension
            </Link>
            <Link
              to="/about"
              className={`text-base font-medium transition-colors hover:text-primary ${
                isActive("/about") ? "text-primary" : "text-muted-foreground"
              }`}
              aria-current={isActive("/about") ? "page" : undefined}
            >
              About
            </Link>
            <Button onClick={() => navigate("/login")} variant="default" size="lg" className="ml-4">
              Get Started
            </Button>
          </div>

          {/* Mobile Menu Button */}
          <button
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            className="md:hidden p-2 rounded-lg hover:bg-muted transition-colors"
            aria-label={mobileMenuOpen ? "Close menu" : "Open menu"}
            aria-expanded={mobileMenuOpen}
          >
            {mobileMenuOpen ? <X className="h-6 w-6" /> : <Menu className="h-6 w-6" />}
          </button>
        </div>

        {/* Mobile Navigation */}
        {mobileMenuOpen && (
          <div className="md:hidden py-4 space-y-4 border-t border-border">
            <Link
              to="/"
              className={`block py-2 text-base font-medium ${
                isActive("/") ? "text-primary" : "text-muted-foreground"
              }`}
              onClick={() => setMobileMenuOpen(false)}
              aria-current={isActive("/") ? "page" : undefined}
            >
              Home
            </Link>
            <Link
              to="/dashboard"
              className={`block py-2 text-base font-medium ${
                isActive("/dashboard") ? "text-primary" : "text-muted-foreground"
              }`}
              onClick={() => setMobileMenuOpen(false)}
              aria-current={isActive("/dashboard") ? "page" : undefined}
            >
              Dashboard
            </Link>
            <Link
              to="/extension"
              className={`block py-2 text-base font-medium ${
                isActive("/extension") ? "text-primary" : "text-muted-foreground"
              }`}
              onClick={() => setMobileMenuOpen(false)}
              aria-current={isActive("/extension") ? "page" : undefined}
            >
              Extension
            </Link>
            <Link
              to="/about"
              className={`block py-2 text-base font-medium ${
                isActive("/about") ? "text-primary" : "text-muted-foreground"
              }`}
              onClick={() => setMobileMenuOpen(false)}
              aria-current={isActive("/about") ? "page" : undefined}
            >
              About
            </Link>
            <Button 
              onClick={() => {
                navigate("/login");
                setMobileMenuOpen(false);
              }} 
              variant="default" 
              size="lg"
              className="w-full"
            >
              Get Started
            </Button>
          </div>
        )}
      </div>
    </nav>
  );
};

export default Navbar;
