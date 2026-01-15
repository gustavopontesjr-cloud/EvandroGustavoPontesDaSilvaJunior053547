// Aqui definimos a "forma" que nosso dado tem
export interface Pet {
  id: number;
  name: string;
  breed: string; // Raça
  ownerName: string; // Nome do Tutor
  status: 'Agendado' | 'Em Atendimento' | 'Concluido'; // Só aceita esses 3 textos exatos
}