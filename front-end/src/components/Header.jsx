import React, { useEffect, useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import '../assets/css/header.css';

const Header = () => {
  const [user, setUser] = useState(null);
  const navigate = useNavigate();

  // Vérifie si l'utilisateur est connecté
  const isAuthenticated = !!localStorage.getItem('token');

  // Récupère les informations de l'utilisateur
  useEffect(() => {
    const fetchUserInfo = async () => {
      const token = localStorage.getItem('token');
      if (!token) return;

      try {
        const response = await fetch('http://localhost:5000/api/clients/getClientInfo', {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        });
        const data = await response.json();
        if (response.ok) {
          setUser(data); // Enregistre les données utilisateur (nom, avatar, email)
        } else {
          console.error('Erreur:', data.message);
        }
      } catch (error) {
        console.error('Erreur de connexion au serveur:', error);
      }
    };

    if (isAuthenticated) {
      fetchUserInfo();
    }
  }, [isAuthenticated]);

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

          {isAuthenticated && user ? (
            <div className="dropdown text-end">
              <a
                href="#"
                className="d-block link-dark text-decoration-none dropdown-toggle"
                id="dropdownUser1"
                data-bs-toggle="dropdown"
                aria-expanded="false"
              >
                <img
                  src={user.avatar || 'https://acti-informatique.com/web-core/uploads/avatar/default-avatar.png'}
                  alt="Avatar"
                  width="32"
                  height="32"
                  className="avatar rounded-2"
                /> <user className="name">{user.name}</user>
              </a>
              <ul className="dropdown-menu text-small" aria-labelledby="dropdownUser1">
                <li>
                  <a className="dropdown-item" href="#">New project...</a>
                </li>
                <li>
                  <a className="dropdown-item" href="#">Settings</a>
                </li>
                <li>
                  <a className="dropdown-item" href="#">Profile</a>
                </li>
                <li>
                  <hr className="dropdown-divider" />
                </li>
                <li>
                  <a className="dropdown-item" href="#" onClick={handleLogout}>
                    Sign out
                  </a>
                </li>
              </ul>
            </div>
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
