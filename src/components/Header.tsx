import { LogOut, PawPrint, Users } from 'lucide-react'; // Adicionei Users
import { useNavigate, useLocation } from 'react-router-dom'; // Adicionei useLocation
import { authService } from '../services/authService';

export function Header() {
  const navigate = useNavigate();
  const location = useLocation(); // Para saber em qual página estamos e marcar o botão

  function handleLogout() {
    authService.logout();
    navigate('/login');
  }

  // Função para verificar se o link está ativo (visual)
  const isActive = (path: string) => location.pathname.startsWith(path) 
    ? "text-primary bg-primary/10" 
    : "text-gray-400 hover:text-white hover:bg-white/5";

  return (
    <header className="bg-surface border-b border-gray-800 sticky top-0 z-50">
      <div className="max-w-[1600px] mx-auto px-6 h-20 flex items-center justify-between">
        
        {/* Logo */}
        <div className="flex items-center gap-8">
          <div className="flex items-center gap-3 text-primary">
            <div className="p-2 bg-primary/10 rounded-lg">
              <PawPrint className="w-6 h-6" />
            </div>
            <span className="font-bold text-xl tracking-wide text-white hidden sm:block">Pet Manager</span>
          </div>

          {/* Navegação Principal */}
          <nav className="flex items-center gap-2">
            <button 
              onClick={() => navigate('/pets')}
              className={`px-4 py-2 rounded-lg text-sm font-bold transition-all flex items-center gap-2 ${isActive('/pets')}`}
            >
              <PawPrint className="w-4 h-4" />
              PETS
            </button>

            <button 
              onClick={() => navigate('/tutores')}
              className={`px-4 py-2 rounded-lg text-sm font-bold transition-all flex items-center gap-2 ${isActive('/tutores')}`}
            >
              <Users className="w-4 h-4" />
              TUTORES
            </button>
          </nav>
        </div>

        <button 
          onClick={handleLogout}
          className="flex items-center gap-2 text-gray-500 hover:text-red-400 transition-colors text-sm font-bold uppercase tracking-wider group"
        >
          <span className="hidden sm:inline group-hover:text-red-400 transition-colors">Sair</span>
          <LogOut className="w-4 h-4" />
        </button>
      </div>
    </header>
  );
}