import { BehaviorSubject } from 'rxjs';

const tokenSubject = new BehaviorSubject<string | null>(localStorage.getItem('access_token'));

export const AuthState = {
  getToken: () => tokenSubject.value,

  setToken: (token: string) => {
    localStorage.setItem('access_token', token);
    tokenSubject.next(token);
  },

  clearToken: () => {
    localStorage.removeItem('access_token');
    tokenSubject.next(null);
  },

  subscribe: (callback: (token: string | null) => void) => {
    const subscription = tokenSubject.subscribe(callback);
    return () => subscription.unsubscribe();
  }
};