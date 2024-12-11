import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom'; // Pour rediriger après déconnexion
import statisticsImage from '../assets/images/statistics.svg';  // Importation de l'image
import { getClientInfo } from '../services/apiClient'; // Assurez-vous d'avoir la fonction qui récupère les données de l'utilisateur connecté

const Dashboard = () => {
  const [userInfo, setUserInfo] = useState(null);
  const navigate = useNavigate();

  // Charger les informations de l'utilisateur lors du rendu du composant
  useEffect(() => {
    const fetchUserInfo = async () => {
      try {
        const token = localStorage.getItem('token');
        if (token) {
          const data = await getClientInfo(token); // Utilisez votre fonction pour récupérer les données utilisateur
          setUserInfo(data);
        } else {
          navigate('/login'); // Rediriger si pas de token
        }
      } catch (error) {
        console.error('Error fetching user info:', error);
        navigate('/login');
      }
    };
    fetchUserInfo();
  }, [navigate]);

  // Déconnexion de l'utilisateur
  const logout = () => {
    localStorage.removeItem('token');
    navigate('/login');
  };

  // Si l'utilisateur n'est pas encore chargé, afficher un message de chargement
  if (!userInfo) {
    return <div>Loading...</div>;
  }

  return (
    <div className="container my-5">
      <div className="row">
        {/* Sidebar - Menu dynamique en fonction du rôle */}
        <div className="col-md-3 col-lg-2 p-4 bg-light">
          <h3 className="text-primary">Menu</h3>
          <ul className="list-unstyled">
            <li><a href="#!" className="btn btn-link text-dark">Tableau de bord</a></li>
            {userInfo.role === 'admin' && (
              <>
                <li><a href="#!" className="btn btn-link text-dark">Gestion des utilisateurs</a></li>
                <li><a href="#!" className="btn btn-link text-dark">Paramètres</a></li>
                <li><a href="#!" className="btn btn-link text-dark">Rapports</a></li>
              </>
            )}
            {userInfo.role === 'client' && (
              <>
                <li><a href="#!" className="btn btn-link text-dark">Profil</a></li>
                <li><a href="#!" className="btn btn-link text-dark">Paramètres</a></li>
              </>
            )}
          </ul>
          <hr />
          <button className="btn btn-danger w-100" onClick={logout}>Se déconnecter</button>
        </div>

        {/* Contenu principal du tableau de bord */}
        <div className="col-md-9 col-lg-10">
          <div className="container">
            {/* Carte principale du dashboard */}
            <div className="card card-waves mb-4">
              <div className="card-body p-5">
                <div className="row align-items-center justify-content-between">
                  <div className="col">
                    <h2 className="text-primary">Bienvenue, votre tableau de bord est prêt !</h2>
                    <p className="text-gray-700">
                      Bonjour {userInfo.name}, voici votre tableau de bord. Utilisez les sections de gauche pour naviguer.
                    </p>
                    <a className="btn btn-primary p-3" href="#!">
                      Commencer
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
                        className="feather feather-arrow-right ms-1"
                      >
                        <line x1="5" y1="12" x2="19" y2="12"></line>
                        <polyline points="12 5 19 12 12 19"></polyline>
                      </svg>
                    </a>
                  </div>
                  <div className="col d-none d-lg-block mt-xxl-n4">
                    {/* Image d'illustration */}
                    <img className="img-fluid px-xl-4 mt-xxl-n5" src={statisticsImage} alt="Dashboard Illustration" />
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Dashboard;
