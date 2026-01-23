import { useEffect, useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { useForm } from 'react-hook-form';
import { ArrowLeft, Save, Upload, Camera } from 'lucide-react';
import { Header } from '../components/Header';
import { Input } from '../components/Input';
import { Button } from '../components/Button';
import { petService } from '../services/petService';
import type { Pet, PetRequest } from '../types/pet';

export function PetDetails() {
  const { id } = useParams(); // Pega o ID da URL
  const navigate = useNavigate();
  const [pet, setPet] = useState<Pet | null>(null);
  const [isLoading, setIsLoading] = useState(false);
  
  // Hook do formulário
  const { register, handleSubmit, setValue, formState: { errors } } = useForm<PetRequest>();

  // 1. Carrega os dados ao abrir a tela
  useEffect(() => {
    if (id) {
      loadPet(Number(id));
    }
  }, [id]);

  async function loadPet(petId: number) {
    try {
      const data = await petService.getById(petId);
      setPet(data);
      // Preenche o formulário com os dados que vieram da API
      setValue('nome', data.nome);
      setValue('raca', data.raca);
      setValue('idade', data.idade);
    } catch (error) {
      console.error('Erro ao carregar pet', error);
      alert('Erro ao carregar detalhes do pet.');
      navigate('/pets');
    }
  }

  // 2. Função de Salvar Edição (Texto)
  async function handleUpdate(data: PetRequest) {
    if (!id) return;
    try {
      setIsLoading(true);
      const payload = { ...data, idade: Number(data.idade) };
      await petService.update(Number(id), payload);
      alert('Dados atualizados com sucesso!');
      loadPet(Number(id)); // Recarrega para garantir
    } catch (error) {
      console.error(error);
      alert('Erro ao atualizar.');
    } finally {
      setIsLoading(false);
    }
  }

  // 3. Função de Upload de Foto
  async function handlePhotoUpload(event: React.ChangeEvent<HTMLInputElement>) {
    if (!event.target.files?.length || !id) return;
    
    const file = event.target.files[0];
    try {
      setIsLoading(true);
      await petService.uploadPhoto(Number(id), file);
      // Recarrega o pet para mostrar a foto nova
      await loadPet(Number(id));
    } catch (error) {
      console.error('Erro no upload', error);
      alert('Falha ao enviar foto.');
    } finally {
      setIsLoading(false);
    }
  }

  if (!pet) return <div className="text-center py-20 text-white">Carregando...</div>;

  return (
    <div className="min-h-screen bg-background">
      <Header />

      <main className="max-w-5xl mx-auto px-6 py-8">
        <button 
          onClick={() => navigate('/pets')}
          className="flex items-center gap-2 text-gray-400 hover:text-white mb-6 transition-colors"
        >
          <ArrowLeft className="w-4 h-4" />
          <span>Voltar</span>
        </button>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          
          {/* COLUNA DA ESQUERDA: FOTO */}
          <div className="md:col-span-1">
            <div className="bg-surface border border-gray-800 rounded-xl p-6 flex flex-col items-center">
              <div className="w-full aspect-square bg-black/50 rounded-lg overflow-hidden mb-4 relative group">
                {pet.foto ? (
                  <img src={pet.foto.url} alt={pet.nome} className="w-full h-full object-cover" />
                ) : (
                  <div className="w-full h-full flex flex-col items-center justify-center text-gray-600">
                    <Camera className="w-12 h-12 mb-2 opacity-50" />
                    <span className="text-sm">Sem Foto</span>
                  </div>
                )}
                
                {/* Overlay para upload */}
                <label className="absolute inset-0 bg-black/60 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity cursor-pointer">
                  <span className="text-white font-bold flex items-center gap-2">
                    <Upload className="w-4 h-4" /> Trocar Foto
                  </span>
                  <input type="file" className="hidden" accept="image/*" onChange={handlePhotoUpload} />
                </label>
              </div>

              <div className="text-center">
                <h2 className="text-xl font-bold text-white">{pet.nome}</h2>
                <p className="text-primary text-sm uppercase">{pet.raca}</p>
                <div className="mt-4 p-3 bg-black/30 rounded-lg text-xs text-gray-400 text-left">
                  <p>ID: #{pet.id}</p>
                  {/* Se tivesse tutor, apareceria aqui. Implementaremos depois. */}
                  <p className="mt-1">Tutor: <span className="text-gray-600 italic">Não vinculado</span></p>
                </div>
              </div>
            </div>
          </div>

          {/* COLUNA DA DIREITA: FORMULÁRIO */}
          <div className="md:col-span-2">
            <div className="bg-surface border border-gray-800 rounded-xl p-8">
              <div className="flex items-center justify-between mb-6">
                <h1 className="text-2xl font-bold text-white">Editar Dados</h1>
                <span className="text-xs bg-primary/10 text-primary px-2 py-1 rounded border border-primary/20">Modo Edição</span>
              </div>

              <form onSubmit={handleSubmit(handleUpdate)} className="space-y-6">
                <Input
                  label="Nome do Pet"
                  error={errors.nome?.message}
                  {...register('nome', { required: true })}
                />
                
                <div className="grid grid-cols-2 gap-4">
                  <Input
                    label="Raça"
                    error={errors.raca?.message}
                    {...register('raca', { required: true })}
                  />
                  <Input
                    label="Idade"
                    type="number"
                    error={errors.idade?.message}
                    {...register('idade', { required: true })}
                  />
                </div>

                <div className="pt-4 flex justify-end">
                  <Button type="submit" isLoading={isLoading} className="gap-2">
                    <Save className="w-4 h-4" />
                    SALVAR ALTERAÇÕES
                  </Button>
                </div>
              </form>
            </div>
          </div>

        </div>
      </main>
    </div>
  );
}