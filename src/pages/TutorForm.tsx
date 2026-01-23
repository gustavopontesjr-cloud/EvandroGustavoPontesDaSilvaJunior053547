import { useState } from 'react';
import { useForm } from 'react-hook-form';
import { useNavigate } from 'react-router-dom';
import { ArrowLeft, Save, UserPlus } from 'lucide-react';
import { Header } from '../components/Header';
import { Input } from '../components/Input';
import { Button } from '../components/Button';
import { tutorService } from '../services/tutorService';
import type { TutorRequest } from '../types/tutor';

export function TutorForm() {
  const navigate = useNavigate();
  const [isLoading, setIsLoading] = useState(false);
  const { register, handleSubmit, formState: { errors } } = useForm<TutorRequest>();

  async function handleSave(data: TutorRequest) {
    try {
      setIsLoading(true);
      // A API exige CPF como número, garantimos a conversão aqui
      const payload = { 
        ...data, 
        cpf: Number(data.cpf) 
      };
      
      await tutorService.create(payload);
      navigate('/tutores');
    } catch (error) {
      console.error('Erro ao salvar tutor', error);
      alert('Erro ao salvar. Verifique se o CPF já não existe.');
    } finally {
      setIsLoading(false);
    }
  }

  return (
    <div className="min-h-screen bg-background">
      <Header />

      <main className="max-w-2xl mx-auto px-4 py-8">
        <button 
          onClick={() => navigate('/tutores')}
          className="flex items-center gap-2 text-gray-400 hover:text-white mb-6 transition-colors"
        >
          <ArrowLeft className="w-4 h-4" />
          <span>Voltar para lista</span>
        </button>

        <div className="bg-surface border border-gray-800 rounded-xl p-8 shadow-lg">
          <div className="flex items-center gap-3 mb-6">
            <div className="p-2 bg-primary/10 rounded-lg">
              <UserPlus className="w-6 h-6 text-primary" />
            </div>
            <h1 className="text-2xl font-bold text-white">Novo Tutor</h1>
          </div>

          <form onSubmit={handleSubmit(handleSave)} className="space-y-6">
            <Input
              label="Nome Completo"
              placeholder="Ex: João da Silva"
              error={errors.nome?.message}
              {...register('nome', { required: 'Nome é obrigatório' })}
            />

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <Input
                label="CPF (Somente números)"
                type="number"
                placeholder="Ex: 12345678900"
                error={errors.cpf?.message}
                {...register('cpf', { required: 'CPF é obrigatório' })}
              />
              
              <Input
                label="Telefone"
                placeholder="Ex: (65) 99999-9999"
                error={errors.telefone?.message}
                {...register('telefone', { required: 'Telefone é obrigatório' })}
              />
            </div>

            <Input
              label="E-mail"
              type="email"
              placeholder="Ex: joao@email.com"
              error={errors.email?.message}
              {...register('email', { required: 'E-mail é obrigatório' })}
            />

            <Input
              label="Endereço"
              placeholder="Ex: Rua das Flores, 123"
              error={errors.endereco?.message}
              {...register('endereco', { required: 'Endereço é obrigatório' })}
            />

            <div className="pt-4">
              <Button type="submit" isLoading={isLoading} className="w-full gap-2 text-black font-bold">
                <Save className="w-4 h-4" />
                CADASTRAR TUTOR
              </Button>
            </div>
          </form>
        </div>
      </main>
    </div>
  );
}