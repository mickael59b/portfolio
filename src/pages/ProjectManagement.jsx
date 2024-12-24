import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { obtenirTousLesProjets, supprimerProjet } from '../services/apiProjets';

const ProjectManagement = () => {
    const [projects, setProjects] = useState([]);
    const [error, setError] = useState(null);
    const [loading, setLoading] = useState(true);
    const [filter, setFilter] = useState('All');
    const [searchQuery, setSearchQuery] = useState('');
    const [category, setCategory] = useState('all');
    const navigate = useNavigate();

    // Charger les projets depuis l'API
    useEffect(() => {
        const fetchProjects = async () => {
            try {
                const response = await obtenirTousLesProjets();
                if (response && response.projects) {
                    setProjects(response.projects); // Mettre à jour l'état avec les projets
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

    // Fonction de filtrage selon les critères de recherche, statut et catégorie
    const applyFilters = () => {
        let filtered = [...projects];

        // Filtrer par statut
        if (filter !== 'All') {
            filtered = filtered.filter((project) => project.stat === filter);
        }

        // Filtrer par catégorie
        if (category !== 'all') {
            filtered = filtered.filter((project) => project.category === category);
        }

        // Filtrer par texte de recherche
        if (searchQuery) {
            filtered = filtered.filter((project) => 
                project.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
                project.description.toLowerCase().includes(searchQuery.toLowerCase())
            );
        }

        return filtered;
    };

    // Supprimer un projet
    const handleDelete = async (id) => {
        try {
            const result = await supprimerProjet(id); // Appel à la fonction de suppression
            if (result.success) {
                setProjects((prevProjects) => prevProjects.filter((project) => project._id !== id));
            } else {
                setError(result.message);
            }
        } catch (error) {
            setError('Une erreur est survenue pendant la suppression');
        }
    };

    // Calculer les pourcentages d'évolution pour les projets
    const totalProjects = projects.length;
    const startedProjects = projects.filter((project) => project.stat === 'en_cours').length;
    const completedProjects = projects.filter((project) => project.stat === 'termine').length;
    const approvalProjects = projects.filter((project) => project.stat === 'a_venir').length;

    // Pourcentage d'évolution (vous pouvez adapter la logique ici)
    const startedPercentage = totalProjects ? ((startedProjects / totalProjects) * 100).toFixed(2) : 0;
    const completedPercentage = totalProjects ? ((completedProjects / totalProjects) * 100).toFixed(2) : 0;
    const approvalPercentage = totalProjects ? ((approvalProjects / totalProjects) * 100).toFixed(2) : 0;

    const filteredProjects = applyFilters();

    return (
        <section className='py-5'>
        <div className="container">
            <h1 className="mb-4">Gestion des Projets</h1>

            {/* Affichage des erreurs */}
            {error && <div className="alert alert-danger">{error}</div>}

            {/* Chargement en cours */}
            {loading && (
                <div className="text-center">
                    <div className="spinner-border" role="status">
                        <span className="visually-hidden">Chargement...</span>
                    </div>
                </div>
            )}

            {/* Section récapitulative */}
            <div className="card product-card-grid-menu mb-4">
                <div className="card-body">
                    <div className="row">
                        {/* Total Projets */}
                        <div className="col-lg-3">
                            <div className="product-card-hrid-border">
                                <p className="text-muted">Total Projets</p>
                                <div className="d-flex align-items-center gap-2">
                                    <h4 className="mb-0">{totalProjects}</h4>
                                    <p className="mb-0 text-muted">
                                        <span className="flex-shrink-0 badge bg-success-subtle text-success rounded-pill">
                                            <i className="ph ph-trend-up align-middle me-1"></i> 0.5%
                                        </span>
                                    </p>
                                </div>
                            </div>
                        </div>

                        {/* Projets En Cours */}
                        <div className="col-lg-3">
                            <div className="product-card-hrid-border">
                                <p className="text-muted">Projets En Cours</p>
                                <div className="d-flex align-items-center gap-2">
                                    <h4 className="mb-0">{startedProjects}</h4>
                                    <p className="mb-0 text-muted">
                                        <span className="flex-shrink-0 badge bg-success-subtle text-success rounded-pill">
                                            <i className="ph ph-trend-up align-middle me-1"></i> {startedPercentage}%
                                        </span>
                                    </p>
                                </div>
                            </div>
                        </div>

                        {/* Projets Terminés */}
                        <div className="col-lg-3">
                            <div className="product-card-hrid-border">
                                <p className="text-muted">Projets Terminés</p>
                                <div className="d-flex align-items-center gap-2">
                                    <h4 className="mb-0">{completedProjects}</h4>
                                    <p className="mb-0 text-muted">
                                        <span className="flex-shrink-0 badge bg-danger-subtle text-danger rounded-pill">
                                            <i className="ph ph-trend-down align-middle me-1"></i> {completedPercentage}%
                                        </span>
                                    </p>
                                </div>
                            </div>
                        </div>

                        {/* Projets En Attente */}
                        <div className="col-lg-3">
                            <div className="product-card-hrid-border">
                                <p className="text-muted">Projets En Attente</p>
                                <div className="d-flex align-items-center gap-2">
                                    <h4 className="mb-0">{approvalProjects}</h4>
                                    <p className="mb-0 text-muted">
                                        <span className="flex-shrink-0 badge bg-warning-subtle text-warning rounded-pill">
                                            <i className="ph ph-clock align-middle me-1"></i> {approvalPercentage}%
                                        </span>
                                    </p>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>

            {/* Filtrage des projets */}
            <div className="row mb-4">
                <div className="col-lg-12">
                    <div className="card">
                        <div className="card-body">
                            <div className="row g-3">
                                {/* Recherche des projets */}
                                <div className="col-xxl">
                                    <div className="search-box">
                                        <input
                                            type="text"
                                            className="form-control search"
                                            placeholder="Rechercher des projets..."
                                            value={searchQuery}
                                            onChange={(e) => setSearchQuery(e.target.value)}
                                        />
                                        <i className="ri-search-line search-icon"></i>
                                    </div>
                                </div>

                                {/* Filtrer par statut */}
                                <div className="col-xxl col-sm-6">
                                    <div className="choices" data-type="select-one">
                                        <div className="choices__inner">
                                            <select
                                                className="form-control choices__input"
                                                value={filter}
                                                onChange={(e) => setFilter(e.target.value)}
                                            >
                                                <option value="All">Tous</option>
                                                <option value="en_cours">En Cours</option>
                                                <option value="termine">Terminé</option>
                                                <option value="a_venir">En Attente</option>
                                            </select>
                                        </div>
                                    </div>
                                </div>

                                {/* Filtrer par catégorie */}
                                <div className="col-xxl col-sm-6">
                                    <div className="choices" data-type="select-one">
                                        <div className="choices__inner">
                                            <select
                                                className="form-control choices__input"
                                                value={category}
                                                onChange={(e) => setCategory(e.target.value)}
                                            >
                                                <option value="all">Sélectionner une catégorie</option>
                                                <option value="IT">Technologie</option>
                                                <option value="Marketing">Marketing</option>
                                                <option value="Design">Design</option>
                                                <option value="Sales">Ventes</option>
                                            </select>
                                        </div>
                                    </div>
                                </div>

                                {/* Bouton pour créer un projet */}
                                <div className="col-xxl-auto col-sm-6">
                                    <button
                                        type="button"
                                        className="btn btn-primary w-md"
                                        onClick={() => navigate('/dashboard/projet/new')}
                                    >
                                        <i className="fas fa-plus-circle me-2"></i> Créer un Projet
                                    </button>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>

            {/* Affichage des projets sous forme de tableau */}
            {!loading && filteredProjects.length > 0 && (
                <table className="table table-striped table-bordered table-hover">
                    <thead>
                        <tr>
                            <th>Titre</th>
                            <th>Description</th>
                            <th>Statut</th>
                            <th>Actions</th>
                        </tr>
                    </thead>
                    <tbody>
                        {filteredProjects.map((project) => (
                            <tr key={project._id}>
                                <td>{project.title}</td>
                                <td>{project.description}</td>
                                <td>{project.stat}</td>
                                <td>
                                    <button
                                        className="btn btn-danger"
                                        onClick={() => handleDelete(project._id)}
                                    >
                                        Supprimer
                                    </button>
                                </td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            )}

            {/* Message quand il n'y a pas de projets */}
            {!loading && filteredProjects.length === 0 && (
                <div className="alert alert-info">Aucun projet trouvé.</div>
            )}
        </div>
        </section>
    );
};

export default ProjectManagement;