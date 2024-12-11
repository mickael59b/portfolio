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
    // Gestion des erreurs de manière plus complète
    if (error.response) {
      // Erreur provenant du serveur (par exemple, 404 ou 500)
      console.error("Erreur serveur :", error.response.data);
      throw new Error(`Erreur du serveur : ${error.response.status} - ${error.response.data}`);
    } else if (error.request) {
      // Erreur réseau (par exemple, le serveur n'est pas accessible)
      console.error("Erreur réseau :", error.request);
      throw new Error("Erreur réseau : Impossible de joindre le serveur.");
    } else {
      // Autres types d'erreurs
      console.error("Erreur inconnue :", error.message);
      throw new Error(`Erreur inconnue : ${error.message}`);
    }
  }
};

// Fonction pour récupérer un projet par ID
export const obtenirProjetParId = async (id) => {
  try {
    const response = await axios.get(`${API_BASE_URL}/${id}`);
    return response.data;
  } catch (error) {
    if (error.response) {
      console.error(`Erreur lors de la récupération du projet avec ID ${id}:`, error.response.data);
      throw new Error(`Erreur serveur : ${error.response.status} - ${error.response.data}`);
    } else if (error.request) {
      console.error("Erreur réseau :", error.request);
      throw new Error("Erreur réseau : Impossible de joindre le serveur.");
    } else {
      console.error("Erreur inconnue :", error.message);
      throw new Error(`Erreur inconnue : ${error.message}`);
    }
  }
};
