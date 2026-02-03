import { Routes, Route, Navigate } from 'react-router-dom';
import { lazy, Suspense } from 'react';
import type { ReactNode } from 'react'; 
import { useAuth } from '../contexts/AuthContext';
import { AuthState } from '../services/AuthState';
import { Loader2 } from 'lucide-react';
import { DashboardLayout } from '../layouts/DashboardLayout';

const Login = lazy(() => import('../pages/Login').then(m => ({ default: m.Login })));
const Pets = lazy(() => import('../pages/Pets').then(m => ({ default: m.Pets })));
const PetForm = lazy(() => import('../pages/PetForm').then(m => ({ default: m.PetForm })));
const PetDetails = lazy(() => import('../pages/PetDetails').then(m => ({ default: m.PetDetails })));
const Tutors = lazy(() => import('../pages/Tutors').then(m => ({ default: m.Tutors })));
const TutorForm = lazy(() => import('../pages/TutorForm').then(m => ({ default: m.TutorForm })));
const TutorDetails = lazy(() => import('../pages/TutorDetails').then(m => ({ default: m.TutorDetails })));

function PrivateRoute({ children }: { children: ReactNode }) {
  const { isAuthenticated } = useAuth();
  const isAuthorized = isAuthenticated || !!AuthState.getToken();
  
  if (!isAuthorized) {
    return <Navigate to="/login" replace />;
  }

  return <DashboardLayout>{children}</DashboardLayout>;
}

function LoadingScreen() {
  return (
    <div className="min-h-screen bg-background flex items-center justify-center">
      <div className="flex flex-col items-center gap-3">
        <Loader2 className="w-10 h-10 text-primary animate-spin" />
        <span className="text-gray-400 text-sm font-medium animate-pulse">Carregando...</span>
      </div>
    </div>
  );
}

export function AppRoutes() {
  return (
    <Suspense fallback={<LoadingScreen />}>
      <Routes>
        <Route path="/login" element={<Login />} />
        <Route path="/" element={<Navigate to="/login" replace />} />

        <Route path="/pets" element={<PrivateRoute><Pets /></PrivateRoute>} />
        <Route path="/pets/novo" element={<PrivateRoute><PetForm /></PrivateRoute>} />
        <Route path="/pets/:id" element={<PrivateRoute><PetDetails /></PrivateRoute>} />

        <Route path="/tutores" element={<PrivateRoute><Tutors /></PrivateRoute>} />
        <Route path="/tutores/novo" element={<PrivateRoute><TutorForm /></PrivateRoute>} />
        <Route path="/tutores/:id" element={<PrivateRoute><TutorDetails /></PrivateRoute>} />

        <Route path="*" element={<Navigate to="/login" replace />} />
      </Routes>
    </Suspense>
  );
}