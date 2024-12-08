import React from 'react';
import { Link, useNavigate } from 'react-router-dom';

const Header = () => {
  const navigate = useNavigate();

  // Vérifie si l'utilisateur est connecté
  const isAuthenticated = !!localStorage.getItem('token');

  // Gère la déconnexion
  const handleLogout = () => {
    localStorage.removeItem('token'); // Supprime le token
    navigate('/login'); // Redirige vers la page de connexion
  };

  return (
    <nav className="navbar navbar-expand-lg navbar-light bg-white py-3 border-bottom">
      <div className="container px-5">
        <span className="navbar-brand">
          <Link to="/" className="fw-bolder text-primary">
            Mickael Boutte
          </Link>
          {' | '}
          <span className="text-gradient d-inline">
            Créateur de{' '}
            <a href="https://acti-informatique.com" target="_blank" rel="noopener noreferrer">
              Acti-Informatique
            </a>
          </span>
        </span>
        <button
          className="navbar-toggler"
          type="button"
          data-bs-toggle="collapse"
          data-bs-target="#navbarSupportedContent"
          aria-controls="navbarSupportedContent"
          aria-expanded="false"
          aria-label="Toggle navigation"
        >
          <span className="navbar-toggler-icon"></span>
        </button>
        <div className="collapse navbar-collapse" id="navbarSupportedContent">
          <ul className="navbar-nav ms-auto mb-2 mb-lg-0 small fw-bolder">
            <li className="nav-item">
              <Link className="nav-link" to="/">
                Home
              </Link>
            </li>
            <li className="nav-item">
              <Link className="nav-link" to="/about">
                About
              </Link>
            </li>
            <li className="nav-item">
              <Link className="nav-link" to="/projects">
                Projects
              </Link>
            </li>
            <li className="nav-item">
              <Link className="nav-link" to="/contact">
                Contact
              </Link>
            </li>
          </ul>
          {isAuthenticated ? (
            <button
              className="btn fw-500 ms-lg-4 btn-danger"
              onClick={handleLogout}
            >
              Déconnexion
              <svg
                xmlns="http://www.w3.org/2000/svg"
                width="24"
                height="24"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth="2"
                strokeLinecap="round"
                strokeLinejoin="round"
                className="feather feather-log-out ms-2"
              >
                <path d="M9 21V16.2C9 15.1 9.9 14 11 14h1"></path>
                <polyline points="17 17 21 12 17 7"></polyline>
                <line x1="21" y1="12" x2="9" y2="12"></line>
              </svg>
            </button>
          ) : (
            <Link className="btn fw-500 ms-lg-4 btn-primary" to="/login">
              Connexion
              <svg
                xmlns="http://www.w3.org/2000/svg"
                width="24"
                height="24"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth="2"
                strokeLinecap="round"
                strokeLinejoin="round"
                className="feather feather-log-in ms-2"
              >
                <path d="M15 3H21V9"></path>
                <polyline points="10 17 15 12 10 7"></polyline>
                <line x1="15" y1="12" x2="3" y2="12"></line>
              </svg>
            </Link>
          )}
        </div>
      </div>
    </nav>
  );
};

export default Header;

