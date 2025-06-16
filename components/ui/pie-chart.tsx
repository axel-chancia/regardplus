"use client"

import { PieChart, Pie, Cell, Tooltip, ResponsiveContainer } from 'recharts';
import { TooltipProps } from 'recharts';

type NameType = string | number;
type ValueType = string | number;

interface PieChartDataItem {
  name: string;
  value: number;
  color?: string;
}

interface CustomPieChartProps {
  data: PieChartDataItem[];
}

// Tooltip personnalisé typé correctement (label supprimé car inutilisé)
const CustomPieTooltip = ({ active, payload }: TooltipProps<ValueType, NameType>) => {
  if (active && payload && payload.length) {
    const data = payload[0];
    return (
      <div className="bg-white p-3 border border-gray-200 rounded-lg shadow-lg">
        <p className="text-sm font-medium text-gray-900 mb-2">{data.name}</p>
        <p className="text-sm" style={{ color: data.color || '#000' }}>
          <span className="font-medium">{data.name}:</span> {data.value}
        </p>
      </div>
    );
  }
  return null;
};

export function CustomPieChart({ data }: CustomPieChartProps) {
  const COLORS = ['#0088FE', '#00C49F', '#FFBB28', '#FF8042', '#AF19FF', '#FF0000'];

  console.log('PieChart rendering with data:', data);

  return (
    <div className="bg-white rounded-lg border border-gray-200 p-6 shadow-sm">
      <div className="h-64">
        <ResponsiveContainer width="100%" height="100%">
          <PieChart>
            <Pie
              data={data}
              cx="50%"
              cy="50%"
              labelLine={false}
              // label={CustomPieLabel} // Non utilisé, donc supprimé
              outerRadius={80}
              fill="#8884d8"
              dataKey="value"
              nameKey="name"
            >
              {data.map((entry, index) => (
                <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
              ))}
            </Pie>
            <Tooltip content={<CustomPieTooltip />} />
          </PieChart>
        </ResponsiveContainer>
      </div>
    </div>
  );
}