import React, { useState, useEffect } from "react";
import { Link, useParams } from "react-router-dom";
import {
  getMovieDetailsById,
  getSimilarMovies,
  getTrailerById,
} from "../services/tmdbApi";
import { ArrowLeft } from "lucide-react";
import Loading from "../components/Loading";
import MovieHeader from "../components/MovieHeader";
import MovieActions from "../components/MovieActions";
import MovieCastSection from "../components/MovieCastSection";
import SimilarMovie from "../components/SimilarMovie";
const MovieDetailsPage = ({ favoriteList, setFavoriteList }) => {
  const [movie, setMovie] = useState(null);
  const [isLoading, setIsLoading] = useState(true);
  const [trailerUrl, setTrailerUrl] = useState(null);
  const [error, setError] = useState(null);
  const [similarMovies, setSimilarMovies] = useState([]);
  const { id } = useParams();

  const normalizedId = Number(id);

  useEffect(() => {
    findMovieDetails(id);
  }, [id]);

  const findMovieDetails = async (id) => {
    try {
      setIsLoading(true);
      setError(null);
      const res = await getMovieDetailsById(id);
      setMovie(res);
      const trailer = await getTrailerById(id); //Movie Trailer
      setTrailerUrl(trailer);
      const similarMovie = await getSimilarMovies(id);
      setSimilarMovies(similarMovie);
    } catch (err) {
      console.error("Error fetching movie:", err.response?.status, err.message);
      setError("Failed to fetch movie details.");
      setMovie(null);
      setTrailerUrl(null);
    } finally {
      setIsLoading(false);
    }
  };

  const handleTrailerClick = () => {
    if (trailerUrl) {
      window.open(trailerUrl, "_blank");
    }
  };

  const handleFavoriteClick = () => {
    setFavoriteList((prev) =>
      prev.includes(normalizedId)
        ? prev.filter((item) => item !== normalizedId)
        : [...prev, normalizedId]
    );
  };

  if (isLoading) {
    return (
      <div className="movie-detail-container">
        <div className="movie-detail-page">
          <Link to="/">
            <button className="back-button">
              <ArrowLeft size={14} />
              Back to search
            </button>
          </Link>
          <Loading />
        </div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="movie-detail-container">
        <div className="movie-detail-page">
          <Link to="/">
            <button className="back-button">
              <ArrowLeft size={14} />
              Back to search
            </button>
          </Link>
          <Error message={error} onRetry={() => findMovieDetails(id)} />
        </div>
      </div>
    );
  }

  if (!movie) {
    return <Loading />;
  }

  return (
    <div className="movie-detail-container">
      <div className="movie-detail-page">
        <Link to="/">
          <button className="back-button">
            <ArrowLeft size={14} />
            Back to search
          </button>
        </Link>

        <MovieHeader movie={movie} />

        <MovieActions
          trailerUrl={trailerUrl}
          handleTrailerClick={handleTrailerClick}
          title={movie.title}
          handleFavoriteClick={handleFavoriteClick}
          favoriteList={favoriteList}
          id={id}
        />

        <div className="movie-details-description">
          <p>{movie.overview}</p>
        </div>

        <MovieCastSection cast={movie.credits.cast} />
        <SimilarMovie similarMovies={similarMovies} />
      </div>
    </div>
  );
};

export default MovieDetailsPage;
