import axios from "axios";

const BASE_URL = import.meta.env.VITE_TMDB_BASE_URL;
const API_KEY = import.meta.env.VITE_TMDB_API_KEY;

const tmdbApi = axios.create({
  baseURL: BASE_URL,
  params: {
    api_key: API_KEY,
  },
});

export const searchMovie = async (query) => {
  try {
    const res = await tmdbApi.get("/search/movie", { params: { query } });
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
  }
};

export default tmdbApi;
