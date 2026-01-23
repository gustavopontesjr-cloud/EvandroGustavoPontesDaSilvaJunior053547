import axios from 'axios';
import { AuthState } from './AuthState';

// Configuração básica com o endereço do edital
export const api = axios.create({
  baseURL: 'https://pet-manager-api.geia.vip',
  headers: {
    'Content-Type': 'application/json',
  },
});

// Interceptador: Antes de cada requisição, insere o token automaticamente
api.interceptors.request.use(
  (config) => {
    const token = AuthState.getToken();
    if (token) {
      config.headers.Authorization = `Bearer ${token}`;
    }
    return config;
  },
  (error) => Promise.reject(error)
);

// Interceptador de Erro: Se der erro 401 (token inválido), desloga o usuário
api.interceptors.response.use(
  (response) => response,
  (error) => {
    if (error.response?.status === 401) {
      AuthState.clearToken();
      // Opcional: Redirecionar para login aqui se necessário
    }
    return Promise.reject(error);
  }
);