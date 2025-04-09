
import React from 'react';
import { cn } from '@/lib/utils';
import { ArrowDownIcon, ArrowRightIcon, ArrowUpIcon } from 'lucide-react';

interface TrendBadgeProps {
  value: number;
  className?: string;
}

const TrendBadge = ({ value, className }: TrendBadgeProps) => {
  // Determine if the trend is positive, negative or neutral
  const isPositive = value > 0;
  const isNegative = value < 0;
  const isNeutral = value === 0;

  // Get appropriate colors and icons based on trend
  const badgeClassName = cn(
    'inline-flex items-center rounded-full px-2 py-1 text-xs font-medium',
    {
      'bg-green-100 text-green-800': isPositive,
      'bg-red-100 text-red-800': isNegative,
      'bg-gray-100 text-gray-800': isNeutral,
    },
    className
  );

  const Icon = isPositive ? ArrowUpIcon : isNegative ? ArrowDownIcon : ArrowRightIcon;
  const formattedValue = isNeutral ? '0%' : `${Math.abs(value).toFixed(1)}%`;

  return (
    <span className={badgeClassName}>
      <Icon className="mr-1 h-3 w-3" />
      {formattedValue}
    </span>
  );
};

export default TrendBadge;
