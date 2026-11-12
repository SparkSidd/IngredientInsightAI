'use client';

import React from 'react';
import { Chart as ChartJS, ArcElement, Tooltip, Legend, CategoryScale, LinearScale, BarElement, Title } from 'chart.js';
import PieChart from './PieChart';
import BarChart from './BarChart';
import UncertaintyBadge from './UncertaintyBadge';
import { motion } from 'framer-motion';
import { AlertCircle, CheckCircle, Info, TrendingUp, Shield } from 'lucide-react';

ChartJS.register(ArcElement, Tooltip, Legend, CategoryScale, LinearScale, BarElement, Title);

interface InsightDisplayProps {
  data: {
    intent: string;
    reasoning: string[];
    insights: {
      breakdown?: { labels: string[]; values: number[] };
      tradeoffs?: { labels: string[]; values: number[] };
      keyPoints: string[];
      concerns: string[];
      positives: string[];
    };
    uncertainty: {
      overall: 'high' | 'medium' | 'low';
      notes: string[];
    };
    summary: string;
    actions: string[];
  };
}

export default function InsightDisplay({ data }: InsightDisplayProps) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5 }}
      className="w-full max-w-4xl mx-auto space-y-6"
    >
      {/* Inferred Intent */}
      <div className="bg-gradient-to-r from-primary-50 to-blue-50 border-l-4 border-primary-600 rounded-xl p-6 shadow-md">
        <div className="flex items-start gap-3">
          <Info className="text-primary-600 mt-1 flex-shrink-0" size={24} />
          <div>
            <h3 className="text-lg font-bold text-gray-900 mb-2">🎯 Inferred Intent</h3>
            <p className="text-gray-700 leading-relaxed">{data.intent}</p>
          </div>
        </div>
      </div>

      {/* Reasoning Steps */}
      <div className="bg-white rounded-xl p-6 shadow-lg border border-gray-200">
        <h3 className="text-xl font-bold text-gray-900 mb-4 flex items-center gap-2">
          <TrendingUp className="text-blue-600" size={24} />
          Step-by-Step Reasoning
        </h3>
        <div className="space-y-3">
          {data.reasoning.map((step, idx) => (
            <motion.div
              key={idx}
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: idx * 0.1 }}
              className="flex gap-3 items-start"
            >
              <div className="flex-shrink-0 w-8 h-8 bg-primary-100 text-primary-700 rounded-full flex items-center justify-center font-bold text-sm">
                {idx + 1}
              </div>
              <p className="text-gray-700 leading-relaxed pt-1">{step}</p>
            </motion.div>
          ))}
        </div>
      </div>

      {/* Visual Insights Grid */}
      <div className="grid md:grid-cols-2 gap-6">
        {/* Breakdown Chart */}
        {data.insights.breakdown && (
          <div className="bg-white rounded-xl p-6 shadow-lg border border-gray-200">
            <h3 className="text-lg font-bold text-gray-900 mb-4">Ingredient Breakdown</h3>
            <PieChart
              labels={data.insights.breakdown.labels}
              values={data.insights.breakdown.values}
            />
          </div>
        )}

        {/* Tradeoff Chart */}
        {data.insights.tradeoffs && (
          <div className="bg-white rounded-xl p-6 shadow-lg border border-gray-200">
            <h3 className="text-lg font-bold text-gray-900 mb-4">Nutrition vs. Cost Tradeoffs</h3>
            <BarChart
              labels={data.insights.tradeoffs.labels}
              values={data.insights.tradeoffs.values}
            />
          </div>
        )}
      </div>

      {/* Key Insights Cards */}
      <div className="grid md:grid-cols-2 gap-6">
        {/* Positives */}
        {data.insights.positives.length > 0 && (
          <div className="bg-green-50 rounded-xl p-6 border-2 border-green-200 shadow-md">
            <div className="flex items-center gap-2 mb-4">
              <CheckCircle className="text-green-600" size={24} />
              <h3 className="text-lg font-bold text-green-900">Positive Aspects</h3>
            </div>
            <ul className="space-y-2">
              {data.insights.positives.map((item, idx) => (
                <li key={idx} className="flex items-start gap-2 text-green-800">
                  <span className="text-green-600 font-bold">•</span>
                  <span>{item}</span>
                </li>
              ))}
            </ul>
          </div>
        )}

        {/* Concerns */}
        {data.insights.concerns.length > 0 && (
          <div className="bg-yellow-50 rounded-xl p-6 border-2 border-yellow-200 shadow-md">
            <div className="flex items-center gap-2 mb-4">
              <AlertCircle className="text-yellow-600" size={24} />
              <h3 className="text-lg font-bold text-yellow-900">Points to Consider</h3>
            </div>
            <ul className="space-y-2">
              {data.insights.concerns.map((item, idx) => (
                <li key={idx} className="flex items-start gap-2 text-yellow-800">
                  <span className="text-yellow-600 font-bold">•</span>
                  <span>{item}</span>
                </li>
              ))}
            </ul>
          </div>
        )}
      </div>

      {/* Key Points */}
      <div className="bg-white rounded-xl p-6 shadow-lg border border-gray-200">
        <h3 className="text-lg font-bold text-gray-900 mb-4 flex items-center gap-2">
          <Shield className="text-blue-600" size={24} />
          Ingredient Functions & Science
        </h3>
        <div className="space-y-3">
          {data.insights.keyPoints.map((point, idx) => (
            <div key={idx} className="flex items-start gap-3 p-3 bg-gray-50 rounded-lg">
              <div className="w-2 h-2 bg-blue-500 rounded-full mt-2 flex-shrink-0"></div>
              <p className="text-gray-700">{point}</p>
            </div>
          ))}
        </div>
      </div>

      {/* Uncertainty Section */}
      <div className="bg-purple-50 rounded-xl p-6 border-2 border-purple-200 shadow-md">
        <div className="flex items-center gap-3 mb-4">
          <h3 className="text-lg font-bold text-purple-900">Confidence & Uncertainty</h3>
          <UncertaintyBadge level={data.uncertainty.overall} />
        </div>
        <ul className="space-y-2">
          {data.uncertainty.notes.map((note, idx) => (
            <li key={idx} className="flex items-start gap-2 text-purple-800">
              <span className="text-purple-500">ℹ️</span>
              <span className="italic">{note}</span>
            </li>
          ))}
        </ul>
      </div>

      {/* Summary & Actions */}
      <div className="bg-gradient-to-r from-blue-600 to-primary-600 text-white rounded-xl p-6 shadow-xl">
        <h3 className="text-xl font-bold mb-3">💡 Bottom Line</h3>
        <p className="text-lg leading-relaxed mb-4">{data.summary}</p>
        
        <div className="mt-4 pt-4 border-t border-white/30">
          <h4 className="font-semibold mb-3">Recommended Actions:</h4>
          <ul className="space-y-2">
            {data.actions.map((action, idx) => (
              <li key={idx} className="flex items-start gap-2">
                <span className="text-yellow-300">→</span>
                <span>{action}</span>
              </li>
            ))}
          </ul>
        </div>
      </div>
    </motion.div>
  );
}
