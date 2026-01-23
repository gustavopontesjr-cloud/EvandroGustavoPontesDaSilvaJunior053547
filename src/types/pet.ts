// Extraímos o tipo Foto para poder usar no Tutor também
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
  foto?: Foto; // Agora usa o tipo exportado acima
}

export interface PetRequest {
  nome: string;
  idade: number;
  raca: string;
}