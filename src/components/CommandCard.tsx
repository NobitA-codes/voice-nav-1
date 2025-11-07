import { motion } from "framer-motion";
import { LucideIcon } from "lucide-react";
import { Card, CardContent } from "@/components/ui/card";

interface CommandCardProps {
  icon: LucideIcon;
  title: string;
  description: string;
  index?: number;
}

const CommandCard = ({ icon: Icon, title, description, index = 0 }: CommandCardProps) => {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ delay: index * 0.1, duration: 0.5 }}
    >
      <Card className="bg-card hover:bg-muted/50 transition-colors border-border h-full">
        <CardContent className="p-6 flex flex-col items-center text-center gap-4">
          <div className="bg-gradient-primary p-4 rounded-full">
            <Icon className="h-8 w-8 text-primary-foreground" aria-hidden="true" />
          </div>
          <h3 className="text-xl font-semibold text-foreground">{title}</h3>
          <p className="text-muted-foreground leading-relaxed">{description}</p>
        </CardContent>
      </Card>
    </motion.div>
  );
};

export default CommandCard;
