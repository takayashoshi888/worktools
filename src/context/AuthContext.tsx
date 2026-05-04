import React, { createContext, useContext, useState, useEffect, ReactNode } from 'react';

interface User {
  username: string;
  name: string;
}

interface AuthContextType {
  user: User | null;
  isAdmin: boolean;
  isAuthReady: boolean;
  login: (username: string, password: string) => Promise<void>;
  logout: () => Promise<void>;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export const AuthProvider = ({ children }: { children: ReactNode }) => {
  const [user, setUser] = useState<User | null>(null);
  const [isAdmin, setIsAdmin] = useState(false);
  const [isAuthReady, setIsAuthReady] = useState(false);

  useEffect(() => {
    const checkAuth = async () => {
      const token = localStorage.getItem('admin_token');
      if (token) {
        try {
          const res = await fetch('/api/auth/me', {
            headers: { 'Authorization': `Bearer ${token}` }
          });
          if (res.ok) {
            const contentType = res.headers.get('content-type');
            if (contentType && contentType.includes('application/json')) {
              const data = await res.json();
              setUser({ username: data.username, name: data.name });
              setIsAdmin(data.role === 'admin');
            } else {
              console.error('Expected JSON but received non-JSON response');
              localStorage.removeItem('admin_token');
            }
          } else {
            localStorage.removeItem('admin_token');
          }
        } catch (error) {
          console.error('Auth check failed', error);
        }
      }
      setIsAuthReady(true);
    };
    checkAuth();
  }, []);

  const login = async (username: string, password: string) => {
    const res = await fetch('/api/auth/login', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ username, password })
    });
    
    const contentType = res.headers.get('content-type');
    if (!contentType || !contentType.includes('application/json')) {
      throw new Error(`服务器返回了非 JSON 数据 (状态码: ${res.status})。请检查后端是否部署成功。`);
    }

    if (res.ok) {
      const data = await res.json();
      localStorage.setItem('admin_token', data.token);
      setUser(data.user);
      setIsAdmin(true); // Assuming successful login means admin for now
    } else {
      const error = await res.json();
      throw new Error(error.error || '登录失败');
    }
  };

  const logout = async () => {
    setUser(null);
    setIsAdmin(false);
    localStorage.removeItem('admin_token');
  };

  return (
    <AuthContext.Provider value={{ user, isAdmin, isAuthReady, login, logout }}>
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (context === undefined) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
};
