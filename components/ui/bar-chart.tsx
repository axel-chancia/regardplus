"use client"

import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from 'recharts'
import { TooltipProps } from 'recharts' // Import public

type NameType = string | number
type ValueType = string | number

interface BarChartData {
  mois: string;
  score: number;
  objectifs: number;
  completions: number;
}

interface CustomBarChartProps {
  data: BarChartData[];
  title?: string;
}

// Typage précis du CustomTooltip en utilisant TooltipProps de Recharts
const CustomTooltip = ({ active, payload, label }: TooltipProps<ValueType, NameType>) => {
  if (active && payload && payload.length) {
    return (
      <div className="bg-white p-3 border border-gray-200 rounded-lg shadow-lg">
        <p className="text-sm font-medium text-gray-900 mb-2">{label}</p>
        {payload.map((item, index) => (
          <p key={index} className="text-sm" style={{ color: item.color }}>
            <span className="font-medium">{item.name}:</span> {item.value}{" "}
            {item.dataKey === 'completions' ? ' tâches' : (item.dataKey === 'score' ? '%' : '')}
          </p>
        ))}
      </div>
    );
  }
  return null;
};

export function CustomBarChart({ data, title }: CustomBarChartProps) {
  console.log('BarChart rendering with data:', data);

  return (
    <div className="bg-white rounded-lg border border-gray-200 p-6 shadow-sm">
      {title && (
        <h3 className="text-lg font-semibold text-gray-900 mb-4">{title}</h3>
      )}
      <div className="h-64">
        <ResponsiveContainer width="100%" height="100%">
          <BarChart data={data} margin={{ top: 5, right: 30, left: 20, bottom: 5 }}>
            <CartesianGrid strokeDasharray="3 3" stroke="#f0f0f0" />
            <XAxis
              dataKey="mois"
              stroke="#6b7280"
              fontSize={12}
            />
            <YAxis
              stroke="#6b7280"
              fontSize={12}
            />
            <Tooltip content={<CustomTooltip />} />
            <Bar dataKey="score" fill="#2563EB" name="Score" radius={[2, 2, 0, 0]} />
            <Bar dataKey="objectifs" fill="#10B981" name="Objectifs" radius={[2, 2, 0, 0]} />
            <Bar dataKey="completions" fill="#F59E0B" name="Complétions" radius={[2, 2, 0, 0]} />
          </BarChart>
        </ResponsiveContainer>
      </div>
    </div>
  )
}