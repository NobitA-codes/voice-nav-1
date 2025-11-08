interface CommandPattern {
  patterns: string[];
  action: () => void;
  feedback: string;
}

interface VoiceConfig {
  voice: string;     
  rate: number;      
  pitch: number;      
  volume: number;    
  language: string;  
}

class VoiceCommandHandler {
  private isSpeaking = false;
  private speechSynth: SpeechSynthesis | null = null;
  private commands: CommandPattern[] = [];
  private voiceConfig: VoiceConfig = {
    voice: '',        
    rate: 1.0,       
    pitch: 1.0,      
    volume: 1.0,     
    language: 'en-US'
  };
  private availableVoices: SpeechSynthesisVoice[] = [];

  
  private lastFeedback: string = ''; 
  // Stores the last spoken feedback message

  constructor() {
    if (typeof window !== 'undefined') {
      this.speechSynth = window.speechSynthesis;
      this.initializeCommands();
      this.initializeVoices();
    }
  }

  private initializeVoices() {
    // Load available voices
    const loadVoices = () => {
      this.availableVoices = this.speechSynth?.getVoices() || [];
      if (this.availableVoices.length > 0) {
        // Set default to first English voice found, or first available voice
        const defaultVoice = this.availableVoices.find(voice => voice.lang.startsWith('en')) || this.availableVoices[0];
        this.voiceConfig.voice = defaultVoice.name;
      }
    };

    // Chrome loads voices asynchronously
    if (this.speechSynth) {
      this.speechSynth.onvoiceschanged = loadVoices;
      loadVoices(); // Initial load attempt
    }
  }

  public setVoiceConfig(config: Partial<VoiceConfig>) {
    this.voiceConfig = { ...this.voiceConfig, ...config };
  }

  public getAvailableVoices(): { name: string; language: string }[] {
    return this.availableVoices.map(voice => ({
      name: voice.name,
      language: voice.lang
    }));
  }

  // Updated the speak method to store the last feedback
  private speak(text: string) {
    if (!this.speechSynth) return;

    const utterance = new SpeechSynthesisUtterance(text);

    // Apply voice configuration
    utterance.lang = this.voiceConfig.language;
    utterance.rate = this.voiceConfig.rate;
    utterance.pitch = this.voiceConfig.pitch;
    utterance.volume = this.voiceConfig.volume;

    // Set the selected voice if available
    const selectedVoice = this.availableVoices.find(voice => voice.name === this.voiceConfig.voice);
    if (selectedVoice) {
      utterance.voice = selectedVoice;
    }

    this.lastFeedback = text; // Store the last feedback message
    this.speechSynth.speak(utterance);
  }

  private stopSpeaking() {
    if (!this.speechSynth) return;
    this.speechSynth.cancel();
    this.isSpeaking = false;
  }

  private includesAny(command: string, patterns: string[]): boolean {
    return patterns.some(pattern => command.toLowerCase().includes(pattern));
  }

  private scrollBy(x: number, y: number) {
    if (typeof window !== 'undefined') {
      window.scrollBy({ top: y, left: x, behavior: 'smooth' });
    }
  }

  private initializeCommands() {
    this.commands = [
      {
        patterns: ['go down', 'move down', 'go down', 'down'],
        action: () => this.scrollBy(0, 600),
        feedback: 'Scrolling down...'
      },
      {
        patterns: ['scroll up', 'move up', 'go up'],
        action: () => this.scrollBy(0, -600),
        feedback: 'Scrolling up...'
      },
      {
        patterns: ['top', 'scroll to top', 'go to top'],
        action: () => window.scrollTo({ top: 0, behavior: 'smooth' }),
        feedback: 'Moving to top of page...'
      },
      {
        patterns: ['back', 'go back', 'previous page'],
        action: () => window.history.back(),
        feedback: 'Going back...'
      },
      {
        patterns: ['forward', 'go forward', 'next page'],
        action: () => window.history.forward(),
        feedback: 'Going forward...'
      },
      {
        patterns: ['stop', 'stop reading', 'stop speaking'],
        action: () => this.stopSpeaking(),
        feedback: 'Stopping...'
      },
    //   {
    //     patterns: ['dark mode', 'dark theme', 'switch to dark'],
    //     action: () => document.documentElement.classList.add('dark'),
    //     feedback: 'Switching to dark mode...'
    //  },
    //   {
    //     patterns: ['light mode', 'light theme', 'switch to light'],
    //     action: () => document.documentElement.classList.remove('dark'),
    //     feedback: 'Switching to light mode...'
    //   },
      {
        patterns: ['click', 'click first', 'select first'],
        action: () => {
          const firstClickable = document.querySelector('button, a') as HTMLElement;
          if (firstClickable) firstClickable.click();
        },
        feedback: 'Clicking first interactive element...'
      },
      {
        patterns: ['highlight the headings', 'mark headings', 'highlight headings'],
        action: () => {
          document.querySelectorAll('h1, h2, h3, h4, h5, h6').forEach(heading => {
            (heading as HTMLElement).style.backgroundColor = 'yellow';
          });
        },
        feedback: 'Highlighting headings...'
      },
      {
        patterns: ['read', 'read this', 'read aloud', 'speak'],
        action: () => {
          if (this.isSpeaking) {
            this.stopSpeaking();
            return;
          }

          const mainContent = document.querySelector('main');
          if (mainContent) {
            this.isSpeaking = true;
            this.speak(mainContent.textContent || '');
          }
        },
        feedback: 'Reading content...'
      },
      {
        patterns: ['article', 'open article', 'show article', 'first article'],
        action: () => {
          const article = document.querySelector('article');
          if (article) {
            article.scrollIntoView({ behavior: 'smooth', block: 'start' });
          }
        },
        feedback: 'Opening first article...'
      },
      {
        patterns: ['speak faster', 'increase speed', 'faster voice'],
        action: () => {
          const newRate = Math.min(this.voiceConfig.rate + 0.2, 2.0);
          this.setVoiceConfig({ rate: newRate });
        },
        feedback: 'Speaking faster now'
      },
      {
        patterns: ['speak slower', 'decrease speed', 'slower voice'],
        action: () => {
          const newRate = Math.max(this.voiceConfig.rate - 0.2, 0.5);
          this.setVoiceConfig({ rate: newRate });
        },
        feedback: 'Speaking slower now'
      },
      {
        patterns: ['higher pitch', 'increase pitch'],
        action: () => {
          const newPitch = Math.min(this.voiceConfig.pitch + 0.2, 2.0);
          this.setVoiceConfig({ pitch: newPitch });
        },
        feedback: 'Increased pitch'
      },
      {
        patterns: ['lower pitch', 'decrease pitch'],
        action: () => {
          const newPitch = Math.max(this.voiceConfig.pitch - 0.2, 0.5);
          this.setVoiceConfig({ pitch: newPitch });
        },
        feedback: 'Decreased pitch'
      },
      {
        patterns: ['increase volume', 'louder', 'speak louder'],
        action: () => {
          const newVolume = Math.min(this.voiceConfig.volume + 0.2, 1.0);
          this.setVoiceConfig({ volume: newVolume });
        },
        feedback: 'Increased volume'
      },
      {
        patterns: ['decrease volume', 'quieter', 'speak quieter'],
        action: () => {
          const newVolume = Math.max(this.voiceConfig.volume - 0.2, 0.2);
          this.setVoiceConfig({ volume: newVolume });
        },
        feedback: 'Decreased volume'
      }
    ];
  }

  public handleCommand(command: string): void {
    if (!command) return;
    
    const normalizedCommand = command.toLowerCase().trim();
    
    // Find matching command
    const matchedCommand = this.commands.find(cmd => 
      this.includesAny(normalizedCommand, cmd.patterns)
    );

    if (matchedCommand) {
      try {
        matchedCommand.action();
        this.speak(matchedCommand.feedback);
      } catch (error) {
        console.error('Error executing command:', error);
        this.speak('Sorry, there was an error executing that command.');
      }
    } else {
      this.speak("Sorry, I didn't understand that. Try saying 'scroll down' or 'read this section'.");
    }
  }
}

// Create singleton instance
export const voiceCommandHandler = new VoiceCommandHandler();

export const handleVoiceCommand = (command: string) => {
  voiceCommandHandler.handleCommand(command);
};