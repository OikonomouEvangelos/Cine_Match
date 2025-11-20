import React, { useState, useEffect } from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import { authService } from '../services/api';

const Auth = () => {
  const location = useLocation();
  const query = new URLSearchParams(location.search);
  const initialMode = query.get('mode') === 'register' ? false : true; // false -> show register

  const [isLogin, setIsLogin] = useState(initialMode);
  const [formData, setFormData] = useState({
    email: '',
    password: '',
    firstName: '',
    lastName: ''
  });
  const navigate = useNavigate();

  useEffect(() => {
    // update mode if query changes
    const q = new URLSearchParams(location.search);
    setIsLogin(q.get('mode') === 'register' ? false : true);
  }, [location.search]);

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    console.log('Form data:', formData);

    try {
      if (isLogin) {
        const res = await authService.login(formData.email, formData.password);
        alert(res.message || 'Σύνδεση επιτυχής');
        // Αποθήκευση ελάχιστων στοιχείων χρήστη τοπικά αν χρειάζεται
        localStorage.setItem('user', JSON.stringify({ email: formData.email }));
        // notify other components (Header) about auth change
        window.dispatchEvent(new Event('authChanged'));
        navigate('/');
      } else {
        const res = await authService.register(formData);
        alert(res.message || 'Εγγραφή επιτυχής');
        // Auto-login after successful registration to improve UX
        try {
          const loginRes = await authService.login(formData.email, formData.password);
          // store minimal user info locally
          localStorage.setItem('user', JSON.stringify({ email: formData.email }));
          // notify other components (Header) about auth change
          window.dispatchEvent(new Event('authChanged'));
          alert(loginRes.message || 'Σύνδεση επιτυχής');
          navigate('/');
        } catch (loginErr) {
          // If auto-login fails, switch to login view so user can try manually
          setIsLogin(true);
        }
      }
    } catch (err) {
      alert(err.message || 'Σφάλμα');
    }
  };

  return (
    <div style={{
      maxWidth: '500px',
      margin: '2rem auto',
      padding: '0 2rem'
    }}>
      <div style={{
        backgroundColor: '#1a1a1a',
        padding: '3rem 2rem',
        borderRadius: '12px',
        border: '1px solid #333'
      }}>
        <h1 style={{
          textAlign: 'center',
          color: '#f5c518',
          marginBottom: '2rem',
          fontSize: '2.5rem'
        }}>
          {isLogin ? 'Σύνδεση' : 'Εγγραφή'}
        </h1>

        <form onSubmit={handleSubmit}>
          {!isLogin && (
            <>
              <div style={{ marginBottom: '1rem' }}>
                <input
                  type="text"
                  name="firstName"
                  placeholder="Όνομα"
                  value={formData.firstName}
                  onChange={handleChange}
                  required={!isLogin}
                  style={{
                    width: '100%',
                    padding: '0.8rem',
                    borderRadius: '4px',
                    border: '1px solid #333',
                    backgroundColor: '#2d2d2d',
                    color: 'white',
                    fontSize: '1rem'
                  }}
                />
              </div>
              <div style={{ marginBottom: '1rem' }}>
                <input
                  type="text"
                  name="lastName"
                  placeholder="Επώνυμο"
                  value={formData.lastName}
                  onChange={handleChange}
                  required={!isLogin}
                  style={{
                    width: '100%',
                    padding: '0.8rem',
                    borderRadius: '4px',
                    border: '1px solid #333',
                    backgroundColor: '#2d2d2d',
                    color: 'white',
                    fontSize: '1rem'
                  }}
                />
              </div>
            </>
          )}

          <div style={{ marginBottom: '1rem' }}>
            <input
              type="email"
              name="email"
              placeholder="Διεύθυνση Email"
              value={formData.email}
              onChange={handleChange}
              required
              style={{
                width: '100%',
                padding: '0.8rem',
                borderRadius: '4px',
                border: '1px solid #333',
                backgroundColor: '#2d2d2d',
                color: 'white',
                fontSize: '1rem'
              }}
            />
          </div>

          <div style={{ marginBottom: '2rem' }}>
            <input
              type="password"
              name="password"
              placeholder="Κωδικός Πρόσβασης"
              value={formData.password}
              onChange={handleChange}
              required
              style={{
                width: '100%',
                padding: '0.8rem',
                borderRadius: '4px',
                border: '1px solid #333',
                backgroundColor: '#2d2d2d',
                color: 'white',
                fontSize: '1rem'
              }}
            />
          </div>

          <button
            type="submit"
            style={{
              width: '100%',
              backgroundColor: '#f5c518',
              color: '#000',
              padding: '1rem',
              border: 'none',
              borderRadius: '4px',
              fontSize: '1.1rem',
              fontWeight: 'bold',
              cursor: 'pointer',
              marginBottom: '1rem',
              transition: 'background-color 0.3s ease'
            }}
            onMouseOver={(e) => e.target.style.backgroundColor = '#ffdf6b'}
            onMouseOut={(e) => e.target.style.backgroundColor = '#f5c518'}
          >
            {isLogin ? 'Σύνδεση' : 'Δημιουργία Λογαριασμού'}
          </button>
        </form>

        <div style={{ textAlign: 'center' }}>
          <p style={{ color: '#ccc', marginBottom: '1rem' }}>
            {isLogin ? 'Δεν έχετε λογαριασμό;' : 'Έχετε ήδη λογαριασμό;'}
          </p>
          <button
            onClick={() => setIsLogin(!isLogin)}
            style={{
              background: 'none',
              border: 'none',
              color: '#f5c518',
              textDecoration: 'underline',
              cursor: 'pointer',
              fontSize: '1rem'
            }}
          >
            {isLogin ? 'Εγγραφή' : 'Σύνδεση'}
          </button>
        </div>
      </div>
    </div>
  );
};

export default Auth;