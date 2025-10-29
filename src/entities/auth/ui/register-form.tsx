import { Input, Button } from '@/shared/components/index';
import { useRegisterMutation, validateUsername, validatePassword, validatePasswordConfirmation } from '@/entities/auth';
import { useAuth } from '@/app/providers/use-auth';
import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';

export const RegisterForm: React.FC = () => {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [passwordConfirmation, setPasswordConfirmation] = useState('');
  const [errors, setErrors] = useState<Record<string, string>>({});
  const { login } = useAuth();
  const navigate = useNavigate();

  const registerMutation = useRegisterMutation();

  const validateForm = () => {
    const newErrors: Record<string, string> = {};

    const usernameValidation = validateUsername(username);
    if (!usernameValidation.isValid) {
      newErrors.username = usernameValidation.error!;
    }

    const passwordValidation = validatePassword(password);
    if (!passwordValidation.isValid) {
      newErrors.password = passwordValidation.error!;
    }

    const confirmationValidation = validatePasswordConfirmation(password, passwordConfirmation);
    if (!confirmationValidation.isValid) {
      newErrors.passwordConfirmation = confirmationValidation.error!;
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    if (!validateForm()) {
      return;
    }
    registerMutation.mutate(
      { username, password },
      {
        onSuccess: (response) => {
          login(response.token, response.user);
          navigate('/bookings');
        },
        onError: () => {
          setErrors({ general: 'Ошибка регистрации. Попробуйте еще раз' });
        },
      },
    );
  };

  return (
    <form onSubmit={handleSubmit} className='flex flex-col w-full max-w-md gap-6'>
      <div>
        <Input
          name='username'
          type='text'
          placeholder='Имя пользователя (минимум 8 символов)'
          value={username}
          onChange={(e) => setUsername(e.target.value)}
          required
        />
        {errors.username && <p className='text-red-500 text-sm mt-1'>{errors.username}</p>}
      </div>

      <div>
        <Input
          name='password'
          type='password'
          placeholder='Пароль (минимум 8 символов, 1 заглавная буква, 1 цифра)'
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          required
        />
        {errors.password && <p className='text-red-500 text-sm mt-1'>{errors.password}</p>}
      </div>

      <div>
        <Input
          name='passwordConfirmation'
          type='password'
          placeholder='Подтверждение пароля'
          value={passwordConfirmation}
          onChange={(e) => setPasswordConfirmation(e.target.value)}
          required
        />
        {errors.passwordConfirmation && <p className='text-red-500 text-sm mt-1'>{errors.passwordConfirmation}</p>}
      </div>

      {errors.general && <p className='text-red-500 text-sm'>{errors.general}</p>}

      <Button type='submit' disabled={registerMutation.isPending}>
        {registerMutation.isPending ? 'Регистрация...' : 'Зарегистрироваться'}
      </Button>
    </form>
  );
};
