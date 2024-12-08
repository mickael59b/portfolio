import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';

const Login = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  // Fonction de gestion de la connexion
  const handleLogin = async (e) => {
    e.preventDefault();
    setError('');
    setLoading(true);

    try {
      // Appel API pour vérifier les informations d'identification
      const response = await axios.post('http://localhost:5000/api/clients/login', {
        email,
        password,
      });

      // Stockage du jeton dans localStorage
      const { token } = response.data;
      localStorage.setItem('token', token);

      alert('Connexion réussie !');
      navigate('/dashboard'); // Redirection vers le dashboard
    } catch (err) {
      if (err.response && err.response.data) {
        // Erreur provenant de l'API
        setError(err.response.data.message || 'Erreur lors de la connexion.');
      } else {
        // Erreur réseau ou autre
        setError('Une erreur s’est produite. Veuillez réessayer.');
      }
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="d-flex justify-content-center align-items-center vh-100 bg-light">
      <div className="card p-4 shadow" style={{ width: '400px' }}>
        <h3 className="card-title text-center mb-4">Connexion</h3>
        {error && (
          <div className="alert alert-danger text-center" role="alert">
            {error}
          </div>
        )}
        <form onSubmit={handleLogin}>
          <div className="mb-3">
            <label htmlFor="email" className="form-label">
              Adresse Email
            </label>
            <input
              type="email"
              id="email"
              className="form-control"
              placeholder="Entrez votre email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
            />
          </div>
          <div className="mb-3">
            <label htmlFor="password" className="form-label">
              Mot de passe
            </label>
            <input
              type="password"
              id="password"
              className="form-control"
              placeholder="Entrez votre mot de passe"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
            />
          </div>
          <button type="submit" className="btn btn-primary w-100" disabled={loading}>
            {loading ? 'Connexion...' : 'Se connecter'}
          </button>
        </form>
        <div className="mt-3 text-center">
          <small>
            Pas encore de compte ?{' '}
            <a href="/register" className="text-primary">
              Inscrivez-vous
            </a>
          </small>
        </div>
      </div>
    </div>
  );
};

export default Login;
