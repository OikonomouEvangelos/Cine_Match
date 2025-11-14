import React from 'react';
import { useParams } from 'react-router-dom';

const MovieDetails = () => {
  const { id } = useParams();

  return (
    <div style={{
      maxWidth: '1200px',
      margin: '0 auto',
      padding: '0 2rem'
    }}>
      <h1 style={{
        fontSize: '2.5rem',
        marginBottom: '2rem',
        color: '#f5c518'
      }}>
        Λεπτομέρειες Ταινίας #{id}
      </h1>
      <p style={{ color: '#ccc' }}>
        Σύντομα θα εμφανίζονται οι πλήρεις πληροφορίες για την ταινία...
      </p>
    </div>
  );
};

export default MovieDetails;