import React, { useState, useEffect } from 'react';
import { obtenirTousLesProjets, supprimerProjet } from '../services/apiProjets';  // Importation de la fonction de suppression

const ProjectManagement = () => {
  const [projects, setProjects] = useState([]);  // Initialisation de projects comme tableau vide
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchProjects = async () => {
        try {
          const data = await obtenirTousLesProjets();
          
          // Vérifiez si la propriété "projects" existe et est un tableau
          if (Array.isArray(data.projects)) {
            setProjects(data.projects);  // Utilisez data.projects pour accéder au tableau
          } else {
            setError('Les données récupérées ne contiennent pas de projet');
          }
        } catch (error) {
          setError('Erreur lors de la récupération des projets.');
        }
    };
    fetchProjects();
  }, []);

  const handleDeleteProject = async (id) => {
    try {
      const confirmation = window.confirm('Êtes-vous sûr de vouloir supprimer ce projet ?');
      if (!confirmation) return;
  
      const success = await supprimerProjet(id);
  
      if (success) {
        // Mettre à jour l'état des projets pour retirer celui qui a été supprimé
        setProjects(projects.filter(project => project._id !== id));
      }
    } catch (error) {
      console.error('Erreur lors de la suppression du projet:', error);
      setError('Erreur lors de la suppression du projet.');
    }
  };

  return (
    <>
      {/* Section avant la container */}
      <section id="list_projet" className="py-5 bg-dark text-white">
        <div className="container">
          <h1 className="display-4 text-center mb-4">Nos Projets</h1>
          <p className="lead text-center">Découvrez nos projets récents. Vous pouvez les gérer directement ci-dessous.</p>
        </div>
      </section>

      {/* Section principale de la gestion des projets */}
      <div className="container my-5">
        <h1 className="mb-4">Gestion des Projets</h1>

        {error && <div className="alert alert-danger">{error}</div>}

        <div className="card">
          <div className="card-body">
            <table className="table table-striped">
              <thead>
                <tr>
                  <th scope="col">ID</th>
                  <th scope="col">Nom du Projet</th>
                  <th scope="col">Actions</th>
                </tr>
              </thead>
              <tbody>
                {projects.length === 0 ? (
                  <tr>
                    <td colSpan="3" className="text-center">Aucun projet trouvé.</td>  {/* Affichage si aucun projet */}
                  </tr>
                ) : (
                  projects.map((project) => (
                    <tr key={project._id}>
                      <td>{project._id}</td>
                      <td>{project.title}</td>
                      <td>
                        <button
                          className="btn btn-warning"
                          onClick={() => console.log(`Modifier le projet ${project._id}`)}
                        >
                          Modifier
                        </button>
                        <button
                          className="btn btn-danger ms-2"
                          onClick={() => handleDeleteProject(project._id)}
                        >
                          Supprimer
                        </button>
                      </td>
                    </tr>
                  ))
                )}
              </tbody>
            </table>
          </div>
        </div>
      </div>
    </>
  );
};

export default ProjectManagement;
