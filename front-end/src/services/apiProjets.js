import axios from "axios";

// Définition de l'URL de base de l'API
const API_BASE_URL = "http://localhost:5000/api/projects"; // Corrigé pour correspondre à la route précédente

// Fonction pour récupérer tous les projets
export const obtenirTousLesProjets = async () => {
  try {
    const response = await axios.get(API_BASE_URL);
    console.log("Données récupérées :", response.data); // Vérification des données
    return response.data; // Retourne les données des projets
  } catch (error) {
    console.error("Erreur lors de la récupération des projets :", error.response || error.message);
    throw error;
  }
};

// Fonction pour récupérer un projet par ID
export const obtenirProjetParId = async (id) => {
  try {
    const response = await axios.get(`${API_BASE_URL}/${id}`);
    return response.data;
  } catch (error) {
    console.error(`Erreur lors de la récupération du projet avec ID ${id} :`, error.response || error.message);
    throw error;
  }
};

// Autres fonctions (créer, mettre à jour, supprimer) ici si nécessaire...

