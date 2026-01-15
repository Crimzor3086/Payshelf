import React from 'react';
import { Link } from 'react-router-dom';
import { useAuth } from '@/contexts/AuthContext';
import Layout from '@/components/Layout';
import StatCard from '@/components/ui/stat-card';
import {
  ShoppingCart,
  Package,
  BarChart3,
  Gift,
  TrendingUp,
  DollarSign,
  Users,
  AlertTriangle,
} from 'lucide-react';
import { formatKES, products } from '@/data/mockData';
import { cn } from '@/lib/utils';

const Dashboard: React.FC = () => {
  const { user } = useAuth();
  const lowStockCount = products.filter(p => p.stock <= 10 && p.stock > 0).length;
  const outOfStockCount = products.filter(p => p.stock === 0).length;

  const quickActions = [
    {
      path: '/pos',
      label: 'New Sale',
      description: 'Start selling now',
      icon: ShoppingCart,
      color: 'bg-primary text-primary-foreground',
    },
    {
      path: '/inventory',
      label: 'Inventory',
      description: 'Check stock levels',
      icon: Package,
      color: 'bg-secondary text-secondary-foreground',
      badge: lowStockCount > 0 ? `${lowStockCount} low` : undefined,
    },
    {
      path: '/analytics',
      label: 'Analytics',
      description: 'View your sales',
      icon: BarChart3,
      color: 'bg-secondary text-secondary-foreground',
    },
    {
      path: '/loyalty',
      label: 'Loyalty',
      description: 'Customer rewards',
      icon: Gift,
      color: 'bg-accent text-accent-foreground',
    },
  ];

  return (
    <Layout>
      <div className="space-y-6">
        {/* Welcome Header */}
        <div className="animate-slide-up">
          <h1 className="text-2xl lg:text-3xl font-bold">
            Welcome back 👋
          </h1>
          <p className="text-muted-foreground mt-1">
            {user?.storeName} • Here's what's happening today
          </p>
        </div>

        {/* Stats Grid */}
        <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
          <StatCard
            title="Today's Sales"
            value={formatKES(28500)}
            icon={DollarSign}
            trend={{ value: 12, isPositive: true }}
          />
          <StatCard
            title="Transactions"
            value="58"
            icon={TrendingUp}
            trend={{ value: 8, isPositive: true }}
          />
          <StatCard
            title="Customers"
            value="42"
            icon={Users}
          />
          <StatCard
            title="Low Stock Items"
            value={lowStockCount + outOfStockCount}
            icon={AlertTriangle}
            variant={outOfStockCount > 0 ? 'default' : 'default'}
          />
        </div>

        {/* Quick Actions */}
        <div>
          <h2 className="text-lg font-semibold mb-4">Quick Actions</h2>
          <div className="grid grid-cols-2 gap-4">
            {quickActions.map((action, index) => (
              <Link
                key={action.path}
                to={action.path}
                className={cn(
                  "relative p-5 rounded-xl transition-all duration-200 card-interactive",
                  action.color,
                  "animate-slide-up"
                )}
                style={{ animationDelay: `${index * 50}ms` }}
              >
                {action.badge && (
                  <span className="absolute top-3 right-3 px-2 py-0.5 rounded-full text-xs font-medium bg-warning text-warning-foreground">
                    {action.badge}
                  </span>
                )}
                <action.icon className="h-8 w-8 mb-3" />
                <h3 className="font-semibold text-lg">{action.label}</h3>
                <p className="text-sm opacity-80">{action.description}</p>
              </Link>
            ))}
          </div>
        </div>

        {/* Stock Alerts */}
        {(lowStockCount > 0 || outOfStockCount > 0) && (
          <div className="bg-warning-soft rounded-xl p-4 animate-slide-up">
            <div className="flex items-start gap-3">
              <AlertTriangle className="h-5 w-5 text-warning-foreground mt-0.5" />
              <div>
                <h3 className="font-medium text-warning-foreground">Stock Alert</h3>
                <p className="text-sm text-warning-foreground/80 mt-1">
                  {outOfStockCount > 0 && `${outOfStockCount} item${outOfStockCount > 1 ? 's' : ''} out of stock. `}
                  {lowStockCount > 0 && `${lowStockCount} item${lowStockCount > 1 ? 's' : ''} running low.`}
                </p>
                <Link
                  to="/inventory"
                  className="inline-flex items-center text-sm font-medium text-warning-foreground mt-2 hover:underline"
                >
                  View Inventory →
                </Link>
              </div>
            </div>
          </div>
        )}
      </div>
    </Layout>
  );
};

export default Dashboard;
