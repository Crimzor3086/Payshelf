import apiClient from './apiClient';

export interface SaleItem {
  productId: string;
  quantity: number;
  price: number;
  name: string;
}

export interface ProcessPaymentData {
  items: SaleItem[];
  customerPhone: string;
  totalAmount: number;
  paymentMethod: 'mpesa' | 'cash' | 'card';
  discount?: number;
  tax?: number;
  notes?: string;
}

export interface PaymentResponse {
  success: boolean;
  message: string;
  data?: {
    receiptNumber: string;
    amount: number;
    change: number;
    paymentMethod: string;
    timestamp: string;
  };
  error?: string;
}

export const salesApi = {
  async processPayment(paymentData: ProcessPaymentData): Promise<PaymentResponse> {
    const { data } = await apiClient.post<PaymentResponse>('/sales/process', paymentData);
    return data;
  },

  async initiateMpesaPayment(phone: string, amount: number, reference: string): Promise<{ success: boolean; message: string }> {
    const { data } = await apiClient.post('/mpesa/stk-push', {
      phone: phone.startsWith('+') ? phone : `+${phone}`,
      amount,
      reference,
    });
    return data;
  },

  async getReceipt(receiptNumber: string) {
    const { data } = await apiClient.get(`/sales/receipt/${receiptNumber}`);
    return data;
  },

  async getRecentSales(limit = 10) {
    const { data } = await apiClient.get(`/sales/recent?limit=${limit}`);
    return data;
  },

  async getSalesReport(startDate: string, endDate: string) {
    const { data } = await apiClient.get(`/sales/report?startDate=${startDate}&endDate=${endDate}`);
    return data;
  },
};
