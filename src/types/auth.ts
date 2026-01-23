// Define o que enviamos para entrar no sistema (Login)
export interface LoginRequest {
  username: string;
  password: string;
}

// Define o que o governo devolve quando o login dá certo (Tokens)
export interface AuthResponse {
  access_token: string;
  refresh_token: string;
  expires_in: number;
  refresh_expires_in: number;
}