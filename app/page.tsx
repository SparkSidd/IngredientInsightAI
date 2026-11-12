'use client';

import React, { useState } from 'react';
import IngredientInput from '@/components/IngredientInput';
import InsightDisplay from '@/components/InsightDisplay';
import { Sparkles, Brain, Shield, Zap } from 'lucide-react';

export default function HomePage() {
  const [analysisResult, setAnalysisResult] = useState<any>(null);
  const [isProcessing, setIsProcessing] = useState(false);
  const [error, setError] = useState<string>('');

  const handleAnalyze = async (data: {
    imageFile?: File;
    imagePreview?: string;
    ingredients: string;
    userNote: string;
    productType: string;
  }) => {
    setIsProcessing(true);
    setError('');
    setAnalysisResult(null);

    try {
      const response = await fetch('/api/analyze', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          ingredients: data.ingredients,
          productType: data.productType,
          userNote: data.userNote,
        }),
      });

      if (!response.ok) {
        const errorData = await response.json();
        throw new Error(errorData.error || 'Analysis failed');
      }

      const result = await response.json();
      setAnalysisResult(result);

      // Scroll to results
      setTimeout(() => {
        document.getElementById('results')?.scrollIntoView({ behavior: 'smooth' });
      }, 100);
    } catch (err: any) {
      console.error('Analysis error:', err);
      setError(err.message || 'Failed to analyze ingredients. Please try again.');
    } finally {
      setIsProcessing(false);
    }
  };

  return (
    <div className="space-y-12">
      {/* Hero Section */}
      <section className="text-center py-12 animate-fadeIn">
        <div className="inline-block mb-4">
          <span className="px-4 py-2 bg-gradient-to-r from-primary-100 to-blue-100 text-primary-700 rounded-full text-sm font-semibold border border-primary-200">
            ✨ AI-Native Experience for EnCode 2026
          </span>
        </div>
        <h1 className="text-5xl md:text-6xl font-extrabold text-gray-900 mb-6 leading-tight">
          Decode Food Labels
          <br />
          <span className="bg-gradient-to-r from-primary-600 to-blue-600 bg-clip-text text-transparent">
            With AI Intelligence
          </span>
        </h1>
        <p className="text-xl text-gray-600 max-w-3xl mx-auto leading-relaxed">
          Your personal nutrition detective that infers intent, reasons through ingredients, 
          and communicates uncertainty — no forms, no friction, just insights.
        </p>

        {/* Feature Pills */}
        <div className="flex flex-wrap items-center justify-center gap-4 mt-8">
          <div className="flex items-center gap-2 px-4 py-2 bg-white rounded-xl shadow-md border border-gray-200">
            <Brain className="text-primary-600" size={20} />
            <span className="text-sm font-semibold text-gray-700">Intent Inference</span>
          </div>
          <div className="flex items-center gap-2 px-4 py-2 bg-white rounded-xl shadow-md border border-gray-200">
            <Sparkles className="text-blue-600" size={20} />
            <span className="text-sm font-semibold text-gray-700">Reasoning Engine</span>
          </div>
          <div className="flex items-center gap-2 px-4 py-2 bg-white rounded-xl shadow-md border border-gray-200">
            <Shield className="text-green-600" size={20} />
            <span className="text-sm font-semibold text-gray-700">Uncertainty Honest</span>
          </div>
          <div className="flex items-center gap-2 px-4 py-2 bg-white rounded-xl shadow-md border border-gray-200">
            <Zap className="text-yellow-600" size={20} />
            <span className="text-sm font-semibold text-gray-700">Dynamic UI</span>
          </div>
        </div>
      </section>

      {/* Input Section */}
      <section>
        <IngredientInput onSubmit={handleAnalyze} isProcessing={isProcessing} />
      </section>

      {/* Error Display */}
      {error && (
        <div className="max-w-4xl mx-auto p-6 bg-red-50 border-2 border-red-200 rounded-xl">
          <p className="text-red-800 font-semibold">⚠️ {error}</p>
          <p className="text-sm text-red-600 mt-2">
            Make sure your .env file has a valid GEMINI_API_KEY
          </p>
        </div>
      )}

      {/* Results Section */}
      {analysisResult && (
        <section id="results" className="animate-fadeIn">
          <div className="text-center mb-8">
            <h2 className="text-3xl font-bold text-gray-900 mb-2">
              AI Analysis Complete ✨
            </h2>
            <p className="text-gray-600">
              Here's what your nutrition detective discovered
            </p>
          </div>
          <InsightDisplay data={analysisResult} />
        </section>
      )}

      {/* How It Works Section */}
      {!analysisResult && (
        <section className="max-w-4xl mx-auto py-12">
          <h2 className="text-3xl font-bold text-center text-gray-900 mb-12">
            How It Works
          </h2>
          <div className="grid md:grid-cols-3 gap-8">
            <div className="text-center p-6 bg-white rounded-xl shadow-lg border border-gray-100">
              <div className="w-16 h-16 bg-primary-100 rounded-full flex items-center justify-center mx-auto mb-4">
                <span className="text-3xl">📸</span>
              </div>
              <h3 className="text-xl font-bold text-gray-900 mb-2">1. Upload or Paste</h3>
              <p className="text-gray-600">
                Snap a photo or paste the ingredient list. Optional: add context via voice or text.
              </p>
            </div>
            <div className="text-center p-6 bg-white rounded-xl shadow-lg border border-gray-100">
              <div className="w-16 h-16 bg-blue-100 rounded-full flex items-center justify-center mx-auto mb-4">
                <span className="text-3xl">🧠</span>
              </div>
              <h3 className="text-xl font-bold text-gray-900 mb-2">2. AI Reasoning</h3>
              <p className="text-gray-600">
                Watch the AI infer your intent, analyze ingredients, and reason through trade-offs.
              </p>
            </div>
            <div className="text-center p-6 bg-white rounded-xl shadow-lg border border-gray-100">
              <div className="w-16 h-16 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-4">
                <span className="text-3xl">💡</span>
              </div>
              <h3 className="text-xl font-bold text-gray-900 mb-2">3. Get Insights</h3>
              <p className="text-gray-600">
                Receive visual breakdowns, uncertainty badges, and actionable recommendations.
              </p>
            </div>
          </div>
        </section>
      )}

      {/* Problem Statement Alignment */}
      <section className="max-w-4xl mx-auto py-12 bg-gradient-to-r from-purple-50 to-pink-50 rounded-2xl p-8">
        <h2 className="text-2xl font-bold text-center text-gray-900 mb-6">
          Why This Matters: The EnCode 2026 Challenge
        </h2>
        <div className="space-y-4 text-gray-700">
          <p className="leading-relaxed">
            <strong className="text-purple-700">The Problem:</strong> Food labels are designed for compliance, not understanding. 
            Consumers face long chemical names, conflicting guidance, and high friction tools that treat AI as an add-on.
          </p>
          <p className="leading-relaxed">
            <strong className="text-purple-700">Our Approach:</strong> Make AI the interface, not a feature. 
            This co-pilot infers intent automatically, reasons through scientific trade-offs, and communicates uncertainty honestly — 
            minimizing cognitive load at decision moments.
          </p>
          <p className="leading-relaxed">
            <strong className="text-purple-700">Impact:</strong> Empowered consumers who understand not just "what's in it" 
            but "why it matters" and "what should I do about it."
          </p>
        </div>
      </section>
    </div>
  );
}
