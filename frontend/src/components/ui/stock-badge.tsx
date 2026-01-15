import React from 'react';
import { cn } from '@/lib/utils';

type StockLevel = 'healthy' | 'low' | 'critical';

interface StockBadgeProps {
  level: StockLevel;
  quantity: number;
  className?: string;
}

const StockBadge: React.FC<StockBadgeProps> = ({ level, quantity, className }) => {
  const config = {
    healthy: {
      bg: 'bg-success-soft',
      text: 'text-success',
      label: 'In Stock',
    },
    low: {
      bg: 'bg-warning-soft',
      text: 'text-warning-foreground',
      label: 'Low Stock',
    },
    critical: {
      bg: 'bg-destructive-soft',
      text: 'text-destructive',
      label: 'Critical',
    },
  };

  const { bg, text, label } = config[level];

  return (
    <span
      className={cn(
        "inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full text-xs font-medium",
        bg,
        text,
        className
      )}
    >
      <span className={cn("w-1.5 h-1.5 rounded-full", level === 'healthy' ? 'bg-success' : level === 'low' ? 'bg-warning' : 'bg-destructive')} />
      {quantity} - {label}
    </span>
  );
};

export const getStockLevel = (quantity: number, threshold: number = 10): StockLevel => {
  if (quantity <= 0) return 'critical';
  if (quantity <= threshold) return 'low';
  return 'healthy';
};

export default StockBadge;
