export interface MovieSession {
  id: number;
  movieId: number;
  cinemaId: number;
  startTime: string;
}

export interface CinemaInfoProps {
  name?: string;
  address?: string;
}

export interface MoviePosterProps {
  posterImage: string;
  title: string;
  lengthMinutes: number;
  description: string;
}


export interface SessionsByDateProps {
  sessions: MovieSession[];
}