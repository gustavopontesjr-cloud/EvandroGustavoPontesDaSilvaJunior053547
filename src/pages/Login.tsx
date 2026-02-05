import { useState } from 'react';
import { useForm } from 'react-hook-form';
import { useNavigate } from 'react-router-dom';
import { PawPrint, ArrowRight, CheckCircle2 } from 'lucide-react';
import { Input } from '../components/Input';
import { Button } from '../components/Button';
import { authService } from '../services/authService';
import { AuthState } from '../services/AuthState';
import { useAuth } from '../contexts/AuthContext';
import type { LoginRequest } from '../types/auth';
import loginBg from '../assets/login-bg.jpg';

export function Login() {
  const navigate = useNavigate();
  const { login } = useAuth();
  const [isLoading, setIsLoading] = useState(false);
  const [loginError, setLoginError] = useState('');

  const { register, handleSubmit, formState: { errors } } = useForm<LoginRequest>();

  async function handleLogin(data: LoginRequest) {
    try {
      setIsLoading(true);
      setLoginError('');
      
      await authService.login(data);
      const token = AuthState.getToken();

      if (token) {
        login(token);
        navigate('/pets');
      } else {
        setLoginError('Erro ao recuperar token de acesso.');
      }

    } catch (error) {
      setLoginError('Erro ao entrar. Verifique usuário e senha.');
      console.error(error);
    } finally {
      setIsLoading(false);
    }
  }

  return (
    <div className="min-h-screen flex">
      <div className="hidden lg:flex w-1/2 relative bg-surface overflow-hidden">
        <div className="absolute inset-0 bg-black/40 mix-blend-multiply z-10" />
        <img 
          src={loginBg} 
          alt="Imagem Institucional SigPet" 
          className="absolute inset-0 w-full h-full object-cover opacity-90"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-black via-black/60 to-transparent z-20" />
        
        <div className="absolute top-8 left-8 z-30 flex items-center gap-2 opacity-90">
          <PawPrint className="w-6 h-6 text-white" />
          <span className="text-white font-bold tracking-wider">SigPet MT</span>
        </div>
        
        <div className="relative z-30 p-16 flex flex-col justify-end h-full max-w-2xl">
          <div className="mb-8">
            <h2 className="text-4xl font-extrabold text-white mb-6 leading-tight drop-shadow-lg">
              Gestão Inteligente para o<br/> 
              <span className="text-primary">Bem-Estar Animal</span>
            </h2>
            <p className="text-gray-100 text-lg leading-relaxed drop-shadow-md font-medium">
              Sistema oficial de registro e controle populacional de pets do Estado de Mato Grosso.
              Eficiência e transparência a serviço do cidadão.
            </p>
          </div>
          
          <div className="space-y-4 pt-8 border-t border-white/20">
            <div className="flex items-center gap-3 text-base text-white font-medium">
              <CheckCircle2 className="w-5 h-5 text-primary" />
              <span>Controle unificado de tutores</span>
            </div>
            <div className="flex items-center gap-3 text-base text-white font-medium">
              <CheckCircle2 className="w-5 h-5 text-primary" />
              <span>Prontuário digital completo</span>
            </div>
            <div className="flex items-center gap-3 text-base text-white font-medium">
              <CheckCircle2 className="w-5 h-5 text-primary" />
              <span>Segurança e alta disponibilidade</span>
            </div>
          </div>
        </div>
      </div>

      <div className="flex-1 flex items-center justify-center bg-background p-8 relative">
        <div className="w-full max-w-[420px] space-y-8 animate-in fade-in slide-in-from-right-8 duration-700">
          
          <div className="text-center lg:text-left space-y-2">
            <div className="flex items-center justify-center lg:justify-start gap-3 mb-6">
              <div className="bg-primary/10 p-3 rounded-xl ring-1 ring-primary/20">
                <PawPrint className="w-8 h-8 text-primary" />
              </div>
              <div className="flex flex-col">
                <h1 className="text-3xl font-bold text-white tracking-tight leading-none">
                  SigPet MT
                </h1>
                <span className="text-[10px] font-bold text-primary uppercase tracking-[0.2em] mt-1">
                  Governo de Mato Grosso
                </span>
              </div>
            </div>

            <h2 className="text-xl font-semibold text-white">
              Acesse sua conta
            </h2>
            <p className="text-gray-200 text-sm font-medium">
              Insira suas credenciais institucionais para continuar.
            </p>
          </div>

          <form onSubmit={handleSubmit(handleLogin)} className="space-y-6">
            <div className="space-y-5">
              <Input 
                label="Usuário" 
                placeholder="Ex: servidor.mt"
                className="bg-surface border-gray-700 focus:border-primary text-white placeholder:text-gray-500"
                error={errors.username?.message}
                {...register('username', { required: 'Usuário obrigatório' })}
              />

              <Input 
                label="Senha" 
                type="password" 
                placeholder="••••••••"
                className="bg-surface border-gray-700 focus:border-primary text-white placeholder:text-gray-500"
                error={errors.password?.message}
                {...register('password', { required: 'Senha obrigatória' })}
              />
            </div>

            {loginError && (
              <div className="p-4 bg-red-500/10 border border-red-500/20 text-red-200 text-sm rounded-lg flex items-center gap-3 font-medium">
                <div className="w-1.5 h-1.5 rounded-full bg-red-500 flex-shrink-0" />
                {loginError}
              </div>
            )}

            <Button type="submit" className="w-full h-12 text-base font-bold shadow-lg shadow-primary/20 hover:shadow-primary/30 transition-all" isLoading={isLoading}>
              ENTRAR NO SISTEMA
              <ArrowRight className="w-4 h-4 ml-2" />
            </Button>
          </form>

          <div className="pt-8 text-center lg:text-left border-t border-white/5">
            <p className="text-xs text-gray-500">
              Problemas com acesso? Entre em contato com o <span className="text-primary cursor-help" title="Ramal 1234 - Suporte TI">departamento de TI</span>.
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}