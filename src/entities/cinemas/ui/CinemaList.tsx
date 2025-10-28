import { useCinemasQuery } from "../api/getMovies";
import { Button } from "../../../shared/components/ui/button.tsx";

export const CinemaList = () => {
  const { data: movies, isLoading, isError } = useCinemasQuery();

  if (isLoading) return <p>Загрузка...</p>;
  if (isError) return <p>Ошибка загрузки фильмов</p>;

  return (
    <div className="p-6">
      {/* Заголовки колонок */}
      <div className="grid grid-cols-4 gap-4 font-semibold mb-2">
        <span>Кинотеатр</span>
        <span>Адрес</span>
      </div>
      <hr />

      <ul className="space-y-2">
        {movies?.map((movie) => (
          <li
            key={movie.id}
            className="grid grid-cols-4 gap-4 items-center rounded-2xl shadow-md p-2 hover:shadow-lg transition-shadow duration-200"
          >
            <span>{movie.name}</span>
            <span>{movie.address} мин</span>
            <Button variant="default" size="sm">
              Посмотреть
            </Button>
          </li>
        ))}
      </ul>
    </div>
  );
};
