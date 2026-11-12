'use client';

import React from 'react';

interface UncertaintyBadgeProps {
  level: 'high' | 'medium' | 'low';
}

export default function UncertaintyBadge({ level }: UncertaintyBadgeProps) {
  const configs = {
    high: {
      color: 'bg-red-100 text-red-800 border-red-300',
      icon: '⚠️',
      label: 'High Uncertainty',
    },
    medium: {
      color: 'bg-yellow-100 text-yellow-800 border-yellow-300',
      icon: '⚡',
      label: 'Moderate Confidence',
    },
    low: {
      color: 'bg-green-100 text-green-800 border-green-300',
      icon: '✓',
      label: 'High Confidence',
    },
  };

  const config = configs[level];

  return (
    <span className={`inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-sm font-semibold border-2 ${config.color}`}>
      <span>{config.icon}</span>
      <span>{config.label}</span>
    </span>
  );
}
