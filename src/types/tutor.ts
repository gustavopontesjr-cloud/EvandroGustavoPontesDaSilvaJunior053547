import type { Foto, Pet } from './pet';

// Define o formato de um Tutor completo vindo da API
export interface Tutor {
  id: number;
  nome: string;
  email: string;
  telefone: string;
  endereco: string;
  cpf: number; // Atenção: A API exige número (int64), não texto!
  foto?: Foto;
  pets?: Pet[]; // Lista de pets que esse tutor tem
}

// O que enviamos para CADASTRAR um novo Tutor (POST)
export interface TutorRequest {
  nome: string;
  email: string;
  telefone: string;
  endereco: string;
  cpf: number;
}