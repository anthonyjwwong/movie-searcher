import React, { useState, useEffect } from "react";
import SearchBar from "../components/SearchBar";
import MovieCard from "../components/MovieCard";
import useDebounce from "../hooks/useDebounce";
import {
  searchMovie,
  getPopularMovie,
  searchWithFilters,
} from "../services/tmdbApi";
import Error from "../components/Error";
import Loading from "../components/Loading";
import Sort from "../components/Sort";

import FilterBar from "../components/FilterBar";
const HomePage = ({ favoriteList, setFavoriteList }) => {
  const [currentView, setCurrentView] = useState("popular");
  const [movieQuery, setMovieQuery] = useState("");
  const debouncedQuery = useDebounce(movieQuery, 350);
  const [movieList, setMovieList] = useState([]);
  const [page, setPage] = useState(1);
  const [hasMorePage, setHasMorePage] = useState(true);
  const [isLoading, setIsLoading] = useState(true);
  const [isLoadingMore, setIsLoadingMore] = useState(false);
  const [error, setError] = useState(null);
  const [filters, setFilters] = useState({
    genreId: "",
    yearFrom: "",
    yearTo: "",
    minRating: "",
    sortBy: "",
    page: 1,
  });

  useEffect(() => {
    loadPopularMovies(1);
  }, []);

  useEffect(() => {
    if (debouncedQuery) {
      searchMovies(debouncedQuery);
    } else if (movieQuery === "") {
      setPage(1);
      setMovieList([]);
      loadPopularMovies(1);
    }
  }, [debouncedQuery, movieQuery]);

  const loadPopularMovies = async (pageToLoad) => {
    if (pageToLoad === 1) {
      setIsLoading(true);
    } else {
      setIsLoadingMore(true);
    }
    try {
      setError(null);
      const list = await getPopularMovie(pageToLoad);
      setMovieList((prev) => {
        const ids = new Set(prev.map((movie) => movie.id));
        const newMovies = list.results.filter((movie) => !ids.has(movie.id));
        return [...prev, ...newMovies];
      });

      setHasMorePage(pageToLoad < list.total_pages);
    } catch (err) {
      setError("Failed to load movies");
      setMovieList([]);
    } finally {
      setIsLoading(false);
      setIsLoadingMore(false);
    }
  };

  const searchMovies = async (query, pageToLoad = 1) => {
    setCurrentView("search");
    try {
      if (pageToLoad === 1) {
        setIsLoading(true);
      } else {
        setIsLoadingMore(true);
      }
      setError(null);

      const list = await searchMovie(query, pageToLoad);

      if (!list.results || list.results.length === 0) {
        setError(`No movies found for "${query}"`);
        setMovieList([]);
      } else {
        if (pageToLoad === 1) {
          setMovieList(list.results);
        } else {
          setMovieList((prev) => {
            const ids = new Set(prev.map((movie) => movie.id));
            const newMovies = list.results.filter(
              (movie) => !ids.has(movie.id)
            );
            return [...prev, ...newMovies];
          });
        }
        setHasMorePage(pageToLoad < list.total_pages);
      }
    } catch (err) {
      setError("Search failed. Please try again.");
      setMovieList([]);
    } finally {
      setIsLoadingMore(false);
      setIsLoading(false);
    }
  };

  const handleApplyFilter = async (pageToLoad = 1) => {
    setCurrentView("filtered");

    try {
      if (pageToLoad === 1) {
        setIsLoading(true);
      } else {
        setIsLoadingMore(true);
      }
      const filterWithPage = { ...filters, page: pageToLoad };
      console.log("FILTERWITHPAGE:", filterWithPage);
      const res = await searchWithFilters(filterWithPage);
      if (pageToLoad === 1) {
        console.log("results");
        setMovieList(res.results);
      } else {
        console.log("PAGETOLOAD > !");
        setMovieList((prev) => {
          const ids = new Set(prev.map((movie) => movie.id));
          const newMovies = res.results.filter((movie) => !ids.has(movie.id));
          return [...prev, ...newMovies];
        });
      }
      setHasMorePage(pageToLoad < res.total_pages);
    } catch (error) {
      console.log("Fail to get filtered movie list", error);
    } finally {
      setIsLoadingMore(false);
      setIsLoading(false);
    }
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFilters((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleSortingChange = async (e) => {
    setCurrentView("filtered");
    const { name, value } = e.target;

    const updatedFilters = {
      ...filters,
      [name]: value,
      page: 1,
    };

    setFilters(updatedFilters);
    setPage(1);

    try {
      setIsLoading(true);
      const res = await searchWithFilters(updatedFilters);
      setMovieList(res.results);
      setHasMorePage(1 < res.total_pages);
    } catch (error) {
      console.log("Fail to get filtered movie list", error);
      setMovieList([]);
    } finally {
      setIsLoading(false);
      setIsLoadingMore(false);
    }
  };

  const handleLoadMore = () => {
    if (!hasMorePage || isLoadingMore) return;
    const nextPage = page + 1;
    setPage(nextPage);
    if (currentView === "popular") {
      loadPopularMovies(nextPage);
    }
    if (currentView === "search") {
      searchMovies(debouncedQuery, nextPage);
    }
    if (currentView === "filtered") {
      setFilters((prev) => ({ ...prev, page: nextPage }));
      handleApplyFilter(nextPage);
    }
  };

  const handleSubmit = (e) => {
    e.preventDefault();
  };

  const clearAllFilters = () => {
    setFilters({
      genreId: "",
      yearFrom: "",
      yearTo: "",
      minRating: "",
      sortBy: "popularity.desc",
      page: 1,
    });

    setCurrentView("popular");
    setPage(1);
    setMovieList([]);
    setMovieQuery("");

    loadPopularMovies(1);
  };
  return (
    <main className="home-page">
      <div className="hero-section">
        <h3>Discover Movies</h3>
        <p>Search through thousands of movie to find your favorite...</p>
        <SearchBar
          movieQuery={movieQuery}
          onChange={(e) => setMovieQuery(e.target.value)}
          handleSubmit={handleSubmit}
        />
      </div>
      <div className="filter">
        <FilterBar
          clearAllFilters={clearAllFilters}
          handleChange={handleChange}
          filters={filters}
          setFilters={setFilters}
          handleApplyFilter={handleApplyFilter}
        />
      </div>
      {isLoading && <Loading />}
      {error && !isLoading && <Error message={error} />}
      <Sort filters={filters} handleSortingChange={handleSortingChange} />
      {!isLoading && !error && (
        <div className="movie-container">
          {movieList.map((movie) => (
            <MovieCard
              key={movie.id}
              id={movie.id}
              title={movie.original_title}
              img={movie.poster_path}
              year={movie.release_date}
              rating={movie.vote_average}
              setFavoriteList={setFavoriteList}
              favoriteList={favoriteList}
            />
          ))}
        </div>
      )}

      {hasMorePage && !isLoading && (
        <button
          onClick={handleLoadMore}
          disabled={isLoadingMore}
          className="more-page-button"
        >
          {isLoadingMore ? "Loading..." : "Load More"}
        </button>
      )}
      {!hasMorePage && <p>No more movies to load.</p>}
    </main>
  );
};

export default HomePage;
