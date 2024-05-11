const axios = require('axios');
const getAccessToken = require('../Config/config');

const AddUser = async (req, res) => {
    const user = req.body;
  
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
      console.log('Utilisateur ajouté avec succès :', response.data);
      res.status(200).json({ message: 'Utilisateur ajouté avec succès', user: response.data });
    } catch (error) {
      console.error('Erreur lors de l\'ajout de l\'utilisateur :', error.response.data);
      res.status(500).json({ error: 'Erreur lors de l\'ajout de l\'utilisateur', details: error.response.data });
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
  const { userId, groupId } = req.body; // Assurez-vous que votre requête contient les ID de l'utilisateur et du groupe

  try {
      const token = await getAccessToken(); // Obtenez le jeton d'accès valide
      const apiUrl = `https://graph.microsoft.com/v1.0/groups/${groupId}/members/$ref`;
      const config = {
          headers: {
              'Authorization': `Bearer ${token}`,
              'Content-Type': 'application/json'
          }
      };

      const userRefUrl = `https://graph.microsoft.com/v1.0/directoryObjects/${userId}`;
      const response = await axios.post(apiUrl, { '@odata.id': userRefUrl }, config);
      console.log('Utilisateur ajouté au groupe avec succès :', response.data);
      res.status(200).json({ message: 'Utilisateur ajouté au groupe avec succès', user: response.data });
  } catch (error) {
      console.error('Erreur lors de l\'ajout de l\'utilisateur au groupe :', error.response.data);
      res.status(500).json({ error: 'Erreur lors de l\'ajout de l\'utilisateur au groupe', details: error.response.data });
  }
};

const GetMembersGroup = async(req,res) => {
  const GroupId = req.params.GroupId;
  try {
    const token = await getAccessToken(); 
    const apiUrl = `https://graph.microsoft.com/v1.0/groups/${GroupId}/members`;
    const config = {
        headers: {
            'Authorization': `Bearer ${token}`,
            'Content-Type': 'application/json'
        }
    };

    const response = await axios.get(apiUrl , config);
    console.log('Membres du groupes :', response.data);
    res.status(200).json({ message: 'Membres du groupes', user: response.data });
} catch (error) {
    console.error('Erreur lors de la récupération des membres du groupe :', error.response.data);
    res.status(500).json({ error: 'Erreur lors de la récupération des membres du groupe', details: error.response.data });
}
}

const GetAllUsers = async (req,res) => {
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
      console.log('Liste des utilisateurs récupérée avec succès :', response.data);
      res.status(200).json(response.data)
      // return response.data.value; 
  } catch (error) {
      console.error('Erreur lors de la récupération des utilisateurs :', error);
      throw error.response.data;
  }
};

const GetAllGroups = async (req,res) => {
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
      console.log('Groupes récupéré avec succès :', response.data);
      res.status(200).json(response.data)
      //return response.data.value; 
  } catch (error) {
      console.error('Erreur lors de la récupération des groupes :', error.response.data);
      throw error.response.data;
  }
};

const DeleteUser = async (req, res) => {
  const userId = req.params.userId; // Ou tout autre moyen de récupérer l'ID de l'utilisateur à supprimer

  try {
    const token = await getAccessToken(); 
    const apiUrl = `https://graph.microsoft.com/v1.0/users/${userId}`;
    const config = {
      headers: {
        'Authorization': `Bearer ${token}`
      }
    };

    await axios.delete(apiUrl, config);
    console.log('Utilisateur supprimé avec succès.');
    res.status(200).json({ message: 'Utilisateur supprimé avec succès' });
  } catch (error) {
    console.error('Erreur lors de la suppression de l\'utilisateur :', error.response.data);
    res.status(500).json({ error: 'Erreur lors de la suppression de l\'utilisateur', details: error.response.data });
  }
};

const DeleteGroup = async (req, res) => {
  const GroupId = req.params.GroupId; // Ou tout autre moyen de récupérer l'ID de l'utilisateur à supprimer

  try {
    const token = await getAccessToken(); 
    const apiUrl = `https://graph.microsoft.com/v1.0/groups/${GroupId}`;
    const config = {
      headers: {
        'Authorization': `Bearer ${token}`
      }
    };

    await axios.delete(apiUrl, config);
    console.log('Group supprimé avec succès.');
    res.status(200).json({ message: 'Group supprimé avec succès' });
  } catch (error) {
    console.error('Erreur lors de la suppression de l\'Group :', error.response.data);
    res.status(500).json({ error: 'Erreur lors de la suppression de l\'Group', details: error.response.data });
  }
};

const UpdateUser = async (req, res) => {
  const id = req.params.id; 
  const updatedUserData = req.body; 

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
    console.log('Utilisateur mis à jour avec succès.');
    res.status(200).json({ message: 'Utilisateur mis à jour avec succès' });
  } catch (error) {
    console.error('Erreur lors de la mise à jour de l\'utilisateur :', error.response.data);
    res.status(500).json({ error: 'Erreur lors de la mise à jour de l\'utilisateur', details: error.response.data });
  }
};



module.exports = { AddUser, DeleteUser, AddRole, AddUserToGroup, GetAllUsers, GetAllGroups, UpdateUser, DeleteGroup,GetMembersGroup };
