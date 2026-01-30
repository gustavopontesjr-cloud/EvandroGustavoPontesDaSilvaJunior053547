import type { Foto, Pet } from './pet';

export interface Tutor {
  id: number;
  nome: string;
  email: string;
  telefone: string;
  endereco: string;
  cpf: number;
  foto?: Foto;
  pets?: Pet[];
}

export interface TutorRequest {
  nome: string;
  email: string;
  telefone: string;
  endereco: string;
  cpf: number;
}