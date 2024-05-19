const sprintService = require('../Services/SprintService');
require('dotenv').config();
const fs = require('fs');

const getAllSprints = async (req, res) => {
  try {
    const { ATLASSIAN_USERNAME, ATLASSIAN_API_KEY, DOMAIN } = process.env;
    const allSprints = await sprintService.getSprints(ATLASSIAN_USERNAME, ATLASSIAN_API_KEY, DOMAIN);

    const jsonData = allSprints;
    const jsonString = JSON.stringify(jsonData, null, 2);
    fs.writeFile('sprints.json', jsonString, 'utf8', (err) => {
      if (err) {
        console.error('Erreur lors de l\'écriture du fichier :', err);
        return res.status(500).json({ error: 'Erreur lors de l\'écriture du fichier' });
      }
      console.log('Les données ont été écrites dans le fichier sprints.json');
      res.json(allSprints);
    });
  } catch (error) {
    console.log('Erreur:', error);
    res.status(500).json({ error: error.message });
  }
};
const GetSprintsdb = async (req, res) => {
  try {
    const sprints = await sprintService.GetAllSprints();
    res.json(sprints);
  } catch (error) {
    console.error('Erreur lors de la récupération des données', error);
    res.status(500).json({ message: error.message });
  }
};

module.exports={getAllSprints, GetSprintsdb}
