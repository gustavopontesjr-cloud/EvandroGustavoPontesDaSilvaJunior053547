import type { Pet } from '../types/pet';

// Simulando um banco de dados
const MOCK_PETS: Pet[] = [
  { id: 1, name: 'Rex', breed: 'Labrador', ownerName: 'Carlos Silva', status: 'Agendado' },
  { id: 2, name: 'Mia', breed: 'Siamês', ownerName: 'Ana Souza', status: 'Em Atendimento' },
  { id: 3, name: 'Thor', breed: 'Bulldog', ownerName: 'Marcos Oliveira', status: 'Concluido' },
  { id: 4, name: 'Luna', breed: 'Poodle', ownerName: 'Julia Lima', status: 'Agendado' },
];

export const petService = {
  // Função que devolve os dados (simulando uma chamada de API)
  getPets: (): Pet[] => {
    return MOCK_PETS;
  }
};