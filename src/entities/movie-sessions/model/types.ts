export interface MovieSession {
  id: number;
  movieId: number;
  cinemaId: number;
  startTime: string;
}

export interface MovieInfoProps {
  posterImage?: string;
  title?: string;
  lengthMinutes?: number;
  description?: string;
}

export interface SessionTimeListProps {
  sessions: MovieSession[];
}

