import apiClient from './apiClient';

export interface LoginCredentials {
  phone: string;
  password: string;
}

export interface RegisterData extends LoginCredentials {
  name: string;
  email?: string;
}

export interface AuthResponse {
  token: string;
  user: {
    id: string;
    phone: string;
    name: string;
  };
}

export const authApi = {
  async login(credentials: LoginCredentials): Promise<AuthResponse> {
    const { data } = await apiClient.post<AuthResponse>('/users/login', credentials);
    return data;
  },

  async register(userData: RegisterData): Promise<AuthResponse> {
    const { data } = await apiClient.post<AuthResponse>('/users/register', userData);
    return data;
  },

  logout(): void {
    localStorage.removeItem('token');
  },

  getCurrentUser() {
    const token = localStorage.getItem('token');
    if (!token) return null;
    
    try {
      const base64Url = token.split('.')[1];
      const base64 = base64Url.replace(/-/g, '+').replace(/_/g, '/');
      const payload = JSON.parse(window.atob(base64));
      return {
        id: payload.userId,
        phone: payload.phone,
      };
    } catch (error) {
      return null;
    }
  },
};
