import { LoginForm } from '@/entities/auth';
import { Link } from 'react-router-dom';
import React from 'react';

const LoginPage: React.FC = () => {
  return (
    <div className='container mx-auto px-4 py-8'>
      <div className='flex flex-col items-center justify-center min-h-[60vh]'>
        <div className='w-full max-w-md space-y-6'>
          <LoginForm />
          <div className='text-center'>
            <p className='text-gray-600'>
              Нет аккаунта?{' '}
              <Link to='/register' className='text-blue-600 hover:text-blue-800 underline'>
                Зарегистрироваться
              </Link>
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default LoginPage;
