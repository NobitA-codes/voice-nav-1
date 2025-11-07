import { motion } from "framer-motion";
import { Heart, Code, Users, ArrowLeft } from "lucide-react";
import { useNavigate } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import CommandCard from "@/components/CommandCard";

const About = () => {
  const navigate = useNavigate();

  const techStack = [
    "React",
    "TypeScript",
    "Tailwind CSS",
    "Framer Motion",
    "MongoDB (Planned)",
    "Web Speech API (Planned)",
    "OpenAI API (Planned)",
  ];

  return (
    <div className="min-h-screen flex flex-col">
      <Navbar />
      
      <main className="flex-1">
        <section className="gradient-hero py-16 px-4 sm:px-6 lg:px-8">
          <div className="container mx-auto max-w-4xl">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6 }}
              className="text-center"
            >
              <h1 className="text-4xl sm:text-5xl font-bold mb-6 bg-gradient-to-r from-primary to-secondary bg-clip-text text-transparent">
                About VoiceNav
              </h1>
              <p className="text-xl text-muted-foreground leading-relaxed max-w-3xl mx-auto">
                Making the web accessible for everyone through the power of voice. VoiceNav is designed to empower visually impaired users with seamless, voice-guided web navigation.
              </p>
            </motion.div>
          </div>
        </section>

        <section className="py-16 px-4 sm:px-6 lg:px-8 bg-background">
          <div className="container mx-auto max-w-6xl">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.2, duration: 0.6 }}
            >
              <h2 className="text-3xl font-bold text-center mb-12 text-foreground">
                Our Mission
              </h2>

              <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-16">
                <CommandCard
                  icon={Heart}
                  title="Accessibility First"
                  description="We believe the internet should be accessible to everyone, regardless of visual ability. VoiceNav breaks down barriers."
                  index={0}
                />
                <CommandCard
                  icon={Code}
                  title="Innovation"
                  description="Leveraging cutting-edge voice recognition and AI technology to create a seamless browsing experience."
                  index={1}
                />
                <CommandCard
                  icon={Users}
                  title="Community Driven"
                  description="Built with feedback from visually impaired users to ensure real-world usability and impact."
                  index={2}
                />
              </div>

              <Card className="bg-card border-border mb-12">
                <CardContent className="p-8">
                  <h3 className="text-2xl font-semibold mb-6 text-foreground text-center">
                    Technology Stack
                  </h3>
                  <div className="flex flex-wrap gap-3 justify-center">
                    {techStack.map((tech, index) => (
                      <motion.div
                        key={index}
                        initial={{ opacity: 0, scale: 0.9 }}
                        animate={{ opacity: 1, scale: 1 }}
                        transition={{ delay: 0.4 + index * 0.05, duration: 0.3 }}
                      >
                        <Badge variant="secondary" className="text-base px-4 py-2">
                          {tech}
                        </Badge>
                      </motion.div>
                    ))}
                  </div>
                </CardContent>
              </Card>

              <Card className="bg-muted border-border mb-8">
                <CardContent className="p-8 text-center">
                  <h3 className="text-2xl font-semibold mb-4 text-foreground">
                    Hackathon Project 2025
                  </h3>
                  <p className="text-muted-foreground text-lg leading-relaxed max-w-2xl mx-auto">
                    VoiceNav was created for Hackathon 2025 with a vision to make web browsing more inclusive. 
                    This is a working prototype showcasing the frontend interface and user experience. 
                    Backend integrations including MongoDB, AI-powered summarization, and speech APIs are planned for future development.
                  </p>
                </CardContent>
              </Card>

              <div className="text-center">
                <Button
                  onClick={() => navigate("/")}
                  variant="outline"
                  size="lg"
                  className="gap-2"
                >
                  <ArrowLeft className="h-4 w-4" aria-hidden="true" />
                  Back to Home
                </Button>
              </div>
            </motion.div>
          </div>
        </section>
      </main>

      <Footer />
    </div>
  );
};

export default About;
