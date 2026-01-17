import type { Pet } from '../types/pet';

// Nossa lista de dados (Simulando o Banco de Dados)
const MOCK_PETS: Pet[] = [
  { id: 1, name: 'Rex', breed: 'Labrador', ownerName: 'Carlos Silva', status: 'Agendado' },
  { id: 2, name: 'Mia', breed: 'Siamês', ownerName: 'Ana Souza', status: 'Em Atendimento' },
  { id: 3, name: 'Thor', breed: 'Bulldog', ownerName: 'Marcos Oliveira', status: 'Concluido' },
  { id: 4, name: 'Luna', breed: 'Poodle', ownerName: 'Julia Lima', status: 'Agendado' },
];

export const petService = {
  // Busca todos os pets
  getPets: (): Pet[] => {
    return MOCK_PETS;
  },

  // 👇 NOVA FUNÇÃO: Cria um novo pet
  createPet: (name: string, breed: string, ownerName: string) => {
    const newPet: Pet = {
      id: MOCK_PETS.length + 1, // Gera um ID simples (pega o tamanho da lista + 1)
      name: name,
      breed: breed,
      ownerName: ownerName,
      status: 'Agendado' // Todo pet novo começa como 'Agendado'
    };

    MOCK_PETS.push(newPet); // Adiciona na lista
  }
};