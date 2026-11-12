import type { Metadata } from 'next';
import { Inter } from 'next/font/google';
import './globals.css';

const inter = Inter({ subsets: ['latin'] });

export const metadata: Metadata = {
  title: 'Ingredient Insight AI | EnCode 2026',
  description: 'Your AI-native co-pilot for understanding food ingredients at decision moments',
  keywords: 'AI, nutrition, food labels, ingredients, health, hackathon',
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body className={inter.className}>
        <div className="min-h-screen bg-gradient-to-br from-blue-50 via-white to-green-50">
          {/* Header */}
          <header className="bg-white/80 backdrop-blur-sm border-b border-gray-200 sticky top-0 z-50 shadow-sm">
            <div className="max-w-7xl mx-auto px-4 py-4 flex items-center justify-between">
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 bg-gradient-to-br from-primary-600 to-blue-600 rounded-xl flex items-center justify-center text-white font-bold text-xl shadow-lg">
                  🔍
                </div>
                <div>
                  <h1 className="text-xl font-bold text-gray-900">Ingredient Insight AI</h1>
                  <p className="text-xs text-gray-600">Your AI Nutrition Detective</p>
                </div>
              </div>
              <div className="hidden md:flex items-center gap-2 text-sm">
                <span className="px-3 py-1 bg-primary-100 text-primary-700 rounded-full font-semibold">
                  EnCode 2026
                </span>
                <span className="px-3 py-1 bg-blue-100 text-blue-700 rounded-full font-semibold">
                  IIT Guwahati
                </span>
              </div>
            </div>
          </header>

          {/* Main Content */}
          <main className="max-w-7xl mx-auto px-4 py-8">
            {children}
          </main>

          {/* Footer */}
          <footer className="bg-gray-900 text-white py-8 mt-20">
            <div className="max-w-7xl mx-auto px-4 text-center">
              <p className="text-gray-400 mb-2">
                Built for <span className="text-primary-400 font-semibold">EnCode 2026</span> • UDGAM 2026 @ IIT Guwahati
              </p>
              <p className="text-sm text-gray-500">
                AI-Native Experience • Reasoning-Driven • Uncertainty-Honest
              </p>
              <div className="mt-4 flex items-center justify-center gap-4 text-sm">
                <a href="https://github.com" target="_blank" rel="noopener noreferrer" className="text-gray-400 hover:text-primary-400 transition">
                  GitHub
                </a>
                <span className="text-gray-600">•</span>
                <a href="https://thesys.dev" target="_blank" rel="noopener noreferrer" className="text-gray-400 hover:text-primary-400 transition">
                  Powered by Thesys Concepts
                </a>
              </div>
            </div>
          </footer>
        </div>
      </body>
    </html>
  );
}
