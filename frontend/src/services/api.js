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
export const authService = {
  async login(email, password) {
    const response = await fetch(`${API_BASE_URL}/auth/login`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ email, password }),
    });

    if (!response.ok) {
      throw new Error('Αποτυχία σύνδεσης');
    }

    return response.json();
  },

  async register(userData) {
    const response = await fetch(`${API_BASE_URL}/auth/register`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(userData),
    });

    if (!response.ok) {
      throw new Error('Αποτυχία εγγραφής');
    }

    return response.json();
  },

  async logout() {
    // Εδώ μπορείς να προσθέσεις κώδικα για logout αν χρειάζεται
    localStorage.removeItem('token');
    localStorage.removeItem('user');
  }
};