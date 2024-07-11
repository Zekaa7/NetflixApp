const API_KEY = "b03a89bc51ab020892ac27bbc8aa2c2a";

const requests = {
  fetchTrending: `/trending/all/week?api_key=${API_KEY}&language=it-IT`,
  fetchNetflixOriginals: `/discover/tv?api_key=${API_KEY}&with_networks=213`,
  fetchTopRated: `/movie/top_rated?api_key=${API_KEY}&language=en-US`,
  fetchActionMovies: `/discover/movie?api_key=${API_KEY}&with_genres=28`,
  fetchComedyMovies: `/discover/movie?api_key=${API_KEY}&with_genres=35`,
  fetchHorrorMovies: `/discover/movie?api_key=${API_KEY}&with_genres=27`,
  fetchRomanceMovies: `/discover/movie?api_key=${API_KEY}&with_genres=10749`,
  fetchDocumentaries: `/discover/movie?api_key=${API_KEY}&with_genres=99`,
};

export default requests;

//https://api.themoviedb.org/3/trending/all/week?api_key=b03a89bc51ab020892ac27bbc8aa2c2a&language=en-US
