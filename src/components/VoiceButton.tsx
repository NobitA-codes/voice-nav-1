import { motion } from "framer-motion";
import { Mic } from "lucide-react";
import { Button } from "@/components/ui/button";

interface VoiceButtonProps {
  isListening?: boolean;
  onClick?: () => void;
  size?: "default" | "lg" | "xl";
}

const VoiceButton = ({ isListening = false, onClick, size = "xl" }: VoiceButtonProps) => {
  const sizeClasses = {
    default: "h-16 w-16",
    lg: "h-20 w-20",
    xl: "h-24 w-24"
  };

  const iconSizes = {
    default: 24,
    lg: 32,
    xl: 40
  };

  return (
    <div className="relative inline-flex items-center justify-center">
      {/* Pulse rings when listening */}
      {isListening && (
        <>
          <motion.div
            className="absolute inset-0 rounded-full bg-primary/30"
            animate={{
              scale: [1, 1.3, 1],
              opacity: [0.5, 0, 0.5],
            }}
            transition={{
              duration: 2,
              repeat: Infinity,
              ease: "easeInOut",
            }}
            aria-hidden="true"
          />
          <motion.div
            className="absolute inset-0 rounded-full bg-secondary/30"
            animate={{
              scale: [1, 1.5, 1],
              opacity: [0.5, 0, 0.5],
            }}
            transition={{
              duration: 2,
              repeat: Infinity,
              ease: "easeInOut",
              delay: 0.5,
            }}
            aria-hidden="true"
          />
        </>
      )}
      
      {/* Main button */}
      <motion.div
        whileHover={{ scale: 1.05 }}
        whileTap={{ scale: 0.95 }}
      >
        <Button
          onClick={onClick}
          className={`${sizeClasses[size]} rounded-full gradient-primary shadow-lg hover:shadow-xl transition-shadow relative z-10`}
          aria-label={isListening ? "Stop listening" : "Start voice command"}
          aria-pressed={isListening}
        >
          <motion.div
            animate={isListening ? { scale: [1, 1.1, 1] } : {}}
            transition={{
              duration: 0.6,
              repeat: isListening ? Infinity : 0,
              ease: "easeInOut",
            }}
          >
            <Mic className="text-primary-foreground" size={iconSizes[size]} aria-hidden="true" />
          </motion.div>
        </Button>
      </motion.div>
    </div>
  );
};

export default VoiceButton;
