const axios = require('axios');
const getAccessToken = require('../Config/config');

const AddGroup = async (Group) => {
    try {
      const token = await getAccessToken();
      const apiUrl = 'https://graph.microsoft.com/v1.0/groups';
      const config = {
        headers: {
          'Authorization': `Bearer ${token}`,
          'Content-Type': 'application/json'
        }
      };
  
      const response = await axios.post(apiUrl, Group, config);
      return response.data;
    } catch (error) {
      throw error;
    }
  }
const GetAllGroups = async () => {
  try {
    const token = await getAccessToken();
    const apiUrl = 'https://graph.microsoft.com/v1.0/groups';
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
const GetGroupMembers = async (GroupId) => {
    try {
      const token = await getAccessToken();
      const apiUrl = `https://graph.microsoft.com/v1.0/groups/${GroupId}/members`;
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
  const DeleteGroup = async (GroupId) => {
    try {
      const token = await getAccessToken();
      const apiUrl = `https://graph.microsoft.com/v1.0/groups/${GroupId}`;
      const config = {
        headers: {
          'Authorization': `Bearer ${token}`
        }
      };
  
      await axios.delete(apiUrl, config);
    } catch (error) {
      throw error;
    }
  };
module.exports = {
    GetAllGroups, GetGroupMembers, DeleteGroup, AddGroup
};
