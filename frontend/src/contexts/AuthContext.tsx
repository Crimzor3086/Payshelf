import React, { createContext, useContext, useState, useEffect, ReactNode } from 'react';
import { authApi, AuthResponse } from '@/lib/api/auth';

interface User {
  id: string;
  phone: string;
  name: string;
  storeName?: string;
}

interface AuthContextType {
  user: User | null;
  token: string | null;
  isAuthenticated: boolean;
  isLoading: boolean;
  login: (phone: string, password: string) => Promise<void>;
  register: (userData: { name: string; shopName: string; phone: string; password: string }) => Promise<void>;
  logout: () => void;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
};

interface AuthProviderProps {
  children: ReactNode;
}

export const AuthProvider: React.FC<AuthProviderProps> = ({ children }) => {
  const [user, setUser] = useState<User | null>(null);
  const [token, setToken] = useState<string | null>(null);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    // Check for existing token on mount
    const storedToken = localStorage.getItem('token');
    
    if (storedToken) {
      try {
        const currentUser = authApi.getCurrentUser();
        if (currentUser) {
          setToken(storedToken);
          setUser({
            id: currentUser.id,
            phone: currentUser.phone,
            name: currentUser.phone, // Fallback to phone if name not in token
            storeName: `Store ${currentUser.phone.slice(-4)}`, // Fallback store name
          });
        } else {
          // Invalid token, clear it
          localStorage.removeItem('token');
        }
      } catch (error) {
        localStorage.removeItem('token');
      }
    }
    setIsLoading(false);
  }, []);

  const login = async (phone: string, password: string): Promise<void> => {
    try {
      const response: AuthResponse = await authApi.login({ phone, password });
      const { token: authToken, user: userData } = response;
      
      localStorage.setItem('token', authToken);
      setToken(authToken);
      setUser({
        id: userData.id,
        phone: userData.phone,
        name: userData.name,
        storeName: userData.name ? `${userData.name}'s Shop` : `Store ${userData.phone.slice(-4)}`,
      });
    } catch (error: any) {
      const errorMessage = error.response?.data?.message || error.message || 'Login failed. Please check your credentials.';
      throw new Error(errorMessage);
    }
  };

  const register = async (userData: { name: string; shopName: string; phone: string; password: string }): Promise<void> => {
    try {
      const response: AuthResponse = await authApi.register(userData);
      const { token: authToken, user: registeredUser } = response;
      
      localStorage.setItem('token', authToken);
      setToken(authToken);
      setUser({
        id: registeredUser.id,
        phone: registeredUser.phone,
        name: registeredUser.name,
        storeName: userData.shopName,
      });
    } catch (error: any) {
      const errorMessage = error.response?.data?.message || error.response?.data?.error || error.message || 'Registration failed. Please try again.';
      throw new Error(errorMessage);
    }
  };

  const logout = () => {
    authApi.logout();
    setToken(null);
    setUser(null);
  };

  return (
    <AuthContext.Provider
      value={{
        user,
        token,
        isAuthenticated: !!token,
        isLoading,
        login,
        register,
        logout,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
};
