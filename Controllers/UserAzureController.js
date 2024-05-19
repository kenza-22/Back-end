const axios = require('axios');
const UserService = require("../Services/UserAzureService");

const AddUser = async (req, res) => {
    const user = req.body;
    try {
      const addedUser = await UserService.AddUser(user);
      console.log('Utilisateur ajouté avec succès :', addedUser);
      res.status(200).json({ message: 'Utilisateur ajouté avec succès', user: addedUser });
    } catch (error) {
      console.error('Erreur lors de l\'ajout de l\'utilisateur :', error.message);
      res.status(500).json({ error: 'Erreur lors de l\'ajout de l\'utilisateur', details: error.message });
    }
  };
    
  const GetUserById = async (req, res) => {
    try {
      const userId = req.params.userId;
      const user = await UserService.GetUserById(userId);
      console.log('Utilisateur récupéré avec succès', user);
      res.status(200).json(user);
    } catch (error) {
      console.error('Erreur lors de la récupération de l\'utilisateur :', error.message);
      res.status(500).json({ error: 'Erreur lors de la récupération de l\'utilisateur', details: error.message });
    }
  };

const AddRole = async (req, res) => {
    const group = req.body;
  
    try {
        const token = await getAccessToken(); 
        const apiUrl = 'https://graph.microsoft.com/v1.0/groups';
        const config = {
            headers: {
                'Authorization': `Bearer ${token}`,
                'Content-Type': 'application/json'
            }
        };
  
        const response = await axios.post(apiUrl, group, config);
        console.log('Groupe ajouté avec succès :', response.data);
        res.status(200).json({ message: 'Groupe ajouté avec succès', group: response.data });
    } catch (error) {
        console.error('Erreur lors de l\'ajout du groupe :', error.response.data);
        res.status(500).json({ error: 'Erreur lors de l\'ajout du groupe', details: error.response.data });
    }
};
const AddUserToGroup = async (req, res) => {
  const { userId, groupId } = req.body;

  try {
    const addedUser = await UserService.AddUserToGroup(userId, groupId);
    console.log('Utilisateur ajouté au groupe avec succès :', addedUser);
    res.status(200).json({ message: 'Utilisateur ajouté au groupe avec succès', user: addedUser });
  } catch (error) {
    console.error('Erreur lors de l\'ajout de l\'utilisateur au groupe :', error.message);
    res.status(500).json({ error: 'Erreur lors de l\'ajout de l\'utilisateur au groupe', details: error.message });
  }
};


const GetAllUsers = async (req, res) => {
  try {
    const users = await UserService.GetAllUsers();
    console.log('Liste des utilisateurs récupérée avec succès :', users);
    res.status(200).json(users);
  } catch (error) {
    console.error('Erreur lors de la récupération des utilisateurs :', error.message);
    res.status(500).json({ error: 'Erreur lors de la récupération des utilisateurs', details: error.message });
  }
};

const DeleteUser = async (req, res) => {
  const userId = req.params.userId; 

  try {
    const result = await UserService.DeleteUser(userId);
    console.log(result.message);
    res.status(200).json(result);
  } catch (error) {
    console.error('Erreur lors de la suppression de l\'utilisateur :', error.message);
    res.status(500).json({ error: 'Erreur lors de la suppression de l\'utilisateur', details: error.message });
  
};
}


const UpdateUser = async (req, res) => {
  const id = req.params.id;
  const updatedUserData = req.body;

  try {
    const result = await UserService.UpdateUser(id, updatedUserData);
    console.log(result.message);
    res.status(200).json(result);
  } catch (error) {
    console.error('Erreur lors de la mise à jour de l\'utilisateur :', error.message);
    res.status(500).json({ error: 'Erreur lors de la mise à jour de l\'utilisateur', details: error.message });
  }
};



module.exports = { AddUser, DeleteUser, AddRole, AddUserToGroup, GetAllUsers, UpdateUser, GetUserById };
