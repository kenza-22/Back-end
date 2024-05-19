const projectsService = require('../Services/ProjectService');
require('dotenv').config();
const fs = require('fs');

const getProjects = async (req, res) => {
  try {
    const { ATLASSIAN_USERNAME, ATLASSIAN_API_KEY, DOMAIN } = process.env;
    const projects = await projectsService.getProjects(ATLASSIAN_USERNAME, ATLASSIAN_API_KEY, DOMAIN);

    const jsonString = JSON.stringify(projects, null, 2);
    fs.writeFile('projects.json', jsonString, 'utf8', (err) => {
      if (err) {
        console.error('Erreur lors de l\'écriture du fichier :', err);
        return res.status(500).json({ error: 'Erreur lors de l\'écriture du fichier' });
      }
      console.log('Les données ont été écrites dans le fichier projects.json');
      res.json(projects);
    });
  } catch (error) {
    console.log('error:', error);
    res.status(500).json({ error: error.message });
  }
};
const getProjetsdb = async (req, res) => {
  try {
    const projets = await projectsService.GetAllProjetsdb();
    res.json(projets);
  } catch (err) {
    console.error('Erreur lors de la récupération des données', err);
    res.status(500).json({ message: 'Erreur lors de la récupération des données depuis MongoDB' });
  }
};
module.exports={getProjects, getProjetsdb}

