import React, { useState } from 'react';
import Layout from '@/components/Layout';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { customers, Customer, formatKES, formatPhone } from '@/data/mockData';
import { Search, Gift, Phone, Calendar, ShoppingBag, Star, User } from 'lucide-react';
import { cn } from '@/lib/utils';

const Loyalty: React.FC = () => {
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedCustomer, setSelectedCustomer] = useState<Customer | null>(null);

  const handleSearch = () => {
    const cleaned = searchQuery.replace(/\s/g, '');
    const found = customers.find(
      (c) => c.phone.replace(/\s/g, '').includes(cleaned) || 
             c.phone.includes(cleaned)
    );
    setSelectedCustomer(found || null);
  };

  const handleKeyPress = (e: React.KeyboardEvent) => {
    if (e.key === 'Enter') {
      handleSearch();
    }
  };

  const getLoyaltyTier = (points: number): { name: string; color: string } => {
    if (points >= 400) return { name: 'Gold', color: 'text-accent' };
    if (points >= 200) return { name: 'Silver', color: 'text-muted-foreground' };
    return { name: 'Bronze', color: 'text-warning-foreground' };
  };

  return (
    <Layout>
      <div className="space-y-6">
        <div>
          <h1 className="text-2xl font-bold">Customer Loyalty</h1>
          <p className="text-muted-foreground">Look up customer rewards & history</p>
        </div>

        {/* Search */}
        <div className="bg-card rounded-xl shadow-card p-6">
          <h2 className="font-semibold mb-4 flex items-center gap-2">
            <Phone className="h-5 w-5 text-primary" />
            Find Customer
          </h2>
          <div className="flex gap-3">
            <div className="relative flex-1">
              <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-5 w-5 text-muted-foreground" />
              <Input
                placeholder="Enter phone number (+254...)"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                onKeyPress={handleKeyPress}
                className="pl-11 h-12 text-lg"
              />
            </div>
            <Button onClick={handleSearch} className="h-12 px-6">
              Search
            </Button>
          </div>
          <p className="text-sm text-muted-foreground mt-2">
            Try: +254712345678 or +254734567890
          </p>
        </div>

        {/* Customer Result */}
        {selectedCustomer && (
          <div className="bg-card rounded-xl shadow-card overflow-hidden animate-slide-up">
            {/* Header */}
            <div className="bg-primary p-6 text-primary-foreground">
              <div className="flex items-start justify-between">
                <div className="flex items-center gap-4">
                  <div className="w-16 h-16 rounded-full bg-primary-foreground/10 flex items-center justify-center">
                    <User className="h-8 w-8" />
                  </div>
                  <div>
                    <h3 className="text-xl font-bold">
                      {selectedCustomer.name || 'Customer'}
                    </h3>
                    <p className="text-primary-foreground/80">
                      {formatPhone(selectedCustomer.phone)}
                    </p>
                  </div>
                </div>
                <div className="text-right">
                  <div className={cn(
                    "inline-flex items-center gap-1 px-3 py-1 rounded-full text-sm font-medium",
                    getLoyaltyTier(selectedCustomer.loyaltyPoints).name === 'Gold' && "bg-accent text-accent-foreground",
                    getLoyaltyTier(selectedCustomer.loyaltyPoints).name === 'Silver' && "bg-primary-foreground/20 text-primary-foreground",
                    getLoyaltyTier(selectedCustomer.loyaltyPoints).name === 'Bronze' && "bg-warning text-warning-foreground"
                  )}>
                    <Star className="h-4 w-4" />
                    {getLoyaltyTier(selectedCustomer.loyaltyPoints).name} Member
                  </div>
                </div>
              </div>
            </div>

            {/* Stats */}
            <div className="grid grid-cols-2 lg:grid-cols-4 divide-x divide-y lg:divide-y-0 divide-border">
              <div className="p-6 text-center">
                <Gift className="h-6 w-6 text-accent mx-auto mb-2" />
                <p className="text-3xl font-bold price-display text-accent">
                  {selectedCustomer.loyaltyPoints}
                </p>
                <p className="text-sm text-muted-foreground">Loyalty Points</p>
              </div>
              <div className="p-6 text-center">
                <ShoppingBag className="h-6 w-6 text-primary mx-auto mb-2" />
                <p className="text-3xl font-bold price-display">
                  {formatKES(selectedCustomer.totalSpent)}
                </p>
                <p className="text-sm text-muted-foreground">Total Spent</p>
              </div>
              <div className="p-6 text-center">
                <Calendar className="h-6 w-6 text-muted-foreground mx-auto mb-2" />
                <p className="text-xl font-semibold">
                  {new Date(selectedCustomer.lastPurchase).toLocaleDateString('en-KE', {
                    day: 'numeric',
                    month: 'short',
                  })}
                </p>
                <p className="text-sm text-muted-foreground">Last Purchase</p>
              </div>
              <div className="p-6 text-center">
                <div className="text-3xl font-bold mb-1">
                  {selectedCustomer.purchaseCount}
                </div>
                <p className="text-sm text-muted-foreground">Total Visits</p>
              </div>
            </div>

            {/* Points Value */}
            <div className="p-6 bg-accent-soft border-t border-border">
              <div className="flex items-center justify-between">
                <div>
                  <p className="font-medium text-accent-foreground">Points Value</p>
                  <p className="text-sm text-accent-foreground/80">
                    {selectedCustomer.loyaltyPoints} points = {formatKES(selectedCustomer.loyaltyPoints * 10)} discount
                  </p>
                </div>
                <Button className="bg-accent text-accent-foreground hover:bg-accent/90">
                  Redeem Points
                </Button>
              </div>
            </div>
          </div>
        )}

        {/* Not Found */}
        {searchQuery && !selectedCustomer && (
          <div className="bg-card rounded-xl shadow-card p-8 text-center animate-slide-up">
            <Phone className="h-12 w-12 mx-auto mb-3 text-muted-foreground opacity-30" />
            <h3 className="font-semibold text-lg mb-1">Customer Not Found</h3>
            <p className="text-muted-foreground">
              No customer with this phone number. They'll be added automatically on their first purchase.
            </p>
          </div>
        )}

        {/* Recent Customers */}
        <div className="bg-card rounded-xl shadow-card">
          <div className="p-4 border-b border-border">
            <h2 className="font-semibold">Recent Customers</h2>
          </div>
          <div className="divide-y divide-border">
            {customers.slice(0, 5).map((customer) => (
              <button
                key={customer.id}
                onClick={() => {
                  setSearchQuery(customer.phone);
                  setSelectedCustomer(customer);
                }}
                className="w-full p-4 flex items-center gap-4 hover:bg-secondary/50 transition-colors text-left"
              >
                <div className="w-10 h-10 rounded-full bg-secondary flex items-center justify-center">
                  <User className="h-5 w-5 text-muted-foreground" />
                </div>
                <div className="flex-1 min-w-0">
                  <p className="font-medium truncate">
                    {customer.name || formatPhone(customer.phone)}
                  </p>
                  <p className="text-sm text-muted-foreground">
                    {customer.loyaltyPoints} points • Last visit: {new Date(customer.lastPurchase).toLocaleDateString('en-KE')}
                  </p>
                </div>
                <div className="text-right">
                  <p className="font-semibold text-primary price-display">
                    {formatKES(customer.totalSpent)}
                  </p>
                </div>
              </button>
            ))}
          </div>
        </div>
      </div>
    </Layout>
  );
};

export default Loyalty;
