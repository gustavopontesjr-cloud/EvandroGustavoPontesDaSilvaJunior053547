import axios from 'axios';
import { AuthState } from './AuthState';

export const api = axios.create({
  baseURL: 'https://pet-manager-api.geia.vip',
  headers: {
    'Content-Type': 'application/json',
  },
});

api.interceptors.request.use(
  (config) => {
    const token = AuthState.getToken();
    const isLoginRequest = config.url?.includes('/login') || config.url?.includes('/autenticacao');

    if (token && !isLoginRequest) {
      config.headers.Authorization = `Bearer ${token}`;
    }
    return config;
  },
  (error) => Promise.reject(error)
);

api.interceptors.response.use(
  (response) => response,
  (error) => {
    const isLoginRequest = error.config?.url?.includes('/login') || error.config?.url?.includes('/autenticacao');

    if (error.response?.status === 401 && !isLoginRequest) {
      AuthState.clearToken();
      window.location.href = '/login'; 
    }
    
    return Promise.reject(error);
  }
);