const GroupService = require('../Services/GroupAzureService');

const AddGroup = async (req, res) => {
    const Group = req.body;
  
    try {
      const addedGroup = await GroupService.AddGroup(Group);
      console.log('Groupe ajouté avec succès :', addedGroup);
      res.status(200).json({ message: 'Groupe ajouté avec succès', group: addedGroup });
    } catch (error) {
      console.error('Erreur lors de l\'ajout du groupe :', error.message);
      res.status(500).json({ error: 'Erreur lors de l\'ajout du groupe', details: error.message });
    }
  };
const GetAllGroups = async (req, res) => {
  try {
    const groups = await GroupService.GetAllGroups();
    console.log('Groupes récupérés avec succès :', groups);
    res.status(200).json(groups);
  } catch (error) {
    console.error('Erreur lors de la récupération des groupes :', error.message);
    res.status(500).json({ error: 'Erreur lors de la récupération des groupes', details: error.message });
  }
};
const GetGroupMembers = async (req, res) => {
    const GroupId = req.params.GroupId;
    try {
      const members = await GroupService.GetGroupMembers(GroupId);
      console.log('Membres du groupe :', members);
      res.status(200).json({ message: 'Membres du groupe', members });
    } catch (error) {
      console.error('Erreur lors de la récupération des membres du groupe :', error.message);
      res.status(500).json({ error: 'Erreur lors de la récupération des membres du groupe', details: error.message });
    }
  };
  const DeleteGroup = async (req, res) => {
    const GroupId = req.params.GroupId;
  
    try {
      await GroupService.DeleteGroup(GroupId);
      console.log('Groupe supprimé avec succès.');
      res.status(200).json({ message: 'Groupe supprimé avec succès' });
    } catch (error) {
      console.error('Erreur lors de la suppression du groupe :', error.message);
      res.status(500).json({ error: 'Erreur lors de la suppression du groupe', details: error.message });
    }
  };
module.exports = {
    GetAllGroups, GetGroupMembers, DeleteGroup, AddGroup
};

