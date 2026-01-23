import { useState } from 'react';
import { useForm } from 'react-hook-form';
import { useNavigate } from 'react-router-dom';
import { ArrowLeft, Save } from 'lucide-react';
import { Header } from '../components/Header';
import { Input } from '../components/Input';
import { Button } from '../components/Button';
import { petService } from '../services/petService';
import type { PetRequest } from '../types/pet';

export function PetForm() {
  const navigate = useNavigate();
  const [isLoading, setIsLoading] = useState(false);
  const { register, handleSubmit, formState: { errors } } = useForm<PetRequest>();

  async function handleSave(data: PetRequest) {
    try {
      setIsLoading(true);
      // Converte a idade para número (o input devolve texto)
      const payload = { ...data, idade: Number(data.idade) };
      
      await petService.create(payload);
      
      // Volta para a lista de pets
      navigate('/pets');
    } catch (error) {
      console.error('Erro ao salvar', error);
      alert('Erro ao salvar o pet. Verifique os dados.');
    } finally {
      setIsLoading(false);
    }
  }

  return (
    <div className="min-h-screen bg-background">
      <Header />

      <main className="max-w-2xl mx-auto px-4 py-8">
        {/* Botão Voltar */}
        <button 
          onClick={() => navigate('/pets')}
          className="flex items-center gap-2 text-gray-400 hover:text-white mb-6 transition-colors"
        >
          <ArrowLeft className="w-4 h-4" />
          <span>Voltar para lista</span>
        </button>

        <div className="bg-surface border border-gray-800 rounded-xl p-8 shadow-lg">
          <h1 className="text-2xl font-bold text-white mb-6">Novo Pet</h1>

          <form onSubmit={handleSubmit(handleSave)} className="space-y-6">
            <Input
              label="Nome do Pet"
              placeholder="Ex: Rex, Mel..."
              error={errors.nome?.message}
              {...register('nome', { required: 'O nome é obrigatório' })}
            />

            <div className="grid grid-cols-2 gap-4">
              <Input
                label="Raça"
                placeholder="Ex: Vira-lata"
                error={errors.raca?.message}
                {...register('raca', { required: 'A raça é obrigatória' })}
              />

              <Input
                label="Idade (Anos)"
                type="number"
                placeholder="Ex: 5"
                error={errors.idade?.message}
                {...register('idade', { required: 'A idade é obrigatória', min: 0 })}
              />
            </div>

            <div className="pt-4">
              <Button type="submit" isLoading={isLoading} className="w-full gap-2">
                <Save className="w-4 h-4" />
                SALVAR PET
              </Button>
            </div>
          </form>
        </div>
      </main>
    </div>
  );
}