"use client";

import * as React from "react";
import { Loader2, Mic, Volume2, VolumeX } from "lucide-react";

import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
} from "@/registry/components/dialog";
import Button from "@/registry/components/button/button-shadcn/button";

interface VoiceCommandDialogProps {
  open?: boolean;
  onOpenChange?: (open: boolean) => void;
  onCommand?: (command: string) => Promise<void>;
  isLoading?: boolean;
  suggestions?: string[];
}

export default function VoiceCommandDialog({
  open = false,
  onOpenChange,
  onCommand,
  isLoading = false,
  suggestions = [
    "What's the weather today?",
    "Set a timer for 5 minutes",
    "Play some music",
    "What's on my calendar?",
    "Send a message to John",
  ],
}: VoiceCommandDialogProps) {
  const [isListening, setIsListening] = React.useState(false);
  const [transcript, setTranscript] = React.useState("");
  const [isMuted, setIsMuted] = React.useState(false);
  const [visualizerValues, setVisualizerValues] = React.useState<number[]>(
    Array(20).fill(5)
  );
  const [processingCommand, setProcessingCommand] = React.useState(false);
  const [response, setResponse] = React.useState("");

  React.useEffect(() => {
    if (open) {
      // Auto start listening when dialog opens
      setTimeout(() => {
        startListening();
      }, 500);
    } else {
      // Reset state when dialog closes
      stopListening();
      setTranscript("");
      setResponse("");
      setProcessingCommand(false);
    }
  }, [open]);

  React.useEffect(() => {
    if (isListening) {
      // Simulate microphone activity with random visualizer values
      const interval = setInterval(() => {
        setVisualizerValues(
          Array(20)
            .fill(0)
            .map(() => Math.floor(Math.random() * 20) + 5)
        );
      }, 100);

      return () => clearInterval(interval);
    } else {
      setVisualizerValues(Array(20).fill(5));
    }
  }, [isListening]);

  const startListening = () => {
    setIsListening(true);
    setTranscript("");
    setResponse("");

    // Simulate speech recognition
    // This would be replaced with actual Web Speech API implementation
    const simulatedRecognition = setTimeout(() => {
      const simulatedCommands = [
        "What's the weather like today?",
        "Set a timer for 10 minutes",
        "Show me my calendar for tomorrow",
      ];
      const randomCommand =
        simulatedCommands[Math.floor(Math.random() * simulatedCommands.length)];
      setTranscript(randomCommand);

      // Auto process command after a short delay
      setTimeout(() => {
        processCommand(randomCommand);
      }, 500);
    }, 2000);

    return () => clearTimeout(simulatedRecognition);
  };

  const stopListening = () => {
    setIsListening(false);
  };

  const toggleMute = () => {
    setIsMuted(!isMuted);
  };

  const processCommand = async (command: string) => {
    if (!command.trim() || processingCommand) return;

    setProcessingCommand(true);
    stopListening();

    try {
      await onCommand?.(command);

      // Simulate AI response
      setTimeout(() => {
        const responses = [
          "I've checked the weather for you. It's currently sunny and 72°F.",
          "Timer set for 10 minutes. I'll notify you when it's done.",
          "Here's your calendar for tomorrow. You have 3 meetings scheduled.",
        ];
        setResponse(responses[Math.floor(Math.random() * responses.length)]);
        setProcessingCommand(false);
      }, 1500);
    } catch (error) {
      setResponse(
        "I'm sorry, I couldn't process that command. Please try again."
      );
      setProcessingCommand(false);
    }
  };

  const handleSuggestionClick = (suggestion: string) => {
    setTranscript(suggestion);
    processCommand(suggestion);
  };

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="sm:max-w-[425px]">
        <DialogHeader>
          <DialogTitle className="text-center">Voice Command</DialogTitle>
          <DialogDescription className="text-center">
            {isListening
              ? "Listening... Speak now"
              : transcript
              ? "Processing your command"
              : "Click the microphone and speak a command"}
          </DialogDescription>
        </DialogHeader>

        <div className="mt-4 flex flex-col items-center justify-center">
          <div className="relative mb-6 flex h-24 w-24 items-center justify-center">
            <div
              className={`absolute inset-0 animate-pulse rounded-full ${
                isListening ? "bg-primary/10" : "bg-muted"
              }`}
              style={{ animationDuration: "2s" }}
            ></div>
            <div
              className={`absolute inset-2 animate-pulse rounded-full ${
                isListening ? "bg-primary/20" : "bg-muted/80"
              }`}
              style={{ animationDuration: "1.5s", animationDelay: "0.2s" }}
            ></div>
            <Button
              variant={isListening ? "default" : "outline"}
              size="icon"
              className="relative h-16 w-16"
              onClick={isListening ? stopListening : startListening}
              disabled={processingCommand || isLoading}
            >
              {processingCommand || isLoading ? (
                <Loader2 className="h-6 w-6 animate-spin" />
              ) : isListening ? (
                <Mic className="h-6 w-6" />
              ) : (
                <Mic className="h-6 w-6" />
              )}
            </Button>
          </div>

          {isListening && (
            <div className="mb-4 flex h-12 items-end justify-center space-x-1">
              {visualizerValues.map((value, index) => (
                <div
                  key={index}
                  className="w-1.5 bg-primary transition-all duration-100"
                  style={{ height: `${value}px` }}
                ></div>
              ))}
            </div>
          )}

          {transcript && (
            <div className="mb-4 rounded-lg bg-muted p-3 text-center">
              <p className="font-medium">{transcript}</p>
            </div>
          )}

          {response && (
            <div className="mb-4 rounded-lg border border-primary/20 bg-primary/5 p-3 text-center">
              <p>{response}</p>
            </div>
          )}

          {!transcript && !isListening && (
            <div className="mb-4 grid grid-cols-2 gap-2">
              {suggestions.map((suggestion, index) => (
                <Button
                  key={index}
                  variant="outline"
                  size="sm"
                  onClick={() => handleSuggestionClick(suggestion)}
                  className="h-auto justify-start py-2 text-left text-xs"
                  disabled={processingCommand || isLoading}
                >
                  {suggestion}
                </Button>
              ))}
            </div>
          )}

          <div className="flex justify-center">
            <Button
              variant="ghost"
              size="icon"
              onClick={toggleMute}
              disabled={processingCommand || isLoading}
            >
              {isMuted ? (
                <VolumeX className="h-4 w-4" />
              ) : (
                <Volume2 className="h-4 w-4" />
              )}
              <span className="sr-only">{isMuted ? "Unmute" : "Mute"}</span>
            </Button>
          </div>
        </div>
      </DialogContent>
    </Dialog>
  );
}
