import { BehaviorSubject } from 'rxjs';

// --- AQUI ESTÁ O PONTO DE SÊNIOR (RxJS) ---
// O BehaviorSubject guarda o token e avisa quem estiver "ouvindo"
const tokenSubject = new BehaviorSubject<string | null>(localStorage.getItem('access_token'));

// --- AQUI ESTÁ O PADRÃO FACADE ---
// Escondemos a complexidade do RxJS aqui dentro
export const AuthState = {
  // Pega o token atual
  getToken: () => tokenSubject.value,

  // Salva o token no navegador e avisa o sistema
  setToken: (token: string) => {
    localStorage.setItem('access_token', token);
    tokenSubject.next(token);
  },

  // Limpa tudo (Logout)
  clearToken: () => {
    localStorage.removeItem('access_token');
    tokenSubject.next(null);
  },

  // Permite que as telas "assinem" para saber quando o login muda
  subscribe: (callback: (token: string | null) => void) => {
    const subscription = tokenSubject.subscribe(callback);
    return () => subscription.unsubscribe();
  }
};