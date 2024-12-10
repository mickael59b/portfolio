// src/services/apiClient.js
export const getClientInfo = async (token) => {
    try {
      const response = await fetch('http://localhost:5000/api/clients/getClientInfo', {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
  
      const data = await response.json();
      if (!response.ok) {
        throw new Error(data.message || 'Failed to fetch user information');
      }
      return data;
    } catch (error) {
      console.error('Error fetching user info:', error);
      throw error;
    }
  };
  