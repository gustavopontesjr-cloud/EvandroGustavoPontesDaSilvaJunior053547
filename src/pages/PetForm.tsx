import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Header } from "../components/Header";
import { petService } from '../services/petService'; // <--- Importamos o serviço

export function PetForm() {
  const navigate = useNavigate();

  const [name, setName] = useState('');
  const [breed, setBreed] = useState('');
  const [owner, setOwner] = useState('');

  function handleCancel() {
    navigate('/home');
  }

  // 👇 AQUI ESTÁ A MUDANÇA PRINCIPAL
  function handleSubmit(event: React.FormEvent) {
    event.preventDefault();
    
    // 1. Chama o serviço para salvar os dados
    petService.createPet(name, breed, owner);

    // 2. Volta para a tela inicial para ver o novo pet na lista
    navigate('/home');
  }

  return (
    <div className="min-h-screen bg-gray-100">
      <Header />

      <main className="p-8 max-w-xl mx-auto">
        <h2 className="text-3xl font-bold text-gray-800 mb-6">Novo Pet 🐾</h2>
        
        <div className="bg-white p-6 rounded-lg shadow-md border border-gray-200">
          <form onSubmit={handleSubmit} className="flex flex-col gap-4">
            
            {/* Nome */}
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">Nome do Pet</label>
              <input 
                type="text" 
                placeholder="Ex: Rex"
                className="w-full border border-gray-300 p-2 rounded focus:ring-2 focus:ring-blue-500 outline-none"
                value={name}
                onChange={(e) => setName(e.target.value)}
                required
              />
            </div>

            {/* Raça */}
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">Raça</label>
              <input 
                type="text" 
                placeholder="Ex: Vira-lata"
                className="w-full border border-gray-300 p-2 rounded focus:ring-2 focus:ring-blue-500 outline-none"
                value={breed}
                onChange={(e) => setBreed(e.target.value)}
                required
              />
            </div>

            {/* Tutor */}
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">Nome do Tutor</label>
              <input 
                type="text" 
                placeholder="Ex: João Silva"
                className="w-full border border-gray-300 p-2 rounded focus:ring-2 focus:ring-blue-500 outline-none"
                value={owner}
                onChange={(e) => setOwner(e.target.value)}
                required
              />
            </div>

            {/* Botões */}
            <div className="flex gap-3 mt-4">
              <button 
                type="button" 
                onClick={handleCancel}
                className="flex-1 bg-gray-200 text-gray-700 py-2 rounded hover:bg-gray-300 transition-colors font-semibold"
              >
                Cancelar
              </button>
              <button 
                type="submit"
                className="flex-1 bg-blue-600 text-white py-2 rounded hover:bg-blue-700 transition-colors font-bold"
              >
                Salvar
              </button>
            </div>

          </form>
        </div>
      </main>
    </div>
  )
}