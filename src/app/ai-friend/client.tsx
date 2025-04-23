"use client";

import { useState, useRef, useEffect } from "react";
import { Mic, MicOff, Send } from "lucide-react";
import { Button } from "@/components/ui/button";
import CartoonCharacter from "@/components/ai-friend/CartoonCharacter";
import AIResponse from "@/components/ai-friend/AIResponse";
import useVoiceInput from "@/hooks/useVoiceInput";
import { GroqService, getGroqService } from "@/services/groqService";

interface Message {
  content: string;
  isUser: boolean;
  timestamp: Date;
}

interface GroqMessage {
  role: "system" | "user" | "assistant";
  content: string;
}

export default function AIFriendClient() {
  const [messages, setMessages] = useState<Message[]>([
    {
      content:
        "Hello! I'm your AI English conversation partner. What would you like to talk about today?",
      isUser: false,
      timestamp: new Date(),
    },
  ]);
  const [inputText, setInputText] = useState<string>("");
  const [isProcessing, setIsProcessing] = useState<boolean>(false);
  const [isSpeaking, setIsSpeaking] = useState<boolean>(false);
  const [characterEmotion, setCharacterEmotion] = useState<
    "happy" | "thinking" | "listening" | "neutral"
  >("happy");
  const messagesEndRef = useRef<HTMLDivElement>(null);
  const textareaRef = useRef<HTMLTextAreaElement>(null);

  const {
    isListening,
    transcript,
    startListening,
    stopListening,
    error: voiceError,
    resetTranscript,
  } = useVoiceInput({
    onResult: (result) => {
      setInputText(result);
    },
    onEnd: () => {
      setCharacterEmotion("neutral");
    },
  });

  // Scroll to bottom of messages
  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [messages]);

  // Update character emotion based on state
  useEffect(() => {
    if (isListening) {
      setCharacterEmotion("listening");
    } else if (isProcessing) {
      setCharacterEmotion("thinking");
    } else if (messages.length > 0 && !messages[messages.length - 1].isUser) {
      setCharacterEmotion("happy");
    } else {
      setCharacterEmotion("neutral");
    }
  }, [isListening, isProcessing, messages]);

  // Convert messages to Groq format for API
  const getGroqMessages = (): GroqMessage[] => {
    return messages.map((msg) => ({
      role: msg.isUser ? "user" : "assistant",
      content: msg.content,
    }));
  };

  const handleSendMessage = async () => {
    if (!inputText.trim() || isProcessing) return;

    try {
      // Add user message
      const userMessage = {
        content: inputText,
        isUser: true,
        timestamp: new Date(),
      };
      setMessages((prev) => [...prev, userMessage]);
      setInputText("");
      setIsProcessing(true);

      // Get conversation history for context
      const conversationHistory = getGroqMessages();

      // Get AI response
      const groqService = getGroqService();
      const response = await groqService.getEnglishLearningResponse(
        inputText,
        conversationHistory,
      );

      // Add AI response
      setMessages((prev) => [
        ...prev,
        {
          content: response,
          isUser: false,
          timestamp: new Date(),
        },
      ]);

      // Simulate AI speaking
      setIsSpeaking(true);
      setTimeout(() => {
        setIsSpeaking(false);
      }, 2000); // Simulate speaking for 2 seconds
    } catch (error) {
      console.error("Error sending message:", error);
      setMessages((prev) => [
        ...prev,
        {
          content:
            "Sorry, I'm having trouble connecting. Please try again later.",
          isUser: false,
          timestamp: new Date(),
        },
      ]);
    } finally {
      setIsProcessing(false);
    }
  };

  const toggleListening = () => {
    if (isListening) {
      stopListening();
      if (transcript) {
        setInputText(transcript);
        // Automatically send the message after stopping listening
        setTimeout(() => {
          if (transcript.trim()) {
            handleSendMessage();
          }
        }, 300);
      }
    } else {
      resetTranscript();
      startListening();
    }
  };

  const handleKeyDown = (e: React.KeyboardEvent) => {
    if (e.key === "Enter" && !e.shiftKey) {
      e.preventDefault();
      handleSendMessage();
    }
  };

  return (
    <div className="flex flex-col lg:flex-row gap-8 items-center justify-center">
      {/* Character Section */}
      <div className="w-full lg:w-1/2 flex justify-center">
        <CartoonCharacter isSpeaking={isSpeaking} emotion={characterEmotion} />
      </div>

      {/* Conversation Section */}
      <div className="w-full lg:w-1/2 bg-white rounded-xl shadow-lg p-6 max-h-[600px] flex flex-col">
        <div className="flex-1 overflow-y-auto mb-4 space-y-4 min-h-[300px]">
          {messages.map((message, index) => (
            <AIResponse
              key={index}
              message={message.content}
              isUser={message.isUser}
              timestamp={message.timestamp}
            />
          ))}
          <div ref={messagesEndRef} />
        </div>

        {/* Input Section */}
        <div className="mt-auto">
          <div className="relative">
            <textarea
              ref={textareaRef}
              className="w-full border rounded-lg p-3 pr-24 resize-none focus:outline-none focus:ring-2 focus:ring-blue-500"
              rows={3}
              placeholder={
                isListening
                  ? "Listening..."
                  : "Type your message or click the microphone to speak..."
              }
              value={inputText}
              onChange={(e) => setInputText(e.target.value)}
              onKeyDown={handleKeyDown}
              disabled={isProcessing}
            />
            <div className="absolute bottom-3 right-3 flex space-x-2">
              <Button
                variant="outline"
                size="icon"
                className={`rounded-full ${isListening ? "bg-red-100 text-red-600" : ""}`}
                onClick={toggleListening}
                disabled={isProcessing}
              >
                {isListening ? (
                  <MicOff className="h-5 w-5" />
                ) : (
                  <Mic className="h-5 w-5 text-blue-600" />
                )}
              </Button>
              <Button
                size="icon"
                className="rounded-full bg-blue-600 hover:bg-blue-700"
                onClick={handleSendMessage}
                disabled={!inputText.trim() || isProcessing}
              >
                <Send className="h-5 w-5" />
              </Button>
            </div>
          </div>
          <div className="flex justify-between items-center mt-2">
            <p className="text-xs text-gray-500">
              {voiceError ? (
                <span className="text-red-500">{voiceError}</span>
              ) : (
                <span>
                  {isListening
                    ? "Listening... Click the microphone again to stop."
                    : "Click the microphone to start speaking."}
                </span>
              )}
            </p>
            {isProcessing && (
              <p className="text-xs text-blue-500 animate-pulse">
                AI is thinking...
              </p>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
