import React from 'react';
import { useAuth } from '../context/AuthContext';

const Dashboard = () => {
  const { isAuthenticated, logout } = useAuth();

  if (!isAuthenticated) {
    return <div>Vous devez être connecté pour accéder au tableau de bord.</div>;
  }

  return (
    <div>
      <h1>Bienvenue sur votre Dashboard</h1>
      <button onClick={logout}>Se déconnecter</button>
    </div>
  );
};

export default Dashboard;

