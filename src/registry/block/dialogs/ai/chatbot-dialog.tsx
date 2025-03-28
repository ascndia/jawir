"use client";

import * as React from "react";
import { Bot, Loader2, Mic, MicOff, Send, User, X } from "lucide-react";

import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
} from "@/registry/components/dialog";
import Button from "@/registry/components/button/button-shadcn/button";
import { Textarea } from "@/registry/components/textarea";
import { ScrollArea } from "@/registry/components/scroll-area";
import {
  Avatar,
  AvatarFallback,
  AvatarImage,
} from "@/registry/components/avatar";

interface Message {
  id: string;
  role: "user" | "assistant" | "system";
  content: string;
  timestamp: Date;
}

interface ChatbotDialogProps {
  open?: boolean;
  onOpenChange?: (open: boolean) => void;
  onSendMessage?: (message: string) => Promise<string>;
  onClearChat?: () => void;
  isLoading?: boolean;
  botName?: string;
  botAvatar?: string;
  userAvatar?: string;
  initialMessages?: Message[];
  supportVoice?: boolean;
}

export default function ChatbotDialog({
  open = false,
  onOpenChange,
  onSendMessage,
  onClearChat,
  isLoading = false,
  botName = "AI Assistant",
  botAvatar = "",
  userAvatar = "",
  initialMessages = [],
  supportVoice = true,
}: ChatbotDialogProps) {
  const [messages, setMessages] = React.useState<Message[]>(initialMessages);
  const [input, setInput] = React.useState("");
  const [isRecording, setIsRecording] = React.useState(false);
  const [isThinking, setIsThinking] = React.useState(false);

  const messagesEndRef = React.useRef<HTMLDivElement>(null);
  const inputRef = React.useRef<HTMLTextAreaElement>(null);

  React.useEffect(() => {
    if (open) {
      // Focus input when dialog opens
      setTimeout(() => {
        inputRef.current?.focus();
      }, 100);
    } else {
      // Reset input when dialog closes
      setInput("");
    }
  }, [open]);

  React.useEffect(() => {
    // Scroll to bottom when messages change
    scrollToBottom();
  }, [messages]);

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  };

  const handleSendMessage = async () => {
    if (!input.trim() || isLoading || isThinking) return;

    const userMessage: Message = {
      id: Date.now().toString(),
      role: "user",
      content: input.trim(),
      timestamp: new Date(),
    };

    setMessages((prev) => [...prev, userMessage]);
    setInput("");
    setIsThinking(true);

    try {
      const response = (await onSendMessage?.(input.trim())) || "";

      const assistantMessage: Message = {
        id: (Date.now() + 1).toString(),
        role: "assistant",
        content: response,
        timestamp: new Date(),
      };

      setMessages((prev) => [...prev, assistantMessage]);
    } catch (error) {
      const errorMessage: Message = {
        id: (Date.now() + 1).toString(),
        role: "assistant",
        content:
          "I'm sorry, I encountered an error processing your request. Please try again.",
        timestamp: new Date(),
      };

      setMessages((prev) => [...prev, errorMessage]);
    } finally {
      setIsThinking(false);
    }
  };

  const handleKeyDown = (e: React.KeyboardEvent<HTMLTextAreaElement>) => {
    if (e.key === "Enter" && !e.shiftKey) {
      e.preventDefault();
      handleSendMessage();
    }
  };

  const toggleRecording = () => {
    // This would be implemented with actual speech recognition
    setIsRecording(!isRecording);

    if (!isRecording) {
      // Start recording
      // This is a placeholder for actual speech recognition implementation
      setTimeout(() => {
        setInput("This is a simulated voice input");
        setIsRecording(false);
      }, 2000);
    }
  };

  const handleClearChat = () => {
    onClearChat?.();
    setMessages([]);
  };

  const formatTime = (date: Date) => {
    return date.toLocaleTimeString([], { hour: "2-digit", minute: "2-digit" });
  };

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="sm:max-w-[500px] sm:h-[600px] flex flex-col">
        <DialogHeader className="flex flex-row items-center justify-between">
          <div className="flex items-center gap-2">
            <Avatar className="h-8 w-8">
              <AvatarImage src={botAvatar} alt={botName} />
              <AvatarFallback>
                <Bot className="h-4 w-4" />
              </AvatarFallback>
            </Avatar>
            <div>
              <DialogTitle>{botName}</DialogTitle>
              <DialogDescription className="text-xs">
                {isThinking ? "Thinking..." : "Online"}
              </DialogDescription>
            </div>
          </div>
          <Button
            variant="ghost"
            size="icon"
            onClick={handleClearChat}
            disabled={messages.length === 0 || isLoading || isThinking}
          >
            <X className="h-4 w-4" />
            <span className="sr-only">Clear chat</span>
          </Button>
        </DialogHeader>

        <ScrollArea className="flex-1 pr-4">
          <div className="space-y-4 py-4">
            {messages.length === 0 ? (
              <div className="flex h-full flex-col items-center justify-center text-center text-muted-foreground">
                <Bot className="mb-2 h-12 w-12 opacity-50" />
                <p className="text-lg font-medium">How can I help you today?</p>
                <p className="text-sm">
                  Ask me anything or start a conversation.
                </p>
              </div>
            ) : (
              messages.map((message) => (
                <div
                  key={message.id}
                  className={`flex ${
                    message.role === "user" ? "justify-end" : "justify-start"
                  }`}
                >
                  <div
                    className={`flex max-w-[80%] gap-3 rounded-lg p-3 ${
                      message.role === "user"
                        ? "bg-primary text-primary-foreground"
                        : "bg-muted"
                    }`}
                  >
                    {message.role !== "user" && (
                      <Avatar className="h-8 w-8">
                        <AvatarImage src={botAvatar} alt={botName} />
                        <AvatarFallback>
                          <Bot className="h-4 w-4" />
                        </AvatarFallback>
                      </Avatar>
                    )}
                    <div>
                      <div className="whitespace-pre-wrap text-sm">
                        {message.content}
                      </div>
                      <div
                        className={`mt-1 text-right text-xs ${
                          message.role === "user"
                            ? "text-primary-foreground/70"
                            : "text-muted-foreground"
                        }`}
                      >
                        {formatTime(message.timestamp)}
                      </div>
                    </div>
                    {message.role === "user" && (
                      <Avatar className="h-8 w-8">
                        <AvatarImage src={userAvatar} alt="You" />
                        <AvatarFallback>
                          <User className="h-4 w-4" />
                        </AvatarFallback>
                      </Avatar>
                    )}
                  </div>
                </div>
              ))
            )}
            {isThinking && (
              <div className="flex justify-start">
                <div className="flex max-w-[80%] gap-3 rounded-lg bg-muted p-3">
                  <Avatar className="h-8 w-8">
                    <AvatarImage src={botAvatar} alt={botName} />
                    <AvatarFallback>
                      <Bot className="h-4 w-4" />
                    </AvatarFallback>
                  </Avatar>
                  <div className="flex items-center">
                    <div className="flex space-x-1">
                      <div className="h-2 w-2 animate-bounce rounded-full bg-muted-foreground/50"></div>
                      <div
                        className="h-2 w-2 animate-bounce rounded-full bg-muted-foreground/50"
                        style={{ animationDelay: "0.2s" }}
                      ></div>
                      <div
                        className="h-2 w-2 animate-bounce rounded-full bg-muted-foreground/50"
                        style={{ animationDelay: "0.4s" }}
                      ></div>
                    </div>
                  </div>
                </div>
              </div>
            )}
            <div ref={messagesEndRef} />
          </div>
        </ScrollArea>

        <div className="mt-4">
          <div className="relative">
            <Textarea
              ref={inputRef}
              value={input}
              onChange={(e) => setInput(e.target.value)}
              onKeyDown={handleKeyDown}
              placeholder="Type your message..."
              className="min-h-[80px] resize-none pr-20"
              disabled={isLoading || isThinking || isRecording}
            />
            <div className="absolute bottom-2 right-2 flex items-center gap-2">
              {supportVoice && (
                <Button
                  variant="ghost"
                  size="icon"
                  onClick={toggleRecording}
                  disabled={isLoading || isThinking}
                  className={isRecording ? "text-destructive" : ""}
                >
                  {isRecording ? (
                    <MicOff className="h-4 w-4" />
                  ) : (
                    <Mic className="h-4 w-4" />
                  )}
                  <span className="sr-only">
                    {isRecording ? "Stop recording" : "Start recording"}
                  </span>
                </Button>
              )}
              <Button
                size="icon"
                onClick={handleSendMessage}
                disabled={!input.trim() || isLoading || isThinking}
              >
                {isLoading || isThinking ? (
                  <Loader2 className="h-4 w-4 animate-spin" />
                ) : (
                  <Send className="h-4 w-4" />
                )}
                <span className="sr-only">Send message</span>
              </Button>
            </div>
          </div>
        </div>
      </DialogContent>
    </Dialog>
  );
}
