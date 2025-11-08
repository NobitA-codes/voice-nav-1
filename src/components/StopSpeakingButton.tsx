import React from 'react';
import { Button } from '@/components/ui/button';
import { voiceCommandHandler } from '@/utils/voiceCommandHandler';
import { Square } from 'lucide-react';

const StopSpeakingButton: React.FC = () => {
  const handleStopSpeaking = () => {
    voiceCommandHandler['stopSpeaking']();
  };

  return (
    <Button
      onClick={handleStopSpeaking}
      variant="secondary"
      className="rounded-full h-14 w-14 flex items-center justify-center shadow-md border border-muted-foreground hover:bg-destructive/80 hover:text-white transition-colors"
      aria-label="Stop Speaking"
      title="Stop Speaking"
    >
      <Square className="w-7 h-7 text-destructive" aria-hidden="true" />
    </Button>
  );
};

export default StopSpeakingButton;