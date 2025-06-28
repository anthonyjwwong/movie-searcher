import axios from "axios";

const BASE_URL = import.meta.env.VITE_TMDB_BASE_URL;
const API_KEY = import.meta.env.VITE_TMDB_API_KEY;

const tmdbApi = axios.create({
  baseURL: BASE_URL,
  params: {
    api_key: API_KEY,
  },
});

export const getPopularMovie = async (page = 1) => {
  try {
    const res = await tmdbApi.get(
      `/discover/movie?include_adult=false&include_video=false&language=en-US&page=${page}&sort_by=popularity.desc`
    );

    return res.data;
  } catch (error) {
    console.log("Fail to fetch from tmdb: ", error);
  }
};

export const searchMovie = async (query, page = 1) => {
  try {
    const res = await tmdbApi.get("/search/movie", { params: { query, page } });

    return res.data;
  } catch (error) {
    console.log("Fail to fetch from tmdb: ", error);
  }
};

export const getMovieDetailsById = async (movieId) => {
  try {
    const res = await tmdbApi.get(`/movie/${movieId}`, {
      params: { append_to_response: "credits,videos" },
    });

    return res.data;
  } catch (error) {
    console.log("Fail to fetch details", error);
    throw error;
  }
};

export const getTrailerById = async (movieId) => {
  try {
    const res = await tmdbApi.get(`/movie/${movieId}/videos`);

    const trailers = res.data.results;

    const trailer = trailers.find(
      (vid) => vid.site === "YouTube" && vid.type === "Trailer"
    );
    return trailer ? `https://www.youtube.com/watch?v=${trailer.key}` : null;
  } catch (error) {
    console.log("Fail to fetch trailer link:", error);
    return null;
  }
};

export const getSimilarMovies = async (movieId) => {
  try {
    const res = await tmdbApi.get(`/movie/${movieId}/similar`);
    return res.data.results;
  } catch (error) {
    console.log("Fail to fetch similar movies:", error);
  }
};

export const getAllGenres = async () => {
  try {
    const res = await tmdbApi.get(`/genre/movie/list`);

    return res.data.genres;
  } catch (error) {
    console.log("Fail to fetch genre:", error);
  }
};

export const searchWithFilters = async (filters) => {
  try {
    const res = await tmdbApi.get(`/discover/movie`, {
      params: {
        with_genres: filters.genreId,
        "primary_release_date.gte": filters.yearFrom
          ? `${filters.yearFrom}-01-01`
          : undefined,
        "primary_release_date.lte": filters.yearTo
          ? `${filters.yearTo}-12-31`
          : undefined,
        "vote_average.gte": filters.minRating,
        sort_by: filters.sortBy || "popularity.desc",
        page: filters.page || 1,
      },
    });

    return res.data;
  } catch (error) {
    console.log("Fail to fetch movie:", error);
  }
};
export default tmdbApi;
