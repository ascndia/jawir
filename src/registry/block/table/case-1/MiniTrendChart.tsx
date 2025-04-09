import React from 'react';
import {
  AreaChart,
  Area,
  ResponsiveContainer,
} from 'recharts';
import { cn } from '@/lib/utils';

interface MiniTrendChartProps {
  data: number[];
  className?: string;
  positive?: boolean;
  negative?: boolean;
}

const MiniTrendChart = ({
  data,
  className,
  positive,
  negative,
}: MiniTrendChartProps) => {
  const strokeColor = positive
    ? 'var(--trend-positive, #10b981)'
    : negative
    ? 'var(--trend-negative, #ef4444)'
    : 'var(--trend-neutral, #9ca3af)';

  const resolvedColor = positive
    ? '#10b981'
    : negative
    ? '#ef4444'
    : '#9ca3af';

  const gradientId = React.useId(); // 👈 unique per instance

  const chartData = data.map((value, index) => ({
    value,
    index,
  }));

  return (
    <div className={cn('h-10 w-16', className)}>
      <ResponsiveContainer width="100%" height="100%">
        <AreaChart
          data={chartData}
          margin={{ top: 0, right: 0, bottom: 0, left: 0 }}
        >
          <defs>
            <linearGradient id={gradientId} x1="0" y1="0" x2="0" y2="1">
              <stop offset="0%" stopColor={resolvedColor} stopOpacity={0.3} />
              <stop offset="100%" stopColor={resolvedColor} stopOpacity={0} />
            </linearGradient>
          </defs>
          <Area
            type="monotone"
            dataKey="value"
            stroke={strokeColor}
            strokeWidth={1.5}
            fill={`url(#${gradientId})`}
            isAnimationActive={false}
          />
        </AreaChart>
      </ResponsiveContainer>
    </div>
  );
};

export default MiniTrendChart;
