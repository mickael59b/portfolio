// src/pages/NotFound.jsx
import React from 'react';
import { Link } from 'react-router-dom';

const NotFound = () => {
  return (
    <div className="container d-flex align-items-center justify-content-center vh-100">
      <div className="text-center">
        <img
          src="https://via.placeholder.com/400x300?text=404+Illustration"
          alt="404 Illustration"
          className="img-fluid mb-4"
          style={{ maxWidth: '400px' }}
        />
        <h1 className="display-3 fw-bold text-danger">404</h1>
        <h2 className="fw-bold mb-3">Oops! Page introuvable</h2>
        <p className="text-muted mb-4">
          La page que vous recherchez n'existe pas ou a été déplacée.
        </p>
        <Link to="/" className="btn btn-lg btn-primary px-5">
          Retour à l'accueil
        </Link>
      </div>
    </div>
  );
};

export default NotFound;

