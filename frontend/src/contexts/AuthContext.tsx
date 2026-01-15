import React, { createContext, useContext, useState, useEffect, ReactNode } from 'react';
import { useNavigate } from 'react-router-dom';

interface User {
  id: string;
  phone: string;
  storeName: string;
}

interface AuthContextType {
  user: User | null;
  token: string | null;
  isAuthenticated: boolean;
  isLoading: boolean;
  login: (phone: string, password: string) => Promise<void>;
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
    const storedToken = localStorage.getItem('payshelf_token');
    const storedUser = localStorage.getItem('payshelf_user');
    
    if (storedToken && storedUser) {
      setToken(storedToken);
      setUser(JSON.parse(storedUser));
    }
    setIsLoading(false);
  }, []);

  const login = async (phone: string, password: string): Promise<void> => {
    // Simulate API call - in production, this would call your backend
    await new Promise(resolve => setTimeout(resolve, 1000));
    
    // Demo validation
    if (phone === '+254712345678' && password === 'demo123') {
      const mockUser: User = {
        id: '1',
        phone: phone,
        storeName: 'Mama Njeri\'s Shop',
      };
      const mockToken = 'demo_jwt_token_' + Date.now();
      
      localStorage.setItem('payshelf_token', mockToken);
      localStorage.setItem('payshelf_user', JSON.stringify(mockUser));
      
      setToken(mockToken);
      setUser(mockUser);
    } else {
      throw new Error('Invalid phone number or password');
    }
  };

  const logout = () => {
    localStorage.removeItem('payshelf_token');
    localStorage.removeItem('payshelf_user');
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
        logout,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
};
