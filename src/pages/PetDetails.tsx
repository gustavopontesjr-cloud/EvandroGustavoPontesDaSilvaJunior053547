import { useEffect, useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { useForm } from 'react-hook-form';
import { ArrowLeft, Save, Upload, Camera, User, Phone, Bug } from 'lucide-react';
import { Header } from '../components/Header';
import { Input } from '../components/Input';
import { Button } from '../components/Button';
import { petService } from '../services/petService';
import { tutorService } from '../services/tutorService';
import type { Pet, PetRequest } from '../types/pet';
import type { Tutor } from '../types/tutor';

export function PetDetails() {
  const { id } = useParams();
  const navigate = useNavigate();
  const [pet, setPet] = useState<Pet | null>(null);
  const [tutor, setTutor] = useState<Tutor | null>(null);
  const [isLoading, setIsLoading] = useState(false);
  
  const { register, handleSubmit, setValue, watch, formState: { errors } } = useForm<PetRequest>();

  // Monitora o valor atual para mostrar aviso se necessário
  const currentSpecies = watch('especie');

  useEffect(() => {
    if (id) loadPet(Number(id));
  }, [id]);

  async function loadPet(petId: number) {
    try {
      const data = await petService.getById(petId);
      setPet(data);
      
      setValue('nome', data.nome);
      setValue('raca', data.raca);
      setValue('idade', data.idade);
      
      // NÃO forçamos mais 'CACHORRO'. Se não vier nada, fica vazio.
      // Isso mostra a realidade: o dado não foi salvo.
      if (data.especie) {
        setValue('especie', data.especie);
      }

      // Lógica de Tutor (Lista -> Primeiro item)
      if (data.tutores && data.tutores.length > 0) {
        setTutor(data.tutores[0]);
      } else {
        setTutor(null);
      }

    } catch (error) {
      console.error('Erro ao carregar pet', error);
      navigate('/pets');
    }
  }

  async function handleUpdate(data: PetRequest) {
    if (!id) return;
    try {
      setIsLoading(true);
      await petService.update(Number(id), data);
      alert('Pet atualizado! (Nota: A espécie pode não ser salva devido a limitações da API)');
      loadPet(Number(id));
    } catch (error) {
      alert('Erro ao atualizar.');
    } finally {
      setIsLoading(false);
    }
  }

  async function handlePhotoUpload(event: React.ChangeEvent<HTMLInputElement>) {
    if (!event.target.files?.length || !id) return;
    try {
      setIsLoading(true);
      await petService.uploadPhoto(Number(id), event.target.files[0]);
      await loadPet(Number(id));
    } catch (error) {
      alert('Falha ao enviar foto.');
    } finally {
      setIsLoading(false);
    }
  }

  if (!pet) return <div className="text-center py-20 text-white">Carregando...</div>;

  return (
    <div className="min-h-screen bg-background">
      <Header />
      <main className="max-w-4xl mx-auto px-6 py-8">
        <button onClick={() => navigate('/pets')} className="flex items-center gap-2 text-gray-400 hover:text-white mb-6">
          <ArrowLeft className="w-4 h-4" /> <span>Voltar</span>
        </button>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          
          <div className="md:col-span-1 space-y-6">
            <div className="bg-surface border border-gray-800 rounded-xl p-6 flex flex-col items-center">
              <div className="w-40 h-40 rounded-full bg-black/50 overflow-hidden mb-4 relative group border-4 border-gray-800">
                {pet.foto ? (
                  <img src={pet.foto.url} alt={pet.nome} className="w-full h-full object-cover" />
                ) : (
                  <div className="w-full h-full flex items-center justify-center text-gray-600"><Camera className="w-10 h-10" /></div>
                )}
                <label className="absolute inset-0 bg-black/60 flex items-center justify-center opacity-0 group-hover:opacity-100 cursor-pointer transition-all">
                  <Upload className="w-6 h-6 text-white" />
                  <input type="file" className="hidden" accept="image/*" onChange={handlePhotoUpload} />
                </label>
              </div>
              <h2 className="text-xl font-bold text-white text-center">{pet.nome}</h2>
              {/* Só mostra a espécie se ela existir mesmo */}
              <p className="text-primary text-sm font-bold uppercase">
                {currentSpecies ? `${currentSpecies} • ` : ''}{pet.raca}
              </p>
            </div>

            <div className="bg-surface border border-gray-800 rounded-xl p-6">
              <h3 className="text-white font-bold mb-4 flex items-center gap-2 text-sm uppercase tracking-wider">
                <User className="w-4 h-4 text-primary" /> Tutor Responsável
              </h3>
              
              {tutor ? (
                <div className="space-y-3">
                  <div className="flex items-center gap-3">
                    <div className="w-10 h-10 rounded-full bg-gray-700 flex items-center justify-center overflow-hidden">
                       {tutor.foto ? <img src={tutor.foto.url} className="w-full h-full object-cover"/> : <User className="w-5 h-5 text-gray-400"/>}
                    </div>
                    <div>
                      <p className="text-white font-bold text-sm">{tutor.nome}</p>
                      <p className="text-xs text-gray-400">ID: {tutor.id}</p>
                    </div>
                  </div>
                  <div className="pt-2 border-t border-gray-800">
                    <p className="text-sm text-gray-300 flex items-center gap-2">
                       <Phone className="w-3 h-3 text-primary"/> {tutor.telefone}
                    </p>
                  </div>
                  <button 
                    onClick={() => navigate(`/tutores/${tutor.id}`)}
                    className="w-full mt-2 text-xs text-primary border border-primary/30 rounded py-2 hover:bg-primary/10 transition-colors"
                  >
                    VER PERFIL DO TUTOR
                  </button>
                </div>
              ) : (
                <div className="text-center py-4 bg-black/20 rounded-lg">
                  <p className="text-gray-500 text-sm italic">Este pet não possui tutor vinculado.</p>
                  <p className="text-xs text-gray-600 mt-1">Vincule-o através da tela de Tutores.</p>
                </div>
              )}
            </div>
          </div>

          <div className="md:col-span-2">
            <div className="bg-surface border border-gray-800 rounded-xl p-8">
              <div className="flex justify-between items-center mb-6">
                <h2 className="text-xl font-bold text-white">Editar Dados</h2>
              </div>
              
              <form onSubmit={handleSubmit(handleUpdate)} className="space-y-4">
                <Input label="Nome do Pet" {...register('nome')} error={errors.nome?.message} />
                
                <div className="grid grid-cols-2 gap-4">
                  <div className="flex flex-col gap-2">
                    <label className="text-sm font-medium text-gray-200">Espécie</label>
                    <select 
                      className="w-full p-3 rounded-lg bg-background border border-gray-700 text-white focus:border-primary outline-none"
                      {...register('especie')}
                    >
                      <option value="">Selecione...</option>
                      <option value="CACHORRO">Cachorro</option>
                      <option value="GATO">Gato</option>
                      <option value="AVE">Ave</option>
                      <option value="OUTRO">Outro</option>
                    </select>
                    <p className="text-[10px] text-yellow-500/80 mt-1">
                      ⚠️ O servidor atual não persiste este campo (limitação da API).
                    </p>
                  </div>
                  
                  <Input label="Raça" {...register('raca')} error={errors.raca?.message} />
                </div>

                <Input label="Idade" type="number" {...register('idade')} error={errors.idade?.message} />
                
                <div className="flex justify-end pt-4">
                   <Button type="submit" isLoading={isLoading} className="gap-2 w-full sm:w-auto">
                     <Save className="w-4 h-4" /> SALVAR ALTERAÇÕES
                   </Button>
                </div>
              </form>
            </div>
            
            {/* Mantive o DEBUG só para você conferir, pode remover depois se quiser */}
             <div className="mt-8 p-4 bg-gray-900 border border-gray-700 rounded-lg overflow-hidden opacity-50 hover:opacity-100 transition-opacity">
               <h3 className="text-gray-400 font-bold flex items-center gap-2 mb-2 text-xs uppercase">
                 <Bug className="w-3 h-3" /> Dados Brutos (API)
               </h3>
               <pre className="text-[10px] text-green-400 font-mono whitespace-pre-wrap break-all">
                 {JSON.stringify(pet, null, 2)}
               </pre>
            </div>

          </div>
        </div>
      </main>
    </div>
  );
}