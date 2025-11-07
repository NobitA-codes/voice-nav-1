import { motion } from "framer-motion";
import { Download, Chrome, CheckCircle, ArrowLeft } from "lucide-react";
import { useNavigate } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";

const Extension = () => {
  const navigate = useNavigate();

  const features = [
    "Works on all websites",
    "Voice command support",
    "Text-to-speech reading",
    "Smart content summarization",
    "Multi-language translation",
    "Privacy-focused design",
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
                Add VoiceNav as a Browser Extension
              </h1>
              <p className="text-xl text-muted-foreground mb-8 max-w-2xl mx-auto leading-relaxed">
                Enable voice commands and accessibility features across all websites. Browse the web hands-free with VoiceNav extension.
              </p>
              
              <Button
                size="lg"
                className="text-lg px-8 py-6 gradient-primary hover:opacity-90 transition-opacity gap-3"
                aria-label="Download VoiceNav extension"
              >
                <Download className="h-6 w-6" aria-hidden="true" />
                Download / Add Extension
              </Button>

              <p className="text-sm text-muted-foreground mt-4 flex items-center justify-center gap-2">
                <Chrome className="h-4 w-4" aria-hidden="true" />
                Compatible with Chrome, Edge, and Brave
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
                Extension Features
              </h2>

              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mb-12">
                {features.map((feature, index) => (
                  <motion.div
                    key={index}
                    initial={{ opacity: 0, scale: 0.9 }}
                    animate={{ opacity: 1, scale: 1 }}
                    transition={{ delay: 0.3 + index * 0.1, duration: 0.4 }}
                  >
                    <Card className="bg-card border-border h-full">
                      <CardContent className="p-6 flex items-center gap-4">
                        <CheckCircle className="h-6 w-6 text-primary flex-shrink-0" aria-hidden="true" />
                        <p className="text-foreground text-base">{feature}</p>
                      </CardContent>
                    </Card>
                  </motion.div>
                ))}
              </div>

              <Card className="bg-muted border-border">
                <CardContent className="p-8">
                  <h3 className="text-2xl font-semibold mb-4 text-foreground">
                    How to Install
                  </h3>
                  <ol className="space-y-4 text-muted-foreground list-decimal list-inside">
                    <li className="text-base">Click the "Download / Add Extension" button above</li>
                    <li className="text-base">Your browser will prompt you to add the extension</li>
                    <li className="text-base">Click "Add to Browser" to confirm installation</li>
                    <li className="text-base">Grant necessary permissions for voice access</li>
                    <li className="text-base">Start browsing with voice commands on any website!</li>
                  </ol>
                </CardContent>
              </Card>

              <div className="mt-8 text-center">
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

export default Extension;
