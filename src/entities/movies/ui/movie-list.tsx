import { useMoviesQuery } from '../api/getMovies';
import { Button } from '@/shared/components/ui/button';
import { getImageUrl } from '@/shared/config';

interface MovieListProps {
  onMovieClick: (movieId: number) => void;
}

export const MovieList = ({ onMovieClick }: MovieListProps) => {
  const { data: movies, isLoading, isError } = useMoviesQuery();

  if (isLoading) return <p>Загрузка...</p>;
  if (isError) return <p>Ошибка загрузки фильмов</p>;
  return (
    <div className='p-6'>
      <div className='grid grid-cols-[90px_0.6fr_180px_160px_120px] gap-4 font-semibold mb-2'>
        <span>Постер</span>
        <span>Название</span>
        <span>Длительность</span>
        <span>Рейтинг</span>
      </div>
      <hr />

      <ul className='space-y-2'>
        {movies?.map((movie) => (
          <li
            key={movie.id}
            className='grid grid-cols-[90px_0.6fr_180px_160px_120px] gap-4 items-center rounded-2xl shadow-md p-2 hover:shadow-lg transition-shadow duration-200'
          >
            <img src={getImageUrl(movie.posterImage)} alt={movie.title} className='w-10 h-10 object-cover rounded' />
            <span>{movie.title}</span>
            <span>{movie.lengthMinutes} мин</span>
            <span>{movie.rating}</span>
            <Button onClick={() => onMovieClick(movie.id)}>Посмотреть</Button>
          </li>
        ))}
      </ul>
    </div>
  );
};
