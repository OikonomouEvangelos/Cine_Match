// API service  use environment variable for the backend base URL so the frontend can point to an online host
const API_BASE_URL = process.env.REACT_APP_API_BASE_URL || 'http://localhost:8080/api';

export const movieService = {
  async searchMovies(query) {
    const response = await fetch(`${API_BASE_URL}/movies/search?query=${encodeURIComponent(query)}`);
    if (!response.ok) {
      throw new Error('\u0391\u03c0\u03bf\u03c4\u03c5\u03c7\u03af\u03b1 \u03b1\u03bd\u03b1\u03b6\u03ae\u03c4\u03b7\u03c3\u03b7\u03c2 \u03c4\u03b1\u03b9\u03bd\u03b9\u03ce\u03bd');
    }
    return response.json();
  },

  async getMovieDetails(movieId) {
    const response = await fetch(`${API_BASE_URL}/movies/${movieId}`);
    if (!response.ok) {
      throw new Error('\u0391\u03c0\u03bf\u03c4\u03c5\u03c7\u03af\u03b1 \u03c6\u03cc\u03c1\u03c4\u03c9\u03c3\u03b7\u03c2 \u03bb\u03b5\u03c0\u03c4\u03bf\u03bc\u03b5\u03c1\u03b5\u03b9\u03cf\u03bd \u03c4\u03b1\u03b9\u03bd\u03af\u03b1\u03c2');
    }
    return response.json();
  },

  async getPopularMovies() {
    const response = await fetch(`${API_BASE_URL}/movies/popular`);
    if (!response.ok) {
      throw new Error('\u0391\u03c0\u03bf\u03c4\u03c5\u03c7\u03af\u03b1 \u03c6\u03cc\u03c1\u03c4\u03c9\u03c3\u03b7\u03c2 \u03b4\u03b7\u03bc\u03bf\u03c6\u03b9\u03bb\u03ce\u03bd \u03c4\u03b1\u03b9\u03bd\u03b9\u03ce\u03bd');
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
      // try to read body for an error message
      let txt = 'Authentication failed';
      try { const json = await response.json(); if (json && json.message) txt = json.message; } catch(e){}
      throw new Error(txt);
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
      let txt = 'Registration failed';
      try { const json = await response.json(); if (json && json.message) txt = json.message; } catch(e){}
      throw new Error(txt);
    }

    return response.json();
  },

  async logout() {
    //  just clear client-side data for logout
    localStorage.removeItem('token');
    localStorage.removeItem('user');
  }
};