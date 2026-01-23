import { api } from './api';
import type { PaginatedResponse } from '../types/pagination';
import type { Pet, PetRequest } from '../types/pet';

// URL base fixa para garantir que o fetch funcione (mesma usada no api.ts)
const BASE_URL = 'https://pet-manager-api.geia.vip';

export const petService = {
  getAll: async (page = 0, size = 10, nome = '') => {
    const params = { page, size, nome };
    const response = await api.get<PaginatedResponse<Pet>>('/v1/pets', { params });
    return response.data;
  },

  getById: async (id: number) => {
    const response = await api.get<Pet>(`/v1/pets/${id}`);
    return response.data;
  },

  create: async (data: PetRequest) => {
    const response = await api.post<Pet>('/v1/pets', data);
    return response.data;
  },

  update: async (id: number, data: PetRequest) => {
    const response = await api.put<Pet>(`/v1/pets/${id}`, data);
    return response.data;
  },

  // CORREÇÃO: Usando fetch nativo para evitar conflitos de cabeçalho do Axios
  uploadPhoto: async (id: number, file: File) => {
    const formData = new FormData();
    formData.append('foto', file); // O nome correto confirmado no Swagger

    // Pegamos o token direto do armazenamento
    const token = localStorage.getItem('access_token');

    const response = await fetch(`${BASE_URL}/v1/pets/${id}/fotos`, {
      method: 'POST',
      headers: {
        'Authorization': `Bearer ${token}`,
        // IMPORTANTE: Não definimos Content-Type aqui. O navegador define sozinho.
      },
      body: formData
    });

    if (!response.ok) {
      throw new Error('Falha ao enviar foto');
    }

    return response.json();
  }
};