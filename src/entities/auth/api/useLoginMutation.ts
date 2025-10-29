import { useMutation } from '@tanstack/react-query';
import { authApi } from './authApi';
import type { LoginRequest, AuthResponse } from '../model/types';

export const useLoginMutation = () => {
  return useMutation<AuthResponse, Error, LoginRequest>({
    mutationFn: (data: LoginRequest) => authApi.login(data),
    onError: (error) => {
      console.error('Login error:', error);
    },
  });
};
