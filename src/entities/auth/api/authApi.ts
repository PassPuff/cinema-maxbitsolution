import { baseFetch } from '@/shared/api/baseFetch';
import type { LoginRequest, RegisterRequest, AuthResponse } from '../model/types';

export const authApi = {
  login: async (data: LoginRequest): Promise<AuthResponse> => {
    return baseFetch<AuthResponse>('/login', {
      method: 'POST',
      body: JSON.stringify(data),
    });
  },

  register: async (data: RegisterRequest): Promise<AuthResponse> => {
    return baseFetch<AuthResponse>('/register', {
      method: 'POST',
      body: JSON.stringify(data),
    });
  },

  logout: () => {
    localStorage.removeItem('auth_token');
    localStorage.removeItem('user');
  },
};
