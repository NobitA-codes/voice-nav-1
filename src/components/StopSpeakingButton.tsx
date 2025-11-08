import React from 'react';
import { Button } from '@/components/ui/button';
import { voiceCommandHandler } from '@/utils/voiceCommandHandler';

const StopSpeakingButton: React.FC = () => {
  const handleStopSpeaking = () => {
    voiceCommandHandler['stopSpeaking']();
  };

  return (
    <Button onClick={handleStopSpeaking} variant="destructive" aria-label="Stop Speaking">
      Stop Speaking
    </Button>
  );
};

export default StopSpeakingButton;