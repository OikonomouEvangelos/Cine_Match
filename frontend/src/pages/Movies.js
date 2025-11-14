import React from 'react';

const Movies = () => {
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
        Ταινίες
      </h1>
      <p style={{ color: '#ccc' }}>
        Σύντομα θα μπορείτε να αναζητήσετε και να δείτε πληροφορίες για όλες τις ταινίες...
      </p>
    </div>
  );
};

export default Movies;