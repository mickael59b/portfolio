import axios from 'axios';

// API de base
const API_BASE_URL = 'https://back-end-api-gfl0.onrender.com/api/projects';
const UPLOAD_URL = 'https://back-end-api-gfl0.onrender.com/api/upload';

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

    console.log("Réponse de l'API d'upload :", response.data);

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
        imageName: uploadResponse.imageName,  // Le nom de l'image
      };
    }

    // Ajout des informations de l'image aux données du projet
    const projectWithImage = {
      ...projectData,  // Toutes les autres données du projet
      imageUrl: imageInfo ? imageInfo.imageUrl : null,  // L'URL de l'image
      imageName: imageInfo ? imageInfo.imageName : null,  // Le nom de l'image
    };

    console.log("Données envoyées à l'API pour créer le projet:", projectWithImage);

    // Vérification de l'intégrité des données avant l'envoi
    if (!projectWithImage.title || !projectWithImage.category || !projectWithImage.description) {
      console.log("Les données sont incomplètes. L'envoi à l'API est bloqué.");
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
