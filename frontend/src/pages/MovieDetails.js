import React, { useState, useEffect } from 'react';
import { useParams, Link } from 'react-router-dom';

const MovieDetails = () => {
  const { id } = useParams();
  const [movie, setMovie] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    // Προσωρινά mock data
    const mockMovie = {
      id: parseInt(id),
      title: "The Matrix",
      rating: 8.7,
      year: 1999,
      description: "Ένας hacker μαθαίνει για την πραγματική φύση της πραγματικότητας και τον ρόλο του στον πόλεμο εναντίον των ελεγκτών της.",
      duration: "136 λεπτά",
      genre: ["Δράση", "Επιστημονική Φαντασία"],
      director: "Lana Wachowski, Lilly Wachowski",
      cast: ["Keanu Reeves", "Laurence Fishburne", "Carrie-Anne Moss"]
    };
    setMovie(mockMovie);
    setLoading(false);
  }, [id]);

  if (loading) return <div style={{ color: '#fff', textAlign: 'center' }}>Φόρτωση...</div>;
  if (!movie) return <div style={{ color: '#fff', textAlign: 'center' }}>Ταινία δεν βρέθηκε</div>;

  return (
    <div style={{
      maxWidth: '1200px',
      margin: '0 auto',
      padding: '0 2rem'
    }}>
      <Link
        to="/movies"
        style={{
          color: '#f5c518',
          textDecoration: 'none',
          display: 'inline-block',
          marginBottom: '2rem'
        }}
      >
        ← Πίσω στις Ταινίες
      </Link>

      <div style={{
        display: 'grid',
        gridTemplateColumns: '300px 1fr',
        gap: '3rem',
        alignItems: 'start'
      }}>
        {/* Poster */}
        <div style={{
          backgroundColor: '#2d2d2d',
          height: '450px',
          borderRadius: '8px',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          color: '#888',
          fontSize: '1.2rem'
        }}>
          🎬 {movie.title}
        </div>

        {/* Details */}
        <div>
          <h1 style={{
            fontSize: '2.5rem',
            marginBottom: '1rem',
            color: '#f5c518'
          }}>
            {movie.title}
          </h1>

          <div style={{
            display: 'flex',
            gap: '2rem',
            marginBottom: '2rem',
            color: '#ccc'
          }}>
            <span>⭐ {movie.rating}/10</span>
            <span>{movie.year}</span>
            <span>{movie.duration}</span>
          </div>

          <div style={{ marginBottom: '2rem' }}>
            <h3 style={{ color: '#f5c518', marginBottom: '0.5rem' }}>Περιγραφή</h3>
            <p style={{ color: '#ccc', lineHeight: '1.6' }}>{movie.description}</p>
          </div>

          <div style={{ marginBottom: '2rem' }}>
            <h3 style={{ color: '#f5c518', marginBottom: '0.5rem' }}>Κατηγορίες</h3>
            <div style={{ display: 'flex', gap: '0.5rem', flexWrap: 'wrap' }}>
              {movie.genre.map((genre, index) => (
                <span
                  key={index}
                  style={{
                    backgroundColor: '#333',
                    color: '#f5c518',
                    padding: '0.3rem 0.8rem',
                    borderRadius: '20px',
                    fontSize: '0.9rem'
                  }}
                >
                  {genre}
                </span>
              ))}
            </div>
          </div>

          <div style={{ marginBottom: '2rem' }}>
            <h3 style={{ color: '#f5c518', marginBottom: '0.5rem' }}>Σκηνοθέτης</h3>
            <p style={{ color: '#ccc' }}>{movie.director}</p>
          </div>

          <div>
            <h3 style={{ color: '#f5c518', marginBottom: '0.5rem' }}>Ηθοποιοί</h3>
            <p style={{ color: '#ccc' }}>{movie.cast.join(', ')}</p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default MovieDetails;