import React from 'react';
import { BrowserRouter as Router } from 'react-router-dom';
import { AuthProvider } from './context/AuthContext'; // Import du fournisseur de contexte
import Header from './components/Header';
import Footer from './components/Footer';
import AppRoutes from './routes/AppRoutes'; // Importation des routes

const App = () => {
  return (
    <AuthProvider>
      <Router>
        <Header />
        <AppRoutes /> {/* Utilisation des routes depuis AppRoutes.jsx */}
        <Footer />
      </Router>
    </AuthProvider>
  );
};

export default App;