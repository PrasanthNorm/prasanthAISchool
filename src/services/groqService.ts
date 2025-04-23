"use client";

interface GroqMessage {
  role: "system" | "user" | "assistant";
  content: string;
}

interface GroqResponse {
  id: string;
  object: string;
  created: number;
  model: string;
  choices: {
    index: number;
    message: {
      role: string;
      content: string;
    };
    finish_reason: string;
  }[];
  usage: {
    prompt_tokens: number;
    completion_tokens: number;
    total_tokens: number;
  };
}

export class GroqService {
  private apiKey: string;
  private baseUrl: string = "https://api.groq.com/openai/v1/chat/completions";
  private model: string = "llama3-70b-8192";

  constructor(apiKey: string) {
    this.apiKey = apiKey;
  }

  async generateResponse(messages: GroqMessage[]): Promise<string> {
    try {
      if (!this.apiKey) {
        throw new Error(
          "Groq API key is not set. Please set the NEXT_PUBLIC_GROQ_API_KEY environment variable.",
        );
      }

      const response = await fetch(this.baseUrl, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${this.apiKey}`,
        },
        body: JSON.stringify({
          model: this.model,
          messages: messages,
          temperature: 0.7,
          max_tokens: 1024,
        }),
      });

      if (!response.ok) {
        const errorData = await response.json();
        throw new Error(
          `Groq API error: ${errorData.error?.message || response.statusText}`,
        );
      }

      const data: GroqResponse = await response.json();
      return data.choices[0].message.content;
    } catch (error) {
      console.error("Error generating response from Groq:", error);
      throw error;
    }
  }

  // Helper method to create a conversation with the English learning context
  async getEnglishLearningResponse(
    userMessage: string,
    conversationHistory: GroqMessage[] = [],
  ): Promise<string> {
    const systemMessage: GroqMessage = {
      role: "system",
      content: `You are a friendly, patient English language tutor named Tempo. Your goal is to help the user practice conversational English.
      - Speak in simple, clear English that's appropriate for language learners
      - Gently correct grammar mistakes when appropriate
      - Be encouraging and positive
      - Keep responses concise (2-3 sentences)
      - Ask follow-up questions to keep the conversation going
      - If the user is struggling, offer suggestions or simplify your language
      - Occasionally provide alternative phrases or vocabulary to expand their knowledge`,
    };

    const userMessageObj: GroqMessage = {
      role: "user",
      content: userMessage,
    };

    const messages = [systemMessage, ...conversationHistory, userMessageObj];
    return this.generateResponse(messages);
  }
}

// Create a singleton instance for client-side usage
let groqServiceInstance: GroqService | null = null;

export function getGroqService(): GroqService {
  if (typeof window === "undefined") {
    // Server-side - create a new instance each time
    return new GroqService(process.env.NEXT_PUBLIC_GROQ_API_KEY || "");
  }

  // Client-side - use singleton pattern
  if (!groqServiceInstance) {
    groqServiceInstance = new GroqService(
      process.env.NEXT_PUBLIC_GROQ_API_KEY || "",
    );
  }

  return groqServiceInstance;
}
