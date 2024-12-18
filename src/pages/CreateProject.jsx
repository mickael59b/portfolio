import React, { useState } from 'react';
import { creerProjet } from '../services/apiProjets'; // Assurez-vous que ce chemin est correct

const CreateProject = () => {
  // États pour les champs du formulaire
  const [title, setTitle] = useState('');
  const [category, setCategory] = useState('');
  const [description, setDescription] = useState('');
  const [shortDescription, setShortDescription] = useState('');
  const [skills, setSkills] = useState('');
  const [imageFile, setImageFile] = useState(null); // Pour l'image

  const [loading, setLoading] = useState(false); // Pour gérer le chargement
  const [error, setError] = useState(''); // Pour afficher les erreurs
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

    // Valider les champs du formulaire
    if (!title || !category || !description || !shortDescription || !skills) {
      setLoading(false);
      setError('Tous les champs doivent être remplis.');
      return;
    }

    // Préparer les données du projet
    const projectData = {
      title,
      category,
      description,
      shortDescription,
      skills,
    };

    // Appeler la fonction de création du projet
    const response = await creerProjet(projectData, imageFile);

    if (response.success) {
      setSuccessMessage('Le projet a été créé avec succès !');
      setTitle('');
      setCategory('');
      setDescription('');
      setShortDescription('');
      setSkills('');
      setImageFile(null);
    } else {
      setError(response.error || 'Une erreur est survenue lors de la création du projet.');
    }

    setLoading(false);
  };

  return (
    <div className="create-project-container">
      <h2>Créer un Nouveau Projet</h2>
      
      {successMessage && <div className="success-message">{successMessage}</div>}
      {error && <div className="error-message">{error}</div>}

      <form onSubmit={handleSubmit}>
        <div className="form-group">
          <label htmlFor="title">Titre :</label>
          <input
            type="text"
            id="title"
            value={title}
            onChange={(e) => setTitle(e.target.value)}
            required
          />
        </div>

        <div className="form-group">
          <label htmlFor="category">Catégorie :</label>
          <input
            type="text"
            id="category"
            value={category}
            onChange={(e) => setCategory(e.target.value)}
            required
          />
        </div>

        <div className="form-group">
          <label htmlFor="description">Description :</label>
          <textarea
            id="description"
            value={description}
            onChange={(e) => setDescription(e.target.value)}
            required
          />
        </div>

        <div className="form-group">
          <label htmlFor="shortDescription">Description courte :</label>
          <textarea
            id="shortDescription"
            value={shortDescription}
            onChange={(e) => setShortDescription(e.target.value)}
            required
          />
        </div>

        <div className="form-group">
          <label htmlFor="skills">Compétences :</label>
          <input
            type="text"
            id="skills"
            value={skills}
            onChange={(e) => setSkills(e.target.value)}
            required
          />
        </div>

        <div className="form-group">
          <label htmlFor="image">Image du projet :</label>
          <input
            type="file"
            id="image"
            onChange={handleImageChange}
            accept="image/*"
          />
        </div>

        <button type="submit" disabled={loading}>
          {loading ? 'Création en cours...' : 'Créer le projet'}
        </button>
      </form>
    </div>
  );
};

export default CreateProject;