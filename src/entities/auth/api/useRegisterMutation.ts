import { useMutation } from '@tanstack/react-query';
import { authApi } from './authApi';
import type { RegisterRequest, AuthResponse } from '../model/types';

export const useRegisterMutation = () => {
  return useMutation<AuthResponse, Error, RegisterRequest>({
    mutationFn: (data: RegisterRequest) => authApi.register(data),
    onError: (error) => {
      console.error('Register error:', error);
    },
  });
};
