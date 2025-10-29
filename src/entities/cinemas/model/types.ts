export type Cinema = {
  id: number;
  name: string;
  address: string;
};

export interface CinemaListProps {
  onCinemaClick: (cinemaId: number) => void;
}