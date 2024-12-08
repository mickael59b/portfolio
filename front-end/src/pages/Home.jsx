import React, { useEffect } from 'react';
import Profile_img from '../assets/images/profile.png';  // Assurez-vous que l'image existe à cet emplacement
import '../assets/css/home.css';

const Home = () => {
  useEffect(() => {
    document.title = "Accueil - Mon Portfolio";  // Modifie le titre de l'onglet
  }, []);

  return (
    <section className="py-5">
      <div className="container px-5 pb-5">
        <div className="row gx-5 align-items-center">
          <div className="col-xxl-5">
            {/* Texte de la section */}
            <div className="text-center text-xxl-start">
              <div className="badge bg-gradient-primary-to-secondary text-white mb-4">
                <div className="text-uppercase">Design &middot; Development &middot; Marketing</div>
              </div>
              <div className="fs-3 fw-light text-muted">I can help your business to</div>
              <h1 className="display-3 fw-bolder mb-5">
                <span className="text-gradient d-inline">Get online and grow fast</span>
              </h1>
              <div className="d-grid gap-3 d-sm-flex justify-content-sm-center justify-content-xxl-start mb-3">
                <a className="btn btn-primary btn-lg px-5 py-3 me-sm-3 fs-6 fw-bolder" href="/resume">Resume</a>
                <a className="btn btn-outline-dark btn-lg px-5 py-3 fs-6 fw-bolder" href="/projects">Projects</a>
              </div>
            </div>
          </div>
          <div className="col-xxl-7">
            {/* Image de profil et éléments décoratifs */}
            <div className="d-flex justify-content-center mt-5 mt-xxl-0">
              <div className="profile bg-gradient-primary-to-secondary p-3">
                <img className="profile-img" src={Profile_img} alt="Profile" />
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Home;
