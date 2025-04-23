import Link from "next/link";
import { ArrowUpRight, Check, MessageSquare } from "lucide-react";

export default function Hero() {
  return (
    <div className="relative overflow-hidden bg-white">
      {/* Background gradient */}
      <div className="absolute inset-0 bg-gradient-to-br from-blue-50 via-white to-purple-50 opacity-70" />

      <div className="relative pt-24 pb-32 sm:pt-32 sm:pb-40">
        <div className="container mx-auto px-4">
          <div className="grid md:grid-cols-2 gap-12 items-center">
            <div className="text-left max-w-xl">
              <h1 className="text-4xl sm:text-5xl font-bold text-gray-900 mb-6 tracking-tight">
                Learn English with your
                <span className="text-transparent bg-clip-text bg-gradient-to-r from-blue-600 to-purple-600 block">
                  AI Conversation Partner
                </span>
              </h1>

              <p className="text-xl text-gray-600 mb-8 leading-relaxed">
                Practice speaking, correct your sentences, and translate between
                English and Telugu with our interactive AI cartoon character.
              </p>

              <div className="flex flex-col sm:flex-row gap-4 items-start">
                <Link
                  href="/dashboard"
                  className="inline-flex items-center px-6 py-3 text-white bg-blue-600 rounded-lg hover:bg-blue-700 transition-colors text-lg font-medium"
                >
                  Start Learning
                  <ArrowUpRight className="ml-2 w-5 h-5" />
                </Link>

                <Link
                  href="/sign-up"
                  className="inline-flex items-center px-6 py-3 text-gray-700 bg-gray-100 rounded-lg hover:bg-gray-200 transition-colors text-lg font-medium"
                >
                  Create Account
                </Link>
              </div>

              <div className="mt-8 flex flex-col sm:flex-row items-start gap-4 text-sm text-gray-600">
                <div className="flex items-center gap-2">
                  <Check className="w-5 h-5 text-green-500" />
                  <span>Interactive AI character</span>
                </div>
                <div className="flex items-center gap-2">
                  <Check className="w-5 h-5 text-green-500" />
                  <span>Voice recognition</span>
                </div>
                <div className="flex items-center gap-2">
                  <Check className="w-5 h-5 text-green-500" />
                  <span>Telugu translation</span>
                </div>
              </div>
            </div>

            <div className="relative hidden md:block">
              <div className="w-full h-96 bg-blue-100 rounded-xl overflow-hidden relative">
                <div className="absolute inset-0 flex items-center justify-center">
                  <div className="bg-white p-4 rounded-xl shadow-lg w-64 mx-auto">
                    <div className="flex items-start gap-3 mb-3">
                      <div className="w-10 h-10 bg-blue-500 rounded-full flex items-center justify-center text-white">
                        <MessageSquare size={20} />
                      </div>
                      <div className="flex-1 bg-blue-50 p-3 rounded-lg">
                        <p className="text-sm">
                          Hello! I'm your AI language partner. How can I help
                          you practice English today?
                        </p>
                      </div>
                    </div>
                    <div className="flex items-start gap-3">
                      <div className="w-10 h-10 bg-gray-200 rounded-full flex items-center justify-center">
                        <span className="text-sm font-medium">You</span>
                      </div>
                      <div className="flex-1 bg-gray-100 p-3 rounded-lg">
                        <p className="text-sm">
                          Can you help me practice for my job interview?
                        </p>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
