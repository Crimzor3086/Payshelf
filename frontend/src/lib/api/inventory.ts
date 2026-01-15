import apiClient from './apiClient';

export interface Product {
  id: string;
  name: string;
  price: number;
  quantity: number;
  lowStockThreshold: number;
  category?: string;
  barcode?: string;
  createdAt?: string;
  updatedAt?: string;
}

export interface CreateProductData {
  name: string;
  price: number;
  quantity: number;
  lowStockThreshold: number;
  category?: string;
  barcode?: string;
}

export interface RestockData {
  productId: string;
  quantity: number;
  notes?: string;
}

export const inventoryApi = {
  async getInventory(): Promise<Product[]> {
    const { data } = await apiClient.get<Product[]>('/inventory');
    return data;
  },

  async getProduct(id: string): Promise<Product> {
    const { data } = await apiClient.get<Product>(`/inventory/${id}`);
    return data;
  },

  async createProduct(productData: CreateProductData): Promise<Product> {
    const { data } = await apiClient.post<Product>('/inventory', productData);
    return data;
  },

  async updateProduct(id: string, productData: Partial<CreateProductData>): Promise<Product> {
    const { data } = await apiClient.patch<Product>(`/inventory/${id}`, productData);
    return data;
  },

  async deleteProduct(id: string): Promise<void> {
    await apiClient.delete(`/inventory/${id}`);
  },

  async restockProduct(restockData: RestockData): Promise<Product> {
    const { data } = await apiClient.post<Product>('/inventory/restock', restockData);
    return data;
  },

  async getLowStockItems(threshold?: number): Promise<Product[]> {
    const { data } = await apiClient.get<Product[]>(
      `/inventory/low-stock${threshold ? `?threshold=${threshold}` : ''}`
    );
    return data;
  },
};
