import { useState } from 'react';
import { creerProjet } from '../services/apiProjets';

const CreateProject = () => {
  const [title, setTitle] = useState('');
  const [category, setCategory] = useState('');
  const [description, setDescription] = useState('');
  const [shortDescription, setShortDescription] = useState('');
  const [skills, setSkills] = useState('');
  const [stat, setStatus] = useState('');
  const [link, setLinkgithub] = useState('');
  const [imageFile, setImageFile] = useState(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');
  const [successMessage, setSuccessMessage] = useState('');

  const handleImageChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      setImageFile(file);
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError('');
    setSuccessMessage('');

    if (!title || !category || !description || !shortDescription || !skills || !stat) {
      setLoading(false);
      setError('Tous les champs doivent être remplis.');
      return;
    }

    const projectData = {
      title,
      category,
      description,
      shortDescription,
      skills,
      stat,
      link,
    };

    try {
      const response = await creerProjet(projectData, imageFile);

      if (response.success) {
        setSuccessMessage('Le projet a été créé avec succès !');
        setTitle('');
        setCategory('');
        setDescription('');
        setShortDescription('');
        setSkills('');
        setStatus('');
        setImageFile(null);
      } else {
        setError(response.error || 'Une erreur est survenue lors de la création du projet.');
      }
    } catch (error) {
      setError('Une erreur réseau est survenue. Veuillez réessayer plus tard.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <section id="create_project" className="py-5 bg-light">
      <div className="container px-5 pb-5">
        <h2 className="text-center text-primary mb-4">Créer un Nouveau Projet</h2>

        {successMessage && <div className="alert alert-success">{successMessage}</div>}
        {error && <div className="alert alert-danger">{error}</div>}

        <div className="row gy-5">
          {/* Colonne gauche : Gestion de l'upload */}
          <div className="col-lg-5">
            <div className="card shadow-sm border-0">
              <div className="card-header text-center bg-primary text-white">
                <h5>Image du Projet</h5>
              </div>
              <div className="card-body text-center">
                <label htmlFor="imageUpload" className="upload-label">
                  <img
                    src={
                      imageFile
                        ? URL.createObjectURL(imageFile)
                        : 'https://via.placeholder.com/500x500.png?text=image+par+d%C3%A9faut'
                    }
                    alt="Aperçu"
                    className="img-fluid rounded shadow-sm"
                    style={{
                      Width: '500px',
                      height: '375px',
                      objectFit: 'cover',
                      objectPosition: 'top',
                      cursor: 'pointer',
                    }}
                  />
                </label>
                <input
                  type="file"
                  id="imageUpload"
                  className="d-none"
                  onChange={handleImageChange}
                  accept="image/*"
                />
                {/* Prévisualisation du projet */}
                <div className="row mt-5">
                  <div className="col-lg-12">
                    <div className="card">
                      <div className="card-body">
                        <h5><strong>Titre :</strong> {title || 'Aucun titre'}</h5>
                        <p><strong>Catégorie :</strong> {category || 'Aucune catégorie'}</p>
                        <p><strong>Description courte :</strong> {shortDescription || 'Aucune description courte'}</p>
                        <p><strong>Compétences :</strong> {skills || 'Aucune compétence'}</p>
                        <p><strong>Statut :</strong> {stat || 'Aucun statut'}</p>
                        <p><strong>GitHub :</strong> {`https://github.com/mickael59b/${link || '*****'}`}</p>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* Colonne droite : Formulaire */}
          <div className="col-lg-7">
            <div className="card shadow-sm border-0">
              <div className="card-header bg-primary text-white text-center">
                <h5>Formulaire de Création</h5>
              </div>
              <div className="card-body">
                <form onSubmit={handleSubmit}>
                  <div className="form-group mb-3">
                    <label htmlFor="title" className="form-label">Titre du Projet</label>
                    <input
                      type="text"
                      id="title"
                      className="form-control"
                      value={title}
                      onChange={(e) => setTitle(e.target.value)}
                      placeholder="Ex : Mon super projet"
                      required
                    />
                  </div>

                  <div className="form-group mb-3">
                    <label htmlFor="category" className="form-label">Catégorie</label>
                    <input
                      type="text"
                      id="category"
                      className="form-control"
                      value={category}
                      onChange={(e) => setCategory(e.target.value)}
                      placeholder="Ex : Développement Web"
                      required
                    />
                  </div>

                  <div className="form-group mb-3">
                    <label htmlFor="shortDescription" className="form-label">Description Courte</label>
                    <textarea
                      id="shortDescription"
                      className="form-control"
                      value={shortDescription}
                      onChange={(e) => setShortDescription(e.target.value)}
                      placeholder="Un résumé du projet en quelques mots"
                      required
                    />
                  </div>

                  <div className="form-group mb-3">
                    <label htmlFor="description" className="form-label">Description</label>
                    <textarea
                      id="description"
                      className="form-control"
                      value={description}
                      onChange={(e) => setDescription(e.target.value)}
                      placeholder="Description détaillée du projet"
                      style={{ height: '300px' }} // Modifier la hauteur ici
                      required
                    />
                  </div>

                  <div className="form-group mb-3">
                    <label htmlFor="skills" className="form-label">Compétences</label>
                    <input
                      type="text"
                      id="skills"
                      className="form-control"
                      value={skills}
                      onChange={(e) => setSkills(e.target.value)}
                      placeholder="Ex : React, Node.js, Design"
                      required
                    />
                  </div>

                  <div className="form-group mb-3">
                    <label htmlFor="link" className="form-label">Lien github</label>
                    <input
                      type="text"
                      id="link"
                      className="form-control"
                      value={link}
                      onChange={(e) => setLinkgithub(e.target.value)}
                      placeholder="https://github.com/mickael59b/*******/"
                      required
                    />
                  </div>

                  <div className="form-group mb-3">
                    <label htmlFor="stat" className="form-label">Statut du Projet</label>
                    <select
                      id="stat"
                      className="form-control"
                      value={stat}
                      onChange={(e) => setStatus(e.target.value)}
                      required
                    >
                      <option value="">Sélectionnez un statut</option>
                      <option value="en_cours">En cours</option>
                      <option value="termine">Terminé</option>
                      <option value="a_venir">À venir</option>
                    </select>
                  </div>

                  <div className="d-grid">
                    <button type="submit" className="btn btn-primary" disabled={loading}>
                      {loading ? 'Création en cours...' : 'Créer le Projet'}
                    </button>
                  </div>
                </form>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default CreateProject;
