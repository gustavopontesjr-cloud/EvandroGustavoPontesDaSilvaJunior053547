import { api } from './api';
import type { LoginRequest, AuthResponse } from '../types/auth';
import { AuthState } from './AuthState';

export const authService = {
  // Função que conecta na API para fazer login
  async login(credentials: LoginRequest) {
    // POST /autenticacao/login (Conforme seu print do Swagger)
    const response = await api.post<AuthResponse>('/autenticacao/login', credentials);
    
    // AQUI ESTÁ A MÁGICA: Ao receber o token, já salvamos ele no Estado Global
    AuthState.setToken(response.data.access_token);
    
    return response.data;
  },

  // Função para sair do sistema
  logout() {
    AuthState.clearToken();
  }
};