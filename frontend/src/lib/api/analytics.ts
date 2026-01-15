import apiClient from './apiClient';

export interface SalesSummary {
  totalSales: number;
  totalRevenue: number;
  totalProducts: number;
  lowStockItems: number;
  dailyAverage: number;
  weeklyGrowth: number;
}

export interface DailySalesData {
  date: string;
  sales: number;
  revenue: number;
  transactions: number;
}

export interface TopProduct {
  id: string;
  name: string;
  quantitySold: number;
  revenue: number;
  category: string;
}

export const analyticsApi = {
  async getSummary(): Promise<SalesSummary> {
    const { data } = await apiClient.get<SalesSummary>('/analytics/summary');
    return data;
  },

  async getDailySales(days: number = 30): Promise<DailySalesData[]> {
    const { data } = await apiClient.get<DailySalesData[]>(
      `/analytics/daily?days=${days}`
    );
    return data;
  },

  async getTopProducts(limit: number = 5): Promise<TopProduct[]> {
    const { data } = await apiClient.get<TopProduct[]>(
      `/analytics/top-products?limit=${limit}`
    );
    return data;
  },

  async getCategorySales(): Promise<{ category: string; revenue: number }[]> {
    const { data } = await apiClient.get<{ category: string; revenue: number }[]>(
      '/analytics/categories'
    );
    return data;
  },

  async getPaymentMethods(): Promise<{ method: string; count: number; amount: number }[]> {
    const { data } = await apiClient.get<{ method: string; count: number; amount: number }[]>(
      '/analytics/payment-methods'
    );
    return data;
  },
};
