import React from 'react';
import { Link, useLocation, useNavigate } from 'react-router-dom';
import { useAuth } from '@/app/providers/use-auth';
import { authApi } from '@/entities/auth';

const Sidebar: React.FC = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const { isAuthenticated, logout } = useAuth();

  const handleLogout = () => {
    authApi.logout();
    logout();
    navigate('/');
  };

  const publicLinks = [
    { to: '/', label: 'Фильмы' },
    { to: '/cinemas', label: 'Кинотеатры' },
  ];

  const authLinks = [{ to: '/bookings', label: 'Мои билеты' }];

  const getAuthLink = () => {
    if (isAuthenticated) {
      return (
        <button onClick={handleLogout} className='text-[#ccc] hover:text-white transition-colors'>
          Выход
        </button>
      );
    }

    return (
      <Link
        to='/login'
        style={{
          color: location.pathname === '/login' ? '#fff' : '#ccc',
        }}
      >
        Вход
      </Link>
    );
  };

  return (
    <nav className='min-w-[220px] border-r border-gray-200 p-4'>
      <ul className='list-none p-0 m-0'>
        {publicLinks.map((link) => (
          <li key={link.to} className='mb-4'>
            <Link
              to={link.to}
              style={{
                color: location.pathname === link.to ? '#fff' : '#ccc',
              }}
            >
              {link.label}
            </Link>
          </li>
        ))}

        {isAuthenticated &&
          authLinks.map((link) => (
            <li key={link.to} className='mb-4'>
              <Link
                to={link.to}
                style={{
                  color: location.pathname === link.to ? '#fff' : '#ccc',
                  textDecoration: 'none',
                }}
              >
                {link.label}
              </Link>
            </li>
          ))}
        <li className='mb-4'>{getAuthLink()}</li>
      </ul>
    </nav>
  );
};

export default Sidebar;
