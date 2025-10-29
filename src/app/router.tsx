import React from "react";
import { Routes, Route } from "react-router-dom";
import FilmsPage from "@/pages/films-page/ui/films-page";
import CinemasPage from "@/pages/cinemas-page/ui/cinemas-page";
import CinemaPage from "@/pages/cinema-page/ui/cinema-page";
import LoginPage from "@/pages/login-page/ui/login-page";
import RegisterPage from "@/pages/work/register-page/ui/register-page";
// import MoviePage from "@/pages/movie-page/ui/movie-page";
import MovieSessions from "@/pages/movie-page/ui/movie-page";
// import SessionPage from "@/pages/work/session-page/ui/session-page";
// import BookingsPage from "@/pages/work/bookings-page/ui/bookings-page";

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
