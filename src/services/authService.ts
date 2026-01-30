import { api } from './api';
import type { LoginRequest, AuthResponse } from '../types/auth';
import { AuthState } from './AuthState';

export const authService = {
  async login(credentials: LoginRequest) {
    const response = await api.post<AuthResponse>('/autenticacao/login', credentials);
    AuthState.setToken(response.data.access_token);
    return response.data;
  },

  logout() {
    AuthState.clearToken();
  }
};