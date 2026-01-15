export interface Product {
  id: string;
  name: string;
  price: number;
  stock: number;
  category: string;
  image?: string;
}

export interface Sale {
  id: string;
  date: string;
  amount: number;
  items: number;
  customerPhone?: string;
  paymentMethod: 'mpesa' | 'cash';
  status: 'completed' | 'pending' | 'failed';
}

export interface Customer {
  id: string;
  phone: string;
  name?: string;
  loyaltyPoints: number;
  totalSpent: number;
  lastPurchase: string;
  purchaseCount: number;
}

export const products: Product[] = [
  { id: '1', name: 'Unga Flour (2kg)', price: 250, stock: 45, category: 'Food' },
  { id: '2', name: 'Cooking Oil (1L)', price: 380, stock: 28, category: 'Food' },
  { id: '3', name: 'Sugar (1kg)', price: 180, stock: 62, category: 'Food' },
  { id: '4', name: 'Tea Leaves (500g)', price: 450, stock: 8, category: 'Beverages' },
  { id: '5', name: 'Milk (500ml)', price: 65, stock: 35, category: 'Dairy' },
  { id: '6', name: 'Bread (Large)', price: 60, stock: 12, category: 'Bakery' },
  { id: '7', name: 'Rice (2kg)', price: 320, stock: 3, category: 'Food' },
  { id: '8', name: 'Eggs (Tray - 30)', price: 480, stock: 15, category: 'Dairy' },
  { id: '9', name: 'Soap Bar', price: 45, stock: 120, category: 'Household' },
  { id: '10', name: 'Toothpaste', price: 150, stock: 25, category: 'Personal Care' },
  { id: '11', name: 'Washing Powder (1kg)', price: 280, stock: 18, category: 'Household' },
  { id: '12', name: 'Salt (1kg)', price: 45, stock: 0, category: 'Food' },
];

export const recentSales: Sale[] = [
  { id: 's1', date: '2024-01-15T10:30:00', amount: 1250, items: 5, customerPhone: '+254712345678', paymentMethod: 'mpesa', status: 'completed' },
  { id: 's2', date: '2024-01-15T11:15:00', amount: 680, items: 3, paymentMethod: 'cash', status: 'completed' },
  { id: 's3', date: '2024-01-15T12:00:00', amount: 2100, items: 8, customerPhone: '+254723456789', paymentMethod: 'mpesa', status: 'completed' },
  { id: 's4', date: '2024-01-15T14:30:00', amount: 450, items: 2, paymentMethod: 'mpesa', status: 'pending' },
  { id: 's5', date: '2024-01-15T15:45:00', amount: 890, items: 4, customerPhone: '+254734567890', paymentMethod: 'mpesa', status: 'completed' },
];

export const customers: Customer[] = [
  { id: 'c1', phone: '+254712345678', name: 'Mary Wanjiku', loyaltyPoints: 250, totalSpent: 45000, lastPurchase: '2024-01-15', purchaseCount: 45 },
  { id: 'c2', phone: '+254723456789', name: 'John Kamau', loyaltyPoints: 180, totalSpent: 32000, lastPurchase: '2024-01-14', purchaseCount: 28 },
  { id: 'c3', phone: '+254734567890', name: 'Grace Otieno', loyaltyPoints: 420, totalSpent: 78000, lastPurchase: '2024-01-15', purchaseCount: 67 },
  { id: 'c4', phone: '+254745678901', loyaltyPoints: 50, totalSpent: 8500, lastPurchase: '2024-01-10', purchaseCount: 8 },
  { id: 'c5', phone: '+254756789012', name: 'Peter Mwangi', loyaltyPoints: 320, totalSpent: 56000, lastPurchase: '2024-01-13', purchaseCount: 52 },
];

export const dailySalesData = [
  { day: 'Mon', sales: 12500, transactions: 25 },
  { day: 'Tue', sales: 18200, transactions: 38 },
  { day: 'Wed', sales: 15800, transactions: 31 },
  { day: 'Thu', sales: 22100, transactions: 45 },
  { day: 'Fri', sales: 28500, transactions: 58 },
  { day: 'Sat', sales: 35200, transactions: 72 },
  { day: 'Sun', sales: 19800, transactions: 40 },
];

export const topProducts = [
  { name: 'Unga Flour (2kg)', sales: 125, revenue: 31250 },
  { name: 'Cooking Oil (1L)', sales: 89, revenue: 33820 },
  { name: 'Sugar (1kg)', sales: 156, revenue: 28080 },
  { name: 'Eggs (Tray - 30)', sales: 45, revenue: 21600 },
  { name: 'Milk (500ml)', sales: 210, revenue: 13650 },
];

export const formatKES = (amount: number): string => {
  return `KES ${amount.toLocaleString('en-KE')}`;
};

export const formatPhone = (phone: string): string => {
  // Format: +254 712 345 678
  const cleaned = phone.replace(/\D/g, '');
  if (cleaned.length === 12 && cleaned.startsWith('254')) {
    return `+${cleaned.slice(0, 3)} ${cleaned.slice(3, 6)} ${cleaned.slice(6, 9)} ${cleaned.slice(9)}`;
  }
  return phone;
};
