import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom';
import { Home } from './pages/Home';
import { Login } from './pages/Login';

function App() {
  return (
    <BrowserRouter>
      <Routes>
        {/* Rota padrão: Quando entrar no site, vai direto para o Login */}
        <Route path="/" element={<Navigate to="/login" />} />

        {/* Rotas oficiais */}
        <Route path="/login" element={<Login />} />
        <Route path="/home" element={<Home />} />
      </Routes>
    </BrowserRouter>
  )
}

export default App;