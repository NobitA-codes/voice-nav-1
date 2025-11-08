import { useState, useEffect, useCallback, useRef } from 'react';

interface UseSpeechRecognitionResult {
  isListening: boolean;
  recognizedText: string;
  startListening: () => void;
  stopListening: () => void;
  error: string | null;
}

const useSpeechRecognition = (): UseSpeechRecognitionResult => {
  const [isListening, setIsListening] = useState(false);
  const [recognizedText, setRecognizedText] = useState('');
  const [error, setError] = useState<string | null>(null);
  
  const recognitionRef = useRef<SpeechRecognition | null>(null);

  //INITIALIZATION-//
  useEffect(() => {
    if (typeof window === 'undefined') return;

    //-CHECK FOR BROWSER SUPPORT-//
    const SpeechRecognition = window.SpeechRecognition || window.webkitSpeechRecognition;
    
    if (!SpeechRecognition) {
      setError('Speech recognition is not supported in this browser.');
      return;
    }

    // Create recognition instance
    recognitionRef.current = new SpeechRecognition();
    const recognition = recognitionRef.current;

    recognition.continuous = true;
    recognition.interimResults = true;
    recognition.lang = 'en-US';

    //EVENT HANDLERS-//
    recognition.onresult = (event) => {
      const results = Array.from(event.results);
      const lastResult = results[results.length - 1];
      const transcript = lastResult[0].transcript;

      setRecognizedText(transcript);
      

      if (lastResult.isFinal) {
        import('../utils/voiceCommandHandler').then(module => {
          module.handleVoiceCommand(transcript);
        });
      }
    };

    recognition.onerror = (event) => {
      setError(`Recognition error: ${event.error}`);
      setIsListening(false);
    };

    recognition.onend = () => {
      setIsListening(false);
    };

    // Cleanup
    return () => {
      if (recognition) {
        recognition.abort();
      }
    };
  }, []);

  const startListening = useCallback(() => {
    if (error) {
      return;
    }

    if (recognitionRef.current) {
      try {
        recognitionRef.current.start();
        setIsListening(true);
        setError(null);
      } catch (err) {
        if (err instanceof Error) {
          setError(err.message);
        }
      }
    }
  }, [error]);

  const stopListening = useCallback(() => {
    if (recognitionRef.current) {
      recognitionRef.current.stop();
      setIsListening(false);
    }
  }, []);

  return {
    isListening,
    recognizedText,
    startListening,
    stopListening,
    error
  };
};

export default useSpeechRecognition;