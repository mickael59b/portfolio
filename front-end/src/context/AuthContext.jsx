import React, { createContext, useState, useEffect, useContext } from 'react';

// Créer le contexte
const AuthContext = createContext();

// Fournisseur du contexte
export const AuthProvider = ({ children }) => {
  const [isAuthenticated, setIsAuthenticated] = useState(false);

  useEffect(() => {
    // Vérifier si un token est stocké dans localStorage
    const token = localStorage.getItem('token');
    if (token) {
      setIsAuthenticated(true);  // Utilisateur authentifié si le token existe
    }
  }, []);

  const login = (token) => {
    localStorage.setItem('token', token);  // Stocke le token dans localStorage
    setIsAuthenticated(true);  // Met à jour l'état d'authentification
  };

  const logout = () => {
    localStorage.removeItem('token');  // Supprime le token du localStorage
    setIsAuthenticated(false);  // Met à jour l'état d'authentification
  };

  return (
    <AuthContext.Provider value={{ isAuthenticated, login, logout }}>
      {children}
    </AuthContext.Provider>
  );
};

// Hook personnalisé pour accéder facilement au contexte
export const useAuth = () => useContext(AuthContext);

