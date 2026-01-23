import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom';
import { Suspense, lazy } from 'react';
import { Loader2 } from 'lucide-react';

// --- Imports com Lazy Loading ---
const Login = lazy(() => import('./pages/Login').then(module => ({ default: module.Login })));
const Pets = lazy(() => import('./pages/Pets').then(module => ({ default: module.Pets })));
const PetForm = lazy(() => import('./pages/PetForm').then(module => ({ default: module.PetForm })));
const PetDetails = lazy(() => import('./pages/PetDetails').then(module => ({ default: module.PetDetails })));

const Tutors = lazy(() => import('./pages/Tutors').then(module => ({ default: module.Tutors })));
const TutorForm = lazy(() => import('./pages/TutorForm').then(module => ({ default: module.TutorForm })));
// NOVA TELA: Detalhes do Tutor
const TutorDetails = lazy(() => import('./pages/TutorDetails').then(module => ({ default: module.TutorDetails })));

// Tela de Carregamento
function LoadingScreen() {
  return (
    <div className="min-h-screen bg-background flex items-center justify-center">
      <div className="flex flex-col items-center gap-3">
        <Loader2 className="w-10 h-10 text-primary animate-spin" />
        <span className="text-gray-400 text-sm font-medium animate-pulse">Carregando módulo...</span>
      </div>
    </div>
  );
}

function App() {
  return (
    <BrowserRouter>
      <Suspense fallback={<LoadingScreen />}>
        <Routes>
          <Route path="/" element={<Navigate to="/login" replace />} />
          <Route path="/login" element={<Login />} />
          
          {/* Rotas de Pets */}
          <Route path="/pets" element={<Pets />} />
          <Route path="/pets/novo" element={<PetForm />} />
          <Route path="/pets/:id" element={<PetDetails />} />
          
          {/* Rotas de Tutores */}
          <Route path="/tutores" element={<Tutors />} />
          <Route path="/tutores/novo" element={<TutorForm />} />
          <Route path="/tutores/:id" element={<TutorDetails />} /> {/* <--- ROTA NOVA AQUI */}
        </Routes>
      </Suspense>
    </BrowserRouter>
  );
}

export default App;