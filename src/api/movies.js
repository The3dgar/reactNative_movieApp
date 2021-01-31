import { LANG, MOVIE_API_KEY, MOVIE_API_URL, LANG_ES } from "../utils/utils";

export const getNewsMoviesApi = async (page = 1) => {
  const url = `${MOVIE_API_URL}/movie/now_playing?api_key=${MOVIE_API_KEY}&language=${LANG}&page=${page}`;

  return fetch(url)
    .then((resp) => resp.json())
    .then((resp) => {
      return resp;
    });
};

export const getGenreMovieApi = (idGenres) => {
  const url = `${MOVIE_API_URL}/genre/movie/list?api_key=${MOVIE_API_KEY}&language=${LANG}`;

  return fetch(url)
    .then((resp) => resp.json())
    .then((resp) => {
      const arrayGenres = [];
      idGenres.forEach((id) => {
        resp.genres.forEach((item) => {
          if (item.id === id) arrayGenres.push(item.name);
        });
      });
      return arrayGenres;
    });
};

export const getAllGenresApi = () => {
  const url = `${MOVIE_API_URL}/genre/movie/list?api_key=${MOVIE_API_KEY}&language=${LANG}`;

  return fetch(url)
    .then((resp) => resp.json())
    .then((resp) => {
      return resp.genres;
    });
};

export const getMoviesByGenreApi = (id) => {
  const url = `${MOVIE_API_URL}/discover/movie?api_key=${MOVIE_API_KEY}&language=${LANG}&with_genres=${id}`;
  return fetch(url)
    .then((resp) => resp.json())
    .then((resp) => {
      return resp.results;
    });
};

export const getMovieById = (id) => {
  const url = `${MOVIE_API_URL}/movie/${id}?api_key=${MOVIE_API_KEY}&language=${LANG_ES}`;

  return fetch(url)
    .then((resp) => resp.json())
    .then((resp) => {
      return resp;
    });
};

export const getVideoMovieApi = (id) => {
  const url = `${MOVIE_API_URL}/movie/${id}/videos?api_key=${MOVIE_API_KEY}&language=${LANG}`;

  return fetch(url)
    .then((resp) => resp.json())
    .then((resp) => {
      return resp;
    });
};

// popular

export const getPopularMovieApi = (page = 1) => {
  const url = `${MOVIE_API_URL}/movie/popular?api_key=${MOVIE_API_KEY}&language=${LANG}&page=${page}`;

  return fetch(url)
    .then((resp) => resp.json())
    .then((resp) => {
      return resp;
    });
};

export const searchMovieApi = (search) => {
  if(!search) return []
  const url = `${MOVIE_API_URL}/search/movie?api_key=${MOVIE_API_KEY}&language=${LANG}&query=${search}`;

  return fetch(url)
    .then((resp) => resp.json())
    .then((resp) => {
      return resp;
    });
};
