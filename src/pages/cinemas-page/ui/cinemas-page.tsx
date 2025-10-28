import React from "react";
import { useNavigate } from "react-router-dom";
import { CinemaList } from "@/entities/cinemas";

const CinemasPage: React.FC = () => {
  const navigate = useNavigate();

  const handleCinemaClick = (cinemaId: number) => {
    navigate(`/cinemas/${cinemaId}/sessions`);
  };

  return <CinemaList onCinemaClick={handleCinemaClick} />;
};

export default CinemasPage;
