import React from 'react';
import { cn } from '@/lib/utils';
import { LucideIcon } from 'lucide-react';

interface StatCardProps {
  title: string;
  value: string | number;
  icon: LucideIcon;
  trend?: {
    value: number;
    isPositive: boolean;
  };
  variant?: 'default' | 'primary' | 'accent';
  className?: string;
}

const StatCard: React.FC<StatCardProps> = ({
  title,
  value,
  icon: Icon,
  trend,
  variant = 'default',
  className,
}) => {
  return (
    <div
      className={cn(
        "p-6 rounded-xl bg-card shadow-card animate-scale-in",
        variant === 'primary' && "bg-primary text-primary-foreground",
        variant === 'accent' && "bg-accent text-accent-foreground",
        className
      )}
    >
      <div className="flex items-start justify-between">
        <div className="flex-1">
          <p
            className={cn(
              "text-sm font-medium mb-1",
              variant === 'default' ? "text-muted-foreground" : "opacity-80"
            )}
          >
            {title}
          </p>
          <p className="text-2xl lg:text-3xl font-bold price-display">{value}</p>
          {trend && (
            <p
              className={cn(
                "text-sm mt-2 font-medium",
                trend.isPositive ? "text-success" : "text-destructive",
                variant !== 'default' && "opacity-90"
              )}
            >
              {trend.isPositive ? '↑' : '↓'} {Math.abs(trend.value)}% from last week
            </p>
          )}
        </div>
        <div
          className={cn(
            "p-3 rounded-lg",
            variant === 'default' && "bg-secondary",
            variant === 'primary' && "bg-primary-foreground/10",
            variant === 'accent' && "bg-accent-foreground/10"
          )}
        >
          <Icon className="h-6 w-6" />
        </div>
      </div>
    </div>
  );
};

export default StatCard;
