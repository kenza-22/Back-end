const axios = require('axios');
const mongoose = require('mongoose');
const schedule = require("node-schedule");
const job = schedule.scheduleJob('0 0 1 * *', () => {
  getProjects(username, password, domain)
 });
const getProjects = async (username, password, domain) => {
  try {
    const baseUrl = 'https://' + domain + '.atlassian.net';

    const auth = {
      username: username,
      password: password
    };

    const config = {
      method: 'get',
      url: baseUrl + '/rest/api/2/project',
      headers: { 'Content-Type': 'application/json' },
      auth: auth
    };

    const response = await axios.request(config);
    
    return response.data;
  } catch (error) {
    throw error;
  }
};

const GetAllProjetsdb = async () => {
  try {
    const Projet = mongoose.connection.db.collection('Projet');
    const projets = await Projet.find({}).toArray();
    return projets;
  } catch (err) {
    throw err;
  }
};
module.exports={GetAllProjetsdb, getProjects}