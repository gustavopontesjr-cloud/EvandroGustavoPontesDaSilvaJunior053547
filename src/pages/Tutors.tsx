import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Header } from '../components/Header';
import { tutorService } from '../services/tutorService';
import type { Tutor } from '../types/tutor';
import { Search, Plus, User, MapPin, Phone, ChevronLeft, ChevronRight } from 'lucide-react'; // <--- Adicionei icones
import { Button } from '../components/Button';

export function Tutors() {
  const navigate = useNavigate();
  const [tutors, setTutors] = useState<Tutor[]>([]);
  const [loading, setLoading] = useState(true);
  
  // Variáveis de paginação (agora serão usadas!)
  const [page, setPage] = useState(0);
  const [totalPages, setTotalPages] = useState(1);
  const [searchTerm, setSearchTerm] = useState('');

  useEffect(() => {
    fetchTutors();
  }, [page, searchTerm]);

  async function fetchTutors() {
    try {
      setLoading(true);
      const data = await tutorService.getAll(page, 10, searchTerm);
      setTutors(data.content);
      setTotalPages(data.pageCount || 1);
    } catch (error) {
      console.error('Erro ao buscar tutores', error);
    } finally {
      setLoading(false);
    }
  }

  // Função que faltava para usar o setPage
  function handlePageChange(newPage: number) {
    if (newPage >= 0 && newPage < totalPages) {
      setPage(newPage);
      window.scrollTo({ top: 0, behavior: 'smooth' });
    }
  }

  return (
    <div className="min-h-screen bg-background">
      <Header />
      <main className="max-w-[1600px] mx-auto px-6 py-8">
        
        {/* Cabeçalho */}
        <div className="flex flex-col lg:flex-row lg:items-center justify-between gap-6 mb-10">
          <div>
            <h1 className="text-3xl font-bold text-white mb-2">Tutores</h1>
            <p className="text-gray-400">Gerencie os donos de pets</p>
          </div>

          <div className="flex flex-col sm:flex-row gap-4 w-full lg:w-auto">
            <div className="relative flex-1 sm:w-80">
              <Search className="absolute left-3 top-3.5 w-5 h-5 text-gray-500" />
              <input 
                type="text"
                placeholder="Buscar por nome..."
                className="w-full pl-10 pr-4 py-3 bg-surface border border-gray-800 rounded-lg text-white focus:ring-1 focus:ring-primary focus:border-primary focus:outline-none transition-all placeholder-gray-600"
                value={searchTerm}
                onChange={(e) => {
                  setSearchTerm(e.target.value);
                  setPage(0);
                }}
              />
            </div>
            
            <Button 
              onClick={() => navigate('/tutores/novo')}
              className="flex items-center justify-center gap-2 px-6 py-3 font-bold shadow-lg shadow-primary/20"
            >
              <Plus className="w-5 h-5 text-black" />
              <span className="text-black">NOVO TUTOR</span>
            </Button>
          </div>
        </div>

        {/* Listagem */}
        {loading ? (
          <div className="text-center py-20 text-gray-500 animate-pulse">Carregando...</div>
        ) : (
          <>
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6 mb-8">
              {tutors.map((tutor) => (
                <div key={tutor.id} className="bg-surface rounded-xl border border-gray-800 p-6 hover:border-primary/50 transition-colors flex items-start gap-4">
                  <div className="w-16 h-16 rounded-full bg-black/50 overflow-hidden flex-shrink-0 border border-gray-700">
                    {tutor.foto ? (
                      <img src={tutor.foto.url} alt={tutor.nome} className="w-full h-full object-cover" />
                    ) : (
                      <div className="w-full h-full flex items-center justify-center text-gray-600">
                        <User className="w-8 h-8" />
                      </div>
                    )}
                  </div>

                  <div className="flex-1 min-w-0">
                    <h3 className="text-lg font-bold text-white truncate">{tutor.nome}</h3>
                    <div className="text-sm text-gray-400 mt-1 space-y-1">
                      <p className="flex items-center gap-2 truncate">
                        <Phone className="w-3 h-3 text-primary" /> {tutor.telefone}
                      </p>
                      <p className="flex items-center gap-2 truncate" title={tutor.endereco}>
                        <MapPin className="w-3 h-3 text-primary" /> {tutor.endereco}
                      </p>
                    </div>
                    <button 
                      onClick={() => navigate(`/tutores/${tutor.id}`)}
                      className="text-xs text-primary hover:text-white mt-3 font-bold uppercase tracking-wide"
                    >
                      Ver Perfil →
                    </button>
                  </div>
                </div>
              ))}
            </div>

            {/* --- PAGINAÇÃO (Adicionada para usar as variáveis e corrigir o erro) --- */}
            <div className="flex items-center justify-between border-t border-gray-800 pt-6">
              <span className="text-sm text-gray-400">
                Página <span className="text-white font-bold">{page + 1}</span> de <span className="text-white font-bold">{totalPages}</span>
              </span>

              <div className="flex gap-2">
                <Button 
                  variant="outline" 
                  disabled={page === 0}
                  onClick={() => handlePageChange(page - 1)}
                  className="flex items-center gap-2 px-4 py-2"
                >
                  <ChevronLeft className="w-4 h-4" />
                  Anterior
                </Button>

                <Button 
                  variant="outline" 
                  disabled={page >= totalPages - 1}
                  onClick={() => handlePageChange(page + 1)}
                  className="flex items-center gap-2 px-4 py-2"
                >
                  Próxima
                  <ChevronRight className="w-4 h-4" />
                </Button>
              </div>
            </div>
          </>
        )}
      </main>
    </div>
  );
}