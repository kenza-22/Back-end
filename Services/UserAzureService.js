const axios = require('axios');
const getAccessToken = require('../Config/config');
const AddUser = async (user) => {
  
    try {
      const token = await getAccessToken(); 
      const apiUrl = 'https://graph.microsoft.com/v1.0/users';
      const config = {
        headers: {
          'Authorization': `Bearer ${token}`,
          'Content-Type': 'application/json'
        }
      };
  
      const response = await axios.post(apiUrl, user, config);
      return response.data;
    } catch (error) {
        throw error;
    
    }
  };
  
  const AddUserToGroup = async (userId, groupId) => {
    try {
      const token = await getAccessToken();
      const apiUrl = `https://graph.microsoft.com/v1.0/groups/${groupId}/members/$ref`;
      const config = {
        headers: {
          'Authorization': `Bearer ${token}`,
          'Content-Type': 'application/json'
        }
      };
  
      const userRefUrl = `https://graph.microsoft.com/v1.0/directoryObjects/${userId}`;
      const response = await axios.post(apiUrl, { '@odata.id': userRefUrl }, config);
      return response.data;
    } catch (error) {
      throw error;
    }
  };
  
const GetUserById = async (userId) => {
    try {
      const token = await getAccessToken();
      const apiUrl = `https://graph.microsoft.com/v1.0/users/${userId}`;
      const config = {
        headers: {
          'Authorization': `Bearer ${token}`,
          'Content-Type': 'application/json'
        }
      };
  
      const response = await axios.get(apiUrl, config);
      return response.data;
    } catch (error) {
      throw error;
    }
  };
const GetAllUsers = async()=> {
  try {
    const token = await getAccessToken(); 
    const apiUrl = 'https://graph.microsoft.com/v1.0/users';
    const config = {
        headers: {
            'Authorization': `Bearer ${token}`,
            'Content-Type': 'application/json'
        }
    };

    const response = await axios.get(apiUrl, config);
    return response.data;
} catch (error) {
    throw error;
}
}
const DeleteUser = async (userId) => {
  try {
    const token = await getAccessToken();
    const apiUrl = `https://graph.microsoft.com/v1.0/users/${userId}`;
    const config = {
      headers: {
        'Authorization': `Bearer ${token}`
      }
    };

    const response = await axios.get(apiUrl, config);
    return { message: 'Utilisateur supprimé avec succès' };
  } catch (error) {
    throw error;
  }
};
const UpdateUser = async (id, updatedUserData) => {
  try {
    const token = await getAccessToken();
    const apiUrl = `https://graph.microsoft.com/v1.0/users/${id}`;
    const config = {
      headers: {
        'Authorization': `Bearer ${token}`,
        'Content-Type': 'application/json'
      }
    };

    await axios.patch(apiUrl, updatedUserData, config);
    return { message: 'Utilisateur mis à jour avec succès' };
  } catch (error) {
    throw error;
  }
};
  module.exports = {
    AddUser, GetUserById, GetAllUsers, DeleteUser, UpdateUser, AddUserToGroup
  };