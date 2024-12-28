import React, { useEffect, useState } from 'react';
import { Helmet } from 'react-helmet';
import { obtenirTousLesProjets } from '../services/apiProjets'; // Assurez-vous que cette fonction existe
import { Link } from 'react-router-dom'; // Importation du composant Link
import '../assets/css/projets.css';

const ProjectsPage = () => {
  const [projects, setProjects] = useState([]);
  const [filteredProjects, setFilteredProjects] = useState([]);
  const [categories, setCategories] = useState([]);
  const [loading, setLoading] = useState(true);
  const [selectedCategory, setSelectedCategory] = useState('All');
  const [currentPage, setCurrentPage] = useState(1);
  const projectsPerPage = 6;

  const filterProjectsByCategory = (category) => {
    setSelectedCategory(category);
    setCurrentPage(1);
    setFilteredProjects(
      category === 'All' ? projects : projects.filter((p) => p.category === category)
    );
  };

  const calculateTimeElapsed = (createdAt) => {
    const creationDate = new Date(createdAt);
    const currentDate = new Date();
    const differenceInTime = currentDate.getTime() - creationDate.getTime();
  
    const years = Math.floor(differenceInTime / (1000 * 60 * 60 * 24 * 365));
    const months = Math.floor((differenceInTime % (1000 * 60 * 60 * 24 * 365)) / (1000 * 60 * 60 * 24 * 30));
    const days = Math.floor((differenceInTime % (1000 * 60 * 60 * 24 * 30)) / (1000 * 60 * 60 * 24));
    const hours = Math.floor((differenceInTime % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
    const minutes = Math.floor((differenceInTime % (1000 * 60 * 60)) / (1000 * 60));
  
    let timeText = '';
    let detailText = '';
  
    if (years > 0) {
      timeText = `${years}`;
      detailText = `${years > 1 ? 'ans' : 'an'}, ${months} mois`;
    } else if (months > 0) {
      timeText = `${months}`;
      detailText = `${months > 1 ? 'mois' : 'mois'}, ${days} ${days > 1 ? 'jours' : 'jour'}`;
    } else if (days > 0) {
      timeText = `${days}`;
      detailText = `${days > 1 ? 'jours' : 'jour'}, ${hours} ${hours > 1 ? 'heures' : 'heure'}`;
    } else if (hours > 0) {
      timeText = `${hours}`;
      detailText = `${hours > 1 ? 'heures' : 'heure'}, ${minutes} ${minutes > 1 ? 'minutes' : 'minute'}`;
    } else {
      timeText = `${minutes}`;
      detailText = `${minutes > 1 ? 'minutes' : 'minute'}`;
    }
  
    return { timeText, detailText };
  };

  useEffect(() => {
    const fetchProjectsAndCategories = async () => {
      setLoading(true);
      try {
        const responseProjets = await obtenirTousLesProjets();
        if (responseProjets.success) {
          setProjects(responseProjets.projects);
          setFilteredProjects(responseProjets.projects);
        }

        const responseCategories = await fetch(
          'https://api.acti-informatique.com/projects/categories'
        );
        const categoriesData = await responseCategories.json();
        setCategories(['All', ...categoriesData]);
      } catch (error) {
        console.error(error);
      }
      setLoading(false);
    };

    fetchProjectsAndCategories();
  }, []);

  const indexOfLastProject = currentPage * projectsPerPage;
  const indexOfFirstProject = indexOfLastProject - projectsPerPage;
  const currentProjects = filteredProjects.slice(indexOfFirstProject, indexOfLastProject);

  const totalPages = Math.ceil(filteredProjects.length / projectsPerPage);

  const handlePageChange = (pageNumber) => {
    setCurrentPage(pageNumber);
  };

  if (loading) {
    return <div className="text-center py-5">Chargement des projets...</div>;
  }

  return (
    <section className="py-5 bg-light">
      <div className="container">
        {/* Helmet pour le titre et les meta informations */}
        <Helmet>
          <title>Projets - Intégrateur Web</title>
          <meta name="description" content="Explorez une sélection de projets réalisés par notre équipe." />
        </Helmet>

        {/* Filtres */}
        <div className="row mb-4">
          <div className="col-md-8">
            <h3 className="text-secondary">Explorez les Projets</h3>
            <p>Découvrez une variété de projets adaptés à différentes catégories</p>
          </div>
          <div className="col-md-4 text-md-end text-center">
            <div className="btn-group">
              {categories.map((category, index) => (
                <button
                  key={index}
                  className={`btn ${selectedCategory === category ? 'btn-primary' : 'btn-outline-secondary'}`}
                  onClick={() => filterProjectsByCategory(category)}
                >
                  {category}
                </button>
              ))}
            </div>
          </div>
        </div>

        {/* Grille des projets */}
        <div className="row g-4">
          {currentProjects.length > 0 ? (
            currentProjects.map((project) => (
              <div className="col-md-6 col-lg-4 col-sm-12" key={project._id}>
                <div className="projet-one__single wow fadeInUp animated">
                  <div className="projet-one__img__wrapper">
                    <div className="projet-one__img">
                      {project.imageUrl && (
                        <img
                          src={project.imageUrl}
                          alt={project.title}
                          className="card-img-top"
                        />
                      )}
                      <Link to={`/project/${project._id}`} className="projet-one__single__img__link"></Link>
                    </div>
                    <div className="projet-one__categories">
                      <span className="posted_in">
                        <Link to="#" rel="tag">{project.category}</Link>
                      </span>
                    </div>
                    <div className="projet-one__love">
                      <i className="fa-regular fa-heart"></i>
                    </div>
                  </div>
                  <div className="projet-one__content">
                    <div className="projet-one__time-remaining">
                      <div className="time-remaining">
                        <i className="fa-solid fa-clock"></i>
                        <span className="time-remaining-desc">{calculateTimeElapsed(project.createdAt).timeText}</span>
                        <span className="time-remaining-name">{calculateTimeElapsed(project.createdAt).detailText}</span>
                      </div>
                    </div>
                    <h4 className="projet-one__title">
                      <Link to={`/projects/${project._id}`}>{project.title}</Link>
                    </h4>
                  </div>
                </div>
              </div>
            ))
          ) : (
            <div className="col-12 text-center">
              <p className="text-muted">Aucun projet trouvé dans cette catégorie.</p>
            </div>
          )}
        </div>

        {/* Pagination */}
        <nav aria-label="Pagination" className="mt-4">
          <ul className="pagination justify-content-center">
            {[...Array(totalPages).keys()].map((page) => (
              <li
                key={page}
                className={`page-item ${currentPage === page + 1 ? 'active' : ''}`}
              >
                <button className="page-link" onClick={() => handlePageChange(page + 1)}>
                  {page + 1}
                </button>
              </li>
            ))}
          </ul>
        </nav>
      </div>
    </section>
  );
};

export default ProjectsPage;
