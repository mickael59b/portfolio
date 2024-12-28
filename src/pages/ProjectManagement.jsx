import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { obtenirTousLesProjets, supprimerProjet, mettreAJourProjet } from '../services/apiProjets';
import { uploaderImage } from '../services/apiProjets';

const ErrorMessage = ({ message }) => (
  <div className="alert alert-danger">{message}</div>
);

const ProjectManagement = () => {
  const [projects, setProjects] = useState([]);
  const [error, setError] = useState(null);
  const [loading, setLoading] = useState(true);
  const [filter, setFilter] = useState('All');
  const [searchQuery, setSearchQuery] = useState('');
  const [category, setCategory] = useState('all');
  const [selectedProject, setSelectedProject] = useState(null);
  const [modalOpen, setModalOpen] = useState(false);
  const [editingImage, setEditingImage] = useState(false);
  const navigate = useNavigate();

  useEffect(() => {
    const fetchProjects = async () => {
      try {
        const response = await obtenirTousLesProjets();
        if (response && response.projects) {
          setProjects(response.projects);
        } else {
          setError('Aucun projet trouvé dans la réponse.');
        }
      } catch (error) {
        setError('Erreur lors du chargement des projets');
      } finally {
        setLoading(false);
      }
    };

    fetchProjects();
  }, []);

  const applyFilters = () => {
    return projects.filter((project) => {
      if (filter !== 'All' && project.stat !== filter) return false;
      if (category !== 'all' && (!project.category || project.category !== category)) return false;
      if (searchQuery && !project.title.toLowerCase().includes(searchQuery.toLowerCase())) return false;
      return true;
    });
  };

  const handleDelete = async (id) => {
    try {
      const result = await supprimerProjet(id);
      if (result.success) {
        setProjects((prevProjects) => prevProjects.filter((project) => project._id !== id));
      } else {
        setError(result.message);
      }
    } catch (error) {
      setError('Une erreur est survenue pendant la suppression');
    }
  };

  const openEditModal = (project) => {
    const shortLink = project.link ? project.link.split('mickael59b/')[1] : '';
    setSelectedProject({
      ...project,
      shortLink, // Contient uniquement la partie après `mickael59b/`
    });
    setModalOpen(true);
  };

  const closeModal = () => {
    setSelectedProject(null);
    setModalOpen(false);
  };

  const validateProject = (project) => {
    if (!project.title || !project.description || !project.stat) {
      setError('Tous les champs doivent être remplis.');
      return false;
    }
    return true;
  };

  const handleUpdateProject = async () => {
    if (!validateProject(selectedProject)) return;
  
    try {
      let updatedProject = { ...selectedProject };
      const imageFile = updatedProject.imageFile;
  
      // Reconstruire le lien GitHub complet à partir de `shortLink`
      updatedProject.link = `https://github.com/mickael59b/${updatedProject.shortLink}`;
  
      if (imageFile) {
        const uploadResult = await uploaderImage(imageFile);
        if (uploadResult.success) {
          updatedProject = { ...updatedProject, imageUrl: uploadResult.imageUrl, imageName: uploadResult.imageName };
        } else {
          setError(uploadResult.error);
          return;
        }
      }
  
      const result = await mettreAJourProjet(selectedProject._id, updatedProject);
      if (result.success) {
        setProjects((prevProjects) =>
          prevProjects.map((project) =>
            project._id === selectedProject._id ? updatedProject : project
          )
        );
        closeModal();
      } else {
        setError(result.message);
      }
    } catch (error) {
      setError('Une erreur est survenue pendant la mise à jour du projet');
    }
  };

  const handleImageClick = () => {
    setEditingImage(true);
  };

  const handleImageChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      setSelectedProject({
        ...selectedProject,
        imageFile: file,
        imageUrl: URL.createObjectURL(file),
      });
    }
    setEditingImage(false);
  };

  const filteredProjects = applyFilters();
  const categories = [...new Set(projects.map((project) => project.category))];
  const getStatusPercentage = (status) => {
    const total = projects.length;
    if (total === 0) return 0;
    const count = projects.filter((project) => project.stat === status).length;
    return ((count / total) * 100).toFixed(2);
  };

  const percentageInProgress = getStatusPercentage('en_cours');
  const percentageCompleted = getStatusPercentage('termine');
  const percentageUpcoming = getStatusPercentage('a_venir');

  return (
    <section className="py-5">
      <div className="container">
        <h1 className="mb-4">Gestion des Projets</h1>
        {error && <ErrorMessage message={error} />}
        {loading ? (
          <div className="text-center">
            <div className="spinner-border" role="status">
              <span className="visually-hidden">Chargement...</span>
            </div>
          </div>
        ) : (
          <>
            {/* Filtres */}
            <div className="row mb-4">
              <div className="col-md-3">
                <input
                  type="text"
                  className="form-control"
                  placeholder="Rechercher par titre"
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                />
              </div>
              <div className="col-md-3">
                <select
                  className="form-control"
                  value={filter}
                  onChange={(e) => setFilter(e.target.value)}
                >
                  <option value="All">Tous</option>
                  <option value="en_cours">En Cours</option>
                  <option value="termine">Terminé</option>
                  <option value="a_venir">À Venir</option>
                </select>
              </div>
              <div className="col-md-3">
                <select
                  className="form-control"
                  value={category}
                  onChange={(e) => setCategory(e.target.value)}
                >
                  <option value="all">Toutes les catégories</option>
                  {categories.map((cat) => (
                    <option key={cat} value={cat}>
                      {cat}
                    </option>
                  ))}
                </select>
              </div>
            </div>

            {/* Informations sur les pourcentages */}
            <div className="card product-card-grid-menu mb-4">
              <div className="card-body">
                <div className="row">
                  <div className="col-lg-3">
                    <div className="d-flex align-items-center gap-2">
                      <h4 className="mb-0">{projects.length}</h4>
                      <p className="mb-0 text-muted">
                        <span className="flex-shrink-0 badge bg-warning-subtle text-warning rounded-pill">
                          <i className="ph ph-clock align-middle me-1"></i> {((projects.length / projects.length) * 100).toFixed(2)}%
                        </span>
                      </p>
                    </div>
                    <p className="text-muted">Total Projets</p>
                  </div>
                  <div className="col-lg-3">
                    <div className="d-flex align-items-center gap-2">
                      <h4 className="mb-0">{projects.filter((p) => p.stat === 'en_cours').length}</h4>
                      <p className="mb-0 text-muted">
                        <span className="flex-shrink-0 badge bg-warning-subtle text-warning rounded-pill">
                          <i className="ph ph-clock align-middle me-1"></i> {percentageInProgress}%
                        </span>
                      </p>
                    </div>
                    <p className="text-muted">Projets En Cours</p>
                  </div>
                  <div className="col-lg-3">
                    <div className="d-flex align-items-center gap-2">
                      <h4 className="mb-0">{projects.filter((p) => p.stat === 'termine').length}</h4>
                      <p className="mb-0 text-muted">
                        <span className="flex-shrink-0 badge bg-success-subtle text-success rounded-pill">
                          <i className="ph ph-check-circle align-middle me-1"></i> {percentageCompleted}%
                        </span>
                      </p>
                    </div>
                    <p className="text-muted">Projets Terminés</p>
                  </div>
                  <div className="col-lg-3">
                    <div className="d-flex align-items-center gap-2">
                      <h4 className="mb-0">{projects.filter((p) => p.stat === 'a_venir').length}</h4>
                      <p className="mb-0 text-muted">
                        <span className="flex-shrink-0 badge bg-info-subtle text-info rounded-pill">
                          <i className="ph ph-hourglass align-middle me-1"></i> {percentageUpcoming}%
                        </span>
                      </p>
                    </div>
                    <p className="text-muted">Projets En Attente</p>
                  </div>
                </div>
              </div>
            </div>

            {filteredProjects.length > 0 ? (
              <table className="table table-striped table-bordered table-hover">
                <thead>
                  <tr>
                    <th>Image</th>
                    <th>Titre</th>
                    <th>Description courte</th>
                    <th>Statut</th>
                    <th>Actions</th>
                  </tr>
                </thead>
                <tbody>
                  {filteredProjects.map((project) => (
                    <tr key={project._id}>
                      <td className='d-flex justify-content-center align-items-center'><img src={project.imageUrl} alt={project.imageName} className='avatar-md'></img></td>
                      <td>{project.title}</td>
                      <td>{project.shortDescription}</td>
                      <td>{project.stat}</td>
                      <td>
                        <div className='hstack gap-1 justify-content-end'>
                        <button className="btn btn-warning" onClick={() => openEditModal(project)}>
                          Modifier
                        </button>
                        <button className="btn btn-danger" onClick={() => handleDelete(project._id)}>
                          Supprimer
                        </button>
                        </div>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            ) : (
              <div className="alert alert-info">Aucun projet trouvé.</div>
            )}
          </>
        )}
      </div>

      {/* Modal de modification */}
      {modalOpen && selectedProject && (
        <div className="modal fade show" style={{ display: 'block' }} aria-labelledby="projectModalLabel">
          <div className="modal-dialog">
            <div className="modal-content">
              <div className="modal-header">
                <h5 className="modal-title">Modifier le Projet</h5>
                <button type="button" className="btn-close" onClick={closeModal}></button>
              </div>
              <div className="modal-body">
                <div className="row">
                  {/* Colonne gauche pour l'image */}
                  <div className="col-md-4 text-center">
                    {selectedProject.imageUrl ? (
                      <>
                        <div className="position-relative">
                          <img
                            src={selectedProject.imageUrl}
                            alt="Image du projet"
                            className="img-fluid mb-3"
                            style={{ cursor: 'pointer' }}
                            onClick={handleImageClick} // Activer l'édition de l'image lors du clic
                          />
                          {editingImage && (
                            <input
                              type="file"
                              className="position-absolute top-0 start-0 w-100 h-100 opacity-0"
                              onChange={handleImageChange}
                              style={{ cursor: 'pointer' }}
                            />
                          )}
                        </div>
                      </>
                    ) : (
                      <div className="alert alert-info">Aucune image disponible</div>
                    )}
                  </div>

                  {/* Colonne droite pour les informations du projet */}
                  <div className="col-md-8">
                    <div className="form-group mb-3">
                      <label>Titre</label>
                      <input
                        type="text"
                        className="form-control"
                        value={selectedProject.title}
                        onChange={(e) => setSelectedProject({ ...selectedProject, title: e.target.value })}
                      />
                    </div>
                    <div className="form-group mb-3">
                      <label>Description courte</label>
                      <input
                        type="text"
                        className="form-control"
                        value={selectedProject.shortDescription}
                        onChange={(e) => setSelectedProject({ ...selectedProject, shortDescription: e.target.value })}
                      />
                    </div>
                    <div className="row">
                      <div className="col-md-6">
                      <div className="form-group mb-3">
  <label htmlFor="shortLink">
    Lien GitHub
  </label>
  <input
    type="text"
    className="form-control"
    id="shortLink"
    value={selectedProject.shortLink} // Utiliser uniquement la partie après `mickael59b/`
    onChange={(e) =>
      setSelectedProject({ ...selectedProject, shortLink: e.target.value })
    }
  />
</div>
                      </div>
                      <div className="col-md-6">
                        <div className="form-group mb-3">
                          <label>Statut</label>
                          <select
                            className="form-control"
                            value={selectedProject.stat}
                            onChange={(e) => setSelectedProject({ ...selectedProject, stat: e.target.value })}
                          >
                            <option value="en_cours">En Cours</option>
                            <option value="termine">Terminé</option>
                            <option value="a_venir">À Venir</option>
                          </select>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
                <div className="form-group">
                  <label>Description</label>
                  <textarea
                    className="form-control"
                    rows="4"
                    value={selectedProject.description}
                    onChange={(e) => setSelectedProject({ ...selectedProject, description: e.target.value })}
                  />
                </div>
              </div>
              <div className="modal-footer">
                <button type="button" className="btn btn-secondary" onClick={closeModal}>
                  Fermer
                </button>
                <button type="button" className="btn btn-primary" onClick={handleUpdateProject}>
                  Mettre à jour
                </button>
              </div>
            </div>
          </div>
        </div>
      )}
    </section>
  );
};

export default ProjectManagement;