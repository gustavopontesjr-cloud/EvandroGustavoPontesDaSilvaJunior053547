import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Search, Plus, User, MapPin, Phone, ChevronLeft, ChevronRight, ExternalLink, MessageCircle } from 'lucide-react';
import { Button } from '../components/Button';
import { tutorService } from '../services/tutorService';
import type { Tutor } from '../types/tutor';

export function Tutors() {
  const navigate = useNavigate();
  const [tutors, setTutors] = useState<Tutor[]>([]);
  const [loading, setLoading] = useState(true);
  
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

  function handlePageChange(newPage: number) {
    if (newPage >= 0 && newPage < totalPages) {
      setPage(newPage);
      window.scrollTo({ top: 0, behavior: 'smooth' });
    }
  }

  const getMapLink = (address: string) => `https://www.google.com/maps/search/?api=1&query=${encodeURIComponent(address)}`;
  const getPhoneLink = (phone: string) => `tel:${phone.replace(/\D/g,'')}`;
  const getWhatsAppLink = (phone: string) => `https://wa.me/${phone.replace(/\D/g,'')}`;

  return (
    <div className="space-y-8">
      
      {/* Header com Design Limpo */}
      <div className="flex flex-col lg:flex-row lg:items-end justify-between gap-6 pb-6 border-b border-white/5">
        <div>
          <h1 className="text-4xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-white to-gray-400 mb-2">Tutores</h1>
          <p className="text-gray-400 font-medium">Gerencie sua base de clientes</p>
        </div>

        <div className="flex flex-col sm:flex-row gap-4 w-full lg:w-auto">
          <div className="relative flex-1 sm:w-80 group">
            <div className="absolute inset-0 bg-primary/20 rounded-lg blur opacity-0 group-focus-within:opacity-100 transition-opacity" />
            <Search className="absolute left-3 top-3.5 w-5 h-5 text-gray-500 z-10" />
            <input 
              type="text"
              placeholder="Buscar tutor..."
              className="relative z-10 w-full pl-10 pr-4 py-3 bg-black/40 border border-white/10 rounded-lg text-white focus:border-primary/50 focus:outline-none transition-all placeholder-gray-600 backdrop-blur-sm"
              value={searchTerm}
              onChange={(e) => {
                setSearchTerm(e.target.value);
                setPage(0);
              }}
            />
          </div>
          
          <Button 
            onClick={() => navigate('/tutores/novo')}
            className="relative overflow-hidden flex items-center justify-center gap-2 px-8 py-3 font-bold bg-primary text-black hover:bg-primary/90 transition-all shadow-[0_0_20px_rgba(0,230,184,0.3)] hover:shadow-[0_0_30px_rgba(0,230,184,0.5)]"
          >
            <Plus className="w-5 h-5" />
            <span>NOVO</span>
          </Button>
        </div>
      </div>

      {loading ? (
        <div className="flex flex-col items-center justify-center py-20 gap-4">
            <div className="w-12 h-12 border-4 border-primary/30 border-t-primary rounded-full animate-spin" />
            <span className="text-gray-500 animate-pulse">Carregando dados...</span>
        </div>
      ) : (
        <>
          {/* Lista de Cards "Glass" */}
          <div className="flex flex-col gap-4">
            {tutors.map((tutor) => (
              <div 
                key={tutor.id} 
                className="group relative bg-surface/40 backdrop-blur-md border border-white/5 rounded-2xl p-4 sm:p-6 transition-all duration-300 hover:-translate-y-1 hover:bg-surface/60 hover:border-primary/30 hover:shadow-[0_10px_40px_-10px_rgba(0,0,0,0.5)] cursor-pointer overflow-hidden"
                onClick={() => navigate(`/tutores/${tutor.id}`)}
              >
                {/* Glow decorativo no fundo ao passar o mouse */}
                <div className="absolute top-0 right-0 w-64 h-64 bg-primary/5 rounded-full blur-3xl -translate-y-1/2 translate-x-1/2 opacity-0 group-hover:opacity-100 transition-opacity duration-500 pointer-events-none" />

                <div className="relative flex flex-col md:flex-row items-center gap-6 md:gap-8">
                    
                    {/* Foto com Borda Neon */}
                    <div className="relative flex-shrink-0">
                        <div className="w-24 h-24 sm:w-28 sm:h-28 rounded-2xl overflow-hidden border-2 border-white/5 group-hover:border-primary transition-colors shadow-lg">
                            {tutor.foto ? (
                                <img src={tutor.foto.url} alt={tutor.nome} className="w-full h-full object-cover" />
                            ) : (
                                <div className="w-full h-full flex items-center justify-center bg-black/40 text-gray-600">
                                    <User className="w-10 h-10 opacity-50" />
                                </div>
                            )}
                        </div>
                        {/* Tag de ID Flutuante */}
                        <div className="absolute -bottom-3 left-1/2 -translate-x-1/2 bg-black/80 border border-white/10 px-3 py-0.5 rounded-full">
                            <span className="text-[10px] font-bold text-primary tracking-widest">#{tutor.id}</span>
                        </div>
                    </div>

                    {/* Informações Centrais */}
                    <div className="flex-1 flex flex-col items-center md:items-start text-center md:text-left min-w-0 w-full">
                        <h3 className="text-2xl font-bold text-white mb-1 group-hover:text-primary transition-colors">{tutor.nome}</h3>
                        
                        <div className="flex flex-col sm:flex-row gap-4 sm:gap-6 mt-3 text-sm text-gray-400">
                            <div className="flex items-center gap-2 bg-black/20 px-3 py-1.5 rounded-lg border border-white/5">
                                <Phone className="w-4 h-4 text-primary/70" />
                                <span>{tutor.telefone}</span>
                            </div>
                            <div className="flex items-center gap-2 bg-black/20 px-3 py-1.5 rounded-lg border border-white/5 max-w-full">
                                <MapPin className="w-4 h-4 text-primary/70 flex-shrink-0" />
                                <span className="truncate max-w-[200px] sm:max-w-xs" title={tutor.endereco}>{tutor.endereco}</span>
                            </div>
                        </div>
                    </div>

                    {/* Botões de Ação (Aparecem coloridos no Hover) */}
                    <div className="flex items-center gap-3 mt-4 md:mt-0 opacity-80 group-hover:opacity-100 transition-opacity">
                        <a 
                            href={getWhatsAppLink(tutor.telefone)}
                            target="_blank"
                            rel="noopener noreferrer"
                            onClick={e => e.stopPropagation()}
                            className="p-3 bg-white/5 rounded-xl hover:bg-[#25D366] hover:text-white text-gray-400 transition-all hover:scale-110 shadow-lg"
                            title="WhatsApp"
                        >
                            <MessageCircle className="w-5 h-5" />
                        </a>
                        <a 
                            href={getMapLink(tutor.endereco)}
                            target="_blank"
                            rel="noopener noreferrer"
                            onClick={e => e.stopPropagation()}
                            className="p-3 bg-white/5 rounded-xl hover:bg-blue-500 hover:text-white text-gray-400 transition-all hover:scale-110 shadow-lg"
                            title="Google Maps"
                        >
                            <ExternalLink className="w-5 h-5" />
                        </a>
                        <button className="hidden sm:flex items-center gap-2 px-5 py-3 bg-white/5 rounded-xl hover:bg-primary hover:text-black text-white font-bold text-sm transition-all hover:scale-105 border border-white/5">
                            ABRIR PERFIL
                            <ChevronRight className="w-4 h-4" />
                        </button>
                    </div>

                </div>
              </div>
            ))}
          </div>

          {/* Paginação Estilizada */}
          <div className="flex items-center justify-center gap-4 pt-8">
              <Button 
                variant="outline" 
                disabled={page === 0}
                onClick={() => handlePageChange(page - 1)}
                className="w-12 h-12 rounded-full p-0 flex items-center justify-center border-white/10 hover:border-primary hover:text-primary transition-colors"
              >
                <ChevronLeft className="w-5 h-5" />
              </Button>

              <div className="px-6 py-2 bg-surface/50 rounded-full border border-white/10">
                <span className="text-sm text-gray-400">
                    <span className="text-white font-bold">{page + 1}</span> / {totalPages}
                </span>
              </div>

              <Button 
                variant="outline" 
                disabled={page >= totalPages - 1}
                onClick={() => handlePageChange(page + 1)}
                className="w-12 h-12 rounded-full p-0 flex items-center justify-center border-white/10 hover:border-primary hover:text-primary transition-colors"
              >
                <ChevronRight className="w-5 h-5" />
              </Button>
          </div>
        </>
      )}
    </div>
  );
}