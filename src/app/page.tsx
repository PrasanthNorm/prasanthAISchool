import Footer from "@/components/footer";
import Hero from "@/components/hero";
import Navbar from "@/components/navbar";
import {
  ArrowUpRight,
  MessageSquare,
  Pencil,
  Languages,
  Zap,
  Headphones,
} from "lucide-react";
import { createClient } from "../../supabase/server";

export default async function Home() {
  const supabase = await createClient();
  const {
    data: { user },
  } = await supabase.auth.getUser();

  return (
    <div className="min-h-screen bg-gradient-to-b from-white to-gray-50">
      <Navbar />
      <Hero />

      {/* Features Section */}
      <section className="py-24 bg-white">
        <div className="container mx-auto px-4">
          <div className="text-center mb-16">
            <h2 className="text-3xl font-bold mb-4">Learn English with AI</h2>
            <p className="text-gray-600 max-w-2xl mx-auto">
              Our interactive AI companion helps you practice speaking, correct
              your sentences, and translate between English and Telugu.
            </p>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
            {[
              {
                icon: <MessageSquare className="w-6 h-6" />,
                title: "AI Friend Module",
                description:
                  "Practice conversations with our interactive cartoon character that listens and responds naturally",
              },
              {
                icon: <Pencil className="w-6 h-6" />,
                title: "Sentence Correction",
                description:
                  "Type English sentences and receive instant grammatical corrections from our AI",
              },
              {
                icon: <Languages className="w-6 h-6" />,
                title: "Translation Feature",
                description:
                  "Voice-based translation between English and Telugu with natural speech output",
              },
              {
                icon: <Zap className="w-6 h-6" />,
                title: "Offline Capability",
                description:
                  "Practice your English skills even without an internet connection",
              },
              {
                icon: <Headphones className="w-6 h-6" />,
                title: "Voice Recognition",
                description:
                  "Advanced speech recognition for natural conversation practice",
              },
              {
                icon: <ArrowUpRight className="w-6 h-6" />,
                title: "Progress Tracking",
                description:
                  "Monitor your improvement with detailed learning analytics",
              },
            ].map((feature, index) => (
              <div
                key={index}
                className="p-6 bg-white rounded-xl shadow-sm hover:shadow-md transition-shadow"
              >
                <div className="text-blue-600 mb-4">{feature.icon}</div>
                <h3 className="text-xl font-semibold mb-2">{feature.title}</h3>
                <p className="text-gray-600">{feature.description}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* How It Works Section */}
      <section className="py-20 bg-blue-50">
        <div className="container mx-auto px-4">
          <div className="text-center mb-16">
            <h2 className="text-3xl font-bold mb-4">How It Works</h2>
            <p className="text-gray-600 max-w-2xl mx-auto">
              Our AI-powered learning platform makes mastering English simple
              and fun
            </p>
          </div>

          <div className="grid md:grid-cols-3 gap-8">
            <div className="text-center p-6">
              <div className="w-16 h-16 bg-blue-100 rounded-full flex items-center justify-center mx-auto mb-4">
                <span className="text-blue-600 text-xl font-bold">1</span>
              </div>
              <h3 className="text-xl font-semibold mb-2">Choose Your Module</h3>
              <p className="text-gray-600">
                Select from conversation practice, sentence correction, or
                translation
              </p>
            </div>
            <div className="text-center p-6">
              <div className="w-16 h-16 bg-blue-100 rounded-full flex items-center justify-center mx-auto mb-4">
                <span className="text-blue-600 text-xl font-bold">2</span>
              </div>
              <h3 className="text-xl font-semibold mb-2">Interact with AI</h3>
              <p className="text-gray-600">
                Speak or type to our friendly AI character and receive instant
                feedback
              </p>
            </div>
            <div className="text-center p-6">
              <div className="w-16 h-16 bg-blue-100 rounded-full flex items-center justify-center mx-auto mb-4">
                <span className="text-blue-600 text-xl font-bold">3</span>
              </div>
              <h3 className="text-xl font-semibold mb-2">
                Track Your Progress
              </h3>
              <p className="text-gray-600">
                See your improvement over time with detailed analytics
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-20 bg-gray-50">
        <div className="container mx-auto px-4 text-center">
          <h2 className="text-3xl font-bold mb-4">
            Start Learning English Today
          </h2>
          <p className="text-gray-600 mb-8 max-w-2xl mx-auto">
            Join thousands of learners who are improving their English skills
            with our AI companion.
          </p>
          <a
            href="/dashboard"
            className="inline-flex items-center px-6 py-3 text-white bg-blue-600 rounded-lg hover:bg-blue-700 transition-colors"
          >
            Get Started Free
            <ArrowUpRight className="ml-2 w-4 h-4" />
          </a>
        </div>
      </section>

      <Footer />
    </div>
  );
}
