import React, { useEffect, useState } from 'react';
import { motion } from 'framer-motion';
import icon_html5 from '../assets/images/html-5.svg'; 
import icon_css from '../assets/images/css-3.svg';
import icon_js from '../assets/images/javascript.svg';
import icon_react from '../assets/images/react.svg';
import icon_bootstrap from '../assets/images/bootstrap.svg';
import icon_git from '../assets/images/git.svg';
import icon_projets from '../assets/images/coordinateur.png';
import icon_cls_st from '../assets/images/client-satisfait.png';
import icon_augm from '../assets/images/augmenter.png';
import Education from '../components/Education';  // Capitalized to match React conventions
import Experience from '../components/Experience';  // Capitalized to match React conventions
import { obtenirTousLesProjets } from '../services/apiProjets';
import data from '../data/data.json';

const About = () => {

  const [educationItems, setEducationItems] = useState([]);
  const [experienceItems, setExperienceItems] = useState([]);
  const [projects, setProjects] = useState([]);
  const [completedProjectsCount, setCompletedProjectsCount] = useState(0);

  useEffect(() => {

    document.title = "À propos - Intégrateur Web";
    setEducationItems(data.education);
    setExperienceItems(data.experience);

     // Chargement des projets depuis l'API
    const fetchProjects = async () => {
      try {
        const response = await obtenirTousLesProjets();
        if (response && response.projects) {
          setProjects(response.projects);

          // Calculer le nombre de projets terminés
          const completed = response.projects.filter(project => project.stat === 'termine');
          setCompletedProjectsCount(completed.length);
        } else {
          console.error("Aucun projet trouvé.");
        }
      } catch (error) {
        console.error("Erreur lors du chargement des projets:", error);
      }
    };
    fetchProjects();

  }, []);

  return (
    <section className="about-section pt-5">
      <div className="container px-5">
        <motion.div
          initial={{ opacity: 0, y: 50 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
        >
          {/* Section titre */}
          <div className="row mb-5">
            <div className="col-md-8">
              <h1 className="display-4 text-gradient fw-bold mb-4">À propos de moi</h1>
              <p className="lead text-muted">
                Je suis un intégrateur web passionné, spécialisé dans la création de sites web modernes, performants et responsive. 
                Mon objectif est de transformer vos idées en expériences numériques interactives et esthétiques.
              </p>
              <p>
                Fort de plusieurs années d'expérience dans le domaine, j'ai travaillé avec divers outils et technologies pour offrir des solutions sur mesure à mes clients. 
                Mon engagement envers la qualité et la satisfaction client fait de moi un partenaire de confiance pour vos projets web.
              </p>
            </div>
            <div className="col-md-4 text-center d-none d-md-block">
            <div
      className="wow fadeInUp animated"
      data-wow-duration="1500ms"
      data-wow-delay="400ms"
      style={{ visibility: 'visible', animationDuration: '1500ms', animationDelay: '400ms', animationName: 'fadeInUp' }}
    >
      <div className="countbar-one">
        <div className="countbar-one__single">
          <a className="countbar-one__icon">
            <img src={icon_projets}/>
          </a>
          <div className="countbar-one__number count-box counted">
            <h4 className="count-text" data-stop="690" data-speed="1500">{completedProjectsCount}</h4>
            <span>Projets terminés</span>
          </div>
        </div>
        <div className="countbar-one__single">
          <a className="countbar-one__icon">
            <img src={icon_augm} />
          </a>
          <div className="countbar-one__number count-box counted">
            <h4 className="count-text" data-stop="8600" data-speed="1500">0</h4>
            <span>augmenter jusqu'à ce jour</span>
          </div>
        </div>
        <div className="countbar-one__single">
          <a className="countbar-one__icon">
            <img src={icon_cls_st} />
          </a>
          <div className="countbar-one__number count-box counted">
            <h4 className="count-text" data-stop="362" data-speed="1500">0</h4>
            <span>clients satisfaits</span>
          </div>
        </div>
      </div>
    </div>
            </div>
          </div>

          {/* Section compétences */}
          <div className="row mb-5">
            <div className="col-md-6">
              <h2 className="fw-bold mb-3">Mes Compétences</h2>
              <ul className="list-unstyled">
                <li className="mb-2">✔️ Intégration HTML/CSS avec Bootstrap</li>
                <li className="mb-2">✔️ Création de design responsive</li>
                <li className="mb-2">✔️ Animation web avec Framer Motion et GSAP</li>
                <li className="mb-2">✔️ Optimisation des performances et SEO</li>
                <li className="mb-2">✔️ Collaboration avec des designers et développeurs</li>
                <li className="mb-2">✔️ Gestion des projets web</li>
              </ul>
            </div>
            <div className="col-md-6">
              <h2 className="fw-bold mb-3">Outils et Technologies</h2>
              <div className="row text-center">
                <div className="col-4 mb-3">
                  <img src={icon_html5} alt="HTML" className="img-fluid" style={{ height: '50px' }} />
                  <p className="mt-2">HTML</p>
                </div>
                <div className="col-4 mb-3">
                  <img src={icon_css} alt="CSS" className="img-fluid" style={{ height: '50px' }} />
                  <p className="mt-2">CSS</p>
                </div>
                <div className="col-4 mb-3">
                  <img src={icon_js} alt="JavaScript" className="img-fluid" style={{ height: '50px' }} />
                  <p className="mt-2">JavaScript</p>
                </div>
                <div className="col-4 mb-3">
                  <img src={icon_react} alt="React" className="img-fluid" style={{ height: '50px' }} />
                  <p className="mt-2">React</p>
                </div>
                <div className="col-4 mb-3">
                  <img src={icon_bootstrap} alt="Bootstrap" className="img-fluid" style={{ height: '50px' }} />
                  <p className="mt-2">Bootstrap</p>
                </div>
                <div className="col-4 mb-3">
                  <img src={icon_git} alt="Git" className="img-fluid" style={{ height: '50px' }} />
                  <p className="mt-2">Git</p>
                </div>
              </div>
            </div>
          </div>

          {/* Section Parcours */}
          <div className="row">
            <div className="col-md-12">
              <h2 className="fw-bold mb-3">Mon Parcours</h2>
              <p>
                Après avoir obtenu un diplôme en développement web, j'ai travaillé sur de nombreux projets en tant qu'intégrateur web freelance.
                Ces projets m'ont permis de développer mes compétences techniques et de comprendre les besoins variés des clients.
              </p>
              <p>
                En dehors du travail, je me tiens constamment à jour avec les nouvelles tendances du développement web et participe activement à des communautés de développeurs.
              </p>
            </div>
          </div>

          {/* Section Education et Experience */}
          <Education items={educationItems} />
          <hr className="hr-dashed" />
          <Experience items={experienceItems} />
        </motion.div>
      </div>
    </section>
  );
};

export default About;