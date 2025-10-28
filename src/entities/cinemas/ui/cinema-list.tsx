import { useCinemasQuery } from "../api/getCinemas";
import { Button } from "@/shared/components/ui/button";

interface CinemaListProps {
  onCinemaClick: (cinemaId: number) => void;
}

export const CinemaList = ({ onCinemaClick }: CinemaListProps) => {
  const { data: cinemas, isLoading, isError } = useCinemasQuery();

  if (isLoading) return <p>Загрузка...</p>;
  if (isError) return <p>Ошибка загрузки фильмов</p>;
  return (
    <div className="p-6">
      <div className="grid grid-cols-3 gap-4 font-semibold mb-2">
        <span>Кинотеатр</span>
        <span>Адрес</span>
      </div>
      <hr />

      <ul className="space-y-2">
        {cinemas?.map((cinema) => (
          <li
            key={cinema.id}
            className="grid grid-cols-3 gap-4 items-center rounded-2xl shadow-md p-2 hover:shadow-lg transition-shadow duration-200"
          >
            <span>{cinema.name}</span>
            <span>{cinema.address}</span>
            <Button
              className="max-w-max"
              onClick={() => onCinemaClick(cinema.id)}
            >
              Посмотреть
            </Button>
          </li>
        ))}
      </ul>
    </div>
  );
};
