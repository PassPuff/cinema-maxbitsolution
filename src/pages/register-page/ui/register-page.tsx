import { RegisterForm } from '@/entities/auth';
import { PageTitle } from '@/widgets/page-title';
import { Link } from 'react-router-dom';
import React from 'react';

const RegisterPage: React.FC = () => {
  return (
    <div className='container mx-auto px-4 py-8'>
      <PageTitle />
      <div className='flex flex-col items-center justify-center min-h-[60vh]'>
        <div className='w-full max-w-md space-y-6'>
          <RegisterForm />
          <div className='text-center'>
            <p className='text-gray-600'>
              Уже есть аккаунт?{' '}
              <Link to='/login' className='text-blue-600 hover:text-blue-800 underline'>
                Войти
              </Link>
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default RegisterPage;
