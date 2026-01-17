import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom'; // <--- Importamos o navegador
import { Header } from '../components/Header';
import { petService } from '../services/petService';
import type { Pet } from '../types/pet';

export function Home() {
  const [pets, setPets] = useState<Pet[]>([]);
  const navigate = useNavigate(); // <--- Inicializamos o "GPS"

  useEffect(() => {
    try {
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
        {/* Agora o título e o botão ficam lado a lado */}
        <div className="flex justify-between items-center mb-6">
          <h2 className="text-3xl font-bold text-gray-800">Painel de Controle</h2>
          
          <button 
            onClick={() => navigate('/pet/new')}
            className="bg-green-600 hover:bg-green-700 text-white px-4 py-2 rounded-lg font-bold shadow-md transition-colors flex items-center gap-2"
          >
            + Novo Pet
          </button>
        </div>
        
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