import React from 'react';
import Layout from '@/components/Layout';
import StatCard from '@/components/ui/stat-card';
import { dailySalesData, topProducts, formatKES } from '@/data/mockData';
import { DollarSign, TrendingUp, ShoppingBag, Users } from 'lucide-react';
import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
  LineChart,
  Line,
} from 'recharts';

const Analytics: React.FC = () => {
  const totalRevenue = dailySalesData.reduce((sum, day) => sum + day.sales, 0);
  const totalTransactions = dailySalesData.reduce((sum, day) => sum + day.transactions, 0);
  const avgTransaction = Math.round(totalRevenue / totalTransactions);

  return (
    <Layout>
      <div className="space-y-6">
        <div>
          <h1 className="text-2xl font-bold">Analytics</h1>
          <p className="text-muted-foreground">Track your sales performance</p>
        </div>

        {/* Summary Stats */}
        <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
          <StatCard
            title="Weekly Revenue"
            value={formatKES(totalRevenue)}
            icon={DollarSign}
            variant="primary"
          />
          <StatCard
            title="Total Sales"
            value={totalTransactions}
            icon={ShoppingBag}
            trend={{ value: 15, isPositive: true }}
          />
          <StatCard
            title="Avg. Transaction"
            value={formatKES(avgTransaction)}
            icon={TrendingUp}
          />
          <StatCard
            title="Unique Customers"
            value="156"
            icon={Users}
            trend={{ value: 8, isPositive: true }}
          />
        </div>

        {/* Sales Chart */}
        <div className="bg-card rounded-xl shadow-card p-6">
          <h2 className="text-lg font-semibold mb-4">Daily Sales (This Week)</h2>
          <div className="h-72">
            <ResponsiveContainer width="100%" height="100%">
              <BarChart data={dailySalesData} margin={{ top: 5, right: 5, left: 0, bottom: 5 }}>
                <CartesianGrid strokeDasharray="3 3" stroke="hsl(var(--border))" />
                <XAxis 
                  dataKey="day" 
                  stroke="hsl(var(--muted-foreground))"
                  fontSize={12}
                />
                <YAxis 
                  stroke="hsl(var(--muted-foreground))"
                  fontSize={12}
                  tickFormatter={(value) => `${(value / 1000).toFixed(0)}k`}
                />
                <Tooltip
                  contentStyle={{
                    backgroundColor: 'hsl(var(--card))',
                    border: '1px solid hsl(var(--border))',
                    borderRadius: '8px',
                  }}
                  formatter={(value: number) => [formatKES(value), 'Revenue']}
                />
                <Bar 
                  dataKey="sales" 
                  fill="hsl(var(--primary))" 
                  radius={[4, 4, 0, 0]}
                />
              </BarChart>
            </ResponsiveContainer>
          </div>
        </div>

        {/* Transactions Chart */}
        <div className="bg-card rounded-xl shadow-card p-6">
          <h2 className="text-lg font-semibold mb-4">Transactions Trend</h2>
          <div className="h-56">
            <ResponsiveContainer width="100%" height="100%">
              <LineChart data={dailySalesData} margin={{ top: 5, right: 5, left: 0, bottom: 5 }}>
                <CartesianGrid strokeDasharray="3 3" stroke="hsl(var(--border))" />
                <XAxis 
                  dataKey="day" 
                  stroke="hsl(var(--muted-foreground))"
                  fontSize={12}
                />
                <YAxis 
                  stroke="hsl(var(--muted-foreground))"
                  fontSize={12}
                />
                <Tooltip
                  contentStyle={{
                    backgroundColor: 'hsl(var(--card))',
                    border: '1px solid hsl(var(--border))',
                    borderRadius: '8px',
                  }}
                  formatter={(value: number) => [value, 'Transactions']}
                />
                <Line 
                  type="monotone"
                  dataKey="transactions" 
                  stroke="hsl(var(--accent))"
                  strokeWidth={3}
                  dot={{ fill: 'hsl(var(--accent))', strokeWidth: 2 }}
                />
              </LineChart>
            </ResponsiveContainer>
          </div>
        </div>

        {/* Top Products */}
        <div className="bg-card rounded-xl shadow-card p-6">
          <h2 className="text-lg font-semibold mb-4">Best Selling Products</h2>
          <div className="space-y-4">
            {topProducts.map((product, index) => (
              <div
                key={product.name}
                className="flex items-center gap-4"
              >
                <div className="w-8 h-8 rounded-full bg-primary flex items-center justify-center text-primary-foreground font-bold text-sm">
                  {index + 1}
                </div>
                <div className="flex-1 min-w-0">
                  <p className="font-medium truncate">{product.name}</p>
                  <p className="text-sm text-muted-foreground">
                    {product.sales} units sold
                  </p>
                </div>
                <div className="text-right">
                  <p className="font-semibold price-display text-primary">
                    {formatKES(product.revenue)}
                  </p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </Layout>
  );
};

export default Analytics;
