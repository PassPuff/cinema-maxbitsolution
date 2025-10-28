import React from "react";
import { Routes, Route } from "react-router-dom";
import MainPage from "../pages/MainPage/ui/MainPage";
import CinemasPage from "../pages/CinemasPage/ui/CinemasPage";
import CinemaPage from "../pages/CinemaPage/ui/CinemaPage";
import BookingsPage from "../pages/BookingsPage/ui/BookingsPage";
import LoginPage from "../pages/LoginPage/ui/LoginPage";
import RegisterPage from "../pages/RegisterPage/ui/RegisterPage";
import MoviePage from "../pages/MoviePage/ui/MoviePage";
import SessionPage from "../pages/SessionPage/ui/SessionPage";

const AppRouter: React.FC = () => (
  <Routes>
    <Route path="/" element={<MainPage />} />
    <Route path="/cinemas" element={<CinemasPage />} />
    <Route path="/cinemas/:cinemaId" element={<CinemaPage />} />
    <Route path="/bookings" element={<BookingsPage />} />
    <Route path="/login" element={<LoginPage />} />
    <Route path="/register" element={<RegisterPage />} />
    <Route path="/movies/:movieId" element={<MoviePage />} />
    <Route path="/sessions/:sessionId" element={<SessionPage />} />
  </Routes>
);

export default AppRouter;
