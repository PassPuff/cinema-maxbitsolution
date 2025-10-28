import React from "react";
import { Routes, Route } from "react-router-dom";
import FilmsPage from "../pages/filmsPage/ui/filmsPage.tsx";
import CinemasPage from "../pages/CinemasPage/ui/CinemasPage";
import CinemaPage from "../pages/CinemaPage/ui/CinemaPage";
import LoginPage from "../pages/WORK/LoginPage/ui/LoginPage";
import RegisterPage from "../pages/WORK/RegisterPage/ui/RegisterPage";
// import MoviePage from "../pages/MoviePage/ui/MoviePage";
import  MovieSessions from "../pages/MoviePage/ui/MoviePage";
// import SessionPage from "../pages/SessionPage/ui/SessionPage";
// import BookingsPage from "../pages/BookingsPage/ui/BookingsPage";

const AppRouter: React.FC = () => (
  <Routes>
    <Route path="/" element={<FilmsPage />} />
    <Route path="/movies/:movieId/sessions" element={<MovieSessions />} />

    <Route path="/login" element={<LoginPage />} />
    <Route path="/register" element={<RegisterPage />} />

    <Route path="/cinemas" element={<CinemasPage />} />
    <Route path="/cinemas/:cinemaId/sessions" element={<CinemaPage />} />

    {/*<Route path="/bookings" element={<BookingsPage />} />*/}
    {/*<Route path="/sessions/:sessionId" element={<SessionPage />} />*/}
  </Routes>
);

export default AppRouter;
