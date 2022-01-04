const API_KEY = 'd22ff5a9a4051b201049bf7b97d391af';
const BASE_URL = 'https://api.themoviedb.org/3';

async function fethWithErrorHandling(url = '', config = {}) {
  const response = await fetch(url, config);
  return response.ok
    ? await response.json()
    : Promise.reject(new Error('404 Not found'));
}

export function getTrending(page) {
  return fethWithErrorHandling(
    `${BASE_URL}/trending/movie/day?api_key=${API_KEY}&page=${page}`,
  );
}

export function searchMovies(query, page) {
  return fethWithErrorHandling(
    `${BASE_URL}/search/movie?api_key=${API_KEY}&query=${query}&page=${page}`,
  );
}

export function getMovieDetails(movieId) {
  return fethWithErrorHandling(
    `${BASE_URL}/movie/${movieId}?api_key=${API_KEY}`,
  );
}

export function getMovieCredits(movieId) {
  return fethWithErrorHandling(
    `${BASE_URL}/movie/${movieId}/credits?api_key=${API_KEY}`,
  );
}

export function getMovieReviews(movieId, page) {
  return fethWithErrorHandling(
    `${BASE_URL}/movie/${movieId}/reviews?api_key=${API_KEY}&page=${page}`,
  );
}
