import { useNavigate } from 'react-router-dom';

export function Header() {
  const navigate = useNavigate();

  function handleLogout() {
    // Aqui limparíamos os dados do usuário, mas por enquanto só redireciona
    navigate('/login');
  }

  return (
    <header className="bg-blue-600 text-white p-4 shadow-md flex justify-between items-center">
      <div className="flex items-center gap-2">
        <span className="text-2xl">🐾</span>
        <h1 className="text-xl font-bold">Pet Manager System</h1>
      </div>
      
      <button 
        onClick={handleLogout}
        className="bg-blue-800 hover:bg-blue-900 px-4 py-2 rounded transition-colors text-sm font-semibold"
      >
        Sair
      </button>
    </header>
  )
}