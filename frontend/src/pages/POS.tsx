import React, { useState } from 'react';
import Layout from '@/components/Layout';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { products, Product, formatKES, formatPhone } from '@/data/mockData';
import { getStockLevel } from '@/components/ui/stock-badge';
import {
  ShoppingCart,
  Plus,
  Minus,
  Trash2,
  Phone,
  Smartphone,
  CheckCircle,
  XCircle,
  Loader2,
  Search,
} from 'lucide-react';
import { cn } from '@/lib/utils';

interface CartItem {
  product: Product;
  quantity: number;
}

type PaymentStatus = 'idle' | 'sending' | 'waiting' | 'success' | 'failed';

const POS: React.FC = () => {
  const [cart, setCart] = useState<CartItem[]>([]);
  const [customerPhone, setCustomerPhone] = useState('+254');
  const [searchQuery, setSearchQuery] = useState('');
  const [paymentStatus, setPaymentStatus] = useState<PaymentStatus>('idle');

  const filteredProducts = products.filter(
    (p) =>
      p.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      p.category.toLowerCase().includes(searchQuery.toLowerCase())
  );

  const addToCart = (product: Product) => {
    if (product.stock <= 0) return;
    
    setCart((prev) => {
      const existing = prev.find((item) => item.product.id === product.id);
      if (existing) {
        if (existing.quantity >= product.stock) return prev;
        return prev.map((item) =>
          item.product.id === product.id
            ? { ...item, quantity: item.quantity + 1 }
            : item
        );
      }
      return [...prev, { product, quantity: 1 }];
    });
  };

  const updateQuantity = (productId: string, delta: number) => {
    setCart((prev) =>
      prev
        .map((item) => {
          if (item.product.id !== productId) return item;
          const newQty = item.quantity + delta;
          if (newQty <= 0) return null;
          if (newQty > item.product.stock) return item;
          return { ...item, quantity: newQty };
        })
        .filter(Boolean) as CartItem[]
    );
  };

  const removeFromCart = (productId: string) => {
    setCart((prev) => prev.filter((item) => item.product.id !== productId));
  };

  const cartTotal = cart.reduce(
    (sum, item) => sum + item.product.price * item.quantity,
    0
  );

  const handleMpesaPayment = async () => {
    if (!customerPhone || customerPhone.length < 12) {
      return;
    }

    setPaymentStatus('sending');
    
    // Simulate STK Push
    await new Promise((resolve) => setTimeout(resolve, 1500));
    setPaymentStatus('waiting');
    
    // Simulate waiting for customer confirmation
    await new Promise((resolve) => setTimeout(resolve, 3000));
    
    // Random success/fail for demo
    const success = Math.random() > 0.2;
    setPaymentStatus(success ? 'success' : 'failed');

    if (success) {
      // Clear cart after successful payment
      setTimeout(() => {
        setCart([]);
        setCustomerPhone('+254');
        setPaymentStatus('idle');
      }, 2000);
    }
  };

  const resetPayment = () => {
    setPaymentStatus('idle');
  };

  return (
    <Layout>
      <div className="flex flex-col lg:flex-row gap-6 h-[calc(100vh-8rem)] lg:h-[calc(100vh-4rem)]">
        {/* Product Grid */}
        <div className="flex-1 flex flex-col min-h-0">
          <div className="mb-4">
            <h1 className="text-2xl font-bold mb-4">Point of Sale</h1>
            <div className="relative">
              <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-5 w-5 text-muted-foreground" />
              <Input
                placeholder="Search products..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="pl-11 h-12"
              />
            </div>
          </div>

          <div className="flex-1 overflow-y-auto">
            <div className="grid grid-cols-2 md:grid-cols-3 gap-3">
              {filteredProducts.map((product) => {
                const stockLevel = getStockLevel(product.stock);
                const inCart = cart.find((item) => item.product.id === product.id);
                const isOutOfStock = product.stock <= 0;

                return (
                  <button
                    key={product.id}
                    onClick={() => addToCart(product)}
                    disabled={isOutOfStock}
                    className={cn(
                      "p-4 rounded-xl text-left transition-all duration-200",
                      "bg-card shadow-card hover:shadow-medium",
                      isOutOfStock && "opacity-50 cursor-not-allowed",
                      inCart && "ring-2 ring-primary"
                    )}
                  >
                    <div className="flex items-start justify-between mb-2">
                      <span
                        className={cn(
                          "w-2 h-2 rounded-full mt-1",
                          stockLevel === 'healthy' && "bg-success",
                          stockLevel === 'low' && "bg-warning",
                          stockLevel === 'critical' && "bg-destructive"
                        )}
                      />
                      {inCart && (
                        <span className="text-xs font-bold text-primary bg-secondary px-2 py-0.5 rounded-full">
                          ×{inCart.quantity}
                        </span>
                      )}
                    </div>
                    <h3 className="font-medium text-sm leading-tight mb-1 line-clamp-2">
                      {product.name}
                    </h3>
                    <p className="text-lg font-bold price-display text-primary">
                      {formatKES(product.price)}
                    </p>
                    <p className="text-xs text-muted-foreground mt-1">
                      {isOutOfStock ? 'Out of stock' : `${product.stock} in stock`}
                    </p>
                  </button>
                );
              })}
            </div>
          </div>
        </div>

        {/* Cart Panel */}
        <div className="lg:w-96 bg-card rounded-2xl shadow-elevated flex flex-col">
          <div className="p-4 border-b border-border">
            <div className="flex items-center gap-2">
              <ShoppingCart className="h-5 w-5 text-primary" />
              <h2 className="font-semibold">Current Sale</h2>
              <span className="ml-auto text-sm text-muted-foreground">
                {cart.length} item{cart.length !== 1 ? 's' : ''}
              </span>
            </div>
          </div>

          {/* Cart Items */}
          <div className="flex-1 overflow-y-auto p-4 space-y-3 min-h-0">
            {cart.length === 0 ? (
              <div className="text-center py-8 text-muted-foreground">
                <ShoppingCart className="h-12 w-12 mx-auto mb-3 opacity-30" />
                <p>No items in cart</p>
                <p className="text-sm">Tap products to add</p>
              </div>
            ) : (
              cart.map((item) => (
                <div
                  key={item.product.id}
                  className="flex items-center gap-3 p-3 bg-secondary rounded-lg"
                >
                  <div className="flex-1 min-w-0">
                    <p className="font-medium text-sm truncate">{item.product.name}</p>
                    <p className="text-sm text-muted-foreground">
                      {formatKES(item.product.price)} each
                    </p>
                  </div>
                  <div className="flex items-center gap-2">
                    <Button
                      variant="outline"
                      size="icon"
                      className="h-8 w-8"
                      onClick={() => updateQuantity(item.product.id, -1)}
                    >
                      <Minus className="h-4 w-4" />
                    </Button>
                    <span className="w-8 text-center font-semibold">{item.quantity}</span>
                    <Button
                      variant="outline"
                      size="icon"
                      className="h-8 w-8"
                      onClick={() => updateQuantity(item.product.id, 1)}
                      disabled={item.quantity >= item.product.stock}
                    >
                      <Plus className="h-4 w-4" />
                    </Button>
                    <Button
                      variant="ghost"
                      size="icon"
                      className="h-8 w-8 text-destructive"
                      onClick={() => removeFromCart(item.product.id)}
                    >
                      <Trash2 className="h-4 w-4" />
                    </Button>
                  </div>
                </div>
              ))
            )}
          </div>

          {/* Payment Section */}
          <div className="p-4 border-t border-border space-y-4">
            {/* Total */}
            <div className="flex items-center justify-between">
              <span className="text-lg font-medium">Total</span>
              <span className="text-2xl font-bold price-display text-primary">
                {formatKES(cartTotal)}
              </span>
            </div>

            {/* Customer Phone */}
            <div>
              <label className="text-sm text-muted-foreground mb-1 block">
                Customer Phone (M-Pesa)
              </label>
              <div className="relative">
                <Phone className="absolute left-3 top-1/2 -translate-y-1/2 h-5 w-5 text-muted-foreground" />
                <Input
                  type="tel"
                  placeholder="+254 712 345 678"
                  value={customerPhone}
                  onChange={(e) => setCustomerPhone(e.target.value)}
                  className="pl-11 h-12 text-lg"
                  disabled={paymentStatus !== 'idle'}
                />
              </div>
            </div>

            {/* Payment Status */}
            {paymentStatus !== 'idle' && (
              <div
                className={cn(
                  "p-4 rounded-lg flex items-center gap-3",
                  paymentStatus === 'sending' && "bg-secondary",
                  paymentStatus === 'waiting' && "bg-accent-soft animate-pulse-soft",
                  paymentStatus === 'success' && "bg-success-soft",
                  paymentStatus === 'failed' && "bg-destructive-soft"
                )}
              >
                {paymentStatus === 'sending' && (
                  <>
                    <Loader2 className="h-5 w-5 animate-spin text-primary" />
                    <div>
                      <p className="font-medium">Sending STK Push...</p>
                      <p className="text-sm text-muted-foreground">
                        To {formatPhone(customerPhone)}
                      </p>
                    </div>
                  </>
                )}
                {paymentStatus === 'waiting' && (
                  <>
                    <Smartphone className="h-5 w-5 text-accent-foreground" />
                    <div>
                      <p className="font-medium text-accent-foreground">Check your phone</p>
                      <p className="text-sm text-accent-foreground/80">
                        Enter M-Pesa PIN to complete
                      </p>
                    </div>
                  </>
                )}
                {paymentStatus === 'success' && (
                  <>
                    <CheckCircle className="h-5 w-5 text-success" />
                    <div>
                      <p className="font-medium text-success">Payment Successful!</p>
                      <p className="text-sm text-success/80">
                        {formatKES(cartTotal)} received
                      </p>
                    </div>
                  </>
                )}
                {paymentStatus === 'failed' && (
                  <>
                    <XCircle className="h-5 w-5 text-destructive" />
                    <div>
                      <p className="font-medium text-destructive">Payment Failed</p>
                      <p className="text-sm text-destructive/80">
                        Please try again
                      </p>
                    </div>
                  </>
                )}
              </div>
            )}

            {/* Pay Button */}
            {paymentStatus === 'idle' && (
              <Button
                className="w-full h-14 text-lg font-semibold"
                disabled={cart.length === 0 || customerPhone.length < 12}
                onClick={handleMpesaPayment}
              >
                <Smartphone className="mr-2 h-5 w-5" />
                Pay with M-Pesa
              </Button>
            )}

            {paymentStatus === 'failed' && (
              <Button
                className="w-full h-14 text-lg font-semibold"
                onClick={resetPayment}
              >
                Try Again
              </Button>
            )}
          </div>
        </div>
      </div>
    </Layout>
  );
};

export default POS;
