import { createContext, useContext, useState, useEffect } from 'react';
import type { ReactNode } from 'react';
import { useNavigate } from 'react-router-dom';
import { AuthState } from '../services/AuthState';

interface AuthContextData {
  isAuthenticated: boolean;
  login: (token: string) => void;
  logout: () => void;
}

const AuthContext = createContext<AuthContextData>({} as AuthContextData);

export function AuthProvider({ children }: { children: ReactNode }) {
  const navigate = useNavigate();
  const [isAuthenticated, setIsAuthenticated] = useState(!!AuthState.getToken());

  useEffect(() => {
    setIsAuthenticated(!!AuthState.getToken());
  }, []);

  function login(token: string) {
    AuthState.setToken(token);
    setIsAuthenticated(true);
  }

  function logout() {
    AuthState.clearToken();
    setIsAuthenticated(false);
    navigate('/login');
  }

  return (
    <AuthContext.Provider value={{ isAuthenticated, login, logout }}>
      {children}
    </AuthContext.Provider>
  );
}

export function useAuth() {
  return useContext(AuthContext);
}