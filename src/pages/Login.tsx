import { useState } from 'react';
import { useForm } from 'react-hook-form';
import { useNavigate } from 'react-router-dom';
import { LayoutDashboard } from 'lucide-react';
import { Input } from '../components/Input';
import { Button } from '../components/Button';
import { authService } from '../services/authService';
import type { LoginRequest } from '../types/auth';

export function Login() {
  const navigate = useNavigate();
  const [isLoading, setIsLoading] = useState(false);
  const [loginError, setLoginError] = useState('');

  const { register, handleSubmit, formState: { errors } } = useForm<LoginRequest>();

  async function handleLogin(data: LoginRequest) {
    try {
      setIsLoading(true);
      setLoginError('');
      await authService.login(data);
      navigate('/pets');
    } catch (error) {
      setLoginError('Erro ao entrar. Verifique usuário e senha.');
      console.error(error);
    } finally {
      setIsLoading(false);
    }
  }

  return (
    <div className="min-h-screen flex items-center justify-center p-4">
      <div className="max-w-md w-full bg-surface border border-gray-800 rounded-2xl shadow-2xl p-8">
        
        <div className="flex flex-col items-center mb-8">
          <div className="p-3 bg-primary/10 rounded-full mb-4 ring-1 ring-primary/50 shadow-[0_0_15px_rgba(0,230,184,0.3)]">
            <LayoutDashboard className="w-8 h-8 text-primary" />
          </div>
          <h1 className="text-3xl font-bold text-white tracking-tight">Pet Manager</h1>
          {/* Texto mais claro agora (gray-300 em vez de muted) */}
          <p className="text-gray-300 mt-2 font-medium">Acesse o painel administrativo</p>
        </div>

        <form onSubmit={handleSubmit(handleLogin)} className="space-y-6">
          <Input 
            label="Usuário" 
            placeholder="Digite seu usuário"
            error={errors.username?.message}
            {...register('username', { required: 'Usuário obrigatório' })}
          />

          <Input 
            label="Senha" 
            type="password" 
            placeholder="••••••••"
            error={errors.password?.message}
            {...register('password', { required: 'Senha obrigatória' })}
          />

          {loginError && (
            <div className="p-4 bg-red-500/10 border border-red-500/20 text-red-200 text-sm rounded-lg font-medium">
              {loginError}
            </div>
          )}

          <Button type="submit" className="w-full" isLoading={isLoading}>
            ENTRAR NA PLATAFORMA
          </Button>
        </form>

        <div className="mt-8 text-center">
          {/* Rodapé mais visível */}
          <p className="text-xs text-gray-400 font-semibold tracking-wider">
            SECURE SYSTEM • 2026
          </p>
        </div>
      </div>
    </div>
  );
}