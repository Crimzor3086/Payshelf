import React, { useState } from 'react';
import Layout from '@/components/Layout';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogDescription,
  DialogFooter,
} from '@/components/ui/dialog';
import StockBadge, { getStockLevel } from '@/components/ui/stock-badge';
import { products as initialProducts, Product, formatKES } from '@/data/mockData';
import { Search, Package, Plus, AlertTriangle } from 'lucide-react';
import { cn } from '@/lib/utils';

const Inventory: React.FC = () => {
  const [products, setProducts] = useState<Product[]>(initialProducts);
  const [searchQuery, setSearchQuery] = useState('');
  const [filterLevel, setFilterLevel] = useState<'all' | 'low' | 'critical'>('all');
  const [restockProduct, setRestockProduct] = useState<Product | null>(null);
  const [restockAmount, setRestockAmount] = useState('');

  const filteredProducts = products.filter((p) => {
    const matchesSearch =
      p.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      p.category.toLowerCase().includes(searchQuery.toLowerCase());
    
    if (!matchesSearch) return false;
    if (filterLevel === 'all') return true;
    
    const level = getStockLevel(p.stock);
    if (filterLevel === 'low') return level === 'low' || level === 'critical';
    if (filterLevel === 'critical') return level === 'critical';
    return true;
  });

  const lowStockCount = products.filter(p => getStockLevel(p.stock) === 'low').length;
  const criticalCount = products.filter(p => getStockLevel(p.stock) === 'critical').length;

  const handleRestock = () => {
    if (!restockProduct || !restockAmount) return;
    
    const amount = parseInt(restockAmount);
    if (isNaN(amount) || amount <= 0) return;

    setProducts((prev) =>
      prev.map((p) =>
        p.id === restockProduct.id ? { ...p, stock: p.stock + amount } : p
      )
    );
    setRestockProduct(null);
    setRestockAmount('');
  };

  return (
    <Layout>
      <div className="space-y-6">
        <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
          <div>
            <h1 className="text-2xl font-bold">Inventory</h1>
            <p className="text-muted-foreground">Manage your stock levels</p>
          </div>
        </div>

        {/* Alerts */}
        {(lowStockCount > 0 || criticalCount > 0) && (
          <div className="flex flex-wrap gap-3">
            {criticalCount > 0 && (
              <div className="flex items-center gap-2 px-3 py-2 rounded-lg bg-destructive-soft">
                <AlertTriangle className="h-4 w-4 text-destructive" />
                <span className="text-sm font-medium text-destructive">
                  {criticalCount} out of stock
                </span>
              </div>
            )}
            {lowStockCount > 0 && (
              <div className="flex items-center gap-2 px-3 py-2 rounded-lg bg-warning-soft">
                <AlertTriangle className="h-4 w-4 text-warning-foreground" />
                <span className="text-sm font-medium text-warning-foreground">
                  {lowStockCount} running low
                </span>
              </div>
            )}
          </div>
        )}

        {/* Search and Filters */}
        <div className="flex flex-col sm:flex-row gap-3">
          <div className="relative flex-1">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-5 w-5 text-muted-foreground" />
            <Input
              placeholder="Search products..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="pl-11 h-11"
            />
          </div>
          <div className="flex gap-2">
            {(['all', 'low', 'critical'] as const).map((level) => (
              <Button
                key={level}
                variant={filterLevel === level ? 'default' : 'outline'}
                onClick={() => setFilterLevel(level)}
                className="capitalize"
              >
                {level === 'all' ? 'All' : level === 'low' ? 'Low Stock' : 'Critical'}
              </Button>
            ))}
          </div>
        </div>

        {/* Product Table */}
        <div className="bg-card rounded-xl shadow-card overflow-hidden">
          <div className="overflow-x-auto">
            <table className="w-full">
              <thead className="bg-secondary">
                <tr>
                  <th className="text-left p-4 font-semibold text-sm">Product</th>
                  <th className="text-left p-4 font-semibold text-sm">Category</th>
                  <th className="text-right p-4 font-semibold text-sm">Price</th>
                  <th className="text-left p-4 font-semibold text-sm">Stock</th>
                  <th className="text-right p-4 font-semibold text-sm">Action</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-border">
                {filteredProducts.map((product) => {
                  const stockLevel = getStockLevel(product.stock);
                  return (
                    <tr
                      key={product.id}
                      className={cn(
                        "hover:bg-secondary/50 transition-colors",
                        stockLevel === 'critical' && "bg-destructive-soft/30"
                      )}
                    >
                      <td className="p-4">
                        <div className="flex items-center gap-3">
                          <div className="w-10 h-10 rounded-lg bg-secondary flex items-center justify-center">
                            <Package className="h-5 w-5 text-muted-foreground" />
                          </div>
                          <span className="font-medium">{product.name}</span>
                        </div>
                      </td>
                      <td className="p-4 text-muted-foreground">{product.category}</td>
                      <td className="p-4 text-right font-semibold price-display">
                        {formatKES(product.price)}
                      </td>
                      <td className="p-4">
                        <StockBadge level={stockLevel} quantity={product.stock} />
                      </td>
                      <td className="p-4 text-right">
                        <Button
                          variant="outline"
                          size="sm"
                          onClick={() => setRestockProduct(product)}
                        >
                          <Plus className="h-4 w-4 mr-1" />
                          Restock
                        </Button>
                      </td>
                    </tr>
                  );
                })}
              </tbody>
            </table>
          </div>

          {filteredProducts.length === 0 && (
            <div className="p-8 text-center text-muted-foreground">
              <Package className="h-12 w-12 mx-auto mb-3 opacity-30" />
              <p>No products found</p>
            </div>
          )}
        </div>

        {/* Restock Modal */}
        <Dialog open={!!restockProduct} onOpenChange={() => setRestockProduct(null)}>
          <DialogContent>
            <DialogHeader>
              <DialogTitle>Restock Product</DialogTitle>
              <DialogDescription>
                Add stock for {restockProduct?.name}
              </DialogDescription>
            </DialogHeader>
            <div className="py-4">
              <p className="text-sm text-muted-foreground mb-2">
                Current stock: <strong>{restockProduct?.stock} units</strong>
              </p>
              <Input
                type="number"
                placeholder="Quantity to add"
                value={restockAmount}
                onChange={(e) => setRestockAmount(e.target.value)}
                min="1"
                className="h-12 text-lg"
              />
            </div>
            <DialogFooter>
              <Button variant="outline" onClick={() => setRestockProduct(null)}>
                Cancel
              </Button>
              <Button onClick={handleRestock} disabled={!restockAmount}>
                <Plus className="h-4 w-4 mr-2" />
                Add Stock
              </Button>
            </DialogFooter>
          </DialogContent>
        </Dialog>
      </div>
    </Layout>
  );
};

export default Inventory;
