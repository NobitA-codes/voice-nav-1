import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { motion } from "framer-motion";
import { BookOpen, Languages, FileText, LogOut } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Switch } from "@/components/ui/switch";
import { Label } from "@/components/ui/label";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import VoiceButton from "@/components/VoiceButton";
import Loader from "@/components/Loader";

const Dashboard = () => {
  const navigate = useNavigate();
  const [isListening, setIsListening] = useState(false);
  const [demoMode, setDemoMode] = useState(false);
  const [recognizedText, setRecognizedText] = useState("");
  const [commandLog, setCommandLog] = useState([
    "Navigate to homepage",
    "Read main article",
    "Translate to Spanish",
    "Summarize content",
    "Search for accessibility",
  ]);

  const handleVoiceClick = () => {
    setIsListening(!isListening);
    if (!isListening) {
      // Simulate voice recognition
      setTimeout(() => {
        setRecognizedText("Navigate to next section");
        setIsListening(false);
      }, 2000);
    }
  };

  const handleLogout = () => {
    navigate("/login");
  };

  return (
    <div className="min-h-screen flex flex-col">
      <Navbar />
      
      <main className="flex-1 container mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="mb-8 flex items-center justify-between">
          <div>
            <h1 className="text-3xl sm:text-4xl font-bold text-foreground mb-2">
              Hello, User! 👋
            </h1>
            <p className="text-lg text-muted-foreground">
              Let's make browsing easier.
            </p>
          </div>
          <Button
            onClick={handleLogout}
            variant="outline"
            className="gap-2"
            aria-label="Logout from dashboard"
          >
            <LogOut className="h-4 w-4" aria-hidden="true" />
            Logout
          </Button>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Voice Assistant Panel */}
          <div className="lg:col-span-2">
            <Card className="bg-card border-border">
              <CardHeader>
                <CardTitle className="text-2xl">Voice Assistant</CardTitle>
                <CardDescription>Click the microphone to start voice commands</CardDescription>
              </CardHeader>
              <CardContent className="space-y-6">
                {/* Voice Button */}
                <div className="flex flex-col items-center justify-center py-8 gap-6">
                  <VoiceButton
                    isListening={isListening}
                    onClick={handleVoiceClick}
                    size="xl"
                  />
                  {isListening && (
                    <motion.div
                      initial={{ opacity: 0 }}
                      animate={{ opacity: 1 }}
                    >
                      <Loader />
                    </motion.div>
                  )}
                </div>

                {/* Recognized Text */}
                <div className="bg-muted rounded-lg p-6 min-h-[120px]">
                  <Label className="text-sm text-muted-foreground mb-2 block">
                    Recognized Command
                  </Label>
                  <p className="text-lg text-foreground" aria-live="polite">
                    {recognizedText || "Waiting for voice input..."}
                  </p>
                </div>

                {/* Action Buttons */}
                <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
                  <Button variant="outline" className="h-14 gap-2" size="lg">
                    <BookOpen className="h-5 w-5" aria-hidden="true" />
                    Read This Page
                  </Button>
                  <Button variant="outline" className="h-14 gap-2" size="lg">
                    <FileText className="h-5 w-5" aria-hidden="true" />
                    Summarize Content
                  </Button>
                  <Button variant="outline" className="h-14 gap-2" size="lg">
                    <Languages className="h-5 w-5" aria-hidden="true" />
                    Translate Section
                  </Button>
                </div>

                {/* Demo Mode Toggle */}
                <div className="flex items-center justify-between p-4 bg-muted rounded-lg">
                  <div className="space-y-0.5">
                    <Label htmlFor="demo-mode" className="text-base">
                      Demo Mode
                    </Label>
                    <p className="text-sm text-muted-foreground">
                      Simulate voice commands for testing
                    </p>
                  </div>
                  <Switch
                    id="demo-mode"
                    checked={demoMode}
                    onCheckedChange={setDemoMode}
                    aria-label="Toggle demo mode"
                  />
                </div>
              </CardContent>
            </Card>
          </div>

          {/* Command Log & Settings Sidebar */}
          <div className="space-y-6">
            {/* Command Log */}
            <Card className="bg-card border-border">
              <CardHeader>
                <CardTitle>Recent Commands</CardTitle>
                <CardDescription>Your last 5 voice commands</CardDescription>
              </CardHeader>
              <CardContent>
                <ul className="space-y-3" aria-label="Recent command history">
                  {commandLog.map((command, index) => (
                    <li
                      key={index}
                      className="text-sm text-muted-foreground p-3 bg-muted rounded-lg hover:bg-muted/70 transition-colors"
                    >
                      {command}
                    </li>
                  ))}
                </ul>
              </CardContent>
            </Card>

            {/* Quick Settings */}
            <Card className="bg-card border-border">
              <CardHeader>
                <CardTitle>Settings</CardTitle>
                <CardDescription>Quick preferences</CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="space-y-2">
                  <Label className="text-sm text-muted-foreground">Reading Progress</Label>
                  <div className="h-2 bg-muted rounded-full overflow-hidden">
                    <div className="h-full bg-gradient-primary w-3/4" aria-label="75% reading progress" />
                  </div>
                </div>
                <div className="space-y-2">
                  <Label className="text-sm text-muted-foreground">Language Preference</Label>
                  <p className="text-base text-foreground">English (US)</p>
                </div>
                <div className="space-y-2">
                  <Label className="text-sm text-muted-foreground">Voice Speed</Label>
                  <p className="text-base text-foreground">Normal (1.0x)</p>
                </div>
              </CardContent>
            </Card>
          </div>
        </div>
      </main>

      <Footer />
    </div>
  );
};

export default Dashboard;
