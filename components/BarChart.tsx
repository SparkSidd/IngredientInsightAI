'use client';

import React from 'react';
import { Bar } from 'react-chartjs-2';

interface BarChartProps {
  labels: string[];
  values: number[];
}

export default function BarChart({ labels, values }: BarChartProps) {
  const data = {
    labels,
    datasets: [
      {
        label: 'Score',
        data: values,
        backgroundColor: values.map(v => 
          v >= 7 ? '#22c55e' : v >= 4 ? '#f59e0b' : '#ef4444'
        ),
        borderColor: values.map(v => 
          v >= 7 ? '#16a34a' : v >= 4 ? '#d97706' : '#dc2626'
        ),
        borderWidth: 2,
        borderRadius: 8,
      },
    ],
  };

  const options = {
    responsive: true,
    maintainAspectRatio: true,
    scales: {
      y: {
        beginAtZero: true,
        max: 10,
        ticks: {
          stepSize: 2,
        },
      },
    },
    plugins: {
      legend: {
        display: false,
      },
      tooltip: {
        callbacks: {
          label: function(context: any) {
            return `Score: ${context.parsed.y}/10`;
          }
        }
      }
    },
  };

  return <Bar data={data} options={options} />;
}
