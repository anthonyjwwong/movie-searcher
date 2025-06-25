import React, { useState, useEffect } from "react";
import { Routes, Route } from "react-router-dom";
import Navbar from "./components/Navbar";
import FavoritePage from "./pages/FavoritePage";
import HomePage from "./pages/HomePage";
import MovieDetailsPage from "./pages/MovieDetailsPage";

function App() {
  const [favoriteList, setFavoriteList] = useState(() => {
    return JSON.parse(localStorage.getItem("favoriteList")) || [];
  });

  useEffect(() => {
    try {
      localStorage.setItem("favoriteList", JSON.stringify(favoriteList));
    } catch (error) {
      console.error("Failed to save favoriteList to localStorage", error);
    }
  }, [favoriteList]);

  return (
    <div>
      <Navbar favoriteList={favoriteList} />

      <Routes>
        <Route
          path="/"
          element={
            <HomePage
              favoriteList={favoriteList}
              setFavoriteList={setFavoriteList}
            />
          }
        />
        <Route
          path="/movie/:id"
          element={
            <MovieDetailsPage
              favoriteList={favoriteList}
              setFavoriteList={setFavoriteList}
            />
          }
        />
        <Route
          path="/favorites"
          element={
            <FavoritePage
              favoriteList={favoriteList}
              setFavoriteList={setFavoriteList}
            />
          }
        />
      </Routes>
    </div>
  );
}

export default App;
