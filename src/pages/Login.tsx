import { useNavigate } from 'react-router-dom';

export function Login() {
  const navigate = useNavigate(); // Inicializa o "GPS"

  function handleLogin() {
    // Aqui viria a lógica de verificar senha no futuro
    // Por enquanto, vamos apenas redirecionar para a Home
    navigate('/home');
  }

  return (
    <div className="flex items-center justify-center h-screen bg-blue-500">
      <div className="bg-white p-8 rounded-lg shadow-lg w-96">
        <h2 className="text-2xl font-bold mb-6 text-gray-800 text-center">Acesso ao Sistema</h2>
        <input 
          type="email" 
          placeholder="Seu e-mail" 
          className="border p-2 w-full mb-4 rounded border-gray-300" 
        />
        <input 
          type="password" 
          placeholder="Sua senha" 
          className="border p-2 w-full mb-6 rounded border-gray-300" 
        />
        
        {/* Adicionamos o evento onClick aqui 👇 */}
        <button 
          onClick={handleLogin}
          className="bg-blue-600 text-white w-full py-2 rounded font-bold hover:bg-blue-700 transition-colors"
        >
          Entrar
        </button>
      </div>
    </div>
  )
}