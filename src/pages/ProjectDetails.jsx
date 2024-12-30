import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import { obtenirProjetParId } from '../services/apiProjets';
import 'bootstrap/dist/css/bootstrap.min.css';
import '../assets/css/projets.css'; // Importation du CSS personnalisé

const ProjectDetails = () => {
  const { id } = useParams();
  const [project, setProject] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchProject = async () => {
      try {
        const response = await obtenirProjetParId(id);
        setProject(response.project);
      } catch (error) {
        console.error('Erreur lors de la récupération du projet:', error);
        setError('Erreur lors de la récupération du projet');
      } finally {
        setLoading(false);
      }
    };

    fetchProject();
  }, [id]);

  if (loading) {
    return (
      <div className="text-center my-5">
        <div className="spinner-border text-primary" role="status"></div>
        <p>Chargement...</p>
      </div>
    );
  }

  if (error) {
    return (
      <div className="text-center my-5 text-danger">
        <p>{error}</p>
      </div>
    );
  }

  if (!project) {
    return (
      <div className="py-5 text-center my-5">
        <p>Projet introuvable.</p>
      </div>
    );
  }

  const { title, description, shortDescription, skills, category, createdAt, link, imageUrl } = project;

  const skillsArray = typeof skills === 'string' ? skills.split(',') : skills;

  return (
    <section className="project-details-section py-5">
      <div className="container">
        {/* Header Section */}
        <div className="row mb-5">
          <div className="col-12">
            <div className="project-header position-relative">
              <img src={imageUrl} alt="Project Header" className="img-fluid shadow-lg" />
              <div className="header-overlay d-flex justify-content-center align-items-center">
                <h1 className="text-white text-shadow">{title}</h1>
              </div>
            </div>
          </div>
        </div>

        {/* Project Information */}
        <div className="row mb-5">
          <div className="col-lg-8 mb-4">
            <div className="project-info">
              <p className="text-muted lead mb-4">{shortDescription}</p>

              {/* Skills Section */}
              <h5 className="text-primary mb-3">Compétences</h5>
              <ul className="list-unstyled mb-4 d-flex flex-wrap">
                {skillsArray.map((skill, index) => (
                  <li key={index} className="me-3 mb-2">
                    <span className="badge bg-info">{skill}</span>
                  </li>
                ))}
              </ul>

              <p className="text-muted">{description}</p>
            </div>
          </div>

          {/* Sidebar with Project Stats */}
          <div className="col-lg-4">
            <div className="card shadow-sm mb-4">
              <div className="card-body">
                <h4 className="text-center text-primary">Statistiques du Projet</h4>
                <div className="row">
                  {/* Statut du projet */}
                  <div className="col-6 mb-3">
                    <h5>Statut</h5>
                    <p className="text-muted">{project.stat ? project.stat : 'Non spécifié'}</p>
                  </div>

                  {/* Date de publication */}
                  <div className="col-6 mb-3">
                    <h5>Publié</h5>
                    <p className="text-muted">{new Date(project.createdAt).toLocaleDateString()}</p>
                  </div>

                  {/* Lien vers le projet */}
                  <div className="col-6 mb-3">
                    <h5>Lien</h5>
                    <a href={project.link} target="_blank" rel="noopener noreferrer" className="btn btn-outline-primary w-100">
                      Voir le Projet
                    </a>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default ProjectDetails;