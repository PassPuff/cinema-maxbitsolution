import { useMoviesQuery } from "../api/getMovies";
import { Button } from "../../../shared/components/ui/button.tsx";
import { useNavigate } from "react-router-dom";

export const MovieList = () => {
  const { data: movies, isLoading, isError } = useMoviesQuery();
  const navigate = useNavigate();

  if (isLoading) return <p>Загрузка...</p>;
  if (isError) return <p>Ошибка загрузки фильмов</p>;
  return (
    <div className="p-6">
      <div className="grid grid-cols-[90px_0.6fr_180px_160px_120px] gap-4 font-semibold mb-2">
        <span>Постер</span>
        <span>Название</span>
        <span>Длительность</span>
        <span>Рейтинг</span>
      </div>
      <hr />

      <ul className="space-y-2">
        {movies?.map((movie) => (
          <li
            key={movie.id}
            className="grid grid-cols-[90px_0.6fr_180px_160px_120px] gap-4 items-center rounded-2xl shadow-md p-2 hover:shadow-lg transition-shadow duration-200"
          >
            <img
              src={`http://localhost:3022${movie.posterImage}`}
              alt={movie.title}
              className="w-10 h-10 object-cover rounded"
            />
            <span>{movie.title}</span>
            <span>{movie.lengthMinutes} мин</span>
            <span>{movie.rating}</span>
            <Button onClick={() => navigate(`/movies/${movie.id}/sessions`)}>
              Посмотреть
            </Button>
          </li>
        ))}
      </ul>
    </div>
  );
};
