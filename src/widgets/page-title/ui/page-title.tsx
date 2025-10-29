import { useLocation } from 'react-router-dom';

const routeTitles: Record<string, string> = {
  '/': 'Фильмы',
  '/cinemas': 'Кинотеатры',
  '/bookings': 'Мои билеты',
  '/login': 'Вход',
  '/register': 'Регистрация',
};

const style = 'text-2xl bg-black text-white text-white';

export const PageTitle = () => {
  const location = useLocation();
  const { pathname } = location;

  // Проверяем динамические маршруты (например /cinemas/:id)
  if (pathname.startsWith('/cinemas/')) return <h1 className={style}>Кинотеатр</h1>;
  if (pathname.startsWith('/movies/')) return <h1 className={style}>Фильм</h1>;
  if (pathname.startsWith('/sessions/')) return <h1 className={style}>Сеанс</h1>;

  const title = routeTitles[pathname] || 'Страница';
  return <h1 className={style}>{title}</h1>;
};
