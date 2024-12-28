import axios from 'axios';

// URL de l'API
const API_BASE_URL = 'https://api.acti-informatique.com/projects';
const UPLOAD_URL = 'https://api.acti-informatique.com/upload';

// Fonction pour gérer les erreurs
const handleError = (error) => {
  if (error.response) {
    console.error('Erreur serveur:', error.response.data);
    return { success: false, error: error.response.data.message || 'Erreur serveur' };
  } else if (error.request) {
    console.error('Erreur réseau:', error.request);
    return { success: false, error: 'Erreur réseau : Impossible de joindre le serveur.' };
  } else {
    console.error('Erreur inconnue:', error.message);
    return { success: false, error: error.message || 'Erreur inconnue' };
  }
};

// Fonction pour uploader une image
export const uploaderImage = async (file) => {
  if (file.size > 5 * 1024 * 1024) {
    return { success: false, error: 'Le fichier est trop grand. Taille maximale: 5 Mo' };
  }

  if (!file.type.startsWith('image/')) {
    return { success: false, error: 'Le fichier doit être une image.' };
  }

  const formData = new FormData();
  formData.append('image', file);

  try {
    const response = await axios.post(UPLOAD_URL, formData, {
      headers: {
        'Content-Type': 'multipart/form-data',
        Authorization: `Bearer ${localStorage.getItem('token')}`,
      },
    });

    if (response.data && response.data.imageUrl) {
      return { success: true, imageUrl: response.data.imageUrl, imageName: response.data.imageName };
    } else {
      return { success: false, error: 'L\'API n\'a pas renvoyé d\'URL pour l\'image.' };
    }
  } catch (error) {
    return handleError(error);
  }
};

// Fonction pour créer un projet
export const creerProjet = async (projectData, imageFile) => {
  try {
    let imageInfo = null;

    // Si une image est sélectionnée, on l'upload d'abord
    if (imageFile) {
      const uploadResponse = await uploaderImage(imageFile);

      if (!uploadResponse.success) {
        console.error("Erreur lors de l'upload de l'image:", uploadResponse.error);
        return { success: false, error: uploadResponse.error };
      }

      imageInfo = {
        imageUrl: uploadResponse.imageUrl,  // L'URL de l'image
        imageName: uploadResponse.imageName || 'default_name',  // Si imageName est undefined, donnez un nom par défaut
      };
    }

    // Ajout des informations de l'image aux données du projet
    const projectWithImage = {
      ...projectData,  // Toutes les autres données du projet
      imageUrl: imageInfo ? imageInfo.imageUrl : null,  // L'URL de l'image
      imageName: imageInfo ? imageInfo.imageName : null,  // Le nom de l'image
    };

    // Vérification de l'intégrité des données avant l'envoi
    if (!projectWithImage.title || !projectWithImage.category || !projectWithImage.description || !projectWithImage.stat) {
      return { success: false, error: 'Les données du projet sont incomplètes.' };
    }

    // Envoi des données à l'API pour créer le projet
    const response = await axios.post(API_BASE_URL, projectWithImage, {
      headers: { Authorization: `Bearer ${localStorage.getItem('token')}` },
    });

    return { success: true, project: response.data };
  } catch (error) {
    console.error("Erreur lors de la création du projet:", error);
    return handleError(error);
  }
};

// Fonction pour récupérer tous les projets
export const obtenirTousLesProjets = async () => {
  try {
    const response = await axios.get(API_BASE_URL, {
      headers: { Authorization: `Bearer ${localStorage.getItem('token')}` },
    });

    if (Array.isArray(response.data)) {
      return { success: true, projects: response.data };
    } else {
      console.error('Les projets ne sont pas sous forme de tableau:', response.data);
      return { success: false, error: 'Les projets ne sont pas sous forme de tableau.' };
    }
  } catch (error) {
    return handleError(error);
  }
};

// Fonction pour obtenir un projet par ID
export const obtenirProjetParId = async (id) => {
  try {
    const response = await axios.get(`${API_BASE_URL}/${id}`, {
      headers: { Authorization: `Bearer ${localStorage.getItem('token')}` },
    });
    return { success: true, project: response.data };
  } catch (error) {
    return handleError(error);
  }
};

// mettre a jour le projet
export const mettreAJourProjet = async (id, updatedProjectData, imageFile) => {
  try {
    let imageInfo = null;

    // Gestion de l'upload d'image
    if (imageFile) {
      const uploadResponse = await uploaderImage(imageFile);
      if (!uploadResponse.success) {
        console.error("Erreur lors de l'upload de l'image:", uploadResponse.error);
        return { success: false, error: uploadResponse.error };
      }
      imageInfo = {
        imageUrl: uploadResponse.imageUrl,
        imageName: uploadResponse.imageName || updatedProjectData.imageName,
      };
    }

    // Reconstruction du link si nécessaire
    let link = updatedProjectData.link;
    if (updatedProjectData.shortLink && !updatedProjectData.shortLink.startsWith('https://github.com/mickael59b/')) {
      link = `https://github.com/mickael59b/${updatedProjectData.shortLink}`;
    }

    // Construction de l'objet avec toutes les données à jour
    const projectWithImage = {
      ...updatedProjectData,
      link,
      imageUrl: imageInfo ? imageInfo.imageUrl : updatedProjectData.imageUrl,
      imageName: imageInfo ? imageInfo.imageName : updatedProjectData.imageName,
    };

    // Vérification des données requises
    if (!projectWithImage.title || !projectWithImage.category || !projectWithImage.description || !projectWithImage.stat) {
      return { success: false, error: 'Les données du projet sont incomplètes.' };
    }

    // Envoi à l'API
    const response = await axios.put(`${API_BASE_URL}/${id}`, projectWithImage, {
      headers: { Authorization: `Bearer ${localStorage.getItem('token')}` },
    });

    return { success: true, project: response.data };

  } catch (error) {
    console.error("Erreur lors de la mise à jour du projet:", error);
    return handleError(error);
  }
};
// Fonction pour supprimer un projet
export const supprimerProjet = async (id) => {
  try {
    const response = await axios.delete(`${API_BASE_URL}/${id}`, {
      headers: { Authorization: `Bearer ${localStorage.getItem('token')}` },
    });
    return { success: true, message: 'Projet supprimé avec succès' };
  } catch (error) {
    return handleError(error);
  }
};