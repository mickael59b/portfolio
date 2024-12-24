import React, { useEffect, useState } from 'react';
import { obtenirTousLesProjets } from '../services/apiProjets'; // Assurez-vous que cette fonction existe
import { Link } from 'react-router-dom';
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
                  className={`btn ${
                    selectedCategory === category ? 'btn-primary' : 'btn-outline-secondary'
                  }`}
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
              <a href={`/projects/${project._id}`} className="projet-one__single__img__link"></a>
            </div>
            <div className="projet-one__categories">
              <span className="posted_in">
                <a href="" rel="tag">{project.category}</a>
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
                <span className="time-remaining-desc">{project.daysRemaining}</span>
                <span className="time-remaining-name">days Remaining</span>
              </div>
            </div>
            <h4 className="projet-one__title">
              <a href={`/projects/${project._id}`}>{project.title}</a>
            </h4>
            <div className="projet-one__infu">
              <div className="projet-one__infu-wrap">
                <div className="projet-one__achive">
                  <div className="projet-one__achive-icon">
                    <a href="">
                      <span className="icon-mission"></span>
                    </a>
                  </div>
                  <div className="projet-one__achive-content">
                    <span className="projet-one__achive-level">Achive:</span>
                    <span className="projet-one__achive-vlaue">{project.raisedAmount}</span>
                  </div>
                </div>
                <div className="projet-one__goal">
                  <div className="projet-one__achive-icon">
                    <a href="">
                      <span className="icon-terget"></span>
                    </a>
                  </div>
                  <div className="projet-one__achive-content">
                    <span className="projet-one__achive-level">Goal:</span>
                    <span className="projet-one__achive-vlaue">{project.goalAmount}</span>
                  </div>
                </div>
              </div>
            </div>
          </div>
          <div className="projet-one__bottom">
            <div className="progress-box">
              <div className="progress-box__bar-text">Raised</div>
              <div className="progress-box__bar">
                <div
                  className="progress-box__bar__inner count-bar counted"
                  data-percent={`${(project.raisedAmount / project.goalAmount) * 100}%`}
                  style={{
                    width: `${(project.raisedAmount / project.goalAmount) * 100}%`,
                  }}
                ></div>
              </div>
              <div className="progress-box__bar-number count-box counted">
                <span className="count-text" data-stop="70" data-speed="1000">
                  {Math.round((project.raisedAmount / project.goalAmount) * 100)}
                </span>
                <span>%</span>
              </div>
            </div>
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
