import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom';
import { Home } from './pages/Home';
import { Login } from './pages/Login';
import { PetForm } from './pages/PetForm'; // <--- Importamos a página nova

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Navigate to="/login" />} />
        
        <Route path="/login" element={<Login />} />
        <Route path="/home" element={<Home />} />
        <Route path="/pet/new" element={<PetForm />} /> {/* <--- Criamos o endereço dela */}
      </Routes>
    </BrowserRouter>
  )
}

export default App;