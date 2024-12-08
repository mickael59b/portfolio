import React, { useState, useEffect, useMemo } from "react";
import axios from "axios";
import '../assets/css/projets.css';

// Composant pour afficher chaque projet
const ProjectItem = ({ project }) => (
  <div className={`col-lg-4 col-md-6 projects-item isotope-item ${project.category}`}>
    <div className="projects-content h-100">
      <img
        src={project.image}
        className="img-fluid"
        alt={`Aperçu du projet ${project.name}`}
      />
      <div className="projects-info">
        <h4>{project.name}</h4>
        <p>{project.description}</p>
        <div>
          <a
            href={project.image}
            title={`Aperçu du projet ${project.name}`}
            data-gallery="portfolio-gallery"
            className="glightbox preview-link"
            aria-label={`Voir l'aperçu de ${project.name}`}
          >
            <i className="bi bi-zoom-in"></i>
          </a>
          <a
            href={`/project-details/${project.id}`}  // Lien dynamique vers une page de détails de projet
            title="Plus de détails"
            className="details-link"
            aria-label={`Plus de détails sur le projet ${project.name}`}
          >
            <i className="bi bi-link-45deg"></i>
          </a>
        </div>
      </div>
    </div>
  </div>
);

const Projects = () => {
  const [projects, setProjects] = useState([]);
  const [categories, setCategories] = useState([]);
  const [activeFilter, setActiveFilter] = useState("*");
  const [loading, setLoading] = useState(true);

  // Récupérer les projets et les catégories depuis l'API
  useEffect(() => {
    const fetchProjects = async () => {
      try {
        const response = await axios.get("http://localhost:5000/api/projects");
        const projectsData = response.data || [];
        setProjects(projectsData);

        // Extraire les catégories uniques
        const uniqueCategories = [
          ...new Set(
            projectsData
              .map((project) => project.category)
              .filter((category) => category) // Filtrer les catégories nulles ou vides
          ),
        ];
        setCategories(uniqueCategories);
      } catch (error) {
        // Afficher l'erreur plus détaillée
        console.error("Erreur lors de la récupération des projets:", error.response || error.message);
        setProjects([]);  // Assurez-vous de gérer l'état de l'erreur proprement
      } finally {
        setLoading(false);
      }
    };

    fetchProjects();
  }, []);

  // Mémoïsation du filtrage des projets
  const filteredProjects = useMemo(() => {
    return activeFilter === "*"
      ? projects
      : projects.filter((project) => project.category === activeFilter);
  }, [projects, activeFilter]);

  // Gérer le changement de filtre
  const handleFilterChange = (filter) => {
    setLoading(true);
    setActiveFilter(filter);
    setTimeout(() => setLoading(false), 300); // Simule un temps de chargement
  };

  return (
    <section id="projects" className="projects-section section">
      <div className="container">
        <div className="row align-items-center">
          <div className="col-lg-7 projects-info">
            <h3>Mes Projets</h3>
            <p>Découvrez les projets sur lesquels j'ai travaillé dans différentes catégories.</p>
          </div>
          <div className="col-lg-5 text-center text-lg-end">
            <ul className="projects-filters isotope-filters" data-aos="fade-up" data-aos-delay="100">
              <li
                onClick={() => handleFilterChange("*")}
                className={activeFilter === "*" ? "filter-active" : ""}
              >
                Tous
              </li>
              {categories.map((category, index) => (
                <li
                  key={index}
                  onClick={() => handleFilterChange(category)}
                  className={activeFilter === category ? "filter-active" : ""}
                >
                  {category}
                </li>
              ))}
            </ul>
          </div>
        </div>

        <div className="row gy-4 isotope-container" data-aos="fade-up" data-aos-delay="200">
          {loading ? (
            <p className="loading">Chargement des projets...</p>
          ) : filteredProjects.length > 0 ? (
            filteredProjects.map((project, index) => (
              <ProjectItem key={index} project={project} />
            ))
          ) : (
            <p className="no-projects">Aucun projet trouvé pour cette catégorie.</p>
          )}
        </div>
      </div>
    </section>
  );
};

export default Projects;

