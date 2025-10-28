'use client';

import { createContext, useContext, useState, useEffect, ReactNode } from 'react';
import axios from 'axios';

interface User {
  _id: string;
  firstName: string;
  email: string;
  role: string;
  [key: string]: any;
}

interface AuthContextType {
  user: User | null;
  isAdmin: boolean;
  loading: boolean;
  setUser: (user: User | null) => void;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export const AuthProvider = ({ children }: { children: ReactNode }) => {
  const [user, setUser] = useState<User | null>(null);
  const [isAdmin, setIsAdmin] = useState(false);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const restoreUser = () => {
      const token = localStorage.getItem('token');
      const storedUser = localStorage.getItem('user');
      if (token && storedUser) {
        const parsedUser = JSON.parse(storedUser);
        setUser(parsedUser);
        setIsAdmin(parsedUser.role === 'admin');
        axios.defaults.headers.common['Authorization'] = `Bearer ${token}`;
      } else {
        setUser(null);
        setIsAdmin(false);
      }
      setLoading(false);
    };

    restoreUser();
    window.addEventListener('userLogin', restoreUser);
    window.addEventListener('userLogout', restoreUser);

    return () => {
      window.removeEventListener('userLogin', restoreUser);
      window.removeEventListener('userLogout', restoreUser);
    };
  }, []);

  return (
    <AuthContext.Provider value={{ user, isAdmin, loading, setUser }}>
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (!context) throw new Error('useAuth must be used within an AuthProvider');
  return context;
};
