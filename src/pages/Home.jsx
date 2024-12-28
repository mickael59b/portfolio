import React, { useEffect } from 'react';
import { Link } from 'react-router-dom';
import { Helmet } from 'react-helmet';
import { useTypewriter, Cursor } from 'react-simple-typewriter'; // Importation du composant Typewriter
import Profile_img from '../assets/images/profile.webp'; // Image du profil
import icon_html5 from '../assets/images/html-5.webp'; 
import icon_css from '../assets/images/css-3.webp';
import icon_js from'../assets/images/javascript.webp';
import icon_react from '../assets/images/react.webp';
import '../assets/css/home.css'; // Vos styles personnalisés

const Home = () => {
  useEffect(() => {
  }, []);
  const [text] = useTypewriter({
    words: ['PHP', 'REACT', 'HTML', 'CSS'],
    loop: 0
  });

  return (
    <div>
      <Helmet>
        {/* Titre de la page */}
          <title>Portfolio Intégrateur Web | Développement Moderne & Créatif</title>

        {/* Description de la page */}
        <meta
          name="description"
          content="Découvrez mon portfolio en tant qu'intégrateur web. Je conçois des interfaces modernes, performantes et accessibles pour vos projets numériques."
        />
      </Helmet>
      {/* Section d'Accueil */}
      <section className="py-5 home-section">
        <div className="container px-5 pb-5">
          <div className="row gx-5 align-items-center">
            {/* Section Texte */}
            <div className="col-lg-6">
              <div className="text-center text-lg-start">
                <h2 className="fs-2 fw-bold text-primary mb-3">
                  Bienvenue sur mon portfolio
                </h2>
                <h1 className="display-4 fw-bolder mb-4">
                  <span className="text-gradient d-inline">Intégrateur Web</span><br />
                  {text}
                  <Cursor />
                </h1>
                <p className="fs-5 text-muted mb-4">
                  Passionné par le développement web, je conçois des interfaces modernes, accessibles et performantes.
                  Explorez mes réalisations et découvrez comment je peux transformer vos idées en expériences numériques.
                </p>
                <div className="d-flex gap-3 justify-content-center justify-content-lg-start mb-4">
                  <a className="btn btn-primary btn-lg px-4 py-2" href="/resume">Télécharger mon CV</a>
                  <Link to="/projects" className="btn btn-outline-dark btn-lg px-4 py-2">Voir les projets</Link>
                </div>
              </div>
            </div>

            {/* Section Image */}
            <div className="col-lg-6">
              <div className="text-center">
                <div className="profile bg-gradient-primary-to-secondary p-4 shadow">
                  <img className="profile-img" src={Profile_img} alt="Profil" />
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Section 'Informations personnelles' */}
      <section className="section" id="about">
        <div className="container">
          <div className="row align-items-center">
            <div className="col-lg-6 align-self-center">
              <h5 className="fs-24 text-dark fw-medium"><mark>Informations personnelles</mark></h5>
              <h4 className="fw-normal lh-base text-gray-700 mb-4 fs-20">
                Développeur passionné par la création de sites et applications web modernes, performants et responsives.
                Vous pouvez découvrir ici mon parcours et mes compétences.
              </h4>
            </div>

            {/* Liste des Informations Personnelles */}
            <div className="col-lg-5 ms-auto align-self-center">
              <div className="mb-5 mb-lg-0">
                <p className="mb-2">
                  <span className="personal-detail-title">Date de naissance</span>
                  <span className="personal-detail-info">17 juillet 1987</span>
                </p>
                <p className="mb-2">
                  <span className="personal-detail-title">Langues parlées</span>
                  <span className="personal-detail-info">Français</span>
                </p>
                <p className="mb-2">
                  <span className="personal-detail-title">Nationalité</span>
                  <span className="personal-detail-info">Française</span>
                </p>
                <p className="mb-2">
                  <span className="personal-detail-title">Centres d’intérêt</span>
                  <span className="personal-detail-info">Musique, Lecture, Voyages</span>
                </p>
              </div>
            </div>

            {/* Section Compétences */}
            <div className="col-12 mt-5">
              <div className="d-flex flex-wrap justify-content-center mt-4 mt-md-5">
                <div className="mx-3 ms-sm-0 ms-sm-0 mb-3 card-bg rounded p-1 pe-3 p-md-3 pe-md-4 shadow-sm">
                  <div className="d-flex align-items-center">
                    <div className="thumb-md d-flex flex-wrap justify-content-center align-items-center">
                      <img src={icon_html5} alt="HTML5" height="34" />
                    </div>
                    <div className="ms-3">
                      <h6 className="mb-0 fw-medium text-gray-700">HTML5</h6>
                      <p className="text-muted mb-0 fs-12">3 ans d'expérience</p>
                    </div>
                  </div>
                </div>
                <div className="mx-3 ms-sm-0 ms-sm-0 mb-3 card-bg rounded p-1 pe-3 p-md-3 pe-md-4 shadow-sm">
                  <div className="d-flex align-items-center">
                    <div className="thumb-md d-flex flex-wrap justify-content-center align-items-center">
                      <img src={icon_css} alt="CSS3" height="34" />
                    </div>
                    <div className="ms-3">
                      <h6 className="mb-0 fw-medium text-gray-700">CSS3</h6>
                      <p className="text-muted mb-0 fs-12">3 ans d'expérience</p>
                    </div>
                  </div>
                </div>
                <div className="mx-3 ms-sm-0 ms-sm-0 mb-3 card-bg rounded p-1 pe-3 p-md-3 pe-md-4 shadow-sm">
                  <div className="d-flex align-items-center">
                    <div className="thumb-md d-flex flex-wrap justify-content-center align-items-center">
                      <img src={icon_js} alt="JavaScript" height="34" />
                    </div>
                    <div className="ms-3">
                      <h6 className="mb-0 fw-medium text-gray-700">JavaScript</h6>
                      <p className="text-muted mb-0 fs-12">2 ans d'expérience</p>
                    </div>
                  </div>
                </div>
                <div className="mx-3 ms-sm-0 ms-sm-0 mb-3 card-bg rounded p-1 pe-3 p-md-3 pe-md-4 shadow-sm">
                  <div className="d-flex align-items-center">
                    <div className="thumb-md d-flex flex-wrap justify-content-center align-items-center">
                      <img src={icon_react} alt="React" height="34" />
                    </div>
                    <div className="ms-3">
                      <h6 className="mb-0 fw-medium text-gray-700">React</h6>
                      <p className="text-muted mb-0 fs-12">1 an d'expérience</p>
                    </div>
                  </div>
                </div>
                {/* Ajouter d'autres compétences ici */}
              </div>
            </div>
          </div>
        </div>
      </section>
      <section className="section bg-gradient-light-white" id="services">
  <div className="container">
    {/* Header de la section */}
    <div className="row justify-content-center mb-4">
      <div className="col-12 col-md-10 col-lg-7 text-center position-relative">
        <span className="badge badge-lg rounded bg-soft-alt-success fw-normal fs-13 text-uppercase">Services</span>
        <h2 className="fs-2 fw-medium lh-1 text-dark my-3 position-relative z-i-2">Mes Services d'Intégration Web</h2>
        <div className="bg-text">
          <h1 className="fw-bold p-0">Services</h1>
        </div>
        <p className="text-gray-700 fs-18 fs-lg mb-4 mb-md-5 lh-lg">
          Je propose une gamme complète de services pour transformer vos idées en expériences web exceptionnelles, alliant design, performance et visibilité.
        </p>
      </div>
    </div>

    {/* Liste des Services */}
    <div className="row">
      {/* Service : Intégration HTML/CSS */}
      <div className="col-lg-4 col-md-6 mt-4 pt-2">
        <div className="card service rounded shadow">
          <div className="card-body">
            <div className="d-flex align-items-center">
              <i className="fa fa-code fa-2x text-primary"></i> {/* Icône */}
              <h5 className="mt-3 mb-3 ms-3">Intégration HTML/CSS</h5> {/* Titre */}
            </div>
            <p className="text-muted mb-0">
              Création de sites web modernes et accessibles en utilisant HTML5 et CSS3, avec un code propre et conforme aux standards du web.
            </p>
          </div>
        </div>
      </div>

      {/* Service : Développement interactif avec JavaScript */}
      <div className="col-lg-4 col-md-6 mt-4 pt-2">
        <div className="card service rounded shadow">
          <div className="card-body">
            <div className="d-flex align-items-center">
              <i className="fa fa-laptop-code fa-2x text-primary"></i> {/* Icône */}
              <h5 className="mt-3 mb-3 ms-3">Développement interactif avec JavaScript</h5> {/* Titre */}
            </div>
            <p className="text-muted mb-0">
              Intégration d'interactivités et de fonctionnalités dynamiques grâce à JavaScript, pour améliorer l'expérience utilisateur sur vos sites web.
            </p>
          </div>
        </div>
      </div>

      {/* Service : Intégration avec React */}
      <div className="col-lg-4 col-md-6 mt-4 pt-2">
        <div className="card service service rounded shadow">
          <div className="card-body">
            <div className="d-flex align-items-center">
              <i className="fa fa-cogs fa-2x text-primary"></i> {/* Icône */}
              <h5 className="mt-3 mb-3 ms-3">Intégration avec React</h5> {/* Titre */}
            </div>
            <p className="text-muted mb-0">
              Utilisation du framework React pour créer des interfaces utilisateurs modernes, réactives et efficaces.
            </p>
          </div>
        </div>
      </div>

      {/* Service : Responsive Web Design */}
      <div className="col-lg-4 col-md-6 mt-4 pt-2">
        <div className="card service rounded shadow">
          <div className="card-body">
            <div className="d-flex align-items-center">
              <i className="fa fa-mobile-alt fa-2x text-primary"></i> {/* Icône */}
              <h5 className="mt-3 mb-3 ms-3">Responsive Web Design</h5> {/* Titre */}
            </div>
            <p className="text-muted mb-0">
              Création de sites web adaptatifs et optimisés pour tous les appareils, garantissant une expérience fluide sur mobile, tablette et desktop.
            </p>
          </div>
        </div>
      </div>

      {/* Service : Optimisation des Performances */}
      <div className="col-lg-4 col-md-6 mt-4 pt-2">
        <div className="card service rounded shadow">
          <div className="card-body">
            <div className="d-flex align-items-center">
              <i className="fa fa-tachometer-alt fa-2x text-primary"></i> {/* Icône */}
              <h5 className="mt-3 mb-3 ms-3">Optimisation des Performances</h5> {/* Titre */}
            </div>
            <p className="text-muted mb-0">
              Amélioration de la vitesse de chargement et de la réactivité des sites web grâce à des techniques d'optimisation comme le lazy loading et la compression.
            </p>
          </div>
        </div>
      </div>

      {/* Service : SEO (Optimisation pour les moteurs de recherche) */}
      <div className="col-lg-4 col-md-6 mt-4 pt-2">
        <div className="card service rounded shadow">
          <div className="card-body">
            <div className="d-flex align-items-center">
              <i className="fa fa-search fa-2x text-primary"></i> {/* Icône */}
              <h5 className="mt-3 mb-3 ms-3">SEO - Optimisation pour les moteurs de recherche</h5> {/* Titre */}
            </div>
            <p className="text-muted mb-0">
              Optimisation des sites web pour le SEO afin d'améliorer leur visibilité sur les moteurs de recherche et d'attirer plus de trafic organique.
            </p>
          </div>
        </div>
      </div>       
    </div>
  </div>
</section>
    </div>
  );
};

export default Home;