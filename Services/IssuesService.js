const axios = require("axios");
const fs = require("fs").promises;
const path = require("path");
const schedule = require('node-schedule');
const mongoose = require('mongoose');
// job cron qui se lance vers 00:00 chaque 2 semaines
// const job = schedule.scheduleJob('0 0 * * *', () => {
//   console.log("Le job cron se lance chaque jour à minuit");
// });
const getTotalIssuesCount = async (baseUrl, auth) => {
  const config = {
    method: "get",
    url: `${baseUrl}/rest/api/2/search`,
    headers: { "Content-Type": "application/json" },
    auth: auth,
    params: {
      maxResults: 0,
    },
  };

  const response = await axios.request(config);
  return response.data.total;
};
const getIssues = async (username, password, domain) => {
  try {
    const dataFile = path.join(__dirname, "../db/issues/db.json");

    // Read file asynchronously using fs.promises.readFile
    const jsonData = await fs.readFile(dataFile, "utf8");

    // Parse the JSON data
    const allIssues = JSON.parse(jsonData);

    // Output or manipulate the data as needed
    
    // Commented out code to fetch issues from a remote API
    
    /* const baseUrl = "https://" + domain + ".atlassian.net";

    const auth = {
      username: username,
      password: password,
    };

    let startAt = 0;
    let allIssues = [];
    const maxResults = 1000;
    const totalIssues = await getTotalIssuesCount(baseUrl, auth);
    console.log(totalIssues);
    const totalPages = Math.ceil(totalIssues / maxResults); //

    //  console.log("Total Issues:", totalIssues);
    //  console.log("Total Pages Needed:", totalPages);

    while (startAt < totalPages) {
      const config = {
        method: "get",
        url: `${baseUrl}/rest/api/2/search`,
        headers: { "Content-Type": "application/json" },
        auth: auth,
        params: {
          startAt: startAt * maxResults, //
          maxResults: maxResults,
        },
      };

      const response = await axios.request(config);
      const issues = response.data.issues;
      allIssues = allIssues.concat(issues);
      // console.log(`Fetched issues from ${startAt * maxResults} to ${startAt * maxResults + issues.length - 1}`);
      // console.log(`Total issues fetched so far: ${allIssues.length}`);
      console.log("startAt", startAt);
      console.log("totalPages", totalPages);
      startAt++;
    } */
    // console.log("Total issues fetched:", allIssues.length);
    

    return allIssues;
  } catch (error) {
    console.error('Error reading or parsing JSON file:', error);
    throw error;
  }
};
const GetAllTicketsdb = async () => {
  try {
    const Ticket = mongoose.connection.db.collection('Ticket');
    const tickets = await Ticket.find({}).toArray();
    return tickets;
  } catch (err) {
    throw err;
  }
};

const GetTicketsByProject = async (project) => {
  try {
    const Ticket = mongoose.connection.db.collection('Ticket');
    const tickets = await Ticket.find({ Clé_Projet: project }).toArray();
    return tickets;
  } catch (err) {
    throw err;
  }
};

module.exports={getTotalIssuesCount, getIssues, GetAllTicketsdb, GetTicketsByProject}