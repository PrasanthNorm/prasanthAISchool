"use client";

import { useState, useEffect } from "react";
import { UserCircle } from "lucide-react";
import Image from "next/image";

interface AIResponseProps {
  message: string;
  isUser: boolean;
  timestamp?: Date;
}

export default function AIResponse({
  message,
  isUser,
  timestamp = new Date(),
}: AIResponseProps) {
  const [formattedTime, setFormattedTime] = useState<string>("");

  useEffect(() => {
    const hours = timestamp.getHours();
    const minutes = timestamp.getMinutes();
    const formattedHours = hours % 12 || 12; // Convert to 12-hour format
    const amPm = hours >= 12 ? "PM" : "AM";
    const formattedMinutes = minutes < 10 ? `0${minutes}` : minutes;

    setFormattedTime(`${formattedHours}:${formattedMinutes} ${amPm}`);
  }, [timestamp]);

  return (
    <div className={`flex ${isUser ? "justify-end" : "justify-start"} mb-4`}>
      <div
        className={`flex max-w-[80%] ${isUser ? "flex-row-reverse" : "flex-row"}`}
      >
        <div className="flex-shrink-0">
          {isUser ? (
            <div className="w-8 h-8 rounded-full bg-blue-100 flex items-center justify-center">
              <UserCircle className="w-6 h-6 text-blue-600" />
            </div>
          ) : (
            <div className="w-8 h-8 rounded-full overflow-hidden">
              <Image
                src="https://api.dicebear.com/7.x/bottts/svg?seed=neutral&backgroundColor=ffdfbf"
                alt="AI Character"
                width={32}
                height={32}
              />
            </div>
          )}
        </div>

        <div
          className={`mx-2 px-4 py-2 rounded-lg ${
            isUser
              ? "bg-blue-600 text-white rounded-tr-none"
              : "bg-gray-100 text-gray-800 rounded-tl-none"
          }`}
        >
          <p className="text-sm">{message}</p>
          <p className="text-xs mt-1 opacity-70 text-right">{formattedTime}</p>
        </div>
      </div>
    </div>
  );
}
