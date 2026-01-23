import type { Tutor } from './tutor'; 

export interface Foto {
  id: number;
  url: string;
  nome: string;
}

export interface Pet {
  id: number;
  nome: string;
  idade: number;
  raca: string;
  especie?: string; // Mantemos opcional, pois o servidor não manda
  
  // O SEGREDO ESTÁ AQUI: O servidor manda uma lista!
  tutores?: Tutor[]; 
  
  foto?: Foto;
}

export interface PetRequest {
  nome: string;
  idade: number;
  raca: string;
  especie: string;
  tutorId?: number;
}