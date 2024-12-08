import React from 'react';
import { useAuth } from '../context/AuthContext';
import statisticsImage from '../assets/images/statistics.svg';  // Importation de l'image

const Dashboard = () => {
  const { isAuthenticated, logout } = useAuth();

  if (!isAuthenticated) {
    return <div>Vous devez être connecté pour accéder au tableau de bord.</div>;
  }

  return (
    <div className="container my-5">
      <div className="row">
        {/* Sidebar - Menu à gauche */}
        <div className="col-md-3 col-lg-2 p-4 bg-light">
          <h3 className="text-primary">Menu</h3>
          <ul className="list-unstyled">
            <li><a href="#!" className="btn btn-link text-dark">Tableau de bord</a></li>
            <li><a href="#!" className="btn btn-link text-dark">Ventes</a></li>
            <li><a href="#!" className="btn btn-link text-dark">Produits</a></li>
            <li><a href="#!" className="btn btn-link text-dark">Rapports</a></li>
            <li><a href="#!" className="btn btn-link text-dark">Paramètres</a></li>
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
                    <h2 className="text-primary">Welcome back, your dashboard is ready!</h2>
                    <p className="text-gray-700">
                      Great job, your affiliate dashboard is ready to go! You can view sales, generate links, prepare coupons, and download affiliate reports using this dashboard.
                    </p>
                    <a className="btn btn-primary p-3" href="#!">
                      Get Started
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
                    {/* Utilisation de l'image importée */}
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
