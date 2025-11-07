import { Mail } from "lucide-react";

const Footer = () => {
  return (
    <footer className="bg-card border-t border-border mt-auto">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="flex flex-col md:flex-row items-center justify-between gap-4">
          <div className="text-center md:text-left">
            <p className="text-sm text-muted-foreground">
              Built for Hackathon 2025 • Making the web accessible for everyone
            </p>
          </div>
          <div className="flex items-center gap-2">
            <Mail className="h-4 w-4 text-muted-foreground" aria-hidden="true" />
            <a 
              href="mailto:contact@voicenav.com" 
              className="text-sm text-muted-foreground hover:text-primary transition-colors"
              aria-label="Contact us via email"
            >
              contact@voicenav.com
            </a>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
