const API_KEY = import.meta.env.VITE_TMDB_API_KEY;

type Requests = {
  feachTrending: string;
  feachNetflixOriginals: string;
  feactTopRated: string;
  feactActionMovies: string;
  feactComedyMovies: string;
  feactHorrorMovies: string;
  feactRomanceMovies: string;
  feactDocumentMovies: string;
};

export const requests: Requests = {
  feachTrending: `/trending/all/week?api_key=${API_KEY}&language=en-us`,
  feachNetflixOriginals: `/discover/tv?api_key=${API_KEY}&with_networks=213`,
  feactTopRated: `/discover/tv?api_key=${API_KEY}&languager=en-us`,
  feactActionMovies: `/discover/tv?api_key=${API_KEY}&with_genres=28`,
  feactComedyMovies: `/discover/tv?api_key=${API_KEY}&with_genres=35`,
  feactHorrorMovies: `/discover/tv?api_key=${API_KEY}&with_genres=27`,
  feactRomanceMovies: `/discover/tv?api_key=${API_KEY}&with_genres=10749`,
  feactDocumentMovies: `/discover/tv?api_key=${API_KEY}&with_genres=99`,
};
