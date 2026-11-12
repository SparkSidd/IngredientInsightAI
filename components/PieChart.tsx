'use client';

import React from 'react';
import { Pie } from 'react-chartjs-2';

interface PieChartProps {
  labels: string[];
  values: number[];
}

export default function PieChart({ labels, values }: PieChartProps) {
  const data = {
    labels,
    datasets: [
      {
        data: values,
        backgroundColor: [
          '#22c55e',
          '#3b82f6',
          '#f59e0b',
          '#ef4444',
          '#8b5cf6',
          '#ec4899',
          '#14b8a6',
          '#f97316',
        ],
        borderColor: '#ffffff',
        borderWidth: 2,
      },
    ],
  };

  const options = {
    responsive: true,
    maintainAspectRatio: true,
    plugins: {
      legend: {
        position: 'bottom' as const,
        labels: {
          padding: 15,
          font: {
            size: 12,
          },
        },
      },
      tooltip: {
        callbacks: {
          label: function(context: any) {
            const label = context.label || '';
            const value = context.parsed || 0;
            return `${label}: ${value}%`;
          }
        }
      }
    },
  };

  return <Pie data={data} options={options} />;
}
