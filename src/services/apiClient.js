import axios from 'axios';

const API_URL = 'https://api.acti-informatique.com/clients';

// Connexion du client
export const loginClient = async (email, password) => {
  try {
    const response = await axios.post(`${API_URL}/login`, { email, password });
    return response.data; // Retourne le token et les informations utilisateur
  } catch (error) {
    console.error('Login error:', error);
    throw new Error(error.response ? error.response.data.message : 'Email ou mot de passe incorrect');
  }
};

// Récupérer les informations du client
export const getClientInfo = async (token) => {
  try {
    const response = await axios.get(`${API_URL}/getClientInfo`, {
      headers: {
        Authorization: `Bearer ${token}`, // Envoie le token d'authentification dans l'en-tête
      },
    });

    return response.data; // Retourne les données du client
  } catch (error) {
    console.error('Error fetching user info:', error);
    throw new Error(error.response ? error.response.data.message : 'Failed to fetch user information');
  }
};

// Mettre à jour les informations du client
export const updateClient = async (clientData, token) => {
  try {
    const response = await axios.put(`${API_URL}/updateClient`, clientData, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });
    return response.data; // Retourne les informations du client mises à jour
  } catch (error) {
    throw new Error(error.response ? error.response.data.message : 'Erreur inconnue');
  }
};