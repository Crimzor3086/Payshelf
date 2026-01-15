import { useState, useEffect, useCallback } from 'react';
import { authApi, AuthResponse } from '../lib/api/auth';
import { useNavigate } from 'react-router-dom';

export const useAuth = () => {
  const [user, setUser] = useState<AuthResponse['user'] | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const navigate = useNavigate();

  // Check if user is logged in on initial load
  useEffect(() => {
    const checkAuth = async () => {
      try {
        const currentUser = authApi.getCurrentUser();
        if (currentUser) {
          setUser(currentUser);
        }
      } catch (err) {
        console.error('Auth check failed:', err);
        authApi.logout();
      } finally {
        setLoading(false);
      }
    };

    checkAuth();
  }, []);

  const login = useCallback(async (phone: string, password: string) => {
    setLoading(true);
    setError(null);
    try {
      const { user, token } = await authApi.login({ phone, password });
      localStorage.setItem('token', token);
      setUser(user);
      return user;
    } catch (err) {
      const errorMessage = err.response?.data?.message || 'Login failed. Please try again.';
      setError(errorMessage);
      throw new Error(errorMessage);
    } finally {
      setLoading(false);
    }
  }, []);

  const register = useCallback(async (userData: { name: string; phone: string; password: string; email?: string }) => {
    setLoading(true);
    setError(null);
    try {
      const { user, token } = await authApi.register(userData);
      localStorage.setItem('token', token);
      setUser(user);
      return user;
    } catch (err) {
      const errorMessage = err.response?.data?.message || 'Registration failed. Please try again.';
      setError(errorMessage);
      throw new Error(errorMessage);
    } finally {
      setLoading(false);
    }
  }, []);

  const logout = useCallback(() => {
    authApi.logout();
    setUser(null);
    navigate('/login');
  }, [navigate]);

  return {
    user,
    loading,
    error,
    login,
    register,
    logout,
    isAuthenticated: !!user,
  };
};
