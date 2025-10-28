import { useLocation } from "react-router-dom";

const routeTitles: Record<string, string> = {
  "/": "Главная",
  "/cinemas": "Кинотеатры",
  "/bookings": "Мои бронирования",
  "/login": "Вход",
  "/register": "Регистрация",
};

export const PageTitle = () => {
  const location = useLocation();
  const { pathname } = location;

  // Проверяем динамические маршруты (например /cinemas/:id)
  if (pathname.startsWith("/cinemas/"))
    return <h1 className="text-2xl mb-4">Кинотеатр</h1>;
  if (pathname.startsWith("/movies/"))
    return <h1 className="text-2xl mb-4">Фильм</h1>;
  if (pathname.startsWith("/sessions/"))
    return <h1 className="text-2xl mb-4">Сеанс</h1>;

  const title = routeTitles[pathname] || "Страница";
  return <h1 className="text-2xl bg-black text-white">{title}</h1>;
};
