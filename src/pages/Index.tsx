import { motion } from "framer-motion";
import { useNavigate } from "react-router-dom";
import { Mic, Compass, Volume2 } from "lucide-react";
import { Button } from "@/components/ui/button";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import CommandCard from "@/components/CommandCard";
import FeatureSection from "@/components/FeatureSection";
import heroImage from "@/assets/hero-image.jpg";

const Index = () => {
  const navigate = useNavigate();

  return (
    <div className="min-h-screen flex flex-col">
      <Navbar />
      
      <main>
        {/* Hero Section */}
        <section 
          className="relative gradient-hero py-20 sm:py-32 overflow-hidden"
          aria-labelledby="hero-title"
        >
          <div 
            className="absolute inset-0 opacity-20"
            style={{
              backgroundImage: `url(${heroImage})`,
              backgroundSize: 'cover',
              backgroundPosition: 'center',
            }}
            aria-hidden="true"
          />
          
          <div className="container mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8 }}
              className="text-center max-w-4xl mx-auto"
            >
              <h1 
                id="hero-title"
                className="text-4xl sm:text-5xl lg:text-6xl font-bold mb-6 bg-gradient-to-r from-primary to-secondary bg-clip-text text-transparent"
              >
                Voice-Guided Web Navigation for the Visually Impaired
              </h1>
              <p className="text-xl sm:text-2xl text-muted-foreground mb-8 leading-relaxed">
                Navigate the web effortlessly using voice commands. Speak, explore, and browse hands-free with VoiceNav.
              </p>
              
              <div className="flex flex-col sm:flex-row gap-4 justify-center items-center">
                <Button
                  onClick={() => navigate("/dashboard")}
                  size="lg"
                  className="text-lg px-8 py-6 gradient-primary hover:opacity-90 transition-opacity"
                >
                  Start Exploring
                </Button>
                <Button
                  onClick={() => navigate("/extension")}
                  size="lg"
                  variant="outline"
                  className="text-lg px-8 py-6 border-2"
                >
                  Add as Extension
                </Button>
              </div>
            </motion.div>
          </div>

          {/* Animated waves */}
          <div className="absolute bottom-0 left-0 right-0 h-16 overflow-hidden" aria-hidden="true">
            <motion.div
              className="flex gap-4 h-full items-end justify-center pb-4"
              animate={{
                y: [0, -10, 0],
              }}
              transition={{
                duration: 2,
                repeat: Infinity,
                ease: "easeInOut",
              }}
            >
              {[...Array(20)].map((_, i) => (
                <div
                  key={i}
                  className="w-1 bg-gradient-primary rounded-full animate-wave"
                  style={{
                    height: `${20 + (i % 3) * 10}px`,
                    animationDelay: `${i * 0.1}s`,
                  }}
                />
              ))}
            </motion.div>
          </div>
        </section>

        {/* How It Works Section */}
        <FeatureSection 
          title="How It Works"
          subtitle="Three simple steps to accessible web navigation"
        >
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <CommandCard
              icon={Mic}
              title="Speak Commands"
              description="Use natural voice commands to navigate websites, interact with content, and control your browsing experience."
              index={0}
            />
            <CommandCard
              icon={Compass}
              title="Smart Navigation"
              description="Our AI understands context and helps you find exactly what you're looking for with intelligent page analysis."
              index={1}
            />
            <CommandCard
              icon={Volume2}
              title="Hear and Explore"
              description="Listen to web content read aloud with natural text-to-speech and get instant summaries of any page."
              index={2}
            />
          </div>
        </FeatureSection>
      </main>

      <Footer />
    </div>
  );
};

export default Index;
