import { Input, Button } from '@/shared/components/index';
import { useLoginMutation } from '@/entities/auth';
import { useAuth } from '@/app/providers/use-auth';
import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';

export const LoginForm: React.FC = () => {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const { login } = useAuth();
  const navigate = useNavigate();

  const loginMutation = useLoginMutation();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError('');

    loginMutation.mutate(
      { username, password },
      {
        onSuccess: (response) => {
          login(response.token, response.user);
          navigate('/bookings');
        },
        onError: () => {
          setError('Неверный логин или пароль. Проверьте введенные данные и попробуйте снова');
        },
      },
    );
  };

  return (
    <form onSubmit={handleSubmit} className='flex flex-col w-full max-w-md gap-8'>
      <Input
        type='text'
        placeholder='Имя пользователя'
        value={username}
        onChange={(e) => setUsername(e.target.value)}
        required
      />
      <Input
        type='password'
        placeholder='Пароль'
        value={password}
        onChange={(e) => setPassword(e.target.value)}
        required
      />
      {error && <p className='text-red-500 text-sm'>{error}</p>}
      <Button type='submit' disabled={loginMutation.isPending}>
        {loginMutation.isPending ? 'Вход...' : 'Войти'}
      </Button>
    </form>
  );
};
