import React from 'react';
import { Link, useLocation } from 'react-router-dom';

const navLinks = [
    { to: '/', label: 'Фильмы' },
    { to: '/cinemas', label: 'Кинотеатры' },
    { to: '/bookings', label: 'Мои билеты' },
    { to: '/login', label: 'Вход' }
];

const Sidebar: React.FC = () => {
    const location = useLocation();

    return (
        <nav className={'min-w-[220px] border-r border-gray-200 p-4'}>
        <ul className={'list-style-type: none; padding: 0; margin: 0'}>
            {navLinks.map(link => (
            <li key={link.to} className={'mb-4'}>
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
        </ul>
        </nav>
    );
};

export default Sidebar;
