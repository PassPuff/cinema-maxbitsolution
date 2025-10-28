import React from "react";
import { useNavigate } from "react-router-dom";
import { MovieList } from "@/entities/movies";

const FilmsPage: React.FC = () => {
  const navigate = useNavigate();

  const handleMovieClick = (movieId: number) => {
    navigate(`/movies/${movieId}/sessions`);
  };

  return (
    <div>
      <MovieList onMovieClick={handleMovieClick} />
    </div>
  );
};

export default FilmsPage;
