import React, { createContext, useContext, useState, ReactNode } from 'react';

interface AuthUser {
  id: string;
  username: string;
  avatar_url?: string;
  phone?: string;
  email?: string;
  created_at: string;
}

interface AuthContextType {
  user: AuthUser | null;
  isAuthenticated: boolean;
  isLoading: boolean;
  login: (username: string, password: string) => Promise<{ error: any | null }>;
  logout: () => Promise<void>;
  updateProfile: (data: Partial<AuthUser>) => Promise<{ error: any | null }>;
}

const HARDCODED_USER = {
  id: 'bb966c69-f806-4192-9901-fe8da5ac8f75',
  username: 'Manoj',
  created_at: new Date().toISOString(),
};

const AuthContext = createContext<AuthContextType>({
  user: null,
  isAuthenticated: false,
  isLoading: false,
  login: async () => ({ error: null }),
  logout: async () => {},
  updateProfile: async () => ({ error: null }),
});

export const AuthProvider = ({ children }: { children: ReactNode }) => {
  const [user, setUser] = useState<AuthUser | null>(null);
  const [isLoading, setIsLoading] = useState(false);

  const login = async (username: string, password: string) => {
    try {
      if (username === 'Manoj' && password === 'Manoj@1234') {
        setUser(HARDCODED_USER);
        return { error: null };
      }
      return { error: new Error('Invalid username or password') };
    } catch (error) {
      return { error };
    }
  };

  const logout = async () => {
    setUser(null);
  };
  
  const updateProfile = async (data: Partial<AuthUser>) => {
    if (!user) return { error: new Error('Not authenticated') };
    
    try {
      setUser(prev => prev ? { ...prev, ...data } : null);
      return { error: null };
    } catch (error) {
      return { error };
    }
  };

  return (
    <AuthContext.Provider
      value={{
        user,
        isAuthenticated: !!user,
        isLoading,
        login,
        logout,
        updateProfile,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => useContext(AuthContext);
