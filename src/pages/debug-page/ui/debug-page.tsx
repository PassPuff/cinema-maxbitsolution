import React from 'react';
import { useAuth } from '@/app/providers/use-auth';

const DebugPage: React.FC = () => {
  const { user, isAuthenticated } = useAuth();
  const token = localStorage.getItem('auth_token');

  // Функция для декодирования JWT токена
  const decodeJWT = (token: string) => {
    try {
      const parts = token.split('.');
      if (parts.length !== 3) return null;

      const payload = JSON.parse(atob(parts[1]));
      const now = Math.floor(Date.now() / 1000);

      return {
        ...payload,
        isExpired: payload.exp ? payload.exp < now : false,
        expiresAt: payload.exp ? new Date(payload.exp * 1000).toLocaleString() : 'Не указано',
        issuedAt: payload.iat ? new Date(payload.iat * 1000).toLocaleString() : 'Не указано',
      };
    } catch (error) {
      console.error('Token decoding error:', error);
      return { error: 'Невозможно декодировать токен' };
    }
  };

  const tokenInfo = token ? decodeJWT(token) : null;

  const testAuth = async () => {
    try {
      const response = await fetch('http://localhost:3022/me/bookings', {
        headers: {
          Authorization: `Bearer ${token}`,
          Accept: 'application/json',
        },
      });

      console.log('Test auth response:', {
        status: response.status,
        statusText: response.statusText,
        headers: Object.fromEntries(response.headers.entries()),
      });

      if (response.ok) {
        const data = await response.json();
        console.log('Bookings data:', data);
        alert('Авторизация работает! Проверьте консоль для деталей.');
      } else {
        const errorText = await response.text();
        console.error('Auth test failed:', errorText);
        alert(`Ошибка авторизации: ${response.status} - ${errorText}`);
      }
    } catch (error) {
      console.error('Network error:', error);
      alert(`Сетевая ошибка: ${error}`);
    }
  };

  const loginTest = async () => {
    try {
      const response = await fetch('http://localhost:3022/login', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          Accept: 'application/json',
        },
        body: JSON.stringify({
          username: 'nikita420',
          password: 'Arhiv420',
        }),
      });

      console.log('Login response:', {
        status: response.status,
        statusText: response.statusText,
      });

      if (response.ok) {
        const data = await response.json();
        console.log('Login data:', data);
        localStorage.setItem('auth_token', data.token);
        alert('Логин успешен! Токен сохранен.');
        window.location.reload();
      } else {
        const errorText = await response.text();
        console.error('Login failed:', errorText);
        alert(`Ошибка логина: ${response.status} - ${errorText}`);
      }
    } catch (error) {
      console.error('Login network error:', error);
      alert(`Сетевая ошибка при логине: ${error}`);
    }
  };

  const testBooking = async () => {
    if (!token) {
      alert('Сначала авторизуйтесь!');
      return;
    }

    try {
      const response = await fetch('http://localhost:3022/movieSessions/1/bookings', {
        method: 'POST',
        headers: {
          Authorization: `Bearer ${token}`,
          'Content-Type': 'application/json',
          Accept: 'application/json',
        },
        body: JSON.stringify({
          seats: [{ rowNumber: 1, seatNumber: 1 }],
        }),
      });

      console.log('Booking test response:', {
        status: response.status,
        statusText: response.statusText,
        headers: Object.fromEntries(response.headers.entries()),
      });

      if (response.ok) {
        const data = await response.json();
        console.log('Booking success:', data);
        alert('Тест бронирования успешен! Проверьте консоль для деталей.');
      } else {
        const errorText = await response.text();
        console.error('Booking test failed:', errorText);
        alert(`Ошибка теста бронирования: ${response.status} - ${errorText}`);
      }
    } catch (error) {
      console.error('Booking test network error:', error);
      alert(`Сетевая ошибка при тесте бронирования: ${error}`);
    }
  };

  return (
    <div className='p-8 max-w-2xl mx-auto'>
      <h1 className='text-2xl font-bold mb-6'>Отладка авторизации</h1>

      <div className='space-y-4 mb-8'>
        <div className=' p-4 rounded'>
          <h3 className='font-semibold mb-2'>Состояние авторизации:</h3>
          <p>
            <strong>Авторизован:</strong> {isAuthenticated ? 'Да' : 'Нет'}
          </p>
          <p>
            <strong>Пользователь:</strong> {user ? JSON.stringify(user) : 'Нет'}
          </p>
          <p>
            <strong>Токен:</strong> {token ? `${token.substring(0, 50)}...` : 'Нет'}
          </p>
        </div>

        {tokenInfo && (
          <div className=' p-4 rounded'>
            <h3 className='font-semibold mb-2'>Информация о токене:</h3>
            {tokenInfo.error ? (
              <p className='text-red-600'>{tokenInfo.error}</p>
            ) : (
              <div className='space-y-1 text-sm'>
                <p>
                  <strong>Истек:</strong>{' '}
                  <span className={tokenInfo.isExpired ? 'text-red-600' : 'text-green-600'}>
                    {tokenInfo.isExpired ? 'Да' : 'Нет'}
                  </span>
                </p>
                <p>
                  <strong>Срок действия:</strong> {tokenInfo.expiresAt}
                </p>
                <p>
                  <strong>Выдан:</strong> {tokenInfo.issuedAt}
                </p>
                <p>
                  <strong>Пользователь ID:</strong> {tokenInfo.userId || tokenInfo.sub || 'Не указан'}
                </p>
                <p>
                  <strong>Роль:</strong> {tokenInfo.role || 'Не указана'}
                </p>
                <details className='mt-2'>
                  <summary className='cursor-pointer font-medium'>Полная информация</summary>
                  <pre className='mt-2 text-xs  p-2 rounded overflow-auto'>{JSON.stringify(tokenInfo, null, 2)}</pre>
                </details>
              </div>
            )}
          </div>
        )}
      </div>

      <div className='space-x-4'>
        <button onClick={loginTest} className='bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600'>
          Тестовый логин
        </button>

        <button
          onClick={testAuth}
          className='bg-green-500 text-white px-4 py-2 rounded hover:bg-green-600'
          disabled={!token}
        >
          Тест /me/bookings
        </button>

        <button
          onClick={testBooking}
          className='bg-purple-500 text-white px-4 py-2 rounded hover:bg-purple-600'
          disabled={!token}
        >
          Тест бронирования
        </button>

        <button
          onClick={() => {
            localStorage.clear();
            window.location.reload();
          }}
          className='bg-red-500 text-white px-4 py-2 rounded hover:bg-red-600'
        >
          Очистить токен
        </button>
      </div>
    </div>
  );
};

export default DebugPage;
