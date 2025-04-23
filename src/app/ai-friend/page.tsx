import { Metadata } from "next";
import { redirect } from "next/navigation";
import { createClient } from "../../../supabase/server";
import AIFriendClient from "./client";

export const metadata: Metadata = {
  title: "AI Friend - English Learning Partner",
  description: "Practice your English with an AI conversation partner",
};

export default async function AIFriendPage() {
  const supabase = await createClient();

  const {
    data: { user },
  } = await supabase.auth.getUser();

  if (!user) {
    return redirect("/sign-in");
  }

  return (
    <main className="min-h-screen bg-gradient-to-b from-blue-50 to-white">
      <div className="container mx-auto px-4 py-8">
        <h1 className="text-3xl font-bold text-center mb-8 text-blue-600">
          AI Conversation Partner
        </h1>

        <AIFriendClient />
      </div>
    </main>
  );
}
