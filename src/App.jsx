import React from "react";
import { Routes, Route } from "react-router-dom";
import { searchMovie } from "./services/tmdbApi";
import Navbar from "./components/Navbar";
import FavoritePage from "./pages/FavoritePage";
import HomePage from "./pages/HomePage";
import MovieDetailsPage from "./pages/MovieDetailsPage";

function App() {
  return (
    <div>
      <Navbar />

      <Routes>
        <Route path="/" element={<HomePage />} />
        <Route path="/movie/:id" element={<MovieDetailsPage />} />
        <Route path="/favorites" element={<FavoritePage />} />
      </Routes>
    </div>
  );
}

export default App;
