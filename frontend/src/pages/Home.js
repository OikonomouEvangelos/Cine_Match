import React from 'react';
import { Link } from 'react-router-dom';

const Home = () => {
  return (
    <div style={{
      maxWidth: '1200px',
      margin: '0 auto',
      padding: '0 2rem',
      textAlign: 'center'
    }}>
      <div style={{
        background: 'linear-gradient(135deg, #1a1a1a 0%, #2d2d2d 100%)',
        padding: '4rem 2rem',
        borderRadius: '12px',
        marginTop: '2rem'
      }}>
        <h1 style={{
          fontSize: '3.5rem',
          marginBottom: '1rem',
          background: 'linear-gradient(45deg, #f5c518, #ffdf6b)',
          WebkitBackgroundClip: 'text',
          WebkitTextFillColor: 'transparent',
          backgroundClip: 'text'
        }}>
          Καλώς ήρθατε στο CineMatch
        </h1>
        <p style={{
          fontSize: '1.2rem',
          color: '#ccc',
          marginBottom: '2rem'
        }}>
          Βρείτε την τέλεια ταινία για εσάς
        </p>
        <Link
          to="/movies"
          style={{
            display: 'inline-block',
            backgroundColor: '#f5c518',
            color: '#000',
            padding: '12px 30px',
            borderRadius: '6px',
            textDecoration: 'none',
            fontWeight: 'bold',
            fontSize: '1.1rem',
            transition: 'background-color 0.3s ease'
          }}
          onMouseOver={(e) => e.target.style.backgroundColor = '#ffdf6b'}
          onMouseOut={(e) => e.target.style.backgroundColor = '#f5c518'}
        >
          Ανακαλύψτε Ταινίες
        </Link>
      </div>

      <div style={{
        display: 'grid',
        gridTemplateColumns: 'repeat(auto-fit, minmax(300px, 1fr))',
        gap: '2rem',
        marginTop: '4rem'
      }}>
        <div style={{
          backgroundColor: '#1a1a1a',
          padding: '2rem',
          borderRadius: '8px',
          border: '1px solid #333'
        }}>
          <h3 style={{ color: '#f5c518', marginBottom: '1rem' }}>🎬 Δημοφιλείς Ταινίες</h3>
          <p>Ανακαλύψτε τις πιο δημοφιλείς ταινίες της στιγμής</p>
        </div>

        <div style={{
          backgroundColor: '#1a1a1a',
          padding: '2rem',
          borderRadius: '8px',
          border: '1px solid #333'
        }}>
          <h3 style={{ color: '#f5c518', marginBottom: '1rem' }}>⭐ Κορυφαίες Βαθμολογίες</h3>
          <p>Οι ταινίες με τις υψηλότερες βαθμολογίες</p>
        </div>

        <div style={{
          backgroundColor: '#1a1a1a',
          padding: '2rem',
          borderRadius: '8px',
          border: '1px solid #333'
        }}>
          <h3 style={{ color: '#f5c518', marginBottom: '1rem' }}>🎭 Γνωστές Ταινίες</h3>
          <p>Εξερευνήστε ταινίες από διάφορες κατηγορίες</p>
        </div>
      </div>
    </div>
  );
};

export default Home;