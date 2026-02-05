import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Search, Plus, PawPrint, ChevronLeft, ChevronRight } from 'lucide-react';
import { Button } from '../components/Button';
import { petService } from '../services/petService';
import type { Pet } from '../types/pet';

export function Pets() {
  const navigate = useNavigate();
  const [pets, setPets] = useState<Pet[]>([]);
  const [loading, setLoading] = useState(true);
  
  const [page, setPage] = useState(0);
  const [totalPages, setTotalPages] = useState(1);
  const [searchTerm, setSearchTerm] = useState('');

  useEffect(() => {
    fetchPets();
  }, [page, searchTerm]);

  async function fetchPets() {
    try {
      setLoading(true);
      const data = await petService.getAll(page, 10, searchTerm);
      setPets(data.content);
      setTotalPages(data.pageCount || 1); 
    } catch (error) {
      console.error('Erro ao buscar pets', error);
    } finally {
      setLoading(false);
    }
  }

  function handlePageChange(newPage: number) {
    if (newPage >= 0 && newPage < totalPages) {
      setPage(newPage);
      window.scrollTo({ top: 0, behavior: 'smooth' });
    }
  }

  return (
    <div className="space-y-6">
      <div className="flex flex-col lg:flex-row lg:items-center justify-between gap-6">
        <div>
          <h1 className="text-3xl font-bold text-white mb-2">Pets Cadastrados</h1>
          <p className="text-gray-200">Gerenciamento de animais do sistema</p>
        </div>

        <div className="flex flex-col sm:flex-row gap-4 w-full lg:w-auto">
          <div className="relative flex-1 sm:w-80">
            <Search className="absolute left-3 top-3.5 w-5 h-5 text-gray-500" />
            <input 
              type="text"
              placeholder="Buscar pet..."
              className="w-full pl-10 pr-4 py-3 bg-surface border border-gray-800 rounded-lg text-white focus:ring-1 focus:ring-primary focus:border-primary focus:outline-none transition-all placeholder-gray-600"
              value={searchTerm}
              onChange={(e) => {
                setSearchTerm(e.target.value);
                setPage(0);
              }}
            />
          </div>

          <Button 
            onClick={() => navigate('/pets/novo')}
            className="flex items-center justify-center gap-2 px-6 py-3 font-bold shadow-lg shadow-primary/20 hover:shadow-primary/40 transition-all whitespace-nowrap"
          >
            <Plus className="w-5 h-5 text-black" />
            <span className="text-black">CADASTRAR NOVO PET</span>
          </Button>
        </div>
      </div>

      {loading ? (
        <div className="text-center py-20 text-gray-500 animate-pulse">
          Carregando dados do sistema...
        </div>
      ) : (
        <>
          {pets.length === 0 ? (
            <div className="text-center py-20 text-gray-500">
              Nenhum pet encontrado.
            </div>
          ) : (
            <div className="flex items-center gap-4">
                
                <button 
                    disabled={page === 0}
                    onClick={() => handlePageChange(page - 1)}
                    className="hidden lg:flex items-center justify-center w-12 h-12 rounded-full border border-white/10 bg-surface/50 text-gray-400 hover:text-primary hover:border-primary hover:bg-surface transition-all disabled:opacity-0 disabled:cursor-not-allowed flex-shrink-0"
                >
                    <ChevronLeft className="w-6 h-6" />
                </button>

                <div className="flex-1 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-5 gap-4">
                  {pets.map((pet) => (
                    <div 
                      key={pet.id} 
                      className="bg-surface rounded-xl border border-gray-800 overflow-hidden hover:border-primary/50 transition-all group flex flex-col cursor-pointer shadow-lg hover:shadow-xl hover:shadow-primary/5"
                      onClick={() => navigate(`/pets/${pet.id}`)}
                    >
                      <div className="h-52 w-full bg-black/50 relative overflow-hidden">
                        {pet.foto ? (
                          <img 
                            src={pet.foto.url} 
                            alt={pet.nome} 
                            className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500" 
                          />
                        ) : (
                          <div className="w-full h-full flex items-center justify-center text-gray-600 flex-col gap-2">
                            <PawPrint className="w-10 h-10 opacity-20" />
                            <span className="text-xs uppercase tracking-widest opacity-50">Sem Foto</span>
                          </div>
                        )}
                        
                        <div className="absolute top-3 right-3 bg-black/70 backdrop-blur-sm px-3 py-1 rounded-full border border-white/10">
                          <span className="text-xs font-bold text-white">{pet.idade} anos</span>
                        </div>
                      </div>

                      <div className="p-4 flex-1 flex flex-col">
                        <h3 className="text-xl font-bold text-primary mb-2 truncate" title={pet.nome}>{pet.nome}</h3>
                        
                        <div className="flex items-center gap-1 mb-4 text-xs font-medium text-white uppercase tracking-wide truncate">
                          <span>Raça:</span>
                          <span className="truncate" title={pet.raca}>{pet.raca}</span>
                        </div>

                        <div className="mt-auto flex justify-end items-center">
                          <button 
                            onClick={(e) => {
                              e.stopPropagation();
                              navigate(`/pets/${pet.id}`);
                            }}
                            className="text-xs text-white hover:text-primary font-bold uppercase tracking-wide transition-colors flex items-center gap-2"
                          >
                            Ver Detalhes <ChevronRight className="w-3 h-3" />
                          </button>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>

                <button 
                    disabled={page >= totalPages - 1}
                    onClick={() => handlePageChange(page + 1)}
                    className="hidden lg:flex items-center justify-center w-12 h-12 rounded-full border border-white/10 bg-surface/50 text-gray-400 hover:text-primary hover:border-primary hover:bg-surface transition-all disabled:opacity-0 disabled:cursor-not-allowed flex-shrink-0"
                >
                    <ChevronRight className="w-6 h-6" />
                </button>

            </div>
          )}

          <div className="flex items-center justify-center pt-6 mt-8 lg:hidden">
            <div className="flex items-center gap-4">
                <Button 
                  variant="outline" 
                  onClick={() => handlePageChange(page - 1)}
                  className="flex items-center gap-2 px-4 py-2"
                  disabled={page === 0}
                >
                  <ChevronLeft className="w-4 h-4" />
                  Anterior
                </Button>

                <span className="text-sm text-gray-400">
                  <span className="text-white font-bold">{page + 1}</span> / <span className="text-white font-bold">{totalPages}</span>
                </span>

                <Button 
                  variant="outline" 
                  onClick={() => handlePageChange(page + 1)}
                  className="flex items-center gap-2 px-4 py-2"
                  disabled={page >= totalPages - 1}
                >
                  Próxima
                  <ChevronRight className="w-4 h-4" />
                </Button>
            </div>
          </div>

          <div className="hidden lg:flex items-center justify-center pt-4">
             <div className="px-6 py-2 bg-black/40 rounded-lg border border-white/5 items-center min-w-[100px] justify-center">
                <span className="text-sm font-medium text-gray-400">
                    <span className="text-white font-bold">{page + 1}</span> <span className="mx-1 text-gray-600">/</span> {totalPages}
                </span>
             </div>
          </div>
        </>
      )}
    </div>
  );
}