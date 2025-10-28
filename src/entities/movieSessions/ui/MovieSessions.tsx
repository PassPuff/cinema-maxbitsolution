import { useMovieSessionsQuery } from "../api/getMovieSessionsQuery.ts";
import { useParams } from "react-router-dom";

export const Movie = () => {
  // получаем id из URL
  const { movieId } = useParams<{ movieId: string }>();
  const {
    data: movie,
    isLoading,
    isError,
  } = useMovieSessionsQuery(String(movieId));

  if (isLoading) return <p>Загрузка...</p>;
  if (isError) return <p>Ошибка загрузки фильмов</p>;

  return (
    <div className="p-6">
      <h1 className="text-2xl font-bold mb-4">{"movie.title"}</h1>

      {/*<ul className="space-y-2">*/}
      {/*  {movie.sessions.map((session) => (*/}
      {/*    <li*/}
      {/*      key={session.id}*/}
      {/*      className="flex justify-between p-4 bg-gray-800 rounded-lg"*/}
      {/*    >*/}
      {/*      <span>{session.cinemaName}</span>*/}
      {/*      <span>{session.time}</span>*/}
      {/*      <span>{session.price} ₽</span>*/}
      {/*    </li>*/}
      {/*  ))}*/}
      {/*</ul>*/}
    </div>
  );
};
