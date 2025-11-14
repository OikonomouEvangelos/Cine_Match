// API service για επικοινωνία με το backend
const API_BASE_URL = 'http://localhost:8080/api';

export const movieService = {
  async searchMovies(query) {
    const response = await fetch(`${API_BASE_URL}/movies/search?query=${encodeURIComponent(query)}`);
    if (!response.ok) {
      throw new Error('Αποτυχία αναζήτησης ταινιών');
    }
    return response.json();
  },

  async getMovieDetails(movieId) {
    const response = await fetch(`${API_BASE_URL}/movies/${movieId}`);
    if (!response.ok) {
      throw new Error('Αποτυχία φόρτωσης λεπτομερειών ταινίας');
    }
    return response.json();
  },

  async getPopularMovies() {
    const response = await fetch(`${API_BASE_URL}/movies/popular`);
    if (!response.ok) {
      throw new Error('Αποτυχία φόρτωσης δημοφιλών ταινιών');
    }
    return response.json();
  }
};