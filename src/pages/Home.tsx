import { useEffect, useState } from 'react';
import { Header } from '../components/Header';
import { petService } from '../services/petService';
import type { Pet } from '../types/pet';

export function Home() {
  const [pets, setPets] = useState<Pet[]>([]);

  useEffect(() => {
    try {
      // Tenta buscar os dados
      const dados = petService.getPets();
      setPets(dados);
    } catch (error) {
      console.error("Erro ao carregar pets:", error);
    }
  }, []);

  return (
    <div className="min-h-screen bg-gray-100">
      <Header />

      <main className="p-8 max-w-7xl mx-auto">
        <h2 className="text-3xl font-bold text-gray-800 mb-6">Painel de Controle</h2>
        
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {pets.map((pet) => (
            <div key={pet.id} className="bg-white p-6 rounded-lg shadow-md border-l-4 border-blue-500">
              <div className="flex justify-between items-start">
                <h3 className="text-xl font-bold text-gray-800">{pet.name}</h3>
                <span className="text-xs font-semibold bg-gray-200 px-2 py-1 rounded text-gray-600">
                  {pet.status}
                </span>
              </div>
              
              <p className="text-gray-600 mt-2">Raça: {pet.breed}</p>
              <p className="text-gray-500 text-sm mt-1">Tutor: {pet.ownerName}</p>
              
              <button className="mt-4 text-blue-600 hover:text-blue-800 text-sm font-semibold">
                Ver Detalhes →
              </button>
            </div>
          ))}
        </div>
      </main>
    </div>
  )
}