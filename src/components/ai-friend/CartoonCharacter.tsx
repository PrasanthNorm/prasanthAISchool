"use client";

import { useState, useEffect } from "react";
import Image from "next/image";

interface CartoonCharacterProps {
  isSpeaking: boolean;
  emotion?: "happy" | "thinking" | "listening" | "neutral";
}

export default function CartoonCharacter({
  isSpeaking = false,
  emotion = "neutral",
}: CartoonCharacterProps) {
  const [characterState, setCharacterState] = useState<string>("neutral");

  useEffect(() => {
    if (isSpeaking) {
      setCharacterState(`${emotion}-speaking`);
    } else {
      setCharacterState(emotion);
    }
  }, [isSpeaking, emotion]);

  // Character images based on state
  const characterImages = {
    happy:
      "https://api.dicebear.com/7.x/bottts/svg?seed=happy&backgroundColor=b6e3f4",
    "happy-speaking":
      "https://api.dicebear.com/7.x/bottts/svg?seed=happy-talk&backgroundColor=b6e3f4",
    thinking:
      "https://api.dicebear.com/7.x/bottts/svg?seed=thinking&backgroundColor=c0aede",
    "thinking-speaking":
      "https://api.dicebear.com/7.x/bottts/svg?seed=thinking-talk&backgroundColor=c0aede",
    listening:
      "https://api.dicebear.com/7.x/bottts/svg?seed=listening&backgroundColor=d1d4f9",
    "listening-speaking":
      "https://api.dicebear.com/7.x/bottts/svg?seed=listening-talk&backgroundColor=d1d4f9",
    neutral:
      "https://api.dicebear.com/7.x/bottts/svg?seed=neutral&backgroundColor=ffdfbf",
    "neutral-speaking":
      "https://api.dicebear.com/7.x/bottts/svg?seed=neutral-talk&backgroundColor=ffdfbf",
  };

  return (
    <div className="relative">
      <div className="w-64 h-64 md:w-80 md:h-80 relative">
        <Image
          src={characterImages[characterState as keyof typeof characterImages]}
          alt="AI Character"
          width={320}
          height={320}
          className="rounded-full bg-blue-100 p-2 border-4 border-blue-300 shadow-lg"
        />

        {/* Speaking animation */}
        {isSpeaking && (
          <div className="absolute -bottom-4 left-1/2 transform -translate-x-1/2 bg-white rounded-full p-2 shadow-md">
            <div className="flex space-x-1">
              <div
                className="w-2 h-2 bg-blue-400 rounded-full animate-bounce"
                style={{ animationDelay: "0ms" }}
              ></div>
              <div
                className="w-2 h-2 bg-blue-500 rounded-full animate-bounce"
                style={{ animationDelay: "150ms" }}
              ></div>
              <div
                className="w-2 h-2 bg-blue-600 rounded-full animate-bounce"
                style={{ animationDelay: "300ms" }}
              ></div>
            </div>
          </div>
        )}
      </div>

      {/* Status indicator */}
      <div className="mt-4 text-center">
        <span className="inline-flex items-center px-3 py-1 rounded-full text-sm font-medium bg-blue-100 text-blue-800">
          {isSpeaking
            ? "Speaking"
            : emotion === "listening"
              ? "Listening"
              : "Ready"}
        </span>
      </div>
    </div>
  );
}
